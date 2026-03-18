---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: PageNode

A PageNode represents a page in the document, a child of the root node of the document's "scenegraph" artwork tree
(see [ExpressRootNode](express-root-node.md)). A page contains one or more artboards, which in turn contain all the page's visual
content. If multiple artboards are present, each represents a keyframe "scene" in the page's animation timeline.

To create new pages, see [PageList.addPage](page-list.md#addpage).

## Extends

- [`BaseNode`](base-node.md)

## Implements

- [`IRectangularNode`](../interfaces/i-rectangular-node.md)

## Constructors

### Constructor

```ts
new PageNode(): PageNode;
```

#### Returns

`PageNode`

#### Inherited from

[`BaseNode`](base-node.md).[`constructor`](base-node.md#constructor)

## Accessors

### addOnData

#### Get Signature

```ts
get addOnData(): AddOnData;
```

Get [AddOnData](add-on-data.md) reference for managing the private metadata on this node for this add-on.

##### Returns

[`AddOnData`](add-on-data.md)

#### Inherited from

[`BaseNode`](base-node.md).[`addOnData`](base-node.md#addondata)

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

[`BaseNode`](base-node.md).[`id`](base-node.md#id)

<HorizontalLine />

### allChildren

#### Get Signature

```ts
get allChildren(): Readonly<Iterable<BaseNode>>;
```

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/container-node.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

##### Returns

`Readonly`&lt;`Iterable`&lt;[`BaseNode`](base-node.md)&gt;&gt;

#### Inherited from

[`BaseNode`](base-node.md).[`allChildren`](base-node.md#allchildren)

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

[`BaseNode`](base-node.md).[`type`](base-node.md#type)

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

[`BaseNode`](base-node.md) \| `undefined`

#### Inherited from

[`BaseNode`](base-node.md).[`parent`](base-node.md#parent)

<HorizontalLine />

### artboards

#### Get Signature

```ts
get artboards(): ArtboardList;
```

The artboards or "scenes," which hold the page's visual contents. If multiple artboards are present, this list
represents an ordered keyframe sequence in the page's animation timeline.
To create new artboards, see [ArtboardList.addArtboard](artboard-list.md#addartboard).

##### Returns

[`ArtboardList`](artboard-list.md)

<HorizontalLine />

### allDescendants

#### Get Signature

```ts
get allDescendants(): Readonly<Iterable<VisualNode>>;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently <HorizontalLine />experimental only<HorizontalLine /> and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to recursively traverse *all* the exposed scenegraph content within the subtree of this node.
Every container node and every leaf node will be visited via a pre-order tree traversal.
Although once called the list of direct descendants is static, changes to further descendants may appear while
iterating depending on when the operation occurs relative to the parent being yielded.
Note that the root node (i.e. what this API was called on) is not visited.

Warning: Processing text content via this API can be error-prone. Use [VisualNode.allTextContent](visual-node.md#alltextcontent)

##### Returns

`Readonly`&lt;`Iterable`&lt;[`VisualNode`](visual-node.md)&gt;&gt;

<HorizontalLine />

### allTextContent

#### Get Signature

```ts
get allTextContent(): Readonly<Iterable<TextContent>>;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently <HorizontalLine />experimental only<HorizontalLine /> and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Helper to process all text content that is found as part of or within this node. This can be hard to do correctly
via manual tree traversal since multiple [ThreadedTextNode](threaded-text-node.md) can share a single [TextContentModel](text-content-model.md).

This iterator returns a single result per TextContentModel that is at least partially displayed within this node,
even if that content is split across several separate TextNode "frames". If this node is or contains some but not
all of the display frames of an overall TextContentModel, that model is still included as a result.

Note that visibleRanges and visibleText may not be sorted as TextNode "frames" can appear in any order in the scenegraph.

##### Returns

`Readonly`&lt;`Iterable`&lt;[`TextContent`](../interfaces/text-content.md)&gt;&gt;

<HorizontalLine />

### width

#### Get Signature

```ts
get width(): number;
```

The width of the node.

All Artboards within a page share the same dimensions, so changing this value will also automatically adjust the
size of every child [ArtboardNode](artboard-node.md).

Note: changing the page's size does not adjust the size or position of any of visual content inside any child
[ArtboardNode](artboard-node.md). Callers should use their own layout logic to update the content for the new bounds as
desired. For example, making the size smaller could result in content being clipped and hard to access if it is
not adjusted to be visible again.

Must be at least MIN\_PAGE\_DIMENSION and no larger than MAX\_PAGE\_DIMENSION.

##### Returns

`number`

#### Set Signature

```ts
set width(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

[`IRectangularNode`](../interfaces/i-rectangular-node.md).[`width`](../interfaces/i-rectangular-node.md#width)

<HorizontalLine />

### height

#### Get Signature

```ts
get height(): number;
```

The height of the node.

All Artboards within a page share the same dimensions, so changing this value will also automatically adjust the
size of every child [ArtboardNode](artboard-node.md).

Note: changing the page's size does not adjust the size or position of any of visual content inside any child
[ArtboardNode](artboard-node.md). Callers should use their own layout logic to update the content for the new bounds as
desired. For example, making the size smaller could result in content being clipped and hard to access if it is
not adjusted to be visible again.

Must be at least MIN\_PAGE\_DIMENSION and no larger than MAX\_PAGE\_DIMENSION.

##### Returns

`number`

#### Set Signature

```ts
set height(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

[`IRectangularNode`](../interfaces/i-rectangular-node.md).[`height`](../interfaces/i-rectangular-node.md#height)

<HorizontalLine />

### name

#### Get Signature

```ts
get name(): string | undefined;
```

The page's name. Displayed as a user-editable label above the current artboard in the UI.

##### Returns

`string` \| `undefined`

#### Set Signature

```ts
set name(name): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` \| `undefined` |

##### Returns

`void`

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

[`BaseNode`](base-node.md).[`removeFromParent`](base-node.md#removefromparent)

<HorizontalLine />

### cloneInPlace()

```ts
cloneInPlace(): PageNode;
```

Clones this page, all artboards within it, and all content within those artboards. The cloned page is the same size
as the original. Adds the new page immediately after this one in the pages list. The first artboard in the cloned
page becomes the default target for newly inserted content ([Context.insertionParent](context.md#insertionparent)) and the viewport
switches to display this artboard.

#### Returns

`PageNode`

the cloned page.
