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

<InlineAlert slots="text" variant="info"/>

These docs are for Adobe Express add-on APIs which are still in private beta. [Join the waitlist](https://adobe.com/go/express-developer). 


<br/> <br/>

# AddOnSdk API Reference

## Overview
This reference is provided to outline the interfaces, functions, properties and events that support the [Add-on SDK API features](#what-can-i-do-with-the-apis). It begins with an introduction to the core `AddOnSdk` module, which provides access to the add-on development platform. Import this module to use it for accessing all of the API entities.  

<InlineAlert slots="header, text1, text2, text3" variant="success"/>

# SDK vs API
The lines between what should be considered an SDK (Software Development Kit) or an API (Application Programming Interface) can sometimes feel a little blurry. Some further explanation on these terms and how they should be considered for add-on development is provided here for clarification.

   - An **SDK** can be considered a kit that contains everything you need to develop for a platform. This includes not only the APIs, but also the tools, middleware, and other libraries and sub-components that support development.

   - **APIs** define the set of interface defintions available to use for providing the functionality that you want to build into your add-ons.

**Note:** an `interface` can also be considered an `object` in terms of this reference. You can traverse the `AddOnSdk` interfaces/objects (ie: `app`,`instance`) etc in the left navigation to learn more.


## What can I do with the APIs?
- [Import Content](../../develop/)
- [Export Content](../../develop/)
- [Enable Drag and Drop](../../develop/)
- [Authenticate with OAuth 2.0](../../develop/)
- [Access Client-side Storage](../../develop/)
- [Use Modal Dialogs](../../develop/)
- [Detect Current Locale](../../develop/)
- [Detect Current Theme](../../develop/)
- [Access Add-on Manifest Data](../../develop/)



<InlineAlert slots="text" variant="success"/>

See the [Code Recipes](../../develop/) for details and examples to support the use cases of the APIs listed above.


## AddOnSdk Objects
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
    <td class="spectrum-Table-cell"><p>Indicates the AddOnSdk object has been initialized and you can start accessing the APIs. Register a call back with [Promise.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) or [await this promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).</p></td>
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
    <td class="spectrum-Table-cell"><p>Current version of the add-on SDK running.</p></td>
</tr>
</tbody>
</table>


### Add-on SDK Module Import
The Add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of `import` statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since **it will already be imported for you**, and the location it was placed will depend on the `template` you chose. The following sections show how it's imported into different file types for reference.

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

#### Import into JavaScript file
The SDK can be referenced in `.js/.jsx` source files by adding it to the list of imports as a default module reference, such as in the following:

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

#### Import into TypeScript file
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

```
Note, if you created your add-on project with the CLI based on the `typescript` or `typescript-react` templates, you will automatically get the following type definition generated in your project for you:

```ts
declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {
    export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";
    export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";
}
```