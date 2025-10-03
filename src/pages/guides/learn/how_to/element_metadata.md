---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Metadata
  - Element
  - ImportAddOnData
  - Media Import
  - AddOnData
  - mediaAddOnData
  - nodeAddOnData
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

    - question: "How do I add metadata when importing media?"
      answer: "Use the `ImportAddOnData` parameter in media import methods like `addImage()`, `addVideo()`, etc."

    - question: "What's the difference between nodeAddOnData and mediaAddOnData?"
      answer: "`nodeAddOnData` persists with the container even when media is replaced; `mediaAddOnData` is tied to the media content and shared across copies."

    - question: "How do I access media-specific metadata?"
      answer: "Use `mediaRectangleNode.mediaAddOnData` to access metadata tied to the media content itself."
---

# Element Metadata

Add-ons can store **private metadata** (custom data accessible only to the add-on that set it) on elements within the Express document. There are two main approaches for working with element metadata:

1. **Runtime Metadata**: Set and modify metadata on existing elements using the Document Sandbox APIs
2. **Import-Time Metadata**: Attach metadata to media assets during import using the Add-on UI SDK

## Runtime Element Metadata

### Get and Set Element Metadata

Add-ons can store metadata on any node within the Express document. Currently, each node can hold up to **3 KB** of data, organized as key/value pairs where both keys and values are Strings. Additionally, there is a limit of **20 key/value pairs** per node.

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

## Import-Time Metadata for Media Assets (Add-on UI SDK)

