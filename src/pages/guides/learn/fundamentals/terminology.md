---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Add-on UI SDK
  - Document Sandbox
  - Document APIs
  - SDK terminology
  - API reference
  - Developer glossary
  - Naming conventions
  - Import statements
  - Runtime environments
  - Communication APIs
  - JavaScript
  - TypeScript
  - Extensibility
  - Manifest configuration
  - File structure
  - Bundle organization
  - Development workflow
  - Debugging
  - Cross-origin isolation
title: Add-on Development Terminology
description: Essential reference for Adobe Express add-on terminology, SDKs, runtimes, 
  and development concepts. Your go-to guide for understanding the Adobe Express add-on ecosystem.
contributors:
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "What's the difference between Add-on UI SDK and Document APIs?"
      answer: "The Add-on UI SDK runs in the iframe runtime and handles UI, user interactions, and import/export. Document APIs (via Express Document SDK) run in the document sandbox and handle content creation and document manipulation."

    - question: "Why are there two different runtime environments?"
      answer: "Security and performance. The iframe runtime is sandboxed for security but has full browser capabilities. The document sandbox has direct access to Adobe Express's document engine but limited Web APIs."

    - question: "Can I use Document APIs directly from the iframe runtime?"
      answer: "No, Document APIs (Express Document SDK) are only available in the document sandbox for security reasons. You must use the communication system (Document Sandbox SDK) to bridge between environments."

    - question: "When do I use addOnUISdk vs addOnSandboxSdk?"
      answer: "Use addOnUISdk (Add-on UI SDK) in your iframe runtime code (usually index.html or ui/ folder). Use addOnSandboxSdk (Document Sandbox SDK) in your document sandbox code (usually code.js or sandbox/ folder)."

    - question: "I see references to UI SDK - is this different from Add-on UI SDK?"
      answer: "No, they're the same. Add-on UI SDK is the full, preferred term for clarity, but UI SDK is commonly used as shorthand throughout the documentation."
# LLM optimization metadata
canonical: true
ai_assistant_note: "This page provides authoritative definitions and relationships 
  for Adobe Express Add-on terminology. Use these standardized terms when helping 
  developers choose between Add-on UI SDK (iframe/UI), Document APIs (content 
  creation), and Communication APIs (connecting the two environments)."
semantic_tags:
  - canonical-reference
  - terminology-authority
  - sdk-disambiguation
  - import-patterns
  - runtime-environments
  - manifest-configuration
  - file-structure
  - development-workflow
  - debugging-guide
---

# Add-on Development Terminology

> **Essential reference** — Your comprehensive guide to Adobe Express add-on terminology, SDKs, runtimes, and development concepts.

## Quick Reference: Core Terms

