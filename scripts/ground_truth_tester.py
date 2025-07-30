#!/usr/bin/env python3
"""
Ground Truth Documentation Tester for Adobe Express Add-ons

Tests documentation against verified ground truth Q&A pairs from labelled.yaml
to measure accuracy, coverage, and quality gaps for LLM readiness improvement.

This provides a benchmark for measuring documentation improvements over time.
"""

import os
import yaml
import json
import re
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime
import difflib
from collections import defaultdict


@dataclass
class GroundTruthPair:
    """A verified question-answer pair from ground truth dataset"""
    question: str
    answer: str
    category: str
    subcategory: Optional[str] = None
    
    
@dataclass
class GroundTruthTestResult:
    """Result of testing a ground truth pair against documentation"""
    pair: GroundTruthPair
    found_in_files: List[str]
    coverage_score: float  # How well docs cover the question (0.0-1.0)
    accuracy_score: float  # How accurate found content is vs ground truth (0.0-1.0)
    completeness_score: float  # How complete the answer coverage is (0.0-1.0)
    confidence: float  # Overall confidence in documentation quality (0.0-1.0)
    found_content_snippets: List[str]
    missing_concepts: List[str]
    inaccurate_content: List[str]
    improvement_suggestions: List[str]


@dataclass
class GroundTruthReport:
    """Comprehensive ground truth analysis report"""
    total_pairs: int
    overall_coverage_score: float
    overall_accuracy_score: float
    overall_completeness_score: float
    category_scores: Dict[str, Dict[str, float]]
    worst_performing_categories: List[str]
    critical_gaps: List[str]
    accuracy_issues: List[str]
    detailed_results: List[GroundTruthTestResult]
    improvement_priorities: List[str]


