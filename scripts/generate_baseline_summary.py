#!/usr/bin/env python3
"""
Generate Filtered Baseline Audit Summary Report
Excludes auto-generated reference files and changelog files
Creates a comprehensive summary focused on core documentation
"""
import json
import argparse
from pathlib import Path
from datetime import datetime
import glob

def load_audit_data(file_path):
    """Load the baseline audit JSON data"""
    with open(file_path, 'r') as f:
        return json.load(f)

def find_latest_baseline(scope="filtered"):
    """Find the most recent baseline audit file of specified scope"""
    if scope == "filtered":
        # First try to find filtered baselines (new naming)
        filtered_files = glob.glob("baseline_doc_audit_filtered_*_audit.json")
        
        if filtered_files:
            return sorted(filtered_files)[-1]
        
        # Fallback to old naming pattern (for backward compatibility)  
        baseline_files = glob.glob("baseline_doc_audit_*.json")
        # Exclude complete files
        baseline_files = [f for f in baseline_files if 'complete_' not in f]
        if not baseline_files:
            return None
        
        print(f"⚠️  Using old naming convention baseline")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline --filtered")
        return sorted(baseline_files)[-1]
    
    elif scope == "complete":
        # Find complete baselines (new naming)
        complete_files = glob.glob("baseline_doc_audit_complete_*.json")
        
        if complete_files:
            return sorted(complete_files)[-1]
        
        # Fallback to old naming pattern (for backward compatibility)  
        baseline_files = glob.glob("baseline_*_audit.json")
        if not baseline_files:
            return None
        
        print(f"⚠️  Using old naming convention baseline")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline")
        return sorted(baseline_files)[-1]
    
    else:
        raise ValueError("Scope must be 'filtered' or 'complete'")

def should_exclude_file(relative_path):
    """Check if a file should be excluded from the filtered report"""
    
    # Exclude patterns (same as generate_priority_summary.py)
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

def filter_data(audit_data):
    """Filter all data structures to exclude auto-generated files"""
    
    # Filter file analysis
    filtered_files = []
    excluded_count = 0
    
    for file_info in audit_data['file_analysis']:
        if should_exclude_file(file_info['relative_path']):
            excluded_count += 1
            continue
        filtered_files.append(file_info)
    
    # Filter most problematic files from linter
    filtered_problematic = []
    for file_path, issue_count in audit_data['linter_audit']['most_problematic_files']:
        # Extract relative path from full path
        relative_path = file_path.replace('express-add-ons-docs/src/pages/', '')
        if not should_exclude_file(relative_path):
            filtered_problematic.append([file_path, issue_count])
    
    print(f"📊 Filtered out {excluded_count} auto-generated/changelog files")
    print(f"📋 Remaining files for analysis: {len(filtered_files)}")
    
    return filtered_files, filtered_problematic, excluded_count

def recalculate_metrics(filtered_files):
    """Recalculate all metrics based on filtered files only"""
    
    if not filtered_files:
        return {}
    
    # Health distribution
    health_distribution = {'excellent': 0, 'good': 0, 'fair': 0, 'poor': 0, 'critical': 0}
    files_needing_attention = 0
    high_priority_files = 0
    
    # LLM readiness metrics
    total_context_clarity = 0
    total_code_completeness = 0
    total_error_coverage = 0
    total_qa_format = 0
    total_llm_score = 0
    
    # Linting metrics
    total_errors = 0
    total_warnings = 0
    total_info = 0
    files_with_issues = 0
    
    for file_info in filtered_files:
        # Health distribution
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
        
        # LLM metrics
        total_context_clarity += file_info['context_clarity_score']
        total_llm_score += file_info['llm_friendly_score']
        
        # Code completeness
        if file_info['code_blocks'] > 0:
            total_code_completeness += file_info['complete_examples'] / file_info['code_blocks']
        
        # Error coverage and Q&A format
        if file_info['error_sections'] > 0:
            total_error_coverage += 1
        if file_info['qa_sections'] > 0:
            total_qa_format += 1
            
        # Linting
        total_errors += file_info['linter_errors']
        total_warnings += file_info['linter_warnings']
        total_info += file_info['linter_info']
        
        if file_info['linter_errors'] + file_info['linter_warnings'] + file_info['linter_info'] > 0:
            files_with_issues += 1
    
    num_files = len(filtered_files)
    avg_health = sum(f['overall_health'] for f in filtered_files) / num_files
    
    return {
        'num_files': num_files,
        'avg_health': avg_health,
        'health_distribution': health_distribution,
        'files_needing_attention': files_needing_attention,
        'high_priority_files': high_priority_files,
        'avg_context_clarity': total_context_clarity / num_files,
        'avg_llm_score': total_llm_score / num_files,
        'code_completeness_ratio': total_code_completeness / num_files if num_files > 0 else 0,
        'error_documentation_coverage': total_error_coverage / num_files,
        'qa_format_adoption': total_qa_format / num_files,
        'total_errors': total_errors,
        'total_warnings': total_warnings,
        'total_info': total_info,
        'files_with_issues': files_with_issues
    }

