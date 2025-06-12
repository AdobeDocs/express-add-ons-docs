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
  - PDF Import
  - PowerPoint Import
  - importPdf
  - importPowerPoint
title: Use PDF and PowerPoint
description: Use PDF and PowerPoint.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Use PDF and PowerPoint

## Import PDF into the page

You can add PDFs to the page using the [`importPdf()`](../../../references/addonsdk/app-document.md#importpdf) method of the `addOnUISdk.app.document` object, which expects a `Blob` object as an argument and a [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with a title (mandatory) and author (optional) as the second.

PDF and PowerPoint imports will trigger a consent dialogue that asks the user to confirm the process; it's not possible to bypass it. As soon as the process starts, another dialogue will preview the PDF and track the operation progress.

![PDF Import dialogue](../how_to/images/pdf_import.png)

Supported vector elements will be kept editable (e.g., shapes with rounded corners, text, etc.), and all pages will be imported.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const pdfUrl = "https://url/to/your/file.pdf";

    const pdf = await fetch(pdfUrl);
    const pdfBlob = await pdf.blob();

    await addOnUISdk.app.document.importPdf(
      pdfBlob, // 👈 Blob object
      {
        title: "Official Launch Party",
        author: "Adobe",
      }
    );
  } catch (e) {
    console.error("Failed to add the PDF", e);
  }
});
```

Please note that you can use `fetch()` also to get PDFs that are local to the add-on; in this case, you can use paths relative to the add-on's root.

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // 👇 Local PDF
     const pdfUrl = "./OfficialLaunchParty.pdf";
    const pdf = await fetch(pdfUrl);
    // ... same as before
```

## Import PowerPoint into the page

For PowerPoint files, the process is similar to the one for PDFs, but you need to use the [`importPowerPoint()`](../../../references/addonsdk/app-document.md#importpresentation) method instead. The method supports both `.pptx` and `.ppt` files, and shows the same consent and progress dialogues as seen above.

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const powerPointUrl = "https://url/to/your/file.pptx";
    // Or
    // const powerPointUrl = "./OfficialLaunchParty.pptx";

    const powerPoint = await fetch(powerPointUrl);
    const powerPointBlob = await powerPoint.blob();

    await addOnUISdk.app.document.importPowerPoint(
      powerPointBlob, // 👈 Blob object
      {
        title: "Official Launch Party",
        author: "Adobe",
      }
    );
  } catch (e) {
    console.error("Failed to add the PDF", e);
  }
});
```
