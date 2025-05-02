# addOnUISdk.app

Provides access to the Adobe Express host application's objects and methods to provide features such as content import and export through the [`document` object](./app-document.md), OAuth 2.0 authorization flows with the [`oauth` object](./app-oauth.md), theme and locale detection with the [`ui` object](app-ui.md), [current logged in user info](./app-currentUser.md) and more. It also provides access to methods to [show modal dialogs](../../guides/develop/how-to/modal_dialogs.md), [enable drag and drop](../../guides/develop/how-to/drag_and_drop.md) of content and subscribe and unsubscribe to events.

## Objects

| Attribute  | Name                                  | Type     | Description                                                                                |
| ---------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `readonly` | [`currentUser`](./app-current-user.md) | `object` | Represents the current user accessing the host application                                 |
|            | [`devFlags`](./app-dev-flags.md)       | `object` | Represents flags which can be used to simulate certain behavior during development.        |
| `readonly` | [`document`](./app-document.md)       | `object` | Represents the active document of the host application.                                    |
| `readonly` | [`oauth`](./app-oauth.md)             | `object` | Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization. |
| `readonly` | [`ui`](./app-ui.md)                 | `object` | Represents the host UI (Adobe Express UI).                                                 |

## Methods

### on()

Subscribe to an event (ie: listen for an event).

#### Signature

`on(name: string, handler: eventHandler): void`

#### Parameters

| Name      | Type                | Description                                            | Valid Values          |
| --------- | ------------------- | ------------------------------------------------------ | --------------------- |
| `name`    | `string`            | Event to subscribe to.                                 | See [Events](#events) |
| `handler` | callback `function` | Handler that gets invoked when the event is triggered. | `(data) => {}`        |

#### Return Value

`void`

#### Example Usage

```js
addOnUISdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```

### off()

Unsubscribe from an event (ie: stop listening for an event).

#### Signature

`off(name: string, handler: eventHandler): void`

#### Parameters

| Name      | Type                | Description                                      | Valid Values          |
| --------- | ------------------- | ------------------------------------------------ | --------------------- |
| `name`    | `string`            | Event to unsubscribe to.                         | See [Events](#events) |
| `handler` | callback `function` | Handler that was used during event subscription. | `(data) => {}`        |

#### Return Value

`void`

#### Example Usage

```js
addOnUISdk.app.off("themechange", (data) => {
  applyTheme(data.theme);
});
```

### startPremiumUpgradeIfFreeUser()

Displays the in-app monetization upgrade flow.

#### Signature

`startPremiumUpgradeIfFreeUser(): Promise<boolean>`

#### Return Value

Returns a resolved `Promise` with a value of `true` if the user is premium or completed the flow, and `false` if the user is a free user and cancelled the upgrade.

#### Example Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const isPremiumUser = await addOnUISdk.app.startPremiumUpgradeIfFreeUser();
  if (!isPremiumUser) {
    // User did not upgrade, show error dialog
  }
});
```

### showModalDialog()

Shows a modal dialog based on specific options passed in.

#### Signature

`showModalDialog(dialogOptions: DialogOptions): Promise<DialogResult>`

#### Parameters

| Name            | Type     |                                      Description |
| --------------- | -------- | -----------------------------------------------: |
| `dialogOptions` | `object` | [`DialogOptions`](#dialogoptions) object payload |

##### `DialogOptions`

| Name            |                                        Type |                                      Description |
| --------------- | ------------------------------------------: | -----------------------------------------------: |
| `variant`       | `string` [Variant](./addonsdk-constants.md) |                      The type of dialog to show. |
| `title`         |                                    `string` |                                     Dialog title |
| `description`   |                                    `string` |                      Description for the dialog. |
| `buttonLabels?` |      `object` [ButtonLabels](#buttonlabels) | The optional button labels to use in the dialog. |

##### `ButtonLabels`

| Name         |     Type |                                  Description |
| ------------ | -------: | -------------------------------------------: |
| `primary?`   | `string` | Primary action label. Default label is "OK". |
| `secondary?` | `string` |                      Secondary action label. |
| `cancel?`    | `string` |                         Cancel action label. |

The input dialog variant accepts an [additional `field`](#input-dialog-additional-option) object.

##### Input Dialog Additional Option

| Name    |                     Type |        Description |
| ------- | -----------------------: | -----------------: |
| `field` | object [`Field`](#field) | Input field object |

##### `Field`

| Name          |     Type |                                                           Description |
| ------------- | -------: | --------------------------------------------------------------------: |
| `label`       | `string` |                                             Label for the input field |
| `placeholder` | `string` | Specifies a short hint that describes the expected value of the field |
| `fieldType`   | `string` |                                    Currently always the value "text". |

#### Return Value

Returns a `Promise` [`DialogResult`](#dialogresult) object with the [button type](addonsdk-constants.md) that was clicked, or an error. When using the "input" dialog variant, an additional `fieldValue` property will be in the response object and will contain the value of the field the user input text to.

#### `DialogResult`

| Name         | Type                                                                |              Description |
| ------------ | ------------------------------------------------------------------- | -----------------------: |
| `buttonType` | `string` [`ButtonType`](addonsdk-constants.md) constant |  The button type clicked |
| `fieldValue` | `string`                                                            | The input from the user. |

#### Confirmation Dialog Example Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function showConfirmDialog() {
  try {
    // Confirmation Dialog Example
    let dialogOptions = {
      variant: "confirmation",
      title: "Enable smart Filters",
      description:
        "Smart filters are nondestructive and will preserve your original images.",
      buttonLabels: { primary: "Enable", cancel: "Cancel" },
    };
    const result = await addOnUISdk.app.showModalDialog(dialogOptions);
    console.log("Button type clicked " + result.buttonType);
  } catch (error) {
    console.log("Error showing modal dialog:", error);
  }
}
```

