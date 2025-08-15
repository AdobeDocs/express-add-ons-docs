#!/usr/bin/env python3
"""
Simple Documentation Evaluator
=============================

A standalone utility script that evaluates documentation quality by having an LLM
search through documentation and answer questions, then score the answers.

This simulates how developers would interact with documentation using basic LLM queries
without specialized RAG systems, MCP, or RAGAS frameworks.

Usage:
    python3 scripts/prompt_only_llm_tester.py
    python3 scripts/prompt_only_llm_tester.py --questions custom_questions.yaml
    python3 scripts/prompt_only_llm_tester.py --docs-path /path/to/docs --output results.json
"""

import asyncio
import json
import os
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import List, Dict, Any, Optional
import yaml
import argparse
from datetime import datetime

try:
    from openai import AsyncAzureOpenAI
except ImportError:
    print("Please install openai: pip install openai")
    exit(1)


@dataclass
class DocumentChunk:
    """Represents a chunk of documentation."""
    content: str
    source: str
    title: str
    url: Optional[str] = None


@dataclass
class EvaluationResult:
    """Results of evaluating a single question."""
    question: str
    category: str
    answer: str
    relevant_docs: List[str]
    search_queries: List[str]
    confidence_score: float
    completeness_score: float
    accuracy_score: float
    overall_score: float
    time_taken: float
    reasoning: str


class SimpleDocumentLoader:
    """Loads and indexes documentation files."""
    
    def __init__(self, docs_path: str):
        self.docs_path = Path(docs_path)
        self.documents: List[DocumentChunk] = []
    
    def load_markdown_files(self) -> List[DocumentChunk]:
        """Load all markdown files from the documentation directory."""
        docs = []
        
        if not self.docs_path.exists():
            print(f"Documentation path not found: {self.docs_path}")
            return docs
        
        # Find all markdown files
        md_files = list(self.docs_path.glob("**/*.md"))
        
        print(f"Loading {len(md_files)} markdown files...")
        
        for md_file in md_files:
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract title from first heading or filename
                title = self._extract_title(content, md_file.name)
                
                # Create relative path for source
                rel_path = md_file.relative_to(self.docs_path)
                
                docs.append(DocumentChunk(
                    content=content,
                    source=str(rel_path),
                    title=title,
                    url=self._generate_url(rel_path)
                ))
                
            except Exception as e:
                print(f"Error loading {md_file}: {e}")
        
        self.documents = docs
        print(f"Loaded {len(docs)} documentation files")
        return docs
    
    def _extract_title(self, content: str, filename: str) -> str:
        """Extract title from markdown content or filename."""
        lines = content.split('\n')
        for line in lines:
            if line.startswith('# '):
                return line[2:].strip()
        return filename.replace('.md', '').replace('_', ' ').title()
    
    def _generate_url(self, rel_path: Path) -> str:
        """Generate a documentation URL from relative path."""
        # Convert to web-style path
        web_path = str(rel_path).replace('.md', '').replace('\\', '/')
        return f"https://developer.adobe.com/express/add-ons/docs/{web_path}"


