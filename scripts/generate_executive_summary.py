#!/usr/bin/env python3

import json
import os
import argparse
from datetime import datetime
from pathlib import Path

def get_baseline_directory():
    """Get the directory where baseline files are stored."""
    # Start from the current script's directory
    script_dir = Path(__file__).parent
    
    # If we're in the scripts directory, go up one level to express-add-ons-docs root
    if script_dir.name == "scripts":
        baseline_dir = script_dir.parent
    else:
        # If script is moved elsewhere, try to find express-add-ons-docs directory
        current_dir = Path.cwd()
        
        # Check if we're already in express-add-ons-docs
        if current_dir.name == "express-add-ons-docs":
            baseline_dir = current_dir
        # Check if express-add-ons-docs is a parent directory
        elif "express-add-ons-docs" in [p.name for p in current_dir.parents]:
            baseline_dir = next(p for p in current_dir.parents if p.name == "express-add-ons-docs")
        # Check if express-add-ons-docs is a subdirectory
        elif (current_dir / "express-add-ons-docs").exists():
            baseline_dir = current_dir / "express-add-ons-docs"
        else:
            # Fallback to current directory
            baseline_dir = current_dir
    
    # Verify the directory exists and contains expected files
    if not baseline_dir.exists():
        raise FileNotFoundError(f"Baseline directory not found: {baseline_dir}")
    
    print(f"📁 Looking for baseline files in: {baseline_dir}")
    return baseline_dir

def find_latest_baseline(scope="filtered"):
    """Find the most recent baseline audit file of specified scope."""
    baseline_dir = get_baseline_directory()
    
    if scope == "filtered":
        # First try to find filtered baselines (correct naming)
        filtered_files = [f for f in os.listdir(baseline_dir) if f.startswith('baseline_doc_audit_filtered_') and f.endswith('.json')]
        
        if filtered_files:
            filtered_files.sort(reverse=True)
            return baseline_dir / filtered_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir(baseline_dir) if f.startswith('baseline_doc_audit_') and f.endswith('.json') and 'complete_' not in f]
        if not all_files:
            raise FileNotFoundError("No filtered baseline audit files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention baseline: {all_files[0]}")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline --filtered")
        return baseline_dir / all_files[0]
    
    elif scope == "complete":
        # Find complete baselines
        complete_files = [f for f in os.listdir(baseline_dir) if f.startswith('baseline_doc_audit_complete_') and f.endswith('.json')]
        
        if complete_files:
            complete_files.sort(reverse=True)
            return baseline_dir / complete_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir(baseline_dir) if f.startswith('baseline_doc_audit_') and f.endswith('.json')]
        if not all_files:
            raise FileNotFoundError("No complete baseline audit files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention baseline: {all_files[0]}")
        print(f"💡 For clearer naming, run: python3 scripts/doc_audit_runner.py --baseline")
        return baseline_dir / all_files[0]
    
    else:
        raise ValueError("Scope must be 'filtered' or 'complete'")

