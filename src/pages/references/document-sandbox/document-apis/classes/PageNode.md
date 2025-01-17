[@express-document-sdk](../overview.md) / PageNode

# Class: PageNode

A PageNode represents a page in the document, a child of the root node of the document's "scenegraph" artwork tree
(see [ExpressRootNode](ExpressRootNode.md)). A page contains one or more artboards representing "scenes" in a linear timeline
sequence. The artboards, in turn, contain all the visual content of the document.

To create new pages, see [PageList.addPage](PageList.md#addpage).

## Extends

-   [`BaseNode`](BaseNode.md)

## Implements

-   `Readonly`<[`IRectangularNode`](../interfaces/IRectangularNode.md)\>

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

• `get` **allChildren**(): `Readonly`<`Iterable`<[`BaseNode`](BaseNode.md), `any`, `any`\>\>

Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or
GroupNode also provide a mutable [ContainerNode.children](../interfaces/ContainerNode.md#children) list. Other nodes with a more specific structure can
hold children in various discrete "slots"; this `allChildren` list includes *all* such children and reflects their
overall display z-order.

Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren
to guarantee all their children are full-fledged Node instances.

#### Returns

`Readonly`<`Iterable`<[`BaseNode`](BaseNode.md), `any`, `any`\>\>

---

### artboards

• `get` **artboards**(): [`ArtboardList`](ArtboardList.md)

The artboards or "scenes" of a page, ordered by timeline sequence.
To create new artboards, see [ArtboardList.addArtboard](ArtboardList.md#addartboard).

#### Returns

[`ArtboardList`](ArtboardList.md)

---

### height

• `get` **height**(): `number`

The height of the node.
All Artboards within a page share the same dimensions.

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

### name

• `get` **name**(): `undefined` \| `string`

The page's name. Displayed as a user-editable label above the current artboard in the UI.

• `set` **name**(`name`): `void`

#### Parameters

• **name**: `undefined` \| `string`

#### Returns

`undefined` \| `string`

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

### type

• `get` **type**(): [`SceneNodeType`](../enumerations/SceneNodeType.md)

The node's type.

#### Returns

[`SceneNodeType`](../enumerations/SceneNodeType.md)

---

### width

• `get` **width**(): `number`

The width of the node.
All Artboards within a page share the same dimensions.

#### Returns

`number`

## Methods

### cloneInPlace()

• **cloneInPlace**(): [`PageNode`](PageNode.md)

Clones this page, all artboards within it, and all content within those artboards. The cloned page is the same size
as the original. Adds the new page immediately after this one in the pages list. The first artboard in the cloned
page becomes the default target for newly inserted content ([Context.insertionParent](Context.md#insertionparent)) and the viewport
switches to display this artboard.

#### Returns

[`PageNode`](PageNode.md)

the cloned page.

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

[`BaseNode`](BaseNode.md).[`removeFromParent`](BaseNode.md#removefromparent)
