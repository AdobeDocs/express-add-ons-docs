---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Document Sandbox
  - Document APIs
  - Constants
  - Type safety
  - JavaScript
  - TypeScript
  - Document constants
  - Fill types
  - Stroke types
  - Text alignment
  - Blend modes
  - Scene node types
  - Content creation
  - Document manipulation
title: Using Document Sandbox Constants
description: A comprehensive guide to using constants in the Document Sandbox environment for 
  type-safe document manipulation, covering fill types, text styling, blend modes, and node types.
contributors:
  - https://github.com/hollyschinsky
# LLM optimization metadata
canonical: true
ai_assistant_note: "This guide focuses specifically on Document Sandbox constants used in the 
  document sandbox environment (code.js). For UI SDK constants, refer to the Add-on UI SDK Constants guide. 
  Covers document-specific constants like FillType, StrokeType, TextAlignment, BlendMode, and SceneNodeType."
semantic_tags:
  - document-sandbox-constants
  - document-environment
  - content-creation
  - document-manipulation
  - type-safety
  - practical-guide
---

# Using Document Sandbox Constants

Document Sandbox constants provide type-safe ways to interact with the Document APIs when creating and manipulating content in Adobe Express documents. This guide covers the most common patterns for document-side development.

## Why Use Document Constants?

Document constants ensure consistency when working with document elements, styling, and content creation. They provide type safety, IDE autocomplete, and prevent errors from typos in string values.

<InlineAlert slots="text" variant="info"/>

For complete technical specifications of all document constants, see the [Document APIs Constants Reference](../../../references/document-sandbox/document-apis/enumerations/ArrowHeadType.md).

## Quick Start

Document constants are available directly in the document sandbox environment without imports:

```javascript
// Document constants are globally available in sandbox
const fillType = FillType.color;
const blendMode = BlendMode.normal;
const textAlignment = TextAlignment.center;
```

<InlineAlert slots="text" variant="warning"/>

**Important**: Document constants are only available in the document sandbox environment (`code.js`). They cannot be accessed from the iframe UI environment.

## Most Common Use Cases

### Fill and Stroke Properties

```javascript
// Creating solid color fills
const rectangle = editor.createRectangle();
rectangle.fill = {
  type: FillType.color,
  color: { red: 1, green: 0, blue: 0, alpha: 1 }
};

// Adding strokes
rectangle.stroke = {
  type: StrokeType.solid,
  color: { red: 0, green: 0, blue: 1, alpha: 1 },
  width: 2,
  position: StrokePosition.inside
};
```

**Available Fill Types:**

- `FillType.color` - Solid color fills
- `FillType.none` - No fill

**Available Stroke Types:**

- `StrokeType.solid` - Solid color stroke
- `StrokeType.none` - No stroke

**Available Stroke Positions:**

- `StrokePosition.center` - Stroke centered on edge
- `StrokePosition.inside` - Stroke inside the shape
- `StrokePosition.outside` - Stroke outside the shape

### Text Alignment and Styling

```javascript
// Creating and styling text
const textNode = editor.createText();
textNode.text = "Hello World";

// Set text alignment
textNode.textAlignment = TextAlignment.center;

// Set text script style
textNode.textScriptStyle = TextScriptStyle.normal;
```

**Available Text Alignments:**

- `TextAlignment.left` - Left-aligned text
- `TextAlignment.center` - Center-aligned text
- `TextAlignment.right` - Right-aligned text
- `TextAlignment.justify` - Justified text

**Available Text Script Styles:**

- `TextScriptStyle.normal` - Normal text
- `TextScriptStyle.superscript` - Superscript text
- `TextScriptStyle.subscript` - Subscript text

### Blend Modes

```javascript
// Apply blend modes to visual elements
const shape = editor.createEllipse();
shape.blendMode = BlendMode.multiply;
```

**Common Blend Modes:**

- `BlendMode.normal` - Normal blending
- `BlendMode.multiply` - Multiply blending
- `BlendMode.screen` - Screen blending
- `BlendMode.overlay` - Overlay blending
- `BlendMode.softLight` - Soft light blending
- `BlendMode.hardLight` - Hard light blending

### Scene Node Types

