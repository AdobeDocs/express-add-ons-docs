[@express-document-sdk](../overview.md) / PathNode

# Class: PathNode

A PathNode represents a generic vector path shape in the scenegraph. Paths cannot be edited through this API
yet, only read.

To create new paths, see [Editor.createPath](editor.md#createpath).

<InlineAlert slots="text" variant="info"/>

Note: the visual top-left corner of a path may not be its local (0,0) origin point, so it's easiest to position
a path using [Node.setPositionInParent](node.md#setpositioninparent) rather than setting its [Node.translation](node.md#translation) directly.

## Extends

-   [`FillableNode`](fillable-node.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](add-on-data.md)

Get [AddOnData](add-on-data.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](add-on-data.md)

<HorizontalLine />

### allChildren

• `get` **allChildren**(): `Readonly`&lt;`Iterable`&lt;[`Node`](node.md), `any`, `any`&gt;&gt;

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/container-node.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly`&lt;`Iterable`&lt;[`Node`](node.md), `any`, `any`&gt;&gt;

<HorizontalLine />

### allDescendants

• `get` **allDescendants**(): `Readonly`&lt;`Iterable`&lt;[`Node`](node.md), `any`, `any`&gt;&gt;

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to recursively traverse *all* the exposed scenegraph content within the subtree of this node.
Every container node and every leaf node will be visited via a pre-order tree traversal.
Although once called the list of direct descendants is static, changes to further descendants may appear while
iterating depending on when the operation occurs relative to the parent being yielded.
Note that the root node (i.e. what this API was called on) is not visited.

The descendants of a Node are always other Node classes (never the more minimal BaseNode).

Warning: Processing text content via this API can be error-prone. Use [VisualNode.allTextContent](visual-node.md#alltextcontent)

#### Returns

`Readonly`&lt;`Iterable`&lt;[`Node`](node.md), `any`, `any`&gt;&gt;

<HorizontalLine />

### allTextContent

• `get` **allTextContent**(): `Readonly`&lt;`Iterable`&lt;[`TextContent`](../interfaces/text-content.md), `any`, `any`&gt;&gt;

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to process all text content that is found as part of or within this node. This can be hard to do correctly
via manual tree traversal since multiple [ThreadedTextNode](threaded-text-node.md) can share a single [TextContentModel](text-content-model.md).

This iterator returns a single result per TextContentModel that is at least partially displayed within this node,
even if that content is split across several separate TextNode "frames". If this node is or contains some but not
all of the display frames of an overall TextContentModel, that model is still included as a result.

Note that visibleRanges and visibleText may not be sorted as TextNode "frames" can appear in any order in the scenegraph.

#### Returns

`Readonly`&lt;`Iterable`&lt;[`TextContent`](../interfaces/text-content.md), `any`, `any`&gt;&gt;

<HorizontalLine />

### blendMode

• `get` **blendMode**(): [`BlendMode`](../enumerations/blend-mode.md)

Blend mode determines how a node is composited onto the content below it. The default value is
[BlendMode.normal](../enumerations/blend-mode.md#normal) for most nodes, and [BlendMode.passThrough](../enumerations/blend-mode.md#passthrough) for GroupNodes.

• `set` **blendMode**(`value`): `void`

#### Parameters

• **value**: [`BlendMode`](../enumerations/blend-mode.md)

#### Returns

[`BlendMode`](../enumerations/blend-mode.md)

<HorizontalLine />

### boundsInParent

• `get` **boundsInParent**(): `Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

<HorizontalLine />

### boundsLocal

• `get` **boundsLocal**(): `Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

<HorizontalLine />

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

<HorizontalLine />

### fill

• `get` **fill**(): `undefined` \| `Readonly`&lt;[`Fill`](../interfaces/fill.md)&gt;

• `set` **fill**(`fill`): `void`

The fill applied to the shape, if any.

#### Parameters

• **fill**: `undefined` \| [`Fill`](../interfaces/fill.md)

#### Returns

`undefined` \| `Readonly`&lt;[`Fill`](../interfaces/fill.md)&gt;

<HorizontalLine />

### fillRule

• `get` **fillRule**(): [`FillRule`](../enumerations/fill-rule.md)

The fill rule specifies how the interior area of a path is determined in cases where the path is self-intersecting or
has multiple disjoint parts. The default value is nonZero.

• `set` **fillRule**(`rule`): `void`

#### Parameters

• **rule**: [`FillRule`](../enumerations/fill-rule.md)

#### Returns

[`FillRule`](../enumerations/fill-rule.md)

<HorizontalLine />

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

<HorizontalLine />

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

<HorizontalLine />

### opacity

• `get` **opacity**(): `number`

The node's opacity, from 0.0 to 1.0

• `set` **opacity**(`opacity`): `void`

#### Parameters

• **opacity**: `number`

#### Returns

`number`

<HorizontalLine />

### parent

• `get` **parent**(): `undefined` \| [`BaseNode`](base-node.md)

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

#### Returns

`undefined` \| [`BaseNode`](base-node.md)

<HorizontalLine />

### path

• `get` **path**(): `string`

The path definition as an SVG string. The path data is read-only and cannot be modified via this API yet.
Note that the path data will be normalized, and therefore the `path` getter may return a different SVG string from the path creation input.
For example, "M 10 80 Q 52.5 10, 95 80 T 180 80" becomes "M 10 80 C 38.33 33.33 66.67 33.33 95 80...".

#### Returns

`string`

<HorizontalLine />

### rotation

• `get` **rotation**(): `number`

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

#### Returns

`number`

<HorizontalLine />

### rotationInScreen

• `get` **rotationInScreen**(): `number`

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

#### Returns

`number`

<HorizontalLine />

### stroke

• `get` **stroke**(): `undefined` \| `Readonly`&lt;[`Stroke`](../interfaces/stroke.md)&gt;

• `set` **stroke**(`stroke`): `void`

The stroke applied to the shape, if any.
Only [SolidColorStroke](../interfaces/solid-color-stroke.md) values are supported by the setter, but the "type" field is optional
for backward compatibility. Throws if another type is provided.

#### Parameters

• **stroke**: `undefined` \| [`SolidColorStrokeWithOptionalType`](../type-aliases/solid-color-stroke-with-optional-type.md)

#### Returns

`undefined` \| `Readonly`&lt;[`Stroke`](../interfaces/stroke.md)&gt;

<HorizontalLine />

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

<HorizontalLine />

### transformMatrix

• `get` **transformMatrix**(): [`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

The node's transform matrix relative to its parent.

#### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

<HorizontalLine />

### translation

• `get` **translation**(): `Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

• `set` **translation**(`value`): `void`

#### Parameters

• **value**: [`Point`](../interfaces/point.md)

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

<HorizontalLine />

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/scene-node-type.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/scene-node-type.md)

<HorizontalLine />

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

• **boundsInNode**(`targetNode`): `Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

Convert the node's [boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](path-node.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

#### Inherited from

[`FillableNode`](fillable-node.md).[`boundsInNode`](fillable-node.md#boundsinnode)

<HorizontalLine />

### cloneInPlace()

• **cloneInPlace**(): [`PathNode`](path-node.md)

Creates a copy of this node and its entire subtree of descendants.

The node must be attached to a page as the copy will be added as a sibling.

#### Returns

[`PathNode`](path-node.md)

#### Inherited from

[`FillableNode`](fillable-node.md).[`cloneInPlace`](fillable-node.md#cloneinplace)

<HorizontalLine />

### createRendition()

• **createRendition**(`options`?): `Promise`&lt;[`CreateRenditionResult`](../interfaces/create-rendition-result.md)&gt;

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Generates a rendition of this node and its descendants.

If this node contains images, it will wait for the best quality to be available before capturing.
As such, there is a 20s timeout before an error is thrown to prevent indefinite waiting.

#### Parameters

• **options?**: [`CreateRenditionOptions`](../interfaces/create-rendition-options.md)

#### Returns

`Promise`&lt;[`CreateRenditionResult`](../interfaces/create-rendition-result.md)&gt;

#### Inherited from

[`FillableNode`](fillable-node.md).[`createRendition`](fillable-node.md#createrendition)

<HorizontalLine />

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](path-node.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/point.md)

• **targetNode**: [`VisualNode`](visual-node.md)

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

#### Inherited from

[`FillableNode`](fillable-node.md).[`localPointInNode`](fillable-node.md#localpointinnode)

<HorizontalLine />

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

[`FillableNode`](fillable-node.md).[`removeFromParent`](fillable-node.md#removefromparent)

<HorizontalLine />

### resize()

• **resize**(`options`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Resizes this node based on the given [ResizeOptions](../type-aliases/resize-options.md).

#### Parameters

• **options**: [`ResizeOptions`](../type-aliases/resize-options.md)

#### Returns

`void`

#### Inherited from

[`FillableNode`](fillable-node.md).[`resize`](fillable-node.md#resize)

<HorizontalLine />

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

[`FillableNode`](fillable-node.md).[`setPositionInParent`](fillable-node.md#setpositioninparent)

#### Example

Center a rectangle within its parent artboard:

```js
rectangle.setPositionInParent(
    { x: artboard.width / 2, y: artboard.height / 2 },
    { x: rectangle.width / 2, y: rectangle.height / 2 }
);
```

<HorizontalLine />

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

[`FillableNode`](fillable-node.md).[`setRotationInParent`](fillable-node.md#setrotationinparent)

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, rectangle.centerPointLocal);
```
