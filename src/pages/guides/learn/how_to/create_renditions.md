---
keywords:
  - Adobe Express Add-on SDK
  - JavaScript
  - createRenditions
  - createRendition
  - RenditionFormat
  - RenditionIntent
  - RenditionOptions
  - CreateRenditionOptions
  - CreateRenditionResult
  - CreateRenditionFormat
  - exportAllowed
  - isPresentation
  - file download
  - export
  - preview
  - print
  - addOnUISdk
  - app.document
  - exporting
  - output
  - PNG
  - PDF
  - PPTX
  - MP4
  - JPEG
  - document publishing
  - VisualNode
  - document sandbox
  - element rendition
  - node rendition
title: Create Renditions
description: Learn how to export Adobe Express documents and individual elements in different formats like JPG, PNG, PDF, and PPTX using the createRenditions API and VisualNode.createRendition().
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I create a rendition?"
      answer: "Call `addOnUISdk.app.document.createRenditions(options, intent)` to export pages in different formats, or use `VisualNode.createRendition()` in the Document Sandbox to capture individual elements."

    - question: "What file formats are supported?"
      answer: "JPG, PNG, MP4, PDF, and PPTX formats via `addOnUISdk.constants.RenditionFormat`. For element-level renditions in the Document Sandbox, PNG and JPEG are supported via `CreateRenditionFormat`. See the [RenditionFormat constants](../../../references/addonsdk/addonsdk-constants.md) for more details."

    - question: "How do I export content for download?"
      answer: "Create rendition, convert blob to URL with `URL.createObjectURL()`, then use anchor element to trigger download."

    - question: "What permissions are needed for downloads?"
      answer: 'Add `"allow-downloads"` to the `"sandbox"` array in manifest permissions.'

    - question: "Should I check export permissions before creating renditions?"
      answer: "Yes, always call `await addOnUISdk.app.document.exportAllowed()` before using `RenditionIntent.export` or `RenditionIntent.print` to avoid approval error dialogs."

    - question: "When do I need to check exportAllowed()?"
      answer: "Check before creating renditions with `RenditionIntent.export` or `RenditionIntent.print`. Preview renditions with `RenditionIntent.preview` are always allowed."

    - question: "What happens if I don't check export permissions first?"
      answer: 'Users may see error dialogs like "Request approval" and "Get approval from your viewers before sharing this file" in collaborative workflows.'

    - question: "What should I do when export is not allowed?"
      answer: "Create preview renditions instead using `RenditionIntent.preview`, show informational messages, and display content in UI only without download options."

    - question: "What is the preview intent for?"
      answer: "Preview intent creates renditions for processing or display only, not for download or sharing."

    - question: "How do I set JPG quality?"
      answer: "Use `quality` property (0-1 range) in `JpgRenditionOptions`."

    - question: "What's required for preview intent?"
      answer: 'Set `"renditionPreview": true` in manifest requirements section.'

    - question: "How do I export the current page only?"
      answer: "Use `range: addOnUISdk.constants.Range.currentPage` in rendition options."

    - question: "How do I create a rendition of a specific element?"
      answer: "Use the experimental `VisualNode.createRendition()` method in the Document Sandbox to generate PNG or JPEG renditions of individual nodes and their descendants."

    - question: "What's the difference between createRenditions and VisualNode.createRendition?"
      answer: "`createRenditions` (Add-on UI SDK) exports entire pages or documents. `VisualNode.createRendition()` (Document Sandbox) captures individual elements like shapes, groups, or text nodes."

    - question: "When should I use isPresentation()?"
      answer: "Use `isPresentation()` before offering PPTX export. PPTX is only available for presentation-type documents; when it returns false, hide or disable the PPTX option. Requires `experimentalApis` in manifest."
---

# Create Renditions

Renditions are different output versions of a document or element made for specific purposes; for example, a high-quality PDF for printing, a smaller JPG for sharing online, a PNG snapshot of a specific design element, or a PPTX export for presenting in meetings or editing in PowerPoint or Google Slides.

## What Are Renditions Used For?

- Download and sharing
- Preview and processing
- Print preparation
- Document publishing
- Cross-platform compatibility
- Element thumbnails and snapshots

