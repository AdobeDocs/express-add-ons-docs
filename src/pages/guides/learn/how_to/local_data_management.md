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
  - Storage
  - clientStorage
title: Store Data
description: Store Data.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Store Data

## Use the clientStorage API

Instead of relying solely on server-side data, you can use the **asynchronous** `clientStorage` API to store and retrieve data locally on the client-side. This can be useful for caching images, saving user preferences, or other scenarios where you want to avoid making repeated server requests.

Each add-on can store up to **10MB of data as key-value pairs**; supported values are not limited to strings, but also include objects, arrays, numbers, booleans, `null`, `undefined` and `Uint8Array`.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

let store;

addOnUISdk.ready.then(async () => {
    store = addOnUISdk.instance.clientStorage;
}
/**
 * Store item
 */
async function setItem(item: string, isComplete: boolean) {
    await store.setItem(item, isComplete);
    todoItemInput.value = "";
}
/**
 * Log all storage item values
 */
async function displayAllItems() {
    const todoItems = await store.keys();
    todoItems.forEach(async (item: string) => {
        const itemValue = await store.getItem(item);
        console.log("Key: " + item + " value: " + itemValue);
    });
}
```

## Use Cases

Local data storage can be useful in many scenarios, such as when you need to cache data from server requests, store user UI preferences, pre-populate fields on load, or save temporary data. The fact that `clientStorage` support multiple data types makes it a more versatile tool to use compared to the Browser's `localStorage`.

<<<<<<<< HEAD:src/pages/guides/develop/how-to/local-data-management.md
Please, refer to the [SDK Reference section for clientStorage](../../../references/addonsdk/instance-client-storage.md) for a complete list of methods, and the [use-client-storage sample add-on](../../../samples.md#use-client-storage) for more details.
========
Please, refer to the [SDK Reference section for clientStorage](../../../references/addonsdk/instance-clientStorage.md) for a complete list of methods, and the [use-client-storage sample add-on](../samples.md#use-client-storage) for more details.
>>>>>>>> c10e7f13f0ebdbfd5ff5dc03e7fed47ab831ba56:src/pages/guides/learn/how_to/local_data_management.md
