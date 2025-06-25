# LLM-Optimized Vale Rules for Adobe Express Add-ons Documentation

This directory contains Vale rules specifically designed to identify areas in the Adobe Express Add-ons documentation that need improvement for better consumption by Large Language Models (LLMs).

## Overview

These rules are based on comprehensive analysis and audit findings that identified key issues preventing LLMs from accurately understanding and retrieving information from the Express Add-ons documentation. The rules target the most impactful improvements needed for optimal LLM indexing and comprehension.

## High-Impact Rules (Critical for LLM Understanding)

### 1. APIContext.yml
**Purpose**: Detects potential API context confusion between iframe SDK and Document APIs.  
**Why Critical**: This is the single most confusing aspect that causes LLMs to provide incorrect guidance about which API to use in which context.  
**Detects**: 
- `addOnUISdk.app.document` usage without proper context
- Missing context clarification between iframe and Document Sandbox

### 2. CapabilityMatrix.yml
**Purpose**: Identifies missing API capability information.  
**Why Critical**: Prevents LLM assumptions about what works where (e.g., maskShape only available on GroupNode).  
**Detects**: 
- Methods/properties without supported/unsupported information
- Missing availability details for different contexts

### 3. TerminologyConsistency.yml
**Purpose**: Enforces consistent terminology usage.  
**Why Critical**: Inconsistent terminology confuses LLMs about whether different terms refer to the same concept.  
**Detects**: 
- Inconsistent spelling of "add-on" vs "addon"
- API vs api, SDK vs sdk inconsistencies
- Context terminology variations

## Code Quality Rules

### 4. CodeExamples.yml
**Purpose**: Identifies incomplete or inconsistent code examples.  
**Why Important**: LLMs learn from patterns - inconsistent examples lead to hallucinated code.  
**Detects**: 
- Missing import statements
- Code without error handling
- Incomplete initialization

### 5. InheritanceFlattening.yml
**Purpose**: Identifies API references that need inheritance flattening.  
**Why Important**: LLMs struggle to traverse multiple pages to understand full API capabilities.  
**Detects**: 
- Class inheritance chains without flattened documentation
- Missing "all available methods" sections

## Content Structure Rules

### 6. StructuredContent.yml
**Purpose**: Detects missing structured content elements.  
**Why Important**: Improves LLM parsing and chunk retrieval accuracy.  
**Detects**: 
- Missing "What You'll Learn" sections
- Missing "Prerequisites" sections
- Missing "Quick Answer" sections

### 7. CrossReferences.yml
**Purpose**: Identifies missing cross-references between related concepts.  
**Why Important**: Helps LLMs understand relationships between concepts.  
**Detects**: 
- Missing links between related API methods
- Missing references to parent/child classes

### 8. DecisionMatrices.yml
**Purpose**: Identifies places where decision matrices should be provided.  
**Why Important**: Enables LLMs to give definitive recommendations.  
**Detects**: 
- Choice scenarios without clear guidance (Code Playground vs CLI)
- Missing "if/when/choose" criteria

## Content Organization Rules

### 9. ContentChunking.yml
**Purpose**: Detects overly long content sections.  
**Why Important**: Improves vector retrieval precision by ensuring optimal chunk sizes.  
**Detects**: 
- Content sections longer than 1000 characters without breaks

### 10. AmbiguousReferences.yml
**Purpose**: Identifies ambiguous terms that could confuse LLMs.  
**Why Important**: The word "context" has multiple meanings in Express Add-ons.  
**Detects**: 
- "context" without clarification
- "document" without API specification
- Generic terms needing qualification

## Enhanced Documentation Rules

### 11. LLMFAQ.yml
**Purpose**: Identifies pages that would benefit from LLM-specific FAQ sections.  
**Why Important**: Provides explicit Q&A for common LLM confusion points.  
**Detects**: 
- API/tutorial pages without FAQ sections
- Confusion-prone topics without explicit clarification

### 12. ErrorScenarios.yml
**Purpose**: Identifies missing error scenarios and troubleshooting information.  
**Why Important**: Enables LLMs to provide better troubleshooting assistance.  
**Detects**: 
- Error mentions without solutions
- API methods without error handling examples

## Updated Core Rules

### 13. Metadata.yml (Enhanced)
**Purpose**: Ensures comprehensive metadata for LLM optimization.  
**Enhanced with**: 
- `api_domain` (UI SDK, Document API, Communication API)
- `complexity` (beginner, intermediate, advanced)
- `estimated_time`
- `context` (iframe vs Document Sandbox)
- `related_concepts`

### 14. Headings.yml (Fixed)
**Purpose**: Ensures proper heading hierarchy for better LLM parsing.  
**Fixed to**: Detect heading level skipping (H1→H3 instead of H1→H2→H3)

## Usage Examples

### Running Rules on Specific Files
```bash
# Test specific file
vale src/pages/guides/getting_started/hello-world.md

# Test API references
vale src/pages/references/document-sandbox/document-apis/classes/RectangleNode.md

# Test all guides
vale src/pages/guides/
```

### Understanding Rule Priorities
- **Error Level**: Critical issues (APIContext, CapabilityMatrix, Metadata)
- **Warning Level**: Important improvements (TerminologyConsistency, InheritanceFlattening)
- **Suggestion Level**: Enhancement opportunities (StructuredContent, LLMFAQ)

## Expected Improvements

These rules collectively address the top 5 high-impact improvements identified in the LLM readiness audit:

1. **API Context Disambiguation** - Eliminates confusion between iframe and Document APIs
2. **Capability Matrices** - Prevents incorrect assumptions about API availability
3. **Code Standardization** - Improves pattern recognition for LLMs
4. **Structured Content** - Enhances chunk retrieval accuracy
5. **Cross-References** - Builds better conceptual understanding

## Integration with Documentation Workflow

These rules should be run:
- **Before publishing** any new documentation
- **During regular audits** of existing content
- **When updating API references** to ensure flattened inheritance
- **After adding new code examples** to verify completeness

The goal is to make Adobe Express Add-ons documentation the gold standard for LLM-optimized developer documentation. 