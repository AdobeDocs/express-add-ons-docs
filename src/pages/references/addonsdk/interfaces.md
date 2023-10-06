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
title: API Reference
description: This is the Add-on SDK - API Reference page
contributors:
  - https://github.com/hollyschinsky
---

# API Overview

The following APIs are currently supported for building add-ons:

- [AddOnSdk](#AddOnSdk)
- [Theme](#ui-theme)
- [Languages & Locale](#language--locale)
- [Manifest](#add-on-manifest-data)
- [OAuth 2.0](#oauth-20)
- [ClientStorage](#client-storage)
- [Import](#import)
- [Drag and Drop](#drag-and-drop)
- [Export](#export)
- [Simple Modal Dialogs](#simple-modal-dialogs)

Also, check out the latest [Manifest Reference](../references/manifest.md) for more important details on how to configure options when developing your add-ons.

<InlineAlert slots="text" variant="success"/>

Each API section includes the **Interface** definition as well as a **Example** tab to show an example of how the interface can be used. Please also see the [code samples](../../samples.md) for more in-depth references on using the Add-on SDK.

## Introduction

The Add-on SDK is available as a hosted JavaScript module on a CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of imports in the JavaScript source. However, you don't need to worry about adding the reference, assuming you created your project with the CLI, since it will already be imported for you based on the template you chose.

But for reference, below are some examples of how it can be imported for use.

### In an HTML script tag:

To use the SDK from an HTML file, simply include a link to it in a `<script>` tag with the `type=module` attribute on it to ensure the add-on API is initialized properly.

```js
<body>
        Hello World!

        <script type="module">
            import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

            AddOnSdk.ready.then(async () => {
                console.log("AddOnSdk is ready for use.");
            });
        </script>
</body>
```

### In your JavaScript source

To use it in your `.js/.jsx` source files, import it as a default module reference like the following:
`import AddOnStore from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";`

### From TypeScript

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

```

Note, if you create your add-on project with the CLI based on the `typescript` or `typescript-react` templates, you will automatically get the following type definition generated in your project for you:

```ts
declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {
    export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";
    export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";
}
```

## AddOnSdk

The `AddOnSdk` provides the following interface for accessing all of the APIs. It exposes several variables listed below, which allow you to know when the APIs are ready to interact with.

- `apiVersion`: Current version of the SDK running.
- `ready`: Allows you to know you can start accessing the APIs.
- `instance`: the currently running add-on instance (see [AddOn Object](#addon)), allowing you to access the [manifest.json](#manifest) details and a [Client Storage](#client-storage) object, which allows you to locally persist to storage, per user and for this add-on.
- `app`: Provides access to the host application (Adobe Express). See the [`Application`](#application) definition below for more details.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
/**
 * The main API Interface exposed by the SDK to the consuming Add-on code.
 */
interface AddOnSdk {
    /**
     * API version of the SDK.
     */
    readonly apiVersion: string;

    /**
     * Resolves when the SDK has made a successful connection to the host app.
     * Indicates that APIs directly interacting with the host application are ready.
     * Register a call back with @see Promise#then or await this promise.
     */
    readonly ready: Promise<void>;

    /**
     * Represents capabilities and events of the currently running Add-on Instance.
     * The interface type depends on the type of the underlying Add-on.
     */
    readonly instance: AddOn;

    /**
     * Represents capabilities and events of the host application.
     */
    readonly app: Application;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

AddOnSdk.ready.then(() => {
  console.log("API version", AddOnSdk.apiVersion);
  console.log("Add-on instance object", JSON.stringify(AddOnSdk.instance));
  console.log("Application object", JSON.stringify(AddOnSdk.app));  
});

```

### Output

```json
API version 1

Add-on instance object {"manifest":{"testId":"08f4469f-7999-458b-9ef9-b1bd043cbdca","name":"Add On Api Sampler","version":"1.0.0","manifestVersion":2,"requirements":{"apps":[{"name":"Express","apiVersion":1}]},"entryPoints":[{"type":"panel","id":"panel1","main":"https://localhost:5241/08f4469f-7999-458b-9ef9-b1bd043cbdca/index.html"}]},"clientStorage":{}}

Application object {"ui":{"theme":"light","locale":"en-US","locales":["cy-GB","da-DK","de-DE","en-US","es-ES","fi-FI","fr-FR","it-IT","ja-JP","ko-KR","nb-NO","nl-NL","pt-BR","sv-SE","zh-Hans-CN","zh-Hant-TW","zz-ZZ"]},"oauth":{},"document":{}}
```

## Application

The [`AddOnSdk`](#AddOnSdk) provides you with an `app` variable, which is of type `Application`, defined below, and allows you to access the following objects which are used throughout this reference:

- `ui`: Provides access to the [theme](#theme), [locale and locales](language-locale).
- `document`: Provides access to the methods needed for [adding an image or video](#import) the document and for [creating a rendition](#export) for export.
- `oauth`: Provides access to the OAuth methods needed for use with the [OAuth API](oauth-20).

```js
/**
 * Interface that represents the underlying Application (Adobe Express).
 */
export interface Application {
    /**
     * Represents the UI of the app (Adobe Express). Provides access to theme, locale and locales.
     */
    readonly ui: UI;

    /**
     * Represents the active document and provides access to the methods needed for adding an image or video the document and creating a rendition (for export).
     */
    readonly document: Document;

    /**
     * OAuth 2.0 middleware for handling user authorization. Provides access to the OAuth methods needed to implement OAuth 2.0.
     */
    readonly oauth: OAuth;
}
```

## AddOn

Represents the current add-on, providing references to `manifest` and `clientStorage` objects.

```js
/**
 * Base interface for all type of add-ons
 */
export interface AddOn {
    
    /**
     * Add-ons Manifest details - this maps to entries in the add-ons manifest.json file.
     */
    readonly manifest: Record<string, unknown>;

    /**
     * Local-persisted storage per user per addon.
     */
    readonly clientStorage: ClientStorage;
}
```

## Theme

Retrieve the current theme of the host application, via the [`app.ui`](#application) object.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface Application {
  /**
   * Represents the UI of the host application.
   */
  readonly ui: UI;
}
interface UI {
    /**
     * The theme currently used by the host application.
     */
    theme: string;
}
/**
 * "themechange" event is triggered when the UI theme is changed in the application.
 */
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function applyTheme(theme) {
  /* ... */
}

AddOnSdk.ready.then(() => applyTheme(AddOnSdk.app.ui.theme));

AddOnSdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```

<InlineAlert slots="text" variant="success"/>

We have provided a sample that can be used as a reference for implementing the Application UI Theme APIs. Please see the **swc** sample provided in the [code samples](guides/develop/samples) within the **contributed** folder for specific details.

## Language & Locale

Retrieve the supported languages (via the `locales` variable) and current `locale` of the host application.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
interface Application {
  /**
   * Represents the UI of the host application.
   */
  readonly ui: UI;
}

interface UI {
  /**
   * Current locale of the application.
   */
  locale: string;

  /**
   * Supported Languages of the application
   */
  locales: string[];
}

/**
 * "localechange" event is triggered when the locale is changed in the application.
 */
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setLanguage(language) { /* ... */ }

AddOnSdk.ready.then(() => {
  console.log(AddOnSdk.app.ui.locales);
  setLanguage(AddOnSdk.app.ui.locale);
});

AddOnSdk.app.on("localechange", data => {
  setLanguage(data.locale));
});
```

### Output

```json
ui: 
  locale: "en-US"
  locales: (17) ['cy-GB', 'da-DK', 'de-DE', 'en-US', 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 'ja-JP', 'ko-KR', 'nb-NO', 'nl-NL', 'pt-BR', 'sv-SE', 'zh-Hans-CN', 'zh-Hant-TW', 'zz-ZZ']
  theme: "light"
```

## Add-on Manifest Data

Retrieve the [manifest data](../references/manifest.md) belonging to the add-on.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
interface AddOn {
  /**
   * Add-ons Manifest details - this maps to entries in the add-ons manifest.json file.
   */
  readonly manifest: Record<string, unknown>;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

async function logManifestData() {
  await AddOnSdk.ready;
  const manifest = AddOnSdk.instance.manifest;
  console.log(manifest["name"]);
  console.log(manifest["id"]);
  console.log(manifest["main"]);
  console.log(manifest["version"]);
  console.log(manifest["manifestVersion"]);
  for (const app of manifest["requirements"]["apps"]) {
    console.log(app);
  }
  for (const entryPoint of manifest["entryPoints"]) {
    console.log(entryPoint["type"]);
    console.log(entryPoint["id"]);
    console.log(entryPoint["label"]);    
  }
}
```

### Output

```json

```

## Authorize using OAuth 2.0

The OAuth APIs can be used to obtain the authorization "code" from any OAuth 2.0 provider supporting the [Code Exchange authorization](https://www.oauth.com/oauth2-servers/pkce/authorization-code-exchange/) workflow. Here are the steps to get started:

Log in to the OAuth provider's website and create an application. This must be a web application, and if an option of SPA (Single Page Application) is listed, select it.
As an input to the **Redirect URIs** field, add: [https://new.express.adobe.com/static/oauth-redirect.html](https://new.express.adobe.com/static/oauth-redirect.html)

Fill out other details as necessary and save the form. A **Client Id** / **Application Id** / **Application Key** (varies between different OAuth providers) gets generated.
Next you need to add the host name of the OAuth provider's authorization URL to the `manifest.json` file.

When using multiple providers, all such hostnames must be provided.
For example, if the add-on uses two OAuth providers (such as `login.microsoftonline.com` and `www.dropbox.com`), its `manifest.json` should be updated according to this:

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

Now the setup is complete and the OAuth APIs can be used by following the contract and usage as detailed below:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface Application {
    /**
     * OAuth 2.0 middleware for handling user authorization.
     */
    readonly oauth: OAuth;
}

export interface OAuth {
    /**
     * Authorize a user using OAuth 2.0 PKCE workflow.
     * @param request - {@link AuthorizationRequest} Payload with parameters to be used in the authorization workflow.
     * @returns - {@link AuthorizationResponse} Response containing a ONE-TIME Authorization Code which can be used to obtain an access token.
     */
    authorize(request: AuthorizationRequest): Promise<AuthorizationResponse>;

    /**
     * Initiate the OAuth 2.0 PKCE authorization workflow by opening the user sign-in window.
     * Post authorization the user is redirected to the add-on developer provided URL.
     * @param request - {@link AuthorizeWithOwnRedirectRequest} Payload with parameters to be used in the authorization workflow.
     * @returns - {@link AuthorizationResult} Authorization result.
     */
    authorizeWithOwnRedirect(request: AuthorizeWithOwnRedirectRequest): Promise<AuthorizationResult>;
}

export type AuthorizationRequest = {
    /**
     * OAuth provider's authorization URL.
     */
    authorizationUrl: string;

    /**
     * Client identifier of the application created at the OAuth provider.
     */
    clientId: string;

    /**
     * Code challenge used in Authorization Code Exchange.
     */
    codeChallenge: string;

    /**
     * Scope to control the application's access.
     */
    scope: string;

    /**
     * Additional parameters, specific to an OAuth provider which
     * are required in the Authorization URL as query string parameters.
     */
    additionalParameters?: Map<string, string>;
};

export type AuthorizeWithOwnRedirectRequest = AuthorizationRequest & {
    /**
     * URL where the user is redirected to after successful or failed authorization.
     * Hosting and handling redirects to this URL should be managed by the caller.
     */
    redirectUri: string;

    /**
     * A value which is preserved in the authorization request,
     * and replayed back as a query string parameter in the redirectUri.
     * Although the primary reason for using the state parameter is to mitigate CSRF attacks,
     * it can also be used to encode any other information.
     */
    state: string;
};

export type AuthorizationResponse = {
    /**
     * Unique identifier for the authorization request.
     */
    id: string;

    /**
     * OAuth 2.0 generated authorization code which can be used
     * ONCE to obtain an access token and a refresh token.
     */
    code: string;

    /**
     * URL where the user is redirected to after authorization.
     * This is the default URL owned by Adobe and
     * it is this URL which needs to be used to obtain access_token.
     */
    redirectUri: string;

    /**
     * Authorization result which denotes either success or failure,
     * represented by {@link AuthorizationResult}.
     */
    result: AuthorizationResult;
};

export type AuthorizationResult = {
    /**
     * Status representing success or failure in the authorization workflow.
     */
    status: AuthorizationStatus;

    /**
     * Description about the success or failure in the authorization workflow.
     * In the event of a FAILED status reported by the OAuth provider during authorization,
     * the value of this property is an object, in the form of \{ [failure_title]: \"failure_description\" \}
     * While for all other statuses the value of this property is a string.
     */
    description: string | object;
};

export enum AuthorizationStatus {
    SUCCESS = "SUCCESS",
    POPUP_OPENED = "POPUP_OPENED",
    POPUP_BLOCKED = "POPUP_BLOCKED",  
    POPUP_TIMEOUT = "POPUP_TIMEOUT",  
    FAILED = "FAILED"
}
```

### Example

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
     
    await authorizeWithOwnRedirect(challenge);
});
 
function authorize(challenge) {
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
 
function authorizeWithOwnRedirect(challenge) {
    const result = await oauth.authorizeWithOwnRedirect({
        authorizationUrl: ONEDRIVE_AUTHORIZATION_URL,
        clientId: ONEDRIVE_CLIENT_ID,
        scope: ONEDRIVE_SCOPE,
        codeChallenge: challenge.codeChallenge,
        redirectUri: OWN_REDIRECT_URI,
        state: <ANY_STRING_THAT_WILL_BE_REPLAYED_AT_REDIRECT>
    });
 
    const { status, description } = result;
    if (status !== "POPUP_OPENED") {
        throw new Error(`Status: ${status} | Description: ${description}`);
    }
 
    // Handle post-redirection after successful authorization
    // and retrieve the authorization "code" for generating access_token.
 
    const id = <ANY_UNIQUE_STRING>;
    await oauthUtils.generateAccessToken({
        id,
        clientId: ONEDRIVE_CLIENT_ID,
        codeVerifier: challenge.codeVerifier,
        code,
        tokenUrl: ONEDRIVE_TOKEN_URL,
        OWN_REDIRECT_URI
    });
 
    const accessToken = await oauthUtils.getAccessToken(id);
}
```

<InlineAlert slots="text" variant="success"/>

We have provided two samples that can be used as a reference for implementing the OAuth APIs. Please see the **import-images-using-oauth** and **Dropbox** samples for specific details.

## Client Storage

The ClientStorage APIs allow you to store/retrieve/delete persistent data in the user's current browser. It's like the `Window.localStorage` API, but is asynchronous, and supports multiple datatypes, i.e., objects, arrays, strings, numbers, booleans, null, undefined and Uint8Array. Since data will be stored in the user’s current browser, user actions such as clearing the browser cache might clear all of the data storage in `ClientStorage` (similar to `localStorage`).

Each add-on can store up to 10 mb of data in `ClientStorage`, per user. Post 10 mb, any data additions will throw a quota error. However, an add-on developer can write code to delete old data so that new data can be added.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface AddOn {
  /**
   * Data storage on the user's local machine.
   * This data is not synchronized across users
   */
  clientStorage: ClientStorage;
}

interface ClientStorage {
  /**
   * Retrieve a value from ClientStorage for given key.
   * If no value has been stored for that key, this function will asynchronously return undefined.
   */
  async getItem(key: string): Promise<unknown | undefined>;

  /**
   * Set a value to ClientStorage with the given key.
   * The returned promise will resolve if storage is successful or reject with an error message if storage failed.
   */
  async setItem(key: string, value: any): Promise<void>;

  /**
   * Remove the stored key/value pair from ClientStorage for given key.
   * If no such key is stored, this function will return normally but will otherwise do nothing.
   */
  async removeItem(key: string): Promise<void>;

  /**
   * Retrieve a list of all keys stored to ClientStorage.
   * Use this to enumerate the full contents of the ClientStorage API.
   */
  async keys(): Promise<string[]>;

   /**
     * Delete all data present in ClientStorage for an Add-on.
     */
    clear(): Promise<void>;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await AddOnSdk.ready;

// Reference to the client storage of the add-on
const { clientStorage } = AddOnSdk.instance;

// Get add-on data
async function getData(key) {
  try {
    return await clientStorage.getItem(key);
  } catch (error) {
    console.log("Failed to get the value from the ClientStorage.");
  }
}

// Add/update add-on data
async function setData(key, value) {
  try {
    await clientStorage.setItem(key, value);
  } catch (error) {
    console.log("Failed to set the value to the ClientStorage.");
  }
}

// Delete add-on data for a key
async function deleteData(key) {
  try {
    await clientStorage.removeItem(key);
  } catch (error) {
    console.log("Failed to delete the value from the ClientStorage.");
  }
}

// Delete ALL add-on data for this user
async function clearData() {
  try {
    await clientStorage.clear();
  }
  catch(error) {
    console.log("Failed to clear the data from the ClientStorage.");
  }
}

// Get all stored keys
async function getKeys() {
  try {
    const keys = await clientStorage.keys();
    keys.forEach((key) => console.log(key));
  } catch (error) {
    console.log("Failed to get the keys from the ClientStorage.");
  }
}
```

<InlineAlert slots="text" variant="success"/>

The **use-client-storage** sample can also be used as a reference for implementing the Client Storage APIs.

## Import

Allows you to import an image or video to your page.

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

<InlineAlert slots="text" variant="success"/>

Many of the samples we've included in the [code samples](guides/develop/samples) implement the Import APIs, so please use them as a reference. This includes the the **import-images-from-local**, **import-images-using-oauth**, **giphy**, **qrcode** and **dropbox** samples.

## Drag and Drop

Allows you to drag and drop objects to the document.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface DragCompletionData {
  /**
   * Blob (image/video) to be added to the document
   */
  blob: Blob;
}

/**
 * Callback to provide the preview image
 * @returns URL or DataURL
 **/
type DragPreviewCallback = (element: HTMLElement) => URL;

/**
 * Callback to provide the content (image/video) to be added to the document
 **/
type DragCompletionCallback = (
  element: HTMLElement
) => Promise<DragCompletionData[]>;

interface DragCallbacks {
  /**
   * Callback to provide the preview image
   */
  previewCallback: DragPreviewCallback;

  /**
   * Callback to provide the content to be added to the document
   */
  completionCallback: DragCompletionCallback;
}

interface Application {
  /**
   * Enable drag to document functionality for an element
   */
  enableDragToDocument(
    element: HTMLElement,
    dragCallbacks: DragCallbacks
  ): void;
}

/**
 * "dragstart" event is triggered when the user starts dragging an item for which drag behavior is enabled
 *
 * "dragend" event is triggered when the drag operation ends
 */

interface DragStartEventData {
  /**
   * Element for which the drag event started
   */
  element: HTMLElement;
}

interface DragEndEventData {
  /**
   * Drop occurred/Drag ended at invalid position
   */
  dropCancelled: boolean;

  /**
   * Element for which the drag event ended
   */
  element: HTMLElement;
}
```

### Example

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

<InlineAlert slots="text" variant="info"/>

Please note, the maximum dimension of an object dropped on to the canvas in Express is 8000x8000.

<InlineAlert slots="text" variant="success"/>

Many of the samples we've included in the [code samples](guides/develop/samples) implement the Drag and Drop APIs, so please use them as a reference. This includes the the **import-images-from-local**, **import-images-using-oauth**, **giphy** and **qrcode** samples.

## Export

Allows you to export a rendition of a page or document in **jpg**, **png**, **pdf** and **mp4** formats.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface Document {
  /**
   * Create renditions
   */
  createRenditions(renditionOptions: RenditionOptions): Promise<Rendition[]>;
}
 
interface RenditionOptions {
  /**
   * Range of the document to get the rendition
   */
  range: Range;
 
  /**
   * Format of the rendition
   */
  format: RenditionFormat;
}

export enum Range {
    /**
     * Generate rendition for the current page
     */
    currentPage = "currentPage",

    /**
     * Generate rendition for all the pages
     */
    entireDocument = "entireDocument"
}

enum Range {
  /**
   * Generate rendition for the current page
   */
  currentPage,
 
  /**
   * Generate rendition for all the pages
   */
  entireDocument
}
 
enum RenditionFormat {
  /**
   * PNG format
   */
  png = "image/png",
 
  /**
   * JPG format
   */
  jpg = "image/jpeg",
 
  /**
   * MP4 format
   */
  mp4 = "video/mp4",
 
  /**
   * PDF format
   */
  pdf = "application/pdf"
}
 
interface JpgRenditionOptions extends RenditionOptions {
  /**
   * JPG rendition format
   */
  format: RenditionFormat.jpg;
 
  /**
   * The background color to sit behind any transparent areas.
   * By default it is derived from the entity for which the rendition needs to be created.
   * Integer in 0xRRGGBB format.
   */
  backgroundColor?: number;
 
  /**
   * A number between 0 and 1, indicating image quality. Default is 1.0
   */
  quality?: number;
}
 
interface PngRenditionOptions extends RenditionOptions {
  /**
   * PNG rendition format
   */
  format: RenditionFormat.png;
 
  /**
   * The background color to sit behind any transparent areas.
   * By default it is derived from the entity for which the rendition needs to be created.
   * Integer in 0xAARRGGBB format
   */
  backgroundColor?: number;
}

interface Rendition {
  /**
   * Type of Rendition
   */
  type: RenditionType;
  
  /**
   * Blob containing the rendition
   */
  blob: Blob;
}
 
enum RenditionType {
  /**
   * Rendition of the whole page
   */
  page = "page"
}
 
interface PageRendition extends Rendition {
  /**
   * Page rendition type
   */
  type: RenditionType.page;
 
  /**
   * Page title
   */
  title: string;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {range: Range.entireDocument, format: RenditionFormat.png, backgroundColor: 0x7FAA77FF};
    const renditions = await AddOnSdk.app.document.createRenditions(renditionOptions);
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

<InlineAlert slots="text" variant="success"/>

Please refer to the **export-sample** and **pix** add-on in the code samples for more details on how to use the Export APIs.

## Simple Modal Dialogs

Allows you to pop-up a modal with different variations depending on needs.

You can also check the [manifest documentation](../references/manifest.md) and the [dialog-add-on](guides/develop/samples) code sample for more details on this flag and see how it's used. Also, please report any issues or feedback you may have for this API to the **#express-addons-support** slack channel.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface Application {
  /**
   * Show modal dialog
   */
  showModalDialog(dialogOptions: DialogOptions): Promise<DialogResult>;
}
 
interface DialogOptions {
  /**
   * Variant
   */
  variant: Variant;
 
  /**
   * Title
   */
  title: LocalizedString;
 
  /**
   * Description
   */
  description: LocalizedString;
 
  /**
   * Buttons
   */
  buttonLabels?: ButtonLabels;
}
 
interface 
Options extends DialogOptions {
  /**
   * Variant
   */
  variant: Variant.input;
 
  /**
   * Input field
   */
  field: Field;
}
 
enum Variant {
  export enum Variant {
    /**
     * Ask a user to confirm an action
     */
    confirmation = "confirmation",

    /**
     * Share information for user to acknowledge
     */
    information = "information",

    /**
     * Share information that a user needs to consider before proceeding
     */
    warning = "warning",

    /**
     * Tell a user that if they proceed with an action, it may impact their data in a negative way
     */
    destructive = "destructive",

    /**
     * Communicate critical issue that a user needs to resolve before proceeding
     */
    error = "error",

    /**
     * Ask a user to provide some inputs
     */
    input = "input"
}
 
interface ButtonLabels {
  /**
   * Primary action label
   * Default label is "OK".
   */
  primary?: LocalizedString;
 
  /**
   * Secondary action label
   */
  secondary?: LocalizedString;
 
  /**
   * Cancel action label
   */
  cancel?: LocalizedString;
}
 
interface Field {
  /**
   * Label
   */
  label: LocalizedString;
 
  /**
   * Specifies a short hint that describes the expected value of the field
   */
  placeholder: LocalizedString;
 
  /**
   * Type of the field
   */
  fieldType: FieldType;
}
 
enum FieldType {
  /**
   * One-line text input field
   */
  text = "text"
}
 
/**
 * Placeholder for future localization support
 */
type LocalizedString = string;
 
interface DialogResult {
  /**
   * Clicked button
   */
  buttonType: ButtonType
}
 
interface InputDialogResult extends DialogResult {
  /**
   * Field value
   */
  fieldValue: string;
}

/**
 * Button types for Simple Dialog
 */
export enum ButtonType {
    /**
     * Primary button pressed
     */
    primary = "primary",

    /**
     * Secondary button pressed
     */
    secondary = "secondary",

    /**
     * Cancel button pressed
     */
    cancel = "cancel",

    /**
     * Dialog closed via ESC or close(X) button
     */
    close = "close"
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await AddOnSdk.ready;
  
// Get confirmation from the user to enable a feature
async function EnableSmartFilters() {
  try {
    const dialogResult = await AddOnSdk.app.showModalDialog({
        variant: Variant.confirmation,
        title: "Enable smart Filters",
        description: "Smart filters are nondestructive and will preserve your original images.",
        buttonLabels: { primary: "Enable", cancel: "Cancel" },
      });
 
    if (dialogResult.buttonType === ButtonType.primary) {
      // Enable smart filters
    }
  } catch (error) {
    console.log("Error showing modal dialog:", error);
  }
}
```

<InlineAlert slots="text" variant="success"/>

We have provided a sample that can be used as a reference for implementing the Dialog APIs. Please see the **dialog-add-on** sample provided in the [code samples](guides/develop/samples) for specific details.

<!-- ##### Known issues with modal dialogs:
- Closing the dialog with enter logs error in console.
- Enter is not working on Error Dialog.
- Scroll bars not created when the dialog box size is too big.
- Dialog not in focus view.
- Dev Tools panel and left media panel are not accessible when a Dialog is open. -->
