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
  - Add-on Manifest
title: Content Authoring and Metadata
description: Learn how to author content using Document APIs and manage document and page metadata.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# Content Authoring and Metadata

## Authoring Adobe Express Content

We provide a set of [Document APIs](../../../references/document-sandbox/document-apis/index.md) that can be used to interact with the document for common use cases like creating shapes, adding pages, clearing the artboard, and more.

The following code snippet illustrates how to use the [Document APIs](../../../references/document-sandbox/document-apis/index.md) from the script running in your [`code.js`](../../../references/document-sandbox/index.md#getting-started-with-the-apis); for instance, to access the current document, create a rectangle, set some properties and a fill for the rectangle, and finally, add it to the document.

```js
import { editor, colorUtils } from "express-document-sdk";

const insertionParent = editor.context.insertionParent; // get node to insert content into

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translation = { x: 100, y: 20 };
console.log(rectangle); // for debugging purpose

const [red, green, blue, alpha] = [0.8, 0.6, 0.2, 0.7];
// Note: alpha param is optional
const aColor = colorUtils.fromRGB(red,green,blue,alpha)

const rectangleFill = editor.makeColorFill(aColor);
rectangle.fill = rectangleFill;

insertionParent.children.append(rectangle);
```

<InlineAlert slots="text" variant="info"/>

Refer to [getting started with the Document Sandbox](../../../references/document-sandbox/index.md#getting-started-with-the-apis) for more details on how to set up your add-on to use the script-based APIs, as well as [this extensive tutorial](../../tutorials/grids-addon.md) provided to help you build your first add-on using the Document APIs.

## Document and Page Metadata

You can retrieve some information about the current document using the [Add-on UI SDK Document object](../../../references/addonsdk/app-document.md). Currently, there are methods that allow you to retrieve the ID of the document and the title (i.e., name). Also, associated events will let you listen for when the document is available (via the `documentAvailable` event) and when the title has changed (via the `documentTitleChange` event). See the examples below.

### Retrieving the Document ID

The example below listens for the `documentAvailable` event and then sets the id.

#### Example

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setId(id) { /* ... */ } 
  
addOnUISdk.ready.then(() => setId(await addOnUISdk.app.document.id()));
  
addOnUISdk.app.on("documentAvailable", data => {
  setId(data.documentId);
});
```

### Retrieving the document title

The example below listens for the `documentTitleChange` event and then sets the id.

#### Example

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setTitle(title) { /* ... */ } 
  
addOnUISdk.ready.then(() => setTitle(await addOnUISdk.app.document.title()));
  
addOnUISdk.app.on("documentTitleChange", data => {
  setTitle(data.documentTitle);
});
```

### Retrieving page metadata

If you want to retrieve metadata for pages in the document, use the [`getPagesMetadata()`](../../../references/addonsdk/app-document.md#getpagesmetadata) method in the `addOnUISdk.app.document` object, as shown in the example below.

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;
 
// Get metadata of all the pages
async function logMetadata() {
  try {
    const pages = (await addOnUISdk.app.document.getPagesMetadata({
                            range: addOnUISdk.constants.Range.specificPages,
                            pageIds: [
                                "7477a5e7-02b2-4b8d-9bf9-f09ef6f8b9fc",
                                "d45ba3fc-a3df-4a87-80a5-655e5f8f0f96"
                            ]
                        })) as PageMetadata[];
    for (const page of pages) {
      console.log("Page id: ", page.id);
      console.log("Page title: ", page.title);
      console.log("Page size: ", page.size);
      console.log("Page has premium content: ", page.hasPremiumContent);
      console.log("Page has timelines: ", page.hasTemporalContent);
      console.log("Pixels per inch: ", page.pixelsPerInch);
    }
  }
  catch(error) {
    console.log("Failed to get metadata:", error);
  }
}
```
