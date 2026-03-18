[**@express-document-sdk**](../overview.md)

---

# Class: ArtboardNode

An ArtboardNode represents the topmost container of visual content within a [PageNode](PageNode.md). When a page contains
multiple artboards, each represents a keyframe "scene" in the page's animation timeline.

To create a new artboard, see [ArtboardList.addArtboard](ArtboardList.md#addartboard).

## Extends

- [`VisualNode`](VisualNode.md)

## Implements

- `Readonly`<[`IRectangularNode`](../interfaces/IRectangularNode.md)\>
- [`ContainerNode`](../interfaces/ContainerNode.md)

## Constructors

### Constructor

```ts
new ArtboardNode(): ArtboardNode;
```

#### Returns

`ArtboardNode`

#### Inherited from

[`VisualNode`](VisualNode.md).[`constructor`](VisualNode.md#constructor)

## Accessors

### allChildren

#### Get Signature

```ts
get allChildren(): Readonly<Iterable<Node>>;
```

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of an Artboard are all subclasses of Node (not just the more minimal BaseNode or VisualNode).

##### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`allChildren`](../interfaces/ContainerNode.md#allchildren)

#### Overrides

[`VisualNode`](VisualNode.md).[`allChildren`](VisualNode.md#allchildren)

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

The descendants of an Artboard are all subclasses of Node (not just the more minimal BaseNode or VisualNode).

Warning: Processing text content via this API can be error-prone. Use [VisualNode.allTextContent](VisualNode.md#alltextcontent)

##### Returns

`Readonly`<`Iterable`<[`Node`](Node.md)\>\>

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`allDescendants`](../interfaces/ContainerNode.md#alldescendants)

#### Overrides

[`VisualNode`](VisualNode.md).[`allDescendants`](VisualNode.md#alldescendants)

---

### children

#### Get Signature

```ts
get children(): ItemList<Node>;
```

The artboards's regular children (does not include any "background layer" content if present; use [allChildren](#allchildren)
for a read-only view that includes background content). Use the methods on this `children` ItemList object to get,
add, and remove regular children.

##### Returns

[`ItemList`](ItemList.md)<[`Node`](Node.md)\>

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`children`](../interfaces/ContainerNode.md#children)

---

### fill

#### Get Signature

```ts
get fill(): Readonly<Fill>;
```

##### Returns

`Readonly`<[`Fill`](../interfaces/Fill.md)\>

#### Set Signature

```ts
set fill(fill): void;
```

The background fill of the artboard. Artboards must always have a fill.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `fill` | [`Fill`](../interfaces/Fill.md) |

##### Returns

`void`

---

### parent

#### Get Signature

```ts
get parent(): PageNode | undefined;
```

The node's parent. Undefined if the node is an orphan.

##### Returns

[`PageNode`](PageNode.md) \| `undefined`

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`parent`](../interfaces/ContainerNode.md#parent)

#### Overrides

[`VisualNode`](VisualNode.md).[`parent`](VisualNode.md#parent)

---

### width

#### Get Signature

```ts
get width(): number;
```

The width of the artboard.
Shares the same dimensions as the parent [PageNode](PageNode.md) and other artboards within the parent [PageNode](PageNode.md).
To resize an artboard, resize the parent [PageNode](PageNode.md).

##### Returns

`number`

#### Implementation of

[`IRectangularNode`](../interfaces/IRectangularNode.md).[`width`](../interfaces/IRectangularNode.md#width)

---

### height

#### Get Signature

```ts
get height(): number;
```

The height of the artboard.
Shares the same dimensions as the parent [PageNode](PageNode.md) and other artboards within the parent [PageNode](PageNode.md).
To resize an artboard, resize the parent [PageNode](PageNode.md).

##### Returns

`number`

#### Implementation of

[`IRectangularNode`](../interfaces/IRectangularNode.md).[`height`](../interfaces/IRectangularNode.md#height)

---

### addOnData

#### Get Signature

```ts
get addOnData(): AddOnData;
```

Get [AddOnData](AddOnData.md) reference for managing the private metadata on this node for this add-on.

##### Returns

[`AddOnData`](AddOnData.md)

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`addOnData`](../interfaces/ContainerNode.md#addondata)

#### Inherited from

[`VisualNode`](VisualNode.md).[`addOnData`](VisualNode.md#addondata)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`id`](../interfaces/ContainerNode.md#id)

#### Inherited from

[`VisualNode`](VisualNode.md).[`id`](VisualNode.md#id)

---

### type

#### Get Signature

```ts
get type(): SceneNodeType;
```

The node's type.

##### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`type`](../interfaces/ContainerNode.md#type)

#### Inherited from

[`VisualNode`](VisualNode.md).[`type`](VisualNode.md#type)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`visualRoot`](../interfaces/ContainerNode.md#visualroot)

#### Inherited from

[`VisualNode`](VisualNode.md).[`visualRoot`](VisualNode.md#visualroot)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`allTextContent`](../interfaces/ContainerNode.md#alltextcontent)

#### Inherited from

[`VisualNode`](VisualNode.md).[`allTextContent`](VisualNode.md#alltextcontent)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`boundsLocal`](../interfaces/ContainerNode.md#boundslocal)

#### Inherited from

[`VisualNode`](VisualNode.md).[`boundsLocal`](VisualNode.md#boundslocal)

---

### centerPointLocal

#### Get Signature

```ts
get centerPointLocal(): Readonly<Point>;
```

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`centerPointLocal`](../interfaces/ContainerNode.md#centerpointlocal)

#### Inherited from

[`VisualNode`](VisualNode.md).[`centerPointLocal`](VisualNode.md#centerpointlocal)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`topLeftLocal`](../interfaces/ContainerNode.md#topleftlocal)

#### Inherited from

[`VisualNode`](VisualNode.md).[`topLeftLocal`](VisualNode.md#topleftlocal)

## Methods

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`removeFromParent`](../interfaces/ContainerNode.md#removefromparent)

#### Inherited from

[`VisualNode`](VisualNode.md).[`removeFromParent`](VisualNode.md#removefromparent)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`localPointInNode`](../interfaces/ContainerNode.md#localpointinnode)

#### Inherited from

[`VisualNode`](VisualNode.md).[`localPointInNode`](VisualNode.md#localpointinnode)

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

#### Implementation of

[`ContainerNode`](../interfaces/ContainerNode.md).[`createRendition`](../interfaces/ContainerNode.md#createrendition)

#### Inherited from

[`VisualNode`](VisualNode.md).[`createRendition`](VisualNode.md#createrendition)
