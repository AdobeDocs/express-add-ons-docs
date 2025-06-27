---
title: Creating a Markdown Parser add-on with the Text API
description: Learn how to create a Markdown Parser add-on with the Text API.
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Document API
  - Markdown Parser
  - Text API
  - Character Styles
  - Paragraph Styles
  - Fonts
contributors:
  - https://github.com/undavide
---

# Create a Markdown Parser Add-on with the Text API

Learn how to build from scratch an Adobe Express add-on capable of parsing Markdown files and converting them into rich text directly within an Adobe Express document.

## Introduction

Welcome to this hands-on tutorial! We'll walk you through building a complete Markdown Parser add-on.

<InlineAlert variant="info" slots="header, text1" />

What's Markdown?

Markdown is a popular lightweight markup language, widely used for formatting textual content quickly and intuitively.

```md
# Markdown sample – heading

For example, this is **bold**, _italic_ and even `monospace` text.
It can do much more!
```

### What you'll learn

- **Setting up a project** environment from scratch.
- Creating an interactive **drag-and-drop user interface** with **Spectrum Web Components**.
- Integrating **file upload** and parsing mechanisms.
- The power of the **Text API**.
- Applying **fonts** using the Document API.
- Advanced **character styling**: font size and weight.
- Advanced **paragraph styling**: alignment and list styles.

### What you'll build

The add-on will feature a drag-and-drop area for uploading Markdown files and a button to parse the content. It'll read and interpret the Markdown file, and use the Text API to create and insert a Text node with the appropriate Character and Paragraph styles.

<!-- ![](images/markdown-parser-preview.png) -->

## Prerequisites

Before diving into the tutorial, ensure you have:

- An **Adobe account** (use your existing Adobe ID or [create one for free](https://account.adobe.com/)).
- Basic knowledge of **HTML, CSS, and JavaScript**.
- **Node.js** installed (version 18 or newer is recommended).
- A **text editor or IDE** of your choice.
- Experience with Adobe Express add-ons. If you're new or need a refresher, review the [Quickstart Guide](/guides/getting_started/quickstart.md).

## 1. Project Setup

### 1.1 Project Structure

Your add-on will follow a simple and organized structure:

```txt
.
├── package.json             📦 Project configuration
├── webpack.config.js        🔧 Build configuration
├── src
│   ├── index.html           🌐 UI container
│   ├── ui
│   │   └── index.js         💻 UI logic
│   └── documentSandbox
│       └── code.js          📝 Document API logic
```

### 1.2 Environment Setup

Create a new directory for your project and initialize it with npm:

```sh
mkdir markdown-parser-addon
cd markdown-parser-addon
npm init -y
```

Install the necessary dependencies, including Webpack and Spectrum Web Components—for simplicity, we're adding the entire library to our project:

```sh
npm install webpack webpack-cli webpack-dev-server --save-dev
npm install @spectrum-web-components/bundle
```

Ensure your `package.json` is correctly configured to use JavaScript modules:

```json
{
  "type": "module",
  "scripts": {
    "build": "webpack",
    "start": "webpack serve --open"
  }
}
```

Next, configure Webpack by creating a `webpack.config.js` file:

```js
const path = require("path");

module.exports = {
  entry: "./src/ui/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devServer: {
    static: "./dist",
  },
};
```

This configuration ensures that our add-on is built and served from the `dist` folder, and all the files are bundled into a single `bundle.js` file.

Now, create the basic file structure inside your `src` folder:

- `index.html` for the iframe UI.
- `ui/index.js` to handle UI logic.
- `documentSandbox/code.js` for Adobe Express Document API interactions.

You're all set! Next, we'll build a simple but functional UI using Spectrum Web Components, starting with drag-and-drop file uploads and real-time feedback.

## 2. Building the UI with Spectrum Web Components

Now that we have set up the basic structure of our project, we will start crafting our add-on's User Interface (UI) using Adobe's Spectrum Web Components. The goal of this section is to build an intuitive UI with drag-and-drop support for uploading Markdown files. Additionally, we'll include an initial logging feature to confirm the successful file upload and text extraction.

### 2.1 Initial UI Setup (`index.html`)

Open the `index.html` file located within your project's `src` folder. Our interface leverages Spectrum Web Components to maintain consistency with Adobe Express's UI design language. Replace the existing markup (if any) with the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <script
      type="module"
      src="https://unpkg.com/@spectrum-web-components/bundle/elements.js"
    ></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@spectrum-web-components/styles/all.css"
    />
    <style>
      body {
        font-family: var(--spectrum-body-font-family);
        padding: var(--spectrum-global-dimension-size-200);
      }
      sp-dropzone {
        height: 200px;
      }
    </style>
  </head>

  <body>
    <sp-theme
      scale="medium"
      color="light"
      theme="express"
    >
      <h2>Markdown Parser Add-on</h2>
      <p>
        Drag and drop a Markdown (.md) file below to parse it and apply styles
        to your Adobe Express document.
      </p>

      <sp-dropzone
        id="markdown-dropzone"
        tabindex="0"
      >
        <sp-illustrated-message
          heading="Drag Markdown file here"
          description="or click to select a file"
        >
          <svg
            slot="illustration"
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 128 128"
          >
            <path
              fill="#ccc"
              d="M32 40v48h64V40H32zm60 44H36V44h56v40zM48 52h32v4H48zm0 12h32v4H48zm0 12h20v4H48z"
            />
          </svg>
        </sp-illustrated-message>
      </sp-dropzone>

      <sp-button
        id="parse-button"
        variant="primary"
        disabled
        style="margin-top:16px;"
      >
        Parse and Apply Styles
      </sp-button>

      <sp-divider
        size="m"
        style="margin:24px 0;"
      ></sp-divider>

      <h3>Markdown File Content</h3>
      <sp-textarea
        id="file-content"
        placeholder="Markdown content will appear here..."
        readonly
        style="height: 150px;"
      ></sp-textarea>
    </sp-theme>

    <script
      type="module"
      src="./ui/index.js"
    ></script>
  </body>
</html>
```

Let's quickly break down the key UI components:

- **`sp-dropzone`**: A drag-and-drop area provided by Spectrum Web Components. It gives users a clear interaction space to upload their Markdown files.
- **`sp-illustrated-message`**: Provides visual guidance and instructions directly within the dropzone.
- **`sp-button`**: The primary action button, initially disabled until a valid file is uploaded.
- **`sp-textarea`**: A non-editable, scrollable text area used to display information to the user.

### 2.2 Handling File Uploads (`ui/index.js`)

Now we'll implement drag-and-drop functionality and basic file reading logic. Create or edit the file `src/ui/index.js` with the following code:

```js
// src/ui/index.js

const dropzone = document.getElementById("markdown-dropzone");
const parseButton = document.getElementById("parse-button");
const fileContentArea = document.getElementById("file-content");

let uploadedMarkdownContent = "";

// Helper function: Reads a file and updates UI
async function readMarkdownFile(file) {
  const text = await file.text();
  uploadedMarkdownContent = text;
  fileContentArea.value = uploadedMarkdownContent;
  parseButton.disabled = false; // Enable parsing button now that a valid file is loaded
  console.log("File successfully loaded and content displayed.");
}

// Setup event listeners for drag-and-drop functionality
dropzone.addEventListener("sp-dropzone-drop", async (event) => {
  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length > 0) {
    const file = droppedFiles[0];
    if (file.type === "text/markdown" || file.name.endsWith(".md")) {
      await readMarkdownFile(file);
    } else {
      alert("Please upload a valid Markdown (.md) file.");
    }
  }
});

// Alternative: Click-to-upload fallback
dropzone.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".md,text/markdown";
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      if (file.type === "text/markdown" || file.name.endsWith(".md")) {
        await readMarkdownFile(file);
      } else {
        alert("Please upload a valid Markdown (.md) file.");
      }
    }
  };
});

