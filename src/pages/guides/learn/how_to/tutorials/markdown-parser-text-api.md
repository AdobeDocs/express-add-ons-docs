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

Welcome to this hands-on tutorial where we'll build a complete Markdown Parser add-on. This add-on will provide a seamless way for users to import their Markdown documents and see them instantly transformed into beautifully styled text elements inside Adobe Express, respecting formatting like headings, bold, italics, and lists.

### What you'll learn

- Creating an interactive **drag-and-drop user interface** with **Spectrum Web Components**.
- Integrating **file upload** and parsing mechanisms.
- The power of the **Text API**.
- Applying **fonts** using the Document API.
- Advanced **character styling**: font size and weight.
- Advanced **paragraph styling**: alignment and list styles.

### What you'll build

The add-on will feature a drag-and-drop area for uploading Markdown files and a button to parse the content. It'll read and interpret the Markdown file, and use the Text API to create and insert a Text node with the appropriate Character and Paragraph styles.

### Prerequisites

Before diving into the tutorial, ensure you have:

- An **Adobe account** (use your existing Adobe ID or [create one for free](https://account.adobe.com/)).
- Basic knowledge of **HTML, CSS, and JavaScript**.
- **Node.js** installed (version 18 or newer is recommended).
- A **text editor or IDE** of your choice.
- Experience with Adobe Express add-ons. If you're new or need a refresher, review the [Quickstart Guide](https://developer.adobe.com/express/add-ons/docs/guides/getting-started/quickstart/).

## 1. Project Setup

We'll start by setting up the foundational structure for our add-on.

### 1.1. Environment Setup

First, let's get your development environment ready. Download the [Markdown Parser Add-on template](https://github.com/adobe/express-add-on-sdk-markdown-parser-template) and unzip it.

Your add-on will follow a simple and organized structure:

```txt
.
├── package.json             📦 Project configuration
├── webpack.config.js        🔧 Build configuration
├── src
│   ├── index.html           🌐 UI container
│   ├── ui
│   │   └── index.js         💻 UI logic
│   └── sandbox
│       └── code.js          📝 Document Sandbox API logic
```

We'll add a few files and packages along the way, but this is the starting point, which comes from a slightly adapted [CLI template](../../../getting_started/local_development/dev_tooling.md#templates).

### 1.2. Initial Code

The sample starts with a simple "Hello World" setup to ensure the communication bridge between the UI and the document sandbox is working.

<CodeBlock slots="heading, code" repeat="3" languages="index.html, ui/index.js, sandbox/code.js"/>

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Markdown Parser add-on</title>
    <link
      rel="stylesheet"
      href="styles.css"
    />
  </head>

  <body>
    <sp-theme
      scale="medium"
      color="light"
      system="express"
    >
      <h2>Markdown Parser</h2>
      <sp-button id="helloButton">Say Hello</sp-button>
    </sp-theme>
  </body>
</html>
```

#### ui/index.js

```javascript
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the Authoring Sandbox
  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Log the message to the console when the button is clicked
  document.getElementById("helloButton").addEventListener("click", () => {
    sandboxProxy.sayHello("from the UI");
  });
});
```

#### sandbox/code.js

```javascript
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;

function start() {
  // APIs to be exposed to the UI runtime
  const sandboxApi = {
    sayHello: (message) => {
      console.log(`Hello ${message}, the sandbox is also running.`);
    },
  };
  runtime.exposeApi(sandboxApi);
}

start();
```

Here is a breakdown of this initial setup:

- The `index.html` file provides the basic UI, with a single button wrapped in `<sp-theme>` to match the Adobe Express style.
- In `ui/index.js`, the script waits for the Add-on SDK to be ready (`addOnUISdk.ready`).
- It then creates a `sandboxProxy` by calling `runtime.apiProxy("documentSandbox")`. This proxy is the communication link to the document sandbox.
- An event listener on the button uses this proxy to call the `sayHello` function.
- In `sandbox/code.js`, the `runtime.exposeApi()` method makes the `sayHello` function available to the UI.
- This two-way communication setup is fundamental for add-ons that interact with the document. Clicking the button now proves that our UI and sandbox can communicate successfully and logs a message to the console.

## 2. Building the UI and Handling Files

Now, let's create the actual user interface for our add-on and implement the file handling logic.

### 2.1. Designing the UI with Spectrum Web Components (SWC)

We'll use Spectrum Web Components to create a UI that feels native to Adobe Express. Our interface will have a dropzone for files, a button to trigger parsing, and a progress indicator. The project has already imported the Spectrum Theme and Button components, let's add the other ones we need.

```bash
npm install @spectrum-web-components/dropzone \
    install @spectrum-web-components/illustrated-message \
    install @spectrum-web-components/link \
    install @spectrum-web-components/progress-circle
