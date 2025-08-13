---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - MCP
  - Model Context Protocol
  - Development Tools
  - TypeScript
  - API Documentation
title: Adobe Express Add-on MCP Server
description: Learn how to set up and use the Adobe Express Add-on MCP Server for enhanced development workflow in compatible editors like Cursor.
contributors:
  - https://github.com/hollyschinsky
---

# Adobe Express Add-on MCP Server (Beta)

Stop switching tabs. Get Adobe Express Add-on documentation and TypeScript definitions directly in your AI-assisted IDE through the Model Context Protocol (MCP). Build faster with grounded answers and accurate code suggestions.

> **Status: Public Beta** - We're actively improving based on developer feedback. API and tool surfaces may change.

> **"Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools."** — [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)

## What it does

The MCP server gives you structured access to add-on docs—so you get accurate, context-aware answers for coding, debugging, and building add-ons quickly.

This MCP server connects your IDE to Adobe's Express Add-on ecosystem, providing:

- **Semantic Documentation Search**: Find relevant guides, examples, and tutorials without leaving your editor
- **TypeScript Definitions**: Get accurate code completions and reduce AI hallucinations with official SDK types
- **Structured Access**: Your LLM gets grounded information from the latest Adobe Express Add-on documentation

**How it works**: The server searches a preprocessed index of Adobe Express Add-on documentation and returns semantically relevant chunks to your LLM. It's compatible with any MCP-enabled IDE and any LLM.

## Prerequisites

- **Node.js 18+** (check with `node --version`)
- **MCP-compatible IDE** (Cursor, Claude Desktop, etc.)
- **Internet connection** (for initial npx download)

## Quick Setup (No Installation Required)

You don't need to clone or build anything. Just configure your MCP client to launch the server via npx.

### For Cursor Users

Add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "adobe-express-addon": {
      "command": "npx",
      "args": [
        "@adobe/ccweb-add-on-dev-mcp-server@latest",
        "--yes"
      ]
    }
  }
}
```

### For Claude Desktop Users

Add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "adobe-express-addon": {
      "command": "npx",
      "args": [
        "@adobe/ccweb-add-on-dev-mcp-server@latest",
        "--yes"
      ]
    }
  }
}
```

**Verification**: Most IDEs show a green indicator when the MCP server connects successfully. The LLM will automatically invoke tools based on your prompts.

<!-- ## Available Tools

The server provides two powerful tools for Adobe Express Add-on development:

### 1. `get_relevant_documentations`

Searches the official Adobe Express Add-on documentation for relevant content.

**Great for questions like:**

- "How do I create and style text in Adobe Express?"
- "What are the steps for implementing drag-and-drop functionality?"
- "How does the Document API work for manipulating elements?"
- "Show me examples of using the color picker component."

### 2. `get_typedefinitions`

Returns TypeScript definitions for Express Add-on APIs to improve code generation and validation.

**Available API surfaces:**

- **`iframe-ui`**: UI components and user interactions
- **`express-document-sdk`**: Document manipulation and element creation
- **`add-on-sdk-document-sandbox`**: Sandboxed document operations

**Key types include**: `Editor`, `Node`, `TextNode`, `Color`, `Rectangle`, `TextStyle`, `Document`, etc.

**Great for requests like:**

- "Show me the Editor interface and its methods"
- "What properties does a TextNode have?"
- "Give me the Color type definition and its available methods" -->

## Example Questions

**Great for questions like:**

- "How do I create and style text in Adobe Express?"
- "What are the steps for implementing drag-and-drop functionality?"
- "How does the Document API work for manipulating elements?"
- "Show me examples of using the color picker component."

<!-- ## Quick Reference

| Tool | Use Case | Example Query |
|------|----------|---------------|
| `get_relevant_documentations` | Find guides and examples | "How do I create text?" |
| `get_typedefinitions` | Get API types and interfaces | "Show me Editor interface" |

**Popular API Surfaces:**

- `iframe-ui`: UI components and interactions
- `express-document-sdk`: Document manipulation APIs  
- `add-on-sdk-document-sandbox`: Sandboxed operations

