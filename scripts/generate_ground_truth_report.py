#!/usr/bin/env python3
"""
Generate Ground Truth Validation Report from JSON results

Usage:
    python3 generate_ground_truth_report.py --input ground_truth_test_report.json
    python3 generate_ground_truth_report.py --input ground_truth_test_report.json --output my_report.md
"""

import json
import argparse
from pathlib import Path
from datetime import datetime

def generate_ground_truth_report(input_file, output_file=None):
    """Generate markdown report from ground truth test JSON"""
    
    # Load the JSON data
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Generate timestamp for the report
    report_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Determine output filename
    if not output_file:
        output_file = f"reports/ground_truth_validation_report_{report_timestamp}.md"
    
    # Ensure reports directory exists
    Path("reports").mkdir(exist_ok=True)
    
    # Extract data
    metadata = data.get('metadata', {})
    overall_scores = data.get('overall_scores', {})
    category_analysis = data.get('category_analysis', {})
    critical_gaps = data.get('critical_gaps', [])
    accuracy_issues = data.get('accuracy_issues', [])
    improvement_priorities = data.get('improvement_priorities', [])
    detailed_results = data.get('detailed_results', [])
    
    total_pairs = metadata.get('total_pairs_tested', 0)
    coverage_score = overall_scores.get('coverage', 0)
    accuracy_score = overall_scores.get('accuracy', 0)
    completeness_score = overall_scores.get('completeness', 0)
    
    overall_quality = (coverage_score + accuracy_score + completeness_score) / 3
    
    # Determine overall health status
    if overall_quality >= 0.8:
        health_status = "🟢 **EXCELLENT**"
        health_desc = "Documentation meets or exceeds ground truth standards"
    elif overall_quality >= 0.6:
        health_status = "🟡 **GOOD**"
        health_desc = "Documentation is well-aligned with ground truth with minor gaps"
    elif overall_quality >= 0.4:
        health_status = "🟠 **FAIR**"
        health_desc = "Documentation has significant gaps compared to ground truth"
    elif overall_quality >= 0.2:
        health_status = "🔴 **POOR**"
        health_desc = "Documentation has major gaps and inaccuracies vs ground truth"
    else:
        health_status = "🚨 **CRITICAL**"
        health_desc = "Documentation fails to meet ground truth standards"
    
    # Generate the markdown report
    report = f"""# 🎯 Ground Truth Documentation Validation Report

## 📅 **Validation Date:** {metadata.get('generation_date', 'Unknown')}
## 📊 **Ground Truth Pairs Tested:** {total_pairs}
## 🎯 **Overall Quality Score:** {overall_quality:.3f}/1.00 ({overall_quality*100:.1f}%)

---

## 🏥 **Health Assessment**

### **Overall Status: {health_status}**
{health_desc}

**Validation Type:** Ground Truth Q&A Comparison

---

## 📊 **Detailed Score Breakdown**

| Metric | Score | Percentage | Status |
|--------|-------|------------|---------|
| **Coverage** | {coverage_score:.3f} | {coverage_score*100:.1f}% | {"🟢 Good" if coverage_score >= 0.6 else "🟡 Fair" if coverage_score >= 0.4 else "🔴 Poor"} |
| **Accuracy** | {accuracy_score:.3f} | {accuracy_score*100:.1f}% | {"🟢 Good" if accuracy_score >= 0.6 else "🟡 Fair" if accuracy_score >= 0.4 else "🔴 Poor"} |
| **Completeness** | {completeness_score:.3f} | {completeness_score*100:.1f}% | {"🟢 Good" if completeness_score >= 0.6 else "🟡 Fair" if completeness_score >= 0.4 else "🔴 Poor"} |
| **Overall Quality** | **{overall_quality:.3f}** | **{overall_quality*100:.1f}%** | **{health_status.split()[1]}** |

### **What These Scores Mean:**
- **Coverage**: How well documentation addresses the questions from ground truth
- **Accuracy**: How accurately documentation matches verified correct answers
- **Completeness**: How complete the documentation answers are (code examples, steps, etc.)

---

## 📂 **Category Performance Analysis**

*Performance of documentation categories compared to verified ground truth*

| Category | Overall Score | Coverage | Accuracy | Completeness | Status |
|----------|---------------|----------|----------|--------------|---------|"""

    # Add category scores
    sorted_categories = sorted(category_analysis.items(), 
                             key=lambda x: x[1]['overall'], reverse=True)
    
    for category, scores in sorted_categories:
        overall = scores['overall']
        coverage = scores['coverage']
        accuracy = scores['accuracy']
        completeness = scores['completeness']
        
        status = "🟢 Excellent" if overall >= 0.8 else "🟡 Good" if overall >= 0.6 else "🟠 Fair" if overall >= 0.4 else "🔴 Poor"
        
        report += f"\n| **{category}** | {overall:.3f} | {coverage:.3f} | {accuracy:.3f} | {completeness:.3f} | {status} |"

    # Add critical gaps section
    if critical_gaps:
        report += f"""

---

## 🚨 **Critical Documentation Gaps**

*Areas where documentation significantly fails to meet ground truth standards*

"""
        for i, gap in enumerate(critical_gaps[:10], 1):
            report += f"{i}. **{gap}**\n"

    # Add accuracy issues section
    if accuracy_issues:
        report += f"""

---

## ⚠️ **Accuracy Issues Identified**

*Content that contradicts or differs from verified ground truth answers*

"""
        for i, issue in enumerate(accuracy_issues[:10], 1):
            report += f"{i}. **{issue}**\n"

    # Add top performing and worst performing categories
    best_categories = sorted_categories[:3]
    worst_categories = sorted_categories[-3:]
    
    report += f"""

---

## 📈 **Performance Highlights**

### **🏆 Top Performing Categories**
*Categories that best match ground truth standards*

"""
    
    for category, scores in best_categories:
        score = scores['overall']
        strengths = []
        if scores['coverage'] >= 0.7:
            strengths.append("good coverage")
        if scores['accuracy'] >= 0.7:
            strengths.append("high accuracy")
        if scores['completeness'] >= 0.7:
            strengths.append("complete answers")
        
        strength_text = ", ".join(strengths) if strengths else "needs improvement"
        report += f"- **{category}**: {score:.3f} - {strength_text}\n"

    report += f"""

### **📉 Areas Needing Improvement**
*Categories with largest gaps vs ground truth*

"""
    
    for category, scores in worst_categories:
        score = scores['overall']
        issues = []
        if scores['coverage'] < 0.5:
            issues.append("low coverage")
        if scores['accuracy'] < 0.5:
            issues.append("accuracy problems")
        if scores['completeness'] < 0.5:
            issues.append("incomplete answers")
        
        issue_text = ", ".join(issues) if issues else "minor gaps"
        report += f"- **{category}**: {score:.3f} - {issue_text}\n"

    # Add improvement priorities
    if improvement_priorities:
        report += f"""

---

## 💡 **Improvement Priorities**

*Specific actions to align documentation with ground truth standards*

"""
        for i, priority in enumerate(improvement_priorities, 1):
            report += f"**{i}. {priority}**\n\n"

    # Add detailed findings for worst performing questions
    low_confidence_results = [r for r in detailed_results if r['scores']['confidence'] < 0.4]
    
    if low_confidence_results:
        report += f"""

---

## 🔍 **Detailed Analysis: Critical Issues**

*Questions where documentation significantly fails ground truth validation*

"""
        
        for i, result in enumerate(low_confidence_results[:5], 1):
            question = result['question']
            category = result['category']
            scores = result['scores']
            missing_concepts = result.get('missing_concepts', [])
            suggestions = result.get('suggestions', [])
            
            report += f"""
### **{i}. {category}: {question}**

**Scores:** Coverage: {scores['coverage']:.2f} | Accuracy: {scores['accuracy']:.2f} | Completeness: {scores['completeness']:.2f} | **Confidence: {scores['confidence']:.2f}**

**Issues Found:**
"""
            
            if missing_concepts:
                report += f"- **Missing Concepts:** {', '.join(missing_concepts[:5])}\n"
            
            if scores['coverage'] < 0.3:
                report += f"- **Low Coverage:** Documentation doesn't adequately address this question\n"
            
            if scores['accuracy'] < 0.3:
                report += f"- **Accuracy Issues:** Found content differs significantly from ground truth\n"
            
            if suggestions:
                report += f"\n**Recommended Actions:**\n"
                for suggestion in suggestions[:3]:
                    report += f"- {suggestion}\n"

    # Add methodology section
    report += f"""

---

## 🔬 **Validation Methodology**

### **Ground Truth Dataset**
- **Source:** Verified Q&A pairs from `labelled.yaml`
- **Categories:** {len(category_analysis)} documentation categories
- **Total Pairs:** {total_pairs} verified question-answer pairs
- **Validation Type:** Content comparison against expert-verified answers

### **Scoring Approach**
- **Coverage (30%):** How well docs address the question topics
- **Accuracy (40%):** How well found content matches verified answers  
- **Completeness (30%):** Whether answers include all necessary elements (code, steps, examples)

### **Quality Thresholds**
- **Excellent (0.8+):** Documentation meets professional standards
- **Good (0.6-0.8):** Minor improvements needed
- **Fair (0.4-0.6):** Significant gaps exist
- **Poor (<0.4):** Major restructuring required

---

## 🎯 **Next Steps**

### **Immediate Actions (Week 1-2)**
1. **Address Critical Gaps** - Focus on {len(critical_gaps)} identified critical issues
2. **Fix Accuracy Issues** - Resolve {len(accuracy_issues)} content accuracy problems
3. **Improve Worst Categories** - Start with lowest-scoring categories

### **Short-term Improvements (Month 1)**
1. **Category-Specific Fixes** - Target categories scoring below 0.5
2. **Content Completeness** - Add missing code examples and step-by-step guides
3. **Accuracy Review** - Verify all technical content against ground truth

### **Long-term Quality Assurance (Month 2-3)**
1. **Regular Validation** - Implement periodic ground truth testing
2. **Content Standards** - Establish documentation quality benchmarks
3. **Expert Review Process** - Create workflow for verifying new content

---

## 📊 **Report Metadata**

- **Generated:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
- **Tool:** Ground Truth Documentation Validator
- **Input File:** `{input_file}`
- **Validation Standard:** Expert-verified Q&A pairs
- **Total Validations:** {total_pairs} ground truth comparisons

*This report measures documentation quality against verified expert answers, providing a benchmark for accuracy and completeness improvements.*
"""

    # Write the report
    with open(output_file, 'w') as f:
        f.write(report)
    
    print(f"✅ Ground Truth Validation Report generated: {output_file}")
    print(f"📊 Overall Quality: {overall_quality:.3f}/1.00 ({overall_quality*100:.1f}%)")
    print(f"📁 Validated against {total_pairs} ground truth Q&A pairs")
    
    return output_file

def main():
    parser = argparse.ArgumentParser(description='Generate markdown report from Ground Truth test JSON')
    parser.add_argument('--input', default='ground_truth_test_report.json', 
                       help='Input JSON file from ground truth tester (default: ground_truth_test_report.json)')
    parser.add_argument('--output', 
                       help='Output markdown file (default: reports/ground_truth_validation_report_YYYYMMDD_HHMMSS.md)')
    
    args = parser.parse_args()
    
    # Check if input file exists
    if not Path(args.input).exists():
        print(f"❌ Error: Input file '{args.input}' not found")
        print(f"💡 Make sure you've run: python3 scripts/ground_truth_tester.py")
        return
    
    try:
        generate_ground_truth_report(args.input, args.output)
    except Exception as e:
        print(f"❌ Error generating report: {e}")

if __name__ == "__main__":
    main() 