```

Update `src/index.html` with the following markup:

<CodeBlock slots="heading, code" repeat="1" languages="index.html"/>

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ... -->
</head>

<body>
  <sp-theme scale="medium" color="light" system="express">
    <h2>Markdown Parser</h2>
    <div class="row">
      <sp-dropzone tabindex="0" id="dropzone" drop-effect="copy">
        <sp-illustrated-message
          heading="Drag and drop your file" id="message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 150 103" width="150" height="103">
            <path
              d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
            ></path>
          </svg>
        </sp-illustrated-message>
        <div>
          <label for="file-input">
            <sp-link href="#"
              onclick="document.getElementById('file-input').click()">
              Select a Markdown File
            </sp-link>
            from your computer
          </label>
          <input type="file" id="file-input" style="display: none"/>
        </div>
      </sp-dropzone>
    </div>

    <div class="row button-row">
      <sp-button id="parseButton" variant="accent" disabled >
        Parse Markdown
      </sp-button>
      <sp-progress-circle size="s" indeterminate id="progress-circle">
      </sp-progress-circle>
    </div>

    <div class="row info-text">
      <p>
        Parses Markdown and creates styled text in your Adobe Express
        document. Supported formats: Headings, Bold, Italic, and Lists.
      </p>
    </div>
  </sp-theme>
</body>
</html>
```

#### ui/index.js

```javascript
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the Authoring Sandbox
  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Log the message to the console when the button is clicked
  document.getElementById("helloButton").addEventListener("click", () => {
    sandboxProxy.sayHello("from the UI");
  });
});
```

Here's how this HTML structure works:

- The core of the UI is the `<sp-dropzone>` component, which creates an intuitive drag-and-drop area for files.
- For accessibility, a standard `<input type="file">` is included but hidden with CSS.
- A `<sp-link>` element is used to programmatically trigger the hidden file input, providing a seamless user experience that combines a custom UI with native browser functionality.
- The main `<sp-button>` is initially `disabled`. This is a good practice to prevent user actions before the add-on is ready or before a file has been loaded. It will be enabled programmatically.

### 2.2. Handling File Uploads

The logic for handling file interactions lives in `src/ui/file-handler.js`. This module will set up event listeners on the dropzone and the hidden file input.

```javascript
// src/ui/file-handler.js

export default function setupFileHandler(sandboxProxy) {
  const dropzone = document.getElementById("dropzone");
  const parseButton = document.getElementById("parseButton");
  const message = document.getElementById("message");
  const fileInput = document.getElementById("file-input");
  const progressCircle = document.getElementById("progress-circle");
  let markdownContent = null;

  const isMarkdownFile = (file) => {
    return (
      file.name.toLowerCase().endsWith(".md") || file.type === "text/markdown"
    );
  };

  const handleFile = (file) => {
    if (!isMarkdownFile(file)) {
      message.heading = "Please drop a markdown (.md) file";
      return;
    }

    message.heading = "Got it!";
    dropzone.setAttribute("filled", true);

    const reader = new FileReader();
    reader.onload = (e) => {
      markdownContent = e.target.result;
      console.log("Markdown content loaded.");
      parseButton.disabled = false;
    };
    reader.readAsText(file);
  };

  const parseMarkdownAndInsert = async () => {
    if (!markdownContent) {
      console.error("No markdown content to parse");
      return;
    }
    console.log("Parsing started...");
  };

  dropzone.addEventListener("sp-dropzone-drop", (event) => {
    const file = event.detail.dropEvent.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) handleFile(file);
  });

  parseButton.addEventListener("click", parseMarkdownAndInsert);
}
```

Let's walk through the file handling logic:

- The `setupFileHandler` function in `file-handler.js` centralizes all UI interaction logic.
- It begins by getting references to the necessary DOM elements (dropzone, button, etc.).
- The `handleFile` function is the workhorse here. It first validates that the dropped file is a Markdown file.
- It then uses the browser's standard `FileReader` API to read the file's content asynchronously.
- Once the content is loaded (`reader.onload`), it's stored in a variable, and the "Parse Markdown" button is enabled.
- Event listeners are set up for both the Spectrum dropzone's custom `sp-dropzone-drop` event and the standard `change` event on the hidden file input, ensuring both upload methods work.

Now, we just need to call this setup function from our main UI script, `src/ui/index.js`, and import all the necessary Spectrum components.

```javascript
// src/ui/index.js

// Spectrum Web Components imports
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/link/sp-link.js";
import "@spectrum-web-components/illustrated-message/sp-illustrated-message.js";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import setupFileHandler from "./file-handler.js";

addOnUISdk.ready.then(async () => {
  console.log("UI is ready.");

  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Initialize file handling
  setupFileHandler(sandboxProxy);
});
```

This connects our `index.js` to the `file-handler.js`, passing the `sandboxProxy` for later use. At this point, the UI is fully interactive for file selection.

## 3. Parsing Markdown

The next step is to take the raw text from the uploaded file and convert it into a structured format that we can work with. This process is called parsing.

### 3.1. Introduction to Parsing and AST

Parsing involves analyzing a string of symbols—in our case, Markdown text—and converting it into a data structure that represents its grammatical structure. This structure is called an **Abstract Syntax Tree (AST)**. An AST is a tree representation of the source code, where each node denotes a construct occurring in the text.

For example, the Markdown `## Hello` would be parsed into a `heading` node with a `depth` of 2, containing a `text` node with the value "Hello".

We will use two popular libraries for this task:

- **`unified`**: A powerful engine for processing content with plugins.
- **`remark-parse`**: A `unified` plugin for parsing Markdown into an AST.

Let's install them:

```bash
npm install unified remark-parse mdast-util-to-string
```

### 3.2. Implementing the Parser

Now, let's create the `src/ui/markdown-parser.js` file. This module will be responsible for taking Markdown text and returning an AST.

```javascript
// src/ui/markdown-parser.js

import { unified } from "unified";
import remarkParse from "remark-parse";
import { toString } from "mdast-util-to-string";

/**
 * Parses markdown content into an AST.
 * @param {string} markdownContent The markdown content to parse.
 * @returns {Promise<object>} The AST representing the markdown content.
 */
export async function parseMarkdown(markdownContent) {
  try {
    const processor = unified().use(remarkParse);
    const ast = processor.parse(markdownContent);
    return await processor.run(ast);
  } catch (error) {
    console.error("Error parsing markdown:", error);
    throw error;
  }
}

/**
 * A sophisticated function to get formatted text from the entire AST,
 * preserving paragraph breaks.
 * @param {object} ast The root of the AST.
 * @returns {string} The formatted text.
 */
export function getFormattedText(ast) {
  let text = "";
  ast.children.forEach((node, index) => {
    text += toString(node);
    // Add line breaks between block-level elements
    if (index < ast.children.length - 1) {
      if (["paragraph", "heading", "list"].includes(node.type)) {
        text += "\n\n";
      }
    }
  });
  return text;
}
```

Here's what our parser module does:

- The `parseMarkdown` function uses the `unified` library to create a processing pipeline.
- It plugs in `remark-parse` to handle the Markdown-to-AST conversion.
- The `getFormattedText` helper function is crucial. It converts the AST back into a single string, but with strategic formatting.
- It uses `toString` from the `mdast-util-to-string` library to extract text from nodes.
- Most importantly, it adds double line breaks (`\n\n`) between block-level elements (like paragraphs and headings). This ensures that our plain text string has the correct structure before we apply styles, which is a key part of our styling strategy.

### 3.3. Integrating the Parser

Let's update our `file-handler.js` to use this new parser. We'll modify the `parseMarkdownAndInsert` function to parse the content and log the resulting AST to the console.

