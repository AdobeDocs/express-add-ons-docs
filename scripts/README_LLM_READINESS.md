# LLM Readiness Framework

## `llm_readiness_analyzer.py` script

**Purpose**: Provides quantitative scoring (0.0-1.0) of overall documentation quality for LLM systems, with real user query validation and comprehensive analysis.

**What it analyzes**:
- **Context Clarity Score**: How well docs distinguish UI vs Sandbox environments
- **Code Completeness Ratio**: Percentage of complete vs incomplete code examples
- **Error Coverage**: Whether error-first documentation exists
- **Q&A Format Detection**: Use of question-answer structures
- **Progressive Structure**: Learning progression from basic to advanced
- **Searchability**: How well content matches common search patterns
- **Cross-References**: Navigation and linking between related topics
- **Real Query Coverage**: Tests against actual user questions from session data

**Scoring Weights**:
```
- Context Clarity: 25%        # Clear UI vs Sandbox distinction
- Code Completeness: 20%      # Complete working examples  
- Error Coverage: 15%         # Error-first documentation
- Q&A Format: 15%            # Question-answer structure
- Progressive Structure: 10%  # Learning progression
- Searchability: 10%         # LLM searchability
- Cross-References: 5%       # Navigation and linking
```

**Output Format**: Numeric scores with category breakdowns, file-level analysis, and strategic recommendations.

---

## 🚀 **Quick Start**

### Prerequisites
```bash
cd express-add-ons-docs
pip install -r requirements.txt
```

### Basic Analysis
```bash
# Analyze all documentation files
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/

# Focus on specific directory
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/guides/learn/how_to/

# Analyze a single file
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/guides/learn/how_to/use_text.md
```

The analysis is saved in a `doc_audit_report.json` file in the root of the project by the default. Use the `--output` flag to save to a different file.

### Save output to a specific JSON file
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages --output my_report.json
```

### Use baseline report for comparison
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages --baseline --output baseline_report.json
```

### Compare to baseline report
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages --compare baseline_report.json
```

---

## 📊 **Console Output Examples**

### Standard Analysis Output
```
🔍 Auditing documentation in: src/pages/
📄 Found 204 markdown files
   Analyzing: guides/learn/how_to/use_text.md
   Analyzing: guides/learn/how_to/group_elements.md
   ...

============================================================
📋 ADOBE EXPRESS ADD-ONS DOCUMENTATION AUDIT SUMMARY
============================================================
📁 Files analyzed: 204
🎯 Overall LLM-Readiness Score: 0.42/1.00

📊 CATEGORY SCORES:
   ❌ Context Clarity: 0.23
   ❌ Code Completeness: 0.34  
   ❌ Error Coverage: 0.15
   ⚠️ Q&A Format: 0.45
   ✅ Progressive Structure: 0.72
   ✅ Searchability: 0.81
   ⚠️ Cross References: 0.58

🔍 QUERY PATTERN COVERAGE:
   ✅ Text Manipulation: 85.2%
   ⚠️ Image Handling: 67.3%
   ❌ Architecture Clarity: 34.1%
   ✅ UI Development: 78.9%

🚨 CRITICAL ISSUES:
   ❌ 23 files contain non-existent API methods
   ❌ 156 files lack clear UI vs Sandbox context
   ❌ 189 files lack error-first documentation

💡 TOP RECOMMENDATIONS:
   ➤ Priority: Add UI Runtime vs Document Sandbox context headers
   ➤ Priority: Remove AI misinformation (setSize, createPage methods)
   ➤ Medium: Convert documentation to Q&A format for better LLM training
   ➤ Medium: Add error-first documentation sections
   ➤ Low: Improve cross-references between related topics

🔗 Baseline hash: a7b2c9f1...
============================================================
```

---

## 🎯 **Score Interpretation Guide**

### Overall LLM-Readiness Score
- **0.8-1.0**: 🟢 **Excellent** - Ready for LLM training, minimal issues
- **0.6-0.8**: 🟡 **Good** - Minor improvements needed, mostly functional
- **0.4-0.6**: 🟠 **Fair** - Significant improvements needed for LLM use
- **0.2-0.4**: 🔴 **Poor** - Major restructuring required
- **0.0-0.2**: ⚫ **Critical** - Complete rewrite recommended

### Category Score Benchmarks
| Category | Excellent (0.8+) | Good (0.6-0.8) | Needs Work (<0.6) |
|----------|-------------------|-----------------|-------------------|
| **Context Clarity** | Clear UI/Sandbox headers | Some context | Missing context |
| **Code Completeness** | 80%+ complete examples | 60-80% complete | <60% complete |
| **Error Coverage** | Error-first docs | Some error info | No error docs |
| **Q&A Format** | Q&A structured | Some Q&A | No Q&A format |

---

## 🔧 **Advanced Usage**

### Baseline Comparison
```bash
# Create baseline for future comparison
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --baseline --output baseline_audit.json

# Compare with previous audit
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --compare baseline_audit.json
```

**Comparison Output:**
```
🔄 COMPARISON WITH PREVIOUS AUDIT:
   Score change: 0.487 → 0.423 (-0.064)
   context_clarity: +0.156
   code_completeness: -0.089
   error_coverage: +0.234
   qa_format: -0.045
```


---

## 📁 **Output Files**

### JSON Report Structure
```json
{
  "timestamp": "2024-01-27T15:30:45",
  "total_files": 204,
  "overall_score": 0.42,
  "category_scores": {
    "context_clarity": 0.23,
    "code_completeness": 0.34,
    "error_coverage": 0.15
  },
  "query_pattern_coverage": {
    "text_manipulation": 0.852,
    "image_handling": 0.673
  },
  "file_analyses": [
    {
      "file_path": "guides/learn/how_to/use_text.md",
      "llm_friendly_score": 0.56,
      "context_clarity_score": 0.12,
      "issues": ["More incomplete code examples than complete ones"],
      "recommendations": ["Add clear UI Runtime vs Document Sandbox context headers"]
    }
  ]
}
```

## 📈 **Next Steps After Analysis**

### Score 0.0-0.4 (Critical/Poor)
1. **Focus on context clarity**: Add UI/Sandbox headers
2. **Fix AI misinformation**: Remove fake API methods
3. **Re-run analysis**: Track improvement

### Score 0.4-0.6 (Fair)
1. **Complete code examples**: Add missing imports/context
2. **Add error documentation**: Create troubleshooting sections
3. **Improve Q&A format**: Convert narrative to question-answer

### Score 0.6+ (Good/Excellent)
1. **Fine-tune optimization**: Focus on specific low-scoring categories
2. **Add advanced features**: Progressive learning paths
3. **Enhance cross-references**: Better navigation

---

## 🔍 **Understanding File-Level Analysis**

Each file receives detailed scoring:

```json
{
  "file_path": "guides/learn/how_to/use_text.md",
  "title": "Use Text",
  "word_count": 1247,
  "code_blocks": 8,
  "code_examples_complete": 3,
  "code_examples_incomplete": 5,
  "context_clarity_score": 0.12,
  "error_first_sections": 0,
  "qa_format_sections": 1,
  "cross_references": 4,
  "progressive_structure_score": 0.67,
  "searchability_score": 0.89,
  "llm_friendly_score": 0.56,
  "issues": [
    "More incomplete code examples than complete ones",
    "Uses editor API without queueAsyncEdit context"
  ],
  "recommendations": [
    "Add clear UI Runtime vs Document Sandbox context headers",
    "Add error-first documentation sections"
  ]
}
```

This granular data helps prioritize which files need attention first and what specific improvements to make. 