#### Input Dialog Example Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function showInputDialog() {
  try {
    // Input Dialog Example
    let inputDialogOptions = {
      variant: "input",
      title: "Please enter your key",
      description: "Your API key",
      buttonLabels: { cancel: "Cancel" },
      field: {
        label: "API Key",
        placeholder: "Enter API key",
        fieldType: "text",
      },
    };

    const inputDialogResult = await addOnUISdk.app.showModalDialog(
      inputDialogOptions
    );
    if (inputDialogResult.buttonType === "primary") {
      console.log("Field value " + inputDialogResult.fieldValue); // returns the input the user entered if they didn't cancel
    }
  } catch (error) {
    console.log("Error showing modal dialog:", error);
  }
}
```

<InlineAlert slots="text" variant="info"/>

See the use case implementations for an example of the [custom modal dialog](../../guides/develop/how-to/modal_dialogs.md#custom-dialog).

### showColorPicker()

Shows the Adobe Express color picker based on specific options passed in.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of the `manifest.json`.

#### Signature

`showColorPicker(anchorElement: HTMLElement, options?: ColorPickerOptions): Promise<void>;`

#### Parameters

| Name            | Type                 |                                       Description |
| --------------- | -------------------- | ------------------------------------------------: |
| `anchorElement` | `HTMLElement`        |        The element to anchor the color picker to. |
| `options`       | `ColorPickerOptions` | The optional options to pass to the color picker. |

##### `ColorPickerOptions`

| Name                     |                                                               Type |                                                                                                                                                                                                                                                                      Description |
| ------------------------ | -----------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `title?`                 |                                                           `string` |                                                                                                                                                                                                                     Label header/title for the color picker. Default value: `""` |
| `initialColor?`          |                                                           `number` | Default/starting color when you open the color picker for the first time on a `anchorElement`. When you have already changed the color with this picker, then the next time you open the picker, the last selected color will be the starting color. Default: `0xFFFFFF` (white) |
| `placement?`             | `object` [ColorPickerPlacement](./addonsdk-constants.md#constants) |                                                                                                                                                                                                 Placement of the popover with respect to the anchor element (default: `"left"`). |
| `eyedropperHidesPicker?` |                                                          `boolean` |                                                                                                                Closes the color picker popover while using the EyeDropper. After the color is selected via the EyeDropper, the color picker popup opens again. Default: `false`. |
| `disableAlphaChannel?`   |                                                          `boolean` |                                                                                                                                                                                  Disables the transparency slider in the "custom" section of the color picker. Default: `false`. |

#### Return Value

Returns a void `Promise`.

#### Example Usage

```js
const colorPickerButton = document.getElementById("color-picker-button");

colorPickerButton.addEventListener("click", () => {
  addOnUISdk.app.showColorPicker(colorPickerButton, {
    title: "Add-on's Color Picker",
    placement: ColorPickerPlacement.left,
    eyedropperHidesPicker: true,
    disableAlphaChannel: false,
  });
});

colorPickerButton.addEventListener(ColorPickerEvents.colorChange, (event) => {
  console.log("Color change event received!", event.detail.color;);
});
```

### hideColorPicker()

Hides the Adobe Express color picker.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of the `manifest.json`.

#### Signature

`hideColorPicker(): Promise<void>;`

#### Return Value

Returns a void `Promise`.

#### Example Usage

```js
const colorPickerButton = document.getElementById("color-picker-button");

