#!/usr/bin/env python3
"""
Content Classification for Smart Auditing

Classifies documentation files by type and content to apply appropriate auditing rules.
Prevents inappropriate code-focused rules from being applied to conceptual documentation.
"""

import re
from pathlib import Path
from typing import Dict, List, Set
from dataclasses import dataclass
from enum import Enum


class ContentType(Enum):
    """Types of documentation content"""
    TUTORIAL = "tutorial"           # Step-by-step coding guides
    CONCEPTUAL = "conceptual"       # Explanatory, setup, overview docs
    REFERENCE = "reference"         # API documentation, auto-generated
    TROUBLESHOOTING = "troubleshooting"  # FAQ, error guides
    SETUP = "setup"                 # Installation, configuration guides
    SAMPLES = "samples"             # Code examples, demos


class CodeIntensity(Enum):
    """How code-heavy the content is"""
    NONE = "none"                   # No code (concepts, setup instructions)
    MINIMAL = "minimal"             # Few code snippets (configuration examples)
    MODERATE = "moderate"           # Some code examples with explanations
    HEAVY = "heavy"                 # Primarily code with step-by-step tutorials


@dataclass
class ContentClassification:
    """Classification result for a documentation file"""
    content_type: ContentType
    code_intensity: CodeIntensity
    applicable_rules: Set[str]
    excluded_rules: Set[str]
    file_characteristics: Dict[str, any]


