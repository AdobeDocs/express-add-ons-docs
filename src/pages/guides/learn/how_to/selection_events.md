---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Document API
  - Selection
  - selectionChange
  - Events
  - Node selection
  - UI integration
  - Document sandbox
  - Event handlers
  - Selection filtering
  - Locked nodes
  - Properties panel
  - Real-time updates
title: Handle Element Selection
description: Complete guide to working with element selections in Adobe Express documents - from basic selection operations to advanced event handling and UI integration patterns.
contributors:
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I get the current selection?"
      answer: "Use `editor.context.selection` to get an array of currently selected editable nodes, or `editor.context.hasSelection` to check if anything is selected."

    - question: "How do I listen for selection changes?"
      answer: "Use `editor.context.on(EditorEvent.selectionChange, callback)` to register a handler. Always store the returned ID for cleanup."

    - question: "How do I programmatically select elements?"
      answer: "Set `editor.context.selection = node` for single elements or `editor.context.selection = [node1, node2]` for multiple elements."

    - question: "What's the difference between selection and selectionIncludingNonEditable?"
      answer: "`selection` only includes editable nodes, while `selectionIncludingNonEditable` includes locked/non-editable nodes that users can see but not modify."

    - question: "Can I modify the document in a selection change callback?"
      answer: "Never modify the document in selection change handlers - this can crash the application. Only update UI, analyze data, or communicate with your panel."

    - question: "How do I clear the selection?"
      answer: "Set `editor.context.selection = []` or `editor.context.selection = undefined` to clear all selections."

    - question: "What selection rules should I know?"
      answer: "Only nodes within the current artboard can be selected, you cannot select both parent and child nodes simultaneously, and locked nodes are automatically filtered from the main selection."

    - question: "How do I clean up selection event handlers?"
      answer: "Always call `editor.context.off(EditorEvent.selectionChange, handlerId)` using the ID returned from `on()` to prevent memory leaks."

    - question: "How do I communicate selection changes to my UI?"
      answer: "Use the runtime API to send selection data from the document sandbox to your UI panel, enabling real-time interface updates."

    - question: "What are common selection-based actions?"
      answer: "Typical actions include updating properties panels, enabling/disabling tools, applying formatting to selected text, grouping elements, and showing context-appropriate options."
---

# Handle Element Selection

Learn how to work with user selections, handle selection changes, and respond to user interactions in Adobe Express documents using the Document API.

<InlineAlert slots="header, text1, text2" variant="info"/>

Document API Context Required

Selection methods and events are part of the Document API and require the document sandbox environment. These examples should be used in your `code.js` file, not in the main iframe panel.

Make sure your manifest includes `"documentSandbox": "code.js"` in the entry points.

For more details on the Context class, see the [Context API reference](../../../references/document-sandbox/document-apis/classes/Context.md).

## Getting Started with Selections

Selections in Adobe Express represent the elements (nodes) that users have currently selected in their document. The selection system provides access to what's selected, the ability to change selections programmatically, and events to respond to selection changes.

### Check Current Selection

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js  
import { editor } from "express-document-sdk";

// Check if anything is selected
if (editor.context.hasSelection) {
  const selection = editor.context.selection;
  console.log(`Selected ${selection.length} item(s)`);
  
  // Process each selected node
  selection.forEach((node, index) => {
    console.log(`Node ${index + 1}: ${node.type}`);
  });
} else {
  console.log("Nothing is selected");
}
```

#### TypeScript

```ts
// code.ts
import { editor, Node, EditorEvent } from "express-document-sdk";

