[@express-document-sdk](../overview.md) / ExpressRootNode

# Class: ExpressRootNode

An ExpressRootNode represents the root node of the document's "scenegraph" artwork tree. The root contains a collection
of [pages](ExpressRootNode.md#pages). Each page contains one or more artboards, arranged in a timeline sequence. All the visual content of
the document lies within those artboards.

The parent of ExpressRootNode is undefined, since it is the root of the document tree.

## Extends

-   [`BaseNode`](BaseNode.md)

## Accessors

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`BaseNode`](BaseNode.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes _all_ such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

#### Returns

`Readonly`<`Iterable`<[`BaseNode`](BaseNode.md)\>\>

---

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

---

### pages

• `get` **pages**(): [`PageList`](PageList.md)

The pages of the document. All visual content is contained on artboards within the pages.

#### Returns

[`PageList`](PageList.md)

---

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](BaseNode.md)

---

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

## Methods

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

[`BaseNode`](BaseNode.md).[`removeFromParent`](BaseNode.md#removefromparent)
