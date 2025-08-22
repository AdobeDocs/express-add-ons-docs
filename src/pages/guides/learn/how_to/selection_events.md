---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Selection
  - selectionChange
  - Events
  - Context
  - Node
title: Selection Events and Methods
description: Learn how to work with selections, handle selection changes, and respond to user interactions in Adobe Express documents.
contributors:
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I get the current selection?"
      answer: "Use `editor.context.selection` to get an array of currently selected nodes."

    - question: "How do I listen for selection changes?"
      answer: "Use `editor.context.on('selectionChange', callback)` to register a selection change handler."

    - question: "How do I programmatically select elements?"
      answer: "Set `editor.context.selection = [node]` or `editor.context.selection = [node1, node2]` for multiple elements."

    - question: "What's the difference between selection and selectionIncludingNonEditable?"
      answer: "`selection` only includes editable nodes, while `selectionIncludingNonEditable` also includes locked/non-editable nodes."

    - question: "Can I modify the document in a selection change callback?"
      answer: "No, avoid making document changes in selection change callbacks as it may destabilize the application."

    - question: "How do I clear the selection?"
      answer: "Set `editor.context.selection = []` or `editor.context.selection = undefined`."

    - question: "What are the selection rules?"
      answer: "Nodes must be within the current artboard, ancestors cannot be selected with descendants, and locked nodes are filtered out."

    - question: "How do I unregister selection event handlers?"
      answer: "Use `editor.context.off('selectionChange', handlerId)` with the ID returned from the `on()` method."
---

# Selection Events and Methods

Learn how to work with user selections, handle selection changes, and respond to user interactions in Adobe Express documents using the Document API.

<InlineAlert slots="header, text1, text2" variant="info"/>

Document API Context Required

Selection methods and events are part of the Document API and require the document sandbox environment. These examples should be used in your `sandbox/code.js` file, not in the main iframe panel.

Make sure your manifest includes `"documentSandbox": "sandbox/code.js"` in the entry points.

## Understanding Selections

In Adobe Express, selections represent the nodes (elements) that the user has currently selected. The selection system provides:

- **Current selection access** - Get what's currently selected
- **Selection modification** - Programmatically change selections  
- **Selection events** - React to selection changes
- **Selection filtering** - Handle locked/non-editable content

### Selection Rules

Adobe Express enforces several rules for selections:

1. **Artboard constraint** - Only nodes within the current artboard can be selected
2. **Hierarchy filtering** - Cannot select both parent and child nodes simultaneously
3. **Locked node filtering** - Locked nodes are excluded from the main selection
4. **Editable-only** - Main selection only includes editable nodes

## Getting the Current Selection

### Basic Selection Access

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Get the current selection
const selection = editor.context.selection;

console.log("Selected nodes:", selection.length);

// Check if anything is selected
if (editor.context.hasSelection) {
  console.log("Something is selected");
  
  // Process each selected node
  selection.forEach((node, index) => {
    console.log(`Node ${index + 1}:`, node.type);
  });
} else {
  console.log("Nothing is selected");
}
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, Node } from "express-document-sdk";

// Get the current selection
const selection: readonly Node[] = editor.context.selection;

console.log("Selected nodes:", selection.length);

// Check if anything is selected
if (editor.context.hasSelection) {
  console.log("Something is selected");
  
  // Process each selected node
  selection.forEach((node: Node, index: number) => {
    console.log(`Node ${index + 1}:`, node.type);
  });
} else {
  console.log("Nothing is selected");
}
```

### Including Non-Editable Selections

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Get selection including locked/non-editable nodes
const fullSelection = editor.context.selectionIncludingNonEditable;
const editableSelection = editor.context.selection;

console.log("Total selected (including locked):", fullSelection.length);
console.log("Editable selected:", editableSelection.length);

if (fullSelection.length > editableSelection.length) {
  console.log("Some locked nodes are selected");
  
  // Find the locked nodes
  const lockedNodes = fullSelection.filter(node => 
    !editableSelection.includes(node)
  );
  
  console.log("Locked nodes:", lockedNodes.length);
}
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, Node } from "express-document-sdk";

// Get selection including locked/non-editable nodes
const fullSelection: readonly Node[] = editor.context.selectionIncludingNonEditable;
const editableSelection: readonly Node[] = editor.context.selection;

console.log("Total selected (including locked):", fullSelection.length);
console.log("Editable selected:", editableSelection.length);

if (fullSelection.length > editableSelection.length) {
  console.log("Some locked nodes are selected");
  
  // Find the locked nodes
  const lockedNodes: Node[] = fullSelection.filter((node: Node) => 
    !editableSelection.includes(node)
  );
  
  console.log("Locked nodes:", lockedNodes.length);
}
```

