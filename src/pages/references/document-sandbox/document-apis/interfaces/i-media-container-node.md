[@express-document-sdk](../overview.md) / IMediaContainerNode

# Interface: IMediaContainerNode

Interface for nodes that contain media.

## Accessors

### maskShape

• `get` **maskShape**(): [`INodeBounds`](i-node-bounds.md)

A read-only view of the mask shape used for cropping/clipping the media.

#### Returns

[`INodeBounds`](i-node-bounds.md)

---

### mediaRectangle

• `get` **mediaRectangle**(): [`ImageRectangleNode`](../classes/ImageRectangleNode.md) \| [`UnknownMediaRectangleNode`](../classes/UnknownMediaRectangleNode.md)

The rectangular node representing the entire, uncropped bounds of the media (e.g. image, GIFs, or video). The media's position and
rotation can be changed, but it cannot be resized yet via this API. Media types other than images will yield an UnknownMediaRectangleNode
object for now.

#### Returns

[`ImageRectangleNode`](../classes/ImageRectangleNode.md) \| [`UnknownMediaRectangleNode`](../classes/UnknownMediaRectangleNode.md)

## Methods

### replaceMedia()

• **replaceMedia**(`media`): `void`

Replace existing media inline. The new media is sized to completely fill the bounds of the existing maskShape; if the
media's aspect ratio differs from the maskShape's, the media will be cropped by the maskShape on either the left/right
or top/bottom edges. Currently only supports images as the new media, but previous media can be of any type.

#### Parameters

• **media**: [`BitmapImage`](../classes/bitmap-image.md)

New content to display. Currently must be a [BitmapImage](../classes/bitmap-image.md).

#### Returns

`void`
