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
      answer: 'Use the experimental `data()` method on a `BitmapImage` object to retrieve raw pixel data as an `ImageData` object.'

    - question: "What can I do with bitmap pixel data?"
      answer: "You can perform custom image processing, apply filters, analyze colors, detect edges, or implement computer vision algorithms."

    - question: "Are these APIs production-ready?"
      answer: "No, `fetchBitmapImage()` and `data()` are experimental APIs. They may change or be removed in future releases."

    - question: "How do I enable experimental APIs?"
      answer: "Set the `experimentalApis` flag to `true` in the `requirements` section of the `manifest.json`."

    - question: "What format is the pixel data returned in?"
      answer: "The `data()` method returns an `ImageData` object containing a `Uint8ClampedArray` with RGBA pixel values."

    - question: "Can I modify the pixel data and update the image?"
      answer: "Yes, you can modify the pixel data and create a new `BitmapImage` using `Editor.loadBitmapImage()` with a canvas blob."

    - question: "What is the difference between ImageRectangleNode and BitmapImage?"
      answer: "`ImageRectangleNode` is the visual node in the document; `BitmapImage` is the underlying image resource that can be shared across multiple nodes."

    - question: "How do I convert ImageData back to a BitmapImage?"
      answer: "Use a canvas to convert `ImageData` to a blob, then use `Editor.loadBitmapImage(blob)` to create a new `BitmapImage`."

    - question: "Are there performance considerations?"
      answer: "Yes, accessing and processing pixel data can be memory-intensive. Consider image dimensions and optimize your processing algorithms."
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
2. **`BitmapImage.data()`**: Accesses the raw pixel data as an `ImageData` object

## Prerequisites

Before working with bitmap data, ensure you understand:

- [Document Sandbox APIs](../platform_concepts/document-api.md)
- [Media node structure](./use_images.md#media-node-structure)
- [Async edit operations](../../../references/document-sandbox/document-apis/classes/Editor.md#queueasyncedit)

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
  if (mediaRectangle instanceof ImageRectangleNode) {
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

## Access Pixel Data

Once you have a `BitmapImage` object, you can access its raw pixel data using the experimental `data()` method. This returns an `ImageData` object similar to the Canvas API.

### Example: Read Pixel Data

```js
import { editor } from "express-document-sdk";

// Assuming you have a BitmapImage from fetchBitmapImage()
const bitmapImage = await imageRectangle.fetchBitmapImage();

// Access pixel data (experimental API)
const imageData = await bitmapImage.data();

console.log(`Width: ${imageData.width}`);
console.log(`Height: ${imageData.height}`);
console.log(`Pixel data length: ${imageData.data.length}`);

// The data property is a Uint8ClampedArray with RGBA values
// Format: [R, G, B, A, R, G, B, A, ...]
// Each pixel uses 4 bytes (Red, Green, Blue, Alpha)
const pixelCount = imageData.width * imageData.height;
console.log(`Total pixels: ${pixelCount}`);
```

### ImageData Structure

The `ImageData` object returned by `data()` contains:

- **`width`**: Image width in pixels
- **`height`**: Image height in pixels  
- **`data`**: `Uint8ClampedArray` containing pixel data in RGBA format

Each pixel is represented by 4 consecutive bytes:

- **R** (Red): 0-255
- **G** (Green): 0-255
- **B** (Blue): 0-255
- **A** (Alpha): 0-255

To access a specific pixel at coordinates (x, y):

```js
function getPixel(imageData, x, y) {
  const index = (y * imageData.width + x) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3]
  };
}

// Get pixel at (10, 20)
const pixel = getPixel(imageData, 10, 20);
console.log(`Pixel color: rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a})`);
```

## Process and Modify Pixel Data

You can modify the pixel data and create a new image with the changes. This example shows a complete workflow from reading to modifying to creating a new image.

### Example: Apply Grayscale Filter

This example demonstrates reading pixel data, applying a grayscale conversion, and creating a new image with the modified data.

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
    <button id="grayscale-btn" disabled>Apply Grayscale</button>
    <div id="message" class="message"></div>
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

  // Apply grayscale filter to selected image
  async function applyGrayscale() {
    try {
      messageDiv.style.display = "none";
      grayscaleButton.disabled = true;
      grayscaleButton.textContent = "Processing...";

      const result = await sandboxProxy.applyGrayscaleFilter();

      if (result.success) {
        grayscaleButton.textContent = "Grayscale Applied!";
        showMessage("Grayscale filter applied successfully!", "success");
        setTimeout(() => {
          grayscaleButton.textContent = "Apply Grayscale";
          grayscaleButton.disabled = false;
        }, 2000);
      } else {
        grayscaleButton.textContent = "Apply Grayscale";
        grayscaleButton.disabled = false;
        showMessage(result.error);
      }
    } catch (error) {
      console.error("Failed to apply grayscale:", error);
      grayscaleButton.textContent = "Apply Grayscale";
      grayscaleButton.disabled = false;
      showMessage("An unexpected error occurred. Please try again.");
    }
  }

  grayscaleButton.addEventListener("click", applyGrayscale);
});
```

#### Document JS

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, constants } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

runtime.exposeApi({
  async applyGrayscaleFilter() {
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
      if (!(mediaRectangle instanceof ImageRectangleNode)) {
        return {
          success: false,
          error: "Selected media is not an image."
        };
      }

      // Fetch the BitmapImage (experimental API)
      const bitmapImage = await mediaRectangle.fetchBitmapImage();

      // Get pixel data (experimental API)
      const imageData = await bitmapImage.data();

      // Apply grayscale conversion
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Calculate grayscale using luminosity method
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;     // Red
        data[i + 1] = gray; // Green
        data[i + 2] = gray; // Blue
        // Alpha (i + 3) remains unchanged
      }

      // Convert ImageData back to a Blob using canvas
      const canvas = new OffscreenCanvas(imageData.width, imageData.height);
      const ctx = canvas.getContext("2d");
      ctx.putImageData(imageData, 0, 0);
      const blob = await canvas.convertToBlob({ type: "image/png" });

      // Load the modified image as a new BitmapImage
      const newBitmapImage = await editor.loadBitmapImage(blob);

      // Replace the existing image with the grayscale version
      editor.queueAsyncEdit(() => {
        mediaContainer.replaceMedia(newBitmapImage);
      });

      return { success: true };

    } catch (error) {
      console.error("Error applying grayscale:", error);
      return {
        success: false,
        error: "Failed to process image. Please try again."
      };
    }
  }
});
```

