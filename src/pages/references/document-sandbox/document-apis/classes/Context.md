[@express-document-sdk](../overview.md) / Context

# Class: Context

Contains the user's current selection state, indicating the content they are focused on.

## Accessors

### currentPage

▸ `get` **currentPage**(): [`PageNode`](PageNode.md)

#### Returns

[`PageNode`](PageNode.md)

The currently viewed page.

---

### hasSelection

▸ `get` **hasSelection**(): `boolean`

#### Returns

`boolean`

false if the current editable selection does not contain any nodes, otherwise true.

---

### insertionParent

▸ `get` **insertionParent**(): [`ContainerNode`](../interfaces/ContainerNode.md)

#### Returns

[`ContainerNode`](../interfaces/ContainerNode.md)

the preferred parent to insert newly added content into (i.e., the location content would get inserted if a
user were to Paste or use the Shapes panel in the UI). This will vary depending on the user's current selection and
other UI state.

---

### selection

▸ `get` **selection**(): readonly [`Node`](Node.md)[]

▸ `set` **selection**(`nodes`): `void`

Sets the current selection, automatically ensuring these rules are met:

-   Nodes must be within the current artboard (others are filtered out).
-   A node cannot be selected at the same time as its ancestor (descendants are filtered out).
-   Locked nodes are filtered out (but will still be included in selectionIncludingNonEditable).

#### Parameters

▸ **nodes**: `undefined` \| [`Node`](Node.md) \| readonly [`Node`](Node.md)[]

#### Returns

readonly [`Node`](Node.md)[]

the current selection. Nodes that are locked or otherwise non-editable are never included in the selection.

---

### selectionIncludingNonEditable

▸ `get` **selectionIncludingNonEditable**(): readonly [`Node`](Node.md)[]

#### Returns

readonly [`Node`](Node.md)[]

the current selection _and_ any locked nodes the user has attempted to select at the same time. This can
happen for example if the user clicks on a locked node or if the user drags a selection marquee that overlaps
locked nodes in addition to regular unlocked nodes.
