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
  - Rendition
  - createRendition
  - exporting
  - output
title: Create Renditions
description: Create Renditions.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Create Renditions

Renditions are different output versions of a document made for specific purposes; for example, a high-quality PDF for printing or a smaller JPG for sharing online.

## Rendition settings

Renditions are created via the [`createRendition()`](../../../references/addonsdk/app-document.md#createrenditions) method of the `addOnUISdk.app.document` object. The method accepts two parameters:

1. [`renditionOptions`](../../../references/addonsdk/app-document.md#renditionoptions): controls the page range that is meant to be exported and the file format (jpg, png, mp4 and pdf).
2. [`renditionIntent`](../../../references/addonsdk/addonsdk-constants.md) constant (optional): controls the intent of the exported content (preview, export, print).

## Check export permissions

The `exportAllowed()` method determines whether the current document can be exported based on its review status in collaborative workflows. This applies mainly to [enterprise customers using Adobe Express's review and approval features](https://business.adobe.com/products/workfront/integrations/express.html), where documents may be restricted from export until approved by designated reviewers.

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

**Important:** This check is only necessary for `RenditionIntent.export` and `RenditionIntent.print`. Renditions created with `RenditionIntent.preview` are always allowed, regardless of the document's review status.

**Why check export permissions first?** If you skip this check and attempt to create export/print renditions when the document doesn't allow exports, users may see an error message such as "Request approval" and "Get approval from your viewers before sharing this file". Checking `exportAllowed()` first lets you provide a better user experience by either offering preview-only options or explaining why export is restricted.

## Export content

Usually, you create renditions to allow users to download or share your content in different formats. This is a multi-step process that involves:

1. **Creating a new rendition** based on specific export configuration options via the [`createRendition()`](../../../references/addonsdk/app-document.md#createrenditions) method of the `addOnUISdk.app.document` object.
2. **Converting** the returned `blob` object into a URL via the `URL.createObjectURL()` method.
3. **Creating a download link** for the user to download the rendition, e.g., using the URL string from the previous step as the `href` attribute of an `<a>` element.

### Example

In the following snippet, we create a rendition of the current page in PNG format when the user clicks a button. We'll create a temporary anchor element to trigger the download of the rendition.

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

There are multiple classes that inherit from the `RenditionOptions` class, such as [`JpgRenditionOptions`](../../../references/addonsdk/app-document.md#jpgrenditionoptions), [`PngRenditionOptions`](../../../references/addonsdk/app-document.md#pngrenditionoptions), and [`PdfRenditionOptions`](../../../references/addonsdk/app-document.md#pdfrenditionoptions). Each of these classes has specific properties that can be set to control the output of the rendition.

```js
const JpgRendition = await addOnUISdk.app.document.createRenditions(
  // JpgRenditionOptions
  {
    range: addOnUISdk.constants.Range.currentPage,
    format: addOnUISdk.constants.RenditionFormat.jpg,
    // number in the range [0, 1]
    quality: 0.41,
    // no upscaling, result depends on the original image size/ratio
    requestedSize: { width: 600, height: 600 },
  }
);
```

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

Please also check out the [export-sample add-on](../samples.md#export-sample) for a more detailed example.

## The Preview intent

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
