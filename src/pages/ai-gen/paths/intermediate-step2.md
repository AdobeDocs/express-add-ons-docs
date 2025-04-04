---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - User Interaction
  - Drag and Drop
  - Modal Dialogs
  - User Experience
title: Working with User Interaction
description: Learn how to create interactive experiences for your users through drag and drop functionality and modal dialogs.
contributors:
  - https://github.com/hollyschinsky
---

# Module 2: Working with User Interaction

**Estimated time: 2 hours**

Creating engaging add-ons requires thoughtful interaction design. In this step, you'll learn how to implement two powerful interaction patterns: drag and drop functionality and modal dialogs. These features enhance your add-on's usability and enable more sophisticated workflows.

## Implementing Drag and Drop

Drag and drop functionality allows users to intuitively move content from your add-on directly into their Adobe Express document. This creates a seamless experience for adding assets like images, text, or design elements.

### Setting Up Drag and Drop

To enable drag and drop in your add-on:

1. Use the `enableDragToDocument` method on elements
2. Provide appropriate data for the drag operation
3. Handle the drag events for visual feedback

Here's a basic implementation:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  setupDragAndDrop();
});

function setupDragAndDrop() {
  // Get the elements that should be draggable
  const draggableElements = document.querySelectorAll('.draggable-item');
  
  draggableElements.forEach(element => {
    // Enable drag to document on this element
    addOnUISdk.app.enableDragToDocument(element, {
      previewCallback: () => {
        // Return data for creating the drag preview
        return {
          // The type of content being dragged
          type: "image", // or "text", etc.
          
          // For images, provide the URL
          url: element.dataset.imageUrl
        };
      },
      completionCallback: async () => {
        // This is called when the user drops the element on the document
        try {
          // You might want to add the dropped content programmatically too
          const imageUrl = element.dataset.imageUrl;
          await addOnUISdk.app.document.addImage(imageUrl);
          console.log("Image added via drag and drop");
          
          // You can also perform analytics or update UI state here
          updateDragCounter();
        } catch (error) {
          console.error("Error during drag completion:", error);
        }
      }
    });
    
    // Add visual feedback during drag
    element.addEventListener('dragstart', () => {
      element.classList.add('dragging');
    });
    
    element.addEventListener('dragend', () => {
      element.classList.remove('dragging');
    });
  });
}

