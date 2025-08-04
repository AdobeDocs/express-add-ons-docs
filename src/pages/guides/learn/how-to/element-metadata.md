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
  - Element
title: Element Metadata
description: Element Metadata.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I store metadata on an element?"
      answer: 'Use `node.addOnData.setItem("key", "value")` to store key/value pairs on any node.'

    - question: "How do I retrieve stored metadata?"
      answer: 'Use `node.addOnData.getItem("key")` to retrieve the value for a specific key.'

    - question: "What are the storage limits?"
      answer: "Each node can store up to 3 KB of data with a maximum of 20 key/value pairs."

    - question: "How do I check remaining storage space?"
      answer: "Use `node.addOnData.remainingQuota` to get remaining bytes and key count."

    - question: "How do I remove metadata?"
      answer: 'Use `removeItem("key")` for specific keys or `clear()` to remove all metadata.'

    - question: "How do I iterate over all metadata?"
      answer: "Use `for...of` loops on `addOnData` or iterate over `keys()` array with `forEach()`."

    - question: "Can other add-ons access my metadata?"
      answer: "No, metadata is private and only accessible to the add-on that set it."

    - question: "What types can I store?"
      answer: "Only strings are supported for both keys and values."
---

# Element Metadata

## Get and Set Element Metadata

Add-ons can store **private metadata** (custom data accessible only to the add-on that set it) on any node within the Express document. Currently, each node can hold up to **3 KB** of data, organized as key/value pairs where both keys and values are Strings. Additionally, there is a limit of **20 key/value pairs** per node.

All nodes that inherit from the [`BaseNode`](../../../references/document-sandbox/document-apis/classes/base-node.md) class have a `addOnData` property that can be used to store and retrieve metadata. It is an instance of the [`AddOnData`](../../../references/document-sandbox/document-apis/classes/add-on-data.md) class, which provides methods to perform operations such as `getItem()`, `setItem()`, `removeItem()`, and `clear()`.

With the `remainingQuota` property, you can check how much space is left, both in terms of `sizeInBytes` and `numKeys`, while `keys()` returns an array of the keys in use.

<InlineAlert slots="text" variant="info"/>

While Document and Page metadata operate from the `addOnUISdk.app.document` object and belong to the [Add-on UI SDK](../../../references/addonsdk/index.md), Element metadata are part of the [Document Sandbox](../../../references/document-sandbox/document-apis/index.md) and are accessed through the `node.addOnData` property.

### Example

```js
import { editor } from "express-document-sdk";

// Create some dummy node
const text = editor.createText("Hello, World!");

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
text.addOnData.keys().forEach((key) => {
  console.log(`Key: ${key}, Value: ${text.addOnData.getItem(key)}`);
});
```

## Use Cases

Per-element metadata can be useful to keep track, for example, of the original properties a node has been created with, the history of the subsequent changes made to it, or to tag some nodes in a way that is meaningful for the add-on (e.g., it's supposed to be skipped when a certain routine is launched). It can also be used to store temporary data that is not meant to be persisted.

Please, refer to the SDK Reference section for [`AddOnData`](../../../references/document-sandbox/document-apis/classes/AddOnData.md) for a complete list of methods, and the [`per-element-metadata`](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/per-element-metadata) sample add-on for a demonstrative implementation.

## FAQs

#### Q: How do I store metadata on an element?

**A:** Use `node.addOnData.setItem("key", "value")` to store key/value pairs on any node.

#### Q: How do I retrieve stored metadata?

**A:** Use `node.addOnData.getItem("key")` to retrieve the value for a specific key.

#### Q: What are the storage limits?

**A:** Each node can store up to 3 KB of data with a maximum of 20 key/value pairs.

#### Q: How do I check remaining storage space?

**A:** Use `node.addOnData.remainingQuota` to get remaining bytes and key count.

#### Q: How do I remove metadata?

**A:** Use `removeItem("key")` for specific keys or `clear()` to remove all metadata.

#### Q: How do I iterate over all metadata?

**A:** Use `for...of` loops on `addOnData` or iterate over `keys()` array with `forEach()`.

#### Q: Can other add-ons access my metadata?

**A:** No, metadata is private and only accessible to the add-on that set it.

#### Q: What types can I store?

**A:** Only strings are supported for both keys and values.
