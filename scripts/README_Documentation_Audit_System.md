# 📊 Adobe Express Add-ons Documentation Audit System

A comprehensive suite of tools for analyzing, auditing, and improving Adobe Express Add-ons documentation for LLM readiness and overall quality.

## 🎯 **Overview**

This system provides multiple levels of documentation analysis:

- **📋 Basic Auditing**: Quick LLM readiness check (`basicAudit.py`)
- **🔍 Comprehensive Auditing**: Full analysis with linting and LLM readiness (`doc_audit_runner_v2.py`)
- **📈 Specialized Analysis**: Individual tools for specific aspects (`llm_linter.py`, `llm_readiness_analyzer.py`)
- **📄 Reporting**: Unified reporting system (`doc_audit_reporter.py`)
- **🧪 Advanced Query Testing**: Multiple query-based testing approaches for in-depth evaluation

---

## 📦 **Dependencies & Setup**

### **Core Dependencies (Required)**

Install the basic dependencies for all main audit tools:

```bash
# Navigate to the documentation project directory
cd express-add-ons-docs

# Install core dependencies
pip install -r requirements.txt

# Or install individually:
pip install PyYAML>=6.0 pandas>=1.5.0
```

**Required for**:
- `doc_audit_runner_v2.py` (comprehensive auditing)
- `llm_readiness_analyzer.py` (LLM readiness analysis)  
- `llm_linter.py` (markdown linting)
- `basicAudit.py` (basic auditing)
- All reporter scripts (`doc_audit_reporter.py`, `llm_readiness_reporter.py`, etc.)

### **Azure OpenAI Dependencies (Optional)**

For advanced query testing with AI evaluation:

```bash
# Install additional dependencies for AI-powered tools
pip install -r scripts/requirements-agentic.txt

# Or install individually:
pip install openai>=1.10.0 asyncio-throttle>=1.0.2 pyyaml>=6.0 pathlib2>=2.3.7 dataclasses-json>=0.6.0
```

**Required for**:
- `prompt_only_multi_agent_tester.py` (🔑 **Requires Azure OpenAI API Key**)
- `prompt_only_llm_tester.py` (🔑 **Requires Azure OpenAI API Key**)

### **🔑 Azure OpenAI API Key Setup**

Some advanced query testing tools require an Azure OpenAI API key:

```bash
# Set environment variable (recommended)
export OPENAI_API_KEY="your-azure-openai-api-key"

# Or pass directly via command line
python3 scripts/prompt_only_llm_tester.py --api-key your-key-here
```

**Scripts Requiring API Key**:
- ⚠️ `prompt_only_multi_agent_tester.py` - Multi-agent AI evaluation
- ⚠️ `prompt_only_llm_tester.py` - Direct LLM evaluation

**Scripts NOT Requiring API Key** (Static Analysis Only):
- ✅ All core audit tools (`doc_audit_runner_v2.py`, `llm_linter.py`, etc.)
- ✅ All reporters (`doc_audit_reporter.py`, etc.)
- ✅ `prompt_only_basic_tester.py` - Pattern matching analysis
- ✅ `ground_truth_tester.py` - Ground truth validation

### **✅ Installation Verification**

Test your setup with a quick audit:

```bash
# Test core dependencies
python3 scripts/basicAudit.py --docs-path src/pages/guides/getting_started/hello-world.md

# Test comprehensive system
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/guides/getting_started/ --filtered
```

---

## 🚀 **Quick Start**

### **Most Common Use Cases**

```bash
# 1. Complete documentation audit (recommended)
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/

# 2. Core documentation only (excludes auto-generated API refs)
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered

# 3. Generate comprehensive quality report
python3 scripts/doc_audit_reporter.py --type quality

# 4. Quick basic audit
python3 scripts/basicAudit.py --docs-path src/pages/

# 5. Track progress over time (baseline comparison)
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered --baseline
# (make improvements, then...)
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered --compare reports/raw/baseline_v2_*.json
```

