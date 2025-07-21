#!/usr/bin/env python3

import json
import os
import argparse
from datetime import datetime
from pathlib import Path

def find_latest_baseline(scope="filtered"):
    """Find the most recent baseline audit file of specified scope."""
    if scope == "filtered":
        # First try to find filtered baselines (new naming)
        filtered_files = [f for f in os.listdir('.') if f.startswith('baseline_filtered_') and f.endswith('_audit.json')]
        
        if filtered_files:
            filtered_files.sort(reverse=True)
            return filtered_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir('.') if f.startswith('baseline_') and f.endswith('_audit.json') and 'complete_' not in f]
        if not all_files:
            raise FileNotFoundError("No filtered baseline audit files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention baseline: {all_files[0]}")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline --filtered")
        return all_files[0]
    
    elif scope == "complete":
        # Find complete baselines
        complete_files = [f for f in os.listdir('.') if f.startswith('baseline_complete_') and f.endswith('_audit.json')]
        
        if complete_files:
            complete_files.sort(reverse=True)
            return complete_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir('.') if f.startswith('baseline_') and f.endswith('_audit.json')]
        if not all_files:
            raise FileNotFoundError("No complete baseline audit files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention baseline: {all_files[0]}")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline")
        return all_files[0]
    
    else:
        raise ValueError("Scope must be 'filtered' or 'complete'")

def find_latest_detailed_analysis(scope="filtered"):
    """Find the most recent detailed file analysis of specified scope."""
    if scope == "filtered":
        # First try to find filtered detailed analysis (new naming)
        filtered_files = [f for f in os.listdir('.') if f.startswith('detailed_file_analysis_filtered_') and f.endswith('.json')]
        
        if filtered_files:
            filtered_files.sort(reverse=True)
            return filtered_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir('.') if f.startswith('detailed_file_analysis_') and f.endswith('.json') and 'complete_' not in f]
        if not all_files:
            raise FileNotFoundError("No filtered detailed analysis files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention detailed analysis: {all_files[0]}")
        return all_files[0]
    
    elif scope == "complete":
        # Find complete detailed analysis
        complete_files = [f for f in os.listdir('.') if f.startswith('detailed_file_analysis_complete_') and f.endswith('.json')]
        
        if complete_files:
            complete_files.sort(reverse=True)
            return complete_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir('.') if f.startswith('detailed_file_analysis_') and f.endswith('.json')]
        if not all_files:
            raise FileNotFoundError("No complete detailed analysis files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention detailed analysis: {all_files[0]}")
        return all_files[0]
    
    else:
        raise ValueError("Scope must be 'filtered' or 'complete'")

def get_linter_rule_details(baseline_data):
    """Extract detailed linter rule information."""
    linter_audit = baseline_data.get('linter_audit', {})
    return {
        'rule_frequency': linter_audit.get('rule_frequency', {}),
        'severity_breakdown': linter_audit.get('severity_breakdown', {}),
        'category_analysis': linter_audit.get('category_analysis', {})
    }

def categorize_files_by_priority(detailed_data):
    """Categorize files by priority level with detailed breakdown."""
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

def get_common_issues_summary(detailed_data):
    """Analyze common issues across files."""
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

def generate_file_recommendations(file_data):
    """Generate specific recommendations for a file."""
    recommendations = []
    
    # Context clarity issues
    if file_data.get('context_clarity_score', 0) < 0.3:
        recommendations.append("🎯 Add context headers distinguishing UI Runtime vs Document Sandbox code")
        recommendations.append("📁 Include file path indicators (e.g., `code.js`, `index.js`)")
    
    # Code completeness issues
    if file_data.get('incomplete_examples', 0) > file_data.get('complete_examples', 0):
        recommendations.append("🔧 Complete code examples with proper imports and dependencies")
        recommendations.append("✅ Add error handling to all code examples")
    
    # Error documentation
    if file_data.get('error_sections', 0) == 0 and file_data.get('code_blocks', 0) > 0:
        recommendations.append("🚨 Add error-first documentation with common issues and solutions")
    
    # Q&A format
    if file_data.get('qa_sections', 0) == 0:
        recommendations.append("❓ Convert content to Q&A format for better LLM retrieval")
    
    # Cross references
    if file_data.get('cross_references', 0) == 0:
        recommendations.append("🔗 Add cross-references to related documentation")
    
    # Linter issues
    errors = file_data.get('linter_errors', 0)
    if errors > 0:
        recommendations.append(f"🔥 Fix {errors} critical linting errors (non-existent APIs, incorrect imports)")
    
    warnings = file_data.get('linter_warnings', 0)
    if warnings > 0:
        recommendations.append(f"⚠️ Address {warnings} warnings (missing context, incomplete examples)")
    
    return recommendations

