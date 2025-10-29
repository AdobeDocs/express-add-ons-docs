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
  - Audio
  - addAudio
title: Use Audio
description: Use Audio.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I add audio to a page?"
      answer: 'Call `addOnUISdk.app.document.addAudio(blob, attributes)` with audio blob and MediaAttribute object.'

    - question: "What parameters does addAudio require?"
      answer: "A Blob object and a MediaAttribute object with mandatory title and optional author properties."

    - question: "How do I get audio as a blob?"
      answer: 'Use `fetch(audioUrl).then(r => r.blob())` to convert audio files to blob format.'

    - question: "Can I use local audio files?"
      answer: "Yes, use relative paths from add-on root with fetch() to load local audio files."

    - question: "What attributes are required for audio?"
      answer: "Title is mandatory, author is optional in the MediaAttribute object."

    - question: "Can I use remote audio URLs?"
      answer: "Yes, fetch remote audio URLs and convert to blob before adding to document."

    - question: "What audio formats are supported?"
      answer: "Refer to Adobe Express file format requirements page for supported audio formats and size limits."

    - question: "How do I handle audio loading errors?"
      answer: "Use try/catch blocks around fetch() and addAudio() calls to handle loading failures."
---

# Use Audio

## Import audio into the page

Similarly to Images and Video, you can add Audio to the page using the [`addAudio()`](../../../references/addonsdk/app-document.md#addaudio) method of the `addOnUISdk.app.document` object, which expects a `Blob` object as the first argument, and a [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with the audio's title (mandatory) and author (optional) as the second.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    const audioUrl =
      "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11a1021133-3114.mp3";

    const audio = await fetch(audioUrl);
    const audioBlob = await audio.blob();

    await addOnUISdk.app.document.addAudio(
      audioBlob, // 👈 Blob object
      {
        title: "Apollo 11 - Lunar Landing",
        author: "NASA",
      }
    );
  } catch (e) {
    console.error("Failed to add the audio", e);
  }
});
```

Please note that you can use `fetch()` also to get videos that are local to the add-on; in this case, you can use paths relative to the add-on's root.

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // 👇 Local audio
     const audioUrl =
      "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11a1021133-3114.mp3";
    const audio = await fetch(audioUrl);
    // ... same as before
```

<InlineAlert slots="header, text" variant="info"/>

### Audio file requirements

Please refer to [this page](https://helpx.adobe.com/au/express/create-and-edit-videos/change-file-formats/video-quick-actions-requirements.html) to know more about the file formats support and size/length requirements for audio.

## FAQs

#### Q: How do I add audio to a page?

**A:** Call `addOnUISdk.app.document.addAudio(blob, attributes)` with audio blob and MediaAttribute object.

#### Q: What parameters does addAudio require?

**A:** A Blob object and a MediaAttribute object with mandatory title and optional author properties.

#### Q: How do I get audio as a blob?

**A:** Use `fetch(audioUrl).then(r => r.blob())` to convert audio files to blob format.

#### Q: Can I use local audio files?

**A:** Yes, use relative paths from add-on root with fetch() to load local audio files.

#### Q: What attributes are required for audio?

**A:** Title is mandatory, author is optional in the MediaAttribute object.

#### Q: Can I use remote audio URLs?

**A:** Yes, fetch remote audio URLs and convert to blob before adding to document.

#### Q: What audio formats are supported?

**A:** Refer to Adobe Express file format requirements page for supported audio formats and size limits.

#### Q: How do I handle audio loading errors?

**A:** Use try/catch blocks around fetch() and addAudio() calls to handle loading failures.
