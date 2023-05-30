# Import Content
Import content such as images and videos into the active document (aka: page).

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface Application {
  /**
   * Represents the active document of the host application
   */
  readonly document: Document;
}

interface Document {
  /**
   * Add image/video to the current page
   */
  addImage(imageBlob: Blob): Promise<void>;

  /**
   * Add video to the current page
   */
  addVideo(videoBlob: Blob): Promise<void>;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Reference to the active document
const { document } = AddOnSdk.app;

// Add image(blob) to the current page
async function addImageFromBlob(blob) {
  try {
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the Page.");
  }
}

// Add image(url) to the current page
async function addImageFromURL(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the Page.");
  }
}

// Add video(blob) to the current page
async function addVideoFromBlob(blob) {
  try {
    await document.addVideo(blob);
  } catch (error) {
    console.log("Failed to add the video to the Page.");
  }
}

// Add video(url) to the current page
async function addVideoFromURL(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    await document.addVideo(blob);
  } catch (error) {
    console.log("Failed to add the video to the Page.");
  }
}
```

<InlineAlert slots="text" variant="warning"/>

Please note, the supported file types for imported content are currently **`png/jpg/mp4`,** and the size of the imported images must not exceed **8000 px** or **40 MB**.

<InlineAlert slots="text" variant="success"/>

Many of the samples we've included in the [code samples](guides/develop/samples) implement the Import APIs, so please use them as a reference. This includes the the **import-images-from-local**, **import-images-using-oauth**, **giphy**, **qrcode** and **dropbox** samples.