// Check if anything is selected
if (editor.context.hasSelection) {
  const selection: readonly Node[] = editor.context.selection;
  console.log(`Selected ${selection.length} item(s)`);
  
  // Process each selected node
  selection.forEach((node: Node, index: number) => {
    console.log(`Node ${index + 1}: ${node.type}`);
  });
} else {
  console.log("Nothing is selected");
}
```

## Understanding Selections

In Adobe Express, the selection system provides:

- **Current selection access** - Get what's currently selected
- **Selection modification** - Programmatically change selections  
- **Selection events** - React to selection changes
- **Selection filtering** - Handle locked/non-editable content

### Selection Rules

Adobe Express enforces these constraints:

1. **Artboard constraint** - Only nodes within the current artboard can be selected
2. **Hierarchy filtering** - Cannot select both parent and child nodes simultaneously
3. **Locked node filtering** - Locked nodes are excluded from the main selection
4. **Editable-only** - Main selection only includes editable nodes

## Basic Selection Operations

Core operations for working with selections.

### Getting the Current Selection

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor } from "express-document-sdk";

// Get the current selection
const selection = editor.context.selection;

console.log("Selected nodes:", selection.length);

// Process each selected node
selection.forEach((node, index) => {
  console.log(`Node ${index + 1}: ${node.type}`);
  
  // Common node properties you can access
  console.log("  Position:", node.translation);
  console.log("  Size:", { width: node.width, height: node.height });
});
```

#### TypeScript

```ts
// code.ts
import { editor, Node, EditorEvent } from "express-document-sdk";

// Get the current selection
const selection: readonly Node[] = editor.context.selection;

console.log("Selected nodes:", selection.length);

// Process each selected node
selection.forEach((node: Node, index: number) => {
  console.log(`Node ${index + 1}: ${node.type}`);
  
  // Common node properties you can access  
  console.log("  Position:", node.translation);
  console.log("  Size:", { width: node.width, height: node.height });
});
```

### Programmatic Selection

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor } from "express-document-sdk";

// Create and select a single element
const rectangle = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 100;
rectangle.translation = { x: 50, y: 50 };

// Add to document
editor.context.insertionParent.children.append(rectangle);

// Select the rectangle (single element)
editor.context.selection = rectangle; 
// OR using array syntax: editor.context.selection = [rectangle];

console.log("Rectangle is now selected");
```

#### TypeScript

```ts
// code.ts  
import { editor, RectangleNode, ContainerNode } from "express-document-sdk";

// Create a simple rectangle to demonstrate selection
const rectangle: RectangleNode = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 100;
rectangle.translation = { x: 50, y: 50 };

// Add to document
const insertionParent: ContainerNode = editor.context.insertionParent;
insertionParent.children.append(rectangle);

// Select the rectangle (single element)
editor.context.selection = rectangle;
// OR using array syntax: editor.context.selection = [rectangle];

console.log("Rectangle is now selected");
```

### Multiple Selection

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
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

// Add both to document
const parent = editor.context.insertionParent;
parent.children.append(rectangle, ellipse);

// Select both elements at once
editor.context.selection = [rectangle, ellipse];

console.log("Multiple elements selected:", editor.context.selection.length);
```

#### TypeScript

```ts
// code.ts
import { editor, RectangleNode, EllipseNode, ContainerNode } from "express-document-sdk";

// Create multiple simple elements
const rectangle: RectangleNode = editor.createRectangle();
rectangle.width = 80;
rectangle.height = 80;  
rectangle.translation = { x: 50, y: 50 };

const ellipse: EllipseNode = editor.createEllipse();
ellipse.rx = 40;
ellipse.ry = 40;
ellipse.translation = { x: 200, y: 50 };

// Add both to document
const parent: ContainerNode = editor.context.insertionParent;
parent.children.append(rectangle, ellipse);

// Select both elements at once
editor.context.selection = [rectangle, ellipse];

console.log("Multiple elements selected:", editor.context.selection.length);
```

### Clearing the Selection

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor } from "express-document-sdk";

// Clear the selection - both ways work
editor.context.selection = [];
// OR: editor.context.selection = undefined;

console.log("Selection cleared");
console.log("Has selection:", editor.context.hasSelection); // false
```

#### TypeScript

```ts
// code.ts
import { editor } from "express-document-sdk";

// Clear the selection - both ways work
editor.context.selection = [];
// OR: editor.context.selection = undefined;

