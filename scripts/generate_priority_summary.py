#!/usr/bin/env python3
"""
Generate Filtered Priority Summary Report from Baseline Audit
Excludes auto-generated reference files and changelog files
"""
import json
import argparse
from pathlib import Path
from datetime import datetime

def load_audit_data(file_path):
    """Load the baseline audit JSON data"""
    with open(file_path, 'r') as f:
        return json.load(f)

def should_exclude_file(relative_path):
    """Check if a file should be excluded from the filtered report"""
    
    # Convert to normalized path for consistent checking
    path_parts = Path(relative_path).parts
    
    # Exclude patterns
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

def filter_file_analysis(file_analysis):
    """Filter out excluded files from the analysis"""
    filtered_files = []
    excluded_count = 0
    
    for file_info in file_analysis:
        if should_exclude_file(file_info['relative_path']):
            excluded_count += 1
            continue
        filtered_files.append(file_info)
    
    print(f"📊 Filtered out {excluded_count} auto-generated/changelog files")
    print(f"📋 Remaining files for analysis: {len(filtered_files)}")
    
    return filtered_files

def recalculate_metrics(filtered_files, original_linter):
    """Recalculate metrics based on filtered files"""
    
    # Recalculate health distribution
    health_distribution = {'excellent': 0, 'good': 0, 'fair': 0, 'poor': 0, 'critical': 0}
    files_needing_attention = 0
    high_priority_files = 0
    
    for file_info in filtered_files:
        health = file_info['overall_health']
        if health >= 0.8:
            health_distribution['excellent'] += 1
        elif health >= 0.6:
            health_distribution['good'] += 1
        elif health >= 0.4:
            health_distribution['fair'] += 1
        elif health >= 0.2:
            health_distribution['poor'] += 1
        else:
            health_distribution['critical'] += 1
            
        if health < 0.5:
            files_needing_attention += 1
            
        if file_info['priority_level'] > 0.6:
            high_priority_files += 1
    
    # Recalculate average health
    avg_health = sum(f['overall_health'] for f in filtered_files) / len(filtered_files) if filtered_files else 0
    
    # Recalculate linter issues for filtered files
    filtered_linter_issues = {}
    total_errors = sum(f['linter_errors'] for f in filtered_files)
    total_warnings = sum(f['linter_warnings'] for f in filtered_files) 
    total_info = sum(f['linter_info'] for f in filtered_files)
    files_with_issues = sum(1 for f in filtered_files if f['linter_errors'] + f['linter_warnings'] + f['linter_info'] > 0)
    
    # Get most problematic filtered files
    most_problematic = []
    for file_info in sorted(filtered_files, key=lambda x: -(x['linter_errors'] + x['linter_warnings'] + x['linter_info']))[:10]:
        total_issues = file_info['linter_errors'] + file_info['linter_warnings'] + file_info['linter_info']
        most_problematic.append([file_info['file_path'], total_issues])
    
    return {
        'health_distribution': health_distribution,
        'files_needing_attention': files_needing_attention,
        'high_priority_files': high_priority_files,
        'avg_health': avg_health,
        'total_errors': total_errors,
        'total_warnings': total_warnings,
        'total_info': total_info,
        'files_with_issues': files_with_issues,
        'most_problematic': most_problematic
    }

