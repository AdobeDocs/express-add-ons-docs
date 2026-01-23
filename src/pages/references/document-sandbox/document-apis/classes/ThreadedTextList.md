[@express-document-sdk](../overview.md) / ThreadedTextList

# Class: ThreadedTextList

ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node.

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. The [ItemList](ItemList.md) subclass adds more
capabilities, and is most frequently encountered as [ArtboardNode.children](ArtboardNode.md#children) or [GroupNode.children](GroupNode.md#children).

## Extends

-   [`ReadOnlyItemList`](ReadOnlyItemList.md)<[`ThreadedTextNode`](ThreadedTextNode.md)\>

## Accessors

### first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

---

### last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

---

### length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

## Methods

### `[iterator]`()

• **\[iterator\]**(): `Iterator`<[`ThreadedTextNode`](ThreadedTextNode.md), `any`, `any`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`ThreadedTextNode`](ThreadedTextNode.md), `any`, `any`\>

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`[iterator]`](ReadOnlyItemList.md#iterator)

---

### addFrame()

• **addFrame**(`geometry`?): [`ThreadedTextNode`](ThreadedTextNode.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Parameters

• **geometry?**: [`TextFrameAreaGeometry`](../interfaces/TextFrameAreaGeometry.md)

The geometry of the threaded text node in pixels (width and height).

#### Returns

[`ThreadedTextNode`](ThreadedTextNode.md)

A new ThreadedTextNode that is part of a threaded text flow.

---

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: [`ThreadedTextNode`](ThreadedTextNode.md)

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`indexOf`](ReadOnlyItemList.md#indexof)

---

### item()

• **item**(`index`): `undefined` \| [`ThreadedTextNode`](ThreadedTextNode.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| [`ThreadedTextNode`](ThreadedTextNode.md)

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`item`](ReadOnlyItemList.md#item)

---

### toArray()

• **toArray**(): readonly [`ThreadedTextNode`](ThreadedTextNode.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ThreadedTextNode`](ThreadedTextNode.md)[]

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`toArray`](ReadOnlyItemList.md#toarray)
