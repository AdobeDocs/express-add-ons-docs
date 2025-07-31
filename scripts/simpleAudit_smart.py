#!/usr/bin/env python3
"""
Smart LLM Readiness Audit for Adobe Express Add-ons Documentation
Uses content classification to apply rules contextually and avoid irrelevant penalties
"""

import os
import re
import pandas as pd
from pathlib import Path
import argparse
from content_classifier import ContentClassifier, ContentType, CodeIntensity

def get_docs_directory():
    """Get the docs directory relative to where the script is run from"""
    script_dir = Path(__file__).parent
    
    # Try different relative paths
    possible_paths = [
        script_dir.parent / "src" / "pages",  # When run from scripts/
        Path.cwd() / "src" / "pages",         # When run from project root
        script_dir / ".." / "src" / "pages"   # Alternative relative path
    ]
    
    for path in possible_paths:
        if path.exists():
            return str(path)
    
    # Fallback - ask user to specify
    print("❌ Could not find src/pages directory.")
    print("📁 Possible locations:")
    for path in possible_paths:
        print(f"   {path} (exists: {path.exists()})")
    
    docs_path = input("Please enter the path to your documentation folder: ")
    if not Path(docs_path).exists():
        raise FileNotFoundError(f"Documentation directory not found: {docs_path}")
    
    return docs_path

def smart_audit_markdown(file_path, classifier):
    """Smart audit that applies rules based on content classification"""
    try:
        text = Path(file_path).read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        print(f"⚠️ Error reading {file_path}: {e}")
        return None

    # Classify the content first
    classification = classifier.classify_file(file_path, text)
    
    # Define all possible criteria
    all_criteria = {
        "clear_title": bool(re.search(r"^# .+", text, re.MULTILINE)),
        "has_toc_or_headings": bool(re.findall(r"^## .+", text, re.MULTILINE)),
        "has_code_blocks": bool(re.findall(r"```[\s\S]+?```", text)),
        "uses_bullets_or_steps": (
            bool(re.findall(r"^\s*[-*+]\s+", text, re.MULTILINE)) or 
            bool(re.findall(r"^\s*\d+\.\s+", text, re.MULTILINE))
        ),
        "includes_examples_or_usage": (
            "example" in text.lower() or 
            "usage" in text.lower() or
            "how to" in text.lower()
        ),
        "semantic_structure": bool(re.findall(r"^#{2,3} .+", text, re.MULTILINE)),
        "faq_or_troubleshooting": (
            "faq" in text.lower() or 
            "troubleshooting" in text.lower() or
            "frequently asked questions" in text.lower()
        ),
        "has_links": bool(re.findall(r"\[.+?\]\(.+?\)", text)),
        "short_paragraphs": all(
            len(p.split()) <= 80 
            for p in text.split("\n\n") 
            if len(p.split()) > 0
        ),
        # Additional code-specific criteria
        "complete_code_examples": _check_complete_code_examples(text),
        "context_headers": _check_context_headers(text),
        "error_sections": _check_error_sections(text),
    }

    # Map criteria to rule categories for smart application
    criteria_rule_mapping = {
        # Always apply these (core structure)
        "clear_title": "structure",
        "has_toc_or_headings": "structure", 
        "semantic_structure": "structure",
        "has_links": "structure",
        "short_paragraphs": "structure",
        
        # Code-specific (only for tutorial/heavy code content)
        "has_code_blocks": "code",
        "complete_code_examples": "code",
        "context_headers": "code",
        
        # Content-specific
        "includes_examples_or_usage": "content",
        "uses_bullets_or_steps": "content",
        "faq_or_troubleshooting": "qa",
        "error_sections": "error",
    }

    # Define base weights for each category
    base_weights = {
        "structure": 10,     # Always important
        "content": 15,       # Always important  
        "code": 20,          # Only when applicable
        "qa": 10,           # Context-dependent
        "error": 10,        # Context-dependent
    }

    # Smart weight adjustment based on classification
    adjusted_criteria = {}
    adjusted_weights = {}
    total_possible_weight = 0
    
    for criterion, passed in all_criteria.items():
        rule_category = criteria_rule_mapping.get(criterion, "structure")
        
        # Determine if this criterion should be applied
        should_apply = True
        weight_multiplier = 1.0
        
        if rule_category == "code":
            # Only apply code rules to code-heavy content
            if classification.code_intensity in [CodeIntensity.NONE, CodeIntensity.MINIMAL]:
                should_apply = False
            elif classification.content_type == ContentType.CONCEPTUAL:
                should_apply = False
                
        elif rule_category == "qa":
            # Lower weight for Q&A in reference docs
            if classification.content_type == ContentType.REFERENCE:
                weight_multiplier = 0.5
                
        elif rule_category == "error":
            # Only apply error rules to tutorials and troubleshooting
            if classification.content_type not in [ContentType.TUTORIAL, ContentType.TROUBLESHOOTING]:
                should_apply = False
        
        if should_apply:
            adjusted_criteria[criterion] = passed
            adjusted_weights[criterion] = int(base_weights[rule_category] * weight_multiplier)
            total_possible_weight += adjusted_weights[criterion]

    # Calculate smart score
    actual_score = sum(adjusted_weights[k] for k, passed in adjusted_criteria.items() if passed)
    max_possible_score = total_possible_weight or 100  # Fallback to prevent division by zero
    smart_readiness_percent = round((actual_score / max_possible_score) * 100)

    # Get relative path for cleaner output
    try:
        relative_path = str(Path(file_path).relative_to(Path.cwd()))
    except ValueError:
        relative_path = str(file_path)

    return {
        "file": relative_path,
        "content_type": classification.content_type.value,
        "code_intensity": classification.code_intensity.value,
        "smart_score": actual_score,
        "smart_readiness_percent": smart_readiness_percent,
        "max_possible_score": max_possible_score,
        "criteria_applied": len(adjusted_criteria),
        "criteria_excluded": len(all_criteria) - len(adjusted_criteria),
        **adjusted_criteria
    }

