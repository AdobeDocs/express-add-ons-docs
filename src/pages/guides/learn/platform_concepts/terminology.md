# Terminology

## **Terminology Summary: Add-on UI SDK vs Document SDK vs Document APIs**

### **1. Add-on UI SDK**
**Developer Import:** `"https://new.express.adobe.com/static/add-on-sdk/sdk.js"`

**What it is:** The UI runtime environment for add-ons
- **Purpose:** Application interaction, UI management, document-level operations
- **Runtime:** Iframe-based UI environment
- **API Style:** Method-based, Promise-driven
- **Example Usage:** `addOnUISdk.app.document.addImage()`, `addOnUISdk.app.showModalDialog()`

### **2. Document SDK**
**Developer Import:** `"express-document-sdk"`

**What it is:** The complete document manipulation environment
- **Purpose:** Direct document content creation and manipulation
- **Runtime:** Document sandbox environment
- **API Style:** Object-oriented scenegraph manipulation
- **Example Usage:** `editor.createRectangle()`, `new Color()`, `textNode.text = "Hello"`

### **3. Document APIs**
**Technical Clarification:** This is a **subset** of the Document SDK

**What it includes:** Just the core document manipulation APIs from `"express-document-sdk"`
- **Core APIs:** `editor`, `colorUtils`, `fonts`, `viewport`
- **Node Classes:** `RectangleNode`, `TextNode`, `GroupNode`, etc.
- **Utilities:** `Color`, `constants`, geometry classes

## **Key Distinction for Documentation**

| Term | Scope | Developer Perspective |
|------|-------|---------------------|
| **Add-on UI SDK** | Complete UI runtime | `import addOnUISdk from "sdk.js"` |
| **Document SDK** | Complete document environment | `import {...} from "express-document-sdk"` |
| **Document APIs** | Core document manipulation only | Subset of Document SDK imports |

## **Recommended Usage in Documentation**

- **Use "Add-on UI SDK"** when referring to UI interactions, dialogs, app-level operations
- **Use "Document SDK"** when referring to the complete document manipulation environment
- **Use "Document APIs"** when specifically discussing just the core manipulation methods (not the full environment)

## Add-on UI SDK vs Document API

The **Add-on UI SDK** provides methods for application-level operations:
- `addOnUISdk.app.document.addImage(blob)`
- `addOnUISdk.app.showModalDialog(options)`

The **Document API** provides direct scenegraph manipulation:
- `editor.createRectangle()`
- `rectangle.width = 100`

## **Document SDK APIs (aka Document APIs) vs Add-on UI SDK**

### **Document SDK** 
**What developers import:** `"express-document-sdk"`

```typescript
// Document SDK imports - for document manipulation
import { colorUtils, constants, editor, fonts, viewport } from "express-document-sdk";
import type { 
    Color, GroupNode, RectangleNode, TextNode, 
    BitmapImage, MediaContainerNode 
} from "express-document-sdk";
```

**What it provides:**

- **Document manipulation APIs**: `editor.createRectangle()`, `editor.createText()`
- **Node classes**: `RectangleNode`, `TextNode`, `GroupNode`, etc.
- **Utilities**: `colorUtils`, `fonts`, `viewport`
- **Constants**: Document-related enums and constants

### **Add-on UI SDK**

**What developers import:** `"https://new.express.adobe.com/static/add-on-sdk/sdk.js"`

```typescript
// Add-on UI SDK import - for UI and app interaction
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

**What it provides:**

- **Application APIs**: `addOnUISdk.app.document.addImage()`
- **UI APIs**: `addOnUISdk.app.showModalDialog()`
- **Event handling**: `addOnUISdk.app.on("themechange")`

### **Document Sandbox Runtime**
**What developers import:** `"add-on-sdk-document-sandbox"`

```typescript
// Document Sandbox Runtime - for communication between UI and Document
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const runtime = addOnSandboxSdk.instance.runtime;
```

**What it provides:**

- **Communication APIs**: `runtime.exposeApi()`, `runtime.apiProxy()`
- **Runtime management**: Handles UI ↔ Document communication

## Imports & Purpose

| Term | Developer Import | Purpose |
|------|------------------|---------|
| **Document SDK** | `"express-document-sdk"` | Direct document manipulation |
| **Add-on UI SDK** | `"sdk.js"` | UI and application interaction |
| **Document Sandbox Runtime** | `"add-on-sdk-document-sandbox"` | Communication layer |









## Add-on Development SDKs

- **Add-on UI SDK** vs **Document API**
- **UI SDK** vs **Document API**
- **UI Runtime APIs** vs **Document Sandbox APIs**
- **Iframe Runtime** vs **Document Sandbox Runtime**

| Aspect | **Add-on UI SDK** | **Document API** |
|--------|-------------------|------------------|
| **Runtime Environment** | UI iframe (full browser) | Document Sandbox (QuickJS) |
| **Primary Purpose** | UI interactions, app-level operations | Direct document manipulation |
| **API Style** | Method-based, async | Object-oriented, mostly sync |
| **What You Get** | `addOnUISdk.app.document.addImage()` | `editor.createRectangle()` |

## Add-on UI SDK vs Document API

The **Add-on UI SDK** provides methods for application-level operations:

```js
- `addOnUISdk.app.document.addImage(blob)`
- `addOnUISdk.app.showModalDialog(options)`
```

The **Document API** provides direct scenegraph manipulation:

```js
- `editor.createRectangle()`
- `rectangle.width = 100`
```