## Setting Selections Programmatically

### Select Single Element

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a rectangle and select it
const rectangle = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 100;
rectangle.translation = { x: 50, y: 50 };

// Add to document
editor.context.insertionParent.children.append(rectangle);

// Select the rectangle
editor.context.selection = rectangle; // Single node shortcut
// OR
editor.context.selection = [rectangle]; // Array syntax

console.log("Rectangle is now selected");
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, RectangleNode, ContainerNode } from "express-document-sdk";

// Create a rectangle and select it
const rectangle: RectangleNode = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 100;
rectangle.translation = { x: 50, y: 50 };

// Add to document
const insertionParent: ContainerNode = editor.context.insertionParent;
insertionParent.children.append(rectangle);

// Select the rectangle
editor.context.selection = rectangle; // Single node shortcut
// OR
editor.context.selection = [rectangle]; // Array syntax

console.log("Rectangle is now selected");
```

### Select Multiple Elements

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create multiple elements
const rectangle = editor.createRectangle();
rectangle.width = 80;
rectangle.height = 80;
rectangle.translation = { x: 50, y: 50 };

const ellipse = editor.createEllipse();
ellipse.rx = 40;
ellipse.ry = 40;
ellipse.translation = { x: 200, y: 50 };

const text = editor.createText("Hello!");
text.translation = { x: 50, y: 200 };

// Add all to document
const parent = editor.context.insertionParent;
parent.children.append(rectangle, ellipse, text);

// Select multiple elements
editor.context.selection = [rectangle, ellipse, text];

console.log("Multiple elements selected:", editor.context.selection.length);
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, RectangleNode, EllipseNode, StandaloneTextNode, ContainerNode } from "express-document-sdk";

// Create multiple elements
const rectangle: RectangleNode = editor.createRectangle();
rectangle.width = 80;
rectangle.height = 80;
rectangle.translation = { x: 50, y: 50 };

const ellipse: EllipseNode = editor.createEllipse();
ellipse.rx = 40;
ellipse.ry = 40;
ellipse.translation = { x: 200, y: 50 };

const text: StandaloneTextNode = editor.createText("Hello!");
text.translation = { x: 50, y: 200 };

// Add all to document
const parent: ContainerNode = editor.context.insertionParent;
parent.children.append(rectangle, ellipse, text);

// Select multiple elements
editor.context.selection = [rectangle, ellipse, text];

console.log("Multiple elements selected:", editor.context.selection.length);
```

### Clear Selection

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Clear the selection (both methods work)
editor.context.selection = [];
// OR
editor.context.selection = undefined;

console.log("Selection cleared");
console.log("Has selection:", editor.context.hasSelection); // false
```

#### TypeScript

```ts
// sandbox/code.js
import { editor } from "express-document-sdk";

// Clear the selection (both methods work)
editor.context.selection = [];
// OR
editor.context.selection = undefined;

console.log("Selection cleared");
console.log("Has selection:", editor.context.hasSelection); // false
```

## Listening for Selection Changes

### Basic Selection Change Handler

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Register selection change handler
const handlerId = editor.context.on("selectionChange", () => {
  const selection = editor.context.selection;
  
  console.log("Selection changed!");
  console.log("New selection count:", selection.length);
  
  if (selection.length > 0) {
    console.log("Selected node types:", selection.map(node => node.type));
  } else {
    console.log("Selection cleared");
  }
});

console.log("Selection change handler registered with ID:", handlerId);

// Important: Store the handlerId if you need to unregister later
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, Node } from "express-document-sdk";

// Register selection change handler
const handlerId: string = editor.context.on("selectionChange", () => {
  const selection: readonly Node[] = editor.context.selection;
  
  console.log("Selection changed!");
  console.log("New selection count:", selection.length);
  
  if (selection.length > 0) {
    console.log("Selected node types:", selection.map((node: Node) => node.type));
  } else {
    console.log("Selection cleared");
  }
});

console.log("Selection change handler registered with ID:", handlerId);

// Important: Store the handlerId if you need to unregister later
```

### Advanced Selection Analysis

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

function analyzeSelection() {
  const selection = editor.context.selection;
  const fullSelection = editor.context.selectionIncludingNonEditable;
  
  return {
    editableCount: selection.length,
    totalCount: fullSelection.length,
    lockedCount: fullSelection.length - selection.length,
    types: selection.map(node => node.type),
    hasText: selection.some(node => node.type === "Text"),
    hasShapes: selection.some(node => 
      node.type === "Rectangle" || node.type === "Ellipse"
    ),
    isEmpty: !editor.context.hasSelection
  };
}