class GroundTruthTester:
    """Tests documentation against verified ground truth Q&A pairs"""
    
    def __init__(self, docs_root: str = "src/pages", ground_truth_file: str = "test_prompts/labelled.yaml"):
        self.docs_root = Path(docs_root)
        self.ground_truth_file = Path(ground_truth_file)
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
    
    def load_ground_truth(self) -> List[GroundTruthPair]:
        """Load ground truth Q&A pairs from labelled.yaml"""
        print(f"📖 Loading ground truth from {self.ground_truth_file}")
        
        if not self.ground_truth_file.exists():
            raise FileNotFoundError(f"Ground truth file not found: {self.ground_truth_file}")
        
        with open(self.ground_truth_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        pairs = []
        for category, items in data.items():
            if isinstance(items, list):
                for item in items:
                    if isinstance(item, dict) and 'prompt' in item and 'answer' in item:
                        pair = GroundTruthPair(
                            question=item['prompt'].strip(),
                            answer=item['answer'].strip(),
                            category=category,
                            subcategory=item.get('subcategory')
                        )
                        pairs.append(pair)
        
        print(f"✅ Loaded {len(pairs)} ground truth Q&A pairs from {len(data)} categories")
        return pairs
    
    def test_all_pairs(self, max_pairs: Optional[int] = None) -> GroundTruthReport:
        """Test documentation against all ground truth pairs"""
        if not self.doc_cache:
            self.load_documentation()
        
        ground_truth_pairs = self.load_ground_truth()
        test_pairs = ground_truth_pairs[:max_pairs] if max_pairs else ground_truth_pairs
        
        print(f"\n🧪 Testing {len(test_pairs)} ground truth pairs against documentation...")
        
        results = []
        for i, pair in enumerate(test_pairs):
            if i % 20 == 0:
                print(f"Progress: {i+1}/{len(test_pairs)} pairs tested")
            
            result = self._test_single_pair(pair)
            results.append(result)
        
        return self._generate_report(results)
    
    def _test_single_pair(self, pair: GroundTruthPair) -> GroundTruthTestResult:
        """Test a single ground truth pair against documentation"""
        
        # Find relevant files for the question
        relevant_files = self._find_relevant_files(pair.question)
        
        # Extract content snippets from relevant files
        content_snippets = self._extract_content_snippets(pair, relevant_files)
        
        # Calculate coverage score (how well docs address the question)
        coverage_score = self._calculate_coverage_score(pair, relevant_files, content_snippets)
        
        # Calculate accuracy score (how accurate the found content is)
        accuracy_score = self._calculate_accuracy_score(pair, content_snippets)
        
        # Calculate completeness score (how complete the answer coverage is)
        completeness_score = self._calculate_completeness_score(pair, content_snippets)
        
        # Overall confidence combining all scores
        confidence = (coverage_score * 0.3 + accuracy_score * 0.4 + completeness_score * 0.3)
        
        # Identify missing concepts and inaccuracies
        missing_concepts = self._identify_missing_concepts(pair, content_snippets)
        inaccurate_content = self._identify_inaccuracies(pair, content_snippets)
        
        # Generate improvement suggestions
        suggestions = self._generate_improvement_suggestions(pair, coverage_score, accuracy_score, completeness_score, missing_concepts)
        
        return GroundTruthTestResult(
            pair=pair,
            found_in_files=relevant_files,
            coverage_score=coverage_score,
            accuracy_score=accuracy_score,
            completeness_score=completeness_score,
            confidence=confidence,
            found_content_snippets=content_snippets,
            missing_concepts=missing_concepts,
            inaccurate_content=inaccurate_content,
            improvement_suggestions=suggestions
        )
    
    def _find_relevant_files(self, question: str) -> List[str]:
        """Find documentation files most relevant to the question"""
        question_words = re.findall(r'\b\w+\b', question.lower())
        
        # Filter out common stop words
        stop_words = {'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 
                     'how', 'what', 'where', 'when', 'why', 'i', 'you', 'my', 'an', 'a', 'is', 
                     'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 
                     'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 
                     'can', 'this', 'that', 'these', 'those'}
        
        # Score files by relevance
        file_scores = defaultdict(float)
        
        for word in question_words:
            word_lower = word.lower()
            if word_lower in stop_words or len(word_lower) < 3:
                continue
                
            # Direct word matches (higher weight)
            if word_lower in self.file_index:
                for file_path in self.file_index[word_lower]:
                    file_scores[file_path] += 2.0
            
            # Partial matches for compound words
            for indexed_word, files in self.file_index.items():
                if word_lower in indexed_word or indexed_word in word_lower:
                    for file_path in files:
                        file_scores[file_path] += 0.5
        
        # Sort by relevance score and return top matches
        sorted_files = sorted(file_scores.items(), key=lambda x: x[1], reverse=True)
        return [file_path for file_path, score in sorted_files[:10] if score >= 1.0]
    
    def _extract_content_snippets(self, pair: GroundTruthPair, relevant_files: List[str]) -> List[str]:
        """Extract relevant content snippets from documentation"""
        snippets = []
        question_words = set(re.findall(r'\b\w+\b', pair.question.lower()))
        
        for file_path in relevant_files[:5]:  # Limit to top 5 files
            if file_path not in self.doc_cache:
                continue
                
            content = self.doc_cache[file_path]
            paragraphs = re.split(r'\n\s*\n', content)
            
            # Find paragraphs that contain question keywords
            for paragraph in paragraphs:
                paragraph_words = set(re.findall(r'\b\w+\b', paragraph.lower()))
                if question_words.intersection(paragraph_words):
                    # Clean up the paragraph
                    clean_paragraph = re.sub(r'```[^`]*```', '[CODE BLOCK]', paragraph)
                    clean_paragraph = re.sub(r'\n+', ' ', clean_paragraph).strip()
                    if len(clean_paragraph) > 50:  # Only include substantial content
                        snippets.append(f"From {file_path}:\n{clean_paragraph}")
        
        return snippets[:10]  # Return top 10 most relevant snippets
    
    def _calculate_coverage_score(self, pair: GroundTruthPair, relevant_files: List[str], content_snippets: List[str]) -> float:
        """Calculate how well documentation covers the question topic"""
        if not relevant_files:
            return 0.0
        
        score = 0.0
        
        # Base score for having relevant files
        score += min(len(relevant_files) * 0.15, 0.6)
        
        # Score for having substantial content
        score += min(len(content_snippets) * 0.1, 0.4)
        
        return min(score, 1.0)
    
    def _calculate_accuracy_score(self, pair: GroundTruthPair, content_snippets: List[str]) -> float:
        """Calculate accuracy by comparing found content with ground truth answer"""
        if not content_snippets:
            return 0.0
        
        # Combine all found content
        found_content = " ".join(content_snippets).lower()
        ground_truth = pair.answer.lower()
        
        # Extract key concepts from ground truth answer
        gt_concepts = self._extract_key_concepts(pair.answer)
        
        # Check how many ground truth concepts are covered
        covered_concepts = 0
        for concept in gt_concepts:
            if concept.lower() in found_content:
                covered_concepts += 1
        
        if not gt_concepts:
            return 0.5  # Neutral score if no clear concepts
        
        concept_coverage = covered_concepts / len(gt_concepts)
        
        # Use similarity ratio as additional measure
        similarity = difflib.SequenceMatcher(None, found_content[:1000], ground_truth[:1000]).ratio()
        
        # Combine concept coverage and similarity
        accuracy = (concept_coverage * 0.7 + similarity * 0.3)
        return min(accuracy, 1.0)
    
    def _calculate_completeness_score(self, pair: GroundTruthPair, content_snippets: List[str]) -> float:
        """Calculate how complete the answer coverage is"""
        if not content_snippets:
            return 0.0
        
        # Analyze ground truth answer structure
        gt_has_code = bool(re.search(r'```|`[^`]+`', pair.answer))
        gt_has_steps = bool(re.search(r'(\d+\.|step \d+|first|second|third)', pair.answer, re.IGNORECASE))
        gt_has_examples = bool(re.search(r'(example|for instance|such as)', pair.answer, re.IGNORECASE))
        
        found_content = " ".join(content_snippets)
        found_has_code = bool(re.search(r'```|`[^`]+`', found_content))
        found_has_steps = bool(re.search(r'(\d+\.|step \d+|first|second|third)', found_content, re.IGNORECASE))
        found_has_examples = bool(re.search(r'(example|for instance|such as)', found_content, re.IGNORECASE))
        
        completeness = 0.0
        
        # Check structural completeness
        if gt_has_code and found_has_code:
            completeness += 0.4
        elif not gt_has_code:
            completeness += 0.4
        
        if gt_has_steps and found_has_steps:
            completeness += 0.3
        elif not gt_has_steps:
            completeness += 0.3
        
        if gt_has_examples and found_has_examples:
            completeness += 0.3
        elif not gt_has_examples:
            completeness += 0.3
        
        return min(completeness, 1.0)
    
    def _extract_key_concepts(self, text: str) -> List[str]:
        """Extract key technical concepts from text"""
        concepts = []
        
        # Extract code elements
        code_elements = re.findall(r'`([^`]+)`', text)
        concepts.extend(code_elements)
        
        # Extract important technical terms (camelCase, PascalCase, etc.)
        tech_terms = re.findall(r'\b[A-Z][a-z]*(?:[A-Z][a-z]*)*\b', text)
        concepts.extend(tech_terms)
        
        # Extract method/function calls
        method_calls = re.findall(r'\w+\.\w+\(', text)
        concepts.extend([call.rstrip('(') for call in method_calls])
        
        # Extract specific Adobe Express terms
        adobe_terms = re.findall(r'\b(?:editor|runtime|addOnUISdk|Spectrum|manifest|sandbox)\b', text, re.IGNORECASE)
        concepts.extend(adobe_terms)
        
        return list(set(concepts))  # Remove duplicates
    
    def _identify_missing_concepts(self, pair: GroundTruthPair, content_snippets: List[str]) -> List[str]:
        """Identify concepts present in ground truth but missing from documentation"""
        if not content_snippets:
            return ["No relevant documentation found"]
        
        gt_concepts = self._extract_key_concepts(pair.answer)
        found_content = " ".join(content_snippets).lower()
        
        missing = []
        for concept in gt_concepts:
            if concept.lower() not in found_content:
                missing.append(concept)
        
        return missing
    
    def _identify_inaccuracies(self, pair: GroundTruthPair, content_snippets: List[str]) -> List[str]:
        """Identify potential inaccuracies in found content vs ground truth"""
        # This is a simplified implementation - could be enhanced with more sophisticated analysis
        inaccuracies = []
        
        if not content_snippets:
            return inaccuracies
        
        found_content = " ".join(content_snippets)
        
        # Check for contradictory statements (basic implementation)
        if "cannot" in pair.answer.lower() and "can" in found_content.lower():
            inaccuracies.append("Potential contradiction: ground truth says 'cannot' but docs suggest 'can'")
        
        if "deprecated" in pair.answer.lower() and "deprecated" not in found_content.lower():
            inaccuracies.append("Missing deprecation notice")
        
        return inaccuracies
    
    def _generate_improvement_suggestions(self, pair: GroundTruthPair, coverage: float, accuracy: float, completeness: float, missing_concepts: List[str]) -> List[str]:
        """Generate specific improvement suggestions"""
        suggestions = []
        
        if coverage < 0.3:
            suggestions.append(f"Add documentation addressing: {pair.question}")
        
        if accuracy < 0.5:
            suggestions.append("Review and correct inaccurate information")
        
        if completeness < 0.5:
            if re.search(r'```', pair.answer):
                suggestions.append("Add code examples to documentation")
            if re.search(r'(\d+\.|step)', pair.answer):
                suggestions.append("Provide step-by-step instructions")
        
        if missing_concepts:
            suggestions.append(f"Document missing concepts: {', '.join(missing_concepts[:3])}")
        
        # Category-specific suggestions
        if pair.category.lower() == 'spectrum':
            suggestions.append("Ensure Spectrum design system documentation is complete")
        elif pair.category.lower() == 'documentapis':
            suggestions.append("Verify Document API examples are working and complete")
        elif pair.category.lower() == 'getting_started':
            suggestions.append("Improve getting started guide with clear prerequisites and steps")
        
        return suggestions
    
    def _generate_report(self, results: List[GroundTruthTestResult]) -> GroundTruthReport:
        """Generate comprehensive ground truth analysis report"""
        
        total_pairs = len(results)
        
        # Calculate overall scores
        overall_coverage = sum(r.coverage_score for r in results) / total_pairs if total_pairs > 0 else 0
        overall_accuracy = sum(r.accuracy_score for r in results) / total_pairs if total_pairs > 0 else 0
        overall_completeness = sum(r.completeness_score for r in results) / total_pairs if total_pairs > 0 else 0
        
        # Calculate category scores
        category_stats = defaultdict(lambda: {'coverage': [], 'accuracy': [], 'completeness': []})
        
        for result in results:
            category = result.pair.category
            category_stats[category]['coverage'].append(result.coverage_score)
            category_stats[category]['accuracy'].append(result.accuracy_score)
            category_stats[category]['completeness'].append(result.completeness_score)
        
        category_scores = {}
        for category, stats in category_stats.items():
            category_scores[category] = {
                'coverage': sum(stats['coverage']) / len(stats['coverage']),
                'accuracy': sum(stats['accuracy']) / len(stats['accuracy']),
                'completeness': sum(stats['completeness']) / len(stats['completeness'])
            }
            category_scores[category]['overall'] = (
                category_scores[category]['coverage'] * 0.3 +
                category_scores[category]['accuracy'] * 0.4 +
                category_scores[category]['completeness'] * 0.3
            )
        
        # Identify worst performing categories
        worst_categories = sorted(
            category_scores.items(),
            key=lambda x: x[1]['overall']
        )[:5]
        
        # Collect critical gaps and issues
        critical_gaps = []
        accuracy_issues = []
        
        for result in results:
            if result.confidence < 0.3:
                critical_gaps.append(f"{result.pair.category}: {result.pair.question[:60]}...")
            if result.accuracy_score < 0.4:
                accuracy_issues.append(f"{result.pair.category}: Low accuracy for '{result.pair.question[:40]}...'")
        
        # Generate improvement priorities
        improvement_priorities = []
        for category, score in worst_categories:
            if score['overall'] < 0.5:
                improvement_priorities.append(f"Priority: Improve {category} documentation (score: {score['overall']:.2f})")
        
        return GroundTruthReport(
            total_pairs=total_pairs,
            overall_coverage_score=overall_coverage,
            overall_accuracy_score=overall_accuracy,
            overall_completeness_score=overall_completeness,
            category_scores=category_scores,
            worst_performing_categories=[cat for cat, score in worst_categories],
            critical_gaps=critical_gaps[:10],
            accuracy_issues=accuracy_issues[:10],
            detailed_results=results,
            improvement_priorities=improvement_priorities
        )
    
    def export_report(self, report: GroundTruthReport, output_file: str = "ground_truth_test_report.json"):
        """Export detailed ground truth test report"""
        
        # Convert to serializable format
        report_data = {
            'metadata': {
                'generation_date': datetime.now().isoformat(),
                'total_pairs_tested': report.total_pairs,
                'test_type': 'ground_truth_validation'
            },
            'overall_scores': {
                'coverage': report.overall_coverage_score,
                'accuracy': report.overall_accuracy_score,
                'completeness': report.overall_completeness_score
            },
            'category_analysis': report.category_scores,
            'critical_gaps': report.critical_gaps,
            'accuracy_issues': report.accuracy_issues,
            'improvement_priorities': report.improvement_priorities,
            'detailed_results': [
                {
                    'question': result.pair.question,
                    'category': result.pair.category,
                    'scores': {
                        'coverage': result.coverage_score,
                        'accuracy': result.accuracy_score,
                        'completeness': result.completeness_score,
                        'confidence': result.confidence
                    },
                    'found_files': result.found_in_files,
                    'missing_concepts': result.missing_concepts,
                    'suggestions': result.improvement_suggestions
                }
                for result in report.detailed_results
            ]
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Ground truth test report exported to: {output_file}")
    
    def print_summary_report(self, report: GroundTruthReport):
        """Print a summary of the ground truth test results"""
        
        print(f"\n" + "="*80)
        print(f"📊 GROUND TRUTH DOCUMENTATION VALIDATION REPORT")
        print(f"="*80)
        
        print(f"\n📈 Overall Performance:")
        print(f"   Total Q&A Pairs Tested: {report.total_pairs}")
        print(f"   Coverage Score: {report.overall_coverage_score:.3f}/1.00 ({report.overall_coverage_score*100:.1f}%)")
        print(f"   Accuracy Score: {report.overall_accuracy_score:.3f}/1.00 ({report.overall_accuracy_score*100:.1f}%)")
        print(f"   Completeness Score: {report.overall_completeness_score:.3f}/1.00 ({report.overall_completeness_score*100:.1f}%)")
        
        overall_quality = (report.overall_coverage_score + report.overall_accuracy_score + report.overall_completeness_score) / 3
        print(f"   📊 Overall Quality: {overall_quality:.3f}/1.00 ({overall_quality*100:.1f}%)")
        
        if overall_quality >= 0.8:
            quality_status = "🟢 EXCELLENT"
        elif overall_quality >= 0.6:
            quality_status = "🟡 GOOD"
        elif overall_quality >= 0.4:
            quality_status = "🟠 FAIR"
        else:
            quality_status = "🔴 POOR"
        
        print(f"   Status: {quality_status}")
        
        print(f"\n📂 Category Performance:")
        for category, scores in sorted(report.category_scores.items(), 
                                     key=lambda x: x[1]['overall'], reverse=True):
            print(f"   {category}: {scores['overall']:.3f} (C:{scores['coverage']:.2f} A:{scores['accuracy']:.2f} Co:{scores['completeness']:.2f})")
        
        print(f"\n⚠️ Worst Performing Categories:")
        for category in report.worst_performing_categories[:5]:
            score = report.category_scores[category]['overall']
            print(f"   {category}: {score:.3f}")
        
        print(f"\n🚨 Critical Gaps ({len(report.critical_gaps)}):")
        for gap in report.critical_gaps[:5]:
            print(f"   - {gap}")
        
        print(f"\n📋 Top Improvement Priorities:")
        for priority in report.improvement_priorities[:5]:
            print(f"   - {priority}")


def main():
    """Run ground truth documentation testing"""
    
    print("🔍 Starting Ground Truth Documentation Validation...")
    
    # Initialize tester
    tester = GroundTruthTester()
    
    # Run the test
    print(f"\n🧪 Testing documentation against verified Q&A pairs...")
    report = tester.test_all_pairs()
    
    # Print summary
    tester.print_summary_report(report)
    
    # Export detailed report
    tester.export_report(report)
    
    print(f"\n✅ Ground truth validation complete!")
    print(f"📁 Detailed report saved to: ground_truth_test_report.json")


if __name__ == "__main__":
    main() 