#!/usr/bin/env python3
"""
Enhanced Documentation Auditing Framework for Adobe Express Add-ons

Combines multiple auditing approaches:
1. LLM-readiness scoring (llm_readiness_analyzer.py) 
2. Markdown-specific linting (llm_markdown_linter.py)
3. Query-based testing (query_based_doc_tester.py)
4. Comparative analysis and improvement tracking

Provides comprehensive evaluation of documentation for LLM training and AI assistant usage.
"""

import os
import json
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
from dataclasses import dataclass, asdict

# Import our auditing modules
from llm_readiness_analyzer import DocumentationAuditor
from llm_markdown_linter import LLMMarkdownLinter
from query_parser import QueryParser
from query_based_doc_tester import QueryBasedDocTester


@dataclass
class ComprehensiveAuditResult:
    """Combined results from all auditing approaches"""
    # Basic metadata
    audit_date: str
    total_files: int
    docs_path: str
    
    # LLM-readiness scoring
    llm_readiness_score: float
    readiness_status: str
    
    # Markdown linting
    total_lint_issues: int
    critical_lint_errors: int
    
    # Query-based testing
    total_queries_tested: int
    answerable_queries: int
    answerability_rate: float
    high_confidence_rate: float
    
    # Combined insights
    priority_issues: List[str]
    quick_wins: List[str]
    long_term_improvements: List[str]
    
    # Detailed results
    llm_audit_details: Dict[str, Any]
    lint_audit_details: Dict[str, Any]
    query_test_details: Dict[str, Any]


