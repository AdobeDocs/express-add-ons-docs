[@express-document-sdk](../overview.md) / ReadOnlyItemList

# Class: ReadOnlyItemList<T\>

ReadOnlyItemList represents an ordered list of API objects, representing items that are all children of the
same parent node. (The reverse is not necessarily true, however: this list might not include all
children that exist in the parent node. See [Node.allChildren](node.md#allchildren) for details).

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. Subclasses like ItemList may add these capabilities, however.

## Extended by

-   [`RestrictedItemList`](restricted-item-list.md)

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

• **\[iterator\]**(): `Iterator`&lt;`T`, `any`, `any`\&gt;

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;`T`, `any`, `any`\&gt;

<HorizontalLine />

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: `T`

#### Returns

`number`

index number, or -1 if item isn't in this list.

<HorizontalLine />

### item()

• **item**(`index`): `undefined` \| `T`

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| `T`

<HorizontalLine />

### toArray()

• **toArray**(): readonly `T`[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]