class ContentClassifier:
    """Classifies documentation content for smart auditing"""
    
    def __init__(self):
        self.rule_sets = self._define_rule_sets()
        
    def _define_rule_sets(self) -> Dict[str, Set[str]]:
        """Define which auditing rules apply to which content types"""
        return {
            # Code-focused rules (only for tutorials and heavy code content)
            'code_rules': {
                'context_clarity',           # UI Runtime vs Document Sandbox headers
                'code_completeness',         # Complete imports and examples
                'require-context-headers',   # Context headers for code blocks
                'complete-js-examples',      # Complete JavaScript examples
                'check-undefined-variables', # Variable definition checking
                'chunk-self-contained-examples'  # Self-contained code blocks
            },
            
            # Content structure rules (apply to all)
            'structure_rules': {
                'progressive_structure',     # Logical flow and organization
                'searchability',            # Headers and discoverability
                'cross_references',         # Links to related content
                'chunk-semantic-coherence'  # Logical content grouping
            },
            
            # Q&A optimization rules (lower priority for conceptual)
            'qa_rules': {
                'qa_format',                # Q&A format adoption
                'suggest-qa-format',        # Q&A format suggestions
                'chunk-qa-optimization'     # Content optimization for Q&A
            },
            
            # Error handling rules (only for tutorials and samples)
            'error_rules': {
                'error_coverage',           # Error documentation
                'suggest-error-sections'    # Error handling suggestions
            },
            
            # Setup/config rules (for setup and configuration docs)
            'setup_rules': {
                'require-file-indicators',  # File path indicators
                'suggest-progressive-structure'  # Step-by-step structure
            }
        }

    def classify_file(self, file_path: str, content: str) -> ContentClassification:
        """Classify a documentation file and determine applicable rules"""
        
        # Analyze file path patterns
        path_indicators = self._analyze_file_path(file_path)
        
        # Analyze content patterns
        content_analysis = self._analyze_content(content)
        
        # Determine content type
        content_type = self._determine_content_type(path_indicators, content_analysis)
        
        # Determine code intensity
        code_intensity = self._determine_code_intensity(content_analysis)
        
        # Generate applicable rules
        applicable_rules, excluded_rules = self._determine_applicable_rules(
            content_type, code_intensity, content_analysis
        )
        
        return ContentClassification(
            content_type=content_type,
            code_intensity=code_intensity,
            applicable_rules=applicable_rules,
            excluded_rules=excluded_rules,
            file_characteristics={
                **path_indicators,
                **content_analysis
            }
        )
    
    def _analyze_file_path(self, file_path: str) -> Dict[str, any]:
        """Analyze file path for content type indicators"""
        path = Path(file_path)
        path_str = str(path).lower()
        
        return {
            'is_tutorial': any(keyword in path_str for keyword in [
                'tutorial', 'how_to', 'learn', 'grids-addon', 'spectrum-workshop'
            ]),
            'is_reference': any(keyword in path_str for keyword in [
                'references', 'classes', 'interfaces', 'document-apis'
            ]),
            'is_setup': any(keyword in path_str for keyword in [
                'setup', 'getting_started', 'quickstart', 'local_development',
                'installation', 'configuration'
            ]),
            'is_troubleshooting': any(keyword in path_str for keyword in [
                'faq', 'troubleshooting', 'support', 'common-issues'
            ]),
            'is_samples': any(keyword in path_str for keyword in [
                'samples', 'examples', 'demos'
            ]),
            'filename': path.name
        }
    
    def _analyze_content(self, content: str) -> Dict[str, any]:
        """Analyze content for classification indicators"""
        lines = content.split('\n')
        
        # Count different types of content
        code_blocks = len(re.findall(r'```', content)) // 2
        js_blocks = len(re.findall(r'```(?:js|javascript)', content, re.IGNORECASE))
        json_blocks = len(re.findall(r'```json', content, re.IGNORECASE))
        
        # Count conceptual indicators
        concept_words = len(re.findall(r'\b(?:what is|overview|introduction|about|concept|explanation)\b', content, re.IGNORECASE))
        
        # Count setup indicators
        setup_words = len(re.findall(r'\b(?:install|setup|configure|prerequisite|requirement|configuration)\b', content, re.IGNORECASE))
        
        # Count API/SDK usage
        api_usage = len(re.findall(r'\b(?:editor\.|addOnUISdk|express-document-sdk|add-on-sdk)\b', content))
        
        return {
            'word_count': len(content.split()),
            'code_blocks': code_blocks,
            'js_blocks': js_blocks,
            'json_blocks': json_blocks,
            'concept_words': concept_words,
            'setup_words': setup_words,
            'api_usage': api_usage,
            'has_imports': bool(re.search(r'import .* from', content)),
            'has_api_methods': bool(re.search(r'editor\.create|editor\.make', content)),
            'code_to_text_ratio': (code_blocks * 100) / max(len(lines), 1)
        }
    
    def _determine_content_type(self, path_indicators: Dict, content_analysis: Dict) -> ContentType:
        """Determine the primary content type"""
        
        # Path-based classification (strongest indicator)
        if path_indicators['is_reference']:
            return ContentType.REFERENCE
        if path_indicators['is_troubleshooting']:
            return ContentType.TROUBLESHOOTING
        if path_indicators['is_samples']:
            return ContentType.SAMPLES
        
        # Content-based classification
        if content_analysis['setup_words'] > 5 or path_indicators['is_setup']:
            return ContentType.SETUP
        
        if content_analysis['api_usage'] > 5:
            return ContentType.TUTORIAL
        
        if content_analysis['concept_words'] > 3 or content_analysis['code_blocks'] < 2:
            return ContentType.CONCEPTUAL
        
        # Default fallback
        return ContentType.TUTORIAL if content_analysis['api_usage'] > 0 else ContentType.CONCEPTUAL
    
    def _determine_code_intensity(self, content_analysis: Dict) -> CodeIntensity:
        """Determine how code-heavy the content is"""
        
        js_blocks = content_analysis['js_blocks']
        api_usage = content_analysis['api_usage']
        
        if js_blocks == 0 and api_usage == 0:
            return CodeIntensity.NONE
        elif js_blocks <= 2 and api_usage <= 3:
            return CodeIntensity.MINIMAL
        elif js_blocks <= 5 or api_usage <= 10:
            return CodeIntensity.MODERATE
        else:
            return CodeIntensity.HEAVY
    
    def _determine_applicable_rules(self, content_type: ContentType, 
                                  code_intensity: CodeIntensity, 
                                  content_analysis: Dict) -> tuple[Set[str], Set[str]]:
        """Determine which rules should apply to this content"""
        
        applicable = set()
        excluded = set()
        
        # Always apply structure rules
        applicable.update(self.rule_sets['structure_rules'])
        
        # Apply code rules based on content type and code intensity
        if content_type in [ContentType.TUTORIAL, ContentType.SAMPLES] and code_intensity in [CodeIntensity.MODERATE, CodeIntensity.HEAVY]:
            applicable.update(self.rule_sets['code_rules'])
        else:
            excluded.update(self.rule_sets['code_rules'])
        
        # Apply error rules for tutorials and samples
        if content_type in [ContentType.TUTORIAL, ContentType.SAMPLES, ContentType.TROUBLESHOOTING]:
            applicable.update(self.rule_sets['error_rules'])
        else:
            excluded.update(self.rule_sets['error_rules'])
        
        # Apply Q&A rules with different priorities
        if content_type == ContentType.TROUBLESHOOTING:
            applicable.update(self.rule_sets['qa_rules'])  # High priority for FAQ files
        elif content_type in [ContentType.TUTORIAL, ContentType.SAMPLES]:
            applicable.update(self.rule_sets['qa_rules'])  # Medium priority for tutorials
        elif content_type == ContentType.CONCEPTUAL:
            # Lower priority for conceptual docs - only suggest, don't penalize heavily
            applicable.add('suggest-qa-format')
            excluded.update({'qa_format', 'chunk-qa-optimization'})
        
        # Apply setup rules for setup content
        if content_type == ContentType.SETUP:
            applicable.update(self.rule_sets['setup_rules'])
        
        return applicable, excluded


def classify_content(file_path: str, content: str) -> ContentClassification:
    """Convenience function to classify content"""
    classifier = ContentClassifier()
    return classifier.classify_file(file_path, content)


def main():
    """Test the content classifier"""
    import sys
    
    if len(sys.argv) != 2:
        print("Usage: python3 content_classifier.py <file_path>")
        return
    
    file_path = sys.argv[1]
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        classification = classify_content(file_path, content)
        
        print(f"📄 File: {file_path}")
        print(f"📋 Content Type: {classification.content_type.value}")
        print(f"💻 Code Intensity: {classification.code_intensity.value}")
        print(f"✅ Applicable Rules: {len(classification.applicable_rules)}")
        print(f"❌ Excluded Rules: {len(classification.excluded_rules)}")
        
        print(f"\n🔍 Characteristics:")
        for key, value in classification.file_characteristics.items():
            print(f"   {key}: {value}")
            
        print(f"\n✅ Should Apply:")
        for rule in sorted(classification.applicable_rules):
            print(f"   - {rule}")
            
        print(f"\n❌ Should Exclude:")
        for rule in sorted(classification.excluded_rules):
            print(f"   - {rule}")
    
    except FileNotFoundError:
        print(f"❌ File not found: {file_path}")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main() 