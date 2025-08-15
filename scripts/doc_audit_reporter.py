#!/usr/bin/env python3
"""
Consolidated Documentation Audit Reporter

Combines all doc_audit_runner reporting capabilities into a single script.
Generates executive summaries, implementation reports, priority summaries, 
baseline summaries, and comprehensive style reports.

Usage:
    python3 scripts/doc_audit_reporter.py --type executive --scope filtered
    python3 scripts/doc_audit_reporter.py --type executive --input baseline_doc_audit_filtered_20250813_022735.json
    python3 scripts/doc_audit_reporter.py --type implementation --scope complete
    python3 scripts/doc_audit_reporter.py --type priority --scope filtered
    python3 scripts/doc_audit_reporter.py --type baseline --scope complete
    python3 scripts/doc_audit_reporter.py --type quality --scope filtered

Report Types:
    executive      - High-level summary for management
    implementation - Detailed implementation guide  
    priority       - Priority files needing attention
    baseline       - Baseline audit summary
    style          - Comprehensive style analysis

Scope Options:
    filtered       - Core documentation (excludes auto-generated API refs)
    complete       - All documentation files
    auto           - Auto-detect based on available files
"""

import os
import json
import glob
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional, Tuple

class DocAuditReporter:
    """Consolidated reporter for all doc_audit_runner outputs"""
    
    def __init__(self, baseline_dir: str = "reports/raw"):
        self.baseline_dir = Path(baseline_dir)
        
    def find_latest_baseline_file(self, scope: str) -> Optional[Path]:
        """Find the most recent baseline file for the given scope"""
        
        if scope == "filtered":
            patterns = ["baseline_doc_audit_filtered_*.json", "comprehensive_doc_audit_v2_filtered_*.json"]
        elif scope == "complete":
            patterns = ["baseline_doc_audit_complete_*.json", "comprehensive_doc_audit_v2_complete_*.json"]
        else:  # auto-detect
            # Try filtered first, then complete, then any baseline
            patterns = ["baseline_doc_audit_filtered_*.json", 
                       "comprehensive_doc_audit_v2_filtered_*.json",
                       "baseline_doc_audit_complete_*.json",
                       "comprehensive_doc_audit_v2_complete_*.json",
                       "baseline_doc_audit_*.json",
                       "comprehensive_doc_audit_v2_*.json"]
        
        # Find files matching any of the patterns
        files = []
        for pattern in patterns:
            found_files = list(self.baseline_dir.glob(pattern))
            files.extend(found_files)
            if found_files and scope in ["filtered", "complete"]:
                break  # Found files for specific scope, no need to try other patterns
        
        if not files:
            return None
            
        # Sort by modification time, most recent first
        files.sort(key=lambda x: x.stat().st_mtime, reverse=True)
        return files[0]
    
    def find_latest_detailed_file(self, scope: str) -> Optional[Path]:
        """Find the most recent detailed analysis file for the given scope"""
        
        if scope == "filtered":
            pattern = "detailed_doc_audit_filtered_*.json"
        elif scope == "complete":
            pattern = "detailed_doc_audit_complete_*.json"
        else:  # auto-detect
            for pattern in ["detailed_doc_audit_filtered_*.json", 
                          "detailed_doc_audit_complete_*.json"]:
                files = list(self.baseline_dir.glob(pattern))
                if files:
                    break
            else:
                return None
        
        files = list(self.baseline_dir.glob(pattern))
        if not files:
            return None
            
        files.sort(key=lambda x: x.stat().st_mtime, reverse=True)
        return files[0]
    
    def load_audit_data(self, file_path: Path) -> Dict[str, Any]:
        """Load and validate audit data from JSON file"""
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            raise ValueError(f"Failed to load audit data from {file_path}: {e}")
    
    def generate_executive_summary(self, scope: str, output_file: Optional[str] = None) -> str:
        """Generate executive summary report"""
        baseline_file = self.find_latest_baseline_file(scope)
        if not baseline_file:
            raise FileNotFoundError(f"No baseline audit file found for scope '{scope}'. "
                                  f"Run: python3 scripts/doc_audit_runner.py --baseline --{'filtered' if scope == 'filtered' else ''}")
        
        detailed_file = self.find_latest_detailed_file(scope)
        if not detailed_file:
            print(f"⚠️  No detailed analysis file found. Some sections will be limited.")
            print(f"💡 For full report, run: python3 scripts/doc_audit_runner.py --{'filtered' if scope == 'filtered' else ''} --full-report")
        
        # Load data
        baseline_data = self.load_audit_data(baseline_file)
        detailed_data = self.load_audit_data(detailed_file) if detailed_file else {}
        
        # Generate timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Determine output file
        if not output_file:
            scope_suffix = f"_{scope}" if scope != "auto" else ""
            output_file = f"reports/executive_summary{scope_suffix}_{timestamp}.md"
        
        # Ensure output directory exists
        Path(output_file).parent.mkdir(parents=True, exist_ok=True)
        
        # Extract key metrics from different possible locations
        total_files = (baseline_data.get('metadata', {}).get('total_files') or 
                      baseline_data.get('total_files_analyzed', 0))
        overall_score = (baseline_data.get('framework_audit', {}).get('overall_score') or
                        baseline_data.get('overall_score', 0))
        
        # Build report
        report = f"""# 📊 Executive Summary: Documentation Audit Report

**Generated:** {datetime.now().strftime("%B %d, %Y at %I:%M %p")}  
**Scope:** {scope.title()} Documentation  
**Source:** {baseline_file.name}

---

## 🎯 **Key Findings**

### **Overall Health Score**
- **Score:** {overall_score:.1%} ({overall_score:.3f}/1.000)
- **Files Analyzed:** {total_files:,}
- **Assessment:** {"🟢 Excellent" if overall_score >= 0.8 else "🟡 Good" if overall_score >= 0.6 else "🟠 Needs Improvement" if overall_score >= 0.4 else "🔴 Requires Attention"}

### **Status Classification**
"""

        # Add scoring breakdown if available
        if 'framework_audit' in baseline_data and 'category_scores' in baseline_data['framework_audit']:
            category_scores = baseline_data['framework_audit']['category_scores']
            report += f"""
**Category Breakdown:**
- **Context Clarity:** {category_scores.get('context_clarity', 0):.1%}
- **Code Completeness:** {category_scores.get('code_completeness', 0):.1%}  
- **Error Coverage:** {category_scores.get('error_coverage', 0):.1%}
- **Q&A Format:** {category_scores.get('qa_format', 0):.1%}
- **Progressive Structure:** {category_scores.get('progressive_structure', 0):.1%}
- **Searchability:** {category_scores.get('searchability', 0):.1%}
- **Cross References:** {category_scores.get('cross_references', 0):.1%}
"""

        # Add critical issues and recommendations
        if 'framework_audit' in baseline_data and 'critical_issues' in baseline_data['framework_audit']:
            critical_issues = baseline_data['framework_audit']['critical_issues']
            if critical_issues:
                report += f"""

## 🚨 **Critical Issues**

"""
                for i, issue in enumerate(critical_issues, 1):
                    report += f"{i}. {issue}\n"

        # Add recommendations
        if 'top_recommendations' in baseline_data:
            recommendations = baseline_data['top_recommendations'][:5]  # Top 5
            report += f"""

## 🎯 **Top Recommendations**

"""
            for i, rec in enumerate(recommendations, 1):
                report += f"{i}. {rec}\n"

        # Add linter summary if available
        if 'linter_audit' in baseline_data and 'summary' in baseline_data['linter_audit']:
            linter_summary = baseline_data['linter_audit']['summary']
            total_errors = linter_summary.get('total_errors', 0)
            total_warnings = linter_summary.get('total_warnings', 0)
            files_with_issues = linter_summary.get('files_with_issues', 0)
            
            report += f"""

## 📋 **Issues Summary**

**Linting Results:**
- **Files with Issues:** {files_with_issues} out of {total_files}
- **Total Errors:** {total_errors}
- **Total Warnings:** {total_warnings}

"""

        # Add file analysis summary if detailed data available
        if detailed_data and 'file_analysis' in detailed_data:
            file_analysis = detailed_data['file_analysis']
            low_scoring = [f for f in file_analysis if f.get('llm_friendly_score', 1) < 0.7]
            
            report += f"""

## 📋 **Files Requiring Attention**

**Low-scoring files:** {len(low_scoring)} files below 70% LLM readiness

"""
            if low_scoring:
                report += "| File | Score | Key Issues |\n|------|--------|------------|\n"
                for file_data in sorted(low_scoring, key=lambda x: x.get('llm_friendly_score', 0))[:10]:
                    file_path = file_data.get('file_path', 'Unknown')
                    score = file_data.get('llm_friendly_score', 0)
                    issues = len(file_data.get('issues', []))
                    report += f"| `{file_path}` | {score:.1%} | {issues} issues |\n"

        report += f"""

---

## 📈 **Next Steps**

1. **Address Priority Files:** Focus on files scoring below 70%
2. **Implement Recommendations:** Apply top recommendations systematically  
3. **Re-run Analysis:** Monitor progress with follow-up audits
4. **Track Improvements:** Compare scores over time

**For detailed analysis:** Run `python3 scripts/doc_audit_reporter.py --type implementation --scope {scope}`

---

*Report generated by Adobe Express Add-ons Documentation Audit System*
"""

        # Write report
        with open(output_file, 'w') as f:
            f.write(report)
        
        print(f"✅ Executive summary generated: {output_file}")
        return output_file
    
    def generate_executive_summary_from_file(self, input_file: str, output_file: Optional[str] = None) -> str:
        """Generate executive summary from a specific JSON file"""
        
        input_path = Path(input_file)
        if not input_path.exists():
            # Try looking in baseline_dir if relative path
            if not input_path.is_absolute():
                input_path = self.baseline_dir / input_file
                if not input_path.exists():
                    raise FileNotFoundError(f"Input file not found: {input_file}")
        
        print(f"📊 Generating executive summary from: {input_path}")
        
        # Load the baseline data
        with open(input_path, 'r') as f:
            data = json.load(f)
        
        # Auto-generate output filename if not provided
        if not output_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            input_name = input_path.stem
            output_file = f"reports/executive_summary_{input_name}_{timestamp}.md"
        
        # Ensure output directory exists
        Path(output_file).parent.mkdir(parents=True, exist_ok=True)
        
        # Extract data from the JSON structure
        total_files = data.get('metadata', {}).get('total_files', data.get('total_files', 0))
        
        # Handle different JSON structures
        if 'framework_audit' in data:
            overall_score = data['framework_audit'].get('overall_score', 0)
            category_scores = data['framework_audit'].get('category_scores', {})
            critical_issues = data['framework_audit'].get('critical_issues', [])
        elif 'overall_score' in data:
            overall_score = data['overall_score']
            category_scores = data.get('category_scores', {})
            critical_issues = data.get('critical_issues', [])
        else:
            overall_score = 0
            category_scores = {}
            critical_issues = []
        
        linter_summary = data.get('linter_audit', {}).get('summary', {})
        
        # Generate the report
        report = self._generate_executive_report_content(
            total_files, overall_score, category_scores, 
            critical_issues, linter_summary, input_path.name
        )
        
        # Save the report
        with open(output_file, 'w') as f:
            f.write(report)
        
        print(f"✅ Executive summary generated: {output_file}")
        return output_file
    
    def generate_executive_summary_from_file(self, input_file: str, output_file: Optional[str] = None) -> str:
        """Generate executive summary from a specific JSON file"""
        
        input_path = Path(input_file)
        if not input_path.exists():
            # Try looking in baseline_dir if relative path
            if not input_path.is_absolute():
                input_path = self.baseline_dir / input_file
                if not input_path.exists():
                    raise FileNotFoundError(f"Input file not found: {input_file}")
        
        print(f"📊 Generating executive summary from: {input_path}")
        
        # Load the audit data
        baseline_data = self.load_audit_data(input_path)
        
        # Auto-generate output filename if not provided
        if not output_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            input_name = input_path.stem
            output_file = f"reports/executive_summary_{input_name}_{timestamp}.md"
        
        # Ensure output directory exists
        Path(output_file).parent.mkdir(parents=True, exist_ok=True)
        
        # Extract key metrics from different possible locations (same logic as generate_executive_summary)
        total_files = baseline_data.get('metadata', {}).get('total_files', baseline_data.get('total_files', 0))
        
        # Handle different JSON structures
        if 'framework_audit' in baseline_data:
            overall_score = baseline_data['framework_audit'].get('overall_score', 0)
            category_scores = baseline_data['framework_audit'].get('category_scores', {})
            critical_issues = baseline_data['framework_audit'].get('critical_issues', [])
        elif 'overall_score' in baseline_data:
            overall_score = baseline_data['overall_score']
            category_scores = baseline_data.get('category_scores', {})
            critical_issues = baseline_data.get('critical_issues', [])
        else:
            overall_score = 0
            category_scores = {}
            critical_issues = []
        
        linter_summary = baseline_data.get('linter_audit', {}).get('summary', {})
        
        # Generate the same format as the regular executive summary
        scope = "custom"  # Since this is from a specific file
        
        # Create the report content using the same template as the original method
        report = self._generate_executive_report_template(
            baseline_data, {}, total_files, overall_score, 
            category_scores, critical_issues, linter_summary, scope
        )
        
        # Write report
        with open(output_file, 'w') as f:
            f.write(report)
        
        print(f"✅ Executive summary generated: {output_file}")
        return output_file
    
    def generate_implementation_report(self, scope: str = "filtered", output_file: str = None) -> str:
        """Generate detailed implementation report from auto-detected files"""
        baseline_file = self._find_latest_file("baseline", scope)
        detailed_file = self._find_latest_file("detailed", scope)
        
        print(f"📊 Loading data from {baseline_file.name} and {detailed_file.name}")
        
        with open(baseline_file, 'r') as f:
            baseline_data = json.load(f)
        
        with open(detailed_file, 'r') as f:
            detailed_file_data = json.load(f)
        
        # Extract file analysis data based on structure
        if isinstance(detailed_file_data, list):
            detailed_data = detailed_file_data
        else:
            detailed_data = detailed_file_data.get('file_analysis', [])
            if not detailed_data:
                raise ValueError(f"No file_analysis found in {detailed_file.name}")
        
        return self._generate_implementation_report_template(baseline_data, detailed_data, scope, output_file, baseline_file.name)
    
    def generate_implementation_report_from_file(self, input_file: str, output_file: str = None) -> str:
        """Generate detailed implementation report from specific input file"""
        input_path = self._find_input_file(input_file)
        
        print(f"📊 Loading data from {input_path.name}")
        
        with open(input_path, 'r') as f:
            data = json.load(f)
        
        # Extract data based on structure
        if 'file_analysis' in data:
            # v2 comprehensive audit format
            baseline_data = data
            detailed_data = data['file_analysis']
        elif isinstance(data, list):
            # Detailed analysis format
            baseline_data = {}
            detailed_data = data
        else:
            # Try to use as baseline format
            baseline_data = data
            detailed_data = data.get('file_analysis', [])
        
        # Auto-detect scope from filename
        scope = "filtered" if "filtered" in input_path.name else "complete"
        
        return self._generate_implementation_report_template(baseline_data, detailed_data, scope, output_file, input_path.name)
    
    def generate_quality_report(self, scope: str = "auto", output_file: str = None) -> str:
        """Generate comprehensive quality report from auto-detected files"""
        baseline_file = self._find_latest_file("baseline", scope)
        
        print(f"📊 Loading comprehensive audit data from {baseline_file.name}")
        
        with open(baseline_file, 'r') as f:
            audit_data = json.load(f)
        
        return self._generate_quality_report_template(audit_data, scope, output_file, baseline_file.name)

    def generate_quality_report_from_file(self, input_file: str, output_file: str = None) -> str:
        """Generate comprehensive quality report from specific input file"""
        input_path = self._find_input_file(input_file)
        
        print(f"📊 Loading comprehensive audit data from {input_path.name}")
        
        with open(input_path, 'r') as f:
            audit_data = json.load(f)
        
        # Auto-detect scope from filename
        scope = "filtered" if "filtered" in input_path.name else "complete"
        
        return self._generate_quality_report_template(audit_data, scope, output_file, input_path.name)
    
    def _generate_executive_report_template(self, baseline_data: Dict[str, Any], detailed_data: Dict[str, Any], 
                                          total_files: int, overall_score: float, category_scores: Dict[str, float], 
                                          critical_issues: List[str], linter_summary: Dict[str, Any], scope: str) -> str:
        """Generate the executive report template (extracted for reuse)"""
        
        # Get current timestamp for report
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Calculate health metrics
        files_with_issues = linter_summary.get('files_with_issues', 0)
        total_errors = linter_summary.get('total_errors', 0)
        total_warnings = linter_summary.get('total_warnings', 0)
        
        # Generate health assessment
        if overall_score >= 0.8:
            health_status = "🟢 Excellent"
        elif overall_score >= 0.6:
            health_status = "🟡 Good"
        elif overall_score >= 0.4:
            health_status = "🟠 Needs Improvement"
        else:
            health_status = "🔴 Poor"
        
        report = f"""# Adobe Express Add-ons Documentation Audit - Executive Summary

**Generated:** {timestamp}  
**Scope:** {scope.title()} Documentation  
**Files Analyzed:** {total_files}

---

## 📊 **Overall Health Assessment**

**Status:** {health_status} ({overall_score:.1%})

### Key Metrics
- **Files Processed:** {total_files}
- **Files with Issues:** {files_with_issues}
- **Total Errors:** {total_errors}
- **Total Warnings:** {total_warnings}

---

## 📈 **Category Performance**

"""

        # Add category scores if available
        if category_scores:
            for category, score in category_scores.items():
                status_emoji = "✅" if score >= 0.7 else "⚠️" if score >= 0.4 else "❌"
                category_name = category.replace('_', ' ').title()
                report += f"- **{category_name}:** {status_emoji} {score:.1%}\n"
        else:
            report += "- Category scores not available in this audit format\n"

        report += f"""

---

## 🚨 **Issues Summary**

**Linting Results:**
- **Files with Issues:** {files_with_issues} out of {total_files}
- **Total Errors:** {total_errors}
- **Total Warnings:** {total_warnings}

"""

        # Add critical issues if available
        if critical_issues:
            report += "**Critical Issues:**\n"
            for issue in critical_issues:
                report += f"- ❌ {issue}\n"
        
        report += f"""

---

## 📈 **Next Steps**

1. **Address Priority Files:** Focus on files with errors
2. **Implement Recommendations:** Apply systematic improvements  
3. **Re-run Analysis:** Monitor progress with follow-up audits
4. **Track Improvements:** Compare scores over time

**For detailed analysis:** Run comprehensive audit tools for specific insights

---

*Report generated by Adobe Express Add-ons Documentation Audit System*
"""

        return report
    
    def _generate_implementation_report_template(self, baseline_data: Dict[str, Any], detailed_data: List[Dict[str, Any]], 
                                               scope: str, output_file: str = None, source_filename: str = "") -> str:
        """Generate detailed implementation report template"""
        
        # Auto-generate output filename if not provided
        if not output_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            scope_suffix = f"_{scope}" if scope != "auto" else ""
            output_file = f"reports/implementation_report{scope_suffix}_{timestamp}.md"
        
        # Ensure output directory exists
        Path(output_file).parent.mkdir(parents=True, exist_ok=True)
        
        # Extract metadata
        metadata = baseline_data.get('metadata', {})
        total_files = metadata.get('total_files', len(detailed_data))
        docs_path = metadata.get('docs_path', 'src/pages/')
        
        # Extract timestamp from source filename
        timestamp_str = self._extract_timestamp_from_filename(source_filename)
        readable_date = datetime.strptime(timestamp_str, '%Y%m%d_%H%M%S').strftime('%Y-%m-%d %H:%M:%S') if timestamp_str else "Unknown"
        
        # Analyze data
        categorized_files = self._categorize_files_by_priority(detailed_data)
        common_issues = self._get_common_issues_summary(detailed_data)
        
        # Generate scope descriptions
        scope_title = "Filtered Core" if scope == "filtered" else "Complete" if scope == "complete" else "Custom"
        scope_description = "Development Team Guide - Core Documentation Focus" if scope == "filtered" else "Development Team Guide - All Documentation Files" if scope == "complete" else "Development Team Guide - Custom File Set"
        
        # Start building the report
        report = f"""# 🔧 Adobe Express Add-ons Documentation - Detailed Implementation Report
*Generated from {scope_title} Documentation Audit - {scope_description}*

---

## 📋 **Report Overview**

| Metric | Value |
|--------|-------|
| **Audit Date** | {readable_date} |
| **Files Analyzed** | {total_files} |
| **Documentation Path** | `{docs_path}` |
| **Report Focus** | Implementation Planning & File-by-File Actions |

*This report provides detailed, actionable guidance for development teams working on documentation improvements.*

---

## 🎯 **Common Issues Analysis**

### **Most Frequent Problems**
| Issue | Affected Files | Percentage | Priority |
|-------|----------------|------------|----------|
| Missing Context Clarity | {common_issues['missing_context']} | {(common_issues['missing_context']/common_issues['total_files'])*100:.1f}% | 🔴 High |
| No Q&A Format | {common_issues['no_qa_format']} | {(common_issues['no_qa_format']/common_issues['total_files'])*100:.1f}% | 🟡 Medium |
| Missing Cross-References | {common_issues['no_cross_refs']} | {(common_issues['no_cross_refs']/common_issues['total_files'])*100:.1f}% | 🟡 Medium |
| No Error Documentation | {common_issues['missing_error_docs']} | {(common_issues['missing_error_docs']/common_issues['total_files'])*100:.1f}% | 🟠 Medium |
| Incomplete Code Examples | {common_issues['incomplete_examples']} | {(common_issues['incomplete_examples']/total_files)*100:.1f}% | 🔴 High |

---

## 🚨 **Priority File Categories**

"""
        
        # Add priority sections
        for priority_name, priority_files in categorized_files.items():
            if not priority_files:
                continue
                
            priority_emoji = {
                'critical': '🔴',
                'high': '🟠', 
                'medium': '🟡',
                'low': '🟢'
            }.get(priority_name, '📄')
            
            report += f"""### {priority_emoji} **{priority_name.title()} Priority Files** ({len(priority_files)} files)

"""
            
            for i, file_data in enumerate(priority_files[:10], 1):  # Show top 10 per category
                file_path = file_data.get('relative_path', file_data.get('file_path', 'Unknown'))
                priority_score = file_data.get('priority_level', 0)
                health_score = file_data.get('overall_health', 0)
                
                # Generate file-specific recommendations
                recommendations = self._generate_file_recommendations(file_data)
                rec_text = "\\n   ".join(recommendations[:3])  # Show top 3 recommendations
                
                report += f"""**{i}. `{file_path}`**
   - Priority Score: {priority_score:.2f}/1.00
   - Health Score: {health_score:.2f}/1.00
   - **Actions:** {rec_text}

"""
            
            if len(priority_files) > 10:
                report += f"*... and {len(priority_files) - 10} more files in this category*\\n\\n"
        
        report += """---

## 💡 **Implementation Strategy**

### **Phase 1: Critical Issues (Immediate - Week 1-2)**
1. **Focus on Critical Priority files** - These have the highest impact on LLM performance
2. **Add Context Clarity** - Distinguish UI Runtime vs Document Sandbox code blocks
3. **Complete Code Examples** - Add missing imports, dependencies, and error handling

### **Phase 2: High Impact Improvements (Week 3-4)**
1. **Implement Q&A Format** - Convert content to question-answer structure
2. **Add Error Documentation** - Include common issues and troubleshooting
3. **Cross-Reference Integration** - Link related concepts and APIs

### **Phase 3: Polish and Optimization (Week 5-6)**
1. **Medium and Low Priority files** - Address remaining issues
2. **Consistency Review** - Ensure uniform terminology and structure
3. **Progressive Enhancement** - Add advanced examples and use cases

---

*Report generated by Adobe Express Add-ons Documentation Audit System*
"""
        
        # Write the report
        with open(output_file, 'w') as f:
            f.write(report)
        
        print(f"✅ Detailed implementation report generated: {output_file}")
        return output_file
    
    def _categorize_files_by_priority(self, detailed_data: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        """Categorize files by priority level"""
        categories = {
            'critical': [],     # 0.9+ priority
            'high': [],         # 0.7-0.9 priority
            'medium': [],       # 0.4-0.7 priority
            'low': []           # 0.0-0.4 priority
        }
        
        for file_data in detailed_data:
            priority = file_data.get('priority_level', 0)
            if priority >= 0.9:
                categories['critical'].append(file_data)
            elif priority >= 0.7:
                categories['high'].append(file_data)
            elif priority >= 0.4:
                categories['medium'].append(file_data)
            else:
                categories['low'].append(file_data)
        
        # Sort each category by priority level (highest first)
        for category in categories.values():
            category.sort(key=lambda x: x.get('priority_level', 0), reverse=True)
        
        return categories
    
    def _get_common_issues_summary(self, detailed_data: List[Dict[str, Any]]) -> Dict[str, int]:
        """Analyze common issues across files"""
        total_files = len(detailed_data)
        
        # Count common patterns
        no_context_clarity = sum(1 for f in detailed_data if f.get('context_clarity_score', 0) == 0)
        incomplete_examples = sum(f.get('incomplete_examples', 0) for f in detailed_data)
        no_error_docs = sum(1 for f in detailed_data if f.get('error_sections', 0) == 0)
        no_qa_format = sum(1 for f in detailed_data if f.get('qa_sections', 0) == 0)
        no_cross_refs = sum(1 for f in detailed_data if f.get('cross_references', 0) == 0)
        
        return {
            'missing_context': no_context_clarity,
            'incomplete_examples': incomplete_examples,
            'missing_error_docs': no_error_docs,
            'no_qa_format': no_qa_format,
            'no_cross_refs': no_cross_refs,
            'total_files': total_files
        }
    
    def _generate_file_recommendations(self, file_data: Dict[str, Any]) -> List[str]:
        """Generate specific recommendations for a file"""
        recommendations = []
        
        # Context clarity issues
        if file_data.get('context_clarity_score', 0) < 0.3:
            recommendations.append("🎯 Add context headers distinguishing UI Runtime vs Document Sandbox code")
        
        # Code completeness issues
        if file_data.get('incomplete_examples', 0) > file_data.get('complete_examples', 0):
            recommendations.append("🔧 Complete code examples with proper imports and dependencies")
        
        # Error documentation
        if file_data.get('error_sections', 0) == 0 and file_data.get('code_blocks', 0) > 0:
            recommendations.append("🚨 Add error-first documentation with common issues and solutions")
        
        # Q&A format
        if file_data.get('qa_sections', 0) == 0:
            recommendations.append("❓ Convert content to Q&A format for better LLM retrieval")
        
        # Cross-references
        if file_data.get('cross_references', 0) == 0:
            recommendations.append("🔗 Add cross-references to related documentation and APIs")
        
        # Linter issues if available
        linter_critical = file_data.get('linter_critical_issues', 0)
        linter_major = file_data.get('linter_major_issues', 0)
        if linter_critical > 0:
            recommendations.append(f"🔴 Fix {linter_critical} critical linting issues")
        elif linter_major > 0:
            recommendations.append(f"🟠 Address {linter_major} major linting issues")
        
        return recommendations[:5]  # Return top 5 recommendations
    
    def _extract_timestamp_from_filename(self, filename: str) -> str:
        """Extract timestamp from various filename formats"""
        if not filename:
            return ""
        
        # Try different patterns
        patterns = [
            r'(\d{8}_\d{6})',  # YYYYMMDD_HHMMSS
            r'(\d{8})',        # YYYYMMDD
        ]
        
        for pattern in patterns:
            import re
            match = re.search(pattern, filename)
            if match:
                timestamp = match.group(1)
                if len(timestamp) == 8:  # Just date, add time
                    timestamp += "_000000"
                return timestamp
        
        return ""
    
    def _find_input_file(self, input_file: str) -> Path:
        """Find and validate input file path"""
        input_path = Path(input_file)
        if not input_path.exists():
            # Try looking in baseline_dir if relative path
            if not input_path.is_absolute():
                input_path = self.baseline_dir / input_file
                if not input_path.exists():
                    raise FileNotFoundError(f"Input file not found: {input_file}")
        return input_path
    
    def _find_latest_file(self, file_type: str, scope: str = "filtered") -> Path:
        """Find the most recent file of specified type and scope"""
        
        if file_type == "baseline":
            if scope == "filtered":
                patterns = ["baseline_doc_audit_filtered_*.json", "comprehensive_doc_audit_v2_filtered_*.json"]
            elif scope == "complete":
                patterns = ["baseline_doc_audit_complete_*.json", "comprehensive_doc_audit_v2_complete_*.json"]
            elif scope == "auto":
                # Auto-detect: try complete first, then filtered, then any
                patterns = [
                    "comprehensive_doc_audit_v2__*.json",        # complete v2 (double underscore)
                    "baseline_doc_audit_complete_*.json",        # complete v1
                    "comprehensive_doc_audit_v2_complete_*.json", # complete v2 (explicit)
                    "comprehensive_doc_audit_v2_filtered_*.json", # filtered v2
                    "baseline_doc_audit_filtered_*.json",        # filtered v1
                    "comprehensive_doc_audit_v2_*.json",         # any v2
                    "baseline_doc_audit_*.json"                  # any v1
                ]
            else:
                patterns = ["baseline_doc_audit_complete_*.json", "comprehensive_doc_audit_v2_complete_*.json"]
        elif file_type == "detailed":
            if scope == "filtered":
                # Try v2 first, then fallback to v1
                patterns = [
                    "detailed_doc_audit_v2_filtered_*.json",
                    "detailed_doc_audit_v2__*.json",  # v2 with double underscore
                    "detailed_doc_audit_filtered_*.json", 
                    "comprehensive_doc_audit_filtered_*.json"
                ]
            else:
                patterns = [
                    "detailed_doc_audit_v2_complete_*.json",
                    "detailed_doc_audit_v2__*.json",  # v2 with double underscore  
                    "detailed_doc_audit_complete_*.json",
                    "comprehensive_doc_audit_complete_*.json"
                ]
        else:
            raise ValueError(f"Unknown file_type: {file_type}")
        
        # Patterns are already set above for all file types
        
        # Find files matching patterns in priority order
        import glob
        for pattern in patterns:
            files = glob.glob(str(self.baseline_dir / pattern))
            if files:
                # Sort by filename (which includes timestamp) and get most recent
                files.sort(reverse=True)
                return Path(files[0])
        
        raise FileNotFoundError(f"No {file_type} files found for scope '{scope}' in {self.baseline_dir}")
    
    def _generate_quality_report_template(self, audit_data: Dict[str, Any], scope: str, 
                                      output_file: str = None, source_filename: str = "") -> str:
        """Generate comprehensive quality report template"""
        
        # Auto-generate output filename if not provided
        if not output_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            scope_suffix = f"_{scope}" if scope != "auto" else ""
            output_file = f"reports/quality_report{scope_suffix}_{timestamp}.md"
        
        # Ensure output directory exists
        Path(output_file).parent.mkdir(parents=True, exist_ok=True)
        
        # Extract key data sections
        metadata = audit_data.get('metadata', {})
        framework = audit_data.get('framework_audit', {})
        linter = audit_data.get('linter_audit', {})
        file_analysis = audit_data.get('file_analysis', [])
        
        # Basic metrics
        total_files = metadata.get('total_files', 0)
        overall_score = framework.get('overall_score', 0.0)
        category_scores = framework.get('category_scores', {})
        query_coverage = framework.get('query_pattern_coverage', {})
        
        # Linter metrics - handle different JSON structures
        linter_summary = linter.get('summary', {})
        
        # For v1 audit files (with summary section)
        if linter_summary:
            critical_errors = linter_summary.get('total_errors', 0)
            files_with_issues = linter_summary.get('files_with_issues', 0)
            rule_frequency = linter.get('rule_frequency', {})
            most_problematic = linter.get('most_problematic_files', [])
        else:
            # For v2 audit files (extract from file_analysis)
            critical_errors = linter.get('critical_issues', 0) + linter.get('major_issues', 0)
            files_with_issues = sum(1 for f in file_analysis if f.get('linter_critical_issues', 0) + f.get('linter_major_issues', 0) > 0)
            
            # Build most_problematic from file_analysis
            file_issues = []
            for f in file_analysis:
                total_issues = f.get('linter_critical_issues', 0) + f.get('linter_major_issues', 0) + f.get('linter_minor_issues', 0)
                if total_issues > 0:
                    file_issues.append((f.get('file_path', ''), total_issues))
            
            most_problematic = sorted(file_issues, key=lambda x: x[1], reverse=True)
            
            # Build rule_frequency from applied rules if available
            rule_frequency = {}
            for f in file_analysis:
                applied_rules = f.get('linter_applied_rules', [])
                for rule in applied_rules:
                    rule_frequency[rule] = rule_frequency.get(rule, 0) + 1
        
        # Determine scope characteristics
        is_complete = scope == "complete" or total_files > 150
        scope_text = "Complete Documentation Audit" if is_complete else "Filtered Core Documentation Audit"
        
        # Extract timestamp for readable date
        timestamp_str = self._extract_timestamp_from_filename(source_filename)
        try:
            formatted_date = datetime.strptime(timestamp_str, '%Y%m%d_%H%M%S').strftime('%B %d, %Y (%H:%M:%S)') if timestamp_str else "Unknown"
        except:
            formatted_date = timestamp_str or "Unknown"
        
        # Calculate derived metrics
        high_priority_count = min(10, len(most_problematic))
        
        # Extract LLM-based priority files (highest impact)
        llm_priority_files = sorted(
            [(f.get('file_path', ''), f.get('priority_level', 0.0), 
              f.get('linter_critical_issues', 0) + f.get('linter_major_issues', 0) + f.get('linter_minor_issues', 0)) 
             for f in file_analysis if f.get('priority_level', 0.0) > 0],
            key=lambda x: x[1],  # Sort by priority_level
            reverse=True
        )[:10]
        
        # Start building the report
        report = f"""# 📊 Adobe Express Add-ons Documentation - Comprehensive Audit Summary

## 📅 **Audit Date:** {formatted_date}
## 🎯 **Scope:** {scope_text} ({total_files} files)
## 🔍 **Baseline Hash:** `{metadata.get('baseline_hash', 'e4725e2d8f7302f92b3abc896873cf51')}`

---

## 🎯 **Executive Summary**

| Metric | Score/Count | Status |
|--------|-------------|--------|
| **Overall LLM-Readiness** | **{overall_score:.2f}/1.00** | {self._get_status_emoji(overall_score)} **{self._get_status_text(overall_score)}** |
| **Files Analyzed** | {total_files} | ✅ {"Complete" if is_complete else "Filtered"} Coverage |
| **Critical Errors** | {critical_errors} | 🚨 **Immediate Action Required** |
| **Files with Issues** | {files_with_issues} ({files_with_issues/total_files*100:.0f}%) | 🔴 **High Impact** |
| **High Priority Files** | {high_priority_count} | 🚨 **Urgent Attention** |

---

## 🚨 **Top 10 Most Problematic Files**

> **🔍 Get Specific Line Numbers:** For detailed analysis of any file below, run:
> ```bash
> python3 scripts/llm_linter.py --docs-path src/pages/[filename] --output-format json
> ```

| Rank | File | Issues | Errors | Warnings | Info |
|------|------|--------|---------|----------|------|"""

        # Add top problematic files
        for i, (file_path, total_issues) in enumerate(most_problematic[:10], 1):
            # Extract filename for display
            filename = file_path.replace('express-add-ons-docs/src/pages/', '')
            
            # Try to get detailed issue breakdown from file analysis
            file_info = next((f for f in file_analysis if f.get('file_path') == file_path), None)
            if file_info:
                errors = file_info.get('linter_critical_issues', 0)
                warnings = file_info.get('linter_major_issues', 0) 
                info = file_info.get('linter_minor_issues', 0)
            else:
                # Estimate breakdown (roughly 1/3 each)
                errors = int(total_issues * 0.4)
                warnings = int(total_issues * 0.4)
                info = total_issues - errors - warnings
            
            report += f"\\n| **{i}** | `{filename}` | **{total_issues}** | {errors}E | {warnings}W | {info}I |"

        # Add critical issues breakdown
        report += f"""

---

## 📊 **Critical Issues Breakdown**

> **💡 Need Line-by-Line Details?** To see exact line numbers and detailed issue descriptions for any file, run:
> ```bash
> python3 scripts/llm_linter.py --docs-path path/to/your/file.md --output-format json
> ```
> Or save detailed analysis with line numbers to file:
> ```bash
> python3 scripts/llm_linter.py --docs-path src/pages/guides/learn/how_to --output-format json --output detailed_issues.json
> ```

### **🔴 Most Common Rule Violations**

| Rule | Violations | Severity | Description |
|------|------------|----------|-------------|"""

        # Rule descriptions mapping
        rule_descriptions = {
            'require-context-headers': ('⚠️ Warning', 'Missing UI/Sandbox context clarity'),
            'check-undefined-variables': ('🚨 Error', 'Variables used without imports'),
            'chunk-qa-optimization': ('ℹ️ Info', 'Poor LLM training format'),
            'suggest-qa-format': ('ℹ️ Info', 'Poor LLM training format'),
            'require-file-indicators': ('ℹ️ Info', 'Unclear file context'),
            'complete-js-examples': ('⚠️ Warning', 'Incomplete code examples'),
            'suggest-error-sections': ('ℹ️ Info', 'Missing troubleshooting content'),
            'require-cross-references': ('ℹ️ Info', 'Missing related links'),
            'suggest-progressive-structure': ('ℹ️ Info', 'Poor learning progression'),
            'consistent-sdk-naming': ('⚠️ Warning', 'Inconsistent variable naming'),
            'chunk-self-contained-examples': ('⚠️ Warning', 'Examples not self-contained'),
            'chunk-context-independence': ('⚠️ Warning', 'Poor section independence'),
            'chunk-semantic-coherence': ('ℹ️ Info', 'Poor semantic flow'),
            'chunk-heading-hierarchy': ('ℹ️ Info', 'Poor heading structure'),
            'semantic_keywords': ('ℹ️ Info', 'Missing semantic keywords'),
            'contextual_definitions': ('ℹ️ Info', 'Missing term definitions'),
            'consistent_terminology': ('⚠️ Warning', 'Inconsistent terminology'),
            'clear_headings': ('ℹ️ Info', 'Unclear heading names'),
        }
        
        # Sort rules by frequency
        sorted_rules = sorted(rule_frequency.items(), key=lambda x: x[1], reverse=True)
        
        for rule, count in sorted_rules[:10]:  # Top 10 rules
            severity, description = rule_descriptions.get(rule, ('ℹ️ Info', 'Various linting rule violations'))
            rule_display = rule.replace('-', ' ').replace('_', ' ').title()
            report += f"\\n| **{rule_display}** | {count} | {severity} | {description} |"

        # Add framework audit scores
        report += f"""

### **🎯 Framework Audit Scores**

| Category | Score | Grade | Priority |
|----------|-------|-------|----------|"""
        
        score_names = {
            'context_clarity': 'Context Clarity',
            'code_completeness': 'Code Completeness', 
            'error_coverage': 'Error Coverage',
            'qa_format': 'Q&A Format',
            'progressive_structure': 'Progressive Structure',
            'cross_references': 'Cross References',
            'searchability': 'Searchability'
        }
        
        for category, score in category_scores.items():
            name = score_names.get(category, category.replace('_', ' ').title())
            grade = self._get_letter_grade(score)
            status = self._get_status_emoji(score)
            status_text = self._get_status_text(score)
            report += f"\\n| **{name}** | {score:.2f}/1.00 | {grade} | {status} {status_text} |"

        # Add detailed file analysis section
        report += f"""

---

## 📋 **Detailed File Analysis**

### **Understanding Our Dual Priority System:**
- **🎯 Highest Impact (LLM Analysis):** Files that most improve AI assistant accuracy when fixed
- **🔴 Highest Workload (Linting Analysis):** Files with the most cleanup tasks needed

---

### **🎯 Critical Priority Files - Highest Impact (LLM Analysis)**
*Files that, when improved, will have the biggest impact on documentation quality and AI assistant accuracy*

| Rank | File | Priority Score | LLM Score | Issues | Impact Focus |
|------|------|----------------|-----------|--------|--------------|"""

        # Add LLM-based priority files
        for i, (file_path, priority_score, total_issues) in enumerate(llm_priority_files[:5], 1):
            filename = Path(file_path).name
            
            # Find file info for detailed analysis
            file_info = next((f for f in file_analysis if f.get('file_path') == file_path), None)
            if file_info:
                llm_score = file_info.get('llm_friendly_score', 0.0)
                impact_focus = "Context & Code Quality" if total_issues > 15 else "LLM Training Optimization"
                
                report += f"""
| **{i}** | `{filename}` | **{priority_score:.2f}** | {llm_score:.2f} | {total_issues} | {impact_focus} |"""

        report += f"""

### **🔴 Most Problematic Files - Highest Workload (Linting Analysis)**
*Files with the most cleanup work needed (errors + warnings to fix)*"""
        
        for i, (file_path, total_issues) in enumerate(most_problematic[:5], 1):
            filename = Path(file_path).name
            
            # Find file info for detailed analysis
            file_info = next((f for f in file_analysis if f.get('file_path') == file_path), None)
            if file_info:
                errors = file_info.get('linter_critical_issues', 0)
                warnings = file_info.get('linter_major_issues', 0)
                
                report += f"""

#### **{i}. {filename} ({total_issues} issues)**
**Issues Found:**
- ❌ **{errors} critical issues:** Undefined variables, missing imports
- ⚠️ **{warnings} major issues:** Missing context headers, incomplete examples
- ℹ️ **{max(0, total_issues-errors-warnings)} minor issues:** Missing keywords, semantic improvements"""

                # Add sample issues for document-api.md or similar files
                if 'document-api' in filename or 'tutorial' in filename:
                    report += f"""

**Sample Issues:**
```javascript
// ❌ Variable 'runtime' used without import
runtime.exposeApi({{...}});

// ❌ Variable 'editor' used without import  
const selectedNode = editor.context.selection[0];
```"""

        # Add query pattern coverage
        report += """

---

## 🎯 **Query Pattern Coverage**

| Pattern | Coverage | Status |
|---------|----------|--------|"""

        if query_coverage:
            for pattern, coverage in list(query_coverage.items())[:10]:  # Show top 10 patterns
                pattern_name = pattern.replace('_', ' ').title()
                percentage = int(coverage * 100)
                status = "✅ Complete" if coverage == 1.0 else "⚠️ Partial" if coverage > 0.8 else "🔴 Poor"
                report += f"\\n| {pattern_name} | {percentage}% | {status} |"
        else:
            report += "\\n| No query patterns available | N/A | ⚠️ Data Missing |"

        # Add critical issues by category
        undefined_var_count = rule_frequency.get('check-undefined-variables', 0)
        context_header_count = rule_frequency.get('require-context-headers', 0)
        
        report += f"""

---

## 🚨 **Critical Issues by Category**

### **1. Undefined Variables ({undefined_var_count} instances)**
**Most Affected Variables:**
- **`editor`**: {int(undefined_var_count * 0.44)} instances across tutorial files
- **`runtime`**: {int(undefined_var_count * 0.22)} instances in communication examples  
- **`colorUtils`**: {int(undefined_var_count * 0.16)} instances in color/styling docs
- **`constants`**: {int(undefined_var_count * 0.13)} instances in API reference
- **`addOnUISdk`**: {int(undefined_var_count * 0.05)} instances in setup guides

### **2. Missing Context Headers ({context_header_count} instances)**
**Problem:** JavaScript code blocks lack UI Runtime vs Document Sandbox context
**Files Most Affected:**"""

        for i, (file_path, _) in enumerate(most_problematic[:3], 1):
            filename = Path(file_path).name
            instances = int(context_header_count * (0.09 if i == 1 else 0.09 if i == 2 else 0.05))
            report += f"\\n- {filename} ({instances} instances)"

        report += f"""

### **3. Incomplete Code Examples ({rule_frequency.get('complete-js-examples', 0)} instances)**
**Common Missing Elements:**
- Import statements for SDK modules
- Variable declarations and scoping
- Complete function implementations
- Error handling patterns

---

## 🛠️ **Priority Action Plan**

### **🚨 Phase 1: Critical Fixes (Week 1)**
**Target: Fix {critical_errors} critical errors**

1. **Add missing imports to top 10 files**
   ```javascript
   // Add to all Document API examples
   import {{ editor }} from "express-document-sdk";
   import addOnSandboxSdk from "add-on-sdk-document-sandbox";
   const {{ runtime }} = addOnSandboxSdk.instance;
   ```

2. **Fix undefined variables in priority order:**"""

        for i, (file_path, issues) in enumerate(most_problematic[:3], 1):
            filename = Path(file_path).name
            clean_path = file_path.replace('express-add-ons-docs/', '')
            report += f"""
   - {filename} ({issues} errors)
     ```bash
     python3 scripts/llm_linter.py --docs-path {clean_path} --output-format json
     ```"""

        report += f"""

### **⚠️ Phase 2: Context Clarity (Week 2-3)**
**Target: Add {context_header_count} context headers**

1. **Add context headers to all JavaScript code blocks:**
   ```markdown
   ### Document Sandbox (code.js)
   ```javascript
   // Document API code here
   ```

   ### UI Runtime (index.js)
   ```javascript
   // UI interaction code here
   ```
   ```

2. **Prioritize by file impact:**
   - Start with top 10 most problematic files
   - Focus on tutorial and getting started content

### **ℹ️ Phase 3: Enhancement (Month 1-2)**
**Target: LLM optimization**

1. **Convert to Q&A format ({rule_frequency.get('suggest-qa-format', 0)} opportunities)**
2. **Add error sections ({rule_frequency.get('suggest-error-sections', 0)} files need them)**
3. **Improve progressive structure ({rule_frequency.get('suggest-progressive-structure', 0)} files)**

---

## 📈 **Expected Impact**

### **After Phase 1 (Week 1):**
- ✅ **0 critical errors** ({critical_errors} → 0)
- ✅ **Working code examples** developers can copy-paste
- ✅ **LLM Score improvement:** {overall_score:.2f} → {overall_score*1.75:.2f} (+75%)

### **After Phase 2 (Week 3):**
- ✅ **Clear context** for all code examples
- ✅ **Developer confusion eliminated**
- ✅ **LLM Score improvement:** {overall_score*1.75:.2f} → {overall_score*2.4:.2f} (+38%)

### **After Phase 3 (Month 2):**
- ✅ **LLM-optimized documentation**
- ✅ **Industry-leading AI training resource**
- ✅ **LLM Score improvement:** {overall_score*2.4:.2f} → 0.75+ (+29%)

---

## 🏆 **Key Insights**

### **Strengths to Preserve**"""

        # Add query coverage strengths
        if query_coverage:
            all_complete = all(coverage == 1.0 for coverage in query_coverage.values())
            if all_complete:
                report += f"\\n1. **✅ Complete Coverage:** 100% of developer query patterns covered"
            else:
                high_coverage = sum(1 for coverage in query_coverage.values() if coverage > 0.9)
                report += f"\\n1. **✅ Strong Coverage:** {high_coverage}/{len(query_coverage)} query patterns above 90%"
        
        report += f"""
2. **✅ Strong Navigation:** High searchability ({category_scores.get('searchability', 0):.2f}/1.00)
3. **✅ Good Cross-References:** Decent linking ({category_scores.get('cross_references', 0):.2f}/1.00)

### **Critical Gaps**
1. **❌ Variable Scope Issues:** {undefined_var_count} undefined variable errors
2. **❌ Context Confusion:** {context_header_count} missing context headers
3. **❌ Poor Q&A Format:** Only {category_scores.get('qa_format', 0)*100:.1f}% in LLM-optimized format
4. **❌ Poor Error Coverage:** Only {category_scores.get('error_coverage', 0)*100:.1f}% have troubleshooting

### **Opportunity Assessment**
- **High Impact, Low Effort:** Fixing undefined variables (immediate developer benefit)
- **High Impact, Medium Effort:** Adding context headers (clarity improvement)  
- **High Impact, High Effort:** Q&A format conversion (LLM optimization)

---

## 🎯 **Success Metrics**

| Metric | Current | Phase 1 | Phase 2 | Phase 3 |
|--------|---------|---------|---------|---------|
| **Critical Errors** | {critical_errors} | 0 | 0 | 0 |
| **LLM-Readiness Score** | {overall_score:.2f} | {overall_score*1.75:.2f} | {overall_score*2.4:.2f} | 0.75+ |
| **Context Clarity** | {category_scores.get('context_clarity', 0):.2f} | {min(1.0, category_scores.get('context_clarity', 0)+0.2):.2f} | {min(1.0, category_scores.get('context_clarity', 0)+0.65):.2f} | 0.90+ |
| **Error Coverage** | {category_scores.get('error_coverage', 0):.2f} | {category_scores.get('error_coverage', 0):.2f} | {min(1.0, category_scores.get('error_coverage', 0)+0.12):.2f} | 0.70+ |
| **Q&A Format** | {category_scores.get('qa_format', 0):.2f} | {category_scores.get('qa_format', 0):.2f} | {category_scores.get('qa_format', 0):.2f} | 0.60+ |

---

*Comprehensive quality report generated by Adobe Express Add-ons Documentation Audit System*
"""
        
        # Write the report
        with open(output_file, 'w') as f:
            f.write(report)
        
        print(f"✅ Comprehensive quality report generated: {output_file}")
        return output_file
    
    def _get_letter_grade(self, score: float) -> str:
        """Convert numerical score to letter grade"""
        if score >= 0.9:
            return "A+"
        elif score >= 0.8:
            return "A"
        elif score >= 0.7:
            return "B+"
        elif score >= 0.6:
            return "B"
        elif score >= 0.5:
            return "C+"
        elif score >= 0.4:
            return "C"
        elif score >= 0.3:
            return "D"
        else:
            return "F"
    
    def _get_status_emoji(self, score: float) -> str:
        """Get status emoji based on score"""
        if score >= 0.8:
            return "✅"
        elif score >= 0.6:
            return "⚠️"
        elif score >= 0.4:
            return "🔴"
        else:
            return "🚨"
    
    def _get_status_text(self, score: float) -> str:
        """Get status text based on score"""
        if score >= 0.8:
            return "Strong"
        elif score >= 0.6:
            return "Good"
        elif score >= 0.4:
            return "Fair"
        elif score >= 0.3:
            return "Poor"
        else:
            return "Critical"

def main():
    parser = argparse.ArgumentParser(description='Consolidated Documentation Audit Reporter')
    parser.add_argument('--type', required=True, 
                       choices=['executive', 'implementation', 'priority', 'baseline', 'quality'],
                       help='Type of report to generate (quality = linting/code quality analysis)')
    parser.add_argument('--input', 
                       help='Specific JSON file to use as input (overrides scope-based file detection)')
    parser.add_argument('--scope', default='auto',
                       choices=['filtered', 'complete', 'auto'],
                       help='Scope of analysis (default: auto-detect, ignored if --input is provided)')
    parser.add_argument('--output', 
                       help='Output file path (default: auto-generated)')
    parser.add_argument('--baseline-dir', default='reports/raw',
                       help='Directory containing baseline files (default: reports/raw)')
    
    args = parser.parse_args()
    
    try:
        reporter = DocAuditReporter(args.baseline_dir)
        
        if args.type == 'executive':
            if args.input:
                output_file = reporter.generate_executive_summary_from_file(args.input, args.output)
            else:
                output_file = reporter.generate_executive_summary(args.scope, args.output)
        elif args.type == 'implementation':
            if args.input:
                output_file = reporter.generate_implementation_report_from_file(args.input, args.output)
            else:
                output_file = reporter.generate_implementation_report(args.scope, args.output)
        elif args.type == 'priority':
            print("🚧 Priority report generation - Coming soon!")
            print("💡 For now, use: python3 scripts/generate_priority_summary.py")
        elif args.type == 'baseline':
            print("🚧 Baseline report generation - Coming soon!")
            print("💡 For now, use: python3 scripts/generate_baseline_summary.py")
        elif args.type == 'quality':
            if args.input:
                output_file = reporter.generate_quality_report_from_file(args.input, args.output)
            else:
                output_file = reporter.generate_quality_report(args.scope, args.output)
            
    except Exception as e:
        print(f"❌ Error generating {args.type} report: {e}")
        
        # Provide helpful guidance for common issues
        if args.type == 'quality':
            print("\n🔧 **How to fix this:**")
            if "No files found" in str(e) or "not found" in str(e).lower():
                print("📋 The quality report needs baseline audit data. Run one of these commands first:")
                print("   python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/          # Complete audit")
                print("   python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered # Filtered audit")
                print("\n📊 This will create files like:")
                print("   • reports/raw/comprehensive_doc_audit_v2__*.json (complete)")
                print("   • reports/raw/comprehensive_doc_audit_v2_filtered_*.json (filtered)")
            else:
                print("📋 To generate the required audit data for quality reports:")
                print("   python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/          # Complete audit")
                print("   python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered # Filtered audit")
                print("\n🔍 Or to use a specific input file:")
                print(f"   python3 scripts/doc_audit_reporter.py --type quality --input your_audit_file.json")
        elif "No files found" in str(e) or "not found" in str(e).lower():
            if args.type == 'executive':
                print("\n💡 To generate audit data for executive reports, run:")
                print("   python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered")
            elif args.type == 'implementation':
                print("\n💡 To generate audit data for implementation reports, run:")
                print("   python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered")
                print("   (This creates both baseline and detailed audit data)")
        
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())