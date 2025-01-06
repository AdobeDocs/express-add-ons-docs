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
title: Content Management
description:  Learn how to import and export various types of content, including videos, audio, and premium assets, into and from Adobe Express.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

## Importing Content

Importing content into a design is one of the most popular use cases for an add-on. For instance, to add content retrieved from a third-party service or directly from the local hard drive. The following sections cover all of the different types of content that can be imported/added to the document from your add-on.

### Image Content

The following example demonstrates how to add an image to the current page. The first function shows how to add an image directly from a `blob` object, and the second illustrates how to fetch an image via a URL to add. Please also refer to the [related SDK Reference section](../../../references/addonsdk/app-document.md#methods) and [code samples](../../../samples.md) for more details.

#### Add Image Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Reference to the active document
const { document } = addOnUISdk.app;

// Add image via blob to the current page
async function addImageFromBlob(blob) {
  try {
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the page.");
  }
}

// Add image via url to the current page
async function addImageFromURL(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the page.");
  }
}
```

### Animated Images

There's a specific method provided in the `AddOnSDK` to allow you to add animated images (gifs) to the current page as well.

#### Add Animated Image Example

```js
// Add animated image(blob) to the current page
async function addAnimatedImageFromBlob(blob) {
  try {
      await document.addAnimatedImage(blob);
  }
  catch(error) {
      console.log("Failed to add the animated image to the page.");
  }
}
```

<InlineAlert slots="text" variant="warning"/>

Refer to the [AddOnSDK Document Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#image-requirements) for specific details on supported image and GIF requirements.

### Video and Audio Content

You can also import video and audio content similarly via the [`addVideo()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addvideo) and [`addAudio()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#addaudio) methods. **Please note:** the `addAudio()` method requires an additional `MediaAttributes` object parameter containing the `title` of the audio object you're importing. See the example below, as well as the associated [SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#methods) for more details. There's also an [`audio-recording-add-on`](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/audio-recording-add-on) sample available that you can use as an additional reference.

#### Add Audio Example

```js
async function addAudioFromBlob(blob) {
  try {
      await document.addAudio(blob, {title: "Jazzy beats", author: "Jazzy"});
  }
  catch(error) {
      console.log("Failed to add the audio to the page.");
  }
}

async function addAudioFromURL(url) {
  try {
      const blob = await fetch(url).then(response => response.blob());
      await document.addAudio(blob, {title: "Jazzy beats", author: "Jazzy"});
  }
  catch(error) {
      console.log("Failed to add the audio to the page.");
  }
```

#### Add Video Example

```js
async function addVideoFromBlob(blob) {
  try {
      await document.addVideo(blob);
  }
  catch(error) {
      console.log("Failed to add the video to the page.");
  }
}

async function addVideoFromURL(url) {
  try {
     const blob = await fetch(url).then(response => response.blob());
     await document.addVideo(blob);
  }
  catch(error) {
    console.log("Failed to add the video to the page.");
  }
}
```

### PDFs and PowerPoint Presentations

If you need to import/add a PDF or a PowerPoint presentation to the document, you can use the designated import methods for each shown in the examples below.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The [`importPdf()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#import-content-methods) and [`importPresentation()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#import-content-methods) methods are currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of the `manifest.json`.

#### Import PDF Example

```js
import AddOnSDKAPI from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
  
// Reference to the active document
const {document} = AddOnSDKAPI.app;
 
const mediaAttributes = {title: "Sample.pdf"}
 
// Import a PDF. Note this will be imported as a new Adobe Express document.
function importPdf(blob, mediaAttributes) {
  try {
    document.importPdf(blob, mediaAttributes);
  }
  catch(error) {
    console.log("Failed to import the pdf.");
  }
}
 
// Import a PDF from a URL. Note this will be imported as a new Adobe Express document.
async function importPdfFrom(url) {
  try {
    const blob = await fetch(url).then(response => response.blob());
    document.importPdf(blob, {title: "Sample.pdf"});
  }
  catch(error) {
    console.log("Failed to import the pdf.");
  }
}
```

#### Import Presentation Example

```js
import AddOnSDKAPI from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
  
// Reference to the active document
const {document} = AddOnSDKAPI.app;
 
const mediaAttributes = {title: "Sample.pptx"} // only .pptx file types are supported by Express
 
// Import a presentation. Note: this will be imported as a new Adobe Express presentation.
function importPresentation(blob, mediaAttributes) {
  try {
    document.importPresentation(blob, mediaAttributes);
  }
  catch(error) {
    console.log("Failed to add the presentation to the document.");
  }
}
 
// Import a powerpoint presentation from a URL. Note: this will be imported as a new Adobe Express presentation.
async function importPresentationFrom(url) {
  try {
    const blob = await fetch(url).then(response => response.blob());
    document.importPresentation(blob, {title: "Sample.pptx"});
  }
  catch(error) {
    console.log("Failed to add the presentation to document.");
  }
}
```

## Exporting Content

Another popular feature available for use in your add-on is the ability to export content. For instance, if you want to allow the user to save/download the current design, (or range of a design), with certain export configurations to their local hard drive. Some examples for exporting content are provided below, but also check out the [`createRenditions` section in the SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#createrenditions) for more specific options and details, as well as the [export-sample add-on](../../../samples.md#export-sample).

The steps to export content:

- Call `createRenditions()` to get the renditions based on your export configuration options.
- Convert the `blob` object returned in the response to a `string` with the `URL.createObjectURL(blob)` method.
- Create or update an anchor `<a>` element's `href` value with the URL string from the above step.

### Basic Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const response = await addOnUISdk.app.document.createRenditions({
    range: "currentPage",
    format: "image/jpeg",
});

const downloadUrl = URL.createObjectURL(response[0].blob);
document.getElementById("anchor").href = downloadUrl; 

<a href="#" download="download" id="anchor" style="text-decoration: none">
  <sp-button id="download-button" style="display: none">Download</sp-button>
</a>
```

### Premium Content

While the above is a very basic example, add-ons that call `createRenditions` to export content should ensure proper handling in the case of premium content. There are a few strategies that can be implemented.

#### Option 1: Show a Premium Content error with the "Upgrade" option

Display a warning message when the user is not entitled to export/download premium content, and include a button to allow them to upgrade. Please note that you can detect in advance if the user is entitled to premium content ([`isPremiumUser()`](../../../references/addonsdk/app-current-user.md#isPremiumUser)) and whether the page contains premium content ([`hasPremiumContent`](../../../references/addonsdk/app-document.md#pagemetadata)) in the first place. A try/catch block intercepting the `"USER_NOT_ENTITLED_TO_PREMIUM_CONTENT"` string in the error message as the primary way to deal with it is no longer recommended.

#### Example:

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
const { app, constants } = addOnUISdk;
const { ButtonType, Range, RenditionFormat } = constants;

const showPremiumContentError = async () => {
  const { buttonType } = await window.addOnUISdk.app.showModalDialog({
    variant: "error",
    title: "Export failed",
    description: "Sorry, we were not able to export your design. Some assets are only included in the Premium plan. Try replacing with something else or upgrading Adobe Express to a Premium plan.", 
    buttonLabels: { secondary: "Upgrade" }
  });

  if (buttonType === ButtonType.cancel) return false; // user is still not premium
  if (buttonType === ButtonType.secondary) {
    // Original flow (don't use anymore)
    // ❌ window.open("https://www.adobe.com/go/express_addons_pricing", "_blank")
    // 👇 Use startPremiumUpgradeIfFreeUser() instead 
    const hasUpgradedToPremium = await app.startPremiumUpgradeIfFreeUser();
	return hasUpgradedToPremium;
  }
}

const isRangeSafeToExport = async (range) => {
  const userIsPremium = await app.currentUser.isPremiumUser();
  const pages = await app.document.getPagesMetadata({range});
  const containsPremiumContent = pages.some(page => page.hasPremiumContent);
  return (containsPremiumContent && userIsPremium) || !containsPremiumContent;  
}

const exportDocument = async () => {
  // 👇 Testing purposes only!
  app.devFlags.simulateFreeUser = true; // Remove this line in production!

  let isSafeToExport = await isRangeSafeToExport(Range.entireDocument);  
  if (!isSafeToExport) {
    const isNowPremiumUser = await showPremiumContentError();
    isSafeToExport = isNowPremiumUser;
  }
  
  if (isSafeToExport) {
    try {
      const renditions = await app.document.createRenditions({
        range: Range.entireDocument, format: RenditionFormat.png
      });
      renditions.forEach(rendition => { /* do your thing w/ the renditions */ });	  
    } catch (err) {
      // did someone just add premium content in the split second between
      // our original check? did the user just downgrade?
      if (err.message?.includes("USER_NOT_ENTITLED_TO_PREMIUM_CONTENT")) {
        return await exportDocument(); // try again
      }
    }
  }  
}

document.querySelector("#export").onclick = exportDocument;
```

Please note that [`startPremiumUpgradeIfFreeUser()`](../../../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) allows a more streamlined user experience for upgrading to premium content, compared to the older method of redirecting to the Adobe Express pricing page, which is now deprecated.

#### Option 2: Provide visual cues in the UI

Developers can provide visual cues directly in the add-on UI to show that users are not entitled to export/download premium content. This can be done in various ways, for instance, by disabling the export/download button, replacing it with an upgrade button, or appending a brief explanation, tooltip, or icon. This would inform users upfront that they are not entitled to export/download premium content, preventing them from facing the warning popup after attempting to do so.

#### Option 3: Allow preview of Premium Content

Set a `renditionPreview` intent in the [manifest requirements](../../../references/manifest/index.md#requirements), and add an extra argument to the [`createRenditions` method](../../../references/addonsdk/app-document.md#createrenditions) (ie: `RenditionIntent.preview`) to generate previews that can still use premium content.

**IMPORTANT**: Your add-on must not allow these previewed images to be downloaded or persisted on a backend (for any longer than necessary to serve the result back to the user). To that end, be sure that users cannot:

- **right-click -> save as**: To prevent this, reject the `contextmenu` event
- **drag the image off the panel**: To prevent this, you can reject the `dragstart` event

**Note:** These behaviors are enabled by default if you use an `<img>` tag. If you apply the image using `background-image` CSS, these behaviors aren't added.

#### Example:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7FAA77FF
    };
    const renditions = await addOnUISdk.app.document.createRenditions(renditionOptions, addOnUISdk.constants.RenditionIntent.preview);
    renditions.forEach(rendition => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  }
  catch(error) {
    console.log("Failed to create renditions:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;
  
// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7FAA77FF
    };
    const renditions = await addOnUISdk.app.document.createRenditions(renditionOptions, addOnUISdk.constants.RenditionIntent.preview);
    renditions.forEach(rendition => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  }
  catch(error) {
    console.log("Failed to create renditions:", error);
  }
}
```
