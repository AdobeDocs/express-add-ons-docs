# Add-on UI SDK APIs vs Document Sandbox SDK APIs

The Add-on UI SDK APIs and Document APIs in the Document Sandbox SDK provide two different ways to interact with the Adobe Express platform from your add-on, each designed for distinct use cases and interaction patterns.

<InlineAlert slots="text" variant="info"/>

This guide covers the differences between the UI SDK and the Document API specifically. For more information about the other features available from the Document Sandbox (ie: Communication and Browser APIs), see the [Runtime Architecture](runtime-architecture.md) guide.

## Overview

- **UI SDK (addOnUISdk) APIs**: Method-based API for performing actions on documents from your add-on's UI panel
- **Document APIs**: Object-oriented API for creating and manipulating document elements in the document sandbox

## Key Architectural Differences

| Aspect | UI SDK (addOnUISdk) | Document API |
|--------|---------------------|--------------|
| **Architecture** | Method-based interfaces | Object-oriented classes |
| **Usage Pattern** | `await document.addImage(blob)` | `rectangle.width = 100` |
| **Purpose** | Perform actions on existing documents | Create and manipulate document elements |
| **Execution Context** | UI iframe | Document sandbox |
| **API Style** | Event-driven, async method calls | Direct property manipulation |
| **Content Control** | Add content to existing document | Create and modify individual elements |

## Fundamental Differences

### 1. UI SDK: Remote Control Pattern

The UI SDK acts like a **remote control** for the document - you send commands to Express:

```typescript
// Method-based: Call methods to perform actions
await addOnUISdk.app.document.addImage(blob);
await addOnUISdk.app.document.addVideo(blob);
await addOnUISdk.app.showModalDialog(dialogOptions);

const title = await addOnUISdk.app.document.title();
const renditions = await addOnUISdk.app.document.createRenditions(options);
```

**Mental Model:** *"Hey Express, add this image to the document"*

### 2. Document API: Building Blocks Pattern

The Document API gives you **direct control** over document elements like building blocks:

```typescript
// Object-oriented: Create objects and set their properties
const rectangle = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 50;
rectangle.fill = solidColor;

const text = editor.createText("Hello World");
text.translation = { x: 10, y: 20 };

// Add objects to the document
editor.context.insertionParent.children.append(rectangle);
```

**Mental Model:** *"Create a rectangle, make it red, put it here"*

## Use Case Comparison

| Task | UI SDK (addOnUISdk) | Document API |
|------|---------------------|--------------|
| **Add content** | `await document.addImage(blob)` | `const img = editor.createImageContainer(bitmap)`<br/>`parent.children.append(img)` |
| **Set properties** | ❌ *Can't modify after adding* | `rectangle.width = 100`<br/>`rectangle.height = 50` |
| **Get document info** | `await document.title()` | `const title = document.title` |
| **Apply styling** | ❌ *No direct styling* | `rectangle.fill = redColor`<br/>`text.textRuns[0].fontSize = 24` |
| **Create layouts** | ❌ *Limited to adding content* | ✅ *Full layout control* |
| **Export/Share** | ✅ *Built-in export methods* | ❌ *No export capabilities* |

## Content Control Approaches

### UI SDK: Works with Existing Documents
The UI SDK **adds content TO** existing documents but doesn't provide direct control over individual elements:

```typescript
// Adding content to whatever document is currently open
await addOnUISdk.app.document.addImage(blob);  // Adds to current page
await addOnUISdk.app.document.addVideo(blob);  // Adds to current page

// Working with the document as a whole
const metadata = await addOnUISdk.app.document.getPagesMetadata();
const title = await addOnUISdk.app.document.title();
const renditions = await addOnUISdk.app.document.createRenditions(options);
```

**Key limitation:** You can add content, but you can't directly manipulate individual shapes, text, or existing elements.

### Document API: Creates and Manipulates Elements
The Document API lets you **create new elements** and **directly control** the document structure:

```typescript
// Creating new document elements from scratch
const rectangle = editor.createRectangle();
const ellipse = editor.createEllipse();
const text = editor.createText("Hello");

// Modifying properties of individual elements
rectangle.width = 200;
rectangle.topLeftRadius = 10;
rectangle.fill = { type: "solid", color: { red: 1, green: 0, blue: 0 } };

// Controlling document structure directly
const artboard = editor.context.insertionParent;
artboard.children.append(rectangle);
artboard.children.append(text);

// Accessing and modifying existing elements
const existingNodes = artboard.children;
existingNodes.forEach(node => {
    if (node instanceof RectangleNode) {
        node.width *= 2; // Double the width of all rectangles
    }
});
```

## Event Handling

### UI SDK: Application-Level Events

The UI SDK provides **application and document-level events** for monitoring broad system changes:

```typescript
// React to application-wide changes
addOnUISdk.app.on("themechange", (data) => {
    console.log("App theme changed:", data.theme);
});

addOnUISdk.app.on("documentLinkAvailable", (data) => {
    console.log("Document link available:", data.documentLink);
});

addOnUISdk.app.on("documentTitleChange", (data) => {
    console.log("Document title changed:", data.documentTitle);
});
```

### Document API: Editor-Level Events

The Document API provides **editor and selection-level events** for monitoring editing interactions:

```typescript
// React to user editing actions
const handlerId = editor.context.on("selectionChange", () => {
    const selection = editor.context.selection;
    console.log("Selection changed, now selected:", selection.length, "items");
    
    // Inspect and modify selected elements
    selection.forEach(node => {
        if (node instanceof RectangleNode) {
            node.fill = redColor; // Change selected rectangle color
        }
    });
});

// Unregister event when done
editor.context.off("selectionChange", handlerId);
```

## Synchronous vs Asynchronous Patterns

### UI SDK: Everything is Async
The UI SDK treats **all operations** as asynchronous because it communicates across process boundaries (iframe ↔ host app):

```typescript
// ALL operations return Promises - even simple getters
const title = await addOnUISdk.app.document.title();
const id = await addOnUISdk.app.document.id();
const allowed = await addOnUISdk.app.document.exportAllowed();

// Actions are async
await addOnUISdk.app.document.addImage(blob);
await addOnUISdk.app.document.addVideo(blob);

// Metadata retrieval is async
const pages = await addOnUISdk.app.document.getPagesMetadata(options);
const renditions = await addOnUISdk.app.document.createRenditions(options);
```

**Why async?** Every call goes through RPC (Remote Procedure Call) to the host application.

### Document API: Mostly Sync with Strategic Async
The Document API uses **synchronous property access** for immediate operations and async only when necessary:

```typescript
// Property access is synchronous - immediate response
const rectangle = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 50;
const currentWidth = rectangle.width;

// Most operations are immediate
rectangle.fill = { type: "solid", color: redColor };
text.translation = { x: 10, y: 20 };
artboard.children.append(rectangle);

// Async ONLY for resource loading
const bitmap = await editor.loadBitmapImage(blob);

// Async edit queuing after resource loading
await editor.queueAsyncEdit(() => {
    const container = editor.createImageContainer(bitmap);
    editor.context.insertionParent.children.append(container);
});
```

**Why mostly sync?** Direct object access within the same process, async only for resource loading and edit scheduling.

## Summary

| Aspect | UI SDK (addOnUISdk) | Document API |
|--------|---------------------|--------------|
| **Purpose** | Import/export, add media, get metadata | Create layouts, modify shapes, build designs |
| **Architecture** | Method-based interfaces | Object-oriented classes |
| **Control Level** | Add content to existing documents | Create and modify individual elements |
| **Execution Context** | UI iframe (cross-process) | Document sandbox (same-process) |
| **Async Pattern** | Everything is async (RPC calls) | Mostly sync, async for resource loading |
| **Event Scope** | Application-wide changes | Editor/selection changes |
| **Best For** | Content import, document export, UI interactions | Layout creation, element manipulation, design tools |

### When to Use Each

**Use UI SDK when you need to:**
- Import images, videos, or audio into documents
- Export documents in various formats (PNG, PDF, PPTX, etc.)
- Get document metadata and information
- Show modal dialogs and UI interactions
- Work with existing document content

**Use Document API when you need to:**
- Create new visual elements (rectangles, text, images)
- Build complex layouts and designs
- Modify properties of individual elements
- Respond to user selection changes
- Create design tools and content generators

The UI SDK is like a **remote control** for Express documents, while the Document API provides **direct building blocks** for creating and manipulating visual content.