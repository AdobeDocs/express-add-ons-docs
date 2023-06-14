# AddOnSdk.app.document
Provides access to the methods needed for [importing content](../../guides/develop/index.md#importing-content) to the document and for [exporting content](../../guides/develop/index.md#exporting-content) for export.

## Methods
## addImage()
<!--addImage(imageBlob: Blob): Promise<void>;-->
Adds an image to the current page. 

### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `imageBlob`   | `Blob`       | The image to add to the page. |

### Return Value
A resolved promise if the image was successfully added to the canvas, otherwise will throw an error with the rejected promise.

## addVideo()
<!-- addVideo(blob: Blob): Promise<void>; -->
Adds a video to the current page. 

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
| `format`      | `string`     |  [`RenditionFormat`](./addonsdk-constants.md) constant value. | 


<InlineAlert slots="text" variant="info"/>

The following *additional* options are supported for **`jpg` `RenditionFormat` option only**.

### JpgRenditionOptions
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `quality?`       | `string`     | The background color to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created.
| `backgroundColor?` | `string`     |  A number between 0 and 1, indicating image quality. Default is 1.0. |

<InlineAlert slots="text" variant="info"/>

The following *additional* option is supported for **`png` `RenditionFormat` option**.

### PngRenditionOptions
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `backgroundColor?` | `string` |  A number between 0 and 1, indicating image quality. Default is 1.0. |

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

