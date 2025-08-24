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
faq:
  questions:
    - question: "How do I get the document ID?"
      answer: "Call `await addOnUISdk.app.document.id()` to retrieve the document ID."

    - question: "How do I get the document title?"
      answer: "Call `await addOnUISdk.app.document.title()` to retrieve the document title."

    - question: "How do I get the document link?"
      answer: 'Call `await addOnUISdk.app.document.link("document")` or `await addOnUISdk.app.document.link("published")` for different link types. This is curently an experimental method and requires the `experimentalApis` flag to be enabled in the [manifest](../../../references/manifest).

    - question: "How do I listen for document ID changes?"
      answer: 'Use `addOnUISdk.app.on("documentIdAvailable", callback)` to listen for ID changes.'

    - question: "How do I listen for title changes?"
      answer: 'Use `addOnUISdk.app.on("documentTitleChange", callback)` to listen for title changes.'

    - question: "What link types are available?"
      answer: 'You can get "document" link or "published" link via the `link()` method. This is currently an experimental method and requires the `experimentalApis` flag to be enabled in the [manifest](../../../references/manifest/index.md).'

    - question: "How do I listen for link availability changes?"
      answer: "Use `documentLinkAvailable` or `documentPublishedLinkAvailable` events with `addOnUISdk.app.on()`."
---

# Use Document Metadata

## Get the Document ID, Title, and Link

Through the [Add-on UI SDK Document object](../../../references/addonsdk/app-document.md), you can retrieve some information about the current document. Currently, there are asynchronous methods that allow you to retrieve the `id()`, `title()` and the document `link()`. Also, associated events allow you to listen for when the values are available or have changed, via the `documentIdAvailable`, `documentTitleChange`, `documentLinkAvailable`, and `documentPublishedLinkAvailable` events, with the [`addOnUISdk.app.on()`](../../../references/addonsdk/addonsdk-app.md#on) method.

<InlineAlert slots="text" variant="info"/>

The `link()` method is currently an experimental method and requires the `experimentalApis` flag to be enabled in the [manifest.json](../../../references/manifest/index.md).

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

  console.log(`Document ID: ${docId}; Document Title: ${docTitle}; Document Link: ${docLink}`);

  // Listen for document ID change
  addOnUISdk.app.on("documentIdAvailable", data => {
    console.log(`Document ID is available. ID value: ${data.documentId}`);
  });

  // Listen for document title change
  addOnUISdk.app.on("documentTitleChange", data => {
    console.log(`Document title changed to: ${data.documentTitle}`);
  });

  // Listen for document link availability change
    addOnUISdk.app.on("documentLinkAvailable", data => {
      console.log(`Document link availability changed. Link value: ${data.documentLink}`);
    });

  // Listen for published document link availability change (for instance, via the "Publish to Web" option in Adobe Express).
  addOnUISdk.app.on("documentPublishedLinkAvailable", data => {
      console.log(`Published document link availability changed. Link value: ${data.documentPublishedLink}`);
    });
});
```

<InlineAlert slots="text" variant="warning"/>

Please remember that `id()`, `title()`, and `link()` are asynchronous methods and not properties of the `addOnUISdk.app.document` object. You need to call them and `await` for the promise to be resolved before using the returned value.

## FAQs

#### Q: How do I get the document ID?

**A:** Call `await addOnUISdk.app.document.id()` to retrieve the document ID.

#### Q: How do I get the document title?

**A:** Call `await addOnUISdk.app.document.title()` to retrieve the document title.

#### Q: How do I get the document link?

**A:** Call `await addOnUISdk.app.document.link("document")` or `link("published")` for different link types. The `link()` method is currently an experimental method and requires the `experimentalApis` flag to be enabled in the [manifest](../../../references/manifest/index.md).

#### Q: How do I listen for document ID changes?

**A:** Use `addOnUISdk.app.on("documentIdAvailable", callback)` to listen for ID changes.

#### Q: How do I listen for title changes?

**A:** Use `addOnUISdk.app.on("documentTitleChange", callback)` to listen for title changes.

#### Q: What link types are available?

**A:** You can get the "document" link or "published" document link via the experimental `link()` method. Note, this method currently requires the`experimentalApis` flag to be enabled in the [manifest](../../../references/manifest/index.md).

#### Q: How do I listen for link availability changes?

**A:** Use `documentLinkAvailable` or `documentPublishedLinkAvailable` events with `addOnUISdk.app.on()`.
