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

    - question: "How do I retrieve ImportAddOnData from imported media?"
      answer: "Use `MediaContainerNode.addOnData` for nodeAddOnData and `ImageRectangleNode.mediaAddOnData` or `UnknownMediaRectangleNode.mediaAddOnData` for mediaAddOnData. Check node types using `node.type === 'ImageRectangle'` or `node.type === 'UnknownMediaRectangle'`."

    - question: "What's the difference between nodeAddOnData and mediaAddOnData?"
      answer: "nodeAddOnData is container-level metadata that persists with the container (crop group) even when media is replaced; mediaAddOnData is media-specific metadata tied to the actual media content (resource collection) and is reset when media is replaced but duplicated when nodes are duplicated."
---

# Element Metadata

## Get and Set Element Metadata

Add-ons can store **private metadata** (custom data accessible only to the add-on that set it) on any node within the Express document. Currently, each node can hold up to **3 KB** of data, organized as key/value pairs where both keys and values are Strings. Additionally, there is a limit of **20 key/value pairs** per node.

All nodes that inherit from the [`BaseNode`](../../../references/document-sandbox/document-apis/classes/BaseNode.md) class have a `addOnData` property that can be used to store and retrieve metadata. It is an instance of the [`AddOnData`](../../../references/document-sandbox/document-apis/classes/AddOnData.md) class, which provides methods to perform operations such as `getItem()`, `setItem()`, `removeItem()`, and `clear()`.

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

## ImportAddOnData for Media Import

