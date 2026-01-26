[@express-document-sdk](../overview.md) / UnknownMediaRectangleNode

# Class: UnknownMediaRectangleNode

UnknownMediaRectangleNode is a rectangular node that represents the *uncropped* media within a [MediaContainerNode](MediaContainerNode.md)
for cases where the media type is not yet supported by this API. Cropping can still be adjusted by changing this
rectangle's position/rotation (as well as its maskShape sibling node).

## Extends

-   [`MediaRectangleNode`](MediaRectangleNode.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](AddOnData.md)

Get [AddOnData](AddOnData.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](AddOnData.md)

---

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](Node.md), `any`, `any`\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly`<`Iterable`<[`Node`](Node.md), `any`, `any`\>\>

---

### allDescendants

• `get` **allDescendants**(): `Readonly`<`Iterable`<[`Node`](Node.md), `any`, `any`\>\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to recursively traverse *all* the exposed scenegraph content within the subtree of this node.
Every container node and every leaf node will be visited via a pre-order tree traversal.
Although once called the list of direct descendants is static, changes to further descendants may appear while
iterating depending on when the operation occurs relative to the parent being yielded.
Note that the root node (i.e. what this API was called on) is not visited.

The descendants of a Node are always other Node classes (never the more minimal BaseNode).

Warning: Processing text content via this API can be error-prone. Use [VisualNode.allTextContent](VisualNode.md#alltextcontent)

#### Returns

`Readonly`<`Iterable`<[`Node`](Node.md), `any`, `any`\>\>

---

### allTextContent

• `get` **allTextContent**(): `Readonly`<`Iterable`<[`TextContent`](../interfaces/TextContent.md), `any`, `any`\>\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to process all text content that is found as part of or within this node. This can be hard to do correctly
via manual tree traversal since multiple [ThreadedTextNode](ThreadedTextNode.md) can share a single [TextContentModel](TextContentModel.md).

This iterator returns a single result per TextContentModel that is at least partially displayed within this node,
even if that content is split across several separate TextNode "frames". If this node is or contains some but not
all of the display frames of an overall TextContentModel, that model is still included as a result.

Note that visibleRanges and visibleText may not be sorted as TextNode "frames" can appear in any order in the scenegraph.

#### Returns

`Readonly`<`Iterable`<[`TextContent`](../interfaces/TextContent.md), `any`, `any`\>\>

---

### blendMode

• `get` **blendMode**(): [`BlendMode`](../enumerations/BlendMode.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[BlendMode.normal](../enumerations/BlendMode.md#normal) for most nodes, and [BlendMode.passThrough](../enumerations/BlendMode.md#passthrough) for GroupNodes.

• `set` **blendMode**(`value`): `void`

#### Parameters

• **value**: [`BlendMode`](../enumerations/BlendMode.md)

#### Returns

[`BlendMode`](../enumerations/BlendMode.md)

---

### boundsInParent

• `get` **boundsInParent**(): `Readonly`<[`Rect`](../interfaces/Rect.md)\>

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

---

### boundsLocal

• `get` **boundsLocal**(): `Readonly`<[`Rect`](../interfaces/Rect.md)\>

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

---

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### height

• `get` **height**(): `number`

Current height of the "full frame" uncropped media, which may not be fully visible due to cropping/clipping by the
enclosing media container's maskShape. This size may be different from the original image/video size in pixels, but
will always match its aspect ratio.

#### Returns

`number`

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

The node's lock/unlock state. Locked nodes are excluded from the selection (see [Context.selection](Context.md#selection)), and
cannot be edited by the user in the UI unless they are unlocked first. It is still possible to mutate locked nodes
at the model level using these APIs. However, please consider if modifying a locked node would align with user
expectations before doing so.

• `set` **locked**(`locked`): `void`

#### Parameters

• **locked**: `boolean`

#### Returns

`boolean`

---

### mediaAddOnData

• `get` **mediaAddOnData**(): [`AddOnData`](AddOnData.md)

Get [AddOnData](AddOnData.md) reference for managing private metadata attached to the media resource displayed by this node.
The same media resource may be reused in multiple places in the document, and all share the same AddOnData state.

<InlineAlert slots="text" variant="warning"/>

Note: This support is not present for PSD (Photoshop Document) / AI (Adobe Illustrator) assets. An error will be thrown in that case.

#### Returns

[`AddOnData`](AddOnData.md)

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

• `get` **parent**(): `undefined` \| [`BaseNode`](BaseNode.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](BaseNode.md)

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

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### transformMatrix

• `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

