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
faq:
  questions:
    - question: "Why can't I access document constants from the UI?"
      answer: "Document constants are only available in the Document Sandbox (code.js) for security isolation. UI and Document environments are separate - use communication APIs to pass data between them."

    - question: "How do I import document constants?"
      answer: "Use import { constants } from express-document-sdk in your code.js file. Access them as constants.FillType.color, constants.BlendMode.normal, etc."

    - question: "What's the difference between UI SDK constants and Document Sandbox constants?"
      answer: "UI SDK constants are for iframe operations (dialogs, exports, events). Document constants are for content creation (fills, strokes, text alignment, node types)."

    - question: "Can I use FillType.gradient or other fill types?"
      answer: "Currently, only FillType.color is available. Adobe Express may add more fill types in future releases."

    - question: "How do I check if a node supports fills or strokes?"
      answer: "Check the node type first using constants.SceneNodeType before applying fill or stroke properties."

    - question: "Why does my blend mode not work?"
      answer: "Ensure you're applying blend modes to visual nodes and using valid constants like constants.BlendMode.multiply. Not all nodes support all blend modes."

    - question: "How do I pass constants from Document Sandbox to UI?"
      answer: "Document constants are sandbox-only. If you need constant values in the UI, pass the actual string values through communication APIs rather than the constants themselves."

    - question: "What constants should I use for text alignment?"
      answer: "Use constants.TextAlignment.left, constants.TextAlignment.center, constants.TextAlignment.right, or constants.TextAlignment.justifyLeft."

    - question: "How do I create colors for use with constants?"
      answer: "Use colorUtils.fromRGB or colorUtils.fromHex to create Color objects. Import with: import { colorUtils } from express-document-sdk."
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

Document Sandbox constants provide type-safe ways to interact with the Document APIs for content creation like fills, strokes, text styling, and node manipulation. This guide covers the most common patterns for document sandbox development.

## Why Use Constants?

Constants equal their variable name as a string (e.g., `FillType.color` equals `"color"`), but using constants provides type safety, IDE autocomplete, and future-proofing against API changes. They ensure consistency when working with document elements, styling, and content creation.

<InlineAlert slots="header, text" variant="info"/>

Add-on UI vs. Document Sandbox constants

Separate sets of constants are available in both the [Add-on UI](ui-sdk-constants.md) and the Document Sandbox environments. For the complete technical specification on the constants covered in this guide, see the [Document APIs Constants Reference](../../../references/document-sandbox/document-apis/enumerations/ArrowHeadType.md)

## Quick Start

Document constants are available through the constants export in the document sandbox environment:

```javascript
import { constants } from "express-document-sdk";

// Access constants through the constants object
const fillType = constants.FillType.color;
const blendMode = constants.BlendMode.normal;
const textAlignment = constants.TextAlignment.center;
```

<InlineAlert slots="header, text1" variant="warning"/>

**Important**

Document constants are only available in the document sandbox environment (`code.js`). They cannot be accessed from the iframe UI environment.

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

**Common Scene Node Types:**

- `SceneNodeType.rectangle` - Rectangle shapes
- `SceneNodeType.ellipse` - Ellipse/circle shapes
- `SceneNodeType.text` - Text elements
- `SceneNodeType.line` - Line elements
- `SceneNodeType.path` - Custom path shapes
- `SceneNodeType.group` - Grouped elements
- `SceneNodeType.imageRectangle` - Image elements
- `SceneNodeType.unknownMediaRectangle` - Unknown media elements

<InlineAlert slots="text" variant="info"/>

Additional node types like `artboard`, `complexShape`, `gridLayout`, and others are available. See the [SceneNodeType Reference](../../../references/document-sandbox/document-apis/enumerations/SceneNodeType.md) for the complete list.

## Working with Colors

When working with fill and stroke properties, you'll need to provide Color objects. Use the `colorUtils` utility from `express-document-sdk` to create colors:

```javascript
import { editor, constants, colorUtils } from "express-document-sdk";

// Create colors and use with constants
const rectangle = editor.createRectangle();
rectangle.fill = {
  type: constants.FillType.color,           // Constant for type safety
  color: colorUtils.fromHex("#FF0000")      // Color from hex string
};

rectangle.stroke = {
  type: constants.StrokeType.color,
  color: colorUtils.fromRGB(0, 0, 1),       // Color from RGB values
  width: 2,
  position: constants.StrokePosition.inside
};
```

<InlineAlert slots="text" variant="info"/>

For comprehensive color creation, conversion, and application examples, see the [Use Color Guide](../how_to/use_color.md).

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
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
const fillType = addOnUISdk.constants.FillType.color; // Error: FillType is not defined

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

## FAQs

#### Q: Why can't I access document constants from the UI?

**A:** Document constants are only available in the Document Sandbox (`code.js`) for security isolation. UI and Document environments are separate - use communication APIs to pass data between them.

#### Q: How do I import document constants?

**A:** Use `import { constants } from "express-document-sdk"` in your `code.js` file. Access them as `constants.FillType.color`, `constants.BlendMode.normal`, etc.

#### Q: What's the difference between UI SDK constants and Document Sandbox constants?

**A:** UI SDK constants are for iframe operations (dialogs, exports, events). Document constants are for content creation (fills, strokes, text alignment, node types).

#### Q: Can I use `FillType.gradient` or other fill types?

**A:** Currently, only `FillType.color` is available. Adobe Express may add more fill types in future releases.

#### Q: How do I check if a node supports fills or strokes?

**A:** Check the node type first: `if (node.type === constants.SceneNodeType.rectangle || node.type === constants.SceneNodeType.ellipse)` before applying fill/stroke properties.

#### Q: Why does my blend mode not work?

**A:** Ensure you're applying blend modes to visual nodes and using valid constants like `constants.BlendMode.multiply`. Not all nodes support all blend modes.

#### Q: How do I pass constants from Document Sandbox to UI?

**A:** Document constants are sandbox-only. If you need constant values in the UI, pass the actual string values through communication APIs rather than the constants themselves.

#### Q: What constants should I use for text alignment?

**A:** Use `constants.TextAlignment.left`, `constants.TextAlignment.center`, `constants.TextAlignment.right`, or `constants.TextAlignment.justifyLeft`.

#### Q: How do I create colors for use with constants?

**A:** Use `colorUtils.fromRGB(r, g, b, alpha)` or `colorUtils.fromHex("#RRGGBB")` to create Color objects. Import with: `import { colorUtils } from "express-document-sdk"`. See the [Use Color Guide](../how_to/use_color.md) for complete examples.

## Related Documentation

- [Document APIs Reference](../../../references/document-sandbox/document-apis/)
- [Document APIs Constants](../../../references/document-sandbox/document-apis/enumerations/ArrowHeadType.md)
- [ColorUtils Reference](../../../references/document-sandbox/document-apis/classes/ColorUtils.md)
- [Use Color Guide](../how_to/use_color.md) - Comprehensive color workflow examples
- [Add-on UI SDK Constants](./ui-sdk-constants.md)
- [Developer Terminology](./terminology.md)
