---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: ThreadedTextList

ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node.

Items in a bare ReadOnlyItemList cannot be added, removed, or reordered. The [ItemList](item-list.md) subclass adds more
capabilities, and is most frequently encountered as [ArtboardNode.children](artboard-node.md#children) or [GroupNode.children](group-node.md#children).

## Extends

- [`ReadOnlyItemList`](read-only-item-list.md)&lt;[`ThreadedTextNode`](threaded-text-node.md)&gt;

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

[`ThreadedTextNode`](threaded-text-node.md) \| `undefined`

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`item`](read-only-item-list.md#item)

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<ThreadedTextNode>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;[`ThreadedTextNode`](threaded-text-node.md)&gt;

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`[iterator]`](read-only-item-list.md#iterator)

<HorizontalLine />

### addFrame()

```ts
addFrame(geometry?): ThreadedTextNode;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `geometry?` | [`TextFrameAreaGeometry`](../interfaces/text-frame-area-geometry.md) | The geometry of the threaded text node in pixels (width and height). |

#### Returns

[`ThreadedTextNode`](threaded-text-node.md)

A new ThreadedTextNode that is part of a threaded text flow.

<HorizontalLine />

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`ThreadedTextNode`](threaded-text-node.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`indexOf`](read-only-item-list.md#indexof)

<HorizontalLine />

### toArray()

```ts
toArray(): readonly ThreadedTextNode[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ThreadedTextNode`](threaded-text-node.md)[]

#### Inherited from

[`ReadOnlyItemList`](read-only-item-list.md).[`toArray`](read-only-item-list.md#toarray)
