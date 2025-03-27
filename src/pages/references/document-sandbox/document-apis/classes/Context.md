[@express-document-sdk](../overview.md) / Context

# Class: Context

Contains the user's current selection state, indicating the content they are focused on.

## Accessors

### currentPage

• `get` **currentPage**(): [`PageNode`](PageNode.md)

#### Returns

[`PageNode`](PageNode.md)

The currently viewed page.

---

### hasSelection

• `get` **hasSelection**(): `boolean`

#### Returns

`boolean`

false if the current editable selection does not contain any nodes, otherwise true.

---

### insertionParent

• `get` **insertionParent**(): [`ContainerNode`](../interfaces/ContainerNode.md)

#### Returns

[`ContainerNode`](../interfaces/ContainerNode.md)

the preferred parent to insert newly added content into (i.e., the location content would get inserted if a
user were to Paste or use the Shapes panel in the UI). This will vary depending on the user's current selection and
other UI state.

---

### selection

• `get` **selection**(): readonly [`Node`](Node.md)[]

• `set` **selection**(`nodes`): `void`

Sets the current selection to an array of [Node](Node.md).
Accepts a single node as a shortcut for a length-1 array `[node]` or
`undefined` as a shortcut for `[]`, which clears the selection.

Only node(s) that meet the following criteria can be selected:

- Nodes must be within the current artboard (nodes outside the active artboard are filtered out).
- A node cannot be selected if its ancestor is also selected (descendants are filtered out).
- Locked nodes are filtered out (but will still be included in selectionIncludingNonEditable).

#### Parameters

• **nodes**: `undefined` \| [`Node`](Node.md) \| readonly [`Node`](Node.md)[]

#### Returns

readonly [`Node`](Node.md)[]

the current selection. Nodes that are locked or otherwise non-editable are never included in the selection.

---

### selectionIncludingNonEditable

• `get` **selectionIncludingNonEditable**(): readonly [`Node`](Node.md)[]

#### Returns

readonly [`Node`](Node.md)[]

the current selection _and_ any locked nodes the user has attempted to select at the same time. This can
happen for example if the user clicks on a locked node or if the user drags a selection marquee that overlaps
locked nodes in addition to regular unlocked nodes.

## Methods

### off()

• **off**(`eventName`, `handlerId`): `void`

Unregisters handlers for editor events like selection change.

#### Parameters

• **eventName**: [`selectionChange`](../enumerations/EditorEvent.md#selectionchange)

an editor event name.

• **handlerId**: `string`

a unique ID returned by `editor.context.on` API.
Callback that was previously registered will be removed and will no more be invoked when the event occurs.

#### Returns

`void`

---

### on()

• **on**(`eventName`, `callback`): `string`

Registers a handler for editor events such as selection change.
The registered callback will be invoked when the specified event occurs.
Note: Do not attempt to make changes to the document in response to a selection change callback because it may destabilize the application.

#### Parameters

• **eventName**: [`selectionChange`](../enumerations/EditorEvent.md#selectionchange)

an editor event name.

• **callback**: [`EditorEventHandler`](../type-aliases/EditorEventHandler.md)

a callback to be registered for an editor event.

#### Returns

`string`

a unique ID for the registered event handler.
