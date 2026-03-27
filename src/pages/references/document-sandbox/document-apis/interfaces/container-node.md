---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: ContainerNode

Interface for any node that contains an entirely generic collection of children. Some ContainerNode classes may host
*additional* children in other specific "slots," such as background or mask layers; and non-ContainerNode classes may
also hold children in specified "slots." Use [Node.allChildren](../classes/node.md#allchildren) for read access to children regardless of node type.

Some ContainerNode classes may be full-fledged Node subclasses (such as Group), while others may be a subclass of the
more minimal VisualNode (such as Artboard).

## Extends

- [`VisualNode`](../classes/visual-node.md)

## Accessors

### addOnData

#### Get Signature

```ts
get addOnData(): AddOnData;
```

Get [AddOnData](../classes/add-on-data.md) reference for managing the private metadata on this node for this add-on.

##### Returns

[`AddOnData`](../classes/add-on-data.md)

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`addOnData`](../classes/visual-node.md#addondata)

<HorizontalLine />

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

[`VisualNode`](../classes/visual-node.md).[`id`](../classes/visual-node.md#id)

<HorizontalLine />

### type

#### Get Signature

```ts
get type(): SceneNodeType;
```

The node's type.

##### Returns

[`SceneNodeType`](../enumerations/scene-node-type.md)

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`type`](../classes/visual-node.md#type)

<HorizontalLine />

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

[`BaseNode`](../classes/base-node.md) \| `undefined`

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`parent`](../classes/visual-node.md#parent)

<HorizontalLine />

### children

#### Get Signature

```ts
get children(): ItemList<Node>;
```

The node's children. Use the methods on this ItemList object to get, add, and remove children.

##### Returns

[`ItemList`](../classes/item-list.md)&lt;[`Node`](../classes/node.md)&gt;

<HorizontalLine />

### allChildren

#### Get Signature

```ts
get allChildren(): Readonly<Iterable<VisualNode>>;
```

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

The children of a VisualNode are always other VisualNode classes (never the more minimal BaseNode).

##### Returns

`Readonly`&lt;`Iterable`&lt;[`VisualNode`](../classes/visual-node.md)&gt;&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`allChildren`](../classes/visual-node.md#allchildren)

<HorizontalLine />

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

[`VisualNode`](../classes/visual-node.md)

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`visualRoot`](../classes/visual-node.md#visualroot)

<HorizontalLine />

### allDescendants

#### Get Signature

```ts
get allDescendants(): Readonly<Iterable<VisualNode>>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to recursively traverse *all* the exposed scenegraph content within the subtree of this node.
Every container node and every leaf node will be visited via a pre-order tree traversal.
Although once called the list of direct descendants is static, changes to further descendants may appear while
iterating depending on when the operation occurs relative to the parent being yielded.
Note that the root node (i.e. what this API was called on) is not visited.

Warning: Processing text content via this API can be error-prone. Use [VisualNode.allTextContent](../classes/visual-node.md#alltextcontent)

##### Returns

`Readonly`&lt;`Iterable`&lt;[`VisualNode`](../classes/visual-node.md)&gt;&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`allDescendants`](../classes/visual-node.md#alldescendants)

<HorizontalLine />

### allTextContent

#### Get Signature

```ts
get allTextContent(): Readonly<Iterable<TextContent>>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to process all text content that is found as part of or within this node. This can be hard to do correctly
via manual tree traversal since multiple [ThreadedTextNode](../classes/threaded-text-node.md) can share a single [TextContentModel](../classes/text-content-model.md).

This iterator returns a single result per TextContentModel that is at least partially displayed within this node,
even if that content is split across several separate TextNode "frames". If this node is or contains some but not
all of the display frames of an overall TextContentModel, that model is still included as a result.

Note that visibleRanges and visibleText may not be sorted as TextNode "frames" can appear in any order in the scenegraph.

##### Returns

`Readonly`&lt;`Iterable`&lt;[`TextContent`](text-content.md)&gt;&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`allTextContent`](../classes/visual-node.md#alltextcontent)

<HorizontalLine />

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

`Readonly`&lt;[`Rect`](rect.md)&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`boundsLocal`](../classes/visual-node.md#boundslocal)

<HorizontalLine />

### centerPointLocal

#### Get Signature

```ts
get centerPointLocal(): Readonly<Point>;
```

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

##### Returns

`Readonly`&lt;[`Point`](point.md)&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`centerPointLocal`](../classes/visual-node.md#centerpointlocal)

<HorizontalLine />

### topLeftLocal

#### Get Signature

```ts
get topLeftLocal(): Readonly<Point>;
```

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

##### Returns

`Readonly`&lt;[`Point`](point.md)&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`topLeftLocal`](../classes/visual-node.md#topleftlocal)

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

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`removeFromParent`](../classes/visual-node.md#removefromparent)

<HorizontalLine />

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
| `localPoint` | [`Point`](point.md) |
| `targetNode` | [`VisualNode`](../classes/visual-node.md) |

#### Returns

`Readonly`&lt;[`Point`](point.md)&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`localPointInNode`](../classes/visual-node.md#localpointinnode)

<HorizontalLine />

### createRendition()

```ts
createRendition(options?): Promise<CreateRenditionResult>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Generates a rendition of this node and its descendants.

If this node contains images, it will wait for the best quality to be available before capturing.
As such, there is a 20s timeout before an error is thrown to prevent indefinite waiting.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`CreateRenditionOptions`](create-rendition-options.md) |

#### Returns

`Promise`&lt;[`CreateRenditionResult`](create-rendition-result.md)&gt;

#### Inherited from

[`VisualNode`](../classes/visual-node.md).[`createRendition`](../classes/visual-node.md#createrendition)
