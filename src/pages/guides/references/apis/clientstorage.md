# Client Storage
The ClientStorage APIs allow you to store/retrieve/delete persistent data in the user's current browser. It's similar to the `Window.localStorage` API, but is asynchronous, and supports multiple datatypes, i.e., objects, arrays, strings, numbers, booleans, null, undefined and Uint8Array. Since data will be stored in the user’s current browser, user actions such as clearing the browser cache might clear all of the data storage in `ClientStorage` (similar to `localStorage`).

Each add-on can store up to 10 mb of data in `ClientStorage`, per user. Post 10 mb, any data additions will throw a quota error. However, an add-on developer can write code to delete old data so that new data can be added.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface AddOn {
  /**
   * Data storage on the user's local machine.
   * This data is not synchronized across users
   */
  clientStorage: ClientStorage;
}

interface ClientStorage {
  /**
   * Retrieve a value from ClientStorage for given key.
   * If no value has been stored for that key, this function will asynchronously return undefined.
   */
  async getItem(key: string): Promise<unknown | undefined>;

  /**
   * Set a value to ClientStorage with the given key.
   * The returned promise will resolve if storage is successful or reject with an error message if storage failed.
   */
  async setItem(key: string, value: any): Promise<void>;

  /**
   * Remove the stored key/value pair from ClientStorage for given key.
   * If no such key is stored, this function will return normally but will otherwise do nothing.
   */
  async removeItem(key: string): Promise<void>;

  /**
   * Retrieve a list of all keys stored to ClientStorage.
   * Use this to enumerate the full contents of the ClientStorage API.
   */
  async keys(): Promise<string[]>;

   /**
     * Delete all data present in ClientStorage for an Add-on.
     */
    clear(): Promise<void>;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await AddOnSdk.ready;

// Reference to the client storage of the add-on
const { clientStorage } = AddOnSdk.instance;

// Get add-on data
async function getData(key) {
  try {
    return await clientStorage.getItem(key);
  } catch (error) {
    console.log("Failed to get the value from the ClientStorage.");
  }
}

// Add/update add-on data
async function setData(key, value) {
  try {
    await clientStorage.setItem(key, value);
  } catch (error) {
    console.log("Failed to set the value to the ClientStorage.");
  }
}

// Delete add-on data for a key
async function deleteData(key) {
  try {
    await clientStorage.removeItem(key);
  } catch (error) {
    console.log("Failed to delete the value from the ClientStorage.");
  }
}

// Delete ALL add-on data for this user
async function clearData() {
  try {
    await clientStorage.clear();
  }
  catch(error) {
    console.log("Failed to clear the data from the ClientStorage.");
  }
}

// Get all stored keys
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

The **use-client-storage** sample can also be used as a reference for implementing the Client Storage APIs.