// Initial button click event to log content for now (we'll replace this later)
parseButton.addEventListener("click", () => {
  console.log(
    "Markdown content ready for processing:",
    uploadedMarkdownContent
  );
  alert("Markdown content logged to console for verification.");
});
```

Here's a detailed explanation of what's happening here:

- The `sp-dropzone-drop` event listener captures drag-and-drop file uploads.
- An alternative click-based file input dialog is provided for accessibility.
- The file type validation ensures we accept only Markdown files.
- Uploaded content is immediately previewed within the `sp-textarea` and logged in the console, giving instant visual confirmation to users.
- The Parse button is initially disabled and becomes available only after successful file upload, guiding users intuitively through the next steps.
- Clicking the Parse button logs content to the console temporarily. Later we'll replace this with real parsing logic connecting to Adobe Express Document Sandbox.

### 2.3 Testing Initial Functionality

Before continuing, let's quickly test our add-on to ensure our UI and file upload features work as expected:

1. Run your local development server (typically with `npm start` or your provided local dev command).
2. Open Adobe Express and load the add-on in development mode.
3. Drag and drop a Markdown (`.md`) file onto the provided dropzone.
4. Confirm the textarea populates with the Markdown content.
5. Check the browser's developer console for logging statements to verify correct behavior.
6. Click "Parse and Apply Styles" to see the alert and further console logs.

By confirming these initial steps, you've ensured your add-on UI is ready and fully functional.

In the next section, we'll establish early integration with the Adobe Express Document Sandbox. We'll start simple by setting up communication channels between the UI iframe and the Document Sandbox, and log a dummy message from within the sandbox to verify our connection. Then, we'll gradually expand towards parsing Markdown and applying advanced text styling features, like Fonts, Character Styles, and Paragraph Styles.

Here's the detailed **Markdown Parsing** section of your tutorial, continuing in the established writing style and depth:

---

## 3. Markdown Parsing

At this point, you've successfully implemented a UI that accepts Markdown file uploads, reads their content, and gives instant feedback. Our next goal is to parse this Markdown content to a structured format that we can later transform into styled text using Adobe Express APIs.

### 3.1 Introduction to Markdown Parsing

Parsing Markdown means converting the raw Markdown text into a structured data representation known as an Abstract Syntax Tree (AST). The AST describes the content of the document in terms of its individual elements—such as paragraphs, headings, bold or italicized text, and lists—in a structured, hierarchical form.

For this task, we'll use the widely popular JavaScript libraries:

- **`unified`**: A powerful engine to process content into ASTs.
- **`remark-parse`**: Parses Markdown content into a Markdown-specific AST.

### 3.2 Adding Dependencies

Install the necessary libraries in your project with npm:

```sh
npm install unified remark-parse
```

If you're using TypeScript (optional but recommended):

```sh
npm install --save-dev @types/mdast
```

### 3.3 Basic Markdown Parsing

Let's first create a basic parsing function in a new module:

Create the file `src/ui/markdown-parser.js` and add this initial code:

```js
// src/ui/markdown-parser.js
import { unified } from "unified";
import remarkParse from "remark-parse";

/**
 * Parses Markdown text into an Abstract Syntax Tree (AST).
 * @param {string} markdown - The Markdown content to parse.
 * @returns {object} - The resulting AST.
 */
export function parseMarkdown(markdown) {
  const processor = unified().use(remarkParse);
  const tree = processor.parse(markdown);
  return tree;
}
```

Here's a brief explanation of this code:

- `unified()` initializes a parser pipeline.
- `use(remarkParse)` configures the pipeline to interpret Markdown.
- `processor.parse(markdown)` returns the AST representation of your Markdown content.

### 3.4 Integrating Markdown Parsing into your UI Logic

Let's test our Markdown parser by integrating it into the UI you've previously created. Open your existing `src/ui/index.js` file, and update the logic of your `parseButton` click event as follows:

```js
// src/ui/index.js
import { parseMarkdown } from "./markdown-parser.js";

