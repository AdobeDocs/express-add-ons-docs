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
  - Bitmap
  - ImageRectangleNode
  - BitmapImage
  - Pixel Data
  - Image Processing
  - fetchBitmapImage
  - Experimental API
title: Access Bitmap Image Data
description: Access and manipulate bitmap image pixel data using experimental APIs.
contributors:
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I retrieve a BitmapImage from an existing image in the document?"
      answer: 'Use the experimental `fetchBitmapImage()` method on an `ImageRectangleNode` to retrieve the underlying `BitmapImage` resource.'

    - question: "How do I access pixel data from a BitmapImage?"
      answer: 'Use the experimental `data()` method on a `BitmapImage` object to retrieve the raw image data as a `Blob`.'

    - question: "What can I do with bitmap pixel data?"
      answer: "You can perform custom image processing, apply filters, analyze colors, detect edges, or implement computer vision algorithms."

    - question: "Are these APIs production-ready?"
      answer: "No, `fetchBitmapImage()` and `data()` are experimental APIs. They may change or be removed in future releases."

    - question: "How do I enable experimental APIs?"
      answer: "Set the `experimentalApis` flag to `true` in the `requirements` section of the `manifest.json`."
    
    - question: "How do I enable file downloads?"
      answer: "Add `allow-downloads` to the `permissions.sandbox` array in your entry point configuration in `manifest.json`."

    - question: "What format is the pixel data returned in?"
      answer: "The `data()` method returns a `Blob` containing the image data. You can convert this to `ImageData` using Canvas APIs in the iframe runtime."

    - question: "Can I modify the pixel data and update the image?"
      answer: "Yes, you can modify the pixel data and create a new `BitmapImage` using `Editor.loadBitmapImage()` with a canvas blob."

    - question: "What is the difference between ImageRectangleNode and BitmapImage?"
      answer: "`ImageRectangleNode` is the visual node in the document; `BitmapImage` is the underlying image resource that can be shared across multiple nodes."

    - question: "How do I convert ImageData back to a BitmapImage?"
      answer: "First convert the `ImageData` to a blob using Canvas APIs (in the iframe runtime), then use `Editor.loadBitmapImage(blob)` to create a new `BitmapImage` in the document sandbox."
---

# Access Bitmap Image Data

Retrieve and manipulate raw pixel data from images in the document using experimental APIs.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** These APIs are currently **_experimental only_** and should not be used in any add-ons you will be distributing until they have been declared stable. To use them, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

## Overview

Adobe Express Add-ons can now access the underlying bitmap image data from images in the document. This enables advanced use cases such as:

- **Custom image processing**: Apply filters, effects, and transformations
- **Color analysis**: Extract color palettes, detect dominant colors
- **Computer vision**: Implement edge detection, pattern recognition
- **Image manipulation**: Modify pixels directly for creative effects
- **Data extraction**: Analyze image content programmatically

This functionality is provided through two experimental APIs:

1. **`ImageRectangleNode.fetchBitmapImage()`**: Retrieves the `BitmapImage` resource from an image node
2. **`BitmapImage.data()`**: Accesses the raw image data as a `Blob`

<InlineAlert slots="text" variant="info"/>

**Important:** The `data()` method returns a `Blob`. To process pixels, you'll need to convert the blob to `ImageData` using Canvas APIs in the **iframe runtime** (not the document sandbox, which has limited Web APIs).

## Prerequisites

Before working with bitmap data, ensure you understand:

- [Document Sandbox APIs](../platform_concepts/document-api.md)
- [Media node structure](./use_images.md#media-node-structure)
- [Async edit operations](../../../references/document-sandbox/document-apis/classes/Editor.md#queueasyncedit)

### Required Manifest Configuration

To use the bitmap image APIs, you need to enable experimental APIs in your `manifest.json`:

```json
{
    "manifestVersion": 2,
    "requirements": {
        "apps": [
            {
                "name": "Express",
                "apiVersion": 1
            }
        ],
        "experimentalApis": true
    },
    "entryPoints": [
        {
            "type": "panel",
            "id": "panel1",
            "main": "index.html",
            "documentSandbox": "code.js"
        }
    ]
}
```

<InlineAlert slots="text" variant="info"/>

**Optional:** If your add-on includes download functionality, you also need to add the `allow-downloads` permission:

```json
"entryPoints": [
    {
        "type": "panel",
        "id": "panel1",
        "main": "index.html",
        "documentSandbox": "code.js",
        "permissions": {
            "sandbox": ["allow-downloads"]
        }
    }
]
```

## Retrieve BitmapImage from Document

The `fetchBitmapImage()` method allows you to retrieve the underlying `BitmapImage` resource from an `ImageRectangleNode` that already exists in the document.

<InlineAlert slots="text" variant="info"/>

This is a **Document Sandbox API** operation (in the `sandbox/code.js` file), not an iframe operation.

### Example: Fetch BitmapImage from Selected Image

```js
import { editor, constants } from "express-document-sdk";

// Get the selected node
const selectedNode = editor.context.selection[0];

// Verify it's a MediaContainerNode
if (selectedNode.type === constants.SceneNodeType.mediaContainer) {
  const mediaContainer = selectedNode;
  const mediaRectangle = mediaContainer.mediaRectangle;
  
  // Check if it's an ImageRectangleNode (not video or other media)
  if (mediaRectangle.type === constants.SceneNodeType.imageRectangle) {
    // Fetch the underlying BitmapImage (experimental API)
    const bitmapImage = await mediaRectangle.fetchBitmapImage();
    
    console.log(`Image dimensions: ${bitmapImage.width}x${bitmapImage.height}`);
  }
}
```

### Understanding the Media Node Structure

When working with images in Adobe Express, it's important to understand the node hierarchy:

```text
MediaContainerNode (selected node)
├── maskShape          → FillableNode (defines visible crop area)
└── mediaRectangle     → ImageRectangleNode (the actual image)
    └── BitmapImage    → Underlying image resource
```

To access the `BitmapImage`, you need to:

1. Get the `MediaContainerNode` (usually from selection)
2. Access its `mediaRectangle` property
3. Call `fetchBitmapImage()` on the `ImageRectangleNode`

## Access Image Data as Blob

Once you have a `BitmapImage` object, you can access its raw image data using the experimental `data()` method. This returns a `Blob` object containing the image data.

### Example: Read Image Data

```js
import { editor } from "express-document-sdk";

// Building on the previous example, after fetching the BitmapImage:
// const bitmapImage = await imageRectangle.fetchBitmapImage();

// Access image data (experimental API)
const blob = await bitmapImage.data();

console.log(`Width: ${bitmapImage.width}`);
console.log(`Height: ${bitmapImage.height}`);
console.log(`Blob size: ${blob.size} bytes`);
console.log(`Blob type: ${blob.type}`);
```

### Blob vs ImageData

The `data()` method returns a `Blob`, not `ImageData`. To process individual pixels:

1. **In the Document Sandbox**: You can access `blob.size`, `blob.type`, `blob.arrayBuffer()`, `blob.text()`, and `blob.slice()`
2. **For pixel manipulation**: Send the blob to the iframe runtime where you have access to Canvas APIs to convert it to `ImageData`

<InlineAlert slots="text" variant="warning"/>

**Document Sandbox Limitations:** The document sandbox has limited Web APIs. To process pixels, you must:
1. Fetch the blob in the document sandbox
2. Send it to the iframe runtime via your API proxy
3. Use Canvas APIs (available in iframe) to convert blob → ImageData
4. Process the pixels
5. Convert back to blob and optionally send to document sandbox

## Process and Display Image Data

You can process the blob data and display previews in the UI. This example shows a complete workflow using the correct runtime for each operation.

<InlineAlert slots="text" variant="info"/>

**Architecture**: Bitmap manipulation requires coordination between two runtimes:
- **Document Sandbox**: Has access to document APIs (`fetchBitmapImage`, `data()`) but limited Web APIs
- **Iframe Runtime**: Has full browser APIs (Canvas, URL, Image) but no direct document access

### Example: Grayscale Filter with Preview

This example demonstrates fetching image data from the document and processing it in the iframe runtime to show a before/after preview.

<CodeBlock slots="heading, code" repeat="4" languages="HTML, CSS, iFrame JS, Document JS"/>

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Grayscale Filter</title>
</head>
<body>
  <div class="container">
    <h3>Image Processing</h3>
    <button id="grayscale-btn" disabled>Show Grayscale Preview</button>
    <div id="message" class="message"></div>
    <div id="preview" class="preview"></div>
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
  gap: 16px;
}

h3 {
  font-family: sans-serif;
  color: rgb(51, 51, 51);
  margin: 0;
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

.message {
  font-family: sans-serif;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  display: none;
}

.message.error {
  background-color: rgb(255, 240, 240);
  color: rgb(200, 0, 0);
  border: 1px solid rgb(255, 200, 200);
}

.message.success {
  background-color: rgb(240, 255, 240);
  color: rgb(0, 150, 0);
  border: 1px solid rgb(200, 255, 200);
}

.preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.preview img {
  max-width: 100%;
  border: 2px solid rgb(200, 200, 200);
  border-radius: 8px;
}
```

#### iFrame JS

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const { runtime } = addOnUISdk.instance;

  // Get the Document Sandbox proxy
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Get UI elements
  const grayscaleButton = document.getElementById("grayscale-btn");
  const messageDiv = document.getElementById("message");
  const previewDiv = document.getElementById("preview");

  // Enable the button once ready
  grayscaleButton.disabled = false;

  // Function to show messages
  function showMessage(text, type = "error") {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    if (type === "success") {
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 3000);
    }
  }

  // Apply grayscale filter and show preview
  async function showGrayscalePreview() {
    try {
      messageDiv.style.display = "none";
      previewDiv.innerHTML = "";
      grayscaleButton.disabled = true;
      grayscaleButton.textContent = "Processing...";

      // Step 1: Fetch bitmap from document sandbox
      console.log("Fetching bitmap from document sandbox...");
      const result = await sandboxProxy.fetchBitmapFromSelectedImage();

      if (!result.success) {
        showMessage(result.error);
        grayscaleButton.textContent = "Show Grayscale Preview";
        grayscaleButton.disabled = false;
        return;
      }

      const originalBlob = result.blob;

      // Step 2: Process in iframe runtime (has Canvas APIs)
      console.log("Processing image in iframe runtime...");
      
      // Convert blob to Image using URL API (available in iframe)
      const objectUrl = URL.createObjectURL(originalBlob);
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = objectUrl;
      });

      // Use Canvas to process pixels (available in iframe)
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get ImageData and apply grayscale
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);
      URL.revokeObjectURL(objectUrl);

      // Convert to blob for display
      const grayscaleBlob = await new Promise(resolve => {
        canvas.toBlob(resolve, "image/png");
      });

      // Step 3: Display before/after preview
      const originalDataUrl = URL.createObjectURL(originalBlob);
      const grayscaleDataUrl = URL.createObjectURL(grayscaleBlob);

      previewDiv.innerHTML = `
        <div>
          <h4>Original</h4>
          <img src="${originalDataUrl}" />
        </div>
        <div>
          <h4>Grayscale</h4>
          <img src="${grayscaleDataUrl}" />
        </div>
      `;

      grayscaleButton.textContent = "Show Grayscale Preview";
      grayscaleButton.disabled = false;
      showMessage("Preview generated! (Changes not applied to document)", "success");

    } catch (error) {
      console.error("Failed to process image:", error);
      grayscaleButton.textContent = "Show Grayscale Preview";
      grayscaleButton.disabled = false;
      showMessage("An unexpected error occurred. Please try again.");
    }
  }

  grayscaleButton.addEventListener("click", showGrayscalePreview);
});
```

#### Document JS

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, constants } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

runtime.exposeApi({
  async fetchBitmapFromSelectedImage() {
    try {
      // Validate selection
      if (!editor.context.hasSelection) {
        return {
          success: false,
          error: "No image selected. Please select an image first."
        };
      }

      const selectedNode = editor.context.selection[0];
      
      // Check if it's a MediaContainerNode
      if (selectedNode.type !== constants.SceneNodeType.mediaContainer) {
        return {
          success: false,
          error: "Selected node is not an image. Please select an image."
        };
      }

      const mediaContainer = selectedNode;
      const mediaRectangle = mediaContainer.mediaRectangle;

      // Verify it's an ImageRectangleNode (not video)
      if (mediaRectangle.type !== constants.SceneNodeType.imageRectangle) {
        return {
          success: false,
          error: "Selected media is not an image."
        };
      }

      // Fetch the BitmapImage (experimental API)
      const bitmapImage = await mediaRectangle.fetchBitmapImage();

      // Get image data as Blob (experimental API)
      const blob = await bitmapImage.data();

      // Return blob to iframe runtime for processing
      // (Document sandbox lacks Canvas, URL, Image APIs)
      return { 
        success: true, 
        blob: blob
      };

    } catch (error) {
      console.error("Error fetching bitmap:", error);
      return {
        success: false,
        error: "Failed to fetch image. Please try again."
      };
    }
  }
});
```

### How the Grayscale Example Works

1. **Fetch in Document Sandbox**: Use `fetchBitmapImage()` and `data()` to get the image as a `Blob`
2. **Send to Iframe**: Return the blob via the API proxy to the iframe runtime
3. **Process in Iframe**: Use Canvas APIs (available in iframe) to convert blob → ImageData and apply grayscale
4. **Display Preview**: Show before/after comparison in the UI
5. **Future**: New Document APIs will be available soon to apply processed images back to the document

<InlineAlert slots="text" variant="warning"/>

**Note:** This example shows a **preview-only workflow**. Additional Document APIs are being developed to enable applying processed images back to the document from the document sandbox.

## Additional Use Cases

### Image Metadata Extraction

Extract basic image information in the document sandbox:

```js
async function analyzeImage(imageRectangle) {
  const bitmapImage = await imageRectangle.fetchBitmapImage();
  const blob = await bitmapImage.data();
  
  return {
    width: bitmapImage.width,
    height: bitmapImage.height,
    aspectRatio: (bitmapImage.width / bitmapImage.height).toFixed(3),
    pixelCount: bitmapImage.width * bitmapImage.height,
    megapixels: ((bitmapImage.width * bitmapImage.height) / 1000000).toFixed(2),
    fileSize: blob.size,
    fileSizeKB: (blob.size / 1024).toFixed(2),
    mimeType: blob.type
  };
}
```

### Download Processed Image

Allow users to download processed images from the iframe runtime.

<InlineAlert slots="text" variant="warning"/>

**Permission Required:** Add `"sandbox": ["allow-downloads"]` to the `permissions` section of your entry point in `manifest.json`.

```js
// In iframe runtime (has URL and download APIs)
async function downloadGrayscaleImage() {
  // Fetch bitmap from document sandbox
  const result = await sandboxProxy.fetchBitmapFromSelectedImage();
  
  if (!result.success) {
    console.error(result.error);
    return;
  }
  
  // Process in iframe
  const grayscaleBlob = await applyGrayscaleToBlob(result.blob);
  
  // Trigger download
  const url = URL.createObjectURL(grayscaleBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "grayscale-image.png";
  a.click();
  URL.revokeObjectURL(url);
}

async function applyGrayscaleToBlob(blob) {
  const objectUrl = URL.createObjectURL(blob);
  const img = new Image();
  
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = objectUrl;
  });
  
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  
  ctx.putImageData(imageData, 0, 0);
  URL.revokeObjectURL(objectUrl);
  
  return new Promise(resolve => {
    canvas.toBlob(resolve, "image/png");
  });
}
```

### Send to External API

Send bitmap data to an external image processing service:

```js
// In iframe runtime (has fetch API)
async function sendToImageProcessingService() {
  // Fetch bitmap from document sandbox
  const result = await sandboxProxy.fetchBitmapFromSelectedImage();
  
  if (!result.success) {
    console.error(result.error);
    return;
  }
  
  // Send to external API
  const formData = new FormData();
  formData.append("image", result.blob, "image.png");
  
  const response = await fetch("https://api.example.com/process", {
    method: "POST",
    body: formData
  });
  
  const processedImageBlob = await response.blob();
  console.log("Processed image received:", processedImageBlob.size, "bytes");
  
  // Future: New Document APIs will enable applying processed images back to the document
}
```

## Limitations and Considerations

### Experimental API Status

- **Subject to change**: These APIs may be modified or removed in future SDK versions
- **Limited documentation**: Full API specifications may not be available
- **Production readiness**: Not recommended for production add-ons until declared stable

### Document Sandbox Limitations

The document sandbox has **limited Web APIs**:

✅ **Available**:
- `console` methods (log, info, warn, error, debug, assert, clear)
- `Blob` API (size, type, arrayBuffer(), text(), slice())
- Standard JavaScript (Date, Math, JSON, Array, Object, etc.)
- Express Document SDK APIs

❌ **NOT Available**:
- `URL` / `URL.createObjectURL()`
- `Image` / `HTMLImageElement`
- `Canvas` / `OffscreenCanvas`
- `fetch()` / `XMLHttpRequest`
- `setTimeout()` / `setInterval()`
- Web Workers
- DOM APIs

<InlineAlert slots="text" variant="warning"/>

**Important**: To process pixels, you MUST use the **iframe runtime** which has full Canvas APIs. Fetch the blob in the document sandbox, send it to the iframe via your API proxy, and process it there.

### Memory Constraints

- Large images can consume significant memory
- Consider image dimensions before processing
- Implement proper error handling for out-of-memory scenarios

### Asynchronous Operations

Both `fetchBitmapImage()` and `data()` are asynchronous:

```js
// Always use await
const bitmapImage = await imageRectangle.fetchBitmapImage();
const blob = await bitmapImage.data();
```

### Applying Changes Back to the Document

Currently, you can fetch and process image data, but **applying processed images back to the document is not yet available**:

- ✅ You can fetch and process image data
- ✅ You can show previews, download, or send to external services
- ❌ You **cannot yet** apply processed images back to the document

**Coming Soon:** New Document APIs are being developed to enable applying modified images back to the document directly from the document sandbox, making it easier to implement image editing workflows.

## FAQs

#### Q: How do I retrieve a BitmapImage from an existing image in the document?

**A:** Use the experimental `fetchBitmapImage()` method on an `ImageRectangleNode` to retrieve the underlying `BitmapImage` resource.

#### Q: How do I access pixel data from a BitmapImage?

**A:** Use the experimental `data()` method on a `BitmapImage` object to retrieve the raw image data as a `Blob`. To process individual pixels, send the blob to the iframe runtime and use Canvas APIs to convert it to `ImageData`.

#### Q: What can I do with bitmap pixel data?

**A:** You can create image processing previews, apply filters, analyze properties, extract colors, generate thumbnails, or send data to external APIs. Additional Document APIs are being developed to enable applying changes back to the document.

#### Q: Are these APIs production-ready?

**A:** No, `fetchBitmapImage()` and `data()` are experimental APIs. They may change or be removed in future releases.

#### Q: How do I enable experimental APIs?

**A:** Set the `experimentalApis` flag to `true` in the `requirements` section of the `manifest.json`.

#### Q: How do I enable file downloads?

**A:** Add `"allow-downloads"` to the `permissions.sandbox` array in your entry point configuration in `manifest.json`. For example:

```json
"entryPoints": [
    {
        "type": "panel",
        "id": "panel1",
        "main": "index.html",
        "documentSandbox": "code.js",
        "permissions": {
            "sandbox": ["allow-downloads"]
        }
    }
]
```

#### Q: What format is the pixel data returned in?

**A:** The `data()` method returns a `Blob` containing the image data. You can convert this to `ImageData` using Canvas APIs in the iframe runtime.

#### Q: Can I modify the pixel data and update the image?

**A:** You can fetch and modify pixel data for preview, download, or external processing. New Document APIs are being developed to enable applying processed images back to the document.

#### Q: What is the difference between ImageRectangleNode and BitmapImage?

**A:** `ImageRectangleNode` is the visual node in the document; `BitmapImage` is the underlying image resource that can be shared across multiple nodes.

#### Q: How do I convert ImageData back to a BitmapImage?

**A:** First convert the `ImageData` to a blob using Canvas APIs (in the iframe runtime), then use `Editor.loadBitmapImage(blob)` to create a new `BitmapImage` in the document sandbox.