console.log("Selection cleared");
console.log("Has selection:", editor.context.hasSelection); // false
```

## Selection Events

Respond to selection changes to create dynamic UIs that update based on what's selected.

### Basic Selection Change Handler

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor, EditorEvent } from "express-document-sdk";

// Listen for selection changes  
const handlerId = editor.context.on(EditorEvent.selectionChange, () => {
  const selection = editor.context.selection;
  
  console.log("Selection changed!");
  console.log("New selection count:", selection.length);
  
  if (selection.length === 0) {
    console.log("Nothing selected");
  } else if (selection.length === 1) {
    console.log("One item selected:", selection[0].type);
  } else {
    console.log("Multiple items selected");
  }
});

// Store handlerId if you need to unregister later
console.log("Selection handler registered:", handlerId);
```

#### TypeScript

```ts
// code.ts
import { editor, Node, EditorEvent } from "express-document-sdk";

// Listen for selection changes
const handlerId: string = editor.context.on(EditorEvent.selectionChange, () => {
  const selection: readonly Node[] = editor.context.selection;
  
  console.log("Selection changed!");
  console.log("New selection count:", selection.length);
  
  if (selection.length === 0) {
    console.log("Nothing selected");
  } else if (selection.length === 1) {
    console.log("One item selected:", selection[0].type);
  } else {
    console.log("Multiple items selected");
  }
});

// Store handlerId if you need to unregister later  
console.log("Selection handler registered:", handlerId);
```

### Properties Panel Example

Dynamic properties panel based on selection:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor, EditorEvent } from "express-document-sdk";

function updatePropertiesPanel() {
  const selection = editor.context.selection;
  
  if (selection.length === 0) {
    console.log("Properties Panel: Show 'Nothing Selected' state");
    return;
  }
  
  if (selection.length === 1) {
    const node = selection[0];
    console.log("Properties Panel: Show properties for", node.type);
    
    // Show different properties based on node type
    if (node.type === "Text") {
      console.log("  - Show font controls");
      console.log("  - Show text color picker");
    } else if (node.type === "Rectangle" || node.type === "Ellipse") {
      console.log("  - Show fill color picker");  
      console.log("  - Show stroke controls");
    }
    
    // Common properties for all nodes
    console.log("  - Show position controls");
    console.log("  - Show size controls");
    
  } else {
    console.log("Properties Panel: Show multi-selection options");
    console.log(`  - ${selection.length} items selected`);
    console.log("  - Show alignment tools");
    console.log("  - Show group option");
  }
}

// Register the handler
editor.context.on(EditorEvent.selectionChange, updatePropertiesPanel);

// Call once on startup to initialize
updatePropertiesPanel();
```

#### TypeScript

```ts
// code.ts
import { editor, Node, TextNode } from "express-document-sdk";

function updatePropertiesPanel(): void {
  const selection: readonly Node[] = editor.context.selection;
  
  if (selection.length === 0) {
    console.log("Properties Panel: Show 'Nothing Selected' state");
    return;
  }
  
  if (selection.length === 1) {
    const node: Node = selection[0];
    console.log("Properties Panel: Show properties for", node.type);
    
    // Show different properties based on node type
    if (node.type === "Text") {
      console.log("  - Show font controls");
      console.log("  - Show text color picker");
    } else if (node.type === "Rectangle" || node.type === "Ellipse") {
      console.log("  - Show fill color picker");
      console.log("  - Show stroke controls");
    }
    
    // Common properties for all nodes
    console.log("  - Show position controls");
    console.log("  - Show size controls");
    
  } else {
    console.log("Properties Panel: Show multi-selection options");
    console.log(`  - ${selection.length} items selected`);
    console.log("  - Show alignment tools");
    console.log("  - Show group option");
  }
}

// Register the handler
editor.context.on(EditorEvent.selectionChange, updatePropertiesPanel);