def find_latest_detailed_analysis(scope="filtered"):
    """Find the most recent detailed file analysis of specified scope."""
    baseline_dir = get_baseline_directory()
    
    if scope == "filtered":
        # First try to find filtered detailed analysis (correct naming)
        filtered_files = [f for f in os.listdir(baseline_dir) if f.startswith('detailed_doc_audit_filtered_') and f.endswith('.json')]
        
        if filtered_files:
            filtered_files.sort(reverse=True)
            return baseline_dir / filtered_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir(baseline_dir) if f.startswith('detailed_doc_audit_') and f.endswith('.json') and 'complete_' not in f]
        if not all_files:
            # Try comprehensive_doc_audit pattern as another fallback
            comprehensive_files = [f for f in os.listdir(baseline_dir) if f.startswith('comprehensive_doc_audit_filtered_') and f.endswith('.json')]
            if comprehensive_files:
                comprehensive_files.sort(reverse=True)
                print(f"⚠️  Using comprehensive doc audit file: {comprehensive_files[0]}")
                return baseline_dir / comprehensive_files[0]
            raise FileNotFoundError("No filtered detailed analysis files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention detailed analysis: {all_files[0]}")
        return baseline_dir / all_files[0]
    
    elif scope == "complete":
        # Find complete detailed analysis
        complete_files = [f for f in os.listdir(baseline_dir) if f.startswith('detailed_doc_audit_complete_') and f.endswith('.json')]
        
        if complete_files:
            complete_files.sort(reverse=True)
            return baseline_dir / complete_files[0]
        
        # Try comprehensive_doc_audit pattern as fallback
        comprehensive_files = [f for f in os.listdir(baseline_dir) if f.startswith('comprehensive_doc_audit_complete_') and f.endswith('.json')]
        if comprehensive_files:
            comprehensive_files.sort(reverse=True)
            print(f"⚠️  Using comprehensive doc audit file: {comprehensive_files[0]}")
            return baseline_dir / comprehensive_files[0]
        
        # Fallback to old naming pattern (for backward compatibility)
        all_files = [f for f in os.listdir(baseline_dir) if f.startswith('detailed_doc_audit_') and f.endswith('.json')]
        if not all_files:
            raise FileNotFoundError("No complete detailed analysis files found")
        
        all_files.sort(reverse=True)
        print(f"⚠️  Using old naming convention detailed analysis: {all_files[0]}")
        return baseline_dir / all_files[0]
    
    else:
        raise ValueError("Scope must be 'filtered' or 'complete'")

def calculate_health_tier_distribution(detailed_data):
    """Calculate distribution of files across health tiers."""
    tiers = {'excellent': 0, 'good': 0, 'fair': 0, 'poor': 0, 'critical': 0}
    
    for file_data in detailed_data:
        score = file_data.get('overall_health', 0)
        if score >= 0.8:
            tiers['excellent'] += 1
        elif score >= 0.6:
            tiers['good'] += 1
        elif score >= 0.4:
            tiers['fair'] += 1
        elif score >= 0.2:
            tiers['poor'] += 1
        else:
            tiers['critical'] += 1
    
    return tiers

def get_priority_breakdown(detailed_data):
    """Get breakdown of files by priority level."""
    high_priority = []
    medium_priority = []
    low_priority = []
    
    for file_data in detailed_data:
        priority = file_data.get('priority_level', 0)
        if priority >= 0.7:
            high_priority.append(file_data)
        elif priority >= 0.4:
            medium_priority.append(file_data)
        else:
            low_priority.append(file_data)
    
    return {
        'high': high_priority,
        'medium': medium_priority,
        'low': low_priority
    }

def get_top_improvement_opportunities(detailed_data, limit=10):
    """Get files with highest improvement potential."""
    sorted_files = sorted(detailed_data, 
                         key=lambda x: x.get('improvement_potential', 0), 
                         reverse=True)
    return sorted_files[:limit]

def get_critical_issues_summary(baseline_data):
    """Extract critical issues from baseline data."""
    framework_audit = baseline_data.get('framework_audit', {})
    linter_audit = baseline_data.get('linter_audit', {})
    
    critical_issues = framework_audit.get('critical_issues', [])
    
    # Add linter summary
    linter_summary = linter_audit.get('summary', {})
    total_errors = linter_summary.get('total_errors', 0)
    total_warnings = linter_summary.get('total_warnings', 0)
    files_with_issues = linter_summary.get('files_with_issues', 0)
    
    return {
        'framework_issues': critical_issues,
        'linter_errors': total_errors,
        'linter_warnings': total_warnings,
        'files_with_issues': files_with_issues
    }

