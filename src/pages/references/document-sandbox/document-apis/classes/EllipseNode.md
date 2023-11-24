[@express-document-sdk](../overview.md) / EllipseNode

# Class: EllipseNode

An EllipseNode represents an ellipse object in the scenegraph.

## Hierarchy

- [`FillableNode`](FillableNode.md)

  ↳ **`EllipseNode`**

## Table of contents

### Accessors

- [allChildren](EllipseNode.md#allchildren)
- [blendMode](EllipseNode.md#blendmode)
- [fills](EllipseNode.md#fills)
- [locked](EllipseNode.md#locked)
- [opacity](EllipseNode.md#opacity)
- [parent](EllipseNode.md#parent)
- [rotation](EllipseNode.md#rotation)
- [rotationInScreen](EllipseNode.md#rotationinscreen)
- [rx](EllipseNode.md#rx)
- [ry](EllipseNode.md#ry)
- [strokes](EllipseNode.md#strokes)
- [transformMatrix](EllipseNode.md#transformmatrix)
- [translation](EllipseNode.md#translation)
- [type](EllipseNode.md#type)

### Methods

- [removeFromParent](EllipseNode.md#removefromparent)
- [setPositionInParent](EllipseNode.md#setpositioninparent)
- [setRotationInParent](EllipseNode.md#setrotationinparent)

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

### fills

• `get` **fills**(): [`ItemList`](ItemList.md)<[`Fill`](../interfaces/Fill.md)\>

Any fill(s) on the shape. Use the methods on this ItemList object to get, add, and remove fills.

#### Returns

[`ItemList`](ItemList.md)<[`Fill`](../interfaces/Fill.md)\>

#### Inherited from

FillableNode.fills

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

### rx

• `get` **rx**(): `number`

The radius of the ellipse on the x-axis.

#### Returns

`number`

• `set` **rx**(`value`): `void`

Set the ellipse radius on the x-axis.
Must be at least MIN_DIMENSION / 2.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### ry

• `get` **ry**(): `number`

The radius of the ellipse on the y-axis.

#### Returns

`number`

• `set` **ry**(`value`): `void`

Set the ellipse radius on the y-axis.
Must be at least MIN_DIMENSION / 2.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### strokes

• `get` **strokes**(): [`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

Any stroke(s) on the shape. Use the methods on this ItemList object to get, add, and remove strokes.

#### Returns

[`ItemList`](ItemList.md)<[`Stroke`](../interfaces/Stroke.md)\>

#### Inherited from

FillableNode.strokes

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

## Methods

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
