# Holly's Complete Smart Documentation Audit Workflow

## 🧠 Smart Auditing (Recommended)

### 🚀 Quick Smart Audit

```bash
# Basic smart audit with content classification
python3 scripts/simpleAudit_smart.py

# Show detailed classification info
python3 scripts/simpleAudit_smart.py --show-classification --verbose

# Custom output location
python3 scripts/simpleAudit_smart.py --output my_smart_audit --docs-path src/pages

# Analyze specific directory
python3 scripts/simpleAudit_smart.py --docs-path src/pages/guides/getting_started/
```

**Available Parameters:**
- `--docs-path PATH` - Documentation directory (auto-detected if not specified)
- `--output NAME` - Output filename without extension (default: smart_audit_report)
- `--verbose, -v` - Show detailed progress
- `--show-classification` - Display content type and code intensity for each file

### 🎯 Comprehensive Smart LLM Analysis

```bash
# Full smart analysis of all documentation
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages

# Create baseline for comparison
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages --baseline --output smart_baseline.json

# Analyze single file
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages/guides/getting_started/developer-journey.md

# Use custom query data
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages --query-data my_queries.json

# Compare against baseline
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages --compare smart_baseline.json

# Verbose analysis
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages --verbose
```

**Available Parameters:**
- `--docs-path PATH` - **Required** - Documentation directory or single file
- `--output FILE` - Output JSON file (default: smart_llm_audit.json)
- `--query-data FILE` - Custom structured query data (default: structured_query_data.json)
- `--baseline` - Generate baseline report for comparisons
- `--compare FILE` - Compare against baseline report
- `--verbose, -v` - Verbose output

### 📊 Smart vs Traditional Comparison

```bash
# Compare default sample files (requires pandas)
python3 scripts/compare_audit_approaches.py

# Compare specific files
python3 scripts/compare_audit_approaches.py --files guides/getting_started/developer-journey.md guides/learn/how_to/use_text.md

# Custom docs path and output
python3 scripts/compare_audit_approaches.py --docs-path src/pages --output my_comparison.md

# Multiple specific files
python3 scripts/compare_audit_approaches.py --files \
  guides/getting_started/developer-journey.md \
  guides/learn/how_to/use_text.md \
  references/addonsdk/app-document.md \
  guides/support/faq.md
```

**Available Parameters:**
- `--docs-path PATH` - Documentation directory (default: ../src/pages)
- `--output FILE` - Output markdown file (default: audit_comparison_report.md)
- `--files FILE1 FILE2...` - Specific files to analyze (relative to docs-path)

### 📋 Generate Reports from Smart Analysis

```bash
# Generate markdown report from smart JSON
python3 scripts/generate_llm_analysis_report.py --input smart_baseline.json

# Custom output location
python3 scripts/generate_llm_analysis_report.py --input smart_baseline.json --output my_smart_report.md
```

## 🎯 Smart Auditing Benefits

### **Real Results from Your Documentation:**
- **developer-journey.md**: 75% → 89% (+14 points) - excludes irrelevant code rules
- **Contextual scoring**: Each doc type gets appropriate criteria
- **No false positives**: Focus on relevant improvements only
- **Average improvement**: +8 points with 2.3 fewer irrelevant criteria per file

### **Smart Classification Examples:**
```
📖 developer-journey.md: Setup/None → 8/12 criteria (excludes all code rules)
🎓 use_text.md: Tutorial/Heavy → 12/12 criteria (applies all rules)
📋 app-document.md: Reference/Heavy → 11/12 criteria (reduced Q&A requirements)
❓ faq.md: Troubleshooting/None → Focuses on Q&A format only
```

## 📊 Traditional Auditing (For Comparison)

### Traditional Simple Audit
```bash
# Basic traditional audit
python3 scripts/basicAudit.py

# Verbose traditional audit
python3 scripts/basicAudit.py --verbose

# Custom output
python3 scripts/basicAudit.py --output traditional_audit --docs-path src/pages
```

### Traditional Comprehensive Audit
```bash
# Full traditional baseline
python3 scripts/doc_audit_runner.py --baseline --filtered --full-report --docs-path src/pages

# Traditional LLM analysis
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages

# Single file traditional analysis
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/guides/getting_started/developer-journey.md
```

## 🔄 Recommended Workflow Steps

### 1. **Initial Assessment** 
```bash
# Get smart overview of all documentation
python3 scripts/simpleAudit_smart.py --show-classification --verbose
```

### 2. **Deep Analysis**
```bash
# Comprehensive smart analysis with baseline
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages --baseline --output smart_baseline.json
```

### 3. **Compare Approaches**
```bash
# See how smart approach improves accuracy
python3 scripts/compare_audit_approaches.py
```

### 4. **Generate Reports**
```bash
# Create markdown report for sharing
python3 scripts/generate_llm_analysis_report.py --input smart_baseline.json --output smart_analysis_report.md
```

### 5. **Focus Areas Analysis**
```bash
# Analyze specific problem areas
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages/guides/getting_started/ --verbose

# Single file deep dive
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages/guides/getting_started/developer-journey.md
```

### 6. **Track Improvements**
```bash
# After making changes, compare against baseline
python3 scripts/llm_readiness_analyzer_smart.py --docs-path src/pages --compare smart_baseline.json
```

## 💡 Pro Tips

- **Use `--show-classification`** to understand how files are categorized
- **Start with simple smart audit** for quick overview, then use comprehensive for deep analysis
- **Always use smart approach** for accurate assessment - traditional is just for comparison
- **Focus improvements by content type** - tutorial issues vs reference issues are different
- **Track `criteria_applied` vs `criteria_excluded`** for insights into rule relevance

