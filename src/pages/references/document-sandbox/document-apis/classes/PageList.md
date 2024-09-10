[@express-document-sdk](../overview.md) / PageList

# Class: PageList

PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph"
artwork tree. A page contains one or more artboards, representing "scenes" in a linear timeline sequence. Those artboards
in turn contain all the visual content of the document.

PageList also provides APIs for adding/removing pages from the document. PageList is never empty: it is illegal to
remove the last remaining page from the list.

## Extends

-   [`RestrictedItemList`](RestrictedItemList.md)<[`PageNode`](PageNode.md)\>

## Accessors

### first

▸ `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

---

### last

▸ `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

---

### length

▸ `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

## Methods

### `[iterator]`()

▸ **\[iterator\]**(): `Iterator`<[`PageNode`](PageNode.md), `any`, `undefined`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`PageNode`](PageNode.md), `any`, `undefined`\>

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`[iterator]`](RestrictedItemList.md#iterator)

---

### addPage()

▸ **addPage**(`inputGeometry`): [`PageNode`](PageNode.md)

Create a new page containing a single empty artboard, and add it to the end of the list. The artboard is configured
with the same defaults as in [ArtboardList.addArtboard](ArtboardList.md#addartboard). The page's artboard becomes the default target for
newly inserted content ([Context.insertionParent](Context.md#insertionparent)) and the viewport switches to display this artboard.

#### Parameters

▸ **inputGeometry**: [`RectangleGeometry`](../interfaces/RectangleGeometry.md)

#### Returns

[`PageNode`](PageNode.md)

---

### indexOf()

▸ **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

▸ **item**: [`PageNode`](PageNode.md)

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`indexOf`](RestrictedItemList.md#indexof)

---

### item()

▸ **item**(`index`): `undefined` \| [`PageNode`](PageNode.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

▸ **index**: `number`

Zero-based index

#### Returns

`undefined` \| [`PageNode`](PageNode.md)

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`item`](RestrictedItemList.md#item)

---

### moveAfter()

▸ **moveAfter**(`item`, `after`): `void`

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

▸ **item**: [`PageNode`](PageNode.md)

▸ **after**: [`PageNode`](PageNode.md)

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveAfter`](RestrictedItemList.md#moveafter)

#### Throws

An error if either argument is not contained in this list.

---

### moveBefore()

▸ **moveBefore**(`item`, `before`): `void`

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

▸ **item**: [`PageNode`](PageNode.md)

▸ **before**: [`PageNode`](PageNode.md)

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveBefore`](RestrictedItemList.md#movebefore)

#### Throws

An error if either argument is not contained in this list.

---

### remove()

▸ **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

#### Parameters

▸ ...**items**: [`PageNode`](PageNode.md)[]

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`remove`](RestrictedItemList.md#remove)

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

---

### toArray()

▸ **toArray**(): readonly [`PageNode`](PageNode.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`PageNode`](PageNode.md)[]

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`toArray`](RestrictedItemList.md#toarray)