### How the Grayscale Example Works

1. **Fetch the image**: Use `fetchBitmapImage()` to get the `BitmapImage` from the selected image node
2. **Access pixel data**: Call `data()` to retrieve the `ImageData` with raw RGBA values
3. **Process pixels**: Loop through the pixel array and apply the grayscale formula
4. **Create new image**: Use `OffscreenCanvas` to convert modified `ImageData` to a blob
5. **Load and replace**: Use `loadBitmapImage()` and `replaceMedia()` to update the document

## Advanced Use Cases

### Color Palette Extraction

Extract the dominant colors from an image:

```js
async function extractColorPalette(imageRectangle, numColors = 5) {
  const bitmapImage = await imageRectangle.fetchBitmapImage();
  const imageData = await bitmapImage.data();
  
  // Sample pixels (every 10th pixel for performance)
  const colors = [];
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 40) { // 40 = 4 bytes * 10 pixels
    colors.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2]
    });
  }
  
  // Use k-means clustering or color quantization to find dominant colors
  // (Implementation details omitted for brevity)
  
  return colors;
}
```

### Brightness Analysis

Calculate the average brightness of an image:

```js
async function calculateAverageBrightness(imageRectangle) {
  const bitmapImage = await imageRectangle.fetchBitmapImage();
  const imageData = await bitmapImage.data();
  
  let totalBrightness = 0;
  const data = imageData.data;
  const pixelCount = imageData.width * imageData.height;
  
  for (let i = 0; i < data.length; i += 4) {
    // Calculate perceived brightness
    const brightness = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    totalBrightness += brightness;
  }
  
  return totalBrightness / pixelCount; // Returns 0-255
}
```

### Custom Filter: Sepia Tone

Apply a sepia tone effect:

```js
async function applySepiaTone(imageRectangle) {
  const bitmapImage = await imageRectangle.fetchBitmapImage();
  const imageData = await bitmapImage.data();
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Sepia tone transformation
    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
  }
  
  // Convert back to blob and create new BitmapImage
  const canvas = new OffscreenCanvas(imageData.width, imageData.height);
  const ctx = canvas.getContext("2d");
  ctx.putImageData(imageData, 0, 0);
  const blob = await canvas.convertToBlob({ type: "image/png" });
  
  return await editor.loadBitmapImage(blob);
}
```

### Edge Detection

Implement a simple edge detection algorithm:

```js
async function detectEdges(imageRectangle) {
  const bitmapImage = await imageRectangle.fetchBitmapImage();
  const imageData = await bitmapImage.data();
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  
  // Create output array
  const output = new Uint8ClampedArray(data.length);
  
  // Sobel operator kernels
  const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
  const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
  
  // Apply Sobel operator (simplified)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0, gy = 0;
      
      // Convolve with Sobel kernels
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          const gray = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          gx += gray * sobelX[ky + 1][kx + 1];
          gy += gray * sobelY[ky + 1][kx + 1];
        }
      }
      
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const idx = (y * width + x) * 4;
      output[idx] = output[idx + 1] = output[idx + 2] = Math.min(255, magnitude);
      output[idx + 3] = 255; // Alpha
    }
  }
  
  // Create new ImageData with edges
  const edgeImageData = new ImageData(output, width, height);
  
  // Convert to blob
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.putImageData(edgeImageData, 0, 0);
  const blob = await canvas.convertToBlob({ type: "image/png" });
  
  return await editor.loadBitmapImage(blob);
}
```