parseButton.addEventListener("click", () => {
  if (uploadedMarkdownContent.trim() === "") {
    alert("No Markdown content available to parse!");
    return;
  }

  // Parse Markdown to AST
  const markdownAST = parseMarkdown(uploadedMarkdownContent);

  console.log("Parsed Markdown AST:", markdownAST);
  alert("Markdown has been parsed. Check console for AST structure.");
});
```

Now when the user clicks the "Parse and Apply Styles" button:

- The Markdown content is converted into an AST.
- The AST is logged in the browser's developer console.
- A confirmation alert notifies the user that parsing succeeded.

### 3.5 Understanding the Markdown AST Structure

Markdown AST generated by `remark-parse` adheres to the MDAST specification. Here's a quick overview of common AST node types you will encounter:

- **Root**: The document itself, containing all other nodes.
- **Heading**: Markdown headings (`#`, `##`, etc.).
- **Paragraph**: Plain text grouped into paragraphs.
- **List**, **ListItem**: Bulleted (`-`) or numbered (`1.`) lists.
- **Emphasis**, **Strong**, **InlineCode**: Text styled in italic, bold, or inline code formats.
- **Link**, **Image**: Hyperlinks or embedded images.

For example, consider the following Markdown content:

```markdown
# Welcome to Markdown Parser

This is a **bold** statement. This text is _italic_.

- Item one
- Item two
```

The resulting AST would look like this:

```json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [{ "type": "text", "value": "Welcome to Markdown Parser" }]
    },
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "value": "This is a " },
        { "type": "strong", "children": [{ "type": "text", "value": "bold" }] },
        { "type": "text", "value": " statement. This text is " },
        {
          "type": "emphasis",
          "children": [{ "type": "text", "value": "italic" }]
        },
        { "type": "text", "value": "." }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "children": [
        {
          "type": "listItem",
          "children": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "value": "Item one" }]
            }
          ]
        },
        {
          "type": "listItem",
          "children": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "value": "Item two" }]
            }
          ]
        }
      ]
    }
  ]
}
```

### 3.6 Traversing the AST

Next, we'll create a function to traverse this AST and extract the information necessary for Adobe Express styling. Here's a preliminary implementation:

```js
// src/ui/markdown-parser.js (extend this file)

/**
 * Traverses Markdown AST and returns an array of simplified text nodes with type info.
 * @param {object} node - The current AST node.
 * @param {array} results - The accumulator array (internal use only).
 * @returns {array} - Simplified node array with types and text content.
 */
export function traverseAST(node, results = []) {
  if (!node) return results;

  switch (node.type) {
    case "root":
    case "paragraph":
    case "strong":
    case "emphasis":
    case "heading":
    case "list":
    case "listItem":
      node.children.forEach((child) => traverseAST(child, results));
      break;

    case "text":
      results.push({ type: "text", value: node.value });
      break;

    case "inlineCode":
      results.push({ type: "inlineCode", value: node.value });
      break;

    default:
      console.warn(`Unhandled node type: ${node.type}`);
      break;
  }

  return results;
}
```

You can integrate and test this traversal function like this (update your `parseButton` event again):

```js
// src/ui/index.js
import { parseMarkdown, traverseAST } from "./markdown-parser.js";

parseButton.addEventListener("click", () => {
  if (uploadedMarkdownContent.trim() === "") {
    alert("No Markdown content available to parse!");
    return;
  }

  const markdownAST = parseMarkdown(uploadedMarkdownContent);
  const nodes = traverseAST(markdownAST);

  console.log("Simplified Markdown Nodes:", nodes);
  alert("Markdown parsed and simplified nodes logged to console.");
});
```

This approach logs a simplified representation of Markdown nodes:

```json
[
  { "type": "text", "value": "Welcome to Markdown Parser" },
  { "type": "text", "value": "This is a " },
  { "type": "text", "value": "bold" },
  { "type": "text", "value": " statement. This text is " },
  { "type": "text", "value": "italic" },
  { "type": "text", "value": "." },
  { "type": "text", "value": "Item one" },
  { "type": "text", "value": "Item two" }
]
```

With Markdown parsing successfully implemented and tested, you're ready to connect this logic to Adobe Express's new Text API. In the next sections, we'll explore how to translate these simplified Markdown nodes into richly styled text using Character Styles, Paragraph Styles, and advanced Font handling provided by Adobe Express.

## 4. Introduction to the Adobe Express Text API

Now that we've successfully parsed Markdown content into a structured format, we're ready to bring that content into Adobe Express documents. In this section, we'll introduce the powerful Adobe Express Text API, highlighting its key features and illustrating how to interact with text programmatically within Adobe Express.

### Overview of the Adobe Express Text API

The Adobe Express Text API allows developers to programmatically create, manipulate, and style text elements within Adobe Express documents. This API significantly extends the capabilities of your add-ons by giving you precise control over fonts, character styles, paragraph styles, and text content management.

The core object for working with text content is the `TextNode`, provided by the Express Document Sandbox API.

### Creating a Basic TextNode

Let's begin by creating a simple TextNode in your Adobe Express document to get familiar with the basic workflow.

In your project's Document Sandbox script (`sandbox/code.js`), include the following code snippet to create a basic TextNode:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new TextNode instance
const textNode = editor.createText();

// Set initial text content
textNode.fullContent.text = "Hello, Adobe Express!";

// Position the text in the center of the document
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);

// Add the TextNode to the current document
insertionParent.children.append(textNode);

// Log text content to verify
console.log("Created text node with content:", textNode.fullContent.text);
```

Let's quickly break down what's happening here:

- **Creating a TextNode**: Using `editor.createText()` initializes an empty TextNode.
- **Setting content**: The text content is assigned directly to the `fullContent.text` property.
- **Positioning**: The node is positioned at the center of the current insertion area (`insertionParent`).
- **Appending**: The node is appended to the document to become visible.

Run your add-on now. You'll see a new text element appear in your Adobe Express document containing the phrase "Hello, Adobe Express!".

### Exploring the TextNode's `fullContent` Object

The `fullContent` object is key to interacting with text. It provides:

- **`text`**: the plain string representing the content.
- **`applyCharacterStyles()`**: method to style specific character ranges.
- **`applyParagraphStyles()`**: method to define paragraph-level formatting.
- **`characterStyleRanges`**: property to retrieve or directly set character styles.
- **`paragraphStyleRanges`**: property to retrieve or set paragraph styles.

Here's an example of logging the complete content model of a TextNode:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming a TextNode is selected
const textNode = editor.context.selection[0];
console.log("Full content model:", textNode.fullContent);
```

