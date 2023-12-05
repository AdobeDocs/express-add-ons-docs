[@express-document-sdk](../overview.md) / ContainerNode

# Interface: ContainerNode

Interface for any node that contains an entirely generic collection of children. Some ContainerNode classes may host
*additional* children in other specific "slots," such as background or mask layers; and non-ContainerNode classes may
also hold children in specified "slots." Use [allChildren](../classes/Node.md#allchildren) for read access to children regardless of node type.

Some ContainerNode classes may be full-fledged Node subclasses (such as Group), while others may be a subclass of the
more minimal BaseNode (such as Artboard).

## Hierarchy

- [`BaseNode`](../classes/BaseNode.md)

  ↳ **`ContainerNode`**

## Implemented by

- [`ArtboardNode`](../classes/ArtboardNode.md)
- [`GroupNode`](../classes/GroupNode.md)

## Table of contents

### Accessors

- [allChildren](ContainerNode.md#allchildren)
- [children](ContainerNode.md#children)
- [parent](ContainerNode.md#parent)
- [type](ContainerNode.md#type)

### Methods

- [removeFromParent](ContainerNode.md#removefromparent)

## Accessors

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`BaseNode`](../classes/BaseNode.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [children](ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

#### Returns

`Readonly`<`Iterable`<[`BaseNode`](../classes/BaseNode.md)\>\>

#### Inherited from

BaseNode.allChildren

___

### children

• `get` **children**(): [`ItemList`](../classes/ItemList.md)<[`Node`](../classes/Node.md)\>

The node's children. Use the methods on this ItemList object to get, add, and remove children.

#### Returns

[`ItemList`](../classes/ItemList.md)<[`Node`](../classes/Node.md)\>

___

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](../classes/BaseNode.md)

The node's parent. Undefined if the node is an orphan, or if the node is the artwork root.

#### Returns

`undefined` \| [`BaseNode`](../classes/BaseNode.md)

#### Inherited from

BaseNode.parent

___

### type

• `get` **type**(): [`SceneNodeType`](../enums/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enums/SceneNodeType.md)

#### Inherited from

BaseNode.type

## Methods

### removeFromParent

▸ **removeFromParent**(): `void`

Removes the node from its parent - for a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`.
For nodes with other slots, removes the child from whichever slot it resides in, if possible. Throws if the slot does
not support removal. Also throws if node is the artwork root. No-op if node is already an orphan.

#### Returns

`void`

#### Inherited from

[BaseNode](../classes/BaseNode.md).[removeFromParent](../classes/BaseNode.md#removefromparent)
