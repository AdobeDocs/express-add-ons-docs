[@add-on-hlapi-sdk](../overview.md) / RestrictedItemList

# Class: RestrictedItemList<T\>

Base for ItemLists that have restricted behavior on how items are added to the list,
but allow items to be removed and reordered. Subclasses like ItemList may add more
capabilities, however.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListItem`](../interfaces/ListItem.md) |

## Hierarchy

- [`ReadOnlyItemList`](ReadOnlyItemList.md)<`T`\>

  ↳ **`RestrictedItemList`**

  ↳↳ [`ArtboardList`](ArtboardList.md)

  ↳↳ [`ItemList`](ItemList.md)

  ↳↳ [`PageList`](PageList.md)

## Table of contents

### Accessors

- [first](RestrictedItemList.md#first)
- [last](RestrictedItemList.md#last)
- [length](RestrictedItemList.md#length)

### Methods

- [[iterator]](RestrictedItemList.md#[iterator])
- [indexOf](RestrictedItemList.md#indexOf)
- [item](RestrictedItemList.md#item)
- [moveAfter](RestrictedItemList.md#moveAfter)
- [moveBefore](RestrictedItemList.md#moveBefore)
- [remove](RestrictedItemList.md#remove)
- [toArray](RestrictedItemList.md#toArray)

## Accessors

### <a id="first" name="first"></a> first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

ReadOnlyItemList.first

___

### <a id="last" name="last"></a> last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

ReadOnlyItemList.last

___

### <a id="length" name="length"></a> length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

#### Inherited from

ReadOnlyItemList.length

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

▸ **[iterator]**(): `Iterator`<`T`, `any`, `undefined`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<`T`, `any`, `undefined`\>

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[[iterator]](ReadOnlyItemList.md#[iterator])

___

### <a id="indexOf" name="indexOf"></a> indexOf

▸ **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[indexOf](ReadOnlyItemList.md#indexOf)

___

### <a id="item" name="item"></a> item

▸ **item**(`index`): `undefined` \| `T`

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Zero-based index |

#### Returns

`undefined` \| `T`

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[item](ReadOnlyItemList.md#item)

___

### <a id="moveAfter" name="moveAfter"></a> moveAfter

▸ **moveAfter**(`item`, `after`): `void`

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

**`Throws`**

An error if either argument is not contained in this list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `after` | `T` |

#### Returns

`void`

___

### <a id="moveBefore" name="moveBefore"></a> moveBefore

▸ **moveBefore**(`item`, `before`): `void`

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

**`Throws`**

An error if either argument is not contained in this list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `before` | `T` |

#### Returns

`void`

___

### <a id="remove" name="remove"></a> remove

▸ **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

**`Throws`**

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | `T`[] |

#### Returns

`void`

___

### <a id="toArray" name="toArray"></a> toArray

▸ **toArray**(): readonly `T`[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[toArray](ReadOnlyItemList.md#toArray)