def generate_detailed_implementation_report(scope="filtered"):
    """Generate detailed implementation report."""
    
    # Find latest files
    baseline_file = find_latest_baseline(scope)
    detailed_file = find_latest_detailed_analysis(scope)
    
    print(f"📊 Loading data from {baseline_file} and {detailed_file}")
    
    # Load data
    with open(baseline_file, 'r') as f:
        baseline_data = json.load(f)
    
    with open(detailed_file, 'r') as f:
        detailed_data = json.load(f)
    
    # Extract timestamp from filename (handle both old and new naming conventions)
    parts = baseline_file.split('_')
    if len(parts) >= 4 and parts[1] in ['filtered', 'complete']:
        # New naming: baseline_filtered_YYYYMMDD_HHMMSS_audit.json
        timestamp = parts[2] + '_' + parts[3].replace('.json', '')
    else:
        # Old naming: baseline_YYYYMMDD_HHMMSS_audit.json
        timestamp = parts[1] + '_' + parts[2].replace('.json', '')
    readable_date = datetime.strptime(timestamp, '%Y%m%d_%H%M%S').strftime('%Y-%m-%d %H:%M:%S')
    
    # Analyze data
    metadata = baseline_data['metadata']
    categorized_files = categorize_files_by_priority(detailed_data)
    common_issues = get_common_issues_summary(detailed_data)
    linter_details = get_linter_rule_details(baseline_data)
    
    # Generate scope-appropriate descriptions
    scope_title = "Filtered Core" if scope == "filtered" else "Complete"
    scope_description = "Development Team Guide - Core Documentation Focus" if scope == "filtered" else "Development Team Guide - All Documentation Files"
    
    # Generate report
    Path("reports").mkdir(exist_ok=True)
    report_filename = f"reports/detailed_implementation_report_{scope}_{timestamp}.md"
    
    with open(report_filename, 'w') as f:
        f.write(f"""# 🔧 Adobe Express Add-ons Documentation - Detailed Implementation Report
*Generated from {scope_title} Documentation Audit - {scope_description}*

---

## 📋 **Report Overview**

| Metric | Value |
|--------|-------|
| **Audit Date** | {readable_date} |
| **Files Analyzed** | {metadata['total_files']} (Core Documentation Only) |
| **Documentation Path** | `{metadata['docs_path']}` |
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
| Incomplete Code Examples | {common_issues['incomplete_examples']} total | - | 🔴 High |

### **Linter Rule Frequency**
""")
        
        # Add linter rule details
        for rule, count in sorted(linter_details['rule_frequency'].items(), key=lambda x: x[1], reverse=True)[:10]:
            f.write(f"- **{rule}**: {count} instances\n")
        
        f.write(f"""
---

## 🚨 **Critical Priority Files** ({len(categorized_files['critical'])})
*Immediate attention required - complete rewrite recommended*

""")
        
        if categorized_files['critical']:
            for file_data in categorized_files['critical']:
                f.write(f"""
### 🔥 `{file_data['relative_path']}`
**Health Score:** {file_data['overall_health']:.2f}/1.00 | **Priority:** {file_data['priority_level']:.2f} | **Improvement Potential:** +{file_data.get('improvement_potential', 0):.2f}

**File Stats:**
- Word Count: {file_data['word_count']} | Code Blocks: {file_data['code_blocks']}
- Errors: {file_data['linter_errors']} | Warnings: {file_data['linter_warnings']} | Info: {file_data['linter_info']}
- Complete Examples: {file_data['complete_examples']} | Incomplete: {file_data['incomplete_examples']}

**Action Items:**
""")
                recommendations = generate_file_recommendations(file_data)
                for rec in recommendations:
                    f.write(f"- {rec}\n")
                
                f.write("\n---\n")
        else:
            f.write("✅ No critical priority files found!\n\n---\n")
        
        f.write(f"""
## 🚨 **High Priority Files** ({len(categorized_files['high'])})
*Major improvements needed - significant restructuring required*

""")
        
        if categorized_files['high']:
            for file_data in categorized_files['high'][:15]:  # Show top 15
                f.write(f"""
### 🔴 `{file_data['relative_path']}`
**Health Score:** {file_data['overall_health']:.2f}/1.00 | **Priority:** {file_data['priority_level']:.2f} | **Improvement Potential:** +{file_data.get('improvement_potential', 0):.2f}

**Quick Stats:** {file_data['linter_errors']}E/{file_data['linter_warnings']}W | {file_data['complete_examples']}/{file_data['incomplete_examples']} examples | {file_data['word_count']} words

**Key Actions:**
""")
                recommendations = generate_file_recommendations(file_data)
                for rec in recommendations[:3]:  # Show top 3 recommendations
                    f.write(f"- {rec}\n")
                
                f.write("\n")
            
            if len(categorized_files['high']) > 15:
                f.write(f"\n**...and {len(categorized_files['high'])-15} more high priority files**\n")
        else:
            f.write("✅ No high priority files found!\n")
        
        f.write(f"""
---

## 🟠 **Medium Priority Files** ({len(categorized_files['medium'])})
*Significant improvements needed*

""")
        
        if categorized_files['medium']:
            # Group by common issues for better organization
            f.write("### Files by Primary Issue:\n\n")
            
            context_issues = [f for f in categorized_files['medium'] if f.get('context_clarity_score', 0) < 0.3]
            incomplete_code = [f for f in categorized_files['medium'] if f.get('incomplete_examples', 0) > f.get('complete_examples', 0)]
            no_error_docs = [f for f in categorized_files['medium'] if f.get('error_sections', 0) == 0 and f.get('code_blocks', 0) > 0]
            
            if context_issues:
                f.write(f"#### 🎯 **Context Clarity Issues** ({len(context_issues)} files)\n")
                for file_data in context_issues[:10]:
                    f.write(f"- `{file_data['relative_path']}` (Score: {file_data['overall_health']:.2f})\n")
                if len(context_issues) > 10:
                    f.write(f"- ...and {len(context_issues)-10} more\n")
                f.write("\n")
            
            if incomplete_code:
                f.write(f"#### 🔧 **Incomplete Code Examples** ({len(incomplete_code)} files)\n")
                for file_data in incomplete_code[:10]:
                    f.write(f"- `{file_data['relative_path']}` ({file_data['incomplete_examples']} incomplete examples)\n")
                if len(incomplete_code) > 10:
                    f.write(f"- ...and {len(incomplete_code)-10} more\n")
                f.write("\n")
            
            if no_error_docs:
                f.write(f"#### 🚨 **Missing Error Documentation** ({len(no_error_docs)} files)\n")
                for file_data in no_error_docs[:10]:
                    f.write(f"- `{file_data['relative_path']}` ({file_data['code_blocks']} code blocks, no error docs)\n")
                if len(no_error_docs) > 10:
                    f.write(f"- ...and {len(no_error_docs)-10} more\n")
                f.write("\n")
        else:
            f.write("✅ No medium priority files found!\n")
        
        f.write(f"""
---

## 🟢 **Low Priority Files** ({len(categorized_files['low'])})
*Minor improvements or maintenance*

These files are in good shape but could benefit from:
- Converting to Q&A format for better LLM retrieval
- Adding cross-references to related documentation
- Minor formatting and consistency improvements

**Files ready for Q&A conversion:**
""")
        
        qa_candidates = [f for f in categorized_files['low'] if f.get('qa_sections', 0) == 0 and f.get('overall_health', 0) > 0.3]
        for file_data in qa_candidates[:10]:
            f.write(f"- `{file_data['relative_path']}` (Health: {file_data['overall_health']:.2f})\n")
        
        if len(qa_candidates) > 10:
            f.write(f"- ...and {len(qa_candidates)-10} more\n")
        
        f.write(f"""
---

## 📋 **Implementation Workflow**

### **Week 1-2: Critical & High Priority**
1. **Focus on Critical Files First** ({len(categorized_files['critical'])} files)
   - Complete rewrite or major restructuring
   - Fix all linting errors
   - Add proper context headers and complete examples

2. **Address High Priority Issues** ({len(categorized_files['high'])} files)
   - Start with files having highest improvement potential
   - Focus on context clarity and code completeness
   - Fix critical linting errors

### **Week 3-4: Medium Priority & Systematic Improvements**
1. **Medium Priority Files** ({len(categorized_files['medium'])} files)
   - Group by issue type for efficient batch processing
   - Context clarity fixes
   - Complete incomplete code examples
   - Add error documentation

2. **Systematic Improvements**
   - Implement consistent context headers across all files
   - Add missing imports to code examples
   - Create error documentation templates

### **Month 2: Long-term Enhancements**
1. **Q&A Format Conversion** (Low priority files first)
2. **Cross-Reference Optimization**
3. **Advanced LLM Optimization**

---

## 🛠️ **Implementation Templates**

### **Context Header Template**
```markdown
### 📁 Document Sandbox (code.js)
\\```javascript
import {{ editor }} from "express-document-sdk";
// Document manipulation code here
\\```

### 🖥️ UI Runtime (index.js)
\\```javascript
import addOnUISdk from "add-on-sdk";
// UI interaction code here
\\```
```

### **Error Documentation Template**
```markdown
## Common Issues

### Error: "Method not found"
❌ **Don't do this:**
\\```javascript
element.nonExistentMethod(); // This doesn't exist
\\```

✅ **Do this instead:**
\\```javascript
element.correctMethod(); // Use the correct API
\\```

**Why this happens:** [Explanation]
**How to fix:** [Solution steps]
```

### **Q&A Format Template**
```markdown
## Frequently Asked Questions

### Q: How do I create a text element?
A: Use the `editor.createText()` method in the Document Sandbox:

\\```javascript
import {{ editor }} from "express-document-sdk";
const textNode = editor.createText();
\\```

### Q: Why is my text not appearing?
A: Make sure to add the text to the document:

\\```javascript
editor.context.insertionParent.appendChild(textNode);
\\```
```

---

## 📊 **Progress Tracking**

### **Completion Checklist**
- [ ] **Critical Files:** 0/{len(categorized_files['critical'])} completed
- [ ] **High Priority:** 0/{len(categorized_files['high'])} completed  
- [ ] **Medium Priority:** 0/{len(categorized_files['medium'])} completed
- [ ] **Context Headers:** 0/{common_issues['missing_context']} added
- [ ] **Complete Examples:** 0/{common_issues['incomplete_examples']} fixed
- [ ] **Error Documentation:** 0/{common_issues['missing_error_docs']} added

### **Success Metrics**
- [ ] 90% reduction in critical linting errors
- [ ] All high-priority files above 0.6 health score
- [ ] Context clarity score above 0.8 for core tutorial files
- [ ] 50%+ of files in Q&A format

---

*Report generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Focused on core documentation excluding API references*
*For questions about this report, refer to the audit framework documentation*
""")
    
    return report_filename

def main():
    parser = argparse.ArgumentParser(description='Generate detailed implementation report from audit baseline')
    parser.add_argument('--scope', choices=['filtered', 'complete'], default='filtered',
                       help='Generate report from filtered (108 core docs) or complete (204 all files) baseline (default: filtered)')
    
    args = parser.parse_args()
    
    try:
        report_file = generate_detailed_implementation_report(args.scope)
        scope_desc = "filtered (core docs only)" if args.scope == "filtered" else "complete (all files)"
        print(f"✅ Detailed implementation report generated: {report_file}")
        print(f"📊 Based on {scope_desc} baseline data")
        print(f"📖 Open the file to view the complete development guide")
    except FileNotFoundError as e:
        print(f"❌ Error: {e}")
        scope_hint = "--filtered" if args.scope == "filtered" else ""
        print(f"💡 Make sure you have run: python3 scripts/doc_audit_runner.py --baseline {scope_hint} --full-report")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main() 