// Register detailed selection handler
const handlerId = editor.context.on("selectionChange", () => {
  const analysis = analyzeSelection();
  
  console.log("=== Selection Analysis ===");
  console.log("Editable nodes:", analysis.editableCount);
  console.log("Total nodes (including locked):", analysis.totalCount);
  console.log("Locked nodes:", analysis.lockedCount);
  console.log("Node types:", analysis.types);
  console.log("Has text:", analysis.hasText);
  console.log("Has shapes:", analysis.hasShapes);
  console.log("Is empty:", analysis.isEmpty);
});
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, Node } from "express-document-sdk";

interface SelectionAnalysis {
  editableCount: number;
  totalCount: number;
  lockedCount: number;
  types: string[];
  hasText: boolean;
  hasShapes: boolean;
  isEmpty: boolean;
}

function analyzeSelection(): SelectionAnalysis {
  const selection: readonly Node[] = editor.context.selection;
  const fullSelection: readonly Node[] = editor.context.selectionIncludingNonEditable;
  
  return {
    editableCount: selection.length,
    totalCount: fullSelection.length,
    lockedCount: fullSelection.length - selection.length,
    types: selection.map((node: Node) => node.type),
    hasText: selection.some((node: Node) => node.type === "Text"),
    hasShapes: selection.some((node: Node) => 
      node.type === "Rectangle" || node.type === "Ellipse"
    ),
    isEmpty: !editor.context.hasSelection
  };
}

// Register detailed selection handler
const handlerId: string = editor.context.on("selectionChange", () => {
  const analysis: SelectionAnalysis = analyzeSelection();
  
  console.log("=== Selection Analysis ===");
  console.log("Editable nodes:", analysis.editableCount);
  console.log("Total nodes (including locked):", analysis.totalCount);
  console.log("Locked nodes:", analysis.lockedCount);
  console.log("Node types:", analysis.types);
  console.log("Has text:", analysis.hasText);
  console.log("Has shapes:", analysis.hasShapes);
  console.log("Is empty:", analysis.isEmpty);
});
```

## Practical Selection Patterns

### Selection-Based Actions

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor, colorUtils } from "express-document-sdk";

// Function to apply red color to selected text
function applyRedToSelectedText() {
  const selection = editor.context.selection;
  
  // Filter for text nodes only
  const textNodes = selection.filter(node => node.type === "Text");
  
  if (textNodes.length === 0) {
    console.log("No text nodes selected");
    return;
  }
  
  // Apply red color to all selected text
  const redColor = colorUtils.fromHex("#FF0000");
  
  textNodes.forEach(textNode => {
    textNode.fullContent.applyCharacterStyles({ color: redColor });
  });
  
  console.log(`Applied red color to ${textNodes.length} text nodes`);
}

// Function to group selected elements
function groupSelection() {
  const selection = editor.context.selection;
  
  if (selection.length < 2) {
    console.log("Need at least 2 elements to create a group");
    return;
  }
  
  // Create a group
  const group = editor.createGroup();
  
  // Add selected elements to the group
  selection.forEach(node => {
    // Remove from current parent and add to group
    node.removeFromParent();
    group.children.append(node);
  });
  
  // Add group to the document
  editor.context.insertionParent.children.append(group);
  
  // Select the new group
  editor.context.selection = group;
  
  console.log(`Created group with ${selection.length} elements`);
}

// Register handlers for different actions
editor.context.on("selectionChange", () => {
  const selection = editor.context.selection;
  
  // Update UI or enable/disable actions based on selection
  if (selection.length === 0) {
    console.log("No selection - disable all actions");
  } else if (selection.length === 1) {
    console.log("Single selection - enable individual actions");
  } else {
    console.log("Multiple selection - enable group actions");
  }
});
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, colorUtils, Node, TextNode, GroupNode, ContainerNode } from "express-document-sdk";

// Function to apply red color to selected text
function applyRedToSelectedText(): void {
  const selection: readonly Node[] = editor.context.selection;
  
  // Filter for text nodes only
  const textNodes = selection.filter((node: Node): node is TextNode => 
    node.type === "Text"
  );
  
  if (textNodes.length === 0) {
    console.log("No text nodes selected");
    return;
  }
  
  // Apply red color to all selected text
  const redColor = colorUtils.fromHex("#FF0000");
  
  textNodes.forEach((textNode: TextNode) => {
    textNode.fullContent.applyCharacterStyles({ color: redColor });
  });
  
  console.log(`Applied red color to ${textNodes.length} text nodes`);
}

// Function to group selected elements
function groupSelection(): void {
  const selection: readonly Node[] = editor.context.selection;
  
  if (selection.length < 2) {
    console.log("Need at least 2 elements to create a group");
    return;
  }
  
  // Create a group
  const group: GroupNode = editor.createGroup();
  
  // Add selected elements to the group
  selection.forEach((node: Node) => {
    // Remove from current parent and add to group
    node.removeFromParent();
    group.children.append(node);
  });
  
  // Add group to the document
  const insertionParent: ContainerNode = editor.context.insertionParent;
  insertionParent.children.append(group);
  
  // Select the new group
  editor.context.selection = group;
  
  console.log(`Created group with ${selection.length} elements`);
}

// Register handlers for different actions
editor.context.on("selectionChange", () => {
  const selection: readonly Node[] = editor.context.selection;
  
  // Update UI or enable/disable actions based on selection
  if (selection.length === 0) {
    console.log("No selection - disable all actions");
  } else if (selection.length === 1) {
    console.log("Single selection - enable individual actions");
  } else {
    console.log("Multiple selection - enable group actions");
  }
});
```

