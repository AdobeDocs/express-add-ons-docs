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
import { editor, constants, colorUtils } from "express-document-sdk";

// Use constants through the constants object
const newRect = editor.createRectangle();
newRect.fill = {
  type: constants.FillType.color,
  color: { red: 0.5, green: 0.5, blue: 0.5, alpha: 1 }
};
```

## Working with Colors and Constants

Document constants work hand-in-hand with the `colorUtils` utility for creating and managing colors. Here's how to combine them effectively:

### Creating Colors with colorUtils

```javascript
import { editor, constants, colorUtils } from "express-document-sdk";

// Create colors using colorUtils
const redColor = colorUtils.fromRGB(1, 0, 0);           // Bright red
const blueColor = colorUtils.fromHex("#0066CC");        // Blue from hex
const greenColor = colorUtils.fromRGB(0, 1, 0, 0.5);   // Semi-transparent green

// Use with fill constants
const rectangle = editor.createRectangle();
rectangle.fill = {
  type: constants.FillType.color,  // Use constant for type safety
  color: redColor                  // Use colorUtils for color creation
};
```

### Color Conversion Methods

```javascript
import { colorUtils } from "express-document-sdk";

// Multiple ways to create the same color
const orange = colorUtils.fromRGB(1, 0.5, 0);                    // RGB values (0-1)
const orange2 = colorUtils.fromRGB({ red: 1, green: 0.5, blue: 0 }); // RGB object
const orange3 = colorUtils.fromHex("#FF8000");                   // Hex string
const orange4 = { red: 1, green: 0.5, blue: 0, alpha: 1 };     // Direct object

// Convert color to hex string
const hexString = colorUtils.toHex(orange); // "#FF8000FF" (includes alpha)
```

### Practical Color + Constants Examples

```javascript
import { editor, constants, colorUtils } from "express-document-sdk";

// Example: Create a styled button-like rectangle
function createStyledButton(text, bgColor, textColor) {
  // Create background rectangle
  const button = editor.createRectangle();
  button.width = 120;
  button.height = 40;
  
  // Apply background color using constants + colorUtils
  button.fill = {
    type: constants.FillType.color,
    color: colorUtils.fromHex(bgColor)
  };
  
  // Add border stroke
  button.stroke = {
    type: constants.StrokeType.color,
    color: colorUtils.fromHex("#CCCCCC"),
    width: 1,
    position: constants.StrokePosition.inside
  };
  
  // Create text element
  const textNode = editor.createText();
  textNode.text = text;
  textNode.textAlignment = constants.TextAlignment.center;
  
  // Apply text color
  const textStyles = {
    fontSize: 14,
    color: colorUtils.fromHex(textColor)
  };
  textNode.setRangeCharacterStyles(0, text.length, textStyles);
  
  return { button, textNode };
}

// Usage
const { button, textNode } = createStyledButton("Click Me", "#007ACC", "#FFFFFF");
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

**A:** Expose them through communication APIs: `runtime.exposeApi({ getBlendModes: () => ({ normal: constants.BlendMode.normal }) })`.

#### Q: What constants should I use for text alignment?

**A:** Use `constants.TextAlignment.left`, `constants.TextAlignment.center`, `constants.TextAlignment.right`, or `constants.TextAlignment.justifyLeft`.

#### Q: How do I create colors for use with constants?

**A:** Use `colorUtils.fromRGB(r, g, b, alpha)` or `colorUtils.fromHex("#RRGGBB")` to create Color objects. Always import: `import { colorUtils } from "express-document-sdk"`.

#### Q: What's the difference between colorUtils and manual color objects?

**A:** `colorUtils` provides validation and conversion methods. Manual objects like `{ red: 1, green: 0, blue: 0, alpha: 1 }` work but lack validation and helper functions.

## Related Documentation

- [Document APIs Reference](../../../references/document-sandbox/document-apis/)
- [Document APIs Constants](../../../references/document-sandbox/document-apis/enumerations/ArrowHeadType.md)
- [ColorUtils Reference](../../../references/document-sandbox/document-apis/classes/ColorUtils.md)
- [Use Color Guide](../how_to/use_color.md) - Comprehensive color workflow examples
- [Add-on UI SDK Constants](./ui-sdk-constants.md)
- [Developer Terminology](./terminology.md)
