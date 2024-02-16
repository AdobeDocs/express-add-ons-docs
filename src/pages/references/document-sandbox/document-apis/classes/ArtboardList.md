[@express-document-sdk](../overview.md) / ArtboardList

# Class: ArtboardList

ArtboardList represents an ordered list of ArtboardNodes arranged in a timeline sequence, where they are called "scenes."
All items in the list are children of a single PageNode.

ArtboardList also provides APIs for adding/removing artboards from the page. ArtboardList is never empty: it is illegal to
remove the last remaining artboard from the list.

## Hierarchy

- [`RestrictedItemList`](RestrictedItemList.md)<[`ArtboardNode`](ArtboardNode.md)\>

  ↳ **`ArtboardList`**

## Accessors

### first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

RestrictedItemList.first

___

### last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

RestrictedItemList.last

___

### length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

#### Inherited from

RestrictedItemList.length

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<[`ArtboardNode`](ArtboardNode.md), `any`, `undefined`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`ArtboardNode`](ArtboardNode.md), `any`, `undefined`\>

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[[iterator]](RestrictedItemList.md#iterator)

___

### addArtboard

▸ **addArtboard**(): [`ArtboardNode`](ArtboardNode.md)

Create a new artboard and add it to the end of the list. The artboard size is the same as others on this page. The
artboard background is set to default fill color DEFAULT_ARTBOARD_FILL_COLOR.

#### Returns

[`ArtboardNode`](ArtboardNode.md)

the newly added artboard.

___

### indexOf

▸ **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`ArtboardNode`](ArtboardNode.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[indexOf](RestrictedItemList.md#indexof)

___

### item

▸ **item**(`index`): `undefined` \| [`ArtboardNode`](ArtboardNode.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Zero-based index |

#### Returns

`undefined` \| [`ArtboardNode`](ArtboardNode.md)

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[item](RestrictedItemList.md#item)

___

### moveAfter

▸ **moveAfter**(`item`, `after`): `void`

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

**`Throws`**

An error if either argument is not contained in this list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`ArtboardNode`](ArtboardNode.md) |
| `after` | [`ArtboardNode`](ArtboardNode.md) |

#### Returns

`void`

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[moveAfter](RestrictedItemList.md#moveafter)

___

### moveBefore

▸ **moveBefore**(`item`, `before`): `void`

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

**`Throws`**

An error if either argument is not contained in this list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`ArtboardNode`](ArtboardNode.md) |
| `before` | [`ArtboardNode`](ArtboardNode.md) |

#### Returns

`void`

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[moveBefore](RestrictedItemList.md#movebefore)

___

### remove

▸ **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

**`Throws`**

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | [`ArtboardNode`](ArtboardNode.md)[] |

#### Returns

`void`

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[remove](RestrictedItemList.md#remove)

___

### toArray

▸ **toArray**(): readonly [`ArtboardNode`](ArtboardNode.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ArtboardNode`](ArtboardNode.md)[]

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[toArray](RestrictedItemList.md#toarray)
