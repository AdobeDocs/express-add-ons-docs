---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: RestrictedItemList&lt;T&gt;

Base for ItemLists that restrict how items are added to the list, but freely allow items to be removed and
reordered. The [ItemList](item-list.md) subclass adds more capabilities, however.

## Extends

- [`ReadOnlyItemList`](read-only-item-list.md)&lt;`T`&gt;

## Extended by

- [`ArtboardList`](artboard-list.md)
- [`ItemList`](item-list.md)
- [`PageList`](page-list.md)

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`ListItem`](../interfaces/list-item.md) |

## Constructors

### Constructor

```ts
new RestrictedItemList<T>(): RestrictedItemList<T>;
```

#### Returns

`RestrictedItemList`&lt;`T`&gt;

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`constructor`](read-only-item-list.md#constructor)

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

[`ReadOnlyItemList`](read-only-item-list.md).[`length`](read-only-item-list.md#length)

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

[`ReadOnlyItemList`](read-only-item-list.md).[`first`](read-only-item-list.md#first)

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

[`ReadOnlyItemList`](read-only-item-list.md).[`last`](read-only-item-list.md#last)

## Methods

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

[`ReadOnlyItemList`](read-only-item-list.md).[`indexOf`](read-only-item-list.md#indexof)

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

[`ReadOnlyItemList`](read-only-item-list.md).[`item`](read-only-item-list.md#item)

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<T>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;`T`&gt;

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`[iterator]`](ReadOnlyItemList.md#iterator)

<HorizontalLine />

### toArray()

```ts
toArray(): readonly T[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`toArray`](read-only-item-list.md#toarray)

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