class AgenticSearchEvaluator:
    """Evaluates documentation using agentic search with Azure OpenAI."""
    
    def __init__(self, api_key: str, azure_endpoint: str, model: str = "gpt-4o", api_version: str = "2024-12-01-preview"):
        self.client = AsyncAzureOpenAI(
            api_key=api_key,
            azure_endpoint=azure_endpoint,
            api_version=api_version
        )
        self.model = model
        self.documents: List[DocumentChunk] = []
    
    def set_documents(self, documents: List[DocumentChunk]):
        """Set the documents to search through."""
        self.documents = documents
    
    async def search_documents(self, query: str, max_results: int = 5) -> List[DocumentChunk]:
        """Search documents using semantic similarity via LLM."""
        
        if not self.documents:
            return []
        
        # Create a prompt for document ranking
        doc_summaries = []
        for i, doc in enumerate(self.documents):
            # Truncate content for ranking
            preview = doc.content[:300] + "..." if len(doc.content) > 300 else doc.content
            doc_summaries.append(f"{i}: {doc.title}\n{preview}")
        
        ranking_prompt = f"""
Given this search query: "{query}"

Rank the following documents by relevance (0-10 scale). Return only the document numbers of the top {max_results} most relevant documents, in order of relevance.

Documents:
{chr(10).join(doc_summaries)}

Return only the document numbers separated by commas (e.g., "3,7,1,9,2"):
"""
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": ranking_prompt}],
                temperature=0.1,
                max_tokens=100
            )
            
            # Parse the ranking result
            ranking_text = response.choices[0].message.content.strip()
            doc_indices = [int(x.strip()) for x in ranking_text.split(',') if x.strip().isdigit()]
            
            # Return the top documents
            relevant_docs = []
            for idx in doc_indices[:max_results]:
                if 0 <= idx < len(self.documents):
                    relevant_docs.append(self.documents[idx])
            
            return relevant_docs
            
        except Exception as e:
            print(f"Error in document search: {e}")
            # Fallback to simple text matching
            return self._fallback_search(query, max_results)
    
    def _fallback_search(self, query: str, max_results: int) -> List[DocumentChunk]:
        """Fallback search using simple text matching."""
        query_words = query.lower().split()
        scored_docs = []
        
        for doc in self.documents:
            content_lower = doc.content.lower()
            score = sum(1 for word in query_words if word in content_lower)
            if score > 0:
                scored_docs.append((score, doc))
        
        # Sort by score and return top results
        scored_docs.sort(key=lambda x: x[0], reverse=True)
        return [doc for _, doc in scored_docs[:max_results]]
    
    async def generate_search_queries(self, question: str) -> List[str]:
        """Generate multiple search queries for a given question."""
        
        prompt = f"""
Given this question about Adobe Express add-on development: "{question}"

Generate 3-5 different search queries that would help find relevant documentation to answer this question. 
Make the queries specific and focused on different aspects of the question.

Return only the search queries, one per line:
"""
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=200
            )
            
            queries = [q.strip() for q in response.choices[0].message.content.strip().split('\n') if q.strip()]
            return queries[:5]  # Limit to 5 queries
            
        except Exception as e:
            print(f"Error generating search queries: {e}")
            return [question]  # Fallback to original question
    
    async def answer_question(self, question: str, relevant_docs: List[DocumentChunk]) -> str:
        """Generate an answer based on relevant documentation."""
        
        if not relevant_docs:
            return "I couldn't find relevant documentation to answer this question."
        
        # Combine relevant documentation
        context = "\n\n".join([
            f"Source: {doc.title} ({doc.source})\n{doc.content[:2000]}..."
            for doc in relevant_docs
        ])
        
        prompt = f"""
You are a helpful assistant for Adobe Express add-on development. Answer the following question based on the provided documentation.

Question: {question}

Documentation:
{context}

Instructions:
- Provide a clear, concise answer based on the documentation
- Include code examples if relevant
- If the documentation doesn't fully answer the question, say so
- Reference the specific documentation sources when possible

Answer:
"""
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1,
                max_tokens=1000
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            print(f"Error generating answer: {e}")
            return f"Error generating answer: {e}"
    
    async def score_answer(self, question: str, answer: str, relevant_docs: List[DocumentChunk]) -> Dict[str, float]:
        """Score the quality of an answer using OpenAI."""
        
        doc_sources = [doc.title for doc in relevant_docs]
        
        scoring_prompt = f"""
Evaluate this answer for a question about Adobe Express add-on development:

Question: {question}
Answer: {answer}
Available Documentation Sources: {', '.join(doc_sources)}

Score the answer on these criteria (0-10 scale):
1. Confidence: How confident/certain does the answer seem?
2. Completeness: How thoroughly does it answer the question?
3. Accuracy: Based on the context, how accurate does it appear?

Provide scores in this exact format:
Confidence: X
Completeness: Y
Accuracy: Z
Reasoning: Brief explanation of the scores

Response:
"""
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": scoring_prompt}],
                temperature=0.1,
                max_tokens=300
            )
            
            content = response.choices[0].message.content.strip()
            
            # Parse scores
            scores = {}
            reasoning = ""
            
            for line in content.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip().lower()
                    value = value.strip()
                    
                    if key in ['confidence', 'completeness', 'accuracy']:
                        try:
                            scores[key] = float(value)
                        except ValueError:
                            scores[key] = 5.0  # Default score
                    elif key == 'reasoning':
                        reasoning = value
            
            # Ensure all scores are present
            for metric in ['confidence', 'completeness', 'accuracy']:
                if metric not in scores:
                    scores[metric] = 5.0
            
            scores['reasoning'] = reasoning
            return scores
            
        except Exception as e:
            print(f"Error scoring answer: {e}")
            return {
                'confidence': 5.0,
                'completeness': 5.0, 
                'accuracy': 5.0,
                'reasoning': f"Error in scoring: {e}"
            }
    
    async def evaluate_question(self, question: str, category: str = "General") -> EvaluationResult:
        """Evaluate a single question against the documentation."""
        
        start_time = time.time()
        
        print(f"Evaluating: {question}")
        
        # Step 1: Generate search queries
        search_queries = await self.generate_search_queries(question)
        print(f"  Generated {len(search_queries)} search queries")
        
        # Step 2: Search for relevant documents
        all_relevant_docs = []
        for query in search_queries:
            docs = await self.search_documents(query, max_results=3)
            all_relevant_docs.extend(docs)
        
        # Remove duplicates while preserving order
        seen = set()
        unique_docs = []
        for doc in all_relevant_docs:
            if doc.source not in seen:
                seen.add(doc.source)
                unique_docs.append(doc)
        
        relevant_docs = unique_docs[:5]  # Limit to top 5 unique documents
        print(f"  Found {len(relevant_docs)} relevant documents")
        
        # Step 3: Generate answer
        answer = await self.answer_question(question, relevant_docs)
        print(f"  Generated answer ({len(answer)} chars)")
        
        # Step 4: Score the answer
        scores = await self.score_answer(question, answer, relevant_docs)
        
        # Calculate overall score
        overall_score = (scores['confidence'] + scores['completeness'] + scores['accuracy']) / 3
        
        time_taken = time.time() - start_time
        
        result = EvaluationResult(
            question=question,
            category=category,
            answer=answer,
            relevant_docs=[doc.source for doc in relevant_docs],
            search_queries=search_queries,
            confidence_score=scores['confidence'],
            completeness_score=scores['completeness'],
            accuracy_score=scores['accuracy'],
            overall_score=overall_score,
            time_taken=time_taken,
            reasoning=scores['reasoning']
        )
        
        print(f"  Overall score: {overall_score:.1f}/10 (took {time_taken:.1f}s)")
        return result


