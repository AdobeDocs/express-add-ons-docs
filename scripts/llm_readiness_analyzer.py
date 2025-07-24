#!/usr/bin/env python3
"""
Adobe Express Add-ons Documentation LLM-Readiness Audit Framework

This framework analyzes documentation for LLM-friendliness based on:
- Structured query data patterns
- LLM optimization best practices
- Adobe Express specific developer needs

Usage:
    python3 llm_readiness_analyzer.py --docs-path src/pages
    python3 llm_readiness_analyzer.py --docs-path src/pages --baseline --output baseline_report.json
    python3 llm_readiness_analyzer.py --docs-path src/pages --compare baseline_report.json
    python3 llm_readiness_analyzer.py --docs-path src/pages/guides/learn/how_to/use_text.md --output my_report.json
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

@dataclass
class DocumentAnalysis:
    """Analysis results for a single document"""
    file_path: str
    title: str
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
    llm_friendly_score: float
    issues: List[str]
    recommendations: List[str]

@dataclass
class AuditReport:
    """Complete audit report"""
    timestamp: str
    total_files: int
    overall_score: float
    category_scores: Dict[str, float]
    query_pattern_coverage: Dict[str, float]
    critical_issues: List[str]
    top_recommendations: List[str]
    file_analyses: List[DocumentAnalysis]
    baseline_hash: str

class DocumentationAuditor:
    """Main auditing class"""
    
    def __init__(self, query_data_path: str = "structured_query_data.json"):
        self.query_data = self._load_query_data(query_data_path)
        self.scoring_weights = {
            'context_clarity': 0.25,      # Clear UI vs Sandbox distinction
            'code_completeness': 0.20,    # Complete working examples
            'error_coverage': 0.15,       # Error-first documentation
            'qa_format': 0.15,           # Question-answer structure
            'progressive_structure': 0.10, # Learning progression
            'searchability': 0.10,       # LLM searchability
            'cross_references': 0.05      # Navigation and linking
        }
        
        # Patterns from query data
        self.common_errors = self._extract_error_patterns()
        self.common_queries = self._extract_query_patterns()
        
    def _load_query_data(self, path: str) -> Dict[str, Any]:
        """Load structured query data"""
        try:
            with open(path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: Query data file {path} not found. Using default patterns.")
            return {"query_categories": {}}
    
    def _extract_error_patterns(self) -> List[str]:
        """Extract common error patterns from query data"""
        errors = []
        for category in self.query_data.get("query_categories", {}).values():
            if isinstance(category, dict) and "common_errors" in category:
                errors.extend(category["common_errors"])
        return errors
    
    def _extract_query_patterns(self) -> Dict[str, List[str]]:
        """Extract query patterns by category"""
        patterns = {}
        for cat_name, category in self.query_data.get("query_categories", {}).items():
            if isinstance(category, dict) and "subcategories" in category:
                patterns[cat_name] = []
                for subcat in category["subcategories"].values():
                    if isinstance(subcat, list):
                        patterns[cat_name].extend(subcat)
        return patterns
    
    def audit_directory(self, docs_path: str) -> AuditReport:
        """Audit documentation directory or single file"""
        print(f"🔍 Auditing documentation in: {docs_path}")
        
        docs_path_obj = Path(docs_path)
        
        # Handle single file vs directory
        if docs_path_obj.is_file() and docs_path_obj.suffix == '.md':
            md_files = [docs_path_obj]
            print(f"📄 Analyzing single file: {docs_path_obj.name}")
        elif docs_path_obj.is_dir():
            md_files = list(docs_path_obj.rglob("*.md"))
            print(f"📄 Found {len(md_files)} markdown files")
        else:
            raise ValueError(f"Path must be a directory or .md file: {docs_path}")
            
        if not md_files:
            print("⚠️ No markdown files found to analyze")
            return self._create_empty_report(docs_path)
        
        file_analyses = []
        category_scores = defaultdict(list)
        
        for file_path in md_files:
            print(f"   Analyzing: {file_path.relative_to(Path(docs_path))}")
            analysis = self.analyze_file(str(file_path))
            file_analyses.append(analysis)
            
            # Collect category scores
            category_scores['context_clarity'].append(analysis.context_clarity_score)
            
            # Code completeness: 1.0 if no code blocks, otherwise ratio of complete/total
            if analysis.code_blocks == 0:
                code_completeness_score = 1.0  # Perfect score when no code to evaluate
            else:
                code_completeness_score = analysis.code_examples_complete / analysis.code_blocks
            category_scores['code_completeness'].append(code_completeness_score)
            category_scores['error_coverage'].append(analysis.error_coverage_score)
            category_scores['qa_format'].append(
                1.0 if analysis.qa_format_sections > 0 else 0.0
            )
            category_scores['progressive_structure'].append(analysis.progressive_structure_score)
            category_scores['searchability'].append(analysis.searchability_score)
            category_scores['cross_references'].append(
                min(1.0, analysis.cross_references / 5.0)  # Normalize to 0-1
            )
        
        # Calculate overall scores
        avg_category_scores = {
            cat: sum(scores) / len(scores) if scores else 0.0
            for cat, scores in category_scores.items()
        }
        
        overall_score = sum(
            avg_category_scores[cat] * weight
            for cat, weight in self.scoring_weights.items()
            if cat in avg_category_scores
        )
        
        # Generate report
        report = AuditReport(
            timestamp=self._get_timestamp(),
            total_files=len(md_files),
            overall_score=overall_score,
            category_scores=avg_category_scores,
            query_pattern_coverage=self._calculate_query_coverage(file_analyses),
            critical_issues=self._identify_critical_issues(file_analyses),
            top_recommendations=self._generate_recommendations(file_analyses, avg_category_scores),
            file_analyses=file_analyses,
            baseline_hash=self._calculate_baseline_hash(docs_path)
        )
        
        return report
    
    def analyze_file(self, file_path: str) -> DocumentAnalysis:
        """Analyze a single markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return DocumentAnalysis(
                file_path=file_path,
                title="ERROR_READING_FILE",
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
                llm_friendly_score=0.0,
                issues=[f"Could not read file: {e}"],
                recommendations=[]
            )
        
        # Extract frontmatter and content
        frontmatter, body = self._parse_frontmatter(content)
        title = frontmatter.get('title', Path(file_path).stem)
        
        # Analyze content
        word_count = len(body.split())
        code_blocks = len(re.findall(r'```[\s\S]*?```', body))
        
        # Code example analysis
        complete_examples, incomplete_examples = self._analyze_code_examples(body)
        
        # Context clarity (UI vs Sandbox distinction)
        context_clarity = self._analyze_context_clarity(body)
        
        # Error-first sections
        error_sections = self._count_error_sections(body)
        
        # Check if page has risky code that needs error handling
        has_risky_code = self._has_risky_code_without_error_handling(body)
        
        # Q&A format sections
        qa_sections = self._count_qa_sections(body)
        
        # Cross-references
        cross_refs = self._count_cross_references(body)
        
        # Progressive structure
        progressive_score = self._analyze_progressive_structure(body, file_path)
        
        # Searchability
        searchability_score = self._analyze_searchability(body, title)
        
        # Calculate LLM-friendly score for this file
        # Code completeness: 1.0 if no code blocks, otherwise ratio of complete/total
        if code_blocks == 0:
            code_completeness_score = 1.0  # Perfect score when no code to evaluate
        else:
            code_completeness_score = complete_examples / code_blocks
            
        # Error coverage: only require error sections if there's risky code
        if has_risky_code:
            error_coverage_score = 1.0 if error_sections > 0 else 0.0
        else:
            error_coverage_score = 1.0  # Perfect score when no risky operations to document errors for
            
        llm_score = self._calculate_file_llm_score({
            'context_clarity': context_clarity,
            'code_completeness': code_completeness_score,
            'error_coverage': error_coverage_score,
            'qa_format': 1.0 if qa_sections > 0 else 0.0,
            'progressive_structure': progressive_score,
            'searchability': searchability_score,
            'cross_references': min(1.0, cross_refs / 5.0)
        })
        
        # Generate issues and recommendations
        issues = self._identify_file_issues(body, complete_examples, incomplete_examples)
        recommendations = self._generate_file_recommendations(body, context_clarity, error_sections, has_risky_code)
        
        return DocumentAnalysis(
            file_path=file_path,
            title=title,
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
            llm_friendly_score=llm_score,
            issues=issues,
            recommendations=recommendations
        )
    
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
        code_blocks = re.findall(r'```(.*?)\n([\s\S]*?)```', content)
        complete = 0
        incomplete = 0
        
        for lang, code in code_blocks:
            if 'javascript' in lang.lower() or 'js' in lang.lower():
                # Check for completeness indicators
                has_imports = 'import' in code or 'require' in code
                has_context = 'editor' in code or 'addOnUISdk' in code
                has_function_body = '{' in code and '}' in code
                has_comments = '//' in code or '/*' in code
                
                completeness_score = sum([has_imports, has_context, has_function_body, has_comments])
                
                if completeness_score >= 3:
                    complete += 1
                else:
                    incomplete += 1
            else:
                complete += 1  # Non-JS code blocks assumed complete
        
        return complete, incomplete
    
    def _analyze_context_clarity(self, content: str) -> float:
        """Analyze how well the content distinguishes UI vs Sandbox contexts"""
        context_indicators = [
            'Document Sandbox',
            'UI Runtime',
            'code.js',
            'index.js',
            'sandbox',
            'ui/',
            'editor.queueAsyncEdit',
            'addOnUISdk',
            'sandboxProxy'
        ]
        
        context_count = sum(1 for indicator in context_indicators if indicator in content)
        
        # Check for explicit context headers
        context_headers = len(re.findall(r'###?\s*.*(?:Document Sandbox|UI Runtime)', content))
        
        # Bonus for file path indicators
        file_path_clarity = len(re.findall(r'`[^`]*(?:code\.js|index\.js|sandbox|ui/)[^`]*`', content))
        
        total_score = context_count + (context_headers * 2) + file_path_clarity
        return min(1.0, total_score / 10.0)  # Normalize to 0-1
    
    def _count_error_sections(self, content: str) -> int:
        """Count sections that start with errors (error-first documentation)"""
        error_patterns = [
            r'##?\s*Error:',
            r'##?\s*.*(?:not a function|is not defined|Error|Exception)',
            r'❌',
            r'🚫',
            r'### Common (?:Errors|Issues|Problems)'
        ]
        
        count = 0
        for pattern in error_patterns:
            count += len(re.findall(pattern, content, re.IGNORECASE))
        
        return count
    
    def _has_risky_code_without_error_handling(self, content: str) -> bool:
        """Check if content has code blocks with risky operations but no error handling"""
        code_blocks = re.findall(r'```(\w+)?\n(.*?)\n```', content, re.DOTALL)
        
        if not code_blocks:
            return False
            
        # Define operations that could fail and need error handling
        risky_operations = [
            r'addOnUISdk\.app\.showModalDialog\(',     # Modal dialogs that can fail
            r'addOnUISdk\.app\.enableDragToDocument\(',# Drag operations that can fail
            r'addOnUISdk\.instance\.proxy\.',          # Communication operations that can fail
            r'editor\.createRenditions\(',             # Rendition creation
            r'editor\.createRectangle\(',              # Shape creation
            r'editor\.createEllipse\(',                # Shape creation
            r'editor\.createText\(',                   # Text creation
            r'editor\.createImage\(',                  # Image creation
            r'editor\.createPage\(',                   # Page creation
            r'\.setFill\(',                           # Style operations that can fail
            r'\.setStroke\(',                         # Style operations that can fail
            r'fetch\(',                               # Network requests
            r'JSON\.parse\(',                         # JSON parsing that can fail
            r'JSON\.stringify\(',                     # JSON stringifying that can fail
            r'localStorage\.',                        # Storage operations
            r'sessionStorage\.',                      # Storage operations
            r'require\(',                             # Require statements (dynamic requires can fail)
            r'await\s+fonts\.',                       # Font loading operations
        ]
        
        # Check if any code blocks have risky operations without try/catch
        for lang, code in code_blocks:
            has_risky_operations = any(re.search(pattern, code, re.IGNORECASE) for pattern in risky_operations)
            has_try_catch = 'try' in code and 'catch' in code
            
            if has_risky_operations and not has_try_catch:
                return True
        
        return False
    
    def _count_qa_sections(self, content: str) -> int:
        """Count Q&A format sections"""
        qa_patterns = [
            r'\*\*Q:',
            r'\*\*Question:',
            r'## Q:',
            r'### Q:',
            r'\*\*A:\*\*',
            r'\*\*Answer:\*\*'
        ]
        
        count = 0
        for pattern in qa_patterns:
            count += len(re.findall(pattern, content, re.IGNORECASE))
        
        return count // 2  # Divide by 2 since Q&A come in pairs
    
    def _count_cross_references(self, content: str) -> int:
        """Count cross-references and links"""
        link_patterns = [
            r'\[([^\]]+)\]\([^)]+\.md[^)]*\)',  # Markdown links to other docs
            r'\[([^\]]+)\]\(\.\/[^)]+\)',       # Relative links
            r'See also:?',
            r'Related:?',
            r'For more information'
        ]
        
        count = 0
        for pattern in link_patterns:
            count += len(re.findall(pattern, content, re.IGNORECASE))
        
        return count
    
    def _is_tutorial_page(self, file_path: str) -> bool:
        """Check if a page is a tutorial based on file path"""
        return '/tutorials/' in file_path.lower()
    
    def _analyze_progressive_structure(self, content: str, file_path: str) -> float:
        """Analyze if content follows progressive learning structure"""
        # Only analyze progressive structure for tutorial pages
        if not self._is_tutorial_page(file_path):
            return 1.0  # Perfect score for non-tutorials since progressive structure isn't relevant
        
        # Look for level/step indicators in tutorials
        level_patterns = [
            r'##?\s*(?:Level|Step|Phase)\s*\d+',
            r'##?\s*(?:Basic|Intermediate|Advanced)',
            r'##?\s*(?:Getting Started|Next Steps)',
            r'- \[ \]',  # Checklist items
        ]
        
        level_count = 0
        for pattern in level_patterns:
            level_count += len(re.findall(pattern, content, re.IGNORECASE))
        
        # Check for prerequisites
        prereq_count = len(re.findall(r'prerequisite|before you begin|requirements', content, re.IGNORECASE))
        
        return min(1.0, (level_count + prereq_count) / 5.0)
    
    def _analyze_searchability(self, content: str, title: str) -> float:
        """Analyze content searchability for LLMs"""
        # Check for clear headings
        headings = len(re.findall(r'^#{1,6}\s+', content, re.MULTILINE))
        
        # Check for keywords and metadata
        keywords_in_content = 0
        important_keywords = ['Adobe Express', 'add-on', 'SDK', 'API', 'editor', 'document']
        for keyword in important_keywords:
            if keyword.lower() in content.lower():
                keywords_in_content += 1
        
        # Check for descriptive text
        sentences = len(re.findall(r'[.!?]+', content))
        word_count = len(content.split())
        
        # Calculate searchability components
        heading_score = min(1.0, headings / 8.0)
        keyword_score = keywords_in_content / len(important_keywords)
        structure_score = min(1.0, sentences / max(1, word_count / 50))  # Sentence density
        
        return (heading_score + keyword_score + structure_score) / 3.0
    
    def _calculate_file_llm_score(self, scores: Dict[str, float]) -> float:
        """Calculate overall LLM-friendly score for a file"""
        return sum(
            scores.get(category, 0.0) * weight
            for category, weight in self.scoring_weights.items()
        )
    
    def _identify_file_issues(self, content: str, complete_examples: int, incomplete_examples: int) -> List[str]:
        """Identify specific issues in a file"""
        issues = []
        
        if incomplete_examples > complete_examples:
            issues.append("More incomplete code examples than complete ones")
        
        if 'setSize' in content or 'setTransform' in content:
            issues.append("Contains non-existent API methods (setSize, setTransform)")
        
        if '@adobe/ccweb-add-on-sdk' in content:
            issues.append("Contains incorrect import package names")
        
        if 'editor.' in content and 'queueAsyncEdit' not in content:
            issues.append("Uses editor API without queueAsyncEdit context")
        
        if len(re.findall(r'```javascript', content)) == 0 and len(re.findall(r'```js', content)) == 0:
            if 'code' in content.lower() or 'example' in content.lower():
                issues.append("Mentions code/examples but lacks JavaScript code blocks")
        
        return issues
    
    def _generate_file_recommendations(self, content: str, context_clarity: float, error_sections: int, has_risky_code: bool) -> List[str]:
        """Generate recommendations for a file"""
        recommendations = []
        
        if context_clarity < 0.5:
            recommendations.append("Add clear UI Runtime vs Document Sandbox context headers")
        
        if error_sections == 0 and has_risky_code:
            recommendations.append("Add error-first documentation sections for API operations that can fail")
        
        if 'Q:' not in content and 'Question:' not in content:
            recommendations.append("Consider adding Q&A format sections")
        
        if len(re.findall(r'\[.*\]\(.*\.md.*\)', content)) < 2:
            recommendations.append("Add more cross-references to related documentation")
        
        return recommendations
    
    def _calculate_query_coverage(self, file_analyses: List[DocumentAnalysis]) -> Dict[str, float]:
        """Calculate how well documentation covers query patterns"""
        coverage = {}
        
        for category, queries in self.common_queries.items():
            covered_queries = 0
            for query in queries:
                query_keywords = query.lower().split()
                for analysis in file_analyses:
                    file_content = Path(analysis.file_path).read_text(encoding='utf-8').lower()
                    if any(keyword in file_content for keyword in query_keywords[:3]):  # Check first 3 keywords
                        covered_queries += 1
                        break
            
            coverage[category] = covered_queries / len(queries) if queries else 0.0
        
        return coverage
    
    def _identify_critical_issues(self, file_analyses: List[DocumentAnalysis]) -> List[str]:
        """Identify critical issues across all files"""
        critical_issues = []
        
        # Count files with AI misinformation
        files_with_bad_apis = sum(1 for analysis in file_analyses if any('non-existent API' in issue for issue in analysis.issues))
        if files_with_bad_apis > 0:
            critical_issues.append(f"{files_with_bad_apis} files contain non-existent API methods")
        
        # Count files without context clarity
        low_context_files = sum(1 for analysis in file_analyses if analysis.context_clarity_score < 0.3)
        if low_context_files > len(file_analyses) * 0.3:
            critical_issues.append(f"{low_context_files} files lack clear UI vs Sandbox context")
        
        # Count files with poor error coverage (only for files that need error handling)
        poor_error_coverage = sum(1 for analysis in file_analyses if analysis.error_coverage_score < 0.5)
        if poor_error_coverage > len(file_analyses) * 0.7:
            critical_issues.append(f"{poor_error_coverage} files with API operations lack error-first documentation")
        
        return critical_issues
    
    def _generate_recommendations(self, file_analyses: List[DocumentAnalysis], category_scores: Dict[str, float]) -> List[str]:
        """Generate top-level recommendations"""
        recommendations = []
        
        # Identify lowest scoring categories
        sorted_categories = sorted(category_scores.items(), key=lambda x: x[1])
        
        for category, score in sorted_categories[:3]:  # Top 3 lowest scores
            if score < 0.5:
                if category == 'context_clarity':
                    recommendations.append("Priority: Add UI Runtime vs Document Sandbox context headers to all code examples")
                elif category == 'code_completeness':
                    recommendations.append("Priority: Convert incomplete code snippets to complete working examples")
                elif category == 'error_coverage':
                    recommendations.append("Priority: Add error-first documentation sections for common issues")
                elif category == 'qa_format':
                    recommendations.append("Medium: Convert documentation to Q&A format for better LLM training")
        
        return recommendations
    
    def _create_empty_report(self, docs_path: str) -> AuditReport:
        """Create empty report when no files found"""
        try:
            baseline_hash = self._calculate_baseline_hash(docs_path)
        except Exception:
            baseline_hash = "empty"
            
        return AuditReport(
            timestamp=self._get_timestamp(),
            total_files=0,
            overall_score=0.0,
            category_scores={},
            query_pattern_coverage={},
            critical_issues=[],
            top_recommendations=[],
            file_analyses=[],
            baseline_hash=baseline_hash
        )
    
    def _get_timestamp(self) -> str:
        """Get current timestamp"""
        from datetime import datetime
        return datetime.now().isoformat()
    
    def _calculate_baseline_hash(self, docs_path: str) -> str:
        """Calculate hash of documentation for comparison"""
        hasher = hashlib.md5()
        for file_path in sorted(Path(docs_path).rglob("*.md")):
            try:
                with open(file_path, 'rb') as f:
                    hasher.update(f.read())
            except Exception:
                continue
        return hasher.hexdigest()
    
    def save_report(self, report: AuditReport, output_path: str, report_type: str = "Report"):
        """Save audit report to JSON"""
        with open(output_path, 'w') as f:
            json.dump(asdict(report), f, indent=2, default=str)
        
        if report_type == "Baseline":
            print(f"💾 Baseline llm readiness report saved to: {output_path}")
        else:
            print(f"📊 LLM readiness report saved to: {output_path}")
    
    def print_summary(self, report: AuditReport):
        """Print audit summary to console"""
        print("\n" + "="*60)
        print("📋 ADOBE EXPRESS ADD-ONS DOCUMENTATION AUDIT SUMMARY")
        print("="*60)
        print(f"📁 Files analyzed: {report.total_files}")
        print(f"🎯 Overall LLM-Readiness Score: {report.overall_score:.2f}/1.00")
        print()
        
        print("📊 CATEGORY SCORES:")
        for category, score in report.category_scores.items():
            status = "✅" if score >= 0.7 else "⚠️" if score >= 0.4 else "❌"
            print(f"   {status} {category.replace('_', ' ').title()}: {score:.2f}")
        print()
        
        print("🔍 QUERY PATTERN COVERAGE:")
        for category, coverage in report.query_pattern_coverage.items():
            status = "✅" if coverage >= 0.7 else "⚠️" if coverage >= 0.4 else "❌"
            print(f"   {status} {category.replace('_', ' ').title()}: {coverage:.1%}")
        print()
        
        if report.critical_issues:
            print("🚨 CRITICAL ISSUES:")
            for issue in report.critical_issues:
                print(f"   ❌ {issue}")
            print()
        
        print("💡 TOP RECOMMENDATIONS:")
        for rec in report.top_recommendations[:5]:
            print(f"   ➤ {rec}")
        print()
        
        print(f"🔗 Baseline hash: {report.baseline_hash[:8]}...")
        print("="*60)

