[@add-on-hlapi-sdk](../overview.md) / PageList

# Class: PageList

PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph"
artwork tree. A page contains one or more artboards, representing "scenes" in a linear timeline sequence. Those artboards
in turn contain all the visual content of the document.

PageList also provides APIs for adding/removing pages from the document. PageList is never empty: it is illegal to
remove the last remaining page from the list.

## Hierarchy

- [`ReadOnlyItemList`](ReadOnlyItemList.md)<[`PageNode`](PageNode.md)\>

  ↳ **`PageList`**

## Table of contents

### Accessors

- [first](PageList.md#first)
- [last](PageList.md#last)
- [length](PageList.md#length)

### Methods

- [[iterator]](PageList.md#[iterator])
- [addPage](PageList.md#addPage)
- [item](PageList.md#item)
- [toArray](PageList.md#toArray)

## Accessors

### first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

ReadOnlyItemList.first

___

### last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

ReadOnlyItemList.last

___

### length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

#### Inherited from

ReadOnlyItemList.length

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<[`PageNode`](PageNode.md), `any`, `undefined`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`PageNode`](PageNode.md), `any`, `undefined`\>

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[[iterator]](ReadOnlyItemList.md#[iterator])

___

### addPage

▸ **addPage**(`geometry`): [`PageNode`](PageNode.md)

Create a new page containing a single empty artboard, and add it to the end of the list. The artboard is configured
with the same defaults as in [addArtboard](ArtboardList.md#addArtboard). The page's artboard becomes the default target for
newly inserted content ([insertionParent](Context.md#insertionParent)) and the viewport switches to display this artboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geometry` | [`RectangleGeometry`](../interfaces/RectangleGeometry.md) | The size of the new page. |

#### Returns

[`PageNode`](PageNode.md)

___

### item

▸ **item**(`index`): `undefined` \| [`PageNode`](PageNode.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Zero-based index |

#### Returns

`undefined` \| [`PageNode`](PageNode.md)

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[item](ReadOnlyItemList.md#item)

___

### toArray

▸ **toArray**(): readonly [`PageNode`](PageNode.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`PageNode`](PageNode.md)[]

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[toArray](ReadOnlyItemList.md#toArray)
