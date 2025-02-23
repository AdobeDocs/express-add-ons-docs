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
title: Using Color
description: Using Color.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Using Color

## Creating colors

Colors in Adobe Express are created as instances of the [`Color`](../../../references/document-sandbox/document-apis/interfaces/Color.md) class: objects with `red`, `green`, `blue`, and `alpha` (optional) values in the range from 0 to 1. The `alpha` value represents the opacity of the color, with 0 being fully transparent and 1 fully opaque.

The entrypoint for creating colors is the [`colorUtils`](../../../references/document-sandbox/document-apis/classes/ColorUtils.md) class, imported from the `"express-document-sdk"`, so we're talking about [Document APIs](../../../references/document-sandbox/document-apis/index.md) here. Especially the static [`fromRgb()`](../../../references/document-sandbox/document-apis/classes/ColorUtils.md#fromrgb) and [`fromHex()`](../../../references/document-sandbox/document-apis/classes/ColorUtils.md#fromhex) methods.

```js
// sandbox/code.js
import { editor, colorUtils } from "express-document-sdk";

// Alpha is optional, defaults to 1
const red = colorUtils.fromRgb(1, 0, 0);
const green = colorUtils.fromHex("#00FF00");

// With alpha
const feldgrau = colorUtils.fromRgb(0.28, 0.32, 0.39, 0.5); // 50% opacity
const heliotrope = colorUtils.fromHex("#C768F780"); // 50% opacity
```

In case you need it, you can also convert a color to a HEX string using the [`toHex()`](../../../references/document-sandbox/document-apis/classes/ColorUtils.md#tohex) method. Please note that the alpha value is always included in the output string.

```js
const red = colorUtils.fromRgb(1, 0, 0);
const redHex = colorUtils.toHex(red); // #FF0000FF
```

## Applying colors

You can directly set the `color` property of a Text node via [`applyCharacterStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles):

### Example: Text color

```js
// sandbox/code.js
import { editor, colorUtils } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];

// Apply character styles to the first three letters
textNode.fullContent.applyCharacterStyles(
  { color: colorUtils.fromHex("#E1A141") }, // 👈
  { start: 0, length: 3 }
);
```

See the [Using Text](./using_text.md) page for more examples.

### Example: Fill and Stroke colors

Colors are not directly applied, instead, to shapes; more generally, they are used to create [`Fill`](../../../references/document-sandbox/document-apis/interfaces/Fill.md) and [`Stroke`](../../../references/document-sandbox/document-apis/interfaces/Stroke.md) objects with the [`editor.makeColorFill()`](../../../references/document-sandbox/document-apis/classes/Editor.md#makecolorfill) and [`editor.makeStroke()`](../../../references/document-sandbox/document-apis/classes/Editor.md#makestroke) methods, respectively, that you can then apply to [`Fillable`](../../../references/document-sandbox/document-apis/classes/FillableNode.md) and [`Strokable`](../../../references/document-sandbox/document-apis/classes/StrokableNode.md) nodes.

If you're confused, worry not! This is the wondrous word of object oriented programming. The following example should clarify things:

```js
// sandbox/code.js
import { editor, colorUtils } from "express-document-sdk";

// Create the shape
const ellipse = editor.createEllipse();
ellipse.width = 100;
ellipse.height = 50;
ellipse.translation = { x: 50, y: 50 };

// Generate the needed colors
const innerColor = colorUtils.fromHex("#A38AF0");
const outerColor = colorUtils.fromHex("#2ACfA9");

// Make the colorFill and the Stroke
const innerColorFill = editor.makeColorFill(innerColor);
const outerColorStroke = editor.makeStroke({
  color: outerColor,
  width: 20,
});

// 👇 Apply the fill and stroke
ellipse.fill = innerColorFill;
ellipse.stroke = outerColorStroke;

// Add the shape to the document
editor.context.insertionParent.children.append(ellipse);
```

While the `fill` property is more straightforward to create, the `color` is just one of the possible properties of a `stroke`, as you can read in the [SolitColorStroke](../../../references/document-sandbox/document-apis/interfaces/SolidColorStroke.md) interface reference.

Simplifying the example above:

```js
// ...
ellipse.fill = editor.makeColorFill(colorUtils.fromHex("#A38AF0"));
ellipse.stroke = editor.makeStroke({
  color: colorUtils.fromHex("#2ACfA9"),
  width: 20,
});
// ...
```

<InlineAlert slots="header, text" variant="info"/>

Naming conventions

Please note that Adobe Express uses the terms **make** and **create** to distinguish between plain objects and live document objects. You `makeColorFill()`, but `createEllipse()`.
