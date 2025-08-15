#!/usr/bin/env python3
"""
Multi-Agent Documentation Tester for Adobe Express Add-ons

This tool uses multiple specialized AI agents to evaluate documentation quality and LLM-readiness
by answering real developer queries through intelligent document traversal and agent orchestration.

Uses a multi-agent architecture:
- QueryAgent: Decomposes complex queries into sub-questions
- SearchAgent: Intelligently traverses documentation
- AssessmentAgent: Evaluates content quality and completeness
- SynthesisAgent: Generates final reports and recommendations

Usage:
    python3 scripts/prompt_only_multi_agent_tester.py \
        --docs-path src/pages \
        --queries test_prompts/unified_test_queries.json \
        --openai-api-key $OPENAI_KEY \
        --output evaluation_report.json
"""

import os
import json
import argparse
import asyncio
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass, asdict
import logging

try:
    import openai
    from openai import OpenAI, AzureOpenAI
except ImportError:
    print("OpenAI library not found. Install with: pip install openai")
    exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class QueryEvaluation:
    """Results of evaluating a single developer query"""
    query: str
    sub_questions: List[str]
    found_content: List[Dict[str, Any]]
    coverage_score: float
    completeness_score: float
    clarity_score: float
    overall_score: float
    gaps_identified: List[str]
    recommendations: List[str]
    confidence: float

@dataclass
class DocumentationEvaluation:
    """Complete evaluation results"""
    timestamp: str
    total_queries: int
    average_score: float
    query_evaluations: List[QueryEvaluation]
    overall_gaps: List[str]
    priority_recommendations: List[str]
    documentation_strengths: List[str]
    coverage_by_category: Dict[str, float]

class AgentOrchestrator:
    """Coordinates multiple AI agents to evaluate documentation"""
    
    def __init__(self, api_key: str = None, model: str = "gpt-4-turbo-preview", azure_config: Dict = None):
        # Initialize client based on configuration
        if azure_config:
            self.client = AzureOpenAI(
                api_key=api_key,
                azure_endpoint=azure_config.get("azure_endpoint"),
                api_version=azure_config.get("openai_api_version", "2024-02-15-preview")
            )
            self.model = azure_config.get("deployment_name", "gpt-4o")
            self.model_config = {
                "temperature": azure_config.get("temperature", 0.0),
                "max_tokens": azure_config.get("max_tokens", 1600),
                "top_p": azure_config.get("top_p", 1.0),
                "frequency_penalty": azure_config.get("frequency_penalty", 0),
                "presence_penalty": azure_config.get("presence_penalty", 0),
                "n": azure_config.get("n", 1)
            }
        else:
            self.client = OpenAI(api_key=api_key)
            self.model = model
            self.model_config = {
                "temperature": 0.3,
                "max_tokens": 1000
            }
        
        self.context_memory = {}
        self.documentation_index = {}
        
        # Initialize specialized agents
        self.query_agent = QueryAgent(self.client, self.model, self.model_config)
        self.search_agent = SearchAgent(self.client, self.model, self.model_config)
        self.assessment_agent = AssessmentAgent(self.client, self.model, self.model_config)
        self.synthesis_agent = SynthesisAgent(self.client, self.model, self.model_config)
    
    async def evaluate_documentation(self, docs_path: str, queries: List[Dict], max_concurrent: int = 3) -> DocumentationEvaluation:
        """Main orchestration method for evaluating documentation"""
        logger.info(f"🚀 Starting agentic evaluation of {len(queries)} queries against {docs_path}")
        
        # Load and index documentation
        await self._load_documentation(docs_path)
        
        # Process queries with controlled concurrency
        semaphore = asyncio.Semaphore(max_concurrent)
        tasks = [self._evaluate_single_query(query, semaphore) for query in queries]
        query_evaluations = await asyncio.gather(*tasks)
        
        # Generate final synthesis
        final_evaluation = await self.synthesis_agent.synthesize_results(query_evaluations)
        
        return final_evaluation
    
    async def _load_documentation(self, docs_path: str):
        """Load and index all documentation files"""
        logger.info(f"📚 Indexing documentation from {docs_path}")
        
        docs_path_obj = Path(docs_path)
        md_files = list(docs_path_obj.rglob("*.md"))
        
        for file_path in md_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                rel_path = str(file_path.relative_to(docs_path_obj))
                self.documentation_index[rel_path] = {
                    'content': content,
                    'path': str(file_path),
                    'size': len(content),
                    'last_modified': file_path.stat().st_mtime
                }
                
            except Exception as e:
                logger.warning(f"Failed to load {file_path}: {e}")
        
        logger.info(f"📖 Indexed {len(self.documentation_index)} documentation files")
    
    async def _evaluate_single_query(self, query_data: Dict, semaphore: asyncio.Semaphore) -> QueryEvaluation:
        """Evaluate a single developer query through the agent pipeline"""
        async with semaphore:
            query = query_data['query']
            category = query_data.get('category', 'general')
            
            logger.info(f"🔍 Evaluating query: {query[:60]}...")
            
            # Step 1: Break down the query
            sub_questions = await self.query_agent.decompose_query(query, category)
            
            # Step 2: Search for relevant content
            found_content = await self.search_agent.search_documentation(
                sub_questions, self.documentation_index, self.context_memory
            )
            
            # Step 3: Assess the found content
            assessment = await self.assessment_agent.assess_content(
                query, sub_questions, found_content
            )
            
            return QueryEvaluation(
                query=query,
                sub_questions=sub_questions,
                found_content=found_content,
                coverage_score=assessment['coverage_score'],
                completeness_score=assessment['completeness_score'],
                clarity_score=assessment['clarity_score'],
                overall_score=assessment['overall_score'],
                gaps_identified=assessment['gaps_identified'],
                recommendations=assessment['recommendations'],
                confidence=assessment['confidence']
            )

