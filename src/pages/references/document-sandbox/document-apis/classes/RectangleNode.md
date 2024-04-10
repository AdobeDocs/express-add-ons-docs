[@express-document-sdk](../overview.md) / RectangleNode

# Class: RectangleNode

A RectangleNode represents a rectangle object in the scenegraph.

## Hierarchy

- [`FillableNode`](FillableNode.md)

  ↳ **`RectangleNode`**

## Implements

- [`IRectangularNode`](../interfaces/IRectangularNode.md)

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

### boundsInParent

• `get` **boundsInParent**(): `Readonly`<`Rect`\>

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](RectangleNode.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

#### Returns

`Readonly`<`Rect`\>

#### Inherited from

FillableNode.boundsInParent

___

### boundsLocal

• `get` **boundsLocal**(): `Readonly`<`Rect`\>

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`<`Rect`\>

#### Inherited from

FillableNode.boundsLocal

___

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal
box.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

FillableNode.centerPointLocal

___

### fill

• `get` **fill**(): `undefined` \| `Readonly`<[`Fill`](../interfaces/Fill.md)\>

#### Returns

`undefined` \| `Readonly`<[`Fill`](../interfaces/Fill.md)\>

#### Inherited from

FillableNode.fill

• `set` **fill**(`fill`): `void`

The fill applied to the shape, if any.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fill` | `undefined` \| [`Fill`](../interfaces/Fill.md) |

#### Returns

`void`

#### Inherited from

FillableNode.fill

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

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

#### Inherited from

FillableNode.id

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

• `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](BaseNode.md)

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

### stroke

• `get` **stroke**(): `undefined` \| `Readonly`<[`Stroke`](../interfaces/Stroke.md)\>

#### Returns

`undefined` \| `Readonly`<[`Stroke`](../interfaces/Stroke.md)\>

#### Inherited from

FillableNode.stroke

• `set` **stroke**(`stroke`): `void`

The stroke applied to the shape, if any.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stroke` | `undefined` \| [`Stroke`](../interfaces/Stroke.md) |

#### Returns

`void`

#### Inherited from

FillableNode.stroke

___

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

FillableNode.topLeftLocal

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

• `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

FillableNode.transformMatrix

___

### translation

• `get` **translation**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

FillableNode.translation

• `set` **translation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Point`](../interfaces/Point.md) |

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

### visualRoot

• `get` **visualRoot**(): [`VisualNode`](VisualNode.md)

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

#### Returns

[`VisualNode`](VisualNode.md)

#### Inherited from

FillableNode.visualRoot

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

### boundsInNode

▸ **boundsInNode**(`targetNode`): `Readonly`<`Rect`\>

Convert the node's [boundsLocal](RectangleNode.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](RectangleNode.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetNode` | [`VisualNode`](VisualNode.md) |

#### Returns

`Readonly`<`Rect`\>

#### Inherited from

[FillableNode](FillableNode.md).[boundsInNode](FillableNode.md#boundsinnode)

___

### getUniformCornerRadius

▸ **getUniformCornerRadius**(): `undefined` \| `number`

If all corners have the same rounding radius value, returns that value (or 0 if all corners are not rounded).
If the corner radii differ, returns undefined.

#### Returns

`undefined` \| `number`

___

### localPointInNode

▸ **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](../interfaces/Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](RectangleNode.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Name | Type |
| :------ | :------ |
| `localPoint` | [`Point`](../interfaces/Point.md) |
| `targetNode` | [`VisualNode`](VisualNode.md) |

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

[FillableNode](FillableNode.md).[localPointInNode](FillableNode.md#localpointinnode)

___

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

[FillableNode](FillableNode.md).[removeFromParent](FillableNode.md#removefromparent)

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

[FillableNode](FillableNode.md).[setPositionInParent](FillableNode.md#setpositioninparent)

___

### setRotationInParent

▸ **setRotationInParent**(`angleInDegrees`, `localRotationPoint`): `void`

Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the
node’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already
have had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other
ancestors also have rotation of their own.

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
