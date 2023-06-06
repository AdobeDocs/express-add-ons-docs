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

<InlineAlert slots="text" variant="info"/>

Preview Adobe Express add-on SDK documentation while you wait to [join our private beta](https://adobe.com/go/express-developer).

# Implementing Common Use Cases
This set of how to's for popular use cases will help you explore and discover the capabilities of our add-ons platform. You will find common use cases along with code snippets that you can use to quickly get started with our add-on SDK. Along with these how to's, we also provide a set of [code samples](samples.md) that provide more extensive usage for each case.

## Importing Content
Importing content into a design is one of the most popular use cases, since it allows a user to add content retrieved from a third-party service or their local hard drive, directly into their designs quickly and easily. You can use the following examples to help you implement this feature in your add-on. The first function shows how to implement adding an image directly from a `blob` object, and the second shows how to implement it by fetching an image via a URL first. 

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

The supported file types for imported content are currently **`png/jpg/mp4`,** and the size of the imported images should not exceed **8000px** or **40MB**.


## Exporting Content
Another popular feature available for use in your add-on is the ability to export content. For instance, if you want to to allow the user to save/download the current design (or range of a design) with certain export configurations to their local hard drive. 

The steps to export content:
- Call `createRenditions()` to get the renditions based on your export configuration options. 
- Convert the blob object returned in the response to a string with the `URL.createObjectURL(blob)` method.
- Create/update an anchor `<a>` element's `href` value with the URL string from the above step.

<InlineAlert slots="text" variant="info"/>

Each page of your design is considered a single rendition. See the [SDK references](../../references/addonsdk/app-document.md) for additional rendition options and values):

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
// Enable drag support for an element
function makeDraggableUsingUrl(elementId: string, previewUrl: string) {
  const image = document.getElementById(elementId);

  const dragCallbacks = {
    previewCallback: (image: HTMLElement) => {
      return new URL(previewUrl);
    },
    completionCallback: async (image: HTMLElement) => {
      const imageBlob = await fetch(image.src).then((response) =>
        response.blob()
      );
      return [{ blob: imageBlob }];
    },
  };

  try {
    AddOnSdk.app.enableDragToDocument(image, dragCallbacks);
  } catch (error) {
    console.log("Failed to enable DragToDocument:", error);
  }
}

AddOnSdk.app.on("dragstart", (eventData: DragStartEventData) => {
  console.log("The drag event has started for", eventData.element);
});

AddOnSdk.app.on("dragend", (eventData: DragEndEventData) => {
  if (!eventData.dropCancelled) {
    console.log("The drag event has ended for", eventData.element);
  } else {
    console.log("The drag event was cancelled for", eventData.element);
  }
});
```

## Modal Dialogs
When you need to pop up a dialog to show a certain message such as an informational, warning or error message, you can use a simple modal dialog to do so:

### Simple Modal Dialog Example
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await AddOnSDKAPI.ready;

// Confirmation Dialog Example
let dialogOptions = {
    title: titleValue,
    description: [descValue],
    buttonLabels: {
        primary:
        primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
        secondary:
        secondaryButtonTextValue != ""
            ? secondaryButtonTextValue
            : undefined,
        cancel:
        cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
    },
    variant: "confirmation",
};
const response = await addOnSdk.app.showModalDialog(dialogOptions);
console.log("Button type clicked " + response.buttonType)
```

There's also support for complex modal dialogs, like an input dialog or a custom dialog that allows you to supply custom content, but it's currently behind an experimental flag. However, below is an example of using an `input` dialog that accepts input that you can retrieve:

### Input Modal Dialog Example
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await AddOnSdk.ready;

// Input Dialog Example 
let inputDialogOptions = {
    title: titleValue,
    description: [descValue],
    buttonLabels: {
        primary:
        primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
        secondary:
        secondaryButtonTextValue != ""
            ? secondaryButtonTextValue
            : undefined,
        cancel:
        cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
    },
    variant: "input",
    field: {
          label: labelValue,
          placeholder: placeholderValue,
          fieldType: "text",
    },

    const response = await addOnSdk.app.showModalDialog(inputDialogOptions);
    console.log("Field value " + response.fieldValue); // returns the input the user entered
}
};
```
### Custom Modal Dialog Example
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await AddOnSdk.ready;
 
function useCustomDialogResult(data: unknown) {
  // Use the dialog data
}

// Custom Dialog
async function showCustomDialog() {
  try {
    const dialogResult = await AddOnSdk.app.showModalDialog({
        variant: "custom",
        title: "Custom Modal",
        src: "dialog.html", // use content from this html file
        size: { width: 600, height: 400 }
    });
 
    // Use data received from the custom dialog
    useCustomDialogResult(dialogResult.result);
 
  } catch (error) {
    console.log("Error showing modal dialog:", error);
  }
}
```


## Detecting Theme
When you want to detect the theme of the environment where your add-on is running (aka: Adobe Express), or if you want to be notified if it changes, you can use the following example. This is useful for knowing what theme is currently set in Adobe Express so you can also use the same in your add-on UI, and to apply the theme change when the user changes their Adobe Express theme. Note, that currently Adobe Express only supports a "light" theme, though this will be changing to also support a "dark" theme in the future.

`AddOnSdk.app.on.themechange`

```js
function applyTheme(theme) {
    document.querySelector("sp-theme").setAttribute("color", theme);
}
applyTheme(AddOnSdk.app.ui.theme);
AddOnSdk.app.on("themechange", (data) => { applyTheme(data.theme); });

addOnSdk.app.on("themechange", (data) => {
    applyTheme(data.theme == "dark" ? darkTheme : lightTheme);
});
```

## Detecting Locale
If you want to detect the current locale, or when the locale changes, for instance to set the language in your add-on, you can do so with the following code:

```js
AddOnSdk.app.ui.locales
AddOnSdk.app.ui.locale

AddOnSdk.app.on("localechange", data => {
  setLanguage(data.locale);
});
```


