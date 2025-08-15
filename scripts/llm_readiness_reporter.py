#!/usr/bin/env python3
"""
Generate markdown report from LLM Readiness Analyzer JSON output

Features:
- Overall LLM readiness assessment with health status
- Category performance breakdown (context clarity, code completeness, etc.)
- Query pattern coverage analysis
- Top 20 priority files to fix (ranked by lowest LLM scores)
- Detailed breakdown for top 5 files needing attention
- Comprehensive recommendations for improvement

Usage:
    python3 scripts/llm_readiness_reporter.py                                    # Auto-detect most recent file
    python3 scripts/llm_readiness_reporter.py --input llm_readiness_file.json    # Use specific file
    python3 scripts/llm_readiness_reporter.py --output my_report.md              # Auto-detect input, custom output
"""

import json
import argparse
from pathlib import Path
from datetime import datetime

def get_priority_files(file_analyses, top_n=20):
    """Get the top N priority files that need the most improvement"""
    # Sort files by LLM friendly score (lowest first) and filter out perfect scores
    priority_files = []
    
    for file_data in file_analyses:
        score = file_data.get('llm_friendly_score', 1.0)
        # Only include files that have room for improvement (score < 0.95)
        if score < 0.95:
            priority_files.append({
                'file_path': file_data.get('file_path', 'Unknown'),
                'score': score,
                'issues': file_data.get('issues', []),
                'recommendations': file_data.get('recommendations', []),
                'word_count': file_data.get('word_count', 0),
                'context_clarity_score': file_data.get('context_clarity_score', 0),
                'qa_format_sections': file_data.get('qa_format_sections', 0)
            })
    
    # Sort by score (lowest first) then by word count (prioritize longer docs)
    priority_files.sort(key=lambda x: (x['score'], -x['word_count']))
    
    return priority_files[:top_n]

def generate_llm_analysis_report(input_file, output_file=None):
    """Generate markdown report from LLM analysis JSON"""
    
    # Load the JSON data
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Generate timestamp for the report
    report_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Determine output filename
    if not output_file:
        output_file = f"reports/llm_readiness_analysis_report_{report_timestamp}.md"
    
    # Ensure reports directory exists
    Path("reports").mkdir(exist_ok=True)
    
    # Calculate some additional metrics
    total_files = data.get('total_files', 0)
    overall_score = data.get('overall_score', 0)
    category_scores = data.get('category_scores', {})
    query_coverage = data.get('query_pattern_coverage', {})
    critical_issues = data.get('critical_issues', [])
    recommendations = data.get('top_recommendations', [])
    file_analyses = data.get('file_analyses', [])
    
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

    # Add priority files section
    priority_files = get_priority_files(file_analyses, top_n=20)
    if priority_files:
        report += f"""

---

## 🎯 **Top 20 Priority Files to Fix**

### **Files Needing the Most Attention (Lowest LLM Scores)**

| Rank | File | Score | Word Count | Key Issues |
|------|------|--------|------------|------------|"""

        for i, file_data in enumerate(priority_files, 1):
            file_path = file_data['file_path']
            # Truncate long file paths for readability
            display_path = file_path if len(file_path) <= 50 else "..." + file_path[-47:]
            score = file_data['score']
            word_count = file_data['word_count']
            
            # Get top 2 issues or recommendations for the table
            key_issues = []
            if file_data['issues']:
                key_issues.extend(file_data['issues'][:2])
            elif file_data['recommendations']:
                key_issues.extend(file_data['recommendations'][:2])
            
            if not key_issues:
                if file_data['qa_format_sections'] == 0:
                    key_issues.append("Missing Q&A format")
                if file_data['context_clarity_score'] < 0.5:
                    key_issues.append("Unclear context")
            
            issues_text = "; ".join(key_issues[:2]) if key_issues else "General improvements needed"
            # Truncate issues text for table readability
            if len(issues_text) > 60:
                issues_text = issues_text[:57] + "..."
            
            report += f"\n| {i} | `{display_path}` | {score:.3f} ({score*100:.1f}%) | {word_count:,} | {issues_text} |"

        # Add detailed breakdown for top 5 files
        report += f"""

### **🔍 Detailed Breakdown for Top 5 Files**
"""
        
        for i, file_data in enumerate(priority_files[:5], 1):
            file_path = file_data['file_path']
            score = file_data['score']
            
            report += f"""
**{i}. {file_path}** 
- **LLM Score:** {score:.3f} ({score*100:.1f}%)
- **Word Count:** {file_data['word_count']:,}
- **Context Clarity:** {file_data['context_clarity_score']:.3f}
"""
            
            if file_data['issues']:
                report += "- **Issues:**\n"
                for issue in file_data['issues'][:3]:  # Top 3 issues
                    report += f"  - {issue}\n"
            
            if file_data['recommendations']:
                report += "- **Recommendations:**\n"
                for rec in file_data['recommendations'][:3]:  # Top 3 recommendations
                    report += f"  - {rec}\n"

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

def find_latest_llm_readiness_file() -> Path:
    """Find the most recent LLM readiness analysis file"""
    import glob
    
    baseline_dir = Path("reports/raw")
    patterns = [
        "llm_readiness_*.json",
        "llm_analysis.json"  # fallback to old naming
    ]
    
    for pattern in patterns:
        files = glob.glob(str(baseline_dir / pattern))
        if files:
            # Sort by filename (which includes timestamp) and get most recent
            files.sort(reverse=True)
            return Path(files[0])
    
    raise FileNotFoundError("No LLM readiness analysis files found in reports/raw/")

def main():
    parser = argparse.ArgumentParser(description='Generate markdown report from LLM Readiness Analyzer JSON')
    parser.add_argument('--input', 
                       help='Input JSON file from LLM readiness analyzer (default: auto-detect most recent llm_readiness_*.json)')
    parser.add_argument('--output', 
                       help='Output markdown file (default: reports/llm_readiness_analysis_report_YYYYMMDD_HHMMSS.md)')
    
    args = parser.parse_args()
    
    # Auto-detect input file if not specified
    if args.input:
        input_file = Path(args.input)
        if not input_file.exists():
            print(f"❌ Error: Input file '{args.input}' not found")
            print(f"💡 Make sure you've run: python3 scripts/llm_readiness_analyzer.py --output {args.input}")
            return
    else:
        try:
            input_file = find_latest_llm_readiness_file()
            print(f"📊 Auto-detected input file: {input_file.name}")
        except FileNotFoundError as e:
            print(f"❌ Error: {e}")
            print(f"💡 Make sure you've run: python3 scripts/llm_readiness_analyzer.py")
            return
    
    try:
        generate_llm_analysis_report(str(input_file), args.output)
    except Exception as e:
        print(f"❌ Error generating report: {e}")

if __name__ == "__main__":
    main() 