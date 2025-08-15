# 🧠 Simple LLM Documentation Tester
## Standalone Documentation Quality Evaluator

> **🚨 DIRECTORY REQUIREMENT:** You MUST run all commands from the `express-add-ons-docs` root directory!  
> **📁 Verify location:** Run `ls` and confirm you see: `scripts/`, `src/`, `test_prompts/`

**Purpose:** Evaluate documentation quality by having an LLM search through documentation files and answer real developer questions, then score the responses for quality and completeness.

---

## 🎯 What This Tool Does

The **Simple LLM Documentation Tester** simulates how developers would interact with documentation using basic LLM queries. It provides a straightforward approach to testing documentation without requiring specialized RAG systems, MCP frameworks, or RAGAS infrastructure.

### **🔍 Key Features:**
- **🧠 AI-Powered Search:** Uses Azure OpenAI to semantically search documentation
- **📊 Quality Scoring:** Evaluates answers on confidence, completeness, and accuracy
- **📝 Multiple Query Generation:** Creates varied search queries for comprehensive coverage
- **⚡ Simple Setup:** Minimal dependencies and configuration required
- **📈 Detailed Reporting:** Comprehensive JSON output with category breakdowns

---

## 🚀 Quick Start

### **Prerequisites**
```bash
# Python 3.8+ required
python3 --version

# Install required packages (choose one option):

# Option 1: Install ALL dependencies for complete functionality
pip install -r requirements-complete.txt

# Option 2: Install only what's needed for this tool
pip install openai>=1.10.0 PyYAML>=6.0

# Option 3: Minimal install (if you have issues)
pip install openai pyyaml
```

### **Environment Setup**
```bash
# Set your Azure OpenAI API key
export OPENAI_API_KEY="your-azure-openai-api-key"
```

### **Basic Usage**

> **⚠️ CRITICAL:** You MUST be in the `express-add-ons-docs` root directory to run these commands!

```bash
# 1. FIRST: Navigate to the project root directory
cd express-add-ons-docs

# 2. Run with default questions
python3 scripts/prompt_only_llm_tester.py

# 3. Run with custom questions
python3 scripts/prompt_only_llm_tester.py --questions test_prompts/workflow_queries.yaml

# 4. Specify documentation path and output
python3 scripts/prompt_only_llm_tester.py --docs-path src/pages --output my_evaluation.json
```

---

## ⚙️ Installation & Requirements

### **Required Dependencies**

**Option 1: Complete Installation (Recommended)**
```bash
# Install all dependencies for any script in scripts/ folder
pip install -r requirements-complete.txt
```

**Option 2: This Tool Only**
```bash
# Install only dependencies needed for LLM tester
pip install openai>=1.10.0 PyYAML>=6.0
```

**Option 3: Minimal (Troubleshooting)**
```bash
# If you encounter version conflicts
pip install openai pyyaml
```

### **System Requirements**
- **Python:** 3.8 or higher
- **Memory:** 2GB+ RAM (for large documentation sets)
- **Network:** Internet connection for Azure OpenAI API calls
- **Permissions:** Read access to documentation directory

### **Azure OpenAI Setup**
1. **Get API Key:** Obtain Azure OpenAI API key from Azure portal
2. **Note Endpoint:** Your Azure OpenAI endpoint URL
3. **Model Access:** Ensure you have access to GPT-4 models

---

## 🔧 Configuration Options

### **Command Line Arguments**

| Parameter | Default | Description | Example |
|-----------|---------|-------------|---------|
| `--questions` | Built-in questions | Path to YAML questions file | `test_prompts/workflow_queries.yaml` |
| `--docs-path` | `dist/git_repos/express-add-ons-docs/src/pages` | Documentation directory | `src/pages` |
| `--output` | `simple_eval_results.json` | Output file path | `my_results.json` |
| `--api-key` | `$OPENAI_API_KEY` | Azure OpenAI API key | `your-api-key` |
| `--azure-endpoint` | `https://extensibility-genai-general.openai.azure.com` | Azure endpoint | `https://your-endpoint.com` |
| `--model` | `gpt-4o` | Azure deployment name | `gpt-4-turbo` |
| `--max-questions` | All questions | Limit number of questions | `10` |