class QueryAgent:
    """Breaks down complex developer queries into searchable sub-questions"""
    
    def __init__(self, client, model: str, model_config: Dict):
        self.client = client
        self.model = model
        self.model_config = model_config
    
    async def decompose_query(self, query: str, category: str) -> List[str]:
        """Break down a complex query into specific sub-questions"""
        
        system_prompt = """You are a technical documentation analyst specializing in Adobe Express Add-ons.
        
Your task is to break down complex developer queries into specific, searchable sub-questions that would help a developer find comprehensive answers.

Consider these aspects of Adobe Express Add-on development:
- UI Runtime vs Document Sandbox environments
- Add-on SDK APIs and methods
- Common development patterns and best practices
- Error handling and troubleshooting
- Performance considerations
- Integration with Adobe Express features

Break the query into 3-5 specific sub-questions that cover:
1. Core technical concepts
2. Implementation details
3. Common issues and solutions
4. Best practices and examples
5. Related APIs or features

Return only a JSON array of strings, no additional text."""

        user_prompt = f"""Query Category: {category}
Developer Query: "{query}"

Break this into specific sub-questions that documentation should answer."""

        try:
            # Create a copy of model_config and override max_tokens for this specific call
            call_config = self.model_config.copy()
            call_config["max_tokens"] = min(self.model_config.get("max_tokens", 1600), 500)
            
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                **call_config
            )
            
            content = response.choices[0].message.content.strip()
            
            # Try to parse JSON array from response (more robust)
            try:
                # Method 1: Direct parsing if it looks like JSON array
                if content.startswith('[') and content.endswith(']'):
                    return json.loads(content)
                
                # Method 2: Extract from markdown code blocks
                import re
                json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', content, re.DOTALL)
                if json_match:
                    return json.loads(json_match.group(1))
                
                # Method 3: Find JSON array anywhere in response
                array_match = re.search(r'\[[^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*\]', content, re.DOTALL)
                if array_match:
                    return json.loads(array_match.group(0))
                
                # Fallback: split on newlines and clean up
                lines = [line.strip(' -"') for line in content.split('\n') if line.strip()]
                return lines if lines else [query]
                
            except json.JSONDecodeError:
                # Final fallback if JSON parsing fails
                return [query]
                
        except Exception as e:
            error_msg = str(e)
            if "401" in error_msg or "Unauthorized" in error_msg:
                logger.error(f"❌ API Authentication failed: {e}")
                raise Exception(f"Azure OpenAI authentication failed. Please check your API key and endpoint configuration.")
            logger.error(f"QueryAgent error: {e}")
            return [query]  # Fallback to original query

