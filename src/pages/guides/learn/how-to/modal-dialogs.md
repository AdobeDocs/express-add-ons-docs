---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Dialogs
  - Modal dialogs
  - showModalDialog
title: Use Modal Dialogs
description: Use Modal Dialogs.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Use Modal Dialogs

When you need to pop up a dialog to show a certain message, such as an informational, warning, or error message, you can use a modal dialog.

Below are some examples of the different types. Also, check out the SDK references for details on how to [show](../../../references/addonsdk/addonsdk-app.md#showmodaldialog) or [programmatically close a dialog](../../../references/addonsdk/runtime-dialog.md#close), as well as the [dialog add-on sample](../samples.md#dialog-add-on) for more details.

## Simple Modal Dialog

You can show a dialog with the [`addOnUISdk.app.showModalDialog()`](../../../references/addonsdk/addonsdk-app.md#showmodaldialog) method, which accepts an options object containing the `variant`, `title`, `description` and, optionally, `buttonLabels`. The returned result object from a dialog will contain the `buttonType` clicked.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
  // Utility function to show a confirmation dialog
  async function showConfirmDialog() {
    try {
      // Dialog Settings
      const dialogOptions = {
        // Available variants:
        // confirmation, information, warning,
        // destructive, error, input, custom
        variant: "confirmation",
        title: "Enable smart Filters",
        description: "Smart filters are editable filters.",
        // Available button labels: primary, secondary, cancel
        buttonLabels: { primary: "Enable", cancel: "Cancel" },
      };

      // Show the dialog
      const result = await addOnUISdk.app.showModalDialog(dialogOptions);

      // Log the button type clicked, return either "primary" or "cancel"
      console.log("Button type clicked " + result.buttonType);
    } catch (error) {
      console.log("Error showing modal dialog:", error);
    }
  }
  // Call the function to show the dialog
  showConfirmDialog();
});
```

### Input Modal Dialog

A dialog of variant `input` allows you to accept input from the user. The construction of the dialog is similar to the previous example, but with an additional [`field`](../../../references/addonsdk/addonsdk-app.md#field) object that defines the input field and has a `label`, `placeholder` and `fieldType` properties. In addition to the `buttonType`, the `fieldValue` is returned in the result object of the [`addOnUISdk.app.showModalDialog()`](../../../references/addonsdk/addonsdk-app.md#showmodaldialog) method.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
  // Utility function to show an input dialog
  async function showInputDialog() {
    try {
      // Dialog Settings
      const inputDialogOptions = {
        variant: "input", // 👈
        title: "Please enter your key",
        description: "Your API key",
        buttonLabels: { cancel: "Cancel" },
        field: {
          // 👈
          label: "API Key",
          placeholder: "Enter API key",
          fieldType: "text",
        },
      };

      // Show the dialog
      const inputDialogResult = await addOnUISdk.app.showModalDialog(
        inputDialogOptions
      );

      if (inputDialogResultwi.buttonType === "primary") {
        // returns the input the user entered if they didn't cancel
        console.log("Field value", inputDialogResult.fieldValue); // 👈
      }
    } catch (error) {
      console.log("Error showing modal dialog:", error);
    }
  }
  // Call the function to show the dialog
  showInputDialog();
});
```

## Custom Dialog

If you need to show a dialog with custom content, you can use the `custom` variant. This allows you to define the content in a separate source file (e.g., a `dialog.html`) and specify the container's size and title.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
  // Utility function to show a custom dialog
  async function showCustomDialog() {
    try {
      // Dialog Settings
      const customDialogOptions = {
        variant: "custom",
        title: "Custom Modal",
        src: "dialog.html", // use content from this html file
        size: { width: 600, height: 400 },
      };

      // Show the dialog
      const customDialogResult = await addOnUISdk.app.showModalDialog(
        customDialogOptions
      );

      // Log the result object
      console.log("Custom dialog result " + customDialogResult.result);
    } catch (error) {
      console.log("Error showing modal dialog:", error);
    }
  }
  // Call the function to show the dialog
  showCustomDialog();
});
```

Inside the custom dialog's HTML file, you can use the [`addOnUISdk.instance.runtime.dialog`](../../../references/addonsdk/runtime-dialog.md) object, especially its `close()` method, to programmatically close the dialog and set an optional return value.

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

closeButton.onsubmit = () => {
  // User canceled the operation, close the dialog with no result
  addOnUISdk.instance.runtime.dialog.close();
};

createButton.onsubmit = () => {
  // return an object, to be captured in the result object
  addOnUISdk.instance.runtime.dialog.close({
    selectedDesign: "grid-layout",
  });
};
```

## Use Cases

Modals are versatile tools suitable for a wide range of scenarios. They can display simple information or warning pop-ups when you need users to confirm an action or provide input. Additionally, modals can present more complex content, such as custom dialogs that initiate the payment process for accessing add-on's premium features.
