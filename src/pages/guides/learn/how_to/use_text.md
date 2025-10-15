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
  - Hyperlink
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
faq:
  questions:
    - question: "How do I create text in a document?"
      answer: 'Call `editor.createText("...")` to get a new standalone `TextNode`.'

    - question: "Where is the actual string stored?"
      answer: "In `textNode.fullContent.text`."
  
    - question: "How can I edit existing text content?"
      answer: "Use `replaceText()` for range replacement, `insertText()` for insertion at position, `appendText()` for adding to end, and `deleteText()` for range deletion."

    - question: "What method applies character-level formatting?"
      answer: "`fullContent.applyCharacterStyles(styles, range)`."

    - question: "How do I read or batch-edit character styles?"
      answer: "Use the `characterStyleRanges` array to get or set ranges."

    - question: "How do I change a font programmatically?"
      answer: 'Await `fonts.fromPostscriptName("PSName")` and pass the font to `applyCharacterStyles`.'

    - question: "Why must font edits be queued?"
      answer: "Because `fromPostscriptName()` is async; wrap the style edit in `editor.queueAsyncEdit()`."

    - question: "How do I apply paragraph-level formatting?"
      answer: 'Use `fullContent.applyParagraphStyles(styles, range)`.'

    - question: "Where can I inspect paragraph formats?"
      answer: "Read or modify `fullContent.paragraphStyleRanges`."

    - question: "What happens to styles after replacing text?"
      answer: "They reset; save style ranges first and reassign them afterward to preserve formatting. This is a temporary limitation until automatic preservation of paragraph styles is implemented."

    - question: "Can I create a threaded text frame with createText()?"
      answer: "No, it only returns `StandaloneTextNode`; threaded nodes aren't creatable yet."

    - question: "How do I find all frames sharing the same story?"
      answer: "Iterate over `textNode.fullContent.allTextNodes`."

    - question: "How do I add or remove hyperlinks from text?"
      answer: "Use `applyCharacterStyles()` with a `link` property. Set to a URL string to add a hyperlink, or to an empty string to remove it."

    - question: "How do I handle premium fonts and font availability?"
      answer: "Check `font.isPremium` and `font.availableForEditing` properties. Use `hasUnavailableFonts()` to detect issues. Premium fonts require user subscription; unavailable fonts prevent text modification until replaced with available fonts."

    - question: "What's the difference between `replaceText()` and setting `fullContent.text`?"
      answer: "`replaceText()` preserves existing styles and allows you to control styling of the replacement text, while setting `fullContent.text` (not recommended) resets all style ranges to default."

    - question: "How do I insert text while preserving existing styles?"
      answer: "Use `insertText()` with a `TextStyleSource` constant like `constants.TextStyleSource.beforeInsertionPoint` to inherit styles from surrounding text."

    - question: "What happens if I try to modify text with unavailable fonts?"
      answer: "The operation may throw an error. Use `hasUnavailableFonts()` to check first, and consider changing fonts to available ones before modifying text."

    - question: "Can I specify custom styles when using text replacement APIs?"
      answer: "Yes, all text replacement methods (`replaceText()`, `insertText()`) accept an optional style parameter where you can provide `CharacterStylesInput` or use `TextStyleSource` constants."
---

# Use Text

Text is an essential part of any design. Let's explore how to use all the available APIs to create and style it.

## Create Text

