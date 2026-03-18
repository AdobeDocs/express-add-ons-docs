[**@express-document-sdk**](../overview.md)

---

# Class: PageList

PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph"
artwork tree (see [ExpressRootNode](ExpressRootNode.md)). A page contains one or more artboards, representing "scenes" in a linear timeline
sequence. Those artboards, in turn, contain all the visual content of the document.

PageList also provides APIs for adding/removing pages from the document. PageList is never empty: it is illegal to
remove the last remaining page from the list.

## Extends

- [`RestrictedItemList`](RestrictedItemList.md)<[`PageNode`](PageNode.md)\>

## Indexable

```ts
[key: number]: object
```

## Constructors

### Constructor

```ts
new PageList(): PageList;
```

#### Returns

`PageList`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`constructor`](RestrictedItemList.md#constructor)

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

[`RestrictedItemList`](RestrictedItemList.md).[`length`](RestrictedItemList.md#length)

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

[`RestrictedItemList`](RestrictedItemList.md).[`first`](RestrictedItemList.md#first)

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

[`RestrictedItemList`](RestrictedItemList.md).[`last`](RestrictedItemList.md#last)

## Methods

### addPage()

```ts
addPage(inputGeometry): PageNode;
```

Create a new page containing a single empty artboard, and add it to the end of the list. The artboard is configured
with the same defaults as in [ArtboardList.addArtboard](ArtboardList.md#addartboard). The page's artboard becomes the default target for
newly inserted content ([Context.insertionParent](Context.md#insertionparent)) and the viewport switches to display this artboard.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `inputGeometry` | [`RectangleGeometry`](../interfaces/RectangleGeometry.md) |

#### Returns

[`PageNode`](PageNode.md)

---

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`PageNode`](PageNode.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`indexOf`](RestrictedItemList.md#indexof)

---

### item()

```ts
item(index): PageNode | undefined;
```

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Zero-based index |

#### Returns

[`PageNode`](PageNode.md) \| `undefined`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`item`](RestrictedItemList.md#item)

---

### \[iterator\]()

```ts
iterator: Iterator<PageNode>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`PageNode`](PageNode.md)\>

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`[iterator]`](RestrictedItemList.md#iterator)

---

### toArray()

```ts
toArray(): readonly PageNode[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`PageNode`](PageNode.md)[]

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`toArray`](RestrictedItemList.md#toarray)

---

### remove()

```ts
remove(...items): void;
```

Remove the items from the list. The items need not be contiguous.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`items` | [`PageNode`](PageNode.md)[] |

#### Returns

`void`

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`remove`](RestrictedItemList.md#remove)

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
| `item` | [`PageNode`](PageNode.md) |
| `before` | [`PageNode`](PageNode.md) |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveBefore`](RestrictedItemList.md#movebefore)

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
| `item` | [`PageNode`](PageNode.md) |
| `after` | [`PageNode`](PageNode.md) |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveAfter`](RestrictedItemList.md#moveafter)
