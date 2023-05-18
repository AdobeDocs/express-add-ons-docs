# AddOnSdk
The `AddOnSdk` provides the following interface for accessing all of the APIs. It exposes several variables listed below, which allow you to know when the APIs are ready to interact with.

- `apiVersion`: Current version of the SDK running.
- `ready`: Allows you to know you can start accessing the APIs. 
- `instance`: the currently running add-on instance (see [AddOn Object](#addon)), allowing you to access the [manifest.json](#manifest) details and a [Client Storage](#client-storage) object, which allows you to locally persist to storage, per user and for this add-on.
- `app`: Provides access to the host application (Adobe Express). See the [`Application`](#application) definition below for more details.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
/**
 * The main API Interface exposed by the SDK to the consuming Add-on code.
 */
interface AddOnSdk {
    /**
     * API version of the SDK.
     */
    readonly apiVersion: string;

    /**
     * Resolves when the SDK has made a successful connection to the host app.
     * Indicates that APIs directly interacting with the host application are ready.
     * Register a call back with @see Promise#then or await this promise.
     */
    readonly ready: Promise<void>;

    /**
     * Represents capabilities and events of the currently running Add-on Instance.
     * The interface type depends on the type of the underlying Add-on.
     */
    readonly instance: AddOn;

    /**
     * Represents capabilities and events of the host application.
     */
    readonly app: Application;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

AddOnSdk.ready.then(() => {
  console.log("API version", AddOnSdk.apiVersion);
  console.log("Add-on instance object", JSON.stringify(AddOnSdk.instance));
  console.log("Application object", JSON.stringify(AddOnSdk.app));  
});
```

### Output
```json
API version 1

Add-on instance object {"manifest":{"testId":"08f4469f-7999-458b-9ef9-b1bd043cbdca","name":"Add On Api Sampler","version":"1.0.0","manifestVersion":2,"requirements":{"apps":[{"name":"Express","apiVersion":1}]},"entryPoints":[{"type":"panel","id":"panel1","main":"https://localhost:5241/08f4469f-7999-458b-9ef9-b1bd043cbdca/index.html"}]},"clientStorage":{}}

Application object {"ui":{"theme":"light","locale":"en-US","locales":["cy-GB","da-DK","de-DE","en-US","es-ES","fi-FI","fr-FR","it-IT","ja-JP","ko-KR","nb-NO","nl-NL","pt-BR","sv-SE","zh-Hans-CN","zh-Hant-TW","zz-ZZ"]},"oauth":{},"document":{}}
```