def generate_filtered_priority_summary(audit_data, scope="filtered"):
    """Generate a comprehensive summary report ordered by priority for filtered files"""
    
    metadata = audit_data['metadata']
    framework = audit_data['framework_audit']
    linter = audit_data['linter_audit']
    file_analysis = audit_data['file_analysis']
    
    # Filter files based on scope
    if scope == "filtered":
        filtered_files = filter_file_analysis(file_analysis)
    else:
        # Use all files for complete scope
        filtered_files = file_analysis
        print(f"📊 Using all {len(filtered_files)} files (complete scope)")
    
    # Recalculate metrics for files in scope
    filtered_metrics = recalculate_metrics(filtered_files, linter)
    
    # Sort files by priority level (highest first) and overall health (lowest first)
    sorted_files = sorted(filtered_files, 
                         key=lambda x: (-x['priority_level'], x['overall_health']))
    
    # Generate scope-aware report title
    scope_title = "Filtered" if scope == "filtered" else "Complete"
    scope_desc = f"Total Files Analyzed: {len(filtered_files)} (filtered from {metadata['total_files']} total)" if scope == "filtered" else f"Total Files Analyzed: {len(filtered_files)}"
    
    # Generate report
    report = f"""# 🚨 Adobe Express Add-ons Documentation - {scope_title} Priority Summary Report

## 📅 **Audit Date:** {metadata['timestamp']}
## 📁 **{scope_desc}**
## 🎯 **Overall LLM-Readiness Score:** {framework['overall_score']:.3f}/1.00

### **🔍 {"Filtering Applied" if scope == "filtered" else "Analysis Scope"}**
{f'''**Excluded from this report:**
- Auto-generated API reference files (`references/addonsdk/*`)
- Auto-generated Document API classes, interfaces, namespaces, and type aliases
- All `changelog.md` files (require separate strategy)

**Focus:** Core documentation that developers actively read and learn from.''' if scope == "filtered" else f'''**Included in this report:**
- **All {len(filtered_files)} documentation files** (including auto-generated API references)
- **Complete documentation ecosystem** analysis

**Focus:** Comprehensive priority analysis of all documentation files including developer-facing guides and auto-generated API references.'''}

---

## 📊 **Executive Summary**

### **🔴 Critical Status Overview**
- **Files Needing Immediate Attention:** {filtered_metrics['files_needing_attention']}/{len(filtered_files)} ({filtered_metrics['files_needing_attention']/len(filtered_files)*100:.1f}%)
- **High Priority Files:** {filtered_metrics['high_priority_files']}
- **Critical Health Files:** {filtered_metrics['health_distribution']['critical']}
- **Total Linter Errors:** {filtered_metrics['total_errors']}

### **📈 Top Issues Requiring Action**
"""
    
    # Add category scores (these are overall, not filtered)
    for category, score in framework['category_scores'].items():
        status = "🔴" if score < 0.3 else "🟡" if score < 0.6 else "🟢"
        report += f"- **{category.replace('_', ' ').title()}**: {status} {score:.3f}/1.00\n"
    
    report += f"""
---

## 📊 **UNDERSTANDING THE TWO RANKING SYSTEMS**

This report uses **two different ranking methods** for different purposes:

1. **🎯 Priority Files** (below) = **Urgency-based ranking** using impact algorithm
   - Considers: Error severity + file importance + context clarity + code completeness
   - **Use for:** Deciding which files to fix first for maximum improvement

2. **📊 Most Issues Files** (at bottom) = **Quantity-based ranking** using issue count  
   - Considers: Total number of linter violations (errors + warnings + info)
   - **Use for:** Understanding which files need the most cleanup work

---

## 🚨 **FILES REQUIRING IMMEDIATE ATTENTION** 
*Ordered by Priority Level (Highest Need First)*

"""
    
    # Group files by priority level
    critical_files = []
    high_priority_files = []
    medium_priority_files = []
    
    for file_info in sorted_files:
        if file_info['priority_level'] >= 0.8:
            critical_files.append(file_info)
        elif file_info['priority_level'] >= 0.5:
            high_priority_files.append(file_info)
        else:
            medium_priority_files.append(file_info)
    
    # Critical Priority Files
    if critical_files:
        report += f"""### 🔴 **CRITICAL PRIORITY FILES** ({len(critical_files)} files)
*Files ranked by calculated impact and urgency (not just issue count)*

**🎯 Priority Algorithm:** Based on errors + importance + context clarity + code completeness  
**⚡ These files should be fixed first** for maximum LLM-readiness improvement

"""
        for i, file_info in enumerate(critical_files[:15], 1):  # Top 15 critical files
            report += format_file_entry(i, file_info, "🔴")
    
    # High Priority Files  
    if high_priority_files:
        report += f"""
### 🟡 **HIGH PRIORITY** ({len(high_priority_files)} files)
*Files with significant issues that should be addressed soon*

"""
        for i, file_info in enumerate(high_priority_files[:15], 1):  # Top 15 high priority
            report += format_file_entry(i, file_info, "🟡")
    
    # Most problematic files from filtered results
    report += f"""
---

## 📊 **FILES WITH MOST LINTING ISSUES** 
*Top 10 files ranked by total number of linter violations (errors + warnings + info)*

**🔍 What this shows:** Files with the most rule violations that need cleanup  
**⚠️ Note:** High issue count doesn't always mean highest priority to fix

"""
    
    for i, (file_path, issue_count) in enumerate(filtered_metrics['most_problematic'][:10], 1):
        # Find the file in analysis for more details
        file_info = next((f for f in filtered_files if f['file_path'] == file_path), None)
        if file_info:
            report += f"""**{i}. {Path(file_path).name}** 
   - 📁 Path: `{file_info['relative_path']}`
   - 🚨 **Total Issues: {issue_count}**
   - ❌ Errors: {file_info['linter_errors']} | ⚠️ Warnings: {file_info['linter_warnings']} | ℹ️ Info: {file_info['linter_info']}
   - 🎯 LLM Score: {file_info['llm_friendly_score']:.3f}/1.00
   - 📊 Health: {file_info['overall_health']:.3f}/1.00

"""
    
    # Recommendations section
    report += f"""
---

## 💡 **IMMEDIATE ACTION PLAN**

### **🎯 Focus Areas for Core Documentation**

#### **🔥 Week 1: Address Critical Tutorial/Guide Files**
1. **Fix Critical Priority Files** first (highest impact for LLM-readiness)
2. **Tutorial Files**: Focus on `grids-addon.md`, `stats-addon.md`, and tutorial content  
3. **How-To Guides**: Prioritize `use_text.md`, `use_color.md`, `group_elements.md`
4. **Clean up Most Issues Files** for overall quality (quantity-based cleanup)

#### **⚡ Week 2-3: Core Documentation Improvements**  
1. **Getting Started**: Fix setup and quickstart guides for new developers
2. **Learn Section**: Improve how-to guides with complete examples
3. **Platform Concepts**: Enhance `document-api.md` and core concept explanations

#### **📈 Month 2: Content Strategy**
1. **Error-First Documentation**: Add troubleshooting sections to tutorials
2. **Complete Code Examples**: Ensure all examples work standalone
3. **Context Clarity**: Add clear UI/Sandbox distinction to all code

### **🎯 Success Metrics for Core Files**
- **Critical Health Files**: From {filtered_metrics['health_distribution']['critical']} → Target: <10
- **Files Needing Attention**: From {filtered_metrics['files_needing_attention']} → Target: <20
- **Tutorial Quality**: All tutorial files should achieve 0.7+ LLM score

---

## 📊 **PROGRESS TRACKING**

### **Filtered Results Focus**
- **Core Files Analyzed**: {len(filtered_files)}
- **Auto-Generated Files Excluded**: {metadata['total_files'] - len(filtered_files)}
- **Critical Files Requiring Action**: {len(critical_files)}
- **High Priority Files**: {len(high_priority_files)}

### **Priority by File Type**
"""
    
    # Add breakdown by file type
    file_types = {}
    for file_info in filtered_files:
        path_parts = file_info['relative_path'].split('/')
        if len(path_parts) >= 2:
            category = f"{path_parts[0]}/{path_parts[1]}" if len(path_parts) > 1 else path_parts[0]
        else:
            category = "root"
        
        if category not in file_types:
            file_types[category] = {'total': 0, 'critical': 0, 'high': 0}
        
        file_types[category]['total'] += 1
        if file_info['priority_level'] >= 0.8:
            file_types[category]['critical'] += 1
        elif file_info['priority_level'] >= 0.5:
            file_types[category]['high'] += 1
    
    for category, counts in sorted(file_types.items(), key=lambda x: -(x[1]['critical'] + x[1]['high'])):
        report += f"- **{category}**: {counts['total']} files ({counts['critical']} critical, {counts['high']} high priority)\n"
    
    report += f"""

---

*Filtered report generated on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")} from baseline audit {metadata['timestamp']}*
*Focused on {len(filtered_files)} core documentation files that developers actively use for learning*
"""
    
    return report

