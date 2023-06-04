# AddOnSdk.app
Provides access to the host application (Adobe Express). This object is used to access the current document to allow you to [import](../../develop/#importing-content) or [export](../../develop/#exporting-content) content, the [OAuth APIs](../../develop/#authenticating-with-oauth-20) used for OAuth 2.0 workflows, and the UI object for detecting the [current locale](../../develop/#detecting-locale) and [theme](../../develop/#detecting-theme) in use.

## Methods
### showModalDialog()
<!-- `showModalDialog(dialogOptions: DialogOptions): Promise<DialogResult>` -->
Shows a modal dialog based on specific options passed in. 

#### Parameters
| Name              | Type         | Description   |
| -------------     | -------------| -----------:  |
| dialogOptions     | `object`       | Dialog options such as title, description, [Variant](./addonsdk-constants.md) etc. |

The input dialog variant accepts an additional `field` object. See the example below for details.

#### Return Value
A `Promise` with the [button type](../addonsdk/addonsdk-constants.md) that was clicked, otherwise an error. The input dialog variant returns the value of the field the user input text to in the `fieldValue` property.


#### Example Usage
```js
// Confirmation Dialog Example
let dialogOptions = {
    title: titleValue,
    description: [descValue],
    buttonLabels: {
        primary:
        primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
        secondary:
        secondaryButtonTextValue != ""
            ? secondaryButtonTextValue
            : undefined,
        cancel:
        cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
    },
    variant: "confirmation",
};
const response = await addOnSdk.app.showModalDialog(dialogOptions);
console.log("Button type clicked " + response.buttonType)

// Input Dialog Example 
let inputDialogOptions = {
    title: titleValue,
    description: [descValue],
    buttonLabels: {
        primary:
        primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
        secondary:
        secondaryButtonTextValue != ""
            ? secondaryButtonTextValue
            : undefined,
        cancel:
        cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
    },
    variant: "input",
    field: {
          label: labelValue,
          placeholder: placeholderValue,
          fieldType: "text",
    },

    const response = await addOnSdk.app.showModalDialog(inputDialogOptions);
    console.log("Field value " + response.fieldValue); // returns the input the user entered
}
};
```

### on()
<!-- `enableDragToDocument(element: HTMLElement, dragCallbacks: DragCallbacks): void`<br/> -->
Subscribe to an event (ie: listen for an event).


#### Parameters
| Name              | Type                       | Description            | Valid Values |
| -------------     | -------------------------- | ---------------------  | -----------------------------|            
| name              | string                     | Event to subscribe to. | See [Events](#addonsdkapp-events) |
| handler           | callback function          | Handler that gets invoked when the event is triggered. | `(data) => {}` |



#### Return Value 
`void`

#### Example Usage
```js  
AddOnSdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```

### off()
<!-- `enableDragToDocument(element: HTMLElement, dragCallbacks: DragCallbacks): void`<br/> -->
Unsubscribe from an event (ie: stop listening for an event).


#### Parameters
| Name              | Type                       | Description            | Valid Values |
| -------------     | -------------------------- | ---------------------  | -----------------------------|            
| name              | string                     | Event to unsubscribe to. | See [Events](#addonsdkapp-events) |
| handler           | callback function          | Handler that was used during event subscription. | `(data) => {}` |


#### Return Value 
`void`

#### Example Usage
```js  
AddOnSdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```

### enableDragToDocument()
<!-- `enableDragToDocument(element: HTMLElement, dragCallbacks: DragCallbacks): void`<br/> -->
Allows for drag to document functionality to be enabled on an element such as an image or video.

#### Parameters
| Name              | Type                                 | Description   |
| -------------     | -------------------------------------| -----------:  |
| element           | `HTMLElement`                             | The element to enable for drag and drop. |
| dragCallbacks     | [dragcallbacks](#dragcallbacks-syntax)    | An object containing a preview and completion callback  |

##### `dragCallbacks` object syntax:
###### Preview callback function
Callback used to get the preview image for the drag & drop action. 
```ts
(element: HTMLElement) => URL;
```

###### Preview callback return value
[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)

###### Completion callback
Callback used to get the final data to be added to the document post drag & drop action.
```ts
(element: HTMLElement) => Promise<DragCompletionData[]>;
```

##### Completion callback return value
A `Promise` array with the data to be added to the document on drag completion.

<!-- - Preview callback 
    `(element: HTMLElement) => URL`

- Completion callback: 
    `(element: HTMLElement) => Promise` with return type `blob` -->

#### Return Value 
`void`

#### Example Usage
```js  
AddOnSdk.app.enableDragToDocument(image, {
    previewCallback: element => {
        return new URL(element.src);
    },
    completionCallback: async (element) => {
        return [{ blob: await getBlob(element.src) }];
    }
});
```



## Objects
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Attribute</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Name</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
  <tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.document</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Represents the active document of the host application.</p></td>
  </tr>
  <tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
     <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.oauth</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization.</p></td>
  </tr>
  <tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Represents the host UI (Adobe Express UI).</p></td>
  </tr>
</tbody>
</table>


## Events
The table below describes the events triggered from the add-on SDK. Use the `AddOnSdk.app.on()` method to subscribe to events, and the `AddOnSdk.app.off()` method to unsubscribe from them. See the (`on()`)[#on] method reference for more details.

<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>localechange</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when there is a locale change at the host side.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>themechange</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when there is a theme change at the host side.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>dragstart</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when the user starts dragging an item for which drag behavior is enabled.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>dragend</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Triggered when the drag operation ends.</p>
    </td>
</tr>
</tbody>
</table>