When importing media assets (images, videos, animated images) using the Add-on UI SDK, you can attach metadata using the [`ImportAddOnData`](../../../references/addonsdk/app-document.md#importaddondata) parameter. This provides two distinct types of metadata storage:

### Container vs. Media Metadata

**`nodeAddOnData`** - Container-Level Metadata:

- Persists with the individual asset container
- Remains attached even when the asset content is replaced
- Each container instance has independent metadata
- Accessed via [`MediaContainerNode.addOnData`](../../../references/document-sandbox/document-apis/classes/MediaContainerNode.md#addondata) in the Document Sandbox

**`mediaAddOnData`** - Content-Level Metadata:

- Tied to the actual asset content
- Shared across all copies of the same asset in the document
- Reset if the asset content is replaced with different media
- Accessed via [`MediaRectangleNode.mediaAddOnData`](../../../references/document-sandbox/document-apis/classes/MediaRectangleNode.md#mediaaddondata) in the Document Sandbox

<InlineAlert slots="text" variant="warning"/>

Import-time metadata is **not supported** for PSD/AI assets. An error will be thrown if you attempt to use [`ImportAddOnData`](../../../references/addonsdk/app-document.md#importaddondata) with these file types.

### Example: Set Metadata with Add-on UI SDK `ImportAddOnData`

<CodeBlock slots="heading, code" repeat="4" languages="JavaScript" />

#### Add Image

```js
// Store metadata when importing
// ui/index.js (iframe runtime)
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // Create or fetch your image blob
    const imageBlob = await fetch("./sample-image.png").then(r => r.blob());
    
    // Import image with ImportAddOnData
    await addOnUISdk.app.document.addImage(
      imageBlob,
      // Optional MediaAttributes
      {
        title: "Sample Test Image",
        author: "Add-on Developer"
      },
      {
        // Container-level metadata (persists with container)
        nodeAddOnData: {
          "imageId": "test_001",
          "category": "demo",
          "importDate": new Date().toISOString(),
          "source": "addon-tester"
        },
        // Content-level metadata (tied to actual image content)
        mediaAddOnData: {
          "resolution": "200x150",
          "format": "PNG",
          "source": "generated_canvas",
          "color": "green"
        }
      }
    );
    
    console.log("✅ Image imported successfully with metadata!");
    
  } catch (error) {
    console.error("❌ Failed to import image:", error);
  }
});
```

#### Add Video

```js
// Import a video with container metadata only
await addOnUISdk.app.document.addVideo(videoBlob, {
  title: "Product Demo"
}, {
  nodeAddOnData: {
    "video-category": "product-demo",
    "import-timestamp": new Date().toISOString()
  },
  mediaAddOnData: {
    "resolution": "1920x1080",
    "format": "MP4",
    "duration": "596s",
    "testFlag": "remote_video_test"
  }
});
```

#### Add Animated Image

```js
// Import an animated image with media metadata only
await addOnUISdk.app.document.addAnimatedImage(gifBlob, {
  title: "Animated Logo"
}, {
  mediaAddOnData: {
    "animation-type": "logo",
    "frame-count": "24",
    "duration": "2000ms"
  }
});
```

<InlineAlert slots="text" variant="info"/>

[`ImportAddOnData`](../../../references/addonsdk/app-document.md#importaddondata) is also supported in drag-and-drop operations via the [`enableDragToDocument`](../../../references/addonsdk/addonsdk-app.md#enabledragtodocument) method. See the [Drag and Drop guide](drag_and_drop.md) for more details.

### Example: Retrieve Imported Metadata in Document Sandbox

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

#### All Media Metadata

```js
// sandbox/code.js (document sandbox)
import { editor } from "express-document-sdk";

function retrieveAllMediaMetadata() {
  console.log("Starting metadata retrieval...");
  
  const documentRoot = editor.documentRoot;
  let mediaContainerCount = 0;
  
  // Traverse document structure to find media nodes
  for (const page of documentRoot.pages) {
    console.log(`📄 Checking page: ${page.id}`);
    
    for (const artboard of page.artboards) {
      console.log(`🎨 Checking artboard: ${artboard.id}`);
      
      // Use recursive traversal to find all MediaContainer nodes
      traverseNodeForMedia(artboard);
    }
  }
  
  function traverseNodeForMedia(node) {
    // Check if current node is a MediaContainer
    if (node.type === 'MediaContainer') {
      mediaContainerCount++;
      console.log(`\n📦 Found MediaContainer #${mediaContainerCount}: ${node.id}`);
      
      try {
        // Retrieve container metadata (nodeAddOnData)
        const containerMetadata = {};
        const containerKeys = node.addOnData.keys();
        
        for (const key of containerKeys) {
          containerMetadata[key] = node.addOnData.getItem(key);
        }
        
        if (containerKeys.length > 0) {
          console.log('📝 Container metadata (nodeAddOnData):', containerMetadata);
        } else {
          console.log('📝 No container metadata found');
        }
        
        // Access the media rectangle directly via the mediaRectangle property
        const mediaRectangle = node.mediaRectangle;
        
        if (mediaRectangle) {
          console.log(`🖼️  Media rectangle type: ${mediaRectangle.type}`);
          
          try {
            // Retrieve media-specific metadata (mediaAddOnData)
            const mediaMetadata = {};
            const mediaKeys = mediaRectangle.mediaAddOnData.keys();
            
            for (const key of mediaKeys) {
              mediaMetadata[key] = mediaRectangle.mediaAddOnData.getItem(key);
            }
            
            if (mediaKeys.length > 0) {
              console.log('🎯 Media metadata (mediaAddOnData):', mediaMetadata);
            } else {
              console.log('🎯 No media metadata found');
            }
            
          } catch (error) {
            // Handle PSD/AI assets or other errors
            console.log('⚠️  Cannot access mediaAddOnData (likely PSD/AI asset):', error.message);
          }
        } else {
          console.log('⚠️  No media rectangle found');
        }
        
      } catch (error) {
        console.error('❌ Error accessing container metadata:', error);
      }
    }
    
    // Recursively traverse all children
    // MediaContainers can be nested inside groups or other containers
    if (node.allChildren) {
      for (const child of node.allChildren) {
        traverseNodeForMedia(child);
      }
    }
  }
  
  console.log(`\n✅ Metadata retrieval complete! Found ${mediaContainerCount} MediaContainer(s)`);
}
```

#### Known MediaContainer

```js
// Simple access example for a known MediaContainer
const mediaContainer = /* get MediaContainerNode from document */;

// Access container-level metadata
const containerMetadata = mediaContainer.addOnData;
console.log("Image ID:", containerMetadata.getItem("imageId"));
console.log("Category:", containerMetadata.getItem("category"));

// Access media-level metadata
const mediaRectangle = mediaContainer.mediaRectangle;
const mediaMetadata = mediaRectangle.mediaAddOnData;
console.log("Resolution:", mediaMetadata.getItem("resolution"));
console.log("Format:", mediaMetadata.getItem("format"));

// Check all available keys
console.log("Container keys:", containerMetadata.keys());
console.log("Media keys:", mediaMetadata.keys());
```

### When to Use Each Type

**Use `nodeAddOnData` when:**

- Tracking add-on-specific UI state or settings for each container
- Storing metadata that should persist even if the user replaces the media content
- Each instance of the media should have independent metadata

**Use `mediaAddOnData` when:**

- Storing information about the media content itself (source, licensing, etc.)
- The metadata should be shared across all instances of the same media
- The metadata is only relevant to the specific media content

## Use Cases

Element metadata can be useful in various scenarios:

### Runtime Metadata Use Cases

- Track original properties a node was created with
- Store history of subsequent changes made to elements
- Tag nodes in ways meaningful for the add-on (e.g., skip certain operations)
- Store temporary data that doesn't need to be persisted
- Maintain add-on-specific UI state for elements

### Import-Time Metadata Use Cases

- **Asset Attribution**: Store source URLs, author information, and licensing details
- **Content Management**: Track asset IDs, categories, and organizational metadata
- **Workflow Context**: Record placement context, import timestamps, and processing flags
- **Asset Relationships**: Maintain connections between related media assets
- **Quality Assurance**: Store validation flags, approval status, and review notes

Please refer to the SDK Reference section for [`AddOnData`](../../../references/document-sandbox/document-apis/classes/AddOnData.md) for a complete list of methods, and the [`per-element-metadata`](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/per-element-metadata) sample add-on for a demonstrative implementation.

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

#### Q: How do I add metadata when importing media?

**A:** Use the [`ImportAddOnData`](../../../references/addonsdk/app-document.md#importaddondata) parameter in media import methods like [`addImage()`](../../../references/addonsdk/app-document.md#addimage), [`addVideo()`](../../../references/addonsdk/app-document.md#addvideo), and [`addAnimatedImage()`](../../../references/addonsdk/app-document.md#addanimatedimage).

#### Q: What's the difference between nodeAddOnData and mediaAddOnData?

**A:** `nodeAddOnData` persists with the container even when media is replaced; `mediaAddOnData` is tied to the media content and shared across copies.

#### Q: How do I access media-specific metadata?

**A:** Use [`mediaRectangleNode.mediaAddOnData`](../../../references/document-sandbox/document-apis/classes/MediaRectangleNode.md#mediaaddondata) to access metadata tied to the media content itself.

#### Q: Can I use ImportAddOnData with all media types?

**A:** No, import-time metadata is not supported for PSD/AI assets. An error will be thrown if you attempt to use [`ImportAddOnData`](../../../references/addonsdk/app-document.md#importaddondata) with these file types.

#### Q: What happens to mediaAddOnData when I copy a media element?

**A:** All copies of the same media asset share the same `mediaAddOnData`. Changes to one copy affect all copies.

#### Q: What happens to nodeAddOnData when I replace media content?

**A:** `nodeAddOnData` persists with the container even when the media content is replaced, while `mediaAddOnData` is reset.
