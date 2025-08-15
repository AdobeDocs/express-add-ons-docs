# 🧪 Adobe Express Add-ons Prompt Testing System

**Comprehensive testing framework for evaluating documentation quality through real developer queries and AI-powered analysis.**

---

## 📋 Overview

This testing system provides multiple approaches to evaluate Adobe Express Add-ons documentation quality, LLM-readiness, and developer experience through various prompt-based testing methodologies. Each tool serves a specific purpose in the documentation evaluation pipeline.

## 🎯 Quick Start

### Prerequisites
```bash
# Install required dependencies
pip install -r requirements-agentic.txt

# Navigate to the correct directory
cd express-add-ons-docs
```

### Basic Test Run
```bash
# Quick basic test (recommended starting point)
python3 scripts/prompt_only_basic_tester.py --docs-path src/pages --queries test_prompts/advanced_queries_test.json

# Ground truth validation
python3 scripts/ground_truth_tester.py --docs-path src/pages --queries test_prompts/labelled.yaml
```

---

## 🔧 Testing Tools Reference

### 🤖 **AI-Powered Query Testers**

#### 🚀 **Multi-Agent Tester** `prompt_only_multi_agent_tester.py`
**Advanced AI evaluation with specialized agents**

- **Purpose:** Comprehensive documentation evaluation using multiple AI agents
- **Use Case:** Deep quality assessment with agent orchestration
- **Input:** JSON queries (e.g., `unified_test_queries.json`)
- **Output:** Detailed multi-perspective analysis

```bash
python3 scripts/prompt_only_multi_agent_tester.py \
    --docs-path src/pages \
    --queries test_prompts/unified_test_queries.json \
    --openai-api-key $AZURE_OPENAI_KEY \
    --azure-config scripts/azure_config.json \
    --output multi_agent_evaluation.json
```

**Features:**
- 🎭 QueryAgent: Decomposes complex queries
- 🔍 SearchAgent: Intelligent document traversal  
- 📊 AssessmentAgent: Quality evaluation
- 🎨 SynthesisAgent: Final recommendations

---

#### 🧠 **LLM Query Tester** `prompt_only_llm_tester.py`
**Single LLM-powered documentation evaluation**

- **Purpose:** AI-driven query answering assessment
- **Use Case:** LLM readiness testing with single model
- **Input:** YAML/JSON queries
- **Output:** AI evaluation scores and gaps

```bash
python3 scripts/prompt_only_llm_tester.py \
    --docs-path src/pages \
    --queries test_prompts/llm-test-queries.yaml \
    --output llm_evaluation.json
```

**Key Metrics:**
- Query answerability scores
- Content gap identification
- LLM response quality assessment

---

### 📊 **Rule-Based Query Testers**

#### 🎯 **Basic Query Tester** `prompt_only_basic_tester.py`
**Fast rule-based documentation coverage testing**

- **Purpose:** Quick documentation coverage assessment
- **Use Case:** Rapid feedback on content availability
- **Input:** JSON queries with expected elements
- **Output:** Coverage scores and missing elements

```bash
python3 scripts/prompt_only_basic_tester.py \
    --docs-path src/pages \
    --queries test_prompts/unified_test_queries.json \
    --output basic_test_results.json
```

**Analysis Types:**
- ✅ Expected element coverage
- 📝 Content availability scoring
- 🔍 Keyword-based matching
- 📈 Category-wise performance

---

#### ✅ **Ground Truth Tester** `ground_truth_tester.py`
**Benchmark testing against verified Q&A pairs**

- **Purpose:** Validate against verified question-answer pairs
- **Use Case:** Measure accuracy against known correct answers
- **Input:** YAML with ground truth Q&A pairs (`labelled.yaml`)
- **Output:** Accuracy metrics and improvement tracking

```bash
python3 scripts/ground_truth_tester.py \
    --docs-path src/pages \
    --queries test_prompts/labelled.yaml \
    --output ground_truth_report.json
```

**Validation Features:**
- 🎯 Answer accuracy measurement
- 📊 Benchmark scoring
- 📈 Progress tracking over time
- 🔄 Regression detection

---

## 📁 Test Data Reference

### 📝 **Query Collections**

| File | Icon | Purpose | Format | Size |
|------|------|---------|---------|------|
| `unified_test_queries.json` | 🗂️ | **Master collection** - All queries consolidated | JSON | 3,600+ queries |
| `labelled.yaml` | ✅ | **Ground truth** - Verified Q&A pairs | YAML | 750+ pairs |
| `advanced_queries.yaml` | 🎓 | **Advanced scenarios** - Complex use cases | YAML | 30 queries |
| `llm-test-queries.yaml` | 🧠 | **LLM-specific** - AI evaluation focused | YAML | 500+ queries |
| `workflow_queries.yaml` | 🔄 | **Workflow-based** - Process-oriented | YAML | 80+ queries |

