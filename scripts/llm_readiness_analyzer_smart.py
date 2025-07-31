#!/usr/bin/env python3
"""
Smart Adobe Express Add-ons Documentation LLM-Readiness Audit Framework

This enhanced framework analyzes documentation for LLM-friendliness using:
- Content classification to apply rules contextually
- Smart scoring that considers document type and code intensity
- Reduced false positives for conceptual and reference documents

Usage:
    python3 llm_readiness_analyzer_smart.py --docs-path src/pages
    python3 llm_readiness_analyzer_smart.py --docs-path src/pages --baseline --output smart_baseline_report.json
    python3 llm_readiness_analyzer_smart.py --docs-path src/pages/guides/learn/how_to/use_text.md --output my_report.json
"""

import os
import re
import json
import argparse
import yaml
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional, Tuple
from collections import defaultdict
from datetime import datetime
import hashlib

# Import the content classifier
from content_classifier import ContentClassifier, ContentType, CodeIntensity

@dataclass
class SmartDocumentAnalysis:
    """Enhanced analysis results for a single document with content classification"""
    file_path: str
    title: str
    content_type: str
    code_intensity: str
    word_count: int
    code_blocks: int
    code_examples_complete: int
    code_examples_incomplete: int
    context_clarity_score: float
    error_first_sections: int
    error_coverage_score: float
    qa_format_sections: int
    cross_references: int
    progressive_structure_score: float
    searchability_score: float
    smart_llm_score: float
    rules_applied: List[str]
    rules_excluded: List[str]
    issues: List[str]
    recommendations: List[str]

@dataclass
class SmartAuditReport:
    """Enhanced audit report with content classification insights"""
    timestamp: str
    total_files: int
    overall_score: float
    category_scores: Dict[str, float]
    content_type_distribution: Dict[str, int]
    code_intensity_distribution: Dict[str, int]
    avg_rules_applied: float
    avg_rules_excluded: float
    query_pattern_coverage: Dict[str, float]
    file_analyses: List[SmartDocumentAnalysis]
    critical_issues: List[str]
    top_recommendations: List[str]
    baseline_hash: str