This logs detailed information, including text, styles, fonts, and layout properties:

```json
{
  "text": "Hello, Adobe Express!",
  "characterStyleRanges": [{...}],
  "paragraphStyleRanges": [{...}]
}
```

### Applying Simple Character Styles

Now, let's apply basic character styling to our TextNode. Suppose we want to make the first five characters bold, with a larger font size and specific color:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Select the TextNode (assuming it's the first selected item)
const textNode = editor.context.selection[0];

// Apply styles to the first five characters
textNode.fullContent.applyCharacterStyles(
  {
    fontSize: 72,
    underline: false,
    color: { red: 1, green: 0, blue: 0, alpha: 1 }, // red color
  },
  {
    start: 0,
    length: 5,
  }
);
```

Run this code from your sandbox to see the immediate result: "Hello" will appear in a large red font, while the rest remains unchanged.

### Applying Paragraph Styles

Similarly, you can adjust paragraph-level settings such as alignment, spacing, and indentation through `applyParagraphStyles()`:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Select the TextNode
const textNode = editor.context.selection[0];

// Apply paragraph styles to the first paragraph (assuming a single paragraph)
textNode.fullContent.applyParagraphStyles(
  {
    textAlign: "center",
    lineSpacing: 1.5,
  },
  {
    start: 0,
    length: textNode.fullContent.text.length,
  }
);
```

This example centers the text and applies increased line spacing, improving readability and visual appeal.

### Loading and Using Fonts

Fonts are a special type of character style requiring specific handling. To use a font, we first load it asynchronously with `fonts.fromPostscriptName()` provided by Adobe Express's API.

Here's a practical example demonstrating font loading and application:

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk";

async function applyFont() {
  // Load the desired font by PostScript name
  const font = await fonts.fromPostscriptName("SourceSans3-Bold");

  // Select the TextNode
  const textNode = editor.context.selection[0];

  // Apply the font to the entire text
  textNode.fullContent.applyCharacterStyles(
    { font },
    { start: 0, length: textNode.fullContent.text.length }
  );
}

applyFont();
```

In this snippet:

- We asynchronously load the "SourceSans3-Bold" font.
- We then apply it directly to all characters in the selected TextNode.

Now, your text reflects the newly applied bold Source Sans font.

### Integrating Markdown Parsing with the Adobe Express Text API

The final step, which we'll explore in the next section, involves integrating our Markdown parser with the Adobe Express Text API. We'll translate the parsed Markdown AST nodes into TextNode elements and apply appropriate styling (such as bold, italic, code formatting, lists, and headings) directly within Adobe Express.

### Next Steps

In this section, you've learned the fundamentals of the Adobe Express Text API, including:

- Creating and positioning TextNodes.
- Manipulating text content and styles via the `fullContent` API.
- Loading and using fonts.

In the next sections, we'll leverage this foundational knowledge to map Markdown elements (headings, emphasis, strong, etc.) directly to Adobe Express styled text, creating a complete Markdown-to-Express workflow.

---

Here's the next detailed section of your tutorial—**Character and Paragraph Styles**—keeping the same structured style and depth:

---

## Character and Paragraph Styles

In the previous section, you learned how to create basic text elements and briefly explored the styling capabilities provided by Adobe Express's Text API. Now, we'll dive deeper into Character and Paragraph Styles, essential for transforming Markdown content into richly formatted Adobe Express documents.

### Overview of Styles in Adobe Express

Adobe Express distinguishes clearly between two types of text formatting:

- **Character Styles**: Applied at the individual character level, such as fonts, sizes, colors, letter spacing, and decorations (bold, italic, underline).
- **Paragraph Styles**: Affect entire paragraphs and include alignment, indentation, spacing, and more.

We'll explore both types in detail and demonstrate how to apply them using the Adobe Express Document API.

---

## Applying Character Styles

Character styles define the appearance of individual characters or text ranges. Common properties include:

- **Font Family**
- **Font Size**
- **Color**
- **Letter Spacing**
- **Underline**

### Example: Applying Basic Character Styles

Let's revisit how to apply multiple character styles simultaneously:

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk";

async function applyCharacterStylesExample() {
  const font = await fonts.fromPostscriptName("SourceSans3-Bold");

  const textNode = editor.context.selection[0];

  textNode.fullContent.applyCharacterStyles(
    {
      font, // Font family
      fontSize: 64, // Font size in points
      letterSpacing: 2, // Spacing between letters
      underline: true, // Underline decoration
      color: { red: 0, green: 0.5, blue: 1, alpha: 1 }, // Custom color (sky blue)
    },
    {
      start: 0,
      length: textNode.fullContent.text.length, // Apply to entire text
    }
  );
}

applyCharacterStylesExample();
```

Running this snippet will result in bold, large, underlined text in sky blue, illustrating how expressive the Adobe Express Text API can be.

### Example: Partial Styling for Emphasis

To style specific parts of text differently, specify character ranges explicitly:

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk";

async function emphasizeText() {
  const italicFont = await fonts.fromPostscriptName("SourceSans3-Italic");

  const textNode = editor.context.selection[0];
  const emphasisStart = 6; // Starting index of the word to style
  const emphasisLength = 5; // Length of the word "Adobe"

  textNode.fullContent.applyCharacterStyles(
    {
      font: italicFont,
      color: { red: 1, green: 0.2, blue: 0.2, alpha: 1 }, // Soft red
    },
    {
      start: emphasisStart,
      length: emphasisLength,
    }
  );
}

