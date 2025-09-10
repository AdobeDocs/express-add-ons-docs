[@express-document-sdk](../overview.md) / TextNode

# Class: `abstract` TextNode

TextNode is an abstract base class representing text displayed in the scenegraph, regardless of whether it's a fully
self-contained [StandaloneTextNode](StandaloneTextNode.md) or one [ThreadedTextNode](ThreadedTextNode.md) "frame" of multiple in a larger flow. The
APIs on TextNode and its [TextNodeContentModel](TextNodeContentModel.md) allow you to generically work with text without needing to know
which of those subtypes you are dealing with.

## Extends

-   [`Node`](Node.md)

## Extended by

-   [`StandaloneTextNode`](StandaloneTextNode.md)
-   [`ThreadedTextNode`](ThreadedTextNode.md)

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

Note: The bounding box of an orphaned TextNode may become different after it is placed on a
page. It is recommended to use this property only when the node is placed on a page.

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

Note: The bounding box of the orphaned TextNode may be different from the bounding box of the node placed on a
page. It is recommended to use this property only when the node is placed on a page.

---

### centerPointLocal

• `get` **centerPointLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

Note: The center of the orphaned TextNode may be different from the center of the node placed on a page. It is
recommended to use this property only when the node is placed on a page.

---

### fullContent

• `get` **fullContent**(): [`TextNodeContentModel`](TextNodeContentModel.md)

The model containing the complete text string and its styles, only part of which may be visible within the bounds of
this specific TextNode "frame." The full text content flow may be split across multiple frames, and/or it may be clipped if a
fixed-size frame using [AreaTextLayout](../interfaces/AreaTextLayout.md) does not fit all the (remaining) text.

Note: When traversing the scenegraph in search of text content, bear in mind that multiple TextNodes may refer to the
same single [TextNodeContentModel](TextNodeContentModel.md); this can give the impression that the same text is duplicated multiple times when it is
not. Use [TextNodeContentModel](TextNodeContentModel.md).id to determine whether a given piece of text content is unique or if it's already been
encountered before.

#### Returns

[`TextNodeContentModel`](TextNodeContentModel.md)

---

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

---

### layout

• `get` **layout**(): `Readonly`<[`AutoWidthTextLayout`](../interfaces/AutoWidthTextLayout.md) \| [`AutoHeightTextLayout`](../interfaces/AutoHeightTextLayout.md) \| [`AreaTextLayout`](../interfaces/AreaTextLayout.md) \| [`UnsupportedTextLayout`](../interfaces/UnsupportedTextLayout.md)\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Returns

`Readonly`<[`AutoWidthTextLayout`](../interfaces/AutoWidthTextLayout.md) \| [`AutoHeightTextLayout`](../interfaces/AutoHeightTextLayout.md) \| [`AreaTextLayout`](../interfaces/AreaTextLayout.md) \| [`UnsupportedTextLayout`](../interfaces/UnsupportedTextLayout.md)\>

The layout mode of the TextNode "frame."

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

### nextTextNode

• `get` `abstract` **nextTextNode**(): `undefined` \| [`ThreadedTextNode`](ThreadedTextNode.md)

The next TextNode that text overflowing this node will spill into, if any. If undefined and this TextNode is fixed size
([AreaTextLayout](../interfaces/AreaTextLayout.md)), any text content that does not fit within this node's area will be clipped.

To get *all* TextNodes that the text content may be split across, use `TextNode.fullContent.allTextNodes`.

#### Returns

`undefined` \| [`ThreadedTextNode`](ThreadedTextNode.md)

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

### text

• `get` **text**(): `string`

The text string content which is partially *or* fully displayed in this TextNode "frame."
WARNING: If a piece of text content flows across several TextNodes, *each* TextNode's `text` getter will return
the *entire* text content string.

#### Deprecated

- Use the text getter on [TextNodeContentModel](TextNodeContentModel.md) instead. Access it via `TextNode.fullContent.text`.

• `set` **text**(`textContent`): `void`

Sets the text content of the TextNode.
WARNING: If a piece of text content flows across several TextNodes,
*each* TextNode's `text` setter will sets the *entire* text content string.

#### Deprecated

- Use the text setter on [TextNodeContentModel](TextNodeContentModel.md) instead. Access it via `TextNode.fullContent.text`.

#### Parameters

• **textContent**: `string`

#### Returns

`string`

---

### textAlignment

• `get` **textAlignment**(): [`TextAlignment`](../enumerations/TextAlignment.md)

The horizontal text alignment of the TextNode. Alignment is always the same across this node's entire text content.

• `set` **textAlignment**(`alignment`): `void`

#### Parameters

• **alignment**: [`TextAlignment`](../enumerations/TextAlignment.md)

#### Returns

[`TextAlignment`](../enumerations/TextAlignment.md)

---

### topLeftLocal

• `get` **topLeftLocal**(): `Readonly`<[`Point`](../interfaces/Point.md)\>

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

Note: The top-left of the orphaned TextNode may be different from the top-left of the node placed on a
page. It is recommended to use this property only when the node is placed on a page.

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

