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

Document constants are available through the constants export in the document sandbox environment:

```javascript
import { constants } from "express-document-sdk";

// Access constants through the constants object
const fillType = constants.FillType.color;
const blendMode = constants.BlendMode.normal;
const textAlignment = constants.TextAlignment.center;
```

<InlineAlert slots="text" variant="warning"/>

**Important**: Document constants are only available in the document sandbox environment (`code.js`). They cannot be accessed from the iframe UI environment.

## Most Common Use Cases

### Fill and Stroke Properties

```javascript
import { editor, constants } from "express-document-sdk";

// Creating solid color fills
const rectangle = editor.createRectangle();
rectangle.fill = {
  type: constants.FillType.color,
  color: { red: 1, green: 0, blue: 0, alpha: 1 }
};

// Adding strokes
rectangle.stroke = {
  type: constants.StrokeType.color,
  color: { red: 0, green: 0, blue: 1, alpha: 1 },
  width: 2,
  position: constants.StrokePosition.inside
};
```

**Available Fill Types:**

- `FillType.color` - Solid color fills (only available type)

**Available Stroke Types:**

- `StrokeType.color` - Solid color stroke (only available type)

**Available Stroke Positions:**

- `StrokePosition.center` - Stroke centered on edge
- `StrokePosition.inside` - Stroke inside the shape
- `StrokePosition.outside` - Stroke outside the shape

### Text Alignment and Styling

```javascript
import { editor, constants } from "express-document-sdk";

// Creating and styling text
const textNode = editor.createText();
textNode.text = "Hello World";

// Set text alignment
textNode.textAlignment = constants.TextAlignment.center;

// Set text script style
textNode.textScriptStyle = constants.TextScriptStyle.none;
```

**Available Text Alignments:**

- `TextAlignment.left` - Left-aligned text
- `TextAlignment.center` - Center-aligned text
- `TextAlignment.right` - Right-aligned text
- `TextAlignment.justifyLeft` - Left-justified text

**Available Text Script Styles:**

- `TextScriptStyle.none` - Normal text (standard baseline)
- `TextScriptStyle.superscript` - Superscript text
- `TextScriptStyle.subscript` - Subscript text

### Blend Modes

```javascript
import { editor, constants } from "express-document-sdk";

// Apply blend modes to visual elements
const shape = editor.createEllipse();
shape.blendMode = constants.BlendMode.multiply;
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
import { editor, constants } from "express-document-sdk";

// Check node types when traversing the document
editor.context.selection.forEach(node => {
  switch (node.type) {
    case constants.SceneNodeType.rectangle:
      console.log("Selected rectangle");
      break;
    case constants.SceneNodeType.ellipse:
      console.log("Selected ellipse");
      break;
    case constants.SceneNodeType.imageRectangle:
      console.log("Selected image");
      break;
    case constants.SceneNodeType.unknownMediaRectangle:
      console.log("Selected media");
      break;
  }
});
```

**Available Scene Node Types:**

- `SceneNodeType.rectangle` - Rectangle shapes
- `SceneNodeType.ellipse` - Ellipse/circle shapes
- `SceneNodeType.text` - Text elements (not available in current types)
- `SceneNodeType.imageRectangle` - Image elements
- `SceneNodeType.unknownMediaRectangle` - Unknown media elements
- `SceneNodeType.line` - Line elements
- `SceneNodeType.path` - Custom path shapes
- `SceneNodeType.group` - Grouped elements

## Import Patterns

### Document Sandbox Environment

```javascript
// In code.js - import constants from express-document-sdk
import { editor, constants } from "express-document-sdk";

// Use constants through the constants object
const newRect = editor.createRectangle();
newRect.fill = {
  type: constants.FillType.color,
  color: { red: 0.5, green: 0.5, blue: 0.5, alpha: 1 }
};
```

### Communication with UI

```javascript
// In code.js - expose constants to UI if needed
import { constants } from "express-document-sdk";
import addOnSandboxSdk from "add-on-sdk-document-sandbox";

addOnSandboxSdk.instance.runtime.exposeApi({
  getAvailableBlendModes() {
    return {
      normal: constants.BlendMode.normal,
      multiply: constants.BlendMode.multiply,
      screen: constants.BlendMode.screen,
      overlay: constants.BlendMode.overlay
    };
  }
});
```

## Common Patterns

### Creating Styled Shapes

```javascript
import { editor, constants } from "express-document-sdk";

function createStyledRectangle(color, strokeColor) {
  const rect = editor.createRectangle();
  
  // Set fill
  rect.fill = {
    type: constants.FillType.color,
    color: color
  };
  
  // Set stroke
  rect.stroke = {
    type: constants.StrokeType.color,
    color: strokeColor,
    width: 2,
    position: constants.StrokePosition.inside
  };
  
  // Set blend mode
  rect.blendMode = constants.BlendMode.normal;
  
  return rect;
}
```

### Text Formatting

```javascript
import { editor, constants } from "express-document-sdk";

function createFormattedText(content, alignment = constants.TextAlignment.left) {
  const textNode = editor.createText();
  textNode.text = content;
  textNode.textAlignment = alignment;
  
  // Apply character styling
  const characterStyles = {
    fontSize: 24,
    fontFamily: "Arial",
    textScriptStyle: constants.TextScriptStyle.none
  };
  
  textNode.setRangeCharacterStyles(0, content.length, characterStyles);
  
  return textNode;
}
```

### Node Type Checking

```javascript
import { editor, constants } from "express-document-sdk";

function processSelectedNodes() {
  const selection = editor.context.selection;
  
  selection.forEach(node => {
    // Type-safe node processing
    if (node.type === constants.SceneNodeType.rectangle || node.type === constants.SceneNodeType.ellipse) {
      // Handle shapes
      if (node.fill?.type === constants.FillType.color) {
        console.log("Shape has color fill");
      }
    } else if (node.type === constants.SceneNodeType.imageRectangle) {
      // Handle images
      console.log("Processing image node");
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
import { constants } from "express-document-sdk";
const fillType = constants.FillType.color; // Works correctly
```

### Missing Type Checks

```javascript
import { constants } from "express-document-sdk";

// ❌ Risky - assuming node type
function changeColor(node, color) {
  node.fill = { type: constants.FillType.color, color }; // May fail on non-fillable nodes
}

// ✅ Safe - check node type first
function changeColor(node, color) {
  if (node.type === constants.SceneNodeType.rectangle || node.type === constants.SceneNodeType.ellipse) {
    node.fill = { type: constants.FillType.color, color };
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
