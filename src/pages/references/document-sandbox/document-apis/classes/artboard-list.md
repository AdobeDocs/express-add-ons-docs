[@express-document-sdk](../overview.md) / ArtboardList

# Class: ArtboardList

ArtboardList represents an ordered list of ArtboardNodes arranged in a timeline sequence, where they are called "scenes."
All items in the list are children of a single [PageNode](page-node.md).

ArtboardList also provides APIs for adding/removing artboards from the page. ArtboardList is never empty: it is illegal to
remove the last remaining artboard from the list.

## Extends

-   [`RestrictedItemList`](restricted-item-list.md) &lt; [`ArtboardNode`](artboard-node.md)\ &gt;

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

• **\[iterator\]**(): `Iterator` &lt; [`ArtboardNode`](artboard-node.md), `any`, `any`\ &gt;

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator` &lt; [`ArtboardNode`](artboard-node.md), `any`, `any`\ &gt;

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`[iterator]`](restricted-item-list.md#iterator)

<HorizontalLine />

### addArtboard()

• **addArtboard**(): [`ArtboardNode`](artboard-node.md)

Create a new artboard and add it to the end of the list. The artboard size is the same as others on this page. The
artboard background is set to default fill color DEFAULT_ARTBOARD_FILL_COLOR. The new artboard becomes the
default target for newly inserted content (see insertionParent) and the timeline advances to show this artboard
in the current viewport.

#### Returns

[`ArtboardNode`](artboard-node.md)

the newly added artboard.

<HorizontalLine />

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: [`ArtboardNode`](artboard-node.md)

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`indexOf`](restricted-item-list.md#indexof)

<HorizontalLine />

### item()

• **item**(`index`): `undefined` \| [`ArtboardNode`](artboard-node.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| [`ArtboardNode`](artboard-node.md)

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`item`](restricted-item-list.md#item)

<HorizontalLine />

### moveAfter()

• **moveAfter**(`item`, `after`): `void`

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

• **item**: [`ArtboardNode`](artboard-node.md)

• **after**: [`ArtboardNode`](artboard-node.md)

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveAfter`](restricted-item-list.md#moveafter)

#### Throws

An error if either argument is not contained in this list.

<HorizontalLine />

### moveBefore()

• **moveBefore**(`item`, `before`): `void`

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

• **item**: [`ArtboardNode`](artboard-node.md)

• **before**: [`ArtboardNode`](artboard-node.md)

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveBefore`](restricted-item-list.md#movebefore)

#### Throws

An error if either argument is not contained in this list.

<HorizontalLine />

### remove()

• **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

#### Parameters

• ...**items**: [`ArtboardNode`](artboard-node.md)[]

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`remove`](restricted-item-list.md#remove)

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

<HorizontalLine />

### toArray()

• **toArray**(): readonly [`ArtboardNode`](artboard-node.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ArtboardNode`](artboard-node.md)[]

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`toArray`](restricted-item-list.md#toarray)