```javascript
// Check node types when traversing the document
editor.context.selection.forEach(node => {
  switch (node.type) {
    case SceneNodeType.rectangle:
      console.log("Selected rectangle");
      break;
    case SceneNodeType.ellipse:
      console.log("Selected ellipse");
      break;
    case SceneNodeType.text:
      console.log("Selected text");
      break;
    case SceneNodeType.mediaRectangle:
      console.log("Selected image/video");
      break;
  }
});
```

**Available Scene Node Types:**

- `SceneNodeType.rectangle` - Rectangle shapes
- `SceneNodeType.ellipse` - Ellipse/circle shapes
- `SceneNodeType.text` - Text elements
- `SceneNodeType.mediaRectangle` - Images and videos
- `SceneNodeType.line` - Line elements
- `SceneNodeType.path` - Custom path shapes
- `SceneNodeType.group` - Grouped elements

## Import Patterns

### Document Sandbox Environment

```javascript
// In code.js - constants are globally available
const editor = addOnSandboxSdk.editor;

// Use constants directly (no imports needed)
const newRect = editor.createRectangle();
newRect.fill = {
  type: FillType.color,
  color: { red: 0.5, green: 0.5, blue: 0.5, alpha: 1 }
};
```

### Communication with UI

```javascript
// In code.js - expose constants to UI if needed
addOnSandboxSdk.instance.runtime.exposeApi({
  getAvailableBlendModes() {
    return {
      normal: BlendMode.normal,
      multiply: BlendMode.multiply,
      screen: BlendMode.screen,
      overlay: BlendMode.overlay
    };
  }
});
```

## Common Patterns

### Creating Styled Shapes

```javascript
function createStyledRectangle(color, strokeColor) {
  const rect = editor.createRectangle();
  
  // Set fill
  rect.fill = {
    type: FillType.color,
    color: color
  };
  
  // Set stroke
  rect.stroke = {
    type: StrokeType.solid,
    color: strokeColor,
    width: 2,
    position: StrokePosition.inside
  };
  
  // Set blend mode
  rect.blendMode = BlendMode.normal;
  
  return rect;
}
```

### Text Formatting

```javascript
function createFormattedText(content, alignment = TextAlignment.left) {
  const textNode = editor.createText();
  textNode.text = content;
  textNode.textAlignment = alignment;
  
  // Apply character styling
  const characterStyles = {
    fontSize: 24,
    fontFamily: "Arial",
    textScriptStyle: TextScriptStyle.normal
  };
  
  textNode.setRangeCharacterStyles(0, content.length, characterStyles);
  
  return textNode;
}
```

### Node Type Checking

```javascript
function processSelectedNodes() {
  const selection = editor.context.selection;
  
  selection.forEach(node => {
    // Type-safe node processing
    if (node.type === SceneNodeType.rectangle || node.type === SceneNodeType.ellipse) {
      // Handle shapes
      if (node.fill?.type === FillType.color) {
        console.log("Shape has color fill");
      }
    } else if (node.type === SceneNodeType.text) {
      // Handle text
      console.log(`Text alignment: ${node.textAlignment}`);
    }
  });
}
```

## Common Pitfalls

### Environment Confusion

```javascript
// ❌ Wrong - Document constants not available in UI
// In index.html/index.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
const fillType = FillType.color; // Error: FillType is not defined

// ✅ Correct - Use in document sandbox only
// In code.js
const fillType = FillType.color; // Works correctly
```

### Missing Type Checks

```javascript
// ❌ Risky - assuming node type
function changeColor(node, color) {
  node.fill = { type: FillType.color, color }; // May fail on text nodes
}

// ✅ Safe - check node type first
function changeColor(node, color) {
  if (node.type === SceneNodeType.rectangle || node.type === SceneNodeType.ellipse) {
    node.fill = { type: FillType.color, color };
  }
}
```

## Best Practices

1. **Always use constants** instead of string literals for better type safety
2. **Check node types** before applying properties that may not be available
3. **Use meaningful variable names** when working with complex styling
4. **Group related constants** for better code organization
5. **Document your styling functions** with the constants they expect

## Related Documentation

- [Document APIs Reference](../../../references/document-sandbox/document-apis/)
- [Document APIs Constants](../../../references/document-sandbox/document-apis/enumerations/ArrowHeadType.md)
- [Add-on UI SDK Constants](./ui-sdk-constants.md)
- [Developer Terminology](./terminology.md)
