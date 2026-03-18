[**@express-document-sdk**](../overview.md)

---

# Class: RestrictedItemList<T\>

Base for ItemLists that restrict how items are added to the list, but freely allow items to be removed and
reordered. The [ItemList](ItemList.md) subclass adds more capabilities, however.

## Extends

- [`ReadOnlyItemList`](ReadOnlyItemList.md)<`T`\>

## Extended by

- [`ArtboardList`](ArtboardList.md)
- [`ItemList`](ItemList.md)
- [`PageList`](PageList.md)

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`ListItem`](../interfaces/ListItem.md) |

## Constructors

### Constructor

```ts
new RestrictedItemList<T>(): RestrictedItemList<T>;
```

#### Returns

`RestrictedItemList`<`T`\>

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`constructor`](ReadOnlyItemList.md#constructor)

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

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`length`](ReadOnlyItemList.md#length)

---

### first

#### Get Signature

```ts
get first(): T | undefined;
```

First item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`first`](ReadOnlyItemList.md#first)

---

### last

#### Get Signature

```ts
get last(): T | undefined;
```

Last item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`last`](ReadOnlyItemList.md#last)

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

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`indexOf`](ReadOnlyItemList.md#indexof)

---

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

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`item`](ReadOnlyItemList.md#item)

---

### \[iterator\]()

```ts
iterator: Iterator<T>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<`T`\>

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`[iterator]`](ReadOnlyItemList.md#iterator)

---

### toArray()

```ts
toArray(): readonly T[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`toArray`](ReadOnlyItemList.md#toarray)

---

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

---

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

---

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