class SearchAgent:
    """Intelligently traverses documentation to find relevant content"""
    
    def __init__(self, client, model: str, model_config: Dict):
        self.client = client
        self.model = model
        self.model_config = model_config
    
    async def search_documentation(self, sub_questions: List[str], doc_index: Dict, context_memory: Dict) -> List[Dict[str, Any]]:
        """Search documentation for content related to sub-questions"""
        
        found_content = []
        
        for question in sub_questions:
            # Search across all documentation
            relevant_docs = await self._find_relevant_documents(question, doc_index)
            
            for doc_info in relevant_docs:
                content_analysis = await self._analyze_document_content(question, doc_info)
                if content_analysis['relevance_score'] > 0.6:  # Threshold for relevance
                    found_content.append({
                        'question': question,
                        'document_path': doc_info['path'],
                        'relevant_sections': content_analysis['relevant_sections'],
                        'relevance_score': content_analysis['relevance_score'],
                        'content_excerpt': content_analysis['content_excerpt']
                    })
        
        return found_content
    
    async def _find_relevant_documents(self, question: str, doc_index: Dict) -> List[Dict]:
        """Find documents likely to contain relevant information"""
        
        # Simple keyword-based relevance (could be enhanced with embeddings)
        question_lower = question.lower()
        relevant_docs = []
        
        for doc_path, doc_info in doc_index.items():
            content_lower = doc_info['content'].lower()
            
            # Calculate basic relevance score
            score = 0
            keywords = question_lower.split()
            
            for keyword in keywords:
                if len(keyword) > 3:  # Skip very short words
                    score += content_lower.count(keyword) * len(keyword)
            
            if score > 0:
                relevant_docs.append({
                    **doc_info,
                    'relevance_score': score,
                    'doc_path': doc_path
                })
        
        # Sort by relevance and return top candidates
        relevant_docs.sort(key=lambda x: x['relevance_score'], reverse=True)
        return relevant_docs[:5]  # Top 5 most relevant documents
    
    async def _analyze_document_content(self, question: str, doc_info: Dict) -> Dict:
        """Analyze document content for specific question relevance"""
        
        system_prompt = """You are analyzing documentation content to determine how well it answers a specific developer question about Adobe Express Add-ons.

Analyze the provided documentation content and return a JSON object with:
- relevance_score: float 0-1 (how well the content addresses the question)
- relevant_sections: array of strings (key sections that address the question)
- content_excerpt: string (most relevant 200-word excerpt)
- gaps: array of strings (what's missing to fully answer the question)

Focus on practical, actionable information that developers need."""

        user_prompt = f"""Question: "{question}"

Documentation Content:
{doc_info['content'][:4000]}  # Limit content to avoid token limits

Analyze this content's relevance to the question."""

        try:
            # Create a copy of model_config and override max_tokens for this specific call
            call_config = self.model_config.copy()
            call_config["max_tokens"] = min(self.model_config.get("max_tokens", 1600), 800)
            
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                **call_config
            )
            
            content = response.choices[0].message.content.strip()
            
            # Try to parse JSON object from response (more robust)
            try:
                # Method 1: Direct parsing if it looks like JSON
                if content.startswith('{') and content.endswith('}'):
                    return json.loads(content)
                
                # Method 2: Extract from markdown code blocks
                import re
                json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', content, re.DOTALL)
                if json_match:
                    return json.loads(json_match.group(1))
                
                # Method 3: Find JSON object anywhere in response
                obj_match = re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', content, re.DOTALL)
                if obj_match:
                    return json.loads(obj_match.group(0))
                
            except json.JSONDecodeError:
                pass
            
            # If JSON parsing fails, return default structure
                # Fallback response
                return {
                    'relevance_score': 0.5,
                    'relevant_sections': ['Content analysis failed'],
                    'content_excerpt': doc_info['content'][:200],
                    'gaps': ['Unable to analyze content']
                }
                
        except Exception as e:
            error_msg = str(e)
            if "401" in error_msg or "Unauthorized" in error_msg:
                logger.error(f"❌ API Authentication failed: {e}")
                raise Exception(f"Azure OpenAI authentication failed. Please check your API key and endpoint configuration.")
            logger.error(f"SearchAgent content analysis error: {e}")
            return {
                'relevance_score': 0.3,
                'relevant_sections': [],
                'content_excerpt': doc_info['content'][:200],
                'gaps': ['Analysis error']
            }

