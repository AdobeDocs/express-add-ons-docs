#!/usr/bin/env python3
"""
Documentation Audit Runner v2 for Adobe Express Add-ons

This script orchestrates the complete documentation auditing process using
the enhanced llm_linter.py:

1. Runs the LLM-readiness framework audit
2. Runs the enhanced LLM documentation linter
3. Generates comprehensive reports
4. Provides comparison with previous audits
5. Tracks improvement metrics

Key differences from v1:
- Uses llm_linter.py instead of llm_markdown_linter.py
- Enhanced content classification and rule application
- Evidence-based linting rules with proper weighting
- Better integration between framework and linter reports

Usage:
    python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered
    python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --baseline
    python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --compare reports/raw/baseline_v2_*.json
    python3 scripts/doc_audit_runner_v2.py --input reports/raw/existing_audit_report.json
"""

import os
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List, Tuple, Optional
import subprocess
import sys

# Import our audit tools
from llm_readiness_analyzer import DocumentationAuditor, AuditReport
from llm_linter import LLMDocumentationLinter, LintReport, DocumentAnalysis

class DocumentationAuditRunnerV2:
    """Orchestrates comprehensive documentation auditing with enhanced linter"""
    
    def __init__(self, docs_path: str = "src/pages", filtered: bool = False, exclude_api_references: bool = False):
        self.docs_path = docs_path
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.auditor = DocumentationAuditor()
        
        # When filtered is True, automatically exclude API references for consistency
        should_exclude_api = exclude_api_references or filtered
        self.linter = LLMDocumentationLinter(exclude_api_references=should_exclude_api)
        
        self.filtered = filtered
        self.exclude_api_references = should_exclude_api
        
    def should_exclude_file(self, relative_path: str) -> bool:
        """Check if a file should be excluded from the filtered report"""
        if not self.filtered:
            return False
            
        # Same filtering logic as the original doc_audit_runner.py
        exclude_patterns = [
            # AddOn SDK references
            'references/addonsdk/',
            # Document API auto-generated classes  
            'references/document-sandbox/document-apis/classes/',
            # Document API auto-generated interfaces
            'references/document-sandbox/document-apis/interfaces/',
            # Document API auto-generated namespaces
            'references/document-sandbox/document-apis/namespaces/',
            # Document API auto-generated type aliases
            'references/document-sandbox/document-apis/type-aliases/',
        ]
        
        # Check if file matches any exclude pattern
        for pattern in exclude_patterns:
            if relative_path.startswith(pattern):
                return True
        
        # Exclude changelog files specifically
        if Path(relative_path).name == 'changelog.md':
            return True
            
        return False
    
    def _filter_framework_report(self, framework_report):
        """Filter framework report to exclude auto-generated files"""
        from llm_readiness_analyzer import AuditReport
        
        # Filter file_analyses
        filtered_analyses = []
        excluded_count = 0
        
        for analysis in framework_report.file_analyses:
            # Extract relative path from the full file path
            # analysis.file_path is typically like: src/pages/references/...
            if 'src/pages/' in analysis.file_path:
                relative_path = analysis.file_path.split('src/pages/')[-1]
            else:
                # Fallback - try to get relative path from docs_path
                try:
                    relative_path = str(Path(analysis.file_path).relative_to(Path(self.docs_path)))
                except ValueError:
                    relative_path = analysis.file_path
                    
            if self.should_exclude_file(relative_path):
                excluded_count += 1
                continue
            filtered_analyses.append(analysis)
        
        print(f"📊 Filtered out {excluded_count} auto-generated/changelog files")
        print(f"📋 Remaining files for analysis: {len(filtered_analyses)}")
        
        # Recalculate scores based on filtered files
        if not filtered_analyses:
            # Return original if no files left (shouldn't happen)
            return framework_report
            
        # Recalculate category scores
        category_scores = {}
        context_clarity_scores = [a.context_clarity_score for a in filtered_analyses]
        code_completeness_scores = [a.code_examples_complete / max(1, a.code_blocks) for a in filtered_analyses]
        error_coverage_scores = [1.0 if a.error_first_sections > 0 else 0.0 for a in filtered_analyses]
        qa_format_scores = [1.0 if a.qa_format_sections > 0 else 0.0 for a in filtered_analyses]
        progressive_scores = [a.progressive_structure_score for a in filtered_analyses]
        searchability_scores = [a.searchability_score for a in filtered_analyses]
        cross_ref_scores = [min(1.0, a.cross_references / 5.0) for a in filtered_analyses]
        
        category_scores['context_clarity'] = sum(context_clarity_scores) / len(context_clarity_scores)
        category_scores['code_completeness'] = sum(code_completeness_scores) / len(code_completeness_scores)
        category_scores['error_coverage'] = sum(error_coverage_scores) / len(error_coverage_scores)
        category_scores['qa_format'] = sum(qa_format_scores) / len(qa_format_scores)
        category_scores['progressive_structure'] = sum(progressive_scores) / len(progressive_scores)
        category_scores['searchability'] = sum(searchability_scores) / len(searchability_scores)
        category_scores['cross_references'] = sum(cross_ref_scores) / len(cross_ref_scores)
        
        # Recalculate overall score
        scoring_weights = {
            'context_clarity': 0.25,
            'code_completeness': 0.20,
            'error_coverage': 0.15,
            'qa_format': 0.15,
            'progressive_structure': 0.10,
            'searchability': 0.10,
            'cross_references': 0.05
        }
        
        overall_score = sum(
            category_scores.get(cat, 0.0) * weight
            for cat, weight in scoring_weights.items()
        )
        
        # Create new filtered report
        return AuditReport(
            timestamp=framework_report.timestamp,
            total_files=len(filtered_analyses),
            overall_score=overall_score,
            category_scores=category_scores,
            query_pattern_coverage=framework_report.query_pattern_coverage,
            critical_issues=framework_report.critical_issues,
            top_recommendations=framework_report.top_recommendations,
            file_analyses=filtered_analyses,
            baseline_hash=framework_report.baseline_hash
        )
    
    def _filter_linter_report(self, linter_report: LintReport) -> LintReport:
        """Filter linter report to exclude auto-generated files"""
        if not self.filtered:
            return linter_report
            
        filtered_documents = []
        excluded_count = 0
        
        for doc in linter_report.documents:
            # Extract relative path
            if 'src/pages/' in doc.file_path:
                relative_path = doc.file_path.split('src/pages/')[-1]
            elif doc.file_path.startswith('src/pages/'):
                relative_path = doc.file_path.replace('src/pages/', '')
            else:
                # Fallback - try to get relative path from docs_path
                try:
                    relative_path = str(Path(doc.file_path).relative_to(Path(self.docs_path)))
                except ValueError:
                    relative_path = doc.file_path
            
            if self.should_exclude_file(relative_path):
                excluded_count += 1
                continue
                
            filtered_documents.append(doc)
        
        print(f"🔍 Linter: Filtered out {excluded_count} auto-generated/changelog files")
        print(f"📋 Linter: Remaining files: {len(filtered_documents)}")
        
        if not filtered_documents:
            return linter_report
        
        # Recalculate report statistics
        total_files = len(filtered_documents)
        overall_score = sum(doc.overall_score for doc in filtered_documents) / total_files if total_files > 0 else 0.0
        
        # Recalculate files by type
        files_by_type = {}
        for doc in filtered_documents:
            content_type = doc.content_type.value
            files_by_type[content_type] = files_by_type.get(content_type, 0) + 1
        
        # Recalculate category averages
        category_sums = {}
        category_counts = {}
        for doc in filtered_documents:
            for category, score in doc.category_scores.items():
                if category not in category_sums:
                    category_sums[category] = 0
                    category_counts[category] = 0
                category_sums[category] += score
                category_counts[category] += 1
        
        category_averages = {
            category: category_sums[category] / category_counts[category]
            for category in category_sums
        }
        
        # Count issues by severity
        critical_issues = sum(
            len([i for i in doc.issues if i.severity == 'critical'])
            for doc in filtered_documents
        )
        major_issues = sum(
            len([i for i in doc.issues if i.severity == 'major'])
            for doc in filtered_documents
        )
        minor_issues = sum(
            len([i for i in doc.issues if i.severity == 'minor'])
            for doc in filtered_documents
        )
        
        # Generate new recommendations
        recommendations = self._generate_linter_recommendations(filtered_documents)
        
        return LintReport(
            timestamp=linter_report.timestamp,
            total_files=total_files,
            files_by_type=files_by_type,
            overall_score=overall_score,
            category_averages=category_averages,
            critical_issues=critical_issues,
            major_issues=major_issues,
            minor_issues=minor_issues,
            documents=filtered_documents,
            recommendations=recommendations
        )
    
    def _generate_linter_recommendations(self, documents: List[DocumentAnalysis]) -> List[str]:
        """Generate recommendations from filtered document list"""
        recommendations = []
        
        # Analyze common issues
        docs_with_issue = {}
        total_issue_counts = {}
        
        for doc in documents:
            for issue in doc.issues:
                if issue.rule_name not in docs_with_issue:
                    docs_with_issue[issue.rule_name] = set()
                    total_issue_counts[issue.rule_name] = 0
                docs_with_issue[issue.rule_name].add(doc.file_path)
                total_issue_counts[issue.rule_name] += 1
        
        # Convert to counts of documents affected
        doc_issue_counts = {rule: len(docs) for rule, docs in docs_with_issue.items()}
        
        # Top issues by number of documents affected
        top_issues = sorted(doc_issue_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        for rule_name, doc_count in top_issues:
            percentage = (doc_count / len(documents)) * 100 if documents else 0
            total_issues = total_issue_counts[rule_name]
            if total_issues > doc_count:
                recommendations.append(f"{rule_name}: Found in {percentage:.1f}% of documents ({doc_count}/{len(documents)}) - {total_issues} total issues")
            else:
                recommendations.append(f"{rule_name}: Found in {percentage:.1f}% of documents ({doc_count}/{len(documents)})")
        
        # Overall score insights
        low_score_docs = [doc for doc in documents if doc.overall_score < 0.7]
        if low_score_docs:
            recommendations.append(f"{len(low_score_docs)} documents have scores below 70% - focus on these for maximum impact")
        
        return recommendations
        
    def run_comprehensive_audit(self) -> Dict[str, Any]:
        """Run all auditing tools and combine results"""
        print("🚀 Starting Comprehensive Documentation Audit (v2 - Enhanced Linter)")
        if self.filtered:
            print("🔍 FILTERED MODE: Excluding auto-generated API references and changelog files")
        if self.exclude_api_references:
            print("📚 API EXCLUSION MODE: Excluding API reference documentation from linter")
        print("=" * 70)
        
        # 1. Run LLM-readiness framework audit
        print("📊 Running LLM-Readiness Framework Audit...")
        framework_report = self.auditor.audit_directory(self.docs_path, filtered=self.filtered)
        
        print("\n🔍 Running Enhanced LLM Documentation Linter...")
        # 2. Run enhanced documentation linter
        docs_path = Path(self.docs_path)
        
        if docs_path.is_file():
            # Single file analysis
            analysis = self.linter.lint_file(str(docs_path))
            if analysis:
                # Create a LintReport from the single file analysis
                from llm_linter import LintReport
                linter_report = LintReport(
                    timestamp=datetime.now().isoformat(),
                    total_files=1,
                    files_by_type={analysis.content_type.value: 1},
                    overall_score=analysis.overall_score,
                    category_averages=analysis.category_scores,
                    critical_issues=len([i for i in analysis.issues if i.severity == 'critical']),
                    major_issues=len([i for i in analysis.issues if i.severity == 'major']),
                    minor_issues=len([i for i in analysis.issues if i.severity == 'minor']),
                    documents=[analysis],
                    recommendations=self._generate_linter_recommendations([analysis])
                )
            else:
                # Create empty report if analysis failed
                from llm_linter import LintReport
                linter_report = LintReport(
                    timestamp=datetime.now().isoformat(),
                    total_files=0,
                    files_by_type={},
                    overall_score=0.0,
                    category_averages={},
                    critical_issues=0,
                    major_issues=0,
                    minor_issues=0,
                    documents=[],
                    recommendations=[]
                )
        else:
            # Directory analysis
            linter_report = self.linter.lint_directory(str(docs_path))
        
        # Linter already excludes API references when self.exclude_api_references is True
        
        # 3. Calculate file-level analysis
        file_analysis = self._combine_file_analysis(framework_report, linter_report)
        
        # 4. Generate comprehensive metrics
        comprehensive_metrics = self._calculate_comprehensive_metrics(
            framework_report, linter_report, file_analysis
        )
        
        # 5. Generate actionable recommendations
        recommendations = self._generate_comprehensive_recommendations(
            framework_report, linter_report, comprehensive_metrics
        )
        
        # 6. Create combined report
        combined_report = {
            'metadata': {
                'timestamp': self.timestamp,
                'docs_path': self.docs_path,
                'audit_version': '2.0.0',
                'total_files': framework_report.total_files,
                'linter_version': 'llm_linter',
                'filtered': self.filtered,
                'exclude_api_references': self.exclude_api_references
            },
            'framework_audit': {
                'overall_score': framework_report.overall_score,
                'category_scores': framework_report.category_scores,
                'query_pattern_coverage': framework_report.query_pattern_coverage,
                'critical_issues': framework_report.critical_issues,
                'baseline_hash': framework_report.baseline_hash
            },
            'linter_audit': {
                'overall_score': linter_report.overall_score,
                'category_averages': linter_report.category_averages,
                'total_files': linter_report.total_files,
                'files_by_type': linter_report.files_by_type,
                'critical_issues': linter_report.critical_issues,
                'major_issues': linter_report.major_issues,
                'minor_issues': linter_report.minor_issues,
                'recommendations': linter_report.recommendations
            },
            'comprehensive_metrics': comprehensive_metrics,
            'file_analysis': file_analysis,
            'recommendations': recommendations,
            'improvement_tracking': {
                'priority_areas': self._identify_priority_areas(comprehensive_metrics),
                'quick_wins': self._identify_quick_wins(linter_report),
                'long_term_goals': self._identify_long_term_goals(framework_report)
            }
        }
        
        return combined_report
    
    def _combine_file_analysis(self, framework_report: AuditReport, 
                              linter_report: LintReport) -> List[Dict[str, Any]]:
        """Combine analysis from both tools at the file level"""
        combined_analysis = []
        
        # Create lookup dict for linter results
        linter_lookup = {doc.file_path: doc for doc in linter_report.documents}
        
        for file_analysis in framework_report.file_analyses:
            file_path = file_analysis.file_path
            linter_result = linter_lookup.get(file_path)
            
            combined_file = {
                'file_path': file_path,
                'relative_path': str(Path(file_path).relative_to(Path(self.docs_path))),
                'title': file_analysis.title,
                'word_count': file_analysis.word_count,
                
                # Framework metrics
                'llm_friendly_score': file_analysis.llm_friendly_score,
                'context_clarity_score': file_analysis.context_clarity_score,
                'code_blocks': file_analysis.code_blocks,
                'complete_examples': file_analysis.code_examples_complete,
                'incomplete_examples': file_analysis.code_examples_incomplete,
                'error_sections': file_analysis.error_first_sections,
                'qa_sections': file_analysis.qa_format_sections,
                'cross_references': file_analysis.cross_references,
                
                # Enhanced linter metrics
                'linter_overall_score': linter_result.overall_score if linter_result else 0.0,
                'linter_content_type': linter_result.content_type.value if linter_result else 'unknown',
                'linter_code_intensity': linter_result.code_intensity.value if linter_result else 'none',
                'linter_category_scores': linter_result.category_scores if linter_result else {},
                'linter_critical_issues': len([i for i in linter_result.issues if i.severity == 'critical']) if linter_result else 0,
                'linter_major_issues': len([i for i in linter_result.issues if i.severity == 'major']) if linter_result else 0,
                'linter_minor_issues': len([i for i in linter_result.issues if i.severity == 'minor']) if linter_result else 0,
                'linter_applied_rules': linter_result.applied_rules if linter_result else [],
                'linter_excluded_rules': linter_result.excluded_rules if linter_result else [],
                
                # Combined assessment
                'overall_health': self._calculate_file_health(file_analysis, linter_result),
                'priority_level': self._calculate_file_priority(file_analysis, linter_result),
                'improvement_potential': self._calculate_improvement_potential(file_analysis, linter_result)
            }
            
            combined_analysis.append(combined_file)
        
        # Sort by priority
        combined_analysis.sort(key=lambda x: x['priority_level'], reverse=True)
        
        return combined_analysis
    
    def _calculate_file_health(self, framework_analysis, linter_result: Optional[DocumentAnalysis]) -> float:
        """Calculate overall health score for a file (0-1)"""
        framework_score = framework_analysis.llm_friendly_score
        
        # Enhanced linter integration
        if linter_result:
            linter_score = linter_result.overall_score
            # Weight framework slightly higher, but integrate linter score
            health_score = (framework_score * 0.6) + (linter_score * 0.4)
        else:
            health_score = framework_score
        
        return max(0.0, min(1.0, health_score))
    
    def _calculate_file_priority(self, framework_analysis, linter_result: Optional[DocumentAnalysis]) -> float:
        """Calculate priority level for fixing a file (0-1, higher = more urgent)"""
        priority = 0.0
        
        # High priority if many critical linter issues
        if linter_result:
            critical_issues = len([i for i in linter_result.issues if i.severity == 'critical'])
            major_issues = len([i for i in linter_result.issues if i.severity == 'major'])
            if critical_issues > 0:
                priority += 0.5
            elif major_issues > 3:
                priority += 0.3
        
        # High priority if low LLM score but high word count (important file)
        if framework_analysis.llm_friendly_score < 0.4 and framework_analysis.word_count > 1000:
            priority += 0.3
        
        # Medium priority if context clarity is low
        if framework_analysis.context_clarity_score < 0.3:
            priority += 0.2
        
        # Medium priority if many incomplete code examples
        if framework_analysis.code_examples_incomplete > framework_analysis.code_examples_complete:
            priority += 0.1
        
        # Consider linter overall score
        if linter_result and linter_result.overall_score < 0.5:
            priority += 0.2
        
        return min(priority, 1.0)
    
    def _calculate_improvement_potential(self, framework_analysis, linter_result: Optional[DocumentAnalysis]) -> float:
        """Calculate how much a file could be improved (0-1)"""
        potential = 0.0
        
        # High potential if low scores but substantial content
        if framework_analysis.word_count > 500:
            current_score = framework_analysis.llm_friendly_score
            potential += (1.0 - current_score) * 0.4
        
        # Additional potential from linter insights
        if linter_result:
            current_linter_score = linter_result.overall_score
            potential += (1.0 - current_linter_score) * 0.4
            
            # Consider fixable issues
            major_minor_issues = len([i for i in linter_result.issues if i.severity in ['major', 'minor']])
            potential += min(major_minor_issues * 0.05, 0.2)
        
        return min(potential, 1.0)
    
    def _calculate_comprehensive_metrics(self, framework_report: AuditReport, 
                                       linter_report: LintReport,
                                       file_analysis: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate comprehensive metrics across all auditing dimensions"""
        
        # Overall health metrics
        avg_file_health = sum(f['overall_health'] for f in file_analysis) / len(file_analysis) if file_analysis else 0.0
        files_needing_attention = sum(1 for f in file_analysis if f['overall_health'] < 0.5)
        high_priority_files = sum(1 for f in file_analysis if f['priority_level'] > 0.6)
        
        # LLM-readiness breakdown
        llm_readiness = {
            'overall_score': framework_report.overall_score,
            'context_clarity_avg': sum(f['context_clarity_score'] for f in file_analysis) / len(file_analysis) if file_analysis else 0.0,
            'code_completeness_ratio': sum(f['complete_examples'] for f in file_analysis) / 
                                     max(1, sum(f['code_blocks'] for f in file_analysis)),
            'error_documentation_coverage': sum(1 for f in file_analysis if f['error_sections'] > 0) / len(file_analysis) if file_analysis else 0.0,
            'qa_format_adoption': sum(1 for f in file_analysis if f['qa_sections'] > 0) / len(file_analysis) if file_analysis else 0.0
        }
        
        # Enhanced quality issues breakdown
        quality_issues = {
            'framework_critical_issues': framework_report.critical_issues,
            'linter_critical_issues': linter_report.critical_issues,
            'linter_major_issues': linter_report.major_issues,
            'linter_minor_issues': linter_report.minor_issues,
            'linter_overall_score': linter_report.overall_score,
            'files_with_issues': sum(1 for f in file_analysis if f['linter_critical_issues'] + f['linter_major_issues'] > 0),
            'content_type_distribution': linter_report.files_by_type
        }
        
        # Content coverage against query data
        query_coverage = framework_report.query_pattern_coverage
        
        # Improvement potential
        total_improvement_potential = sum(f['improvement_potential'] for f in file_analysis)
        avg_improvement_potential = total_improvement_potential / len(file_analysis) if file_analysis else 0.0
        
        return {
            'overall_health': {
                'average_file_health': avg_file_health,
                'files_needing_attention': files_needing_attention,
                'high_priority_files': high_priority_files,
                'health_distribution': self._calculate_health_distribution(file_analysis)
            },
            'llm_readiness': llm_readiness,
            'quality_issues': quality_issues,
            'query_coverage': query_coverage,
            'improvement_potential': {
                'total_potential': total_improvement_potential,
                'average_potential': avg_improvement_potential,
                'high_potential_files': sum(1 for f in file_analysis if f['improvement_potential'] > 0.7)
            }
        }
    
    def _calculate_health_distribution(self, file_analysis: List[Dict[str, Any]]) -> Dict[str, int]:
        """Calculate distribution of file health scores"""
        distribution = {'excellent': 0, 'good': 0, 'fair': 0, 'poor': 0, 'critical': 0}
        
        for file_data in file_analysis:
            health = file_data['overall_health']
            if health >= 0.8:
                distribution['excellent'] += 1
            elif health >= 0.6:
                distribution['good'] += 1
            elif health >= 0.4:
                distribution['fair'] += 1
            elif health >= 0.2:
                distribution['poor'] += 1
            else:
                distribution['critical'] += 1
        
        return distribution
    
    def _generate_comprehensive_recommendations(self, framework_report: AuditReport,
                                              linter_report: LintReport,
                                              metrics: Dict[str, Any]) -> Dict[str, List[str]]:
        """Generate comprehensive, prioritized recommendations"""
        
        immediate_actions = []
        short_term_improvements = []
        long_term_goals = []
        
        # Immediate actions (critical issues)
        if linter_report.critical_issues > 0:
            immediate_actions.append(f"Fix {linter_report.critical_issues} critical linting issues")
        
        if linter_report.major_issues > 50:
            immediate_actions.append(f"Address {linter_report.major_issues} major linting issues")
        
        if metrics['overall_health']['high_priority_files'] > 5:
            immediate_actions.append(f"Address {metrics['overall_health']['high_priority_files']} high-priority files")
        
        # Short-term improvements
        if metrics['llm_readiness']['context_clarity_avg'] < 0.5:
            short_term_improvements.append("Add context headers to code examples")
        
        if metrics['llm_readiness']['code_completeness_ratio'] < 0.6:
            short_term_improvements.append("Complete incomplete code examples with imports and structure")
        
        if linter_report.overall_score < 0.7:
            short_term_improvements.append("Improve overall linter score through systematic issue resolution")
        
        if metrics['llm_readiness']['error_documentation_coverage'] < 0.3:
            short_term_improvements.append("Add error-first documentation sections")
        
        # Long-term goals
        if metrics['llm_readiness']['qa_format_adoption'] < 0.4:
            long_term_goals.append("Convert documentation to Q&A format for better LLM training")
        
        if framework_report.overall_score < 0.7:
            long_term_goals.append("Achieve overall LLM-readiness score of 0.7+")
        
        # Add specific recommendations from framework
        long_term_goals.extend(framework_report.top_recommendations[:3])
        
        # Add linter-specific recommendations
        if linter_report.recommendations:
            short_term_improvements.extend(linter_report.recommendations[:2])
        
        return {
            'immediate_actions': immediate_actions,
            'short_term_improvements': short_term_improvements,
            'long_term_goals': long_term_goals
        }
    
    def _identify_priority_areas(self, metrics: Dict[str, Any]) -> List[str]:
        """Identify priority areas for improvement"""
        priority_areas = []
        
        # Check each metric area
        if metrics['llm_readiness']['context_clarity_avg'] < 0.4:
            priority_areas.append("Context Clarity (UI vs Sandbox)")
        
        if metrics['llm_readiness']['code_completeness_ratio'] < 0.5:
            priority_areas.append("Code Example Completeness")
        
        if metrics['quality_issues']['linter_critical_issues'] > 0:
            priority_areas.append("Critical Linting Issues")
        
        if metrics['quality_issues']['linter_overall_score'] < 0.6:
            priority_areas.append("General Documentation Quality")
        
        if metrics['llm_readiness']['error_documentation_coverage'] < 0.3:
            priority_areas.append("Error-First Documentation")
        
        return priority_areas
    
    def _identify_quick_wins(self, linter_report: LintReport) -> List[str]:
        """Identify quick wins from enhanced linter results"""
        quick_wins = []
        
        # Analyze common issues in the linter report
        if linter_report.recommendations:
            # Convert linter recommendations to quick wins
            for rec in linter_report.recommendations[:3]:
                if 'frontmatter_metadata' in rec:
                    quick_wins.append("Add missing YAML frontmatter to documents")
                elif 'consistent_terminology' in rec:
                    quick_wins.append("Standardize terminology across documentation")
                elif 'alt_text_for_images' in rec:
                    quick_wins.append("Add alt text to images for accessibility")
                elif 'semantic_markup' in rec:
                    quick_wins.append("Improve code block language specification")
        
        # Add general quick wins based on issue patterns
        if linter_report.major_issues > linter_report.critical_issues * 3:
            quick_wins.append("Focus on resolving major issues for quick improvement")
        
        return quick_wins
    
    def _identify_long_term_goals(self, framework_report: AuditReport) -> List[str]:
        """Identify long-term improvement goals"""
        goals = []
        
        if framework_report.overall_score < 0.6:
            goals.append("Achieve 60%+ overall LLM-readiness score")
        
        # Check query coverage
        low_coverage_areas = [
            area for area, coverage in framework_report.query_pattern_coverage.items()
            if coverage < 0.5
        ]
        
        if low_coverage_areas:
            goals.append(f"Improve coverage for: {', '.join(low_coverage_areas)}")
        
        goals.append("Establish automated documentation quality monitoring")
        goals.append("Integrate enhanced linting into CI/CD pipeline")
        
        return goals
    
    def compare_with_baseline(self, current_report: Dict[str, Any], 
                            baseline_path: str) -> Dict[str, Any]:
        """Compare current report with baseline"""
        try:
            with open(baseline_path, 'r') as f:
                baseline_report = json.load(f)
        except Exception as e:
            return {'error': f"Could not load baseline: {e}"}
        
        comparison = {
            'timeline': {
                'baseline_date': baseline_report['metadata']['timestamp'],
                'current_date': current_report['metadata']['timestamp'],
                'days_elapsed': self._calculate_days_elapsed(
                    baseline_report['metadata']['timestamp'],
                    current_report['metadata']['timestamp']
                )
            },
            'progress_summary': [],
            'score_changes': {
                'overall_llm_score': {
                    'baseline': baseline_report['framework_audit']['overall_score'],
                    'current': current_report['framework_audit']['overall_score'],
                    'change': current_report['framework_audit']['overall_score'] - 
                             baseline_report['framework_audit']['overall_score']
                },
                'overall_linter_score': {
                    'baseline': baseline_report.get('linter_audit', {}).get('overall_score', 0.0),
                    'current': current_report['linter_audit']['overall_score'],
                    'change': current_report['linter_audit']['overall_score'] - 
                             baseline_report.get('linter_audit', {}).get('overall_score', 0.0)
                }
            },
            'metric_changes': {},
            'issue_changes': {
                'framework_critical_issues': {
                    'baseline': len(baseline_report['framework_audit']['critical_issues']),
                    'current': len(current_report['framework_audit']['critical_issues']),
                    'change': len(current_report['framework_audit']['critical_issues']) - 
                             len(baseline_report['framework_audit']['critical_issues'])
                },
                'linter_critical_issues': {
                    'baseline': baseline_report.get('linter_audit', {}).get('critical_issues', 0),
                    'current': current_report['linter_audit']['critical_issues'],
                    'change': current_report['linter_audit']['critical_issues'] - 
                             baseline_report.get('linter_audit', {}).get('critical_issues', 0)
                },
                'linter_major_issues': {
                    'baseline': baseline_report.get('linter_audit', {}).get('major_issues', 0),
                    'current': current_report['linter_audit']['major_issues'],
                    'change': current_report['linter_audit']['major_issues'] - 
                             baseline_report.get('linter_audit', {}).get('major_issues', 0)
                }
            },
            'progress_summary': []
        }
        
        # Calculate metric changes
        current_metrics = current_report['comprehensive_metrics']
        baseline_metrics = baseline_report.get('comprehensive_metrics', {})
        
        for category in ['context_clarity_avg', 'code_completeness_ratio', 'error_documentation_coverage']:
            baseline_val = baseline_metrics.get('llm_readiness', {}).get(category, 0.0)
            current_val = current_metrics['llm_readiness'][category]
            change = current_val - baseline_val
            comparison['metric_changes'][category] = {
                'baseline': baseline_val,
                'current': current_val,
                'change': change
            }
        
        # Generate progress summary
        llm_change = comparison['score_changes']['overall_llm_score']['change']
        linter_change = comparison['score_changes']['overall_linter_score']['change']
        critical_change = comparison['issue_changes']['linter_critical_issues']['change']
        major_change = comparison['issue_changes']['linter_major_issues']['change']
        
        if llm_change > 0.05:
            comparison['progress_summary'].append("✅ Significant improvement in overall LLM-readiness")
        elif llm_change < -0.05:
            comparison['progress_summary'].append("⚠️ Decline in overall LLM-readiness")
        elif llm_change > 0:
            comparison['progress_summary'].append("📈 Small improvement in LLM-readiness")
        elif llm_change < 0:
            comparison['progress_summary'].append("📉 Small decline in LLM-readiness")
        else:
            comparison['progress_summary'].append("📊 No change in LLM-readiness")
        
        if linter_change > 0.05:
            comparison['progress_summary'].append("✅ Significant improvement in linter score")
        elif linter_change < -0.05:
            comparison['progress_summary'].append("⚠️ Decline in linter score")
        elif linter_change > 0:
            comparison['progress_summary'].append("📈 Small improvement in linter score")
        elif linter_change < 0:
            comparison['progress_summary'].append("📉 Small decline in linter score")
        else:
            comparison['progress_summary'].append("📊 No change in linter score")
        
        if critical_change < 0:
            comparison['progress_summary'].append(f"✅ Reduced critical linting issues ({abs(critical_change)} fewer)")
        elif critical_change > 0:
            comparison['progress_summary'].append(f"⚠️ Increased critical linting issues ({critical_change} more)")
            
        if major_change < 0:
            comparison['progress_summary'].append(f"✅ Reduced major linting issues ({abs(major_change)} fewer)")
        elif major_change > 0:
            comparison['progress_summary'].append(f"⚠️ Increased major linting issues ({major_change} more)")
        
        return comparison
    
    def _calculate_days_elapsed(self, baseline_timestamp: str, current_timestamp: str) -> int:
        """Calculate days elapsed between timestamps"""
        try:
            baseline_dt = datetime.fromisoformat(baseline_timestamp.replace('Z', '+00:00'))
            current_dt = datetime.fromisoformat(current_timestamp.replace('Z', '+00:00'))
            return (current_dt - baseline_dt).days
        except:
            return 0
    
    def save_report(self, report: Dict[str, Any], output_path: str):
        """Save report"""
        # Ensure output directory exists
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w') as f:
            json.dump(report, f, indent=2, default=str)
    
    def print_executive_summary(self, report: Dict[str, Any], comparison: Dict[str, Any] = None):
        """Print executive summary of audit results"""
        print("\n" + "="*70)
        print("📋 ADOBE EXPRESS ADD-ONS DOCUMENTATION AUDIT v2 - EXECUTIVE SUMMARY")
        print("="*70)
        
        metadata = report['metadata']
        metrics = report['comprehensive_metrics']
        
        print(f"📅 Audit Date: {metadata['timestamp']}")
        print(f"📁 Files Analyzed: {metadata['total_files']}")
        print(f"📂 Documentation Path: {metadata['docs_path']}")
        print(f"🔧 Linter Version: {metadata.get('linter_version', 'legacy')}")
        if metadata.get('filtered'):
            print("🔍 Mode: Filtered (excluding auto-generated files)")
        if metadata.get('exclude_api_references'):
            print("📚 API References: Excluded from linter analysis")
        print()
        
        # Overall health
        health = metrics['overall_health']
        print("🎯 OVERALL HEALTH ASSESSMENT:")
        print(f"   Average File Health: {health['average_file_health']:.2f}/1.00")
        print(f"   Files Needing Attention: {health['files_needing_attention']}")
        print(f"   High Priority Files: {health['high_priority_files']}")
        print()
        
        # LLM Readiness
        llm = metrics['llm_readiness']
        print("🤖 LLM-READINESS METRICS:")
        print(f"   Overall LLM Score: {llm['overall_score']:.2f}/1.00")
        print(f"   Context Clarity: {llm['context_clarity_avg']:.2f}/1.00")
        print(f"   Code Completeness: {llm['code_completeness_ratio']:.2f}/1.00")
        print(f"   Error Documentation: {llm['error_documentation_coverage']:.1%}")
        print(f"   Q&A Format Adoption: {llm['qa_format_adoption']:.1%}")
        print()
        
        # Enhanced Quality Issues
        quality = metrics['quality_issues']
        linter_audit = report['linter_audit']
        print("🚨 QUALITY ISSUES:")
        # Handle both old and new data structures
        critical_errors = quality.get('linter_critical_issues', quality.get('critical_linter_errors', 'N/A'))
        major_errors = quality.get('linter_major_issues', 'N/A')
        minor_errors = quality.get('linter_minor_issues', 'N/A')
        files_with_errors = quality.get('files_with_issues', quality.get('files_with_errors', 'N/A'))
        
        print(f"   Total Linting Errors: {critical_errors}")
        if major_errors != 'N/A':
            print(f"   Major Issues: {major_errors}")
        if minor_errors != 'N/A':
            print(f"   Minor Issues: {minor_errors}")
        if 'linter_overall_score' in quality:
            print(f"   Overall Linter Score: {quality['linter_overall_score']:.2f}/1.00")
        print(f"   Files with Issues: {files_with_errors} out of {metadata['total_files']}")
        print()
        
        # Content Type Distribution
        print("📊 CONTENT TYPE DISTRIBUTION:")
        content_distribution = quality.get('content_type_distribution', {})
        for content_type, count in content_distribution.items():
            print(f"   {content_type.title()}: {count}")
        print()
        
        # Comparison with baseline
        if comparison and 'error' not in comparison:
            print("📈 PROGRESS SINCE BASELINE:")
            score_change = comparison['score_changes']['overall_llm_score']['change']
            linter_change = comparison['score_changes']['overall_linter_score']['change']
            print(f"   LLM Score Change: {score_change:+.3f}")
            print(f"   Linter Score Change: {linter_change:+.3f}")
            print(f"   Days Elapsed: {comparison['timeline']['days_elapsed']}")
            for progress in comparison['progress_summary']:
                print(f"   {progress}")
            print()
        
        # Top recommendations
        recommendations = report['recommendations']
        print("💡 IMMEDIATE ACTIONS REQUIRED:")
        for action in recommendations['immediate_actions'][:3]:
            print(f"   🔥 {action}")
        print()
        
        print("📋 SHORT-TERM IMPROVEMENTS:")
        for improvement in recommendations['short_term_improvements'][:3]:
            print(f"   ⚡ {improvement}")
        print()
        
        # Priority areas
        priority_areas = report['improvement_tracking']['priority_areas']
        if priority_areas:
            print("🎯 PRIORITY AREAS:")
            for area in priority_areas:
                print(f"   📌 {area}")
            print()
        
        print("="*70)

def main():
    parser = argparse.ArgumentParser(description='Comprehensive Adobe Express Add-ons documentation audit v2 (Enhanced Linter)')
    parser.add_argument('--docs-path', default='src/pages',
                       help='Path to documentation directory')
    parser.add_argument('--output', default='reports/raw/comprehensive_doc_audit_v2_report.json',
                       help='Output file for comprehensive report')
    parser.add_argument('--baseline', action='store_true',
                       help='Save this audit as baseline for future comparison')
    parser.add_argument('--input', type=str,
                       help='Load existing audit report JSON file instead of running new audit')
    parser.add_argument('--compare', type=str,
                       help='Compare with previous audit report')
    parser.add_argument('--full-report', action='store_true',
                       help='Generate detailed file-by-file analysis')
    parser.add_argument('--filtered', action='store_true',
                       help='Exclude auto-generated API references and changelog files (focus on core documentation)')
    parser.add_argument('--exclude-api-references', action='store_true',
                       help='Exclude API reference documentation from linter analysis')
    
    args = parser.parse_args()
    
    # Initialize audit runner
    runner = DocumentationAuditRunnerV2(
        args.docs_path, 
        filtered=args.filtered, 
        exclude_api_references=args.exclude_api_references
    )
    
    # Show filtering configuration
    if args.filtered:
        print("🔍 FILTERED MODE: Excluding auto-generated API references and technical files")
        print("   Both LLM analyzer and linter will process the same core documentation files")
    elif args.exclude_api_references:
        print("🔍 API EXCLUSION MODE: Linter excludes API references, analyzer processes all files")
    
    # Load existing report or run new audit
    if args.input:
        print(f"📂 Loading existing audit report from: {args.input}")
        try:
            with open(args.input, 'r') as f:
                report = json.load(f)
            print(f"✅ Successfully loaded audit report from {args.input}")
        except FileNotFoundError:
            print(f"❌ Error: Input file not found: {args.input}")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"❌ Error: Invalid JSON in input file: {e}")
            sys.exit(1)
    else:
        # Run comprehensive audit
        report = runner.run_comprehensive_audit()
    
    # Handle comparison if requested
    comparison = None
    if args.compare:
        comparison = runner.compare_with_baseline(report, args.compare)
        # Include comparison data in the report
        if comparison and 'error' not in comparison:
            report['comparison_with_baseline'] = comparison
    
    # Print executive summary
    runner.print_executive_summary(report, comparison)
    
    # Check if analyzing a single file for custom naming
    is_single_file = Path(args.docs_path).is_file() and Path(args.docs_path).suffix == '.md'
    if is_single_file:
        # Use the filename (without extension) for the report name
        filename_base = Path(args.docs_path).stem
        file_description = f"single file ({filename_base}.md)"
    else:
        filename_base = None
        scope_parts = []
        if args.filtered:
            scope_parts.append("filtered")
        if args.exclude_api_references:
            scope_parts.append("no-api-refs")
        scope_description = f"v2 ({', '.join(scope_parts)})" if scope_parts else "v2 (complete)"
    
    # Save reports
    if args.baseline:
        if is_single_file:
            baseline_path = f"reports/raw/baseline_v2_{filename_base}_doc_audit_{runner.timestamp}.json"
        else:
            # Include scope in filename to distinguish filtered vs complete baselines
            scope_parts = ["v2"]
            if args.filtered:
                scope_parts.append("filtered")
            if args.exclude_api_references:
                scope_parts.append("no_api_refs")
            scope = "_".join(scope_parts) + "_"
            baseline_path = f"reports/raw/baseline_doc_audit_{scope}{runner.timestamp}.json"
        
        runner.save_report(report, baseline_path)
        description = file_description if is_single_file else scope_description
        print(f"💾 Baseline doc audit report saved as: {baseline_path} ({description})")
    else:
        # Include scope in comprehensive report filename if using default
        if args.output == 'reports/raw/comprehensive_doc_audit_v2_report.json':  # Using default filename
            comparison_suffix = "_comparison" if args.compare else ""
            if is_single_file:
                output_path = f"reports/raw/{filename_base}_doc_audit_v2{comparison_suffix}_{runner.timestamp}.json"
            else:
                scope_parts = ["v2"]
                if args.filtered:
                    scope_parts.append("filtered")
                if args.exclude_api_references:
                    scope_parts.append("no_api_refs")
                scope = "_".join(scope_parts) + "_"
                output_path = f"reports/raw/comprehensive_doc_audit_{scope}{comparison_suffix}_{runner.timestamp}.json"
        else:  # User provided custom filename
            # Add comparison suffix to custom filename too
            if args.compare:
                # Insert _comparison before the .json extension
                base_name = args.output.rsplit('.json', 1)[0] if args.output.endswith('.json') else args.output
                output_path = f"{base_name}_comparison.json"
            else:
                output_path = args.output
        
        runner.save_report(report, output_path)
        description = file_description if is_single_file else scope_description
        comparison_note = " with baseline comparison" if args.compare else ""
        print(f"📊 Comprehensive doc audit report saved as: {output_path} ({description}{comparison_note})")
    
    # Additional detailed output for full reports (only for comprehensive runs, not baselines)
    if args.full_report and not args.baseline:
        comparison_suffix = "_comparison" if args.compare else ""
        if is_single_file:
            detailed_path = f"reports/raw/{filename_base}_detailed_doc_audit_v2{comparison_suffix}_{runner.timestamp}.json"
        else:
            # Include scope in detailed analysis filename too
            scope_parts = ["v2"]
            if args.filtered:
                scope_parts.append("filtered")
            if args.exclude_api_references:
                scope_parts.append("no_api_refs")
            scope = "_".join(scope_parts) + "_"
            detailed_path = f"reports/raw/detailed_doc_audit_{scope}{comparison_suffix}_{runner.timestamp}.json"
        
        with open(detailed_path, 'w') as f:
            json.dump(report['file_analysis'], f, indent=2, default=str)
        description = file_description if is_single_file else scope_description
        comparison_note = " with baseline comparison" if args.compare else ""
        print(f"📄 Detailed doc audit analysis saved to: {detailed_path} ({description}{comparison_note})")

if __name__ == "__main__":
    main()
