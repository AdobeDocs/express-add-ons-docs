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
  - Resize
  - Rescale
  - Proportional
  - Fit Within
  - Cover
  - Dimensions
  - Aspect Ratio
title: Resize and Rescale Elements
description: Resize and Rescale Elements.
contributors:
  - https://github.com/undavide
---

# Resize and Rescale Elements

Adobe Express provides powerful APIs to resize and rescale elements while maintaining different behaviors for aspect ratios and visual styling. Understanding the difference between _resizing_ and _rescaling_ is crucial for achieving the desired visual results.

<InlineAlert slots="header, text1, text2" variant="info"/>

Resize vs. Rescale

**Resizing** adjusts the bounding box of an element while trying to preserve the existing size of visual detailing such as strokes, corners, and fonts.

**Rescaling** visually scales the entire content larger or smaller, which changes the size of visual styling elements such as stroke width, corner detailing, and font size proportionally.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** These APIs are currently **_experimental only_** and should not be used in any add-ons you will be distributing until they have been declared stable. To use them, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

## Rescale Elements Proportionally

Rescaling operations maintain the aspect ratio of elements while changing their overall size. The visual styling elements (strokes, fonts, etc.) scale proportionally with the content.

### Example: Rescale by Width

Use `rescaleProportionalToWidth()` to change an element's width while maintaining its aspect ratio. The height will automatically adjust proportionally.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a rectangle with specific dimensions
const rect = editor.createRectangle();
rect.width = 200;
rect.height = 100;

// Add it to the page
editor.context.insertionParent.children.append(rect);

// Rescale to 300px width - height becomes 150px automatically
rect.rescaleProportionalToWidth(300);

console.log(`New dimensions: ${rect.width} x ${rect.height}`);
// New dimensions: 300 x 150
```

### Example: Rescale by Height

Similarly, use `rescaleProportionalToHeight()` to change an element's height while maintaining its aspect ratio. The width will automatically adjust proportionally.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const ellipse = editor.createEllipse();
ellipse.rx = 100; // radius x = 100 (width = 200)
ellipse.ry = 50; // radius y = 50 (height = 100)

editor.context.insertionParent.children.append(ellipse);

// Rescale to 150px height - width becomes 300px automatically
ellipse.rescaleProportionalToHeight(150);

console.log(
  `New bounds: ${ellipse.boundsLocal.width} x ${ellipse.boundsLocal.height}`
);
// New bounds: 300 x 150
```

### Example: Rescaling with Styled Elements

When rescaling elements with strokes and fills, all visual properties scale proportionally:

```js
// sandbox/code.js
import { editor, colorUtils, constants } from "express-document-sdk";

const rect = editor.createRectangle();
rect.width = 100;
rect.height = 100;

// Apply styling
rect.fill = editor.makeColorFill(colorUtils.fromHex("#3498db"));
const stroke = editor.makeStroke({
  color: colorUtils.fromHex("#2c3e50"),
  width: 5,
  position: constants.StrokePosition.inside,
});
rect.stroke = stroke;

editor.context.insertionParent.children.append(rect);

// Rescale proportionally - stroke width scales from 5px to 10px
rect.rescaleProportionalToWidth(200);
```

## Resize Elements to Fit Constraints

Resizing operations focus on fitting elements within specific dimensional constraints while trying to preserve visual styling elements at their original sizes.

### Example: Resize to Fit Within Bounds

Use `resizeToFitWithin()` to ensure an element fits entirely within specified dimensions. Elements with fixed aspect ratios may leave unused space on one axis.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const rect = editor.createRectangle();
rect.width = 300;
rect.height = 200;

editor.context.insertionParent.children.append(rect);

// Resize to fit within a 150x150 box
// Since the rectangle has a 3:2 aspect ratio, it will be 150x100
rect.resizeToFitWithin(150, 150);

console.log(`Resized dimensions: ${rect.width} x ${rect.height}`);
// Resized dimensions: 150 x 100
```

### Example: Resize to Cover Area

Use `resizeToCover()` to ensure an element completely covers the specified dimensions. Elements with fixed aspect ratios may extend outside the target bounds on one axis.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const ellipse = editor.createEllipse();
ellipse.rx = 75; // radius x = 75 (width = 150)
ellipse.ry = 50; // radius y = 50 (height = 100)

editor.context.insertionParent.children.append(ellipse);

// Resize to cover a 120x120 area
// The ellipse will maintain its 3:2 aspect ratio, so it becomes 180x120
ellipse.resizeToCover(120, 120);

console.log(
  `Covered dimensions: ${ellipse.boundsLocal.width} x ${ellipse.boundsLocal.height}`
);
// Covered dimensions: 180 x 120
```

## Working with Text Elements

Text elements have special considerations when resizing and rescaling, as font sizes and text flow can be affected differently.

### Example: Rescaling Text Proportionally

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const textNode = editor.createText("Hello, World!");

// Center the text
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: textNode.width / 2, y: textNode.height / 2 }
);

insertionParent.children.append(textNode);

// Rescale the text proportionally - font size scales accordingly
textNode.rescaleProportionalToWidth(textNode.width * 1.5);
```

### Example: Resizing Text to Fit

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const textNode = editor.createText(
  "This is a longer text that needs to fit within specific bounds."
);

editor.context.insertionParent.children.append(textNode);

// Resize text to fit within a specific area
// Font size may be preserved while text wrapping adjusts
textNode.resizeToFitWithin(200, 100);
```

## Advanced Usage Patterns

### Example: Maintaining Aspect Ratios

When working with elements that need to maintain specific proportions:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const rect = editor.createRectangle();
rect.width = 160;
rect.height = 90; // 16:9 aspect ratio

editor.context.insertionParent.children.append(rect);

// Both operations maintain the 16:9 aspect ratio
rect.rescaleProportionalToWidth(320); // Results in 320x180
// OR
rect.rescaleProportionalToHeight(180); // Results in 320x180
```

### Example: Combining Operations

You can combine different resize and rescale operations for complex layouts:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const group = editor.createGroup();

// Create multiple elements
const rect1 = editor.createRectangle();
rect1.width = 100;
rect1.height = 100;

const rect2 = editor.createRectangle();
rect2.width = 200;
rect2.height = 50;
rect2.translation = { x: 0, y: 110 };

group.children.append(rect1, rect2);
editor.context.insertionParent.children.append(group);

// First, rescale the entire group proportionally
group.rescaleProportionalToWidth(150);

// Then, resize to fit within specific bounds if needed
group.resizeToFitWithin(200, 200);
```

<InlineAlert slots="header, text" variant="warning"/>

Performance Considerations

These operations can be computationally intensive, especially on complex elements with many children or detailed styling. Consider batching multiple resize/rescale operations together when possible, and avoid calling these methods in tight loops or during frequent UI updates.