### Selection State Management

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

class SelectionManager {
  constructor() {
    this.selectionHistory = [];
    this.handlerId = null;
    this.startListening();
  }
  
  startListening() {
    this.handlerId = editor.context.on("selectionChange", () => {
      const selection = editor.context.selection;
      
      // Store selection in history (limit to last 10)
      this.selectionHistory.push([...selection]);
      if (this.selectionHistory.length > 10) {
        this.selectionHistory.shift();
      }
      
      console.log("Selection history length:", this.selectionHistory.length);
      this.notifySelectionChange(selection);
    });
  }
  
  notifySelectionChange(selection) {
    // Custom logic based on selection
    if (selection.length === 0) {
      this.onNoSelection();
    } else if (selection.length === 1) {
      this.onSingleSelection(selection[0]);
    } else {
      this.onMultipleSelection(selection);
    }
  }
  
  onNoSelection() {
    console.log("No elements selected");
    // Disable context-sensitive UI
  }
  
  onSingleSelection(node) {
    console.log("Single element selected:", node.type);
    // Enable single-element actions
  }
  
  onMultipleSelection(selection) {
    console.log("Multiple elements selected:", selection.length);
    // Enable multi-element actions
  }
  
  restorePreviousSelection() {
    if (this.selectionHistory.length >= 2) {
      const previousSelection = this.selectionHistory[this.selectionHistory.length - 2];
      editor.context.selection = previousSelection;
    }
  }
  
  stopListening() {
    if (this.handlerId) {
      editor.context.off("selectionChange", this.handlerId);
      this.handlerId = null;
    }
  }
}

// Usage
const selectionManager = new SelectionManager();
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, Node } from "express-document-sdk";

class SelectionManager {
  private selectionHistory: Node[][] = [];
  private handlerId: string | null = null;
  
  constructor() {
    this.startListening();
  }
  
  startListening(): void {
    this.handlerId = editor.context.on("selectionChange", () => {
      const selection: readonly Node[] = editor.context.selection;
      
      // Store selection in history (limit to last 10)
      this.selectionHistory.push([...selection]);
      if (this.selectionHistory.length > 10) {
        this.selectionHistory.shift();
      }
      
      console.log("Selection history length:", this.selectionHistory.length);
      this.notifySelectionChange(selection);
    });
  }
  
  private notifySelectionChange(selection: readonly Node[]): void {
    // Custom logic based on selection
    if (selection.length === 0) {
      this.onNoSelection();
    } else if (selection.length === 1) {
      this.onSingleSelection(selection[0]);
    } else {
      this.onMultipleSelection(selection);
    }
  }
  
  private onNoSelection(): void {
    console.log("No elements selected");
    // Disable context-sensitive UI
  }
  
  private onSingleSelection(node: Node): void {
    console.log("Single element selected:", node.type);
    // Enable single-element actions
  }
  
  private onMultipleSelection(selection: readonly Node[]): void {
    console.log("Multiple elements selected:", selection.length);
    // Enable multi-element actions
  }
  
  restorePreviousSelection(): void {
    if (this.selectionHistory.length >= 2) {
      const previousSelection = this.selectionHistory[this.selectionHistory.length - 2];
      editor.context.selection = previousSelection;
    }
  }
  
  stopListening(): void {
    if (this.handlerId) {
      editor.context.off("selectionChange", this.handlerId);
      this.handlerId = null;
    }
  }
}

