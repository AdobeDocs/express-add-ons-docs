[@express-document-sdk](../overview.md) / BaseNode

# Class: BaseNode

A "node" represents an object in the scenegraph, the document's visual content tree. This base class includes only the
most fundamental nonvisual properties that even nodes near the top of the document structure share (such as PageNode).
The more tangible visual content typically extends the richer Node class which extends BaseNode with additional
properties.

## Hierarchy

- `ProxyLiveObject`

  ↳ **`BaseNode`**

  ↳↳ [`ArtboardNode`](ArtboardNode.md)

  ↳↳ [`ContainerNode`](../interfaces/ContainerNode.md)

  ↳↳ [`ExpressRootNode`](ExpressRootNode.md)

  ↳↳ [`Node`](Node.md)

  ↳↳ [`PageNode`](PageNode.md)

## Table of contents

### Accessors

- [allChildren](BaseNode.md#allchildren)
- [parent](BaseNode.md#parent)
- [type](BaseNode.md#type)

### Methods

- [removeFromParent](BaseNode.md#removefromparent)

## Accessors

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`BaseNode`](BaseNode.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

#### Returns

`Readonly`<`Iterable`<[`BaseNode`](BaseNode.md)\>\>

___

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. Undefined if the node is an orphan, or if the node is the artwork root.

#### Returns

`undefined` \| [`BaseNode`](BaseNode.md)

___

### type

• `get` **type**(): [`SceneNodeType`](../enums/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enums/SceneNodeType.md)

## Methods

### removeFromParent

▸ **removeFromParent**(): `void`

Removes the node from its parent - for a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`.
For nodes with other slots, removes the child from whichever slot it resides in, if possible. Throws if the slot does
not support removal. Also throws if node is the artwork root. No-op if node is already an orphan.

#### Returns

`void`
