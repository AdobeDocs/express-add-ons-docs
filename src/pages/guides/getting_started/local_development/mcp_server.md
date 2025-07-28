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

# Adobe Express Add-on MCP Server

The Adobe Express Add-on MCP Server provides developers with access to comprehensive documentation and TypeScript definitions for Adobe Express add-on development through the Model Context Protocol (MCP). This enables AI-powered development assistance in compatible editors like Cursor.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI assistants to securely access external data sources and tools. In the context of Adobe Express add-on development, the MCP server provides:

- Real-time access to the latest Adobe Express add-on documentation
- Complete TypeScript definitions for all SDK APIs
- Contextual code assistance and examples
- Enhanced development workflow integration

## Setup

### Prerequisites

- A compatible MCP client (such as [Cursor](https://cursor.sh/))
- Node.js (for the MCP server)
- Access to Adobe's internal npm registry

### Configuration

Add the Adobe Express Add-on MCP Server to your MCP configuration file:

**For Cursor (`.cursor/mcp.json`):**

```json
{
  "mcpServers": {
    "ccweb-add-on-dev-mcp-server": {
      "command": "npx",
      "args": [
        "-registry=https://artifactory.corp.adobe.com/artifactory/api/npm/npm-adobe-release/",
        "@adobe/ccweb-add-on-dev-mcp-server"
      ]
    }
  }
}
```

**For Claude Desktop (`claude_desktop_config.json`):**

```json
{
  "mcpServers": {
    "ccweb-add-on-dev-mcp-server": {
      "command": "npx",
      "args": [
        "-registry=https://artifactory.corp.adobe.com/artifactory/api/npm/npm-adobe-release/",
        "@adobe/ccweb-add-on-dev-mcp-server"
      ]
    }
  }
}
```

## Available Tools

The Adobe Express Add-on MCP Server provides two main tools for development assistance:

### 1. Documentation Retrieval (`get_relevant_documentations`)

This tool searches and retrieves relevant documentation from the Adobe Express add-on developer site.

**Usage Examples:**
- "How do I create text in Adobe Express?"
- "What are the steps for drag and drop functionality?"
- "How does the Document API work?"
- "Show me examples of using the color picker"

**Features:**
- Semantic search across all Adobe Express add-on documentation
- Real-time access to the latest guides, tutorials, and references
- Contextual examples and code snippets
- Links to related documentation sections

### 2. TypeScript Definitions (`get_typedefinitions`)

Provides complete TypeScript definitions for Adobe Express add-on APIs, enabling better code completion and type checking.

**Available API Types:**

#### `express-document-sdk`
Complete TypeScript definitions for the Adobe Express Document APIs, including:
- **Document manipulation**: Create, modify, and manage Express documents
- **Content creation**: Add text, shapes, images, and other elements
- **Styling and effects**: Apply fills, strokes, colors, and visual effects
- **Layout and positioning**: Control element placement and transformations
- **Media handling**: Work with images, videos, and audio content

Key classes and interfaces:
- `Editor` - Main entry point for document manipulation
- `Node` and subclasses - Represent document elements
- `Color`, `Fill`, `Stroke` - Styling properties
- `TextNode`, `RectangleNode`, `EllipseNode` - Specific element types

#### `add-on-sdk-document-sandbox`
TypeScript definitions for the Document Sandbox runtime environment:
- **Runtime management**: Handle sandbox execution environment
- **Communication APIs**: Bridge between UI and document sandbox
- **Type safety**: Ensure proper data exchange between contexts

Key components:
- `AddOnDocumentSandboxSdk` - Main SDK interface
- `Runtime` - Sandbox execution environment
- Communication proxies and type definitions

#### `iframe-ui`
Complete TypeScript definitions for building add-on UI panels:
- **UI components**: Access to Adobe Express UI elements
- **Event handling**: Respond to user interactions and application events
- **Document operations**: Import/export content, create renditions
- **OAuth integration**: Handle user authentication
- **Storage management**: Persist add-on data

Key interfaces:
- `AddOnSDKAPI` - Main SDK entry point
- `Application` - Access to Express application features
- `Document` - Document-level operations
- `UI` - User interface management

## Usage Examples

### Getting Documentation Help

Ask questions about Adobe Express add-on development:

```
"How do I create a rectangle with rounded corners in Adobe Express?"
```

The MCP server will provide relevant documentation, code examples, and links to detailed guides.

### Getting TypeScript Definitions

Request type definitions for better development experience:

```
"Show me the TypeScript definitions for the Editor class"
```

This will provide complete type information for enhanced IDE support and code completion.

### Development Workflow Integration

The MCP server integrates seamlessly with your development workflow:

1. **Code Completion**: Get accurate TypeScript definitions for all Adobe Express APIs
2. **Documentation Lookup**: Instantly access relevant documentation while coding
3. **Best Practices**: Learn recommended patterns and approaches
4. **Error Resolution**: Get help with common issues and solutions

## Benefits

### Enhanced Development Experience

- **Real-time Documentation**: Access the latest documentation without leaving your editor
- **Type Safety**: Complete TypeScript definitions for all Adobe Express APIs
- **Contextual Help**: Get relevant examples and guidance based on your current task
- **Faster Development**: Reduce context switching and documentation lookup time

### AI-Powered Assistance

- **Intelligent Search**: Semantic search finds relevant content even with partial information
- **Code Generation**: AI can suggest code patterns using accurate type information
- **Problem Solving**: Get help troubleshooting issues with Adobe Express add-on development
- **Learning Acceleration**: Discover new APIs and features through contextual suggestions

## Best Practices

### Effective Queries

When asking for documentation help:

- **Be specific**: "How do I add a stroke to a rectangle?" vs "How do I style shapes?"
- **Include context**: "I'm building a text editor add-on and need to format text"
- **Ask for examples**: "Show me code examples for creating image containers"

### TypeScript Integration

To maximize the benefits of TypeScript definitions:

1. **Set up your project** with proper TypeScript configuration
2. **Import types** from the appropriate SDK modules
3. **Use IDE features** like IntelliSense and error checking
4. **Validate your code** against the provided type definitions

## Troubleshooting

### Common Issues

**MCP Server Not Starting:**
- Verify Node.js is installed and accessible
- Check npm registry access permissions
- Ensure the MCP configuration file syntax is correct

**Documentation Not Found:**
- Try rephrasing your question with different keywords
- Check for typos in API names or concepts
- Use broader terms and then narrow down

**TypeScript Definitions Missing:**
- Verify the correct API type is requested
- Ensure your TypeScript configuration includes the definitions
- Check that your IDE supports MCP integration

### Getting Help

If you encounter issues with the Adobe Express Add-on MCP Server:

1. Check the [Adobe Express Add-on Documentation](https://developer.adobe.com/express/add-ons/docs/)
2. Verify your MCP client configuration
3. Test with simple queries to ensure the server is responding
4. Contact the Adobe Express Add-on team for support

## Related Resources

- [Adobe Express Add-on Developer Documentation](https://developer.adobe.com/express/add-ons/docs/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Cursor Editor Documentation](https://cursor.sh/docs)
- [Adobe Express Add-on Samples](https://github.com/AdobeDocs/express-add-on-samples)
