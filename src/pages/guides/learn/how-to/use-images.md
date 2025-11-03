---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Images
  - Media
  - addImage
  - ImportAddOnData
  - Metadata
  - MediaAttributes
  - replaceMedia
title: Use Images
description: Use Images.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I add images to a document?"
      answer: 'Call `addOnUISdk.app.document.addImage(blob, attributes, importAddOnData)` with image blob and optional MediaAttributes and ImportAddOnData.'

    - question: "What parameters does addImage require?"
      answer: "A Blob object is required. MediaAttributes (title, author) and ImportAddOnData (custom metadata) are optional."

    - question: "How do I get an image as a blob?"
      answer: 'Use `fetch(imageUrl).then(r => r.blob())` to convert images to blob format.'

    - question: "Can I use local image files?"
      answer: "Yes, use relative paths from add-on root with fetch() to load local images."

    - question: "How do I add animated GIFs?"
      answer: 'Use `addOnUISdk.app.document.addAnimatedImage(blob, attributes, importAddOnData)` instead of addImage().'

    - question: "Why doesn't addImage work with GIFs?"
      answer: "addImage() converts animations to static images; use addAnimatedImage() to preserve animation."

    - question: "What image formats are supported?"
      answer: "AI, GIF, JPEG, JPG, PNG, PSD, PSDT, and WEBP. 8000px or 80MB."

    - question: "Are there GIF size limitations?"
      answer: "Yes, refer to the FAQ section for specific GIF size and weight limitations."
    - question: "How do I replace media in an existing `MediaContainerNode`?"
      answer: "Use the `replaceMedia()` method on a `MediaContainerNode` with a BitmapImage` object created via `Editor.loadBitmapImage()`."

    - question: "Can I replace any media type with `replaceMedia()`?"
      answer: "Currently, `replaceMedia()` only accepts `BitmapImage` objects. The original media can be any type, but replacement must be a static image."
      
    - question: "How do I attach custom metadata to imported images?"
      answer: "Use the optional `importAddOnData` parameter with `nodeAddOnData` and `mediaAddOnData` objects to store custom metadata that can be retrieved later via document sandbox APIs."
---

# Use Images

## Import Images into the page

