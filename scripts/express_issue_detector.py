#!/usr/bin/env python3
"""
Adobe Express Add-ons Documentation Issue Detector
Specialized tool to identify specific issues mentioned in LLM Readiness Plans (2).md

This script focuses on the key problems identified:
1. Context term confusion (multiple meanings of "context")
2. API boundary violations (mixing iframe and sandbox APIs)  
3. Variable naming inconsistencies (addOnUISdk vs addOnSdk vs sdk)
4. Long tutorial sections that aren't chunkable
5. Missing capability matrices
6. Inconsistent code examples
7. Missing context annotations
"""

import os
import re
import json
import argparse
from pathlib import Path
from collections import defaultdict, Counter
from typing import Dict, List, Any, Tuple


class ExpressIssueDetector:
    def __init__(self):
        """Initialize the Adobe Express specific issue detector."""
        self.issues = defaultdict(list)
        self.stats = defaultdict(int)
        
        # Define patterns for different types of issues
        self.context_patterns = {
            'iframe_context': [
                r'iframe context',
                r'addOnUISDK\.app\.document',
                r'UI.*context',
                r'iframe.*side'
            ],
            'sandbox_context': [
                r'document sandbox.*context',
                r'sandbox.*context', 
                r'editor\.context',
                r'express-document-sdk.*context'
            ],
            'generic_context': [
                r'\bcontext\b(?!\s*\()',  # "context" not followed by parentheses
            ],
            'ambiguous_context': [
                r'getting the context',
                r'current context',
                r'the context',
                r'in.*context'
            ]
        }
        
        self.api_patterns = {
            'iframe_apis': [
                r'addOnUISdk',
                r'\.createRenditions\(',
                r'\.addImage\(',
                r'\.exportRendition\(',
                r'app\.document\.',
                r'app\.ui\.',
                r'app\.oauth\.',
                r'\.showModalDialog\('
            ],
            'sandbox_apis': [
                r'express-document-sdk',
                r'editor\.',
                r'\.createRectangle\(',
                r'\.createEllipse\(',
                r'\.createText\(',
                r'\.createPath\(',
                r'\.allArtboards',
                r'\.insertionParent',
                r'\.selection'
            ]
        }
        
        self.variable_variations = [
            r'\baddOnUISdk\b',
            r'\baddOnSdk\b', 
            r'\bsdk\b(?!\.)',  # sdk not followed by dot
            r'\bexpress\b(?!\-)',  # express not followed by dash
            r'\buiSdk\b',
        ]

    def detect_context_confusion(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect ambiguous or confusing use of 'context' term."""
        issues = []
        lines = content.split('\n')
        
        iframe_matches = []
        sandbox_matches = []
        generic_matches = []
        
        for line_num, line in enumerate(lines, 1):
            # Check for iframe context references
            for pattern in self.context_patterns['iframe_context']:
                if re.search(pattern, line, re.IGNORECASE):
                    iframe_matches.append(line_num)
            
            # Check for sandbox context references  
            for pattern in self.context_patterns['sandbox_context']:
                if re.search(pattern, line, re.IGNORECASE):
                    sandbox_matches.append(line_num)
            
            # Check for generic/ambiguous context usage
            for pattern in self.context_patterns['generic_context']:
                if re.search(pattern, line, re.IGNORECASE):
                    generic_matches.append(line_num)
        
        # Flag files that mix iframe and sandbox context terms
        if iframe_matches and sandbox_matches:
            issues.append({
                'type': 'context_confusion',
                'severity': 'high',
                'description': 'File mixes iframe and sandbox context terminology',
                'iframe_lines': iframe_matches[:3],  # First 3 occurrences
                'sandbox_lines': sandbox_matches[:3],
                'file_path': file_path
            })
        
        # Flag files with excessive generic context usage
        if len(generic_matches) > 5:
            issues.append({
                'type': 'ambiguous_context',
                'severity': 'medium', 
                'description': f'File has {len(generic_matches)} ambiguous "context" references',
                'lines': generic_matches[:5],  # First 5 occurrences
                'file_path': file_path
            })
            
        return issues

    def detect_api_boundary_violations(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect mixing of iframe and sandbox APIs in same context."""
        issues = []
        lines = content.split('\n')
        
        iframe_api_lines = []
        sandbox_api_lines = []
        
        for line_num, line in enumerate(lines, 1):
            # Check for iframe APIs
            for pattern in self.api_patterns['iframe_apis']:
                if re.search(pattern, line):
                    iframe_api_lines.append((line_num, line.strip()))
            
            # Check for sandbox APIs
            for pattern in self.api_patterns['sandbox_apis']:
                if re.search(pattern, line):
                    sandbox_api_lines.append((line_num, line.strip()))
        
        # Flag files that mix iframe and sandbox APIs
        if iframe_api_lines and sandbox_api_lines:
            issues.append({
                'type': 'api_boundary_violation',
                'severity': 'high',
                'description': 'File mixes iframe and sandbox APIs inappropriately',
                'iframe_apis': iframe_api_lines[:3],
                'sandbox_apis': sandbox_api_lines[:3],
                'file_path': file_path
            })
            
        return issues

    def detect_variable_naming_inconsistencies(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect inconsistent variable naming patterns in actual code blocks only."""
        issues = []
        
        # Extract only JavaScript/TypeScript code blocks
        code_blocks = re.findall(r'```(?:js|javascript|typescript|ts)?\n(.*?)\n```', content, re.DOTALL | re.IGNORECASE)
        
        if not code_blocks:
            return issues  # No code blocks to check
        
        variations_found = {}
        
        # Check each code block for variable usage (not just any text)
        for code_block in code_blocks:
            # Look for actual variable usage patterns (assignments, declarations, property access)
            variable_patterns = {
                r'\baddOnUISdk\b': [
                    r'(?:const|let|var)\s+\w*\s*=\s*addOnUISdk',  # const sdk = addOnUISdk
                    r'addOnUISdk\.',  # addOnUISdk.ready
                    r'import.*addOnUISdk'  # import addOnUISdk
                ],
                r'\baddOnSdk\b': [
                    r'(?:const|let|var)\s+\w*\s*=\s*addOnSdk',
                    r'addOnSdk\.',
                    r'import.*addOnSdk'
                ],
                r'\bsdk\b(?!\.)': [
                    r'(?:const|let|var)\s+sdk\s*=',  # const sdk =
                    r'sdk\.',  # sdk.method()
                    r'import.*\bsdk\b'  # import { sdk }
                ],
                r'\buiSdk\b': [
                    r'(?:const|let|var)\s+uiSdk\s*=',
                    r'uiSdk\.',
                    r'import.*uiSdk'
                ]
            }
            
            for pattern_name, usage_patterns in variable_patterns.items():
                # Check if this variable is actually used in code (not just mentioned)
                for usage_pattern in usage_patterns:
                    if re.search(usage_pattern, code_block, re.IGNORECASE):
                        if pattern_name not in variations_found:
                            variations_found[pattern_name] = 0
                        variations_found[pattern_name] += 1
                        break  # Found usage, no need to check other patterns for this variable
        
        # Flag if more than 2 different variable naming patterns are used in actual code
        if len(variations_found) > 2:
            issues.append({
                'type': 'variable_naming_inconsistency',
                'severity': 'medium',
                'description': f'File uses {len(variations_found)} different SDK variable names',
                'variations': list(variations_found.keys()),
                'file_path': file_path
            })
            
        return issues

    def detect_missing_capability_matrices(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect missing capability/compatibility matrices."""
        issues = []
        
        # Look for patterns that suggest a capability matrix should be present
        capability_indicators = [
            r'supported.*features?',
            r'compatibility',
            r'browser.*support',
            r'platform.*support',
            r'API.*availability',
            r'feature.*matrix',
            r'what.*supported',
            r'supported.*versions?'
        ]
        
        matrix_patterns = [
            r'\|.*\|.*\|',  # Table syntax
            r'✓|✗|❌|✅',    # Check/cross marks
            r'supported.*not.*supported',
            r'<table',
            r'capability.*matrix'
        ]
        
        has_capability_indicators = False
        has_matrix = False
        
        for pattern in capability_indicators:
            if re.search(pattern, content, re.IGNORECASE):
                has_capability_indicators = True
                break
        
        for pattern in matrix_patterns:
            if re.search(pattern, content, re.IGNORECASE):
                has_matrix = True
                break
        
        # Flag if indicators suggest need for matrix but none found
        if has_capability_indicators and not has_matrix:
            issues.append({
                'type': 'missing_capability_matrix',
                'severity': 'high',
                'description': 'File discusses capabilities/support but lacks clear matrix/table',
                'file_path': file_path
            })
        
        # Also flag API reference files that should have capability info
        if ('api' in file_path.lower() or 'reference' in file_path.lower()) and not has_matrix:
            if len(content) > 1000:  # Only for substantial API docs
                issues.append({
                    'type': 'missing_capability_matrix', 
                    'severity': 'medium',
                    'description': 'API reference lacks capability/compatibility information',
                    'file_path': file_path
                })
                
        return issues

    def detect_long_unchunkable_sections(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect long tutorial sections that can't be easily chunked."""
        issues = []
        
        # Split by headings to find sections
        sections = re.split(r'\n#{1,6}\s+', content)
        
        for i, section in enumerate(sections):
            section_length = len(section.strip())
            
            # Check for very long sections (>3000 chars) with no sub-headings
            if section_length > 3000:
                # Count sub-structure elements
                sub_headings = len(re.findall(r'\n#{2,6}\s+', section))
                list_items = len(re.findall(r'\n\s*[-*+]\s+', section))
                numbered_steps = len(re.findall(r'\n\s*\d+\.\s+', section))
                
                # Flag if long but lacks structure
                if sub_headings < 2 and list_items < 3 and numbered_steps < 3:
                    issues.append({
                        'type': 'long_unchunkable_section',
                        'severity': 'medium',
                        'description': f'Section {i+1} is {section_length} chars but lacks structure for chunking',
                        'section_length': section_length,
                        'file_path': file_path
                    })
                    
        return issues

    def detect_inconsistent_code_examples(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect inconsistent code example patterns."""
        issues = []
        
        # Find all code blocks
        code_blocks = re.findall(r'```(\w+)?\n(.*?)\n```', content, re.DOTALL)
        
        if len(code_blocks) < 2:
            return issues  # Need at least 2 blocks to compare
        
        js_blocks = [block for lang, block in code_blocks if lang in ['js', 'javascript', 'typescript', 'ts', '']]
        
        if len(js_blocks) < 2:
            return issues
            
        # Check for inconsistent variable naming in examples
        sdk_patterns = {}
        for block in js_blocks:
            for pattern in self.variable_variations:
                matches = re.findall(pattern, block)
                if matches:
                    if pattern not in sdk_patterns:
                        sdk_patterns[pattern] = 0
                    sdk_patterns[pattern] += len(matches)
        
        # Flag if examples use different naming patterns
        if len(sdk_patterns) > 1:
            issues.append({
                'type': 'inconsistent_code_examples',
                'severity': 'medium',
                'description': f'Code examples use {len(sdk_patterns)} different variable naming patterns',
                'patterns_found': list(sdk_patterns.keys()),
                'file_path': file_path
            })
            
        return issues

    def detect_missing_context_annotations(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Detect missing context annotations in code examples."""
        issues = []
        
        # Find code blocks
        code_blocks = re.findall(r'```(\w+)?\n(.*?)\n```', content, re.DOTALL)
        
        missing_context_blocks = 0
        
        for lang, block in code_blocks:
            if lang in ['js', 'javascript', 'typescript', 'ts', '']:
                # Check if block has context annotations
                has_context_comment = bool(re.search(r'//.*(?:iframe|sandbox|UI|document)', block, re.IGNORECASE))
                has_import_context = bool(re.search(r'from.*(?:addonsdk|express-document-sdk)', block))
                
                # Check if it uses APIs that need context clarification
                uses_context_sensitive_apis = bool(re.search(r'(?:addOnUISdk|editor\.|app\.document)', block))
                
                if uses_context_sensitive_apis and not (has_context_comment or has_import_context):
                    missing_context_blocks += 1
        
        if missing_context_blocks > 0:
            issues.append({
                'type': 'missing_context_annotations',
                'severity': 'medium',
                'description': f'{missing_context_blocks} code blocks lack context annotations',
                'missing_blocks': missing_context_blocks,
                'file_path': file_path
            })
            
        return issues

    def analyze_file(self, file_path: str) -> Dict[str, Any]:
        """Analyze a single file for all Express-specific issues."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return {
                'file_path': file_path,
                'error': str(e),
                'issues': [],
                'score': 0
            }
        
        # Run all detections
        all_issues = []
        all_issues.extend(self.detect_context_confusion(content, file_path))
        all_issues.extend(self.detect_api_boundary_violations(content, file_path))
        all_issues.extend(self.detect_variable_naming_inconsistencies(content, file_path))
        all_issues.extend(self.detect_missing_capability_matrices(content, file_path))
        all_issues.extend(self.detect_long_unchunkable_sections(content, file_path))
        all_issues.extend(self.detect_inconsistent_code_examples(content, file_path))
        all_issues.extend(self.detect_missing_context_annotations(content, file_path))
        
        # Calculate score (100 - penalty for issues)
        score = 100
        for issue in all_issues:
            if issue['severity'] == 'high':
                score -= 15
            elif issue['severity'] == 'medium':
                score -= 8
            else:
                score -= 3
        
        score = max(0, score)  # Don't go below 0
        
        return {
            'file_path': file_path,
            'issues': all_issues,
            'score': score,
            'issue_count': len(all_issues)
        }

    def analyze_directory(self, directory_path: str) -> Dict[str, Any]:
        """Analyze all markdown files in a directory."""
        results = []
        
        # Find all markdown files
        markdown_files = []
        for root, dirs, files in os.walk(directory_path):
            for file in files:
                if file.endswith('.md'):
                    markdown_files.append(os.path.join(root, file))
        
        print(f"Found {len(markdown_files)} Markdown files to analyze...")
        
        for file_path in markdown_files:
            result = self.analyze_file(file_path)
            results.append(result)
            
            # Print progress
            if result.get('issue_count', 0) > 0:
                print(f"  {os.path.basename(file_path)}: {result['issue_count']} issues (score: {result['score']:.1f})")
        
        # Calculate summary statistics
        total_files = len(results)
        total_issues = sum(r.get('issue_count', 0) for r in results)
        avg_score = sum(r.get('score', 0) for r in results) / total_files if total_files > 0 else 0
        
        # Group issues by type
        issue_type_counts = defaultdict(int)
        for result in results:
            for issue in result.get('issues', []):
                issue_type_counts[issue['type']] += 1
        
        return {
            'summary': {
                'total_files': total_files,
                'total_issues': total_issues,
                'average_score': avg_score,
                'issues_by_type': dict(issue_type_counts)
            },
            'file_results': results
        }


def main():
    parser = argparse.ArgumentParser(description='Detect Adobe Express Add-ons documentation issues')
    parser.add_argument('path', help='Path to file or directory to analyze')
    parser.add_argument('--output', '-o', help='Output JSON file path')
    parser.add_argument('--detailed', action='store_true', help='Show detailed issue descriptions')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    detector = ExpressIssueDetector()
    
    if os.path.isfile(args.path):
        # Analyze single file
        result = detector.analyze_file(args.path)
        print(f"\nAnalysis of {args.path}:")
        print(f"Score: {result['score']:.1f}/100")
        print(f"Issues found: {result['issue_count']}")
        
        if args.detailed and result['issues']:
            print("\nDetailed Issues:")
            for issue in result['issues']:
                print(f"  • {issue['type']} ({issue['severity']}): {issue['description']}")
        
        if args.output:
            with open(args.output, 'w') as f:
                json.dump(result, f, indent=2)
                print(f"\nResults saved to {args.output}")
    
    else:
        # Analyze directory
        results = detector.analyze_directory(args.path)
        
        print(f"\n=== Adobe Express Issues Analysis Summary ===")
        print(f"Files analyzed: {results['summary']['total_files']}")
        print(f"Total issues: {results['summary']['total_issues']}")
        print(f"Average score: {results['summary']['average_score']:.1f}/100")
        
        print(f"\nIssues by type:")
        for issue_type, count in results['summary']['issues_by_type'].items():
            print(f"  • {issue_type}: {count}")
        
        if args.output:
            with open(args.output, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"\nResults saved to {args.output}")


if __name__ == '__main__':
    main()
