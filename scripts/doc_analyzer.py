#!/usr/bin/env python3
"""
Enhanced Documentation Analysis Tool for Adobe Express Add-ons LLM Readiness
Analyzes markdown documentation for LLM-friendly structure and Adobe Express specific issues.
"""

import os
import re
import json
import yaml
import glob
import argparse
from pathlib import Path
from typing import Dict, List, Any, Tuple
from collections import defaultdict, Counter
import frontmatter
import statistics

class DocumentationAnalyzer:
    def __init__(self, config_path: str = "config/audit-rubric.yaml"):
        """Initialize analyzer with configuration."""
        self.config = self._load_config(config_path)
        self.results = defaultdict(list)
        self.overall_scores = {}
        self.express_patterns = self.config.get('express_specific_patterns', {})
        
    def _load_config(self, config_path: str) -> Dict:
        """Load configuration from YAML file."""
        try:
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"Error loading config: {e}")
            return {}

    def analyze_file(self, file_path: str) -> Dict[str, Any]:
        """Analyze a single markdown file for LLM readiness."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Parse frontmatter if present
            try:
                post = frontmatter.loads(content)
                metadata = post.metadata
                body = post.content
            except:
                metadata = {}
                body = content
                
            # Perform all analysis
            results = {
                'file_path': file_path,
                'metadata': metadata,
                'structure_clarity': self._analyze_structure(body, file_path),
                'code_examples': self._analyze_code_examples(body),
                'api_documentation': self._analyze_api_documentation(body),
                'searchability': self._analyze_searchability(body, metadata, file_path),
                'consistency': self._analyze_consistency(body),
                'express_specific_issues': self._analyze_express_specific_issues(body),
                'word_count': len(body.split()),
                'issues': []
            }
            
            # Calculate weighted score
            results['score'] = self._calculate_weighted_score(results)
            results['issues'] = self._collect_issues(results)
            
            return results
            
        except Exception as e:
            return {
                'file_path': file_path,
                'error': str(e),
                'score': 0,
                'issues': [f"Failed to analyze file: {e}"]
            }

    def _analyze_structure(self, content: str, file_path: str) -> Dict[str, Any]:
        """Analyze document structure and hierarchy."""
        lines = content.split('\n')
        headings = []
        heading_pattern = re.compile(r'^(#{1,6})\s+(.+)')
        
        for i, line in enumerate(lines):
            match = heading_pattern.match(line)
            if match:
                level = len(match.group(1))
                text = match.group(2).strip()
                headings.append({'level': level, 'text': text, 'line': i+1})
        
        # Analyze heading hierarchy
        hierarchy_score = self._check_heading_hierarchy(headings)
        
        # Analyze paragraph length
        paragraphs = [p for p in content.split('\n\n') if p.strip() and not p.strip().startswith('#')]
        paragraph_scores = []
        long_paragraphs = 0
        
        for paragraph in paragraphs:
            sentences = re.split(r'[.!?]+', paragraph)
            sentence_count = len([s for s in sentences if s.strip()])
            if sentence_count > 8:  # Too long
                long_paragraphs += 1
                paragraph_scores.append(40)
            elif sentence_count < 2:  # Too short
                paragraph_scores.append(60)
            else:
                paragraph_scores.append(100)
        
        paragraph_score = statistics.mean(paragraph_scores) if paragraph_scores else 50
        
        # Analyze content chunking (sections should be <= 400 words)
        chunking_score = self._analyze_content_chunking(content)
        
        # Navigation and cross-references
        internal_links = len(re.findall(r'\[([^\]]+)\]\((?!http)([^)]+)\)', content))
        navigation_score = min(100, internal_links * 10)  # 10 points per internal link, max 100
        
        # Semantic boundaries (look for clear section breaks)
        semantic_score = self._analyze_semantic_boundaries(content)
        
        return {
            'heading_hierarchy': hierarchy_score,
            'paragraph_length': max(0, paragraph_score - (long_paragraphs * 10)),
            'content_chunking': chunking_score,
            'navigation_clarity': navigation_score,
            'semantic_boundaries': semantic_score,
            'total_headings': len(headings),
            'long_paragraphs_count': long_paragraphs
        }

    def _analyze_content_chunking(self, content: str) -> int:
        """Analyze if content is broken into appropriate chunks for RAG systems."""
        sections = re.split(r'\n## |\n### |\n#### ', content)
        
        overlong_sections = 0
        section_scores = []
        
        for section in sections:
            word_count = len(section.split())
            if word_count == 0:
                continue
                
            if word_count > 400:
                overlong_sections += 1
                # Penalty increases with section length
                if word_count > 800:
                    section_scores.append(20)
                elif word_count > 600:
                    section_scores.append(40)
                else:
                    section_scores.append(60)
            else:
                section_scores.append(100)
        
        base_score = statistics.mean(section_scores) if section_scores else 50
        return max(0, base_score)

    def _analyze_semantic_boundaries(self, content: str) -> int:
        """Check for clear semantic boundaries that help RAG chunking."""
        score = 100
        
        # Look for markers that indicate good semantic boundaries
        boundary_markers = [
            r'\n---\n',  # Horizontal rules
            r'\n## ',     # H2 headers
            r'<!-- chunk-boundary -->',  # Explicit chunk markers
            r'\n\*\*Summary\*\*',  # Summary sections
            r'\n\*\*Note\*\*',     # Note sections
        ]
        
        boundary_count = 0
        for marker in boundary_markers:
            boundary_count += len(re.findall(marker, content))
        
        # Score based on boundary density (should have boundaries every ~300-400 words)
        words = len(content.split())
        ideal_boundaries = max(1, words // 350)
        
        if boundary_count >= ideal_boundaries:
            return 100
        elif boundary_count >= ideal_boundaries * 0.5:
            return 75
        else:
            return 50

    def _check_heading_hierarchy(self, headings: List[Dict]) -> int:
        """Check if heading hierarchy is logical and consistent."""
        if not headings:
            return 0
            
        score = 100
        prev_level = 0
        
        for heading in headings:
            level = heading['level']
            
            # Check for proper progression (no skipping levels)
            if prev_level > 0 and level > prev_level + 1:
                score -= 15  # Penalty for skipping levels
                
            # Check for H1 usage (should be limited)
            if level == 1 and prev_level > 0:
                score -= 10  # Multiple H1s
                
            prev_level = level
            
        return max(0, score)

    def _analyze_code_examples(self, content: str) -> Dict[str, Any]:
        """Analyze code examples for completeness and Adobe Express specific issues."""
        code_blocks = re.findall(r'```(\w+)?\n(.*?)\n```', content, re.DOTALL)
        
        if not code_blocks:
            return {
                'example_completeness': 0,
                'variable_naming_consistency': 100,  # No variables to check
                'context_annotation': 0,  # No code to check context
                'error_handling_patterns': 100,  # Perfect score when no code to evaluate
                'import_statement_consistency': 0,
                'total_code_blocks': 0
            }
        
        completeness_scores = []
        variable_consistency_scores = []
        context_annotation_scores = []
        error_handling_scores = []
        import_consistency_scores = []
        
        for lang, code in code_blocks:
            # Analyze example completeness
            completeness_score = self._analyze_code_completeness(code)
            completeness_scores.append(completeness_score)
            
            # Analyze variable naming consistency (Adobe Express specific)
            variable_score = self._analyze_variable_naming(code)
            variable_consistency_scores.append(variable_score)
            
            # Check for context annotations
            context_score = self._analyze_context_annotations(code)
            context_annotation_scores.append(context_score)
            
            # Check for error handling
            error_score = self._analyze_error_handling(code)
            error_handling_scores.append(error_score)
            
            # Check import statement consistency
            import_score = self._analyze_import_consistency(code)
            import_consistency_scores.append(import_score)
        
        return {
            'example_completeness': statistics.mean(completeness_scores),
            'variable_naming_consistency': statistics.mean(variable_consistency_scores),
            'context_annotation': statistics.mean(context_annotation_scores),
            'error_handling_patterns': statistics.mean(error_handling_scores),
            'import_statement_consistency': statistics.mean(import_consistency_scores),
            'total_code_blocks': len(code_blocks)
        }

    def _analyze_variable_naming(self, code: str) -> int:
        """Check for consistent variable naming in Adobe Express examples."""
        # Look for different variations of the same SDK reference
        variations = {
            'addOnUISdk': len(re.findall(r'\baddOnUISdk\b', code)),
            'addOnSdk': len(re.findall(r'\baddOnSdk\b', code)),
            'sdk': len(re.findall(r'\bsdk\b(?!\.)', code)),  # Avoid matching sdk.something
            'express': len(re.findall(r'\bexpress\b(?!\-)', code))  # Avoid matching express-document-sdk
        }
        
        # Count how many different variations are used
        used_variations = sum(1 for count in variations.values() if count > 0)
        
        if used_variations <= 1:
            return 100  # Consistent
        elif used_variations == 2:
            return 70   # Minor inconsistency
        else:
            return 40   # Major inconsistency

    def _analyze_context_annotations(self, code: str) -> int:
        """Check if code examples have proper context annotations."""
        context_indicators = [
            r'// CONTEXT:',
            r'// PREREQUISITES:',
            r'<!-- Context:',
            r'<InlineAlert',
            r'// Document Sandbox',
            r'// iframe',
            r'// UI SDK',
            r'// Document API'
        ]
        
        has_context = any(re.search(indicator, code, re.IGNORECASE) for indicator in context_indicators)
        
        # Also check if code mixes different contexts without annotation
        has_iframe_apis = bool(re.search(r'addOnUISdk', code))
        has_document_apis = bool(re.search(r'editor\.|express-document-sdk', code))
        
        if has_iframe_apis and has_document_apis and not has_context:
            return 20  # Mixing contexts without annotation is problematic
        elif has_context:
            return 100
        elif has_iframe_apis or has_document_apis:
            return 60   # Has API usage but no context annotation
        else:
            return 80   # Generic code, less critical

    def _analyze_code_completeness(self, code: str) -> int:
        """Analyze if code examples are complete and runnable."""
        score = 100
        
        # Check for import statements
        if 'import' not in code and ('addOnUISdk' in code or 'express' in code):
            score -= 20
            
        # Check for variable declarations before usage
        variables_used = set(re.findall(r'(\w+)\.', code))
        variables_declared = set(re.findall(r'(?:const|let|var)\s+(\w+)', code))
        
        undeclared = variables_used - variables_declared - {'console', 'window', 'document'}
        if undeclared:
            score -= min(30, len(undeclared) * 10)
            
        # Check for setup/initialization
        if ('addOnUISdk' in code or 'editor' in code) and 'new ' not in code and 'import' not in code:
            score -= 15
            
        return max(0, score)

    def _analyze_error_handling(self, code: str) -> int:
        """Check for error handling patterns in code examples that should have them."""
        # Only check error handling for code examples that perform operations that could fail
        risky_operations = [
            r'addOnUISdk\.',           # UI SDK operations
            r'editor\.',               # Document API operations
            r'fetch\(',                # Network requests
            r'\.createRenditions\(',   # Rendition creation
            r'\.addImage\(',           # Image operations
            r'\.createRectangle\(',    # Shape creation
            r'\.createEllipse\(',      # Shape creation
            r'\.createText\(',         # Text creation
            r'import\s+.*from',        # Import statements (can fail)
            r'require\(',              # Require statements
            r'JSON\.',                 # JSON operations
            r'localStorage\.',         # Storage operations
            r'sessionStorage\.',       # Storage operations
        ]
        
        # Check if this code example has risky operations
        has_risky_operations = any(re.search(pattern, code, re.IGNORECASE) for pattern in risky_operations)
        
        # If no risky operations, don't require error handling
        if not has_risky_operations:
            return 100
        
        # For code with risky operations, check for error handling
        has_try_catch = 'try' in code and 'catch' in code
        has_error_check = bool(re.search(r'if.*error|\.catch\(|\.on\(.*error', code, re.IGNORECASE))
        has_console_error = 'console.error' in code
        
        if has_try_catch:
            return 100
        elif has_error_check or has_console_error:
            return 70
        else:
            return 30  # Only penalize if code has risky operations but no error handling

    def _analyze_import_consistency(self, code: str) -> int:
        """Check for consistent and complete import statements."""
        import_lines = re.findall(r'import.*from.*["\']([^"\']+)["\']', code)
        
        if not import_lines:
            return 60  # No imports to check
            
        score = 100
        
        # Check for consistent import patterns
        adobe_imports = [imp for imp in import_lines if 'adobe' in imp.lower() or 'express' in imp.lower()]
        
        # Look for inconsistent patterns
        if len(set(adobe_imports)) > 1:
            # Multiple different Adobe imports might indicate inconsistency
            unique_patterns = set()
            for imp in adobe_imports:
                if 'express-document-sdk' in imp:
                    unique_patterns.add('document-sdk')
                elif 'addonsdk' in imp or 'addon-sdk' in imp:
                    unique_patterns.add('addon-sdk')
                    
            if len(unique_patterns) > 1:
                score -= 20  # Mixed import patterns
                
        return score

    def _analyze_api_documentation(self, content: str) -> Dict[str, Any]:
        """Analyze API documentation quality with Adobe Express specific checks."""
        # API context clarity - check for iframe vs sandbox distinction
        context_clarity_score = self._analyze_api_context_clarity(content)
        
        # Look for capability matrices (tables showing supported/unsupported features)
        capability_matrices_score = self._analyze_capability_matrices(content)
        
        # Parameter documentation analysis
        parameter_score = self._analyze_parameter_documentation(content)
        
        # Architectural boundaries explanation
        architectural_score = self._analyze_architectural_boundaries(content)
        
        return {
            'api_context_clarity': context_clarity_score,
            'capability_matrices': capability_matrices_score,
            'parameter_documentation': parameter_score,
            'architectural_boundaries': architectural_score
        }

    def _analyze_api_context_clarity(self, content: str) -> int:
        """Check if API context (iframe vs sandbox) is clearly explained."""
        iframe_mentions = len(re.findall(r'iframe|addOnUISdk|UI SDK', content, re.IGNORECASE))
        sandbox_mentions = len(re.findall(r'sandbox|document.*api|express-document-sdk', content, re.IGNORECASE))
        
        # Look for explicit clarifications
        clarity_indicators = [
            r'iframe context',
            r'document sandbox',
            r'UI SDK.*iframe',
            r'Document API.*sandbox',
            r'runs in.*iframe',
            r'executes in.*sandbox'
        ]
        
        clarity_mentions = sum(len(re.findall(indicator, content, re.IGNORECASE)) for indicator in clarity_indicators)
        
        if clarity_mentions > 0:
            return 100
        elif iframe_mentions > 0 and sandbox_mentions > 0:
            return 60  # Mentions both but doesn't clarify difference
        elif iframe_mentions > 0 or sandbox_mentions > 0:
            return 80   # Mentions one context
        else:
            return 50   # No context mentioned

    def _analyze_capability_matrices(self, content: str) -> int:
        """Look for tables showing what's supported/unsupported in different contexts."""
        # Look for table structures with capability indicators
        table_patterns = [
            r'\|.*supported.*\|',
            r'\|.*✅.*❌.*\|',
            r'\|.*available.*not available.*\|',
            r'\|.*iframe.*sandbox.*\|'
        ]
        
        has_capability_table = any(re.search(pattern, content, re.IGNORECASE) for pattern in table_patterns)
        
        if has_capability_table:
            return 100
        
        # Look for alternative formats (lists, sections)
        capability_indicators = [
            r'supported.*features',
            r'not.*supported',
            r'available.*in.*iframe',
            r'limited.*to',
            r'only.*available.*in'
        ]
        
        capability_mentions = sum(len(re.findall(indicator, content, re.IGNORECASE)) for indicator in capability_indicators)
        
        if capability_mentions >= 3:
            return 70
        elif capability_mentions >= 1:
            return 40
        else:
            return 10

    def _analyze_parameter_documentation(self, content: str) -> int:
        """Analyze quality of parameter documentation."""
        # Look for parameter documentation patterns
        param_patterns = [
            r'@param\s+\{[^}]+\}\s+\w+',  # JSDoc style
            r'\*\*\w+\*\*.*\(.*\)',       # Bold parameter names with types
            r'`\w+`.*:.*\w+',             # Code-formatted parameters with descriptions
            r'\|\s*\w+\s*\|.*\|.*\|'      # Table format parameters
        ]
        
        param_count = sum(len(re.findall(pattern, content)) for pattern in param_patterns)
        
        # Also look for function/method definitions
        function_count = len(re.findall(r'function\s+\w+|\.[\w]+\(|\w+\s*\(', content))
        
        if function_count == 0:
            return 90  # No functions to document
        
        coverage_ratio = param_count / max(1, function_count)
        
        if coverage_ratio >= 1.0:
            return 100
        elif coverage_ratio >= 0.5:
            return 80
        elif coverage_ratio >= 0.25:
            return 60
        else:
            return 30

    def _analyze_architectural_boundaries(self, content: str) -> int:
        """Check for explanations of architectural boundaries between iframe and sandbox."""
        boundary_explanations = [
            r'iframe.*cannot.*access',
            r'sandbox.*isolated',
            r'communication.*between.*iframe.*sandbox',
            r'boundary.*between',
            r'security.*boundary',
            r'cross.*frame.*communication'
        ]
        
        explanation_count = sum(len(re.findall(pattern, content, re.IGNORECASE)) for pattern in boundary_explanations)
        
        if explanation_count >= 3:
            return 100
        elif explanation_count >= 1:
            return 70
        else:
            return 30

    def _analyze_searchability(self, content: str, metadata: Dict, file_path: str) -> Dict[str, Any]:
        """Analyze searchability and metadata richness."""
        # Enhanced metadata analysis
        metadata_score = self._analyze_metadata_richness(metadata)
        
        # Look for LLM FAQs
        llm_faq_score = self._analyze_llm_faq_presence(content)
        
        # Cross-reference analysis
        cross_ref_score = self._analyze_cross_references(content)
        
        # URL semantics analysis
        url_score = self._analyze_url_semantics(file_path)
        
        return {
            'metadata_richness': metadata_score,
            'llm_faq_presence': llm_faq_score,
            'cross_reference_completeness': cross_ref_score,
            'url_semantics': url_score
        }

    def _analyze_metadata_richness(self, metadata: Dict) -> int:
        """Analyze richness of frontmatter metadata."""
        if not metadata:
            return 20
            
        score = 100
        required_fields = ['title', 'description']
        recommended_fields = ['tags', 'keywords', 'intent', 'difficulty', 'category']
        
        # Check required fields
        for field in required_fields:
            if field not in metadata or not metadata[field]:
                score -= 25
                
        # Check recommended fields
        present_recommended = sum(1 for field in recommended_fields if field in metadata and metadata[field])
        score += min(25, present_recommended * 5)  # Up to 25 bonus points
        
        return max(0, min(100, score))

    def _analyze_llm_faq_presence(self, content: str) -> int:
        """Look for embedded Q&A sections that help LLM training."""
        faq_patterns = [
            r'<!-- llm-faq-start',
            r'## FAQ',
            r'### Frequently Asked Questions',
            r'Q:.*A:',
            r'\*\*Q:\*\*.*\*\*A:\*\*'
        ]
        
        faq_indicators = sum(len(re.findall(pattern, content, re.IGNORECASE)) for pattern in faq_patterns)
        
        if faq_indicators >= 3:  # Multiple Q&A pairs
            return 100
        elif faq_indicators >= 1:  # Some FAQ content
            return 70
        else:
            return 20

    def _analyze_cross_references(self, content: str) -> int:
        """Analyze quality and completeness of cross-references."""
        # Count internal links
        internal_links = len(re.findall(r'\[([^\]]+)\]\((?!http)([^)]+)\)', content))
        
        # Count API method references that should link to docs
        api_references = len(re.findall(r'`[\w\.]+\(\)`|`[\w\.]+\.[\w]+`', content))
        
        # Look for "see also" sections
        see_also_sections = len(re.findall(r'see also|related|references', content, re.IGNORECASE))
        
        base_score = min(100, internal_links * 5)  # 5 points per internal link
        
        if see_also_sections > 0:
            base_score += 20
            
        # Bonus for linking API references
        if api_references > 0 and internal_links > 0:
            link_ratio = internal_links / api_references
            if link_ratio >= 0.5:  # At least half of API refs are linked
                base_score += 15
                
        return min(100, base_score)

    def _analyze_url_semantics(self, file_path: str) -> int:
        """Analyze if URLs are semantic and descriptive."""
        path_parts = Path(file_path).parts
        
        # Look for semantic naming patterns
        semantic_indicators = 0
        
        for part in path_parts:
            # Good indicators
            if re.match(r'[a-z]+[-_][a-z]+', part):  # kebab-case or snake_case
                semantic_indicators += 1
            elif part in ['how-to', 'getting-started', 'tutorials', 'api-reference']:
                semantic_indicators += 2
            elif part.startswith('index') or re.match(r'\d+', part):  # Generic names
                semantic_indicators -= 1
                
        # Score based on semantic richness
        if semantic_indicators >= 3:
            return 100
        elif semantic_indicators >= 1:
            return 80
        elif semantic_indicators >= 0:
            return 60
        else:
            return 40

    def _analyze_consistency(self, content: str) -> Dict[str, Any]:
        """Analyze consistency with focus on Adobe Express terminology."""
        # Enhanced terminology analysis with disambiguation
        terminology_score = self._analyze_terminology_disambiguation(content)
        
        # API naming pattern consistency
        api_naming_score = self._analyze_api_naming_patterns(content)
        
        # General formatting consistency
        formatting_score = self._analyze_formatting_consistency(content)
        
        return {
            'terminology_disambiguation': terminology_score,
            'api_naming_patterns': api_naming_score,
            'formatting_standards': formatting_score
        }

    def _analyze_terminology_disambiguation(self, content: str) -> int:
        """Analyze if ambiguous terms like 'context' are properly disambiguated."""
        # Find all instances of potentially confusing terms
        confusing_terms = {
            'context': [
                r'iframe context',
                r'document.*context',
                r'editor\.context',
                r'UI.*context',
                r'sandbox.*context'
            ]
        }
        
        disambiguation_score = 100
        
        for term, disambiguation_patterns in confusing_terms.items():
            # Count total mentions of the term
            total_mentions = len(re.findall(rf'\b{term}\b', content, re.IGNORECASE))
            
            if total_mentions == 0:
                continue  # No mentions to disambiguate
                
            # Count disambiguated mentions
            disambiguated_mentions = sum(
                len(re.findall(pattern, content, re.IGNORECASE)) 
                for pattern in disambiguation_patterns
            )
            
            # Calculate disambiguation ratio
            if total_mentions > 0:
                disambiguation_ratio = disambiguated_mentions / total_mentions
                if disambiguation_ratio < 0.5:  # Less than half are disambiguated
                    disambiguation_score -= 30
                elif disambiguation_ratio < 0.8:  # Less than 80% are disambiguated
                    disambiguation_score -= 15
                    
        return max(0, disambiguation_score)

    def _analyze_api_naming_patterns(self, content: str) -> int:
        """Check for consistent API naming conventions."""
        # Look for camelCase consistency
        camelcase_apis = re.findall(r'\b[a-z][a-zA-Z0-9]*(?:\.[a-z][a-zA-Z0-9]*)*\(', content)
        
        # Look for inconsistent patterns
        inconsistent_patterns = [
            r'\b[A-Z][a-zA-Z0-9]*\(',  # PascalCase function calls (should be methods)
            r'\b[a-z]+_[a-z]+\(',      # snake_case function calls
            r'\b[A-Z_]+\(',            # SCREAMING_SNAKE_CASE
        ]
        
        inconsistent_count = sum(len(re.findall(pattern, content)) for pattern in inconsistent_patterns)
        
        if len(camelcase_apis) == 0:
            return 90  # No APIs to check
            
        consistency_ratio = 1 - (inconsistent_count / max(1, len(camelcase_apis)))
        return int(consistency_ratio * 100)

    def _analyze_formatting_consistency(self, content: str) -> int:
        """Check for consistent markdown formatting."""
        score = 100
        
        # Check for consistent list formatting
        bullet_styles = set(re.findall(r'^(\*|\-|\+) ', content, re.MULTILINE))
        if len(bullet_styles) > 1:
            score -= 15  # Mixed bullet styles
            
        # Check for consistent emphasis
        bold_styles = set(re.findall(r'(\*\*|__)', content))
        if len(bold_styles) > 1:
            score -= 10  # Mixed bold styles
            
        # Check for consistent code formatting
        inline_code_styles = set(re.findall(r'(`[^`]+`)', content))
        if len(inline_code_styles) > 1:
            backtick_count = Counter(style.count('`') for style in inline_code_styles)
            if len(backtick_count) > 1 and max(backtick_count.values()) < len(inline_code_styles) * 0.8:
                score -= 10  # Inconsistent inline code formatting
            
        return max(0, score)

    def _analyze_express_specific_issues(self, content: str) -> Dict[str, Any]:
        """Analyze Adobe Express specific documentation issues."""
        # Context term confusion analysis
        context_confusion_score = self._analyze_context_term_confusion(content)
        
        # API boundary confusion detection
        api_boundary_score = self._analyze_api_boundary_confusion(content)
        
        # Tutorial chunkability analysis
        tutorial_chunk_score = self._analyze_tutorial_chunkability(content)
        
        return {
            'context_term_confusion': context_confusion_score,
            'api_boundary_confusion': api_boundary_score,
            'tutorial_chunkability': tutorial_chunk_score
        }

    def _analyze_context_term_confusion(self, content: str) -> int:
        """Specific analysis for 'context' term confusion in Adobe Express docs."""
        context_patterns = self.express_patterns.get('context_confusion_indicators', [])
        
        # Count different types of context usage
        context_usage = {}
        for pattern in context_patterns:
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            if matches > 0:
                context_usage[pattern] = matches
                
        # If multiple different context meanings are used, check for disambiguation
        if len(context_usage) <= 1:
            return 100  # No confusion possible
            
        # Look for disambiguation indicators
        disambiguation_indicators = [
            r'refers to',
            r'means',
            r'specifically',
            r'in this context',
            r'not to be confused',
            r'different from'
        ]
        
        disambiguation_count = sum(len(re.findall(indicator, content, re.IGNORECASE)) 
                                 for indicator in disambiguation_indicators)
        
        # Score based on disambiguation effort
        confusion_level = len(context_usage)
        if disambiguation_count >= confusion_level:
            return 90  # Well disambiguated
        elif disambiguation_count > 0:
            return 70  # Some disambiguation
        else:
            return 30  # Multiple meanings without disambiguation

    def _analyze_api_boundary_confusion(self, content: str) -> int:
        """Detect mixing of iframe and sandbox APIs without proper context."""
        # Look for iframe-side APIs
        iframe_patterns = [r'addOnUISdk', r'\.createRenditions\(', r'\.addImage\(']
        iframe_matches = sum(len(re.findall(pattern, content)) for pattern in iframe_patterns)
        
        # Look for document sandbox APIs
        sandbox_patterns = [r'express-document-sdk', r'editor\.', r'\.createRectangle\(', r'\.createEllipse\(']
        sandbox_matches = sum(len(re.findall(pattern, content)) for pattern in sandbox_patterns)
        
        # If both are present, check for proper context annotations
        if iframe_matches > 0 and sandbox_matches > 0:
            context_annotations = [
                r'// CONTEXT:',
                r'<InlineAlert',
                r'iframe.*context',
                r'sandbox.*context',
                r'UI SDK',
                r'Document API'
            ]
            
            annotation_count = sum(len(re.findall(pattern, content, re.IGNORECASE)) 
                                 for pattern in context_annotations)
            
            if annotation_count >= 2:  # Good annotation
                return 100
            elif annotation_count >= 1:  # Some annotation
                return 70
            else:
                return 20  # Mixing without annotation
        else:
            return 100  # No mixing, no problem

    def _analyze_tutorial_chunkability(self, content: str) -> int:
        """Analyze if tutorials are broken into appropriate chunks."""
        # This builds on the content chunking analysis but focuses on tutorial-specific issues
        if 'tutorial' not in content.lower() and len(content.split()) < 1000:
            return 100  # Not a tutorial or short content
            
        # For tutorial content, apply stricter chunking requirements
        sections = re.split(r'\n## |\n### ', content)
        
        problematic_sections = 0
        total_sections = 0
        
        for section in sections:
            if len(section.strip()) < 50:  # Skip very short sections
                continue
                
            total_sections += 1
            word_count = len(section.split())
            
            # For tutorials, sections should be even smaller (<=300 words for better chunking)
            if word_count > 500:
                problematic_sections += 1
            elif word_count > 300:
                problematic_sections += 0.5
                
        if total_sections == 0:
            return 80
            
        chunk_score = 100 - (problematic_sections / total_sections * 100)
        return max(0, int(chunk_score))

    def _calculate_weighted_score(self, results: Dict[str, Any]) -> float:
        """Calculate weighted overall score based on configuration."""
        weights = self.config.get('scoring_weights', {})
        total_score = 0
        total_weight = 0
        
        # Calculate score for each category
        for category, weight in weights.items():
            if category in results and isinstance(results[category], dict):
                category_scores = []
                category_weights = []
                
                for subcategory, score in results[category].items():
                    if isinstance(score, (int, float)):
                        category_scores.append(score)
                        # Get subcategory weight from config if available
                        subcategory_weight = self._get_subcategory_weight(category, subcategory)
                        category_weights.append(subcategory_weight)
                
                if category_scores:
                    # Weighted average of subcategory scores
                    if category_weights and sum(category_weights) > 0:
                        category_score = sum(s * w for s, w in zip(category_scores, category_weights)) / sum(category_weights)
                    else:
                        category_score = statistics.mean(category_scores)
                    
                    total_score += category_score * weight
                    total_weight += weight
        
        return total_score / total_weight if total_weight > 0 else 0

    def _get_subcategory_weight(self, category: str, subcategory: str) -> float:
        """Get subcategory weight from configuration."""
        try:
            criteria = self.config.get('scoring_criteria', {}).get(category, {}).get(subcategory, {})
            return criteria.get('weight', 1.0)
        except:
            return 1.0

    def _collect_issues(self, results: Dict[str, Any]) -> List[str]:
        """Collect specific issues found during analysis."""
        issues = []
        
        # Structure issues
        structure = results.get('structure_clarity', {})
        if structure.get('heading_hierarchy', 100) < 70:
            issues.append("Inconsistent heading hierarchy - avoid skipping heading levels")
        if structure.get('long_paragraphs_count', 0) > 3:
            issues.append(f"Found {structure['long_paragraphs_count']} overly long paragraphs (>8 sentences)")
        if structure.get('content_chunking', 100) < 70:
            issues.append("Content sections too long for effective RAG chunking (>400 words)")
        
        # Code example issues
        code = results.get('code_examples', {})
        if code.get('example_completeness', 100) < 70:
            issues.append("Code examples missing imports, setup, or variable declarations")
        if code.get('variable_naming_consistency', 100) < 80:
            issues.append("Inconsistent variable naming (addOnUISdk vs addOnSdk vs sdk)")
        if code.get('context_annotation', 100) < 70:
            issues.append("Code examples missing context annotations (iframe vs sandbox)")
        # Only flag error handling issues if there are code examples with risky operations
        if code.get('error_handling_patterns', 100) < 50 and code.get('total_code_blocks', 0) > 0:
            issues.append("Code examples with API operations missing error handling patterns (try/catch)")
        
        # API documentation issues
        api = results.get('api_documentation', {})
        if api.get('api_context_clarity', 100) < 70:
            issues.append("API context (iframe vs sandbox) not clearly explained")
        if api.get('capability_matrices', 100) < 50:
            issues.append("Missing capability matrices showing supported/unsupported features")
        
        # Searchability issues
        search = results.get('searchability', {})
        if search.get('metadata_richness', 100) < 60:
            issues.append("Frontmatter metadata incomplete (missing title, description, tags)")
        if search.get('llm_faq_presence', 100) < 30:
            issues.append("No embedded FAQ section for LLM semantic training")
        
        # Adobe Express specific issues
        express = results.get('express_specific_issues', {})
        if express.get('context_term_confusion', 100) < 70:
            issues.append("Term 'context' used ambiguously without disambiguation")
        if express.get('api_boundary_confusion', 100) < 70:
            issues.append("Mixing iframe and sandbox APIs without proper context annotation")
        if express.get('tutorial_chunkability', 100) < 70:
            issues.append("Tutorial sections too long for effective semantic chunking")
        
        return issues

    def analyze_directory(self, directory_path: str) -> Dict[str, Any]:
        """Analyze all markdown files in a directory."""
        results = []
        
        # Find all markdown files using direct directory traversal
        # This is more reliable than complex pattern matching
        markdown_files = []
        
        if os.path.isfile(directory_path) and directory_path.endswith('.md'):
            # Single file specified
            markdown_files = [directory_path]
        else:
            # Directory specified - find all .md files recursively
            for root, dirs, files in os.walk(directory_path):
                # Skip hidden directories and common excludes
                dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'img', 'images']]
                
                for file in files:
                    if file.endswith('.md') and not file.startswith('.'):
                        markdown_files.append(os.path.join(root, file))
        
        # Remove duplicates and sort
        markdown_files = sorted(list(set(markdown_files)))
        
        print(f"Found {len(markdown_files)} markdown files to analyze...")
        
        # Analyze each file
        for i, file_path in enumerate(markdown_files, 1):
            print(f"Analyzing {i}/{len(markdown_files)}: {os.path.relpath(file_path)}")
            result = self.analyze_file(file_path)
            results.append(result)
        
        # Calculate summary statistics
        scores = [r['score'] for r in results if 'score' in r and r['score'] > 0]
        
        summary = {
            'total_files': len(results),
            'analyzed_files': len(scores),
            'average_score': statistics.mean(scores) if scores else 0,
            'median_score': statistics.median(scores) if scores else 0,
            'min_score': min(scores) if scores else 0,
            'max_score': max(scores) if scores else 0,
            'files_below_threshold': len([s for s in scores if s < self.config.get('target_scores', {}).get('minimum_overall', 75)]),
            'detailed_results': results
        }
        
        # Category-specific statistics
        categories = ['structure_clarity', 'code_examples', 'api_documentation', 'searchability', 'consistency', 'express_specific_issues']
        category_stats = {}
        
        for category in categories:
            category_scores = []
            for result in results:
                if category in result and isinstance(result[category], dict):
                    # Average the subcategory scores
                    subcategory_scores = [v for v in result[category].values() if isinstance(v, (int, float))]
                    if subcategory_scores:
                        category_scores.append(statistics.mean(subcategory_scores))
            
            if category_scores:
                category_stats[category] = {
                    'average': statistics.mean(category_scores),
                    'min': min(category_scores),
                    'max': max(category_scores)
                }
        
        summary['category_statistics'] = category_stats
        
        # Collect all issues
        all_issues = []
        for result in results:
            if 'issues' in result:
                all_issues.extend(result['issues'])
        
        # Count issue frequency
        issue_frequency = Counter(all_issues)
        summary['common_issues'] = dict(issue_frequency.most_common(10))
        summary['total_issues'] = len(all_issues)
        
        return summary

