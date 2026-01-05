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
  - addMedia
  - batch import
  - bulk PDF
title: Use PDF and PowerPoint
description: Use PDF and PowerPoint.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I import PDF files?"
      answer: 'Call `addOnUISdk.app.document.importPdf(blob, attributes)` with PDF blob and MediaAttribute object.'

    - question: "How do I import PowerPoint files?"
      answer: 'Call `addOnUISdk.app.document.importPowerPoint(blob, attributes)` with PowerPoint blob and MediaAttribute.'

    - question: "What PowerPoint formats are supported?"
      answer: "Both .pptx and .ppt file formats are supported."

    - question: "Are MediaAttributes required for PDF/PowerPoint?"
      answer: "Yes, title is mandatory and author is optional in the MediaAttribute object."

    - question: "What is the sourceMimeType parameter for?"
      answer: 'Use `sourceMimeType` in MediaAttributes to improve UX when importing converted documents. It shows "Import a document" instead of "Import a PDF" in the consent dialog.'

    - question: "When should I use sourceMimeType?"
      answer: "Use it when importing PDFs that were converted from other document types like Word (.docx) or Google Docs (.gdoc) to provide clearer messaging to users."

    - question: "What values does sourceMimeType accept?"
      answer: 'Common values include "docx" for Word documents and "gdoc" for Google Docs. Use the original document format before PDF conversion.'

    - question: "Will users see a consent dialogue?"
      answer: "Yes, PDF and PowerPoint imports trigger consent dialogues that users must confirm."

    - question: "Can I bypass the consent dialogue?"
      answer: "No, the consent dialogue cannot be bypassed for PDF and PowerPoint imports."

    - question: "Are vector elements preserved?"
      answer: "Yes, supported vector elements like shapes and text remain editable after import."

    - question: "How many pages are imported?"
      answer: "All pages from PDF and PowerPoint files are imported into the document."

    - question: "How do I import multiple PDFs at once?"
      answer: "Use the experimental `addMedia()` method with an array of PDF blobs to trigger bulk PDF import. This imports all PDFs as separate documents."

    - question: "Can I mix PDFs with images in a batch import?"
      answer: "No, documents (PDF/PPT) cannot be combined with images or videos in the same batch. Import them separately."
---

# Use PDF and PowerPoint

## Import PDF into the page

You can add PDFs to the page using the [`importPdf()`](../../../references/addonsdk/app-document.md#importpdf) method of the `addOnUISdk.app.document` object, which expects a `Blob` object as an argument and a [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with a title (mandatory) and author (optional) as the second.

PDF and PowerPoint imports will trigger a consent dialogue that asks the user to confirm the process; it's not possible to bypass it. As soon as the process starts, another dialogue will preview the PDF and track the operation progress.

![PDF Import dialogue](./images/pdf_import.png)

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

### Importing converted documents

If your add-on converts Word documents (`.docx`) or Google Docs (`.gdoc`) to PDF before importing, you can use the `sourceMimeType` parameter to improve the user experience. When specified, the import consent dialog displays the message "Import a document" rather than the default "Import a PDF".

```js
// Import a PDF that was converted from a Word document
await addOnUISdk.app.document.importPdf(convertedPdfBlob, {
  title: "Converted Document",
  sourceMimeType: "docx" // Shows "Import a document" in the dialog
});
```

## Batch Import Multiple PDFs

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The `addMedia()` method is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

When you need to import multiple PDF files at once, use the [`addMedia()`](../../../references/addonsdk/app-document.md#addmedia) method. This triggers a bulk PDF import flow that allows users to import multiple documents efficiently.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // Array of PDF URLs to import
    const pdfUrls = [
      "https://example.com/document1.pdf",
      "https://example.com/document2.pdf",
      "https://example.com/document3.pdf"
    ];

    // Fetch all PDFs and prepare MediaItem array
    const assets = await Promise.all(
      pdfUrls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return {
          blob, // 👈 Required: PDF Blob object
          attributes: { // 👈 Optional: MediaAttributes
            title: `Document ${index + 1}`
          }
        };
      })
    );

    // Import all PDFs in a bulk operation
    await addOnUISdk.app.document.addMedia(assets);
    console.log("Bulk PDF import initiated!");
  } catch (e) {
    console.error("Failed to import PDFs", e);
  }
});
```

<InlineAlert slots="text" variant="info"/>

**Important Limitations:**

- PDFs cannot be combined with images or videos in the same batch import. If you need to import both, make separate calls.
- Mixing PDFs with PowerPoint files in the same batch is not supported.
- When importing a single PDF via `addMedia()`, it behaves the same as `importPdf()` and triggers the standard document import flow with consent dialog.

For more details on batch import rules, see the [`addMedia()` API reference](../../../references/addonsdk/app-document.md#addmedia).

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

## FAQs

#### Q: How do I import PDF files?

**A:** Call `addOnUISdk.app.document.importPdf(blob, attributes)` with PDF blob and MediaAttribute object.

#### Q: How do I import PowerPoint files?

**A:** Call `addOnUISdk.app.document.importPowerPoint(blob, attributes)` with PowerPoint blob and MediaAttribute.

#### Q: What PowerPoint formats are supported?

**A:** Both .pptx and .ppt file formats are supported.

#### Q: Are MediaAttributes required for PDF/PowerPoint?

**A:** Yes, title is mandatory and author is optional in the MediaAttribute object.

#### Q: What is the sourceMimeType parameter for?

**A:** Use `sourceMimeType` in MediaAttributes to improve UX when importing converted documents. It shows "Import a document" instead of "Import a PDF" in the consent dialog.

#### Q: When should I use sourceMimeType?

**A:** Use it when importing PDFs that were converted from other document types like Word (.docx) or Google Docs (.gdoc) to provide clearer messaging to users.

#### Q: What values does sourceMimeType accept?

**A:** Common values include "docx" for Word documents and "gdoc" for Google Docs. Use the original document format before PDF conversion.

#### Q: Will users see a consent dialogue?

**A:** Yes, PDF and PowerPoint imports trigger consent dialogues that users must confirm.

#### Q: Can I bypass the consent dialogue?

**A:** No, the consent dialogue cannot be bypassed for PDF and PowerPoint imports.

#### Q: Are vector elements preserved?

**A:** Yes, supported vector elements like shapes and text remain editable after import.

#### Q: How many pages are imported?

**A:** All pages from PDF and PowerPoint files are imported into the document.

#### Q: How do I import multiple PDFs at once?

**A:** Use the experimental `addMedia()` method with an array of PDF blobs to trigger bulk PDF import. This imports all PDFs as separate documents.

#### Q: Can I mix PDFs with images in a batch import?

**A:** No, documents (PDF/PPT) cannot be combined with images or videos in the same batch. Import them separately.
