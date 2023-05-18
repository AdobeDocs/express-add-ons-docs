# Simple Modal Dialogs
Allows you to pop-up a modal with different variations depending on needs.
      
You can also check the [manifest documentation](../references/manifest.md) and the [dialog-add-on](guides/develop/samples) code sample for more details on this flag and see how it's used. Also, please report any issues or feedback you may have for this API to the **#express-addons-support** slack channel.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface
```js
interface Application {
  /**
   * Show modal dialog
   */
  showModalDialog(dialogOptions: DialogOptions): Promise<DialogResult>;
}
 
interface DialogOptions {
  /**
   * Variant
   */
  variant: Variant;
 
  /**
   * Title
   */
  title: LocalizedString;
 
  /**
   * Description
   */
  description: LocalizedString;
 
  /**
   * Buttons
   */
  buttonLabels?: ButtonLabels;
}
 
interface InputDialogOptions extends DialogOptions {
  /**
   * Variant
   */
  variant: Variant.input;
 
  /**
   * Input field
   */
  field: Field;
}
 
enum Variant {
  export enum Variant {
    /**
     * Ask a user to confirm an action
     */
    confirmation = "confirmation",

    /**
     * Share information for user to acknowledge
     */
    information = "information",

    /**
     * Share information that a user needs to consider before proceeding
     */
    warning = "warning",

    /**
     * Tell a user that if they proceed with an action, it may impact their data in a negative way
     */
    destructive = "destructive",

    /**
     * Communicate critical issue that a user needs to resolve before proceeding
     */
    error = "error",

    /**
     * Ask a user to provide some inputs
     */
    input = "input"
}
 
interface ButtonLabels {
  /**
   * Primary action label
   * Default label is "OK".
   */
  primary?: LocalizedString;
 
  /**
   * Secondary action label
   */
  secondary?: LocalizedString;
 
  /**
   * Cancel action label
   */
  cancel?: LocalizedString;
}
 
interface Field {
  /**
   * Label
   */
  label: LocalizedString;
 
  /**
   * Specifies a short hint that describes the expected value of the field
   */
  placeholder: LocalizedString;
 
  /**
   * Type of the field
   */
  fieldType: FieldType;
}
 
enum FieldType {
  /**
   * One-line text input field
   */
  text = "text"
}
 
/**
 * Placeholder for future localization support
 */
type LocalizedString = string;
 
interface DialogResult {
  /**
   * Clicked button
   */
  buttonType: ButtonType
}
 
interface InputDialogResult extends DialogResult {
  /**
   * Field value
   */
  fieldValue: string;
}

/**
 * Button types for Simple Dialog
 */
export enum ButtonType {
    /**
     * Primary button pressed
     */
    primary = "primary",

    /**
     * Secondary button pressed
     */
    secondary = "secondary",

    /**
     * Cancel button pressed
     */
    cancel = "cancel",

    /**
     * Dialog closed via ESC or close(X) button
     */
    close = "close"
}
```

### Example
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await AddOnSdk.ready;
  
// Get confirmation from the user to enable a feature
async function EnableSmartFilters() {
  try {
    const dialogResult = await AddOnSdk.app.showModalDialog({
        variant: Variant.confirmation,
        title: "Enable smart Filters",
        description: "Smart filters are nondestructive and will preserve your original images.",
        buttonLabels: { primary: "Enable", cancel: "Cancel" },
      });
 
    if (dialogResult.buttonType === ButtonType.primary) {
      // Enable smart filters
    }
  } catch (error) {
    console.log("Error showing modal dialog:", error);
  }
}
```

<InlineAlert slots="text" variant="success"/>

We have provided a sample that can be used as a reference for implementing the Dialog APIs. Please see the **dialog-add-on** sample provided in the [code samples](guides/develop/samples) for specific details.