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
  - Metadata
  - Document
title: Document Metadata
description: Document Metadata.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Use Document Metadata

## Get the Document ID, Title, and Link

Through the [Add-on UI SDK Document object](../../../references/addonsdk/app-document.md), you can retrieve some information about the current document. Currently, there are asynchronous methods that allow you to retrieve the `id()` of the document and the `title()`. Also, associated events will let you listen for when the Document ID or the Document Title have changed, respectively via the `documentIdAvailable` and `documentTitleChange` events, which you can listen for with the [`addOnUISdk.app.on()`](../../../references/addonsdk/addonsdk-app.md#on) method.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {

  // Get the document ID
  const docId = await addOnUISdk.app.document.id();
  // urn:aaid:sc:VA6C2:679a7c92-33ce-4320-a610-f58ccaf56aa8

  // Get the document title
  const docTitle = await addOnUISdk.app.document.title();

  // Get the document Link
  const docLink = await addOnUISdk.app.document.link("document"); // or "published"

  console.log(`Document ID: ${docId}; Document Title: ${docTitle}`; `Document Link: ${docLink}`);

  // Listen for document ID change
  addOnUISdk.app.on("documentIdAvailable", data => {
    console.log(`Document ID changed to: ${data.documentId}`);
  });

  // Listen for document title change
  addOnUISdk.app.on("documentTitleChange", data => {
    console.log(`Document title changed to: ${data.documentTitle}`);
  });

  // Listen for document link change
    addOnUISdk.app.on("documentLinkAvailable", data => {
      console.log(`Document ID changed to: ${data.documentLink}`);
    });

  // Listen for document published link change
    addOnUISdk.app.on("documentPublishedLinkAvailable", data => {
      console.log(`Document ID changed to: ${data.documentPublishedLink}`);
    });
});
```

<InlineAlert slots="text" variant="warning"/>

Please remember that `id()`, `title()`, and `link()` are asynchronous methods and not properties of the `addOnUISdk.app.document` object. You need to call them and `await` for the promise to be resolved before using the returned value.