---

## 🔧 **Core Tools**

### 1. **📋 Basic Auditing** - `basicAudit.py`

**Purpose**: Simple, fast LLM readiness check for single files or directories.

**Usage**:
```bash
# Directory analysis
python3 scripts/basicAudit.py --docs-path src/pages/guides/

# Single file analysis  
python3 scripts/basicAudit.py --file src/pages/guides/getting_started/hello-world.md

# Custom output location
python3 scripts/basicAudit.py --docs-path src/pages/ --output my_audit_report
```

**Defaults**:
- **Output**: `reports/basic_audit_report.csv` (directory) or `reports/raw/basic_audit_{filename}.csv` (single file)
- **Analysis**: LLM readiness scoring, file categorization, issue identification

---

### 2. **🔍 Comprehensive Auditing** - `doc_audit_runner_v2.py`

**Purpose**: Complete documentation analysis combining LLM readiness analysis and markdown linting.

**Usage**:
```bash
# Complete audit (all files)
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/

# Filtered audit (core documentation only, excludes API references)
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered

# Custom output prefix
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --output my_audit
```

**Defaults**:
- **Output**: `reports/raw/comprehensive_doc_audit_v2_{scope}_{timestamp}.json`
- **Scope**: `complete` (all files) or `filtered` (core docs only)
- **Analysis**: Combined LLM readiness + markdown linting + file-level insights

**Key Features**:
- ✅ Combines `llm_readiness_analyzer.py` and `llm_linter.py`
- ✅ Ensures consistent file processing between tools when `--filtered` is used
- ✅ Generates comprehensive JSON reports for further analysis
- ✅ Executive summary with actionable insights
- ✅ **Baseline comparison support** for tracking improvements over time

#### **📊 Baseline Comparison Workflow**

Track documentation improvements over time with baseline comparison:

```bash
# Step 1: Create initial baseline
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered --baseline

# Step 2: Make documentation improvements...
# (edit docs, fix issues, add examples, etc.)

# Step 3: Compare against baseline to see progress
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered \
  --compare reports/raw/baseline_v2_filtered_doc_audit_20250813_120000.json
```

**📈 What You'll See in Comparison Output**:

```
📈 PROGRESS SINCE BASELINE:
   LLM Score Change: +0.024
   Linter Score Change: +0.031  
   Days Elapsed: 3
   📈 Small improvement in LLM-readiness
   ✅ Significant improvement in linter score
   ✅ Reduced critical linting issues (5 fewer)
   ✅ Reduced major linting issues (12 fewer)
```

**Comparison Messages You Might See**:
- `✅ Significant improvement in overall LLM-readiness` (change > 0.05)
- `📈 Small improvement in LLM-readiness` (small positive change)
- `📊 No change in LLM-readiness` (no change)
- `📉 Small decline in linter score` (small negative change)
- `⚠️ Increased critical linting issues (3 more)` (issue count changes)

---

### 3. **🎯 LLM Readiness Analysis** - `llm_readiness_analyzer.py`

**Purpose**: Specialized LLM readiness evaluation with query pattern matching.

**Usage**:
```bash
# Complete analysis
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/

# Filtered analysis (core docs only)
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered

# Custom output
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --output my_analysis.json

# Baseline comparison (track LLM readiness improvements)
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered --baseline
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered --compare reports/raw/llm_readiness_report_*.json
```

**Defaults**:
- **Output**: `reports/raw/llm_readiness_report_{timestamp}.json`
- **Query Data**: `test_prompts/unified_test_queries.json` (3,600+ developer queries)
- **Analysis**: Context clarity, terminology consistency, query pattern coverage, code examples

