---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: PageList

PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph"
artwork tree (see [ExpressRootNode](express-root-node.md)). A page contains one or more artboards, representing "scenes" in a linear timeline
sequence. Those artboards, in turn, contain all the visual content of the document.

PageList also provides APIs for adding/removing pages from the document. PageList is never empty: it is illegal to
remove the last remaining page from the list.

Pages outside the current viewport are not guaranteed to be fully loaded, thus the PageNode classes returned from
this list do not allow accessing the page's content directly. The [ActivePageNode](active-page-node.md) subclass represents a
Page that is fully loaded and whose contents are accessible synchronously. The current [Context](context.md) is always an
an ActivePageNode. To load any other pages for access, use the *asynchronous* [visitPages](#visitpages) API.

## Extends

- [`RestrictedItemList`](restricted-item-list.md)&lt;[`PageNode`](page-node.md)&gt;

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

### visitPages()

```ts
visitPages(pages, callback): Promise<void>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Visit the given pages asynchronously: loading each one in turn so its content is accessible, and then invoking
your provided `callback` for the resulting fully-accessible [ActivePageNode](active-page-node.md).

The callback receives an [ActivePageNode](active-page-node.md), which provides full access to the page's content tree (artboards
and all descendants). This access is only guaranteed inside the callback; do not hold onto the reference after the
callback returns.

Visiting many pages can be slow – up to tens of seconds in larger documents. Any feature which visits all pages
in the entire document should include a progress UI so users understand when the operation is still ongoing.

There is no guarantee more than one of the Pages will be loaded at the same time – there may only be one page
accessible at a time, each visited with sight delays in between. If your `callback` returns long-running
promises, iteration may pause until some of the promises resolve and free up capacity to load the next page(s)
in the visit list.

Pages may be visited in a different order than provided for performance reasons, but each callback is still called
exactly once per page.

Use an `async` callback (or return a promise) so `visitPages` waits for all `await` work on each page before
moving on. Do not start async work without awaiting it as it may make the page inactive before your edits run.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pages` | [`PageNode`](page-node.md)[] | Pages to visit. |
| `callback` | (`page`) =&gt; `void` \| `Promise`&lt;`void`&gt; | Called once per page while that page is active. Document edits are allowed during the callback, including after `await` on host APIs (such as `loadBitmapImage`) or UI proxy methods. Use an `async` callback so `visitPages` waits until your per-page work finishes. |

#### Returns

`Promise`&lt;`void`&gt;

#### Examples

Call a UI iframe API to translate text on each page, then write the result back to the page (no `keepContentActiveDuringAsync` needed).
`panelUiProxy.translateText` is a method on your add-on's UI iframe proxy:
```
await pages.visitPages([...pages], async (page) => {
    // Assume the first child is a text node for now
    const textNode = page.artboards.first.children.item(0) as TextNode;
    const translated = await panelUiProxy.translateText(textNode.fullContent.text);
    textNode.fullContent.text = translated;
});
```

Load an image from the host, then add it to the page:
```
await pages.visitPages([...pages], async (page) => {
    const bitmap = await editor.loadBitmapImage(imageBlob);
    const container = editor.createImageContainer(bitmap);
    page.artboards.first.children.append(container);
});
```

<HorizontalLine />

### addPage()

```ts
addPage(inputGeometry): ActivePageNode;
```

Create a new page containing a single empty artboard, and add it to the end of the list. The artboard is configured
with the same defaults as in [ArtboardList.addArtboard](artboard-list.md#addartboard). The page's artboard becomes the default target for
newly inserted content ([Context.insertionParent](context.md#insertionparent)) and the viewport switches to display this artboard.

The newly created page starts out already "active" initially, so you can immediately access its subtree to
populate it with content. You should not hold onto this ActivePageNode reference across an async period of time
however, since it might become inaccessible at any point after the initial synchronous block of execution where
it was created. Use [Editor.keepContentActiveDuringAsync](editor.md#keepcontentactiveduringasync) if you need to work with this page's content asynchronously.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `inputGeometry` | [`RectangleGeometry`](../interfaces/rectangle-geometry.md) |

#### Returns

[`ActivePageNode`](active-page-node.md)

the newly created page.

<HorizontalLine />

### indexOf()

```ts
indexOf(item): number;
```

Get index of item in list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`PageNode`](page-node.md) |

#### Returns

`number`

index number, or -1 if item isn't in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`indexOf`](restricted-item-list.md#indexof)

<HorizontalLine />

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

[`PageNode`](page-node.md) \| `undefined`

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`item`](restricted-item-list.md#item)

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<PageNode>;
```

Iterates over all the items in this list. Mutations that occur mid-iteration are not reflected by the iterator.

#### Returns

`Iterator`&lt;[`PageNode`](page-node.md)&gt;

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`[iterator]`](restricted-item-list.md#iterator)

<HorizontalLine />

### toArray()

```ts
toArray(): readonly PageNode[];
```

All items in the list, as a static array. Mutations that occur later are not reflected in an array returned earlier.

#### Returns

readonly [`PageNode`](page-node.md)[]

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
| ...`items` | [`PageNode`](page-node.md)[] |

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
| `item` | [`PageNode`](page-node.md) |
| `before` | [`PageNode`](page-node.md) |

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
| `item` | [`PageNode`](page-node.md) |
| `after` | [`PageNode`](page-node.md) |

#### Returns

`void`

#### Throws

An error if either argument is not contained in this list.

#### Inherited from

[`RestrictedItemList`](restricted-item-list.md).[`moveAfter`](restricted-item-list.md#moveafter)
