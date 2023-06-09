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
If you're looking to explore and discover the capabilities of our add-ons platform, check out these common use cases and accompanying code snippets to help you get started with our add-on SDK. For more extensive usage examples, check out this set of [code samples](samples.md).

## Importing Content
Importing content into a design is one of the most popular use cases. For instance, to add content retrieved from a third-party service or directly from the local hard drive. You can use the following examples to help you implement this feature in your add-on. The first function shows how to implement adding an image directly from a `blob` object, and the second shows how to implement it by fetching an image via a URL first. To implement the feature of importing content into a design in your add-on, you can use the following examples:

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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

## Authorization with OAuth 2.0
This use case focuses on providing an authorization feature that allows a user to login to one of their existing services with OAuth 2.0. A typical use case would be to use assets you have stored in another service. 

### Setup
The OAuth APIs can be used to obtain the authorization "code" from any OAuth 2.0 provider supporting the Code Exchange authorization workflow. You will need to go through some set up steps through the provider you want to use OAuth with first. Here are the steps to get started:

1. Log in to the OAuth provider's website and create an application (for example, Dropbox). This must be a web application, and if an option of SPA (Single Page Application) is listed, select it.
2. As an input to the "Redirect URIs" field, add: https://new.express.adobe.com/static/oauth-redirect.html.
3. Fill out other details as necessary and save the form. A client Id / application Id / application key (this differs on different OAuth providers) will be generated. Make note of it as you will need it in your add-on code.
4. Next, update your add-on `manifest.json` file with the hostname of the OAuth provider's authorization URL. **NOTE:** When using multiple providers, all hostnames must be provided. For example, if the add-on uses two OAuth providers ("login.microsoftonline.com" and "www.dropbox.com"), the `manifest.json` should contain both of them, as shown below:

```json
{
    "id": "<ADD_ON_ID>",
    "name": "<ADD_ON_NAME>",
    "version": "1.0.0",
    "manifestVersion": 1,
    "requirements": {
        "apps": ["Express"]
    },
    "entryPoints": [
        {
            "type": "panel",
            "id": "panel1",
            "label": {
                "default": "<ADD_ON_LABEL>"
            },
            "main": "index.html",
            "permissions": {
                "oauth": ["login.microsoftonline.com", "www.dropbox.com"]
            }
        }
    ]
}
```

Once you complete the set up, you can use the following code snippet as an example of how to perform the OAuth exchange to retrieve an access token. The [code samples](../../samples.md) repo also contain a few different examples of using OAuth 2.0 that we highly recommend checking out. You will also find the [OAuthUtils.js](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js) module there, which is referenced below, and we recommend using to help with your own OAuth implementation.

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
const DROPBOX_AUTHORIZATION_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const DROPBOX_CLIENT_ID = "<DROPBOX_CLIENT_ID>";
const DROPBOX_SCOPE = "<DROPBOX_SPACE_SEPARATED_SCOPES>";
 
const ONEDRIVE_AUTHORIZATION_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/authorize";
const ONEDRIVE_TOKEN_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/token";
const ONEDRIVE_CLIENT_ID = "<ONEDRIVE_CLIENT_ID>";
const ONEDRIVE_SCOPE = "<ONEDRIVE_SPACE_SEPARATED_SCOPES>";
const OWN_REDIRECT_URI = "<OWN_REDIRECT_URI>";
 
AddOnSdk.ready.then(() => {
    // 'oauthUtils' is a helper javascript module (included with the OAuth template) which provides utility functions to:
    // 1. generateChallenge()     Generate the 'code_challenge' and 'code_verifier' parameters that are essential in the OAuth 2.0 workflow.
    // 2. generateAccessToken()   Generate an 'access_token' and a 'refresh_token' using the 'code' and 'redirectUri' received on successful authorization.
    // 3. getAccessToken()        Get an always valid 'access_token'.
     
    const challenge = await oauthUtils.generateChallenge();     
    await authorize(challenge);         
});
 
function authorize(challenge) {
    // Trigger the OAuth 2.0 based authorization which opens up a sign-in window for the user
    // and returns an authorization code which can be used to obtain an access_token.
    const { id, code, redirectUri, result } = await oauth.authorize({
        authorizationUrl: DROPBOX_AUTHORIZATION_URL,
        clientId: DROPBOX_CLIENT_ID,
        scope: DROPBOX_SCOPE,
        codeChallenge: challenge.codeChallenge
    });
 
    const { status, description } = result;
    if (status !== "SUCCESS") {
        throw new Error(`Status: ${status} | Description: ${description}`);
    }
 
    // Generate the access_token which can be used to verify the identity of the user and
    // grant them access to the requested resource.
    await oauthUtils.generateAccessToken({
        id,
        clientId: DROPBOX_CLIENT_ID,
        codeVerifier: challenge.codeVerifier,
        code,
        tokenUrl: DROPBOX_TOKEN_URL,
        redirectUri
    });
 
    const accessToken = await oauthUtils.getAccessToken(id);
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

### Example using local images
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const IMAGES = new Map([
    ["image1.jpg", "./images/image1.jpg"],    
    ["image2.jpg", "./images/image2.jpg"],
    ["image3.jpg", "./images/image3.jpg"]
]);

let gallery;

// Wait for the SDK to be ready before rendering elements in the DOM.
AddOnSdk.ready.then(async () => {
    // Create elements in the DOM.
    gallery = document.createElement("div");
    gallery.className = "gallery";

    IMAGES.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        image.addEventListener("click", addToDocument);

        // Enable drag to document for the image.
        AddOnSdk.app.enableDragToDocument(image, {
            previewCallback: element => {
                return new URL(element.src);
            },
            completionCallback: async (element) => {
                return [{ blob: await getBlob(element.src) }];
            }
        });

        gallery.appendChild(image);
    });

    // Register event handler for "dragstart" event
    AddOnSdk.app.on("dragstart", startDrag);
     // Register event handler for 'dragend' event
    AddOnSdk.app.on("dragend", endDrag);

    document.body.appendChild(gallery);
});

/**
 * Add image to the document.
 */
async function addToDocument(event) {
    const url = event.currentTarget.src;
    const blob = await getBlob(url);
    AddOnSdk.app.document.addImage(blob);
}

/**
 * Handle "dragstart" event
 */
function startDrag(eventData) {
    console.log("The drag event has started for", eventData.element.id);
}

/**
 * Handle "dragend" event
 */
function endDrag(eventData) {
    if (!eventData.dropCancelled) {
        console.log("The drag event has ended for", eventData.element.id);
    } else {
        console.log("The drag event was cancelled for", eventData.element.id);
    }
}

/**
 * Get the binary object for the image.
 */
async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}

```

### Example using a URL

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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
await AddOnSdk.ready;

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

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setLanguage(language) { 
  /* Set the language in your UI strings based on the change detected */ 
}

AddOnSdk.ready.then(() => {
  console.log(AddOnSdk.app.ui.locales);
  setLanguage(AddOnSdk.app.ui.locale);
});

AddOnSdk.app.on("localechange", data => {
  setLanguage(data.locale));
});
```


