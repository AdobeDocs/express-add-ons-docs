[**@express-document-sdk**](../overview.md)

---

# Interface: IMediaContainerNode

Interface for nodes that contain media.

## Accessors

### mediaRectangle

#### Get Signature

```ts
get mediaRectangle(): 
  | ImageRectangleNode
  | UnknownMediaRectangleNode;
```

The rectangular node representing the entire, uncropped bounds of the media (e.g. image, GIFs, or video). The media's position and
rotation can be changed, but it cannot be resized yet via this API. Media types other than images will yield an UnknownMediaRectangleNode
object for now.

##### Returns

  \| [`ImageRectangleNode`](../classes/ImageRectangleNode.md)
  \| [`UnknownMediaRectangleNode`](../classes/UnknownMediaRectangleNode.md)

---

### maskShape

#### Get Signature

```ts
get maskShape(): INodeBounds;
```

A read-only view of the mask shape used for cropping/clipping the media.

##### Returns

[`INodeBounds`](INodeBounds.md)

## Methods

### replaceMedia()

```ts
replaceMedia(media): void;
```

Replace existing media inline. The new media is sized to completely fill the bounds of the existing maskShape; if the
media's aspect ratio differs from the maskShape's, the media will be cropped by the maskShape on either the left/right
or top/bottom edges. Currently only supports images as the new media, but previous media can be of any type.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `media` | [`BitmapImage`](../classes/BitmapImage.md) | New content to display. Currently must be a [BitmapImage](../classes/BitmapImage.md). |

#### Returns

`void`
