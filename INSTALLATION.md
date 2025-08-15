# 🚀 Installation Guide for Documentation Testing Scripts

## 📋 Quick Installation

> **⚠️ IMPORTANT:** All commands must be run from the `express-add-ons-docs` root directory!

### **Option 1: Complete Installation (Recommended)**
```bash
# 1. Navigate to the express-add-ons-docs root directory
cd express-add-ons-docs

# 2. Install ALL dependencies for any script in scripts/ folder
pip install -r requirements-complete.txt
```

### **Option 2: Selective Installation**
Choose based on which tools you need:

```bash
# Basic rule-based testing only (most scripts)
pip install PyYAML>=6.0 pandas>=1.5.0

# AI-powered testing (LLM + Multi-Agent tools)
pip install openai>=1.10.0 PyYAML>=6.0 asyncio-throttle>=1.0.2 dataclasses-json>=0.6.0
```

---

## 🔧 Tools and Their Requirements

### 🎯 **Basic Tools** (PyYAML + pandas)
| Tool | Purpose | Dependencies |
|------|---------|-------------|
| `prompt_only_basic_tester.py` | 🎯 Rule-based query testing | PyYAML, pandas |
| `ground_truth_tester.py` | ✅ Benchmark validation | PyYAML, pandas |
| `doc_audit_runner_v2.py` | 📊 Documentation auditing | PyYAML, pandas |
| `llm_readiness_analyzer.py` | 📈 LLM readiness analysis | PyYAML, pandas |
| `llm_linter.py` | 🔍 Markdown linting | PyYAML, pandas |
| `basicAudit.py` | 📝 Basic auditing | PyYAML, pandas |
| All `*_reporter.py` scripts | 📋 Report generation | PyYAML, pandas |

### 🧠 **AI-Powered Tools** (OpenAI + additional deps)
| Tool | Purpose | Dependencies | API Key Required |
|------|---------|-------------|-----------------|
| `prompt_only_multi_agent_tester.py` | 🚀 Advanced multi-agent analysis | openai, asyncio-throttle, dataclasses-json, PyYAML | ✅ Azure OpenAI |
| `prompt_only_llm_tester.py` | 🧠 Single LLM evaluation | openai, PyYAML | ✅ Azure OpenAI |

---

## 🔑 API Key Setup (for AI tools)

### **Environment Variable (Recommended)**
```bash
export OPENAI_API_KEY="your-azure-openai-api-key"
```

### **Command Line Parameter**
```bash
python3 scripts/prompt_only_llm_tester.py --api-key "your-azure-openai-key"
```

### **Azure Configuration File**
Create `scripts/azure_config.json`:
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

---

## 📁 Required Directory Structure

**⚠️ CRITICAL:** All commands assume you're in the `express-add-ons-docs` root directory.

Your directory structure should look like this:
```
express-add-ons-docs/           ← YOU MUST BE HERE
├── scripts/                    ← Contains all Python scripts
├── src/pages/                  ← Documentation to test
├── test_prompts/               ← Query files for testing
├── requirements-complete.txt   ← Dependencies file
├── INSTALLATION.md            ← This file
└── install_dependencies.py   ← Interactive installer
```

**To verify you're in the correct directory:**
```bash
pwd  # Should end with /express-add-ons-docs
ls   # Should show: scripts/ src/ test_prompts/ requirements-complete.txt
```

---

## 🧪 Quick Test Commands

### **Test Your Installation**
```bash
# Test basic tools
python3 scripts/prompt_only_basic_tester.py --help

# Test AI tools (requires API key)
python3 scripts/prompt_only_llm_tester.py --help
```

### **Run Sample Tests**
```bash
# ENSURE you're in the express-add-ons-docs directory first!
cd express-add-ons-docs

# Basic rule-based testing
python3 scripts/prompt_only_basic_tester.py --docs-path src/pages --queries test_prompts/advanced_queries_test.json

# AI-powered evaluation (requires API key)
python3 scripts/prompt_only_llm_tester.py --docs-path src/pages --questions test_prompts/workflow_queries.yaml --max-questions 5
```

---

## 🚨 Troubleshooting

### **Common Installation Issues**

#### **❌ "No such file or directory" or "FileNotFoundError"**
```bash
# CAUSE: You're not in the correct directory
# SOLUTION: Navigate to express-add-ons-docs root directory
cd /path/to/your/express-add-ons-docs

# Verify you're in the right place - you should see these folders:
ls -la
# Should show: scripts/, src/, test_prompts/, requirements-complete.txt
```

#### **"ModuleNotFoundError: No module named 'openai'"**
```bash
pip install openai>=1.10.0
```

#### **"ModuleNotFoundError: No module named 'yaml'"**
```bash
pip install PyYAML>=6.0
```

#### **"ModuleNotFoundError: No module named 'pandas'"**
```bash
pip install pandas>=1.5.0
```

#### **Version Conflicts**
```bash
# Force upgrade to latest versions
pip install --upgrade openai PyYAML pandas

# Or use specific versions
pip install openai==1.10.0 PyYAML==6.0 pandas==1.5.0
```

### **Python Version Issues**
- **Minimum:** Python 3.8
- **Recommended:** Python 3.9+
- **Check your version:** `python3 --version`

### **Permission Issues**
```bash
# Use user install if you don't have admin rights
pip install --user -r requirements-complete.txt
```

---

## 📚 Related Documentation

- [`README_Prompt_Testing_System.md`](scripts/README_Prompt_Testing_System.md) - Complete testing framework overview
- [`README_Simple_LLM_Tester.md`](scripts/README_Simple_LLM_Tester.md) - LLM tester specific guide
- [`README_Documentation_Audit_System.md`](scripts/README_Documentation_Audit_System.md) - Full audit system documentation

---

**✅ After installation, you'll be able to run any script in the `scripts/` folder with the appropriate dependencies installed!**
