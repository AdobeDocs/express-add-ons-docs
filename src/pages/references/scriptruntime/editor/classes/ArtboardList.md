[@add-on-hlapi-sdk](../overview.md) / ArtboardList

# Class: ArtboardList

ArtboardList represents an ordered list of ArtboardNodes arranged in a timeline sequence, where they are called "scenes."
All items in the list are children of a single PageNode.

ArtboardList also provides APIs for adding/removing artboards from the page. ArtboardList is never empty: it is illegal to
remove the last remaining artboard from the list.

## Hierarchy

- [`ReadOnlyItemList`](ReadOnlyItemList.md)<[`ArtboardNode`](ArtboardNode.md)\>

  ↳ **`ArtboardList`**

## Table of contents

### Accessors

- [first](ArtboardList.md#first)
- [last](ArtboardList.md#last)
- [length](ArtboardList.md#length)

### Methods

- [iterator](ArtboardList.md#iterator)
- [addArtboard](ArtboardList.md#addArtboard)
- [item](ArtboardList.md#item)
- [remove](ArtboardList.md#remove)
- [toArray](ArtboardList.md#toArray)

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

### iterator

▸ **iterator**(): `Iterator`<[`ArtboardNode`](ArtboardNode.md), `any`, `undefined`\>

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`ArtboardNode`](ArtboardNode.md), `any`, `undefined`\>

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[[iterator]](ReadOnlyItemList.md#[iterator])

___

### addArtboard

▸ **addArtboard**(): [`ArtboardNode`](ArtboardNode.md)

Create a new artboard and add it to the end of the list. The artboard size is the same as others on this page. The
artboard background is set to default fill color DEFAULT_ARTBOARD_FILL_COLOR.

#### Returns

[`ArtboardNode`](ArtboardNode.md)

the newly added artboard.

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

[ReadOnlyItemList](ReadOnlyItemList.md).[item](ReadOnlyItemList.md#item)

___

### remove

▸ **remove**(...`items`): `void`

Remove the items from the list.

**`Throws`**

An error if any of the items are not in the list or if removing the
items would cause the list to be empty. If one of these errors occurs, the list
is not modified.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | [`ArtboardNode`](ArtboardNode.md)[] |

#### Returns

`void`

___

### toArray

▸ **toArray**(): readonly [`ArtboardNode`](ArtboardNode.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ArtboardNode`](ArtboardNode.md)[]

#### Inherited from

[ReadOnlyItemList](ReadOnlyItemList.md).[toArray](ReadOnlyItemList.md#toArray)
