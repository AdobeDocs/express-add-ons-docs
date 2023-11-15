[@add-on-hlapi-sdk](../overview.md) / Editor

# Class: Editor

Entry point for APIs that read or modify the document's content.

## Hierarchy

- `ProxyLiveObject`

  ↳ **`Editor`**

## Table of contents

### Accessors

- [context](Editor.md#context)
- [documentRoot](Editor.md#documentRoot)

### Methods

- [createColorFill](Editor.md#createColorFill)
- [createEllipse](Editor.md#createEllipse)
- [createGroup](Editor.md#createGroup)
- [createImageContainer](Editor.md#createImageContainer)
- [createLine](Editor.md#createLine)
- [createRectangle](Editor.md#createRectangle)
- [createStroke](Editor.md#createStroke)
- [createText](Editor.md#createText)
- [loadBitmapImage](Editor.md#loadBitmapImage)

## Accessors

### <a id="context" name="context"></a> context

• `get` **context**(): [`Context`](Context.md)

User's current selection context

#### Returns

[`Context`](Context.md)

___

### <a id="documentRoot" name="documentRoot"></a> documentRoot

• `get` **documentRoot**(): [`ExpressRootNode`](ExpressRootNode.md)

#### Returns

[`ExpressRootNode`](ExpressRootNode.md)

the root of the document.

## Methods

### <a id="createColorFill" name="createColorFill"></a> createColorFill

▸ **createColorFill**(`color`): [`ColorFill`](../interfaces/ColorFill.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Color`](Color.md) | The color to use for the fill. |

#### Returns

[`ColorFill`](../interfaces/ColorFill.md)

a solid color fill.

___

### <a id="createEllipse" name="createEllipse"></a> createEllipse

▸ **createEllipse**(): [`EllipseNode`](EllipseNode.md)

#### Returns

[`EllipseNode`](EllipseNode.md)

an ellipse node with default x/y radii, and *no* initial stroke or fill.
Transform values default to 0.

___

### <a id="createGroup" name="createGroup"></a> createGroup

▸ **createGroup**(): [`GroupNode`](GroupNode.md)

#### Returns

[`GroupNode`](GroupNode.md)

a group node.

___

### <a id="createImageContainer" name="createImageContainer"></a> createImageContainer

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
| `bitmapData` | [`BitmapImage`](../interfaces/BitmapImage.md) | BitmapImage resource (e.g. returned from loadBitmapImage()). |
| `options` | `Object` | Additional configuration:      - initialSize - Size the image is displayed at. Must have the same aspect ratio as bitmapData. Defaults to the        size the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down        if needed to stay below an application-defined size cap). |
| `options.initialSize?` | [`RectangleGeometry`](../interfaces/RectangleGeometry.md) | - |

#### Returns

[`MediaContainerNode`](MediaContainerNode.md)

MediaContainerNode representing the top container node of the multi-node structure.

___

### <a id="createLine" name="createLine"></a> createLine

▸ **createLine**(): [`LineNode`](LineNode.md)

#### Returns

[`LineNode`](LineNode.md)

a line node with default start point and end point and a default stroke.
Transform values default to 0.

___

### <a id="createRectangle" name="createRectangle"></a> createRectangle

▸ **createRectangle**(): [`RectangleNode`](RectangleNode.md)

#### Returns

[`RectangleNode`](RectangleNode.md)

a rectangle node with default width and height, and *no* initial stroke or fill.
Transform values default to 0.

___

### <a id="createStroke" name="createStroke"></a> createStroke

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

### <a id="createText" name="createText"></a> createText

▸ **createText**(): [`TextNode`](TextNode.md)

#### Returns

[`TextNode`](TextNode.md)

a text node with default styles. The text content is initially empty, so the text node will be
invisible until its `text` property is set. Creates point text, so the node's width will automatically
adjust to accommodate whatever text is set.

___

### <a id="loadBitmapImage" name="loadBitmapImage"></a> loadBitmapImage

▸ **loadBitmapImage**(`bitmapData`): `Promise`<[`BitmapImage`](../interfaces/BitmapImage.md)\>

Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to [createImageContainer](Editor.md#createImageContainer)
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
