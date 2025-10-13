[@express-document-sdk](../overview.md) / StrokeShapeNode

# Class: StrokeShapeNode

A StrokeShapeNode is prepackaged shape that has a single stroke property and appears as a leaf node in the UI, even
if it is composed of multiple separate paths.

## Extends

-   [`StrokableNode`](strokable-node.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](add-on-data.md)

Get [AddOnData](add-on-data.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](add-on-data.md)

---

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](node.md), `any`, `any`\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/container-node.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly`<`Iterable`<[`Node`](node.md), `any`, `any`\>\>

---

### blendMode

• `get` **blendMode**(): [`BlendMode`](../enumerations/blend-mode.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[BlendMode.normal](../enumerations/blend-mode.md#normal) for most nodes, and [BlendMode.passThrough](../enumerations/blend-mode.md#passthrough) for GroupNodes.

• `set` **blendMode**(`value`): `void`

#### Parameters

• **value**: [`BlendMode`](../enumerations/blend-mode.md)

#### Returns

[`BlendMode`](../enumerations/blend-mode.md)

---

### boundsInParent

• `get` **boundsInParent**(): `Readonly`<[`Rect`](../interfaces/rect.md)\>

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

#### Returns

`Readonly`<[`Rect`](../interfaces/rect.md)\>

---

### boundsLocal

• `get` **boundsLocal**(): `Readonly`<[`Rect`](../interfaces/rect.md)\>

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`<[`Rect`](../interfaces/rect.md)\>

---

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`<[`Point`](../interfaces/point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`<[`Point`](../interfaces/point.md)\>

---

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

---

### locked

• `get` **locked**(): `boolean`

The node's lock/unlock state. Locked nodes are excluded from the selection (see [Context.selection](context.md#selection)), and
cannot be edited by the user in the UI unless they are unlocked first. It is still possible to mutate locked nodes
at the model level using these APIs. However, please consider if modifying a locked node would align with user
expectations before doing so.

• `set` **locked**(`locked`): `void`

#### Parameters

• **locked**: `boolean`

#### Returns

`boolean`

---

### opacity

• `get` **opacity**(): `number`

The node's opacity, from 0.0 to 1.0

• `set` **opacity**(`opacity`): `void`

#### Parameters

• **opacity**: `number`

#### Returns

`number`

---

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](base-node.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](base-node.md)

---

### rotation

• `get` **rotation**(): `number`

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

#### Returns

`number`

---

### rotationInScreen

• `get` **rotationInScreen**(): `number`

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

#### Returns

`number`

---

### stroke

• `get` **stroke**(): `undefined` \| `Readonly`<[`Stroke`](../interfaces/stroke.md)\>

• `set` **stroke**(`stroke`): `void`

The stroke applied to the shape, if any.
Only [SolidColorStroke](../interfaces/solid-color-stroke.md) values are supported by the setter, but the "type" field is optional
for backward compatibility. Throws if another type is provided.

#### Parameters

• **stroke**: `undefined` \| [`SolidColorStrokeWithOptionalType`](../type-aliases/solid-color-stroke-with-optional-type.md)

#### Returns

`undefined` \| `Readonly`<[`Stroke`](../interfaces/stroke.md)\>

---

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`<[`Point`](../interfaces/point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](../interfaces/point.md)\>

---

### transformMatrix

• `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

---

### translation

• `get` **translation**(): `Readonly`<[`Point`](../interfaces/point.md)\>

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

• `set` **translation**(`value`): `void`

#### Parameters

• **value**: [`Point`](../interfaces/point.md)

#### Returns

`Readonly`<[`Point`](../interfaces/point.md)\>

---

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/scene-node-type.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/scene-node-type.md)

---

### visualRoot

• `get` **visualRoot**(): [`VisualNode`](visual-node.md)

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

#### Returns

[`VisualNode`](visual-node.md)

## Methods

### boundsInNode()

• **boundsInNode**(`targetNode`): `Readonly`<[`Rect`](../interfaces/rect.md)\>

Convert the node's [boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](stroke-shape-node.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`<[`Rect`](../interfaces/rect.md)\>

#### Inherited from