// Usage
const selectionManager = new SelectionManager();
```

## Cleanup and Best Practices

### Unregistering Event Handlers

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Store handler IDs for cleanup
let selectionHandlerId = null;

function setupSelectionHandling() {
  // Register handler and store ID
  selectionHandlerId = editor.context.on("selectionChange", () => {
    console.log("Selection changed");
    // Handle selection change
  });
  
  console.log("Selection handler registered");
}

function cleanupSelectionHandling() {
  // Unregister the handler
  if (selectionHandlerId) {
    editor.context.off("selectionChange", selectionHandlerId);
    selectionHandlerId = null;
    console.log("Selection handler unregistered");
  }
}

// Setup
setupSelectionHandling();

// Cleanup when add-on is being destroyed or reset
// cleanupSelectionHandling();
```

#### TypeScript

```ts
// sandbox/code.js
import { editor } from "express-document-sdk";

// Store handler IDs for cleanup
let selectionHandlerId: string | null = null;

function setupSelectionHandling(): void {
  // Register handler and store ID
  selectionHandlerId = editor.context.on("selectionChange", () => {
    console.log("Selection changed");
    // Handle selection change
  });
  
  console.log("Selection handler registered");
}

function cleanupSelectionHandling(): void {
  // Unregister the handler
  if (selectionHandlerId) {
    editor.context.off("selectionChange", selectionHandlerId);
    selectionHandlerId = null;
    console.log("Selection handler unregistered");
  }
}

// Setup
setupSelectionHandling();

// Cleanup when add-on is being destroyed or reset
// cleanupSelectionHandling();
```

## Key Concepts and Rules

### Selection Constraints

1. **Artboard Limitation**: Only nodes within the current artboard can be selected
2. **Hierarchy Rules**: Cannot select both a parent node and its children simultaneously  
3. **Locked Node Handling**: Locked nodes are excluded from the main selection but available in `selectionIncludingNonEditable`
4. **Automatic Filtering**: The system automatically filters out invalid selections

### Event Handler Guidelines

<InlineAlert slots="header, text1, text2" variant="warning"/>

Important: Document Modification Restrictions

**Do not attempt to make changes to the document in response to a selection change callback** because it may destabilize the application. Selection change handlers should be used for:

✅ **Safe operations:** Updating UI, logging, analyzing selection, enabling/disabling buttons  
❌ **Avoid:** Creating/deleting nodes, modifying properties, changing the document structure

### Performance Considerations

1. **Minimize Handler Logic**: Keep selection change handlers lightweight
2. **Debounce Rapid Changes**: Consider debouncing if handling rapid selection changes
3. **Clean Up Handlers**: Always unregister event handlers when no longer needed
4. **Avoid Deep Analysis**: Don't perform expensive operations in selection callbacks

## Communication Between UI and Document Sandbox

One of the most important real-world patterns is communicating selection changes from the document sandbox to your UI panel, allowing you to update the interface based on what the user has selected.

### Complete Communication Example

This example shows how to set up bidirectional communication between your UI panel and document sandbox for selection-based interactions.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

**UI Panel (index.js):**

```js
// ui/index.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

let documentSandbox;

addOnUISdk.ready.then(async () => {
  // Get access to the document sandbox APIs
  documentSandbox = await addOnUISdk.instance.runtime.apiProxy("documentSandbox");
  
  // Set up UI elements
  setupSelectionUI();
  
  // Start listening for selection updates from sandbox
  documentSandbox.registerSelectionUpdateHandler(handleSelectionUpdate);
});

function setupSelectionUI() {
  const container = document.getElementById("selection-info");
  
  container.innerHTML = `
    <div id="selection-status">Nothing selected</div>
    <div id="selection-actions">
      <button id="apply-red-btn" disabled>Apply Red Color</button>
      <button id="group-btn" disabled>Group Elements</button>
      <button id="clear-selection-btn" disabled>Clear Selection</button>
    </div>
    <div id="selection-details"></div>
  `;
  
  // Set up button handlers
  document.getElementById("apply-red-btn").addEventListener("click", () => {
    documentSandbox.applyRedToSelection();
  });
  
  document.getElementById("group-btn").addEventListener("click", () => {
    documentSandbox.groupSelection();
  });
  
  document.getElementById("clear-selection-btn").addEventListener("click", () => {
    documentSandbox.clearSelection();
  });
}

function handleSelectionUpdate(selectionInfo) {
  console.log("Selection update received:", selectionInfo);
  
  // Update status
  const statusEl = document.getElementById("selection-status");
  if (selectionInfo.count === 0) {
    statusEl.textContent = "Nothing selected";
  } else if (selectionInfo.count === 1) {
    statusEl.textContent = `1 ${selectionInfo.types[0]} selected`;
  } else {
    statusEl.textContent = `${selectionInfo.count} elements selected`;
  }
  
  // Update action buttons
  document.getElementById("apply-red-btn").disabled = !selectionInfo.hasText;
  document.getElementById("group-btn").disabled = selectionInfo.count < 2;
  document.getElementById("clear-selection-btn").disabled = selectionInfo.count === 0;
  
  // Update details
  const detailsEl = document.getElementById("selection-details");
  if (selectionInfo.count > 0) {
    detailsEl.innerHTML = `
      <h4>Selection Details:</h4>
      <p>Types: ${selectionInfo.types.join(", ")}</p>
      <p>Has Text: ${selectionInfo.hasText ? "Yes" : "No"}</p>
      <p>Has Shapes: ${selectionInfo.hasShapes ? "Yes" : "No"}</p>
      <p>Locked Elements: ${selectionInfo.lockedCount}</p>
    `;
  } else {
    detailsEl.innerHTML = "";
  }
}
```

