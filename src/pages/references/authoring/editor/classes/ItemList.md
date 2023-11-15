[@add-on-hlapi-sdk](../overview.md) / ItemList

# Class: ItemList<T\>

ItemList represents an ordered list of API objects, representing items that are all children of the
same parent node. (The reverse is not necessarily true, however: this list might not include all
children that exist in the parent node. See [allChildren](Node.md#allChildren) for details).

ItemList also provides APIs for manipulating the list by adding items to the parent or removing items from the parent.

This class is used in different places for various types of items, including Nodes, Fills, and Strokes.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListItem`](../interfaces/ListItem.md) |

## Hierarchy

- [`RestrictedItemList`](RestrictedItemList.md)<`T`\>

  ↳ **`ItemList`**

## Table of contents

### Accessors

- [first](ItemList.md#first)
- [last](ItemList.md#last)
- [length](ItemList.md#length)

### Methods

- [[iterator]](ItemList.md#[iterator])
- [append](ItemList.md#append)
- [clear](ItemList.md#clear)
- [indexOf](ItemList.md#indexOf)
- [insertAfter](ItemList.md#insertAfter)
- [insertBefore](ItemList.md#insertBefore)
- [item](ItemList.md#item)
- [moveAfter](ItemList.md#moveAfter)
- [moveBefore](ItemList.md#moveBefore)
- [remove](ItemList.md#remove)
- [replace](ItemList.md#replace)
- [toArray](ItemList.md#toArray)

## Accessors

### <a id="first" name="first"></a> first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

RestrictedItemList.first

___

### <a id="last" name="last"></a> last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

#### Inherited from

RestrictedItemList.last

___

### <a id="length" name="length"></a> length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

#### Inherited from

RestrictedItemList.length

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

▸ **[iterator]**(): `Iterator`<`T`, `any`, `undefined`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<`T`, `any`, `undefined`\>

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[[iterator]](RestrictedItemList.md#[iterator])

___

### <a id="append" name="append"></a> append

▸ **append**(...`items`): `void`

Add one or more items to the end of the list. The last argument will become the last item in this list. Items are
removed from their previous parent, if any – or if an item is already in *this* list, its index is simply changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | `T`[] |

#### Returns

`void`

___

### <a id="clear" name="clear"></a> clear

▸ **clear**(): `void`

Remove all items from this list. No-op if list is already empty.

#### Returns

`void`

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

[RestrictedItemList](RestrictedItemList.md).[indexOf](RestrictedItemList.md#indexOf)

___

### <a id="insertAfter" name="insertAfter"></a> insertAfter

▸ **insertAfter**(`newItem`, `after`): `void`

Insert `newItem` so it is immediately after `after` in this list: places `newItem` at the index one higher than `after`,
shifting all later items to higher indices (the index of `after` remains unchanged). `newItem` is removed from its previous parent,
if any – or if it's already in *this* list, its index is simply changed. No-op if both arguments are the same item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newItem` | `T` |
| `after` | `T` |

#### Returns

`void`

___

### <a id="insertBefore" name="insertBefore"></a> insertBefore

▸ **insertBefore**(`newItem`, `before`): `void`

Insert `newItem` so it is immediately before `before` in this list: places `newItem` at the index that `before` used
to occupy, shifting `before` and all later items to higher indices. `newItem` is removed from its previous parent,
if any – or if it's already in *this* list, its index is simply changed. No-op if both arguments are the same item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newItem` | `T` |
| `before` | `T` |

#### Returns

`void`

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

[RestrictedItemList](RestrictedItemList.md).[item](RestrictedItemList.md#item)

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

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[moveAfter](RestrictedItemList.md#moveAfter)

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

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[moveBefore](RestrictedItemList.md#moveBefore)

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

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[remove](RestrictedItemList.md#remove)

___

### <a id="replace" name="replace"></a> replace

▸ **replace**(`oldItem`, `newItem`): `void`

Replace `oldItem` with `newItem` in this list. Throws if `oldItem` is not a member of this list.
`newItem` is removed from its previous parent, if any – or if it's already in *this* list, its index is simply
changed. No-op if both arguments are the same item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldItem` | `T` |
| `newItem` | `T` |

#### Returns

`void`

___

### <a id="toArray" name="toArray"></a> toArray

▸ **toArray**(): readonly `T`[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[RestrictedItemList](RestrictedItemList.md).[toArray](RestrictedItemList.md#toArray)