[`StrokableNode`](strokable-node.md).[`boundsInNode`](strokable-node.md#boundsinnode)

---

### cloneInPlace()

• **cloneInPlace**(): [`StrokeShapeNode`](stroke-shape-node.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Creates a copy of this node and its entire subtree of descendants.

The node must be attached to a page as the copy will be added as a sibling.

#### Returns

[`StrokeShapeNode`](stroke-shape-node.md)

#### Inherited from

[`StrokableNode`](strokable-node.md).[`cloneInPlace`](strokable-node.md#cloneinplace)

---

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](../interfaces/point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](stroke-shape-node.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/point.md)

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`<[`Point`](../interfaces/point.md)\>

#### Inherited from

[`StrokableNode`](strokable-node.md).[`localPointInNode`](strokable-node.md#localpointinnode)

---

### removeFromParent()

• **removeFromParent**(): `void`

Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the
document is closed.

If parent is a basic ContainerNode, this is equivalent to `node.parent.children.remove(node)`. For nodes with other
child "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit
removal. No-op if node is already an orphan.

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`removeFromParent`](strokable-node.md#removefromparent)

---

### rescaleProportionalToHeight()

• **rescaleProportionalToHeight**(`height`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Changes the height to the given value by visually *scaling* the entire content larger or smaller on both axes to
preserve its existing aspect ratio. See [rescaleProportionalToWidth](node.md#rescaleproportionaltowidth) documentation for additional explanation.

#### Parameters

• **height**: `number`

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`rescaleProportionalToHeight`](strokable-node.md#rescaleproportionaltoheight)

---

### rescaleProportionalToWidth()

• **rescaleProportionalToWidth**(`width`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Changes the width to the given value by visually *scaling* the entire content larger or smaller on both axes to
preserve its existing aspect ratio, keeping its top-left corner ([topLeftLocal](visual-node.md#topleftlocal)) at a fixed location.

Scaling changes the size of visual styling elements such as stroke width, corner detailing, and font size.
Contrast this to *resizing* operations (such as [resizeToFitWithin](node.md#resizetofitwithin)), which adjust the bounding box of an
element while trying to preserve the existing size of visual detailing such as strokes, corners, and fonts.

Rescaling becomes baked into the updated values of fields such as stroke weight, rectangle width, etc. (it is not
a separate, persistent scale factor multiplier).

#### Parameters

• **width**: `number`

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`rescaleProportionalToWidth`](strokable-node.md#rescaleproportionaltowidth)

---

### resizeToCover()

• **resizeToCover**(`width`, `height`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Resizes the node to completely *cover* a box of the given dimensions, keeping its top-left corner ([topLeftLocal](visual-node.md#topleftlocal))
at a fixed location. Nodes with a fixed aspect ratio may extend outside the box on one axis as a result, but
nodes with flexible aspect ratio will be resized to the exact box size specified. See [resizeToFitWithin](node.md#resizetofitwithin)
documentation for additional explanation.

#### Parameters

• **width**: `number`

• **height**: `number`

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`resizeToCover`](strokable-node.md#resizetocover)

#### See

resizeToFitWithin

---

### resizeToFitWithin()

• **resizeToFitWithin**(`width`, `height`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Resizes the node to fit entirely *within* a box of the given dimensions, keeping its top-left corner ([topLeftLocal](visual-node.md#topleftlocal))
at a fixed location. Nodes with a fixed aspect ratio may leave unused space on one axis as a result, but nodes
with flexible aspect ratio will be resized to the exact box size specified.

Resizing attempts to preserve the existing size of visual styling elements such as stroke width, corner detailing,
and font size as much as possible. Contrast with *rescaling* (such as [rescaleProportionalToWidth](node.md#rescaleproportionaltowidth)), which
always changes the size of visual detailing in exact proportion to the change in overall bounding box size. This
API may still produce *some* degree of rescaling if necessary for certain shapes with fixed corner/edge detailing
to fit the box better.

#### Parameters

• **width**: `number`

• **height**: `number`

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`resizeToFitWithin`](strokable-node.md#resizetofitwithin)

#### See

resizeToCover

---

### setPositionInParent()

• **setPositionInParent**(`parentPoint`, `localRegistrationPoint`): `void`

Move the node so the given `localRegistrationPoint` in its local coordinates is placed at the given
`parentPoint` in its parent's coordinates (taking into account any rotation on this node, etc.).

#### Parameters

• **parentPoint**: [`Point`](../interfaces/point.md)

Point in this node's parent's coordinate space to move `localRegistrationPoint` to

• **localRegistrationPoint**: [`Point`](../interfaces/point.md)

Point in this node's local coordinate space to align with `parentPoint`

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`setPositionInParent`](strokable-node.md#setpositioninparent)

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

• **setRotationInParent**(`angleInDegrees`, `localRotationPoint`): `void`

Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the
node’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already
have had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other
ancestors also have rotation of their own.

#### Parameters

• **angleInDegrees**: `number`

Angle in degrees.

• **localRotationPoint**: [`Point`](../interfaces/point.md)

Point to rotate around, in node's local coordinates.

#### Returns

`void`

#### Inherited from

[`StrokableNode`](strokable-node.md).[`setRotationInParent`](strokable-node.md#setrotationinparent)

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, rectangle.centerPointLocal);
```