colorPickerButton.addEventListener("click", () => {
  addOnUISdk.app.showColorPicker(colorPickerButton, {
    title: "Add-on's Color Picker",
    placement: ColorPickerPlacement.left,
    eyedropperHidesPicker: true,
    disableAlphaChannel: false,
  });
  setTimeout(() => {
    console.log("Hiding Color Picker after 10 seconds...");
    addOnUISdk.app.hideColorPicker();
  }, 10000);
});
```

### registerIframe()

Allows an iframe hosted within an add-on to register its intent to communicate with the add-on SDK. While iframes can be used for embedding media without SDK interaction, `registerIframe()` is needed for those requiring SDK capabilities. It marks a transition to a more controlled approach, where add-ons must explicitly opt-in to this level of integration.

#### Signature

`registerIframe(element: HTMLIFrameElement): [UnregisterIframe]()`

#### Parameters

| Name      | Type                |             Description |
| --------- | ------------------- | ----------------------: |
| `element` | `HTMLIFrameElement` | The iframe to register. |

#### Return Value

[`UnregisterIframe`](#unregisteriframe-type-definition)

##### `UnregisterIframe` Type Definition

Callback function that unregisters the previously registered iframe, ceasing its direct communication with the add-on SDK. Returns `void`.

```ts
type UnregisterIframe = () => void;
```

#### Example Usage

```ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function RegisterIframe(elementId: string) {
  const iframe = document.getElementById(elementId);
  try {
    unregisterIframe = addOnUISdk.app.registerIframe(iframe);
  } catch (error) {
    console.log("Failed to register iframe with the SDK:", error);
  }
}