class SmartDocumentationAuditor:
    """Enhanced auditing class with content classification"""
    
    def __init__(self, structured_query_path: str = "structured_query_data.json"):
        # Initialize content classifier
        self.classifier = ContentClassifier()
        
        # Load structured query data with improved path resolution
        self.query_patterns = self._load_query_data(structured_query_path)
        
        # Enhanced scoring weights that are dynamically adjusted
        self.base_scoring_weights = {
            'context_clarity': 0.25,      # Critical for code-heavy docs
            'code_completeness': 0.20,    # Only for docs with code
            'error_coverage': 0.15,       # Only for tutorials/troubleshooting
            'qa_format': 0.15,           # Reduced weight for reference docs
            'progressive_structure': 0.10, # Important for tutorials
            'searchability': 0.10,       # Always important
            'cross_references': 0.05     # Always important but lower weight
        }
        
        # Query pattern weights
        self.query_pattern_weights = {
            'concept_questions': 0.2,
            'how_to_questions': 0.25,
            'error_questions': 0.2,
            'api_questions': 0.15,
            'setup_questions': 0.1,
            'integration_questions': 0.1
        }

    def _load_query_data(self, path: str) -> Dict[str, List[str]]:
        """Load structured query data with improved path resolution"""
        
        # If path is just a filename, try to find it relative to this script
        if not os.path.isabs(path) and os.sep not in path:
            script_dir = Path(__file__).parent
            full_path = script_dir / path
            if full_path.exists():
                path = str(full_path)
        
        try:
            with open(path, 'r') as f:
                data = json.load(f)
                return self._extract_query_patterns(data)
        except FileNotFoundError:
            print(f"Warning: Query data file {path} not found. Using default patterns.")
            return self._get_default_patterns()
        except json.JSONDecodeError as e:
            print(f"Warning: Invalid JSON in {path}: {e}. Using default patterns.")
            return self._get_default_patterns()

    def _get_default_patterns(self) -> Dict[str, List[str]]:
        """Default query patterns when structured data is not available"""
        return {
            'concept_questions': ['what is', 'how does', 'explain', 'understand'],
            'how_to_questions': ['how to', 'how do I', 'steps to', 'guide'],
            'error_questions': ['error', 'problem', 'issue', 'troubleshoot', 'fix'],
            'api_questions': ['api', 'method', 'function', 'parameter', 'return'],
            'setup_questions': ['install', 'setup', 'configure', 'initialize'],
            'integration_questions': ['integrate', 'connect', 'combine', 'work with']
        }

    def _extract_query_patterns(self, data: Dict) -> Dict[str, List[str]]:
        """Extract query patterns from structured data"""
        patterns = defaultdict(list)
        
        # Extract patterns from the structured query data
        if 'queries' in data:
            for query_item in data['queries']:
                query_text = query_item.get('query', '').lower()
                category = query_item.get('category', 'general')
                patterns[f"{category}_questions"].append(query_text)

        return dict(patterns)
    
    def audit_directory(self, docs_path: str) -> SmartAuditReport:
        """Enhanced audit with content classification"""
        print(f"🧠 Starting smart audit with content classification...")
        print(f"📂 Scanning: {docs_path}")
        
        # Collect all markdown files
        if os.path.isfile(docs_path):
            md_files = [Path(docs_path)]
            print(f"📄 Analyzing single file: {Path(docs_path).name}")
        else:
            md_files = list(Path(docs_path).rglob("*.md"))
            print(f"📊 Found {len(md_files)} markdown files")
        
        file_analyses = []
        category_scores = defaultdict(list)
        content_type_distribution = defaultdict(int)
        code_intensity_distribution = defaultdict(int)
        total_rules_applied = 0
        total_rules_excluded = 0
        
        for file_path in md_files:
            print(f"   🔍 Analyzing: {file_path.relative_to(Path(docs_path)) if not os.path.isfile(docs_path) else file_path.name}")
            analysis = self.analyze_file_smart(str(file_path))
            file_analyses.append(analysis)
            
            # Track content classification statistics
            content_type_distribution[analysis.content_type] += 1
            code_intensity_distribution[analysis.code_intensity] += 1
            total_rules_applied += len(analysis.rules_applied)
            total_rules_excluded += len(analysis.rules_excluded)
            
            # Collect category scores (only for applicable categories)
            if 'context_clarity' in analysis.rules_applied:
                category_scores['context_clarity'].append(analysis.context_clarity_score)
            
            if 'code_completeness' in analysis.rules_applied:
                if analysis.code_blocks == 0:
                    code_completeness_score = 1.0
                else:
                    code_completeness_score = analysis.code_examples_complete / analysis.code_blocks
                category_scores['code_completeness'].append(code_completeness_score)
            
            if 'error_coverage' in analysis.rules_applied:
                category_scores['error_coverage'].append(analysis.error_coverage_score)
            
            if 'qa_format' in analysis.rules_applied:
                category_scores['qa_format'].append(
                    1.0 if analysis.qa_format_sections > 0 else 0.0
                )
            
            # These are always applied
            category_scores['progressive_structure'].append(analysis.progressive_structure_score)
            category_scores['searchability'].append(analysis.searchability_score)
            category_scores['cross_references'].append(
                min(1.0, analysis.cross_references / 5.0)
            )
        
        # Calculate smart overall scores
        avg_category_scores = {
            cat: sum(scores) / len(scores) if scores else 0.0
            for cat, scores in category_scores.items()
        }
        
        # Calculate weighted overall score using smart weights
        overall_score = self._calculate_smart_overall_score(avg_category_scores, file_analyses)
        
        # Calculate query pattern coverage
        query_coverage = self._calculate_query_pattern_coverage([a.file_path for a in file_analyses])
        
        # Generate smart insights
        critical_issues = self._identify_critical_issues_smart(file_analyses)
        recommendations = self._generate_smart_recommendations(file_analyses, content_type_distribution)
        
        # Calculate averages
        avg_rules_applied = total_rules_applied / len(file_analyses) if file_analyses else 0
        avg_rules_excluded = total_rules_excluded / len(file_analyses) if file_analyses else 0
        
        # Generate baseline hash
        baseline_hash = self._generate_baseline_hash([a.file_path for a in file_analyses])
        
        return SmartAuditReport(
            timestamp=datetime.now().strftime("%Y%m%d_%H%M%S"),
            total_files=len(file_analyses),
            overall_score=overall_score,
            category_scores=avg_category_scores,
            content_type_distribution=dict(content_type_distribution),
            code_intensity_distribution=dict(code_intensity_distribution),
            avg_rules_applied=avg_rules_applied,
            avg_rules_excluded=avg_rules_excluded,
            query_pattern_coverage=query_coverage,
            file_analyses=file_analyses,
            critical_issues=critical_issues,
            top_recommendations=recommendations,
            baseline_hash=baseline_hash
        )

    def analyze_file_smart(self, file_path: str) -> SmartDocumentAnalysis:
        """Smart analysis that adapts scoring based on content classification"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return SmartDocumentAnalysis(
                file_path=file_path,
                title="ERROR_READING_FILE",
                content_type="unknown",
                code_intensity="none",
                word_count=0,
                code_blocks=0,
                code_examples_complete=0,
                code_examples_incomplete=0,
                context_clarity_score=0.0,
                error_first_sections=0,
                error_coverage_score=0.0,
                qa_format_sections=0,
                cross_references=0,
                progressive_structure_score=0.0,
                searchability_score=0.0,
                smart_llm_score=0.0,
                rules_applied=[],
                rules_excluded=[],
                issues=[f"Could not read file: {e}"],
                recommendations=[]
            )
        
        # Classify content first
        classification = self.classifier.classify_file(file_path, content)
        
        # Extract frontmatter and content
        frontmatter, body = self._parse_frontmatter(content)
        title = frontmatter.get('title', Path(file_path).stem)
        
        # Analyze content
        word_count = len(body.split())
        code_blocks = len(re.findall(r'```[\s\S]*?```', body))
        
        # Code example analysis
        complete_examples, incomplete_examples = self._analyze_code_examples(body)
        
        # Apply scoring rules based on classification
        rules_applied = []
        rules_excluded = []
        
        # Context clarity (only for code-heavy content)
        if classification.code_intensity in [CodeIntensity.MODERATE, CodeIntensity.HEAVY]:
            context_clarity = self._analyze_context_clarity(body)
            rules_applied.append('context_clarity')
        else:
            context_clarity = 1.0  # Perfect score for non-code content
            rules_excluded.append('context_clarity')
        
        # Error-first sections (only for tutorials and troubleshooting)
        if classification.content_type in [ContentType.TUTORIAL, ContentType.TROUBLESHOOTING]:
            error_sections = self._count_error_sections(body)
            has_risky_code = self._has_risky_code_without_error_handling(body)
            if has_risky_code:
                error_coverage_score = 1.0 if error_sections > 0 else 0.0
            else:
                error_coverage_score = 1.0
            rules_applied.append('error_coverage')
        else:
            error_sections = 0
            error_coverage_score = 1.0  # N/A = perfect score
            rules_excluded.append('error_coverage')
        
        # Q&A format sections (reduced weight for reference docs)
        qa_sections = self._count_qa_sections(body)
        rules_applied.append('qa_format')  # Always apply but weight is adjusted
        
        # Cross-references (always important)
        cross_refs = self._count_cross_references(body)
        rules_applied.append('cross_references')
        
        # Progressive structure (always important)
        progressive_score = self._analyze_progressive_structure(body, file_path)
        rules_applied.append('progressive_structure')
        
        # Searchability (always important)
        searchability_score = self._analyze_searchability(body, title)
        rules_applied.append('searchability')
        
        # Code completeness (only for code-heavy content)
        if classification.code_intensity in [CodeIntensity.MODERATE, CodeIntensity.HEAVY] and code_blocks > 0:
            code_completeness_score = complete_examples / code_blocks
            rules_applied.append('code_completeness')
        else:
            code_completeness_score = 1.0  # Perfect score when no code to evaluate
            if code_blocks > 0:
                rules_excluded.append('code_completeness')
        
        # Calculate smart LLM score with dynamic weights
        smart_score = self._calculate_smart_file_score({
            'context_clarity': context_clarity,
            'code_completeness': code_completeness_score,
            'error_coverage': error_coverage_score,
            'qa_format': 1.0 if qa_sections > 0 else 0.0,
            'progressive_structure': progressive_score,
            'searchability': searchability_score,
            'cross_references': min(1.0, cross_refs / 5.0)
        }, classification, rules_applied)
        
        # Generate smart issues and recommendations
        issues = self._identify_smart_file_issues(body, complete_examples, incomplete_examples, classification)
        recommendations = self._generate_smart_file_recommendations(body, classification, context_clarity, error_sections)
        
        return SmartDocumentAnalysis(
            file_path=file_path,
            title=title,
            content_type=classification.content_type.value,
            code_intensity=classification.code_intensity.value,
            word_count=word_count,
            code_blocks=code_blocks,
            code_examples_complete=complete_examples,
            code_examples_incomplete=incomplete_examples,
            context_clarity_score=context_clarity,
            error_first_sections=error_sections,
            error_coverage_score=error_coverage_score,
            qa_format_sections=qa_sections,
            cross_references=cross_refs,
            progressive_structure_score=progressive_score,
            searchability_score=searchability_score,
            smart_llm_score=smart_score,
            rules_applied=rules_applied,
            rules_excluded=rules_excluded,
            issues=issues,
            recommendations=recommendations
        )

    def _calculate_smart_file_score(self, scores: Dict[str, float], classification, rules_applied: List[str]) -> float:
        """Calculate LLM score with dynamic weights based on content classification"""
        
        # Adjust weights based on content type and applicable rules
        adjusted_weights = {}
        total_weight = 0
        
        for category, base_weight in self.base_scoring_weights.items():
            if category in rules_applied:
                # Apply content-type specific adjustments
                weight_multiplier = 1.0
                
                if category == 'qa_format' and classification.content_type == ContentType.REFERENCE:
                    weight_multiplier = 0.5  # Reduce Q&A weight for reference docs
                elif category == 'progressive_structure' and classification.content_type == ContentType.TUTORIAL:
                    weight_multiplier = 1.5  # Increase importance for tutorials
                elif category == 'context_clarity' and classification.code_intensity == CodeIntensity.HEAVY:
                    weight_multiplier = 1.3  # Increase importance for heavy code content
                
                adjusted_weights[category] = base_weight * weight_multiplier
                total_weight += adjusted_weights[category]
        
        # Normalize weights to sum to 1.0
        if total_weight > 0:
            for category in adjusted_weights:
                adjusted_weights[category] /= total_weight
        
        # Calculate weighted score
        score = sum(
            scores[category] * adjusted_weights.get(category, 0)
            for category in scores
            if category in adjusted_weights
        )
        
        return min(1.0, max(0.0, score))

    def _calculate_smart_overall_score(self, category_scores: Dict[str, float], file_analyses: List[SmartDocumentAnalysis]) -> float:
        """Calculate overall score considering the distribution of content types"""
        
        # Weight categories based on how many files they actually apply to
        total_files = len(file_analyses)
        category_weights = {}
        
        for category in self.base_scoring_weights:
            applicable_files = sum(1 for analysis in file_analyses if category in analysis.rules_applied)
            if applicable_files > 0:
                # Weight by how widely applicable the category is
                applicability_ratio = applicable_files / total_files
                category_weights[category] = self.base_scoring_weights[category] * applicability_ratio
        
        # Normalize weights
        total_weight = sum(category_weights.values())
        if total_weight > 0:
            for category in category_weights:
                category_weights[category] /= total_weight
        
        # Calculate weighted overall score
        overall_score = sum(
            category_scores.get(category, 0) * weight
            for category, weight in category_weights.items()
        )
        
        return min(1.0, max(0.0, overall_score))

    # Include all the helper methods from the original analyzer
    # (I'll include the essential ones - the rest remain the same)
    
    def _parse_frontmatter(self, content: str) -> Tuple[Dict[str, Any], str]:
        """Parse YAML frontmatter from markdown"""
        if content.startswith('---\n'):
            try:
                end_idx = content.find('\n---\n', 4)
                if end_idx != -1:
                    frontmatter_str = content[4:end_idx]
                    frontmatter = yaml.safe_load(frontmatter_str)
                    body = content[end_idx + 5:]
                    return frontmatter or {}, body
            except yaml.YAMLError:
                pass
        return {}, content

    def _analyze_code_examples(self, content: str) -> Tuple[int, int]:
        """Analyze code examples for completeness"""
        js_blocks = re.findall(r'```(?:javascript|js|typescript|ts)\n(.*?)```', content, re.DOTALL | re.IGNORECASE)
        
        complete_count = 0
        incomplete_count = 0
        
        for block in js_blocks:
            # Check for completeness indicators
            has_imports = any(keyword in block for keyword in ['import', 'require', 'from'])
            has_variables = any(keyword in block for keyword in ['const', 'let', 'var'])
            has_functions = 'function' in block or '=>' in block
            
            # Simple heuristic: if it has imports or is very short, consider it complete
            if has_imports or len(block.strip().split('\n')) <= 3:
                complete_count += 1
            elif has_variables or has_functions:
                # More complex code without imports is likely incomplete
                incomplete_count += 1
            else:
                # Simple examples are OK
                complete_count += 1
        
        return complete_count, incomplete_count

    def _analyze_context_clarity(self, content: str) -> float:
        """Analyze how well the document distinguishes UI vs Sandbox contexts"""
        js_blocks = re.findall(r'```(?:javascript|js|typescript|ts)\n(.*?)```', content, re.DOTALL | re.IGNORECASE)
        
        if not js_blocks:
            return 1.0  # No code blocks to confuse = perfect clarity
        
        context_indicators = 0
        total_blocks = len(js_blocks)
        
        # Look for context headers or clear indicators
        for i, block in enumerate(js_blocks):
            # Check preceding context (look back in content for headers)
            block_start = content.find(f'```javascript\n{block}') or content.find(f'```js\n{block}')
            if block_start > 0:
                preceding_text = content[max(0, block_start - 200):block_start].lower()
                
                if any(indicator in preceding_text for indicator in 
                       ['runtime', 'sandbox', 'ui', 'document', 'code.js', 'index.js']):
                    context_indicators += 1
                elif any(indicator in block.lower() for indicator in 
                        ['addonsdk', 'runtime', 'editor', 'document']):
                    context_indicators += 1
        
        return context_indicators / total_blocks if total_blocks > 0 else 1.0

    def _count_error_sections(self, content: str) -> int:
        """Count sections dedicated to error handling or troubleshooting"""
        error_patterns = [
            r'#+.*(?:error|Error|ERROR)',
            r'#+.*(?:troubleshoot|Troubleshoot|TROUBLESHOOT)',
            r'#+.*(?:problem|Problem|PROBLEM)',
            r'#+.*(?:issue|Issue|ISSUE)',
            r'#+.*(?:fix|Fix|FIX)',
            r'#+.*(?:solution|Solution|SOLUTION)'
        ]
        
        total_sections = 0
        for pattern in error_patterns:
            total_sections += len(re.findall(pattern, content, re.MULTILINE))
        
        return total_sections

    def _has_risky_code_without_error_handling(self, content: str) -> bool:
        """Check if document has risky operations that should include error handling"""
        risky_patterns = [
            r'fetch\s*\(',
            r'axios\.',
            r'\.then\s*\(',
            r'async\s+function',
            r'await\s+',
            r'JSON\.parse\s*\(',
            r'localStorage\.',
            r'sessionStorage\.',
            r'window\.',
            r'document\.'
        ]
        
        return any(re.search(pattern, content, re.IGNORECASE) for pattern in risky_patterns)

    def _count_qa_sections(self, content: str) -> int:
        """Enhanced Q&A section detection"""
        # FAQ section headers
        faq_headers = len(re.findall(r'^#+.*(?:FAQ|Frequently Asked Questions|Questions|Q&A)', content, re.MULTILINE | re.IGNORECASE))
        
        # Question-style headers
        question_headers = len(re.findall(r'^#+.*\?', content, re.MULTILINE))
        
        # Q: A: patterns
        qa_patterns = len(re.findall(r'^\s*(?:\*\*)?Q(?:uestion)?(?:\*\*)?\s*:.*?^\s*(?:\*\*)?A(?:nswer)?(?:\*\*)?\s*:', content, re.MULTILINE | re.DOTALL | re.IGNORECASE))
        
        # Bonus points for FAQ keywords
        faq_bonus = 2 if any(keyword in content.lower() for keyword in ['faq', 'frequently asked questions']) else 0
        
        total_qa_sections = faq_headers + question_headers + qa_patterns + faq_bonus
        
        return min(total_qa_sections, 10) if total_qa_sections > 0 else 0

    def _count_cross_references(self, content: str) -> int:
        """Count internal links and cross-references"""
        internal_links = len(re.findall(r'\[.*?\]\([^h].*?\)', content))  # Exclude external links starting with http
        see_also_refs = len(re.findall(r'see also|also see|related|refer to', content, re.IGNORECASE))
        
        return internal_links + see_also_refs

    def _analyze_progressive_structure(self, content: str, file_path: str) -> float:
        """Analyze if content has a logical learning progression"""
        headers = re.findall(r'^(#+)\s+(.+)', content, re.MULTILINE)
        
        if len(headers) < 2:
            return 0.3  # Minimal structure
        
        # Check for common progressive patterns
        progressive_indicators = [
            'introduction', 'getting started', 'basic', 'advanced',
            'prerequisite', 'requirement', 'step', 'first', 'next',
            'example', 'tutorial', 'guide'
        ]
        
        progressive_score = 0
        for level, title in headers:
            title_lower = title.lower()
            if any(indicator in title_lower for indicator in progressive_indicators):
                progressive_score += 1
        
        # Normalize based on number of headers
        base_score = min(1.0, progressive_score / len(headers))
        
        # Boost score for tutorial files
        if 'tutorial' in file_path.lower() or 'guide' in file_path.lower():
            base_score = min(1.0, base_score * 1.2)
        
        return base_score

    def _analyze_searchability(self, content: str, title: str) -> float:
        """Analyze how searchable the content is for LLMs"""
        # Count descriptive headers
        headers = re.findall(r'^#+\s+(.+)', content, re.MULTILINE)
        
        if not headers:
            return 0.2
        
        searchable_headers = 0
        for header in headers:
            # Good headers contain keywords, questions, or descriptive phrases
            if (len(header.split()) >= 3 or 
                '?' in header or 
                any(keyword in header.lower() for keyword in 
                    ['how', 'what', 'why', 'when', 'where', 'example', 'guide', 'tutorial'])):
                searchable_headers += 1
        
        header_score = searchable_headers / len(headers)
        
        # Factor in title quality
        title_score = 1.0 if len(title.split()) >= 3 else 0.5
        
        return (header_score * 0.8) + (title_score * 0.2)

    def _calculate_query_pattern_coverage(self, file_paths: List[str]) -> Dict[str, float]:
        """Calculate how well the documentation covers different query patterns"""
        coverage = {}
        
        for pattern_type, patterns in self.query_patterns.items():
            if not patterns:
                coverage[pattern_type] = 1.0
                continue
                
            total_patterns = len(patterns)
            covered_patterns = 0
            
            for pattern in patterns:
                # Simple heuristic: if any file path contains keywords from the pattern
                pattern_keywords = pattern.lower().split()
                if any(any(keyword in str(fp).lower() for keyword in pattern_keywords) for fp in file_paths):
                    covered_patterns += 1
            
            coverage[pattern_type] = covered_patterns / total_patterns if total_patterns > 0 else 1.0
        
        return coverage

    def _identify_smart_file_issues(self, content: str, complete_examples: int, incomplete_examples: int, classification) -> List[str]:
        """Identify issues relevant to the specific content type"""
        issues = []
        
        # Only flag code issues for code-heavy content
        if classification.code_intensity in [CodeIntensity.MODERATE, CodeIntensity.HEAVY]:
            if incomplete_examples > complete_examples:
                issues.append(f"Code examples may be incomplete ({incomplete_examples} incomplete vs {complete_examples} complete)")
                
            if not re.search(r'runtime|sandbox|ui|document', content, re.IGNORECASE):
                issues.append("Code lacks clear UI Runtime vs Document Sandbox context")
        
        # Only flag error documentation for tutorials
        if classification.content_type == ContentType.TUTORIAL:
            if self._has_risky_code_without_error_handling(content) and self._count_error_sections(content) == 0:
                issues.append("Tutorial contains risky operations but lacks error handling documentation")
        
        # Flag structural issues for all content types
        if len(re.findall(r'^#+', content, re.MULTILINE)) < 2:
            issues.append("Minimal heading structure may reduce searchability")
        
        return issues

    def _generate_smart_file_recommendations(self, content: str, classification, context_clarity: float, error_sections: int) -> List[str]:
        """Generate recommendations specific to content type"""
        recommendations = []
        
        # Code-specific recommendations
        if classification.code_intensity in [CodeIntensity.MODERATE, CodeIntensity.HEAVY]:
            if context_clarity < 0.5:
                recommendations.append("Add headers like '### UI Runtime (index.js)' and '### Document Sandbox (code.js)' before code blocks")
                
            js_blocks = len(re.findall(r'```(?:javascript|js)', content, re.IGNORECASE))
            if js_blocks > 0:
                recommendations.append("Ensure all JavaScript examples include necessary import statements")
        
        # Tutorial-specific recommendations
        if classification.content_type == ContentType.TUTORIAL:
            if error_sections == 0:
                recommendations.append("Add a troubleshooting or common issues section")
                
            if not re.search(r'step|first|next|then', content, re.IGNORECASE):
                recommendations.append("Use step-by-step language to improve tutorial flow")
        
        # Q&A recommendations (lower priority for reference docs)
        if classification.content_type != ContentType.REFERENCE:
            qa_sections = self._count_qa_sections(content)
            if qa_sections == 0:
                recommendations.append("Consider restructuring content with Q&A format for better LLM training")
        
        return recommendations

    def _identify_critical_issues_smart(self, file_analyses: List[SmartDocumentAnalysis]) -> List[str]:
        """Identify critical issues across the documentation considering content types"""
        issues = []
        
        # Analyze by content type
        tutorial_files = [a for a in file_analyses if a.content_type == 'tutorial']
        heavy_code_files = [a for a in file_analyses if a.code_intensity == 'heavy']
        
        if tutorial_files:
            avg_tutorial_score = sum(a.smart_llm_score for a in tutorial_files) / len(tutorial_files)
            if avg_tutorial_score < 0.6:
                issues.append(f"Tutorial content quality is below target ({avg_tutorial_score:.2f}/1.00)")
        
        if heavy_code_files:
            low_context_files = [a for a in heavy_code_files if a.context_clarity_score < 0.5]
            if len(low_context_files) > len(heavy_code_files) * 0.3:
                issues.append(f"{len(low_context_files)} code-heavy files lack clear UI/Sandbox context")
        
        # Overall issues
        low_scoring_files = [a for a in file_analyses if a.smart_llm_score < 0.4]
        if len(low_scoring_files) > len(file_analyses) * 0.1:
            issues.append(f"{len(low_scoring_files)} files have critically low LLM readiness scores")
        
        return issues

    def _generate_smart_recommendations(self, file_analyses: List[SmartDocumentAnalysis], content_distribution: Dict[str, int]) -> List[str]:
        """Generate strategic recommendations based on content analysis"""
        recommendations = []
        
        # Tutorial-specific recommendations
        if content_distribution.get('tutorial', 0) > 0:
            tutorial_files = [a for a in file_analyses if a.content_type == 'tutorial']
            tutorial_with_errors = sum(1 for a in tutorial_files if a.error_first_sections > 0)
            if tutorial_with_errors < len(tutorial_files) * 0.7:
                recommendations.append("Priority: Add error handling sections to tutorial content")
        
        # Code-heavy content recommendations
        heavy_code_count = content_distribution.get('heavy', 0)
        if heavy_code_count > 0:
            heavy_files = [a for a in file_analyses if a.code_intensity == 'heavy']
            low_context_count = sum(1 for a in heavy_files if a.context_clarity_score < 0.7)
            if low_context_count > heavy_code_count * 0.3:
                recommendations.append("Priority: Add context headers to code-heavy documentation")
        
        # Overall Q&A format recommendation
        non_reference_files = [a for a in file_analyses if a.content_type != 'reference']
        qa_adoption = sum(1 for a in non_reference_files if a.qa_format_sections > 0)
        if qa_adoption < len(non_reference_files) * 0.3:
            recommendations.append("Medium: Convert content to Q&A format for better LLM training")
        
        return recommendations

    def _generate_baseline_hash(self, file_paths: List[str]) -> str:
        """Generate a hash for baseline comparison"""
        content = ''.join(sorted(file_paths))
        return hashlib.md5(content.encode()).hexdigest()[:16]


def main():
    """Main execution function"""
    parser = argparse.ArgumentParser(description='Smart LLM Readiness Analyzer with Content Classification')
    parser.add_argument('--docs-path', required=True, help='Path to documentation directory or file')
    parser.add_argument('--output', default='smart_llm_audit.json', help='Output JSON file')
    parser.add_argument('--query-data', default='structured_query_data.json', help='Path to structured query data')
    parser.add_argument('--baseline', action='store_true', help='Generate baseline report')
    parser.add_argument('--compare', help='Compare against baseline report')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    # Initialize smart auditor
    auditor = SmartDocumentationAuditor(args.query_data)
    
    # Run audit
    print("🧠 Smart LLM Readiness Analysis Starting...")
    report = auditor.audit_directory(args.docs_path)
    
    # Save results
    with open(args.output, 'w') as f:
        json.dump(asdict(report), f, indent=2)
    
    # Print summary
    print(f"\n✅ Smart analysis complete!")
    print(f"📊 Overall LLM Readiness: {report.overall_score:.3f}/1.00 ({report.overall_score*100:.1f}%)")
    print(f"📁 Files Analyzed: {report.total_files}")
    print(f"🎯 Avg Rules Applied: {report.avg_rules_applied:.1f}/{report.avg_rules_applied + report.avg_rules_excluded:.1f}")
    
    print(f"\n📚 Content Distribution:")
    for content_type, count in report.content_type_distribution.items():
        print(f"   {content_type.title()}: {count} files")
    
    print(f"\n💻 Code Intensity:")
    for intensity, count in report.code_intensity_distribution.items():
        print(f"   {intensity.title()}: {count} files")
    
    if report.critical_issues:
        print(f"\n🚨 Critical Issues:")
        for issue in report.critical_issues:
            print(f"   • {issue}")
    
    print(f"\n📋 Report saved to: {args.output}")
    print(f"💡 Use python3 scripts/generate_llm_analysis_report.py --input {args.output} to generate markdown report")


if __name__ == "__main__":
    main() 