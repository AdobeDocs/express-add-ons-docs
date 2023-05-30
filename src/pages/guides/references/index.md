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

These docs are for Adobe Express add-on APIs which are still in private beta. [Join the waitlist](https://airtable.com/shr3IK38z2MCNHJEm).

# API Reference

## Overview
This section covers the APIs available for developing your add-ons. It begins with an introduction to the main `AddOnSdk` core object reference, along with an overview of the properties and methods you will use in your add-on development. In the left expanded menu, you will find a list of the core add-on capabilities named by the functionality they provide. Within each of those sections are details about the interface definitions and methods needed to support that feature, along with example usage and output where relevant.

<InlineAlert slots="header, text1, text2" variant="success"/>

## SDK vs API
The lines between what should be considered an SDK (Software Development Kit) or an API (Application Programming Interface) can sometimes feel a little blurry. Some further explanation on these terms is provided here for more clarification.

- An **SDK** can be considered a kit that contains everything you need to develop for a platform. This includes not only the APIs, but also the tools, helpers, debuggers, and other dependent components that allow you to develop.

- **APIs** define the set of interface defintions available to use to provide the functionality that you want to build into your add-ons.


## AddOnSdk
<table class="spectrum-Table spectrum-Table--sizeM">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The core add-on SDK object. Provides access to the add-on development platform.</p></td>
</tr>
</tbody>
</table>

## Add-on SDK Module Import
The Add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an `import` statement in either an HTML `<script>` tag or in the list of `import` statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since it will already be imported for you, and the location it was placed will depend on the `template` you chose. If you decide to start from scratch for some reason and need to add it, then you can use the following sections to do so.

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

## AddOnSdk Properties
<table class="spectrum-Table spectrum-Table--sizeM">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.apiVersion</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td class="spectrum-Table-cell"><p>Current version of the add-on SDK running.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the host application (Adobe Express)</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.constants</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>A set of constants used throughout the add-on SDK.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The currently running add-on instance.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.ready</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>promise</pre></p></td>
    <td class="spectrum-Table-cell"><p>Indicates the AddOnSdk object has been initialized and you can start accessing the APIs.</p></td>
</tr>
</tbody>
</table>

## AddOnSdk.app Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
  <tr class="spectrum-Table-row">
     <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.document</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Represents the active document of the host application.</p></td>
  </tr>
  <tr class="spectrum-Table-row">
     <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.oauth</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization.</p></td>
  </tr>
  <tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Represents the host UI (Adobe Express UI).</p></td>
  </tr>
</tbody>
</table>

## AddOnSdk.app Methods
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
  <tr class="spectrum-Table-row">
      <td class="spectrum-Table-headCell"><p><strong>Method</strong></p></td>        
      <td class="spectrum-Table-headCell"><p><strong>Parameters</strong></p></td>
      <td class="spectrum-Table-headCell"><p><strong>Return Type</strong></p></td>
      <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
  </tr>
  <tbody class="spectrum-Table-body">
    <tr class="spectrum-Table-row">
      <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.on()</pre></p></td>
      <td class="spectrum-Table-cell"><p>type: <pre>string</pre></p></td>
      <td class="spectrum-Table-cell"><p>handler: <pre>(data) => {})</pre></p></td>
      <td class="spectrum-Table-cell"><p>void</p></td>
      <td class="spectrum-Table-cell"><p>Subscribe to an event (ie: listen for an event).</p></td>
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

## AddOnSdk.app Methods
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
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>themechange</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when there is a theme change at the host side.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>dragstart</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when the user starts dragging an item for which drag behavior is enabled.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>dragend</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when the drag operation ends.</p>
    </td>
</tr>
</tbody>
</table>

<!-- ## Events
- `AddOnSdk.app.on.localechange` - Triggered when there is a locale change at the host side.
- `AddOnSdk.app.on.themechange` - Triggered when there is a theme change at the host side.
- `AddOnSdk.app.on.dragstart` - Triggered when the user starts dragging an item for which drag behavior is enabled.
- `AddOnSdk.app.on.dragend` - triggered when the drag operation ends. -->

## AddOnSdk.constants 
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Range</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Rendition page range. Options:</p>
        <ul>
          <li><strong>currentPage</strong></li> Generate rendition for the current page
          <li><strong>entireDocument</strong></li>Generate rendition for all the pages
        </ul>
    </td>    
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionFormat</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Required output format of the rendition.</p>
        <ul>
          <li><strong>jpg</strong></li>"image/jpeg" for JPG format
          <li><strong>png</strong></li>"image/png" for PNG format
          <li><strong>mp4</strong></li>"video/mp4" for MP4 format
          <li><strong>pdf</strong></li>"application/pdf" for PDF format
        </ul>
    </td>    
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The type of rendition. Currently returns "page". </p>        
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Variant</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Types of dialog variants supported.</p>   
        <ul>
          <li><strong>confirmation</strong></li>Ask a user to confirm an action.
          <li><strong>information</strong></li>Share information for user to acknowledge.
          <li><strong>warning</strong></li>Share information that a user needs to consider before proceeding.
          <li><strong>destructive</strong></li>Tell a user that if they proceed with an action, it may impact their data in a negative way.
          <li><strong>error</strong></li>Communicate critical issue that a user needs to resolve before proceeding.
          <li><strong>input</strong></li>Ask a user to provide some inputs.
          <li><strong>custom</strong></li>A dialog that can render complex forms and content.
        </ul>     
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>DialogResultType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The type of the button in a Simple Dialog.</p>   
        <ul>
          <li><strong>alert</strong></li>Alert dialog result.
          <li><strong>input</strong></li>Input dialog result.
          <li><strong>custom</strong></li>Custom dialog result.          
        </ul>     
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ButtonType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The type of the button in a Simple Dialog.</p>   
        <ul>
          <li><strong>primary</strong></li>Primary button pressed.
          <li><strong>secondary</strong></li>Secondary button pressed.
          <li><strong>cancel</strong></li>Cancel button pressed.
          <li><strong>close</strong></li>Dialog closed via ESC or close(X) button.          
        </ul>     
    </td>
</tr>
</tbody>
</table>