```javascript
// src/ui/file-handler.js

import { parseMarkdown } from "./markdown-parser.js";
// ... other imports

// ... inside setupFileHandler

const parseMarkdownAndInsert = async () => {
  if (!markdownContent) {
    console.error("No markdown content to parse");
    return;
  }

  try {
    progressCircle.style.display = "block";
    message.heading = "Processing markdown...";
    parseButton.disabled = true;

    const ast = await parseMarkdown(markdownContent);
    console.log("Parsed Markdown AST:", ast);

    message.heading = "AST logged to console!";
  } catch (error) {
    console.error("Error during parsing:", error);
    message.heading = "Error parsing markdown";
  } finally {
    progressCircle.style.display = "none";
    parseButton.disabled = false;
  }
};

// ... rest of the file
```

Why is this step important?

- This step connects the UI interaction (button click) to our new parsing logic.
- When the "Parse Markdown" button is clicked, the stored `markdownContent` is passed to the `parseMarkdown` function.
- The resulting AST is then logged to the console.
- This is a critical checkpoint in the development process. It allows you to verify that the parsing is working correctly by inspecting the AST for different Markdown inputs, which is an essential debugging practice.

## 4. Integrating with the Adobe Express Text API

With our Markdown parsed into an AST, the final and most exciting part is to render it as styled text in the Adobe Express document.

### 4.1. The Strategy: From AST to Styled Text

Our overall strategy is as follows:

1.  **Extract Plain Text**: First, we'll convert the entire AST into a single string of plain text, using our `getFormattedText` function.
2.  **Generate Style Ranges**: We'll traverse the AST again. For each node that requires styling (like a `heading`, `strong`, or `emphasis` node), we'll record its `type` of style and its `start` and `end` position in the plain text string.
3.  **Communicate with Sandbox**: We'll send the plain text and the array of style ranges to our document sandbox.
4.  **Apply Styles in Sandbox**: The sandbox code will create a single `TextNode` with the plain text. Then, it will iterate through the style ranges and apply the corresponding character or paragraph styles using the Text API.

### 4.2. The Formatter: Generating Style Ranges

The `src/ui/adobe-express-formatter.js` module is responsible for the second step: traversing the AST and generating style ranges.

```javascript
// src/ui/adobe-express-formatter.js

import { getFormattedText } from "./markdown-parser.js";

/**
 * Traverses the AST to generate an array of style ranges.
 * @param {object} ast The root AST node.
 * @returns {object} An object containing the plainText and the array of styleRanges.
 */
export function createExpressStylingFromAST(ast) {
  const plainText = getFormattedText(ast);
  const styleRanges = [];
  let offset = 0;

  const traverse = (node) => {
    if (!node) return;

    const startOffset = offset;

    switch (node.type) {
      case "heading":
        node.children.forEach(traverse);
        styleRanges.push({
          start: startOffset,
          end: offset,
          style: { type: "heading", level: node.depth },
        });
        break;
      case "strong":
        node.children.forEach(traverse);
        styleRanges.push({
          start: startOffset,
          end: offset,
          style: { type: "strong" },
        });
        break;
      case "emphasis":
        node.children.forEach(traverse);
        styleRanges.push({
          start: startOffset,
          end: offset,
          style: { type: "emphasis" },
        });
        break;
      case "inlineCode":
        offset += node.value.length;
        styleRanges.push({
          start: startOffset,
          end: offset,
          style: { type: "code" },
        });
        break;
      case "list":
        node.children.forEach((item, index) => {
          const itemStart = offset;
          item.children.forEach(traverse);
          styleRanges.push({
            start: itemStart,
            end: offset,
            style: { type: "list-item", ordered: node.ordered },
          });
          if (index < node.children.length - 1) {
            offset += 1; // For the newline character between list items
          }
        });
        break;
      case "paragraph":
        node.children.forEach(traverse);
        break;
      case "text":
        offset += node.value.length;
        break;
      case "root":
        node.children.forEach((child, index) => {
          traverse(child);
          if (index < node.children.length - 1) {
            if (["paragraph", "heading", "list"].includes(child.type)) {
              offset += 2; // For the \n\n between blocks
            }
          }
        });
        break;
      default:
        if (node.children) node.children.forEach(traverse);
        break;
    }
  };

  traverse(ast);

  return { plainText, styleRanges };
}
```

Let's unpack this formatter, which is the most intricate part of our UI-side logic:

- Its goal is to map the AST structure to a list of styling instructions that Adobe Express can understand.
- The `createExpressStylingFromAST` function first generates the final, formatted plain text string.
- It then uses a recursive `traverse` function to walk through every node in the AST.
- The key to this process is the `offset` variable, which acts as a cursor, tracking our position within the plain text string.
- For each styleable node (e.g., `heading`, `strong`), we record the `offset` before and after processing its children. This gives us the precise `start` and `end` indices for the style range.
- A crucial detail is handling whitespace. The traversal logic must account for the double line breaks (`\n\n`) we added between block elements to keep the `offset` accurate. This is why the `root` node traversal manually increments the offset.

### 4.3. The Sandbox: Applying the Styles

Now, let's implement the final piece in `src/sandbox/code.js`. This script will receive the text and style ranges and use the Text API to perform the magic. We'll also define our styling rules in `src/documentSandbox/constants.js`.

#### constants.js

```javascript
// src/documentSandbox/constants.js
export const MD_CONSTANTS = {
  FONTS: {
    HEADING: "SourceSans3-Bold",
    EMPHASIS: "SourceSans3-It",
    STRONG: "SourceSans3-Bold",
    CODE: "AnonymousPro",
    REGULAR: "SourceSans3-Regular",
  },
  HEADING_SIZES: { 1: 24, 2: 22, 3: 20, 4: 18, 5: 16, 6: 16, DEFAULT: 16 },
  LAYOUT: {
    MARGIN: 20,
    DEFAULT_FONT_SIZE: 16,
    LINE_SPACING: 1.5,
    PARAGRAPH_SPACE_AFTER: 8,
  },
  DEBUG: true,
};
```

Why use a constants file?

- Centralizing values in a `constants.js` file is a best practice for maintainability.
- It allows you to easily change the visual output (fonts, sizes, spacing) of the parsed Markdown without having to search through the application logic.
- Here, we've defined our desired fonts for different styles, font sizes for headings, and default layout properties.

#### code.js

```javascript
// src/sandbox/code.js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, fonts, constants } from "express-document-sdk";
import { MD_CONSTANTS } from "./constants.js";

const { runtime } = addOnSandboxSdk.instance;

function start() {
  const fontCache = new Map();

  async function preloadFonts(postscriptNames) {
    await Promise.all(
      postscriptNames.map(async (psName) => {
        if (fontCache.has(psName)) return;
        const font = await fonts.fromPostscriptName(psName);
        if (font) fontCache.set(psName, font);
      })
    );
  }

  const docApi = {
    async createStyledTextFromMarkdown(plainText, styleRanges) {
      try {
        const textNode = editor.createText();
        textNode.text = plainText;

        const artboard = editor.context.insertionParent.artboards.first;
        artboard.children.append(textNode);

        await preloadFonts([
          MD_CONSTANTS.FONTS.HEADING,
          MD_CONSTANTS.FONTS.EMPHASIS,
          MD_CONSTANTS.FONTS.STRONG,
          MD_CONSTANTS.FONTS.CODE,
          MD_CONSTANTS.FONTS.REGULAR,
        ]);

        await editor.queueAsyncEdit(() => {
          textNode.fullContent.applyCharacterStyles(
            {
              font: fontCache.get(MD_CONSTANTS.FONTS.REGULAR),
              fontSize: MD_CONSTANTS.LAYOUT.DEFAULT_FONT_SIZE,
            },
            { start: 0, length: plainText.length }
          );
          textNode.fullContent.applyParagraphStyles(
            {
              lineSpacing: MD_CONSTANTS.LAYOUT.LINE_SPACING,
              spaceAfter: MD_CONSTANTS.LAYOUT.PARAGRAPH_SPACE_AFTER,
            },
            { start: 0, length: plainText.length }
          );

          for (const range of styleRanges) {
            const styleProps = {};
            const paraProps = {};
            const rangeLength = range.end - range.start;

            switch (range.style.type) {
              case "heading":
                styleProps.font = fontCache.get(MD_CONSTANTS.FONTS.HEADING);
                styleProps.fontSize =
                  MD_CONSTANTS.HEADING_SIZES[range.style.level] ||
                  MD_CONSTANTS.HEADING_SIZES.DEFAULT;
                break;
              case "strong":
                styleProps.font = fontCache.get(MD_CONSTANTS.FONTS.STRONG);
                break;
              case "emphasis":
                styleProps.font = fontCache.get(MD_CONSTANTS.FONTS.EMPHASIS);
                break;
              case "code":
                styleProps.font = fontCache.get(MD_CONSTANTS.FONTS.CODE);
                break;
              case "list-item":
                paraProps.indentation = 20;
                break;
            }

            if (Object.keys(styleProps).length > 0) {
              textNode.fullContent.applyCharacterStyles(styleProps, {
                start: range.start,
                length: rangeLength,
              });
            }
            if (Object.keys(paraProps).length > 0) {
              textNode.fullContent.applyParagraphStyles(paraProps, {
                start: range.start,
                length: rangeLength,
              });
            }
          }
        });
        console.log("Successfully created styled text from Markdown.");
      } catch (e) {
        console.error("Error creating styled text:", e);
      }
    },
  };
  runtime.exposeApi(docApi);
}

start();
```