class EnhancedAuditRunner:
    """Comprehensive documentation auditing system"""
    
    def __init__(self, docs_path: str = "express-add-ons-docs/src/pages"):
        self.docs_path = Path(docs_path)
        # Store JSON data in root directory with other audit JSONs
        self.results_dir = Path(".")
        
        # Initialize audit components
        self.llm_auditor = DocumentationAuditor()
        self.markdown_linter = LLMMarkdownLinter()
        self.query_parser = QueryParser()
        self.query_tester = QueryBasedDocTester(str(self.docs_path))
        
    def run_comprehensive_audit(self, max_queries: Optional[int] = None) -> ComprehensiveAuditResult:
        """Run all auditing approaches and combine results"""
        
        print("🚀 STARTING ENHANCED COMPREHENSIVE DOCUMENTATION AUDIT")
        print("=" * 60)
        
        # 1. LLM-readiness audit
        print("\n📊 1/3: Running LLM-readiness audit...")
        llm_results = self._run_llm_readiness_audit()
        
        # 2. Markdown linting audit
        print("\n🔍 2/3: Running markdown linting audit...")
        lint_results = self._run_markdown_lint_audit()
        
        # 3. Query-based testing
        print("\n🧪 3/3: Running query-based testing...")
        query_results = self._run_query_based_testing(max_queries)
        
        # 4. Combine and analyze
        print("\n🔄 Combining results and generating insights...")
        combined_result = self._combine_results(llm_results, lint_results, query_results)
        
        # 5. Export comprehensive report
        self._export_comprehensive_report(combined_result)
        
        return combined_result
    
    def _run_llm_readiness_audit(self) -> Dict[str, Any]:
        """Run the LLM-readiness audit"""
        try:
            results = self.llm_auditor.audit_directory(str(self.docs_path))
            
            # results is an AuditReport dataclass, access attributes directly
            return {
                "score": results.overall_score,
                "status": "good" if results.overall_score >= 0.7 else "fair" if results.overall_score >= 0.4 else "poor",
                "total_files": results.total_files,
                "files_with_issues": len([f for f in results.file_analyses if f.llm_friendly_score < 0.5]),
                "detailed_results": results
            }
        except Exception as e:
            print(f"❌ Error in LLM-readiness audit: {e}")
            return {
                "score": 0.0,
                "status": "error",
                "total_files": 0,
                "files_with_issues": 0,
                "detailed_results": {"error": str(e)}
            }
    
    def _run_markdown_lint_audit(self) -> Dict[str, Any]:
        """Run the markdown linting audit"""
        try:
            # Find all markdown files
            markdown_files = list(self.docs_path.glob("**/*.md"))
            
            total_issues = 0
            critical_errors = 0
            file_results = {}
            
            for file_path in markdown_files:
                try:
                    results = self.markdown_linter.lint_file(str(file_path))
                    
                    file_issues = (
                        len(results.get("errors", [])) + 
                        len(results.get("warnings", [])) + 
                        len(results.get("info", []))
                    )
                    file_errors = len(results.get("errors", []))
                    
                    total_issues += file_issues
                    critical_errors += file_errors
                    
                    relative_path = str(file_path.relative_to(self.docs_path.parent.parent))
                    file_results[relative_path] = results
                    
                except Exception as e:
                    print(f"⚠️ Error linting {file_path}: {e}")
            
            return {
                "total_issues": total_issues,
                "critical_errors": critical_errors,
                "files_processed": len(markdown_files),
                "file_results": file_results
            }
            
        except Exception as e:
            print(f"❌ Error in markdown linting audit: {e}")
            return {
                "total_issues": 0,
                "critical_errors": 0,
                "files_processed": 0,
                "file_results": {},
                "error": str(e)
            }
    
    def _run_query_based_testing(self, max_queries: Optional[int]) -> Dict[str, Any]:
        """Run query-based documentation testing"""
        try:
            # Parse all queries
            queries = self.query_parser.parse_all_sources()
            
            # Test documentation against queries
            report = self.query_tester.test_all_queries(queries, max_queries)
            
            answerability_rate = report.answerable_queries / report.total_queries if report.total_queries > 0 else 0
            confidence_rate = report.high_confidence_answers / report.total_queries if report.total_queries > 0 else 0
            
            return {
                "total_queries": report.total_queries,
                "answerable_queries": report.answerable_queries,
                "answerability_rate": answerability_rate,
                "high_confidence_answers": report.high_confidence_answers,
                "confidence_rate": confidence_rate,
                "coverage_by_category": report.coverage_by_category,
                "missing_content_areas": report.missing_content_areas,
                "suggested_improvements": report.suggested_improvements,
                "detailed_report": report
            }
            
        except Exception as e:
            print(f"❌ Error in query-based testing: {e}")
            return {
                "total_queries": 0,
                "answerable_queries": 0,
                "answerability_rate": 0.0,
                "high_confidence_answers": 0,
                "confidence_rate": 0.0,
                "coverage_by_category": {},
                "missing_content_areas": [],
                "suggested_improvements": [],
                "error": str(e)
            }
    
    def _combine_results(self, llm_results: Dict, lint_results: Dict, 
                        query_results: Dict) -> ComprehensiveAuditResult:
        """Combine all audit results and generate insights"""
        
        # Calculate priority issues
        priority_issues = []
        
        if llm_results["score"] < 0.5:
            priority_issues.append(f"Low LLM-readiness score: {llm_results['score']:.2f}")
        
        if lint_results["critical_errors"] > 50:
            priority_issues.append(f"High critical linting errors: {lint_results['critical_errors']}")
        
        if query_results["answerability_rate"] < 0.6:
            priority_issues.append(f"Low query answerability: {query_results['answerability_rate']:.1%}")
        
        # Identify quick wins
        quick_wins = []
        
        if lint_results["critical_errors"] > 0:
            quick_wins.append("Fix critical linting errors (undefined variables, missing imports)")
        
        if query_results["missing_content_areas"]:
            quick_wins.append(f"Add documentation for: {', '.join(query_results['missing_content_areas'][:3])}")
        
        # Long-term improvements
        long_term_improvements = []
        long_term_improvements.extend(query_results["suggested_improvements"][:5])
        
        if llm_results["score"] < 0.7:
            long_term_improvements.append("Improve content structure for better LLM training")
        
        # Create combined result
        return ComprehensiveAuditResult(
            audit_date=datetime.now().isoformat(),
            total_files=llm_results.get("total_files", 0),
            docs_path=str(self.docs_path),
            llm_readiness_score=llm_results["score"],
            readiness_status=llm_results["status"],
            total_lint_issues=lint_results["total_issues"],
            critical_lint_errors=lint_results["critical_errors"],
            total_queries_tested=query_results["total_queries"],
            answerable_queries=query_results["answerable_queries"],
            answerability_rate=query_results["answerability_rate"],
            high_confidence_rate=query_results["confidence_rate"],
            priority_issues=priority_issues,
            quick_wins=quick_wins,
            long_term_improvements=long_term_improvements,
            llm_audit_details=llm_results,
            lint_audit_details=lint_results,
            query_test_details=query_results
        )
    
    def _export_comprehensive_report(self, result: ComprehensiveAuditResult):
        """Export comprehensive audit report"""
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Export JSON report
        json_file = self.results_dir / f"enhanced_comprehensive_audit_{timestamp}.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(asdict(result), f, indent=2, ensure_ascii=False, default=str)
        
        # Export human-readable report to reports/ folder
        reports_dir = Path("reports")
        reports_dir.mkdir(exist_ok=True)
        markdown_file = reports_dir / f"enhanced_audit_summary_{timestamp}.md"
        self._export_markdown_report(result, markdown_file)
        
        print(f"\n📄 Enhanced audit reports exported:")
        print(f"   JSON: {json_file}")
        print(f"   Markdown: {markdown_file}")
    
    def _export_markdown_report(self, result: ComprehensiveAuditResult, output_file: Path):
        """Export human-readable markdown report"""
        
        report_content = f"""# Comprehensive Documentation Audit Report

**Audit Date:** {result.audit_date}  
**Documentation Path:** `{result.docs_path}`  
**Total Files:** {result.total_files}

## 🎯 Executive Summary

| Metric | Score | Status |
|--------|-------|---------|
| **LLM-Readiness** | {result.llm_readiness_score:.2f}/1.00 | {result.readiness_status.title()} |
| **Query Answerability** | {result.answerability_rate:.1%} | {'✅ Good' if result.answerability_rate >= 0.7 else '⚠️ Needs Improvement' if result.answerability_rate >= 0.5 else '❌ Poor'} |
| **High Confidence Answers** | {result.high_confidence_rate:.1%} | {'✅ Good' if result.high_confidence_rate >= 0.6 else '⚠️ Needs Improvement' if result.high_confidence_rate >= 0.4 else '❌ Poor'} |
| **Critical Linting Issues** | {result.critical_lint_errors} | {'✅ Good' if result.critical_lint_errors <= 10 else '⚠️ Some Issues' if result.critical_lint_errors <= 50 else '❌ Many Issues'} |

## 🚨 Priority Issues

"""
        
        if result.priority_issues:
            for issue in result.priority_issues:
                report_content += f"- {issue}\n"
        else:
            report_content += "- No critical priority issues identified ✅\n"
        
        report_content += f"""

## ⚡ Quick Wins

"""
        
        if result.quick_wins:
            for win in result.quick_wins:
                report_content += f"- {win}\n"
        else:
            report_content += "- No immediate quick wins identified\n"
        
        report_content += f"""

## 📈 Long-term Improvements

"""
        
        if result.long_term_improvements:
            for improvement in result.long_term_improvements:
                report_content += f"- {improvement}\n"
        else:
            report_content += "- No long-term improvements suggested\n"
        
        report_content += f"""

## 📊 Detailed Metrics

### Query Testing Results
- **Total Queries Tested:** {result.total_queries_tested}
- **Answerable Queries:** {result.answerable_queries} ({result.answerability_rate:.1%})
- **High Confidence Answers:** {result.query_test_details.get('high_confidence_answers', 0)} ({result.high_confidence_rate:.1%})

### Category Performance
"""
        
        coverage_by_category = result.query_test_details.get('coverage_by_category', {})
        for category, score in sorted(coverage_by_category.items(), key=lambda x: x[1], reverse=True):
            report_content += f"- **{category}**: {score:.2f}\n"
        
        report_content += f"""

### Linting Results
- **Total Issues:** {result.total_lint_issues}
- **Critical Errors:** {result.critical_lint_errors}
- **Files Processed:** {result.lint_audit_details.get('files_processed', 0)}

### Missing Content Areas
"""
        
        missing_areas = result.query_test_details.get('missing_content_areas', [])
        if missing_areas:
            for area in missing_areas[:10]:
                report_content += f"- {area}\n"
        else:
            report_content += "- No missing content areas identified\n"
        
        report_content += f"""

## 🔧 Recommendations

### Immediate Actions (This Week)
1. **Fix Critical Linting Errors**: Address {result.critical_lint_errors} critical issues
2. **Improve Query Coverage**: Focus on categories with < 0.5 coverage score
3. **Add Missing Imports**: Ensure all code examples have proper SDK imports

### Short-term Improvements (This Month)
1. **Enhance Documentation Structure**: Improve heading hierarchy and content organization
2. **Add Missing Content**: Create documentation for frequently asked but unanswered queries
3. **Improve Code Examples**: Make examples more self-contained and complete

### Long-term Strategy (Next Quarter)
1. **Comprehensive Content Audit**: Review and update all documentation for LLM optimization
2. **Query-Driven Documentation**: Create content specifically addressing real developer questions
3. **Continuous Monitoring**: Set up regular auditing to maintain high quality standards

---

*Report generated by Enhanced Documentation Auditing Framework*  
*For technical details, see the accompanying JSON report.*
"""
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report_content)
    
    def print_summary(self, result: ComprehensiveAuditResult):
        """Print a summary of the comprehensive audit"""
        
        print(f"\n🎯 ENHANCED COMPREHENSIVE AUDIT SUMMARY")
        print("=" * 60)
        
        print(f"\n📊 Overall Performance:")
        print(f"   LLM-Readiness Score: {result.llm_readiness_score:.2f}/1.00 ({result.readiness_status.title()})")
        print(f"   Query Answerability: {result.answerability_rate:.1%}")
        print(f"   High Confidence Rate: {result.high_confidence_rate:.1%}")
        print(f"   Critical Lint Issues: {result.critical_lint_errors}")
        
        print(f"\n🚨 Priority Issues ({len(result.priority_issues)}):")
        for issue in result.priority_issues:
            print(f"   - {issue}")
        
        print(f"\n⚡ Quick Wins ({len(result.quick_wins)}):")
        for win in result.quick_wins:
            print(f"   - {win}")
        
        print(f"\n📈 Top Long-term Improvements:")
        for improvement in result.long_term_improvements[:3]:
            print(f"   - {improvement}")


def install_dependencies():
    """Install required Python packages"""
    required_packages = ['PyYAML']
    
    for package in required_packages:
        try:
            __import__(package.lower().replace('-', '_'))
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])


def main():
    """Run comprehensive documentation audit"""
    
    # Install dependencies
    try:
        install_dependencies()
    except Exception as e:
        print(f"⚠️ Warning: Could not install dependencies: {e}")
    
    # Run audit
    auditor = EnhancedAuditRunner()
    
    print("Starting enhanced comprehensive documentation audit...")
    print("This uses ALL query sources from test_prompts/ folder and may take several minutes...")
    
    # Run with limited queries for initial test
    result = auditor.run_comprehensive_audit(max_queries=100)
    
    # Print summary
    auditor.print_summary(result)
    
    print(f"\n✅ Enhanced comprehensive audit complete!")
    print(f"📁 Enhanced audit JSON data saved in root directory alongside other audit files")


if __name__ == "__main__":
    main() 