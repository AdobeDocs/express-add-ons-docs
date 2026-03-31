---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: ArtboardList

ArtboardList represents an ordered list of ArtboardNodes, which are the children of one [PageNode](page-node.md). If multiple
artboards are present, each represents a keyframe "scene" in the page's animation timeline.

ArtboardList also provides APIs for adding/removing artboards from the page. ArtboardList is never empty: it is illegal to
remove the last remaining artboard from the list.

## Extends

- [`RestrictedItemList`](restricted-item-list.md)&lt;[`ArtboardNode`](artboard-node.md)&gt;

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

### addArtboard()

```ts
addArtboard(): ArtboardNode;
```

Create a new artboard and add it to the end of the list. The artboard size is the same as others on this page. The
artboard background is set to default fill color DEFAULT\_ARTBOARD\_FILL\_COLOR. The new artboard becomes the
default target for newly inserted content (see insertionParent) and the timeline advances to show this artboard
in the current viewport.

#### Returns

[`ArtboardNode`](artboard-node.md)

the newly added artboard.

<HorizontalLine />

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`ArtboardNode`](artboard-node.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`indexOf`](restricted-item-list.md#indexof)

<HorizontalLine />

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

[`ArtboardNode`](artboard-node.md) \| `undefined`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`item`](restricted-item-list.md#item)

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<ArtboardNode>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;[`ArtboardNode`](artboard-node.md)&gt;

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`[iterator]`](restricted-item-list.md#iterator)

<HorizontalLine />

### toArray()

```ts
toArray(): readonly ArtboardNode[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`ArtboardNode`](artboard-node.md)[]

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
| ...`items` | [`ArtboardNode`](artboard-node.md)[] |

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
| `item` | [`ArtboardNode`](artboard-node.md) |
| `before` | [`ArtboardNode`](artboard-node.md) |

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
| `item` | [`ArtboardNode`](artboard-node.md) |
| `after` | [`ArtboardNode`](artboard-node.md) |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveAfter`](restricted-item-list.md#moveafter)
