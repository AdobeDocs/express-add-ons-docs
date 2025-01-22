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
title: Element Metadata
description:  Element Metadata.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---
# Element Metadata

## Using Element Metadata

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

Add-ons can store **private metadata** (custom data accessible only to the add-on that set it) on any node within the Express document. Currently, each node can hold up to **3 KB** of data, organized as key/value pairs where both keys and values are Strings. Additionally, there is a limit of **20 key/value pairs** per node.

All nodes that inherit from the [`BaseNode`](../../../references/document-sandbox/document-apis/classes/BaseNode.md) class have a `addOnData` property that can be used to store and retrieve metadata. It is an instance of the [`AddOnData`](../../../references/document-sandbox/document-apis/classes/AddOnData.md) class, which provides methods to perform operations such as `getItem()`, `setItem()`, `removeItem()`, and `clear()`.  

With the `remainingQuota` property, you can check how much space is left, both in terms of `sizeInBytes` and `numKeys`, while `keys()` returns an array of the keys in use.

<InlineAlert slots="text" variant="info"/>

While Document and Page metadata operate from the `addOnUISdk.app.document` object and belong to the [Add-on UI SDK](../../../references/addonsdk/index.md), Element metadata are part of the [Document Sandbox](../../../references/document-sandbox/document-apis/index.md) and are accessed through the `node.addOnData` property. 

### Example

```js
import { editor } from "express-document-sdk";

// Create some dummy node
const text = editor.createText();
text.fullContent.text = "Hello, World!";

// Store some metadata as key/value pairs
text.addOnData.setItem("originalText", "Hello, World!");
text.addOnData.setItem("date", new Date().toISOString());

// Retrieve the metadata
console.log("Original text: ", text.addOnData.getItem("originalText"));

// Check the remaining quota
console.log("Remaining quota: ", text.addOnData.remainingQuota);
// {
//   "sizeInBytes": 3062,
//   "numKeys": 19
// }

// Check the keys in use
console.log("Keys in use: ", text.addOnData.keys()); 
// ["originalText", "date"]

// Remove the metadata
text.addOnData.removeItem("originalText");

// clear all metadata
text.addOnData.clear();
```

Please note that the `addOnData` property is iterable with `for...of` loops, so you can use it to iterate over the key/value pairs; each pair is an array with the key as the first element and the value as the second.

```js
// iterate over key/value pairs
for (let pair of text.addOnData) {
  console.log(pair);
  // ['originalText', 'Hello, World!']
  // ['date', '2025-01-20T11:06:19.051Z']
}
```

Alternatively, you can use the `keys()` method to get an array of all keys and then iterate over them.

```js
// Iterate over all keys
text.addOnData.keys().forEach(key => {
  console.log(`Key: ${key}, Value: ${text.addOnData.getItem(key)}`);
});
```

## Use Cases

Per-element metadata can be useful to keep track, for example, of the original properties a node has been created with, the history of the subsequent changes made to it, or to tag some nodes in a way that is meaningful for the add-on (e.g., it's supposed to be skipped when a certain routine is launched). It can also be used to store temporary data that is not meant to be persisted.

Please, refer to the SDK Reference section for [`AddOnData`](../../../references/document-sandbox/document-apis/classes/AddOnData.md) for a complete list of methods, and the [`per-element-metadata`](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/per-element-metadata) sample add-on for a demonstrative implementation.
