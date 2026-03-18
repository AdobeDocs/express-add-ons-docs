[**@express-document-sdk**](../overview.md)

---

# Class: ArtboardList

ArtboardList represents an ordered list of ArtboardNodes, which are the children of one [PageNode](PageNode.md). If multiple
artboards are present, each represents a keyframe "scene" in the page's animation timeline.

ArtboardList also provides APIs for adding/removing artboards from the page. ArtboardList is never empty: it is illegal to
remove the last remaining artboard from the list.

## Extends

- [`RestrictedItemList`](RestrictedItemList.md)<[`ArtboardNode`](ArtboardNode.md)\>

## Indexable

```ts
[key: number]: object
```

## Constructors

### Constructor

```ts
new ArtboardList(): ArtboardList;
```

#### Returns

`ArtboardList`

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

### addArtboard()

```ts
addArtboard(): ArtboardNode;
```

Create a new artboard and add it to the end of the list. The artboard size is the same as others on this page. The
artboard background is set to default fill color DEFAULT\_ARTBOARD\_FILL\_COLOR. The new artboard becomes the
default target for newly inserted content (see insertionParent) and the timeline advances to show this artboard
in the current viewport.

#### Returns

[`ArtboardNode`](ArtboardNode.md)

the newly added artboard.

---

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`ArtboardNode`](ArtboardNode.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`indexOf`](RestrictedItemList.md#indexof)

---

### item()

```ts
item(index): ArtboardNode | undefined;
```

Returns item at the given index, or undefined if index is out of range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Zero-based index |

#### Returns

[`ArtboardNode`](ArtboardNode.md) \| `undefined`

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`item`](RestrictedItemList.md#item)

---

### \[iterator\]()

```ts
iterator: Iterator<ArtboardNode>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`<[`ArtboardNode`](ArtboardNode.md)\>

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`[iterator]`](RestrictedItemList.md#iterator)

---

### toArray()

```ts
toArray(): readonly ArtboardNode[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ArtboardNode`](ArtboardNode.md)[]

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
| ...`items` | [`ArtboardNode`](ArtboardNode.md)[] |

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
| `item` | [`ArtboardNode`](ArtboardNode.md) |
| `before` | [`ArtboardNode`](ArtboardNode.md) |

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
| `item` | [`ArtboardNode`](ArtboardNode.md) |
| `after` | [`ArtboardNode`](ArtboardNode.md) |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](RestrictedItemList.md).[`moveAfter`](RestrictedItemList.md#moveafter)
