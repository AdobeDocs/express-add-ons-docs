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

Text is an essential part of any design. Let's explore how to use all the available APIs to create and style it.

## Creating Text

The `editor.createText()` method doesn't accept any parameters and returns a brand new [`TextNode`](../../../references/document-sandbox/document-apis/classes/TextNode.md). The actual textual content starts as empty and is found in its [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property.

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

The text is created with the default styles (Source Sans 3, 100pt, black). Use `\n` or `\r` to add a line break.

## Replacing Text

The text content of a `TextNode` can be replaced by setting the [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property.

### Example

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
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

<InlineAlert slots="header, text" variant="warning"/>

Style Ranges and Text edits

For the moment, replacing the `fullContent.text` will result in applying the style from the first range to the whole text. This behavior is subject to change in future releases.

Please note that `applyCharacterStyles()` is only one way to set styles; you can also use the `characterStyleRanges` property, which supports both getting and setting styles, as described [here](#example-setting-all-styles).

### Example: Setting Styles in a range

Let's change the styles for the first three characters of a TextNode.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];

// Apply character styles to the first three letters
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

### Example: Getting all Styles

To get the complete list of text character styles, you can use the [`fullContent.characterStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) property, which returns an array of [`CharacterStylesRange`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md) elements.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Edit some properties
existingStyles[0].fontSize = 10;

// Reassign the array to apply the style changes
contentModel.characterStyleRanges = existingStyles;
```

### Example: Setting all Styles

You can also use the [`characterStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) property to set individual ranges or them all. It's always best to get the array, modify it, and then reassign it.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Edit some properties: the font size of all styles
existingStyles.forEach((style) => {
  style.fontSize = 50;
});
// Alternatively, you could set the properties for a specific style range
// existingStyles[0].fontSize = 50;

// Reassign the array to apply the style changes
contentModel.characterStyleRanges = existingStyles;
```

## Using Fonts

In the Adobe Express Document API, Fonts are part of the Character Styles; we're treating them separately here for clarity. Similarly to the color and other properties, you can use individual [`CharacterStylesRange`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md) items from the [`CharacterStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) array as Font getters and setters, or use the [`applyCharacterStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles) method to apply a Font style to a specific range.

The only caveat is that you cannot set the font as an Object literal, like, e.g., colors; fonts must be of type [`AvailableFont`](../../../references/document-sandbox/document-apis/classes/AvailableFont.md), and are instantiated from the `fonts` object (imported from the `"express-document-sdk"`) using the asynchronous `fromPostscriptName()` method.

```js
// Always
✅ const font = await fonts.fromPostscriptName("SourceSans3-Bold");

// Won't work
❌ const font = {
  availableForEditing: true,
  isPremium: false,
  family: "Source Sans 3",
  postscriptName: "SourceSans3-Bold",
  style: "Bold",
}
```

You can get PostScript names by setting different text fonts in the Adobe Express UI; then, log and inspec the `font` property of `characterStyleRange`, as seen [here](#example-getting-all-styles).

<InlineAlert slots="text" variant="info"/>

Remember that the `fromPostscriptName()` method is **asynchronous**. The promise resolves to an `AvailableFont` instance only for fonts that the user has permission to use for editing content; otherwise, it will resolve to `undefined`.

### Example: Setting Fonts in a range.

Let's now change the font of the first three characters in a TextNode. Please note that although you're allowed to set the font as the only style, the font object itself must contain all the properties, as the following code snippet demonstrates.

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk"; // 👈 fonts import

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];

// Getting a new font object
const lato = await fonts.fromPostscriptName("Lato-Light");
if (!lato) return; // in case the user isn't entitled to use this font

// ⚠️ Queueing the edit
editor.queueAsyncEdit(() => {
  textNode.fullContent.applyCharacterStyles(
    { font: lato, fontSize: 24 },
    { start: 0, length: 3 }
  );
});
```

<InlineAlert slots="header, text" variant="warning"/>

Asynchronous operations

Queuing the `applyCharacterStyles()` method is necessary because `fromPostscriptName()` is asynchronous. This ensures the edit is properly tracked for saving and undo. You can read more about this in the [queueAsyncEdit()](../../../references/document-sandbox/document-apis/classes/Editor.md#queueasyncedit) reference.

### Example: Getting all Fonts

A font, regardless of whether accessed via `CharacterStylesRange` or executing `fromPostscriptName()`, exposes the following properties:

- `isPremium`: boolean, indicating whether the font is a Premium Adobe font.
- `availableForEditing`: boolean, indicating whether the user has access or licensing permissions to create or edit content with this font.
- `family`: string, the font family name, as you would find in the Text panel's UI.
- `postscriptName`: string, the PostScript name of the font.
- `style`: string, the style of the font (e.g., "Regular", "Bold", "Italic").

You can log `font` and inspect it to find the actual PostScript name.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Log the font of the first style
console.log(existingStyles[0].font);
// {
//   isPremium: false
//   availableForEditing: true
//   family: "Source Sans 3"
//   postscriptName: "SourceSans3-Regular"
//   style: "Regular"
// }
```

### Example: Setting all Fonts

Similarly to what we've seen with [other styles](#example-setting-all-styles), you can set the font in a range by reassigning the `characterStyleRanges` array.

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

const sourceSansBold = await fonts.fromPostscriptName("SourceSans3-Bold");
if (!sourceSansBold) return;

// Get the array of character styles
const existingStyles = contentModel.characterStyleRanges;

// Set the font for all styles
existingStyles.forEach((style) => {
  style.font = sourceSansBold;
});
// Alternatively, you could set the font for a specific style range
// existingStyles[0].font = sourceSansBold;

// Reassign the array to apply the style changes
editor.queueAsyncEdit(() => {
  contentModel.characterStyleRanges = existingStyles;
});
```

<InlineAlert slots="text" variant="warning"/>

Since we're dealing with asynchronous operations, we're queuing the edit to ensure it's properly tracked for saving and undo, as we did for [setting other styles](#example-setting-all-styles)

## Dealing with Text Flow

With the introduction of "Text Flow" in Adobe Express (allowing content to move freely between multiple text frames), the concept of a text node had to be separated from text content.

The `fullContent` property _points to_ a [`TextContentModel`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md) object, which contains the actual text content that multiple `TextNode` instances can share.

### Example

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame that contains
// text spanning to multiple text nodes
const selectedTextNode = editor.context.selection[0];

// Log all the text nodes that share the same TextContentModel
for (const textNode of selectedTextNode.fullContent.allTextNodes) {
  console.log(textNode);
}
```