## Two Approaches for Creating Renditions 

Adobe Express add-ons support two approaches for creating renditions:

1. **Page/Document Renditions** (Add-on UI SDK): Export entire pages or documents in various formats (JPG, PNG, MP4, PDF, PPTX) using [`addOnUISdk.app.document.createRenditions()`](#basic-usage).
2. **Element-Level Renditions** (Document Sandbox): Capture individual visual elements and their descendants as PNG or JPEG using [`VisualNode.createRendition()`](#element-level-renditions-document-sandbox) *(experimental)*.

## Quick Start

The following snippet shows the basic API call to create a rendition for download (export intent) of the current page in PNG format. This is the core method - see the [complete example](#example) below for a full implementation with permissions, error handling, and file download.

```js
// Basic rendition creation - core API call
const rendition = await addOnUISdk.app.document.createRenditions(
  // renditionOptions
  {
    range: addOnUISdk.constants.Range.currentPage,
    format: addOnUISdk.constants.RenditionFormat.png,
  },
  // renditionIntent
  addOnUISdk.constants.RenditionIntent.export
);

// rendition[0].blob contains the generated file data
console.log("Generated:", rendition[0].blob.type); // "image/png"
```

## Basic Usage

The [`createRenditions`](../../../references/addonsdk/app-document.md#createrenditions) method is used to create renditions of the current page or the entire document in different formats. The method accepts two parameters:

1. [`renditionOptions`](../../../references/addonsdk/app-document.md#renditionoptions): controls the [page range](#page-ranges) that is meant to be exported and the [file format](#supported-formats).
2. [`renditionIntent`](../../../references/addonsdk/addonsdk-constants.md) constant (optional): controls the [intent](#rendition-intents) of the rendition (e.g. `RenditionIntent.export`).

### Supported Formats

Export your designs as:

- JPG - "image/jpeg" - Optimized for photos and social media
- PNG - "image/png" - Perfect for graphics with transparency
- MP4 - "video/mp4" - For video content
- PDF - "application/pdf" - Professional documents and printing
- PPTX - "application/vnd.openxmlformats-officedocument.presentationml.presentation" - PowerPoint presentations

The [RenditionFormat constants](../../../references/addonsdk/addonsdk-constants.md) can be used to set the format of the rendition over the MIME types specifically (e.g. `RenditionFormat.jpg`).

### PPTX Export and Document Type

PPTX export is only available for presentation-type documents. Call [`isPresentation()`](../../../references/addonsdk/app-document.md#ispresentation) before offering the PPTX format to users. When it returns `false`, hide or disable the PPTX export option.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The `isPresentation()` method is currently *experimental only* and requires the `experimentalApis` flag set to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of `manifest.json`.

```js
// Only offer PPTX export when the document is a presentation
const isPresentation = await addOnUISdk.app.document.isPresentation();

if (isPresentation) {
  // Show PPTX option and create rendition when selected
  const rendition = await addOnUISdk.app.document.createRenditions(
    {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.pptx,
    },
    addOnUISdk.constants.RenditionIntent.export
  );
  // ... trigger download
} else {
  // Hide PPTX option or show message that PPTX is only available for presentations
}
```

### Page Ranges

Target specific content:

- `currentPage` - Export just the current page
- `entireDocument` - Export all pages

The [Range constants](../../../references/addonsdk/addonsdk-constants.md) can be used to set the range of the rendition (e.g. `Range.currentPage`).

### Rendition Intents

Control how the content is used:

- `export` - For download and sharing
- `preview` - For display only (no download)
- `print` - For printing workflows

The [RenditionIntent constants](../../../references/addonsdk/addonsdk-constants.md) can be used to set the intent of the rendition (e.g. `RenditionIntent.export`).

## Export Permissions and Collaborative Workflows

The `exportAllowed()` method determines whether the current document can be exported based on its review status in collaborative workflows. This applies to [enterprise customers using Adobe Express's review and approval features](https://business.adobe.com/products/workfront/integrations/express.html), where documents may be restricted from export until approved by designated reviewers.

Before creating renditions for export or print purposes, you can check that it's permitted first using the [`exportAllowed()`](../../../references/addonsdk/app-document.md#exportallowed) method:

```js
// Check export permissions before creating non-preview renditions
const canExport = await addOnUISdk.app.document.exportAllowed();

if (!canExport) {
  // Export/print not allowed, but preview renditions are still permitted
  console.log("Export restricted - only preview available");

  // Create preview rendition (always allowed)
  const previewRendition = await addOnUISdk.app.document.createRenditions(
    { range: addOnUISdk.constants.Range.currentPage, format: addOnUISdk.constants.RenditionFormat.png },
    addOnUISdk.constants.RenditionIntent.preview
  );
  // ... show in UI only, don't allow download
  return;
}

// Proceed with export renditions if allowed
```

<InlineAlert slots="text" variant="info"/>

**Important:** This check is only necessary for `RenditionIntent.export` and `RenditionIntent.print` for documents that are under review. Renditions created with `RenditionIntent.preview` are always allowed, regardless of the document's review status.

**Why check export permissions first?** If you skip this check and attempt to create export/print renditions when the document doesn't allow exports, users may see an error message such as "Request approval" and "Get approval from your viewers before sharing this file". Checking `exportAllowed()` first lets you provide a better user experience by either offering preview-only options or explaining why export is restricted.

<InlineAlert slots="text" variant="info"/>

To allow the user to download the rendition, the **"permissions"** section should include `"allow-downloads"` in the `"sandbox"` array.

```json
{
  "testId": "cbe48204-578d-47cc-9ad4-a9aaa81dc3d3",
  "name": "Hello World", "version": "1.0.0", "manifestVersion": 2,
  "requirements": {
    "apps": [ { "name": "Express", "apiVersion": 1 } ],
  },
  "entryPoints": [
    {
      "type": "panel", "id": "panel1", "main": "index.html",
      "documentSandbox": "sandbox/code.js",
      "permissions": {
        "sandbox": [
          "allow-popups-to-escape-sandbox",
          "allow-popups",
          "allow-downloads" 👈 👀
        ]
      }
    }
  ]
}
```

## The Preview Intent

When the `renditionIntent` is set to `RenditionIntent.preview`, the output is created for **preview purposes only**. This means that the rendition is not meant to be downloaded or shared; for example, because the user is not on a paid Adobe Express plan and the design contains Premium content.

In this case, preview renditions are used either for processing purposes (e.g., if the add-on needs to perform data analysis on the design), or to be displayed in the add-on's panel or in a new window—making sure users cannot extract the content. Please see [this page](./premium_content.md#allow-only-the-preview-of-premium-content) for more detail on handling such scenarios.

<InlineAlert slots="text" variant="info"/>

When the `renditionIntent` is set to `RenditionIntent.preview`, you must add to the `manifest.json` a `"renditionPreview"` flag set to `true` in the **"requirements"** section.

```json
{
  "testId": "cbe48204-578d-47cc-9ad4-a9aaa81dc3d3",
  "name": "Hello World", "version": "1.0.0", "manifestVersion": 2,
  "requirements": {
    "apps": [ { "name": "Express", "apiVersion": 1 } ],
    "renditionPreview": true 👈 👀
  },
  "entryPoints": [
    // ...
  ]
}
```

## Export and Download Workflow

Use the `createRenditions` method to allow users to download or share your content in different formats. This is a multi-step process that involves:

1. **Creating a new rendition** based on specific export configuration options via the [`createRenditions()`](../../../references/addonsdk/app-document.md#createrenditions) method of the `addOnUISdk.app.document` object.
2. **Converting** the returned `blob` object into a URL via the `URL.createObjectURL()` method.
3. **Creating a downloadable link** for the user to download the rendition, e.g., using the URL string from the previous step as the `href` attribute of an `<a>` element.

### Example

This complete example builds on the [Quick Start](#quick-start) above by adding production-ready features: permission checks, error handling, [export restrictions](#export-permissions-and-collaborative-workflows), and file downloads. The example creates a PNG rendition of the current page when the user clicks a button.

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  // Attach the rendition creation to a button click event
  document
    .querySelector("#download-button")
    .addEventListener("click", async () => {
      // Check if export is allowed (prevents "Request approval" error dialog)
      const canExport = await addOnUISdk.app.document.exportAllowed();

      if (!canExport) {
        try {
            // Show informational message for preview
            let dialogOptions = {
              variant: "information",
              title: "Requires approval",
              description:
                "Content export/download is restricted while the document is under review and requires approval. Showing preview instead.",
              buttonLabels: { primary: "Ok", cancel: "Cancel" },
            };
            const result = await addOnUISdk.app.showModalDialog(dialogOptions);
            console.log("Button type clicked " + result.buttonType);
        } catch (error) {
            console.log("Error showing modal dialog:", error);
        }

        // Create preview rendition (always allowed). You will need to add the `"renditionPreview"` flag to the `manifest.json` file in order to create preview renditions.
        const previewRendition = await addOnUISdk.app.document.createRenditions(
          {
            range: addOnUISdk.constants.Range.currentPage,
            format: addOnUISdk.constants.RenditionFormat.png,
          },
          addOnUISdk.constants.RenditionIntent.preview
        );

        // Display preview in UI only (don't trigger download)
        const previewUrl = URL.createObjectURL(previewRendition[0].blob);
        const img = document.createElement("img");
        img.src = previewUrl;
        document.body.appendChild(img);
        return;
      }

      // Create a rendition for download (export intent)
      const rendition = await addOnUISdk.app.document.createRenditions(
        // renditionOptions
        {
          range: addOnUISdk.constants.Range.currentPage,
          format: addOnUISdk.constants.RenditionFormat.png,
        },
        // renditionIntent
        addOnUISdk.constants.RenditionIntent.export
      );

      console.log("Renditions created: ", rendition);
      // [{
      //   type: "page",
      //   blob: { size: 16195, type: "image/png" },
      //   title: "",
      //   metadata: { ... },
      // }];

      // Convert the blob into a URL to be consumed by an anchor element
      const downloadUrl = URL.createObjectURL(rendition[0].blob);

      // Create a temp/disposable anchor element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl; // Set the URL
      a.download = "Preview_rendition.png"; // Set the desired file name
      document.body.appendChild(a); // Add the anchor to the DOM
      a.click(); // Trigger the download
      document.body.removeChild(a); // Clean up
      URL.revokeObjectURL(downloadUrl); // Release the object URL
    });
});
```

<InlineAlert slots="text" variant="info"/>

For more details and example code, see the [`createRenditions()`](../../../references/addonsdk/app-document.md#createrenditions) API References.

## Advanced Rendition Options

The Adobe Express Add-on SDK provides **specialized rendition options** for different file formats, such as [`JpgRenditionOptions`](../../../references/addonsdk/app-document.md#jpgrenditionoptions), [`PngRenditionOptions`](../../../references/addonsdk/app-document.md#pngrenditionoptions), [`PdfRenditionOptions`](../../../references/addonsdk/app-document.md#pdfrenditionoptions), and [`PptxRenditionOptions`](../../../references/addonsdk/app-document.md#pptxrenditionoptions). Each format has specific properties that can be set to control the output of the rendition.

<InlineAlert slots="text" variant="info"/>

**Note:** When `renditionIntent` is not specified in the examples below, it defaults to `RenditionIntent.export`. This means the renditions are created for download and sharing purposes.

### JPG Quality and Size Options

The following example shows how to create a rendition of the current page in JPG format with a quality of 85% and a requested size of 600x600 pixels.

```js
const jpgRendition = await addOnUISdk.app.document.createRenditions(
  // JpgRenditionOptions
  {
    range: addOnUISdk.constants.Range.currentPage,
    format: addOnUISdk.constants.RenditionFormat.jpg,
    // number in the range [0, 1]
    quality: 0.85,
    // no upscaling, result depends on the original image size/ratio
    requestedSize: { width: 600, height: 600 },
  }
);
```

### PNG Transparency and File Size Limits

The example below shows how to create a rendition of the current page in PNG format with a transparent background, a strict file size limit of 500KB, and a requested size of 800x600 pixels.

```js
const pngRendition = await addOnUISdk.app.document.createRenditions(
  // PngRenditionOptions
  {
    range: addOnUISdk.constants.Range.currentPage,
    format: addOnUISdk.constants.RenditionFormat.png,
    // Transparent background for web overlays
    backgroundColor: 0x00000000,
    // Strict file size limit for fast web loading
    fileSizeLimit: 500,
    fileSizeLimitUnit: addOnUISdk.constants.FileSizeLimitUnit.KB,
    // Web-friendly dimensions
    requestedSize: { width: 800, height: 600 },
  }
);
```

### PDF Bleed Settings

Use the `bleed` and `margin` properties from the `PdfRenditionOptions` interface to control the bleed and margin of the PDF rendition, as shown in the example below.

```js
const pdfRendition = await addOnUISdk.app.document.createRenditions(
  // PdfRenditionOptions
  {
    range: addOnUISdk.constants.Range.currentPage,
    format: addOnUISdk.constants.RenditionFormat.pdf,
    bleed: { amount: 5, unit: addOnUISdk.constants.BleedUnit.mm },
  }
);
```

### PPTX Multi-Page Export

The following example shows how to create a rendition of the entire document in PPTX format.

```js
const pptxRenditions = await addOnUISdk.app.document.createRenditions(
  // PptxRenditionOptions
  {
    range: addOnUISdk.constants.Range.entireDocument,
    format: addOnUISdk.constants.RenditionFormat.pptx,
  }
);
```

<InlineAlert slots="text1, text2" variant="info"/>

**PPTX Export Considerations:** PPTX export is only available for presentation-type documents in Adobe Express. When implementing PPTX export in your add-on, consider informing users that fonts from Adobe Express might look different in PowerPoint, and that videos, audio, presenter notes, and animations will not be included in the exported file. Adobe Express displays a similar disclaimer when users download PPTX files directly from the app, shown below:

![PPTX export disclaimer in Adobe Express](images/export-ppt-font-disclaimer.png)

Please also check out the [export-sample add-on](../samples.md#export-sample) for a complete add-on sample using `createRenditions()`.

## Element-Level Renditions (Document Sandbox)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The `VisualNode.createRendition()` method is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

In addition to exporting entire pages or documents, you can generate renditions of **individual visual elements** directly from the Document Sandbox using [`VisualNode.createRendition()`](../../../references/document-sandbox/document-apis/classes/VisualNode.md#createrendition).

### When to Use Element-Level Renditions

- Capture a specific shape, group, or text element without surrounding content
- Generate thumbnails of individual design components
- Export selected elements for processing or analysis

### Key Differences from Page Renditions

| Feature | `addOnUISdk.app.document.createRenditions()` | `VisualNode.createRendition()` |
|---------|---------------------------------------------|-------------------------------|
| **Runtime** | Add-on UI SDK (iframe) | Document Sandbox |
| **Scope** | Entire pages or documents | Individual nodes and descendants |
| **Formats** | JPG, PNG, MP4, PDF, PPTX | PNG, JPEG only |
| **Background** | Includes page background | Transparent (node content only) |

### Basic Usage

```js
import { editor, CreateRenditionFormat } from "express-document-sdk";

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 100;
editor.context.insertionParent.children.append(rectangle);

// Generate a PNG rendition of the node
const result = await rectangle.createRendition({
  format: CreateRenditionFormat.png,
  scale: 2  // 2x scale for higher resolution
});

if (result.blob) {
  console.log("Rendition type:", result.blob.type);  // "image/png"
  console.log("Rendition size:", result.blob.size);
}
```

### Options and Result

**[`CreateRenditionOptions`](../../../references/document-sandbox/document-apis/interfaces/CreateRenditionOptions.md):**

| Property | Type | Description |
|----------|------|-------------|
| `format` | [`CreateRenditionFormat`](../../../references/document-sandbox/document-apis/namespaces/Constants/enumerations/CreateRenditionFormat.md) | Output format: `png` (default) or `jpeg` |
| `scale` | `number` | Scale factor applied before rendering (e.g., `2` for 2x resolution) |

**[`CreateRenditionResult`](../../../references/document-sandbox/document-apis/interfaces/CreateRenditionResult.md):**

| Property | Type | Description |
|----------|------|-------------|
| `blob` | `Blob` | The PNG or JPEG image data |
| `drawBoundsGlobal` | [`Rect`](../../../references/document-sandbox/document-apis/interfaces/Rect.md) | Global bounds accounting for rotations, borders, and effects. Only provided if node is attached to the document. |

### Example: Capture Selected Elements

```js
import { editor, CreateRenditionFormat } from "express-document-sdk";

const selection = editor.context.selection;
if (selection.length === 0) {
  console.log("No elements selected");
  return;
}

for (const node of selection) {
  const result = await node.createRendition({
    format: CreateRenditionFormat.png,
    scale: 1
  });
  
  if (result.blob) {
    console.log(`Captured ${node.type}: ${result.blob.size} bytes`);
  }
}
```

### Important Considerations

- **Image loading timeout**: The method waits up to 20 seconds for images to load before throwing an error.
- **Transparent background**: Element renditions capture only the node content with a transparent background.
- **Descendants included**: The rendition includes the node and all its descendants.

### Sending Renditions to the UI

Pass blob data through the [Communication APIs](../../../references/document-sandbox/communication/index.md) to use renditions in your UI:

**Document Sandbox (`code.js`):**

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, CreateRenditionFormat } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

runtime.exposeApi({
  async captureCurrentSelection() {
    const selection = editor.context.selection;
    if (selection.length === 0) return null;
    
    const result = await selection[0].createRendition({
      format: CreateRenditionFormat.png,
      scale: 1
    });
    return result.blob;
  }
});
```

**UI Code:**

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const sandboxApi = await addOnUISdk.instance.runtime.apiProxy("documentSandbox");
  
  document.querySelector("#capture-btn").addEventListener("click", async () => {
    const blob = await sandboxApi.captureCurrentSelection();
    if (blob) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      document.body.appendChild(img);
    }
  });
});
```

## FAQs

#### Q: How do I create a rendition?

**A:** Call `addOnUISdk.app.document.createRenditions(options, intent)` to export pages in different formats.

#### Q: What file formats are supported?

**A:** JPG, PNG, MP4, PDF, and PPTX formats via `addOnUISdk.constants.RenditionFormat`. See the [RenditionFormat constants](../../../references/addonsdk/addonsdk-constants.md) for more details.

#### Q: How do I export content for download?

**A:** Create rendition, convert blob to URL with `URL.createObjectURL()`, then use anchor element to trigger download.

#### Q: What permissions are needed for downloads?

**A:** Add `"allow-downloads"` to the `"sandbox"` array in manifest permissions.

#### Q: Should I check export permissions before creating renditions?

**A:** Yes, always call `await addOnUISdk.app.document.exportAllowed()` before using `RenditionIntent.export` or `RenditionIntent.print` to avoid approval error dialogs.

#### Q: When do I need to check exportAllowed()?

**A:** Check before creating renditions with `RenditionIntent.export` or `RenditionIntent.print`. Preview renditions with `RenditionIntent.preview` are always allowed.

#### Q: What happens if I don't check export permissions first?

**A:** Users may see error dialogs like "Request approval" and "Get approval from your viewers before sharing this file" in collaborative workflows.

#### Q: What should I do when export is not allowed?

**A:** Create preview renditions instead using `RenditionIntent.preview`, show informational messages, and display content in UI only without download options.

#### Q: What is the preview intent for?

**A:** Preview intent creates renditions for processing or display only, not for download or sharing.

#### Q: How do I set JPG quality?

**A:** Use `quality` property (0-1 range) in `JpgRenditionOptions`.

#### Q: What's required for preview intent?

**A:** Set `"renditionPreview": true` in manifest requirements section.

#### Q: How do I export the current page only?

**A:** Use `range: addOnUISdk.constants.Range.currentPage` in rendition options.

#### Q: When should I use isPresentation()?

**A:** Use `isPresentation()` before offering PPTX export. PPTX is only available for presentation-type documents; when it returns `false`, hide or disable the PPTX option. Requires `experimentalApis` in manifest.

#### Q: What is the default rendition intent if I don't specify one?

**A:** The default `renditionIntent` is `RenditionIntent.export`, which creates renditions for download and sharing purposes.
