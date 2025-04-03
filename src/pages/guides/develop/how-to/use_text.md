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
  - Text
  - Style Text
  - TextNode
  - Paragraph Styles
  - Character Styles
  - Fonts
  - Text Flow
  - Text Content
  - Text Styles
  - fullContent
  - applyCharacterStyles
  - applyParagraphStyles
  - fromPostscriptName
  - AvailableFont
title: Use Text
description: Use Text.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Use Text

Text is an essential part of any design. Let's explore how to use all the available APIs to create and style it.

## Create Text

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

## Replace Text

The text content of a `TextNode` can be replaced by setting the [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property.

### Example

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const selectedTextNode = editor.context.selection[0];
selectedTextNode.fullContent.text = "Something else";
```

## Apply Character Styles

Text styles can be applied to a `TextNode` using the [`fullContent.applyCharacterStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles) method, which applies one or more styles to the characters in the given range, leaving any style properties that were not specified unchanged.

The styles are defined by the [`CharacterStylesInput`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md) interface; the properties that can be set are:

- color
- font (please see the [Use Fonts](#use-fonts) section)
- fontSize
- letterSpacing
- underline

The range is an object with the `start` and `length` properties.

<InlineAlert slots="header, text" variant="warning"/>

Style Ranges and Text edits

For the moment, replacing the `fullContent.text` will result in applying the style from the first range to the whole text. This behavior is subject to change in future releases.

Please note that `applyCharacterStyles()` is only one way to set styles; you can also use the `characterStyleRanges` property, which supports both getting and setting styles, as described [here](#example-set-all-styles).

### Example: Set Styles in a range

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

### Example: Get all Styles

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

### Example: Set all Styles

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

### Example: Reapply Styles

In the current release, automatic preservation of the Character Style configuration is not available when editing a TextNode’s content via the `fullContent.text`. As a temporary solution, you can save the existing character style ranges before updating the text and reapply them afterward to maintain your custom styles.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Save existing character style ranges
const savedStyles = contentModel.characterStyleRanges;

// Replace the text content
contentModel.text = "Updated text content\nwith preserved styles";

// Reapply the saved character styles
contentModel.characterStyleRanges = savedStyles;
```

<InlineAlert slots="text" variant="warning"/>

If the text content differs too much from the original, the character style ranges might not be reapplied correctly. This is a temporary solution until automatic preservation of character styles is available.

## Use Fonts

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

You can get PostScript names by setting different text fonts in the Adobe Express UI; then, log and inspec the `font` property of `characterStyleRange`, as seen [here](#example-get-all-styles).

<InlineAlert slots="text" variant="info"/>

Remember that the `fromPostscriptName()` method is **asynchronous**. The promise resolves to an `AvailableFont` instance only for fonts that the user has permission to use for editing content; otherwise, it will resolve to `undefined`.

### Example: Set Fonts in a range.

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

### Example: Get all Fonts

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

### Example: Set all Fonts

Similarly to what we've seen with [other styles](#example-set-all-styles), you can set the font in a range by reassigning the `characterStyleRanges` array.

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

Since we're dealing with asynchronous operations, we're queuing the edit to ensure it's properly tracked for saving and undo, as we did for [setting other styles](#example-set-all-styles)

## Apply Paragraph Styles

Paragraph styles can be applied to a TextNode using the [`fullContent.applyParagraphStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applyparagraphstyles) method. This method applies one or more style properties to entire paragraphs within the specified range, while leaving any style properties that are not provided unchanged. In contrast to directly setting the [`paragraphStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges) property—which resets any unspecified properties to their defaults—using `applyParagraphStyles()` lets you update only the desired aspects of the style.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

The available properties are defined by the [`ParagraphStylesInput`](../../../references/document-sandbox/document-apis/interfaces/ParagraphStylesInput.md) interface and include:

- **lineSpacing**: Specifies the spacing between lines (leading), expressed as a multiple of the font’s default spacing (e.g. 1.5 means 150% of normal).
- **spaceBefore**: Sets the space (in points) before a paragraph.
- **spaceAfter**: Sets the space (in points) after a paragraph.
- **list**: Configures list styles (ordered or unordered) for the paragraph. When specifying list styles, you provide the settings via either the [`OrderedListStyleInput`](../../../references/document-sandbox/document-apis/interfaces/OrderedListStyleInput.md) or [`UnorderedListStyleInput`](../../../references/document-sandbox/document-apis/interfaces/UnorderedListStyleInput.md) interface.

Paragraphs are defined by newline characters (`\n`), so the style ranges should align with these boundaries. The method accepts an optional range—an object with `start` and `length` properties—that determines which portion of the text content will be updated. If no range is provided, the styles will be applied to the entire text content flow.

<InlineAlert slots="header, text" variant="warning"/>

Style Ranges and Text Edits

For the moment, replacing the `fullContent.text` will result in applying the style from the first range to the whole text. This behavior is subject to change in future releases.

### Example: Set Styles in a Range

In this example, we modify the styles for a specific paragraph (the first 20 characters) by updating the line spacing and adding an ordered list style.

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];

// Apply paragraph styles to the specified range (e.g., the first paragraph)
textNode.fullContent.applyParagraphStyles(
  {
    lineSpacing: 1.5, // 150% of normal line spacing
    spaceBefore: 12, // 12 points before the paragraph
    spaceAfter: 8, // 8 points after the paragraph
    list: {
      type: constants.ParagraphListType.ordered,
      numbering: constants.OrderedListNumbering.doubleZeroPrefixNumeric,
      prefix: "",
      postfix: ".",
      indentLevel: 2, // Indent level for the list
    },
  },
  {
    start: 0,
    length: 20,
  }
);
```

### Example: Get All Styles

To view the paragraph styles currently applied to a TextNode, you can access the [`fullContent.paragraphStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges) property. This property returns an array of [`ParagraphStylesRange`](../../../references/document-sandbox/document-apis/interfaces/ParagraphStylesRange.md) objects, each representing the style configuration for a contiguous block of text (i.e. a paragraph).

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Retrieve and log the paragraph style ranges
const paragraphStyles = contentModel.paragraphStyleRanges;
console.log("Paragraph Styles: ", paragraphStyles);
```

### Example: Set All Styles

You can also update paragraph styles for the entire text content by modifying the array returned by [`paragraphStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges). In this example, we update the `spaceAfter` property for all paragraphs.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Get the current paragraph style ranges
const existingStyles = contentModel.paragraphStyleRanges;

// Update each range (for instance, set spaceAfter to 10 points)
existingStyles.forEach((range) => {
  range.spaceAfter = 10;
});

// Reassign the modified array to apply the changes
contentModel.paragraphStyleRanges = existingStyles;
```

### Example: Reapply Styles

When you update the text content, paragraph boundaries may change. To preserve your custom paragraph styles, save the current style ranges, modify the text, and then reapply the saved styles.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Save the current paragraph style ranges
const savedParagraphStyles = contentModel.paragraphStyleRanges;

// Replace the text content
contentModel.text = "New text content\nwith updated paragraphs";

// Reapply the saved paragraph styles
contentModel.paragraphStyleRanges = savedParagraphStyles;
```

<InlineAlert slots="text" variant="warning"/>

If the updated text does not match the original paragraph boundaries, some styles may not be reapplied as expected. This is a temporary limitation until automatic preservation of paragraph styles is implemented.

## Deal with Text Flow

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