addOnUISdk.ready.then(() => {
  let unregisterIframe: UnregisterIframe = RegisterIframe("iframe1");
  // ...
  unregisterIframe();
  unregisterIframe = RegisterIframe("iframe2");
  // ...
  unregisterIframe();
});
```

### enableDragToDocument()

Allows for drag and document functionality to be enabled on an element such as an image, video or audio.

<InlineAlert slots="text" variant="info"/>

**IMPORTANT:** If the content being dragged is an animated GIF, it will be added as an animated GIF to the document, as long as it fits [the size criteria for animated GIF's](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html). In the event that it doesn't fit the size criteria, an error toast will be shown to the user.

#### Signature

`enableDragToDocument(element: HTMLElement, dragCallbacks: DragCallbacks): [DisableDragToDocument]()`

#### Parameters

| Name            | Type                            |                                            Description |
| --------------- | ------------------------------- | -----------------------------------------------------: |
| `element`       | `HTMLElement`                   |               The element to enable for drag and drop. |
| `dragCallbacks` | [dragCallbacks](#dragcallbacks) | An object containing a preview and completion callback |

##### `dragCallbacks`

| Name                 | Type                                                                |                                                 Description |
| -------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------: |
| `previewCallback`    | [`DragPreviewCallback`](#dragpreviewcallback-type-definition)       |                       Callback to provide the preview image |
| `completionCallback` | [`DragCompletionCallback`](#dragcompletioncallback-type-definition) | Callback to provide the content to be added to the document |

##### `DragPreviewCallback` Type Definition

Callback used to get the preview image for the drag & drop action. Returns a `URL` object.

```ts
type DragPreviewCallback = (element: HTMLElement) => URL;
```

##### `DragCompletionCallback` Type Definition

Callback to provide the content (image/gif/video/audio) to be added to the document post drag & drop action. Returns [DragCompletionData](#dragcompletiondata) array.

```ts
type DragCompletionCallback = (
  element: HTMLElement
) => Promise<DragCompletionData[]>;
```

##### `DragCompletionData`

Returned as part of an array from the [`DragCompletionCallback`](#dragcallbacks), and contains the `blob` object to be added, as well as a [`MediaAttributes`](#mediaattributes) object with the `title` of the audio content (for audio only).

| Name          | Type                                  |                                                                             Description |
| ------------- | ------------------------------------- | --------------------------------------------------------------------------------------: |
| `blob`        | `Blob`                                |                                    Blob (image/video/audio) to be added to the document |
| `attributes?` | [`MediaAttributes`](#mediaattributes) | Attributes to pass when adding the audio to the page (ie: `title`, which is mandatory). |

#### `MediaAttributes`

*Required for audio content only.*

| Name    | Type     |                               Description |
| ------- | -------- | ----------------------------------------: |
| `title` | `string` | Media title (mandatory for audio import). |

#### Return Value

[`DisableDragToDocument`](#disabledragtodocument-type-definition)

##### `DisableDragToDocument` Type Definition

Callback to undo the changes made by `enableDragToDocument`. Returns `void`.

```ts
type DisableDragToDocument = () => void;
```

##### `DragStartEventData` Object

The payload data sent to the `dragStart` event handler.

###### Properties

| Name      | Type          |                              Description |
| --------- | ------------- | ---------------------------------------: |
| `element` | `HTMLElement` | Element for which the drag event started |

##### `DragEndEventData`

The payload data sent to the App `dragEnd` event handler.

| Name                | Type          |                                     Description |
| ------------------- | ------------- | ----------------------------------------------: |
| `element`           | `HTMLElement` |          Element for which the drag event ended |
| `dropCancelled`     | `boolean`     | If drop occurred/drag ended at invalid position |
| `dropCancelReason?` | `string`      |                    Reason for drop cancellation |

**\* Important Event Handling Notes**

- Since the `addOnUISdk` uses pointer event handlers to perform drag operations, you should ensure that you don't attach any pointer event handlers that prevent default or stop propagation. Adding those types of handlers will kill the built-in handlers and cause the events not to work.
- You should not attach `click` event listeners to drag-enabled elements in the capture phase, as the `addOnUISdk` attaches a `cancelClickEvent` handler to drag-enabled elements to ensure that the automatic click (pointer down + pointer up automatically fires a click event) doesn't fire. Adding other handlers to this same element will cause them to be triggered on drag & drop completion.
- TIP: Use Chrome devTools to check the handlers attached to the element and its ancestors to identify any which may be causing conflicts with drag and drop handlers.

<InlineAlert slots="text" variant="info"/>

See the [Drag & Drop use case implementation](../../guides/develop/how-to/drag_and_drop.md) for example usage, and the [code samples](../../samples.md) provided for reference.

## Events

The table below describes the events triggered from the add-on SDK. Use the `addOnUISdk.app.on()` method to subscribe to events, and the `addOnUISdk.app.off()` method to unsubscribe from them. See the [`on()`](#on) method reference for more details.

| Type                | Description |                                                                                     |
| ------------------- | ----------- | ----------------------------------------------------------------------------------- |
| localechange        | string      | Triggered when there is a locale change at the host side.                           |
| themechange         | string      | Triggered when there is a theme change at the host side.                            |
| dragstart           | string      | Triggered when the user starts dragging an item for which drag behavior is enabled. |
| dragend             | string      | Triggered when the drag operation ends.                                             |
| documentIdAvailable | string      | Triggered when the document id is available in the application                      |
| documentTitleChange | string      | Triggered when the document title is changed in the application.                    |

## Errors

The table below describes the possible error messages that may occur when using the core `addOnUISdk.app` methods, with a description of the scenario that will return them.

|                                                                              Error Message |                                                                Error Scenario |
| -----------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------: |
|                                         Incorrect type: element must of type `HTMLElement` | Element passed to `enableDragToDocument` is not an instance of `HTMLElement`. |
|               Incorrect return type: `PreviewCallback` must return an object of type `URL` |                                `previewCallback` function doesn't return URL. |
| Incorrect return type: `CompletionCallback` should return an array of `DragCompletionData` |                   `completionCallback` doesn't return `DragCompletionData[]`. |
|                                 Dialog already open with instanceID: `${this._instanceId}` |                                                       Dialog is already open. |
|                                               Dialog options parameter: title is undefined |                                                           Title is undefined. |
|                                         Dialog options parameter: description is undefined |                                                     Description is undefined. |
|                                             Dialog options parameter: variant is undefined |                                                         Variant is undefined. |
|                                                       Invalid dialog variant: `${variant}` |                                                       Invalid dialog variant. |
|                                                            Input dialog field is undefined |                           Text field property is undefined for input variant. |
|                                              Field property is valid only for input dialog |               If text field property is present for variant other than input. |
|                                                      Input dialog field label is undefined |                            Field label is undefined for input dialog variant. |
|                                            Invalid dialog field type: `${field.fieldType}` |                               Field type is invalid for input dialog variant. |
|                                  Dialog already open with instanceID:`${this._instanceId}` |                                                If the dialog is already open. |
|                                               Dialog options parameter: title is undefined |                                                           Title is undefined. |
|                                                 Dialog options parameter: src is undefined |                                                          Source is undefined. |
|                                                       Invalid dialog variant: `${variant}` |                                                       Invalid dialog variant. |
