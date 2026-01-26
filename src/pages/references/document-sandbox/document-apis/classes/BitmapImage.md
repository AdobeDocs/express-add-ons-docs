[@express-document-sdk](../overview.md) / BitmapImage

# Class: BitmapImage

Represents a bitmap image resource. Use [Editor.loadBitmapImage](Editor.md#loadbitmapimage) to create a BitmapImage, and then [Editor.createImageContainer](Editor.md#createimagecontainer) to display it in the document by creating a MediaContainerNode structure.

## Accessors

### height

• `get` **height**(): `number`

Original height of the bitmap in pixels.

#### Returns

`number`

---

### width

• `get` **width**(): `number`

Original width of the bitmap in pixels.

#### Returns

`number`

## Methods

### data()

• **data**(): `Promise`<`Blob`\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Fetches the bitmap data as a Blob. Waits up to 1 minute for the bitmap to be available if necessary.

#### Returns

`Promise`<`Blob`\>