## Performance Considerations

Working with pixel data can be memory and CPU intensive. Consider these best practices:

### 1. Check Image Dimensions

```js
const bitmapImage = await imageRectangle.fetchBitmapImage();

// Check size before processing
const pixelCount = bitmapImage.width * bitmapImage.height;
const maxPixels = 4000 * 4000; // 16 megapixels

if (pixelCount > maxPixels) {
  console.warn("Image is very large. Processing may be slow.");
  // Consider downsampling or showing a warning to the user
}
```

### 2. Use Efficient Algorithms

```js
// BAD: Creating new objects for each pixel
for (let i = 0; i < data.length; i += 4) {
  const pixel = { r: data[i], g: data[i + 1], b: data[i + 2] };
  // Process pixel...
}

// GOOD: Direct array access
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // Process values directly...
}
```

### 3. Sample Large Images

For analysis tasks, you don't always need every pixel:

```js
// Sample every 10th pixel for color analysis
const sampleRate = 10;
for (let i = 0; i < data.length; i += 4 * sampleRate) {
  // Process sampled pixel...
}
```

### 4. Use Web Workers

For intensive processing, consider using Web Workers to avoid blocking the UI:

```js
// In Document Sandbox, you can use Workers
const worker = new Worker("./image-processor-worker.js");

worker.postMessage({
  imageData: imageData,
  operation: "grayscale"
});

worker.onmessage = (event) => {
  const processedImageData = event.data;
  // Convert back to BitmapImage...
};
```

## Limitations and Considerations

### Experimental API Status

- **Subject to change**: These APIs may be modified or removed in future SDK versions
- **Limited documentation**: Full API specifications may not be available
- **Browser compatibility**: Ensure your target browsers support required features (OffscreenCanvas, etc.)

### Memory Constraints

- Large images can consume significant memory
- Consider image dimensions before processing
- Implement proper error handling for out-of-memory scenarios

### Asynchronous Operations

Both `fetchBitmapImage()` and `data()` are asynchronous:

```js
// Always use await or .then()
const bitmapImage = await imageRectangle.fetchBitmapImage();
const imageData = await bitmapImage.data();

// When creating new images, use queueAsyncEdit
const newBitmap = await editor.loadBitmapImage(blob);
editor.queueAsyncEdit(() => {
  mediaContainer.replaceMedia(newBitmap);
});
```

### Data Format

- Pixel data is always in RGBA format (4 bytes per pixel)
- Values are clamped to 0-255
- Alpha channel is included even for opaque images

## FAQs

#### Q: How do I retrieve a BitmapImage from an existing image in the document?

**A:** Use the experimental `fetchBitmapImage()` method on an `ImageRectangleNode` to retrieve the underlying `BitmapImage` resource.

#### Q: How do I access pixel data from a BitmapImage?

**A:** Use the experimental `data()` method on a `BitmapImage` object to retrieve raw pixel data as an `ImageData` object.

#### Q: What can I do with bitmap pixel data?

**A:** You can perform custom image processing, apply filters, analyze colors, detect edges, or implement computer vision algorithms.

#### Q: Are these APIs production-ready?

**A:** No, `fetchBitmapImage()` and `data()` are experimental APIs. They may change or be removed in future releases.

#### Q: How do I enable experimental APIs?

**A:** Set the `experimentalApis` flag to `true` in the `requirements` section of the `manifest.json`.

#### Q: What format is the pixel data returned in?

**A:** The `data()` method returns an `ImageData` object containing a `Uint8ClampedArray` with RGBA pixel values.

#### Q: Can I modify the pixel data and update the image?

**A:** Yes, you can modify the pixel data and create a new `BitmapImage` using `Editor.loadBitmapImage()` with a canvas blob.

#### Q: What is the difference between ImageRectangleNode and BitmapImage?

**A:** `ImageRectangleNode` is the visual node in the document; `BitmapImage` is the underlying image resource that can be shared across multiple nodes.

#### Q: How do I convert ImageData back to a BitmapImage?

**A:** Use a canvas to convert `ImageData` to a blob, then use `Editor.loadBitmapImage(blob)` to create a new `BitmapImage`.

#### Q: Are there performance considerations?

**A:** Yes, accessing and processing pixel data can be memory-intensive. Consider image dimensions and optimize your processing algorithms.
