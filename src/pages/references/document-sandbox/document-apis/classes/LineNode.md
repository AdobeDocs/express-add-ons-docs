[@express-document-sdk](../overview.md) / LineNode

# Class: LineNode

A LineNode represents a simple line object in the scenegraph – a single straight-line segment.

## Hierarchy

- [`StrokableNode`](StrokableNode.md)

  ↳ **`LineNode`**

## Table of contents

### Properties

- [DEFAULT\_END\_X](LineNode.md#DEFAULT_END_X)
- [DEFAULT\_END\_Y](LineNode.md#DEFAULT_END_Y)
- [DEFAULT\_START\_X](LineNode.md#DEFAULT_START_X)
- [DEFAULT\_START\_Y](LineNode.md#DEFAULT_START_Y)
- [DEFAULT\_STROKE\_WIDTH](LineNode.md#DEFAULT_STROKE_WIDTH)

### Accessors

- [absoluteRotation](LineNode.md#absoluterotation)
- [absoluteTransform](LineNode.md#absolutetransform)
- [allChildren](LineNode.md#allchildren)
- [blendMode](LineNode.md#blendmode)
- [endArrowHeadType](LineNode.md#endarrowheadtype)
- [endX](LineNode.md#endX)
- [endY](LineNode.md#endY)
- [locked](LineNode.md#locked)
- [opacity](LineNode.md#opacity)
- [parent](LineNode.md#parent)
- [relativeRotation](LineNode.md#relativerotation)
- [relativeTransform](LineNode.md#relativetransform)
- [startArrowHeadType](LineNode.md#startarrowheadtype)
- [startX](LineNode.md#startX)
- [startY](LineNode.md#startY)
- [strokes](LineNode.md#strokes)
- [translateX](LineNode.md#translateX)
- [translateY](LineNode.md#translateY)
- [type](LineNode.md#type)

### Methods

- [removeFromParent](LineNode.md#removefromparent)
- [setEndPoints](LineNode.md#setendpoints)

## Properties

### DEFAULT\_END\_X

▪ `Static` `Readonly` **DEFAULT\_END\_X**: ``100``

___

### DEFAULT\_END\_Y

▪ `Static` `Readonly` **DEFAULT\_END\_Y**: ``100``

___

### DEFAULT\_START\_X

▪ `Static` `Readonly` **DEFAULT\_START\_X**: ``0``

___

### DEFAULT\_START\_Y

▪ `Static` `Readonly` **DEFAULT\_START\_Y**: ``0``

___

### DEFAULT\_STROKE\_WIDTH

▪ `Static` **DEFAULT\_STROKE\_WIDTH**: `number` = `20`

#### Inherited from

[StrokableNode](StrokableNode.md).[DEFAULT_STROKE_WIDTH](StrokableNode.md#DEFAULT_STROKE_WIDTH)

## Accessors

### absoluteRotation

• `get` **absoluteRotation**(): `number`

The node's absolute (global) rotation angle in degrees – includes any cumulative rotation from the node's parent containers.

#### Returns

`number`

#### Inherited from

StrokableNode.absoluteRotation

• `set` **absoluteRotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

StrokableNode.absoluteRotation

___

### absoluteTransform

• `get` **absoluteTransform**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's absolute (global) transform matrix.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

StrokableNode.absoluteTransform

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

StrokableNode.allChildren

___

### blendMode

• `get` **blendMode**(): [`BlendMode`](../enums/BlendMode.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[normal](../enums/BlendMode.md#normal) for most nodes, and [passThrough](../enums/BlendMode.md#passthrough) for GroupNodes.

#### Returns

[`BlendMode`](../enums/BlendMode.md)

#### Inherited from

StrokableNode.blendMode

• `set` **blendMode**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BlendMode`](../enums/BlendMode.md) |

#### Returns

`void`

#### Inherited from

StrokableNode.blendMode

___

### endArrowHeadType

• `get` **endArrowHeadType**(): [`ArrowHeadType`](../enums/ArrowHeadType.md)

The shape encapsulating the end of a line. The size and color of the arrowhead
depends on the first available stroke's weight and color assigned to the node.
Removal of all strokes on this line leads to the arrowhead's removal.

The getter returns [none](../enums/ArrowHeadType.md#none) when there are no strokes on the line
or no arrowhead on the first stroke of the line.

#### Returns

[`ArrowHeadType`](../enums/ArrowHeadType.md)

• `set` **endArrowHeadType**(`type`): `void`

The setter creates a default stroke for the line when there are no strokes on the line,
and updates the arrowhead on only the first stroke of the line.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`ArrowHeadType`](../enums/ArrowHeadType.md) |

#### Returns

`void`

___

### endX

• `get` **endX**(): `number`

The end point on the x-axis in the parent's coordinate system. Modify using `setEndPoints()`.

#### Returns

`number`

___

### endY

• `get` **endY**(): `number`

The end point on the y-axis in the parent's coordinate system. Modify using `setEndPoints()`.

#### Returns

`number`

___

### locked

• `get` **locked**(): `boolean`

The node's lock/unlock state. Locked nodes are excluded from the selection (see [selection](Context.md#selection)), and
cannot be edited by the user unless they are unlocked first.

#### Returns

`boolean`

#### Inherited from

StrokableNode.locked

• `set` **locked**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

#### Inherited from

StrokableNode.locked

___

### opacity

• `get` **opacity**(): `number`

The node's opacity, from 0.0 to 1.0

#### Returns

`number`

#### Inherited from

StrokableNode.opacity

• `set` **opacity**(`opacity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

`void`

#### Inherited from

StrokableNode.opacity

___

### parent

• `get` **parent**(): `undefined` \| [`Node`](Node.md)

The node's parent. Undefined if the node is an orphan, or if the node is the artwork root.

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

StrokableNode.parent

___

### relativeRotation

• `get` **relativeRotation**(): `number`

The node's local rotation value in degrees, relative to its parent's axes. Modifying this value will also adjust the
node's x & y translation such that the node's center is in the same location after the rotation – i.e. this setter
rotates the node about its bounding box's center, not its origin.

#### Returns

`number`

#### Inherited from

StrokableNode.relativeRotation

• `set` **relativeRotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

StrokableNode.relativeRotation

___

### relativeTransform

• `get` **relativeTransform**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

StrokableNode.relativeTransform

___

### startArrowHeadType

• `get` **startArrowHeadType**(): [`ArrowHeadType`](../enums/ArrowHeadType.md)

The shape encapsulating the start of a line. The size and color of the arrowhead
depends on the first available stroke's weight and color assigned to the node.
Removal of all strokes on this line leads to the arrowhead's removal.

The getter returns [none](../enums/ArrowHeadType.md#none) when there are no strokes on the line
or no arrowhead on the first stroke of the line.

#### Returns

[`ArrowHeadType`](../enums/ArrowHeadType.md)

• `set` **startArrowHeadType**(`type`): `void`

The setter creates a default stroke for the line when there are no strokes on the line,
and updates the arrowhead on only the first stroke of the line.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`ArrowHeadType`](../enums/ArrowHeadType.md) |

#### Returns

`void`

___

### startX

• `get` **startX**(): `number`

The start point on the x-axis in the parent's coordinate system. Modify using `setEndPoints()`.

#### Returns

`number`

___

### startY

• `get` **startY**(): `number`

The start point on the y-axis in the parent's coordinate system. Modify using `setEndPoints()`.

#### Returns

`number`

___

### strokes

• `get` **strokes**(): [`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

Any stroke(s) on the shape. Use the methods on this ItemList object to get, add, and remove strokes.

#### Returns

[`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

#### Inherited from

StrokableNode.strokes

___

### translateX

• `get` **translateX**(): `number`

The translation of the node along its parent's x-axis.

#### Returns

`number`

#### Inherited from

StrokableNode.translateX

• `set` **translateX**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

StrokableNode.translateX

___

### translateY

• `get` **translateY**(): `number`

The translation of the node along its parent's y-axis.

#### Returns

`number`

#### Inherited from

StrokableNode.translateY

• `set` **translateY**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

StrokableNode.translateY

___

### type

• `get` **type**(): [`SceneNodeType`](../enums/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enums/SceneNodeType.md)

#### Inherited from

StrokableNode.type

## Methods

### removeFromParent

▸ **removeFromParent**(): `void`

Removes the node from its parent - for a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`.
For nodes with other slots, removes the child from whichever slot it resides in, if possible. Throws if the slot does
not support removal. Also throws if node is the artwork root. No-op if node is already an orphan.

#### Returns

`void`

#### Inherited from

[StrokableNode](StrokableNode.md).[removeFromParent](StrokableNode.md#removefromparent)

___

### setEndPoints

▸ **setEndPoints**(`startX`, `startY`, `endX`, `endY`): `void`

Set the start and end points of the line in its local coordinate space (which may
differ from its parent's coordinate space based on `relativeTransform`, i.e.
`relativeRotation` and `translateX`/`Y`). The values passed in may be normalized
by this setter, shifting the node's translation and counter-shifting the start/end
points. Therefore, the start/end getters may return values different from the values
you passed into this setter, even though the line's visual bounds and appearance are
the same. Rotation is preserved.

#### Parameters

| Name | Type |
| :------ | :------ |
| `startX` | `number` |
| `startY` | `number` |
| `endX` | `number` |
| `endY` | `number` |

#### Returns

`void`