// Call once on startup to initialize
updatePropertiesPanel();
```

### Event Handler Cleanup

⚠️ **Important**: Always clean up event handlers to prevent memory leaks.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor, EditorEvent } from "express-document-sdk";

// Store handler IDs so you can unregister them later
let selectionHandlerId = null;

function startListening() {
  // Register handler and store the ID
  selectionHandlerId = editor.context.on(EditorEvent.selectionChange, () => {
    console.log("Selection changed!");
    // Handle selection change
  });
  
  console.log("✅ Selection handler registered");
}

function stopListening() {
  // Clean up the handler
  if (selectionHandlerId) {
    editor.context.off(EditorEvent.selectionChange, selectionHandlerId);
    selectionHandlerId = null;
    console.log("✅ Selection handler cleaned up");
  }
}

// Start listening
startListening();

// Clean up when your add-on is being destroyed or reset
// stopListening();
```

#### TypeScript

```ts
// code.ts
import { editor, EditorEvent } from "express-document-sdk";

// Store handler IDs so you can unregister them later
let selectionHandlerId: string | null = null;

function startListening(): void {
  // Register handler and store the ID
  selectionHandlerId = editor.context.on(EditorEvent.selectionChange, () => {
    console.log("Selection changed!");
    // Handle selection change
  });
  
  console.log("✅ Selection handler registered");
}

function stopListening(): void {
  // Clean up the handler
  if (selectionHandlerId) {
    editor.context.off(EditorEvent.selectionChange, selectionHandlerId);
    selectionHandlerId = null;
    console.log("✅ Selection handler cleaned up");
  }
}

// Start listening
startListening();

// Clean up when your add-on is being destroyed or reset
// stopListening();
```

## Advanced Selection Techniques

Advanced patterns for complex add-ons.

### Working with Locked/Non-Editable Elements

Handle selections that include locked or non-editable content:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor, EditorEvent } from "express-document-sdk";

function analyzeCompleteSelection() {
  const selection = editor.context.selection;
  const fullSelection = editor.context.selectionIncludingNonEditable;
  
  return {
    editableCount: selection.length,
    totalCount: fullSelection.length,
    lockedCount: fullSelection.length - selection.length,
    types: [...new Set(selection.map(node => node.type))], // Unique types
    hasText: selection.some(node => node.type === "Text"),
    hasShapes: selection.some(node => 
      node.type === "Rectangle" || node.type === "Ellipse"
    ),
    isEmpty: !editor.context.hasSelection
  };
}

// Example: Dynamic UI updates based on detailed analysis
editor.context.on(EditorEvent.selectionChange, () => {
  const analysis = analyzeCompleteSelection();
  
  console.log("📊 Detailed Selection Info:");
  console.log(`  Editable: ${analysis.editableCount}`);
  if (analysis.lockedCount > 0) {
    console.log(`  Locked: ${analysis.lockedCount}`);
  }
  console.log(`  Types: ${analysis.types.join(", ")}`);
  
  // Enable specific tools based on content
  if (analysis.hasText) {
    console.log("🔤 Text formatting tools available");
  }
  if (analysis.hasShapes) {
    console.log("🔷 Shape styling tools available");  
  }
  if (analysis.editableCount > 1) {
    console.log("📐 Alignment tools available");
  }
});
```

#### TypeScript

```ts
// code.ts
import { editor, Node, EditorEvent } from "express-document-sdk";

interface DetailedSelectionAnalysis {
  editableCount: number;
  totalCount: number;
  lockedCount: number;
  types: string[];
  hasText: boolean;
  hasShapes: boolean;
  isEmpty: boolean;
}

function analyzeSelection(): DetailedSelectionAnalysis {
  const selection: readonly Node[] = editor.context.selection;
  const fullSelection: readonly Node[] = editor.context.selectionIncludingNonEditable;
  
  return {
    editableCount: selection.length,
    totalCount: fullSelection.length,
    lockedCount: fullSelection.length - selection.length,
    types: [...new Set(selection.map((node: Node) => node.type))], // Unique types
    hasText: selection.some((node: Node) => node.type === "Text"),
    hasShapes: selection.some((node: Node) => 
      node.type === "Rectangle" || node.type === "Ellipse"
    ),
    isEmpty: !editor.context.hasSelection
  };
}

