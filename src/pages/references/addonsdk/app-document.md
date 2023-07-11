# AddOnSdk.app.document
Provides access to the methods needed for [importing content](../../guides/develop/index.md#importing-content) to the document and for [exporting content](../../guides/develop/index.md#exporting-content) for export.

## Methods
## addImage()
Adds an image to the current page. 

### Signature
`addImage(imageBlob: Blob): Promise<void>`

### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `imageBlob`   | `Blob`       | The image to add to the page. |

### Return Value
A resolved promise if the image was successfully added to the canvas, otherwise will throw an error with the rejected promise.

<InlineAlert slots="text" variant="info"/>

The supported file types for imported content are currently **`png/jpg/jpeg/mp4`,** and the size of the imported images should not exceed **8000px** or **40MB**.

## addVideo()
Adds a video to the current page. 

### Signature
`addVideo(blob: Blob): Promise<void>`

### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `imageBlob`   | `Blob`       | The video to add to the page. |

### Return Value
A resolved promise if the image was successfully added to the canvas, otherwise will throw an error with the rejected promise.

<InlineAlert slots="text" variant="info"/>

Refer to the [importing content use case](../../guides/develop/index.md#importing-content) and the [import-images-from-local](../../samples/#import-images-from-local) in the code samples for usage examples.


## createRenditions()
Create renditions of the current page or the whole document for exporting in a specified format. 

### Signature
`createRenditions(renditionOptions: RenditionOptions): Promise<Rendition[]>`

### Parameters
| Name                | Type         | Description   |
| --------------------| -------------| -----------:  |
| `renditionOptions`  | `Object`     | [`RenditionOptions`](#renditionoptions) object.

### `RenditionOptions`
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `range`       | `string`     | [`Range`](./addonsdk-constants.md) constant value. | 
| `format`      | `string`     | [`RenditionFormat`](./addonsdk-constants.md) constant value. | 


<!-- #### Format Specific Rendition Options -->


### JpgRenditionOptions
The following additional options are supported for `jpg` renditions:

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `backgroundColor?` | `number` |  Integer in 0xRRGGBB format of the background color you wish to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created. |
| `quality?` | `number` |  A number between 0 and 1, indicating image quality. Default is 1.0. |
| [`requestedSize?`](#requested-size-notes)| `{width?: number; height?: number}` | Requested size (in pixels). |




### PngRenditionOptions
The following additional options are supported for `png` renditions:

| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `backgroundColor?` | `number` |  Integer in 0xRRGGBB format of the background color you wish to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created. |
| [`requestedSize?`](#requested-size-notes) | `{width?: number; height?: number}` | Requested size (in pixels). |


### Requested Size Notes
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

### Return Value
A `Promise` with an array of page `Rendition` objects. It will contain one page if the current page was selected or all pages in the case of the document. Each rendition returned will contain the `type` and a `blob` of the rendition itself.

### `Rendition`
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `type?`       | `string`     |  Type of Rendition. Value is always "page" |
| `blob`        | `Blob`       | Blob containing the rendition |
| `title`       | `string`     | The page title of the rendition. | 

<InlineAlert slots="text" variant="info"/>

Refer to the [exporting content use case example](../../guides/develop/index.md#exporting-content) and the [export-sample](../../samples/#export-sample) in the code samples for usage examples.

