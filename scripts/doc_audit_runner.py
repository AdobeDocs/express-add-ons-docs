#!/usr/bin/env python3
"""
Documentation Audit Runner for Adobe Express Add-ons

This script orchestrates the complete documentation auditing process:
1. Runs the LLM-readiness framework audit
2. Runs the specialized markdown linter
3. Generates comprehensive reports
4. Provides comparison with previous audits
5. Tracks improvement metrics

Usage:
    python3 doc_audit_runner.py --baseline
    python3 doc_audit_runner.py --compare baseline_audit_20240127.json
    python3 doc_audit_runner.py --full-report --output improvement_tracking.json
"""

import os
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List, Tuple
import subprocess
import sys

# Import our audit tools
from llm_readiness_analyzer import DocumentationAuditor, AuditReport
from llm_markdown_linter import LLMMarkdownLinter

class DocumentationAuditRunner:
    """Orchestrates comprehensive documentation auditing"""
    
    def __init__(self, docs_path: str = "express-add-ons-docs/src/pages", filtered: bool = False):
        self.docs_path = docs_path
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.auditor = DocumentationAuditor()
        self.linter = LLMMarkdownLinter()
        self.filtered = filtered
        
    def should_exclude_file(self, relative_path: str) -> bool:
        """Check if a file should be excluded from the filtered report"""
        if not self.filtered:
            return False
            
        # Same filtering logic as generate_filtered_baseline_summary.py
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
            # analysis.file_path is typically like: express-add-ons-docs/src/pages/references/...
            if 'express-add-ons-docs/src/pages/' in analysis.file_path:
                relative_path = analysis.file_path.split('express-add-ons-docs/src/pages/')[-1]
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
    
    def _filter_linter_results(self, linter_results):
        """Filter linter results to exclude auto-generated files"""
        filtered_results = {}
        excluded_count = 0
        
        for file_path, result in linter_results.items():
            # Extract relative path
            if 'express-add-ons-docs/src/pages/' in file_path:
                relative_path = file_path.split('express-add-ons-docs/src/pages/')[-1]
            elif file_path.startswith('express-add-ons-docs/src/pages/'):
                relative_path = file_path.replace('express-add-ons-docs/src/pages/', '')
            else:
                # Fallback - try to get relative path from docs_path
                try:
                    relative_path = str(Path(file_path).relative_to(Path(self.docs_path)))
                except ValueError:
                    relative_path = file_path
            
            if self.should_exclude_file(relative_path):
                excluded_count += 1
                continue
                
            filtered_results[file_path] = result
        
        print(f"🔍 Linter: Filtered out {excluded_count} auto-generated/changelog files")
        print(f"📋 Linter: Remaining files: {len(filtered_results)}")
        
        return filtered_results
        
    def run_comprehensive_audit(self) -> Dict[str, Any]:
        """Run all auditing tools and combine results"""
        print("🚀 Starting Comprehensive Documentation Audit")
        if self.filtered:
            print("🔍 FILTERED MODE: Excluding auto-generated API references and changelog files")
        print("=" * 60)
        
        # 1. Run LLM-readiness framework audit
        print("📊 Running LLM-Readiness Framework Audit...")
        framework_report = self.auditor.audit_directory(self.docs_path)
        
        # Apply filtering to framework results if needed
        if self.filtered:
            framework_report = self._filter_framework_report(framework_report)
        
        print("\n🔍 Running LLM-Friendly Markdown Linter...")
        # 2. Run markdown linter
        linter_results = self.linter.lint_directory(self.docs_path)
        
        # Apply filtering to linter results if needed
        if self.filtered:
            linter_results = self._filter_linter_results(linter_results)
            
        linter_report = self.linter.generate_report(linter_results)
        
        # 3. Calculate file-level analysis
        file_analysis = self._combine_file_analysis(framework_report, linter_results)
        
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
                'audit_version': '1.0.0',
                'total_files': framework_report.total_files
            },
            'framework_audit': {
                'overall_score': framework_report.overall_score,
                'category_scores': framework_report.category_scores,
                'query_pattern_coverage': framework_report.query_pattern_coverage,
                'critical_issues': framework_report.critical_issues,
                'baseline_hash': framework_report.baseline_hash
            },
            'linter_audit': {
                'summary': linter_report['summary'],
                'rule_frequency': linter_report['rule_frequency'],
                'most_problematic_files': linter_report['most_problematic_files']
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
                              linter_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Combine analysis from both tools at the file level"""
        combined_analysis = []
        
        # Create lookup dict for linter results
        linter_lookup = {result.file_path: result for result in linter_results.values()}
        
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
                
                # Linter metrics
                'linter_errors': linter_result.error_count if linter_result else 0,
                'linter_warnings': linter_result.warning_count if linter_result else 0,
                'linter_info': linter_result.info_count if linter_result else 0,
                
                # Combined assessment
                'overall_health': self._calculate_file_health(file_analysis, linter_result),
                'priority_level': self._calculate_file_priority(file_analysis, linter_result),
                'improvement_potential': self._calculate_improvement_potential(file_analysis, linter_result)
            }
            
            combined_analysis.append(combined_file)
        
        # Sort by priority
        combined_analysis.sort(key=lambda x: x['priority_level'], reverse=True)
        
        return combined_analysis
    
    def _calculate_file_health(self, framework_analysis, linter_result) -> float:
        """Calculate overall health score for a file (0-1)"""
        framework_score = framework_analysis.llm_friendly_score
        
        # Linter penalty (errors are worse than warnings)
        linter_penalty = 0.0
        if linter_result:
            linter_penalty = (linter_result.error_count * 0.1) + (linter_result.warning_count * 0.05)
            linter_penalty = min(linter_penalty, 0.5)  # Cap penalty at 0.5
        
        health_score = max(0.0, framework_score - linter_penalty)
        return health_score
    
    def _calculate_file_priority(self, framework_analysis, linter_result) -> float:
        """Calculate priority level for fixing a file (0-1, higher = more urgent)"""
        priority = 0.0
        
        # High priority if many linter errors
        if linter_result and linter_result.error_count > 0:
            priority += 0.4
        
        # High priority if low LLM score but high word count (important file)
        if framework_analysis.llm_friendly_score < 0.4 and framework_analysis.word_count > 1000:
            priority += 0.3
        
        # Medium priority if context clarity is low
        if framework_analysis.context_clarity_score < 0.3:
            priority += 0.2
        
        # Medium priority if many incomplete code examples
        if framework_analysis.code_examples_incomplete > framework_analysis.code_examples_complete:
            priority += 0.1
        
        return min(priority, 1.0)
    
    def _calculate_improvement_potential(self, framework_analysis, linter_result) -> float:
        """Calculate how much a file could be improved (0-1)"""
        potential = 0.0
        
        # High potential if low scores but substantial content
        if framework_analysis.word_count > 500:
            current_score = framework_analysis.llm_friendly_score
            potential += (1.0 - current_score) * 0.6
        
        # Additional potential from fixable linter issues
        if linter_result:
            fixable_issues = sum(1 for issue in linter_result.issues if issue.auto_fixable)
            potential += min(fixable_issues * 0.1, 0.4)
        
        return min(potential, 1.0)
    
    def _calculate_comprehensive_metrics(self, framework_report: AuditReport, 
                                       linter_report: Dict[str, Any],
                                       file_analysis: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate comprehensive metrics across all auditing dimensions"""
        
        # Overall health metrics
        avg_file_health = sum(f['overall_health'] for f in file_analysis) / len(file_analysis)
        files_needing_attention = sum(1 for f in file_analysis if f['overall_health'] < 0.5)
        high_priority_files = sum(1 for f in file_analysis if f['priority_level'] > 0.6)
        
        # LLM-readiness breakdown
        llm_readiness = {
            'overall_score': framework_report.overall_score,
            'context_clarity_avg': sum(f['context_clarity_score'] for f in file_analysis) / len(file_analysis),
            'code_completeness_ratio': sum(f['complete_examples'] for f in file_analysis) / 
                                     max(1, sum(f['code_blocks'] for f in file_analysis)),
            'error_documentation_coverage': sum(1 for f in file_analysis if f['error_sections'] > 0) / len(file_analysis),
            'qa_format_adoption': sum(1 for f in file_analysis if f['qa_sections'] > 0) / len(file_analysis)
        }
        
        # Quality issues breakdown
        quality_issues = {
            'critical_linter_errors': linter_report['summary']['total_errors'],
            'files_with_errors': linter_report['summary']['files_with_issues'],
            'most_common_issues': dict(list(linter_report['rule_frequency'].items())[:5]),
            'ai_misinformation_instances': linter_report['rule_frequency'].get('no-fake-api-methods', 0) +
                                         linter_report['rule_frequency'].get('no-fake-imports', 0)
        }
        
        # Content coverage against query data
        query_coverage = framework_report.query_pattern_coverage
        
        # Improvement potential
        total_improvement_potential = sum(f['improvement_potential'] for f in file_analysis)
        avg_improvement_potential = total_improvement_potential / len(file_analysis)
        
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
                                              linter_report: Dict[str, Any],
                                              metrics: Dict[str, Any]) -> Dict[str, List[str]]:
        """Generate comprehensive, prioritized recommendations"""
        
        immediate_actions = []
        short_term_improvements = []
        long_term_goals = []
        
        # Immediate actions (critical issues)
        if linter_report['summary']['total_errors'] > 0:
            immediate_actions.append(f"Fix {linter_report['summary']['total_errors']} critical linting errors")
        
        if metrics['quality_issues']['ai_misinformation_instances'] > 0:
            immediate_actions.append("Remove all AI misinformation (fake API methods and imports)")
        
        if metrics['overall_health']['high_priority_files'] > 5:
            immediate_actions.append(f"Address {metrics['overall_health']['high_priority_files']} high-priority files")
        
        # Short-term improvements
        if metrics['llm_readiness']['context_clarity_avg'] < 0.5:
            short_term_improvements.append("Add context headers to JavaScript code examples")
        
        if metrics['llm_readiness']['code_completeness_ratio'] < 0.6:
            short_term_improvements.append("Complete incomplete code examples with imports and structure")
        
        if metrics['llm_readiness']['error_documentation_coverage'] < 0.3:
            short_term_improvements.append("Add error-first documentation sections")
        
        # Long-term goals
        if metrics['llm_readiness']['qa_format_adoption'] < 0.4:
            long_term_goals.append("Convert documentation to Q&A format for better LLM training")
        
        if framework_report.overall_score < 0.7:
            long_term_goals.append("Achieve overall LLM-readiness score of 0.7+")
        
        # Add specific recommendations from framework
        long_term_goals.extend(framework_report.top_recommendations[:3])
        
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
        
        if metrics['quality_issues']['ai_misinformation_instances'] > 0:
            priority_areas.append("AI Misinformation Removal")
        
        if metrics['llm_readiness']['error_documentation_coverage'] < 0.3:
            priority_areas.append("Error-First Documentation")
        
        return priority_areas
    
    def _identify_quick_wins(self, linter_report: Dict[str, Any]) -> List[str]:
        """Identify quick wins from linter results"""
        quick_wins = []
        
        # Check for auto-fixable issues
        rule_freq = linter_report['rule_frequency']
        
        if rule_freq.get('no-fake-api-methods', 0) > 0:
            quick_wins.append("Replace non-existent API methods with correct alternatives")
        
        if rule_freq.get('no-fake-imports', 0) > 0:
            quick_wins.append("Fix incorrect import statements")
        
        if rule_freq.get('require-context-headers', 0) > 5:
            quick_wins.append("Add context headers to JavaScript code blocks")
        
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
            'score_changes': {
                'overall_llm_score': {
                    'baseline': baseline_report['framework_audit']['overall_score'],
                    'current': current_report['framework_audit']['overall_score'],
                    'change': current_report['framework_audit']['overall_score'] - 
                             baseline_report['framework_audit']['overall_score']
                }
            },
            'metric_changes': {},
            'issue_changes': {
                'linter_errors': {
                    'baseline': baseline_report['linter_audit']['summary']['total_errors'],
                    'current': current_report['linter_audit']['summary']['total_errors'],
                    'change': current_report['linter_audit']['summary']['total_errors'] - 
                             baseline_report['linter_audit']['summary']['total_errors']
                }
            },
            'progress_summary': []
        }
        
        # Calculate metric changes
        current_metrics = current_report['comprehensive_metrics']
        baseline_metrics = baseline_report['comprehensive_metrics']
        
        for category in ['context_clarity_avg', 'code_completeness_ratio', 'error_documentation_coverage']:
            if category in baseline_metrics['llm_readiness'] and category in current_metrics['llm_readiness']:
                change = current_metrics['llm_readiness'][category] - baseline_metrics['llm_readiness'][category]
                comparison['metric_changes'][category] = {
                    'baseline': baseline_metrics['llm_readiness'][category],
                    'current': current_metrics['llm_readiness'][category],
                    'change': change
                }
        
        # Generate progress summary
        if comparison['score_changes']['overall_llm_score']['change'] > 0.05:
            comparison['progress_summary'].append("✅ Significant improvement in overall LLM-readiness")
        elif comparison['score_changes']['overall_llm_score']['change'] < -0.05:
            comparison['progress_summary'].append("⚠️ Decline in overall LLM-readiness")
        
        if comparison['issue_changes']['linter_errors']['change'] < 0:
            comparison['progress_summary'].append("✅ Reduced linting errors")
        elif comparison['issue_changes']['linter_errors']['change'] > 0:
            comparison['progress_summary'].append("⚠️ Increased linting errors")
        
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
        """Save comprehensive report"""
        with open(output_path, 'w') as f:
            json.dump(report, f, indent=2, default=str)
        print(f"📊 Comprehensive report saved to: {output_path}")
    
    def print_executive_summary(self, report: Dict[str, Any], comparison: Dict[str, Any] = None):
        """Print executive summary of audit results"""
        print("\n" + "="*70)
        print("📋 ADOBE EXPRESS ADD-ONS DOCUMENTATION AUDIT - EXECUTIVE SUMMARY")
        print("="*70)
        
        metadata = report['metadata']
        metrics = report['comprehensive_metrics']
        
        print(f"📅 Audit Date: {metadata['timestamp']}")
        print(f"📁 Files Analyzed: {metadata['total_files']}")
        print(f"📂 Documentation Path: {metadata['docs_path']}")
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
        
        # Quality Issues
        quality = metrics['quality_issues']
        print("🚨 QUALITY ISSUES:")
        print(f"   Critical Errors: {quality['critical_linter_errors']}")
        print(f"   Files with Issues: {quality['files_with_errors']}")
        print(f"   AI Misinformation Instances: {quality['ai_misinformation_instances']}")
        print()
        
        # Comparison with baseline
        if comparison and 'error' not in comparison:
            print("📈 PROGRESS SINCE BASELINE:")
            score_change = comparison['score_changes']['overall_llm_score']['change']
            print(f"   LLM Score Change: {score_change:+.3f}")
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
    parser = argparse.ArgumentParser(description='Comprehensive Adobe Express Add-ons documentation audit')
    parser.add_argument('--docs-path', default='express-add-ons-docs/src/pages',
                       help='Path to documentation directory')
    parser.add_argument('--output', default='comprehensive_audit_report.json',
                       help='Output file for comprehensive report')
    parser.add_argument('--baseline', action='store_true',
                       help='Save this audit as baseline for future comparison')
    parser.add_argument('--compare', type=str,
                       help='Compare with previous audit report')
    parser.add_argument('--full-report', action='store_true',
                       help='Generate detailed file-by-file analysis')
    parser.add_argument('--filtered', action='store_true',
                       help='Exclude auto-generated API references and changelog files (focus on core documentation)')
    
    args = parser.parse_args()
    
    # Initialize audit runner
    runner = DocumentationAuditRunner(args.docs_path, filtered=args.filtered)
    
    # Run comprehensive audit
    report = runner.run_comprehensive_audit()
    
    # Handle comparison if requested
    comparison = None
    if args.compare:
        comparison = runner.compare_with_baseline(report, args.compare)
    
    # Print executive summary
    runner.print_executive_summary(report, comparison)
    
    # Save reports
    if args.baseline:
        # Include scope in filename to distinguish filtered vs complete baselines
        scope = "filtered_" if args.filtered else "complete_"
        baseline_path = f"baseline_{scope}{runner.timestamp}_audit.json"
        runner.save_report(report, baseline_path)
        scope_description = "filtered (core docs only)" if args.filtered else "complete (all files)"
        print(f"💾 Baseline saved as: {baseline_path} ({scope_description})")
    
    # Include scope in comprehensive report filename if using default
    if args.output == 'comprehensive_audit_report.json':  # Using default filename
        scope = "filtered_" if args.filtered else "complete_"
        output_path = f"comprehensive_audit_report_{scope}{runner.timestamp}.json"
    else:  # User provided custom filename
        output_path = args.output
    
    runner.save_report(report, output_path)
    
    # Additional detailed output for full reports
    if args.full_report:
        # Include scope in detailed analysis filename too
        scope = "filtered_" if args.filtered else "complete_"
        detailed_path = f"detailed_file_analysis_{scope}{runner.timestamp}.json"
        with open(detailed_path, 'w') as f:
            json.dump(report['file_analysis'], f, indent=2, default=str)
        scope_description = "filtered (core docs only)" if args.filtered else "complete (all files)"
        print(f"📄 Detailed file analysis saved to: {detailed_path} ({scope_description})")

if __name__ == "__main__":
    main() 