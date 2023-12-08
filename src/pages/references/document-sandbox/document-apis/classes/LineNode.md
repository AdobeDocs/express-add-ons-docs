[@express-document-sdk](../overview.md) / LineNode

# Class: LineNode

A LineNode represents a simple line object in the scenegraph – a single straight-line segment.

## Hierarchy

- [`StrokableNode`](StrokableNode.md)

  ↳ **`LineNode`**

## Table of contents

### Properties

- [DEFAULT\_END\_X](LineNode.md#default_END_X)
- [DEFAULT\_END\_Y](LineNode.md#default_END_Y)
- [DEFAULT\_START\_X](LineNode.md#default_START_X)
- [DEFAULT\_START\_Y](LineNode.md#default_START_Y)

### Accessors

- [allChildren](LineNode.md#allchildren)
- [blendMode](LineNode.md#blendmode)
- [endArrowHeadType](LineNode.md#endarrowheadtype)
- [endX](LineNode.md#endx)
- [endY](LineNode.md#endy)
- [locked](LineNode.md#locked)
- [opacity](LineNode.md#opacity)
- [parent](LineNode.md#parent)
- [rotation](LineNode.md#rotation)
- [rotationInScreen](LineNode.md#rotationinscreen)
- [startArrowHeadType](LineNode.md#startarrowheadtype)
- [startX](LineNode.md#startx)
- [startY](LineNode.md#starty)
- [stroke](LineNode.md#stroke)
- [transformMatrix](LineNode.md#transformmatrix)
- [translation](LineNode.md#translation)
- [type](LineNode.md#type)

### Methods

- [removeFromParent](LineNode.md#removefromparent)
- [setEndPoints](LineNode.md#setendpoints)
- [setPositionInParent](LineNode.md#setpositioninparent)
- [setRotationInParent](LineNode.md#setrotationinparent)

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

## Accessors

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](Node.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

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

The shape encapsulating the end of a line.

Returns [none](../enums/ArrowHeadType.md#none) if there is no stroke on the line.

#### Returns

[`ArrowHeadType`](../enums/ArrowHeadType.md)

• `set` **endArrowHeadType**(`type`): `void`

The setter sets a default stroke on the line if it did not have one.

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

• `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. Undefined if the node is an orphan, or if the node is the artwork root.

#### Returns

`undefined` \| [`BaseNode`](BaseNode.md)

#### Inherited from

StrokableNode.parent

___

### rotation

• `get` **rotation**(): `number`

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

#### Returns

`number`

#### Inherited from

StrokableNode.rotation

___

### rotationInScreen

• `get` **rotationInScreen**(): `number`

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

#### Returns

`number`

#### Inherited from

StrokableNode.rotationInScreen

___

### startArrowHeadType

• `get` **startArrowHeadType**(): [`ArrowHeadType`](../enums/ArrowHeadType.md)

The shape encapsulating the start of a line.

Returns [none](../enums/ArrowHeadType.md#none) if there is no stroke on the line.

#### Returns

[`ArrowHeadType`](../enums/ArrowHeadType.md)

• `set` **startArrowHeadType**(`type`): `void`

The setter sets a default stroke on the line if it did not have one.

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

### stroke

• `get` **stroke**(): `undefined` \| `Readonly`<[`Stroke`](../interfaces/Stroke.md)\>

The stroke applied to the shape, if any.

#### Returns

`undefined` \| `Readonly`<[`Stroke`](../interfaces/Stroke.md)\>

#### Inherited from

StrokableNode.stroke

• `set` **stroke**(`stroke`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stroke` | `undefined` \| [`Stroke`](../interfaces/Stroke.md) |

#### Returns

`void`

#### Inherited from

StrokableNode.stroke

___

### transformMatrix

• `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

StrokableNode.transformMatrix

___

### translation

• `get` **translation**(): `Readonly`<{ `x`: `number` ; `y`: `number`  }\>

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

#### Returns

`Readonly`<{ `x`: `number` ; `y`: `number`  }\>

#### Inherited from

StrokableNode.translation

• `set` **translation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |
| `value.x` | `number` |
| `value.y` | `number` |

#### Returns

`void`

#### Inherited from

StrokableNode.translation

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
differ from its parent's coordinate space based on `transformMatrix`, i.e.
`rotation` and `translation`). The values passed in may be normalized
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

___

### setPositionInParent

▸ **setPositionInParent**(`parentPoint`, `localRegistrationPoint`): `void`

Move the node so the given `localRegistrationPoint` in its local coordinates is placed at the given
`parentPoint` in its parent's coordinates (taking into account any rotation on this node, etc.).

**`Example`**

Center a rectangle within its parent artboard:

```js
rectangle.setPositionInParent(
    { x: artboard.width / 2, y: artboard.height / 2 },
    { x: rectangle.width / 2, y: rectangle.height / 2 }
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentPoint` | [`Point`](../interfaces/Point.md) | Point in this node's parent's coordinate space to move `localRegistrationPoint` to |
| `localRegistrationPoint` | [`Point`](../interfaces/Point.md) | Point in this node's local coordinate space to align with `parentPoint` |

#### Returns

`void`

#### Inherited from

[StrokableNode](StrokableNode.md).[setPositionInParent](StrokableNode.md#setpositioninparent)

___

### setRotationInParent

▸ **setRotationInParent**(`angleInDegrees`, `localRotationPoint`): `void`

Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the
node’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already
have had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other
ancestors have any rotation of their own.

**`Example`**

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, { x: rectangle.width / 2, y: rectangle.height / 2 });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angleInDegrees` | `number` | Angle in degrees. |
| `localRotationPoint` | [`Point`](../interfaces/Point.md) | Point to rotate around, in node's local coordinates. |

#### Returns

`void`

#### Inherited from

[StrokableNode](StrokableNode.md).[setRotationInParent](StrokableNode.md#setrotationinparent)