When importing media using [`ImportAddOnData`](../../../references/addonsdk/addonsdk-app.md#importaddondata), you can attach two types of metadata:

- **`nodeAddOnData`** → Stored on `MediaContainerNode.addOnData` (crop group - persists even when media is replaced)
- **`mediaAddOnData`** → Stored on `ImageRectangleNode.mediaAddOnData` or `UnknownMediaRectangleNode.mediaAddOnData` (resource collection - tied to specific media content, reset when media is replaced, duplicated when nodes are duplicated)

<InlineAlert slots="header,text1" variant="info"/>

### Important

When checking node types in code, use the type string values (`node.type === 'ImageRectangle'` or `node.type === 'UnknownMediaRectangle'`) rather than the class names. The `mediaAddOnData` property is available on `ImageRectangleNode` and `UnknownMediaRectangleNode` instances, but you identify them using their type strings.

#### Node Type vs Class Name Reference

| **Class Name** | **Type String** | **Has mediaAddOnData** | **Usage** |
|---|---|---|---|
| `ImageRectangleNode` | `'ImageRectangle'` | ✅ Yes | `if (node.type === 'ImageRectangle') { node.mediaAddOnData... }` |
| `UnknownMediaRectangleNode` | `'UnknownMediaRectangle'` | ✅ Yes | `if (node.type === 'UnknownMediaRectangle') { node.mediaAddOnData... }` |
| `MediaContainerNode` | `'MediaContainer'` | ❌ No | Use `node.addOnData` for nodeAddOnData instead |

### Retrieving ImportAddOnData

After importing media with `ImportAddOnData` in the UI, retrieve the metadata in your document sandbox:

```js
import { editor } from "express-document-sdk";

function retrieveMediaMetadata() {
  const documentRoot = editor.documentRoot;
  
  // Traverse document structure to find media nodes
  for (const page of documentRoot.pages) {
    for (const artboard of page.artboards) {
      for (const child of artboard.children) {
        
        // Check for MediaContainer nodes (nodeAddOnData)
        if (child.type === 'MediaContainer') {
          console.log(`Found MediaContainer: ${child.id}`);
          
          // Retrieve container metadata (nodeAddOnData)
          const containerMetadata = {};
          for (const key of child.addOnData.keys()) {
            containerMetadata[key] = child.addOnData.getItem(key);
          }
          console.log('Container metadata:', containerMetadata);
          
          // Look for media rectangle children (mediaAddOnData)
          for (const mediaChild of child.children) {
            // Note: Check type strings, not class names
            // 'ImageRectangle' → ImageRectangleNode instance
            // 'UnknownMediaRectangle' → UnknownMediaRectangleNode instance
            if (mediaChild.type === 'ImageRectangle' || 
                mediaChild.type === 'UnknownMediaRectangle') {
              
              console.log(`Found media rectangle: ${mediaChild.type}`);
              
              // Retrieve media-specific metadata (mediaAddOnData)
              // Available on ImageRectangleNode and UnknownMediaRectangleNode
              const mediaMetadata = {};
              for (const key of mediaChild.mediaAddOnData.keys()) {
                mediaMetadata[key] = mediaChild.mediaAddOnData.getItem(key);
              }
              console.log('Media metadata:', mediaMetadata);
            }
          }
        }
      }
    }
  }
}

// Call the function to retrieve all media metadata
retrieveMediaMetadata();
```

### ImportAddOnData Example

This example shows the complete round-trip of storing and retrieving `ImportAddOnData`:

```js
// UI Panel (index.js) - Store metadata when importing
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  // Import image with ImportAddOnData
  const imageBlob = await fetch("./sample-image.png").then(r => r.blob());
  
  await addOnUISdk.app.document.addImage(
    imageBlob,
    {
      title: "Sample Image",
      author: "Developer"
    },
    {
      // Container-level metadata (persists with container)
      nodeAddOnData: {
        "imageId": "sample_001",
        "category": "demo",
        "importDate": new Date().toISOString()
      },
      // Media-specific metadata (tied to actual image content)
      mediaAddOnData: {
        "resolution": "800x600",
        "format": "PNG",
        "source": "local_file"
      }
    }
  );
});
```

```js
// Document Sandbox (code.js) - Retrieve metadata
import { editor } from "express-document-sdk";

// Function to find and display all ImportAddOnData
function displayImportMetadata() {
  const results = [];
  
  // Traverse document to find media with metadata
  for (const page of editor.documentRoot.pages) {
    for (const artboard of page.artboards) {
      for (const child of artboard.children) {
        if (child.type === 'MediaContainer') {
          
          // Get nodeAddOnData from container
          const nodeData = {};
          for (const key of child.addOnData.keys()) {
            nodeData[key] = child.addOnData.getItem(key);
          }
          
          // Get mediaAddOnData from media rectangle
          let mediaData = {};
          for (const mediaChild of child.children) {
            if (mediaChild.type === 'ImageRectangle' || 
                mediaChild.type === 'UnknownMediaRectangle') {
              for (const key of mediaChild.mediaAddOnData.keys()) {
                mediaData[key] = mediaChild.mediaAddOnData.getItem(key);
              }
              break; // Found the media rectangle
            }
          }
          
          results.push({
            containerId: child.id,
            nodeAddOnData: nodeData,
            mediaAddOnData: mediaData
          });
        }
      }
    }
  }
  
  console.log('All ImportAddOnData:', results);
  return results;
}
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

#### Q: How do I retrieve ImportAddOnData from imported media?

**A:** Use `MediaContainerNode.addOnData` for nodeAddOnData and `ImageRectangleNode.mediaAddOnData` or `UnknownMediaRectangleNode.mediaAddOnData` for mediaAddOnData. Check node types using `node.type === 'ImageRectangle'` or `node.type === 'UnknownMediaRectangle'`.

#### Q: What's the difference between nodeAddOnData and mediaAddOnData?

**A:** 
- **`nodeAddOnData`**: Container-level metadata that persists with the container even when media is replaced. Stored on the crop group (MediaContainer).
- **`mediaAddOnData`**: Media-specific metadata tied to the actual media content. Stored on the resource collection (`ImageRectangle`/`UnknownMediaRectangle`). This metadata is reset when media is replaced but is duplicated when nodes are duplicated.

#### Q: What happens to metadata when I replace or duplicate media?

**A:** The behavior depends on the metadata type:
- **`nodeAddOnData`**: Retained when media is replaced (persists with the container)
- **`mediaAddOnData`**: Reset when media is replaced, but duplicated when nodes are duplicated
