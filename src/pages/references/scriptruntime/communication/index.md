# Communication APIs

The communication APIs allow you to communicate between the script runtime and the iframe where your add-on is running.

## Overview

The script runtime and iframe runtime are two different runtime execution environments which are present on different threads in the browser. The communication APIs are based on the [Comlink library](https://github.com/GoogleChromeLabs/comlink) and provide a mechanism to allow the JavaScript code executing in each to interact. Developers can call the apis exposed in one environment (ie: script runtime) from another environment (ie: iframe where their add-on is running) bidirectionally.

## Accessing the APIs

A default exported module from `AddOnScriptSdk` is provided to enable the communication between the iframe and the script runtime via its' `instance.runtime` object. You can simply import the module into your script file code for use, and create a reference to the `runtime` object. For instance:

```js
import AddOnScriptSdk from "AddOnScriptSdk"; // AddOnScriptSdk is a default import

const { runtime } = AddOnScriptSdk.instance; // runtime object provides direct access to the comm methods
```

## Examples

The `runtime` object can then be used to access the communication methods which allow you to communicate between the two execution environments: `exposeApi()` and `apiProxy()`. The examples below show the methods in use from both the `index.html` where the iframe is running with your add-on code, and the script runtime environment running the contents of `code.js`.

### Expose APIs from the script

This example shows how to expose APIs from the script runtime (via `code.js`) for use by the UI (via `index.html`).

#### `code.js`

```js
import AddOnScriptSdk from "AddOnScriptSdk"; 

const { runtime } = AddOnScriptSdk.instance; 

const scriptApis = {
    performWorkOnDocument: function (data, someFlag) {
        // call the Editor APIs
    },
    getDataFromDocument: function() {
        // get some data from document
    }
}
// expose these apis to be directly consumed in the UI (ie: index.html file).
runtime.exposeApi(scriptApis);
```

#### index.html

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

AddOnSdk.ready.then(async () => {
    const { runtime } = AddOnSdk.instance;

    // Wait for the promise to resolve (the script runtime may not have initialized yet) to get a proxy to call APIs defined in the script
    const scriptApis = await runtime.apiProxy("script");

    await scriptApis.performWorkOnDocument({
        pageNumber: 1,
        op: "change_background_color",
        data: {
            toColor: "blue"
        }
    }, true);

    console.log(await scriptApis.getDataFromDocument());
});
```

### Expose APIs from the UI

This example shows how to expose APIs from the UI (via `index.html`) for use by the script runtime (via `code.js`).

#### `index.html`

```js
AddOnSdk.ready.then(async () => {
    console.log("AddOnSdk is ready for use.");

    const { runtime } = AddOnSdk.instance;
    const uiApi = {
        performWorkOnUI: function(data, someFlag) {
            // Do some ui operation
        },
        getDataFromUI: async function() {
            let resolver = undefined;
            const promise = new Promise(resolve => {
                resolver = resolve;
            });
            setTimeout(() => {
                resolver("button_color_blue");
            }, 10);
            return await promise;
        }
    }
    // Expose the UI Apis to be used in the script code (ie: code.js)
    runtime.exposeApi(uiApi);
}
```

#### `code.js`

```js
import AddOnScriptSdk from "AddOnScriptSdk"; // default import

const { runtime } = AddOnScriptSdk.instance;

async function callUIApis() {
    // Get a proxy to the APIs defined in the UI
    const uiApis = await runtime.apiProxy("panel");
    await uiApis.performWorkOnUI({
        buttonTextFont: 20,
        buttonColor: "Green"
    }, true);

    const result = await uiApis.getDataFromUI();
    console.log("Data from UI: " + result);
}
```

<InlineAlert slots="text" variant="info"/>

**DEBUGGING:** Since the script code runs in a separate context from your add-on UI, the only support for debugging is via the `console.*` methods.