emphasizeText();
```

Here, only the word "Adobe" becomes italicized and colored differently, perfect for emulating Markdown emphasis or strong syntax.

---

## Applying Paragraph Styles

Paragraph styles handle the layout and flow of entire blocks of text. Common paragraph style properties include:

- **Alignment** (`left`, `center`, `right`, `justify`)
- **Line Spacing**
- **Indentation**
- **Spacing before and after paragraphs**

### Example: Center Alignment and Line Spacing

Let's center-align a paragraph and increase the line spacing to improve readability:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

function applyParagraphStylesExample() {
  const textNode = editor.context.selection[0];

  textNode.fullContent.applyParagraphStyles(
    {
      textAlign: "center", // center alignment
      lineSpacing: 1.8, // increased line spacing
    },
    {
      start: 0,
      length: textNode.fullContent.text.length,
    }
  );
}

applyParagraphStylesExample();
```

This centers your text and applies a comfortable spacing between lines, enhancing visual clarity.

### Example: Indentation and Paragraph Spacing

To clearly define paragraph boundaries:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

function indentParagraph() {
  const textNode = editor.context.selection[0];

  textNode.fullContent.applyParagraphStyles(
    {
      indentation: 24, // Indent the first line (in pixels)
      spacingBefore: 12, // Space before the paragraph
      spacingAfter: 12, // Space after the paragraph
    },
    {
      start: 0,
      length: textNode.fullContent.text.length,
    }
  );
}

indentParagraph();
```

Your paragraph now clearly stands out, ideal for highlighting quotes or important excerpts from Markdown files.

---

## Combining Character and Paragraph Styles

For richer document structures, combine both styling types:

```js
// sandbox/code.js
import { editor, fonts } from "express-document-sdk";

async function applyComplexStyling() {
  const boldFont = await fonts.fromPostscriptName("SourceSans3-Bold");

  const textNode = editor.context.selection[0];

  // Apply Character Styles (entire paragraph)
  textNode.fullContent.applyCharacterStyles(
    {
      font: boldFont,
      fontSize: 48,
      color: { red: 0.1, green: 0.1, blue: 0.1, alpha: 1 }, // dark gray
    },
    {
      start: 0,
      length: textNode.fullContent.text.length,
    }
  );

  // Apply Paragraph Styles
  textNode.fullContent.applyParagraphStyles(
    {
      textAlign: "justify",
      lineSpacing: 1.6,
      spacingBefore: 16,
      spacingAfter: 16,
    },
    {
      start: 0,
      length: textNode.fullContent.text.length,
    }
  );
}

applyComplexStyling();
```

With these styles combined, the text appears professional and is clearly structured—perfect for converting structured Markdown into polished Adobe Express documents.

---

## Next Steps

In this comprehensive section, we've learned:

- How to apply detailed character styles like fonts, color, and decorations.
- How to define paragraph-level styles including alignment, indentation, and spacing.
- How to combine character and paragraph styling for sophisticated formatting.

With this styling knowledge firmly established, you're now ready to integrate these styles directly into your Markdown parsing workflow. In the upcoming section, we'll bridge the Markdown AST parsing we created previously to these powerful Adobe Express text styling features.

---

Here's the next detailed section—**Integrating Markdown with the Text API**—maintaining the structured approach and style we've been following.

---

## Integrating Markdown with the Text API

We've explored Markdown parsing and the powerful styling features provided by the Adobe Express Text API. Now, let's bring everything together. In this section, we'll convert the parsed Markdown Abstract Syntax Tree (AST) into styled Adobe Express `TextNode` elements.

---

### Mapping Markdown Elements to Adobe Express Styles

Our goal is to convert Markdown formatting such as:

- **Headings** (`#`, `##`, etc.)
- **Bold** (`**bold**`)
- _Italic_ (`*italic*`)
- `Inline code`
- Lists (`- item`)

to corresponding Adobe Express character and paragraph styles.

Let's define these mappings clearly:

| Markdown Syntax | Adobe Express Character Styles | Adobe Express Paragraph Styles |
| --------------- | ------------------------------ | ------------------------------ |
| `# Heading 1`   | Bold, font size 64             | Spacing after 20px             |
| `## Heading 2`  | Bold, font size 48             | Spacing after 16px             |
| `### Heading 3` | Bold, font size 36             | Spacing after 12px             |
| `**Bold**`      | Bold (font variant)            | Default                        |
| `*Italic*`      | Italic (font variant)          | Default                        |
| `` `Code` ``    | Monospace font                 | Background highlight           |
| Lists (`-`)     | Regular font                   | Indentation & spacing          |

---

### Translating Markdown AST to Styled Text

Let's implement a function that will:

1. Traverse the Markdown AST.
2. Convert each node to styled text.
3. Insert styled text nodes into Adobe Express.

Update your `markdown-parser.js` module to add the following function:

```js
// src/ui/markdown-parser.js
import { editor, fonts } from "express-document-sdk";

async function createStyledTextFromAST(astNode, parentInsertion) {
  switch (astNode.type) {
    case "heading":
      return await createHeading(astNode, parentInsertion);

    case "paragraph":
      return await createParagraph(astNode, parentInsertion);

    case "list":
      return await createList(astNode, parentInsertion);

    default:
      console.warn(`Unhandled AST node type: ${astNode.type}`);
      return null;
  }
}
```

---

### Example: Implementing Headings

Let's first implement headings (`#`, `##`, etc.):

```js
async function createHeading(node, parentInsertion) {
  const sizes = { 1: 64, 2: 48, 3: 36 }; // Font sizes for heading levels
  const headingLevel = node.depth;

  const boldFont = await fonts.fromPostscriptName("SourceSans3-Bold");
  const textContent = node.children.map((child) => child.value).join("");

  const textNode = editor.createText();
  textNode.fullContent.text = textContent;

  textNode.fullContent.applyCharacterStyles(
    { font: boldFont, fontSize: sizes[headingLevel] || 24 },
    { start: 0, length: textContent.length }
  );

  textNode.fullContent.applyParagraphStyles(
    { spacingAfter: 20 - 4 * headingLevel },
    { start: 0, length: textContent.length }
  );

  parentInsertion.children.append(textNode);
}
```