### **Complete Example**
```bash
python3 scripts/prompt_only_llm_tester.py \
    --questions test_prompts/workflow_queries.yaml \
    --docs-path src/pages \
    --output workflow_evaluation.json \
    --max-questions 20 \
    --model gpt-4o
```

---

## 📝 Input Formats

### **YAML Questions Format**
The tool accepts YAML files with categorized questions:

```yaml
getting_started:
    - prompt: How do I create a basic Adobe Express add-on?
    - prompt: What files do I need for a minimal add-on project?

document_api:
    - prompt: How do I create a rectangle using the Document API?
    - prompt: How do I add an image to the document?

troubleshooting:
    - prompt: How do I debug my add-on?
    - prompt: What are common error messages?
```

### **Built-in Default Questions**
If no questions file is provided, the tool uses 10 built-in questions covering:
- Getting Started
- Architecture
- Basic Shapes
- Text Manipulation
- Media Handling
- UI Development
- Best Practices
- Debugging
- Document Structure
- Publishing

---

## 📊 Output Format

### **JSON Structure**
```json
{
  "summary": {
    "evaluation_date": "2025-08-15T10:30:00",
    "model_used": "gpt-4o",
    "total_questions": 25,
    "overall_average_score": 7.8,
    "average_confidence": 8.2,
    "average_completeness": 7.5,
    "average_accuracy": 7.7,
    "category_averages": {
      "getting_started": 9.1,
      "document_api": 8.3,
      "troubleshooting": 6.5
    }
  },
  "results": [
    {
      "question": "How do I create a basic add-on?",
      "category": "getting_started",
      "answer": "To create a basic Adobe Express add-on...",
      "relevant_docs": ["guides/getting_started/quickstart.md"],
      "confidence_score": 9.2,
      "completeness_score": 8.8,
      "accuracy_score": 9.0,
      "overall_score": 9.0,
      "reasoning": "Clear, comprehensive answer with examples"
    }
  ]
}
```

### **Score Interpretation**

| Score Range | Quality | Meaning |
|-------------|---------|---------|
| **9.0-10.0** | 🟢 Excellent | Complete, accurate, highly confident |
| **7.0-8.9** | 🟡 Good | Mostly complete with minor gaps |
| **5.0-6.9** | 🟠 Fair | Partial answer, some uncertainty |
| **3.0-4.9** | 🔴 Poor | Incomplete or inaccurate response |
| **0.0-2.9** | ❌ Failed | No useful information provided |

---

## 🔍 How It Works

### **Evaluation Process**

1. **📚 Document Loading**
   - Scans documentation directory for `.md` files
   - Extracts titles and creates searchable chunks
   - Builds internal document index

2. **🔍 Query Generation**  
   - Takes each input question
   - Generates 3-5 related search queries using AI
   - Expands search scope for comprehensive coverage

3. **📖 Document Search**
   - Uses LLM to semantically rank documents by relevance
   - Selects top 5 most relevant documents
   - Falls back to keyword matching if AI ranking fails

4. **💬 Answer Generation**
   - Combines relevant documentation as context
   - Generates comprehensive answer using GPT-4
   - Includes code examples and references when applicable

5. **📊 Quality Scoring**
   - Evaluates answer on 3 dimensions:
     - **Confidence:** How certain does the answer seem?
     - **Completeness:** How thoroughly does it address the question?
     - **Accuracy:** How correct does the information appear?
   - Calculates overall score as average of the three metrics

### **AI Models Used**
- **Primary:** GPT-4 (gpt-4o deployment)
- **Fallback:** Any available GPT-4 variant
- **Temperature:** 0.1 (for consistent, focused responses)
- **Max Tokens:** 1000 per response

---

## 🚨 Troubleshooting

### **Common Issues & Solutions**

#### **❌ "OpenAI library not found"**
```bash
# Solution: Install the OpenAI package
pip install openai>=1.0.0
```

