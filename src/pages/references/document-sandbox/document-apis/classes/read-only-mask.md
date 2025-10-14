[@express-document-sdk](../overview.md) / ReadOnlyMask

# Class: ReadOnlyMask

A read-only view of a mask shape.

## Implements

-   [`INodeBounds`](../interfaces/i-node-bounds.md)

## Accessors

### boundsInParent

• `get` **boundsInParent**(): `Readonly`&lt;[`Rect`](../interfaces/rect.md)\&gt;

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)\&gt;

<HorizontalLine />

### boundsLocal

• `get` **boundsLocal**(): `Readonly`&lt;[`Rect`](../interfaces/rect.md)\&gt;

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)\&gt;

<HorizontalLine />

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

<HorizontalLine />

### rotation

• `get` **rotation**(): `number`

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

#### Returns

`number`

<HorizontalLine />

### rotationInScreen

• `get` **rotationInScreen**(): `number`

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

#### Returns

`number`

<HorizontalLine />

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

<HorizontalLine />

### transformMatrix

• `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

<HorizontalLine />

### translation

• `get` **translation**(): `Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

<HorizontalLine />

### type

• `get` **type**(): `"ReadOnlyMask"`

The type of [ReadOnlyMask](read-only-mask.md).

#### Returns

`"ReadOnlyMask"`

## Methods

### boundsInNode()

• **boundsInNode**(`targetNode`): `Readonly`&lt;[`Rect`](../interfaces/rect.md)\&gt;

Convert the node's [boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same visualRoot, but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)\&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`boundsInNode`](../interfaces/i-node-bounds.md#boundsinnode)

<HorizontalLine />

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same visualRoot, but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/point.md)

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`localPointInNode`](../interfaces/i-node-bounds.md#localpointinnode)
