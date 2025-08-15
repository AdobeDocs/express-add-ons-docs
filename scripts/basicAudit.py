#!/usr/bin/env python3
"""
Simple LLM Readiness Audit for Adobe Express Add-ons Documentation
Enhanced version with single file and directory support
"""

import os
import re
import pandas as pd
from pathlib import Path
import argparse

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

def audit_markdown(file_path):
    """Audit a single markdown file for LLM readiness"""
    try:
        text = Path(file_path).read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        print(f"⚠️ Error reading {file_path}: {e}")
        return None

    # LLM-readiness criteria with improved detection
    criteria = {
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
    }

    # Weights for different criteria (total = 100)
    weights = {
        "clear_title": 10,
        "has_toc_or_headings": 10,
        "has_code_blocks": 15,
        "uses_bullets_or_steps": 10,
        "includes_examples_or_usage": 15,
        "semantic_structure": 10,
        "faq_or_troubleshooting": 10,
        "has_links": 10,
        "short_paragraphs": 10,
    }

    score = sum(weights[k] for k, passed in criteria.items() if passed)
    max_score = sum(weights.values())
    readiness_percent = round((score / max_score) * 100)

    # Get relative path for cleaner output
    try:
        relative_path = str(Path(file_path).relative_to(Path.cwd()))
    except ValueError:
        relative_path = str(file_path)

    return {
        "file": relative_path,
        "score": score,
        "readiness_percent": readiness_percent,
        **criteria
    }

def generate_summary_report(results, input_type="directory"):
    """Generate a human-readable summary report"""
    if not results:
        return f"No files found to audit in {input_type}."
    
    df = pd.DataFrame(results)
    
    total_files = len(df)
    avg_score = df['readiness_percent'].mean()
    
    # Score distribution
    excellent = len(df[df['readiness_percent'] >= 80])
    good = len(df[(df['readiness_percent'] >= 60) & (df['readiness_percent'] < 80)])
    fair = len(df[(df['readiness_percent'] >= 40) & (df['readiness_percent'] < 60)])
    poor = len(df[df['readiness_percent'] < 40])
    
    # Adjust header based on input type
    if input_type == "single_file":
        header = "📄 SINGLE FILE LLM READINESS AUDIT"
        files_text = f"📁 File Analyzed: {total_files}"
    else:
        header = "📊 LLM READINESS AUDIT SUMMARY"
        files_text = f"📁 Total Files Analyzed: {total_files}"
    
    summary = f"""
{header}
===============================
{files_text}
📈 Average Readiness Score: {avg_score:.1f}%

📊 Score Distribution:
   🟢 Excellent (80-100%): {excellent} files ({excellent/total_files*100:.1f}%)
   🟡 Good (60-79%):       {good} files ({good/total_files*100:.1f}%)
   🟠 Fair (40-59%):       {fair} files ({fair/total_files*100:.1f}%)
   🔴 Poor (<40%):         {poor} files ({poor/total_files*100:.1f}%)
"""
    
    if input_type == "single_file":
        # For single file, show detailed breakdown
        file_result = df.iloc[0]
        summary += f"""
📋 DETAILED BREAKDOWN:
   📝 Clear Title: {'✅' if file_result['clear_title'] else '❌'}
   📚 Headings/TOC: {'✅' if file_result['has_toc_or_headings'] else '❌'}
   💻 Code Blocks: {'✅' if file_result['has_code_blocks'] else '❌'}
   📋 Lists/Steps: {'✅' if file_result['uses_bullets_or_steps'] else '❌'}
   📖 Examples/Usage: {'✅' if file_result['includes_examples_or_usage'] else '❌'}
   🏗️ Structure: {'✅' if file_result['semantic_structure'] else '❌'}
   ❓ FAQ/Troubleshooting: {'✅' if file_result['faq_or_troubleshooting'] else '❌'}
   🔗 Links: {'✅' if file_result['has_links'] else '❌'}
   📝 Short Paragraphs: {'✅' if file_result['short_paragraphs'] else '❌'}
"""
    else:
        # For multiple files, show top and bottom performers
        summary += f"""
🏆 Top Performing Files:
"""
        # Add top 5 files
        top_files = df.nlargest(min(5, len(df)), 'readiness_percent')
        for _, row in top_files.iterrows():
            filename = Path(row['file']).name
            summary += f"   {row['readiness_percent']:3d}% - {filename}\n"
        
        if len(df) > 1:
            summary += f"\n⚠️ Needs Improvement:"
            if len(df) <= 5:
                # Show all files if 5 or fewer
                bottom_files = df.nsmallest(len(df), 'readiness_percent')
            else:
                # Show bottom 5 if more than 5 files
                summary += f" (Bottom 5):\n"
                bottom_files = df.nsmallest(5, 'readiness_percent')
            
            for _, row in bottom_files.iterrows():
                filename = Path(row['file']).name
                summary += f"   {row['readiness_percent']:3d}% - {filename}\n"
    
    return summary

