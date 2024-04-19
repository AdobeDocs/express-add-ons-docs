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
title: Client-side Data
description:  Explore techniques for storing and retrieving data on the client-side.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# Client-side Data

## Local Data Management

Instead of relying solely on server-side data, you can use the `clientStorage` API to store and retrieve data locally on the client-side. This can be useful for caching images, storing user preferences, or other scenarios where you want to avoid making repeated server requests.

An example is shown below; also refer to the [SDK Reference section for clientStorage](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage/) and the [use-client-storage sample add-on](https://developer.adobe.com/express/add-ons/docs/samples/#use-client-storage) for more details.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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