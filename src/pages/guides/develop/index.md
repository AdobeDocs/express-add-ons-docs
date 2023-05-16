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
title: Guides
description: This is the develop main page
contributors:
  - https://github.com/hollyschinsky
---

# Using SDKs

## Importing Content
APIs are available for importing images and videos to your document, for instance after you've connected to a 3rd party service via OAuth and want to allow the user to use the images retrieved.  

<InlineAlert slots="text" variant="warning"/>

Please note, the supported file types are currently **`png/jpg/mp4`**. and the size of the imported images must not exceed **8000 px** or **40 MB**.

```js
// Reference to the active document
const { document } = AddOnSDKAPI.app;

// Add image via blob to the current page
async function addImageFromBlob(blob) {
  try {
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the Page.");
  }
}

// Add image via url to the current page
async function addImageFromURL(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the Page.");
  }
}
```


## Exporting Content
Export renditions of a page or document in **jpg**, **png**, **pdf** and **mp4** formats. Specify a range and format to define exactly what you want to export, and pass them in to the `createRenditions` API to generate your renditions.

```js
const preview = await AddOnSDKAPI.app.document.createRenditions({
    range: range,
    format: "image/jpeg",
});
exportUtils.addImg(preview);
```


## Authenticating with OAuth 2.0

## Using Data

## Drag and Drop

## Theming your add-on

## Locale and Localization
