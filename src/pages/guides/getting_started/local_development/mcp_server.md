---
keywords:
  - Adobe Express
  - Add-on SDK
  - MCP Server
  - MCP (Model Context Protocol)
  - Development Tools
  - JavaScript
  - TypeScript
  - API References
  - LLM tools 
  - AI-assisted coding
  - AI-assisted debugging
  - Vibe Coding
  - Code Generation
  - TypeScript Definitions
title: Adobe Express Add-on MCP Server
description: Learn how to set up and use the Adobe Express Add-on MCP Server for enhanced development workflow in compatible editors like Cursor.
contributors:
  - https://github.com/hollyschinsky
---

# Adobe Express Add-on MCP Server (Beta)

Access Adobe Express Add-on documentation directly in your IDE—no tab switching required. Get Adobe Express Add-on documentation and TypeScript definitions directly in your AI-assisted IDE through the Model Context Protocol (MCP). Build faster with grounded answers and accurate code suggestions.

> **"Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools."** — [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)

## **Status: Public Beta**

We're actively improving based on developer feedback. API and tool surfaces may change.

## What it does

The Adobe Express Add-on MCP Server gives you structured access to Adobe Express add-on developer resources to help you get accurate, context-aware answers for coding, debugging, and building full-fledged add-ons, quickly.

This MCP server connects your IDE to Adobe's Express Add-on ecosystem, providing capabilities to ask questions and generate code with:

- **Semantic Documentation Search**: Find relevant guides, examples, and tutorials without leaving your editor
- **TypeScript Definitions**: Get accurate code completions and reduce AI hallucinations with official SDK types
- **Structured Access**: Your LLM gets grounded information from the latest Adobe Express Add-on documentation

**How it works**: The server searches a preprocessed index of Adobe Express Add-on documentation and returns semantically relevant chunks to your LLM. It works with MCP-compatible IDEs like Cursor, Claude Desktop, and others.

## Prerequisites

- **Node.js 18+** (check with `node --version`)
- **MCP-compatible IDE** (Cursor, Claude Desktop, etc.)
- **Internet connection** (for initial `npx` download)

## Quick Setup (No Installation Required)

You don't need to clone or build anything. Just configure your MCP client to launch the server via `npx`.

### Step 1: Configure your IDE

#### For Cursor Users

Add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "adobe-express-add-on": {
      "command": "npx",
      "args": [
        "@adobe/express-add-on-dev-mcp@latest",
        "--yes"
      ]
    }
  }
}
```

#### For Claude Desktop Users

Add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "adobe-express-add-on": {
      "command": "npx",
      "args": [
        "@adobe/express-add-on-dev-mcp@latest",
        "--yes"
      ]
    }
  }
}
```

### Step 2: Verify the Connection

Many IDEs show a green indicator when the MCP server connects successfully, for example in Cursor:  

<img src="img/mcp-server-enabled.png" alt="Example of MCP server enabled in Cursor" width="300"/>

The LLM will automatically invoke tools based on your prompts, for example:

<img src="img/mcp-tool-call-example.png" alt="Example of MCP tool call in Cursor" width="400"/>

## How to use it

### Usage Examples

The MCP server excels at both answering questions and generating code for Adobe Express add-ons. Here are examples of effective prompts:

### Documentation & Learning

- "How do I create and style text in Adobe Express?"
- "What are the steps for implementing drag-and-drop functionality?"
- "How does the Document API work for manipulating elements?"
- "Show me examples of using the color picker component"

### Code Generation & Implementation

- "Implement a color picker in my add-on"
- "Generate code to create a text element with custom styling"
- "Build a drag-and-drop interface for uploading images"
- "Create a button that adds a rectangle to the canvas"
- "Write TypeScript code to handle user text input and apply it to the document"
- "Implement an image import feature with file validation"
- "Show me a sample code snippet for using a modal dialog"

### Debugging & Troubleshooting

- "Why isn't my add-on loading in Adobe Express?"
- "Why isn't my text element appearing on the canvas?"
- "Debug this error when trying to add an image to the document (error message: ...)"
- "How do I debug an issue in my `code.js` file?"

## Best Practices for Effective Use

### Set Context for the Entire Conversation

**Start your session** by describing your technical setup and visual requirements. This gives the LLM context for the entire conversation and ensures all subsequent responses are tailored to your specific tech stack.

**Example of a well-structured prompt:**

> "I'm building an Adobe Express add-on using JavaScript/TypeScript and React with a UI based on Spectrum Web Components using the Express theme. My user interface needs a text field, a button, a modal dialog and a color picker. Please generate the code and show me how to set it up using the Adobe Add-on CLI."

**Key elements to include:**

- **Programming languages**: JavaScript, TypeScript
- **Framework**: React (or vanilla JS)
- **UI components**: Spectrum Web Components with Express theme
- **Specific components needed**: Modal dialog, color picker, buttons, etc.
- **Build tools**: Adobe Add-on CLI for setup and development

<InlineAlert variant="success" slots="header, text1"/>

**Pro tip:**

Start with a project scaffolded by the Adobe Add-on CLI with your preferred tech stack, then ask for specific feature implementations. This gives the LLM better context about your project structure and dependencies.

### Craft Effective Prompts

