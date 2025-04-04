---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Document Elements
  - Images
  - Text
  - Positioning
  - Grouping
title: Working with Document Elements
description: Learn how to add, manipulate, and position different types of elements in Adobe Express documents.
contributors:
  - https://github.com/hollyschinsky
---

# Module 1: Working with Document Elements

**Estimated time: 2 hours**

In this step, you'll learn how to work with different types of elements in Adobe Express documents. Understanding how to effectively add, manipulate, and arrange elements is essential for creating add-ons that can meaningfully interact with user content.

## Understanding Document Elements

Adobe Express documents are composed of various elements, including:

- **Images**: Photos, graphics, illustrations
- **Text**: Headings, paragraphs, captions
- **Shapes**: Geometric shapes, lines, icons
- **Media**: Videos, audio clips
- **Groups**: Collections of elements treated as a single unit

Each element has properties like position, size, rotation, and opacity that can be manipulated through the Add-on SDK.

## Working with Images

Images are a fundamental element type in Adobe Express documents. Let's explore how to work with them:

### Adding Images to a Document

You can add images to a document from various sources:

```javascript
// Import image from a URL
async function addImageFromUrl() {
  try {
    const imageUrl = "https://example.com/image.jpg";
    await addOnUISdk.app.document.addImage(imageUrl);
    console.log("Image added successfully");
  } catch (error) {
    console.error("Error adding image:", error);
  }
}

// Import image from a file (after user selects it)
async function addImageFromFile(fileHandle) {
  try {
    const imageBlob = await fileHandle.getFile().then(file => file.arrayBuffer()).then(buffer => new Blob([buffer]));
    await addOnUISdk.app.document.addImage(imageBlob);
    console.log("Image added successfully");
  } catch (error) {
    console.error("Error adding image:", error);
  }
}
```

### Controlling Image Placement

You can specify where and how images are added to the document:

```javascript
async function addImageWithOptions() {
  try {
    const imageUrl = "https://example.com/image.jpg";
    await addOnUISdk.app.document.addImage(imageUrl, {
      position: { x: 100, y: 150 },
      width: 300,
      height: 200,
      rotation: 45 // degrees
    });
    console.log("Image added with custom placement");
  } catch (error) {
    console.error("Error adding image:", error);
  }
}
```

## Working with Text

Text elements are another essential component in Adobe Express documents:

### Adding Text to a Document

```javascript
async function addTextToDocument() {
  try {
    const textContent = "Hello, Adobe Express!";
    await addOnUISdk.app.document.addText(textContent, {
      position: { x: 100, y: 100 },
      width: 400
    });
    console.log("Text added successfully");
  } catch (error) {
    console.error("Error adding text:", error);
  }
}
```

### Styling Text

You can apply various styles to text elements:

```javascript
async function addStyledText() {
  try {
    const textContent = "Styled Text Example";
    await addOnUISdk.app.document.addText(textContent, {
      position: { x: 100, y: 100 },
      width: 400,
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF5733",
        alignment: "center"
      }
    });
    console.log("Styled text added successfully");
  } catch (error) {
    console.error("Error adding styled text:", error);
  }
}
```

## Positioning Elements

Precise positioning of elements is crucial for creating well-designed layouts:

### Basic Positioning

Elements can be positioned using x and y coordinates:

```javascript
// Position is specified in pixels from the top-left corner of the document
const position = { x: 100, y: 150 };
```

### Advanced Positioning Techniques

You can implement more sophisticated positioning strategies:

```javascript
// Center an element on the page
async function centerElementOnPage() {
  try {
    // Get the current page dimensions
    const pageInfo = await addOnUISdk.app.document.getCurrentPage();
    const pageWidth = pageInfo.width;
    const pageHeight = pageInfo.height;
    
    // Calculate center position (assuming element size of 200x100)
    const elementWidth = 200;
    const elementHeight = 100;
    const centerX = (pageWidth - elementWidth) / 2;
    const centerY = (pageHeight - elementHeight) / 2;
    
    // Add element at the calculated position
    await addOnUISdk.app.document.addText("Centered Text", {
      position: { x: centerX, y: centerY },
      width: elementWidth,
      height: elementHeight
    });
  } catch (error) {
    console.error("Error centering element:", error);
  }
}
```

## Grouping Elements

Grouping allows you to treat multiple elements as a single unit, which is useful for creating complex layouts or interactive components:

### Creating a Group

