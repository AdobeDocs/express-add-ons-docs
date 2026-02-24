[@express-document-sdk](../overview.md) / ThreadedTextList

# Class: ThreadedTextList

ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node.

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. The [ItemList](item-list.md) subclass adds more
capabilities, and is most frequently encountered as [ArtboardNode.children](artboard-node.md#children) or [GroupNode.children](group-node.md#children).

## Extends

-   [`ReadOnlyItemList`](read-only-item-list.md)<[`ThreadedTextNode`](threaded-text-node.md)\>

## Accessors

### first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

<HorizontalLine />

### last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

<HorizontalLine />

### length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

## Methods

### `[iterator]`()

• **\[iterator\]**(): `Iterator`&lt;[`ThreadedTextNode`](threaded-text-node.md), `any`, `any`&gt;

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;[`ThreadedTextNode`](threaded-text-node.md), `any`, `any`&gt;

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`[iterator]`](ReadOnlyItemList.md#iterator)

<HorizontalLine />

### addFrame()

• **addFrame**(`geometry`?): [`ThreadedTextNode`](threaded-text-node.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Parameters

• **geometry?**: [`TextFrameAreaGeometry`](../interfaces/text-frame-area-geometry.md)

The geometry of the threaded text node in pixels (width and height).

#### Returns

[`ThreadedTextNode`](threaded-text-node.md)

A new ThreadedTextNode that is part of a threaded text flow.

<HorizontalLine />

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: [`ThreadedTextNode`](threaded-text-node.md)

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`indexOf`](read-only-item-list.md#indexof)

<HorizontalLine />

### item()

• **item**(`index`): `undefined` \| [`ThreadedTextNode`](threaded-text-node.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| [`ThreadedTextNode`](threaded-text-node.md)

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`item`](read-only-item-list.md#item)

<HorizontalLine />

### toArray()

• **toArray**(): readonly [`ThreadedTextNode`](threaded-text-node.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ThreadedTextNode`](threaded-text-node.md)[]

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`toArray`](read-only-item-list.md#toarray)