- **Be Specific**: "Add a stroke to a rectangle" vs "Style shapes"
- **Include Context**: "I'm building a text editor add-on" helps narrow results
- **Use Technical Terms**: "text styling" vs "make it look good"
- **Ask for Examples**: "Show me code examples for text manipulation"
- **Request Code Generation**: "Generate TypeScript code to..." or "Implement a feature that..."

### Manage Your Sessions

- **Keep Sessions Focused**: Start new conversations for different features or topics
- **Be Explicit**: Ask the agent to "use the available tools" for more comprehensive answers
- **Provide Context**: Mention what you're building and your current progress
- **Iterate Gradually**: Build features step-by-step rather than asking for complete applications

## Troubleshooting

<InlineNestedAlert header="true" variant="neutral" iconPosition="right">

  **Server Won't Start**

  - ✅ Check Node.js version: `node --version` (needs 18+)
  - ✅ Verify MCP config JSON syntax and file location
  - ✅ Ensure firewall allows `npx` downloads
  - ✅ Restart your IDE after configurationchanges
  - ✅ Check for MCP server status indicators

</InlineNestedAlert>

<InlineNestedAlert header="true" variant="neutral" iconPosition="right">

  **No Documentation Results**

  - ✅ Use specific technical terms ("text styling" vs "make it pretty")
  - ✅ Try adding "Adobe Express Add-ons" for an additional context cue
  - ✅ Try broader queries first, then narrow down
  - ✅ Ask the agent to "use available tools" explicitly
  - ✅ Include context about what you're building

</InlineNestedAlert>

<InlineNestedAlert header="true" variant="neutral" iconPosition="right">

   **Poor Code Generation**

   - ✅ Be specific about what you want to implement
   - ✅ Mention the programming language and frameworks (TypeScript/JavaScript, React)
   - ✅ Provide context about your add-on's purpose
   - ✅ Ask for complete, working examples

</InlineNestedAlert>

<InlineNestedAlert header="true" variant="neutral" iconPosition="right">

  **Missing Type Definitions**

  - ✅ Specify the correct API surface (`iframe-ui`, `express-document-sdk`, `add-on-sdk-document-sandbox`)
  - ✅ Ask for specific types rather than general requests

</InlineNestedAlert>

## What's New in Beta

- **v1.0.0-beta**: Initial release with documentation search and TypeScript definitions
- **Coming Soon**: Real-time documentation updates, additional API surfaces
- **Your Feedback**: We're actively collecting input to improve accuracy and coverage. Have feedback? Join our [Adobe Express Add-on Developers Discord](https://discord.com/invite/nc3QDyFeb4) for real-time chat with the team and community and share your thoughts.

## Resources & Support

- **Documentation**: [Adobe Express Add-on Guides](https://developer.adobe.com/express/add-ons/docs/guides/)
- **Add-on Samples**: [Samples Repository](https://github.com/AdobeDocs/express-add-on-samples)
- **Updates**: [Changelog](https://developer.adobe.com/express/add-ons/docs/guides/getting_started/changelog/)
- **Community**: [Adobe Express Add-on Developers Discord](https://discord.com/invite/nc3QDyFeb4)
- **Forum**: [Adobe Express Developers Community](https://community.adobe.com/t5/adobe-express-developers/ct-p/ct-adobe-express-developers?page=1&sort=latest_replies&lang=all&tabid=all)

## FAQs

#### Q: Does this generate code?

**A:** Yes—it enhances your LLM's ability to generate accurate Adobe Express add-on code by providing relevant documentation and TypeScript definitions. Your IDE/LLM handles the actual code generation with improved context.

#### Q: Which IDEs work?

**A:** Any IDE supporting MCP: Cursor, Claude Desktop, and others.

#### Q: Who should use this?

**A:** Adobe Express add-on developers who want faster, more accurate development workflows.

#### Q: Is it free?

**A:** Yes, free during and after beta.

#### Q: Where else can I get help with MCP Server connection issues?

**A:** See [Model Context Protocol Debugging](https://modelcontextprotocol.io/legacy/tools/debugging) for more information.

<!--
# Adobe Express Add-on Development Rules

## Smple SWC Global Rules / System Prompt

1. Always use `swc-react` (@swc-react/*) for UI components instead of React Spectrum.
2. All `@swc-react/*` and `@spectrum-web-components/*` packages must use the same version (currently 1.7.0).
3. Every project must include Adobe Express theming:
   import "@spectrum-web-components/theme/theme-light.js";
   import "@spectrum-web-components/theme/express/theme-light.js";
   import "@spectrum-web-components/theme/scale-medium.js";
   import "@spectrum-web-components/theme/express/scale-medium.js";
   import { Theme } from "@swc-react/theme";
4. Handle events with React synthetic events; note `onChange` does not work for form elements. Use WC.jsx helper if needed.
5. Validate component props and events against Spectrum Web Components documentation (https://opensource.adobe.com/spectrum-web-components/).

* Best practices for prompting with MCP servers
* Template prompts or rules that enhance MCP functionality
* Guidelines for optimizing MCP interactions through context setting

## Rules before suggesting UI code:

Checklist before suggesting UI code:

- Using swc-react only? ✅
- Versions aligned (1.7.0)? ✅
- Express theming included? ✅
- Event handling correct (onChange caveat)? ✅
- Props/events from SWC docs? ✅
-->