This sandbox code is where the visual transformation happens. Here are the key points:

- The `createStyledTextFromMarkdown` function receives the plain text and style ranges from the UI.
- It first creates a single `TextNode` with the entire plain text content and adds it to the document.
- **Performance Tip 1: Font Caching.** The `preloadFonts` function and `fontCache` map are used to load all necessary fonts at once and store them. This avoids making multiple, slow requests for the same font.
- **Performance Tip 2: Batch Editing.** `editor.queueAsyncEdit()` is a crucial performance optimization. It groups all the individual styling calls into a single operation, preventing UI flickering and improving speed.
- Inside the queue, a base style is applied to the entire text block first. Then, the code iterates through the `styleRanges` array, applying each specific character or paragraph style to the correct portion of the text.

### 4.4. Putting It All Together

Finally, let's update the `parseMarkdownAndInsert` function in `src/ui/file-handler.js` to call our new sandbox API.

```javascript
// src/ui/file-handler.js

import { parseMarkdown } from "./markdown-parser.js";
import { createExpressStylingFromAST } from "./adobe-express-formatter.js";
import { MD_CONSTANTS } from "../documentSandbox/constants.js"; // Note the path change

export default function setupFileHandler(sandboxProxy) {
  // ... (variable declarations)

  const parseMarkdownAndInsert = async () => {
    if (!markdownContent) return;

    try {
      progressCircle.style.display = "block";
      message.heading = "Processing markdown...";
      parseButton.disabled = true;

      const ast = await parseMarkdown(markdownContent);
      const { plainText, styleRanges } = createExpressStylingFromAST(ast);

      if (MD_CONSTANTS.DEBUG) {
        console.log("Plain Text:", plainText);
        console.log("Style Ranges:", styleRanges);
      }

      message.heading = "Adding text to document...";
      await sandboxProxy.createStyledTextFromMarkdown(plainText, styleRanges);

      message.heading = "Markdown successfully added!";
    } catch (error) {
      console.error("Error during parsing and styling:", error);
      message.heading = "An error occurred";
    } finally {
      progressCircle.style.display = "none";
      parseButton.disabled = false;
    }
  };

  // ... (event listeners)
}
```

This final change connects all the pieces of our application:

- The `parseMarkdownAndInsert` function now implements our complete workflow:
  1.  It calls the `parseMarkdown` function to get the AST.
  2.  It passes the AST to `createExpressStylingFromAST` to get the plain text and the list of style ranges.
  3.  It sends this data to the document sandbox using `sandboxProxy.createStyledTextFromMarkdown`.
- The use of a `DEBUG` flag from our constants file is a convenient way to toggle console logging for the intermediate `plainText` and `styleRanges`, which is very helpful during development.

## 5. Conclusion

Congratulations! You have successfully built a functional Markdown Parser add-on for Adobe Express. You've learned how to:

- Structure a complex add-on project.
- Build a user-friendly UI with Spectrum Web Components for file handling.
- Use `unified` and `remark` to parse Markdown into an Abstract Syntax Tree.
- Develop a strategy to translate an AST into styling information.
- Leverage the powerful Adobe Express Text API to apply character and paragraph styles, manage fonts, and create rich text content programmatically.

This project serves as a strong foundation. You can extend it by supporting more Markdown features like tables, blockquotes, or even custom styling options for your users. Happy coding!
