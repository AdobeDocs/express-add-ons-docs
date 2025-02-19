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
title: Using Videos
description: Using Videos.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Using Videos

## Importing videos into the page

Similarly to Images and Audio, you can add Videos to the page using the [`addVideo()`](../../../references/addonsdk/app-document.md#addvideo) method of the `addOnUISdk.app.document` object, which expects a `Blob` object as an argument.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const videoUrl =
      "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-16mm-mag-c.mp4";
    const video = await fetch(videoUrl);
    const videoBlob = await video.blob();

    await addOnUISdk.app.document.addVideo(
      videoBlob // 👈 Blob object
    );
  } catch (e) {
    console.error("Failed to add the video", e);
  }
});
```

Please note that you can use `fetch()` also to get videos that are local to the add-on; in this case, you can use paths relative to the add-on's root.

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // 👇 Local video
    const videoUrl = "./7744218-uhd_2732_1440_25fps.mp4";
    const video = await fetch(videoUrl);
    // ... same as before
```

<InlineAlert slots="header, text" variant="info"/>

Video file requirements

Please refer to [this page](https://helpx.adobe.com/au/express/create-and-edit-videos/change-file-formats/video-quick-actions-requirements.html) to know more about the file formats support and size/length requirements for videos.