// Example of updating UI after a drag operation
function updateDragCounter() {
  const counter = document.getElementById('drag-counter');
  const currentCount = parseInt(counter.textContent) || 0;
  counter.textContent = currentCount + 1;
}
```

### Dragging Different Content Types

You can set up drag operations for various content types:

#### Images

```javascript
addOnUISdk.app.enableDragToDocument(imageElement, {
  previewCallback: () => {
    return {
      type: "image",
      url: imageUrl
    };
  }
});
```

#### Text

```javascript
addOnUISdk.app.enableDragToDocument(textElement, {
  previewCallback: () => {
    return {
      type: "text",
      value: textContent
    };
  }
});
```

### Advanced Drag and Drop Features

For more sophisticated interactions, you can:

1. **Customize drag previews**: Style the element that appears during the drag operation
2. **Handle drag over states**: Provide visual feedback when dragging over different drop targets
3. **Implement drag grouping**: Allow users to drag multiple items together

```javascript
// Example of custom drag preview styling
element.addEventListener('dragstart', (event) => {
  // Create a custom drag preview image
  const preview = document.createElement('div');
  preview.classList.add('custom-drag-preview');
  preview.textContent = 'Dragging: ' + element.dataset.name;
  document.body.appendChild(preview);
  
  // Use the custom preview
  event.dataTransfer.setDragImage(preview, 10, 10);
  
  // Remove the temporary element after a short delay
  setTimeout(() => {
    document.body.removeChild(preview);
  }, 0);
});
```

## Creating Modal Dialogs

Modal dialogs are important for focused interactions, like collecting user input, displaying detailed information, or confirming actions. The Add-on SDK provides APIs to create and manage modal dialogs within your add-on.

### Basic Modal Dialog Implementation

Here's how to create a simple modal dialog:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  document.getElementById('show-dialog-button').addEventListener('click', showModal);
});

async function showModal() {
  try {
    // Configure dialog options
    const dialogOptions = {
      size: {
        width: 500,
        height: 400
      },
      title: "Sample Dialog"
    };
    
    // Define the HTML content for the dialog
    const dialogHtml = `
      <div class="dialog-content">
        <h2>Dialog Content</h2>
        <p>This is a modal dialog created with the Add-on SDK.</p>
        <input type="text" id="dialog-input" placeholder="Enter some text">
        <div class="dialog-buttons">
          <button id="dialog-cancel">Cancel</button>
          <button id="dialog-confirm">Confirm</button>
        </div>
      </div>
    `;
    
    // Show the dialog and get a reference to the dialog object
    const dialog = await addOnUISdk.app.showModalDialog(dialogOptions, dialogHtml);
    
    // Set up a promise that will resolve when the dialog is closed
    const result = await new Promise((resolve) => {
      // Listen for messages from the dialog
      dialog.addEventListener('message', (event) => {
        const { data } = event;
        
        if (data.action === 'confirm') {
          // User clicked confirm
          resolve({
            confirmed: true,
            inputValue: data.inputValue
          });
        } else if (data.action === 'cancel') {
          // User clicked cancel
          resolve({
            confirmed: false
          });
        }
      });
      
      // Handle dialog closing without explicit action
      dialog.addEventListener('close', () => {
        resolve({
          confirmed: false
        });
      });
    });
    
    // Close the dialog when done
    await dialog.close();
    
    // Do something with the result
    if (result.confirmed) {
      console.log("User confirmed with input:", result.inputValue);
      // Update your add-on based on the user input
      updateAddOnWithDialogResult(result.inputValue);
    } else {
      console.log("Dialog was cancelled");
    }
  } catch (error) {
    console.error("Error showing dialog:", error);
  }
}

// Dialog communication script (this runs inside the dialog)
function dialogScript() {
  // Get references to dialog elements
  const cancelButton = document.getElementById('dialog-cancel');
  const confirmButton = document.getElementById('dialog-confirm');
  const inputField = document.getElementById('dialog-input');
  
  // Set up event listeners
  cancelButton.addEventListener('click', () => {
    // Send a message to the parent (the add-on)
    window.parent.postMessage({
      action: 'cancel'
    }, '*');
  });
  
  confirmButton.addEventListener('click', () => {
    // Send a message with the input value to the parent
    window.parent.postMessage({
      action: 'confirm',
      inputValue: inputField.value
    }, '*');
  });
}

// Function to update the add-on based on dialog result
function updateAddOnWithDialogResult(value) {
  document.getElementById('result-display').textContent = `You entered: ${value}`;
}
```

### Dialog Types and Use Cases

Modal dialogs serve different purposes in add-ons:

1. **Input Collection**: Gather user preferences or configuration options
2. **Confirmation**: Confirm potentially destructive or significant actions
3. **Preview**: Show larger previews of content or detailed information
4. **Multi-step Workflows**: Guide users through complex processes step by step

### Sizing and Styling Dialogs

You can control the appearance and dimensions of your modal dialogs:

```javascript
const dialogOptions = {
  size: {
    width: 800,  // Width in pixels
    height: 600  // Height in pixels
  },
  title: "Custom Dialog",  // Dialog title shown in the header
  
  // Optional custom styles for the dialog container
  styles: {
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"
  }
};
```

### Dialog Content Best Practices

When creating dialogs, follow these best practices:

1. **Keep Focused**: Each dialog should focus on a single task or related group of tasks
2. **Provide Clear Actions**: Make buttons descriptive ("Save Changes" vs. "OK")
3. **Use Appropriate Size**: Size the dialog appropriately for its content
4. **Handle Cancellation**: Always provide a way to cancel or dismiss the dialog
5. **Validate Input**: Check user input before processing and closing the dialog

## Practical Exercise: Image Gallery with Drag & Drop and Preview Dialogs

Let's build a practical example that combines both drag and drop and modal dialogs:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Sample image data
const galleryImages = [
  { id: 'img1', url: 'https://example.com/image1.jpg', title: 'Mountain Landscape' },
  { id: 'img2', url: 'https://example.com/image2.jpg', title: 'Ocean Sunset' },
  { id: 'img3', url: 'https://example.com/image3.jpg', title: 'Forest Path' },
  { id: 'img4', url: 'https://example.com/image4.jpg', title: 'Desert Dunes' }
];

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  initializeGallery();
});

