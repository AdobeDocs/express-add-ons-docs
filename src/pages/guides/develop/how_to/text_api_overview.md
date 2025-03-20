# Text APIs Overview

This document provides comprehensive documentation for the Text APIs in Adobe Express Add-ons.

## Key Features

1. **Text Creation and Basic Operations**
   - Create new text nodes using `editor.createText()`
   - Set and replace text content using `fullContent.text`
   - Add line breaks using `\n` or `\r`

2. **Character Styling**
   The `applyCharacterStyles()` method allows you to style text with:
   - Color
   - Font
   - Font size
   - Letter spacing
   - Underline
   
3. **Font Management**
   - Use `fonts.fromPostscriptName()` to load fonts
   - Access font properties:
     - `isPremium` (whether it's a Premium Adobe font)
     - `availableForEditing` (user's access permissions)
     - `family` (font family name)
     - `postscriptName` (PostScript identifier)
     - `style` (e.g., "Regular", "Bold", "Italic")

4. **Paragraph Styling**
   Using `applyParagraphStyles()`, you can control:
   - Line spacing
   - Space before paragraphs
   - Space after paragraphs
   - List styles (ordered or unordered)
   - List indentation

5. **Text Flow Management**
   - Handle text that spans multiple text frames
   - Access shared text content across different text nodes
   - Use `fullContent` property to point to a `TextContentModel`

## Example Code

```javascript
import { editor } from "express-document-sdk";

// Create new text
const textNode = editor.createText();

// Set text content
textNode.fullContent.text = "Hello,\nWorld!";

// Apply styles to first 3 characters
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

## Important Notes
1. Style changes are preserved when editing text content
2. Font operations are asynchronous and require proper error handling
3. Text flow allows content to move between multiple text frames
4. Paragraph styles should align with newline characters
5. The API provides both getter and setter methods for styles

## Related Files
- src/pages/guides/develop/how_to/use_text.md
- src/pages/references/document-sandbox/document-apis/classes/TextNode.md
- src/pages/references/document-sandbox/document-apis/classes/TextContentModel.md
- src/pages/references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md
- src/pages/references/document-sandbox/document-apis/interfaces/ParagraphStylesInput.md