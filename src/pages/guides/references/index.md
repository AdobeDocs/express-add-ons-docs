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

# API Reference

## Overview
This section covers the APIs available for developing your add-ons. It begins with an introduction to the main `AddOnSdk` core object reference, along with an overview of some other core objects you will be using throughout your add-on development. In the left expanded menu, you will find the list of API sub-sections, where you can find the interface definitions along with an example code snippet to illustrate the usage. However, you should also check out the [code samples](../develop/samples.md) for a more in-depth example of how to use them as well as the [recipes](../develop/) section for more details. 

## AddOnSdk Object
The first object you will need to be aware of when developing your add-ons is the **AddOnSdk** object. 
The Add-on SDK is available as a hosted JavaScript module on a CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of `import` statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since it will already be imported for you, and the location it was placed will depend on the `template` you chose. 

But for reference, below are some examples of how it can be imported for use.

### Import into HTML file
To use the SDK from an HTML file, simply include a link to it in a `<script>` tag with the `type=module` attribute on it to ensure everything is initialized properly. 

```js
<body>
        Hello World!

        <script type="module">
            import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

            ...            
        </script>
    </body>
```

<InlineAlert slots="text" variant="success"/>

**TIP:** Placing your `<script>` tag just before the closing `<body>` tag helps reduce the page loading time.

### Import into JavaScript file
If you want to reference the Add-on SDK in your `.js/.jsx` source files, add it to the list of imports as a default module reference, such as in the following:

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

### Import into TypeScript file
```js
// @ts-ignore Import module
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

**NOTE:** If you create your add-on project with the CLI based on the `typescript` or `typescript-react` templates, you will automatically get the following type definition generated in your project for you:

```ts
declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {
    export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";
    export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";
}
```


<body>
    Hello World!

    <script type="module">
        import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

        AddOnSdk.ready.then(async () => {
            console.log("AddOnSdk is ready for use.");
        });
    </script>
</body>


The `AddOnSdk` provides the following interface definition and exposes several variables listed below, and is also how you can determine when the APIs are ready to interact with.

- `ready`: Used to determine when you can start accessing the APIs. 
- `apiVersion`: Current version of the SDK running.
- `instance`: the currently running add-on instance (see [AddOn Object](#addon)), allowing you to access the [manifest.json](#manifest) details and a [Client Storage](#client-storage) object, which allows you to locally persist to storage, per user and for this add-on.
- `app`: Provides access to the host application (Adobe Express). See the [`Application`](#application) definition below for more details.

<!-- ## SDK vs API -->
<InlineAlert slots="text" variant="success"/>

The terms **SDK** (software development kit) and **API** (application programming interface) can often seem to become blurry. To clarify further, an SDK can be thought of as a kit that contains everything you need to write an application (in this case add-on) for a platform. This includes not only the APIs, but also the tools and other dependencies, helpers and components involved. API's themselves, on the other hand, define the interface defintions that are used to retrieve the information needed to implement features a developer may want to offer.


<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
/**
 * The main API Interface exposed by the SDK to the consuming Add-on code.
 */
interface AddOnSdk {
    /**
     * Resolves when the SDK has made a successful connection to the host app.
     * Indicates that APIs directly interacting with the host application are ready.
     * Register a call back with @see Promise#then or await this promise.
     */
    readonly ready: Promise<void>;

    
    /**
     * API version of the SDK.
     */
    readonly apiVersion: string;

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

## Application Object
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

## AddOn Object
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