class AssessmentAgent:
    """Evaluates content quality and completeness for answering queries"""
    
    def __init__(self, client, model: str, model_config: Dict):
        self.client = client
        self.model = model
        self.model_config = model_config
    
    async def assess_content(self, original_query: str, sub_questions: List[str], found_content: List[Dict]) -> Dict:
        """Assess how well the found content answers the original query"""
        
        system_prompt = """You are an expert evaluator of technical documentation quality for Adobe Express Add-ons.

Evaluate how well the provided documentation content answers a developer's query. Consider:

1. COVERAGE: Does the content address all aspects of the query?
2. COMPLETENESS: Are there working code examples, error handling, and practical guidance?
3. CLARITY: Is the information clear, well-structured, and easy to follow?
4. ACTIONABILITY: Can a developer immediately apply this information?

Rate each aspect on a 0-1 scale and provide specific gaps and recommendations.

Return a JSON object with:
- coverage_score: float 0-1
- completeness_score: float 0-1  
- clarity_score: float 0-1
- overall_score: float 0-1 (weighted average)
- gaps_identified: array of specific missing information
- recommendations: array of specific improvements needed
- confidence: float 0-1 (confidence in this assessment)"""

        # Prepare content summary for analysis
        content_summary = self._prepare_content_summary(found_content)
        
        user_prompt = f"""Original Query: "{original_query}"

Sub-questions to address:
{json.dumps(sub_questions, indent=2)}

Found Documentation Content:
{content_summary}

Evaluate how well this content answers the developer's query."""

        try:
            # Create a copy of model_config and override max_tokens for this specific call
            call_config = self.model_config.copy()
            call_config["max_tokens"] = min(self.model_config.get("max_tokens", 1600), 1000)
            
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                **call_config
            )
            
            content = response.choices[0].message.content.strip()
            
            # Try to extract JSON from the response (more robust parsing)
            assessment = None
            
            # Method 1: Direct JSON parsing if it looks like JSON
            if content.startswith('{') and content.endswith('}'):
                try:
                    assessment = json.loads(content)
                except json.JSONDecodeError:
                    pass
            
            # Method 2: Extract JSON from markdown code blocks
            if assessment is None:
                import re
                json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', content, re.DOTALL)
                if json_match:
                    try:
                        assessment = json.loads(json_match.group(1))
                    except json.JSONDecodeError:
                        pass
            
            # Method 3: Find JSON object anywhere in the response
            if assessment is None:
                import re
                json_match = re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', content, re.DOTALL)
                if json_match:
                    try:
                        assessment = json.loads(json_match.group(0))
                    except json.JSONDecodeError:
                        pass
            
            # If we successfully parsed JSON, validate and return
            if assessment and isinstance(assessment, dict):
                return {
                    'coverage_score': float(assessment.get('coverage_score', 0.5)),
                    'completeness_score': float(assessment.get('completeness_score', 0.5)),
                    'clarity_score': float(assessment.get('clarity_score', 0.5)),
                    'overall_score': float(assessment.get('overall_score', 0.5)),
                    'gaps_identified': assessment.get('gaps_identified', []) if isinstance(assessment.get('gaps_identified'), list) else ['Unable to parse gaps'],
                    'recommendations': assessment.get('recommendations', []) if isinstance(assessment.get('recommendations'), list) else ['Manual review required'],
                    'confidence': float(assessment.get('confidence', 0.7))
                }
            else:
                # Log the problematic response for debugging
                logger.warning(f"Could not parse JSON from response: {content[:200]}...")
                raise ValueError(f"Invalid JSON response: {content[:100]}...")
                
        except Exception as e:
            error_msg = str(e)
            if "401" in error_msg or "Unauthorized" in error_msg:
                logger.error(f"❌ API Authentication failed: {e}")
                raise Exception(f"Azure OpenAI authentication failed. Please check your API key and endpoint configuration.")
            logger.error(f"AssessmentAgent error: {e}")
            return {
                'coverage_score': 0.5,
                'completeness_score': 0.5,
                'clarity_score': 0.5,
                'overall_score': 0.5,
                'gaps_identified': ['Unable to assess content'],
                'recommendations': ['Manual review required'],
                'confidence': 0.3
            }
    
    def _prepare_content_summary(self, found_content: List[Dict]) -> str:
        """Prepare a summary of found content for analysis"""
        if not found_content:
            return "No relevant content found."
        
        summary_parts = []
        for i, content in enumerate(found_content[:10]):  # Limit to top 5 results
            summary_parts.append(f"""
Document {i+1}: {content['document_path']}
Relevance: {content['relevance_score']:.2f}
Question: {content['question']}
Relevant Sections: {', '.join(content['relevant_sections'])}
Excerpt: {content['content_excerpt'][:1500]}...
""")
        
        return '\n'.join(summary_parts)

