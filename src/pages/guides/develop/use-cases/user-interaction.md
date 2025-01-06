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
title: User Interaction
description: Enhance user engagement with drag-and-drop functionality, modal dialogs, and other UI elements.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# User Interaction

## Drag and Drop

If you want to allow a user to drag and drop items from your add-on to the document, you can use the [methods provided in the add-on SDK](../../../references/addonsdk/addonsdk-app.md#enabledragtodocument). There are also several [code samples](../../../samples.md) that implement drag and drop, including the [import-images-using-oauth](../../../samples.md#import-images-using-oauth) and [pix](../../../samples.md#pix) samples you can reference. Some example use cases are shown below.

<InlineAlert slots="text" variant="warning"/>

To drag audio content, you must specify an additional `attributes` object with a `title` property. A note on how to include it found in the [second example below](#example-using-an-image-url).

### Example using local images

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const IMAGES = new Map([
    ["image1.jpg", "./images/image1.jpg"],    
    ["image2.jpg", "./images/image2.jpg"],
    ["image3.jpg", "./images/image3.jpg"]
]);

let gallery;

// Wait for the SDK to be ready before rendering elements in the DOM.
addOnUISdk.ready.then(async () => {
    // Create elements in the DOM.
    gallery = document.createElement("div");
    gallery.className = "gallery";

    IMAGES.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        image.addEventListener("click", addToDocument);

        // Enable drag to document for the image.
        addOnUISdk.app.enableDragToDocument(image, {
            previewCallback: element => {
                return new URL(element.src);
            },
            completionCallback: async (element) => {
                return [{ blob: await getBlob(element.src) }];
            }
        });

        gallery.appendChild(image);
    });

    // Register event handler for "dragstart" event
    addOnUISdk.app.on("dragstart", startDrag);
     // Register event handler for 'dragend' event
    addOnUISdk.app.on("dragend", endDrag);

    document.body.appendChild(gallery);
});

/**
 * Add image to the document.
 */
async function addToDocument(event) {
    const url = event.currentTarget.src;
    const blob = await getBlob(url);
    addOnUISdk.app.document.addImage(blob);
}

/**
 * Handle "dragstart" event
 */
function startDrag(eventData) {
    console.log("The drag event has started for", eventData.element.id);
}

/**
 * Handle "dragend" event
 */
function endDrag(eventData) {
    if (!eventData.dropCancelled) {
        console.log("The drag event has ended for", eventData.element.id);
    } else {
        console.log("The drag event was cancelled for", eventData.element.id);
    }
}

/**
 * Get the binary object for the image.
 */
async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}

```

### Example using an image URL

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Enable drag support for an element
function makeDraggableUsingUrl(elementId: string, previewUrl: string) {
  const image = document.getElementById(elementId);

  const dragCallbacks = {
    previewCallback: (image: HTMLElement) => {
      return new URL(previewUrl);
    },
    completionCallback: async (image: HTMLElement) => {
      const imageBlob = await fetch(image.src).then((response) =>
        response.blob()
      );
      return [{ blob: imageBlob }];
      // Note: for audio content, an attributes object with the title is mandatory. 
      // For instance, replace the above return with the following:
      // return [{blob: audioBlob, attributes: { title: "Jazzy beats" }}];
    },
  };

  try {
    addOnUISdk.app.enableDragToDocument(image, dragCallbacks);
  } catch (error) {
    console.log("Failed to enable DragToDocument:", error);
  }
}

addOnUISdk.app.on("dragstart", (eventData: DragStartEventData) => {
  console.log("The drag event has started for", eventData.element);
});

addOnUISdk.app.on("dragend", (eventData: DragEndEventData) => {
  if (!eventData.dropCancelled) {
    console.log("The drag event has ended for", eventData.element);
    disableDragToDocument();
  } else {
    console.log("The drag event was cancelled for", eventData.element);
    console.log("Cancel Reason: ", eventData.dropCancelReason);
  }
});
```

**Important Notes:**

- If the content being dragged is an animated GIF, it will be added as an animated GIF to the document, as long as it fits [the size criteria for animated GIF's](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html). In the event that it doesn't fit the size criteria, an error toast will be shown to the user.
- Since the Add-on SDK uses pointer event handlers to perform drag operations, you should ensure that you don't attach any pointer event handlers that prevent default or stop propagation. Adding those types of handlers will kill the built-in handlers and cause the events not to work.
- You should not attach `click` event listeners to drag-enabled elements in the capture phase, as the Add-on SDK attaches a `cancelClickEvent` handler to drag-enabled elements to ensure that the automatic click (pointer down + pointer up automatically fires a click event) doesn't fire. Adding other handlers to this same element will trigger them on drag & drop completion.
- **TIP:** Use Chrome devTools to check the handlers attached to the element and its ancestors to identify any that may be causing conflicts with drag and drop handlers.

## Modal Dialogs

When you need to pop up a dialog to show a certain message, such as an informational, warning, or error message, you can use a modal dialog. Below are some examples of the different types. Also, check out the SDK references for details on how to [show](../../../references/addonsdk/addonsdk-app.md#showmodaldialog) or [programmatically close a dialog](../../../references/addonsdk/runtime-dialog.md#close), as well as the [dialog add-on sample](../../../samples.md#dialog-add-on) for more details.

### Simple Modal Dialog Example

The following example shows how to display a simple confirmation dialog.

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;

async function showConfirmDialog() {
    try {
        // Confirmation Dialog Example
        let dialogOptions = {
            variant: "confirmation",
            title: "Enable smart Filters",
            description: "Smart filters are nondestructive and will preserve your original images.",
            buttonLabels: { primary: "Enable", cancel: "Cancel" },
        };    
        const result = await addOnUISdk.app.showModalDialog(dialogOptions);
        console.log("Button type clicked " + result.buttonType); 
    } catch (error) {
        console.log("Error showing modal dialog:", error);
    }
}
```

### Input Modal Dialog Example

Below is an example of using an `input` dialog that accepts input you can retrieve:

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;

async function showInputDialog() {
    try {
        // Input Dialog Example
        let inputDialogOptions = {
            variant: "input",
            title: "Please enter your key",
            description: "Your API key",
            buttonLabels: { cancel: "Cancel" },           
            field: {
                label: "API Key",
                placeholder: "Enter API key", 
                fieldType: "text",
            },
        }

        const inputDialogResult = await addOnUISdk.app.showModalDialog(inputDialogOptions);
        if (inputDialogResult.buttonType === "primary") {
            console.log("Field value " + inputDialogResult.fieldValue); // returns the input the user entered if they didn't cancel
        }
    } catch (error) {
        console.log("Error showing modal dialog:", error);
    }
}
```

### Custom Dialog Example

This example shows how you can define custom content for your dialog in a separate source file (`dialog.html` in this case) and with a custom height and title.

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;
 
function useCustomDialogResult(data: unknown) {
  // Use the dialog data
}

// Custom Dialog
async function showCustomDialog() {
  try {
    const dialogResult = await addOnUISdk.app.showModalDialog({
        variant: "custom",
        title: "Custom Modal",
        src: "dialog.html", // use content from this html file
        size: { width: 600, height: 400 }
    });
 
    // Use data received from the custom dialog
    useCustomDialogResult(dialogResult.result);
 
  } catch (error) {
    console.log("Error showing modal dialog:", error);
  }
}
```

<InlineAlert slots="text" variant="success"/>

Check out the [add-on SDK](../../../references/addonsdk/index.md) for more specific details on using modal dialogs, including [programmatically closing a dialog with an optional custom result](../../../references/addonsdk/runtime-dialog.md#close).
