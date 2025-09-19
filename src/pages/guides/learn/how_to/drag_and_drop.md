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
  - Drag and Drop
title: Use Drag-and-Drop
description: Use Drag-and-Drop.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I enable drag-and-drop for an element?"
      answer: "Call `addOnUISdk.app.enableDragToDocument(element, callbacks)` with preview and completion callbacks."

    - question: "What callbacks are required?"
      answer: "Provide `previewCallback()` for preview URL and `completionCallback()` to return the blob for insertion."

    - question: "How do I handle drag events?"
      answer: 'Listen for `"dragstart"` and `"dragend"` events using `addOnUISdk.app.on()`.'

    - question: "What's special about audio content?"
      answer: "Audio requires an `attributes` object with a `title` property in the completion callback return."

    - question: "Can I drag remote images?"
      answer: "Yes, fetch the remote URL in the completion callback and return the blob."

    - question: "How do I use sourceMimeType when dragging converted documents?"
      answer: 'Add `sourceMimeType` to the attributes object in completionCallback to show "Import a document" instead of "Import a PDF" in the consent dialog.'

    - question: "When should I include sourceMimeType in drag operations?"
      answer: "Use it when dragging PDFs that were converted from other document types like Word (.docx) or Google Docs (.gdoc) to provide clearer user messaging."

    - question: "What sourceMimeType values work for drag and drop?"
      answer: 'Common values include "docx" for Word documents and "gdoc" for Google Docs. Use the original document format before PDF conversion.'

    - question: "What event handlers should I avoid?"
      answer: "Avoid pointer event handlers that prevent default or stop propagation on drag-enabled elements."
      
    - question: "How do I attach custom metadata to dragged content?"
      answer: "Use the `importAddOnData` property in completionCallback return with `nodeAddOnData` and `mediaAddOnData` objects to store custom metadata that can be retrieved later via document sandbox APIs."
---

# Use Drag-and-Drop

## With local images

