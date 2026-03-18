[**@express-document-sdk**](../overview.md)

---

# Class: ExpressContext

Contains The Express specific APIs related to the current selection state.

## Extends

- [`Context`](Context.md)

## Constructors

### Constructor

```ts
new ExpressContext(): ExpressContext;
```

#### Returns

`ExpressContext`

#### Inherited from

[`Context`](Context.md).[`constructor`](Context.md#constructor)

## Accessors

### selection

#### Get Signature

```ts
get selection(): readonly Node[];
```

##### Returns

readonly [`Node`](Node.md)[]

the current selection. Nodes that are locked or otherwise non-editable are never included in the regular
selection (see [selectionIncludingNonEditable](Context.md#selectionincludingnoneditable) to get any locked nodes the user may have clicked).

#### Set Signature

```ts
set selection(nodes): void;
```

Sets the current selection to an array of [Node](Node.md).
Accepts a single node as a shortcut for a length-1 array `[node]` or
`undefined` as a shortcut for `[]`, which clears the selection.

Only node(s) that meet the following criteria can be selected:

- Nodes must be within the current artboard (nodes outside the active artboard are filtered out).
- A node cannot be selected if its ancestor is also selected (descendants are filtered out).
- Locked nodes are filtered out (but will still be included in selectionIncludingNonEditable).

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`Node`](Node.md) \| readonly [`Node`](Node.md)[] \| `undefined` |

##### Returns

`void`

#### Inherited from

[`Context`](Context.md).[`selection`](Context.md#selection)

---

### selectionIncludingNonEditable

#### Get Signature

```ts
get selectionIncludingNonEditable(): readonly Node[];
```

##### Returns

readonly [`Node`](Node.md)[]

the current selection *and* any locked nodes the user has attempted to select at the same time. This can
happen for example if the user clicks on a locked node or if the user drags a selection marquee that overlaps
locked nodes in addition to regular unlocked nodes.

#### Inherited from

[`Context`](Context.md).[`selectionIncludingNonEditable`](Context.md#selectionincludingnoneditable)

---

### hasSelection

#### Get Signature

```ts
get hasSelection(): boolean;
```

##### Returns

`boolean`

false if the current editable selection does not contain any nodes, otherwise true.

#### Inherited from

[`Context`](Context.md).[`hasSelection`](Context.md#hasselection)

---

### insertionParent

#### Get Signature

```ts
get insertionParent(): ContainerNode;
```

##### Returns

[`ContainerNode`](../interfaces/ContainerNode.md)

the preferred parent to insert newly added content into (i.e., the location content would get inserted if a
user were to Paste or use the Shapes panel in the UI). This will vary depending on the user's current selection and
other UI state.

#### Inherited from

[`Context`](Context.md).[`insertionParent`](Context.md#insertionparent)

---

### currentPage

#### Get Signature

```ts
get currentPage(): PageNode;
```

##### Returns

[`PageNode`](PageNode.md)

The currently viewed page.
To change the current page, call [ExpressViewport.bringIntoView](ExpressViewport.md#bringintoview) with an artboard or other content on that page.

## Methods

### on()

```ts
on(eventName, callback): string;
```

Registers a handler for editor events such as selection change.
The registered callback will be invoked when the specified event occurs.
Note: Do not attempt to make changes to the document in response to a selection change callback because it may destabilize the application.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | [`selectionChange`](../enumerations/EditorEvent.md#selectionchange) | an editor event name. |
| `callback` | [`EditorEventHandler`](../type-aliases/EditorEventHandler.md) | a callback to be registered for an editor event. |

#### Returns

`string`

a unique ID for the registered event handler.

#### Inherited from

[`Context`](Context.md).[`on`](Context.md#on)

---

### off()

```ts
off(eventName, handlerId): void;
```

Unregisters handlers for editor events like selection change.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | [`selectionChange`](../enumerations/EditorEvent.md#selectionchange) | an editor event name. |
| `handlerId` | `string` | a unique ID returned by `editor.context.on` API. Callback that was previously registered will be removed and will no more be invoked when the event occurs. |

#### Returns

`void`

#### Inherited from

[`Context`](Context.md).[`off`](Context.md#off)