### 🎯 **Specialized Collections**

| File | Icon | Purpose | Description |
|------|------|---------|-------------|
| `benchmarking_prd_queries.md` | 📊 | **Benchmarking** | Production-ready test scenarios |
| `structured_query_data.json` | 🏗️ | **Structured data** | Categorized query metadata |
| `unlabelled_queries.yaml` | ❓ | **Unlabelled** | Raw queries for categorization |
| `INTROSPECTIVE_QUERIES_OVERVIEW.md` | 🤔 | **AI behavior** | Testing AI self-awareness |

---

## 🎛️ Configuration & Setup

### 🔑 **API Configuration**

#### Azure OpenAI Setup
```json
{
  "evaluator_llm": {
    "type": "azure_chat_openai",
    "args": {
      "azure_endpoint": "https://your-endpoint.openai.azure.com/",
      "openai_api_version": "2024-12-01-preview",
      "deployment_name": "gpt-4o",
      "temperature": 0.0,
      "max_tokens": 1600
    }
  }
}
```

#### Environment Variables
```bash
export AZURE_OPENAI_KEY="your-api-key"
export OPENAI_API_KEY="your-openai-key"  # Alternative
```

### ⚙️ **Common Parameters**

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `--docs-path` | Documentation directory | Required | `src/pages` |
| `--queries` | Query file path | Required | `test_prompts/unified_test_queries.json` |
| `--output` | Output file name | Script-specific | `evaluation_report.json` |
| `--azure-config` | Azure config file | None | `scripts/azure_config.json` |
| `--max-concurrent` | Parallel processing | 3 | `5` |

---

## 📊 Output Formats & Analysis

### 📄 **Report Types**

#### 🧠 **Multi-Agent Reports**
```
multi_agent_evaluation.json          # Detailed analysis
multi_agent_evaluation_summary.txt   # Human-readable summary
```

#### 📈 **Basic Test Reports**
```
basic_test_results.json              # Coverage analysis
basic_test_results_summary.txt       # Quick overview
```

#### ✅ **Ground Truth Reports**
```
ground_truth_report.json             # Validation results
ground_truth_report_summary.txt      # Accuracy metrics
```

### 📊 **Key Metrics Explained**

| Metric | Icon | Description | Range |
|--------|------|-------------|-------|
| **Coverage Score** | 🎯 | Content availability for queries | 0-1.0 |
| **Quality Score** | ⭐ | Documentation quality assessment | 0-1.0 |
| **Completeness** | ✅ | Information completeness | 0-1.0 |
| **Clarity Score** | 💡 | Content clarity and usability | 0-1.0 |
| **Confidence** | 🎪 | AI confidence in assessment | 0-1.0 |

---

## 🚀 Usage Workflows

### 🔄 **Development Workflow**

#### 1. **Quick Health Check** ⚡
```bash
# Fast coverage assessment
python3 scripts/prompt_only_basic_tester.py \
    --docs-path src/pages \
    --queries test_prompts/advanced_queries_test.json
```

#### 2. **Deep Quality Analysis** 🔬
```bash
# Comprehensive AI evaluation
python3 scripts/prompt_only_multi_agent_tester.py \
    --docs-path src/pages \
    --queries test_prompts/advanced_queries.json \
    --azure-config scripts/azure_config.json \
    --openai-api-key $AZURE_OPENAI_KEY
```

#### 3. **Benchmark Validation** ✅
```bash
# Ground truth accuracy check
python3 scripts/ground_truth_tester.py \
    --docs-path src/pages \
    --queries test_prompts/labelled.yaml
```

### 📋 **Testing Strategy**

#### **Phase 1: Rapid Assessment** ⚡
- Use `prompt_only_basic_tester.py` for quick feedback
- Focus on coverage gaps and missing content
- Fast iteration for content authors

#### **Phase 2: Quality Evaluation** 🎯  
- Deploy `prompt_only_llm_tester.py` for AI readiness
- Assess LLM response quality
- Identify clarity and completeness issues

#### **Phase 3: Comprehensive Analysis** 🔬
- Run `prompt_only_multi_agent_tester.py` for deep insights
- Multi-perspective evaluation
- Strategic recommendations

