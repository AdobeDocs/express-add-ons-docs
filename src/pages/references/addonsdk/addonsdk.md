# addOnUISdk

The core add-on UI SDK object which provides access to everything needed for add-on development. This includes determining the current version of the platform, an object to use for determining when the SDK has been initialized and ready for use, and other core objects you can use to access specific features you may want to use for building your add-on.

## addOnUISdk Properties

| Attribute | Name | Type | Description |
|---|---|---|---|
| readonlyre | addOnUISdk.apiVersionre | stringre | Current version of the add-on SDK running. |
| readonlyre | addOnUISdk.appre | objectre | Provides access to the host application (Adobe Express) |
| re | addOnUISdk.constantsre | objectre | A set of constants used throughout the add-on SDK. |
| readonlyre | addOnUISdk.instancere | objectre | The currently running add-on instance. |
| readonlyre | AddOnSdk.readyre | Promisere | Indicates the addOnUISdk object has been initialized and you can start accessing the APIs. Register a call back with [Promise.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) or [await this promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await). |

&lt;-- ## Methods

## ready

Asynchronous

## Example Usage

await AddOnSdk.ready; --&gt;