---

### Example: Implementing Paragraphs with Bold and Italic

Next, let's handle paragraphs, including inline styles like bold and italic:

```js
async function createParagraph(node, parentInsertion) {
  const regularFont = await fonts.fromPostscriptName("SourceSans3-Regular");
  const boldFont = await fonts.fromPostscriptName("SourceSans3-Bold");
  const italicFont = await fonts.fromPostscriptName("SourceSans3-Italic");

  const textNode = editor.createText();
  let accumulatedText = "";
  let styleRanges = [];

  node.children.forEach((child) => {
    let start = accumulatedText.length;
    accumulatedText += child.value;

    if (child.type === "strong") {
      styleRanges.push({ start, length: child.value.length, font: boldFont });
    } else if (child.type === "emphasis") {
      styleRanges.push({ start, length: child.value.length, font: italicFont });
    }
  });

  textNode.fullContent.text = accumulatedText;

  // Apply default paragraph style
  textNode.fullContent.applyParagraphStyles(
    { spacingAfter: 10, lineSpacing: 1.5 },
    { start: 0, length: accumulatedText.length }
  );

  // Apply inline styles
  styleRanges.forEach(({ start, length, font }) => {
    textNode.fullContent.applyCharacterStyles({ font }, { start, length });
  });

  parentInsertion.children.append(textNode);
}
```

---

### Example: Handling Lists

Markdown lists are also straightforward to represent:

```js
async function createList(node, parentInsertion) {
  const regularFont = await fonts.fromPostscriptName("SourceSans3-Regular");

  for (const listItem of node.children) {
    const textNode = editor.createText();
    const itemContent =
      "• " + listItem.children[0].children.map((c) => c.value).join("");

    textNode.fullContent.text = itemContent;

    textNode.fullContent.applyCharacterStyles(
      { font: regularFont },
      { start: 0, length: itemContent.length }
    );

    textNode.fullContent.applyParagraphStyles(
      { indentation: 20, spacingAfter: 5 },
      { start: 0, length: itemContent.length }
    );

    parentInsertion.children.append(textNode);
  }
}
```

---

### Putting It All Together

Integrate the new function into your UI logic (`index.js`):

```js
// src/ui/index.js
import {
  parseMarkdown,
  traverseAST,
  createStyledTextFromAST,
} from "./markdown-parser.js";
import { editor } from "express-document-sdk";

parseButton.addEventListener("click", async () => {
  if (uploadedMarkdownContent.trim() === "") {
    alert("No Markdown content available to parse!");
    return;
  }

  const markdownAST = parseMarkdown(uploadedMarkdownContent);

  const insertionParent = editor.context.insertionParent;

  for (const childNode of markdownAST.children) {
    await createStyledTextFromAST(childNode, insertionParent);
  }

  alert("Markdown content parsed and styled successfully in Adobe Express.");
});
```

Now when clicking the "Parse and Apply Styles" button:

- Your Markdown content is parsed and converted into styled `TextNode` elements directly within your Adobe Express document.

---

### Testing the Integration

Test thoroughly by uploading Markdown content with various elements:

```markdown
# Markdown Parser

An **Adobe Express** add-on that converts _Markdown_ into styled content.

## Features:

- **Bold text**
- _Italic text_
- Lists and `inline code`

Enjoy your new Markdown-powered documents!
```

You should see correctly styled headings, paragraphs, bold, italic, and lists immediately appearing within Adobe Express.

---

### Next Steps

Congratulations—you've successfully integrated Markdown parsing with the Adobe Express Text API! You can now:

- Parse Markdown into structured AST nodes.
- Apply Adobe Express Character and Paragraph styles.
- Render richly formatted Markdown documents in Adobe Express.

Next, we'll cover advanced font loading and management strategies, performance optimizations, and troubleshooting tips for production-ready add-ons.

---

Here's the next detailed section—**Loading and Using Fonts**—continuing in your structured tutorial style:

---

## Loading and Using Fonts

You've successfully integrated Markdown parsing with Adobe Express's Text API, effectively turning Markdown files into beautifully formatted documents. Now, let's explore the essential topic of loading and managing fonts within your Adobe Express add-on.

Fonts are a critical aspect of document design and readability. Adobe Express provides powerful tools to manage fonts efficiently, ensuring your documents look consistent and professional.

---

### Available Fonts in Adobe Express

Adobe Express provides access to an extensive library of Adobe Fonts. To use any font, you first need to load it by referencing its **PostScript name**. Once loaded, you can apply it directly to your document text.

Common Adobe fonts include:

- `SourceSans3-Regular`
- `SourceSans3-Bold`
- `SourceSans3-Italic`
- `SourceCodePro-Regular`
- `AdobeClean-Bold`

Use fonts that align well with your document's purpose and style.

---

### Loading a Font by PostScript Name

The Adobe Express API provides the `fonts.fromPostscriptName()` method to load fonts asynchronously. Here's a simple example:

```js
import { fonts } from "express-document-sdk";

async function loadFont() {
  const font = await fonts.fromPostscriptName("SourceSans3-Bold");
  console.log("Font loaded successfully:", font.family);
}

loadFont();
```

This method returns a font object you can apply directly through the Text API.

---

### Using Fonts in TextNodes

After loading, fonts are easily applied to `TextNode` objects via the `applyCharacterStyles()` method. Here's how you apply a font to your text:

```js
import { editor, fonts } from "express-document-sdk";

async function applyFontExample() {
  const boldFont = await fonts.fromPostscriptName("SourceSans3-Bold");

  const textNode = editor.context.selection[0];

  textNode.fullContent.applyCharacterStyles(
    { font: boldFont },
    { start: 0, length: textNode.fullContent.text.length }
  );

  console.log("Applied bold font successfully.");
}

applyFontExample();
```

---

### Preloading Fonts for Improved Performance

Repeatedly loading the same fonts asynchronously can impact performance. To enhance user experience, consider preloading commonly used fonts. A recommended strategy is:

- Preload fonts when your add-on initializes.
- Store loaded fonts in an easily accessible cache.

Here's how you might do this effectively:

```js
// fontCache.js
import { fonts } from "express-document-sdk";

const fontCache = {};

export async function preloadFonts(fontNames) {
  await Promise.all(
    fontNames.map(async (name) => {
      fontCache[name] = await fonts.fromPostscriptName(name);
      console.log(`Preloaded font: ${name}`);
    })
  );
}

export function getCachedFont(name) {
  return fontCache[name];
}
```

Example of usage during initialization:

```js
// sandbox/code.js
import { preloadFonts } from "./fontCache.js";

preloadFonts([
  "SourceSans3-Regular",
  "SourceSans3-Bold",
  "SourceSans3-Italic",
  "SourceCodePro-Regular",
]);
```

Then, when styling text later:

```js
import { editor } from "express-document-sdk";
import { getCachedFont } from "./fontCache.js";

function styleUsingCachedFont() {
  const textNode = editor.context.selection[0];

  const cachedBoldFont = getCachedFont("SourceSans3-Bold");

  if (cachedBoldFont) {
    textNode.fullContent.applyCharacterStyles(
      { font: cachedBoldFont },
      { start: 0, length: textNode.fullContent.text.length }
    );
    console.log("Applied cached bold font successfully.");
  } else {
    console.warn("Bold font wasn't cached. Consider preloading.");
  }
}

styleUsingCachedFont();
```

This approach significantly improves font loading times and provides instant font availability during styling operations.

---

### Troubleshooting Font Loading Issues

Occasionally, issues might arise when loading fonts. Common scenarios include:

- **Incorrect PostScript name**: Always verify exact names from Adobe Fonts.
- **Loading delays**: Fonts load asynchronously; ensure your code handles promises correctly.
- **Network latency**: Slow internet connections could affect font loading time; consider loading essential fonts upfront.

Here's how to gracefully handle errors during font loading:

```js
import { fonts } from "express-document-sdk";

async function safeFontLoading(fontName) {
  try {
    const font = await fonts.fromPostscriptName(fontName);
    console.log(`Successfully loaded ${font.family}`);
    return font;
  } catch (error) {
    console.error(`Failed to load font ${fontName}:`, error);
    return null;
  }
}

safeFontLoading("SourceSans3-Bold");
```

---

### Best Practices for Font Management

To ensure optimal performance and visual consistency, follow these best practices:

- **Preload common fonts**: Load fonts once at startup for instant use.
- **Limit font variations**: Reduce the number of fonts/styles to maintain visual clarity.
- **Provide fallbacks**: Always have default font styles if preferred fonts fail to load.

---

### Next Steps

You've now learned:

- How to load and apply fonts using Adobe Express's Text API.
- Strategies for preloading fonts for performance optimization.
- Best practices and troubleshooting font management.

In the upcoming sections, we'll focus on testing, debugging, and optimizing your add-on's performance, ensuring your Markdown Parser Add-on is production-ready.

---

Here's the next detailed section—**Testing and Debugging**—continuing with the established tutorial style and structure:

---

## Testing and Debugging

Now that your Adobe Express Markdown Parser Add-on is fully functional, handling Markdown parsing, style application, and font management, it's crucial to thoroughly test and debug your implementation. Effective testing ensures reliability and a smooth user experience.

This section covers practical strategies for testing and debugging your add-on, along with common issues and their resolutions.

---

### Testing Your Markdown Parser Workflow

Testing your parser requires various Markdown inputs that cover common usage scenarios and edge cases. Below are recommended Markdown examples to test thoroughly:

#### Basic Markdown Test Case:

```markdown
# Test Heading

This is a **bold** and _italic_ test.

- Item one
- Item two
- `Inline code`

End of test.
```

This test ensures headings, inline styles, lists, and basic parsing functionality work as expected.

#### Complex Markdown Test Case:

```markdown
## Complex Example

Paragraph with **bold text**, _italicized words_, and combined formatting like **bold and _italic_**.

- Nested lists:
  - Nested item 1
  - Nested item 2
- Another list item

> A blockquote with **bold emphasis**.
```

This example tests more intricate formatting, including nested structures, blockquotes, and combined inline styles.

---

### Debugging with Adobe Express Sandbox Logs

Adobe Express Document Sandbox provides robust logging support for debugging directly within the sandboxed environment.

**Use `console.log()` liberally**:

```js
console.log("Parsed Markdown AST:", markdownAST);
console.log("Applied styles to text node:", textNode.fullContent);
```

Logs appear in your browser's developer console, providing immediate feedback and visibility into runtime behaviors.

---

### Debugging Style Ranges

To verify character and paragraph styles applied correctly, use this helper function for detailed logging:

```js
import { editor } from "express-document-sdk";

function debugStyleRanges(textNode) {
  const content = textNode.fullContent;

  console.log("Full text content:", content.text);
  console.table(content.characterStyleRanges);
  console.table(content.paragraphStyleRanges);
}

// Usage example:
const selectedNode = editor.context.selection[0];
debugStyleRanges(selectedNode);
```

`console.table()` clearly visualizes style ranges, making issues easier to spot:

| start | length | fontSize | fontFamily | color        |
| ----- | ------ | -------- | ---------- | ------------ |
| 0     | 5      | 64       | BoldFont   | rgb(255,0,0) |
| 5     | 10     | 48       | ItalicFont | rgb(0,0,255) |

---

### Common Issues and Solutions

Below are common issues you might encounter, along with recommended solutions.

#### Problem: Markdown elements not styled correctly

**Possible Causes:**

- Incorrect AST traversal logic.
- Incorrect character or paragraph style ranges.

**Solutions:**

- Log AST nodes and verify their correct parsing.
- Use the provided `debugStyleRanges()` function to verify style applications.

---

#### Problem: Fonts not loading or applying properly

**Possible Causes:**

- Wrong PostScript font name.
- Fonts not loaded before applying.

**Solutions:**

