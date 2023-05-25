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

# Add-on Recipes

## Overview
This set of recipes is provided to help you discover what's possible with our [APIs](../references/apis/) by providing some popular use cases with associated code snippets. Be sure to check out our [code samples](samples.md) as well which provide more extensive usage of each of these recipes.

## Importing Content
Importing content into the document is one of the most popular use cases, since it allows a user to add content retrieved from a third-party service, or their local hard drive, directly into their designs quickly and easily. You can use this feature in your add-ons using one of the functions below.

```js
// Reference to the active document
const { document } = AddOnSdk.app;

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

<InlineAlert slots="text" variant="info"/>

The supported file types for imported content are currently **`png/jpg/mp4`,** and the size of the imported images should not exceed **8000 px** or **40 MB**.


## Exporting Content
Another popular feature available for use in your add-on is the ability to export content. For instance, if you want to to allow the user to save/download the current design (or range of a design) with certain export configurations to their local hard drive. 

The steps to export content:
- Call `createRenditions()` to get the renditions based on your export configuration options. 
- Convert the blob object returned in the response to a string with the `URL.createObjectURL(blob)` method.
- Create/update an anchor `<a>` element's `href` value with the URL string from the above step.

<InlineAlert slots="text" variant="info"/>

Each page of your design is considered a single rendition. see the [API References](../references/apis/) for additional rendition options and values):

```js
const response = await AddOnSdk.app.document.createRenditions({
    range: "currentPage",
    format: "image/jpeg",
});

const downloadUrl = URL.createObjectURL(response[0].blob);
document.getElementById("anchor").href = downloadUrl; 

<a href="#" download="download" id="anchor" style="text-decoration: none">
  <sp-button id="download-button" style="display: none">Download</sp-button>
</a>
```

<!-- 2. Next, create a blob URL and attach it to an anchor element that can be clicked when you want to trigger the download. `blob:null/00f0b4e9-bc6a-432f-a147-b963f08e34a` -->


## Authenticating with OAuth 2.0
This recipe focuses on providing an authentication feature that allows a user to login to one of their existing services with OAuth 2.0. A typical use case would be to use assets you have stored in another service. The login makes it much easier to offer the users their assets directly after login without having to switch browser windows to login to their other service and download their asset, only to have to upload it again back in Adobe Express. 



## Using Data

## Drag and Drop

## Theming your add-on

## Locale and Localization