class SynthesisAgent:
    """Generates final reports and recommendations from all evaluations"""
    
    def __init__(self, client, model: str, model_config: Dict):
        self.client = client
        self.model = model
        self.model_config = model_config
    
    async def synthesize_results(self, query_evaluations: List[QueryEvaluation]) -> DocumentationEvaluation:
        """Generate comprehensive evaluation results and recommendations"""
        
        # Calculate overall statistics
        total_queries = len(query_evaluations)
        average_score = sum(eval.overall_score for eval in query_evaluations) / total_queries if total_queries > 0 else 0
        
        # Categorize queries and calculate category scores
        coverage_by_category = await self._calculate_category_coverage(query_evaluations)
        
        # Identify overall gaps and recommendations
        overall_gaps = await self._identify_common_gaps(query_evaluations)
        priority_recommendations = await self._generate_priority_recommendations(query_evaluations)
        documentation_strengths = await self._identify_strengths(query_evaluations)
        
        return DocumentationEvaluation(
            timestamp=datetime.now().isoformat(),
            total_queries=total_queries,
            average_score=average_score,
            query_evaluations=query_evaluations,
            overall_gaps=overall_gaps,
            priority_recommendations=priority_recommendations,
            documentation_strengths=documentation_strengths,
            coverage_by_category=coverage_by_category
        )
    
    async def _calculate_category_coverage(self, evaluations: List[QueryEvaluation]) -> Dict[str, float]:
        """Calculate coverage scores by query category"""
        # For now, return overall average (could be enhanced with category classification)
        return {"overall": sum(eval.overall_score for eval in evaluations) / len(evaluations) if evaluations else 0}
    
    async def _identify_common_gaps(self, evaluations: List[QueryEvaluation]) -> List[str]:
        """Identify the most common gaps across all evaluations"""
        gap_counts = {}
        
        for eval in evaluations:
            for gap in eval.gaps_identified:
                gap_counts[gap] = gap_counts.get(gap, 0) + 1
        
        # Return most common gaps
        sorted_gaps = sorted(gap_counts.items(), key=lambda x: x[1], reverse=True)
        return [gap for gap, count in sorted_gaps[:10]]  # Top 10 most common gaps
    
    async def _generate_priority_recommendations(self, evaluations: List[QueryEvaluation]) -> List[str]:
        """Generate priority recommendations based on evaluation results"""
        rec_counts = {}
        
        for eval in evaluations:
            for rec in eval.recommendations:
                rec_counts[rec] = rec_counts.get(rec, 0) + 1
        
        # Return most frequent recommendations
        sorted_recs = sorted(rec_counts.items(), key=lambda x: x[1], reverse=True)
        return [rec for rec, count in sorted_recs[:10]]  # Top 10 recommendations
    
    async def _identify_strengths(self, evaluations: List[QueryEvaluation]) -> List[str]:
        """Identify documentation strengths based on high-scoring evaluations"""
        strengths = []
        
        high_scoring_evals = [eval for eval in evaluations if eval.overall_score > 0.8]
        
        if high_scoring_evals:
            strengths.append(f"Strong coverage for {len(high_scoring_evals)} out of {len(evaluations)} query types")
        
        high_clarity_evals = [eval for eval in evaluations if eval.clarity_score > 0.85]
        if high_clarity_evals:
            strengths.append(f"Excellent clarity in {len(high_clarity_evals)} documentation areas")
        
        return strengths

