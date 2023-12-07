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
title: Communication APIs
description: An introduction to the Communication APIs available in the document sandbox.
contributors:
  - https://github.com/hollyschinsky  
hideBreadcrumbNav: true
---

# Communication APIs

The communication APIs allow you to communicate between the document model sandbox (referred to as simply "document sandbox" throughout the rest of this guide), and the iframe where your add-on is running specifically, via the add-on SDK methods available for the document sandbox.

## Overview

The document sandbox and iframe runtime are two different runtime execution environments which are present on different threads in the browser. The communication APIs are based on the [Comlink library](https://github.com/GoogleChromeLabs/comlink) and provide a mechanism to allow the JavaScript code executing in each to interact. Developers can call the apis exposed in one environment (ie: document sandbox) from another environment (ie: iframe where their add-on is running) bidirectionally.

## Accessing the APIs

A default exported module from `addOnSandboxSdk` is provided to enable the communication between the iframe and the document sandbox via its' `instance.runtime` object. You can simply import the module into your script file code for use, and create a reference to the `runtime` object. For instance:

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox"; // a default import

const { runtime } = addOnSandboxSdk.instance; // runtime object provides direct access to the communication APIs
```

## Examples

The `runtime` object can then be used to access the communication methods which allow you to communicate between the two execution environments: `exposeApi()` and `apiProxy()`. The examples below show the methods in use from both the `index.html` where the iframe is running with your add-on code, and the document sandbox environment running the contents of `code.js`.

### Expose APIs from the script

This example shows how to expose APIs from the document sandbox SDK (via `code.js`) for use by the UI (via `index.html`).

#### `code.js`

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox"; 

const { runtime } = addOnSandboxSdk.instance; 

const sandboxApi = {
    performWorkOnDocument: function (data, someFlag) {
        // call the Document APIs
    },
    getDataFromDocument: function () {
        // get some data from document
    },
};
// expose these apis to be directly consumed in the UI (ie: index.html file).
runtime.exposeApi(sandboxApi);
```

#### index.html

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    const { runtime } = addOnUISdk.instance;

    // Wait for the promise to resolve to get a proxy to call APIs defined in the document sandbox
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    await sandboxProxy.performWorkOnDocument(
        {
            pageNumber: 1,
            op: "change_background_color",
            data: {
                toColor: "blue",
            },
        }, 
        true
    );

    console.log(await sandboxProxy.getDataFromDocument());
});
```

### Expose APIs from the UI

This example shows how to expose APIs from the UI (via `index.html`) for use in the document sandbox (via `code.js`).

#### `index.html`

```js
addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");

    const { runtime } = addOnUISdk.instance;
    const uiApi = {
        performWorkOnUI: function (data, someFlag) {
            // Do some ui operation
        },
        getDataFromUI: async function () {
            let resolver = undefined;
            
            const promise = new Promise((resolve) => {
                resolver = resolve;
            });
            setTimeout(() => {
                resolver("button_color_blue");
            }, 10);
            return await promise;
        },
    };
    // Expose the UI Apis to be used in the script code (ie: code.js)
    runtime.exposeApi(uiApi);
});
```

#### `code.js`

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox"; // default import

const { runtime } = addOnSandboxSdk.instance;

async function callUIApis() {
    // Get a proxy to the APIs defined in the UI
    const uiApis = await runtime.apiProxy("panel");
    await uiApis.performWorkOnUI(
        {
            buttonTextFont: 20,
            buttonColor: "Green"
        },
        true
    );
    
    const result = await uiApis.getDataFromUI();
    console.log("Data from UI: " + result);
}
```

<InlineAlert slots="text" variant="info"/>

**DEBUGGING:** Since the script code runs in a separate context from your add-on UI, the only support for debugging is via the `console.*` methods.

## Data Types

Data type validation is performed for both the arguments and the return types that are exchanged across the document sandbox runtimes (aka: communication API layer). A whitelist of supported data types is maintained and detailed below. All other data types will be rejected.

### Supported data types

<br/>
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:rgb(138, 43, 226)">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Examples</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Primitive types:</strong> <br/> &nbsp;&nbsp;- string <br/>  &nbsp;&nbsp;- boolean <br/> &nbsp;&nbsp;- number <br/> &nbsp;&nbsp;- Undefined<br/></p></td>
    <td class="spectrum-Table-cell"><p><pre><br/>"hello"<br/>true<br/>1<br/>undefined</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Simple plain objects</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>&#123; data: "world" &#125;, &#123; value : true &#125;</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Arrays of primitive and plain objects</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>[1,2],["hello", true, &#123; data: null &#125;]</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>ArrayBuffer</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new ArrayBuffer(1024)</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Blob</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new Blob()</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Error</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new Error()</pre></p></td>
</tr>
</tbody>
</table>

Some data types are not supported and may result unintended behavior. To avoid this, the type of argument/return type in the communication layer is checked and an error is thrown if not supported.

### Unsupported data types

<br/>
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:rgb(138, 43, 226)">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Examples</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Map</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new Map()</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Set</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new Set()</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>DataView() </strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new DataView(new ArrayBuffer(8))</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Boolean</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new Boolean()</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>String</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new String(“hello”)</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>RegExp</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new RegExp("pattern")</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Symbol</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>Symbol('symbol')</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Date</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new Date()</pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>UserDefinedClass</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>new UserDefinedClass() </pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Function</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>() => &#123;&#125; </pre></p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>Circular objects</strong> <br/></p></td>
    <td class="spectrum-Table-cell"><p><pre>const obj = &#123;&#125; obj.key = obj;</pre></p></td>
</tr>
</tbody>
</table>