def format_file_entry(index, file_info, priority_icon):
    """Format a single file entry for the report"""
    return f"""**{index}. {Path(file_info['file_path']).name}** {priority_icon}
   - 📁 Path: `{file_info['relative_path']}`
   - 🎯 Priority Level: {file_info['priority_level']:.3f}/1.00
   - 📊 Overall Health: {file_info['overall_health']:.3f}/1.00
   - 🤖 LLM Score: {file_info['llm_friendly_score']:.3f}/1.00
   - 🚨 Issues: {file_info['linter_errors']}E + {file_info['linter_warnings']}W + {file_info['linter_info']}I = {file_info['linter_errors'] + file_info['linter_warnings'] + file_info['linter_info']} total
   - 📝 Content: {file_info['word_count']} words, {file_info['code_blocks']} code blocks
   - 🔧 **Action Needed**: {"Context headers, " if file_info['context_clarity_score'] < 0.3 else ""}{"Error docs, " if file_info['error_sections'] == 0 else ""}{"Complete examples, " if file_info['incomplete_examples'] > file_info['complete_examples'] else ""}{"Q&A format" if file_info['qa_sections'] == 0 else ""}

"""

def get_baseline_directory():
    """Get the directory where baseline files are stored."""
    from pathlib import Path
    # Check if we're in the scripts directory
    current_dir = Path.cwd()
    if current_dir.name == "scripts":
        # We're in scripts/, baseline files are in parent directory
        return current_dir.parent
    else:
        # We're in the root directory, baseline files are here
        return current_dir

