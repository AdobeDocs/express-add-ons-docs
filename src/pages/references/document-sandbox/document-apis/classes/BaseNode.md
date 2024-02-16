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

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

___

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

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

Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the
document is closed.

If parent is a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`. For nodes with other
child "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit
removal. No-op if node is already an orphan.

#### Returns

`void`
