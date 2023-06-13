# AddOnSdk.app
Provides access to the Adobe Express host application's properties and methods to provide features such as content import and export through the [`document` object](./app-document.md), OAuth 2.0 authorization flows with the [`oauth` object](./app-oauth.md) and theme and locale detection with the [`ui` object](app-ui.md). It also provides access to methods to [show modal dialogs](../../guides/develop/index.md#modal-dialogs), [enable drag and drop](../../guides/develop/index.md#drag-and-drop) of content and subscribe and unsubscribe to events. 


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

## Methods

### on()
Subscribe to an event (ie: listen for an event).

#### Signature
`on(name: string, handler: eventHandler): void`

#### Parameters
| Name              | Type                       | Description            | Valid Values |
| -------------     | -------------------------- | ---------------------  | -----------------------------|            
| `name`              | `string`                     | Event to subscribe to. | See [Events](#events) |
| `handler`           | callback `function`          | Handler that gets invoked when the event is triggered. | `(data) => {}` |


#### Return Value 
`void`

#### Example Usage
```js  
AddOnSdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```
    
### off()
Unsubscribe from an event (ie: stop listening for an event).

#### Signature
`off(name: string, handler: eventHandler): void`

#### Parameters
| Name              | Type                       | Description            | Valid Values |
| -------------     | -------------------------- | ---------------------  | -----------------------------|            
| `name`              | `string`                     | Event to unsubscribe to. | See [Events](#events) |
| `handler`           | callback `function`          | Handler that was used during event subscription. | `(data) => {}` |


#### Return Value 
`void`

#### Example Usage
```js  
AddOnSdk.app.off("themechange", (data) => {
  applyTheme(data.theme);
});
```

### showModalDialog()
Shows a modal dialog based on specific options passed in. 

#### Signature
`showModalDialog(dialogOptions: DialogOptions): Promise<DialogResult>`

#### Parameters
| Name              | Type         | Description   |
| -------------     | -------------| -----------:  |
| `dialogOptions`   | `object`     | [`DialogOptions`](#dialogoptions) object payload |

##### `DialogOptions`
| Name              | Type         | Description   |
| -------------     | -------------:| -----------:  |
| `variant`         | `string` [Variant](./addonsdk-constants.md) |  The type of dialog to show.
| `title`           | `string`        | Dialog title  |
| `description`     | `string`        | Description for the dialog. |
| `buttonLabels?`   | `object` [ButtonLabels](#buttonlabels) | The optional button labels to use in the dialog. |

##### `ButtonLabels`
| Name              | Type         | Description   |
| -------------     | -------------:| -----------:  |
| `primary?`        | `string`       | Primary action label. Default label is "OK". |
| `secondary?`      | `string`       | Secondary action label. |
| `cancel?`         | `string`       | Cancel action label.    |

The input dialog variant accepts an [additional `field`](#input-dialog-additional-option) object. 

##### Input Dialog Additional Option
| Name              | Type           | Description   |
| -------------     | -------------: | -----------:  |
| `field`           | object [`Field`](#field) | Input field object |

##### `Field`
| Name              | Type           | Description   |
| -------------     | -------------: | -----------:  |
| `label`           | `string`       | Label for the input field |
| `placeholder`     | `string`       | Specifies a short hint that describes the expected value of the field |
| `fieldType`       | `string`        | Currently always the value "text".

#### Return Value
Returns a `Promise` (`DialogResult`)[#dialogresult] object with the [button type](../addonsdk/addonsdk-constants.md) that was clicked, or an error. When using the "input" dialog variant, an additional `fieldValue` property will be in the response object and will contain the value of the field the user input text to.



#### `DialogResult`
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `buttonType`  |  `string` [`ButtonType`](../addonsdk/addonsdk-constants.md) constant     | The button type clicked |
| `fieldValue`  | `string`      | The input from the user. | 

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

<InlineAlert slots="text" variant="info"/>

See the use case implementations for an example of the [custom modal dialog](../../guides/develop/index.md#custom-dialog-example).


### enableDragToDocument()
Allows for drag to document functionality to be enabled on an element such as an image or video.

#### Signature
`enableDragToDocument(element: HTMLElement, dragCallbacks: DragCallbacks): void`

#### Parameters
| Name              | Type                                 | Description   |
| -------------     | -------------------------------------| -----------:  |
| `element`           | `HTMLElement`                             | The element to enable for drag and drop. |
| `dragCallbacks`     | [dragCallbacks](#dragcallbacks)    | An object containing a preview and completion callback  |

##### `dragCallbacks`
| Name              | Type                   | Description   |
| ------------------| -----------------------| -----------:  |
| `previewCallback` | [`DragPreviewCallback`](#dragpreviewcallback-type-definition)  | Callback to provide the preview image |
| `completionCallback` | [`DragCompletionCallback`](#dragcompletioncallback-type-definition)  | Callback to provide the content to be added to the document |

##### `DragPreviewCallback` Type Definition
Callback used to get the preview image for the drag & drop action. Returns a `URL` object.
```ts
(element: HTMLElement) => URL;
```


##### `DragCompletionCallback` Type Definition
Callback used to get the final data to be added to the document post drag & drop action. Returns [DragCompletionData](#dragcompletiondata) array.

```ts
(element: HTMLElement) => Promise<DragCompletionData[]>;
```

##### `DragCompletionData` 
| Name              | Type    | Description   |
| ------------------| --------| -----------:  |
| `blob`            | `Blob`  | Blob (image/video) to be added to the document |

#### Return Value 
`void`

<InlineAlert slots="text" variant="info"/>

See the [Drag & Drop use case implementation](../../guides/develop/index.md#drag-and-drop) for example usage, and the [code samples](../../samples.md) provided for reference.


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

