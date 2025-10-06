[@express-document-sdk](../overview.md) / ItemList

# Class: ItemList<T\>

ItemList represents an ordered list of API objects that are all children of the same parent node. It is most
frequently encountered as [ArtboardNode.children](ArtboardNode.md#children) or [GroupNode.children](GroupNode.md#children).

ItemList also provides APIs for manipulating the list by adding items to the parent or removing items from the parent.

Note that some parent nodes may have additional children that are *not* present in the main `children` ItemList
(e.g. [GroupNode.maskShape](GroupNode.md#maskshape)). Use the read-only [Node.allChildren](Node.md#allchildren) for a combined view of all children.

## Extends

-   [`RestrictedItemList`](RestrictedItemList.md)<`T`\>

## Type parameters

• **T** *extends* [`ListItem`](../interfaces/ListItem.md)

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

• **\[iterator\]**(): `Iterator`<`T`, `any`, `any`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<`T`, `any`, `any`\>

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`[iterator]`](RestrictedItemList.md#iterator)

---

### append()

• **append**(...`items`): `void`

Add one or more items to the end of the list. The last argument will become the last item in this list. Items are
removed from their previous parent, if any – or if an item is already in *this* list, its index is simply changed.

#### Parameters

• ...**items**: `T`[]

#### Returns

`void`

---

### clear()

• **clear**(): `void`

Remove all items from this list. No-op if list is already empty.

#### Returns

`void`

---

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: `T`

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`indexOf`](RestrictedItemList.md#indexof)

---

### insertAfter()

• **insertAfter**(`newItem`, `after`): `void`

Insert `newItem` so it is immediately after `after` in this list: places `newItem` at the index one higher than `after`,
shifting all later items to higher indices (the index of `after` remains unchanged). `newItem` is removed from its previous parent,
if any – or if it's already in *this* list, its index is simply changed. No-op if both arguments are the same item.

#### Parameters

• **newItem**: `T`

• **after**: `T`

#### Returns

`void`

---

### insertBefore()

• **insertBefore**(`newItem`, `before`): `void`

Insert `newItem` so it is immediately before `before` in this list: places `newItem` at the index that `before` used
to occupy, shifting `before` and all later items to higher indices. `newItem` is removed from its previous parent,
if any – or if it's already in *this* list, its index is simply changed. No-op if both arguments are the same item.

#### Parameters

• **newItem**: `T`

• **before**: `T`

#### Returns

`void`

---

### item()

• **item**(`index`): `undefined` \| `T`

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| `T`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`item`](RestrictedItemList.md#item)

---

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

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveAfter`](RestrictedItemList.md#moveafter)

#### Throws

An error if either argument is not contained in this list.

---

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

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveBefore`](RestrictedItemList.md#movebefore)

#### Throws

An error if either argument is not contained in this list.

---

### remove()

• **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

#### Parameters

• ...**items**: `T`[]

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`remove`](RestrictedItemList.md#remove)

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

---

### replace()

• **replace**(`oldItem`, `newItem`): `void`

Replace `oldItem` with `newItem` in this list. Throws if `oldItem` is not a member of this list.
`newItem` is removed from its previous parent, if any – or if it's already in *this* list, its index is simply
changed. No-op if both arguments are the same item.

#### Parameters

• **oldItem**: `T`

• **newItem**: `T`

#### Returns

`void`

---

### toArray()

• **toArray**(): readonly `T`[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`toArray`](RestrictedItemList.md#toarray)
