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
  - Video
  - Media
  - mp4
  - addVideo
title: Use Videos
description: Use Videos.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I add video to a page?"
      answer: 'Call `addOnUISdk.app.document.addVideo(blob)` with a video blob object.'

    - question: "What parameter does addVideo require?"
      answer: "Only a Blob object containing the video data."

    - question: "How do I get video as a blob?"
      answer: 'Use `fetch(videoUrl).then(r => r.blob())` to convert video files to blob format.'

    - question: "Can I use local video files?"
      answer: "Yes, use relative paths from add-on root with fetch() to load local video files."

    - question: "Can I use remote video URLs?"
      answer: "Yes, fetch remote video URLs and convert to blob before adding to document."

    - question: "What video formats are supported?"
      answer: "Refer to Adobe Express file format requirements page for supported video formats and size limits."

    - question: "How do I handle video loading errors?"
      answer: "Use try/catch blocks around fetch() and addVideo() calls to handle loading failures."
---

# Use Videos

## Import videos into the page

Similarly to Images and Audio, you can add Videos to the page using the [`addVideo()`](../../../references/addonsdk/app-document.md#addvideo) method of the `addOnUISdk.app.document` object, which expects a `Blob` object as an argument.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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
// sandbox/code.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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

## FAQs

#### Q: How do I add video to a page?

**A:** Call `addOnUISdk.app.document.addVideo(blob)` with a video blob object.

#### Q: What parameter does addVideo require?

**A:** Only a Blob object containing the video data.

#### Q: How do I get video as a blob?

**A:** Use `fetch(videoUrl).then(r => r.blob())` to convert video files to blob format.

#### Q: Can I use local video files?

**A:** Yes, use relative paths from add-on root with fetch() to load local video files.

#### Q: Can I use remote video URLs?

**A:** Yes, fetch remote video URLs and convert to blob before adding to document.

#### Q: What video formats are supported?

**A:** Refer to Adobe Express file format requirements page for supported video formats and size limits.

#### Q: How do I handle video loading errors?

**A:** Use try/catch blocks around fetch() and addVideo() calls to handle loading failures.
