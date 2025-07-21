#!/usr/bin/env python3
"""
Generate markdown report from LLM Readiness Analyzer JSON output

Usage:
    python3 generate_llm_analysis_report.py --input llm_analysis.json
    python3 generate_llm_analysis_report.py --input llm_analysis.json --output my_report.md
"""

import json
import argparse
from pathlib import Path
from datetime import datetime

def generate_llm_analysis_report(input_file, output_file=None):
    """Generate markdown report from LLM analysis JSON"""
    
    # Load the JSON data
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Generate timestamp for the report
    report_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Determine output filename
    if not output_file:
        output_file = f"reports/llm_analysis_report_{report_timestamp}.md"
    
    # Ensure reports directory exists
    Path("reports").mkdir(exist_ok=True)
    
    # Calculate some additional metrics
    total_files = data.get('total_files', 0)
    overall_score = data.get('overall_score', 0)
    category_scores = data.get('category_scores', {})
    query_coverage = data.get('query_pattern_coverage', {})
    critical_issues = data.get('critical_issues', [])
    recommendations = data.get('top_recommendations', [])
    
    # Determine overall health status
    if overall_score >= 0.8:
        health_status = "🟢 **EXCELLENT**"
        health_desc = "Documentation is highly optimized for LLM training and AI assistance"
    elif overall_score >= 0.6:
        health_status = "🟡 **GOOD**"
        health_desc = "Documentation is well-structured with minor improvements needed"
    elif overall_score >= 0.4:
        health_status = "🟠 **FAIR**"
        health_desc = "Documentation needs significant improvements for optimal LLM usage"
    elif overall_score >= 0.2:
        health_status = "🔴 **POOR**"
        health_desc = "Documentation requires major restructuring for LLM compatibility"
    else:
        health_status = "🚨 **CRITICAL**"
        health_desc = "Documentation is not suitable for LLM training in current state"
    
    # Generate the markdown report
    report = f"""# 🤖 LLM Readiness Analysis Report

## 📅 **Analysis Date:** {data.get('timestamp', 'Unknown')}
## 📁 **Files Analyzed:** {total_files}
## 🎯 **Overall LLM Score:** {overall_score:.3f}/1.00 ({overall_score*100:.1f}%)

---

## 🏥 **Health Assessment**

### **Overall Status: {health_status}**
{health_desc}

**Baseline Hash:** `{data.get('baseline_hash', 'N/A')}`

---

## 📊 **Category Performance Breakdown**

| Category | Score | Percentage | Status |
|----------|--------|------------|---------|"""

    # Add category scores
    for category, score in category_scores.items():
        percentage = score * 100
        if score >= 0.8:
            status = "🟢 Excellent"
        elif score >= 0.6:
            status = "🟡 Good"
        elif score >= 0.4:
            status = "🟠 Fair"
        elif score >= 0.2:
            status = "🔴 Poor"
        else:
            status = "🚨 Critical"
        
        category_name = category.replace('_', ' ').title()
        report += f"\n| {category_name} | {score:.3f} | {percentage:.1f}% | {status} |"

    # Add query pattern coverage
    report += f"""

---

## 🎯 **Query Pattern Coverage**

*How well the documentation covers different types of developer queries*

| Query Type | Coverage | Status |
|------------|----------|---------|"""

    for pattern, coverage in query_coverage.items():
        percentage = coverage * 100
        status = "✅ Complete" if coverage >= 0.9 else "⚠️ Partial" if coverage >= 0.7 else "❌ Insufficient"
        pattern_name = pattern.replace('_', ' ').title()
        report += f"\n| {pattern_name} | {percentage:.1f}% | {status} |"

    # Add critical issues section
    if critical_issues:
        report += f"""

---

## 🚨 **Critical Issues Identified**

"""
        for i, issue in enumerate(critical_issues, 1):
            report += f"{i}. **{issue}**\n"

    # Add recommendations section
    if recommendations:
        report += f"""

---

## 💡 **Top Recommendations**

### **Priority Actions for LLM Optimization**

"""
        for i, rec in enumerate(recommendations, 1):
            # Parse priority level if available
            if rec.startswith("Priority:"):
                priority = "🔥 **HIGH PRIORITY**"
                rec_text = rec.replace("Priority:", "").strip()
            elif rec.startswith("Medium:"):
                priority = "🟡 **MEDIUM PRIORITY**"
                rec_text = rec.replace("Medium:", "").strip()
            else:
                priority = "ℹ️ **IMPROVEMENT**"
                rec_text = rec.strip()
            
            report += f"**{i}. {priority}**\n   {rec_text}\n\n"

    # Add detailed analysis section
    report += f"""

---

## 📈 **Detailed Category Analysis**

### **🎯 Context Clarity ({category_scores.get('context_clarity', 0):.3f}/1.00)**
- **Impact:** Determines how well AI assistants can understand when code applies
- **Key Issue:** UI Runtime vs Document Sandbox distinction
- **Files Affected:** {critical_issues[0] if critical_issues else 'Multiple files'} 

### **💻 Code Completeness ({category_scores.get('code_completeness', 0):.3f}/1.00)**
- **Impact:** Ensures code examples work without external dependencies
- **Key Issue:** Missing imports and incomplete examples
- **Target:** All JavaScript code blocks should be runnable

### **🚨 Error Coverage ({category_scores.get('error_coverage', 0):.3f}/1.00)**
- **Impact:** Helps developers troubleshoot issues effectively
- **Key Issue:** Lack of error-first documentation
- **Files Affected:** {critical_issues[1] if len(critical_issues) > 1 else 'Multiple files'}

### **❓ Q&A Format ({category_scores.get('qa_format', 0):.3f}/1.00)**
- **Impact:** Optimizes content structure for LLM training
- **Key Issue:** Content not structured as questions and answers
- **Target:** Convert tutorials and guides to Q&A format

### **📚 Progressive Structure ({category_scores.get('progressive_structure', 0):.3f}/1.00)**
- **Impact:** Ensures logical learning progression
- **Key Issue:** Missing prerequisites and learning paths
- **Target:** Clear beginner-to-advanced progression

### **🔍 Searchability ({category_scores.get('searchability', 0):.3f}/1.00)**
- **Impact:** How easily AI can find relevant information
- **Performance:** {"✅ Strong" if category_scores.get('searchability', 0) > 0.7 else "⚠️ Needs improvement"}
- **Key Factors:** Headings, keywords, and document structure

### **🔗 Cross References ({category_scores.get('cross_references', 0):.3f}/1.00)**
- **Impact:** Helps AI understand relationships between concepts
- **Performance:** {"✅ Good" if category_scores.get('cross_references', 0) > 0.6 else "⚠️ Needs improvement"}
- **Target:** Better linking between related documentation

---

## 🎯 **Next Steps**

### **Immediate Actions (Week 1-2)**
1. **Address Critical Issues** - Focus on the {len(critical_issues)} critical issues identified
2. **Improve Context Clarity** - Add UI Runtime vs Document Sandbox headers
3. **Complete Code Examples** - Ensure all JavaScript examples include imports

### **Medium-term Improvements (Month 1-2)**
1. **Error-First Documentation** - Add troubleshooting sections to key guides
2. **Q&A Format Conversion** - Restructure tutorials as question-answer pairs
3. **Progressive Learning Paths** - Establish clear beginner-to-advanced flows

### **Long-term Optimization (Month 2-3)**
1. **Cross-Reference Network** - Improve linking between related concepts
2. **Query Pattern Coverage** - Address any gaps in developer query coverage
3. **Continuous Monitoring** - Regular LLM readiness assessments

---

## 📊 **Report Metadata**

- **Generated:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Tool:** LLM Readiness Analyzer
- **Input File:** `{input_file}`
- **Report Type:** Individual Tool Analysis
- **Scope:** All {total_files} documentation files

*This report analyzes documentation structure and content for LLM training compatibility and AI assistant accuracy.*
"""

    # Write the report
    with open(output_file, 'w') as f:
        f.write(report)
    
    print(f"✅ LLM Analysis Report generated: {output_file}")
    print(f"📊 Overall Score: {overall_score:.3f}/1.00 ({overall_score*100:.1f}%)")
    print(f"📁 Analyzed {total_files} files")
    
    return output_file

def main():
    parser = argparse.ArgumentParser(description='Generate markdown report from LLM Readiness Analyzer JSON')
    parser.add_argument('--input', default='llm_analysis.json', 
                       help='Input JSON file from LLM readiness analyzer (default: llm_analysis.json)')
    parser.add_argument('--output', 
                       help='Output markdown file (default: reports/llm_analysis_report_YYYYMMDD_HHMMSS.md)')
    
    args = parser.parse_args()
    
    # Check if input file exists
    if not Path(args.input).exists():
        print(f"❌ Error: Input file '{args.input}' not found")
        print(f"💡 Make sure you've run: python3 scripts/llm_readiness_analyzer.py --output {args.input}")
        return
    
    try:
        generate_llm_analysis_report(args.input, args.output)
    except Exception as e:
        print(f"❌ Error generating report: {e}")

if __name__ == "__main__":
    main() 