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
