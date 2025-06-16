[@express-document-sdk](../overview.md) / PageNode

# Class: PageNode

A PageNode represents a page in the document, a child of the root node of the document's "scenegraph" artwork tree
(see [ExpressRootNode](express-root-node.md)). A page contains one or more artboards, representing "scenes" in a linear timeline
sequence. Those artboards, in turn, contain all the visual content of the document.

To create new pages, see [PageList.addPage](page-list.md#addpage).

## Extends

-   [`BaseNode`](base-node.md)

## Implements

- [`IRectangularNode`](../interfaces/i-rectangular-node.md)

## Accessors

### addOnData

• `get` **addOnData**(): [`AddOnData`](add-on-data.md)

Get [AddOnData](add-on-data.md) reference for managing the private metadata on this node for this add-on.

#### Returns

[`AddOnData`](add-on-data.md)

<HorizontalLine />

### allChildren

• `get` **allChildren**(): `Readonly` `Iterable` [`BaseNode`](base-node.md), `any`, `any`

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/container-node.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes _all_ such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

#### Returns

`Readonly` `Iterable` [`BaseNode`](base-node.md), `any`, `any`

<HorizontalLine />

### artboards

• `get` **artboards**(): [`ArtboardList`](artboard-list.md)

The artboards or "scenes" of a page, ordered by timeline sequence.
To create new artboards, see [ArtboardList.addArtboard](artboard-list.md#addartboard).

#### Returns

[`ArtboardList`](artboard-list.md)

<HorizontalLine />

### height

• `get` **height**(): `number`

The height of the node.
All Artboards within a page share the same dimensions.
Must be at least MIN_PAGE_DIMENSION and no larger than MAX_PAGE_DIMENSION.

• `set` **height**(`value`): `void`

#### Parameters

• **value**: `number`

#### Returns

`number`

<HorizontalLine />

### id

• `get` **id**(): `string`

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

#### Returns

`string`

<HorizontalLine />

### name

• `get` **name**(): `undefined` \| `string`

The page's name. Displayed as a user-editable label above the current artboard in the UI.

• `set` **name**(`name`): `void`

#### Parameters

• **name**: `undefined` \| `string`

#### Returns

`undefined` \| `string`

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

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/scene-node-type.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/scene-node-type.md)

<HorizontalLine />

### width

• `get` **width**(): `number`

The width of the node.
All Artboards within a page share the same dimensions.
Must be at least MIN_PAGE_DIMENSION and no larger than MAX_PAGE_DIMENSION.

• `set` **width**(`value`): `void`

#### Parameters

• **value**: `number`

#### Returns

`number`

## Methods

### cloneInPlace()

• **cloneInPlace**(): [`PageNode`](page-node.md)

Clones this page, all artboards within it, and all content within those artboards. The cloned page is the same size
as the original. Adds the new page immediately after this one in the pages list. The first artboard in the cloned
page becomes the default target for newly inserted content ([Context.insertionParent](context.md#insertionparent)) and the viewport
switches to display this artboard.

#### Returns

[`PageNode`](page-node.md)

the cloned page.

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

[`BaseNode`](base-node.md).[`removeFromParent`](base-node.md#removefromparent)
