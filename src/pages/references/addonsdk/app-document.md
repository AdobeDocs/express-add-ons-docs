# addOnUISdk.app.document

Provides access to the methods needed for retrieving [document metadata](#general-methods), [importing content](../../guides/develop/use_cases.md#importing-content) such as images, audio and video into the document, and for [exporting content](../../guides/develop/use_cases.md#exporting-content) from the current document.

## General Methods

### id()

Retrieves the id of the document.

#### Signature

`id(): Promise<string | undefined>`

#### Return Value

A resolved `Promise` containing the `id` of the document.

<InlineAlert slots="text" variant="info"/>

**Note:** A `documentIdAvailable` event is triggered when the document id is available in the application. You can listen for this event via the [`addOnUISdk.app.on()`](./addonsdk-app.md#on) method.

#### Example

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setId(id) { /* ... */ } 
  
addOnUISdk.ready.then(() => setId(await addOnUISdk.app.document.id()));
  
addOnUISdk.app.on("documentAvailable", data => {
  setId(data.documentId);
});
```

### title()

Retrieves the title/name of the document.

#### Signature

`title(): Promise<string>`

#### Return Value

A resolved `Promise` containing the `title` (ie: name) of the document.

<InlineAlert slots="text" variant="info"/>

**Note:** A `documentTitleChange` event is triggered when the document title is changed in the application. You can listen for this event via the [`addOnUISdk.app.on()`](./addonsdk-app.md#on) method.

#### Example

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setTitle(title) { /* ... */ } 
  
addOnUISdk.ready.then(() => setTitle(await addOnUISdk.app.document.title()));
  
addOnUISdk.app.on("documentTitleChange", data => {
  setTitle(data.documentTitle);
});
```
### getPagesMetadata()

Retrieve the metadata for all of the pages in the document.

#### Signature

`getPagesMetadata(options: PageMetadataOptions): Promise<PageMetadata[]>`

#### Parameters

| Name                | Type         | Description   |
| --------------------| -------------| -----------:  |
| `options`  | `Object` | [`PageMetadataOptions`](#pagemetadataoptions) object. |

#### Return Value

A resolved `Promise` containing a [`PageMetadata`](#pagemetadata) array containing all of the pages in the document.

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;
 
// Get metadata of all the pages
async function logMetadata() {
  try {
    const pages = (await addOnUISdk.app.document.getPagesMetadata({
                            range: addOnUISdk.constants.Range.specificPages,
                            pageIds: [
                                "7477a5e7-02b2-4b8d-9bf9-f09ef6f8b9fc",
                                "d45ba3fc-a3df-4a87-80a5-655e5f8f0f96"
                            ]
                        })) as PageMetadata[];
    for (const page of pages) {
      console.log("Page id: ", page.id);
      console.log("Page title: ", page.title);
      console.log("Page size: ", page.size);
      console.log("Page has premium content: ", page.hasPremiumContent);
      console.log("Page has timelines: ", page.hasTemporalContent);
      console.log("Pixels per inch: ", page.pixelsPerInch);
    }
  }
  catch(error) {
    console.log("Failed to get metadata:", error);
  }
}
```

#### `PageMetadata`

The metadata of a page.

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `id`          | `string`     | The id of the page.    |
| `title`       | `string`     | The title of the page. |
| `size`        | `{ width: number, height: number }` | The size of the page in pixels. |
| `hasPremiumContent` | `boolean` | `true` if the page has premium content, `false` if not. |
| `hasTemporalContent` | `boolean` | `true` if the page has timelines, `false` if not. |
| `pixelsPerInch?`  | `number`  | The pixels per inch of the page. |

#### `PageMetadataOptions`

This object is passed as a parameter to the [`getPagesMetadata`](#getpagesmetadata) method and includes the range and optional `pageIds` for which you want to retrieve metadata for. 

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `range`          | `string`     | Range of the document to get the metadata |
| `pageIds?: string[]` | `string`     | Ids of the pages (Only required when the range is `specificPages`) |

## Import Content Methods

### addImage()

Adds an image to the current page.

#### Signature

`addImage(imageBlob: Blob): Promise<void>`

#### Parameters

| Name          | Type         | Description                   |
| ------------- | -------------| ----------------------------: |
| `imageBlob`   | `Blob`       | The image to add to the page. |

#### Return Value

A resolved promise if the image was successfully added to the canvas; otherwise will throw an error with the rejected promise.

#### Example Usage

```js
// Add image(blob) to the current page
async function addImageFromBlob(blob) {
  try {
      await document.addImage(blob);
  }
  catch(error) {
      console.log("Failed to add the image to the page.");
  }
}

// Add image(url) to the current page
async function addImageFromURL(url) {
  try {
      const blob = await fetch(url).then(response => response.blob());
      await document.addImage(blob);
  }
  catch(error) {
      console.log("Failed to add the image to the page.");
  }
}
```

<InlineAlert slots="text" variant="info"/>

The supported file types for imported content are currently **`png/jpg/jpeg/mp4`,** and the size of the imported images should not exceed **8000px** or **40MB**.

### addVideo()

Adds a video to the current page.

#### Signature

`addVideo(videoBlob: Blob): Promise<void>`

#### Parameters

| Name          | Type         | Description                   |
| ------------- | -------------| ----------------------------: |
| `videoBlob`   | `Blob`       | The video to add to the page. |

#### Example Usage

```js
async function addVideoFromBlob(blob) {
  try {
      await document.addVideo(blob);
  }
  catch(error) {
      console.log("Failed to add the video to the page.");
  }
}

async function addVideoFromURL(url) {
  try {
     const blob = await fetch(url).then(response => response.blob());
     await document.addVideo(blob);
  }
  catch(error) {
    console.log("Failed to add the video to the page.");
  }
}
```

### addAudio()

Adds audio to the current page.

#### Signature

`addAudio(audioBlob: Blob, attributes: MediaAttributes): Promise<void>`

#### Parameters

| Name          | Type         | Description                         |
| ------------- | -------------| ---------------------------------:  |
| `audioBlob`   | `Blob`       | The audio to add to the page.       |
| `attributes`  | [`MediaAttributes`](#mediaattributes) | Attributes to pass when adding the audio to the page (ie: `title`, which is mandatory). |

#### `MediaAttributes`

| Name          | Type         | Description                               |
| ------------- | -------------| ----------------------------------------: |
| `title`       | `string`     | Media title (mandatory for audio import). |

#### Return Value

A resolved promise if the audio was successfully added to the canvas; otherwise will throw an error with the rejected promise.

#### Example Usage

```js
async function addAudioFromBlob(blob) {
  try {
      await document.addAudio(blob, {title: "Jazzy beats"});
  }
  catch(error) {
      console.log("Failed to add the audio to the page.");
  }
}

async function addAudioFromURL(url) {
  try {
      const blob = await fetch(url).then(response => response.blob());
      await document.addAudio(blob, {title: "Jazzy beats"});
  }
  catch(error) {
      console.log("Failed to add the audio to the page.");
  }
```

<InlineAlert slots="text" variant="info"/>

Refer to the [importing content use case](../../guides/develop/use_cases.md#importing-content) and the [import-images-from-local](/samples/#import-images-from-local) in the code samples for general importing content examples.

### Errors

The table below describes the possible error messages that may occur when using the import methods, with a description of the scenario that would cause them to be returned.

&nbsp;

| Error Message                     |   Error Scenario                 |
|-------------------------------:|-------------------------------------------------:|
| Invalid blob.                  | Blob is invalid. |
| Unsupported mime type : `${blob.type}` | Mime type is invalid. |
| Import image width or height exceed the maximum limit : `${maxSupportedDimension}` | The imported image dimensions exceed the maximum limit if any defined by Express. |
| Import image size exceed the maximum limit: `${maxSupportedSize}MB` | The imported image size exceeds the maximum limit if any defined by Express. |
| No active page available. | Current page doesn't exist. |

## Export Content Methods

### createRenditions()

Generate renditions of the current page, specific pages or the entire document in a specified format for export.

#### Signature

`createRenditions(renditionOptions: RenditionOptions, renditionIntent?: RenditionIntent): Promise<Rendition[]>`

#### Parameters

| Name                | Type         | Description   |
| --------------------| -------------| -----------:  |
| `renditionOptions`  | `Object`     | [`RenditionOptions`](#renditionoptions) object. |
| `renditionIntent`   | `string`     | [`RenditionIntent`](./addonsdk-constants.md) constant value. |

**NOTE:** The default value for `renditionIntent` is `export`. If it's set to `preview`, it also requires the `renditionPreview` flag to be set to `true` in the [manifest `requirements`](../manifest/index.md#requirements) section. Additionally, when implementing the premium content flows where you present a dialog or option to allow the user to upgrade, you must be sure to also include the following permissions in the [`sandbox`](../../references/manifest/index.md#entrypointspermissionssandbox) attribute of your `manifest.json` to allow the Adobe Express pricing page to load properly:

```json
"permissions": {
    "sandbox": ["allow-popups-to-escape-sandbox", "allow-popups", "allow-downloads"]
}
```

Refer to the [exporting content use case example](../../guides/develop/use_cases.md#premium-content) for more specific details on options for handling the export of premium content.

#### `RenditionOptions`

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `range`       | `string`     | [`Range`](./addonsdk-constants.md) constant value. |
| `format`      | `string`     | [`RenditionFormat`](./addonsdk-constants.md) constant value. |
| `pageIds?`    | `string[]`   | Ids of the pages (only required if the range is [`specificPages`)](./addonsdk-constants.md) |
  
#### `JpgRenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object and adds the following additional options for `jpg` renditions:

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `backgroundColor?` | `number` |  Integer in 0xRRGGBB format of the background color you wish to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created. |
| `quality?` | `number` |  A number between 0 and 1, indicating image quality. Default is 1.0. |
| [`requestedSize?`](#requested-size-notes)| `{width?: number; height?: number}` | Requested size (in pixels). |

#### `PngRenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object and adds the following additional options for `png` renditions:

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `backgroundColor?` | `number` |  Integer in 0xRRGGBB format of the background color you wish to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created. |
| [`requestedSize?`](#requested-size-notes) | `{width?: number; height?: number}` | Requested size (in pixels). |

#### Requested Size Notes

- The supported size is from 1 x 1 to width x height.
- Aspect ratio is maintained while scaling the rendition based on the requested size.
- Up-scaling is currently not supported.
- If the requested size is invalid, it will be ignored and the original size rendition will be created.
- Some examples of what the actual exported sizes will be, depending on the page size and requested size are in the table below for reference.

| Page Size  | Requested Size | Exported Size |
| ------------- | -------------| -----------:  |
| 400 x 600       | 200 x 200      | 134 x 200       |
| 400 x 600       | 200 x 400      | 200 x 300       |
| 400 x 600       | 200 x -200      | 400 x 600      |
| 400 x 600       | 800 x 1000      | 400 x 600      |

#### Return Value

A `Promise` with an array of page `Rendition` objects (see [`PageRendition`](#pagerendition)). The array will contain one item if the `currentPage` range is requested, an array of specific pages when the `specificPages` range is requested, or all pages when the `entireDocument` range is specified. Each rendition returned will contain the `type`, `title`,[metadata for the page](#pagemetadata) and a `blob` of the rendition itself. **Note:** If you requested `PDF` for the format with a larger range than `currentPage`, a single file will be generated which includes the entire range. When the format is `JPG/PNG/MP4`, an array of files will be generated that represents each page.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7FAA77FF
    };
    const renditions = await addOnUISdk.app.document.createRenditions(renditionOptions, addOnUISdk.constants.RenditionIntent.preview);
    renditions.forEach(rendition => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  }
  catch(error) {
    console.log("Failed to create renditions:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;
  
// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {
      range: Range.entireDocument,
      format: RenditionFormat.png,
      backgroundColor: 0x7FAA77FF
    };
    const renditions = await addOnUISdk.app.document.createRenditions(renditionOptions, RenditionIntent.preview);
    renditions.forEach(rendition => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  }
  catch(error) {
    console.log("Failed to create renditions:", error);
  }
}
```

#### `Rendition`

A rendition object representing a page in the document, returned from [`createRenditions`](#createrenditions). See

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `type?`       | `string`     | Type of Rendition. Value is always `page`. |
| `blob`        | `Blob`       | Blob containing the rendition |

#### `PageRendition`

An extension of [`Rendition`](#rendition), returned in the response to [`createRenditions`](#createrenditions). This object **includes everything in [`Rendition`](#rendition)**, as well as:

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `title`       | `string`     | The page title of the rendition |
| `metadata`    | [`PageMetadata`](#pagemetadata) | Page metadata |

<InlineAlert slots="text" variant="info"/>

Refer to the [exporting content use case example](../../guides/develop/use_cases.md#exporting-content) and the [export-sample](../../samples.md) in the code samples for usage examples.

### Errors

The table below describes the possible error messages that may occur when using the export methods, with a description of the scenario that will return them.

&nbsp;

| Error Message                  |   Error Scenario                 |
|-------------------------------:|-------------------------------------------------:|
| Invalid range: `${options.range}` | Range value is invalid.             |
| No active page available.         | Range is `Range.currentPage` and there is no active page. |
| Unsupported rendition format: `${options.format}` | Rendition format is unsupported.   |
| Invalid background color: `${options.backgroundColor}` | Background color is invalid. |
| Invalid quality parameter: `${options.quality} not in range [0,1]` | Quality property is invalid in jpeg. |
| No video element in the specified range. | No video is present in the range when trying to export mp4. |
| USER_NOT_ENTITLED_TO_PREMIUM_CONTENT | The user is trying to export premium content but is not entitled to it. |
