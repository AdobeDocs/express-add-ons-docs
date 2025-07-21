#!/usr/bin/env python3
"""
Generate markdown report from LLM Markdown Linter JSON output

Usage:
    python3 generate_linter_report.py --input linter_report.json
    python3 generate_linter_report.py --input linter_report.json --output my_report.md
"""

import json
import argparse
from pathlib import Path
from datetime import datetime

def generate_linter_report(input_file, output_file=None):
    """Generate markdown report from linter JSON"""
    
    # Load the JSON data
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Generate timestamp for the report
    report_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Determine output filename
    if not output_file:
        output_file = f"reports/linter_report_{report_timestamp}.md"
    
    # Ensure reports directory exists
    Path("reports").mkdir(exist_ok=True)
    
    # Extract data
    summary = data.get('summary', {})
    rule_freq = data.get('rule_frequency', {})
    problematic_files = data.get('most_problematic_files', [])
    file_details = data.get('files', {})
    
    total_files = summary.get('total_files', 0)
    total_errors = summary.get('total_errors', 0)
    total_warnings = summary.get('total_warnings', 0)
    total_info = summary.get('total_info', 0)
    files_with_issues = summary.get('files_with_issues', 0)
    
    total_issues = total_errors + total_warnings + total_info
    
    # Determine overall health status
    error_rate = (total_errors / max(1, total_files))
    if error_rate < 0.5:
        health_status = "🟢 **GOOD**"
        health_desc = "Low error rate with manageable issues"
    elif error_rate < 2.0:
        health_status = "🟡 **FAIR**"
        health_desc = "Moderate error rate requiring attention"
    elif error_rate < 5.0:
        health_status = "🔴 **POOR**"
        health_desc = "High error rate needing significant cleanup"
    else:
        health_status = "🚨 **CRITICAL**"
        health_desc = "Very high error rate requiring immediate action"
    
    # Generate the markdown report
    report = f"""# 🔍 LLM Markdown Linter Report

## 📅 **Analysis Date:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
## 📁 **Files Analyzed:** {total_files}
## 🎯 **Total Issues Found:** {total_issues}

---

## 🏥 **Health Assessment**

### **Overall Status: {health_status}**
{health_desc}

**Error Rate:** {error_rate:.1f} errors per file

---

## 📊 **Issue Summary**

| Issue Type | Count | Percentage of Total |
|------------|-------|-------------------|
| 🚨 **Errors** | {total_errors} | {(total_errors/max(1,total_issues)*100):.1f}% |
| ⚠️ **Warnings** | {total_warnings} | {(total_warnings/max(1,total_issues)*100):.1f}% |
| ℹ️ **Info** | {total_info} | {(total_info/max(1,total_issues)*100):.1f}% |
| **Total Issues** | **{total_issues}** | **100%** |

**Files with Issues:** {files_with_issues}/{total_files} ({(files_with_issues/max(1,total_files)*100):.1f}%)

---

## 🚨 **Top Rule Violations**

*Most frequently violated linting rules across all files*

| Rule | Violations | Description |
|------|------------|-------------|"""

    # Rule descriptions for better understanding
    rule_descriptions = {
        'chunk-qa-optimization': 'Content not optimized for Q&A format retrieval',
        'require-context-headers': 'Missing UI Runtime vs Document Sandbox headers',
        'chunk-context-independence': 'Sections lack standalone context',
        'check-undefined-variables': 'Code examples use undefined variables',
        'chunk-self-contained-examples': 'Code examples not self-contained',
        'chunk-semantic-coherence': 'Poor semantic flow for chunking',
        'suggest-qa-format': 'Should be converted to Q&A format',
        'require-file-indicators': 'Missing file path indicators in code',
        'complete-js-examples': 'JavaScript examples missing imports',
        'suggest-error-sections': 'Missing error handling documentation',
        'require-cross-references': 'Missing links to related content',
        'suggest-progressive-structure': 'Lacks clear learning progression',
        'chunk-heading-hierarchy': 'Poor heading structure for chunking',
        'consistent-sdk-naming': 'Inconsistent SDK naming conventions'
    }
    
    # Sort rules by frequency and add to report
    sorted_rules = sorted(rule_freq.items(), key=lambda x: x[1], reverse=True)
    for rule, count in sorted_rules:
        description = rule_descriptions.get(rule, 'Various linting rule violations')
        severity = "🚨" if count > 100 else "⚠️" if count > 50 else "ℹ️"
        rule_display = rule.replace('-', ' ').replace('_', ' ').title()
        report += f"\n| {severity} {rule_display} | {count} | {description} |"

    # Add most problematic files section
    if problematic_files:
        report += f"""

---

## 📋 **Most Problematic Files**

*Files with the highest number of linting issues*

| Rank | File | Issues | Error Rate |
|------|------|--------|------------|"""

        for i, (file_path, issue_count) in enumerate(problematic_files[:15], 1):
            # Extract just the filename for readability
            filename = Path(file_path).name
            relative_path = file_path.replace('express-add-ons-docs/src/pages/', '')
            report += f"\n| {i} | **{filename}** | {issue_count} | {issue_count:.1f} issues |"
            report += f"\n|   | `{relative_path}` |   |   |"

    # Add recommendations section
    report += f"""

---

## 💡 **Recommended Actions**

### **🔥 Immediate Priorities (Week 1)**

1. **Address Top {min(5, len(problematic_files))} Most Problematic Files**
   - Focus on files with highest issue counts
   - These likely block developer productivity most

2. **Fix Critical Context Issues**
   - Add UI Runtime vs Document Sandbox headers ({rule_freq.get('require-context-headers', 0)} violations)
   - Complete JavaScript import statements ({rule_freq.get('complete-js-examples', 0)} violations)

3. **Resolve Undefined Variables**
   - Fix {rule_freq.get('check-undefined-variables', 0)} instances of undefined variables in code examples
   - Ensure all code examples are runnable

### **⚡ Short-term Improvements (Week 2-4)**

1. **Improve Code Example Quality**
   - Make examples self-contained ({rule_freq.get('chunk-self-contained-examples', 0)} violations)
   - Add file path indicators ({rule_freq.get('require-file-indicators', 0)} violations)

2. **Enhance Content Structure**
   - Convert to Q&A format where appropriate ({rule_freq.get('suggest-qa-format', 0)} opportunities)
   - Improve context independence ({rule_freq.get('chunk-context-independence', 0)} violations)

3. **Add Missing Documentation**
   - Include error handling sections ({rule_freq.get('suggest-error-sections', 0)} missing)
   - Add cross-references ({rule_freq.get('require-cross-references', 0)} missing)

### **📈 Long-term Optimization (Month 2-3)**

1. **Optimize for LLM Chunking**
   - Improve semantic coherence ({rule_freq.get('chunk-semantic-coherence', 0)} violations)
   - Fix heading hierarchy ({rule_freq.get('chunk-heading-hierarchy', 0)} violations)

2. **Content Restructuring**
   - Implement Q&A optimization ({rule_freq.get('chunk-qa-optimization', 0)} opportunities)
   - Add progressive structure ({rule_freq.get('suggest-progressive-structure', 0)} missing)

---

## 📊 **Rule Category Breakdown**

### **🚨 Critical Errors ({total_errors} total)**
Issues that prevent code examples from working or create confusion

### **⚠️ Warnings ({total_warnings} total)**  
Issues that reduce documentation quality and LLM effectiveness

### **ℹ️ Info ({total_info} total)**
Opportunities for improvement and optimization

---

## 🎯 **Success Metrics**

### **Target Goals**
- **Error Rate:** < 1.0 errors per file (currently {error_rate:.1f})
- **Files with Issues:** < 30% (currently {(files_with_issues/max(1,total_files)*100):.1f}%)
- **Critical Rule Violations:** Reduce top 3 violations by 80%

### **Quick Wins**
1. **Undefined Variables** - Often simple import additions
2. **Context Headers** - Standardized template can be applied
3. **File Indicators** - Consistent commenting pattern

### **High Impact Improvements**
1. **Most Problematic Files** - Fixing top 10 files will address {sum(count for _, count in problematic_files[:10])} issues
2. **Context Independence** - Major improvement to AI assistant accuracy
3. **Q&A Format** - Significant boost to LLM training effectiveness

---

## 📊 **Report Metadata**

- **Generated:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Tool:** LLM Markdown Linter
- **Input File:** `{input_file}`
- **Report Type:** Individual Tool Analysis
- **Scope:** {total_files} documentation files

*This report identifies specific linting issues that impact LLM training quality and AI assistant accuracy.*
"""

    # Write the report
    with open(output_file, 'w') as f:
        f.write(report)
    
    print(f"✅ Linter Report generated: {output_file}")
    print(f"📊 Total Issues: {total_issues} ({total_errors}E, {total_warnings}W, {total_info}I)")
    print(f"📁 Files with Issues: {files_with_issues}/{total_files}")
    
    return output_file

def main():
    parser = argparse.ArgumentParser(description='Generate markdown report from LLM Markdown Linter JSON')
    parser.add_argument('--input', default='linter_report.json', 
                       help='Input JSON file from markdown linter (default: linter_report.json)')
    parser.add_argument('--output', 
                       help='Output markdown file (default: reports/linter_report_YYYYMMDD_HHMMSS.md)')
    
    args = parser.parse_args()
    
    # Check if input file exists
    if not Path(args.input).exists():
        print(f"❌ Error: Input file '{args.input}' not found")
        print(f"💡 Make sure you've run: python3 scripts/llm_markdown_linter.py express-add-ons-docs/src/pages --output {args.input}")
        return
    
    try:
        generate_linter_report(args.input, args.output)
    except Exception as e:
        print(f"❌ Error generating report: {e}")

if __name__ == "__main__":
    main() 