def find_latest_baseline(scope="filtered"):
    """Find the most recent baseline audit file of specified scope"""
    import glob
    from pathlib import Path
    
    baseline_dir = get_baseline_directory()
    
    if scope == "filtered":
        # First try to find filtered baselines (correct naming)
        filtered_files = list(baseline_dir.glob("baseline_doc_audit_filtered_*.json"))
        
        if filtered_files:
            return sorted(filtered_files)[-1]
        
        # Fallback to old naming pattern (for backward compatibility)
        baseline_files = list(baseline_dir.glob("baseline_doc_audit_*.json"))
        baseline_files = [f for f in baseline_files if 'complete_' not in f.name]
        if not baseline_files:
            return None
        
        print(f"⚠️  Using old naming convention baseline")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline --filtered")
        return sorted(baseline_files)[-1]
    
    elif scope == "complete":
        # Find complete baselines (correct naming)
        complete_files = list(baseline_dir.glob("baseline_doc_audit_complete_*.json"))
        
        if complete_files:
            return sorted(complete_files)[-1]
        
        # Fallback to old naming pattern (for backward compatibility)
        baseline_files = list(baseline_dir.glob("baseline_doc_audit_*.json"))
        if not baseline_files:
            return None
        
        print(f"⚠️  Using old naming convention baseline")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline")
        return sorted(baseline_files)[-1]
    
    else:
        raise ValueError("Scope must be 'filtered' or 'complete'")

def main():
    parser = argparse.ArgumentParser(description='Generate priority summary report from audit baseline')
    parser.add_argument('--scope', choices=['filtered', 'complete'], default='filtered',
                       help='Generate report from filtered (108 core docs) or complete (204 all files) baseline (default: filtered)')
    
    args = parser.parse_args()
    
    # Find the most recent baseline audit file
    audit_file = find_latest_baseline(args.scope)
    
    if not audit_file:
        scope_hint = "--filtered" if args.scope == "filtered" else ""
        print("❌ No baseline audit file found.")
        print("Please run the baseline audit first:")
        print(f"python3 scripts/doc_audit_runner.py --baseline {scope_hint} --full-report")
        return
    
    print(f"📊 Using baseline audit file: {audit_file}")
    
    try:
        audit_data = load_audit_data(audit_file)
    except FileNotFoundError:
        print(f"❌ Baseline audit file not found: {audit_file}")
        return
    except json.JSONDecodeError:
        print(f"❌ Invalid JSON in baseline audit file: {audit_file}")
        return
    
    # Generate filtered report
    scope_desc = "filtered" if args.scope == "filtered" else "complete"
    print(f"🔄 Generating {scope_desc} priority summary...")
    report = generate_filtered_priority_summary(audit_data, args.scope)
    
    # Save report with scope-aware filename  
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    Path("reports").mkdir(exist_ok=True)
    output_file = f"reports/priority_summary_{scope_desc}_{timestamp}.md"
    with open(output_file, 'w') as f:
        f.write(report)
    
    scope_name = "Filtered Priority" if args.scope == "filtered" else "Complete Priority"
    print(f"✅ {scope_name} Summary Report generated: {output_file}")
    print(f"📋 Report {'focuses on core files' if args.scope == 'filtered' else 'includes all files'} ordered by urgency")

if __name__ == "__main__":
    main()