## Why Developers Love It

- **🚀 Faster Development**: No more tab-switching between docs and code
- **🎯 Grounded Answers**: Semantic search over official Adobe documentation
- **💪 Type-Safe Code**: LLM generates better code with accurate type definitions
- **🔍 Context-Aware**: Your LLM understands your specific Express Add-on needs -->

## Pro Tips for Better Results

- **Be Specific**: "Add a stroke to a rectangle" vs "Style shapes"
- **Include Context**: "I'm building a text editor add-on" helps narrow results
- **Use Technical Terms**: "text styling" vs "make it look good"
- **Ask for Examples**: "Show me code examples for text manipulation"
- **Specify Surfaces**: "Show me iframe-ui types" vs generic requests

## Current Limitations

- **Beta Status**: API and tool surfaces may evolve based on feedback
- **Documentation Scope**: Covers official Adobe Express Add-on docs only
- **Update Frequency**: Documentation index updates periodically, not real-time
- **IDE Requirement**: Requires MCP-compatible IDE for full functionality
- **Network Dependency**: Initial setup requires internet for npx download

## Compatibility

- **Adobe Express SDK**: Latest stable versions
- **Node.js**: 18.0.0 or higher required
- **MCP Protocol**: v1.0 supported
- **Tested IDEs**: Cursor 0.40+, Claude Desktop 1.0+

## Getting Started Workflow

1. **Configure your IDE** (see setup instructions above)
2. **Test the connection** - ask a simple question like "How do I create text?"
3. **Explore the APIs** - try "Show me the Editor interface"
4. **Build something** - use the tools while developing your add-on

## For Contributors

If you're developing or modifying the server:

```bash
npm install
npm run build
```

**Local Development Configuration:**

```json
{
  "mcpServers": {
    "adobe-express-addon": {
      "command": "node",
      "args": ["./dist/server.js"]
    }
  }
}
```

**Debug with MCP Inspector:**

```bash
npm run inspect
```

(After rebuilding, reload the MCP server in your client.)

Transport: STDIO.

### Publishing (maintainers)

```bash
npm run build
npm login # if needed
npm publish
```

## What's New in Beta

- **v1.0.0-beta**: Initial release with documentation search and TypeScript definitions
- **Coming Soon**: Real-time documentation updates, additional API surfaces
- **Your Feedback**: We're actively collecting input to improve accuracy and coverage

## FAQ

### Does this generate code?

No—it provides context and types to your existing LLM. Your IDE/LLM handles code generation.

### Which IDEs work?

Any IDE supporting MCP: Cursor, Claude Desktop, and others.

### Who should use this?

Adobe Express add-on developers who want faster, more accurate development workflows.

### Is it free?

Yes, free during and after beta.

## Troubleshooting

### Server Won't Start

- ✅ Check Node.js version: `node --version` (needs 18+)
- ✅ Verify MCP config JSON syntax
- ✅ Ensure firewall allows npx downloads

### No Documentation Results

- ✅ Use specific technical terms ("text styling" vs "make it pretty")
- ✅ Try broader queries first, then narrow down
- ✅ Double-check API names and concepts

### Missing Type Definitions

- ✅ Specify the correct API surface (iframe-ui, express-document-sdk, etc.)
- ✅ Ensure your IDE supports MCP protocol
- ✅ Ask for specific types rather than general requests

## Resources & Support

- **📚 Documentation**: [Adobe Express Add-on Guides](https://developer.adobe.com/express/add-ons/docs/guides/)
- **💡 Examples**: [Samples Repository](https://github.com/AdobeDocs/express-add-on-samples)
- **📋 Updates**: [Changelog](https://developer.adobe.com/express/add-ons/docs/guides/getting_started/changelog/)
- **💬 Community**: [Adobe Express Add-on Developers Discord](https://discord.com/invite/nc3QDyFeb4)
- **🔍 Forum**: [Adobe Express Developers Community](https://community.adobe.com/t5/adobe-express-developers/ct-p/ct-adobe-express-developers?page=1&sort=latest_replies&lang=all&tabid=all)
