[@express-document-sdk](../overview.md) / Editor

# Class: Editor

Entry point for APIs that read or modify the document's content.

## Hierarchy

- `ProxyLiveObject`

  ↳ **`Editor`**

## Table of contents

### Accessors

- [context](Editor.md#context)
- [documentRoot](Editor.md#documentroot)

### Methods

- [createColorFill](Editor.md#createcolorfill)
- [createEllipse](Editor.md#createellipse)
- [createGroup](Editor.md#creategroup)
- [createImageContainer](Editor.md#createimagecontainer)
- [createLine](Editor.md#createline)
- [createRectangle](Editor.md#createrectangle)
- [createStroke](Editor.md#createstroke)
- [createText](Editor.md#createtext)
- [loadBitmapImage](Editor.md#loadbitmapimage)
- [queueAsyncEdit](Editor.md#queueasyncedit)

## Accessors

### context

• `get` **context**(): [`Context`](Context.md)

User's current selection context

#### Returns

[`Context`](Context.md)

___

### documentRoot

• `get` **documentRoot**(): [`ExpressRootNode`](ExpressRootNode.md)

#### Returns

[`ExpressRootNode`](ExpressRootNode.md)

the root of the document.

## Methods

### createColorFill

▸ **createColorFill**(`color`): [`ColorFill`](../interfaces/ColorFill.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Color`](Color.md) | The color to use for the fill. |

#### Returns

[`ColorFill`](../interfaces/ColorFill.md)

a solid color fill.

___

### createEllipse

▸ **createEllipse**(): [`EllipseNode`](EllipseNode.md)

#### Returns

[`EllipseNode`](EllipseNode.md)

an ellipse node with default x/y radii, and *no* initial stroke or fill.
Transform values default to 0.

___

### createGroup

▸ **createGroup**(): [`GroupNode`](GroupNode.md)

#### Returns

[`GroupNode`](GroupNode.md)

a group node.

___

### createImageContainer

▸ **createImageContainer**(`bitmapData`, `options?`): [`MediaContainerNode`](MediaContainerNode.md)

Creates a bitmap image, represented as a multi-node MediaContainerNode structure. Always creates a "full-frame,"
uncropped image initially, but cropping can be changed after it is created by modifying the properties of the
container's mediaRectangle and maskShape children.

Image creation involves some asynchronous steps. The image will be visible in this client almost instantly, but will
render as a gray placeholder on other clients until it has been uploaded to storage and then downloaded by those clients.
This local client will act as having unsaved changes until the upload has finished.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bitmapData` | [`BitmapImage`](../interfaces/BitmapImage.md) | BitmapImage resource (e.g. returned from `loadBitmapImage()`). |
| `options` | `Object` | Additional configuration:<br/><br/> `options.initialSize?:` [`RectangleGeometry`](../interfaces/RectangleGeometry.md)<br/><br/> Size the image is displayed at. Must have the same aspect ratio as `bitmapData`. Defaults to the size the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down    if needed to stay below an application-defined size cap). |

#### Returns

[`MediaContainerNode`](MediaContainerNode.md)

MediaContainerNode representing the top container node of the multi-node structure.

___

### createLine

▸ **createLine**(): [`LineNode`](LineNode.md)

#### Returns

[`LineNode`](LineNode.md)

a line node with default start point and end point and a default stroke.
Transform values default to 0.

___

### createRectangle

▸ **createRectangle**(): [`RectangleNode`](RectangleNode.md)

#### Returns

[`RectangleNode`](RectangleNode.md)

a rectangle node with default width and height, and *no* initial stroke or fill.
Transform values default to 0.

___

### createStroke

▸ **createStroke**(`options?`): [`Stroke`](../interfaces/Stroke.md)

See [StrokeOptions](../interfaces/StrokeOptions.md) for more details on the `options` fields. Defaults:
- `color` has default value DEFAULT_STROKE_COLOR if none is provided.
- `width` has default value DEFAULT_STROKE_WIDTH if none is provided.
- `dashPattern` has default value [] if none is provided. Array must be
  of even length. Values cannot be negative.
- `dashOffset` has default value 0 if none is provided. This options field is ignored
  if no `dashPattern` was provided.

The stroke's `position` field cannot be specified via options yet because only
[center](../enums/StrokePosition.md#center) is supported.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`StrokeOptions`](../interfaces/StrokeOptions.md)\> |

#### Returns

[`Stroke`](../interfaces/Stroke.md)

a stroke configured with the given options.

___

### createText

▸ **createText**(): [`TextNode`](TextNode.md)

#### Returns

[`TextNode`](TextNode.md)

a text node with default styles. The text content is initially empty, so the text node will be
invisible until its `text` property is set. Creates point text, so the node's width will automatically
adjust to accommodate whatever text is set.

___

### loadBitmapImage

▸ **loadBitmapImage**(`bitmapData`): `Promise`<[`BitmapImage`](../interfaces/BitmapImage.md)\>

Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to [createImageContainer](Editor.md#createimagecontainer)
to create a MediaContainerNode. The same BitmapImage can be used to create multiple MediaContainerNodes.

Note: image resources that are unused will be automatically cleaned up after the document is closed.

Async steps to upload image resource data continue in the background after this call's Promise resolves, but the BitmapImage
return value can be used immediately. The local client will act as having unsaved changes until the upload has finished.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bitmapData` | `Blob` | Encoded image data in PNG or JPEG format. |

#### Returns

`Promise`<[`BitmapImage`](../interfaces/BitmapImage.md)\>

___

### queueAsyncEdit

▸ **queueAsyncEdit**(`lambda`): `Promise`<`void`\>

Enqueues a function to be run at a later time when edits to the user's document may be performed. You can always edit
the document immediately when invoked in response to your add-on's UI code. However, if you delay to await an
asynchronous operation such as [loadBitmapImage](Editor.md#loadbitmapimage), any edits following this pause must be scheduled using
queueAsyncEdit(). This ensures the edit is properly tracked for saving and undo.

The delay before your edit function is executed is typically just a few milliseconds, so it will appear instantaneous
to users. However, note that queueAsyncEdit() will return *before* your function has been run.
If you need to trigger any code after the edit has been performed, either include this in the lambda you are enqueuing
or await the Promise returned by queueAsyncEdit().

Generally, calling any setter or method is treated as an edit; but simple getters may be safely called at any time.

Example of typical usage:
```javascript
// Assume insertImage() is called from your UI code, and given a Blob containing image data
async function insertImage(blob) {
    // This function was invoked from the UI iframe, so we can make any edits we want synchronously here.
    // Initially load the bitmap - an async operation
    const bitmapImage = await editor.loadBitmapImage(blob);

    // Execution doesn't arrive at this line until an async delay, due to the Promise 'await' above

    // Further edits need to be queued to run at a safe time
    editor.queueAsyncEdit(() => {
         // Create scenenode to display the image, and add it to the current artboard
         const mediaContainer = editor.createImageContainer(bitmapImage);
         editor.context.insertionParent.children.append(mediaContainer);
    });
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lambda` | () => `void` | a function which edits the document model. |

#### Returns

`Promise`<`void`\>

a Promise that resolves when the lambda has finished running, or rejects if the lambda throws an error.
