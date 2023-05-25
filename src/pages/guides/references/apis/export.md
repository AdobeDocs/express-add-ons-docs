# Export
Export renditions of your design in **jpg**, **png**, **pdf** and **mp4** formats. Choose to export a single page or the whole document by specifying in the rendition options, along with a variety of other export configuration options outlined below.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface


```js
interface Document {
  /**
  * Create renditions  
  * @param renditionOptions - page rendition options
  * @returns a promise of type array of page rendition  
  */
  createRenditions(renditionOptions: RenditionOptions): Promise<Rendition[]>;
}
 

interface RenditionOptions {
  /**
   * Range of the document to get the rendition
   */
  range: Range;
 
  /**
   * Format of the rendition
   */
  format: RenditionFormat;
}

export enum Range {
    /**
     * Generate rendition for the current page
     */
    currentPage = "currentPage",

    /**
     * Generate rendition for all the pages
     */
    entireDocument = "entireDocument"
}

enum Range {
  /**
   * Generate rendition for the current page
   */
  currentPage,
 
  /**
   * Generate rendition for all the pages
   */
  entireDocument
}
 
enum RenditionFormat {
  /**
   * PNG format
   */
  png = "image/png",
 
  /**
   * JPG format
   */
  jpg = "image/jpeg",
 
  /**
   * MP4 format
   */
  mp4 = "video/mp4",
 
  /**
   * PDF format
   */
  pdf = "application/pdf"
}
 
interface JpgRenditionOptions extends RenditionOptions {
  /**
   * JPG rendition format
   */
  format: RenditionFormat.jpg;
 
  /**
   * The background color to sit behind any transparent areas.
   * By default it is derived from the entity for which the rendition needs to be created.
   * Integer in 0xRRGGBB format.
   */
  backgroundColor?: number;
 
  /**
   * A number between 0 and 1, indicating image quality. Default is 1.0
   */
  quality?: number;
}
 
interface PngRenditionOptions extends RenditionOptions {
  /**
   * PNG rendition format
   */
  format: RenditionFormat.png;
 
  /**
   * The background color to sit behind any transparent areas.
   * By default it is derived from the entity for which the rendition needs to be created.
   * Integer in 0xAARRGGBB format
   */
  backgroundColor?: number;
}

interface Rendition {
  /**
   * Type of Rendition
   */
  type: RenditionType;
  
  /**
   * Blob containing the rendition
   */
  blob: Blob;
}
 
enum RenditionType {
  /**
   * Rendition of the whole page
   */
  page = "page"
}
 
interface PageRendition extends Rendition {
  /**
   * Page rendition type
   */
  type: RenditionType.page;
 
  /**
   * Page title
   */
  title: string;
}
```

### Example
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Display preview of all pages in the Add-on UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {range: Range.entireDocument, format: RenditionFormat.png, backgroundColor: 0x7FAA77FF};
    const renditions = await AddOnSdk.app.document.createRenditions(renditionOptions);
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
<InlineAlert slots="text" variant="success"/>

Please refer to the **export-sample** and **pix** add-on in the code samples for more details on how to use the Export APIs.

### Rendition Response JSON
``json
response:
  blob: Blob {size: 357080, type: 'image/png'}
  title: ""
  type: "page"
```