class QuestionLoader:
    """Loads questions from various formats."""
    
    @staticmethod
    def load_from_yaml(file_path: str) -> List[Dict[str, Any]]:
        """Load questions from YAML file (same format as RAGAS dataset)."""
        
        questions = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
            
            # Handle the RAGAS format with categories
            for category, question_list in data.items():
                for item in question_list:
                    if isinstance(item, dict) and 'prompt' in item:
                        questions.append({
                            'question': item['prompt'],
                            'category': category
                        })
                    elif isinstance(item, str):
                        questions.append({
                            'question': item,
                            'category': category
                        })
            
            print(f"Loaded {len(questions)} questions from {file_path}")
            return questions
            
        except Exception as e:
            print(f"Error loading questions from {file_path}: {e}")
            return []
    
    @staticmethod
    def get_default_questions() -> List[Dict[str, Any]]:
        """Get a set of default test questions."""
        
        return [
            {"question": "How do I create a basic Adobe Express add-on?", "category": "Getting_Started"},
            {"question": "What is the Document sandbox in Adobe Express?", "category": "Architecture"},
            {"question": "How can I create a blue circle using the SDK?", "category": "Basic_Shapes"},
            {"question": "How do I add text to a document?", "category": "Text_Manipulation"},
            {"question": "What APIs are available for image handling?", "category": "Media_Handling"},
            {"question": "How do I set up Spectrum Web Components for my add-on UI?", "category": "UI_Development"},
            {"question": "What are the best practices for add-on development?", "category": "Best_Practices"},
            {"question": "How do I debug my add-on?", "category": "Debugging"},
            {"question": "What's the difference between artboard, page and canvas?", "category": "Document_Structure"},
            {"question": "How do I publish my add-on?", "category": "Publishing"}
        ]


