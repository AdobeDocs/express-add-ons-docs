[@express-document-sdk](../overview.md) / RectangleNode

# Class: RectangleNode

A RectangleNode represents a rectangle object in the scenegraph.

## Hierarchy

- [`FillableNode`](FillableNode.md)

  ↳ **`RectangleNode`**

## Implements

- [`IRectangularNode`](../interfaces/IRectangularNode.md)

## Table of contents

### Accessors

- [allChildren](RectangleNode.md#allchildren)
- [blendMode](RectangleNode.md#blendmode)
- [bottomLeftRadius](RectangleNode.md#bottomleftradius)
- [bottomRightRadius](RectangleNode.md#bottomrightradius)
- [fills](RectangleNode.md#fills)
- [height](RectangleNode.md#height)
- [locked](RectangleNode.md#locked)
- [opacity](RectangleNode.md#opacity)
- [parent](RectangleNode.md#parent)
- [rotation](RectangleNode.md#rotation)
- [rotationInScreen](RectangleNode.md#rotationinscreen)
- [strokes](RectangleNode.md#strokes)
- [topLeftRadius](RectangleNode.md#topleftradius)
- [topRightRadius](RectangleNode.md#toprightradius)
- [transformMatrix](RectangleNode.md#transformmatrix)
- [translation](RectangleNode.md#translation)
- [type](RectangleNode.md#type)
- [width](RectangleNode.md#width)

### Methods

- [getUniformCornerRadius](RectangleNode.md#getuniformcornerradius)
- [removeFromParent](RectangleNode.md#removefromparent)
- [setPositionInParent](RectangleNode.md#setpositioninparent)
- [setRotationInParent](RectangleNode.md#setrotationinparent)
- [setUniformCornerRadius](RectangleNode.md#setuniformcornerradius)

## Accessors

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

### rotation

• `get` **rotation**(): `number`

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

#### Returns

`number`

#### Inherited from

FillableNode.rotation

___

### rotationInScreen

• `get` **rotationInScreen**(): `number`

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

#### Returns

`number`

#### Inherited from

FillableNode.rotationInScreen

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

### transformMatrix

• `get` **transformMatrix**(): `https://glmatrix.net/docs/module-mat2d.html`

The node's transform matrix relative to its parent.

#### Returns

`https://glmatrix.net/docs/module-mat2d.html`

#### Inherited from

FillableNode.transformMatrix

___

### translation

• `get` **translation**(): `Readonly`<{ `x`: `number` ; `y`: `number`  }\>

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

#### Returns

`Readonly`<{ `x`: `number` ; `y`: `number`  }\>

#### Inherited from

FillableNode.translation

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

FillableNode.translation

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

### setPositionInParent

▸ **setPositionInParent**(`parentPoint`, `localRegistrationPoint`): `void`

Move the node so the given `localRegistrationPoint` in its local coordinates is placed at the given
`parentPoint` in its parent's coordinates (taking into account any rotation on this node, etc.).

**`Example`**

Center a rectangle within its parent artboard:
```
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

[FillableNode](FillableNode.md).[setPositionInParent](FillableNode.md#setpositioninparent)

___

### setRotationInParent

▸ **setRotationInParent**(`angleInDegrees`, `localRotationPoint`): `void`

Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the
node’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already
have had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other
ancestors have any rotation of their own.

**`Example`**

Rotate the rectangle 45 degrees clockwise around its centerpoint:
```
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

[FillableNode](FillableNode.md).[setRotationInParent](FillableNode.md#setrotationinparent)

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
