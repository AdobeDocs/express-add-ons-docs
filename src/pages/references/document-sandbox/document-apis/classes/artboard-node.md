[@express-document-sdk](../overview.md) / ArtboardNode

# Class: ArtboardNode

An ArtboardNode represents the topmost container of visual content within a [PageNode](page-node.md). When a page contains
multiple artboards, each represents a keyframe "scene" in the page's animation timeline.

To create a new artboard, see [ArtboardList.addArtboard](artboard-list.md#addartboard).

## Extends

-   [`VisualNode`](visual-node.md)

## Implements

-   `Readonly` &lt;[`IRectangularNode`](../interfaces/i-rectangular-node.md)\ &gt;
-   [`ContainerNode`](../interfaces/container-node.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](add-on-data.md)

Get [AddOnData](add-on-data.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](add-on-data.md)

<HorizontalLine />

### allChildren

• `get` **allChildren**(): `Readonly`  &lt;`Iterable`&gt; [`Node`](node.md), `any`, `any`\&gt; \&gt;

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/container-node.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of an Artboard are all subclasses of Node (not just the more minimal BaseNode or VisualNode).

#### Returns

`Readonly` &lt;`Iterable` &lt;[`Node`](node.md), `any`, `any`\&gt; \&gt;

<HorizontalLine />

### boundsLocal

• `get` **boundsLocal**(): `Readonly` &lt;[`Rect`](../interfaces/rect.md) \&gt;

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly` &lt;[`Rect`](../interfaces/rect.md)\&gt;

<HorizontalLine />

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly` &lt;[`Point`](../interfaces/point.md)\&gt;

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

<HorizontalLine />

### children

• `get` **children**(): [`ItemList`](item-list.md)&lt;[`Node`](node.md)\&gt;

The artboards's regular children (does not include any "background layer" content if present; use [allChildren](artboard-node.md#allchildren)
for a read-only view that includes background content). Use the methods on this `children` ItemList object to get,
add, and remove regular children.

#### Returns

[`ItemList`](item-list.md)&lt;[`Node`](node.md)\&gt;

<HorizontalLine />

### fill

• `get` **fill**(): `Readonly`&lt;[`Fill`](../interfaces/fill.md)\&gt;

• `set` **fill**(`fill`): `void`

The background fill of the artboard. Artboards must always have a fill.

#### Parameters

• **fill**: [`Fill`](../interfaces/fill.md)

#### Returns

`Readonly` &lt;[`Fill`](../interfaces/fill.md)\ &gt;

<HorizontalLine />

### height

• `get` **height**(): `number`

The height of the artboard.
Shares the same dimensions as the parent [PageNode](page-node.md) and other artboards within the parent [PageNode](page-node.md).
To resize an artboard, resize the parent [PageNode](page-node.md).

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

• `get` **topLeftLocal**(): `Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

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
Shares the same dimensions as the parent [PageNode](page-node.md) and other artboards within the parent [PageNode](page-node.md).
To resize an artboard, resize the parent [PageNode](page-node.md).

#### Returns

`number`

## Methods

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](artboard-node.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/point.md)

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)\&gt;

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
