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
