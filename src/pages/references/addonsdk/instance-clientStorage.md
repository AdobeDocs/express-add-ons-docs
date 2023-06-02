# AddOnSdk.instance.clientStorage
Reference to the `clientStorage` object for the currently running add-on. See the [Client Storage Code Recipe](../../develop/) for more details. The Client Storage API allows you to store, retrieve and delete persistent data in the user's current browser. 

Client Storage is similar to using the `Window.localStorage` API, but is asynchronous, supports multiple datatypes, (i.e., objects, arrays, strings, numbers, booleans, null, undefined and Uint8Array) and has a larger storage limit. Each add-on can store up to 10 mb of data in `ClientStorage`, per user. Any data additions over 10 mb will throw a quota error. However, an add-on developer can write code to delete old data so that new data can be added.

<InlineAlert slots="text" variant="info"/>

Since the data is stored in the user’s current browser, user actions such as clearing the browser cache would clear all of the data storage in `ClientStorage` (similar to `localStorage`).

## Methods

## getItem()
**`async getItem(key: string): Promise<unknown | undefined>`**<br/>
An asynchronous method to retrieve a value from Client Storage for a given key. If no value has been stored for that key, this function will return `undefined`.

#### Parameters
| Name          | Type      | Description   |
| ------------- | --------- | -----------:  |
| key           | `string ` | The key to retrieve the value for. |


#### Returns 
`Promise` or `undefined` if no value has been stored for that key.

#### Example Usage
```js
async function getData(key) {
  try {
    return await clientStorage.getItem(key);
  } catch (error) {
    console.log("Failed to get the value from the ClientStorage.");
  }
}
```

## setItem()
**`async setItem(key: string, value: any): Promise<void>;`**<br/>
Store a value in Client Storage with the given key. The returned promise will resolve if storage is successful, or reject with an error message if storage failed. The value can be any of multiple data types, such as `object`, `string`, array, number, boolean, `null`, `undefined` and `Uint8Array`.

#### Parameters
| Name          | Type      | Description   |
| ------------- | --------- | -----------:  |
| key           | `string ` | The key to reference the value stored. |
| value         | `any `    | The value to store for the key. |


#### Returns 
`Promise` or `undefined` if no value has been stored for that key.

#### Example Usage
```js
async function setData(key, value) {
  try {
    await clientStorage.setItem(key, value);
  } catch (error) {
    console.log("Failed to set the value to the ClientStorage.");
  }
}
```

## removeItem()
**`async removeItem(key: string): Promise<void>`**<br/>
Remove the stored key/value pair from Client Storage for the given key. If no such key is stored, this function will return normally, but will otherwise do nothing.

#### Parameters
| Name          | Type      | Description   |
| ------------- | --------- | -----------:  |
| key           | `string ` | The key indicating which specific key/value pair to remove from storage|


#### Returns 
`Promise` or nothing if the key is not found.

#### Example Usage
```js
async function removeData(key) {
  try {
    await clientStorage.removeItem(key);
  } catch (error) {
    console.log("Failed to delete the key/value pair from ClientStorage.");
  }
}
```

## clear()
**`clear(): Promise<void>`**<br/>
Delete all data present in ClientStorage for this add-on.

#### Parameters
None

#### Returns 
`Promise` or returns normally when there's nothing to clear.

#### Example Usage
```js
async function clearData() {
  try {
    await clientStorage.clear();
  }
  catch(error) {
    console.log("Failed to clear the data from the ClientStorage.");
  }
}
```

## keys()
**`async keys(): Promise<string[]>`**<br/>
Retrieve a list of all keys in Client Storage. Use this to enumerate the full contents of the Client Storage for the add-on.

#### Parameters
None

#### Returns 
`Promise` with an array of the keys found when the promise resolves (all type `string`).

#### Example Usage
```js
async function getKeys() {
  try {
    const keys = await clientStorage.keys();
    keys.forEach((key) => console.log(key));
  } catch (error) {
    console.log("Failed to get the keys from the ClientStorage.");
  }
}
```

<InlineAlert slots="text" variant="success"/>

Be sure to check out the [add-on recipes](../develop/#storing-and-retrieving-client-side-data) page for more details around using storing and retrieving client-side data, as well as the **use-client-storage** sample for a more complete example of implementing it in an add-on.


