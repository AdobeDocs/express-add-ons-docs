AUDITING/REPORTING SCRIPTS USAGE

# This document outlines how to use the auditing and reporting scripts for the LLM Readiness project.

There are two main frameworks for auditing and reporting:
1. **Audit Framework #1**: Uses `doc_audit_runner.py` to run both LLM Markdown Linting and LLM Readiness Analyzer.
2. **Audit Framework #2**: Uses `doc_analyzer.py` and `express_issue_detector.py` for basic documentation analysis and Adobe Express specific issues.

## Audit Framework #1

### Doc Audit Runner (`doc_audit_runner.py`)

Calls both llm_markdown_linting.py and llm_readiness_analyzer.py and generates results in one JSON file.

### All files baseline - auto-saves to `baseline_doc_audit_complete_*.json file for later comparison
```bash
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/
```

### Filtered files (no refs or changelog) - baseline report - auto saves to `baseline_doc_audit_filtered_*.json` file for later comparison

```bash
python3 scripts/doc_audit_runner.py --filtered --baseline --docs-path src/pages/
```

### Filtered files (no refs or changelog) - anytime report  — auto saves to a `comprehensive_doc_audit_filtered_*.json` file (leave off —filtered to audit all files)

```bash
python3 scripts/doc_audit_runner.py --filtered --docs-path src/pages/
```

### All docs - full report with detailed file analysis - outputs to both a `detailed_doc_audit_*.json` (only each file and its details) and `comprehensive_doc-audit_*.json` (has overall scores plus detailed files info)

```bash
python3 scripts/doc_audit_runner.py --full-report --docs-path src/pages/
```

### Single file - anytime report - auto-saves to a `<filename>_doc_audit_*.json` file

```bash
python3 scripts/doc_audit_runner.py --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

### Single file - baseline report - auto-saves to a `baseline_<filename>_doc_audit_*.json` file for later comparison as updates are done
```bash
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

### Comparison reporting — uses the `--compare` flag with the file to compare to

```bash
// First run baseline to create baseline file
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/

// Compare (specify baseline file to compare to)
python3 scripts/doc_audit_runner.py --compare baseline_doc_audit_complete_20250723.json --docs-path src/pages/

// Generated JSON will include the following extra section
"comparison_with_baseline": {
    "timeline": {
      "baseline_date": "20250723_231658",
      "current_date": "20250723_235408",
      "days_elapsed": 0
    },
    "score_changes": {
      "overall_llm_score": {
        "baseline": 0.5490640467119705,
        "current": 0.5490640467119705,
        "change": 0.0
      }
    },
    "metric_changes": {
      "context_clarity_avg": {
        "baseline": 0.15441176470588241,
        "current": 0.15441176470588241,
        "change": 0.0
      },
      "code_completeness_ratio": {
        "baseline": 0.6181818181818182,
        "current": 0.6181818181818182,
        "change": 0.0
      },
      "error_documentation_coverage": {
        "baseline": 0.10784313725490197,
        "current": 0.10784313725490197,
        "change": 0.0
      }
    },
    "issue_changes": {
      "linter_errors": {
        "baseline": 581,
        "current": 581,
        "change": 0
      }
    },
    "progress_summary": []
  }
```

### Single file comparisons

```bash
python3 scripts/doc_audit_runner.py --baseline --docs-path src/pages/guides/learn/how_to/modal_dialogs.md

# After running the baseline, you can compare a single file against the baseline
python3 scripts/doc_audit_runner.py --compare baseline_modal_dialogs_doc_audit_20250723_233508.json --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

## LLM READINESS ONLY

### All files (defaults output to llm_readiness_report_*.json)
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages
```

### All files to your named json file
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages --output all_files_llm_readiness.json
```

### Single file (outputs to <filename>_llm_readiness_report_*.json)
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/guides/learn/how_to/modal_dialogs.md
```

### Single file to your named json
```bash
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages/guides/learn/how_to/modal_dialogs.md --output modal_dialogs_result.json
```

## LLM LINTING ONLY

### All files (console only)

```bash
python3 scripts/llm_markdown_linter.py src/pages/
```

### All files - output to your named json file

```bash
python3 scripts/llm_markdown_linter.py src/pages/ --output all_pages_linter_report.json
```

### Single file (console only)

```bash
python3 scripts/llm_markdown_linter.py src/pages/guides/learn/how_to/theme_locale.md
```

### Single file - output to your named json file

```bash
python3 scripts/llm_markdown_linter.py src/pages/guides/learn/how_to/theme_locale.md --output theme_locale_linter_report.json
```

### Auto-fix linter issues on single file (where possible — **THIS IS A WIP)

