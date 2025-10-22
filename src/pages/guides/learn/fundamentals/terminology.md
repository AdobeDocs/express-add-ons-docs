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
  - Overloaded terms
  - Terminology disambiguation
  - Scope (add-on vs application)
  - Singleton pattern
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
      answer: "Security and performance. The iframe runtime is sandboxed for security but has standard Web APIs. The document sandbox has direct access to Adobe Express's document engine but limited Web APIs."

    - question: "Can I use Document APIs directly from the iframe runtime?"
      answer: "No, Document APIs (Express Document SDK) are only available in the document sandbox for security reasons. You must use the communication system (Document Sandbox SDK) to bridge between environments."

    - question: "When do I use addOnUISdk vs addOnSandboxSdk?"
      answer: "Use addOnUISdk (Add-on UI SDK) in your iframe runtime code (usually index.html or ui/ folder). Use addOnSandboxSdk (Document Sandbox SDK) in your document sandbox code (usually code.js or sandbox/ folder)."

    - question: "I see references to UI SDK - is this different from Add-on UI SDK?"
      answer: "No, they're the same. Add-on UI SDK is the full, preferred term for clarity, but UI SDK is commonly used as shorthand throughout the documentation."

    - question: "What's the difference between addOnUISdk.instance and addOnUISdk.app?"
      answer: "They represent different scopes. instance provides add-on-specific features (runtime, clientStorage, manifest) scoped to YOUR add-on. app provides application-wide features (document, currentUser, ui) shared across Adobe Express. Use instance for add-on-specific features; use app to interact with Adobe Express itself."

    - question: "What is the singleton pattern and why do add-on SDKs use it?"
      answer: "All Adobe Express add-on SDKs use the singleton pattern - they provide pre-instantiated objects you import and use directly. You never create new instances yourself. This ensures all your code works with the same SDK instances, preventing conflicts and maintaining consistent state. For Express Document SDK specifically, you import lowercase names (editor, colorUtils, constants, fonts, viewport) which are singleton objects, NOT uppercase class names."

    - question: "I'm confused by terms like document, context, runtime, and instance - they seem to mean different things in different places?"
      answer: "Yes! Many terms in add-on development are overloaded with multiple meanings. Check the Overloaded Terms Clarification table for complete clarification. For example, document can mean: the Adobe Express user's project, editor.documentRoot (scenegraph manipulation), addOnUISdk.app.document (import/export operations), or browser DOM document object (your add-on's HTML). The table provides all meanings with examples for 17 commonly overloaded terms."
canonical: true
ai_assistant_note: "This page provides authoritative definitions and relationships 
  for Adobe Express Add-on terminology. Use these standardized terms when helping 
  developers choose between Add-on UI SDK (iframe/UI), Document APIs (content 
  creation), and Communication APIs (connecting the two environments)."
semantic_tags:
  - canonical-reference
  - terminology-authority
  - sdk-terminology-clarification
  - import-patterns
  - runtime-environments
  - manifest-configuration
  - file-structure
  - development-workflow
  - debugging-guide
---

# Add-on Development Terminology

A comprehensive guide to Adobe Express add-on terminology, SDKs, runtimes, and development concepts.

## Core Terms