---

### translation

• `get` **translation**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

• `set` **translation**(`value`): `void`

#### Parameters

• **value**: [`Point`](../interfaces/Point.md)

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

---

### visualRoot

• `get` **visualRoot**(): [`VisualNode`](VisualNode.md)

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

#### Returns

[`VisualNode`](VisualNode.md)

---

### width

• `get` **width**(): `number`

Current width of the "full frame" uncropped media, which may not be fully visible due to cropping/clipping by the
enclosing media container's maskShape. This size may be different from the original image/video size in pixels, but
will always match its aspect ratio.

#### Returns

`number`

## Methods

### boundsInNode()

• **boundsInNode**(`targetNode`): `Readonly`<[`Rect`](../interfaces/Rect.md)\>

Convert the node's [boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](UnknownMediaRectangleNode.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Inherited from

[`MediaRectangleNode`](MediaRectangleNode.md).[`boundsInNode`](MediaRectangleNode.md#boundsinnode)

---

### cloneInPlace()

• **cloneInPlace**(): `never`

Always throws as it's not possible to clone just the media rectangle alone.
Clone the entire parent MediaContainerNode instead.

#### Returns

`never`

#### Inherited from

[`MediaRectangleNode`](MediaRectangleNode.md).[`cloneInPlace`](MediaRectangleNode.md#cloneinplace)

---

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](../interfaces/Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](UnknownMediaRectangleNode.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/Point.md)

• **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

[`MediaRectangleNode`](MediaRectangleNode.md).[`localPointInNode`](MediaRectangleNode.md#localpointinnode)

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

[`MediaRectangleNode`](MediaRectangleNode.md).[`removeFromParent`](MediaRectangleNode.md#removefromparent)

---

### resize()

• **resize**(`options`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Resizes this node based on the given [ResizeOptions](../type-aliases/ResizeOptions.md).

#### Parameters

• **options**: [`ResizeOptions`](../type-aliases/ResizeOptions.md)

#### Returns

`void`

#### Inherited from

[`MediaRectangleNode`](MediaRectangleNode.md).[`resize`](MediaRectangleNode.md#resize)

---

### setPositionInParent()

• **setPositionInParent**(`parentPoint`, `localRegistrationPoint`): `void`

Move the node so the given `localRegistrationPoint` in its local coordinates is placed at the given
`parentPoint` in its parent's coordinates (taking into account any rotation on this node, etc.).

#### Parameters

• **parentPoint**: [`Point`](../interfaces/Point.md)

Point in this node's parent's coordinate space to move `localRegistrationPoint` to

• **localRegistrationPoint**: [`Point`](../interfaces/Point.md)

Point in this node's local coordinate space to align with `parentPoint`

#### Returns

`void`

#### Inherited from

[`MediaRectangleNode`](MediaRectangleNode.md).[`setPositionInParent`](MediaRectangleNode.md#setpositioninparent)

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

• **localRotationPoint**: [`Point`](../interfaces/Point.md)

Point to rotate around, in node's local coordinates.

#### Returns

`void`

#### Inherited from

[`MediaRectangleNode`](MediaRectangleNode.md).[`setRotationInParent`](MediaRectangleNode.md#setrotationinparent)

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, rectangle.centerPointLocal);
```
