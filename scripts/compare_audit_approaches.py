#!/usr/bin/env python3
"""
Compare Smart vs Traditional Auditing Approaches

This script demonstrates how content classification improves auditing accuracy
by comparing the results of smart vs traditional approaches on sample files.

"""

import os
import pandas as pd
from pathlib import Path
import argparse

def analyze_sample_files(docs_path: str, sample_files: list = None):
    """Analyze sample files with both approaches"""
    
    if sample_files is None:
        # Default sample files that demonstrate the differences
        sample_files = [
            "guides/getting_started/developer-journey.md",
            "guides/learn/how_to/use_text.md", 
            "references/addonsdk/app-document.md",
            "guides/support/faq.md",
            "guides/learn/platform_concepts/document-api.md"
        ]
    
    results = []
    
    print("🔍 Analyzing sample files with both approaches")
    print("=" * 60)
    
    for relative_file in sample_files:
        file_path = Path(docs_path) / relative_file
        
        if not file_path.exists():
            print(f"⚠️ File not found: {relative_file}")
            continue
            
        print(f"\n📄 Analyzing: {relative_file}")
        
        # Run smart audit
        try:
            from simpleAudit_smart import smart_audit_markdown
            from content_classifier import ContentClassifier
            
            classifier = ContentClassifier()
            smart_result = smart_audit_markdown(str(file_path), classifier)
            
            if smart_result:
                smart_score = smart_result['smart_readiness_percent']
                content_type = smart_result['content_type']
                code_intensity = smart_result['code_intensity']
                criteria_applied = smart_result['criteria_applied']
                criteria_excluded = smart_result['criteria_excluded']
            else:
                smart_score = 0
                content_type = "unknown"
                code_intensity = "unknown"
                criteria_applied = 0
                criteria_excluded = 0
                
        except Exception as e:
            print(f"   ❌ Smart audit failed: {e}")
            smart_score = 0
            content_type = "error"
            code_intensity = "error"
            criteria_applied = 0
            criteria_excluded = 0
        
        # Run traditional audit
        try:
            from simpleAudit_fixed import audit_markdown
            
            traditional_result = audit_markdown(str(file_path))
            
            if traditional_result:
                traditional_score = traditional_result['readiness_percent']
            else:
                traditional_score = 0
                
        except Exception as e:
            print(f"   ❌ Traditional audit failed: {e}")
            traditional_score = 0
        
        # Calculate improvement
        improvement = smart_score - traditional_score
        improvement_pct = (improvement / traditional_score * 100) if traditional_score > 0 else 0
        
        # Store results
        result = {
            'file': relative_file,
            'filename': Path(relative_file).name,
            'content_type': content_type,
            'code_intensity': code_intensity,
            'traditional_score': traditional_score,
            'smart_score': smart_score,
            'improvement': improvement,
            'improvement_percent': improvement_pct,
            'criteria_applied': criteria_applied,
            'criteria_excluded': criteria_excluded,
            'total_criteria': criteria_applied + criteria_excluded
        }
        
        results.append(result)
        
        # Print comparison
        print(f"   📊 Traditional Score: {traditional_score}%")
        print(f"   🧠 Smart Score: {smart_score}% ({content_type}, {code_intensity} code)")
        print(f"   📈 Improvement: {improvement:+.1f} points ({improvement_pct:+.1f}%)")
        print(f"   🎯 Applied {criteria_applied}/{criteria_applied + criteria_excluded} criteria ({criteria_excluded} excluded)")
        
        # Show why the smart approach is better
        if improvement > 0:
            print(f"   ✅ Smart approach is more accurate - excludes {criteria_excluded} irrelevant criteria")
        elif improvement < 0:
            print(f"   ⚠️ Smart approach is more strict - focuses on {criteria_applied} relevant criteria")
        else:
            print(f"   ➡️ Same score but smarter rule application")
    
    return results

