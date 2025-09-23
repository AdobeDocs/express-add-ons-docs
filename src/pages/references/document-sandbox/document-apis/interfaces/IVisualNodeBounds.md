[@express-document-sdk](../overview.md) / IVisualNodeBounds
# Interface: IVisualNodeBounds

An interface for the bounds of a [VisualNode](../classes/VisualNode.md).

## Extended by


- [`INodeBounds`](INodeBounds.md)


## Accessors

### boundsLocal

• `get` **boundsLocal**(): `Readonly`<[`Rect`](Rect.md)\>

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`<[`Rect`](Rect.md)\>

---

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`<[`Point`](Point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`<[`Point`](Point.md)\>

---

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`<[`Point`](Point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](Point.md)\>

## Methods

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same visualRoot, but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](Point.md)

• **targetNode**: [`VisualNode`](../classes/VisualNode.md)

#### Returns

`Readonly`<[`Point`](Point.md)\>