def main():
    parser = argparse.ArgumentParser(description='Audit Adobe Express Add-ons documentation for LLM readiness')
    parser.add_argument('--docs-path', default='express-add-ons-docs/src/pages', 
                       help='Path to documentation directory')
    parser.add_argument('--query-data', default='structured_query_data.json',
                       help='Path to structured query data file')
    parser.add_argument('--output', default='llm_readiness_report.json',
                       help='Output file for detailed report')
    parser.add_argument('--baseline', action='store_true',
                       help='Save this audit as baseline for future comparison')
    parser.add_argument('--compare', type=str,
                       help='Compare with previous audit report')
    
    args = parser.parse_args()
    
    # Initialize auditor
    auditor = DocumentationAuditor(args.query_data)
    
    # Run audit
    report = auditor.audit_directory(args.docs_path)
    
    # Print summary
    auditor.print_summary(report)
    
    # Generate timestamped filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Check if analyzing a single file
    docs_path_obj = Path(args.docs_path)
    is_single_file = docs_path_obj.is_file() and docs_path_obj.suffix == '.md'
    
    # Generate appropriate output filename
    if args.output == 'llm_readiness_report.json':  # Using default filename
        if is_single_file:
            filename_base = docs_path_obj.stem
            if args.baseline:
                output_path = f"baseline_{filename_base}_llm_readiness_{timestamp}.json"
            else:
                output_path = f"{filename_base}_llm_readiness_{timestamp}.json"
        else:
            if args.baseline:
                output_path = f"baseline_llm_readiness_report_{timestamp}.json"
            else:
                output_path = f"llm_readiness_report_{timestamp}.json"
    else:  # User provided custom filename
        # Insert timestamp before .json extension
        base_name = args.output.rsplit('.json', 1)[0] if args.output.endswith('.json') else args.output
        if args.baseline:
            output_path = f"baseline_{base_name}_{timestamp}.json"
        else:
            output_path = f"{base_name}_{timestamp}.json"
    
    # Save report
    if args.baseline:
        auditor.save_report(report, output_path, "Baseline")
    else:
        auditor.save_report(report, output_path)
    
    # Compare with previous if requested
    if args.compare:
        try:
            with open(args.compare, 'r') as f:
                previous_report = json.load(f)
            
            print("\n🔄 COMPARISON WITH PREVIOUS AUDIT:")
            print(f"   Score change: {report.overall_score:.3f} → {previous_report['overall_score']:.3f} "
                  f"({report.overall_score - previous_report['overall_score']:+.3f})")
            
            for category in report.category_scores:
                if category in previous_report['category_scores']:
                    change = report.category_scores[category] - previous_report['category_scores'][category]
                    print(f"   {category}: {change:+.3f}")
                    
        except Exception as e:
            print(f"⚠️ Could not compare with previous report: {e}")

if __name__ == "__main__":
    main() 