// Example: Dynamic UI updates based on detailed analysis
editor.context.on(EditorEvent.selectionChange, () => {
  const analysis: DetailedSelectionAnalysis = analyzeSelection();
  
  console.log("📊 Detailed Selection Info:");
  console.log(`  Editable: ${analysis.editableCount}`);
  if (analysis.lockedCount > 0) {
    console.log(`  Locked: ${analysis.lockedCount}`);
  }
  console.log(`  Types: ${analysis.types.join(", ")}`);
  
  // Enable specific tools based on content
  if (analysis.hasText) {
    console.log("🔤 Text formatting tools available");
  }
  if (analysis.hasShapes) {
    console.log("🔷 Shape styling tools available");
  }
  if (analysis.editableCount > 1) {
    console.log("📐 Alignment tools available");
  }
});
```

## UI Integration

Communicate selection changes between the document sandbox and your UI panel to create responsive interfaces.

### Selection-Based Actions

Common patterns for performing actions on selected elements:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
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
editor.context.on(EditorEvent.selectionChange, () => {
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
// code.ts
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
editor.context.on(EditorEvent.selectionChange, () => {
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
// code.js
import { editor, EditorEvent } from "express-document-sdk";

class SelectionManager {
  constructor() {
    this.selectionHistory = [];
    this.handlerId = null;
    this.startListening();
  }
  
  startListening() {
    this.handlerId = editor.context.on(EditorEvent.selectionChange, () => {
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
      editor.context.off(EditorEvent.selectionChange, this.handlerId);
      this.handlerId = null;
    }
  }
}

// Usage
const selectionManager = new SelectionManager();
```

#### TypeScript

```ts
// code.ts
import { editor, Node, EditorEvent } from "express-document-sdk";

class SelectionManager {
  private selectionHistory: Node[][] = [];
  private handlerId: string | null = null;
  
  constructor() {
    this.startListening();
  }
  
  startListening(): void {
    this.handlerId = editor.context.on(EditorEvent.selectionChange, () => {
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
      editor.context.off(EditorEvent.selectionChange, this.handlerId);
      this.handlerId = null;
    }
  }
}

// Usage
const selectionManager = new SelectionManager();
```

## Best Practices & Guidelines

### Event Handler Cleanup

⚠️ **Important**: Always clean up event handlers to prevent memory leaks.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// code.js
import { editor, EditorEvent } from "express-document-sdk";

// Store handler IDs for cleanup
let selectionHandlerId = null;

function setupSelectionHandling() {
  // Register handler and store ID
  selectionHandlerId = editor.context.on(EditorEvent.selectionChange, () => {
    console.log("Selection changed");
    // Handle selection change
  });
  
  console.log("Selection handler registered");
}

