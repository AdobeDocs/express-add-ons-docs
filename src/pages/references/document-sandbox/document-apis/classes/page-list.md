[@express-document-sdk](../overview.md) / PageList

# Class: PageList

PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph"
artwork tree (see [ExpressRootNode](express-root-node.md)). A page contains one or more artboards, representing "scenes" in a linear timeline
sequence. Those artboards, in turn, contain all the visual content of the document.

PageList also provides APIs for adding/removing pages from the document. PageList is never empty: it is illegal to
remove the last remaining page from the list.

## Extends

-   [`RestrictedItemList`](restricted-item-list.md)&lt;[`PageNode`](page-node.md) &gt;

## Accessors

### first

• `get` **first**(): `undefined` \| `T`

First item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

<HorizontalLine />

### last

• `get` **last**(): `undefined` \| `T`

Last item in this list, or undefined if list is empty.

#### Returns

`undefined` \| `T`

<HorizontalLine />

### length

• `get` **length**(): `number`

Number of items in this list.

#### Returns

`number`

## Methods

### `[iterator]`()

• **\[iterator\]**(): `Iterator`&lt;[`PageNode`](page-node.md), `any`, `any` &gt;

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;[`PageNode`](page-node.md), `any`, `any` &gt;

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`[iterator]`](restricted-item-list.md#iterator)

<HorizontalLine />

### addPage()

• **addPage**(`inputGeometry`): [`PageNode`](page-node.md)

Create a new page containing a single empty artboard, and add it to the end of the list. The artboard is configured
with the same defaults as in [ArtboardList.addArtboard](artboard-list.md#addartboard). The page's artboard becomes the default target for
newly inserted content ([Context.insertionParent](context.md#insertionparent)) and the viewport switches to display this artboard.

#### Parameters

• **inputGeometry**: [`RectangleGeometry`](../interfaces/rectangle-geometry.md)

#### Returns

[`PageNode`](page-node.md)

<HorizontalLine />

### indexOf()

• **indexOf**(`item`): `number`

Get index of item in list.

#### Parameters

• **item**: [`PageNode`](page-node.md)

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`indexOf`](restricted-item-list.md#indexof)

<HorizontalLine />

### item()

• **item**(`index`): `undefined` \| [`PageNode`](page-node.md)

Returns item at the given index, or undefined if index is out of range.

#### Parameters

• **index**: `number`

Zero-based index

#### Returns

`undefined` \| [`PageNode`](page-node.md)

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`item`](restricted-item-list.md#item)

<HorizontalLine />

### moveAfter()

• **moveAfter**(`item`, `after`): `void`

Move `item` so it is immediately after `after` in this list: places `item` at the index one higher than `after`.
Depending on the position in the list `item` originally occupied, some other items in the list may shift to higher
or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

• **item**: [`PageNode`](page-node.md)

• **after**: [`PageNode`](page-node.md)

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveAfter`](restricted-item-list.md#moveafter)

#### Throws

An error if either argument is not contained in this list.

<HorizontalLine />

### moveBefore()

• **moveBefore**(`item`, `before`): `void`

Move `item` so it is immediately before `before` in this list: places `item` at the index that `before` used
to occupy. Depending on the position in the list `item` originally occupied, some other items in the list may
shift to higher or lower indices as a result. No-op if both arguments are the same item.

#### Parameters

• **item**: [`PageNode`](page-node.md)

• **before**: [`PageNode`](page-node.md)

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveBefore`](restricted-item-list.md#movebefore)

#### Throws

An error if either argument is not contained in this list.

<HorizontalLine />

### remove()

• **remove**(...`items`): `void`

Remove the items from the list. The items need not be contiguous.

#### Parameters

• ...**items**: [`PageNode`](page-node.md)[]

#### Returns

`void`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`remove`](restricted-item-list.md#remove)

#### Throws

If any of the items are not in the list, or if it is illegal to remove any of the items from this parent.

<HorizontalLine />

### toArray()

• **toArray**(): readonly [`PageNode`](page-node.md)[]

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`PageNode`](page-node.md)[]

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`toArray`](restricted-item-list.md#toarray)
