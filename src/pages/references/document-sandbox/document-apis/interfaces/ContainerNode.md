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

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

#### Inherited from

BaseNode.id

___

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](../classes/BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

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

Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the
document is closed.

If parent is a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`. For nodes with other
child "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit
removal. No-op if node is already an orphan.

#### Returns

`void`

#### Inherited from

[BaseNode](../classes/BaseNode.md).[removeFromParent](../classes/BaseNode.md#removefromparent)