def save_evaluation_report(evaluation: DocumentationEvaluation, output_path: str):
    """Save evaluation results to JSON file with human-readable summary"""
    
    # Save detailed JSON report
    with open(output_path, 'w') as f:
        json.dump(asdict(evaluation), f, indent=2, default=str)
    
    # Generate human-readable summary
    summary_path = output_path.replace('.json', '_summary.txt')
    with open(summary_path, 'w') as f:
        f.write(f"""
Adobe Express Add-on Documentation Evaluation Report
Generated: {evaluation.timestamp}

OVERALL RESULTS:
- Total Queries Evaluated: {evaluation.total_queries}
- Average Score: {evaluation.average_score:.2f}/1.00
- Coverage by Category: {evaluation.coverage_by_category}

TOP GAPS IDENTIFIED:
""")
        for i, gap in enumerate(evaluation.overall_gaps[:5], 1):
            f.write(f"{i}. {gap}\n")
        
        f.write(f"""
PRIORITY RECOMMENDATIONS:
""")
        for i, rec in enumerate(evaluation.priority_recommendations[:5], 1):
            f.write(f"{i}. {rec}\n")
        
        f.write(f"""
DOCUMENTATION STRENGTHS:
""")
        for strength in evaluation.documentation_strengths:
            f.write(f"✓ {strength}\n")
        
        f.write(f"""
DETAILED QUERY RESULTS:
""")
        for eval in evaluation.query_evaluations:
            f.write(f"""
Query: {eval.query[:80]}...
Score: {eval.overall_score:.2f} (Coverage: {eval.coverage_score:.2f}, Completeness: {eval.completeness_score:.2f}, Clarity: {eval.clarity_score:.2f})
Confidence: {eval.confidence:.2f}
""")

async def main():
    parser = argparse.ArgumentParser(description='Multi-Agent Documentation Tester for Adobe Express Add-ons')
    parser.add_argument('--docs-path', required=True, help='Path to documentation directory')
    parser.add_argument('--queries', required=True, help='Path to developer queries JSON file')
    parser.add_argument('--openai-api-key', help='OpenAI API key (or set OPENAI_API_KEY env var)')
    parser.add_argument('--azure-config', help='Path to Azure OpenAI configuration JSON file')
    parser.add_argument('--output', default='multi_agent_evaluation_report.json', help='Output file path')
    parser.add_argument('--model', default='gpt-4-turbo-preview', help='OpenAI model to use (ignored if using Azure)')
    parser.add_argument('--max-concurrent', type=int, default=3, help='Maximum concurrent evaluations')
    
    args = parser.parse_args()
    
    # Load Azure configuration if provided
    azure_config = None
    if args.azure_config:
        try:
            with open(args.azure_config, 'r') as f:
                config_data = json.load(f)
                azure_config = config_data.get("evaluator_llm", {}).get("args", {})
                logger.info(f"🔧 Using Azure OpenAI configuration from {args.azure_config}")
        except Exception as e:
            print(f"Error loading Azure config file: {e}")
            return
    
    # Get API key
    api_key = args.openai_api_key or os.getenv('OPENAI_API_KEY') or os.getenv('AZURE_OPENAI_KEY')
    if not api_key:
        print("Error: API key required. Set OPENAI_API_KEY/AZURE_OPENAI_KEY env var or use --openai-api-key")
        return
    
    # Load developer queries
    try:
        with open(args.queries, 'r') as f:
            queries = json.load(f)
    except Exception as e:
        print(f"Error loading queries file: {e}")
        return
    
    # Initialize orchestrator and run evaluation
    orchestrator = AgentOrchestrator(api_key, args.model, azure_config)
    
    try:
        evaluation = await orchestrator.evaluate_documentation(
            args.docs_path, queries, args.max_concurrent
        )
        
        # Save results
        save_evaluation_report(evaluation, args.output)
        
        print(f"""
🎉 Multi-agent evaluation completed!

📊 RESULTS SUMMARY:
- Queries evaluated: {evaluation.total_queries}
- Average score: {evaluation.average_score:.2f}/1.00
- Output saved to: {args.output}

📈 TOP INSIGHTS:
""")
        for insight in evaluation.priority_recommendations[:3]:
            print(f"  • {insight}")
        
    except Exception as e:
        logger.error(f"Evaluation failed: {e}")
        print(f"Error during evaluation: {e}")

if __name__ == "__main__":
    asyncio.run(main())