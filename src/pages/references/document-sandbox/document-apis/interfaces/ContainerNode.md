[@express-document-sdk](../overview.md) / ContainerNode

# Interface: ContainerNode

Interface for any node that contains an entirely generic collection of children. Some ContainerNode classes may host
_additional_ children in other specific "slots," such as background or mask layers; and non-ContainerNode classes may
also hold children in specified "slots." Use [Node.allChildren](../classes/Node.md#allchildren) for read access to children regardless of node type.

Some ContainerNode classes may be full-fledged Node subclasses (such as Group), while others may be a subclass of the
more minimal VisualNode (such as Artboard).

## Extends

-   [`VisualNode`](../classes/VisualNode.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](../classes/AddOnData.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ___experimental only___ and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Get [AddOnData](../classes/AddOnData.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](../classes/AddOnData.md)

---

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`BaseNode`](../classes/BaseNode.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes _all_ such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

#### Returns

`Readonly`<`Iterable`<[`BaseNode`](../classes/BaseNode.md)\>\>

---

### boundsLocal

• `get` **boundsLocal**(): `Readonly`<[`Rect`](Rect.md)\>

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
_not_ necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`<[`Rect`](Rect.md)\>

---

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`<[`Point`](Point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal
box.

#### Returns

`Readonly`<[`Point`](Point.md)\>

---

### children

• `get` **children**(): [`ItemList`](../classes/ItemList.md)<[`Node`](../classes/Node.md)\>

The node's children. Use the methods on this ItemList object to get, add, and remove children.

#### Returns

[`ItemList`](../classes/ItemList.md)<[`Node`](../classes/Node.md)\>

---

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

---

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](../classes/BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](../classes/BaseNode.md)

---

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`<[`Point`](Point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](Point.md)\>

---

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

---

### visualRoot

• `get` **visualRoot**(): [`VisualNode`](../classes/VisualNode.md)

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

#### Returns

[`VisualNode`](../classes/VisualNode.md)

## Methods

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](../classes/VisualNode.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](Point.md)

• **targetNode**: [`VisualNode`](../classes/VisualNode.md)

#### Returns

`Readonly`<[`Point`](Point.md)\>

#### Inherited from

[`VisualNode`](../classes/VisualNode.md).[`localPointInNode`](../classes/VisualNode.md#localpointinnode)

---

### removeFromParent()

• **removeFromParent**(): `void`

Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the
document is closed.

If parent is a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`. For nodes with other
child "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit
removal. No-op if node is already an orphan.

#### Returns

`void`

#### Inherited from

[`VisualNode`](../classes/VisualNode.md).[`removeFromParent`](../classes/VisualNode.md#removefromparent)