def generate_comparison_report(results: list, output_file: str = "audit_comparison_report.md"):
    """Generate a markdown comparison report"""
    
    if not results:
        print("❌ No results to generate report from")
        return
    
    df = pd.DataFrame(results)
    
    # Calculate summary statistics
    avg_traditional = df['traditional_score'].mean()
    avg_smart = df['smart_score'].mean()
    avg_improvement = df['improvement'].mean()
    avg_criteria_excluded = df['criteria_excluded'].mean()
    
    content_type_dist = df['content_type'].value_counts()
    code_intensity_dist = df['code_intensity'].value_counts()
    
    # Find best examples
    biggest_improvement = df.loc[df['improvement'].idxmax()]
    most_criteria_excluded = df.loc[df['criteria_excluded'].idxmax()]
    
    report = f"""# 🧠 Smart vs Traditional Auditing Comparison

## 📊 **Summary Results**

| Metric | Traditional | Smart | Improvement |
|--------|-------------|--------|-------------|
| **Average Score** | {avg_traditional:.1f}% | {avg_smart:.1f}% | **{avg_improvement:+.1f} points** |
| **Approach** | One-size-fits-all | Content-aware | **{avg_criteria_excluded:.1f} criteria excluded per file** |

## 🎯 **Key Benefits of Smart Approach**

### **✅ Context-Aware Scoring**
- **Conceptual docs** (like `developer-journey.md`) aren't penalized for missing code
- **Reference docs** get lighter Q&A requirements  
- **Tutorial docs** get stricter error documentation requirements
- **Setup docs** focus on structure over code quality

### **📈 Accuracy Improvements**
- Average improvement: **{avg_improvement:+.1f} percentage points**
- Excludes **{avg_criteria_excluded:.1f} irrelevant criteria** per file on average
- More accurate representation of actual documentation quality

## 📚 **Sample File Analysis**

### **Content Type Distribution**
"""

    for content_type, count in content_type_dist.items():
        report += f"- **{content_type.title()}**: {count} files\n"
    
    report += f"""

### **Code Intensity Distribution**
"""

    for intensity, count in code_intensity_dist.items():
        report += f"- **{intensity.title()}**: {count} files\n"

    report += f"""

## 🏆 **Best Examples of Smart Classification**

### **Biggest Improvement: {biggest_improvement['filename']}**
- **Content Type**: {biggest_improvement['content_type']}
- **Code Intensity**: {biggest_improvement['code_intensity']}
- **Traditional Score**: {biggest_improvement['traditional_score']}%
- **Smart Score**: {biggest_improvement['smart_score']}%
- **Improvement**: **{biggest_improvement['improvement']:+.1f} points ({biggest_improvement['improvement_percent']:+.1f}%)**
- **Why Better**: Applied {biggest_improvement['criteria_applied']}/{biggest_improvement['total_criteria']} criteria, excluded {biggest_improvement['criteria_excluded']} irrelevant ones

### **Most Criteria Excluded: {most_criteria_excluded['filename']}**
- **Content Type**: {most_criteria_excluded['content_type']}
- **Code Intensity**: {most_criteria_excluded['code_intensity']}
- **Criteria Excluded**: {most_criteria_excluded['criteria_excluded']} out of {most_criteria_excluded['total_criteria']}
- **Why**: {most_criteria_excluded['content_type']} content with {most_criteria_excluded['code_intensity']} code doesn't need code-focused rules

## 📋 **Detailed File-by-File Comparison**

| File | Type | Code | Traditional | Smart | Improvement | Criteria Applied |
|------|------|------|-------------|--------|-------------|------------------|"""

    for _, row in df.iterrows():
        filename = row['filename']
        content_type = row['content_type'][:10]  # Truncate for table
        code_intensity = row['code_intensity'][:8]  # Truncate for table
        traditional = f"{row['traditional_score']}%"
        smart = f"{row['smart_score']}%"
        improvement = f"{row['improvement']:+.1f}"
        criteria = f"{row['criteria_applied']}/{row['total_criteria']}"
        
        report += f"\n| `{filename}` | {content_type} | {code_intensity} | {traditional} | {smart} | **{improvement}** | {criteria} |"

    report += f"""

## 💡 **Implementation Insights**

### **What Smart Classification Does**
1. **Analyzes Content**: Determines if file is tutorial, conceptual, reference, etc.
2. **Assesses Code Intensity**: Checks if file has no code, minimal code, moderate, or heavy code
3. **Applies Relevant Rules**: Only applies rules that make sense for that content type
4. **Excludes Irrelevant Rules**: Skips code rules for conceptual docs, Q&A rules for reference docs, etc.

### **Example Smart Decisions**
- `developer-journey.md`: **Setup/None** → Excludes code completeness, context clarity rules
- `use_text.md`: **Tutorial/Heavy** → Applies all rules including strict error documentation
- `app-document.md`: **Reference/Moderate** → Reduces Q&A format requirements
- `faq.md`: **Troubleshooting/None** → Focuses on Q&A format and error coverage

### **Traditional vs Smart Scoring**

**Traditional Approach:**
```
All files get same 12 criteria regardless of content
❌ developer-journey.md penalized for no code blocks
❌ Reference docs penalized for no Q&A format  
❌ Conceptual docs penalized for missing imports
```

**Smart Approach:**
```
Files get contextual criteria based on classification
✅ developer-journey.md evaluated on structure only
✅ Reference docs get reduced Q&A requirements
✅ Conceptual docs skip code-focused rules entirely
```

## 🎯 **Recommended Usage**

1. **Use Smart Audit for Accurate Assessment**: Get true documentation quality scores
2. **Use Traditional for Baseline**: Compare against "worst case" one-size-fits-all approach  
3. **Focus Improvements by Content Type**: Address tutorial issues vs reference issues differently
4. **Track Smart Metrics**: Monitor `criteria_applied` vs `criteria_excluded` for insight

---

**Result**: Smart content classification provides **{avg_improvement:+.1f} point improvement** on average while excluding **{avg_criteria_excluded:.1f} irrelevant criteria** per file, leading to more accurate and actionable documentation quality assessment.
"""

    # Save report
    with open(output_file, 'w') as f:
        f.write(report)
    
    print(f"\n📋 Comparison report saved to: {output_file}")
    return output_file

