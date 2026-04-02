---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: ReadOnlyItemList&lt;T&gt;

ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node.

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. The [ItemList](item-list.md) subclass adds more
capabilities, and is most frequently encountered as [ArtboardNode.children](artboard-node.md#children) or [GroupNode.children](group-node.md#children).

## Extends

- `unknown`&lt;`HzApiInputType`&gt;

## Extended by

- [`RestrictedItemList`](restricted-item-list.md)
- [`ThreadedTextList`](threaded-text-list.md)

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`ListItem`](../interfaces/list-item.md) |

## Constructors

### Constructor

```ts
new ReadOnlyItemList<T>(): ReadOnlyItemList<T>;
```

#### Returns

`ReadOnlyItemList`&lt;`T`&gt;

#### Inherited from

```ts
TemplatizedProxyLiveObject<HzApiInputType>.constructor
```

## Accessors

### length

#### Get Signature

```ts
get length(): number;
```

Number of items in this list.

##### Returns

`number`

<HorizontalLine />

### first

#### Get Signature

```ts
get first(): T | undefined;
```

First item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

<HorizontalLine />

### last

#### Get Signature

```ts
get last(): T | undefined;
```

Last item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

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

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<T>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;`T`&gt;

<HorizontalLine />

### toArray()

```ts
toArray(): readonly T[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]
