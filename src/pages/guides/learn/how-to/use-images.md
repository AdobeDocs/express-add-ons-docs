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
  - Images
  - addImage
title: Use Images
description: Use Images.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I add images to a document?"
      answer: 'Call `addOnUISdk.app.document.addImage(blob, attributes)` with image blob and optional MediaAttribute.'

    - question: "What parameters does addImage require?"
      answer: "A Blob object is required, MediaAttribute with title and author is optional."

    - question: "How do I get an image as a blob?"
      answer: 'Use `fetch(imageUrl).then(r => r.blob())` to convert images to blob format.'

    - question: "Can I use local image files?"
      answer: "Yes, use relative paths from add-on root with fetch() to load local images."

    - question: "How do I add animated GIFs?"
      answer: 'Use `addOnUISdk.app.document.addAnimatedImage(blob, attributes)` instead of addImage().'

    - question: "Why doesn't addImage work with GIFs?"
      answer: "addImage() converts animations to static images; use addAnimatedImage() to preserve animation."

    - question: "What image formats are supported?"
      answer: "AI, GIF, JPEG, JPG, PNG, PSD, PSDT, and WEBP. 8000px or 80MB."

    - question: "Are there GIF size limitations?"
      answer: "Yes, refer to the FAQ section for specific GIF size and weight limitations."
---

# Use Images

## Import Images into the page

Add-ons are hosted in an iframe within the Adobe Express UI, and can load images as `<img>` elements like any other web application. But in order to add images into an Adobe Express document, you need to use the [`addImage()`](../../../references/addonsdk/app-document.md#addimage) method of the `addOnUISdk.app.document` object.

It expects a `Blob` object as the first argument, and an optional [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with the image's title and author.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const imageUrl = "https://placehold.co/600x400.png";
    const image = await fetch(imageUrl);
    const imageBlob = await image.blob();

    await addOnUISdk.app.document.addImage(
      imageBlob, // 👈 Blob object
      {
        title: "Placeholder image", // 👈 Optional MediaAttributes
        author: "Adobe Developer",
      }
    );
  } catch (e) {
    console.error("Failed to add the image", e);
  }
});
```

Please note that you can use `fetch()` also to get images that are local to the add-on; in this case, you can use paths relative to the add-on's root.

```js
// sandbox/code.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const imageUrl = "./600x400.png";     // 👈 Local image
    const image = await fetch(imageUrl);
    // ... same as before
```

<InlineAlert slots="header, text" variant="info"/>

**Image requirements**

Please refer to [this section](../../../references/addonsdk/app-document.md#image-requirements) to know more about the file formats support and size requirements for images.

## Import Animated images

Importing a `GIF` via `addImage()` won't work as expected, as the method converts the animation into a static image before adding it to the document. You should use the [`addAnimatedImage()`](../../../references/addonsdk/app-document.md#addanimatedimage) method instead.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const gifImageUrl = "https://path/to/a/file.gif"; // 👈 a GIF image
    const gifImage = await fetch(gifImageUrl);
    const gifImageBlob = await gifImage.blob();

    await addOnUISdk.app.document.addAnimatedImage(
      // 👈
      gifImageBlob, // 👈 Blob object
      {
        /* ... */
      } // 👈 Optional MediaAttributes
    );
  } catch (e) {
    console.error("Failed to add the image", e);
  }
});
```

<InlineAlert slots="header, text" variant="warning"/>

**GIF Image requirements**

All image formats are equal, but some formats are more equal than others. Please refer to [this FAQ](../../support/faq.md#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document) to learn more about specific GIF limitations in terms of size and weight.

## FAQs

#### Q: How do I add images to a document?

**A:** Call `addOnUISdk.app.document.addImage(blob, attributes)` with image blob and optional MediaAttribute.

#### Q: What parameters does addImage require?

**A:** A Blob object is required, MediaAttribute with title and author is optional.

#### Q: How do I get an image as a blob?

**A:** Use `fetch(imageUrl).then(r => r.blob())` to convert images to blob format.

#### Q: Can I use local image files?

**A:** Yes, use relative paths from add-on root with fetch() to load local images.

#### Q: How do I add animated GIFs?

**A:** Use `addOnUISdk.app.document.addAnimatedImage(blob, attributes)` instead of addImage().

#### Q: Why doesn't addImage work with GIFs?

**A:** addImage() converts animations to static images; use addAnimatedImage() to preserve animation.

#### Q: What image formats are supported?

**A:** AI, GIF, JPEG, JPG, PNG, PSD, PSDT, and WEBP. 8000px or 80MB.

#### Q: Are there GIF size limitations?

**A:** Yes, refer to the FAQ section for specific GIF size and weight limitations.
