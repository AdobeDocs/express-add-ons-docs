[@add-on-hlapi-sdk](../overview.md) / ArtboardNode

# Class: ArtboardNode

An ArtboardNode represents an artboard object in the scenegraph. All user visual content must be contained on an artboard.

When multiple artboards exist on a page, the artboards represent "scenes" in a linear timeline sequence.

## Hierarchy

- [`ContainerNode`](ContainerNode.md)

  ↳ **`ArtboardNode`**

## Implements

- [`IRectangularNode`](../interfaces/IRectangularNode.md)
- [`IStrokableNode`](../interfaces/IStrokableNode.md)

## Table of contents

### Accessors

- [absoluteRotation](ArtboardNode.md#absoluteRotation)
- [absoluteTransform](ArtboardNode.md#absoluteTransform)
- [allChildren](ArtboardNode.md#allChildren)
- [blendMode](ArtboardNode.md#blendMode)
- [children](ArtboardNode.md#children)
- [fill](ArtboardNode.md#fill)
- [height](ArtboardNode.md#height)
- [locked](ArtboardNode.md#locked)
- [opacity](ArtboardNode.md#opacity)
- [parent](ArtboardNode.md#parent)
- [relativeRotation](ArtboardNode.md#relativeRotation)
- [relativeTransform](ArtboardNode.md#relativeTransform)
- [strokes](ArtboardNode.md#strokes)
- [translateX](ArtboardNode.md#translateX)
- [translateY](ArtboardNode.md#translateY)
- [type](ArtboardNode.md#type)
- [width](ArtboardNode.md#width)

### Methods

- [removeFromParent](ArtboardNode.md#removeFromParent)

## Accessors

### absoluteRotation

• `get` **absoluteRotation**(): `number`

The node's absolute (global) rotation angle in degrees – includes any cumulative rotation from the node's parent containers.

#### Returns

`number`

#### Inherited from

ContainerNode.absoluteRotation

• `set` **absoluteRotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

ContainerNode.absoluteRotation

___

### absoluteTransform

• `get` **absoluteTransform**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's absolute (global) transform matrix.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

ContainerNode.absoluteTransform

___

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](Node.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [children](ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

#### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

#### Inherited from

ContainerNode.allChildren

___

### blendMode

• `get` **blendMode**(): [`BlendModeValue`](../enums/BlendModeValue.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[normal](../enums/BlendModeValue.md#normal) for most nodes, and [passThrough](../enums/BlendModeValue.md#passThrough) for GroupNodes.

#### Returns

[`BlendModeValue`](../enums/BlendModeValue.md)

#### Inherited from

ContainerNode.blendMode

• `set` **blendMode**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BlendModeValue`](../enums/BlendModeValue.md) |

#### Returns

`void`

#### Inherited from

ContainerNode.blendMode

___

### children

• `get` **children**(): [`ItemList`](ItemList.md)<[`Node`](Node.md)\>

The node's children. Use the methods on this ItemList object to get, add, and remove children.

#### Returns

[`ItemList`](ItemList.md)<[`Node`](Node.md)\>

#### Inherited from

ContainerNode.children

___

### fill

• `get` **fill**(): [`Fill`](../interfaces/Fill.md)

The background fill of the artboard.

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

### locked

• `get` **locked**(): `boolean`

The node's lock/unlock state. Locked nodes are excluded from the selection (see [selection](Context.md#selection)), and
cannot be edited by the user unless they are unlocked first.

#### Returns

`boolean`

#### Inherited from

ContainerNode.locked

• `set` **locked**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

#### Inherited from

ContainerNode.locked

___

### opacity

• `get` **opacity**(): `number`

The node's opacity, from 0.0 to 1.0

#### Returns

`number`

#### Inherited from

ContainerNode.opacity

• `set` **opacity**(`opacity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

`void`

#### Inherited from

ContainerNode.opacity

___

### parent

• `get` **parent**(): `undefined` \| [`PageNode`](PageNode.md)

The node's parent. Undefined if the node is an orphan.

#### Returns

`undefined` \| [`PageNode`](PageNode.md)

#### Overrides

ContainerNode.parent

___

### relativeRotation

• `get` **relativeRotation**(): `number`

The node's local rotation value in degrees, relative to its parent's axes. Modifying this value will also adjust the
node's x & y translation such that the node's center is in the same location after the rotation – i.e. this setter
rotates the node about its bounding box's center, not its origin.

#### Returns

`number`

#### Inherited from

ContainerNode.relativeRotation

• `set` **relativeRotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

ContainerNode.relativeRotation

___

### relativeTransform

• `get` **relativeTransform**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

ContainerNode.relativeTransform

___

### strokes

• `get` **strokes**(): [`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

Any strokes(s) on the shape. Use the methods on this ItemList object to get, add, and remove strokes.

#### Returns

[`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

#### Implementation of

[IStrokableNode](../interfaces/IStrokableNode.md).[strokes](../interfaces/IStrokableNode.md#strokes)

___

### translateX

• `get` **translateX**(): `number`

The translation of the node along its parent's x-axis.

#### Returns

`number`

#### Inherited from

ContainerNode.translateX

• `set` **translateX**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

ContainerNode.translateX

___

### translateY

• `get` **translateY**(): `number`

The translation of the node along its parent's y-axis.

#### Returns

`number`

#### Inherited from

ContainerNode.translateY

• `set` **translateY**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

ContainerNode.translateY

___

### type

• `get` **type**(): [`SceneNodeTypeValueID`](../enums/SceneNodeTypeValueID.md)

The node's type.

#### Returns

[`SceneNodeTypeValueID`](../enums/SceneNodeTypeValueID.md)

#### Inherited from

ContainerNode.type

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

#### Inherited from

[ContainerNode](ContainerNode.md).[removeFromParent](ContainerNode.md#removeFromParent)
