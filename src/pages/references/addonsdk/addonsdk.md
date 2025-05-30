# addOnUISdk

The core add-on UI SDK object which provides access to everything needed for add-on development. This includes determining the current version of the platform, an object to use for determining when the SDK has been initialized and ready for use, and other core objects you can use to access specific features you may want to use for building your add-on.

## addOnUISdk Properties

| Attribute     | Name                        | Type                         | Description                                             |
| ------------: | --------------------------: | ---------------------------: | -------------------------------------------------------:|
| readonly      | addOnUISdk.apiVersion       | string                       | Current version of the add-on SDK running.              |
| readonly      | addOnUISdk.app              | object                       | Provides access to the host application (Adobe Express) |
|               | addOnUISdk.constants        | object                       | A set of constants used throughout the add-on SDK.      |
| readonly      | addOnUISdk.instance         | object                       | The currently running add-on instance.                  |
| readonly      | AddOnSdk.ready              | Promise                      | Indicates the addOnUISdk object has been initialized and you can start accessing the APIs. Register a call back with [Promise.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) or [await this promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await). |