function cleanupSelectionHandling() {
  // Unregister the handler
  if (selectionHandlerId) {
    editor.context.off(EditorEvent.selectionChange, selectionHandlerId);
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
// code.ts
import { editor, EditorEvent } from "express-document-sdk";

// Store handler IDs for cleanup
let selectionHandlerId: string | null = null;

function setupSelectionHandling(): void {
  // Register handler and store ID
  selectionHandlerId = editor.context.on(EditorEvent.selectionChange, () => {
    console.log("Selection changed");
    // Handle selection change
  });
  
  console.log("Selection handler registered");
}

function cleanupSelectionHandling(): void {
  // Unregister the handler
  if (selectionHandlerId) {
    editor.context.off(EditorEvent.selectionChange, selectionHandlerId);
    selectionHandlerId = null;
    console.log("Selection handler unregistered");
  }
}

// Setup
setupSelectionHandling();

// Cleanup when add-on is being destroyed or reset
// cleanupSelectionHandling();
```

### Selection System Rules

1. **Artboard constraint**: Only nodes within the current artboard can be selected
2. **Hierarchy filtering**: Cannot select both parent and child nodes simultaneously  
3. **Locked node handling**: Locked nodes are excluded from main selection but available in `selectionIncludingNonEditable`
4. **Automatic filtering**: System automatically filters out invalid selections

### Critical: Selection Handler Restrictions

<InlineAlert slots="header, text1, text2" variant="warning"/>

⚠️ Document Modification Restrictions

**Never modify the document inside selection change handlers!** This can crash the application.

✅ **Safe in selection handlers:**

- Update UI panels
- Log information  
- Analyze selection
- Enable/disable buttons
- Send data to UI panel

❌ **Never do in selection handlers:**

- Create, delete, or modify nodes
- Change document structure  
- Set properties on selected elements

### Performance Guidelines

1. **Keep handlers fast**: Minimize processing time
2. **Essential work only**: Avoid heavy computations
3. **Clean Up**: Always unregister handlers when done (`editor.context.off()`)
4. **Avoid Heavy Work**: Don't do complex calculations in selection callbacks

### Communication Between UI and Document Sandbox

One of the most important real-world patterns is communicating selection changes from the document sandbox to your UI panel, allowing you to update the interface based on what the user has selected.

For detailed information on the communication APIs, see the [Communication API reference](../../../references/document-sandbox/communication/).

#### Complete Communication Example

This example shows how to set up bidirectional communication between your UI panel and document sandbox for selection-based interactions.

## Quick Reference & Common Patterns

Here are some frequently used patterns you can copy and adapt:

### Conditional Actions Based on Selection

```js
// code.js
import { editor, EditorEvent } from "express-document-sdk";

// Enable/disable actions based on selection type
editor.context.on(EditorEvent.selectionChange, () => {
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
// code.js
import { editor, EditorEvent } from "express-document-sdk";

// Update properties panel based on selection
editor.context.on(EditorEvent.selectionChange, () => {
  const selection = editor.context.selection;
  
  if (selection.length === 1) {
    const node = selection[0]; // Common pattern: access first selected element
    
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

### Working with Single Selection

Many add-ons focus on single-element operations. Here's a common pattern used throughout the documentation:

```js
// code.js
import { editor } from "express-document-sdk";

// Safe access to first selected element (used in use_text.md and other guides)
if (editor.context.hasSelection) {
  const selectedNode = editor.context.selection[0];
  
  // Perform operations on the selected node
  if (selectedNode.type === "Text") {
    // Handle text-specific operations
  }
}
```

## FAQs

#### Q: How do I get the current selection?

**A:** Use `editor.context.selection` to get an array of currently selected nodes.

#### Q: How do I listen for selection changes?

**A:** Use `editor.context.on(EditorEvent.selectionChange, callback)` to register a selection change handler.

#### Q: How do I programmatically select elements?

**A:** Set `editor.context.selection = node` for single elements or `editor.context.selection = [node1, node2]` for multiple elements.

#### Q: What's the difference between selection and selectionIncludingNonEditable?

**A:** `selection` only includes editable nodes, while `selectionIncludingNonEditable` also includes locked/non-editable nodes.

#### Q: Can I modify the document in a selection change callback?

**A:** No, avoid making document changes in selection change callbacks as it may destabilize the application.

#### Q: How do I clear the selection?

**A:** Set `editor.context.selection = []` or `editor.context.selection = undefined`.

#### Q: What are the selection rules?

**A:** Nodes must be within the current artboard, ancestors cannot be selected with descendants, and locked nodes are filtered out.

#### Q: How do I unregister selection event handlers?

**A:** Use `editor.context.off(EditorEvent.selectionChange, handlerId)` with the ID returned from the `on()` method.

## Related Topics

- **[Context API Reference](../../../references/document-sandbox/document-apis/classes/Context.md)** - Complete API documentation for the Context class
- **[Communication APIs](../../../references/document-sandbox/communication/)** - Learn how to communicate between document sandbox and UI panel  
- **[Group Elements](./group_elements.md)** - Working with selections to create and manage groups
- **[Position Elements](./position_elements.md)** - Positioning and transforming selected elements
- **[Use Text](./use_text.md)** - Examples of working with text selections using `editor.context.selection[0]`
- **[EditorEvent Enumeration](../../../references/document-sandbox/document-apis/enumerations/EditorEvent.md)** - All available editor events
- **[Node API Reference](../../../references/document-sandbox/document-apis/classes/Node.md)** - Understanding the Node class used in selections