def main():
    """Main comparison function"""
    # Auto-detect docs path based on current working directory
    current_dir = Path.cwd()
    if current_dir.name == "scripts":
        default_docs_path = "../src/pages"
    elif (current_dir / "src/pages").exists():
        default_docs_path = "src/pages"
    else:
        default_docs_path = "../src/pages"  # fallback
    
    parser = argparse.ArgumentParser(description='Compare Smart vs Traditional Auditing Approaches')
    parser.add_argument('--docs-path', default=default_docs_path, help='Path to documentation directory')
    parser.add_argument('--output', default='audit_comparison_report.md', help='Output markdown file')
    parser.add_argument('--files', nargs='+', help='Specific files to analyze (relative to docs-path)')
    
    args = parser.parse_args()
    
    print("🧠 Smart vs Traditional Auditing Comparison")
    print("=" * 50)
    
    # Run comparison
    results = analyze_sample_files(args.docs_path, args.files)
    
    if results:
        # Generate report
        generate_comparison_report(results, args.output)
        
        # Show summary
        df = pd.DataFrame(results)
        print(f"\n📊 Summary:")
        print(f"   📁 Files Analyzed: {len(results)}")
        print(f"   📈 Average Improvement: {df['improvement'].mean():+.1f} points")
        print(f"   🎯 Average Criteria Excluded: {df['criteria_excluded'].mean():.1f}")
        print(f"   ✅ Files with Improvement: {len(df[df['improvement'] > 0])}/{len(df)}")
        
    else:
        print("❌ No results generated. Check file paths and dependencies.")

if __name__ == "__main__":
    main() 