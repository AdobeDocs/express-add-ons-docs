# AddOnSdk.instance.runtime
Represents the runtime of the current add-on.

## Properties

### `type`
The [RuntimeType](addonsdk-constants.md) constant representing the entrypoint creating this backend object (ie: `"panel"` or `"dialog"`).

### [`Dialog`](../addonsdk/runtime-dialog.md) 
(Optional) When the `RuntimeType` is `"dialog"`, this object will contain the reference to the [modal dialog](runtime-dialog.md) the add-on invoked, and can be used to programmatically close the dialog and send results back to the caller. Will be `undefined` when no modal dialog is present. Check out the [modal dialogs use case examples](../../guides/develop/index.md#modal-dialogs) for more details on using dialogs, as well as the related [`showModalDialog` method](../addonsdk/addonsdk-app.md#showmodaldialog).