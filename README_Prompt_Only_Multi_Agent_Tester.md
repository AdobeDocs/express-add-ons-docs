# Multi-Agent Documentation Tester

A sophisticated AI-powered system that uses multiple specialized agents to evaluate Adobe Express Add-on documentation quality and LLM-readiness by answering real developer queries.

## Overview

This tool employs an agentic approach where multiple AI agents work together to:
1. **Decompose** complex developer queries into specific sub-questions
2. **Search** documentation intelligently with context awareness
3. **Assess** content quality, completeness, and clarity
4. **Synthesize** results into actionable insights and recommendations

## Architecture

The system consists of four specialized agents orchestrated by a central coordinator:

- **QueryAgent**: Breaks down complex developer questions into searchable components
- **SearchAgent**: Traverses documentation with semantic understanding and context memory
- **AssessmentAgent**: Evaluates content quality across multiple dimensions
- **SynthesisAgent**: Generates comprehensive reports and recommendations

## Installation

```bash
# Install required dependencies
pip install -r scripts/requirements-agentic.txt

# For regular OpenAI
export OPENAI_API_KEY="your-api-key-here"

# For Azure OpenAI
export AZURE_OPENAI_KEY="your-azure-api-key-here"
```

## Usage

### Basic Usage

```bash
python3 scripts/prompt_only_multi_agent_tester.py \
  --docs-path express-add-ons-docs/src/pages \
  --queries scripts/developer_queries.json \
  --output evaluation_report.json
```

### Azure OpenAI Usage

```bash
python3 scripts/prompt_only_multi_agent_tester.py \
  --docs-path express-add-ons-docs/src/pages \
  --queries scripts/developer_queries.json \
  --azure-config scripts/azure_config.json \
  --output evaluation_report.json  
```

### Advanced Options

```bash
# Regular OpenAI with custom settings
python3 prompt_only_multi_agent_tester.py \
  --docs-path express-add-ons-docs/src/pages \
  --queries developer_queries.json \
  --openai-api-key $OPENAI_API_KEY \
  --output detailed_evaluation.json \
  --model gpt-4-turbo-preview \
  --max-concurrent 5

# Azure OpenAI with custom config
python3 prompt_only_multi_agent_tester.py \
  --docs-path express-add-ons-docs/src/pages \
  --queries developer_queries.json \
  --azure-config azure_openai_config.json \
  --openai-api-key $AZURE_OPENAI_KEY \
  --max-concurrent 3
```

### Parameters

- `--docs-path`: Path to documentation directory (required)
- `--queries`: Path to JSON file containing developer queries (required)
- `--openai-api-key`: OpenAI API key (or set OPENAI_API_KEY/AZURE_OPENAI_KEY env var)
- `--azure-config`: Path to Azure OpenAI configuration JSON file (optional)
- `--output`: Output file path (default: multi_agent_evaluation_report.json)
- `--model`: OpenAI model to use (default: gpt-4-turbo-preview, ignored if using Azure)
- `--max-concurrent`: Maximum concurrent evaluations (default: 3)

## Azure OpenAI Configuration

The Azure configuration file should follow this format:

```json
{
  "evaluator_llm": {
    "args": {
      "azure_endpoint": "https://your-endpoint.openai.azure.com",
      "openai_api_version": "2024-02-15-preview",
      "deployment_name": "gpt-4o",
      "model_name": "gpt-4o",
      "temperature": 0.0,
      "max_tokens": 1600,
      "top_p": 1.0,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "n": 1
    }
  }
}
```

### Azure Configuration Parameters

- `azure_endpoint`: Your Azure OpenAI service endpoint
- `openai_api_version`: API version (recommended: "2024-02-15-preview")
- `deployment_name`: Your model deployment name in Azure
- `model_name`: The underlying model (e.g., "gpt-4o")
- `temperature`: Controls randomness (0.0 = deterministic)
- `max_tokens`: Maximum response length
- `top_p`: Nuclear sampling parameter
- `frequency_penalty`: Reduces repetition
- `presence_penalty`: Encourages topic diversity
- `n`: Number of completions to generate

## Query Format

The queries JSON file should contain an array of query objects:

```json
[
  {
    "query": "How do I create a simple text element with custom fonts in my add-on?",
    "category": "text_manipulation",
    "complexity": "beginner",
    "context": "Developer wants to add styled text to Adobe Express documents"
  },
  {
    "query": "What's the difference between UI Runtime and Document Sandbox?",
    "category": "architecture_confusion", 
    "complexity": "beginner",
    "context": "New developer confused about add-on architecture"
  }
]
```

### Query Categories

Recommended categories for comprehensive evaluation:

- `text_manipulation`: Text creation, formatting, fonts
- `architecture_confusion`: UI Runtime vs Document Sandbox
- `error_handling`: Error scenarios and troubleshooting
- `ui_components`: Interface elements and interactions
- `performance`: Optimization and best practices
- `document_api`: Document manipulation and creation
- `api_integration`: External service integration
- `development_setup`: Environment and tooling
- `deployment`: Publishing and distribution

## Output

The evaluator generates two files:

### 1. Detailed JSON Report (`evaluation_report.json`)

Contains complete evaluation data including:
- Individual query assessments with scores
- Content gaps and recommendations
- Confidence metrics
- Found documentation sections

### 2. Human-Readable Summary (`evaluation_report_summary.txt`)

Provides an executive summary with:
- Overall scores and statistics
- Top gaps identified
- Priority recommendations
- Documentation strengths

## Evaluation Metrics

Each query is evaluated across four dimensions:

1. **Coverage Score** (0-1): How well documentation addresses all aspects of the query
2. **Completeness Score** (0-1): Presence of working examples, error handling, practical guidance
3. **Clarity Score** (0-1): Information clarity, structure, and ease of understanding
4. **Overall Score** (0-1): Weighted average considering all factors

## Sample Results

```
📊 RESULTS SUMMARY:
- Queries evaluated: 30
- Average score: 0.73/1.00
- Coverage by Category: {"text_manipulation": 0.85, "architecture": 0.62}

📈 TOP INSIGHTS:
• Add more error handling examples for async operations
• Improve UI Runtime vs Document Sandbox context clarity
• Include complete working code examples in tutorials
```

## Key Features

### Agentic Intelligence
- **Multi-agent coordination**: Specialized agents for different evaluation aspects
- **Context awareness**: Agents build and share knowledge across evaluations
- **Iterative refinement**: Agents can revisit and improve assessments

### No Ground Truth Required
- **Self-evaluating**: System assesses quality without pre-defined correct answers
- **Real-world validation**: Uses actual developer queries instead of synthetic tests
- **Adaptive assessment**: Evaluates based on practical developer needs

### Actionable Insights
- **Specific gaps**: Identifies exactly what information is missing
- **Priority recommendations**: Ranks improvements by impact
- **Category analysis**: Shows strengths and weaknesses by topic area

## Advanced Configuration

### Custom Agent Behaviors

You can modify agent behaviors by editing the system prompts in each agent class:

- `QueryAgent.decompose_query()`: Customize query breakdown logic
- `SearchAgent._analyze_document_content()`: Adjust relevance scoring
- `AssessmentAgent.assess_content()`: Modify evaluation criteria
- `SynthesisAgent.synthesize_results()`: Change reporting focus

### Performance Tuning

- **Concurrent evaluations**: Adjust `--max-concurrent` based on API limits
- **Content chunking**: Modify content size limits in SearchAgent
- **Relevance thresholds**: Adjust minimum relevance scores for content inclusion

## Troubleshooting

### Common Issues

**API Rate Limits**
```bash
# Reduce concurrent evaluations
--max-concurrent 1
```

**Memory Issues with Large Documentation**
```bash
# Process in smaller batches or reduce content chunk sizes
```

**Low Relevance Scores**
- Check query phrasing and specificity
- Ensure documentation covers the query topics
- Review category classifications

### Debug Mode

Add logging for detailed debugging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Contributing

To extend the evaluator:

1. **Add new agent types**: Implement additional specialized agents
2. **Enhance search**: Integrate vector embeddings for semantic search
3. **Improve assessment**: Add domain-specific evaluation criteria
4. **Custom outputs**: Create new reporting formats

## License

This tool is part of the Adobe Express Add-on documentation quality framework.