#### **Phase 4: Validation** ✅
- Use `ground_truth_tester.py` for benchmark accuracy
- Track improvements over time
- Regression detection

---

## 🎯 Best Practices

### 📝 **Query Development**

#### **Query Quality Guidelines**
- ✅ **Specific:** Focus on concrete developer tasks
- ✅ **Realistic:** Based on actual user scenarios  
- ✅ **Testable:** Include expected elements/outcomes
- ✅ **Categorized:** Proper tagging for analysis

#### **Example Well-Formed Query**
```json
{
  "query": "How do I create a custom text element with Adobe Fonts in the Document Sandbox?",
  "category": "text_manipulation",
  "subcategory": "fonts", 
  "priority": "high",
  "expected_elements": [
    "Document API usage",
    "Font loading methods",
    "Text node creation",
    "Error handling"
  ],
  "common_errors": [
    "Font loading failures",
    "Async operation issues"
  ]
}
```

### 🔧 **Testing Best Practices**

#### **Performance Optimization**
- 🚀 Start with small query sets (10-30 queries)
- ⚡ Use `--max-concurrent 3` for API rate limiting
- 📊 Monitor token usage with Azure OpenAI
- 🔄 Implement retry logic for API failures

#### **Result Analysis**
- 📈 Track trends over time, not just point-in-time scores
- 🎯 Focus on zero-coverage areas first
- 💡 Prioritize high-traffic query categories
- 🔍 Deep-dive into low confidence scores

### 📊 **Continuous Integration**

#### **Automated Testing Pipeline**
```bash
# Weekly comprehensive assessment
./scripts/run_full_evaluation.sh

# Daily quick checks  
python3 scripts/prompt_only_basic_tester.py --docs-path src/pages --queries test_prompts/advanced_queries_test.json

# Pre-release validation
python3 scripts/ground_truth_tester.py --docs-path src/pages --queries test_prompts/labelled.yaml
```

---

## 🔍 Troubleshooting

### ❌ **Common Issues**

#### **API Authentication Errors**
```bash
# Error: Azure OpenAI authentication failed
# Solution: Check API key and endpoint configuration
export AZURE_OPENAI_KEY="your-valid-key"
python3 scripts/prompt_only_multi_agent_tester.py --azure-config scripts/azure_config.json
```

#### **JSON Format Errors**
```bash
# Error: string indices must be integers, not 'str'
# Solution: Ensure JSON query format matches expected structure
# Check: queries should be a list, not nested under "queries" key
```

#### **Rate Limiting Issues**
```bash
# Error: Rate limit exceeded
# Solution: Reduce concurrent requests
python3 scripts/prompt_only_multi_agent_tester.py --max-concurrent 1
```

### 🛠️ **Performance Issues**

#### **Memory Usage**
- 📊 Large query sets (3000+) may require chunking
- 💾 Monitor memory usage with large documentation sets
- 🔄 Use file streaming for large result sets

#### **Speed Optimization**
- ⚡ Use rule-based testing (`basic_tester`) for rapid feedback
- 🎯 Reserve AI testing for final validation
- 📋 Batch similar queries for efficiency

---

## 📚 Related Documentation

### 🔗 **Primary References**
- 📖 [`README_Documentation_Audit_System.md`](README_Documentation_Audit_System.md) - Complete audit framework
- 🤖 [`README_Multi_Agent_Tester.md`](README_Multi_Agent_Tester.md) - Multi-agent system details
- 🎯 [`INTROSPECTIVE_QUERIES_OVERVIEW.md`](../test_prompts/INTROSPECTIVE_QUERIES_OVERVIEW.md) - AI behavior testing

### 🔧 **Related Tools**
- 📊 `doc_audit_runner_v2.py` - Document quality auditing
- 🔍 `llm_linter.py` - LLM-specific content analysis  
- 📈 `llm_readiness_analyzer.py` - Readiness assessment

---

## 🎯 Summary

The **Prompt Testing System** provides a comprehensive framework for evaluating Adobe Express Add-ons documentation through multiple methodologies:

- 🚀 **Multi-Agent Testing:** Deep AI-powered analysis
- 🧠 **LLM Testing:** Single-model evaluation  
- 🎯 **Basic Testing:** Fast rule-based coverage
- ✅ **Ground Truth Testing:** Benchmark validation

Each tool serves specific needs in the documentation quality pipeline, from rapid development feedback to comprehensive strategic analysis. Use the appropriate combination based on your testing requirements and available resources.

---

*For technical support or feature requests, refer to the individual script documentation or the main audit system README.*