| **Term** | **Related Terms** | **Description** | **Where Used** |
|----------|-------------------|----------------------|----------------|
| **[`addOnUISdk`](../../../references/addonsdk/index.md)** | Add-on UI SDK, UI Runtime, [`instance`](../../../references/addonsdk/addonsdk-instance.md) | Main JavaScript module for UI operations, dialogs, add-on interactions. Access via `addOnUISdk.instance` | iframe runtime |
| **[`instance`](../../../references/addonsdk/addonsdk-instance.md)** | SDK instance, `runtime`, `clientStorage`, `manifest` | Property providing access to SDK features. Use `addOnUISdk.instance` (iframe) or `addOnSandboxSdk.instance` (document sandbox) | Both environments |
| **[`editor`](../../../references/document-sandbox/document-apis/classes/Editor.md)** | Document APIs, [`express-document-sdk`](../../../references/document-sandbox/document-apis/index.md) | Core object for creating and manipulating document content | Document sandbox |
| **Runtime** | iframe, Document Sandbox, panel | JavaScript execution environments where add-on code runs | Both environments |
| **Document Sandbox** | `documentSandbox` | Secure environment for document manipulation and content creation | Document operations |
| **iframe Runtime** | iframe Sandbox, UI Runtime, Panel Runtime | Sandboxed browser environment for add-on UI and user interactions | UI operations |
| **`constants`** | Enums, Configuration values | Type-safe values for SDK operations. See [UI SDK Constants](../../../references/addonsdk/addonsdk-constants.md) and [Document Constants](../../../references/document-sandbox/document-apis/enumerations/ArrowHeadType.md) | Both environments |
| **[`colorUtils`](../../../references/document-sandbox/document-apis/classes/ColorUtils.md)** | Color conversion, RGB, Hex colors | Utility functions for creating and converting colors. See [Use Color Guide](../how_to/use_color.md) | Document sandbox |
| **Communication APIs** | `exposeApi()`, `apiProxy()`, [`runtime`](../../../references/addonsdk/instance-runtime.md) | APIs enabling message passing between iframe and document sandbox. See [Communication APIs Reference](../../../references/document-sandbox/communication/index.md) | Both environments |
| **Manifest** | `manifest.json`, `entryPoints`, `permissions` | Configuration file defining add-on structure and capabilities. See [Manifest Reference](../../../references/manifest/index.md) | Development setup |
| **Panel** | Entry point, UI interface | Main add-on interface type for persistent UI panels | `manifest.json` |
| **Node** | [`BaseNode`](../../../references/document-sandbox/document-apis/classes/BaseNode.md), [`VisualNode`](../../../references/document-sandbox/document-apis/classes/VisualNode.md), scenegraph | Building blocks of documents - pages, shapes, text, images | Document Sandbox |
| **CORS** | Cross-Origin Resource Sharing | Browser security mechanism controlling cross-origin requests. See [iframe Context & Security](../platform_concepts/context.md#cors) for subdomain handling | iframe runtime, external APIs |

## Overloaded Terms Clarification

Many terms in Adobe Express add-on development have multiple meanings depending on context. This table clarifies the different uses to prevent confusion.

| **Term** | **Usage Context** | **Meaning** | **Example** |
|----------|------------------|-------------|-------------|
| **document** | Adobe Express content | The user's creative project/file being edited in Adobe Express | "The document contains 3 pages" |
| | `editor.documentRoot` | Property accessing the root of the Adobe Express document scenegraph for manipulation | `editor.documentRoot.pages` |
| | `addOnUISdk.app.document` | Property for import/export operations on Adobe Express document | `app.document.addImage(blob)` |
| | Browser DOM | The HTML document object representing your add-on's UI webpage | `document.getElementById("button")` |
| **DOM** | Add-on UI | Document Object Model - your add-on's HTML structure in the iframe | `document.querySelector(".button")` |
| | Express DOM | Informal term sometimes used for Adobe Express's document structure (prefer "scenegraph") | "Navigate the Express DOM" (better: "Navigate the scenegraph") |
| **context** | General programming | Execution context or environment where code runs | "The code runs in the browser context" |
| | `editor.context` | Property of `editor` object providing access to selection, insertion point, and current page | `editor.context.selection` |
| | iframe/security | Runtime context where add-on UI executes | "iframe runtime context" (see [Context & Security](../platform_concepts/context.md)) |
| **runtime** | General architecture | JavaScript execution environment (iframe runtime or document sandbox) | "The iframe runtime has standard Web APIs" |
| | `addOnUISdk.instance.runtime` | Property providing Communication APIs for cross-environment messaging | `runtime.apiProxy("documentSandbox")` |
| | `addOnSandboxSdk.instance.runtime` | Property providing Communication APIs in document sandbox | `runtime.exposeApi({ ... })` |
| **instance** | General programming | A single occurrence of a class object created by instantiation | "The rectangle is an instance of `RectangleNode`" |
| | `addOnUISdk.instance` | Property accessing add-on-specific SDK features (runtime, clientStorage, manifest) | `addOnUISdk.instance.clientStorage` |
| | `addOnSandboxSdk.instance` | Property accessing document sandbox SDK features | `addOnSandboxSdk.instance.runtime` |
| | Add-on execution | The running session of your add-on when user opens it | "Each user has their own add-on instance" |
| **application** | General concept | Your add-on running as software | "The application starts when user opens the panel" |
| | `addOnUISdk.app` | Property accessing Adobe Express (host application) features | `addOnUISdk.app.currentUser` |
| | Host application | Adobe Express itself (the platform hosting your add-on) | "The host application provides the document APIs" |
| **scope** | Variable/function scope | Standard JavaScript concept of where variables/functions are accessible | "The variable is in function scope" |
| | Add-on scope | Features specific to your add-on instance (via `addOnUISdk.instance`) | `instance.runtime`, `instance.clientStorage` are add-on-scoped |
| | Application scope | Features shared across Adobe Express (via `addOnUISdk.app`) | `app.document`, `app.currentUser` are application-scoped |
| **sandbox** | iframe security | Browser iframe sandbox attribute restricting capabilities | "iframe sandbox prevents form submission" |
| | Document Sandbox | Isolated JavaScript environment for secure document manipulation | "Document sandbox has limited Web APIs" |
| | `documentSandbox` | Manifest property specifying document sandbox entry file | `"documentSandbox": "code.js"` in manifest |
| **singleton** | Design pattern | Software pattern ensuring only one instance of a class exists | "The Editor class uses the singleton pattern" |
| | SDK exports | Pre-instantiated objects you import (not classes to instantiate) | `editor`, `colorUtils`, `fonts` are singletons |
| **environment** | General architecture | The runtime context where code executes | "iframe environment vs sandbox environment" |
| | Development | Development setup (local vs production) | "Test in the development environment" |
| **API** | SDK interface | Methods and properties exposed by Adobe SDKs | "Use the Document API to create shapes" |
| | Exposed functions | Functions you expose for cross-runtime communication | `runtime.exposeApi({ myFunction: ... })` |
| | External services | Third-party REST/web APIs your add-on calls | "Call the weather API for data" |
| **app** | General concept | Short for "application" (your add-on or Adobe Express) | "The app creates rectangles" |
| | `addOnUISdk.app` | Specific property accessing Adobe Express application features | `addOnUISdk.app.document` |
| **SDK** | Add-on UI SDK | The iframe runtime SDK for UI and Adobe Express features | `addOnUISdk` |
| | Document Sandbox SDK | The document sandbox SDK for communication | `addOnSandboxSdk` |
| | Express Document SDK | The document manipulation SDK with content creation APIs | `express-document-sdk` (imports: `editor`, `colorUtils`) |
| **panel** | UI component | Your add-on's user interface shown in Adobe Express sidebar | "The panel opens on the right running your add-on" |
| | `RuntimeType` | String constant for communication targeting | `runtime.apiProxy(RuntimeType.panel)` targets the iframe runtime |
| | Manifest | Entry point type in manifest configuration | `"type": "panel"` in `entryPoints` |
| **node** | Scenegraph | Visual element in the Adobe Express document tree (specific term) | "A `RectangleNode` is a node in the scenegraph" |
| | DOM | HTML element in your add-on's UI (specific term) | `document.getElementById()` returns a DOM node |
| **element** | General term | Generic word for any item or component (use "node" for precision) | "Add elements to the page" (vague, prefer "Add nodes to the artboard") |
| | Scenegraph | Informal term for scenegraph nodes (prefer "node") | "Rectangle element" (better: "`RectangleNode`") |
| | DOM | HTML element in your UI (prefer "DOM node" or "HTML element" for clarity) | `<div>` element in your add-on's HTML |
| | Design | Visual design component in Adobe Express UI | "Text elements in your design" (user-facing term) |
| **exports** | Named exports | ES Module syntax for exporting multiple values from a module. **Requires curly braces `{ }` in import statement** | `export { editor, colorUtils }` → `import { editor } from "..."` |
| | Default export | ES Module syntax for a single main export from a module. **No curly braces in import statement** | `export default addOnUISdk` → `import addOnUISdk from "..."` |
| | Module pattern | How SDKs expose functionality: UI SDK uses default, Document SDK uses named | UI SDK: default export; Express Document SDK: named exports |
| **Web APIs** | Standard browser APIs | JavaScript APIs available in web browsers (fetch, localStorage, Blob, etc.) | "iframe runtime has standard Web APIs" |
| | Limited in sandbox | Document sandbox only has limited Web APIs (console, Blob) | "Document sandbox has restricted Web APIs" |
| | vs Browser APIs | Same meaning - standard JavaScript APIs built into browsers | "Web APIs" and "Browser APIs" are interchangeable terms |

### Common Sources of Confusion

**"I need to access the document"** - Which document?

- Adobe Express user's project → "The document has 3 pages"
- Manipulate Adobe Express content → `editor.documentRoot`
- Import/export Adobe Express document → `addOnUISdk.app.document`
- Your add-on's UI HTML page → `document.getElementById()`

**"What's the DOM?"** - Which DOM?

- Your add-on's HTML structure → `document.querySelector()` (Browser DOM)
- Adobe Express's document structure → Use "scenegraph" not "DOM"

**"How do I use the runtime?"** - Which runtime?

- Execution environment → "Code runs in iframe runtime or document sandbox"
- Communication APIs → `addOnUISdk.instance.runtime` or `addOnSandboxSdk.instance.runtime`

**"What is the context?"** - Which context?

- Execution environment → "The iframe context has standard Web APIs"
- Editor's selection/insertion → `editor.context.selection`
- Security boundaries → See [iframe Context & Security](../platform_concepts/context.md)

**"What does instance mean?"** - Which instance?

- SDK property → `addOnUISdk.instance` or `addOnSandboxSdk.instance`
- Class object → "rectangle is an instance of RectangleNode"
- Running session → "User's add-on instance"

**"How do I import SDKs?"** - Named or default export?

- Add-on UI SDK → Default export (no curly braces): `import addOnUISdk from "..."`
- Document Sandbox SDK → Default export (no curly braces): `import addOnSandboxSdk from "..."`
- Express Document SDK → Named exports (requires curly braces): `import { editor, colorUtils } from "..."`

**"Are Web APIs and Browser APIs the same?"** - Yes!

- Same thing, different names → "Web APIs" = "Browser APIs"
- iframe runtime → Standard Web APIs available
- Document sandbox → Limited Web APIs only (console, Blob)

**"Should I say node or element?"** - It depends!

- Adobe Express scenegraph → Use "node" (`RectangleNode`, `TextNode`, etc.) to describe visual elements in the document
- Your add-on's HTML → Use "DOM node" or "HTML element"
- User-facing docs → "element" is okay (e.g., "text elements in your design")
- Developer docs → Prefer "node" for precision and to match API class names

**"Should I use `addOnUISdk.instance` or `addOnUISdk.app`?"** - Different scopes

- **Add-on scope** (`instance`) → Features specific to YOUR add-on
  - `instance.runtime` - YOUR add-on's communication
  - `instance.clientStorage` - YOUR add-on's storage (per-user, per-addon)
  - `instance.manifest` - YOUR add-on's configuration
- **Application scope** (`app`) → Features shared across Adobe Express
  - `app.document` - The Adobe Express document (same for all add-ons)
  - `app.currentUser` - The Express user (not specific to your add-on)
  - `app.ui` - Adobe Express UI state (`theme`, `locale`)

## Runtime Environments

Adobe Express add-ons use a **dual-runtime architecture** with two separate JavaScript execution environments:

### **iframe Runtime**

- **What it is**: A sandboxed iframe environment where your add-on's user interface runs
- **Purpose**: Hosts your HTML, CSS, and JavaScript UI code
- **SDK Used**: Add-on UI SDK
- **File reference**: Typically your `index.html` and associated UI JavaScript files
- **Security**: Sandboxed for security with standard Web APIs (some features require manifest permissions)
- **Also known as**: "Panel Runtime", "iframe Sandbox"
- **Terminology Note**: While the browser term is "iframe sandbox" (as used in [HTML sandbox attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) and manifest permissions), we use "iframe runtime" throughout the documentation for consistency with "document sandbox runtime" and to distinguish between the two execution environments

### **Document Sandbox**

- **What it is**: A separate sandboxed JavaScript environment for document manipulation
- **Purpose**: Provides secure access to Adobe Express document structure and content
- **SDKs Used**: Document Sandbox SDK (for communication) + Express Document SDK (for document APIs)
- **File reference**: Specified in your manifest's `documentSandbox` entry (e.g., `code.js`)
- **Security**: Isolated environment with limited Web APIs but direct document access
- **Also known as**: "Document Model Sandbox"

#### Understanding Runtime Communication

The two runtimes communicate with each other through the [Communication APIs](../../../references/document-sandbox/communication/index.md), allowing your UI to trigger document changes and vice versa.

**About Web APIs**: The terms "browser capabilities," "browser features," and "Web APIs" all refer to the standard JavaScript APIs available in web environments (like `fetch`, `localStorage`, `console`, `Blob`, etc.). The iframe runtime has standard Web APIs, while the document sandbox has limited Web APIs for security reasons. See the [Web APIs Reference](../../../references/document-sandbox/web/index.md) for details on what's available in each environment.

<InlineAlert variant="info" slots="text"/>

For a comprehensive deep-dive into the dual-runtime architecture with visual diagrams, communication patterns, and code examples, see the [Add-on Architecture Guide](../platform_concepts/architecture.md).

## SDK Concepts

### Add-on UI SDK

**`addOnUISdk`**: The JavaScript module you import in your iframe code that provides `runtime` instance, `app` interfaces, `constants`, and UI-specific APIs.

The `addOnUISdk` object provides two distinct scopes of functionality:

**`addOnUISdk.instance` - Add-on Scope**  
Features specific to your individual add-on:

- `runtime` - Communication between your add-on's iframe and document sandbox
- `clientStorage` - Data storage for your add-on only (per-user, per-addon)
- `manifest` - Your add-on's configuration
- `entrypointType` - Your add-on's current entry point
- `logger` - Logging for your add-on

**Scope**: Isolated to your add-on instance; doesn't interact with other add-ons.

**`addOnUISdk.app` - Application Scope**  
Features shared across Adobe Express (the host application):

- `document` - The active Adobe Express document (shared across all add-ons)
- `oauth` - Authentication with external services
- `currentUser` - The Adobe Express user (not specific to your add-on)
- `ui` - Adobe Express UI state (theme, locale, etc.)
- `command` - Commands in the host application

**Scope**: Interacts with Adobe Express itself and its global state.

### Express Document SDK

**Express Document SDK** (`express-document-sdk`): The JavaScript module providing document manipulation capabilities for the document sandbox. Import named exports: `editor`, `colorUtils`, `constants`, `fonts`, `viewport`.

### Document Sandbox SDK

**Document Sandbox SDK** (`add-on-sdk-document-sandbox`): The JavaScript module for communication between iframe runtime and document sandbox. Import as `addOnSandboxSdk`. Only needed when you require bi-directional communication between the two environments.

<InlineAlert variant="info" slots="text"/>

**Note**: All Adobe Express add-on SDKs use the singleton pattern - pre-instantiated objects you import and use directly. You never create new instances yourself. See the [FAQ on singleton pattern](#q-what-is-the-singleton-pattern-and-why-do-add-on-sdks-use-it) and [Architecture Guide](../platform_concepts/architecture.md#sdk-structure--import-patterns) for details.

## Import Patterns & Usage

### Complete Import Reference

```js
// iframe runtime (UI code) - index.js/index.html
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Document sandbox runtime (content manipulation) - code.js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";  // For communication
import { editor, colorUtils, constants, fonts, viewport } from "express-document-sdk";  // For document APIs

// Add-on UI SDK with explicit constants
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

## Core Development Objects

### **`editor` Object**

Primary interface for document manipulation in the document sandbox.

```js
import { editor } from "express-document-sdk";

const rectangle = editor.createRectangle();
const textNode = editor.createText("Hello World");
const insertionParent = editor.context.insertionParent;
```

### **`constants`**

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

## Node Hierarchy

Adobe Express documents are structured as a **scenegraph** - a hierarchical tree of nodes representing visual elements.

**`BaseNode`**: The minimal base class for all document elements with basic properties like `id`, `type`, `parent`, `allChildren`.

**`Node`**: Full-featured visual content that extends `BaseNode` with visual properties and transformations.

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

Distribution platform where users discover and install add-ons within [Adobe Express](https://express.adobe.com/add-ons) via the "Add-ons" button in the left sidebar.

### **Code Playground**

Interactive browser-based development environment for experimenting with add-on APIs without local setup. See the [Code Playground](../../getting_started/code_playground.md) guide for more details.

### **Adobe Express Add-on CLI**

Command Line Interface tool for creating, building, and packaging add-ons for local development.

- **Installation**: `npm install -g @adobe/ccweb-add-on-cli`
- **Common Commands**: `create`, `start`, `build`, `package`

See the [Adobe Express Add-on CLI](../../getting_started/local_development/dev_tooling.md) guide for more details.

### **MCP Server (Model Context Protocol)**

AI-assisted development tool that enhances LLM responses with Adobe Express add-on documentation and TypeScript definitions.

- **Purpose**: Provide semantic documentation search and accurate code suggestions through AI assistants
- **Requirements**: Node.js 18+ and MCP-compatible IDE (Cursor, VS Code, Claude Desktop)

See the [Adobe Express Add-on MCP Server](../../getting_started/local_development/mcp_server.md) guide for more details.

### **Add-on Development Mode**

Special mode in Adobe Express (**Settings > Add-on Development** toggle) that allows loading and testing local add-ons during development. See [Add-on Development Mode](../../getting_started/local_development/dev_tooling.md) for more details.

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

**Building a UI Panel?** → Add-on UI SDK (`addOnUISdk`)  
**Creating new content?** → Document APIs (in Document Sandbox, via `editor`)  
**Modifying existing content?** → Document APIs (in Document Sandbox, via `editor`)  
**Connecting UI to Document?** → Communication APIs (`runtime.exposeApi()`, `runtime.apiProxy()`)  
**Need browser features in sandbox?** → Web APIs or proxy from iframe

<InlineAlert variant="info" slots="header, text1"/>

**Confused by terminology?**

Many terms like "document", "context", "runtime", and "instance" have multiple meanings. See [Overloaded Terms Clarification](#overloaded-terms-clarification) at the top for complete clarification.

## Troubleshooting Common Issues

### Import Errors

```js
// ✅ Correct patterns
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";  // Default export (no curly braces)
import addOnSandboxSdk from "add-on-sdk-document-sandbox";                     // Default export (no curly braces)
import { editor, colorUtils, constants, fonts, viewport } from "express-document-sdk";  // Named exports (requires curly braces)

// ❌ Common mistakes
import { addOnUISdk } from "..."; // Wrong: should be default import (no curly braces)
import addOnSandboxSdk from "add-on-ui-sdk"; // Wrong: mixed up the SDKs
import editor from "express-document-sdk"; // Wrong: should be named import (needs curly braces)
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

**A:** Security and performance. The **iframe runtime** is sandboxed for security but has standard Web APIs. The **document sandbox** has direct access to Adobe Express's document engine but limited Web APIs.

#### Q: Can I use Document APIs directly from the iframe runtime?

**A:** No, Document APIs (Express Document SDK) are only available in the document sandbox for security reasons. You must use the communication system (Document Sandbox SDK) to bridge between environments.

#### Q: When do I use `addOnUISdk` vs `addOnSandboxSdk`?

**A:** Use `addOnUISdk` (Add-on UI SDK) in your **iframe runtime code** (usually `index.html` or `ui/` folder). Use `addOnSandboxSdk` (Document Sandbox SDK) in your **document sandbox code** (usually `code.js` or `sandbox/` folder).

#### Q: I see references to "UI SDK" - is this different from "Add-on UI SDK"?

**A:** No, they're the same. **"Add-on UI SDK"** is the full, preferred term for clarity, but "UI SDK" is commonly used as shorthand throughout the documentation.

#### Q: What's the difference between `addOnUISdk.instance` and `addOnUISdk.app`?

**A:** These represent **different scopes** of functionality:

- **`addOnUISdk.instance`** - **Add-on scope**: Features specific to YOUR add-on
  - `instance.runtime` - Communication for YOUR add-on
  - `instance.clientStorage` - Storage for YOUR add-on only (per-user, per-addon)
  - `instance.manifest` - YOUR add-on's configuration

- **`addOnUISdk.app`** - **Application scope**: Features shared across Adobe Express
  - `app.document` - The Adobe Express document (same for all add-ons)
  - `app.currentUser` - The Express user (not specific to your add-on)
  - `app.ui` - Adobe Express UI state (theme, locale)

Use `instance` for add-on-specific features; use `app` to interact with Adobe Express itself.

#### Q: I'm confused by terms like "document", "context", "runtime", and "instance" - they seem to mean different things in different places?

**A:** Yes! Many terms in add-on development are overloaded with multiple meanings. Check the **[Overloaded Terms Clarification](#overloaded-terms-clarification)** table at the top of this page for complete clarification. For example, "document" can mean:

- The Adobe Express user's project
- `editor.documentRoot` (scenegraph manipulation)
- `addOnUISdk.app.document` (import/export operations)
- Browser DOM `document` object (your add-on's HTML)

This table provides all meanings with examples for 17 commonly overloaded terms.

#### Q: What is the singleton pattern and why do add-on SDKs use it?

**A:** All Adobe Express add-on SDKs use the **singleton pattern** - they provide pre-instantiated objects you import and use directly. You **never create new instances yourself**.

This ensures all your code works with the same SDK instances, preventing conflicts and maintaining consistent state. For Express Document SDK specifically, you import **lowercase names** (`editor`, `colorUtils`, `constants`, `fonts`, `viewport`) which are singleton objects, NOT the uppercase class names (`Editor`, `ColorUtils`, etc.).

See the [Architecture Guide](../platform_concepts/architecture.md#sdk-structure--import-patterns) for complete details.

---

## Related Documentation

- [Adobe Express Add-ons Developer Guide](https://developer-stage.adobe.com/express/add-ons/docs/guides/) - Official documentation and getting started guide
- [Add-on Architecture Guide](../platform_concepts/architecture.md) - Comprehensive guide with visual diagrams
- [Add-on UI SDK Reference](../../../references/addonsdk/index.md)
- [Document Sandbox Overview](../../../references/document-sandbox/index.md)
- [Communication APIs](../../../references/document-sandbox/communication/index.md)
- [Add-on UI SDK Constants Usage Guide](./ui-sdk-constants.md)
- [Document Sandbox Constants Usage Guide](./document-sandbox-constants.md)
