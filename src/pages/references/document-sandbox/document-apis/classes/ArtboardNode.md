[@express-document-sdk](../overview.md) / ArtboardNode

# Class: ArtboardNode

An ArtboardNode represents an artboard object in the scenegraph. All user visual content must be contained on an artboard.

When multiple artboards exist on a page, the artboards represent "scenes" in a linear timeline sequence.

## Hierarchy

- [`BaseNode`](BaseNode.md)

  ↳ **`ArtboardNode`**

## Implements

- [`IRectangularNode`](../interfaces/IRectangularNode.md)
- [`ContainerNode`](../interfaces/ContainerNode.md)

## Table of contents

### Accessors

- [allChildren](ArtboardNode.md#allchildren)
- [children](ArtboardNode.md#children)
- [fill](ArtboardNode.md#fill)
- [height](ArtboardNode.md#height)
- [parent](ArtboardNode.md#parent)
- [type](ArtboardNode.md#type)
- [width](ArtboardNode.md#width)

### Methods

- [removeFromParent](ArtboardNode.md#removefromparent)

## Accessors

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](Node.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of an Artboard are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

#### Implementation of

ContainerNode.allChildren

#### Overrides

BaseNode.allChildren

___

### children

• `get` **children**(): [`ItemList`](ItemList.md)<[`Node`](Node.md)\>

The node's children. Use the methods on this ItemList object to get, add, and remove children.

#### Returns

[`ItemList`](ItemList.md)<[`Node`](Node.md)\>

#### Implementation of

ContainerNode.children

___

### fill

• `get` **fill**(): [`Fill`](../interfaces/Fill.md)

The background fill of the artboard. Artboards must always have a fill.

#### Returns

[`Fill`](../interfaces/Fill.md)

• `set` **fill**(`fill`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fill` | [`Fill`](../interfaces/Fill.md) |

#### Returns

`void`

___

### height

• `get` **height**(): `number`

The height of the artboard.

#### Returns

`number`

#### Implementation of

[IRectangularNode](../interfaces/IRectangularNode.md).[height](../interfaces/IRectangularNode.md#height)

___

### parent

• `get` **parent**(): `undefined` \| [`PageNode`](PageNode.md)

The node's parent. Undefined if the node is an orphan.

#### Returns

`undefined` \| [`PageNode`](PageNode.md)

#### Implementation of

ContainerNode.parent

#### Overrides

BaseNode.parent

___

### type

• `get` **type**(): [`SceneNodeType`](../enums/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enums/SceneNodeType.md)

#### Implementation of

ContainerNode.type

#### Inherited from

BaseNode.type

___

### width

• `get` **width**(): `number`

The width of the artboard.

#### Returns

`number`

#### Implementation of

[IRectangularNode](../interfaces/IRectangularNode.md).[width](../interfaces/IRectangularNode.md#width)

## Methods

### removeFromParent

▸ **removeFromParent**(): `void`

Removes the node from its parent - for a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`.
For nodes with other slots, removes the child from whichever slot it resides in, if possible. Throws if the slot does
not support removal. Also throws if node is the artwork root. No-op if node is already an orphan.

#### Returns

`void`

#### Implementation of

[ContainerNode](../interfaces/ContainerNode.md).[removeFromParent](../interfaces/ContainerNode.md#removefromparent)

#### Inherited from

[BaseNode](BaseNode.md).[removeFromParent](BaseNode.md#removefromparent)
