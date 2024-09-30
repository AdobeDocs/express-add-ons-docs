[@express-document-sdk](../overview.md) / TextNode

# Class: TextNode

A TextNode represents a text display frame in the scenegraph. It may display an entire piece of text, or sometimes just
a subset of longer text that flows across multiple TextNode frames. Because of this, the TextNode does not directly hold
the text content and styles – instead it refers to a [TextContentModel](TextContentModel.md), which may be shared across multiple frames.

## Extends

-   [`Node`](Node.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](AddOnData.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Get [AddOnData](AddOnData.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](AddOnData.md)

---

### allChildren

• `get` **allChildren**(): `Readonly`<`Iterable`<[`Node`](Node.md)\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

#### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

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
[boundsLocal](VisualNode.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
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

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal
box.

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

---

### fullContent

• `get` **fullContent**(): [`TextContentModel`](TextContentModel.md)

The model containing the complete text string and its styles, only part of which may be visible within the bounds of
this specific TextNode "frame." The full text may be split across multiple frames, and/or it may be clipped if a
fixed-size frame using AreaTextLayout does not fit all the (remaining) text.

Note: When traversing the scenegraph in search of text content, bear in mind that multiple TextNodes may refer to the
same single TextContentModel; this can give the impression that the same text is duplicated multiple times when it is
not. Use TextContentModel.entity to determine whether a given piece of text content is unique or if it's already been
encountered before.

#### Returns

[`TextContentModel`](TextContentModel.md)

---

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

---

### layout

• `get` **layout**(): `Readonly`<[`PointTextLayout`](../interfaces/PointTextLayout.md) \| [`AutoHeightTextLayout`](../interfaces/AutoHeightTextLayout.md) \| [`AreaTextLayout`](../interfaces/AreaTextLayout.md) \| [`UnsupportedTextLayout`](../interfaces/UnsupportedTextLayout.md)\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

• `set` **layout**(`layout`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Sets the layout mode of the text node "frame."
Throws if changing text layout to/from Dynamic or Circular layout when the text contains font(s) unavailable to the current user.

If this TextNode is part of a multi-frame text content flow, it must be configured to use AreaTextLayout. Other
layout modes are only available for single-frame text.

#### Parameters

• **layout**: [`PointTextLayout`](../interfaces/PointTextLayout.md) \| [`AutoHeightTextLayout`](../interfaces/AutoHeightTextLayout.md) \| [`AreaTextLayout`](../interfaces/AreaTextLayout.md)

#### Returns

`Readonly`<[`PointTextLayout`](../interfaces/PointTextLayout.md) \| [`AutoHeightTextLayout`](../interfaces/AutoHeightTextLayout.md) \| [`AreaTextLayout`](../interfaces/AreaTextLayout.md) \| [`UnsupportedTextLayout`](../interfaces/UnsupportedTextLayout.md)\>

The layout mode of the text node "frame."

---

### locked

• `get` **locked**(): `boolean`

The node's lock/unlock state. Locked nodes are excluded from the selection (see [Context.selection](Context.md#selection)), and
cannot be edited by the user unless they are unlocked first.

• `set` **locked**(`locked`): `void`

#### Parameters

• **locked**: `boolean`

#### Returns

`boolean`

---

### nextTextNode

• `get` **nextTextNode**(): `undefined` \| [`TextNode`](TextNode.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The next TextNode that text overflowing this node will spill into, if any. If undefined and this TextNode is fixed size
(AreaTextLayout), any text content that does not fit within this node's area will be clipped.

To get *all* TextNodes that the text content may be split across, use `TextNode.fullContent.allTextNodes`.

#### Returns

`undefined` \| [`TextNode`](TextNode.md)

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
WARNING: If a piece of text content is split across several TextNodes, *each* TextNode's `text` getter will return
the *entire* text content string.

#### Deprecated

- Use `TextNode.fullContent.text` instead

• `set` **text**(`textContent`): `void`

Sets the text content of the text node.
WARNING: If a piece of text content is split across several TextNodes,
*each* TextNode's `text` setter will sets the *entire* text content string.

#### Deprecated

- Use `TextNode.fullContent.text` instead

#### Parameters

• **textContent**: `string`

#### Returns

`string`

---

### textAlignment

• `get` **textAlignment**(): [`TextAlignment`](../enumerations/TextAlignment.md)

The horizontal text alignment of the text node. Alignment is always the same across this node's entire text content.

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

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Returns

readonly [`VisualEffectType`](../enumerations/VisualEffectType.md)[]

The list of visual effects applied to the text node.

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

Convert the node's [boundsLocal](VisualNode.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](VisualNode.md#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

• **targetNode**: [`VisualNode`](VisualNode.md)

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Inherited from

[`Node`](Node.md).[`boundsInNode`](Node.md#boundsinnode)

---

### localPointInNode()

• **localPointInNode**(`localPoint`, `targetNode`): `Readonly`<[`Point`](../interfaces/Point.md)\>

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](VisualNode.md#visualroot), but can lie anywhere within that subtree relative to one
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

[`Node`](Node.md).[`setRotationInParent`](Node.md#setrotationinparent)

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, { x: rectangle.width / 2, y: rectangle.height / 2 });
```
