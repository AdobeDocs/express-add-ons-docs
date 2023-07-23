# Communication APIs
The communication APIs allow you to communicate between the script runtime and the iframe where your add-on is running. 

## Overview
The script runtime and iframe runtime are two different runtime execution environments which are present on different threads in the browser. The communication APIs are based on the [Comlink library](https://github.com/GoogleChromeLabs/comlink) and provide a mechanism to allow the JavaScript code executing in each to interact, so developers can call apis exposed in one environment (ie: script runtime) from another environment (ie: iframe where their add-on is running) bidirectionally.


### Example Code Snippets
The AddOnSdk `runtime` object provides the methods to allow you to communicate between the two execution environments via `exposeApi()` and `apiProxy()`. The examples below show the methods in use from both the `index.html` where the iframe is running with your add-on code, and the script runtime environment running the contents of `code.js`.

### Example 1: Expose APIs from script code 

#### `code.js`

```js

const scriptApis = {
    performWorkOnDocument: function (data, someFlag) {
        // call content authoring APIs
    },

    getDataFromDocument: function() {
        // get some data from document
    }
}
// expose these apis to be directly consumed in the UI (ie: `index.html` file).
runtime.exposeApi(scriptApis);
```

#### index.html
```js
import AddOnSdk from "https://localhost.adobe.com:8081/sdk.js";

AddOnSdk.ready.then(async () => {
    const { runtime } = AddOnSdk.instance;

    // Wait for the promise to resolve (the script runtime may not have initialized yet)
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
