[**@express-document-sdk**](../overview.md)

---

# Class: StrokableNode

Base class for a Node that can have its own stroke.

## Extends

- [`Node`](Node.md)

## Extended by

- [`FillableNode`](FillableNode.md)
- [`LineNode`](LineNode.md)
- [`StrokeShapeNode`](StrokeShapeNode.md)

## Implements

- [`IStrokableNode`](../interfaces/IStrokableNode.md)

## Constructors

### Constructor

```ts
new StrokableNode(): StrokableNode;
```

#### Returns

`StrokableNode`

#### Inherited from

[`Node`](Node.md).[`constructor`](Node.md#constructor)

## Accessors

### addOnData

#### Get Signature

```ts
get addOnData(): AddOnData;
```

Get [AddOnData](AddOnData.md) reference for managing the private metadata on this node for this add-on.

##### Returns

[`AddOnData`](AddOnData.md)

#### Inherited from

[`Node`](Node.md).[`addOnData`](Node.md#addondata)

---

### id

#### Get Signature

```ts
get id(): string;
```

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

##### Returns

`string`

#### Inherited from

[`Node`](Node.md).[`id`](Node.md#id)

---

### allChildren

#### Get Signature

```ts
get allChildren(): Readonly<Iterable<Node>>;
```

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a Node are always other Node classes (never the more minimal BaseNode).

##### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

#### Inherited from

[`Node`](Node.md).[`allChildren`](Node.md#allchildren)

---

### allDescendants

#### Get Signature

```ts
get allDescendants(): Readonly<Iterable<Node>>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to recursively traverse *all* the exposed scenegraph content within the subtree of this node.
Every container node and every leaf node will be visited via a pre-order tree traversal.
Although once called the list of direct descendants is static, changes to further descendants may appear while
iterating depending on when the operation occurs relative to the parent being yielded.
Note that the root node (i.e. what this API was called on) is not visited.

The descendants of a Node are always other Node classes (never the more minimal BaseNode).

Warning: Processing text content via this API can be error-prone. Use [VisualNode.allTextContent](VisualNode.md#alltextcontent)

##### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

#### Inherited from

[`Node`](Node.md).[`allDescendants`](Node.md#alldescendants)

---

### boundsInParent

#### Get Signature

```ts
get boundsInParent(): Readonly<Rect>;
```

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

##### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Inherited from

[`Node`](Node.md).[`boundsInParent`](Node.md#boundsinparent)

---

### type

#### Get Signature

```ts
get type(): SceneNodeType;
```

The node's type.

##### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

#### Inherited from

[`Node`](Node.md).[`type`](Node.md#type)

---

### parent

#### Get Signature

```ts
get parent(): BaseNode | undefined;
```

The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document
content.

Nodes that have been deleted are "orphaned," with a parent chain that terminates in `undefined` without reaching the
root node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node
that was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo.

##### Returns

[`BaseNode`](BaseNode.md) \| `undefined`

#### Inherited from

[`Node`](Node.md).[`parent`](Node.md#parent)

---

### translation

#### Get Signature

```ts
get translation(): Readonly<Point>;
```

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Set Signature

```ts
set translation(value): void;
```

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`Point`](../interfaces/Point.md) |

##### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`translation`](Node.md#translation)

---

### rotation

#### Get Signature

```ts
get rotation(): number;
```

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

##### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`rotation`](Node.md#rotation)

---

### rotationInScreen

#### Get Signature

```ts
get rotationInScreen(): number;
```

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

##### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`rotationInScreen`](Node.md#rotationinscreen)

---

### opacity

#### Get Signature

```ts
get opacity(): number;
```

The node's opacity, from 0.0 to 1.0

##### Returns

`number`

#### Set Signature

```ts
set opacity(opacity): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `opacity` | `number` |

##### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`opacity`](Node.md#opacity)

---

### transformMatrix

#### Get Signature

```ts
get transformMatrix(): mat2d;
```

The node's transform matrix relative to its parent.

##### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Inherited from

[`Node`](Node.md).[`transformMatrix`](Node.md#transformmatrix)

---

### locked

#### Get Signature

```ts
get locked(): boolean;
```

The node's lock/unlock state. Locked nodes are excluded from the selection (see [Context.selection](Context.md#selection)), and
cannot be edited by the user in the UI unless they are unlocked first. It is still possible to mutate locked nodes
at the model level using these APIs. However, please consider if modifying a locked node would align with user
expectations before doing so.

##### Returns

`boolean`

#### Set Signature

```ts
set locked(locked): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `locked` | `boolean` |

##### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`locked`](Node.md#locked)

---

### blendMode

#### Get Signature

```ts
get blendMode(): BlendMode;
```

Blend mode determines how a node is composited onto the content below it. The default value is
[BlendMode.normal](../enumerations/BlendMode.md#normal) for most nodes, and [BlendMode.passThrough](../enumerations/BlendMode.md#passthrough) for GroupNodes.

##### Returns

[`BlendMode`](../enumerations/BlendMode.md)

#### Set Signature

```ts
set blendMode(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`BlendMode`](../enumerations/BlendMode.md) |

##### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`blendMode`](Node.md#blendmode)

---

### stroke

#### Get Signature

```ts
get stroke(): Readonly<Stroke> | undefined;
```

##### Returns

`Readonly`<[`Stroke`](../interfaces/Stroke.md)\> \| `undefined`

#### Set Signature

```ts
set stroke(stroke): void;
```

The stroke applied to the shape, if any.
Only [SolidColorStroke](../interfaces/SolidColorStroke.md) values are supported by the setter, but the "type" field is optional
for backward compatibility. Throws if another type is provided.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `stroke` | \| [`SolidColorStrokeWithOptionalType`](../type-aliases/SolidColorStrokeWithOptionalType.md) \| `undefined` |

##### Returns

`void`

#### Implementation of

[`IStrokableNode`](../interfaces/IStrokableNode.md).[`stroke`](../interfaces/IStrokableNode.md#stroke)

---

### visualRoot

#### Get Signature

```ts
get visualRoot(): VisualNode;
```

The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned
content, it will be the root of the deleted content (which might be this node itself).

Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document's
structure. Nodes that are in different visual roots have no spatial relation to one another; there is no
meaningful comparison or conversion between the bounds or coordinate spaces of such nodes.

##### Returns

[`VisualNode`](VisualNode.md)

#### Inherited from

[`Node`](Node.md).[`visualRoot`](Node.md#visualroot)

---

### allTextContent

#### Get Signature

```ts
get allTextContent(): Readonly<Iterable<TextContent>>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to process all text content that is found as part of or within this node. This can be hard to do correctly
via manual tree traversal since multiple [ThreadedTextNode](ThreadedTextNode.md) can share a single [TextContentModel](TextContentModel.md).

This iterator returns a single result per TextContentModel that is at least partially displayed within this node,
even if that content is split across several separate TextNode "frames". If this node is or contains some but not
all of the display frames of an overall TextContentModel, that model is still included as a result.

Note that visibleRanges and visibleText may not be sorted as TextNode "frames" can appear in any order in the scenegraph.

##### Returns

`Readonly`<`Iterable`<[`TextContent`](../interfaces/TextContent.md)\>\>

#### Inherited from

[`Node`](Node.md).[`allTextContent`](Node.md#alltextcontent)

---

### boundsLocal

#### Get Signature

```ts
get boundsLocal(): Readonly<Rect>;
```

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

##### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Inherited from

[`Node`](Node.md).[`boundsLocal`](Node.md#boundslocal)

---

### centerPointLocal

#### Get Signature

```ts
get centerPointLocal(): Readonly<Point>;
```

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

[`Node`](Node.md).[`centerPointLocal`](Node.md#centerpointlocal)

---

### topLeftLocal

#### Get Signature

```ts
get topLeftLocal(): Readonly<Point>;
```

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

[`Node`](Node.md).[`topLeftLocal`](Node.md#topleftlocal)

## Methods

### boundsInNode()

```ts
boundsInNode(targetNode): Readonly<Rect>;
```

Convert the node's [boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same [visualRoot](#visualroot), but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetNode` | [`VisualNode`](VisualNode.md) |

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Inherited from

[`Node`](Node.md).[`boundsInNode`](Node.md#boundsinnode)

---

### removeFromParent()

```ts
removeFromParent(): void;
```

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

```ts
setPositionInParent(parentPoint, localRegistrationPoint): void;
```

Move the node so the given `localRegistrationPoint` in its local coordinates is placed at the given
`parentPoint` in its parent's coordinates (taking into account any rotation on this node, etc.).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentPoint` | [`Point`](../interfaces/Point.md) | Point in this node's parent's coordinate space to move `localRegistrationPoint` to |
| `localRegistrationPoint` | [`Point`](../interfaces/Point.md) | Point in this node's local coordinate space to align with `parentPoint` |

#### Returns

`void`

#### Example

Center a rectangle within its parent artboard:

```js
rectangle.setPositionInParent(
    { x: artboard.width / 2, y: artboard.height / 2 },
    { x: rectangle.width / 2, y: rectangle.height / 2 }
);
```

#### Inherited from

[`Node`](Node.md).[`setPositionInParent`](Node.md#setpositioninparent)

---

### setRotationInParent()

```ts
setRotationInParent(angleInDegrees, localRotationPoint): void;
```

Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the
node’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already
have had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other
ancestors also have rotation of their own.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `angleInDegrees` | `number` | Angle in degrees. |
| `localRotationPoint` | [`Point`](../interfaces/Point.md) | Point to rotate around, in node's local coordinates. |

#### Returns

`void`

#### Example

Rotate the rectangle 45 degrees clockwise around its centerpoint:

```js
rectangle.setRotationInParent(45, rectangle.centerPointLocal);
```

#### Inherited from

[`Node`](Node.md).[`setRotationInParent`](Node.md#setrotationinparent)

---

### resize()

```ts
resize(options): void;
```

Resizes this node based on the given [ResizeOptions](../type-aliases/ResizeOptions.md).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`ResizeOptions`](../type-aliases/ResizeOptions.md) |

#### Returns

`void`

#### Inherited from

[`Node`](Node.md).[`resize`](Node.md#resize)

---

### cloneInPlace()

```ts
cloneInPlace(): StrokableNode;
```

Creates a copy of this node and its entire subtree of descendants.

The node must be attached to a page as the copy will be added as a sibling.

#### Returns

`StrokableNode`

#### Inherited from

[`Node`](Node.md).[`cloneInPlace`](Node.md#cloneinplace)

---

### localPointInNode()

```ts
localPointInNode(localPoint, targetNode): Readonly<Point>;
```

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same [visualRoot](#visualroot), but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `localPoint` | [`Point`](../interfaces/Point.md) |
| `targetNode` | [`VisualNode`](VisualNode.md) |

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Inherited from

[`Node`](Node.md).[`localPointInNode`](Node.md#localpointinnode)

---

### createRendition()

```ts
createRendition(options?): Promise<CreateRenditionResult>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Generates a rendition of this node and its descendants.

If this node contains images, it will wait for the best quality to be available before capturing.
As such, there is a 20s timeout before an error is thrown to prevent indefinite waiting.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`CreateRenditionOptions`](../interfaces/CreateRenditionOptions.md) |

#### Returns

`Promise`<[`CreateRenditionResult`](../interfaces/CreateRenditionResult.md)\>

#### Inherited from

[`Node`](Node.md).[`createRendition`](Node.md#createrendition)
