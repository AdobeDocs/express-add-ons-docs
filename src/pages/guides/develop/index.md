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

## Authenticating with OAuth 2.0
This recipe focuses on providing an authentication feature that allows a user to login to one of their existing services with OAuth 2.0. A typical use case would be to use assets you have stored in another service. The login makes it much easier to offer the users their assets directly after login without having to switch browser windows to login to their other service and download their asset, only to have to upload it again back in Adobe Express. 

```js
const Connection = ({ accessToken, updateAccessToken }) => {  
  async function handleConnect() {
        // Generate the cryptographic challenge parameters
        // required in the OAuth 2.0 authorization workflow.
        const challenge = await oauthUtils.generateChallenge();

        // Trigger the OAuth 2.0 based authorization which opens up a sign-in window for the user
        // and returns an authorization code which can be used to obtain an access_token.
        const { id, code, redirectUri, result } = await addOnSdk.app.oauth.authorize({
            authorizationUrl: AUTHORIZATION_URL,
            clientId: CLIENT_ID,
            scope: SCOPE,
            codeChallenge: challenge.codeChallenge
        });

        const { status, description } = result;
        if (status !== "SUCCESS") {
            setLoading(false);
            console.error(`Failed to authorize. Status: ${status} | Description: ${description}`);
            return;
        }

        // Generate the access_token which can be used to verify the identity of the user and
        // grant them access to the requested resource.
        await oauthUtils.generateAccessToken({
            id,
            clientId: CLIENT_ID,
            codeVerifier: challenge.codeVerifier,
            code,
            tokenUrl: TOKEN_URL,
            redirectUri
        });

        // Get the generated access_token.
        const newAccessToken = await oauthUtils.getAccessToken(id);   
        updateAccessToken(newAccessToken);
  }
}
```
Now retrieve assets with the token saved in the above:

```js
  // Use the access_token to retrieve assets
  async function getAssets(path) {
        const data = { path };
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(LIST_FOLDER_API_URL, options);
        const assets = await response.json();
        if (!response.ok) {
            const error = assets.error
                ? assets.error.message
                : "Unexpected error occurred while fetching assets.";

            throw new Error(error);
        }

        return assets;
  }
}
```

## Storing and Retrieving Client-Side Data
If you want to be able to store and retrieve data on the client rather than send and retrieve from a server for certain instances (ie: caching images that were fetched to decrease load times etc), you can do so using the add-on `clientStorage` API. 

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

let store;

AddOnSdk.ready.then(async () => {
    store = AddOnSdk.instance.clientStorage;
}
/**
 * Store item 
 */
async function setItem(item: string, isComplete: boolean) {
    await store.setItem(item, isComplete);
    todoItemInput.value = "";
}
/**
 * Log all storage item values
 */
async function displayAllItems() {
    const todoItems = await store.keys();
    todoItems.forEach(async (item: string) => {
        const itemValue = await store.getItem(item);
        console.log("Key: " + item + " value: " + itemValue);
    });
}

```
## Drag and Drop
If you want to allow a user to drag and drop items from your add-on to the document, you can use the methods provided for this in the add-on SDK. An example of this is shown below:

```js
  // Enable drag to document on an image
  AddOnSdk.app.enableDragToDocument(image, {
      previewCallback: element => {
          return new URL(element.src);
      },
      completionCallback: async (element) => {
          return [{ blob: await getBlob(element.src) }];
      }
  });
```

## Modal Dialogs
When you need to pop up a dialog to show a certain message such as an informational, warning or error message, you can use the following code snippet to do so:


## Detecting and Setting Theme
When you need to detect the theme of the environment where your add-on is running (aka: Adobe Express), or if you want to be notified if it changes, you can use the following code. Note, however, that currently Adobe Express only supports a "light" theme.

`AddOnSdk.app.on.themechange`

```js
function applyTheme(theme = "light") {
    document.querySelector("sp-theme").setAttribute("color", theme);
}
applyTheme(AddOnSdk.app.ui.theme);
AddOnSdk.app.on("themechange", (data) => { applyTheme(data.theme); });

addOnSdk.app.on("themechange", (data) => {
    setTheme(data.theme == "dark" ? darkTheme : lightTheme);
});
```

## Detecting Locale
If you want to handle a change in the locale, for instance if you want to set the language in your add-on, you can do so with the following code:

```js

AddOnSdk.app.ui.locales

AddOnSdk.app.on("localechange", data => {
  setLanguage(data.locale);
});
```


