[**@express-document-sdk**](../overview.md)

---

# Class: ThreadedTextList

ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node.

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. The [ItemList](ItemList.md) subclass adds more
capabilities, and is most frequently encountered as [ArtboardNode.children](ArtboardNode.md#children) or [GroupNode.children](GroupNode.md#children).

## Extends

- [`ReadOnlyItemList`](ReadOnlyItemList.md)<[`ThreadedTextNode`](ThreadedTextNode.md)\>

## Indexable

```ts
[key: number]: object
```

## Constructors

### Constructor

```ts
new ThreadedTextList(): ThreadedTextList;
```

#### Returns

`ThreadedTextList`

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

### item()

```ts
item(index): ThreadedTextNode | undefined;
```

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Zero-based index |

#### Returns

[`ThreadedTextNode`](ThreadedTextNode.md) \| `undefined`

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`item`](ReadOnlyItemList.md#item)

---

### \[iterator\]()

```ts
iterator: Iterator<ThreadedTextNode>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`ThreadedTextNode`](ThreadedTextNode.md)\>

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`[iterator]`](ReadOnlyItemList.md#iterator)

---

### addFrame()

```ts
addFrame(geometry?): ThreadedTextNode;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `geometry?` | [`TextFrameAreaGeometry`](../interfaces/TextFrameAreaGeometry.md) | The geometry of the threaded text node in pixels (width and height). |

#### Returns

[`ThreadedTextNode`](ThreadedTextNode.md)

A new ThreadedTextNode that is part of a threaded text flow.

---

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`ThreadedTextNode`](ThreadedTextNode.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`indexOf`](ReadOnlyItemList.md#indexof)

---

### toArray()

```ts
toArray(): readonly ThreadedTextNode[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ThreadedTextNode`](ThreadedTextNode.md)[]

#### Inherited from

[`ReadOnlyItemList`](ReadOnlyItemList.md).[`toArray`](ReadOnlyItemList.md#toarray)
