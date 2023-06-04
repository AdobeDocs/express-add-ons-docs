# AddOnSdk.app.document
Provides access to the methods needed for [importing an image or video](../../develop/#importing-content) to the document and for [creating a rendition](../../develop/#exporting-content) for export.

## Methods
### addImage()
<!--addImage(imageBlob: Blob): Promise<void>;-->
Adds an image to the current page. 

#### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `imageBlob`   | `Blob`       | The image to add to the page. |

#### Return Value
A resolved promise if the image was successfully added to the canvas, otherwise will throw an error with the rejected promise.

### addVideo()
<!-- addVideo(blob: Blob): Promise<void>; -->
Adds a video to the current page. 

#### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `imageBlog`   | `Blob`       | The video to add to the page. |

#### Return Value
A resolved promise if the image was successfully added to the canvas, otherwise will throw an error with the rejected promise.

### createRenditions()
Create renditions of the current page or the whole document for exporting in a specified format. 
<!-- createRenditions(renditionOptions: RenditionOptions): Promise<Rendition[]>; -->

#### Parameters
| Name                | Type         | Description   |
| --------------------| -------------| -----------:  |
| `renditionOptions`  | `Object`     | Page rendition options object with a specified range and format. |

**Possible `range` values (type: `string`):**
- `"image/png"`
- `"image/jpeg"`
- `"image/jpeg"`
- `"video/mp4"` 
- `"application/pdf"`

**Possible `format` options:**
- `"currentPage"`
- `"entireDocument"`

#### Return Value
A promise with an array of page renditions. Will contain one page if the current page was selected or all pages in the case of the document. Each rendition returned will contain the `type` and a `blob` of the rendition itself.