def main():
    """Main audit function"""
    parser = argparse.ArgumentParser(description='Simple LLM Readiness Audit - Enhanced for Files and Directories')
    parser.add_argument('--docs-path', help='Path to documentation directory or single .md file')
    parser.add_argument('--output', default='reports/basic_audit_report', help='Output filename (without extension) (default: reports/basic_audit_report)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed progress')
    
    args = parser.parse_args()
    
    # Determine input path
    if args.docs_path:
        input_path = Path(args.docs_path)
        if not input_path.exists():
            print(f"❌ Path not found: {args.docs_path}")
            return
    else:
        try:
            input_path = Path(get_docs_directory())
        except FileNotFoundError as e:
            print(f"❌ {e}")
            return
    
    # Determine if we're processing a single file or directory
    if input_path.is_file():
        if input_path.suffix != '.md':
            print(f"❌ File must be a markdown (.md) file: {input_path}")
            return
        
        print(f"📄 Analyzing single file: {input_path}")
        input_type = "single_file"
        files_to_process = [input_path]
        
        # Adjust output filename for single file
        if args.output == 'reports/basic_audit_report':  # Default filename
            args.output = f"reports/basic_audit_{input_path.stem}"
            
    elif input_path.is_dir():
        print(f"📂 Scanning documentation directory: {input_path}")
        input_type = "directory"
        
        # Scan all markdown files
        files_to_process = []
        for root, _, files in os.walk(input_path):
            for fname in files:
                if fname.endswith(".md"):
                    files_to_process.append(Path(root) / fname)
        
        if not files_to_process:
            print("❌ No markdown files found in directory.")
            return
            
        print(f"📄 Found {len(files_to_process)} markdown files")
    else:
        print(f"❌ Path must be a directory or .md file: {input_path}")
        return
    
    # Process files
    results = []
    file_count = 0
    
    for file_path in files_to_process:
        file_count += 1
        
        if args.verbose:
            print(f"   Analyzing: {file_path.name}")
        
        result = audit_markdown(str(file_path))
        if result:
            results.append(result)
    
    if not results:
        print("❌ No markdown files could be processed.")
        return
    
    print(f"✅ Analyzed {len(results)} markdown file{'s' if len(results) != 1 else ''}")
    
    # Save results
    df = pd.DataFrame(results)
    df.sort_values("readiness_percent", ascending=False, inplace=True)
    
    # Save as CSV (in reports/raw/)
    csv_file = f"{args.output}.csv".replace('reports/', 'reports/raw/')
    # Ensure output directory exists
    Path(csv_file).parent.mkdir(parents=True, exist_ok=True)
    
    df.to_csv(csv_file, index=False)
    print(f"📊 Detailed results saved to: {csv_file}")
    
    # Save summary report (in reports/)
    summary = generate_summary_report(results, input_type)
    summary_file = f"{args.output}_summary.txt"
    # Ensure reports directory exists for TXT files
    Path(summary_file).parent.mkdir(parents=True, exist_ok=True)
    
    with open(summary_file, 'w') as f:
        f.write(summary)
    print(f"📋 Summary report saved to: {summary_file}")
    
    # Print summary to console
    print(summary)

if __name__ == "__main__":
    main()