**Document Sandbox (code.js):**

```js
// sandbox/code.js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, colorUtils } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;
let uiPanel;

// Wait for UI panel to be ready
runtime.ready.then(async () => {
  // Get access to the UI panel APIs
  uiPanel = await runtime.apiProxy("panel");
  
  // Set up selection change handler
  setupSelectionHandling();
});

function setupSelectionHandling() {
  editor.context.on("selectionChange", () => {
    const selectionInfo = analyzeCurrentSelection();
    
    // Send selection info to UI panel
    uiPanel.handleSelectionUpdate(selectionInfo);
  });
  
  // Send initial selection state
  const initialSelection = analyzeCurrentSelection();
  uiPanel.handleSelectionUpdate(initialSelection);
}

function analyzeCurrentSelection() {
  const selection = editor.context.selection;
  const fullSelection = editor.context.selectionIncludingNonEditable;
  
  return {
    count: selection.length,
    totalCount: fullSelection.length,
    lockedCount: fullSelection.length - selection.length,
    types: [...new Set(selection.map(node => node.type))],
    hasText: selection.some(node => node.type === "Text"),
    hasShapes: selection.some(node => 
      ["Rectangle", "Ellipse"].includes(node.type)
    ),
    isEmpty: selection.length === 0
  };
}

// Export functions for UI to call
function registerSelectionUpdateHandler(handler) {
  // Store the handler function from UI
  runtime.exposeApi({
    applyRedToSelection() {
      const selection = editor.context.selection;
      const textNodes = selection.filter(node => node.type === "Text");
      
      if (textNodes.length > 0) {
        const redColor = colorUtils.fromHex("#FF0000");
        textNodes.forEach(textNode => {
          textNode.fullContent.applyCharacterStyles({ color: redColor });
        });
        
        console.log(`Applied red to ${textNodes.length} text nodes`);
      }
    },
    
    groupSelection() {
      const selection = editor.context.selection;
      
      if (selection.length >= 2) {
        const group = editor.createGroup();
        
        // Move selected elements to group
        selection.forEach(node => {
          node.removeFromParent();
          group.children.append(node);
        });
        
        // Add group to document
        editor.context.insertionParent.children.append(group);
        
        // Select the new group
        editor.context.selection = group;
        
        console.log(`Created group with ${selection.length} elements`);
      }
    },
    
    clearSelection() {
      editor.context.selection = [];
      console.log("Selection cleared");
    },
    
    registerSelectionUpdateHandler: handler
  });
}

// Expose the registration function immediately
runtime.exposeApi({ registerSelectionUpdateHandler });
```

#### TypeScript

**UI Panel (index.ts):**