### visualEffects

• `get` **visualEffects**(): readonly [`VisualEffectType`](../enumerations/VisualEffectType.md)[]

#### Returns

readonly [`VisualEffectType`](../enumerations/VisualEffectType.md)[]

The list of visual effects applied to the TextNode.

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

## Methods

### boundsInNode()

• **boundsInNode**(`targetNode`): `Readonly`<[`Rect`](../interfaces/Rect.md)\>

Convert the node's [boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](TextNode.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

Note: The bounding box of an orphaned TextNode may become different after it is placed on a
page. It is recommended to use this method only when the node is placed on a page.

#### Overrides

[`Node`](Node.md).[`boundsInNode`](Node.md#boundsinnode)

---

### cloneInPlace()

• **cloneInPlace**(): [`TextNode`](TextNode.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Creates a copy of this node and its entire subtree of descendants.

The node must be attached to a page as the copy will be added as a sibling.

#### Returns

[`TextNode`](TextNode.md)

#### Inherited from

[`Node`](Node.md).[`cloneInPlace`](Node.md#cloneinplace)

---

### isStandaloneText()

• **isStandaloneText**(): `this is StandaloneTextNode`

Helper method to determine if the text is standalone.

#### Returns

`this is StandaloneTextNode`

---

### isThreadedText()

• **isThreadedText**(): `this is ThreadedTextNode`

Helper method to determine if the text is in a flow.

#### Returns

`this is ThreadedTextNode`

---

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](../interfaces/Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](TextNode.md#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **localPoint**: [`Point`](../interfaces/Point.md)

• **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

[`Node`](Node.md).[`localPointInNode`](Node.md#localpointinnode)

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

[`Node`](Node.md).[`removeFromParent`](Node.md#removefromparent)

---

### rescaleProportionalToHeight()

• **rescaleProportionalToHeight**(`height`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Changes the height to the given value by visually *scaling* the entire content larger or smaller on both axes to
preserve its existing aspect ratio. See [rescaleProportionalToWidth](Node.md#rescaleproportionaltowidth) documentation for additional explanation.

#### Parameters

• **height**: `number`

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`rescaleProportionalToHeight`](Node.md#rescaleproportionaltoheight)

---

### rescaleProportionalToWidth()

• **rescaleProportionalToWidth**(`width`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Changes the width to the given value by visually *scaling* the entire content larger or smaller on both axes to
preserve its existing aspect ratio, keeping its top-left corner ([topLeftLocal](VisualNode.md#topleftlocal)) at a fixed location.

Scaling changes the size of visual styling elements such as stroke width, corner detailing, and font size.
Contrast this to *resizing* operations (such as [resizeToFitWithin](Node.md#resizetofitwithin)), which adjust the bounding box of an
element while trying to preserve the existing size of visual detailing such as strokes, corners, and fonts.

Rescaling becomes baked into the updated values of fields such as stroke weight, rectangle width, etc. (it is not
a separate, persistent scale factor multiplier).

#### Parameters

• **width**: `number`

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`rescaleProportionalToWidth`](Node.md#rescaleproportionaltowidth)

---

### resizeToCover()

• **resizeToCover**(`width`, `height`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Resizes the node to completely *cover* a box of the given dimensions, keeping its top-left corner ([topLeftLocal](VisualNode.md#topleftlocal))
at a fixed location. Nodes with a fixed aspect ratio may extend outside the box on one axis as a result, but
nodes with flexible aspect ratio will be resized to the exact box size specified. See [resizeToFitWithin](Node.md#resizetofitwithin)
documentation for additional explanation.

#### Parameters

• **width**: `number`

• **height**: `number`

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`resizeToCover`](Node.md#resizetocover)

#### See

resizeToFitWithin

---

### resizeToFitWithin()

• **resizeToFitWithin**(`width`, `height`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Resizes the node to fit entirely *within* a box of the given dimensions, keeping its top-left corner ([topLeftLocal](VisualNode.md#topleftlocal))
at a fixed location. Nodes with a fixed aspect ratio may leave unused space on one axis as a result, but nodes
with flexible aspect ratio will be resized to the exact box size specified.

Resizing attempts to preserve the existing size of visual styling elements such as stroke width, corner detailing,
and font size as much as possible. Contrast with *rescaling* (such as [rescaleProportionalToWidth](Node.md#rescaleproportionaltowidth)), which
always changes the size of visual detailing in exact proportion to the change in overall bounding box size. This
API may still produce *some* degree of rescaling if necessary for certain shapes with fixed corner/edge detailing
to fit the box better.

#### Parameters

• **width**: `number`

• **height**: `number`

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`resizeToFitWithin`](Node.md#resizetofitwithin)

#### See

resizeToCover

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

[`Node`](Node.md).[`setPositionInParent`](Node.md#setpositioninparent)

#### Example

Center a rectangle within its parent artboard:

```
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

[`Node`](Node.md).[`setRotationInParent`](Node.md#setrotationinparent)

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```
rectangle.setRotationInParent(45, rectangle.centerPointLocal);
```