```javascript
async function createElementGroup() {
  try {
    // First, add multiple elements to the document
    const textElement = await addOnUISdk.app.document.addText("Grouped with an image", {
      position: { x: 100, y: 100 },
      width: 200
    });
    
    const imageElement = await addOnUISdk.app.document.addImage("https://example.com/image.jpg", {
      position: { x: 100, y: 150 },
      width: 200
    });
    
    // Get the element IDs
    const elementIds = [textElement.id, imageElement.id];
    
    // Group the elements
    await addOnUISdk.app.document.groupElements(elementIds);
    console.log("Elements grouped successfully");
  } catch (error) {
    console.error("Error creating group:", error);
  }
}
```

### Working with Existing Groups

You can also work with groups that already exist in the document:

```javascript
async function manipulateGroups() {
  try {
    // Get the current selection
    const selection = await addOnUISdk.app.document.getSelection();
    
    if (selection.items.length > 0) {
      // Check if any of the selected items is a group
      const groups = selection.items.filter(item => item.type === "GROUP");
      
      if (groups.length > 0) {
        // Get the first group's elements
        const groupElements = await addOnUISdk.app.document.getGroupElements(groups[0].id);
        console.log("Group contains:", groupElements);
        
        // Ungroup if desired
        await addOnUISdk.app.document.ungroupElements([groups[0].id]);
        console.log("Group has been ungrouped");
      }
    }
  } catch (error) {
    console.error("Error manipulating groups:", error);
  }
}
```

## Practical Exercise: Creating a Layout Helper

Let's apply what we've learned to create a simple layout helper add-on. This helper will allow users to:

1. Add a title text element
2. Add an image below the title
3. Add a caption text element below the image
4. Group these elements together

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  document.getElementById("create-layout").addEventListener("click", createLayout);
});

async function createLayout() {
  try {
    // Get input values
    const titleText = document.getElementById("title-input").value || "Default Title";
    const imageUrl = document.getElementById("image-url").value || "https://example.com/default.jpg";
    const captionText = document.getElementById("caption-input").value || "Default Caption";
    
    // Get page dimensions
    const pageInfo = await addOnUISdk.app.document.getCurrentPage();
    const pageWidth = pageInfo.width;
    
    // Calculate positions (centered horizontally)
    const startX = pageWidth * 0.1; // Start at 10% from left edge
    const contentWidth = pageWidth * 0.8; // Use 80% of page width
    let currentY = 100; // Start 100px from top
    
    // Add title
    const titleElement = await addOnUISdk.app.document.addText(titleText, {
      position: { x: startX, y: currentY },
      width: contentWidth,
      style: {
        fontSize: 24,
        fontWeight: "bold",
        alignment: "center"
      }
    });
    
    // Update Y position for image (add some spacing)
    currentY += 80;
    
    // Add image
    const imageElement = await addOnUISdk.app.document.addImage(imageUrl, {
      position: { x: startX, y: currentY },
      width: contentWidth
    });
    
    // Get image height and update Y position for caption
    const imageHeight = imageElement.height || 300; // Default if height is not returned
    currentY += imageHeight + 20; // Add spacing
    
    // Add caption
    const captionElement = await addOnUISdk.app.document.addText(captionText, {
      position: { x: startX, y: currentY },
      width: contentWidth,
      style: {
        fontSize: 14,
        fontStyle: "italic",
        alignment: "center"
      }
    });
    
    // Group all elements
    const elementIds = [titleElement.id, imageElement.id, captionElement.id];
    await addOnUISdk.app.document.groupElements(elementIds);
    
    console.log("Layout created successfully");
  } catch (error) {
    console.error("Error creating layout:", error);
  }
}
```

This example demonstrates how to create a functional layout with precisely positioned and styled elements, then group them together as a single unit.

## Additional Resources

To deepen your understanding of working with document elements:

- [Using Images](../../guides/develop/how_to/use_images.md)
- [Using Text](../../guides/develop/how_to/use_text.md)
- [Position Elements](../../guides/develop/how_to/position_elements.md)
- [Group Elements](../../guides/develop/how_to/group_elements.md)

## Knowledge Check

Before moving to the next step, make sure you can answer these questions:

1. How do you add images and text to an Adobe Express document?
2. What positioning options are available when adding elements?
3. How do you create and manipulate groups of elements?
4. How can you apply styling to text elements?

## Next Step

Now that you understand how to work with document elements, let's explore how to create interactive user experiences.

[Proceed to Step 2: Working with User Interaction →](intermediate-step2.md)

[← Back to Intermediate Path Overview](intermediate-index.md)