function initializeGallery() {
  const galleryContainer = document.getElementById('image-gallery');
  
  // Create image elements and set up interactions
  galleryImages.forEach(image => {
    const imageElement = document.createElement('div');
    imageElement.className = 'gallery-item';
    imageElement.dataset.imageId = image.id;
    imageElement.dataset.imageUrl = image.url;
    imageElement.dataset.imageTitle = image.title;
    
    // Create thumbnail
    imageElement.innerHTML = `
      <img src="${image.url}" alt="${image.title}">
      <div class="image-title">${image.title}</div>
      <div class="image-actions">
        <button class="preview-button" data-id="${image.id}">Preview</button>
      </div>
    `;
    
    // Enable drag to document
    addOnUISdk.app.enableDragToDocument(imageElement, {
      previewCallback: () => {
        return {
          type: "image",
          url: image.url
        };
      },
      completionCallback: () => {
        console.log(`Image ${image.title} was added to the document via drag`);
      }
    });
    
    // Add preview button click handler
    imageElement.querySelector('.preview-button').addEventListener('click', () => {
      showImagePreviewDialog(image);
    });
    
    galleryContainer.appendChild(imageElement);
  });
  
  // Add drag visual feedback
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
    });
    
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });
}

async function showImagePreviewDialog(image) {
  try {
    const dialogOptions = {
      size: {
        width: 700,
        height: 500
      },
      title: image.title
    };
    
    const dialogHtml = `
      <div class="preview-dialog">
        <div class="preview-image-container">
          <img src="${image.url}" alt="${image.title}" class="preview-image">
        </div>
        <div class="preview-details">
          <h2>${image.title}</h2>
          <div class="preview-actions">
            <button id="add-to-document">Add to Document</button>
            <button id="close-preview">Close</button>
          </div>
        </div>
      </div>
      <style>
        .preview-dialog {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 16px;
        }
        .preview-image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 16px;
        }
        .preview-image {
          max-width: 100%;
          max-height: 350px;
          object-fit: contain;
        }
        .preview-details {
          padding: 8px 0;
        }
        .preview-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        }
        button {
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        #add-to-document {
          background-color: #1473E6;
          color: white;
          border: none;
        }
        #close-preview {
          background-color: #eee;
          border: 1px solid #ccc;
        }
      </style>
    `;
    
    const dialog = await addOnUISdk.app.showModalDialog(dialogOptions, dialogHtml);
    
    const result = await new Promise((resolve) => {
      dialog.addEventListener('message', (event) => {
        const { data } = event;
        resolve(data);
      });
      
      dialog.addEventListener('close', () => {
        resolve({ action: 'close' });
      });
    });
    
    await dialog.close();
    
    if (result.action === 'add') {
      // Add the image to the document programmatically
      await addOnUISdk.app.document.addImage(image.url);
      console.log(`Image ${image.title} was added to the document via dialog`);
    }
  } catch (error) {
    console.error("Error showing preview dialog:", error);
  }
}

// This script needs to be included in your dialog HTML
function dialogScript() {
  document.getElementById('add-to-document').addEventListener('click', () => {
    window.parent.postMessage({ action: 'add' }, '*');
  });
  
  document.getElementById('close-preview').addEventListener('click', () => {
    window.parent.postMessage({ action: 'close' }, '*');
  });
}
```

This example demonstrates a complete image gallery that allows users to:

- Browse a collection of images
- Drag images directly into their document
- View detailed previews in a modal dialog
- Add images to their document from the preview dialog

## Additional Resources

To deepen your understanding of user interaction features:

- [Drag and Drop](../../guides/develop/how_to/drag_and_drop.md)
- [Modal Dialogs](../../guides/develop/how_to/modal_dialogs.md)
- [Dialog Add-on Sample](/samples.md#dialog-add-on)

## Knowledge Check

Before moving to the next step, make sure you can answer these questions:

1. How do you enable drag and drop functionality in an add-on?
2. What is the difference between `previewCallback` and `completionCallback` in drag and drop?
3. How do you create and manage modal dialogs in an add-on?
4. What are good use cases for modal dialogs in add-ons?

## Next Step

Now that you understand how to create interactive user experiences, let's explore how to store and manage data in your add-ons.

[Proceed to Step 3: Storing and Managing Data →](intermediate-step3.md)

[← Back to Step 1: Working with Document Elements](intermediate-step1.md)
