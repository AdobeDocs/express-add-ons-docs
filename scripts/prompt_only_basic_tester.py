#!/usr/bin/env python3
"""
Query-Based Documentation Tester for Adobe Express Add-ons

Tests documentation against real developer queries to evaluate:
- Query answerability
- Expected element coverage
- Content gaps
- LLM-readiness for specific use cases

Works with unified queries from test_prompts/unified_test_queries.json
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime
import difflib


@dataclass
class UnifiedQuery:
    """Standardized query format for testing"""
    query: str
    category: str
    subcategory: Optional[str] = None
    priority: str = "medium"
    expected_elements: List[str] = None
    common_errors: List[str] = None
    source_file: str = ""
    metadata: Dict[str, Any] = None

    def __post_init__(self):
        if self.expected_elements is None:
            self.expected_elements = []
        if self.common_errors is None:
            self.common_errors = []
        if self.metadata is None:
            self.metadata = {}


@dataclass
class QueryTestResult:
    """Result of testing a query against documentation"""
    query: UnifiedQuery
    found_in_files: List[str]
    coverage_score: float  # 0.0 to 1.0
    expected_elements_found: List[str]
    expected_elements_missing: List[str]
    relevant_content_snippets: List[str]
    answerable: bool
    confidence: float  # 0.0 to 1.0
    issues: List[str]
    suggestions: List[str]


@dataclass
class DocumentationTestReport:
    """Comprehensive test report for documentation vs queries"""
    total_queries: int
    answerable_queries: int
    high_confidence_answers: int
    coverage_by_category: Dict[str, float]
    worst_performing_categories: List[str]
    missing_content_areas: List[str]
    suggested_improvements: List[str]
    detailed_results: List[QueryTestResult]


class QueryBasedDocTester:
    """Tests documentation against developer queries"""
    
    def __init__(self, docs_root: str = "src/pages"):
        self.docs_root = Path(docs_root)
        self.doc_cache: Dict[str, str] = {}
        self.file_index: Dict[str, List[str]] = {}  # word -> files containing it
        
    def load_documentation(self):
        """Load and index all documentation files"""
        print("📚 Loading documentation files...")
        
        self.doc_cache = {}
        self.file_index = {}
        
        markdown_files = list(self.docs_root.glob("**/*.md"))
        
        for file_path in markdown_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                relative_path = str(file_path.relative_to(self.docs_root.parent.parent))
                self.doc_cache[relative_path] = content
                
                # Build word index for faster searching
                words = re.findall(r'\b\w+\b', content.lower())
                for word in set(words):
                    if word not in self.file_index:
                        self.file_index[word] = []
                    self.file_index[word].append(relative_path)
                        
            except Exception as e:
                print(f"⚠️ Error loading {file_path}: {e}")
        
        print(f"✅ Loaded {len(self.doc_cache)} documentation files")
    
    def test_all_queries(self, queries: List[UnifiedQuery], 
                        max_queries: Optional[int] = None) -> DocumentationTestReport:
        """Test documentation against all queries"""
        if not self.doc_cache:
            self.load_documentation()
        
        test_queries = queries[:max_queries] if max_queries else queries
        results = []
        
        print(f"\n🧪 Testing {len(test_queries)} queries against documentation...")
        
        for i, query in enumerate(test_queries):
            if i % 10 == 0:
                print(f"Progress: {i+1}/{len(test_queries)} queries tested")
            
            result = self._test_single_query(query)
            results.append(result)
        
        return self._generate_report(results)
    
    def _test_single_query(self, query: UnifiedQuery) -> QueryTestResult:
        """Test a single query against documentation"""
        
        # Find relevant files using keyword search
        relevant_files = self._find_relevant_files(query)
        
        # Check for expected elements in found files
        expected_found, expected_missing = self._check_expected_elements(
            query, relevant_files
        )
        
        # Calculate coverage score
        coverage_score = self._calculate_coverage_score(query, relevant_files)
        
        # Determine if query is answerable
        answerable, confidence = self._assess_answerability(
            query, relevant_files, expected_found
        )
        
        # Extract relevant content snippets
        snippets = self._extract_relevant_snippets(query, relevant_files)
        
        # Identify issues and suggestions
        issues, suggestions = self._analyze_gaps(query, relevant_files, expected_missing)
        
        return QueryTestResult(
            query=query,
            found_in_files=relevant_files,
            coverage_score=coverage_score,
            expected_elements_found=expected_found,
            expected_elements_missing=expected_missing,
            relevant_content_snippets=snippets,
            answerable=answerable,
            confidence=confidence,
            issues=issues,
            suggestions=suggestions
        )
    
    def _find_relevant_files(self, query: UnifiedQuery) -> List[str]:
        """Find documentation files relevant to the query"""
        query_words = re.findall(r'\b\w+\b', query.query.lower())
        query_words.extend(query.expected_elements)
        
        # Common tech words to filter out
        stop_words = {'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'how', 'what', 'where', 'when', 'why', 'i', 'you', 'my', 'an', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'}
        
        # Score files by relevance
        file_scores = {}
        
        for word in query_words:
            word_lower = word.lower()
            if word_lower in stop_words or len(word_lower) < 3:
                continue
                
            # Direct word matches
            if word_lower in self.file_index:
                for file_path in self.file_index[word_lower]:
                    file_scores[file_path] = file_scores.get(file_path, 0) + 1
            
            # Partial matches for compound words
            for indexed_word, files in self.file_index.items():
                if word_lower in indexed_word or indexed_word in word_lower:
                    for file_path in files:
                        file_scores[file_path] = file_scores.get(file_path, 0) + 0.5
        
        # Sort by relevance score and return top matches
        sorted_files = sorted(file_scores.items(), key=lambda x: x[1], reverse=True)
        return [file_path for file_path, score in sorted_files if score >= 1.0]
    
    def _check_expected_elements(self, query: UnifiedQuery, 
                               relevant_files: List[str]) -> Tuple[List[str], List[str]]:
        """Check which expected elements are found/missing in documentation"""
        found = []
        missing = []
        
        if not query.expected_elements:
            return found, missing
        
        # Combine content from relevant files
        combined_content = ""
        for file_path in relevant_files:
            if file_path in self.doc_cache:
                combined_content += self.doc_cache[file_path] + "\n"
        
        combined_lower = combined_content.lower()
        
        for element in query.expected_elements:
            element_lower = element.lower()
            
            # Check for exact matches, partial matches, and variations
            if (element_lower in combined_lower or 
                element.replace('.', '') in combined_content or
                element.replace('()', '') in combined_content):
                found.append(element)
            else:
                missing.append(element)
        
        return found, missing
    
    def _calculate_coverage_score(self, query: UnifiedQuery, relevant_files: List[str]) -> float:
        """Calculate how well documentation covers the query (0.0 to 1.0)"""
        if not relevant_files:
            return 0.0
        
        score = 0.0
        max_score = 0.0
        
        # Base score for having relevant files
        score += min(len(relevant_files) * 0.2, 0.6)
        max_score += 0.6
        
        # Score for expected elements
        if query.expected_elements:
            found, missing = self._check_expected_elements(query, relevant_files)
            element_score = len(found) / len(query.expected_elements) * 0.4
            score += element_score
        max_score += 0.4
        
        return min(score / max_score, 1.0) if max_score > 0 else 0.0
    
    def _assess_answerability(self, query: UnifiedQuery, relevant_files: List[str],
                            expected_found: List[str]) -> Tuple[bool, float]:
        """Assess if the query can be answered with confidence"""
        
        if not relevant_files:
            return False, 0.0
        
        confidence = 0.0
        
        # Confidence from file relevance
        confidence += min(len(relevant_files) * 0.1, 0.4)
        
        # Confidence from expected elements
        if query.expected_elements:
            element_ratio = len(expected_found) / len(query.expected_elements)
            confidence += element_ratio * 0.4
        else:
            confidence += 0.2  # Some confidence if no specific elements expected
        
        # Confidence from query complexity
        query_words = len(re.findall(r'\b\w+\b', query.query))
        if query_words <= 5:
            confidence += 0.2  # Simple queries easier to answer
        elif query_words <= 10:
            confidence += 0.1
        
        answerable = confidence >= 0.5 and len(relevant_files) >= 1
        
        return answerable, min(confidence, 1.0)
    
    def _extract_relevant_snippets(self, query: UnifiedQuery, 
                                 relevant_files: List[str]) -> List[str]:
        """Extract relevant content snippets from documentation"""
        snippets = []
        query_words = set(re.findall(r'\b\w+\b', query.query.lower()))
        
        for file_path in relevant_files[:3]:  # Limit to top 3 files
            if file_path not in self.doc_cache:
                continue
                
            content = self.doc_cache[file_path]
            lines = content.split('\n')
            
            # Find lines with query words
            relevant_lines = []
            for i, line in enumerate(lines):
                line_words = set(re.findall(r'\b\w+\b', line.lower()))
                if query_words.intersection(line_words):
                    # Include context (±2 lines)
                    start = max(0, i-2)
                    end = min(len(lines), i+3)
                    context = '\n'.join(lines[start:end])
                    relevant_lines.append((i, context))
            
            # Get best snippets
            for line_num, snippet in relevant_lines[:2]:  # Top 2 per file
                snippets.append(f"From {file_path} (line ~{line_num}):\n{snippet}")
        
        return snippets
    
    def _analyze_gaps(self, query: UnifiedQuery, relevant_files: List[str], 
                     missing_elements: List[str]) -> Tuple[List[str], List[str]]:
        """Analyze gaps and generate suggestions"""
        issues = []
        suggestions = []
        
        if not relevant_files:
            issues.append("No relevant documentation found")
            suggestions.append(f"Create documentation for: {query.category}")
        
        if missing_elements:
            issues.append(f"Missing expected elements: {', '.join(missing_elements)}")
            suggestions.append(f"Add examples/documentation for: {', '.join(missing_elements)}")
        
        if query.common_errors:
            # Check if common errors are addressed
            error_coverage = 0
            for file_path in relevant_files:
                if file_path in self.doc_cache:
                    content = self.doc_cache[file_path].lower()
                    for error in query.common_errors:
                        if error.lower() in content:
                            error_coverage += 1
            
            if error_coverage == 0:
                issues.append("Common errors not addressed in documentation")
                suggestions.append("Add troubleshooting section with common errors")
        
        return issues, suggestions
    
    def _generate_report(self, results: List[QueryTestResult]) -> DocumentationTestReport:
        """Generate comprehensive test report"""
        
        total_queries = len(results)
        answerable_queries = sum(1 for r in results if r.answerable)
        high_confidence = sum(1 for r in results if r.confidence >= 0.8)
        
        # Coverage by category
        category_stats = {}
        for result in results:
            category = result.query.category
            if category not in category_stats:
                category_stats[category] = []
            category_stats[category].append(result.coverage_score)
        
        coverage_by_category = {
            category: sum(scores) / len(scores)
            for category, scores in category_stats.items()
        }
        
        # Worst performing categories
        worst_categories = sorted(
            coverage_by_category.items(), 
            key=lambda x: x[1]
        )[:5]
        
        # Collect missing content areas
        missing_areas = set()
        all_suggestions = []
        
        for result in results:
            missing_areas.update(result.expected_elements_missing)
            all_suggestions.extend(result.suggestions)
        
        # Get top suggestions
        suggestion_counts = {}
        for suggestion in all_suggestions:
            suggestion_counts[suggestion] = suggestion_counts.get(suggestion, 0) + 1
        
        top_suggestions = sorted(
            suggestion_counts.items(), 
            key=lambda x: x[1], 
            reverse=True
        )[:10]
        
        return DocumentationTestReport(
            total_queries=total_queries,
            answerable_queries=answerable_queries,
            high_confidence_answers=high_confidence,
            coverage_by_category=coverage_by_category,
            worst_performing_categories=[cat for cat, score in worst_categories],
            missing_content_areas=list(missing_areas),
            suggested_improvements=[suggestion for suggestion, count in top_suggestions],
            detailed_results=results
        )
    
    def export_test_report(self, report: DocumentationTestReport, 
                          output_file: str = "query_test_report.json"):
        """Export detailed test report"""
        
        # Convert to serializable format
        export_data = {
            "metadata": {
                "test_date": datetime.now().isoformat(),
                "total_queries_tested": report.total_queries,
                "documentation_root": str(self.docs_root)
            },
            "summary": {
                "total_queries": report.total_queries,
                "answerable_queries": report.answerable_queries,
                "answerability_rate": report.answerable_queries / report.total_queries,
                "high_confidence_answers": report.high_confidence_answers,
                "high_confidence_rate": report.high_confidence_answers / report.total_queries,
                "coverage_by_category": report.coverage_by_category,
                "worst_performing_categories": report.worst_performing_categories
            },
            "gaps_analysis": {
                "missing_content_areas": report.missing_content_areas,
                "suggested_improvements": report.suggested_improvements
            },
            "detailed_results": [
                {
                    "query_text": result.query.query,
                    "category": result.query.category,
                    "priority": result.query.priority,
                    "found_in_files": result.found_in_files,
                    "coverage_score": result.coverage_score,
                    "answerable": result.answerable,
                    "confidence": result.confidence,
                    "expected_elements_found": result.expected_elements_found,
                    "expected_elements_missing": result.expected_elements_missing,
                    "issues": result.issues,
                    "suggestions": result.suggestions
                }
                for result in report.detailed_results
            ]
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Exported detailed test report to {output_file}")
        return output_file
    
    def print_summary_report(self, report: DocumentationTestReport):
        """Print a summary of the test report"""
        
        print("\n📊 QUERY-BASED DOCUMENTATION TEST RESULTS")
        print("=" * 60)
        
        answerability_rate = report.answerable_queries / report.total_queries * 100
        confidence_rate = report.high_confidence_answers / report.total_queries * 100
        
        print(f"\n📈 Overall Performance:")
        print(f"   Total Queries Tested: {report.total_queries}")
        print(f"   Answerable Queries: {report.answerable_queries} ({answerability_rate:.1f}%)")
        print(f"   High Confidence Answers: {report.high_confidence_answers} ({confidence_rate:.1f}%)")
        
        print(f"\n📂 Coverage by Category:")
        for category, score in sorted(report.coverage_by_category.items(), 
                                    key=lambda x: x[1], reverse=True):
            print(f"   {category}: {score:.2f}")
        
        print(f"\n⚠️ Worst Performing Categories:")
        for category in report.worst_performing_categories:
            score = report.coverage_by_category[category]
            print(f"   {category}: {score:.2f}")
        
        print(f"\n🔍 Top Missing Content Areas:")
        for area in report.missing_content_areas[:10]:
            print(f"   - {area}")
        
        print(f"\n💡 Top Improvement Suggestions:")
        for suggestion in report.suggested_improvements[:5]:
            print(f"   - {suggestion}")


def load_unified_queries() -> List[UnifiedQuery]:
    """Load queries from the unified test queries JSON file"""
    json_path = Path("test_prompts/unified_test_queries.json")
    
    if not json_path.exists():
        raise FileNotFoundError(f"Unified queries file not found: {json_path}")
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    queries = []
    for query_data in data.get('queries', []):
        # Convert JSON to UnifiedQuery object
        query = UnifiedQuery(
            query=query_data['query'],
            category=query_data['category'],
            subcategory=query_data.get('subcategory'),
            priority=query_data.get('priority', 'medium'),
            expected_elements=query_data.get('expected_elements', []),
            common_errors=query_data.get('common_errors', []),
            source_file=query_data.get('source_file', ''),
            metadata=query_data.get('metadata', {})
        )
        queries.append(query)
    
    print(f"📊 Loaded {len(queries)} queries from {json_path}")
    return queries


def main():
    """Demo the query-based documentation tester"""
    
    # Load queries from JSON file
    print("🔍 Loading test queries from unified_test_queries.json...")
    queries = load_unified_queries()
    
    # Test documentation
    tester = QueryBasedDocTester()
    
    # Test with a subset first (for demo)
    print(f"\n🧪 Testing with first 50 queries...")
    report = tester.test_all_queries(queries, max_queries=250)
    
    # Print summary
    tester.print_summary_report(report)
    
    # Export detailed report
    tester.export_test_report(report)


if __name__ == "__main__":
    main() 