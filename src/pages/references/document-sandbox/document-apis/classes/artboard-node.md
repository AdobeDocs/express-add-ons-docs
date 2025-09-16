[@express-document-sdk](../overview.md) / ArtboardNode

# Class: ArtboardNode

An ArtboardNode represents an artboard object in the scenegraph. All user visual content must be contained on an artboard.
Artboards are always contained on a [PageNode](page-node.md); when a page contains multiple artboards, the artboards represent
"scenes" in a linear timeline sequence.

To create a new artboard, see [ArtboardList.addArtboard](artboard-list.md#addartboard).

Please note that creating and deleting an artboard in a single frame will crash the editor.

## Extends

-   [`VisualNode`](visual-node.md)

## Implements

-   `Readonly` [`IRectangularNode`](../interfaces/i-rectangular-node.md)
-   [`ContainerNode`](../interfaces/container-node.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](add-on-data.md)

Get [AddOnData](add-on-data.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](add-on-data.md)

<HorizontalLine />

### allChildren

• `get` **allChildren**(): `Readonly` `Iterable` [`Node`](node.md), `any`, `any`

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/container-node.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes _all_ such children and reflects their
overall display z-order.

The children of an Artboard are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly` `Iterable` [`Node`](node.md), `any`, `any`

<HorizontalLine />

### boundsLocal

• `get` **boundsLocal**(): `Readonly` [`Rect`](../interfaces/rect.md)

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
_not_ necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly` [`Rect`](../interfaces/rect.md)

<HorizontalLine />

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly` [`Point`](../interfaces/point.md)

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly` [`Point`](../interfaces/point.md)

<HorizontalLine />

### children

• `get` **children**(): [`ItemList`](item-list.md) [`Node`](node.md)

The node's children. Use the methods on this ItemList object to get, add, and remove children.

#### Returns

[`ItemList`](item-list.md) [`Node`](node.md)

<HorizontalLine />

### fill

• `get` **fill**(): `Readonly` [`Fill`](../interfaces/fill.md)

• `set` **fill**(`fill`): `void`

The background fill of the artboard. Artboards must always have a fill.

#### Parameters

• **fill**: [`Fill`](../interfaces/fill.md)

#### Returns

`Readonly` [`Fill`](../interfaces/fill.md)

<HorizontalLine />

### height

• `get` **height**(): `number`

The height of the artboard.
Shares the same dimensions as the parent [PageNode](./page-node.md) and other artboards within the parent [PageNode](./page-node.md).
To resize an artboard, resize the parent [PageNode](./page-node.md).

#### Returns

`number`

<HorizontalLine />

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

<HorizontalLine />

### parent

• `get` **parent**(): `undefined` \| [`PageNode`](page-node.md)

The node's parent. Undefined if the node is an orphan.

#### Returns

`undefined` \| [`PageNode`](page-node.md)

<HorizontalLine />

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly` [`Point`](../interfaces/point.md)

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly` [`Point`](../interfaces/point.md)

<HorizontalLine />

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/scene-node-type.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/scene-node-type.md)

<HorizontalLine />

### visualRoot

• `get` **visualRoot**(): [`VisualNode`](visual-node.md)

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

#### Returns

[`VisualNode`](visual-node.md)

<HorizontalLine />

### width

• `get` **width**(): `number`

The width of the artboard.
Shares the same dimensions as the parent [PageNode](./page-node.md) and other artboards within the parent [PageNode](./page-node.md).
To resize an artboard, resize the parent [PageNode](./page-node.md).

#### Returns

`number`

## Methods

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly` [`Point`](../interfaces/point.md)

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](ArtboardNode.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/point.md)

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly` [`Point`](../interfaces/point.md)

#### Implementation of

[`ContainerNode`](../interfaces/container-node.md).[`localPointInNode`](../interfaces/container-node.md#localpointinnode)

#### Inherited from

[`VisualNode`](visual-node.md).[`localPointInNode`](visual-node.md#localpointinnode)

<HorizontalLine />

### removeFromParent()

• **removeFromParent**(): `void`

Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the
document is closed.

If parent is a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`. For nodes with other
child "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit
removal. No-op if node is already an orphan.

#### Returns

`void`

#### Implementation of

[`ContainerNode`](../interfaces/container-node.md).[`removeFromParent`](../interfaces/container-node.md#removefromparent)

#### Inherited from

[`VisualNode`](visual-node.md).[`removeFromParent`](visual-node.md#removefromparent)
