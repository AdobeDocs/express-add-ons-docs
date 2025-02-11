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
title: Using Text
description: Using Text.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Using Text

Text is a remarkably important part of any design. Let's explore how to use all the available APIs to create and style it.

## Creating Text

The `editor.createText()` method doesn't accept any parameters, and returns a brand new [`TextNode`](../../../references/document-sandbox/document-apis/classes/TextNode.md). The actual text content starts as empty, and is found in its [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property.

### Example

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText();

// Set the text content
textNode.fullContent.text = "Hello,\nWorld!";

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Get the text content
console.log("Text: ", textNode.fullContent.text);
```

The text is created with the default styles (Source Sans 3, 100pt, black). Use `\n` or `\r` If you want to add a line break.

## Replacing Text

The text content of a `TextNode` can be replaced by setting the [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property.

### Example

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame
const selectedTextNode = editor.context.selection[0];
selectedTextNode.fullContent.text = "Something else";
```

## Applying Character Styles

Text styles can be applied to a `TextNode` using the [`fullContent.applyCharacterStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles) method, which applies one or more styles to the characters in the given range, leaving any style properties that were not specified unchanged.

The styles are defined by the [`CharacterStylesInput`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md) interface; the properties that can be set are:

- color
- font (please see the [Using Fonts](#using-fonts) section)
- fontSize
- letterSpacing
- underline

The range is an object with the `start` and `length` properties.

<InlineAlert slots="text" variant="info"/>

`applyCharacterStyles()` is only one way to set styles; you can also use the `characterStyleRanges` property, which supports both getting and setting styles, as described [here](#example-setting-all-styles).

### Example: Setting styles in a range

Let's change the character styles for the first 3 letters of a TextNode.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame
const textNode = editor.context.selection[0];

// Apply character styles to the first 3 letters
textNode.fullContent.applyCharacterStyles(
  {
    color: { red: 0, green: 0.4, blue: 0.8, alpha: 1 },
    fontSize: 240,
    letterSpacing: 10,
    underline: true,
  },
  {
    start: 0,
    length: 3,
  }
);
```

The `applyCharacterStyles()` method is not the only one that allows you to set styles; you can also use the `characterStyleRanges` property, which supports both getting and setting styles.

### Example: Getting all styles

To get the full list of text character styles, you can use the [`fullContent.characterStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) property, which returns an array of [`CharacterStylesRange`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md) elements.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Edit some properties
existingStyles[0].fontSize = 10;

// Reassign the array to apply the style changes
contentModel.characterStyleRanges = existingStyles;
```

### Example: Setting all styles

You can also use the [`characterStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) property to set ranges; don't create a new array from scratch; get first, and then modify the existing one.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Edit some properties: the font size of the first style
existingStyles[0].fontSize = 50;

// Reassign the array to apply the style changes
contentModel.characterStyleRanges = existingStyles;
```

## Using Fonts (TODO)

In the Adobe Express Document API, Fonts are part of the Character Styles; we're treating them separately here for clarity. Similarly to the color and other properties, you can use individual [`CharacterStylesRange`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md) items from the [`fullContent.CharacterStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) array as Font getters and setters, or use the [`fullContent.applyCharacterStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles) method to apply a Font style to a specific range.

### Example: Setting Fonts in a range (DOESN'T WORK)

Let's change the font for the first 3 letters of a TextNode. Please note that, although you're allowed to set the font as the only style, the font object itself must contain all the properties, as the following code snippet demonstrates.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame
const textNode = editor.context.selection[0];

// Apply character styles to the first 3 letters
textNode.fullContent.applyCharacterStyles(
  {
    font: {
      availableForEditing: true,
      isPremium: false,
      family: "Source Sans 3",
      postscriptName: "SourceSans3-Regular",
      style: "Bold",
    },
  },
  {
    start: 0,
    length: 3,
  }
);
```

### Example: Getting all Fonts

The aforementioned `CharacterStylesRange` exposes a `font` property, which is an object with the following properties:

- `isPremium`: boolean, indicating whether the font is a Premium Adobe font.
- `availableForEditing`: boolean, indicating whether the user has access or licensing permissions to create or edit content with this font.
- `family`: string, the font family name, as you would read it in the Text panel's UI.
- `postscriptName`: string, the PostScript name of the font.
- `style`: string, the style of the font (e.g., "Regular", "Bold", "Italic").

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Get the font of the first style
const font = existingStyles[0].font;
console.log(font);
// isPremium: false
// availableForEditing: true
// family: "Source Sans 3"
// postscriptName: "SourceSans3-Regular"
// style: "Regular"
```

## Dealing with Text Flow

With the introduction of "Text Flow" in Adobe Express (allowing content to move freely between multiple text frames), the concept of a text node had to be separated from text content.

The `fullContent` property _points to_ a [`TextContentModel`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md) object, which contains the actual text content that can be shared by multiple `TextNode` instances.

### Example

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming that the user has selected a text frame that contains
// text spanning to multiple text nodes
const selectedTextNode = editor.context.selection[0];

// Log all the text nodes that share the same TextContentModel
for (const textNode of selectedTextNode.fullContent.allTextNodes) {
  console.log(textNode);
}
```
