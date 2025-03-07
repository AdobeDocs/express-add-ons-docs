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
title: SDK Reference
description: The Adobe Express add-on SDK Reference.
contributors:
  - https://github.com/hollyschinsky
---

# Add-on UI SDK Reference

## Overview

This reference is provided to outline the interfaces, methods, properties and events that support the [add-on UI SDK features](#features-supported-by-the-sdk). It begins with an introduction to the core `addOnUiSdk` module, which provides access to all of the interfaces available to use in the iframe where your add-on is running. Import this module to use it for accessing all of the API's that allow you to implement features like those outlined in the next section.

## Features Supported by the SDK

- [Importing Content](../../guides/develop/how_to/use_images.md)
- [Exporting Content](../../guides/develop/how_to/create_renditions.md)
- [Accessing Content](../../guides/develop/how_to/group_elements.md)
- [Drag & Drop Behavior](../../guides/develop/how_to/drag_and_drop.md)
- [Authorization with OAuth 2.0](../../guides/develop/how_to/oauth2.md)
- [Client-side Storage Access](../../guides/develop/how_to/local_data_management.md)
- [Modal Dialogs](../../guides/develop/how_to/modal_dialogs.md)
- [Locale Detection](../../guides/develop/how_to/theme_locale.md#detecting-locale-supported-locales-and-format)
- [Theme Detection](../../guides/develop/how_to/theme_locale.md#detecting-theme)
- [Access to the Manifest](/references/addonsdk/instance-manifest.md)
- [Access to the Document information](/references/addonsdk/app-document.md)

<InlineAlert slots="text" variant="success"/>

See the [implementing common use cases page](../../guides/develop/) for details and examples of how to add the features above.

<InlineAlert slots="header, text1, text2, text3, text4" variant="success"/>

# SDK vs API

The distinction between an SDK and an API can be a bit blurry and can depend on the specific context. However, here's a general overview of the differences between an SDK and an API:

**SDK** (Software Development Kit) - a collection of software development tools and libraries that developers can use to create applications for a specific platform or system. An SDK typically includes an API, documentation, code samples, and other resources that developers need to build applications.

**API** (Application Programming Interface) - a set of rules and protocols that developers can use to interact with a platform.

In general, an SDK provides a more complete set of tools and resources for developers than an API alone. An SDK may include an API, but it also includes other tools and resources that can help developers build applications more easily. However, the terms SDK and API are often used interchangeably, and the specific definitions can vary depending on the context.

**Note:** an `interface` can also be considered an `object` in terms of this reference. You can traverse the `addOnUISdk` interfaces/objects (ie: `app`,`instance`) etc in the left navigation to learn more.

## Importing the addOnUISdk for Use

The add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of `import` statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since **it will already be imported for you**, and the location it was placed will depend on the `template` you chose. The following sections show how it's imported into different file types for reference.

#### Import into HTML file

To use the SDK from an HTML file, simply include a link to it in a `<script>` tag with the `type=module` attribute on it to ensure everything is initialized properly.

```js
<body>
    Hello World!
    <script type="module">
        import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
        addOnUISdk.ready.then(async () => {
            console.log("addOnUISdk is ready for use.");
        });
    </script>
</body>
```

<InlineAlert slots="text" variant="success"/>

**TIP:** Placing your `<script>` tag just before the closing `<body>` tag helps reduce the page loading time.

#### Import into JavaScript/TypeScript file

The SDK can be referenced in `.js/.jsx/.ts/.tsx` source files by adding it to the list of imports as a default module reference, such as in the following:

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

**Note:** if you created your add-on project with the CLI based on the `typescript` or `typescript-react` templates, you will automatically get a types definition file named `add-on-ui-sdk.d.ts` generated in your project `src` for you. This file contains the following exports, and allows you to take advantage of type checking and auto-completion features while developing with the Add-on SDK in your IDE.

```ts
declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {
  export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";
  export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";
}
```

See the [typescript definitions section](../../guides/develop/frameworks-libraries-bundling.md#typescript-definitions) in the developer guides as well for more details.

## addOnUISdk Properties

The following properties can be accessed from the `addOnUISdk` object after it has been imported.<br/><br/>

<table columnWidths="20,30,15,35" class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Attribute</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Name</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.app</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the host application (Adobe Express)</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.instance</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The currently running add-on instance.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.ready</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>Promise</pre></p></td>
    <td class="spectrum-Table-cell"><p>Indicates the addOnUISdk object has been initialized and you can start accessing the APIs. Register a call back with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then">Promise.then</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await">await this promise</a>.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre></pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.constants</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>A set of constants used throughout the add-on SDK.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.apiVersion</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td class="spectrum-Table-cell"><p>The current version of the add-on SDK running.</p></td>
</tr>
</tbody>
</table>

## addOnUISdk Errors

The table below describes the possible error messages that may occur when using the core `addOnUISdk` object, with a description of the scenario that will return them.

<br/>

|                                                            Error Message |                                                      Error Scenario |
| -----------------------------------------------------------------------: | ------------------------------------------------------------------: |
|        Invalid `${propertyName}` property. SDK is not fully initialized. | When an add-on tries to use the SDK before it is fully initialized. |
| Failed to initialize Addon SDK. Unsupported API version: `${apiVersion}` |                                         API version is unsupported. |
