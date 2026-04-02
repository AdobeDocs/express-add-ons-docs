---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: BitmapImage

Represents a bitmap image resource. Use [Editor.loadBitmapImage](editor.md#loadbitmapimage) to create a BitmapImage, and then [Editor.createImageContainer](editor.md#createimagecontainer)
to display it in the document by creating a MediaContainerNode structure.

## Extends

- `unknown`

## Constructors

### Constructor

```ts
new BitmapImage(): BitmapImage;
```

#### Returns

`BitmapImage`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Accessors

### width

#### Get Signature

```ts
get width(): number;
```

Original width of the bitmap in pixels.

##### Returns

`number`

<HorizontalLine />

### height

#### Get Signature

```ts
get height(): number;
```

Original height of the bitmap in pixels.

##### Returns

`number`

## Methods

### data()

```ts
data(): Promise<Blob>;
```

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Fetches the bitmap data as a Blob. Waits up to 1 minute for the bitmap to be available if necessary.

#### Returns

`Promise`&lt;`Blob`&gt;
