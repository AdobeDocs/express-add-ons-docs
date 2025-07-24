#!/usr/bin/env python3
"""
LLM-Friendly Markdown Linter for Adobe Express Add-ons Documentation

This tool provides specific linting rules for documentation optimized for LLM training
and AI assistant accuracy, based on developer query patterns and best practices.

Usage:
    python3 llm_markdown_linter.py src/pages
    python3 llm_markdown_linter.py specific_file.md --fix
"""

import re
import argparse
import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum

class Severity(Enum):
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"

@dataclass
class LintIssue:
    """Represents a linting issue"""
    rule_id: str
    severity: Severity
    message: str
    line_number: int
    column: int
    suggestion: Optional[str] = None
    auto_fixable: bool = False

@dataclass
class LintResult:
    """Results from linting a file"""
    file_path: str
    issues: List[LintIssue]
    error_count: int
    warning_count: int
    info_count: int

class LLMMarkdownLinter:
    """Main linting class with Adobe Express Add-ons specific rules"""
    
    def __init__(self):
        self.rules = {
            # AI Misinformation Prevention Rules
            'no-fake-api-methods': {
                'severity': Severity.ERROR,
                'description': 'Prevent non-existent API methods that AI systems hallucinate',
                'patterns': [
                    (r'\.setSize\s*\(', 'setSize() method does not exist'),
                    (r'\.setTransform\s*\(', 'setTransform() method does not exist'),
                    (r'editor\.createPage\s*\(', 'editor.createPage() does not exist, use editor.documentRoot.pages.addPage()'),
                    (r'runtime\.call\s*\(', 'runtime.call() does not exist'),
                    # Note: runtime.exposeApi() and runtime.apiProxy() are LEGITIMATE Adobe Express Add-on SDK methods
                    # Removed: runtime.exposeApi() - this is a core Communication API method
                ]
            },
            
            'no-fake-imports': {
                'severity': Severity.ERROR,
                'description': 'Prevent incorrect import statements',
                'check_function': 'check_fake_imports'
            },
            
            'check-undefined-variables': {
                'severity': Severity.ERROR,
                'description': 'Variables must be imported or defined before use',
                'check_function': 'check_undefined_variables'
            },
            
            'consistent-sdk-naming': {
                'severity': Severity.WARNING,
                'description': 'Enforce consistent variable naming for SDK imports',
                'check_function': 'check_sdk_naming'
            },

            # Context Clarity Rules
            'require-context-headers': {
                'severity': Severity.WARNING,
                'description': 'JavaScript code blocks should have clear UI/Sandbox context',
                'check_function': 'check_context_headers'
            },
            
            'require-file-indicators': {
                'severity': Severity.INFO,
                'description': 'Code examples should indicate which file it belongs in',
                'check_function': 'check_file_indicators'
            },
            
            # Code Completeness Rules
            'complete-js-examples': {
                'severity': Severity.WARNING,
                'description': 'JavaScript examples should include imports and proper structure',
                'check_function': 'check_js_completeness'
            },
            
            'require-async-edit-context': {
                'severity': Severity.ERROR,
                'description': 'Document API usage should be wrapped in queueAsyncEdit',
                'check_function': 'check_async_edit_context'
            },
            
            # Error-First Documentation Rules
            'suggest-error-sections': {
                'severity': Severity.INFO,
                'description': 'Consider adding error-first documentation sections',
                'check_function': 'check_error_sections'
            },
            
            # Q&A Format Rules
            'suggest-qa-format': {
                'severity': Severity.INFO,
                'description': 'Consider using Q&A format for better LLM training',
                'check_function': 'check_qa_format'
            },
            
            # Cross-Reference Rules
            'require-cross-references': {
                'severity': Severity.INFO,
                'description': 'Add cross-references to related documentation',
                'check_function': 'check_cross_references'
            },
            
            # Progressive Structure Rules
            'suggest-progressive-structure': {
                'severity': Severity.INFO,
                'description': 'Consider adding progressive learning structure',
                'check_function': 'check_progressive_structure'
            },

            # MCP Server Chunking Optimization Rules
            'chunk-semantic-coherence': {
                'severity': Severity.WARNING,
                'description': 'Ensure 1000-char chunks are semantically coherent for retrieval',
                'check_function': 'check_chunk_semantic_coherence'
            },
            
            'chunk-self-contained-examples': {
                'severity': Severity.ERROR,
                'description': 'Code examples should be complete within chunk boundaries',
                'check_function': 'check_chunk_self_contained_examples'
            },
            
            'chunk-heading-hierarchy': {
                'severity': Severity.WARNING,
                'description': 'Optimize heading structure for Markdown chunking',
                'check_function': 'check_chunk_heading_hierarchy'
            },
            
            'chunk-context-independence': {
                'severity': Severity.ERROR,
                'description': 'Each section should provide sufficient context for standalone understanding',
                'check_function': 'check_chunk_context_independence'
            },
            
            'chunk-qa-optimization': {
                'severity': Severity.INFO,
                'description': 'Optimize content for question-answer retrieval patterns',
                'check_function': 'check_chunk_qa_optimization'
            }
        }
    
    def lint_file(self, file_path: str) -> LintResult:
        """Lint a single markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return LintResult(
                file_path=file_path,
                issues=[LintIssue(
                    rule_id='file-read-error',
                    severity=Severity.ERROR,
                    message=f"Could not read file: {e}",
                    line_number=0,
                    column=0
                )],
                error_count=1,
                warning_count=0,
                info_count=0
            )
        
        issues = []
        lines = content.split('\n')
        
        # Run pattern-based rules
        for rule_id, rule_config in self.rules.items():
            if 'patterns' in rule_config:
                for pattern, message in rule_config['patterns']:
                    issues.extend(self._check_pattern(
                        rule_id, pattern, message, content, lines, rule_config['severity']
                    ))
            elif 'check_function' in rule_config:
                check_func = getattr(self, rule_config['check_function'])
                issues.extend(check_func(
                    rule_id, content, lines, rule_config['severity']
                ))
        
        # Count issues by severity
        error_count = sum(1 for issue in issues if issue.severity == Severity.ERROR)
        warning_count = sum(1 for issue in issues if issue.severity == Severity.WARNING)
        info_count = sum(1 for issue in issues if issue.severity == Severity.INFO)
        
        return LintResult(
            file_path=file_path,
            issues=issues,
            error_count=error_count,
            warning_count=warning_count,
            info_count=info_count
        )
    
    def _check_pattern(self, rule_id: str, pattern: str, message: str, 
                      content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for a regex pattern across the content"""
        issues = []
        for match in re.finditer(pattern, content):
            line_num = content[:match.start()].count('\n') + 1
            col_num = match.start() - content[:match.start()].rfind('\n')
            
            suggestion = self._get_suggestion_for_pattern(rule_id, match.group(0))
            auto_fixable = rule_id in ['no-fake-api-methods', 'no-fake-imports']
            
            issues.append(LintIssue(
                rule_id=rule_id,
                severity=severity,
                message=message,
                line_number=line_num,
                column=col_num,
                suggestion=suggestion,
                auto_fixable=auto_fixable
            ))
        return issues
    
    def _get_suggestion_for_pattern(self, rule_id: str, matched_text: str) -> Optional[str]:
        """Get auto-fix suggestions for pattern matches"""
        suggestions = {
            'no-fake-api-methods': {
                '.setSize(': '// Use width and height properties instead:\nelement.width = 100;\nelement.height = 50;',
                '.setTransform(': '// Use individual properties instead:\nelement.translation = { x: 10, y: 10 };\nelement.width = 100;\nelement.height = 50;',
                'editor.createPage(': 'editor.documentRoot.pages.addPage(geometry)',
            },
            'no-fake-imports': {
                '@adobe/ccweb-add-on-sdk': '// Use correct imports instead:\n// import { editor } from "express-document-sdk";\n// import addOnUISdk from "add-on-sdk";'
            }
        }
        
        if rule_id in suggestions:
            for pattern, suggestion in suggestions[rule_id].items():
                if pattern in matched_text:
                    return suggestion
        return None
    
    def check_context_headers(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for context headers in JavaScript code blocks"""
        issues = []
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            line_num = content[:match.start()].count('\n') + 1
            
            # Look for context indicators before the code block
            preceding_lines = lines[max(0, line_num-5):line_num-1]
            has_context = any(
                'Document Sandbox' in line or 'UI Runtime' in line or 
                'code.js' in line or 'index.js' in line
                for line in preceding_lines
            )
            
            if not has_context:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="JavaScript code block lacks context header (UI Runtime vs Document Sandbox)",
                    line_number=line_num,
                    column=0,
                    suggestion="Add header like: ### Document Sandbox (code.js) or ### UI Runtime (index.js)",
                    auto_fixable=True
                ))
        
        return issues
    
    def check_file_indicators(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for file path indicators in code examples"""
        issues = []
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            line_num = content[:match.start()].count('\n') + 1
            
            # Check if code looks like it belongs in a specific file
            has_editor_api = 'editor.' in code_content
            has_ui_sdk = 'addOnUISdk' in code_content or 'sandboxProxy' in code_content
            
            # Look for file indicators INSIDE the code block or in the heading before it
            has_file_indicator_in_code = any(
                indicator in code_content
                for indicator in ['code.js', 'index.js', 'sandbox/', 'ui/']
            )
            
            has_file_indicator_in_heading = any(
                indicator in content[max(0, match.start()-300):match.start()]
                for indicator in ['code.js', 'index.js', 'sandbox', 'ui/']
            )
            
            has_file_indicator = has_file_indicator_in_code or has_file_indicator_in_heading
            
            if (has_editor_api or has_ui_sdk) and not has_file_indicator:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="Code example should indicate which file it belongs in",
                    line_number=line_num,
                    column=0,
                    suggestion="Add file path comment: // In sandbox/code.js or // In ui/index.js"
                ))
        
        return issues
    
    def check_js_completeness(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check JavaScript examples for completeness"""
        issues = []
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            line_num = content[:match.start()].count('\n') + 1
            
            # Check completeness indicators
            has_imports = 'import' in code_content or 'require' in code_content
            has_editor_usage = 'editor.' in code_content
            has_proper_structure = '{' in code_content and '}' in code_content
            
            # Skip very short snippets
            if len(code_content.strip()) < 50:
                continue
            
            if has_editor_usage and not has_imports:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="JavaScript example using editor API should include import statement",
                    line_number=line_num,
                    column=0,
                    suggestion='Add import: import { editor } from "express-document-sdk";'
                ))
        
        return issues
    
    def check_async_edit_context(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for proper queueAsyncEdit usage - only needed after async operations"""
        issues = []
        
        # Find JavaScript code blocks
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            block_start_line = content[:match.start()].count('\n') + 2  # +2 for the ``` line
            
            # Check if this code block has async operations followed by editor mutations
            has_async_ops = bool(re.search(r'await\s+(?:fetch|.*\.loadBitmapImage|fonts\.)', code_content))
            has_editor_mutations = bool(re.search(r'editor\.(?:create|context\.insertionParent)', code_content))
            has_queueAsyncEdit = 'queueAsyncEdit' in code_content
            
            # Only flag if there are async operations AND editor mutations WITHOUT queueAsyncEdit
            if has_async_ops and has_editor_mutations and not has_queueAsyncEdit:
                # Find the first editor mutation after an async operation
                lines_in_block = code_content.split('\n')
                found_await = False
                
                for i, line in enumerate(lines_in_block):
                    if 'await' in line and ('fetch' in line or 'loadBitmapImage' in line or 'fonts.' in line):
                        found_await = True
                    elif found_await and re.search(r'editor\.(?:create|context\.insertionParent)', line):
                        issues.append(LintIssue(
                            rule_id=rule_id,
                            severity=severity,
                            message="Document mutations after async operations should be wrapped in editor.queueAsyncEdit()",
                            line_number=block_start_line + i,
                            column=0,
                            suggestion="Wrap document mutations in: await editor.queueAsyncEdit(() => { ... });"
                        ))
                        break
        
        return issues
    
    def check_error_sections(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for error-first documentation sections when code blocks need error handling"""
        issues = []
        
        # Check if there are code blocks with risky operations that need error handling
        code_blocks = re.findall(r'```(\w+)?\n(.*?)\n```', content, re.DOTALL)
        
        # Define operations that could fail and need error handling
        risky_operations = [
            r'addOnUISdk\.app\.showModalDialog\(',     # Modal dialogs that can fail
            r'addOnUISdk\.app\.enableDragToDocument\(',# Drag operations that can fail
            r'addOnUISdk\.instance\.proxy\.',          # Communication operations that can fail
            r'editor\.createRenditions\(',             # Rendition creation
            r'editor\.createRectangle\(',              # Shape creation
            r'editor\.createEllipse\(',                # Shape creation
            r'editor\.createText\(',                   # Text creation
            r'editor\.createImage\(',                  # Image creation
            r'editor\.createPage\(',                   # Page creation
            r'\.setFill\(',                           # Style operations that can fail
            r'\.setStroke\(',                         # Style operations that can fail
            r'fetch\(',                               # Network requests
            r'JSON\.parse\(',                         # JSON parsing that can fail
            r'JSON\.stringify\(',                     # JSON stringifying that can fail
            r'localStorage\.',                        # Storage operations
            r'sessionStorage\.',                      # Storage operations
            r'require\(',                             # Require statements (dynamic requires can fail)
            r'await\s+fonts\.',                       # Font loading operations
        ]
        
        # Check if any code blocks have risky operations without try/catch
        has_risky_code_without_error_handling = False
        for lang, code in code_blocks:
            has_risky_operations = any(re.search(pattern, code, re.IGNORECASE) for pattern in risky_operations)
            has_try_catch = 'try' in code and 'catch' in code
            
            if has_risky_operations and not has_try_catch:
                has_risky_code_without_error_handling = True
                break
        
        # Only suggest error sections if we have risky code without error handling
        if has_risky_code_without_error_handling:
            has_error_sections = bool(re.search(r'##?\s*(?:Error|Common Issues|Troubleshooting)', content, re.IGNORECASE))
            
            if not has_error_sections:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="Consider adding error/troubleshooting sections for API operations that can fail",
                    line_number=1,
                    column=0,
                    suggestion="Add section: ## Common Issues or ## Error: \"method is not a function\""
                ))
        
        return issues
    
    def check_qa_format(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for Q&A format usage"""
        issues = []
        
        # Check if content could benefit from Q&A format
        has_questions = bool(re.search(r'how (?:do|to)|what (?:is|are)|why|when', content, re.IGNORECASE))
        has_qa_format = bool(re.search(r'\*\*Q:', content))
        
        if has_questions and not has_qa_format and len(content) > 800:
            issues.append(LintIssue(
                rule_id=rule_id,
                severity=severity,
                message="Consider using Q&A format for better LLM training",
                line_number=1,
                column=0,
                suggestion="Format as: **Q: [question]** A: [answer]"
            ))
        
        return issues
    
    def check_cross_references(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for cross-references to related documentation"""
        issues = []
        
        # Count existing cross-references
        cross_refs = len(re.findall(r'\[.*?\]\(.*?\.md.*?\)', content))
        
        # Documents should have at least some cross-references if they're substantial
        if len(content) > 1000 and cross_refs < 2:
            issues.append(LintIssue(
                rule_id=rule_id,
                severity=severity,
                message="Consider adding cross-references to related documentation",
                line_number=len(lines),
                column=0,
                suggestion="Add section: ## See Also with links to related docs"
            ))
        
        return issues
    
    def check_progressive_structure(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for progressive learning structure"""
        issues = []
        
        # Look for progressive indicators
        has_levels = bool(re.search(r'level|step|phase|basic|intermediate|advanced', content, re.IGNORECASE))
        has_prerequisites = bool(re.search(r'prerequisite|before you|requirements', content, re.IGNORECASE))
        
        # Check if it's a tutorial-style document
        is_tutorial = bool(re.search(r'tutorial|guide|getting started|how to', content, re.IGNORECASE))
        
        if is_tutorial and not (has_levels or has_prerequisites) and len(content) > 1200:
            issues.append(LintIssue(
                rule_id=rule_id,
                severity=severity,
                message="Tutorial content should include progressive structure",
                line_number=1,
                column=0,
                suggestion="Add sections like: ## Prerequisites, ## Step 1, ## Step 2, etc."
            ))
        
        return issues
    
    def check_fake_imports(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for incorrect import statements (more precise than pattern matching)"""
        issues = []
        
        # Find JavaScript code blocks
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            block_start_line = content[:match.start()].count('\n') + 2
            
            lines_in_block = code_content.split('\n')
            for i, line in enumerate(lines_in_block):
                line_stripped = line.strip()
                
                # Check for actual import statements (not just mentions)
                if line_stripped.startswith('import') or line_stripped.startswith('from'):
                    # Check for fake packages in import statements only
                    if '@adobe/ccweb-add-on-sdk' in line and '@adobe/ccweb-add-on-sdk-types' not in line:
                        issues.append(LintIssue(
                            rule_id=rule_id,
                            severity=severity,
                            message="Package @adobe/ccweb-add-on-sdk does not exist",
                            line_number=block_start_line + i,
                            column=0,
                            suggestion="Use correct package: 'https://express.adobe.com/static/add-on-sdk/sdk.js' or 'add-on-sdk-document-sandbox'",
                            auto_fixable=True
                        ))
                    elif '@adobe/express-addon-sdk' in line:
                        issues.append(LintIssue(
                            rule_id=rule_id,
                            severity=severity,
                            message="Package @adobe/express-addon-sdk does not exist",
                            line_number=block_start_line + i,
                            column=0,
                            suggestion="Use correct package: 'https://express.adobe.com/static/add-on-sdk/sdk.js' or 'add-on-sdk-document-sandbox'",
                            auto_fixable=True
                        ))
        
        return issues
    
    def check_undefined_variables(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for variables used without being imported or defined"""
        issues = []
        
        # Find JavaScript code blocks
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            block_start_line = content[:match.start()].count('\n') + 2
            
            # Track imported/defined variables in this code block
            defined_vars = set(['console', 'document', 'window'])  # Built-in globals
            
            lines_in_block = code_content.split('\n')
            for i, line in enumerate(lines_in_block):
                line_stripped = line.strip()
                
                # Track imports and variable definitions
                if 'import' in line and 'from' in line:
                    # Extract variable name from import
                    import_match = re.search(r'import\s+(\w+)', line)
                    if import_match:
                        defined_vars.add(import_match.group(1))
                
                elif line_stripped.startswith('const ') or line_stripped.startswith('let ') or line_stripped.startswith('var '):
                    # Extract variable names from declarations
                    var_match = re.search(r'(?:const|let|var)\s+(\w+)', line)
                    if var_match:
                        defined_vars.add(var_match.group(1))
                
                # Check for destructuring assignments
                destructure_match = re.search(r'const\s*\{\s*(\w+)', line)
                if destructure_match:
                    defined_vars.add(destructure_match.group(1))
                
                # Check for variable usage
                # Common undefined variables in Adobe Express Add-on docs
                undefined_patterns = [
                    (r'\bruntime\b', 'runtime'),
                    (r'\beditor\b', 'editor'),
                    (r'\bcolorUtils\b', 'colorUtils'),
                    (r'\bconstants\b', 'constants'),
                    (r'\baddOnUISdk\b', 'addOnUISdk'),
                    (r'\baddOnSandboxSdk\b', 'addOnSandboxSdk')
                ]
                
                for pattern, var_name in undefined_patterns:
                    if re.search(pattern, line) and var_name not in defined_vars:
                        # Skip if it's a comment or import line
                        if not line_stripped.startswith('//') and 'import' not in line:
                            issues.append(LintIssue(
                                rule_id=rule_id,
                                severity=severity,
                                message=f"Variable '{var_name}' used without being imported or defined",
                                line_number=block_start_line + i,
                                column=0,
                                suggestion=f"Add import for '{var_name}' or define it before use",
                                auto_fixable=True
                            ))
                            defined_vars.add(var_name)  # Avoid duplicate warnings
        
        return issues
    
    def check_sdk_naming(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check for consistent SDK variable naming"""
        issues = []
        
        # Find JavaScript code blocks
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            block_start_line = content[:match.start()].count('\n') + 2
            
            lines_in_block = code_content.split('\n')
            for i, line in enumerate(lines_in_block):
                # Check for UI SDK import with wrong variable name
                if 'express.adobe.com/static/add-on-sdk/sdk.js' in line:
                    if 'import' in line and 'addOnUISdk' not in line:
                        # Extract the variable name being used
                        import_match = re.search(r'import\s+(\w+)', line)
                        if import_match:
                            wrong_name = import_match.group(1)
                            issues.append(LintIssue(
                                rule_id=rule_id,
                                severity=severity,
                                message=f"UI SDK should use variable name 'addOnUISdk', not '{wrong_name}'",
                                line_number=block_start_line + i,
                                column=0,
                                suggestion="Use: import addOnUISdk from \"https://express.adobe.com/static/add-on-sdk/sdk.js\";"
                            ))
                
                # Check for Sandbox SDK import with wrong variable name
                elif 'add-on-sdk-document-sandbox' in line:
                    if 'import' in line and 'addOnSandboxSdk' not in line:
                        # Extract the variable name being used
                        import_match = re.search(r'import\s+(\w+)', line)
                        if import_match:
                            wrong_name = import_match.group(1)
                            issues.append(LintIssue(
                                rule_id=rule_id,
                                severity=severity,
                                message=f"Sandbox SDK should use variable name 'addOnSandboxSdk', not '{wrong_name}'",
                                line_number=block_start_line + i,
                                column=0,
                                suggestion="Use: import addOnSandboxSdk from \"add-on-sdk-document-sandbox\";"
                            ))
        
        return issues
    
    def check_chunk_semantic_coherence(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check if content will chunk semantically for 1000-char child chunks"""
        issues = []
        
        # Simulate 1000-char chunking to identify potential semantic breaks
        words = content.split()
        current_chunk = ""
        
        for i, word in enumerate(words):
            if len(current_chunk + " " + word) > 1000:
                # Check if chunk ends mid-concept
                chunk_end = current_chunk.strip()
                
                # Flag potential semantic breaks
                problematic_endings = [
                    'import',  # Import statement cut off
                    'function',  # Function definition cut off
                    'const',  # Variable declaration cut off
                    'class',  # Class definition cut off
                    'interface',  # Interface cut off
                    'type',  # Type definition cut off
                ]
                
                last_words = chunk_end.split()[-3:] if chunk_end else []
                for problematic in problematic_endings:
                    if any(problematic in word.lower() for word in last_words):
                        # Find line number (approximate)
                        chunk_line = content[:len(current_chunk)].count('\n') + 1
                        issues.append(LintIssue(
                            rule_id=rule_id,
                            severity=severity,
                            message=f"Potential semantic break around 1000-char boundary near '{problematic}'",
                            line_number=chunk_line,
                            column=0,
                            suggestion="Consider reorganizing content to keep related concepts together"
                        ))
                        break
                
                current_chunk = word
            else:
                current_chunk += " " + word if current_chunk else word
        
        return issues
    
    def check_chunk_self_contained_examples(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Ensure code examples are complete within likely chunk boundaries"""
        issues = []
        
        # Find JavaScript code blocks
        js_blocks = re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content)
        
        for match in js_blocks:
            code_content = match.group(1)
            block_start = content[:match.start()].count('\n') + 1
            
            # Check if code block is self-contained
            has_imports = bool(re.search(r'import\s+', code_content))
            has_exports = bool(re.search(r'export\s+', code_content))
            has_function_calls = bool(re.search(r'\w+\([^)]*\)', code_content))
            has_variable_usage = bool(re.search(r'[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_]', code_content))
            
            # Flag examples that might reference undefined variables/functions
            if (has_function_calls or has_variable_usage) and not has_imports:
                # Check if within reasonable chunk size context
                surrounding_start = max(0, match.start() - 2000)
                surrounding_end = min(len(content), match.end() + 2000)
                surrounding_content = content[surrounding_start:surrounding_end]
                
                # If surrounding context is large, flag for self-containment
                if len(surrounding_content) > 3000:
                    issues.append(LintIssue(
                        rule_id=rule_id,
                        severity=severity,
                        message="Code example may not be self-contained within chunk boundaries",
                        line_number=block_start,
                        column=0,
                        suggestion="Add necessary imports/context or keep related content closer together"
                    ))
        
        return issues
    
    def check_chunk_heading_hierarchy(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Check heading hierarchy for optimal Markdown chunking"""
        issues = []
        
        headings = []
        for i, line in enumerate(lines):
            heading_match = re.match(r'^(#{1,6})\s+(.+)', line.strip())
            if heading_match:
                level = len(heading_match.group(1))
                title = heading_match.group(2)
                headings.append((i + 1, level, title))
        
        for i, (line_no, level, title) in enumerate(headings):
            # Check for proper hierarchy (no skipping levels)
            if i > 0:
                prev_level = headings[i-1][1]
                if level > prev_level + 1:
                    issues.append(LintIssue(
                        rule_id=rule_id,
                        severity=severity,
                        message=f"Heading level jumps from H{prev_level} to H{level} - may break chunking",
                        line_number=line_no,
                        column=0,
                        suggestion="Use progressive heading levels (H1 -> H2 -> H3) for better chunking"
                    ))
            
            # Flag very long headings that might affect chunking
            if len(title) > 100:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="Very long heading may affect chunk boundaries",
                    line_number=line_no,
                    column=0,
                    suggestion="Consider shorter, more focused headings"
                ))
        
        return issues
    
    def check_chunk_context_independence(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Ensure sections provide sufficient context for standalone understanding"""
        issues = []
        
        # Find sections (defined by headings)
        sections = []
        current_section = []
        current_heading_line = 0
        
        for i, line in enumerate(lines):
            if re.match(r'^#{1,6}\s+', line.strip()):
                if current_section:
                    sections.append((current_heading_line, '\n'.join(current_section)))
                current_section = [line]
                current_heading_line = i + 1
            else:
                current_section.append(line)
        
        # Add the last section
        if current_section:
            sections.append((current_heading_line, '\n'.join(current_section)))
        
        for line_no, section_content in sections:
            # Check if section has context-setting elements
            has_intro = bool(re.search(r'(This section|Here we|In this|Let\'s|We will)', section_content, re.IGNORECASE))
            has_prerequisites = bool(re.search(r'(prerequisite|before|first|requirement)', section_content, re.IGNORECASE))
            has_references = bool(re.search(r'(see above|previous|earlier|mentioned)', section_content, re.IGNORECASE))
            
            # Flag sections that rely heavily on external context
            if has_references and not (has_intro or has_prerequisites):
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="Section relies on external context - may not work well in isolation",
                    line_number=line_no,
                    column=0,
                    suggestion="Add brief context or prerequisites to make section self-contained"
                ))
            
            # Check for orphaned code examples
            code_blocks = re.findall(r'```[\s\S]*?```', section_content)
            explanatory_text = re.sub(r'```[\s\S]*?```', '', section_content)
            
            if code_blocks and len(explanatory_text.strip()) < 100:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="Code example lacks sufficient explanatory context",
                    line_number=line_no,
                    column=0,
                    suggestion="Add explanation of what the code does and when to use it"
                ))
        
        return issues
    
    def apply_fixes(self, file_path: str, issues: List[LintIssue]) -> Tuple[str, int]:
        """Apply auto-fixes to a file and return the fixed content and number of fixes applied"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return content, 0
        
        lines = content.split('\n')
        fixes_applied = 0
        
        # Sort issues by line number in reverse order to avoid line number shifts
        auto_fixable_issues = [issue for issue in issues if issue.auto_fixable]
        auto_fixable_issues.sort(key=lambda x: x.line_number, reverse=True)
        
        for issue in auto_fixable_issues:
            if issue.rule_id == 'no-fake-api-methods':
                content, fixed = self._fix_fake_api_methods(content, issue)
                if fixed:
                    fixes_applied += 1
            elif issue.rule_id == 'no-fake-imports':
                content, fixed = self._fix_fake_imports(content, issue)
                if fixed:
                    fixes_applied += 1
            elif issue.rule_id == 'check-undefined-variables':
                content, fixed = self._fix_undefined_variables(content, issue)
                if fixed:
                    fixes_applied += 1
            elif issue.rule_id == 'require-context-headers':
                content, fixed = self._fix_context_headers(content, issue)
                if fixed:
                    fixes_applied += 1
        
        return content, fixes_applied
    
    def _fix_fake_api_methods(self, content: str, issue: LintIssue) -> Tuple[str, bool]:
        """Fix fake API method calls"""
        lines = content.split('\n')
        if issue.line_number <= len(lines):
            line = lines[issue.line_number - 1]
            
            # Apply specific fixes
            if '.setSize(' in line:
                # Replace with width/height properties
                fixed_line = re.sub(
                    r'(\w+)\.setSize\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)',
                    r'\1.width = \2;\n// ... existing code ...\n\1.height = \3',
                    line
                )
                lines[issue.line_number - 1] = fixed_line
                return '\n'.join(lines), True
                
            elif '.setTransform(' in line:
                # Replace with individual properties
                fixed_line = re.sub(
                    r'(\w+)\.setTransform\s*\([^)]+\)',
                    r'\1.translation = { x: 10, y: 10 };\n// ... existing code ...\n\1.width = 100;\n// ... existing code ...\n\1.height = 50',
                    line
                )
                lines[issue.line_number - 1] = fixed_line
                return '\n'.join(lines), True
                
            elif 'editor.createPage(' in line:
                # Replace with correct API
                fixed_line = line.replace('editor.createPage(', 'editor.documentRoot.pages.addPage(')
                lines[issue.line_number - 1] = fixed_line
                return '\n'.join(lines), True
        
        return content, False
    
    def _fix_fake_imports(self, content: str, issue: LintIssue) -> Tuple[str, bool]:
        """Fix fake import statements"""
        lines = content.split('\n')
        if issue.line_number <= len(lines):
            line = lines[issue.line_number - 1]
            
            if '@adobe/ccweb-add-on-sdk' in line and '@adobe/ccweb-add-on-sdk-types' not in line:
                # Replace with correct import
                if 'from' in line:
                    fixed_line = 'import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";'
                    lines[issue.line_number - 1] = fixed_line
                    return '\n'.join(lines), True
                    
            elif '@adobe/express-addon-sdk' in line:
                # Replace with correct import
                fixed_line = 'import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";'
                lines[issue.line_number - 1] = fixed_line
                return '\n'.join(lines), True
        
        return content, False
    
    def _fix_undefined_variables(self, content: str, issue: LintIssue) -> Tuple[str, bool]:
        """Fix undefined variables by adding imports"""
        lines = content.split('\n')
        
        # Find the JavaScript code block that contains this issue
        js_blocks = list(re.finditer(r'```(?:javascript|js)\n([\s\S]*?)```', content))
        
        for match in js_blocks:
            block_start_line = content[:match.start()].count('\n') + 2
            block_end_line = content[:match.end()].count('\n') + 1
            
            if block_start_line <= issue.line_number <= block_end_line:
                # Add import at the beginning of the code block
                variable_imports = {
                    'editor': 'import { editor } from "express-document-sdk";',
                    'colorUtils': 'import { colorUtils } from "express-document-sdk";',
                    'runtime': 'import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";\nconst { runtime } = addOnUISdk;',
                    'addOnUISdk': 'import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";',
                    'constants': 'import { constants } from "express-document-sdk";'
                }
                
                # Extract variable name from the issue message
                var_match = re.search(r"Variable '(\w+)' used", issue.message)
                if var_match:
                    var_name = var_match.group(1)
                    if var_name in variable_imports:
                        import_line = variable_imports[var_name]
                        
                        # Insert import after the opening ``` line
                        lines.insert(block_start_line, import_line)
                        return '\n'.join(lines), True
        
        return content, False
    
    def _fix_context_headers(self, content: str, issue: LintIssue) -> Tuple[str, bool]:
        """Add context headers before JavaScript code blocks"""
        lines = content.split('\n')
        
        # Find the JavaScript code block at this line
        if issue.line_number <= len(lines):
            line = lines[issue.line_number - 1]
            if line.strip().startswith('```javascript') or line.strip().startswith('```js'):
                # Find the end of the code block to analyze content
                code_block_content = ""
                for i in range(issue.line_number, len(lines)):
                    if lines[i].strip() == '```':
                        break
                    code_block_content += lines[i] + '\n'
                
                # Determine correct context based on code content
                is_ui_runtime = bool(re.search(r'addOnUISdk|sandboxProxy|runtime\.|app\.ui', code_block_content))
                is_document_sandbox = bool(re.search(r'editor\.|colorUtils|constants\.', code_block_content))
                
                if is_ui_runtime and not is_document_sandbox:
                    context_header = '\n### 🖥️ UI Runtime (index.js)\n'
                elif is_document_sandbox and not is_ui_runtime:
                    context_header = '\n### 📁 Document Sandbox (code.js)\n'
                else:
                    # Default to Document Sandbox if unclear
                    context_header = '\n### 📁 Document Sandbox (code.js)\n'
                
                # Check if there's already a heading nearby
                has_nearby_heading = False
                for i in range(max(0, issue.line_number - 4), issue.line_number - 1):
                    if i < len(lines) and lines[i].strip().startswith('#'):
                        has_nearby_heading = True
                        break
                
                if not has_nearby_heading:
                    lines.insert(issue.line_number - 1, context_header)
                    return '\n'.join(lines), True
        
        return content, False

    def check_chunk_qa_optimization(self, rule_id: str, content: str, lines: List[str], severity: Severity) -> List[LintIssue]:
        """Optimize content for question-answer retrieval patterns"""
        issues = []
        
        # Check for question-like patterns that could be optimized
        question_patterns = [
            r'how to\s+\w+',
            r'how do\s+\w+',
            r'what is\s+\w+',
            r'when to\s+\w+',
            r'why\s+\w+',
            r'where\s+\w+',
        ]
        
        for i, line in enumerate(lines):
            line_lower = line.lower()
            
            # Look for content that reads like questions but isn't formatted as Q&A
            for pattern in question_patterns:
                if re.search(pattern, line_lower) and not line.strip().startswith('#'):
                    # Check if it's already in Q&A format
                    qa_format = re.search(r'\*\*Q:', line) or re.search(r'Q:', line)
                    if not qa_format:
                        issues.append(LintIssue(
                            rule_id=rule_id,
                            severity=severity,
                            message="Content could be optimized for Q&A retrieval format",
                            line_number=i + 1,
                            column=0,
                            suggestion="Consider formatting as: **Q: [question]** A: [answer]"
                        ))
                        break
        
        # Check for procedure/step content that could benefit from Q&A format
        step_patterns = [
            r'step\s+\d+',
            r'first,?\s+\w+',
            r'then,?\s+\w+',
            r'finally,?\s+\w+',
            r'next,?\s+\w+',
        ]
        
        procedure_content = '\n'.join(lines)
        step_count = sum(1 for pattern in step_patterns for _ in re.finditer(pattern, procedure_content, re.IGNORECASE))
        
        if step_count >= 3:  # Likely a procedure
            qa_format_present = bool(re.search(r'\*\*Q:', procedure_content))
            if not qa_format_present:
                issues.append(LintIssue(
                    rule_id=rule_id,
                    severity=severity,
                    message="Multi-step content could benefit from Q&A format for better retrieval",
                    line_number=1,
                    column=0,
                    suggestion="Convert steps to Q&A format: 'Q: How do I do step 1?' 'A: [step details]'"
                ))
        
        return issues

    def lint_directory(self, docs_path: str) -> Dict[str, LintResult]:
        """Lint all markdown files in a directory"""
        results = {}
        md_files = list(Path(docs_path).rglob("*.md"))
        
        print(f"🔍 Linting {len(md_files)} markdown files for LLM-friendliness...")
        
        for file_path in md_files:
            result = self.lint_file(str(file_path))
            results[str(file_path)] = result
            
            # Print progress
            if result.error_count > 0 or result.warning_count > 0:
                print(f"   📄 {file_path.name}: {result.error_count}E {result.warning_count}W {result.info_count}I")
        
        return results
    
    def generate_report(self, results: Dict[str, LintResult]) -> Dict[str, Any]:
        """Generate summary report"""
        total_files = len(results)
        total_errors = sum(result.error_count for result in results.values())
        total_warnings = sum(result.warning_count for result in results.values())
        total_info = sum(result.info_count for result in results.values())
        
        # Count issues by rule
        rule_counts = {}
        for result in results.values():
            for issue in result.issues:
                rule_counts[issue.rule_id] = rule_counts.get(issue.rule_id, 0) + 1
        
        # Identify most problematic files
        problematic_files = sorted(
            [(path, result.error_count + result.warning_count) for path, result in results.items()],
            key=lambda x: x[1],
            reverse=True
        )[:10]
        
        return {
            'summary': {
                'total_files': total_files,
                'total_errors': total_errors,
                'total_warnings': total_warnings,
                'total_info': total_info,
                'files_with_issues': sum(1 for r in results.values() if r.error_count + r.warning_count > 0)
            },
            'rule_frequency': rule_counts,
            'most_problematic_files': problematic_files,
            'detailed_results': {path: asdict(result) for path, result in results.items()}
        }
    
    def print_summary(self, report: Dict[str, Any]):
        """Print linting summary"""
        summary = report['summary']
        
        print("\n" + "="*60)
        print("📋 LLM-FRIENDLY MARKDOWN LINTING SUMMARY")
        print("="*60)
        print(f"📁 Files analyzed: {summary['total_files']}")
        print(f"❌ Errors: {summary['total_errors']}")
        print(f"⚠️  Warnings: {summary['total_warnings']}")
        print(f"ℹ️  Info: {summary['total_info']}")
        print(f"🔥 Files with issues: {summary['files_with_issues']}")
        print()
        
        if report['rule_frequency']:
            print("📊 TOP RULE VIOLATIONS:")
            sorted_rules = sorted(report['rule_frequency'].items(), key=lambda x: x[1], reverse=True)
            for rule, count in sorted_rules[:10]:
                print(f"   {count:3d} × {rule}")
            print()
        
        if report['most_problematic_files']:
            print("🚨 MOST PROBLEMATIC FILES:")
            for file_path, issue_count in report['most_problematic_files'][:5]:
                if issue_count > 0:
                    file_name = Path(file_path).name
                    print(f"   {issue_count:3d} issues: {file_name}")
            print()
        
        print("="*60)

def main():
    parser = argparse.ArgumentParser(description='LLM-friendly markdown linter for Adobe Express Add-ons docs')
    parser.add_argument('path', help='Path to markdown file or directory')
    parser.add_argument('--output', help='Output report to JSON file')
    parser.add_argument('--rules', help='Comma-separated list of rules to run')
    parser.add_argument('--severity', choices=['error', 'warning', 'info'], 
                       help='Minimum severity level to report')
    parser.add_argument('--fix', action='store_true', help='Apply auto-fixes where possible')
    
    args = parser.parse_args()
    
    linter = LLMMarkdownLinter()
    
    # Run linting
    if Path(args.path).is_file():
        result = linter.lint_file(args.path)
        results = {args.path: result}
    else:
        results = linter.lint_directory(args.path)
    
    # Apply fixes if requested
    total_fixes_applied = 0
    if args.fix:
        print(f"\n🔧 Applying auto-fixes...")
        for file_path, result in results.items():
            if result.issues:
                fixed_content, fixes_applied = linter.apply_fixes(file_path, result.issues)
                if fixes_applied > 0:
                    # Write the fixed content back to the file
                    try:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(fixed_content)
                        print(f"   ✅ {Path(file_path).name}: {fixes_applied} fixes applied")
                        total_fixes_applied += fixes_applied
                    except Exception as e:
                        print(f"   ❌ {Path(file_path).name}: Error writing fixes - {e}")
        
        if total_fixes_applied > 0:
            print(f"\n🎉 Total fixes applied: {total_fixes_applied}")
            print("Re-run the linter to see remaining issues.")
        else:
            print("No auto-fixable issues found.")
    
    # Generate and print report
    report = linter.generate_report(results)
    linter.print_summary(report)
    
    # Save detailed report if requested
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(report, f, indent=2, default=str)
        print(f"📊 Detailed report saved to: {args.output}")
    
    # Print individual issues if single file
    if len(results) == 1:
        result = list(results.values())[0]
        if result.issues:
            print("\n📝 ISSUES FOUND:")
            for issue in result.issues:
                severity_icon = {"error": "❌", "warning": "⚠️", "info": "ℹ️"}[issue.severity.value]
                print(f"   {severity_icon} Line {issue.line_number}: {issue.message}")
                if issue.suggestion:
                    print(f"      💡 Suggestion: {issue.suggestion}")

if __name__ == "__main__":
    main() 