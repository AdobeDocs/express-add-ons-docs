---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: ItemList&lt;T&gt;

ItemList represents an ordered list of API objects that are all children of the same parent node. It is most
frequently encountered as [ArtboardNode.children](artboard-node.md#children) or [GroupNode.children](group-node.md#children).

ItemList also provides APIs for manipulating the list by adding items to the parent or removing items from the parent.

Note that some parent nodes may have additional children that are *not* present in the main `children` ItemList
(e.g. [GroupNode.maskShape](group-node.md#maskshape)). Use the read-only [Node.allChildren](node.md#allchildren) for a combined view of all children.

## Extends

- [`RestrictedItemList`](restricted-item-list.md)&lt;`T`&gt;

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`ListItem`](../interfaces/list-item.md) |

## Constructors

### Constructor

```ts
new ItemList<T>(): ItemList<T>;
```

#### Returns

`ItemList`&lt;`T`&gt;

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`constructor`](restricted-item-list.md#constructor)

## Accessors

### length

#### Get Signature

```ts
get length(): number;
```

Number of items in this list.

##### Returns

`number`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`length`](restricted-item-list.md#length)

<HorizontalLine />

### first

#### Get Signature

```ts
get first(): T | undefined;
```

First item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`first`](restricted-item-list.md#first)

<HorizontalLine />

### last

#### Get Signature

```ts
get last(): T | undefined;
```

Last item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`last`](restricted-item-list.md#last)

## Methods

### append()

```ts
append(...items): void;
```

Add one or more items to the end of the list. The last argument will become the last item in this list. Items are
removed from their previous parent, if any – or if an item is already in *this* list, its index is simply changed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`items` | `T`[] |

#### Returns

`void`

<HorizontalLine />

### clear()

```ts
clear(): void;
```

Remove all items from this list. No-op if list is already empty.

#### Returns

`void`

<HorizontalLine />

### replace()

```ts
replace(oldItem, newItem): void;
```

Replace `oldItem` with `newItem` in this list. Throws if `oldItem` is not a member of this list.
`newItem` is removed from its previous parent, if any – or if it's already in *this* list, its index is simply
changed. No-op if both arguments are the same item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `oldItem` | `T` |
| `newItem` | `T` |

#### Returns

`void`

<HorizontalLine />

### insertBefore()

```ts
insertBefore(newItem, before): void;
```

Insert `newItem` so it is immediately before `before` in this list: places `newItem` at the index that `before` used
to occupy, shifting `before` and all later items to higher indices. `newItem` is removed from its previous parent,
if any – or if it's already in *this* list, its index is simply changed. No-op if both arguments are the same item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newItem` | `T` |
| `before` | `T` |

#### Returns

`void`

<HorizontalLine />

### insertAfter()

```ts
insertAfter(newItem, after): void;
```

Insert `newItem` so it is immediately after `after` in this list: places `newItem` at the index one higher than `after`,
shifting all later items to higher indices (the index of `after` remains unchanged). `newItem` is removed from its previous parent,
if any – or if it's already in *this* list, its index is simply changed. No-op if both arguments are the same item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newItem` | `T` |
| `after` | `T` |

#### Returns

`void`

<HorizontalLine />

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `T` |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`indexOf`](restricted-item-list.md#indexof)

<HorizontalLine />

### item()

```ts
item(index): T | undefined;
```

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Zero-based index |

#### Returns

`T` \| `undefined`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`item`](restricted-item-list.md#item)

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<T>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;`T`&gt;

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`[iterator]`](RestrictedItemList.md#iterator)

<HorizontalLine />

### toArray()

```ts
toArray(): readonly T[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`toArray`](restricted-item-list.md#toarray)

<HorizontalLine />

### remove()

```ts
remove(...items): void;
```

Remove the items from the list. The items need not be contiguous.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`items` | `T`[] |

#### Returns

`void`

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`remove`](restricted-item-list.md#remove)

<HorizontalLine />

### moveBefore()

```ts
moveBefore(item, before): void;
```

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `T` |
| `before` | `T` |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveBefore`](restricted-item-list.md#movebefore)

<HorizontalLine />

### moveAfter()

```ts
moveAfter(item, after): void;
```

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `T` |
| `after` | `T` |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveAfter`](restricted-item-list.md#moveafter)
