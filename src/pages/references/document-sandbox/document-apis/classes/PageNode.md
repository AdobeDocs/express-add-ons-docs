[@express-document-sdk](../overview.md) / PageNode

# Class: PageNode

A PageNode represents a page in the document. A page contains one or more artboards, representing "scenes" in a linear
timeline sequence. Those artboards in turn contain all the visual content of the document.

## Hierarchy

- [`BaseNode`](BaseNode.md)

  ↳ **`PageNode`**

## Implements

- `Readonly`<[`IRectangularNode`](../interfaces/IRectangularNode.md)\>

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

#### Inherited from

BaseNode.allChildren

___

### artboards

• `get` **artboards**(): [`ArtboardList`](ArtboardList.md)

The artboards or "scenes" of a page, ordered by timeline sequence.

#### Returns

[`ArtboardList`](ArtboardList.md)

___

### height

• `get` **height**(): `number`

The height of the node.
All Artboards within a page share the same dimensions.

#### Returns

`number`

#### Implementation of

Readonly.height

___

### name

• `get` **name**(): `undefined` \| `string`

The page's name. Displayed as a user-editable label above the current artboard in the UI.

#### Returns

`undefined` \| `string`

• `set` **name**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `undefined` \| `string` |

#### Returns

`void`

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

___

### width

• `get` **width**(): `number`

The width of the node.
All Artboards within a page share the same dimensions.

#### Returns

`number`

#### Implementation of

Readonly.width

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

[BaseNode](BaseNode.md).[removeFromParent](BaseNode.md#removefromparent)
