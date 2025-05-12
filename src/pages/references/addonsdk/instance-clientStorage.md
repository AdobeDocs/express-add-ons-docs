# addOnUISdk.instance.clientStorage

The `clientStorage` object provides a reference to Client Storage in the currently running add-on. Client Storage allows you to store, retrieve, and delete persistent data in the user's current browser.

Client Storage is similar to using `Window.localStorage`, but is asynchronous, supports multiple datatypes, (i.e., objects, arrays, strings, numbers, booleans, `null`, `undefined` and `Uint8Array`) and has a larger storage limit. Each add-on can store up to 10 mb of data in `ClientStorage`, per user. Any data additions over 10 mb will throw a quota error. However, an add-on developer can write code to delete old data so that new data can be added. See the [Storing and Retrieving Client Side Data](../../guides/learn/how_to/local_data_management.md) for more details.

<InlineAlert slots="text1, text2" variant="info"/>

Since the data in Client Storage is stored in the user's current browser, any actions that clear the browser cache, such as clearing browsing history or deleting cookies, will also clear all of the data stored in Client Storage. It's important to keep this in mind when designing your add-on, as any important data that needs to persist beyond a user's current browsing session should be stored elsewhere, such as on a server or in a database.

Additionally, you should always provide a way for users to delete or clear any data stored in Client Storage within your add-on, in case they want to remove any sensitive or unwanted data.

## Methods

### getItem()

**`async getItem(key: string): Promise<unknown | undefined>`**<br/>
An asynchronous method to retrieve a value from Client Storage for a given key. If no value has been stored for that key, this function will return `undefined`.

#### Parameters

| Name | Type     |                        Description |
| ---- | -------- | ---------------------------------: |
| key  | `string` | The key to retrieve the value for. |

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

### setItem()

**`async setItem(key: string, value: any): Promise<void>;`**<br/>
Store a value in Client Storage with the given key. The returned promise will resolve if storage is successful, or reject with an error message if storage failed. The value can be any of multiple data types, such as `object`, `string`, array, `number`, `boolean`, `null`, `undefined` and `Uint8Array`.

#### Parameters

| Name  | Type     |                            Description |
| ----- | -------- | -------------------------------------: |
| key   | `string` | The key to reference the value stored. |
| value | `any`    |        The value to store for the key. |

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

### removeItem()

**`async removeItem(key: string): Promise<void>`**<br/>
Remove the stored key/value pair from Client Storage for the given key. If no such key is stored, this function will return normally, but will otherwise do nothing.

#### Parameters

| Name | Type     |                                                             Description |
| ---- | -------- | ----------------------------------------------------------------------: |
| key  | `string` | The key indicating which specific key/value pair to remove from storage |

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

### clear()

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
  } catch (error) {
    console.log("Failed to clear the data from the ClientStorage.");
  }
}
```

### keys()

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

<InlineAlert slots="text" variant="info"/>

Be sure to check out the [Storing and Retrieving Client Side Data](../../guides/learn/how_to/local_data_management.md) for more details about using Client Storage, as well as the [**use-client-storage** sample](/samples.md) for a more complete example of implementing it in an add-on.

## Errors

The table below describes the possible error messages that may occur when using the Client Storage API, with a description of the scenario that will return them.

<br/>

|                                  Error Message |                              Error Scenario |
| ---------------------------------------------: | ------------------------------------------: |
| Quota exceeded. Delete some data to store more | Returned when the quota limit is exhausted. |
