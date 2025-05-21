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
---

# Use Audio

## Import audio into the page

Similarly to Images and Video, you can add Audio to the page using the [`addAudio()`](../../../references/addonsdk/app-document.md#addaudio) method of the `addOnUISdk.app.document` object, which expects a `Blob` object as the first argument, and a [`MediaAttribute`](../../../references/addonsdk/app-document.md#mediaattributes) object with the audio's title (mandatory) and author (optional) as the second.

### Example

```js
// sandbox/code.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // 👇 Local audio
     const audioUrl =
      "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11a1021133-3114.mp3";
    const audio = await fetch(audioUrl);
    // ... same as before
```

<InlineAlert slots="header, text" variant="info"/>

**Audio file requirements**

Please refer to [this page](https://helpx.adobe.com/au/express/create-and-edit-videos/change-file-formats/video-quick-actions-requirements.html) to know more about the file formats support and size/length requirements for audio.
