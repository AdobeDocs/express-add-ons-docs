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
description:  Useful guides to aid in the development of Adobe Express add-ons, including common use case examples, CORS handling and other development-related resources. 
contributors:
  - https://github.com/hollyschinsky
---

# Implementing Common Use Cases

This guide contains a set of common use cases and accompanying code snippets to explore the capabilities of the Adobe Express add-ons platform.

If you're looking for more extensive examples for any of the use cases described below, you can also check out our [code samples](https://developer.adobe.com/express/add-ons/docs/samples/). The [SDK References](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/) can be used to find all of the objects, methods, properties and events supported for building add-ons..<br/><br/>

<div style="display: flex; justify-content: center;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/HHnX5o8CxHU?si=4w4KvQVdkl8r5BZZ" title="Building Add-on Features" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Importing Content

Importing content into a design is one of the most popular use cases. For instance, to add content retrieved from a third-party service or directly from the local hard drive. The following example use cases for implementing this feature. The first function shows how to implement it by adding an image directly from a `blob` object, and the second shows how to implement it by fetching an image via a URL first. Follow the example below to implement this feature, but also be sure to refer to the [related SDK Reference section](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#methods) and [code samples](https://developer.adobe.com/express/add-ons/docs/samples/) for more details.

### Example

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

<InlineAlert slots="text" variant="warning"/>

The supported file types for imported images are currently **`png/jpg/mp4`,** and the size of the imported images should not exceed **8000px** or **40MB**. See the [SDK References](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/) for additional details on importing content.

### Video and Audio Content

You can also import video and audio content in a similar way as described above, via the [`addVideo()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addvideo) and [`addAudio()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#addaudio) methods accordingly. **Please note:** the `addAudio()` method requires an additional `MediaAttributes` object parameter containing the `title` of the audio object you're importing. See the associated [SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#methods) for more details and example usage.

## Exporting Content

Another popular feature available for use in your add-on is the ability to export content. For instance, if you want to allow the user to save/download the current design, (or range of a design), with certain export configurations to their local hard drive. Some examples for exporting content are provided below, but also check out the [`createRenditions` section in the SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#createrenditions) for more specific options and details, as well as the [export-sample add-on](https://developer.adobe.com/express/add-ons/docs/samples/#export-sample).

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

While the above is a very basic example, add-ons that call `createRenditions` to export content should ensure proper handling in the case of premium content. There are two options that can be considered for handling it.

#### Option 1: Show premium content error with "Upgrade" option

Display an error message when export/download fails due to the user not being entitled for premium content, and include a button to allow them to upgrade. *Be sure to update your `manifest.json` as outlined in the warning below the code snippet examples to allow the pricing page to properly load.*

#### Example:

```js
const showPremiumContentError = async () => {
  const { ButtonType } = addOnUISdk.constants;
  const {buttonType} = await window.addOnUISdk.app.showModalDialog({
    variant: "error",
    title: "Export failed",
    description: "Sorry, we were not able to export your design. Some assets are only included in the Premium plan. Try replacing with something else or upgrading Adobe Express to a Premium plan.", 
    buttonLabels: { secondary: "Upgrade" }
  });
  if (buttonType === ButtonType.cancel) return;
  if (buttonType === ButtonType.secondary) {
    window.open("https://www.adobe.com/go/express_addons_pricing", "_blank")
  }
}

document.querySelector("#export").onclick = async () => {
  const { app, constants } = addOnUISdk;
  const { Range, RenditionFormat, RenditionType, RenditionIntent } = constants;
  /* THE FOLLOWING FLAG CAN BE USED FOR TESTING PURPOSES ONLY -- REMOVE BEFORE RELEASE */
  app.devFlags.simulateFreeUser = true; 
  const renditionOptions = {range: Range.currentPage, format: RenditionFormat.png};
  try {
    const renditions = await app.document.createRenditions(renditionOptions);
    renditions.forEach(rendition => { /* do your thing w/ the renditions */ });
  } catch (err) {
    if (err.message?.includes("USER_NOT_ENTITLED_TO_PREMIUM_CONTENT")) {
      showPremiumContentError();
    }
  }
}
```

#### OPTION 2 - Allow preview of premium content

Set a `renditionPreview` intent in the [manifest requirements](../../references/manifest/index.md#requirements), and add an extra argument to the [`createRenditions` method](../../references/addonsdk/app-document.md#createrenditions) (ie: `RenditionIntent.preview`) to generate previews that can still use premium content.

**IMPORTANT**: Your add-on must not allow these previewed images to be downloaded or persisted on a backend (for any longer than necessary to serve the result back to the user). To that end, be sure that users cannot:

- **right-click -> save as**: To prevent this, reject the `contextmenu` event
- **drag the image off the panel**: To prevent this, you can reject the `dragstart` event

**Note:** These behaviors are enabled by default if you use an `<img>` tag. If you apply the image using `background-image` CSS, these behaviors aren't added.

#### Example:

```js
document.querySelector("#export").onclick = async () => {
  const { app, constants } = addOnUISdk;
  const { Range, RenditionFormat, RenditionType, RenditionIntent } = constants;  
  /* THE FOLLOWING FLAG CAN BE USED FOR TESTING PURPOSES ONLY */
  app.devFlags.simulateFreeUser = true; 
  const renditionOptions = {range: Range.currentPage, format: RenditionFormat.png};
  try {
    const renditions = await app.document.createRenditions(renditionOptions,RenditionIntent.preview);
    renditions.forEach(rendition => { /* do your thing w/ the renditions */ });
  } catch (err) {
    console.log("Error " + err);
  }
}
```

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** When implementing the premium content flows where you present a dialog or option to allow the user to upgrade, you must be sure to also include the following permissions in the [`sandbox`](../../references/manifest/index.md#entrypointspermissionssandbox) attribute of your `manifest.json` to allow the Adobe Express pricing page to properly load: ```"permissions": { "sandbox": ["allow-popups-to-escape-sandbox", "allow-popups", "allow-downloads"]
}```

## Authorization with OAuth 2.0

This use case focuses on providing an authorization feature that allows a user to login to one of their existing services with OAuth 2.0. A typical use case would be to use assets you have stored in another service. Here you will find instructions of how to set it up, and an example of how to implement it. But also check out the [SDK Reference OAuth section](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth/) for more options and details, as well as the  [import-images-using-oauth](https://developer.adobe.com/express/add-ons/docs/samples/#import-images-using-oauth) sample add-ons for more advanced usage.

### Setup

The OAuth APIs can be used to obtain the authorization "code" from any OAuth 2.0 provider supporting the Code Exchange authorization workflow. You will need to go through some setup steps with the provider you want to use OAuth with first. Here are the steps to get started:

1. Log in to the OAuth provider's website and create an application (for example, Dropbox). This must be a web application, and if an option of SPA (Single Page Application) is listed, select it.
2. As an input to the "Redirect URIs" field, add: https://new.express.adobe.com/static/oauth-redirect.html.
3. Fill out other details as necessary and save the form. A client Id / application Id / application key (this differs on different OAuth providers) will be generated. Make note of it as you will need it in your add-on code.
4. Next, update your add-on `manifest.json` file with the hostname of the OAuth provider's authorization URL. **NOTE:** When using multiple providers, all hostnames must be provided. For example, if the add-on uses two OAuth providers (`"login.microsoftonline.com"` and `"www.dropbox.com"`), the `manifest.json` should contain both of them, as shown below:

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

### Example

Once you complete the set up, you can use the following code snippet as an example of how to perform the OAuth exchange to retrieve an access token. The [code samples](https://developer.adobe.com/express/add-ons/docs/samples/) also contain a few different examples of using OAuth 2.0 workflows that you can use for a reference. You will also find the [OAuthUtils.js](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js) module there, which is referenced below, and we recommend using to help with your own OAuth implementation. Also be sure to check out the [SDK References](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth) for additional details on the OAuth workflows.

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
const DROPBOX_AUTHORIZATION_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const DROPBOX_CLIENT_ID = "<DROPBOX_CLIENT_ID>";
const DROPBOX_SCOPE = "<DROPBOX_SPACE_SEPARATED_SCOPES>";
 
const ONEDRIVE_AUTHORIZATION_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/authorize";
const ONEDRIVE_TOKEN_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/token";
const ONEDRIVE_CLIENT_ID = "<ONEDRIVE_CLIENT_ID>";
const ONEDRIVE_SCOPE = "<ONEDRIVE_SPACE_SEPARATED_SCOPES>";
const OWN_REDIRECT_URI = "<OWN_REDIRECT_URI>";
 
addOnUISdk.ready.then(() => {
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

If you want to be able to store and retrieve data on the client side rather to and from a server for certain instances (ie: caching images that were fetched to decrease load times etc), you can do so using the add-on `clientStorage` API. An example of using it is shown below, but also refer to the [SDK Reference section for clientStorage](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage/) and the [use-client-storage sample add-on](https://developer.adobe.com/express/add-ons/docs/samples/#use-client-storage) for more details.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

let store;

addOnUISdk.ready.then(async () => {
    store = addOnUISdk.instance.clientStorage;
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

If you want to allow a user to drag and drop items from your add-on to the document, you can use the [methods provided in the add-on SDK](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#enabledragtodocument). There are also several [code samples](https://developer.adobe.com/express/add-ons/docs/samples) that implement drag and drop, including the [import-images-using-oauth](https://developer.adobe.com/express/add-ons/docs/samples/#import-images-using-oauth) and [pix](https://developer.adobe.com/express/add-ons/docs/samples/#pix) samples you can reference. Some example use cases are shown below. **Note:** for dragging audio content, you will need to specify an additional `attributes` object that includes a `title` property. A note on how to include it specifically is below in the [second example below](#example-using-an-image-url).

### Example using local images

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const IMAGES = new Map([
    ["image1.jpg", "./images/image1.jpg"],    
    ["image2.jpg", "./images/image2.jpg"],
    ["image3.jpg", "./images/image3.jpg"]
]);

let gallery;

// Wait for the SDK to be ready before rendering elements in the DOM.
addOnUISdk.ready.then(async () => {
    // Create elements in the DOM.
    gallery = document.createElement("div");
    gallery.className = "gallery";

    IMAGES.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        image.addEventListener("click", addToDocument);

        // Enable drag to document for the image.
        addOnUISdk.app.enableDragToDocument(image, {
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
    addOnUISdk.app.on("dragstart", startDrag);
     // Register event handler for 'dragend' event
    addOnUISdk.app.on("dragend", endDrag);

    document.body.appendChild(gallery);
});

/**
 * Add image to the document.
 */
async function addToDocument(event) {
    const url = event.currentTarget.src;
    const blob = await getBlob(url);
    addOnUISdk.app.document.addImage(blob);
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

### Example using an image URL

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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
      // Note: for audio content, an attributes object with the title is mandatory. 
      // For instance, replace the above return with the following:
      // return [{blob: audioBlob, attributes: { title: "Jazzy beats" }}];
    },
  };

  try {
    addOnUISdk.app.enableDragToDocument(image, dragCallbacks);
  } catch (error) {
    console.log("Failed to enable DragToDocument:", error);
  }
}

addOnUISdk.app.on("dragstart", (eventData: DragStartEventData) => {
  console.log("The drag event has started for", eventData.element);
});

addOnUISdk.app.on("dragend", (eventData: DragEndEventData) => {
  if (!eventData.dropCancelled) {
    console.log("The drag event has ended for", eventData.element);
    disableDragToDocument();
  } else {
    console.log("The drag event was cancelled for", eventData.element);
    console.log("Cancel Reason: ", eventData.dropCancelReason);
  }
});
```

**Important Notes:**

- Since the Add-on SDK uses pointer event handlers to perform drag operations, you should ensure that you don't attach any pointer event handlers that prevent default or stop propagation. Adding those types of handlers will kill the built-in handlers and cause the events not to work.
- You should not attach `click` event listeners to drag-enabled elements in the capture phase, as the Add-on SDK attaches a `cancelClickEvent` handler to drag-enabled elements to ensure that the automatic click (pointer down + pointer up automatically fires a click event) doesn't fire. Adding other handlers to this same element will cause them to be triggered on drag & drop completion.
- TIP: Use Chrome devTools to check the handlers attached to the element and its ancestors to identify any which may be causing conflicts with drag and drop handlers.

## Modal Dialogs

When you need to pop up a dialog to show a certain message such as an informational, warning or error message, you can use a modal dialog to do so. Below are some examples of the different types of modal dialogs supported. Also check out the SDK references for details on how to [show](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#showmodaldialog) or [programmatically close a dialog](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/runtime-dialog/#close), as well as the [dialog add-on sample](https://developer.adobe.com/express/add-ons/docs/samples/#dialog-add-on) for more details.

### Simple Modal Dialog Example

The following example shows how to display a simple confirmation dialog.

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;

async function showConfirmDialog() {
    try {
        // Confirmation Dialog Example
        let dialogOptions = {
            variant: "confirmation",
            title: "Enable smart Filters",
            description: "Smart filters are nondestructive and will preserve your original images.",
            buttonLabels: { primary: "Enable", cancel: "Cancel" },
        };    
        const result = await addOnUISdk.app.showModalDialog(dialogOptions);
        console.log("Button type clicked " + result.buttonType); 
    } catch (error) {
        console.log("Error showing modal dialog:", error);
    }
}
```

### Input Modal Dialog Example

Below is an example of using an `input` dialog that accepts input you can retrieve:

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;

async function showInputDialog() {
    try {
        // Input Dialog Example
        let inputDialogOptions = {
            variant: "input",
            title: "Please enter your key",
            description: "Your API key",
            buttonLabels: { cancel: "Cancel" },           
            field: {
                label: "API Key",
                placeholder: "Enter API key", 
                fieldType: "text",
            },
        }

        const inputDialogResult = await addOnUISdk.app.showModalDialog(inputDialogOptions);
        if (inputDialogResult.buttonType === "primary") {
            console.log("Field value " + inputDialogResult.fieldValue); // returns the input the user entered if they didn't cancel
        }
    } catch (error) {
        console.log("Error showing modal dialog:", error);
    }
}
```

### Custom Dialog Example

This example shows how you can define custom content for yuour dialog in a separate source file, (`dialog.html` in this case), and with a custom height and title.

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;
 
function useCustomDialogResult(data: unknown) {
  // Use the dialog data
}

// Custom Dialog
async function showCustomDialog() {
  try {
    const dialogResult = await addOnUISdk.app.showModalDialog({
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

<InlineAlert slots="text" variant="success"/>

Check out the [add-on SDK](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/) for more specific details on using modal dialogs, including [programmatically closing a dialog with an optional custom result](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/runtime-dialog/#close).

## Detecting Theme

When you want to detect the theme of the environment where your add-on is running, or if you want to be notified if it changes, you can use the following example. This is useful for knowing what theme is currently set in Adobe Express, so you can use the same in your add-on UI, or to apply a change to your UI when the user changes their Adobe Express theme. **Note:** currently Adobe Express only supports a "light" theme, though this will be changing to include support for a "dark" theme in the future. See the snippet below for an example of how to use and detect the theme, as well as the [related SDK Reference section](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-ui/#theme).

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function applyTheme(theme) {
    document.querySelector("sp-theme").setAttribute("color", theme);
}
applyTheme(addOnUISdk.app.ui.theme);
addOnUISdk.app.on("themechange", (data) => { applyTheme(data.theme); });

addOnUISdk.app.on("themechange", (data) => {
    applyTheme(data.theme == "dark" ? darkTheme : lightTheme);
});
```

## Detecting Locale and Supported Locales

If you want to find out the users current locale, the list of supported locales, or detect when the locale changes (ie: to set the language in your add-on), you can do so with the [`addOnUISdk.app.ui` object](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-ui/#locale) in the add-on SDK. A simple example is shown below.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setLanguage(language) { 
  /* Set the language in your UI strings based on the change detected */ 
}

addOnUISdk.ready.then(() => {
  console.log(addOnUISdk.app.ui.locales);
  setLanguage(addOnUISdk.app.ui.locale);
});

addOnUISdk.app.on("localechange", data => {
  setLanguage(data.locale));
});
```

## Current User (for monetization flows)

You can leverage the [`currentUser`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-currentUser) API to obtain the information for the currently logged in user, for instance if you want to use their `userId` to validate in a monetization flow.

Use the example below to try this feature, but also be sure to refer to the [related SDK Reference section](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-currentUser). Also, refer to the [licensed-addon code sample](https://developer.adobe.com/express/add-ons/docs/samples/#licensed-addon), which shows an example of how you can utilize the hash of the user ID to integrate your add-on with licensing and payment services.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
addOnUISdk.ready.then(async () => {
  validateUser(await addOnUISdk.app.currentUser.userId());
});

validateUser(userId: string) {
  ...
}
```

### Output

`Current Userid: 3cda976828a4a90d13b0f38b1f8a59b1d6845cccfc48037fb30bb75d3ef67d36`

## Authoring Content

We provide a set of [Document APIs](../../references/document-sandbox/document-apis/) that can be used for interacting with the document for common use cases like creating shapes, adding pages, clearing the artboard and more.

<InlineAlert slots="text" variant="warning"/>

The Editor API's are currently **experimental only**. Please do not use them in any add-ons you plan to distribute or submit with updates until they have been deemed stable.

The following code snippet illustrates how to use the [Document APIs](../../references/document-sandbox/document-apis/) from the script running in your [`code.js`](../../references/document-sandbox/index.md#getting-started-with-the-apis) for instance, to access the current document, create a rectangle, set some properties and a fill for the rectangle, and finally, add it to the document:

```js
import { editor, utils } from "express-document-sdk"

const insertionParent = editor.context.insertionParent; // get node to insert content into

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translateX = 100;
rectangle.translateY = 20;
console.log(rectangle); // for debugging purpose

const [red, green, blue, alpha] = [0.8, 0.6, 0.2, 0.7];
const rectangleFill = editor.createColorFill(utils.createColor(red, green, blue, alpha));
rectangle.fills.append(rectangleFill);

insertionParent.children.append(rectangle);
```

<InlineAlert slots="text" variant="info"/>

Refer to [getting started with the Document Sandbox](../../references/document-sandbox/index.md#getting-started-with-the-apis) for more details on how to set up your add-on to use the script-based APIs, which include the Document APIs for authoring content.