def generate_executive_summary(scope="filtered"):
    """Generate executive summary report."""
    
    # Find latest files
    baseline_file = find_latest_baseline(scope)
    detailed_file = find_latest_detailed_analysis(scope)
    
    print(f"📊 Loading data from {baseline_file} and {detailed_file}")
    
    # Load data
    with open(baseline_file, 'r') as f:
        baseline_data = json.load(f)
    
    with open(detailed_file, 'r') as f:
        detailed_file_data = json.load(f)
    
    # Handle different file structures - detailed_doc_audit vs comprehensive_doc_audit
    if isinstance(detailed_file_data, list):
        # This is a detailed_doc_audit file (list of file objects)
        detailed_data = detailed_file_data
    else:
        # This is a comprehensive_doc_audit file (has nested structure)
        detailed_data = detailed_file_data.get('file_analysis', [])
        if not detailed_data:
            raise ValueError(f"No file_analysis found in {detailed_file}")
        print(f"ℹ️ Extracted {len(detailed_data)} file analysis records from comprehensive audit file")
    
    # Extract timestamp from filename (handle both old and new naming conventions)
    parts = baseline_file.name.split('_')
    if len(parts) >= 6 and 'filtered' in parts:
        # New naming: baseline_doc_audit_filtered_YYYYMMDD_HHMMSS.json
        timestamp = parts[4] + '_' + parts[5].replace('.json', '')
    elif len(parts) >= 6 and 'complete' in parts:
        # New naming: baseline_doc_audit_complete_YYYYMMDD_HHMMSS.json
        timestamp = parts[4] + '_' + parts[5].replace('.json', '')
    else:
        # Old naming: baseline_doc_audit_YYYYMMDD_HHMMSS.json
        timestamp = parts[3] + '_' + parts[4].replace('.json', '')
    readable_date = datetime.strptime(timestamp, '%Y%m%d_%H%M%S').strftime('%Y-%m-%d %H:%M:%S')
    
    # Calculate metrics
    metadata = baseline_data['metadata']
    framework_audit = baseline_data['framework_audit']
    
    total_files = metadata['total_files']
    overall_score = framework_audit['overall_score']
    category_scores = framework_audit['category_scores']
    
    health_tiers = calculate_health_tier_distribution(detailed_data)
    priority_breakdown = get_priority_breakdown(detailed_data)
    improvement_opportunities = get_top_improvement_opportunities(detailed_data)
    critical_issues = get_critical_issues_summary(baseline_data)
    
    # Generate report
    Path("reports").mkdir(exist_ok=True)
    report_filename = f"reports/executive_summary_{scope}_{timestamp}.md"
    
    # Generate scope-appropriate descriptions
    scope_title = "Filtered Core" if scope == "filtered" else "Complete"
    scope_description = "Focused on core documentation excluding auto-generated API references" if scope == "filtered" else "Comprehensive analysis of all documentation files"
    
    with open(report_filename, 'w') as f:
        f.write(f"""# 📊 Adobe Express Add-ons Documentation - Executive Summary
*Generated from {scope_title} Documentation Audit*
*{scope_description}*

---

## 📋 **Audit Overview**

| Metric | Value |
|--------|-------|
| **Audit Date** | {readable_date} |
| **Files Analyzed** | {total_files} (Core Documentation Only) |
| **Documentation Path** | `{metadata['docs_path']}` |
| **Audit Version** | {metadata['audit_version']} |

*Note: This audit focuses on core developer-facing documentation, excluding auto-generated API references and changelog files.*

---

## 🎯 **Overall Health Assessment**

### **LLM-Readiness Score: {overall_score:.2f}/1.00**

| Health Tier | Files | Percentage | Status |
|-------------|-------|------------|--------|
| 🟢 **Excellent** (0.8+) | {health_tiers['excellent']} | {(health_tiers['excellent']/total_files)*100:.1f}% | Ready for AI training |
| 🟡 **Good** (0.6-0.8) | {health_tiers['good']} | {(health_tiers['good']/total_files)*100:.1f}% | Minor improvements needed |
| 🟠 **Fair** (0.4-0.6) | {health_tiers['fair']} | {(health_tiers['fair']/total_files)*100:.1f}% | Significant improvements needed |
| 🔴 **Poor** (0.2-0.4) | {health_tiers['poor']} | {(health_tiers['poor']/total_files)*100:.1f}% | Major restructuring needed |
| ⚫ **Critical** (0.0-0.2) | {health_tiers['critical']} | {(health_tiers['critical']/total_files)*100:.1f}% | Complete rewrite recommended |

---

## 📈 **Key Performance Metrics**

### **Category Breakdown**
| Category | Score | Weight | Impact | Status |
|----------|-------|--------|--------|--------|
| **Context Clarity** | {category_scores['context_clarity']:.2f}/1.00 | 25% | High | {'🟢 Good' if category_scores['context_clarity'] > 0.6 else '🔴 Needs Work'} |
| **Code Completeness** | {category_scores['code_completeness']:.2f}/1.00 | 20% | High | {'🟢 Good' if category_scores['code_completeness'] > 0.6 else '🔴 Needs Work'} |
| **Error Coverage** | {category_scores['error_coverage']:.2f}/1.00 | 15% | Medium | {'🟢 Good' if category_scores['error_coverage'] > 0.6 else '🔴 Needs Work'} |
| **Q&A Format** | {category_scores['qa_format']:.2f}/1.00 | 15% | Medium | {'🟢 Good' if category_scores['qa_format'] > 0.6 else '🔴 Needs Work'} |
| **Progressive Structure** | {category_scores['progressive_structure']:.2f}/1.00 | 10% | Medium | {'🟢 Good' if category_scores['progressive_structure'] > 0.6 else '🔴 Needs Work'} |
| **Searchability** | {category_scores['searchability']:.2f}/1.00 | 10% | Low | {'🟢 Good' if category_scores['searchability'] > 0.6 else '🔴 Needs Work'} |
| **Cross-References** | {category_scores['cross_references']:.2f}/1.00 | 5% | Low | {'🟢 Good' if category_scores['cross_references'] > 0.6 else '🔴 Needs Work'} |

---

## 🚨 **Critical Issues Summary**

### **Quality Issues**
- **🔥 Critical Linting Errors:** {critical_issues['linter_errors']}
- **⚠️ Warnings:** {critical_issues['linter_warnings']}
- **📁 Files with Issues:** {critical_issues['files_with_issues']}/{total_files} ({(critical_issues['files_with_issues']/total_files)*100:.1f}%)

### **Framework Issues**
""")
        
        for issue in critical_issues['framework_issues']:
            f.write(f"- {issue}\n")
        
        f.write(f"""
---

## 📋 **Priority Action Plan**

### **High Priority Files: {len(priority_breakdown['high'])}**
*Immediate attention required - critical errors or AI misinformation*

| File | Health Score | Issues | Impact |
|------|--------------|--------|--------|
""")
        
        # Show top 10 high priority files
        for file_data in priority_breakdown['high'][:10]:
            f.write(f"| `{file_data['relative_path']}` | {file_data['overall_health']:.2f} | {file_data['linter_errors']}E/{file_data['linter_warnings']}W | {'🔥 Critical' if file_data['overall_health'] < 0.2 else '🚨 High'} |\n")
        
        if len(priority_breakdown['high']) > 10:
            f.write(f"| ... | ... | ... | *+{len(priority_breakdown['high'])-10} more files* |\n")
        
        f.write(f"""
### **Medium Priority Files: {len(priority_breakdown['medium'])}**
*Significant improvements needed*

### **Low Priority Files: {len(priority_breakdown['low'])}**
*Minor improvements or maintenance*

---

## 💡 **Top Improvement Opportunities**

*Files with highest potential impact from improvements*

| Rank | File | Current Score | Improvement Potential | Expected ROI |
|------|------|---------------|----------------------|-------------|
""")
        
        for i, file_data in enumerate(improvement_opportunities, 1):
            potential = file_data.get('improvement_potential', 0)
            current = file_data.get('overall_health', 0)
            f.write(f"| {i} | `{file_data['relative_path']}` | {current:.2f} | +{potential:.2f} | {'🚀 High' if potential > 0.5 else '📈 Medium'} |\n")
        
        f.write(f"""
---

## 🎯 **Recommended Actions**

### **Phase 1: Critical Fixes (Week 1-2)**
1. **🔥 Address {critical_issues['linter_errors']} critical linting errors**
   - Fix non-existent API methods and incorrect imports
   - Add missing context headers
   - Complete incomplete code examples

2. **🚨 Focus on {len(priority_breakdown['high'])} high-priority files**
   - Start with files scoring below 0.2
   - Prioritize files with high improvement potential

### **Phase 2: Strategic Improvements (Week 3-4)**
1. **📈 Improve Context Clarity (Current: {category_scores['context_clarity']:.2f})**
   - Add UI Runtime vs Document Sandbox indicators
   - Include proper file path context

2. **🔧 Complete Code Examples (Current: {category_scores['code_completeness']:.2f})**
   - Add missing imports to all JavaScript examples
   - Include proper error handling patterns

### **Phase 3: Long-term Enhancements (Month 2)**
1. **❓ Q&A Format Adoption (Current: {category_scores['qa_format']:.2f})**
   - Convert narrative content to question-answer format
   - Optimize for LLM retrieval patterns

2. **🔗 Cross-Reference Optimization (Current: {category_scores['cross_references']:.2f})**
   - Add links between related documentation sections
   - Improve navigation and discoverability

---

## 📊 **Success Metrics & Targets**

### **3-Month Targets**
| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| **Overall LLM Score** | {overall_score:.2f} | 0.70+ | {max(0, 0.70-overall_score):.2f} |
| **Context Clarity** | {category_scores['context_clarity']:.2f} | 0.80+ | {max(0, 0.80-category_scores['context_clarity']):.2f} |
| **Code Completeness** | {category_scores['code_completeness']:.2f} | 0.75+ | {max(0, 0.75-category_scores['code_completeness']):.2f} |
| **Critical Errors** | {critical_issues['linter_errors']} | 0 | -{critical_issues['linter_errors']} |
| **Files Ready for AI** | {health_tiers['excellent'] + health_tiers['good']} | {int(total_files * 0.8)}+ | -{max(0, int(total_files * 0.8) - (health_tiers['excellent'] + health_tiers['good']))} |

### **Success Indicators**
- ✅ **Short-term:** 50% reduction in critical errors within 2 weeks
- ✅ **Medium-term:** Context clarity score above 0.6 within 1 month  
- ✅ **Long-term:** Overall LLM score above 0.7 within 3 months

---

## 💼 **Business Impact**

### **Current State**
- **Developer Experience:** Developers struggle with context clarity and incomplete examples
- **AI Assistant Accuracy:** Low LLM-readiness affects AI-powered help systems
- **Support Burden:** Poor error documentation increases support tickets

### **Post-Improvement Benefits**
- **🚀 Improved Developer Productivity:** Clear, complete examples reduce development time
- **🤖 Enhanced AI Assistance:** Better LLM training enables more accurate AI responses  
- **💰 Reduced Support Costs:** Comprehensive error documentation reduces support load
- **📈 Faster Developer Onboarding:** Progressive structure and Q&A format improve learning curve

---

*Report generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Audit Framework v{metadata['audit_version']}*
*Focused on core documentation excluding auto-generated API references*
""")
    
    return report_filename

def main():
    parser = argparse.ArgumentParser(description='Generate executive summary report from audit baseline')
    parser.add_argument('--scope', choices=['filtered', 'complete'], default='filtered',
                       help='Generate report from filtered (108 core docs) or complete (204 all files) baseline (default: filtered)')
    
    args = parser.parse_args()
    
    try:
        report_file = generate_executive_summary(args.scope)
        scope_desc = "filtered (core docs only)" if args.scope == "filtered" else "complete (all files)"
        print(f"✅ Executive summary generated: {report_file}")
        print(f"📊 Based on {scope_desc} baseline data")
        print(f"📖 Open the file to view the complete management report")
    except FileNotFoundError as e:
        print(f"❌ Error: {e}")
        scope_hint = "--filtered" if args.scope == "filtered" else ""
        print(f"💡 Make sure you have run: python3 scripts/doc_audit_runner.py --baseline {scope_hint} --full-report")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main() 