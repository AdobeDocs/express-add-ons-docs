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
---

# Use Images

## Import Images into the page

Add-ons are hosted in an iframe within the Adobe Express UI, and can load images as `<img>` elements like any other web application. But in order to add images into an Adobe Express document, you need to use the [`addImage()`](../../../references/addonsdk/app-document.md#addimage) method of the `addOnUISdk.app.document` object.

It expects a `Blob` object as the first argument, and an optional [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with the image's title and author.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const imageUrl = "./600x400.png";     // 👈 Local image
    const image = await fetch(imageUrl);
    // ... same as before
```

<InlineAlert slots="header, text" variant="info"/>

Image requirements

Please refer to [this section](../../../references/addonsdk/app-document.md#image-requirements) to know more about the file formats support and size requirements for images.

## Import Animated images

Importing a `GIF` via `addImage()` won't work as expected, as the method converts the animation into a static image before adding it to the document. You should use the [`addAnimatedImage()`](../../../references/addonsdk/app-document.md#addanimatedimage) method instead.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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

GIF Image requirements

All image formats are equal, but some formats are more equal than others. Please refer to [this FAQ](../../support/faq.md#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document) to learn more about specific GIF limitations in terms of size and weight.