def _check_complete_code_examples(text):
    """Check if code examples are complete with imports"""
    code_blocks = re.findall(r"```(?:javascript|js|typescript|ts)\n(.*?)```", text, re.DOTALL | re.IGNORECASE)
    if not code_blocks:
        return True  # No code blocks = N/A, consider passed
    
    # Check if most code blocks have imports or are simple
    complete_blocks = 0
    for block in code_blocks:
        if any(keyword in block for keyword in ['import', 'require', 'const', 'let', 'function']):
            complete_blocks += 1
        elif len(block.strip().split('\n')) <= 3:  # Simple examples are OK
            complete_blocks += 1
    
    return complete_blocks >= len(code_blocks) * 0.7  # 70% threshold

def _check_context_headers(text):
    """Check if code blocks have context headers"""
    code_blocks = re.findall(r"(^#{1,4}.*?```.*?```)", text, re.DOTALL | re.MULTILINE)
    if not code_blocks:
        return True  # No code blocks = N/A
    
    context_indicators = ['runtime', 'sandbox', 'ui', 'document', 'code.js', 'index.js']
    blocks_with_context = sum(1 for block in code_blocks 
                             if any(indicator in block.lower() for indicator in context_indicators))
    
    return blocks_with_context >= len(code_blocks) * 0.5  # 50% threshold

def _check_error_sections(text):
    """Check if document has error/troubleshooting sections"""
    error_indicators = ['error', 'troubleshoot', 'problem', 'issue', 'fix', 'solution', 'common mistakes']
    return any(indicator in text.lower() for indicator in error_indicators)

