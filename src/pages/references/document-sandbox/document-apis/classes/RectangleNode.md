[@express-document-sdk](../overview.md) / RectangleNode

# Class: RectangleNode

A RectangleNode represents a rectangle object in the scenegraph.

## Hierarchy

- [`FillableNode`](FillableNode.md)

  ↳ **`RectangleNode`**

## Implements

- [`IRectangularNode`](../interfaces/IRectangularNode.md)

## Table of contents

### Properties

- [DEFAULT\_STROKE\_WIDTH](RectangleNode.md#DEFAULT_STROKE_WIDTH)

### Accessors

- [absoluteRotation](RectangleNode.md#absoluterotation)
- [absoluteTransform](RectangleNode.md#absolutetransform)
- [allChildren](RectangleNode.md#allchildren)
- [blendMode](RectangleNode.md#blendmode)
- [bottomLeftRadius](RectangleNode.md#bottomleftradius)
- [bottomRightRadius](RectangleNode.md#bottomrightradius)
- [fills](RectangleNode.md#fills)
- [height](RectangleNode.md#height)
- [locked](RectangleNode.md#locked)
- [opacity](RectangleNode.md#opacity)
- [parent](RectangleNode.md#parent)
- [relativeRotation](RectangleNode.md#relativerotation)
- [relativeTransform](RectangleNode.md#relativetransform)
- [strokes](RectangleNode.md#strokes)
- [topLeftRadius](RectangleNode.md#topleftradius)
- [topRightRadius](RectangleNode.md#toprightradius)
- [translateX](RectangleNode.md#translateX)
- [translateY](RectangleNode.md#translateY)
- [type](RectangleNode.md#type)
- [width](RectangleNode.md#width)

### Methods

- [getUniformCornerRadius](RectangleNode.md#getuniformcornerradius)
- [removeFromParent](RectangleNode.md#removefromparent)
- [setUniformCornerRadius](RectangleNode.md#setuniformcornerradius)

## Properties

### DEFAULT\_STROKE\_WIDTH

▪ `Static` **DEFAULT\_STROKE\_WIDTH**: `number` = `20`

#### Inherited from

[FillableNode](FillableNode.md).[DEFAULT_STROKE_WIDTH](FillableNode.md#DEFAULT_STROKE_WIDTH)

## Accessors

### absoluteRotation

• `get` **absoluteRotation**(): `number`

The node's absolute (global) rotation angle in degrees – includes any cumulative rotation from the node's parent containers.

#### Returns

`number`

#### Inherited from

FillableNode.absoluteRotation

• `set` **absoluteRotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

FillableNode.absoluteRotation

___

### absoluteTransform

• `get` **absoluteTransform**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's absolute (global) transform matrix.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

FillableNode.absoluteTransform

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

FillableNode.allChildren

___

### blendMode

• `get` **blendMode**(): [`BlendMode`](../enums/BlendMode.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[normal](../enums/BlendMode.md#normal) for most nodes, and [passThrough](../enums/BlendMode.md#passthrough) for GroupNodes.

#### Returns

[`BlendMode`](../enums/BlendMode.md)

#### Inherited from

FillableNode.blendMode

• `set` **blendMode**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BlendMode`](../enums/BlendMode.md) |

#### Returns

`void`

#### Inherited from

FillableNode.blendMode

___

### bottomLeftRadius

• `get` **bottomLeftRadius**(): `number`

The radius of the bottom left corner, or 0 if the corner is not rounded.

**`Remarks`**

The actual corner radius that is rendered is capped based on the size of the rectangle
even if the radius value set here is higher.

#### Returns

`number`

• `set` **bottomLeftRadius**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### bottomRightRadius

• `get` **bottomRightRadius**(): `number`

The radius of the bottom right corner, or 0 if the corner is not rounded.

**`Remarks`**

The actual corner radius that is rendered is capped based on the size of the rectangle
even if the radius value set here is higher.

#### Returns

`number`

• `set` **bottomRightRadius**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### fills

• `get` **fills**(): [`ItemList`](ItemList.md)<[`Fill`](../interfaces/Fill.md)\>

Any fill(s) on the shape. Use the methods on this ItemList object to get, add, and remove fills.

#### Returns

[`ItemList`](ItemList.md)<[`Fill`](../interfaces/Fill.md)\>

#### Inherited from

FillableNode.fills

___

### height

• `get` **height**(): `number`

The height of the node.
Must be at least MIN_DIMENSION.

#### Returns

`number`

#### Implementation of

[IRectangularNode](../interfaces/IRectangularNode.md).[height](../interfaces/IRectangularNode.md#height)

• `set` **height**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

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

FillableNode.locked

• `set` **locked**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

#### Inherited from

FillableNode.locked

___

### opacity

• `get` **opacity**(): `number`

The node's opacity, from 0.0 to 1.0

#### Returns

`number`

#### Inherited from

FillableNode.opacity

• `set` **opacity**(`opacity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | `number` |

#### Returns

`void`

#### Inherited from

FillableNode.opacity

___

### parent

• `get` **parent**(): `undefined` \| [`Node`](Node.md)

The node's parent. Undefined if the node is an orphan, or if the node is the artwork root.

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

FillableNode.parent

___

### relativeRotation

• `get` **relativeRotation**(): `number`

The node's local rotation value in degrees, relative to its parent's axes. Modifying this value will also adjust the
node's x & y translation such that the node's center is in the same location after the rotation – i.e. this setter
rotates the node about its bounding box's center, not its origin.

#### Returns

`number`

#### Inherited from

FillableNode.relativeRotation

• `set` **relativeRotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

FillableNode.relativeRotation

___

### relativeTransform

• `get` **relativeTransform**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

FillableNode.relativeTransform

___

### strokes

• `get` **strokes**(): [`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

Any stroke(s) on the shape. Use the methods on this ItemList object to get, add, and remove strokes.

#### Returns

[`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

#### Inherited from

FillableNode.strokes

___

### topLeftRadius

• `get` **topLeftRadius**(): `number`

The radius of the top left corner, or 0 if the corner is not rounded.

**`Remarks`**

The actual corner radius that is rendered is capped based on the size of the rectangle
even if the radius value set here is higher.

#### Returns

`number`

• `set` **topLeftRadius**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### topRightRadius

• `get` **topRightRadius**(): `number`

The radius of the top right corner, or 0 if the corner is not rounded.

**`Remarks`**

The actual corner radius that is rendered is capped based on the size of the rectangle
even if the radius value set here is higher.

#### Returns

`number`

• `set` **topRightRadius**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### translateX

• `get` **translateX**(): `number`

The translation of the node along its parent's x-axis.

#### Returns

`number`

#### Inherited from

FillableNode.translateX

• `set` **translateX**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

FillableNode.translateX

___

### translateY

• `get` **translateY**(): `number`

The translation of the node along its parent's y-axis.

#### Returns

`number`

#### Inherited from

FillableNode.translateY

• `set` **translateY**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

FillableNode.translateY

___

### type

• `get` **type**(): [`SceneNodeType`](../enums/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enums/SceneNodeType.md)

#### Inherited from

FillableNode.type

___

### width

• `get` **width**(): `number`

The width of the node.
Must be at least MIN_DIMENSION.

#### Returns

`number`

#### Implementation of

[IRectangularNode](../interfaces/IRectangularNode.md).[width](../interfaces/IRectangularNode.md#width)

• `set` **width**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Implementation of

[IRectangularNode](../interfaces/IRectangularNode.md).[width](../interfaces/IRectangularNode.md#width)

## Methods

### getUniformCornerRadius

▸ **getUniformCornerRadius**(): `undefined` \| `number`

If all corners have the same rounding radius value, returns that value (or 0 if all corners are not rounded).
If the corner radii differ, returns undefined.

#### Returns

`undefined` \| `number`

___

### removeFromParent

▸ **removeFromParent**(): `void`

Removes the node from its parent - for a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`.
For nodes with other slots, removes the child from whichever slot it resides in, if possible. Throws if the slot does
not support removal. Also throws if node is the artwork root. No-op if node is already an orphan.

#### Returns

`void`

#### Inherited from

[FillableNode](FillableNode.md).[removeFromParent](FillableNode.md#removefromparent)

___

### setUniformCornerRadius

▸ **setUniformCornerRadius**(`radius`): `void`

Set all corner radii to the same value. Set to 0 to make the corners non-rounded.

**`Remarks`**

The actual corner radius that is rendered is capped based on the size of the rectangle
even if the radius value set here is higher.

#### Parameters

| Name | Type |
| :------ | :------ |
| `radius` | `number` |

#### Returns

`void`