**Query Pattern Matching**:
- **Default Query File**: `test_prompts/unified_test_queries.json`
- **Coverage**: Analyzes how well documentation covers real developer query patterns
- **Categories**: Getting Started, Document APIs, Spectrum, Tutorials, Troubleshooting, etc.
- **Note**: This provides *basic* query pattern matching. For advanced query testing, see [Advanced Query Testing](#advanced-query-testing) section.

**Key Features**:
- ✅ LLM readiness scoring with context clarity analysis
- ✅ Query pattern coverage evaluation against 3,600+ real developer queries
- ✅ **Baseline comparison support** for tracking LLM readiness improvements over time
- ✅ Filtered mode to focus on core documentation (excludes auto-generated API refs)
- ✅ Detailed JSON reports with actionable insights

#### **📊 LLM Readiness Comparison Workflow**

Track LLM readiness improvements over time:

```bash
# Step 1: Create baseline before improvements
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered --baseline

# Step 2: Make improvements and compare progress
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered \
  --compare reports/raw/llm_readiness_report_20250813_120000.json
```

**📈 Sample Comparison Output**:
```
🔄 COMPARISON WITH PREVIOUS AUDIT:
   Score change: 0.667 → 0.643 (+0.024)
   Getting_Started: +0.045
   Document_APIs: +0.012
   Spectrum: -0.003
   Tutorials: +0.038
```

---

### 4. **📝 Markdown Linting** - `llm_linter.py`

**Purpose**: Detailed markdown quality analysis with line-by-line issue reporting.

**Usage**:
```bash
# Directory analysis
python3 scripts/llm_linter.py --docs-path src/pages/

# Exclude API references
python3 scripts/llm_linter.py --docs-path src/pages/ --exclude-api-references

# Single file with line numbers
python3 scripts/llm_linter.py --docs-path src/pages/guides/getting_started/hello-world.md --output-format json

# Get detailed issues for worst files
python3 scripts/llm_linter.py --docs-path src/pages/ --detailed-issues
```

**Defaults**:
- **Output**: `reports/raw/linter_report_{timestamp}.json`
- **Format**: JSON (includes line numbers) or summary
- **Analysis**: 15+ linting rules covering structure, clarity, examples, metadata

**Line-by-Line Analysis Examples**:
```bash
# See issues with line numbers for specific files
python3 scripts/llm_linter.py --docs-path src/pages/guides/getting_started/hello-world.md --output-format json

# Find worst performing files
python3 scripts/llm_linter.py --docs-path src/pages/ --detailed-issues | grep "Score: 0\."
```

---

## 📄 **Reporting System** - `doc_audit_reporter.py`

**Purpose**: Unified reporting system that generates different types of reports from audit data.

### **Available Report Types**

| Report Type | Status | Description |
|-------------|---------|-------------|
| `executive` | ✅ **Available** | High-level summary for management |
| `implementation` | ✅ **Available** | Detailed implementation guide for developers |
| `quality` | ✅ **Available** | Comprehensive linting/code quality analysis |
| `priority` | 🚧 **Coming Soon** | Priority files needing attention |
| `baseline` | 🚧 **Coming Soon** | Baseline audit summary |

### **Usage**

```bash
# Auto-detect latest audit data
python3 scripts/doc_audit_reporter.py --type executive
python3 scripts/doc_audit_reporter.py --type implementation  
python3 scripts/doc_audit_reporter.py --type quality

# Use specific input file
python3 scripts/doc_audit_reporter.py --type executive --input reports/raw/comprehensive_doc_audit_v2__20250813_051020.json

# Specify scope (when not using --input)
python3 scripts/doc_audit_reporter.py --type quality --scope filtered
python3 scripts/doc_audit_reporter.py --type executive --scope complete
```

**Defaults**:
- **Input**: Auto-detects most recent audit file (prioritizes complete over filtered)
- **Output**: `reports/{type}_report_{timestamp}.md`
- **Scope**: `auto` (smart detection), `filtered`, or `complete`

**File Detection Priority**:
1. `comprehensive_doc_audit_v2__*.json` (complete audit)
2. `comprehensive_doc_audit_v2_filtered_*.json` (filtered audit)
3. Older format files as fallback

---

## 📊 **Individual Reporters**

### **LLM Readiness Reporter** - `llm_readiness_reporter.py`

```bash
# Auto-detect latest LLM readiness file
python3 scripts/llm_readiness_reporter.py

# Use specific file
python3 scripts/llm_readiness_reporter.py --input reports/raw/llm_readiness_report_20250813_051218.json
```

**Defaults**:
- **Input**: Auto-detects most recent `llm_readiness_*.json` file
- **Output**: `reports/llm_readiness_analysis_report_{timestamp}.md`

### **Linter Reporter** - `llm_linter_reporter.py`

```bash
# Auto-detect latest linter file
python3 scripts/llm_linter_reporter.py

# Use specific file
python3 scripts/llm_linter_reporter.py --input reports/raw/linter_report.json
```

**Defaults**:
- **Input**: `reports/raw/linter_report.json`
- **Output**: `reports/llm_linter_report_{timestamp}.md`

---

## 🧪 **Advanced Query Testing**

For more sophisticated query-based evaluation beyond the basic pattern matching in `llm_readiness_analyzer.py`, use these specialized tools:

### **1. Multi-Agent Testing** - `prompt_only_multi_agent_tester.py`
- **Purpose**: Sophisticated AI-powered evaluation using multiple specialized agents
- **Approach**: QueryAgent, SearchAgent, AssessmentAgent, SynthesisAgent
- **Best For**: Comprehensive quality assessment with AI orchestration

### **2. Ground Truth Validation** - `ground_truth_tester.py`  
- **Purpose**: Tests against verified Q&A pairs from `test_prompts/labelled.yaml`
- **Approach**: Validates documentation accuracy against known correct answers
- **Best For**: Measuring documentation correctness and completeness

### **3. Basic Query Testing** - `prompt_only_basic_tester.py`
- **Purpose**: Tests documentation against real developer queries
- **Approach**: Pattern matching and content analysis
- **Best For**: Coverage analysis and gap identification

### **4. LLM Query Testing** - `prompt_only_llm_tester.py`
- **Purpose**: Direct LLM evaluation of documentation quality
- **Approach**: Uses Azure OpenAI for document ranking and answer generation
- **Best For**: Simulating real developer interactions with documentation

**Query Test Data Sources**:
- `test_prompts/unified_test_queries.json` - 3,600+ developer queries
- `test_prompts/labelled.yaml` - Verified Q&A pairs for ground truth
- `test_prompts/structured_query_data.json` - Categorized query patterns

---

## 📁 **Output Structure**

```
reports/
├── raw/                                    # Raw JSON data files
│   ├── comprehensive_doc_audit_v2__*.json         # Complete audits
│   ├── comprehensive_doc_audit_v2_filtered_*.json # Filtered audits  
│   ├── llm_readiness_report_*.json                # LLM readiness data
│   ├── linter_report_*.json                       # Linting data
│   └── basic_audit_*.csv                          # Basic audit results
├── executive_report_*.md                   # Executive summaries
├── implementation_report_*.md              # Implementation guides
├── quality_report_*.md                     # Quality analysis reports
├── llm_readiness_analysis_report_*.md      # LLM readiness reports
└── llm_linter_report_*.md                  # Linting reports
```

---

## 🔍 **Common Workflows**

### **Complete Documentation Audit Workflow**

```bash
# 1. Run comprehensive audit
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered

# 2. Generate reports
python3 scripts/doc_audit_reporter.py --type executive     # For stakeholders
python3 scripts/doc_audit_reporter.py --type implementation # For developers  
python3 scripts/doc_audit_reporter.py --type quality       # For quality analysis

# 3. Get detailed line-by-line analysis for specific files
python3 scripts/llm_linter.py --docs-path src/pages/guides/problematic-file.md --output-format json
```

### **Quick Quality Check Workflow**

```bash
# 1. Basic audit for quick assessment
python3 scripts/basicAudit.py --docs-path src/pages/guides/

# 2. Detailed linting for specific issues
python3 scripts/llm_linter.py --docs-path src/pages/guides/ --detailed-issues

# 3. Generate linting report
python3 scripts/llm_linter_reporter.py
```

### **📊 Progress Tracking Workflow (Baseline Comparison)**

```bash
# 1. Create initial baseline before making changes
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered --baseline

# 2. Make your documentation improvements
# - Fix linting issues
# - Add missing code examples  
# - Improve explanations
# - Add FAQs, etc.

# 3. Run comparison to see progress
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered \
  --compare reports/raw/baseline_v2_filtered_doc_audit_20250813_120000.json

# 4. Generate progress report for stakeholders
python3 scripts/doc_audit_reporter.py --type executive \
  --input reports/raw/comprehensive_doc_audit_v2_filtered_comparison_*.json
```

**💡 Pro Tips**:
- Create baselines before major doc revisions for progress tracking
- Use consistent scope (`--filtered` or complete) for meaningful comparisons
- Baseline files include timestamp - use latest for accurate comparisons
- Look for these progress indicators:
  - LLM Score Change: `+0.024` (higher = better LLM readiness)
  - Linter Score Change: `+0.031` (higher = better quality)
  - Issue Count Changes: `✅ Reduced critical linting issues (5 fewer)`
```

### **🎯 LLM Readiness Focus Workflow**

For specialized LLM readiness improvement tracking:

```bash
# 1. Create LLM readiness baseline
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered --baseline

# 2. Focus on LLM readiness improvements
# - Improve context clarity in documentation
# - Add missing code examples and explanations
# - Enhance query pattern coverage

# 3. Track LLM readiness progress specifically
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/ --filtered \
  --compare reports/raw/llm_readiness_report_*.json

# 4. Generate detailed LLM readiness report
python3 scripts/llm_readiness_reporter.py
```

**🎯 Focus Areas for LLM Readiness**:
- Context clarity and terminology consistency
- Query pattern coverage improvements
- Code example completeness
- Category-specific improvements (Getting Started, Document APIs, etc.)

### **Continuous Monitoring Workflow**

```bash
# 1. Daily comprehensive audit
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered

# 2. Generate trending reports
python3 scripts/doc_audit_reporter.py --type executive

# 3. Track improvements over time
python3 scripts/llm_readiness_reporter.py
```

---

## ⚙️ **Configuration**

### **File Filtering**

When using `--filtered` option:
- ✅ **Included**: Core documentation, guides, tutorials, getting started
- ❌ **Excluded**: Auto-generated API references, changelog files, technical implementation details

### **Scope Options**

- **`complete`**: All documentation files (208+ files)
- **`filtered`**: Core documentation only (98 files)  
- **`auto`**: Smart detection based on available audit data

### **Output Formats**

- **JSON**: Machine-readable data with full details and line numbers
- **CSV**: Tabular data for spreadsheet analysis
- **Markdown**: Human-readable reports with formatting and recommendations

---

## 🆘 **Troubleshooting**

### **Common Issues**

**"No audit files found"**
```bash
# Generate audit data first
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/
```

**"Line numbers missing in linter output"**
```bash
# Use JSON format for line numbers
python3 scripts/llm_linter.py --docs-path your-file.md --output-format json
```

**"Different file counts between tools"**
```bash
# Use --filtered consistently across tools
python3 scripts/doc_audit_runner_v2.py --docs-path src/pages/ --filtered
```

### **Getting Help**

```bash
# Get help for any script
python3 scripts/doc_audit_runner_v2.py --help
python3 scripts/doc_audit_reporter.py --help
python3 scripts/llm_linter.py --help
```

---

*This audit system is designed to help maintain high-quality, LLM-ready documentation for Adobe Express Add-ons. For questions or issues, refer to the individual script help documentation or check the troubleshooting section above.*