```bash
python3 scripts/llm_markdown_linter.py src/pages/guides/learn/how_to/theme_locale.md --fix
```
```bash
Note: Output will include what/if anything was fixed 

  🔧 Applying auto-fixes...
  No auto-fixable issues found.
```

### Comparing 

Compare llm readiness baselines (`--baseline` output goes to file with name `baseline_llm_readiness_report_*.json`)

```bash
python3 scripts/llm_readiness_analyzer.py --baseline --docs-path src/pages/
// This will create a baseline file like `baseline_llm_readiness_report_20250723_231658.json`
// Compare against the baseline
python3 scripts/llm_readiness_analyzer.py --compare baseline_llm_readiness_report_20250723_231658.json --docs-path src/pages/
```
## QUERY TESTER 

```bash
python3 scripts/query_based_doc_tester.py                
```

**Note:** Output goes to `query_test_report.json`

### USAGE help

```bash
python3 scripts/doc_analyzer.py -h
python3 scripts/llm_readiness_analyzer.py -h
python3 scripts/llm_markdown_linter.py -h
python3 scripts/query_based_doc_tester.py -h
```

## GENERATE MARKDOWN REPORTS

### Baseline Markdown Report

After you've run a baseline summary (ie: `python3 scripts/doc_audit_runner.py --filtered --baseline --docs-path src/pages/`), you can generate a markdown summary with the following (defaults to filtered scope because LLM Readiness phase 1 is addressing the core structure so by default it’s easier to exclude)

```bash
python3 scripts/generate_baseline_summary.py
```

**Note:** Result goes to reports folder as `reports/baseline_summary*.md`

### Comprehensive Markdown Report

```bash
// After you've run a non-baseline report with:
python3 scripts/doc_audit_runner.py --complete --docs-path src/pages/
// or
python3 scripts/doc_audit_runner.py --docs-path src/pages/

// Generate comprehensive markdown report based on the JSON output from the above command
python3 scripts/generate_comprehensive_style_report.py --input comprehensive_doc_audit_complete_20250723_234739.json
```

**Note:** Result goes to reports folder as `reports/comprehensive_style_report_*.md`

### Priority Summary Markdown Report

```bash
// Make sure to run the doc_audit_runner.py first to generate the necessary JSON files

// Then run the following command to generate the priority summary report:
python3 scripts/generate_priority_summary.py

// Result goes to reports folder as `reports/priority_summary_report_*.md`
```

### Linter Markdown Report

```bash
// After running the linter on all files
python3 scripts/llm_markdown_linter.py src/pages/ --output all_pages_linter_report.json
// Generate markdown report based on the JSON output from the above command
python3 scripts/generate_linter_report.py --input all_pages_linter_report.json

// Result goes to reports folder as `reports/llm_markdown_linter_report_*.md`
```

### LLM Readiness Markdown Report

```bash
// After running the LLM Readiness Analyzer on all files
python3 scripts/llm_readiness_analyzer.py --docs-path src/pages --output all_files_llm_readiness.json
// Generate markdown report based on the JSON output from the above command
python3 scripts/generate_llm_analysis_report.py --input all_files_llm_readiness.json    

// Result goes to reports folder as `reports/llm_readiness_analysis_report_*.md`
```

## Audit Framework #2 (doc_analyzer.py and express_issue_detector.py)

This auditing framework can be used for further checks and is another alternative to locating issues. It is used for basic documentation analysis and Adobe Express specific issues.

### Basic Auditing (linting and readiness analysis -- higher level than doc_audit_runner.py)

```bash
# For basic analysis of all files
python3 scripts/doc_analyzer.py src/pages/ 

# For basic analysis of all files and output to a specific file
python3 scripts/doc_analyzer.py src/pages/
--output doc_analyzer_audit.json

# For verbose output
python3 scripts/doc_analyzer.py src/pages/ --output doc_analyzer_audit_verbose_$(date +%Y%m%d).json --verbose
```

### Basic analysis - all files 

```bash
python3 scripts/doc_analyzer.py src/pages --output reports/doc_analyzer_audit_$(date +%Y%m%d).json
```

### Basic analysis - all guides
```bash
python3 scripts/doc_analyzer.py src/pages/guides/ --output reports/doc_analyzer_guides_only_audit_$(date +%Y%m%d).json
```

### Basic analysis - single file
```bash
python3 scripts/doc_analyzer.py src/pages/guides/learn/how_to/document_metadata.md
```
	
### Adobe Express specific issues analysis   - all files
```bash
python3 scripts/express_issue_detector.py express-add-ons-docs/src/pages/ --output reports/express-issues-$(date +%Y%m%d).json --detailed
```

### Adobe Express specific issues analysis  - single file
```bash
python3 scripts/express_issue_detector.py express-add-ons-docs/src/pages/guides/getting_started/hello-world.md --detailed
```

