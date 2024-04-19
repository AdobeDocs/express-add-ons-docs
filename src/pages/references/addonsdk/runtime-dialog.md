# addOnUISdk.instance.runtime.dialog

Represents the modal dialog presented to the user. This object can be used to manage the dialog, like closing it and sending results to the caller. Check out the [modal dialogs use case examples](../../guides/develop/use_cases/user_interaction.md#modal-dialogs) for more details on using dialogs, as well as the related [`showModalDialog` method](../addonsdk/addonsdk-app.md#showmodaldialog).

## Methods

### close()

**`close(result?: unknown): void`**<br/>
Closes the modal dialog and posts the result back to the dialog invoker.

#### Parameters

| Name          | Type      | Description   |
| ------------- | --------- | -----------:  |
| `result?`     | `unknown<any>` | An optional result to return to the dialog invoker.            |

#### Returns

An optional result of a user-defined type.

#### Example Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;

closeButton.onsubmit = () => {
  // User cancelled the operation, close the dialog with no result
  addOnUISdk.instance.runtime.dialog.close();
}

createButton.onsubmit = () => {
  // user has selected a design - close the dialog & report the selection details as the result back to the caller.
  addOnUISdk.instance.runtime.dialog.close({
    selectedDesign: "grid-layout"
  });
}
```