async def main():
    """Main function to run the evaluation."""
    
    parser = argparse.ArgumentParser(description="Simple Documentation Evaluator")
    parser.add_argument("--questions", help="Path to questions YAML file")
    parser.add_argument("--docs-path", default="dist/git_repos/express-add-ons-docs/src/pages", 
                       help="Path to documentation directory")
    parser.add_argument("--output", default="simple_eval_results.json", 
                       help="Output file for results")
    parser.add_argument("--api-key", help="Azure OpenAI API key (or set OPENAI_API_KEY env var)")
    parser.add_argument("--azure-endpoint", default="https://extensibility-genai-general.openai.azure.com", 
                       help="Azure OpenAI endpoint")
    parser.add_argument("--api-version", default="2024-12-01-preview", help="Azure OpenAI API version")
    parser.add_argument("--model", default="gpt-4o", help="Azure OpenAI deployment name")
    parser.add_argument("--max-questions", type=int, help="Limit number of questions to evaluate")
    
    args = parser.parse_args()
    
    # Get API key
    api_key = args.api_key or os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: Azure OpenAI API key required. Set OPENAI_API_KEY env var or use --api-key")
        return
    
    # Load questions
    if args.questions:
        questions = QuestionLoader.load_from_yaml(args.questions)
    else:
        questions = QuestionLoader.get_default_questions()
    
    if not questions:
        print("No questions to evaluate!")
        return
    
    if args.max_questions:
        questions = questions[:args.max_questions]
    
    print(f"Will evaluate {len(questions)} questions")
    
    # Load documentation
    doc_loader = SimpleDocumentLoader(args.docs_path)
    documents = doc_loader.load_markdown_files()
    
    if not documents:
        print("No documentation found!")
        return
    
    # Initialize evaluator
    evaluator = AgenticSearchEvaluator(
        api_key=api_key, 
        azure_endpoint=args.azure_endpoint,
        model=args.model,
        api_version=args.api_version
    )
    evaluator.set_documents(documents)
    
    # Run evaluation
    print(f"\nStarting evaluation with {args.model}...")
    print("=" * 60)
    
    results = []
    total_start_time = time.time()
    
    for i, q in enumerate(questions, 1):
        print(f"\n[{i}/{len(questions)}] ", end="")
        result = await evaluator.evaluate_question(q['question'], q['category'])
        results.append(result)
        
        # Small delay to avoid rate limiting
        await asyncio.sleep(0.5)
    
    total_time = time.time() - total_start_time
    
    # Calculate summary statistics
    avg_score = sum(r.overall_score for r in results) / len(results)
    avg_confidence = sum(r.confidence_score for r in results) / len(results)
    avg_completeness = sum(r.completeness_score for r in results) / len(results)
    avg_accuracy = sum(r.accuracy_score for r in results) / len(results)
    
    # Group by category
    category_scores = {}
    for result in results:
        if result.category not in category_scores:
            category_scores[result.category] = []
        category_scores[result.category].append(result.overall_score)
    
    category_averages = {
        cat: sum(scores) / len(scores) 
        for cat, scores in category_scores.items()
    }
    
    # Create summary
    summary = {
        "evaluation_date": datetime.now().isoformat(),
        "model_used": args.model,
        "total_questions": len(results),
        "total_time_seconds": total_time,
        "average_time_per_question": total_time / len(results),
        "overall_average_score": avg_score,
        "average_confidence": avg_confidence,
        "average_completeness": avg_completeness,
        "average_accuracy": avg_accuracy,
        "category_averages": category_averages,
        "documentation_path": args.docs_path,
        "documents_loaded": len(documents)
    }
    
    # Save results
    output_data = {
        "summary": summary,
        "results": [asdict(result) for result in results]
    }
    
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "=" * 60)
    print("EVALUATION COMPLETE")
    print("=" * 60)
    print(f"Total Questions: {len(results)}")
    print(f"Average Overall Score: {avg_score:.1f}/10")
    print(f"Average Confidence: {avg_confidence:.1f}/10")
    print(f"Average Completeness: {avg_completeness:.1f}/10") 
    print(f"Average Accuracy: {avg_accuracy:.1f}/10")
    print(f"Total Time: {total_time:.1f} seconds")
    print(f"Average Time per Question: {total_time/len(results):.1f} seconds")
    
    print(f"\nCategory Breakdown:")
    for category, avg in sorted(category_averages.items()):
        count = len(category_scores[category])
        print(f"  {category}: {avg:.1f}/10 ({count} questions)")
    
    print(f"\nResults saved to: {args.output}")


if __name__ == "__main__":
    asyncio.run(main())