You must invoke the [`addOnUISdk.app.enableDragToDocument()`](/references/addonsdk/addonsdk-app.md#enabledragtodocument) method for each draggable image to implement this feature. It accepts two parameters: the `HTMLElement` and an object with a `previewCallback()` that returns the image URL for preview purposes, and a `completionCallback()` that fetches the corresponding blob to finalize insertion into the document.

You also need to listen for `"dragstart"` and `"dragend"` events to manage logs or other custom behaviour when the user interacts with the images.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready before rendering elements in the DOM.
addOnUISdk.ready.then(async () => {
  // Create the image element in the DOM.
  const image = document.createElement("img");
  image.id = "image.jpg";
  // The image is local to the add-on.
  image.src = "./images/image.jpg";
  image.addEventListener("click", addToDocument);

  // Enable drag to document for the image.
  addOnUISdk.app.enableDragToDocument(image, {
    previewCallback: (element) => {
      // return the new URL for preview purposes
      return new URL(element.src);
    },
    completionCallback: async (element) => {
      // return the blob for the image
      return [{ blob: await getBlob(element.src) }];
      
      // To attach add-on specific metadata that can be retrieved later:
      // return [{ 
      //   blob: await getBlob(element.src),
      //   importAddOnData: {
      //     nodeAddOnData: { "imageId": "123", "category": "photo" },
      //     mediaAddOnData: { "source": "gallery", "tags": "nature,landscape" }
      //   }
      // }];
    },
  });

  // Add the image to the document.
  document.body.appendChild(image);
});

// Utility functions

//Add image to the document.
async function addToDocument(event) {
  const url = event.currentTarget.src;
  const blob = await getBlob(url);
  addOnUISdk.app.document.addImage(blob);
}

// Handle "dragstart" event
function startDrag(eventData) {
  console.log("The drag event has started for", eventData.element.id);
}

// Handle "dragend" event
function endDrag(eventData) {
  if (!eventData.dropCancelled) {
    console.log("The drag event has ended for", eventData.element.id);
  } else {
    console.log("The drag event was cancelled for", eventData.element.id);
  }
}

// Get the binary object for the image.
async function getBlob(url) {
  return await fetch(url).then((response) => response.blob());
}
```

## With remote images or audio

To implement drag and drop with remotely hosted images, you similarly invoke `addOnUISdk.app.enableDragToDocument()`, but you fetch the resource from its remote URL. Provide a `previewCallback()` that returns the preview URL and a `completionCallback()` that retrieves the image as a blob. You can then attach the same `"dragstart"` and `"dragend"` event handlers to log or customize interactions as needed.

<InlineAlert slots="text" variant="warning"/>

To drag audio content, you must specify an additional `attributes` object with a `title` property. A note on how to include it is found in the following example.

### Example

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Enable drag support for an element
function makeDraggableUsingUrl(elementId: string, previewUrl: string) {
  const image = document.getElementById(elementId);

  const dragCallbacks = {
    previewCallback: (image: HTMLElement) => {
      // Return a new URL for the remote preview
      return new URL(previewUrl);
    },
    completionCallback: async (image: HTMLElement) => {
      // Fetch and return the image blob
      const imageBlob = await fetch(image.src).then((response) =>
        response.blob()
      );
      return [{ blob: imageBlob }];

      // ⚠️ for audio content, an attributes object
      // with the title is mandatory. For example:
      // return [{ blob: audioBlob, attributes: { title: "Jazzy beats" } }];
      
      // To attach add-on specific metadata that can be retrieved later:
      // return [{ 
      //   blob: imageBlob,
      //   importAddOnData: {
      //     nodeAddOnData: { "trackId": "456", "genre": "jazz" },
      //     mediaAddOnData: { "artist": "Cool Cat", "album": "Smooth Sounds" }
      //   }
      // }];
    },
  };

  try {
    addOnUISdk.app.enableDragToDocument(image, dragCallbacks);
  } catch (error) {
    console.log("Failed to enable DragToDocument:", error);
  }
}

// Log start of the drag event
addOnUISdk.app.on("dragstart", (eventData: DragStartEventData) => {
  console.log("The drag event has started for", eventData.element);
});

// Log end of the drag event
addOnUISdk.app.on("dragend", (eventData: DragEndEventData) => {
  if (!eventData.dropCancelled) {
    console.log("The drag event has ended for", eventData.element);
    disableDragToDocument();
  } else {
    console.log("The drag event was cancelled for", eventData.element);
    console.log("Cancel Reason:", eventData.dropCancelReason);
  }
});
```

## Dragging converted documents

If the drag and drop operation is used to import a PDF document, and was specifically one converted from a Word document (`.docx`) or Google Docs (`.gdoc`) format, to improve the user experience, use the `sourceMimeType` parameter in the `attributes` object. This ensures that when users drag the converted PDF, the import consent dialog shows "Import a document" instead of "Import a PDF".

```ts
// Enable drag support for a converted document
function makeDraggableConvertedDoc(elementId: string, convertedPdfBlob: Blob, originalMimeType: string) {
  const element = document.getElementById(elementId);

  const dragCallbacks = {
    previewCallback: (element: HTMLElement) => {
      // URL of image to display during drag operation
      return new URL(element.src);
    },
    completionCallback: async (element: HTMLElement) => {
      // Return the converted PDF blob with source mime type information
      return [{
        blob: convertedPdfBlob,
        attributes: {
          title: "Converted Document",
          sourceMimeType: originalMimeType // "docx" or "gdoc"
        }
      }];
    },
  };

  addOnUISdk.app.enableDragToDocument(element, dragCallbacks);
}
```

## Best Practices and Limitations

If the content being dragged is an animated GIF, it will be added as an animated GIF to the document, as long as it fits [the size criteria for animated GIF's](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html). In the event that it doesn't fit the size criteria, an error toast will be shown to the user.

Since the Add-on SDK uses pointer event handlers to perform drag operations, you should ensure that you don't attach any pointer event handlers that prevent default or stop propagation. Adding those types of handlers will kill the built-in handlers and cause the events not to work.

You should not attach `click` event listeners to drag-enabled elements in the capture phase, as the Add-on SDK attaches a `cancelClickEvent` handler to drag-enabled elements to ensure that the automatic click (pointer down + pointer up automatically fires a click event) doesn't fire. Adding other handlers to this same element will trigger them on drag & drop completion.

<InlineAlert slots="text" variant="info"/>

Use Chrome devTools to check the handlers attached to the element and its ancestors to identify any that may be causing conflicts with drag and drop handlers.

There are several [code samples](../samples.md) that implement drag and drop, including the [import-images-using-oauth](../samples.md#import-images-using-oauth) and [pix](../samples.md#pix) projects that you can reference.

## FAQs

#### Q: How do I enable drag-and-drop for an element?

**A:** Call `addOnUISdk.app.enableDragToDocument(element, callbacks)` with preview and completion callbacks.

#### Q: What callbacks are required?

**A:** Provide `previewCallback()` for preview URL and `completionCallback()` to return the blob for insertion.

#### Q: How do I handle drag events?

**A:** Listen for `"dragstart"` and `"dragend"` events using `addOnUISdk.app.on()`.

#### Q: What's special about audio content?

**A:** Audio requires an `attributes` object with a `title` property in the completion callback return.

#### Q: Can I drag remote images?

**A:** Yes, fetch the remote URL in the completion callback and return the blob.

#### Q: How do I use sourceMimeType when dragging converted documents?

**A:** Add `sourceMimeType` to the attributes object in completionCallback to show "Import a document" instead of "Import a PDF" in the consent dialog.

#### Q: When should I include sourceMimeType in drag operations?

**A:** Use it when dragging PDFs that were converted from other document types like Word (.docx) or Google Docs (.gdoc) to provide clearer user messaging.

#### Q: What sourceMimeType values work for drag and drop?

**A:** Common values include "docx" for Word documents and "gdoc" for Google Docs. Use the original document format before PDF conversion.

#### Q: What event handlers should I avoid?

**A:** Avoid pointer event handlers that prevent default or stop propagation on drag-enabled elements.

#### Q: How do I attach custom metadata to dragged content?

**A:** Use the `importAddOnData` property in completionCallback return with `nodeAddOnData` and `mediaAddOnData` objects to store custom metadata that can be retrieved later via document sandbox APIs.