def main():
    parser = argparse.ArgumentParser(description='Analyze documentation for LLM readiness')
    parser.add_argument('directory', help='Directory containing markdown files to analyze')
    parser.add_argument('--config', default='config/audit-rubric.yaml', help='Configuration file path')
    parser.add_argument('--output', help='Output JSON file path')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    analyzer = DocumentationAnalyzer(args.config)
    results = analyzer.analyze_directory(args.directory)
    
    # Print summary
    print("\n" + "="*60)
    print("DOCUMENTATION ANALYSIS SUMMARY")
    print("="*60)
    print(f"Total files analyzed: {results['analyzed_files']}/{results['total_files']}")
    print(f"Average score: {results['average_score']:.1f}/100")
    print(f"Files below threshold: {results['files_below_threshold']}")
    print(f"Total issues found: {results['total_issues']}")
    
    print(f"\nCategory Averages:")
    for category, stats in results.get('category_statistics', {}).items():
        print(f"  {category}: {stats['average']:.1f}/100")
    
    print(f"\nMost Common Issues:")
    for issue, count in list(results.get('common_issues', {}).items())[:5]:
        print(f"  • {issue} ({count} files)")
    
    if args.verbose:
        print(f"\nDetailed Results:")
        for result in results['detailed_results']:
            if 'score' in result:
                print(f"  {os.path.relpath(result['file_path'])}: {result['score']:.1f}/100")
                if result.get('issues'):
                    for issue in result['issues'][:3]:  # Show first 3 issues
                        print(f"    - {issue}")
    
    # Save to file if requested
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nDetailed results saved to: {args.output}")

if __name__ == '__main__':
    main() 