```ts
// ui/index.ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

interface SelectionInfo {
  count: number;
  totalCount: number;
  lockedCount: number;
  types: string[];
  hasText: boolean;
  hasShapes: boolean;
  isEmpty: boolean;
}

interface DocumentSandboxAPI {
  registerSelectionUpdateHandler: (handler: (info: SelectionInfo) => void) => void;
  applyRedToSelection: () => void;
  groupSelection: () => void;
  clearSelection: () => void;
}

let documentSandbox: DocumentSandboxAPI;

addOnUISdk.ready.then(async () => {
  // Get access to the document sandbox APIs
  documentSandbox = await addOnUISdk.instance.runtime.apiProxy("documentSandbox");
  
  // Set up UI elements
  setupSelectionUI();
  
  // Start listening for selection updates from sandbox
  documentSandbox.registerSelectionUpdateHandler(handleSelectionUpdate);
});

function setupSelectionUI(): void {
  const container = document.getElementById("selection-info");
  
  if (container) {
    container.innerHTML = `
      <div id="selection-status">Nothing selected</div>
      <div id="selection-actions">
        <button id="apply-red-btn" disabled>Apply Red Color</button>
        <button id="group-btn" disabled>Group Elements</button>
        <button id="clear-selection-btn" disabled>Clear Selection</button>
      </div>
      <div id="selection-details"></div>
    `;
    
    // Set up button handlers
    const applyRedBtn = document.getElementById("apply-red-btn");
    const groupBtn = document.getElementById("group-btn");
    const clearBtn = document.getElementById("clear-selection-btn");
    
    applyRedBtn?.addEventListener("click", () => {
      documentSandbox.applyRedToSelection();
    });
    
    groupBtn?.addEventListener("click", () => {
      documentSandbox.groupSelection();
    });
    
    clearBtn?.addEventListener("click", () => {
      documentSandbox.clearSelection();
    });
  }
}

function handleSelectionUpdate(selectionInfo: SelectionInfo): void {
  console.log("Selection update received:", selectionInfo);
  
  // Update status
  const statusEl = document.getElementById("selection-status");
  if (statusEl) {
    if (selectionInfo.count === 0) {
      statusEl.textContent = "Nothing selected";
    } else if (selectionInfo.count === 1) {
      statusEl.textContent = `1 ${selectionInfo.types[0]} selected`;
    } else {
      statusEl.textContent = `${selectionInfo.count} elements selected`;
    }
  }
  
  // Update action buttons
  const applyRedBtn = document.getElementById("apply-red-btn") as HTMLButtonElement;
  const groupBtn = document.getElementById("group-btn") as HTMLButtonElement;
  const clearBtn = document.getElementById("clear-selection-btn") as HTMLButtonElement;
  
  if (applyRedBtn) applyRedBtn.disabled = !selectionInfo.hasText;
  if (groupBtn) groupBtn.disabled = selectionInfo.count < 2;
  if (clearBtn) clearBtn.disabled = selectionInfo.count === 0;
  
  // Update details
  const detailsEl = document.getElementById("selection-details");
  if (detailsEl) {
    if (selectionInfo.count > 0) {
      detailsEl.innerHTML = `
        <h4>Selection Details:</h4>
        <p>Types: ${selectionInfo.types.join(", ")}</p>
        <p>Has Text: ${selectionInfo.hasText ? "Yes" : "No"}</p>
        <p>Has Shapes: ${selectionInfo.hasShapes ? "Yes" : "No"}</p>
        <p>Locked Elements: ${selectionInfo.lockedCount}</p>
      `;
    } else {
      detailsEl.innerHTML = "";
    }
  }
}
```

**Document Sandbox (code.ts):**

