# Adobe Express Add-ons Documentation Auditing Scripts

This guide helps you audit and improve documentation quality using our comprehensive auditing and reporting scripts.

## 🚀 Quick Start Guide

### Step 1: Run Your First Audit
Start with a basic audit of core documentation files (excluding auto-generated API references):

```bash
# Create baseline audit of core documentation (~108 files)
python3 scripts/doc_audit_runner.py --baseline --filtered --docs-path src/pages/
```

This creates: `baseline_doc_audit_filtered_[timestamp].json`

### Step 2: Generate a Readable Report
Turn your audit data into an actionable report:

```bash
# Generate executive summary for management overview
python3 scripts/generate_executive_summary.py --scope filtered

# Generate detailed implementation guide for developers  
python3 scripts/generate_detailed_implementation_report.py --scope filtered
```

Reports are saved to the `reports/` folder.

### Step 3: Start Fixing Issues
Use the Priority Summary to see which files need attention first:

```bash
python3 scripts/generate_priority_summary.py --scope filtered
```

---

## 📊 Basic Auditing Commands

### Full Documentation Audit (Recommended Starting Point)

**Core documentation only** (excludes auto-generated files - recommended):
```bash
# Baseline audit for comparison tracking
python3 scripts/doc_audit_runner.py --baseline --filtered --docs-path src/pages/

# Regular audit for current status
python3 scripts/doc_audit_runner.py --filtered full report --docs-path src/pages/
```

**All documentation files** (includes auto-generated API references):
```bash
# Baseline audit for comparison tracking  
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/

# Regular audit for current status
python3 scripts/doc_audit_runner.py --docs-path src/pages/
```

### Single File Auditing

**Quick single file check:**
```bash
python3 scripts/doc_audit_runner.py --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

**Single file baseline** (for tracking improvements):
```bash
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

### Individual Tool Usage

**LLM Readiness Analysis only:**
```bash
# All files
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages

# Single file
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

**Linting only:**
```bash
# All files (console output)
python3 scripts/llm_markdown_linter.py src/pages/

# All files (JSON output)
python3 scripts/llm_markdown_linter.py src/pages/ --output all_pages_linter_report.json

# Single file
python3 scripts/llm_markdown_linter.py src/pages/guides/learn/how_to/theme_locale.md
```

---

## 📈 Report Generation

After running audits, generate readable reports for different audiences:

### Management Reports

**Executive Summary** - High-level health metrics and business impact:
```bash
python3 scripts/generate_executive_summary.py --scope filtered    # Core docs
python3 scripts/generate_executive_summary.py --scope complete    # All docs
```

### Development Team Reports  

**Detailed Implementation Guide** - File-by-file action items:
```bash
python3 scripts/generate_detailed_implementation_report.py --scope filtered
python3 scripts/generate_detailed_implementation_report.py --scope complete
```

**Priority Summary** - Urgency-ranked task list:
```bash
python3 scripts/generate_priority_summary.py --scope filtered
python3 scripts/generate_priority_summary.py --scope complete
```

### Specialized Reports

**Baseline Summary** - Overall audit findings:
```bash
python3 scripts/generate_baseline_summary.py
```

**Comprehensive Style Report** - Detailed style analysis:
```bash
# First run a non-baseline audit
python3 scripts/doc_audit_runner.py --docs-path src/pages/

# Then generate style report using the output file
python3 scripts/generate_comprehensive_style_report.py --input comprehensive_doc_audit_complete_[timestamp].json
```

**Linter Report** - Technical validation issues:
```bash
# First generate linter data
python3 scripts/llm_markdown_linter.py src/pages/ --output all_pages_linter_report.json

# Then generate report
python3 scripts/generate_linter_report.py --input all_pages_linter_report.json
```

**LLM Readiness Report** - AI training optimization:
```bash
# First generate readiness data
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages --output all_files_llm_readiness.json

# Then generate report
python3 scripts/generate_llm_analysis_report.py --input all_files_llm_readiness.json
```

### Report Quick Reference

| Report Type | Use When | Audience | Output |
|-------------|----------|----------|--------|
| **Executive Summary** | Need high-level overview for management | Leadership, Project Managers | Health metrics, business impact, ROI analysis |
| **Detailed Implementation** | Planning development work | Development Teams | File-by-file action items, implementation templates |
| **Priority Summary** | Need urgency-based task ordering | Team Leads, Developers | Priority-ranked files with specific issues |
| **Ground Truth Validation** | Validate accuracy against expert answers | QA Teams, Content Managers | Accuracy gaps, expert benchmark comparison |
| **Baseline Summary** | Need overall audit results | All stakeholders | General audit findings and recommendations |
| **Comprehensive Style** | Need detailed style/formatting analysis | Technical Writers, QA | Style consistency, formatting issues |

---

## 🔍 Advanced Usage

### Comparison and Progress Tracking

**Create baseline for later comparison:**
```bash
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/
```

**Compare against baseline:**
```bash
python3 scripts/doc_audit_runner.py --compare baseline_doc_audit_complete_[timestamp].json --docs-path src/pages/
```

**Single file comparison:**
```bash
# Create baseline
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/guides/learn/how_to/modal_dialogs.md