#### **❌ "API key required"**
```bash
# Solution: Set environment variable
export OPENAI_API_KEY="your-azure-openai-key"

# Or use command line argument
python3 scripts/prompt_only_llm_tester.py --api-key "your-key"
```

#### **❌ "Documentation path not found"**
```bash
# Solution: Verify the path exists
ls -la src/pages

# Or specify absolute path
python3 scripts/prompt_only_llm_tester.py --docs-path "/full/path/to/docs"
```

#### **❌ "Error in document search"**
- **Cause:** API rate limiting or network issues
- **Solution:** Add delays between requests or reduce concurrent calls

#### **❌ "No questions to evaluate"**
- **Cause:** Invalid YAML format or empty questions file
- **Solution:** Validate YAML syntax or use built-in questions

### **Performance Issues**

#### **🐌 Slow Evaluation**
- **Reduce questions:** Use `--max-questions 10`
- **Limit documentation:** Focus on specific directories
- **Check network:** Ensure stable internet connection

#### **💸 High API Costs**
- **Use fewer questions:** Start with 10-20 questions
- **Shorter documents:** Limit documentation scope
- **Lower token limits:** Modify max_tokens in code if needed

---

## 📈 Best Practices

### **📝 Question Design**
- **Be Specific:** Ask focused, concrete questions
- **Cover Scenarios:** Include real developer use cases  
- **Test Edge Cases:** Add questions about error handling
- **Include Categories:** Organize questions by topic area

### **🔧 Efficient Usage**
- **Start Small:** Begin with 10-20 questions for quick feedback
- **Iterate:** Use results to improve documentation, then re-test
- **Category Focus:** Test specific areas that need attention
- **Regular Testing:** Run evaluations after documentation updates

### **📊 Results Analysis**
- **Focus on Low Scores:** Prioritize questions scoring <7.0
- **Category Patterns:** Look for systematic issues in specific topics
- **Missing Information:** Note what documentation the LLM couldn't find
- **Confidence Gaps:** Address uncertain or incomplete answers

---

## 🔗 Integration with Other Tools

### **🔄 Workflow Integration**
```bash
# Basic testing workflow
python3 scripts/prompt_only_basic_tester.py       # Fast rule-based check
python3 scripts/prompt_only_llm_tester.py         # AI-powered evaluation  
python3 scripts/prompt_only_multi_agent_tester.py # Comprehensive analysis
```

### **📊 Comparison Usage**
- **Basic Tester:** Quick coverage analysis
- **LLM Tester:** Quality and completeness assessment  
- **Multi-Agent:** Deep, specialized evaluation
- **Ground Truth:** Validation against known answers

---

## 🎯 Success Metrics

### **Target Scores**
- **Overall Average:** 8.0+ (Good quality documentation)
- **Confidence:** 8.5+ (Clear, authoritative content)
- **Completeness:** 7.5+ (Comprehensive coverage)
- **Accuracy:** 9.0+ (Correct and up-to-date information)

### **Category Benchmarks**
- **Getting Started:** 9.0+ (Critical for onboarding)
- **API Reference:** 8.5+ (Must be accurate and complete)
- **Troubleshooting:** 8.0+ (Essential for developer success)
- **Advanced Topics:** 7.5+ (May have acceptable complexity gaps)

---

## 🆘 Support & Resources

### **For Help:**
1. **Check the troubleshooting section above**
2. **Review the comprehensive README:** `README_Prompt_Testing_System.md`
3. **Examine output files** for detailed error messages
4. **Test with fewer questions** to isolate issues

### **Related Documentation:**
- [`README_Prompt_Testing_System.md`](README_Prompt_Testing_System.md) - Complete testing framework overview
- [`README_Multi_Agent_Tester.md`](README_Multi_Agent_Tester.md) - Advanced multi-agent analysis
- [`README_Documentation_Audit_System.md`](README_Documentation_Audit_System.md) - Full audit system

---

**🎯 This tool provides a balanced approach between the speed of rule-based testing and the depth of multi-agent analysis, making it perfect for regular documentation quality checks and iterative improvement workflows.**
