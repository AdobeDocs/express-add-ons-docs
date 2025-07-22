# LLM Markdown Linting

## `llm_markdown_linter.py` script

### What it analyzes

- **AI Misinformation Prevention**: Detects fake API methods that don't exist but are commonly hallucinated by AI
- **Code Syntax Issues**: Missing imports, undefined variables, incomplete code examples
- **Context Clarity**: Whether code examples clearly indicate UI vs Sandbox context
- **Code Completeness**: Ensures JavaScript examples include all necessary imports and structure
- **Error-First Documentation**: Suggests adding error handling sections
- **Chunking Optimization**: Ensures content works well with MCP server 1000-character chunks

### Start in the root of the project

```
cd express-add-ons-docs
```

#### Lint all files in the src/pages directory, run:

```
python3 scripts/llm_markdown_linter.py src/pages/
```

#### Lint and save output 

To save results to a JSON file (for later comparison or later fixing), use the `--output` flag:

```
python3 scripts/llm_markdown_linter.py src/pages/ --output reports/linter/all_pages_linting_results.json
```

#### Lint a specific file:

```
python3 scripts/llm_markdown_linter.py src/pages/guides/learn/how_to/theme_locale.md
```

**Note:** Output goes to console with line by line list of errors, warnings, and info, ie:

- 📝 ISSUES FOUND:
   - ⚠️ Line 36: JavaScript code block lacks context header (UI Runtime vs Document Sandbox)
      - 💡 Suggestion: Add header like: ### Document Sandbox (code.js) or ### UI Runtime (index.js)
   - ⚠️ Line 57: Code example lacks sufficient explanatory context
   ...

##### To attempt to auto-fix errors, run:

```
python3 scripts/llm_markdown_linter.py --file src/pages/guides/learn/how_to/use_text.md --fix
```






