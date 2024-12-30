[@express-document-sdk](../overview.md) / Editor

# Class: Editor

Entry point for APIs that read or modify the document's content.

## Accessors

### context

• `get` **context**(): [`Context`](Context.md)

User's current selection context

#### Returns

[`Context`](Context.md)

<hr />

### documentRoot

• `get` **documentRoot**(): [`ExpressRootNode`](ExpressRootNode.md)

#### Returns

[`ExpressRootNode`](ExpressRootNode.md)

the root of the document.

## Methods

### createEllipse()

• **createEllipse**(): [`EllipseNode`](EllipseNode.md)

#### Returns

[`EllipseNode`](EllipseNode.md)

an ellipse node with default x/y radii, a black fill, and no initial stroke.
Transform values default to 0.

<hr />

### createGroup()

• **createGroup**(): [`GroupNode`](GroupNode.md)

#### Returns

[`GroupNode`](GroupNode.md)

a group node.

<hr />

### createImageContainer()

• **createImageContainer**(`bitmapData`, `options`): [`MediaContainerNode`](MediaContainerNode.md)

Creates a bitmap image, represented as a multi-node MediaContainerNode structure. Always creates a "full-frame,"
uncropped image initially, but cropping can be changed after it is created by modifying the properties of the
container's mediaRectangle and maskShape children.

Image creation involves some asynchronous steps. The image will be visible in this client almost instantly, but will
render as a gray placeholder on other clients until it has been uploaded to DCX and then downloaded by those clients.
This local client will act as having unsaved changes until the upload has finished.

#### Parameters

• **bitmapData**: [`BitmapImage`](../interfaces/BitmapImage.md)

BitmapImage resource (e.g. returned from loadBitmapImage()).

• **options**= `{}`

Additional configuration: - initialSize - Size the image is displayed at. Must have the same aspect ratio as bitmapData. Defaults to the
size the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down
if needed to stay below an application-defined size cap).

• **options.initialSize?**: [`RectangleGeometry`](../interfaces/RectangleGeometry.md)

#### Returns

[`MediaContainerNode`](MediaContainerNode.md)

MediaContainerNode representing the top container node of the multi-node structure.

<hr />


### createLine()

• **createLine**(): [`LineNode`](LineNode.md)

#### Returns

[`LineNode`](LineNode.md)

a line node with default start point and end point and a default stroke.
Transform values default to 0.

<hr />

### createPath()

• **createPath**(`path`): [`PathNode`](PathNode.md)

#### Parameters

• **path**: `string`

a string representing any [SVG path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
Note that the path data will be normalized, and therefore the `path` getter may return a different SVG string from the path creation input.
For example, "M 10 80 Q 52.5 10, 95 80 T 180 80" becomes "M 10 80 C 38.33 33.33 66.67 33.33 95 80...".
Throws if the input is empty or is not legal SVG path syntax.

#### Returns

[`PathNode`](PathNode.md)

a path node with a default stroke and no initial fill.

<hr />

### createRectangle()

• **createRectangle**(): [`RectangleNode`](RectangleNode.md)

#### Returns

[`RectangleNode`](RectangleNode.md)

a rectangle node with default width and height, a black fill, and no initial stroke.
Transform values default to 0.

<hr />

### createText()

• **createText**(): [`TextNode`](TextNode.md)

#### Returns

[`TextNode`](TextNode.md)

a text node with default styles. The text content is initially empty, so the text node will be
invisible until its `fullContent` property's `text` is set. Creates point text, so the node's width will automatically
adjust to accommodate whatever text is set.

Note: the registration point of this text node is not guaranteed to be at the top-left of the bounding box of its
insertion parent. Recommend using `setPositionInParent` over `translation` to set the position.

<hr />

### loadBitmapImage()

• **loadBitmapImage**(`bitmapData`): `Promise`<[`BitmapImage`](../interfaces/BitmapImage.md)\>

Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to [createImageContainer](Editor.md#createimagecontainer)
to create a MediaContainerNode. The same BitmapImage can be used to create multiple MediaContainerNodes.

Because the resulting BitmapImage is returned asynchronously, to use it you must schedule an edit lambda to run at a
safe later time in order to call [createImageContainer](Editor.md#createimagecontainer). See [queueAsyncEdit](Editor.md#queueasyncedit).

Further async steps to upload image resource data may continue in the background after this call's Promise resolves,
but the resulting BitmapImage can be used right away (via the queue API noted above). The local client will act as
having unsaved changes until all the upload steps have finished.

#### Parameters

• **bitmapData**: `Blob`

Encoded image data in PNG or JPEG format.

#### Returns
