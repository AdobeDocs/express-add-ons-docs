[@express-document-sdk](../overview.md) / RestrictedItemList

# Class: RestrictedItemList &lt; T\ &gt;

Base for ItemLists that have restricted behavior on how items are added to the list,
but allow items to be removed and reordered. Subclasses like ItemList may add more
capabilities, however.

## Extends

-   [`ReadOnlyItemList`](read-only-item-list.md)&lt;`T`\ &gt;

## Extended by

-   [`ArtboardList`](artboard-list.md)
-   [`ItemList`](item-list.md)
-   [`PageList`](page-list.md)

## Type parameters

• **T** _extends_ [`ListItem`](../interfaces/list-item.md)

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

• **\[iterator\]**(): `Iterator`&lt;`T`, `any`, `any`\ &gt;

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;`T`, `any`, `any`\ &gt;

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`[iterator]`](read-only-item-list.md#iterator)

<HorizontalLine />

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: `T`

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`indexOf`](read-only-item-list.md#indexof)

<HorizontalLine />

### item()

• **item**(`index`): `undefined` \| `T`

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| `T`

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`item`](read-only-item-list.md#item)

<HorizontalLine />

### moveAfter()

• **moveAfter**(`item`, `after`): `void`

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

• **item**: `T`

• **after**: `T`

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

<HorizontalLine />

### moveBefore()

• **moveBefore**(`item`, `before`): `void`

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

• **item**: `T`

• **before**: `T`

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

<HorizontalLine />

### remove()

• **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

#### Parameters

• ...**items**: `T`[]

#### Returns

`void`

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

<HorizontalLine />

### toArray()

• **toArray**(): readonly `T`[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`toArray`](read-only-item-list.md#toarray)