- Verify PostScript font names at [Adobe Fonts](https://fonts.adobe.com).
- Ensure fonts are fully loaded before usage:
  ```js
  fonts
    .fromPostscriptName("SourceSans3-Bold")
    .then((font) => console.log("Font loaded", font))
    .catch((err) => console.error("Font loading error", err));
  ```

---

#### Problem: Performance slowdown on large Markdown files

**Possible Causes:**

- Excessive AST traversals or re-parsing.
- Repeatedly loading fonts without caching.

**Solutions:**

- Implement efficient AST traversal logic; avoid redundant loops.
- Cache fonts once loaded, as shown earlier.

---

### Debugging UI Interactions

If the Spectrum UI doesn't behave as expected:

- Inspect the UI using browser developer tools.
- Check event listeners on elements (`sp-dropzone`, buttons):
  ```js
  dropzone.addEventListener("sp-dropzone-drop", (event) => {
    console.log("Drop event detected:", event.dataTransfer.files);
  });
  ```
- Verify that DOM elements are correctly referenced in JavaScript.

---

### Error Handling Best Practices

Always handle errors gracefully, providing helpful messages to users and logging detailed information to your console for troubleshooting:

```js
try {
  await createStyledTextFromAST(astNode, insertionParent);
} catch (error) {
  console.error("Error applying Markdown styles:", error);
  alert("An error occurred. Please check the console logs.");
}
```

---

### Automated and Manual Testing Recommendations

Combine automated testing (e.g., Jest or Mocha) with manual tests:

- **Automated**: Write unit tests for Markdown parsing and AST traversal.
- **Manual**: Regularly test your add-on within Adobe Express to ensure visual and functional correctness.

Example of a Jest unit test for Markdown parsing:

```js
import { parseMarkdown } from "./markdown-parser.js";

test("parses simple heading", () => {
  const markdown = "# Heading";
  const ast = parseMarkdown(markdown);
  expect(ast.children[0].type).toBe("heading");
  expect(ast.children[0].children[0].value).toBe("Heading");
});
```

---

### Next Steps

By following these testing and debugging strategies, you've ensured your Markdown Parser Add-on is robust, reliable, and user-friendly. You now know how to:

- Perform comprehensive manual and automated testing.
- Effectively debug and handle common issues.
- Use best practices to deliver a smooth user experience.

In the next and final section, we'll summarize best practices, limitations, and offer suggestions for further enhancements to your add-on.

---

Here's the **final section**—**Best Practices & Limitations**—and the **Conclusion**, completing your detailed tutorial in the same structured and comprehensive style.

---

## Best Practices & Limitations

Having successfully built your Adobe Express Markdown Parser Add-on, you're now familiar with parsing Markdown, styling text, managing fonts, and debugging effectively. To conclude, let's review essential best practices, outline some known limitations, and discuss potential improvements.

---

### Best Practices Summary

Following these best practices ensures your add-on remains maintainable, performant, and user-friendly:

- **Efficient AST Traversal:**  
  Traverse the Markdown AST minimally. Avoid redundant traversals or unnecessary deep nesting to enhance performance.

- **Font Management:**  
  Preload and cache frequently used fonts to reduce loading times and enhance user experience.

- **Clear Error Handling:**  
  Always handle exceptions gracefully. Provide clear error messages and detailed logs for debugging.

- **Testing:**  
  Combine automated unit tests (e.g., Jest) with manual visual testing within Adobe Express to ensure correctness.

- **UI Design (Spectrum Components):**  
  Utilize Spectrum Web Components consistently to ensure a familiar, intuitive user experience within Adobe Express.

---

### Known Limitations & Considerations

Be aware of these inherent limitations when working with Markdown and Adobe Express:

- **Complex Markdown Elements:**  
  Advanced Markdown features like tables, complex nested lists, or embedded HTML are challenging to render accurately. Consider simplifying or clearly documenting these limitations for users.

- **Large Markdown Files:**  
  Extremely large Markdown documents can introduce performance issues. Consider parsing documents progressively or warning users when files exceed reasonable lengths.

- **Font Availability:**  
  Not every Adobe Font is available instantly. Font loading times may vary due to network latency. Always provide a sensible fallback font.

---

### Performance Optimization

To optimize performance for production:

- Minimize DOM manipulations in your UI scripts.
- Efficiently batch document sandbox updates to reduce latency.
- Cache loaded fonts and reusable assets to enhance responsiveness.

---

### Future Enhancements and Ideas

Consider enhancing your Markdown Parser Add-on further:

- **Support Advanced Markdown:**  
  Add features like tables, task lists, and footnotes to extend Markdown capabilities.

- **Real-time Preview:**  
  Provide users with real-time visual previews before applying styles to their documents.

- **Customization Options:**  
  Allow users to configure custom styling options such as preferred fonts, sizes, colors, and paragraph spacings directly from the UI.

- **Export and Sharing:**  
  Enable users to export styled Adobe Express content back to Markdown or other formats for sharing or further editing.

---

## Conclusion

Congratulations on successfully completing your Adobe Express Markdown Parser Add-on! Through this tutorial, you've learned how to:

- **Build a fully functional UI** using Adobe's Spectrum Web Components.
- **Parse Markdown** into structured AST nodes using `unified` and `remark`.
- **Style text programmatically** using Adobe Express's powerful Text API, including fonts, character, and paragraph styles.
- **Efficiently load and manage fonts** to ensure great performance and visual consistency.
- **Test and debug comprehensively**, ensuring a reliable user experience.

You now have all the foundational knowledge needed to continue enhancing and expanding this add-on. Keep exploring the Adobe Express ecosystem, experiment with new APIs, and continue building creative and powerful add-ons!

---

### Additional Resources

- [Adobe Express Developer Documentation](https://www.adobe.io/apis/creativecloud/express/)
- [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)
- [Markdown Specification](https://commonmark.org/)
- [UnifiedJS Documentation](https://unifiedjs.com/)
- [Adobe Fonts](https://fonts.adobe.com/)

---

**Happy Coding!** 🚀