The `editor.createText()` method accepts a string as a parameter, and returns a brand new [`StandaloneTextNode`](../../../references/document-sandbox/document-apis/classes/StandaloneTextNode.md). The actual textual content is found in its [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property.

### Example: Create basic Text

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("Hello,\nWorld!");

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

<InlineAlert slots="header, text1, text2, text3" variant="info"/>

Text Classes

Adobe Express supports two types of text nodes, both extending the Abstract [`TextNode`](../../../references/document-sandbox/document-apis/classes/TextNode.md) class:

- [`StandaloneTextNode`](../../../references/document-sandbox/document-apis/classes/StandaloneTextNode.md): A self-contained text node.
- [`ThreadedTextNode`](../../../references/document-sandbox/document-apis/classes/ThreadedTextNode.md): A text node that is part of a text flow, whose content may span multiple frames.

The `editor.createText()` method returns a `StandaloneTextNode` by default; for the time being, it's not possible to create a `ThreadedTextNode` using this method.

## Replace Text APIs

To replace the text content of a `TextNode`, you can use the [Text Replacement APIs](../../../references/document-sandbox/document-apis/classes/TextNodeContentModel.md#replaceText): `replaceText()`, `appendText()`, `insertText()`, and `deleteText()`. These methods provide fine-grained control over text manipulation while preserving or controlling the styling of the modified text.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** These text replacement APIs are currently **_experimental only_** and should not be used in any add-ons you will be distributing until they have been declared stable. To use them, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

### Examples: Replace

The `replaceText()` method replaces a specific range of text with new content. You can optionally specify the styling for the replacement text. It accepts a `newText` string, a [`replaceRange`](../../../references/document-sandbox/document-apis/interfaces/TextRange.md), and an optional `style` parameter.

<InlineAlert slots="text" variant="warning"/>

Although possible, it's not recommended to replace the text content of a `TextNode` by setting the [`fullContent.text`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text) property, as it applies the style from the first range to the whole text. Use the Text Replacement APIs instead to preserve styling.

#### Example: Basic Text Replacement

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("1234567890");
const contentModel = textNode.fullContent;

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Replace characters 5-10 with new text
contentModel.replaceText(
  "abcde",
  { start: 2, length: 5 } // Replace 5 characters starting at index 2
);

// Original text: 1234567890
// Indices      : 0123456789
// Range        :   ^^^^^
// Replaced text: 01abcde890
```

This API will delete the specified amount of characters in the `length` property of the `replaceRange` parameter, then insert the new text—**regardless of the length of the new text**.

```javascript
const textNode = editor.createText("1234567890");
const contentModel = textNode.fullContent;
// ...
contentModel.replaceText(
  "This is a string longer than five characters",
  { start: 2, length: 5 } // Replace 5 characters starting at index 2
);

// Original text: 1234567890
// Indices      : 0123456789
// Range        :   ^^^^^
// Replaced text: 01This is a string longer than five characters890
```

#### Example: Replace Text with Custom Styling

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("1234567890");
const contentModel = textNode.fullContent;

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Replace text with custom character styles
contentModel.replaceText(
  "DDD",
  { start: 0, length: 7 }, // Replace first 7 characters
  {
    color: { red: 1, green: 0, blue: 0, alpha: 1 }, // Red color
  }
);

// Original text: 1234567890
// Indices      : 0123456789
// Range        : ^^^^^^^
// Replaced text: DDD890
```

#### Example: Replace Text Using Style Sources

You can use the `TextStyleSource` constants to inherit the style of the first replaced character (default option, when not provided), the style before the insertion point, or the style after the insertion point.

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Assuming the user has selected a text frame with multiple style ranges
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Replace text using the style of the first replaced character (default)
contentModel.replaceText(
  "replacement",
  { start: 10, length: 8 },
  constants.TextStyleSource.firstReplacedCharacter
);

// Replace text using the style before the insertion point
contentModel.replaceText(
  "before style",
  { start: 20, length: 6 },
  constants.TextStyleSource.beforeInsertionPoint
);

// Replace text using the style after the insertion point
contentModel.replaceText(
  "after style",
  { start: 30, length: 5 },
  constants.TextStyleSource.afterInsertionPoint
);
```

### Examples: Insert

The `insertText()` method inserts new text at a specific position within the existing content. It accepts a `newText` string, an `index` number, and an optional `style` parameter. Think about it as a Replace API (able to insert text at a specific position) but without any deletion.

#### Example: Basic Text Insertion

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("Adobe add-ons");
const contentModel = textNode.fullContent;

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Insert text at position 10
contentModel.insertText(
  "Express ",
  6,
  {
    color: { red: 0.3, green: 0.3, blue: 0.9, alpha: 1 } // Accent color
  }
);

// Original text  : Adobe add-ons
// Indices        : 0123456789
// Insertion point:       ^
// Resulting text : Adobe Express add-ons
```

#### Example: Insert Text with Custom Styling

Custom styling is optional, and follows the same rules as the Replace API.

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("Adobe add-ons");
const contentModel = textNode.fullContent;

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Insert text at position 10
contentModel.insertText(
  "Express ",
  6,
  {
    color: { red: 0.3, green: 0.3, blue: 0.9, alpha: 1 } // Accent color
  }
);

// Or, you can use the style sources to inherit the style of the surrounding text
contentModel.insertText(
  "Express ",
  6,
  constants.TextStyleSource.beforeInsertionPoint
  // constants.TextStyleSource.afterInsertionPoint
  // constants.TextStyleSource.firstReplacedCharacter
);
```

### Examples: Append

The `appendText()` method adds new text to the end of the existing content. It accepts just one parameter, a `newText` string.

#### Example: Append Text

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("Adobe");
const contentModel = textNode.fullContent;

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Append text to the end
contentModel.appendText("\nExpress");

// You can append multiple times!
contentModel.appendText("\nDeveloper");

// Adobe
// Express
// Developer
```

### Examples: Delete

The `deleteText()` method removes a specific range of text from the content. It accepts a [`deleteRange`](../../../references/document-sandbox/document-apis/interfaces/TextRange.md) parameter.

#### Example: Delete Text Range

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Create a new TextNode
const textNode = editor.createText("It's Friday, don't deploy to Production!");
const contentModel = textNode.fullContent;

// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the document
insertionParent.children.append(textNode);

// Delete 13 characters starting at position 6
contentModel.deleteText({ start: 13, length: 6 });

// It's Friday, don't deploy to Production!
// 01234567890123
//              ^^^^^^
// It's Friday, deploy to Production!

// You can delete multiple ranges calling the method as many times as needed

contentModel.deleteText({ start: 12, length: 22 });

// It's Friday!
```

### Style Handling

As demonstrated in the examples above, when using the text replacement APIs, you have several options for controlling how styles are applied to the new text:

1. **Custom Styles**: Provide a [`CharacterStylesInput`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md) object to specify exact styling.
2. **Style Sources**: Use [`TextStyleSource`](../../../references/document-sandbox/document-apis/namespaces/Constants/enumerations/TextStyleSource.md) constants to inherit styles from existing text.

#### Example: Comprehensive Style Handling

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Assuming the user has selected a text frame with styled text
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

// Method 1: Custom styling
contentModel.replaceText(
  "Custom styled",
  { start: 0, length: 5 },
  {
    fontSize: 28,
    color: { red: 0.8, green: 0.2, blue: 0.8, alpha: 1 },
    letterSpacing: 1.5
  }
);

// Method 2: Inherit style from before insertion point
contentModel.insertText(
  " (inherits previous style) ",
  15,
  constants.TextStyleSource.beforeInsertionPoint
);

// Method 3: Inherit style from after insertion point
contentModel.insertText(
  " (inherits next style) ",
  45,
  constants.TextStyleSource.afterInsertionPoint
);

// Method 4: For replacement, inherit from first replaced character
// (default option, when not provided)
contentModel.replaceText(
  "replaced with original style",
  { start: 70, length: 10 },
  constants.TextStyleSource.firstReplacedCharacter
);
```

<InlineAlert slots="text, text1" variant="warning"/>

Currently, when passing a `TextStyleSource` to the `style` parameter, any unspecified properties are reset to their default values rather than preserving the existing style. This will be fixed in a future release.

As a workaround, you can call `replaceText()` with only the first two arguments, then run `applyCharacterStyles()` on the same range afterward.

<InlineAlert slots="text" variant="info"/>

Please look at the [Fonts Error Handling](#error-handling-with-unavailable-fonts) section to learn how to handle fonts that may be unavailable when using the Text Replacement APIs with custom styling.

## Apply Character Styles

Text styles can be applied to a `TextNode` using the [`fullContent.applyCharacterStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles) method, which applies one or more styles to the characters in the given range, leaving any style properties that were not specified unchanged.

The styles are defined by the [`CharacterStylesInput`](../../../references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md) interface; the properties that can be set are:

- color
- font (please see the [Use Fonts](#use-fonts) section)
- fontSize
- letterSpacing
- underline
- baselineShift (Super/SubScript)
- link (Hyperlink)

The range is an object with the `start` and `length` properties.

<InlineAlert slots="header, text" variant="warning"/>

Style Ranges and Text edits

Replacing the `fullContent.text` will result in applying the style from the first range to the whole text. To avoid this, use the [Text Replacement APIs](#replace-text-apis) instead.

Please note that `applyCharacterStyles()` is only one way to set styles; you can also use the `characterStyleRanges` property, which supports both getting and setting styles, as described [here](#example-set-all-styles).

### Example: Set Styles in a range

Let's change the styles for the first three characters of a TextNode.

```js
// sandbox/code.js
import { editor, constants } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];

// Apply character styles to the first three letters
textNode.fullContent.applyCharacterStyles(
  {
    color: { red: 0, green: 0.4, blue: 0.8, alpha: 1 },
    fontSize: 240,
    letterSpacing: 10,
    underline: false, // default is true when link is set
    link: "https://developer.adobe.com/"
    // baselineShift: constants.TextScriptStyle.superscript,
  },
  {
    start: 0,
    length: 3,
  }
);
```

<InlineAlert slots="text" variant="info"/>

**To remove the hyperlink**, set the `link` property to an empty string.

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

### Example: Re-apply Styles

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

### Example: Set Fonts in a range

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

### Error Handling with Unavailable Fonts

Text operations may fail if the existing text contains fonts that are unavailable to the current user; the text content cannot be modified and certain styling changes are limited as well. You can check for this condition and handle it appropriately.

#### Example: Check for Unavailable Fonts

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk";

// Assuming the user has selected a text frame
const textNode = editor.context.selection[0];
const contentModel = textNode.fullContent;

let safeFont;

try {
  // Check if the text has unavailable fonts

  if (contentModel.hasUnavailableFonts()) {
    console.warn("Text contains unavailable fonts. Text modification may be limited.");

    // You might want to inform the user or handle this case specially
    // For example, you could change the font to an available one first
    safeFont = await fonts.fromPostscriptName("SourceSans3-Regular");
  }

  // // ⚠️ Queueing the edit
  editor.queueAsyncEdit(() => { // Queue the edit to ensure it's properly tracked for saving and undo
  // Proceed with the text operation
    contentModel.insertText(
      ", ",             // inserted text
      15                // insertion index
      {
        font: safeFont, // font to use (surely available)
      }
    );
  });

} catch (error) {
  console.error("Text replacement failed:", error.message);
  // Handle the error appropriately
}
```

## Apply Paragraph Styles

Paragraph styles can be applied to a TextNode using the [`fullContent.applyParagraphStyles()`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applyparagraphstyles) method. This method applies one or more style properties to entire paragraphs within the specified range, while leaving any style properties that are not provided unchanged. In contrast to directly setting the [`paragraphStyleRanges`](../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges) property—which resets any unspecified properties to their defaults—using `applyParagraphStyles()` lets you update only the desired aspects of the style.

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

## FAQs

#### Q: How do I create text in a document?

**A:** Call `editor.createText("...")` to get a new standalone `TextNode`.

#### Q: Where is the actual string stored?

**A:** In `textNode.fullContent.text`.

#### Q: How can I edit existing text?

**A:** Use `replaceText()` for range replacement, `insertText()` for insertion at position, `appendText()` for adding to end, and `deleteText()` for range deletion.

#### Q: What method applies character-level formatting?

**A:** `fullContent.applyCharacterStyles(styles, range)`.

#### Q: How do I read or batch-edit character styles?

**A:** Use the `characterStyleRanges` array to get or set ranges.

#### Q: How do I change a font programmatically?

**A:** Await `fonts.fromPostscriptName("PSName")` and pass the font to `applyCharacterStyles`.

#### Q: Why must font edits be queued?

**A:** Because `fromPostscriptName()` is async; wrap the style edit in `editor.queueAsyncEdit()`.

#### Q: How do I apply paragraph-level formatting?

**A:** Use `fullContent.applyParagraphStyles(styles, range)`.

#### Q: Where can I inspect paragraph formats?

**A:** Read or modify `fullContent.paragraphStyleRanges`.

#### Q: What happens to styles after replacing text?

**A:** They reset; save style ranges first and reassign them afterward to preserve formatting. This is a temporary limitation until automatic preservation of paragraph styles is implemented.

#### Q: Can I create a threaded text frame with createText()?

**A:** No, it only returns `StandaloneTextNode`; threaded nodes aren’t creatable yet.

#### Q: How do I find all frames sharing the same story?

**A:** Iterate over `textNode.fullContent.allTextNodes`.

#### Q: What's the difference between `replaceText()` and setting `fullContent.text`?

**A:** `replaceText()` preserves existing styles and allows you to control styling of the replacement text, while setting `fullContent.text` (not recommended) resets all style ranges to default.

#### Q: How do I insert text while preserving existing styles?

**A:** Use `insertText()` with a `TextStyleSource` constant like `constants.TextStyleSource.beforeInsertionPoint` to inherit styles from surrounding text.

#### Q: What happens if I try to modify text with unavailable fonts?

**A:** The operation may throw an error. Use `hasUnavailableFonts()` to check first, and consider changing fonts to available ones before modifying text.

#### Q: Can I specify custom styles when using text replacement APIs?

**A:** Yes, all text replacement methods (`replaceText()`, `insertText()`) accept an optional style parameter where you can provide `CharacterStylesInput` or use `TextStyleSource` constants.

#### Q: How do I add or remove hyperlinks from text?

**A:** Use `applyCharacterStyles()` with a `link` property. Set to a URL string to add a hyperlink, or to an empty string to remove it.

#### Q: How do I handle premium fonts and font availability?

**A:** Check `font.isPremium` and `font.availableForEditing` properties. Use `hasUnavailableFonts()` to detect issues. Premium fonts require user subscription; unavailable fonts prevent text modification until replaced with available fonts.
