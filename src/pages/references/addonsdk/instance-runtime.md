# AddOnSdk.instance.runtime
Represents the runtime of the current add-on.

## Properties

### `type`
The [RuntimeType](addonsdk-constants.md) constant representing the entrypoint creating this backend object (ie: `"panel"`, `"dialog"` or `"script"`).

### [`Dialog`](../addonsdk/runtime-dialog.md) 
(Optional) When the `RuntimeType` is `"dialog"`, this object will contain the reference to the [modal dialog](runtime-dialog.md) the add-on invoked, and can be used to programmatically close the dialog and send results back to the caller. Will be `undefined` when no modal dialog is present. Check out the [modal dialogs use case examples](../../guides/develop/use_cases.md#modal-dialogs) for more details on using dialogs, as well as the related [`showModalDialog` method](../addonsdk/addonsdk-app.md#showmodaldialog).

## Experimental Methods
The following methods allow you to communicate bidirectionally between the add-on running in the iframe and the [script runtime](../scriptruntime/) environments. 

**IMPORTANT:** These methods are currently ***experimental only*** and should not be used in any add-ons you will be distributing until they have been deemed stable. To use these methods, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of the `manifest.json`. 

### exposeApi()
Use this method to expose an API from your UI code running in the iframe to another runtime (ie: the [script runtime](../scriptruntime/) defined in your `code.js` for instance).

#### Signature
`exposeApi<T>(obj: T): void`

#### Parameters
| Name      | Type        | Description   |
| ----------| ------------| -----------:  |
| `obj`     | `object`    | The concrete object/class instance to expose to other runtimes. This method call is allowed only once. Subsequent calls are ignored. **Note**: you cannot expose entire classes from one runtime and create an instance of that class in another. |

### apiProxy()
Requests a promise-based proxy object from another runtime to be used to call the APIs exposed by that other runtime via the `exposeApi` method.

#### Signature
`async apiProxy(runtimeType: RuntimeType): Promise<Remote<unknown>> `

#### Parameters
| Name          | Type        | Description   |
| --------------| ------------| -----------:  |
| `runtimeType` | `RuntimeType` | The runtime type to create the proxy object from (ie: "script" for instance, which maps to the code referenced in the [`script` entryPoint](../scriptruntime/index.md#script-entry-point) in your add-on's `manifest.js` file). |

#### Return
A promise which resolves to an API proxy object exposed by the desired runtime as soon as the other runtime is finished initializing.
     
**Note:** Calling the method again for the same runtime type will return a new proxy object without any behavior difference.

#### Example Usage
```js
AddOnSdk.ready.then(async () => {
    console.log("AddOnSdk is ready for use.");
    const { runtime } = AddOnSdk.instance;

    let createShapesButton = document.getElementById("createShapesButton");
    createShapesButton.addEventListener("click", async (e) => {
        const scriptApis = await runtime.apiProxy("script");
        try {
            let result = await scriptApis.createShapes();
            console.log(result);
        } catch (exc) {
            console.error(exc.message, exc.stack);
        }
        
    });
});
```                                