# Compare after changes
python3 scripts/doc_audit_runner.py --compare baseline_modal_dialogs_doc_audit_[timestamp].json --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

### Scope Options Explained

- **`--scope filtered`** (default): ~108 core documentation files, excludes auto-generated API references and changelogs. **Recommended for most development work.**
- **`--scope complete`**: ~204 total files, includes everything. Use for comprehensive ecosystem analysis.

### Output File Patterns

| Command Type | File Pattern | Location |
|--------------|-------------|----------|
| Baseline audits | `baseline_doc_audit_[scope]_[timestamp].json` | Root directory |
| Regular audits | `comprehensive_doc_audit_[scope]_[timestamp].json` | Root directory |
| Reports | `[report_type]_[scope]_[timestamp].md` | `reports/` folder |
| Single file audits | `[filename]_doc_audit_[timestamp].json` | Root directory |

### Additional Analysis Tools

**Query-based testing:**
```bash
python3 scripts/query_based_doc_tester.py
```
Output: `query_test_report.json`

**Adobe Express specific issues:**
```bash
# All files
python3 scripts/express_issue_detector.py src/pages/ --output reports/express-issues-$(date +%Y%m%d).json --detailed

# Single file  
python3 scripts/express_issue_detector.py src/pages/guides/getting_started/hello-world.md --detailed
```

**Basic documentation analysis:**
```bash
# All files
python3 scripts/doc_analyzer.py src/pages/ --output doc_analyzer_audit.json

# Verbose output
python3 scripts/doc_analyzer.py src/pages/ --output doc_analyzer_audit_verbose.json --verbose

# Single file
python3 scripts/doc_analyzer.py src/pages/guides/learn/how_to/document_metadata.md
```

## 📊 **Ground Truth Validation**

*New: Validate documentation against verified expert Q&A pairs for accuracy measurement*

### Quick Ground Truth Testing
```bash
# Run ground truth validation against verified Q&A pairs
python3 scripts/ground_truth_tester.py

# Generate readable markdown report from results
python3 scripts/generate_ground_truth_report.py
```

**Output:**
- `ground_truth_test_report.json` - Raw validation data with detailed metrics
- `reports/ground_truth_validation_report_[timestamp].md` - Management-ready validation report

### What Ground Truth Validation Measures

| Metric | Description | Use Case |
|--------|-------------|----------|
| **Coverage** | How well docs address ground truth questions | Find topic gaps |
| **Accuracy** | How well content matches verified answers | Identify incorrect information |
| **Completeness** | Whether answers include all necessary elements | Ensure comprehensive answers |
| **Overall Quality** | Combined benchmark score vs expert standards | Track improvement progress |

### Key Benefits

- **🎯 Expert Benchmark**: Tests against verified correct answers
- **📊 Accuracy Measurement**: Identifies content that contradicts verified facts
- **📈 Progress Tracking**: Provides baseline for measuring improvements
- **🔍 Gap Analysis**: Shows exactly what's missing vs what should be there
- **💰 ROI Focused**: Helps prioritize fixes with highest impact

### Integration with Documentation Workflow

```bash
# 1. Regular validation cycle (monthly)
python3 scripts/ground_truth_tester.py
python3 scripts/generate_ground_truth_report.py

# 2. Before major releases - validate critical content
python3 scripts/ground_truth_tester.py
python3 scripts/generate_ground_truth_report.py --output pre_release_validation.md

# 3. After content updates - verify changes didn't break accuracy
python3 scripts/ground_truth_tester.py
python3 scripts/generate_ground_truth_report.py --output post_update_validation.md
```

---

## 🛠️ Getting Help

For detailed command options:
```bash
python3 scripts/doc_audit_runner.py -h
python3 scripts/llm_readiness_analyzer.py -h  
python3 scripts/llm_markdown_linter.py -h
python3 scripts/query_based_doc_tester.py -h
python3 scripts/doc_analyzer.py -h
python3 scripts/express_issue_detector.py -h
```

---

## 💡 Recommended Workflow

1. **Start here**: `python3 scripts/doc_audit_runner.py --baseline --filtered --docs-path src/pages/`
2. **Get overview**: `python3 scripts/generate_executive_summary.py --scope filtered`
3. **Plan work**: `python3 scripts/generate_detailed_implementation_report.py --scope filtered`
4. **Prioritize**: `python3 scripts/generate_priority_summary.py --scope filtered`
5. **Track progress**: Re-run audits and use `--compare` to measure improvements