```ts
// sandbox/code.ts
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, colorUtils, Node, TextNode, GroupNode, ContainerNode } from "express-document-sdk";

interface SelectionInfo {
  count: number;
  totalCount: number;
  lockedCount: number;
  types: string[];
  hasText: boolean;
  hasShapes: boolean;
  isEmpty: boolean;
}

interface UIPanelAPI {
  handleSelectionUpdate: (info: SelectionInfo) => void;
}

const { runtime } = addOnSandboxSdk.instance;
let uiPanel: UIPanelAPI;

// Wait for UI panel to be ready
runtime.ready.then(async () => {
  // Get access to the UI panel APIs
  uiPanel = await runtime.apiProxy("panel");
  
  // Set up selection change handler
  setupSelectionHandling();
});

function setupSelectionHandling(): void {
  editor.context.on("selectionChange", () => {
    const selectionInfo: SelectionInfo = analyzeCurrentSelection();
    
    // Send selection info to UI panel
    uiPanel.handleSelectionUpdate(selectionInfo);
  });
  
  // Send initial selection state
  const initialSelection: SelectionInfo = analyzeCurrentSelection();
  uiPanel.handleSelectionUpdate(initialSelection);
}

function analyzeCurrentSelection(): SelectionInfo {
  const selection: readonly Node[] = editor.context.selection;
  const fullSelection: readonly Node[] = editor.context.selectionIncludingNonEditable;
  
  return {
    count: selection.length,
    totalCount: fullSelection.length,
    lockedCount: fullSelection.length - selection.length,
    types: [...new Set(selection.map((node: Node) => node.type))],
    hasText: selection.some((node: Node) => node.type === "Text"),
    hasShapes: selection.some((node: Node) => 
      ["Rectangle", "Ellipse"].includes(node.type)
    ),
    isEmpty: selection.length === 0
  };
}

// Export functions for UI to call
function registerSelectionUpdateHandler(handler: (info: SelectionInfo) => void): void {
  // Store the handler function from UI
  runtime.exposeApi({
    applyRedToSelection(): void {
      const selection: readonly Node[] = editor.context.selection;
      const textNodes = selection.filter((node: Node): node is TextNode => 
        node.type === "Text"
      );
      
      if (textNodes.length > 0) {
        const redColor = colorUtils.fromHex("#FF0000");
        textNodes.forEach((textNode: TextNode) => {
          textNode.fullContent.applyCharacterStyles({ color: redColor });
        });
        
        console.log(`Applied red to ${textNodes.length} text nodes`);
      }
    },
    
    groupSelection(): void {
      const selection: readonly Node[] = editor.context.selection;
      
      if (selection.length >= 2) {
        const group: GroupNode = editor.createGroup();
        
        // Move selected elements to group
        selection.forEach((node: Node) => {
          node.removeFromParent();
          group.children.append(node);
        });
        
        // Add group to document
        const insertionParent: ContainerNode = editor.context.insertionParent;
        insertionParent.children.append(group);
        
        // Select the new group
        editor.context.selection = group;
        
        console.log(`Created group with ${selection.length} elements`);
      }
    },
    
    clearSelection(): void {
      editor.context.selection = [];
      console.log("Selection cleared");
    },
    
    registerSelectionUpdateHandler: handler
  });
}

// Expose the registration function immediately
runtime.exposeApi({ registerSelectionUpdateHandler });
```

### HTML Structure

Your `index.html` should include the selection UI container:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Selection Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="selection-info">
        <!-- Selection UI will be inserted here -->
    </div>
    
    <script src="index.js"></script>
</body>
</html>
```

### Key Communication Patterns

1. **Initialization**: UI panel registers a callback with the document sandbox
2. **Event Flow**: Document sandbox listens for selection changes and sends updates to UI
3. **Action Triggers**: UI sends action requests back to document sandbox
4. **Bidirectional**: Both sides can call methods on the other

This pattern enables rich, responsive UIs that react to document changes in real-time.

## Common Patterns

### Conditional Actions Based on Selection

```js
// Enable/disable actions based on selection type
editor.context.on("selectionChange", () => {
  const selection = editor.context.selection;
  
  // Communicate with your UI panel
  const actions = {
    canGroup: selection.length >= 2,
    canApplyTextStyle: selection.some(node => node.type === "Text"),
    canApplyFill: selection.some(node => 
      ["Rectangle", "Ellipse"].includes(node.type)
    ),
    isEmpty: selection.length === 0
  };
  
  // Send to UI panel for enabling/disabling buttons
  // (Use the communication API to send this data)
});
```

### Selection-Based Properties Panel

```js
// Update properties panel based on selection
editor.context.on("selectionChange", () => {
  const selection = editor.context.selection;
  
  if (selection.length === 1) {
    const node = selection[0];
    
    // Send node properties to UI for editing
    const properties = {
      type: node.type,
      width: node.width || null,
      height: node.height || null,
      x: node.translation?.x || null,
      y: node.translation?.y || null,
      locked: node.locked || false
    };
    
    // Update UI panel with these properties
    console.log("Node properties:", properties);
  }
});
```

## FAQs

#### Q: How do I get the current selection?

**A:** Use `editor.context.selection` to get an array of currently selected nodes.

#### Q: How do I listen for selection changes?

**A:** Use `editor.context.on('selectionChange', callback)` to register a selection change handler.

#### Q: How do I programmatically select elements?

**A:** Set `editor.context.selection = [node]` or `editor.context.selection = [node1, node2]` for multiple elements.

#### Q: What's the difference between selection and selectionIncludingNonEditable?

**A:** `selection` only includes editable nodes, while `selectionIncludingNonEditable` also includes locked/non-editable nodes.

#### Q: Can I modify the document in a selection change callback?

**A:** No, avoid making document changes in selection change callbacks as it may destabilize the application.

#### Q: How do I clear the selection?

**A:** Set `editor.context.selection = []` or `editor.context.selection = undefined`.

#### Q: What are the selection rules?

**A:** Nodes must be within the current artboard, ancestors cannot be selected with descendants, and locked nodes are filtered out.

#### Q: How do I unregister selection event handlers?

**A:** Use `editor.context.off('selectionChange', handlerId)` with the ID returned from the `on()` method.
