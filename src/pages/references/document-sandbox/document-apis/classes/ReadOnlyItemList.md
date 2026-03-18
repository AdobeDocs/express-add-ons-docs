[**@express-document-sdk**](../overview.md)

---

# Class: ReadOnlyItemList<T\>

ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node.

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. The [ItemList](ItemList.md) subclass adds more
capabilities, and is most frequently encountered as [ArtboardNode.children](ArtboardNode.md#children) or [GroupNode.children](GroupNode.md#children).

## Extends

- `unknown`<`HzApiInputType`\>

## Extended by

- [`RestrictedItemList`](RestrictedItemList.md)
- [`ThreadedTextList`](ThreadedTextList.md)

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`ListItem`](../interfaces/ListItem.md) |

## Constructors

### Constructor

```ts
new ReadOnlyItemList<T>(): ReadOnlyItemList<T>;
```

#### Returns

`ReadOnlyItemList`<`T`\>

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

---

### first

#### Get Signature

```ts
get first(): T | undefined;
```

First item in this list, or undefined if list is empty.

##### Returns

`T` \| `undefined`

---

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

---

### \[iterator\]()

```ts
iterator: Iterator<T>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<`T`\>

---

### toArray()

```ts
toArray(): readonly T[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly `T`[]