Add-ons are hosted in an iframe within the Adobe Express UI, and can load images as `<img>` elements like any other web application. But in order to add images into an Adobe Express document, you need to use the [`addImage()`](../../../references/addonsdk/app-document.md#addimage) method of the `addOnUISdk.app.document` object.

It expects a `Blob` object as the first argument, an optional [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with the image's title and author, and an optional [`ImportAddOnData`](../../../references/addonsdk/app-document.md#importaddondata) object with custom metadata that can be retrieved later via document sandbox APIs.

<InlineAlert slots="header, text" variant="info"/>

### Iframe vs. Document Sandbox

The following snippets import the `addOnUISdk` object, and belong to the `ui/index.js` file. This is the **iframe** side of the add-on's house—whereas most of the Design Elements how-tos make use of the **Document Sandbox API** (in the `sandbox/code.js` file).

### Example

```js
// ui/index.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const imageUrl = "https://placehold.co/600x400.png";
    const image = await fetch(imageUrl);
    const imageBlob = await image.blob();

    await addOnUISdk.app.document.addImage(
      imageBlob, // 👈 Blob object
      {
        title: "Placeholder image", // 👈 Optional MediaAttributes
        author: "Adobe Developer",
      },
      { // 👈 Optional ImportAddOnData - metadata that persists with the image
        nodeAddOnData: { "imageId": "placeholder_123", "category": "demo" },
        mediaAddOnData: { "source": "external", "resolution": "600x400" }
      }
    );
  } catch (e) {
    console.error("Failed to add the image", e);
  }
});
```

You can use `fetch()` also to get images that are local to the add-on; in this case, paths should be relative to the add-on's root.

```js
// ui/index.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const imageUrl = "./600x400.png";     // 👈 Local image
    const image = await fetch(imageUrl);
    // ... same as before
```

<InlineAlert slots="header, text" variant="info"/>

### Image requirements

Please refer to [this section](../../../references/addonsdk/app-document.md#image-requirements) to know more about the file formats support and size requirements for images.

## Import Animated images

Importing a `GIF` via `addImage()` won't work as expected, as the method converts the animation into a static image before adding it to the document. You should use the [`addAnimatedImage()`](../../../references/addonsdk/app-document.md#addanimatedimage) method instead.

### Example

```js
// ui/index.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const gifImageUrl = "https://path/to/a/file.gif"; // 👈 a GIF image
    const gifImage = await fetch(gifImageUrl);
    const gifImageBlob = await gifImage.blob();

    await addOnUISdk.app.document.addAnimatedImage(
      // 👈
      gifImageBlob, // 👈 Blob object
      {
        title: "Animated GIF",
        author: "GIF Creator"
      }, // 👈 Optional MediaAttributes
      { // 👈 Optional ImportAddOnData
        nodeAddOnData: { "gifId": "animated_456", "type": "animation" },
        mediaAddOnData: { "duration": "3s", "frames": "24" }
      }
    );
  } catch (e) {
    console.error("Failed to add the image", e);
  }
});
```

<InlineAlert slots="header, text" variant="warning"/>

### GIF Image requirements

All image formats are equal, but some formats are more equal than others. Please refer to [this FAQ](../../support/faq.md#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document) to learn more about specific GIF limitations in terms of size and weight.

## Replace Media

The [`replaceMedia()`](../../../references/document-sandbox/document-apis/classes/media-container-node.md#replacemedia) method can be used to replace an existing media with a new one. It accepts a single argument of type [`BitmapImage`](../../../references/document-sandbox/document-apis/classes/bitmap-image.md).

<InlineAlert slots="text" variant="info"/>

Compared to the previous examples, replacing media is a method that belongs to the **Document Sandbox API** (in the `sandbox/code.js` file), and not to the **iframe** (in the `ui/index.js` file).

### Example

Because the Document Sandbox doesn't have access to the `fetch()` function, in the following example the Bitmap data is fetched on the iframe side, and passed to the Document Sandbox to be replaced using the [Communication API](./tutorials/stats-addon.md).

You can copy and paste the following code into a [Code Playground](../../getting-started/code-playground.md) session to try it out.

<CodeBlock slots="heading, code" repeat="4" languages="HTML, CSS, iFrame JS, Document JS"/>

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Get Started</title>
</head>
  <body>
    <div class="container">
      <button id="replace-media-btn" disabled>Replace Media</button>
    </div>
  </body>
</html>
```

#### CSS

```css
.container {
  margin: 24px;
  display: flex;
  flex-direction: column;
}

button {
  background-color: rgb(82, 88, 228);
  border-color: rgb(82, 88, 228);
  border-radius: 16px;
  border-style: solid;
  color: rgb(255, 255, 255);
  font-family: sans-serif;
  height: 32px;
}

button:disabled {
  background-color: rgb(177, 177, 177);
  border-color: rgb(177, 177, 177);
}

button:not([disabled]):hover {
  background-color: rgb(64, 70, 202);
  cursor: pointer;
}

```

#### iFrame JS

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const { runtime } = addOnUISdk.instance;

  // Get the Document Sandbox proxy
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Get the button and message elements
  const replaceButton = document.getElementById("replace-media-btn");
  const messageDiv = document.getElementById("message");

  // Enable the button once everything is ready
  replaceButton.disabled = false;

  // Function to show messages to the user
  function showMessage(text, type = "error") {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    // Hide message after 3 seconds for success, keep error messages visible
    if (type === "success") {
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 3000);
    }
  }

  // Function to replace media in selected container
  async function replaceSelectedMedia() {
    try {
      // Hide any previous messages
      messageDiv.style.display = "none";

      replaceButton.disabled = true;
      replaceButton.textContent = "Replacing...";

      // Replace with an image from URL
      const imageUrl = "https://placehold.co/800x600.png";

      // Or replace with a local image:
      // const imageUrl = "./assets/new-image.jpg";

      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      // Pass the blob to the Document Sandbox and get the result
      const result = await sandboxProxy.replaceMediaInSelection(imageBlob);

      if (result.success) {
        replaceButton.textContent = "Media Replaced!";
        showMessage("Media replaced successfully!", "success");
        setTimeout(() => {
          replaceButton.textContent = "Replace Selected Media";
          replaceButton.disabled = false;
        }, 2000);
      } else {
        replaceButton.textContent = "Replace Selected Media";
        replaceButton.disabled = false;
        showMessage(result.error);
      }

    } catch (error) {
      console.error("Failed to replace media:", error);
      replaceButton.textContent = "Replace Selected Media";
      replaceButton.disabled = false;
      showMessage("An unexpected error occurred. Please try again.");
    }
  }

  // Add click event listener to the button
  replaceButton.addEventListener("click", replaceSelectedMedia);
});
```

#### Document JS

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, constants } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

runtime.exposeApi({
  async replaceMediaInSelection(imageBlob) {
    try {
      // Check if there's a selection and it's a MediaContainerNode
      if (!editor.context.hasSelection) {
        return {
          success: false,
          error: "No node selected. Please select a MediaContainerNode first."
        };
      }

      const selectedNode = editor.context.selection[0];
      if (selectedNode.type !== constants.SceneNodeType.mediaContainer) {
        return {
          success: false,
          error: "Selected node is not a MediaContainerNode. Please select an image or media container."
        };
      }

      // Load the new image as a BitmapImage
      const bitmapImage = await editor.loadBitmapImage(imageBlob);

      // Replace the media using queueAsyncEdit since loadBitmapImage is async
      editor.queueAsyncEdit(() => {
        selectedNode.replaceMedia(bitmapImage);
      });

      return {
        success: true
      };

    } catch (error) {
      console.error("Failed to replace media:", error);
      return {
        success: false,
        error: "Failed to replace media. Please try again."
      };
    }
  }
});
```

### Media Node structure

It may be useful to know how Adobe Express represents media nodes in a document, using three Classes:

1. **`MediaContainerNode`**, the main container

The parent node that displays media within a crop mask. It holds two children:

- `maskShape`: a FillableNode defining the visible bounds.
- `mediaRectangle`: the actual media (image or video). It also provides `replaceMedia()` to swap content.

1. **`MediaRectangleNode`**, the abstract base

An abstract base for uncropped, full-frame rectangular media. It can’t be instantiated directly, but defines core properties (width, height, and media data) and shared behavior for positioning, rotation, and sizing.

3. **`ImageRectangleNode`**, the concrete class

A subclass of `MediaRectangleNode` for bitmap images. Created through `Editor.createImageContainer()`, it inherits all sizing and positioning features while representing the specific image content.

```text
MediaContainerNode
├── maskShape                      > FillableNode, defines visible area
└── mediaRectangle                 > MediaRectangleNode
    └── ImageRectangleNode         > for images
    └── UnknownMediaRectangleNode  > for other media types
```

## FAQs

#### Q: How do I add images to a document?

**A:** Call `addOnUISdk.app.document.addImage(blob, attributes, importAddOnData)` with image blob and optional MediaAttributes and ImportAddOnData.

#### Q: What parameters does addImage require?

**A:** A Blob object is required. MediaAttributes (title, author) and ImportAddOnData (custom metadata) are optional.

#### Q: How do I get an image as a blob?

**A:** Use `fetch(imageUrl).then(r => r.blob())` to convert images to blob format.

#### Q: Can I use local image files?

**A:** Yes, use relative paths from add-on root with fetch() to load local images.

#### Q: How do I add animated GIFs?

**A:** Use `addOnUISdk.app.document.addAnimatedImage(blob, attributes, importAddOnData)` instead of addImage().

#### Q: Why doesn't addImage work with GIFs?

**A:** addImage() converts animations to static images; use addAnimatedImage() to preserve animation.

#### Q: What image formats are supported?

**A:** AI, GIF, JPEG, JPG, PNG, PSD, PSDT, and WEBP. 8000px or 80MB.

#### Q: Are there GIF size limitations?

**A:** Yes, refer to the FAQ section for specific GIF size and weight limitations.

#### Q: How do I replace media in an existing `MediaContainerNode`?

**A:** Use the `replaceMedia()` method on a `MediaContainerNode` with a `BitmapImage` object created via `Editor.loadBitmapImage()`.

#### Q: Can I replace any media type with `replaceMedia()`?

**A:** Currently, `replaceMedia()` only accepts `BitmapImage` objects. The original media can be any type, but replacement must be a static image.

#### Q: How do I attach custom metadata to imported images?

**A:** Use the optional `importAddOnData` parameter with `nodeAddOnData` and `mediaAddOnData` objects to store custom metadata that can be retrieved later via document sandbox APIs.
