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
This section covers the APIs available for developing your add-ons. It begins with an introduction to the main `AddOnSdk` core object reference, along with an overview of the properties and methods you will use in your add-on development. In the left expanded menu, you will find a list of the core add-on capabilities named by the functionality they provide. Within each of those sections are details about the interfaces and methods needed to make up that feature, along with example usage and output where relevant. 

<InlineAlert slots="text" variant="success"/>

Be sure to check out the [code samples](../develop/samples.md) for a more in-depth example of how to use them as well as the [recipes](../develop/) section for more details. 


# [AddOnSdk](#add-on-sdk-module-import)
<br/><br/>
<table style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The core add-on SDK object. Provides access to the add-on development platform.</p>
    </td>
</tr>
</tbody>
</table>

<br/><br/>


## Add-on SDK Module Import
The Add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of `import` statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since it will already be imported for you, and the location it was placed will depend on the `template` you chose. 

But for reference, below are some examples of how it can be imported for use.

### Import into HTML file
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
```html
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


<!-- In the left expanded menu, you will find a list of the core add-on capabilities named by the functionality they propvide. Within each of those sections are details about the interfaces and methods needed to make up that feature, along with example usage and output where relevant. which contain the interfaces and examples that make up the core features of the add-on API., where you can find the interface definitions along with an example code snippet to illustrate the usage. However, you should also check out the [code samples](../develop/samples.md) for a more in-depth example of how to use them as well as the [recipes](../develop/) section for more details.  -->


## AddOnSdk Properties
<!-- <table class="spectrum-Table spectrum-Table--sizeM"> -->
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.apiVersion</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Current version of the add-on SDK running.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Provides access to the host application (Adobe Express). </p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.constants</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>A set of constants used throughout the add-on SDK.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The currently running add-on instance.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.ready</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>promise</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Indicates the AddOnSdk object has been initialized and you can start accessing the APIs.</p>
    </td>
</tr>
</tbody>
</table>



## AddOnSdk.app Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.document</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Represents the active document of the host application.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.oauth</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Represents the host UI (Adobe Express UI).</p>
    </td>
</tr>
</tbody>
</table>

## AddOnSdk.app.ui Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui.locale</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Retrieve the host application current locale.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui.locales</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string []</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Retrieve the host application's supported languages.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui.theme</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Retrieve the current theme of the host application.</p>
    </td>
</tr>
</tbody>
</table>

## AddOnSdk.instance Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance.clientStorage</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Reference to the client storage of the add-on.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance.manifest</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Add-ons manifest details. Maps to entries in the add-ons <pre>manifest.json</pre> file.
</p>
    </td>
</tr>
</tbody>
</table>

## AddOnSdk.constants Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Range</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Rendition page range.</p>
    </td>
</tr>
</tbody>
</table>


## Methods
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Method</strong></p></td>        
    <td class="spectrum-Table-headCell"><p><strong>Parameters</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.on()</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.on(type: string, handler: (data) => {})</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Listen for an event.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.off()</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.off(type: string, handler: (data) => {}): 
    </pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Stop listening for an event.</p>
    </td>
</tr>
</tbody>
</table>


## AddOnSdk Events
The table below describes the events triggered from the add-on SDK. Use the `AddOnSdk.app.on()` method to listen to events, and the `AddOnSdk.app.off()` method to stop listening:



<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>localechange</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when there is a locale change at the host side.</p>
    </td>
</tr>
</tbody>
</table>

## Events
- `AddOnSdk.app.on.localechange` - Triggered when there is a locale change at the host side.
- `AddOnSdk.app.on.themechange` - Triggered when there is a theme change at the host side.
- `AddOnSdk.app.on.dragstart` - triggered when the user starts dragging an item for which drag behavior is enabled.
- `AddOnSdk.app.on.dragend` - triggered when the drag operation ends.

## AddOnSDK.constants
- `Range` - Rendition page range
    - `currentPage` - Generate rendition for the current page
    - `entireDocument` - Generate rendition for all the pages

- `RenditionFormat` - Required output format of the rendition
    - `png` = "image/png" - PNG format
    - `jpg` = "image/jpeg" - JPG format
    - `mp4` = "video/mp4" - MP4 format
    - `pdf` = "application/pdf" - PDF format

- `RenditionType` - The type of rendition
    - `page` - Rendition of the whole page

- `Variant` - Types of dialog variants supported
    - `confirmation` - Ask a user to confirm an action
    - `information` - Share information for user to acknowledge
    - `warning` - Share information that a user needs to consider before proceeding
    - `destructive` - Tell a user that if they proceed with an action, it may impact their data in a negative way
    - `error` - Communicate critical issue that a user needs to resolve before proceeding
    - `input` - Ask a user to provide some inputs
    - `custom` - A dialog that can render complex forms and content

- `FieldType` - The type of the input field in Simple Dialog  
    - text = "text" - One-line text input field
- DialogResultType - The type of the dialog result
    alert = "alert" - Alert dialog result
    input = "input" - Input dialog result
    custom = "custom" - Custom dialog result

- `ButtonType` - Simple Dialog Button types
    `primary` = "primary" = Primary button pressed
    `secondary` = "secondary" = Secondary button pressed
    `cancel` = "cancel" = cancel button pressed
    `close` = "close" = Dialog closed via ESC or close(X) button

- `RuntimeType` - The runtime type
    `panel` = "panel" - Iframe based runtime that usually hosts the add-on main UI logic.
    `dialog` = "dialog" - Iframe based runtime that hosts a modal dialog UI.
    