def generate_summary(audit_data, scope="filtered"):
    """Generate comprehensive summary for specified scope documentation"""
    
    metadata = audit_data['metadata']
    original_framework = audit_data['framework_audit']
    
    if scope == "filtered":
        # Filter the data to exclude auto-generated files
        filtered_files, filtered_problematic, excluded_count = filter_data(audit_data)
    else:
        # Use all files for complete scope
        filtered_files = audit_data['file_analysis']
        filtered_problematic = audit_data['linter_audit']['most_problematic_files']
        excluded_count = 0
        print(f"📊 Using all {len(filtered_files)} files (complete scope)")
    
    # Recalculate metrics for files in scope
    metrics = recalculate_metrics(filtered_files)
    
    if not metrics:
        return "Error: No files remaining after filtering"
    
    # Generate timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Generate scope-aware titles and descriptions
    scope_title = "Filtered Core" if scope == "filtered" else "Complete"
    scope_desc = f"Core Documentation Files Analyzed: {metrics['num_files']} (filtered from {metadata['total_files']} total)" if scope == "filtered" else f"All Documentation Files Analyzed: {metrics['num_files']}"
    
    report = f"""# 📊 Adobe Express Add-ons Documentation - {scope_title} Baseline Audit Summary

## 📅 **Audit Date:** {metadata['timestamp']}
## 📁 **{scope_desc}**
## 🔍 **Baseline Hash:** `{original_framework['baseline_hash']}`

### **🔍 {"Filtering Applied" if scope == "filtered" else "Analysis Scope"}**
{f'''**Excluded from this analysis:**
- **{excluded_count} auto-generated files** (`references/addonsdk/*`, API classes, interfaces, namespaces, type aliases)
- **All changelog files** (require separate improvement strategy)

**Focus:** Core documentation that developers actively read, learn from, and use for building add-ons.''' if scope == "filtered" else f'''**Included in this analysis:**
- **All {len(filtered_files)} documentation files** (including auto-generated API references)
- **Complete documentation ecosystem** analysis

**Focus:** Comprehensive analysis of all documentation files including developer-facing guides and auto-generated API references.'''}

---

## 🎯 **EXECUTIVE SUMMARY - {scope_title.upper()} DOCUMENTATION**

### **🔴 Overall LLM-Readiness Assessment**
- **Overall Score**: **{metrics['avg_llm_score']:.3f}/1.00** ({metrics['avg_llm_score']*100:.1f}%) - {"🚨 **CRITICAL**" if metrics['avg_llm_score'] < 0.3 else "🟡 **POOR**" if metrics['avg_llm_score'] < 0.5 else "⚠️ **FAIR**"}
- **Status**: Requires immediate comprehensive improvement for {scope.lower()} developer resources
- **Primary Need**: Complete restructuring of learning and tutorial content for LLM compatibility

### **📊 Core Documentation Health Distribution**
| Health Level | Count | Percentage | Status |
|--------------|--------|-----------|---------|
| **Critical** | {metrics['health_distribution']['critical']} | {metrics['health_distribution']['critical']/metrics['num_files']*100:.1f}% | 🔴 Emergency |
| **Poor** | {metrics['health_distribution']['poor']} | {metrics['health_distribution']['poor']/metrics['num_files']*100:.1f}% | 🟡 Urgent |
| **Fair** | {metrics['health_distribution']['fair']} | {metrics['health_distribution']['fair']/metrics['num_files']*100:.1f}% | ⚠️ Needs Work |
| **Good** | {metrics['health_distribution']['good']} | {metrics['health_distribution']['good']/metrics['num_files']*100:.1f}% | ✅ Acceptable |
| **Excellent** | {metrics['health_distribution']['excellent']} | {metrics['health_distribution']['excellent']/metrics['num_files']*100:.1f}% | 🌟 Great |

### **⚡ Key Metrics for Core Documentation**
- **Files Needing Immediate Attention**: {metrics['files_needing_attention']}/{metrics['num_files']} ({metrics['files_needing_attention']/metrics['num_files']*100:.1f}%)
- **High Priority Files**: {metrics['high_priority_files']}
- **Average File Health**: {metrics['avg_health']:.3f}/1.00
- **Files with Linting Issues**: {metrics['files_with_issues']}/{metrics['num_files']} ({metrics['files_with_issues']/metrics['num_files']*100:.1f}%)

---

## 📈 **CORE DOCUMENTATION PERFORMANCE ANALYSIS**

### **🔴 Critical Categories (Requiring Immediate Action)**
| Category | Score | Grade | Status |
|----------|-------|-------|--------|
| **Context Clarity** | {metrics['avg_context_clarity']:.3f}/1.00 | {"F" if metrics['avg_context_clarity'] < 0.3 else "D" if metrics['avg_context_clarity'] < 0.5 else "C"} | 🚨 Poor UI/Sandbox distinction in tutorials |
| **Error Documentation** | {metrics['error_documentation_coverage']:.3f}/1.00 | {"F" if metrics['error_documentation_coverage'] < 0.3 else "D" if metrics['error_documentation_coverage'] < 0.5 else "C"} | 🚨 Minimal troubleshooting in guides |
| **Q&A Format** | {metrics['qa_format_adoption']:.3f}/1.00 | {"F" if metrics['qa_format_adoption'] < 0.3 else "D" if metrics['qa_format_adoption'] < 0.5 else "C"} | 🚨 Not optimized for LLM training |
| **Code Completeness** | {metrics['code_completeness_ratio']:.3f}/1.00 | {"F" if metrics['code_completeness_ratio'] < 0.3 else "D" if metrics['code_completeness_ratio'] < 0.5 else "C"} | {"🚨" if metrics['code_completeness_ratio'] < 0.5 else "⚠️"} Incomplete examples in tutorials |

---

## 🚨 **CRITICAL ISSUES IN CORE DOCUMENTATION**

### **🔥 Structural Problems**
1. **Context Confusion**: {(1 - metrics['avg_context_clarity']) * 100:.0f}% of core files lack clear UI vs Sandbox context
2. **Missing Error Help**: {(1 - metrics['error_documentation_coverage']) * 100:.0f}% of core files lack error-first documentation  
3. **{metrics['total_errors']} critical linting errors** in developer-facing content
4. **{metrics['qa_format_adoption'] * 100:.0f}% Q&A format adoption** - Content not optimized for LLM training

### **📊 Files with Most Linting Issues**
*Top 10 files ranked by total number of linter violations (not priority)*
*These are the files developers actually use for learning*

"""
    
    # Add top problematic files
    for i, (file_path, issue_count) in enumerate(filtered_problematic[:10], 1):
        filename = Path(file_path).name
        relative_path = file_path.replace('express-add-ons-docs/src/pages/', '')
        
        # Determine file type
        if 'tutorial' in relative_path:
            file_type = "Tutorial"
        elif 'how_to' in relative_path:
            file_type = "How-To Guide"
        elif 'getting_started' in relative_path:
            file_type = "Getting Started"
        elif 'platform_concepts' in relative_path:
            file_type = "Platform Concepts"
        elif 'support' in relative_path:
            file_type = "Support"
        else:
            file_type = "Documentation"
            
        report += f"| {i} | `{filename}` | {issue_count} | {file_type} |\n"
    
    report += f"""

---

## 💡 **CORE DOCUMENTATION IMPROVEMENT RECOMMENDATIONS**

### **🔥 Phase 1: Fix Critical Developer-Blocking Issues (Week 1-2)**
1. **Address High-Priority Files** - Focus on impact over issue count for maximum improvement
2. **Add Context Headers to All Code Examples**
3. **Complete Broken Code Examples**

### **⚡ Phase 2: Core Content Quality (Month 1)**
1. **Add Troubleshooting Sections** to all tutorials
2. **Environment Distinction**: Make UI vs Sandbox crystal clear

### **📈 Phase 3: LLM Optimization (Month 2-3)**
1. **Convert Tutorials to Q&A Structure** for better LLM retrieval
2. **Progressive Learning Paths**

---

*{scope_title} baseline audit summary generated on {timestamp}*
*Analysis focused on {metrics['num_files']} {'core documentation files that drive developer success' if scope == 'filtered' else 'documentation files including auto-generated references'}*
"""
    
    return report

def main():
    parser = argparse.ArgumentParser(description='Generate baseline summary report from audit baseline')
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
    
    # Generate summary
    scope_desc = "filtered" if args.scope == "filtered" else "complete"
    print(f"🔄 Generating {scope_desc} baseline audit summary...")
    report = generate_summary(audit_data, args.scope)
    
    # Save report with scope-aware name
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"reports/baseline_summary_{scope_desc}_{timestamp}.md"
    Path("reports").mkdir(exist_ok=True)
    
    with open(output_file, 'w') as f:
        f.write(report)
    
    scope_name = "Filtered Core Documentation" if args.scope == "filtered" else "Complete Documentation"
    print(f"✅ {scope_name} Baseline Summary generated: {output_file}")
    if args.scope == "filtered":
        print(f"📊 Report focuses on core developer-facing documentation only")
        print(f"🎯 Excludes auto-generated API references and changelog files")
    else:
        print(f"📊 Report includes all documentation files")
        print(f"📁 Includes auto-generated API references and changelog files")

if __name__ == "__main__":
    main() 