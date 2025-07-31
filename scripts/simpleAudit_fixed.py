#!/usr/bin/env python3
"""
Simple LLM Readiness Audit for Adobe Express Add-ons Documentation
Fixed version with better path handling, security, and output formatting
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

def generate_summary_report(results):
    """Generate a human-readable summary report"""
    if not results:
        return "No files found to audit."
    
    df = pd.DataFrame(results)
    
    total_files = len(df)
    avg_score = df['readiness_percent'].mean()
    
    # Score distribution
    excellent = len(df[df['readiness_percent'] >= 80])
    good = len(df[(df['readiness_percent'] >= 60) & (df['readiness_percent'] < 80)])
    fair = len(df[(df['readiness_percent'] >= 40) & (df['readiness_percent'] < 60)])
    poor = len(df[df['readiness_percent'] < 40])
    
    summary = f"""
📊 LLM READINESS AUDIT SUMMARY
===============================
📁 Total Files Analyzed: {total_files}
📈 Average Readiness Score: {avg_score:.1f}%

📊 Score Distribution:
   🟢 Excellent (80-100%): {excellent} files ({excellent/total_files*100:.1f}%)
   🟡 Good (60-79%):       {good} files ({good/total_files*100:.1f}%)
   🟠 Fair (40-59%):       {fair} files ({fair/total_files*100:.1f}%)
   🔴 Poor (<40%):         {poor} files ({poor/total_files*100:.1f}%)

🏆 Top Performing Files:
"""
    
    # Add top 5 files
    top_files = df.nlargest(5, 'readiness_percent')
    for _, row in top_files.iterrows():
        filename = Path(row['file']).name
        summary += f"   {row['readiness_percent']:3d}% - {filename}\n"
    
    summary += f"\n⚠️ Needs Improvement (Bottom 5):\n"
    
    # Add bottom 5 files
    bottom_files = df.nsmallest(5, 'readiness_percent')
    for _, row in bottom_files.iterrows():
        filename = Path(row['file']).name
        summary += f"   {row['readiness_percent']:3d}% - {filename}\n"
    
    return summary

def main():
    """Main audit function"""
    parser = argparse.ArgumentParser(description='Simple LLM Readiness Audit')
    parser.add_argument('--docs-path', help='Path to documentation directory')
    parser.add_argument('--output', default='llm_audit_report', help='Output filename (without extension)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed progress')
    
    args = parser.parse_args()
    
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
                
                result = audit_markdown(full_path)
                if result:
                    results.append(result)
    
    if not results:
        print("❌ No markdown files found to audit.")
        return
    
    print(f"✅ Analyzed {len(results)} markdown files")
    
    # Save results
    df = pd.DataFrame(results)
    df.sort_values("readiness_percent", ascending=False, inplace=True)
    
    # Save as CSV
    csv_file = f"{args.output}.csv"
    df.to_csv(csv_file, index=False)
    print(f"📊 Detailed results saved to: {csv_file}")
    
    # Save summary report
    summary = generate_summary_report(results)
    summary_file = f"{args.output}_summary.txt"
    with open(summary_file, 'w') as f:
        f.write(summary)
    print(f"📋 Summary report saved to: {summary_file}")
    
    # Print summary to console
    print(summary)

if __name__ == "__main__":
    main() 