def generate_smart_summary_report(results):
    """Generate a summary report showing smart classification insights"""
    if not results:
        return "No files found to audit."
    
    df = pd.DataFrame(results)
    
    total_files = len(df)
    avg_score = df['smart_readiness_percent'].mean()
    
    # Score distribution
    excellent = len(df[df['smart_readiness_percent'] >= 80])
    good = len(df[(df['smart_readiness_percent'] >= 60) & (df['smart_readiness_percent'] < 80)])
    fair = len(df[(df['smart_readiness_percent'] >= 40) & (df['smart_readiness_percent'] < 60)])
    poor = len(df[df['smart_readiness_percent'] < 40])
    
    # Content type distribution
    content_type_dist = df['content_type'].value_counts()
    code_intensity_dist = df['code_intensity'].value_counts()
    
    # Smart insights
    avg_criteria_applied = df['criteria_applied'].mean()
    avg_criteria_excluded = df['criteria_excluded'].mean()
    
    summary = f"""
🧠 SMART LLM READINESS AUDIT SUMMARY
===================================
📁 Total Files Analyzed: {total_files}
📈 Average Smart Score: {avg_score:.1f}%
🎯 Avg Criteria Applied: {avg_criteria_applied:.1f}/{avg_criteria_applied + avg_criteria_excluded:.1f} per file

📊 Score Distribution:
   🟢 Excellent (80-100%): {excellent} files ({excellent/total_files*100:.1f}%)
   🟡 Good (60-79%):       {good} files ({good/total_files*100:.1f}%)
   🟠 Fair (40-59%):       {fair} files ({fair/total_files*100:.1f}%)
   🔴 Poor (<40%):         {poor} files ({poor/total_files*100:.1f}%)

📚 Content Classification:
   📖 Conceptual:     {content_type_dist.get('conceptual', 0)} files
   🎓 Tutorial:       {content_type_dist.get('tutorial', 0)} files  
   📋 Reference:      {content_type_dist.get('reference', 0)} files
   🔧 Setup:          {content_type_dist.get('setup', 0)} files
   ❓ Troubleshooting: {content_type_dist.get('troubleshooting', 0)} files
   💡 Samples:        {content_type_dist.get('samples', 0)} files

💻 Code Intensity:
   🚫 None:     {code_intensity_dist.get('none', 0)} files (no code rules applied)
   📝 Minimal:  {code_intensity_dist.get('minimal', 0)} files (light code rules)
   ⚖️ Moderate: {code_intensity_dist.get('moderate', 0)} files (balanced rules)
   🔥 Heavy:    {code_intensity_dist.get('heavy', 0)} files (full code rules)

🏆 Top Performing Files (by content type):
"""
    
    # Show top performers by content type
    for content_type in ['conceptual', 'tutorial', 'reference', 'setup']:
        type_files = df[df['content_type'] == content_type]
        if len(type_files) > 0:
            top_file = type_files.loc[type_files['smart_readiness_percent'].idxmax()]
            filename = Path(top_file['file']).name
            summary += f"   📖 {content_type.title()}: {top_file['smart_readiness_percent']:3.0f}% - {filename}\n"
    
    summary += f"\n⚠️ Needs Improvement (Bottom 5 overall):\n"
    
    # Add bottom 5 files
    bottom_files = df.nsmallest(5, 'smart_readiness_percent')
    for _, row in bottom_files.iterrows():
        filename = Path(row['file']).name
        summary += f"   {row['smart_readiness_percent']:3.0f}% - {filename} ({row['content_type']}, {row['code_intensity']} code)\n"
    
    summary += f"""

💡 Smart Auditing Benefits:
   ✅ Conceptual docs not penalized for missing code
   ✅ Reference docs get lighter Q&A requirements  
   ✅ Setup docs focus on structure over code quality
   ✅ Only {avg_criteria_excluded:.1f} criteria excluded per file on average
"""
    
    return summary

def main():
    """Main smart audit function"""
    parser = argparse.ArgumentParser(description='Smart LLM Readiness Audit with Content Classification')
    parser.add_argument('--docs-path', help='Path to documentation directory')
    parser.add_argument('--output', default='smart_audit_report', help='Output filename (without extension)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed progress')
    parser.add_argument('--show-classification', action='store_true', help='Show content classification details')
    
    args = parser.parse_args()
    
    # Initialize content classifier
    classifier = ContentClassifier()
    
    # Get documentation directory
    if args.docs_path:
        docs_dir = args.docs_path
        if not Path(docs_dir).exists():
            print(f"❌ Documentation directory not found: {docs_dir}")
            return
    else:
        try:
            docs_dir = get_docs_directory()
        except FileNotFoundError as e:
            print(f"❌ {e}")
            return
    
    print(f"📂 Scanning documentation in: {docs_dir}")
    print(f"🧠 Using smart content classification")
    
    # Scan all markdown files
    results = []
    file_count = 0
    
    for root, _, files in os.walk(docs_dir):
        for fname in files:
            if fname.endswith(".md"):
                full_path = os.path.join(root, fname)
                file_count += 1
                
                if args.verbose:
                    print(f"   Analyzing: {fname}")
                
                result = smart_audit_markdown(full_path, classifier)
                if result:
                    results.append(result)
                    
                    if args.show_classification:
                        print(f"     📂 Type: {result['content_type']}, Code: {result['code_intensity']}")
                        print(f"     🎯 Applied {result['criteria_applied']}/{result['criteria_applied'] + result['criteria_excluded']} criteria")
    
    if not results:
        print("❌ No markdown files found to audit.")
        return
    
    print(f"✅ Analyzed {len(results)} markdown files with smart classification")
    
    # Save results
    df = pd.DataFrame(results)
    df.sort_values("smart_readiness_percent", ascending=False, inplace=True)
    
    # Save as CSV
    csv_file = f"{args.output}.csv"
    df.to_csv(csv_file, index=False)
    print(f"📊 Detailed results saved to: {csv_file}")
    
    # Save summary report
    summary = generate_smart_summary_report(results)
    summary_file = f"{args.output}_summary.txt"
    with open(summary_file, 'w') as f:
        f.write(summary)
    print(f"📋 Smart summary report saved to: {summary_file}")
    
    # Print summary to console
    print(summary)

if __name__ == "__main__":
    main() 