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

- [Add-on SDK - API Access](#add-on-sdk---api-access)
- [Application UI Theme](application-ui-theme)
- [Language & Locale](#anguage-locale)
- [Manifest Data](manifest-data)
- [OAuth 2.0 Auth](oauth)
- [ClientStorage](client-storage)
- [Import](import)
- [Drag and Drop](drag-drop)
- [Export](export)
- [Simple Modal Dialogs](simple-modal-dialogs)

Also, check out the latest [Manifest Reference](../../manifest_reference/v2) for more important details on how to configure yours when developing your add-ons.

## Introduction
The Add-on SDK is available as an ECMAScript 2015 Module and is hosted in a CDN.

To use the SDK, include a link to the `sdk.js` file in a script tag within the `<head>` section of the page to ensure correct initialization of the Add-on API environment.

```js
<script type="module">
  import AddOnSDKAPI from
  "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
</script>
```

## Add-on SDK - API Access
The Add-on SDK provides the following export for accessing all of the APIs.

## Interface

```js
/**
 * The main API Interface exposed by the SDK to the consuming Add-on code.
 */
interface AddOnSDKAPI {
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
     * Represents capabilities and events of the currently running AddOn Instance.
     * The interface type depends on the type of the underlying Add-on.
     */
    readonly instance: AddOn;

    /**
     * Represents capabilities and events of the host application.
     */
    readonly app: Application;
}
```

## Usage

```js
import AddOnSDKAPI from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

AddOnSDKAPI.ready.then(() => {
  console.log("API version", AddOnSDKAPI.apiVersion);
  console.log("Add-on instance object", AddOnSDKAPI.instance);
  console.log("Application object", AddOnSDKAPI.app);
});
```