| **Term** | **Related Terms** | **Quick Description** | **Where Used** |
|----------|-------------------|----------------------|----------------|
| **`addOnUISdk`** | Add-on UI SDK, UI Runtime | Main JavaScript module for UI operations, dialogs, add-on interactions | iframe runtime |
| **`editor`** | Document APIs, express-document-sdk | Core object for creating and manipulating document content | Document sandbox |
| **Runtime** | iframe, Document Sandbox, panel | JavaScript execution environments where add-on code runs | Both environments |
| **Document Sandbox** | documentSandbox | Secure environment for document manipulation and content creation | Document operations |
| **iframe Runtime** | iframe Sandbox, UI Runtime, Panel Runtime | Sandboxed browser environment for add-on UI and user interactions | UI operations |
| **`constants`** | Enums, Configuration values | Type-safe values for SDK operations (e.g., `Range.currentPage`) | Both environments |
| **`colorUtils`** | Color conversion, RGB, Hex colors | Utility functions for creating and converting colors | Document sandbox |
| **Communication APIs** | `exposeApi()`, `apiProxy()`, runtime | APIs enabling message passing between iframe and document sandbox | Both environments |
| **Manifest** | manifest.json, entryPoints, permissions | Configuration file defining add-on structure and capabilities | Development setup |
| **Panel** | Entry point, UI interface | Main add-on interface type for persistent UI panels | `manifest.json` |
| **Node** | BaseNode, VisualNode, scenegraph | Building blocks of documents - pages, shapes, text, images | Document Sandbox |
| **CORS** | Cross-Origin Resource Sharing | Browser security mechanism controlling cross-origin requests. See [iframe Context & Security](../platform_concepts/context.md#cors) for subdomain handling | iframe runtime, external APIs |

## Essential Architecture Overview

Adobe Express add-ons use a **dual-runtime architecture** with two separate JavaScript execution environments:

### **iframe Runtime**
- **What it is**: A sandboxed iframe environment where your add-on's user interface runs
- **Purpose**: Hosts your HTML, CSS, and JavaScript UI code
- **SDK Used**: Add-on UI SDK
- **File reference**: Typically your `index.html` and associated UI JavaScript files
- **Security**: Runs in a restricted sandbox with limited Web APIs
- **Also known as**: "Panel Runtime", "iframe Sandbox"
- **Terminology Note**: While the browser term is "iframe sandbox" (as used in [HTML sandbox attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) and manifest permissions), we use "iframe runtime" throughout the documentation for consistency with "document sandbox runtime" and to distinguish between the two execution environments

### **Document Sandbox**
- **What it is**: A separate sandboxed JavaScript environment for document manipulation
- **Purpose**: Provides secure access to Adobe Express document structure and content
- **SDKs Used**: Document Sandbox SDK (for communication) + Express Document SDK (for document APIs)
- **File reference**: Specified in your manifest's `documentSandbox` entry (e.g., `code.js`)
- **Security**: Isolated environment with limited Web APIs but direct document access
- **Also known as**: "Document Model Sandbox"

<InlineAlert slots="text" variant="info"/>

**Key Concept**: These two runtimes communicate with each other through the Communication APIs, allowing your UI to trigger document changes and vice versa.

<InlineAlert slots="text" variant="success"/>

**Terminology Note**: "Browser capabilities," "browser features," and "Web APIs" all refer to the standard JavaScript APIs available in web environments (like `fetch`, `localStorage`, `console`, `Blob`, etc.). The iframe runtime has full access to Web APIs, while the document sandbox has limited access for security reasons. See the [Web APIs Reference](../../../references/document-sandbox/web/index.md) for details on what's available in each environment.

## SDK and API Reference

### **Add-on UI SDK** vs **addOnUISdk**

**Add-on UI SDK** (The Concept): The complete software development kit for building add-on user interfaces, including documentation, APIs, tools, and resources.

**addOnUISdk** (The Module): The specific JavaScript module you import in your iframe code that provides runtime instance, app interfaces, constants, and UI-specific APIs.

### **Express Document SDK** vs **Document APIs**

**Express Document SDK** (`express-document-sdk`): The JavaScript module providing document manipulation capabilities for the document sandbox.

**Document APIs**: The broader set of APIs for document manipulation, including all interfaces, methods, and properties for working with Adobe Express documents.

### **Document Sandbox SDK** (`add-on-sdk-document-sandbox`)

The JavaScript module for document sandbox communication functionality that provides communication capabilities between iframe runtime and document sandbox. Only needed when you require bi-directional communication between the two environments.

## Import Patterns & Usage

### Complete Import Reference

```js
// iframe runtime (UI code) - index.js/index.html
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Document sandbox runtime (content manipulation) - code.js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";  // For communication
import { editor, colorUtils, constants } from "express-document-sdk";  // For document APIs

// UI SDK with explicit constants
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://express.adobe.com/static/add-on-sdk/sdk.js";
```

### When to Use Each Import

| Your Add-on Needs | iframe runtime | document sandbox | Required SDKs |
|-------------------|------------|------------------|------------------|
| **UI only** (no document changes) | ✅ | ❌ | Add-on UI SDK |
| **Document manipulation** | ✅ | ✅ | Add-on UI SDK + Document Sandbox SDK + Express Document SDK |
| **Cross-runtime communication** | ✅ | ✅ | Add-on UI SDK + Document Sandbox SDK |
| **Export/Import workflows** | ✅ | ❌ | Add-on UI SDK |

## Communication System

### Bidirectional Communication Pattern

**iframe runtime → document sandbox**:
```js
// iframe runtime (index.js)
const { runtime } = addOnUISdk.instance;
const sandboxProxy = await runtime.apiProxy("documentSandbox");
await sandboxProxy.createRectangle();

// document sandbox (code.js)
const { runtime } = addOnSandboxSdk.instance;  // Document Sandbox SDK
runtime.exposeApi({
    createRectangle() {
        const rect = editor.createRectangle();
        editor.context.insertionParent.children.append(rect);
    }
});
```

**document sandbox → iframe runtime**:
```js
// document sandbox (code.js)
const panelProxy = await runtime.apiProxy("panel");
await panelProxy.updateUI("Rectangle created");

// iframe runtime (index.js)
runtime.exposeApi({
    updateUI(message) {
        document.getElementById('status').textContent = message;
    }
});
```

### Runtime Types
- **`panel`**: The main iframe runtime for your add-on UI
- **`documentSandbox`**: The document manipulation runtime
- **`dialog`**: Runtime context when code is running within a modal dialog

## Essential Development Objects

### **Editor Object**
Primary interface for document manipulation in the document sandbox.

```js
import { editor } from "express-document-sdk";

const rectangle = editor.createRectangle();
const textNode = editor.createText("Hello World");
const insertionParent = editor.context.insertionParent;
```

### **Constants**
Type-safe values for SDK operations that prevent string literal errors.

```js
// UI SDK Constants
await addOnUISdk.app.document.createRenditions({
    range: Range.currentPage,
    format: RenditionFormat.png
});

// Document Sandbox Constants
rectangle.fill = {
    type: constants.FillType.color,
    color: { red: 1, green: 0, blue: 0, alpha: 1 }
};
```

### **ColorUtils**
Utility functions for creating and converting colors in the document sandbox.

```js
import { colorUtils } from "express-document-sdk";

const redColor = colorUtils.fromRGB(1, 0, 0);           // RGB values (0-1)
const blueColor = colorUtils.fromHex("#0066CC");        // Hex string
const hexString = colorUtils.toHex(redColor);           // "#FF0000FF"
```

## Document Context Disambiguation

The term "document" has different meanings depending on context:

### **Browser Document** (DOM)
- **Access**: Via global `document` object (e.g., `document.getElementById()`)
- **Purpose**: Manipulating HTML elements, event handling, CSS styling
- **Scope**: Limited to your add-on's iframe HTML content

### **UI SDK Document**
- **Access**: Via `addOnUISdk.app.document`
- **Purpose**: High-level operations like importing media, creating renditions, getting metadata
- **Scope**: Operations on the entire Adobe Express document

### **Document APIs**
- **Access**: Via `editor.documentRoot` and `editor.context`
- **Purpose**: Fine-grained manipulation of document nodes, pages, artboards, and content
- **Scope**: Direct manipulation of Adobe Express document elements

<InlineAlert slots="text" variant="success"/>

**Rule of Thumb**: Browser `document` is for your add-on's HTML UI, UI SDK document is for importing/exporting content, and Document API operations are for creating and manipulating content within the Adobe Express document structure.

## Node Hierarchy

Adobe Express documents are structured as a **scenegraph** - a hierarchical tree of nodes representing visual elements.

**BaseNode**: The minimal base class for all document elements with basic properties like `id`, `type`, `parent`, `allChildren`.

**Node**: Full-featured visual content that extends `BaseNode` with visual properties and transformations.

**Common Node Types**:
- **Container Nodes**: `ArtboardNode`, `GroupNode`, `PageNode` (hold other elements)
- **Content Nodes**: `RectangleNode`, `EllipseNode`, `TextNode`, `LineNode`, `PathNode` (visual elements)
- **Media Nodes**: `MediaContainerNode`, `ImageRectangleNode` (images and media)

```js
// Navigate the document hierarchy
const root = editor.documentRoot;           // ExpressRootNode
const currentPage = root.pages.first;       // PageNode
const artboard = currentPage.artboards.first; // ArtboardNode

// Create and add content
const rectangle = editor.createRectangle(); // RectangleNode
artboard.children.append(rectangle);
```

## Development Environment & Tools

### **Add-on Marketplace**
Distribution platform where users discover and install add-ons within Adobe Express via the "Add-ons" button in the left sidebar.

### **Code Playground**
Interactive browser-based development environment for experimenting with add-on APIs without local setup.

### **Adobe Express Add-on CLI**
Command Line Interface tool for creating, building, and packaging add-ons for local development.
- **Installation**: `npm install -g @adobe/ccweb-add-on-cli`
- **Key Commands**: `create`, `start`, `build`, `package`

### **MCP Server (Model Context Protocol)**
AI-assisted development tool that enhances LLM responses with Adobe Express add-on documentation and TypeScript definitions.
- **Purpose**: Provide semantic documentation search and accurate code suggestions through AI assistants
- **Requirements**: Node.js 18+ and MCP-compatible IDE (Cursor, VS Code, Claude Desktop)

### **Add-on Development Mode**
Special mode in Adobe Express (Settings > Add-on Development toggle) that allows loading and testing local add-ons during development.

## Manifest Configuration

```json
{
  "entryPoints": [
    {
      "type": "panel",
      "id": "panel1",
      "main": "index.html",           // iframe runtime entry
      "documentSandbox": "code.js"    // document sandbox entry (optional)
    }
  ],
  "permissions": {
    "sandbox": ["allow-popups", "allow-downloads"],
    "oauth": ["www.dropbox.com", "api.example.com"]
  }
}
```

## Quick Decision Guide

**Building a UI Panel?** → Add-on UI SDK  
**Creating new content?** → Document APIs (in Document Sandbox)  
**Modifying existing content?** → Document APIs (in Document Sandbox)  
**Connecting UI to Document?** → Communication APIs  
**Need browser features in sandbox?** → Web APIs or proxy from iframe

## Troubleshooting Common Issues

### Import Errors
```js
// ✅ Correct patterns
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, colorUtils, constants } from "express-document-sdk";

// ❌ Common mistakes
import { addOnUISdk } from "..."; // Wrong: should be default import
import addOnSandboxSdk from "add-on-ui-sdk"; // Wrong: mixed up the SDKs
```

### Runtime Context
| When you're in... | You have access to... | To communicate with the other side... |
|-------------------|----------------------|--------------------------------------|
| **iframe runtime** | Add-on UI SDK, DOM, Web APIs | Use `runtime.exposeApi()` or `runtime.apiProxy()` |
| **document sandbox** | Express Document SDK, limited Web APIs | Use `runtime.exposeApi()` or `runtime.apiProxy()` (from Document Sandbox SDK) |

### "undefined" Errors
**Problem**: `addOnUISdk.constants.SomeConstant` returns `undefined`  
**Solution**: Some constants require explicit imports. Check the [Constants Reference](../../../references/addonsdk/addonsdk-constants.md)

---

## FAQs

#### Q: What's the difference between "Add-on UI SDK" and "Document APIs"?

**A:** The **Add-on UI SDK** runs in the iframe runtime and handles UI, user interactions, and import/export. **Document APIs** (via Express Document SDK) run in the document sandbox and handle content creation and document manipulation.

#### Q: Why are there two different runtime environments?

**A:** Security and performance. The **iframe runtime** is sandboxed for security but has full browser capabilities. The **document sandbox** has direct access to Adobe Express's document engine but limited Web APIs.

#### Q: Can I use Document APIs directly from the iframe runtime?

**A:** No, Document APIs (Express Document SDK) are only available in the document sandbox for security reasons. You must use the communication system (Document Sandbox SDK) to bridge between environments.

#### Q: When do I use `addOnUISdk` vs `addOnSandboxSdk`?

**A:** Use `addOnUISdk` (Add-on UI SDK) in your **iframe runtime code** (usually `index.html` or `ui/` folder). Use `addOnSandboxSdk` (Document Sandbox SDK) in your **document sandbox code** (usually `code.js` or `sandbox/` folder).

#### Q: I see references to "UI SDK" - is this different from "Add-on UI SDK"?

**A:** No, they're the same. **"Add-on UI SDK"** is the full, preferred term for clarity, but "UI SDK" is commonly used as shorthand throughout the documentation.

---

## Related Documentation

- [Adobe Express Add-ons Developer Guide](https://developer-stage.adobe.com/express/add-ons/docs/guides/) - Official documentation and getting started guide
- [Add-on Architecture Guide](../platform_concepts/architecture.md) - Comprehensive guide with visual diagrams
- [Add-on UI SDK Reference](../../../references/addonsdk/index.md)
- [Document Sandbox Overview](../../../references/document-sandbox/index.md)
- [Communication APIs](../../../references/document-sandbox/communication/index.md)
- [Add-on UI SDK Constants Usage Guide](./ui-sdk-constants.md)
- [Document Sandbox Constants Usage Guide](./document-sandbox-constants.md)
