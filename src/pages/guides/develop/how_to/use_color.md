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
  - Color
  - Fill Color
  - Stroke Color
  - Text Color
  - HEX Color
  - RGB Color
  - Color Picker
title: Use Color
description: Use Color.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Use Color

## Create colors

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

## Apply colors

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

See the [Use Text](./use_text.md) page for more examples.

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

While the `fill` property is more straightforward to create, the `color` is just one of the possible properties of a `stroke`, as you can read in the [SolidColorStroke](../../../references/document-sandbox/document-apis/interfaces/SolidColorStroke.md) interface reference.

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

## Use the Color Picker

Adobe Express includes a native Color Picker, with special features such as Recommended Swatches, Eyedropper, Themes, Library and Brand colors. The Color Picker is available also to add-ons, you can invoke it using the [`addOnUISdk.app.showColorPicker()`](../../../references/addonsdk/addonsdk-app.md#showcolorpicker) method.

#### Benefits

- It simplifies the process of selecting a color, bypassing the Browser's color picker.
- It's in sync with any swatches or Brand colors defined in Adobe Express.
- It will evolve with Adobe Express, providing a consistent color picking experience across different parts of the application.

The `showColorPicker()` method accepts a reference to an HTML element as its first argument, which will become the color picker's anchor element. The picker will be positioned relative to this element, based on the placement options available in the `ColorPickerPlacement` enum; additionally, the anchor will receive a custom `"colorpicker-color-change"` event when the color changes and a `"colorpicker-close"` event when it is closed.

The `showColorPicker()` method requires an HTML element as its anchor point. Here's how it works:

1. **Anchor Element**

- Pass an HTML element reference as the first argument.
- The color picker will position itself relative to this element.
- Use the `ColorPickerPlacement` enum to control positioning.

2. **Event Handling**

- The anchor element receives two custom events:
  - `"colorpicker-color-change"`: Fires when a new color is selected.
  - `"colorpicker-close"`: Fires when the picker is closed.

### Example: Show the Color Picker

<CodeBlock slots="heading, code" repeat="2" languages="js, html"/>

#### ui/index.js

```js
import addOnUISdk, {
  ColorPickerEvents,
  ColorPickerPlacement,
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  // Get the button element
  const colorPickerButton = document.getElementById("colorPicker");

  // Add a click event listener to the button to show the color picker
  colorPickerButton.addEventListener("click", () => {
    addOnUISdk.app.showColorPicker(colorPickerButton, {
      // The title of the color picker
      title: "Awesome Color Picker",
      // The placement of the color picker
      placement: ColorPickerPlacement.left,
      // Whether the eyedropper hides the color picker
      eyedropperHidesPicker: true,
      // The initial color of the color picker
      initialColor: 0x0000ff,
      // Whether the alpha channel is disabled
      disableAlphaChannel: false,
    });
  });

  // Add a listener for the colorpicker-color-change event
  addOnUISdk.app.on(ColorPickerEvents.ColorChange, (event) => {
    // Get the color from the event
    console.log(event.detail.color);
    // e.g., "#F0EDD8FF" in HEX (RRGGBBAA) format
  });

  // Add a listener for the colorpicker-close event
  colorPickerButton.addEventListener(ColorPickerEvents.close, (event) => {
    console.log(event.type); // "colorpicker-close"
  });
});
```

#### index.html

```html
<button id="colorPicker">Show the Color Picker</button>
```

Please note that the color returned by the `colorpicker-color-change` event is always a string in HEX format—with or without an alpha value, e.g., `#F0EDD8FF` or `#F0EDD8` depending on the `disableAlphaChannel` option.

### Example: Hide the Color Picker

You can decide to hide picker UI e.g., after a certain amount of time.

```js
colorPickerButton.addEventListener("click", () => {
  addOnUISdk.app.showColorPicker(colorPickerButton, {
    /* ... */
  });
  setTimeout(() => {
    console.log("Hiding the Color Picker after 10 seconds");
    addOnUISdk.app.hideColorPicker();
  }, 10000);
});
```

### Example: Use the color

You can use any HTML element as the color picker's anchor element; in the example below, we're using a `<div>` element to display a color swatch.

<CodeBlock slots="heading, code" repeat="2" languages="html, js"/>

#### index.html

```html
<style>
  #color-display {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 4px;
    background-color: white;
  }
</style>
<body>
  <div id="color-display"></div>
</body>
```

#### index.js

```js
addOnUISdk.ready.then(async () => {
  const colorDisplay = document.getElementById("color-display");

  colorDisplay.addEventListener("click", () => {
    addOnUISdk.app.showColorPicker(colorDisplay, {
      title: "Color Picker 1",
      placement: ColorPickerPlacement.left,
      eyedropperHidesPicker: true,
    });
  });

  colorDisplay.addEventListener(ColorPickerEvents.colorChange, (event) => {
    // Update the color swatch display in the UI
    colorDisplay.style.backgroundColor = event.detail.color;
  });
});
```

To use the picked color in the Document Sandbox, you can use the [`colorUtils.fromHex()`](../../../references/document-sandbox/document-apis/classes/ColorUtils.md#fromhex) method, which converts the HEX color string to a [`Color`](../../../references/document-sandbox/document-apis/interfaces/Color.md) object.

```js
// sandbox/code.js
const color = colorUtils.fromHex(event.detail.color); // 👈 A Color object

// Use the color in the Document Sandbox, for example:
let selection = editor.context.selection;
if (selection.length === 1 && selection[0].type === "Text") {
  const textContentModel = selection[0].fullContent;
  textContentModel.applyCharacterStyles({ color }); // 👈 Using the color
}
```
