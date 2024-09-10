[@express-document-sdk](../overview.md) / GroupNode

# Class: GroupNode

A GroupNode represents a Group object in the scenegraph, which has a collection of generic children as well as a separate,
optional vector mask child.

## Extends

-   [`Node`](Node.md)

## Implements

-   [`ContainerNode`](../interfaces/ContainerNode.md)

## Accessors

### allChildren

▸ `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](Node.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes _all_ such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

---

### blendMode

▸ `get` **blendMode**(): [`BlendMode`](../enumerations/BlendMode.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[BlendMode.normal](../enumerations/BlendMode.md#normal) for most nodes, and [BlendMode.passThrough](../enumerations/BlendMode.md#passthrough) for GroupNodes.

▸ `set` **blendMode**(`value`): `void`

#### Parameters

▸ **value**: [`BlendMode`](../enumerations/BlendMode.md)

#### Returns

[`BlendMode`](../enumerations/BlendMode.md)

---

### boundsInParent

▸ `get` **boundsInParent**(): `Readonly`<`Rect`\>

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](VisualNode.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

#### Returns

`Readonly`<`Rect`\>

---

### boundsLocal

▸ `get` **boundsLocal**(): `Readonly`<`Rect`\>

Note: If this group has a maskShape, group's bounds are always identical to the maskShape's, regardless of the
group's other content.

#### Returns

`Readonly`<`Rect`\>

---

### centerPointLocal

▸ `get` **centerPointLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal
box.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### children

▸ `get` **children**(): [`ItemList`](ItemList.md)<[`Node`](Node.md)\>

The Group's regular children. Does not include the maskShape if one is present.
Use the methods on this ItemList object to get, add, and remove children.

#### Returns

[`ItemList`](ItemList.md)<[`Node`](Node.md)\>

---

### id

▸ `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

---

### locked

▸ `get` **locked**(): `boolean`

The node's lock/unlock state. Locked nodes are excluded from the selection (see [Context.selection](Context.md#selection)), and
cannot be edited by the user unless they are unlocked first.

▸ `set` **locked**(`locked`): `void`

#### Parameters

▸ **locked**: `boolean`

#### Returns

`boolean`

---

### maskShape

▸ `get` **maskShape**(): `undefined` \| [`FillableNode`](FillableNode.md)

A vector shape that acts as a clipping mask for the content of this group. The mask node is separate from the Group's
generic 'children' collection, though both are part of the overall 'allChildren' of this Group.

▸ `set` **maskShape**(`mask`): `void`

If set to a vector shape, adds a mask or replaces the existing mask on this Group.
If set to undefined, removes any mask that was previously set on this Group.

#### Throws

if the given node type cannot be used as a vector mask.

#### Parameters

▸ **mask**: `undefined` \| [`FillableNode`](FillableNode.md)

#### Returns

`undefined` \| [`FillableNode`](FillableNode.md)

undefined if no mask is set on this group.

---

### opacity

▸ `get` **opacity**(): `number`

The node's opacity, from 0.0 to 1.0

▸ `set` **opacity**(`opacity`): `void`

#### Parameters

▸ **opacity**: `number`

#### Returns

`number`

---

### parent

▸ `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](BaseNode.md)

---

### rotation

▸ `get` **rotation**(): `number`

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

#### Returns

`number`

---

### rotationInScreen

▸ `get` **rotationInScreen**(): `number`

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

#### Returns

`number`

---

### topLeftLocal

▸ `get` **topLeftLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### transformMatrix

▸ `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

---

### translation

▸ `get` **translation**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

▸ `set` **translation**(`value`): `void`

#### Parameters

▸ **value**: [`Point`](../interfaces/Point.md)

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### type

▸ `get` **type**(): [`SceneNodeType`](../enumerations/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

---

### visualRoot

▸ `get` **visualRoot**(): [`VisualNode`](VisualNode.md)

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

#### Returns

[`VisualNode`](VisualNode.md)

## Methods

### boundsInNode()

▸ **boundsInNode**(`targetNode`): `Readonly`<`Rect`\>

Convert the node's [boundsLocal](VisualNode.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](VisualNode.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

▸ **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<`Rect`\>

#### Inherited from

[`Node`](Node.md).[`boundsInNode`](Node.md#boundsinnode)

---

### localPointInNode()

▸ **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](../interfaces/Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](VisualNode.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

▸ **localPoint**: [`Point`](../interfaces/Point.md)

▸ **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`localPointInNode`](../interfaces/ContainerNode.md#localpointinnode)

#### Inherited from

[`Node`](Node.md).[`localPointInNode`](Node.md#localpointinnode)

---

### removeFromParent()

▸ **removeFromParent**(): `void`

Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the
document is closed.

If parent is a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`. For nodes with other
child "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit
removal. No-op if node is already an orphan.

#### Returns

`void`

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`removeFromParent`](../interfaces/ContainerNode.md#removefromparent)

#### Inherited from

[`Node`](Node.md).[`removeFromParent`](Node.md#removefromparent)

---

### setPositionInParent()

▸ **setPositionInParent**(`parentPoint`, `localRegistrationPoint`): `void`

Move the node so the given `localRegistrationPoint` in its local coordinates is placed at the given
`parentPoint` in its parent's coordinates (taking into account any rotation on this node, etc.).

#### Parameters

▸ **parentPoint**: [`Point`](../interfaces/Point.md)

Point in this node's parent's coordinate space to move `localRegistrationPoint` to

▸ **localRegistrationPoint**: [`Point`](../interfaces/Point.md)

Point in this node's local coordinate space to align with `parentPoint`

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`setPositionInParent`](Node.md#setpositioninparent)

#### Example

Center a rectangle within its parent artboard:

```js
rectangle.setPositionInParent(
    { x: artboard.width / 2, y: artboard.height / 2 },
    { x: rectangle.width / 2, y: rectangle.height / 2 }
);
```

---

### setRotationInParent()

▸ **setRotationInParent**(`angleInDegrees`, `localRotationPoint`): `void`

Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the
node’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already
have had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other
ancestors also have rotation of their own.

#### Parameters

▸ **angleInDegrees**: `number`

Angle in degrees.

▸ **localRotationPoint**: [`Point`](../interfaces/Point.md)

Point to rotate around, in node's local coordinates.

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`setRotationInParent`](Node.md#setrotationinparent)

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, { x: rectangle.width / 2, y: rectangle.height / 2 });
```
