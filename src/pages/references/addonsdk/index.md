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

<InlineAlert slots="text" variant="info"/>

Preview Adobe Express add-on SDK documentation while you wait to [join our private beta](https://adobe.com/go/express-developer).

<br/> <br/>

# AddOnSdk Reference

## Overview

This reference is provided to outline the interfaces, methods, properties and events that support the [add-on SDK features](#features-supported-by-the-sdk). It begins with an introduction to the core `AddOnSdk` module, which provides access to the add-on development platform. Import this module to use it for accessing all of the API entities.  

<InlineAlert slots="header, text1, text2, text3, text4" variant="success"/>

# SDK vs API

The distinction between an SDK and an API can be a bit blurry and can depend on the specific context. However, here's a general overview of the differences between an SDK and an API:

   **SDK** (Software Development Kit) - a collection of software development tools and libraries that developers can use to create applications for a specific platform or system. An SDK typically includes an API, documentation, code samples, and other resources that developers need to build applications.

   **API** (Application Programming Interface) - a set of rules and protocols that developers can use to interact with a platform.

In general, an SDK provides a more complete set of tools and resources for developers than an API alone. An SDK may include an API, but it also includes other tools and resources that can help developers build applications more easily. However, the terms SDK and API are often used interchangeably, and the specific definitions can vary depending on the context.

**Note:** an `interface` can also be considered an `object` in terms of this reference. You can traverse the `AddOnSdk` interfaces/objects (ie: `app`,`instance`) etc in the left navigation to learn more.

## Features Supported by the SDK

- [Importing Content](../../guides/develop/)
- [Exporting Content](../../guides/develop/)
- [Drag & Drop Behavior](../../guides/develop/)
- [Authorization with OAuth 2.0](../../guides/develop/)
- [Client-side Storage Access](../../guides/develop/)
- [Modal Dialogs](../../guides/develop/)
- [Locale Detection](../../guides/develop/)
- [Theme Detection](../../guides/develop/)
- [Access to the Manifest](../../guides/develop/)

<InlineAlert slots="text" variant="success"/>

See the [implementing common use cases page](../../guides/develop/) for details and examples of how to add the features above.

## Importing the AddOnSdk for Use
<!-- ## Add-on SDK Module Import -->
The add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of `import` statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since **it will already be imported for you**, and the location it was placed will depend on the `template` you chose. The following sections show how it's imported into different file types for reference.

#### Import into HTML file

To use the SDK from an HTML file, simply include a link to it in a `<script>` tag with the `type=module` attribute on it to ensure everything is initialized properly.

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

<InlineAlert slots="text" variant="success"/>

**TIP:** Placing your `<script>` tag just before the closing `<body>` tag helps reduce the page loading time.

#### Import into JavaScript/TypeScript file

The SDK can be referenced in `.js/.jsx/.ts/.tsx` source files by adding it to the list of imports as a default module reference, such as in the following:

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

**Note:** if you created your add-on project with the CLI based on the `typescript` or `typescript-react` templates, you will automatically get a types definition file named `ccweb-add-on-sdk-typings.d.ts` generated in your project `src` for you. This file contains the following exports, and allows you to take advantage of type checking and auto-completion features while developing with the AddOnSdk in your IDE.

```ts
declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {
    export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";
    export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";
}
```

See the [typescript definitions section](../../guides/develop/frameworks-libraries-bundling.md#typescript-definitions) in the developer guides as well for more details.

## AddOnSdk Objects

The following objects can be accessed from the `AddOnSdk` after it has been imported.

<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Attribute</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Name</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the host application (Adobe Express)</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The currently running add-on instance.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.ready</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>Promise</pre></p></td>
    <td class="spectrum-Table-cell"><p>Indicates the AddOnSdk object has been initialized and you can start accessing the APIs. Register a call back with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then">Promise.then</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await">await this promise</a>.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre></pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.constants</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>A set of constants used throughout the add-on SDK.</p></td>
</tr>
</tbody>
</table>

## AddOnSdk Properties

The following properties can be accessed from the `AddOnSdk` object after it has been imported.

<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Attribute</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Property</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.apiVersion</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td class="spectrum-Table-cell"><p>The current version of the add-on SDK running.</p></td>
</tr>
</tbody>
</table>

## AddOnSdk Errors

The table below describes the possible error messages that may occur when using the core `AddOnSdk` object, with a description of the scenario that will return them.

<br/>

| Error Message                     |   Error Scenario                 |
|-------------------------------:|-------------------------------------------------:|
| Invalid `${propertyName}` property. SDK is not fully initialized. | When an add-on tries to use the SDK before it is fully initialized. |
| Failed to initialize Addon SDK. Unsupported API version: `${apiVersion}` | API version is unsupported.  |
