# addOnUISdk.app.document

Provides access to the methods needed for retrieving [document metadata](#general-methods), [importing content](../../guides/learn/how_to/use_images.md#import-images-into-the-page) such as images, audio and video into the document, and for [exporting content](../../guides/learn/how_to/create_renditions.md) from the current document.

## General Methods

### id()

Retrieves the id of the document.

#### Signature

`id(): Promise<string | undefined>`

#### Return Value

A resolved `Promise` containing the `id` of the document.

<InlineAlert slots="text" variant="info"/>

**Note:** A `documentIdAvailable` event is triggered when the document id is available in the application. You can listen for this event via the [`addOnUISdk.app.on()`](./addonsdk-app.md#on) method.

#### Example Usage

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

function setId(id) { /* ... */ }

addOnUISdk.ready.then(() => setId(await addOnUISdk.app.document.id()));

addOnUISdk.app.on("documentIdAvailable", data => {
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

#### Example Usage

<CodeBlock slots="heading, code" repeat="1" languages="JavaScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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

| Name      | Type     |                                           Description |
| --------- | -------- | ----------------------------------------------------: |
| `options` | `Object` | [`PageMetadataOptions`](#pagemetadataoptions) object. |

#### Return Value

A resolved `Promise` containing a [`PageMetadata`](#pagemetadata) array containing all of the pages in the document.

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, bash" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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
      console.log("Page has audio content: ", page.hasAudioContent);
      console.log("Page has video content: ", page.hasVideoContent);
      console.log("Page has animated content: ", page.hasAnimatedContent);
      console.log("Page has timelines: ", page.hasTemporalContent);
      if (page.hasTemporalContent)
          console.log("Page includes temporal content with a duration of: ", page.temporalContentDuration);
      console.log("Pixels per inch: ", page.pixelsPerInch);
      console.log("Is page print ready: ", page.isPrintReady);
      console.log("Is page blank: ", page.isBlank);
      console.log("Template details: ", page.templateDetails);
    }
  }
  catch(error) {
    console.log("Failed to get metadata:", error);
  }
}
```

#### Output

```bash
Page id: 772dc4b6-0df5-469f-b477-2a0c5445a6ef
Page title: My First Page
Page size: { width: 2550, height: 3300 }
Page has premium content: false
Page has audio content: false
Page has video content: true
Page has animated content: false
Page has timelines: true
Page includes temporal content with a duration of: 100
Pixels per inch: 72
Is page print ready: true
Is page blank: false
Template details of page: { id: 'urn:aaid:sc:VA6C2:0ccab100-a230-5b45-89f6-7e78fdf04141', creativeIntent: 'flyer' }
```

### runPrintQualityCheck()

Tells Express to run a print quality check to determine if the document is ready for printing and updates the quality metadata with the result. For instance, if the document is not ready for printing, the `isPrintReady` property of the page metadata will be set to `false`.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This method is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../references/manifest/index.md#requirements) section of the `manifest.json`.

#### Signature

`runPrintQualityCheck(options: PrintQualityCheckOptions): void`

#### Parameters

| Name      | Type     |                                                     Description |
| --------- | -------- | --------------------------------------------------------------: |
| `options` | `Object` | [`PrintQualityCheckOptions`](#printqualitycheckoptions) object. |

#### Return Value

`void`

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Reference to the active document
const { document } = addOnUISdk.app;

// Run Print Quality Check
function runPrintQualityCheck() {
  try {
    document.runPrintQualityCheck({
      range: addOnUISdk.constants.Range.entireDocument,
    });
    console.log("Print quality check completed successfully");
  } catch (error) {
    console.log("Failed to run print quality check");
  }
}
```

#### Output

```bash
Print quality check completed successfully
```

#### `TemplateDetails`

Retrieve the details about the template used to create the document.

| Name              | Type     | Description                     |
| ----------------- | -------- | ------------------------------- |
| `id`              | `string` | Unique id of the template       |
| `creativeIntent?` | `string` | Creative intent of the template |

#### `PrintQualityCheckOptions`

The options to pass into the print quality check..

| Name       | Type                                         | Description                                                           |
| ---------- | -------------------------------------------- | --------------------------------------------------------------------- |
| `range`    | [`Range`](../addonsdk/addonsdk-constants.md) | The range of the document to run the print quality check on.          |
| `pageIds?` | `string[]`                                   | Id's of the pages. (Only required when the range is `specificPages`). |

#### `PageMetadata`

The metadata of a page.

| Name                 | Type                                |                                                                                                                                                                                                                                                                                                                                                                Description |
| -------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `id`                 | `string`                            |                                                                                                                                                                                                                                                                                                                                                        The id of the page. |
| `title`              | `string`                            |                                                                                                                                                                                                                                                                                                                                                     The title of the page. |
| `size`               | `{ width: number, height: number }` |                                                                                                                                                                                                                                                                                                                                            The size of the page in pixels. |
| `hasPremiumContent`  | `boolean`                           |                                                                                                                                                                                                                                                                                                                    `true` if the page has premium content, `false` if not. |
| `hasAudioContent`    | `boolean`                           |                                                                                                                                                                                                                                                                                                                      `true` if the page has audio content, `false` if not. |
| `hasVideoContent`    | `boolean`                           |                                                                                                                                                                                                                                                                                                                      `true` if the page has video content, `false` if not. |
| `hasAnimatedContent` | `boolean`                           |                                                                                                                                                                                                                                                                                                                   `true` if the page has animated content, `false` if not. |
| `hasTemporalContent` | `boolean`                           |                                                                                                                                                                                                                                                                                                                          `true` if the page has timelines, `false` if not. |
| `temporalContentDuration?` | `number`                      |                                                                                                                                                                                                                                                                                                    The duration of temporal content in milliseconds (only present when `hasTemporalContent` is `true`). |
| `pixelsPerInch?`     | `number`                            |                                                                                                                                                                                                                                                                                                                                           The pixels per inch of the page. |
| `isPrintReady?`      | `boolean`                           | Indicates whether the page has passed various internal quality checks to ensure high quality output when printed. While the specifics may change over time, Adobe Express checks for sufficient image resolution and sizes to ensure that a print will be of good quality. If this is `false`, the output may be blurry or of poor quality (based on internal heuristics). |
| `isBlank?`           | `boolean`                           |                                                                                                                                                                                                                                                                                                                                       Indicates whether the page is blank. |
| `templateDetails?`   | `TemplateDetails`                   |                                                                                                                                                                                                                                                                                                                                  The details of the template for the page. |

#### `PageMetadataOptions`

This object is passed as a parameter to the [`getPagesMetadata`](#getpagesmetadata) method and includes the range and optional `pageIds` for which you want to retrieve metadata for.

| Name                 | Type                                                   |                                                           Description |
| -------------------- | ------------------------------------------------------ | --------------------------------------------------------------------: |
| `range`              | [`Range`](../addonsdk/addonsdk-constants.md) |                             Range of the document to get the metadata |
| `pageIds?: string[]` | `string`                                               | Id's of the pages. (Only required when the range is `specificPages`). |

### getSelectedPageIds()

Retrieves the currently selected page ids in the document.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This method is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../references/manifest/index.md#requirements) section of the `manifest.json`.

#### Signature

`getSelectedPageIds(): Promise<string[]>`

#### Return Value

A resolved `Promise` containing an array of `string` ids representing the currently selected pages in the document.

#### Example Usage

```javascript
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Get the currently selected page ids
async function getSelectedPages() {
  try {
    const selectedPageIds = await addOnUISdk.app.document.getSelectedPageIds();
    console.log("Selected page ids:", selectedPageIds);
    
    if (selectedPageIds.length === 0) {
      console.log("No pages are currently selected");
    } else {
      console.log(`${selectedPageIds.length} page(s) selected:`, selectedPageIds);
    }
  } catch (error) {
    console.log("Failed to get selected page ids:", error);
  }
}

// Example: Get metadata for selected pages only
async function getSelectedPagesMetadata() {
  try {
    const selectedPageIds = await addOnUISdk.app.document.getSelectedPageIds();
    
    if (selectedPageIds.length > 0) {
      const metadata = await addOnUISdk.app.document.getPagesMetadata({
        range: addOnUISdk.constants.Range.specificPages,
        pageIds: selectedPageIds
      });
      
      metadata.forEach((page, index) => {
        console.log(`Selected page ${index + 1}: ${page.title} (${page.id})`);
      });
    } else {
      console.log("No pages selected");
    }
  } catch (error) {
    console.log("Failed to get selected pages metadata:", error);
  }
}

// Call the functions
getSelectedPages();
getSelectedPagesMetadata();
```

### link()

Retrieves the document link.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This method, the LinkOptions parameter and the associated link events are currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../references/manifest/index.md#requirements) section of the `manifest.json`.

#### Signature

`link(options: LinkOptions): Promise<string | undefined>`

#### Return Value

A resolved `Promise` containing the `link` of the document.

<InlineAlert slots="text" variant="info"/>

A `documentLinkAvailable` or `documentPublishedLinkAvailable` event is triggered when the document link is available in the application. You can listen for this event via the [`addOnUISdk.app.on()`](./addonsdk-app.md#on) method.

#### Example Usage

```javascript
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    // Get the current document link
    const documentLink = await addOnUISdk.app.document.link("document");
    console.log("Document link:", documentLink);

    // Get the published document link
    const publishedLink = await addOnUISdk.app.document.link("published");
    console.log("Published link:", publishedLink);
  } catch (error) {
    console.log("Failed to get document links:", error);
  }

  // Listen for document link availability changes
  addOnUISdk.app.on("documentLinkAvailable", (data) => {
    console.log("Document link availability changed. Link value:", data.documentLink);
  });

  // Listen for published document link availability changes
  addOnUISdk.app.on("documentPublishedLinkAvailable", (data) => {
    console.log("Published link availability changed. Link value:", data.documentPublishedLink);
  });
});
```

#### `LinkOptions`

The options to pass into the link method.

| Name          | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| `linkOptions` | `string` | [`LinkOptions`](./addonsdk-constants.md) constant value. |

## Import Content Methods

### addImage()

Adds an image/gif/Ps/Ai files to the current page.

#### Signature

`addImage(imageBlob: Blob, attributes?: MediaAttributes): Promise<void>`

#### Parameters

| Name          | Type                                  |                                                                              Description |
| ------------- | ------------------------------------- | ---------------------------------------------------------------------------------------: |
| `imageBlob`   | `Blob`                                |                                                            The image to add to the page. |
| `attributes?` | [`MediaAttributes`](#mediaattributes) | Attributes that can be passed when adding image/Ps/Ai files to the page (i.e., `title`). |

#### Return Value

A resolved promise if the image was successfully added to the canvas; otherwise, it will throw an error with the rejected promise.

#### Example Usage

```javascript
// Add image(blob) to the current page
async function addImageFromBlob(blob) {
  try {
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the page.");
  }
}

// Add image(url) to the current page
async function addImageFromURL(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    await document.addImage(blob);
  } catch (error) {
    console.log("Failed to add the image to the page.");
  }
}
```

<InlineAlert slots="text" variant="info"/>

Refer to the [image requirements](#image-requirements) section for specific details on supported image sizes and GIF handling.

### addAnimatedImage()

Adds an animated image (gif) to the current page.

#### Signature

`addAnimatedImage(imageBlob: Blob, attributes?: MediaAttributes): Promise<void>`

#### Parameters

| Name          | Type                                  |                                                                          Description |
| ------------- | ------------------------------------- | -----------------------------------------------------------------------------------: |
| `imageBlob`   | `Blob`                                |                                                        The image to add to the page. |
| `attributes?` | [`MediaAttributes`](#mediaattributes) | Attributes that can be passed when adding animated gifs to the page (i.e., `title`). |

#### Return Value

A resolved promise if the animated image was successfully added to the canvas; otherwise, it will throw an error with the rejected promise.

#### Example Usage

```js
// Add animated image(blob) to the current page
async function addAnimatedImageFromBlob(blob) {
  try {
    await document.addAnimatedImage(blob);
  } catch (error) {
    console.log("Failed to add the animated image to the page.");
  }
}
```

<InlineAlert slots="text" variant="info"/>

Refer to the [image requirements](#image-requirements) section for specific details on supported image sizes and GIF handling.

### addVideo()

Adds a video to the current page.

#### Signature

`addVideo(videoBlob: Blob): Promise<void>`

#### Parameters

| Name        | Type   |                   Description |
| ----------- | ------ | ----------------------------: |
| `videoBlob` | `Blob` | The video to add to the page. |

#### Example Usage

```js
async function addVideoFromBlob(blob) {
  try {
    await document.addVideo(blob);
  } catch (error) {
    console.log("Failed to add the video to the page.");
  }
}

async function addVideoFromURL(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    await document.addVideo(blob);
  } catch (error) {
    console.log("Failed to add the video to the page.");
  }
}
```

### addAudio()

Adds audio to the current page.

#### Signature

`addAudio(audioBlob: Blob, attributes: MediaAttributes): Promise<void>`

#### Parameters

| Name         | Type                                  |                                                                             Description |
| ------------ | ------------------------------------- | --------------------------------------------------------------------------------------: |
| `audioBlob`  | `Blob`                                |                                                           The audio to add to the page. |
| `attributes` | [`MediaAttributes`](#mediaattributes) | Attributes to pass when adding the audio to the page (ie: `title`, which is mandatory). |

#### Return Value

A resolved promise if the audio was successfully added to the canvas; otherwise will throw an error with the rejected promise.

#### Example Usage

```js
async function addAudioFromBlob(blob) {
  try {
      await document.addAudio(blob, {title: "Jazzy beats", author: "Jazzy"});
  }
  catch(error) {
      console.log("Failed to add the audio to the page.");
  }
}

async function addAudioFromURL(url) {
  try {
      const blob = await fetch(url).then(response => response.blob());
      await document.addAudio(blob, {title: "Jazzy beats", author: "Jazzy"});
  }
  catch(error) {
      console.log("Failed to add the audio to the page.");
  }
```

#### `MediaAttributes`

| Name      | Type     |                               Description |
| --------- | -------- | ----------------------------------------: |
| `title`   | `string` | Media title (mandatory for audio import). |
| `author?` | `string` |                              Media author |

<InlineAlert slots="text" variant="info"/>

Refer to the [import images how-to](../../guides/learn/how_to/use_images.md#import-images-into-the-page) and the [import-images-from-local](../../guides/learn/samples.md#import-images-from-local) in the code samples for general importing content examples.

### importPdf()

Imports a PDF as a new Adobe Express document.

#### Signature

`importPdf(blob: Blob, attributes: MediaAttributes & SourceMimeTypeInfo): void;`

#### Parameters

| Name                                         | Type                                  |                                                                 Description |
| -------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------: |
| `blob`                                       | `Blob`                                |                                                 The PDF to add to the page. |
| `attributes?`                                | [`MediaAttributes`](#mediaattributes) | Attributes that can be passed when adding PDFs to the page (i.e., `title`). |
| [`SourceMimeTypeInfo?`](#sourcemimetypeinfo) | `SourceMimeTypeInfo`                  |                                       Mime type details for importing media |

#### Return Value

None

#### `SourceMimeTypeInfo`

Mime type details for importing media

| Name              | Type                       |                                                      Description |
| ----------------- | -------------------------- | ---------------------------------------------------------------: |
| `sourceMimeType?` | [`SupportedMimeTypes`](./) | Mime type of the original source asset that was converted to PDF |

### SupportedMimeTypes

A constant representing the mime type of the original source asset that was converted to PDF.

- **docx**: `"docx"`
- **gdoc**: `"gdoc"`

<InlineAlert slots="text" variant="info"/>

Use this property to improve the user experience when importing converted documents. Adobe Express does not natively support Word documents (`.docx`) or Google Docs (`.gdoc`) files. However, your add-on can convert these file types to PDF format behind the scenes before importing them.

When you call `importPdf()` with a converted file, you can pass the original file's mime type (`"docx"` or `"gdoc"`) in the `sourceMimeType` parameter. This ensures that the import consent dialog displays "Import a document" instead of "Import a PDF" to the user, preventing confusion about why their Word document or Google Docs file is being referred to as a PDF.

**Important:** Do not pass the original Word documentor Google Docs file directly to `importPdf()`. Your add-on must first convert these files to PDF format, then use this parameter solely to customize the dialog message for better user experience.

#### Example Usage

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Reference to the active document
const { document } = addOnUISdk.app;

// Import a regular PDF file
async function importPdf(pdfBlob) {
  try {
    document.importPdf(pdfBlob, { title: "Sample.pdf" });
  } catch (error) {
    console.log("Failed to import the pdf.");
  }
}

// Import a PDF that was converted from a Word document
// The sourceMimeType parameter ensures the dialog shows "Import a document" instead of "Import a PDF"
async function importConvertedWordDoc(convertedPdfBlob) {
  try {
    document.importPdf(convertedPdfBlob, {
      title: "Converted Document.pdf",
      sourceMimeType: "docx"
    });
  } catch (error) {
    console.log("Failed to import the converted Word document.");
  }
}

// Import a PDF that was converted from a Google document
async function importConvertedGoogleDoc(convertedPdfBlob) {
  try {
    document.importPdf(convertedPdfBlob, {
      title: "Converted Google Doc.pdf",
      sourceMimeType: "gdoc"
    });
  } catch (error) {
    console.log("Failed to import the converted Google document.");
  }
}
```

### importPresentation()

Imports a presentation as a new Adobe Express document. **Note:** Currently Express only supports PowerPoint presentations.

#### Signature

`importPresentation(blob: Blob, attributes: MediaAttributes): void;`

#### Parameters

| Name          | Type                                  |                                                                           Description |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------: |
| `blob`        | `Blob`                                |                             The PowerPoint presentation (`.pptx`) to add to the page. |
| `attributes?` | [`MediaAttributes`](#mediaattributes) | Attributes that can be passed when adding a presentation to the page (i.e., `title`). |

#### Return Value

None

#### Example Usage

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Reference to the active document
const { document } = addOnUISdk.app;

const mediaAttributes = { title: "Sample.pptx" }; // only Pptx is supported by Express

// Import a presentation. Note: this will be imported as a new Adobe Express presentation.
function importPresentation(blob, mediaAttributes) {
  try {
    document.importPresentation(blob, mediaAttributes);
  } catch (error) {
    console.log("Failed to add the presentation to the document.");
  }
}

// Import a powerpoint presentation from a URL. Note: this will be imported as a new Adobe Express presentation.
async function importPresentationFrom(url) {
  try {
    const blob = await fetch(url).then((response) => response.blob());
    document.importPresentation(blob, { title: "Sample.pptx" });
  } catch (error) {
    console.log("Failed to add the presentation to document.");
  }
}
```

### Image requirements

When importing images, the size of the images for all types **except `gif`** images should not exceed **8000px** or **80MB**—see the full [image requirements](https://helpx.adobe.com/express/web/create-and-edit-images/change-file-formats/image-requirements.html) for more details.

For `gif` images, [the technical requirements are listed here](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html) and summarized below for quick reference:

- **Maximum resolution:** 1080px
- **Maximum size:** 10 MB
- **Maximum GIFs per scene:** 7

<InlineAlert slots="header, text1, text2" variant="info"/>

IMPORTANT: Animated GIFs

Both `addImage()` and `addAnimatedImage()` support `gif` file types, however, you should use the `addAnimatedImage()` method when you want to add an _animated GIF_ specifically but note that it is subject to the size criteria listed above. When the criteria aren't met, only the first frame will be added.

If you supply `addImage()` with an animated GIF, only the first frame will be added by default.

\*\* See the [FAQ's](../../guides/support/faq.md#what-are-the-supported-file-formats-for-imported-content-in-adobe-express) for the specific file formats allowed for imported content.

### Errors

The table below describes the possible error messages that may occur when using the import methods, with a description of the scenario that would cause them to be returned.

&nbsp;

|                                                                      Error Message |                                                                    Error Scenario |
| ---------------------------------------------------------------------------------: | --------------------------------------------------------------------------------: |
|                                                                      Invalid blob. |                                                                  Blob is invalid. |
|                                             Unsupported mime type : `${blob.type}` |                                                             Mime type is invalid. |
| Import image width or height exceed the maximum limit : `${maxSupportedDimension}` | The imported image dimensions exceed the maximum limit if any defined by Express. |
|                Import image size exceed the maximum limit: `${maxSupportedSize}MB` |      The imported image size exceeds the maximum limit if any defined by Express. |
|                                                          No active page available. |                                                       Current page doesn't exist. |

## Export Content Methods

### createRenditions()

Generate renditions of the current page, specific pages or the entire document in a specified format for export.

#### Signature

`createRenditions(renditionOptions: RenditionOptions, renditionIntent?: RenditionIntent): Promise<Rendition[]>`

#### Parameters

| Name               | Type     |                                                  Description |
| ------------------ | -------- | -----------------------------------------------------------: |
| `renditionOptions` | `Object` |              [`RenditionOptions`](#renditionoptions) object. |
| `renditionIntent`  | `string` | [`RenditionIntent`](./addonsdk-constants.md) constant value. |

**NOTE:** The default value for `renditionIntent` is `export`. If it's set to `preview`, it also requires the `renditionPreview` flag to be set to `true` in the [manifest `requirements`](../manifest/index.md#requirements) section. Additionally, when implementing the premium content flows where you present a dialog or option to allow the user to upgrade, you must be sure to also include the following permissions in the [`sandbox`](../../references/manifest/index.md#entrypointspermissionssandbox) attribute of your `manifest.json` to allow the Adobe Express pricing page to load properly:

```json
"permissions": {
    "sandbox": ["allow-popups-to-escape-sandbox", "allow-popups", "allow-downloads"]
}
```

Refer to the [manage premium content how-to](../../guides/learn/how_to/premium_content.md) for more specific details on options for handling the export of premium content.

#### `RenditionOptions`

| Name       | Type       |                                                                                  Description |
| ---------- | ---------- | -------------------------------------------------------------------------------------------: |
| `range`    | `string`   |                                           [`Range`](./addonsdk-constants.md) constant value. |
| `format`   | `string`   |                                 [`RenditionFormat`](./addonsdk-constants.md) constant value. |
| `pageIds?` | `string[]` | Id's of the pages (only required if the range is [`specificPages`](./addonsdk-constants.md)) |

#### `JpgRenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object and adds the following additional options for `jpg` renditions:

| Name                                      | Type                                |                                                                                                                                                                            Description |
| ----------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `format`                                  | `string`                            |                                                                                                                       [`RenditionFormat.jpg`](./addonsdk-constants.md) constant value. |
| `backgroundColor?`                        | `number`                            | Integer in 0xRRGGBB format of the background color you wish to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created. |
| `quality?`                                | `number`                            |                                                                                                                    A number between 0 and 1, indicating image quality. Default is 1.0. |
| [`requestedSize?`](#requested-size-notes) | `{width?: number; height?: number}` |                                                                                                                                                            Requested size (in pixels). |

#### `PngRenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object and adds the following additional options for `png` renditions:

| Name                                      | Type                                |                                                                                                                                                                            Description |
| ----------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `format`                                  | `string`                            |                                                                                                                       [`RenditionFormat.png`](./addonsdk-constants.md) constant value. |
| `backgroundColor?`                        | `number`                            | Integer in 0xRRGGBB format of the background color you wish to sit behind any transparent areas. By default it is derived from the entity for which the rendition needs to be created. |
| [`requestedSize?`](#requested-size-notes) | `{width?: number; height?: number}` |                                                                                                                                                            Requested size (in pixels). |
| `fileSizeLimit?`                          | `number`                            |                                                                                                                                                     File size limit for the rendition. |
| `fileSizeLimitUnit?`                      | `string`                            |                                                                                                Unit of the file size limit, [`FileSizeLimitUnit`](./addonsdk-constants.md) enumerable. |

#### Requested Size Notes

- The supported size is from 1 x 1 to 8192 x 8192.
- Aspect ratio is maintained while scaling the rendition based on the requested size.
- Up-scaling is currently not supported.
- If the requested size is invalid, it will be ignored and the original size rendition will be created.
- Some examples of what the actual exported sizes will be, depending on the page size and requested size are in the table below for reference.

| Page Size | Requested Size               | Exported Size | Notes                                       |
| --------- | ---------------------------- | ------------: | ------------------------------------------- |
| 400 x 600 | undefined                    |     400 x 600 | Original page size maintained               |
| 400 x 600 | 200 x undefined (width only) |     200 x 300 | Height scaled proportionally                |
| 400 x 600 | 200 x 200                    |     134 x 200 | Aspect ratio preserved, fits within bounds  |
| 400 x 600 | 200 x 400                    |     200 x 300 | Aspect ratio preserved, fits within bounds  |
| 400 x 600 | 200 x -200                   |     400 x 600 | Negative values ignored, original size used |
| 400 x 600 | 800 x 1000                   |    667 x 1000 | Upscaled while maintaining aspect ratio     |
| 400 x 600 | 8000 x 10000                 |   5462 x 8192 | Upscaled to maximum allowed dimensions      |

#### `PptxRenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object with the specific format for `pptx` renditions:

| Name     | Type     |                                                                                     Description |
| -------- | -------- | -----------------------------------------------------------------------------------------------: |
| `format` | `string` | [`RenditionFormat.pptx`](./addonsdk-constants.md) constant value for PowerPoint presentation. |

<InlineAlert slots="text" variant="info"/>

**Note:** PPTX export is only available for presentation-type documents in Adobe Express. When implementing PPTX export in your add-on, consider informing users that fonts from Adobe Express might look different in PowerPoint, and that videos, audio, presenter notes, and animations will not be included in the exported file. Adobe Express displays a similar disclaimer when users download PPTX files directly from the app.

#### `PdfRenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object and adds the following additional options for `pdf` renditions:

| Name         | Type                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Description |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `bleed?`     | [`Bleed`](#bleed)               | Bleed for the page. In printing, bleed is printing that goes beyond the edge of where the sheet will be trimmed. In other words, the bleed is the area to be trimmed off. The parameter is optional, and if left undefined, then no bleed is assumed. If `bleed` is defined, `CropBox` and `TrimBox` will be the size of the Express document, `BleedBox` and `MediaBox` will be equal to each other, and they will expand on all sides (left, top, right, bottom) with the amount/unit specified by `bleed`. |
| `pageBoxes?` | [`PdfPageBoxes`](#pdfpageboxes) |                                                                                                                                                                                                                               Exposes the ability to customize each PDF Page Box (`MediaBox`, `BleedBox`, `CropBox`, `TrimBox`) dimensions by defining how much it should expand on each side beyond the Express document page size. If `pageBoxes` are defined, then `PdfRenditionOptions.bleed` is ignored. |

#### `Bleed`

Represents a _bleed_ for a page. In printing, _bleed_ is printing that goes beyond the edge of where the sheet will be trimmed. In other words, the bleed is the area to be trimmed off. If the value is left undefined, then no bleed will be assumed.

| Name      | Type                                                       |                                      Description |
| --------- | ---------------------------------------------------------- | -----------------------------------------------: |
| `amount?` | `number`                                                   |                        The amount for the bleed. |
| `unit`    | [`BleedUnit`](../addonsdk/addonsdk-constants.md) | The unit in which the bleed amount is expressed. |

#### `PdfPageBoxes`

Represents all of the PDF page boxes (`MediaBox`, `BleedBox`, `CropBox`, `TrimBox`).

| Name        | Type                        | Description |
| ----------- | --------------------------- | ----------: |
| `mediaBox?` | [`PdfPageBox`](#pdfpagebox) |   Media box |
| `bleedBox?` | [`PdfPageBox`](#pdfpagebox) |   Bleed box |
| `cropBox?`  | [`PdfPageBox`](#pdfpagebox) |    Crop box |
| `trimBox?`  | [`PdfPageBox`](#pdfpagebox) |    Trim box |

#### `PdfPageBox`

Represents a PDF page box.

| Name      | Type                                      |       Description |
| --------- | ----------------------------------------- | ----------------: |
| `margins` | [`PdfPageBoxMargins`](#pdfpageboxmargins) | Margins for a box |

#### `PdfPageBoxMargins`

Represents margins for a PDF page box.

| Name      | Type              |   Description |
| --------- | ----------------- | ------------: |
| `top?`    | [`Bleed`](#bleed) |    Top margin |
| `bottom?` | [`Bleed`](#bleed) | Bottom margin |
| `left?`   | [`Bleed`](#bleed) |   Left margin |
| `right?`  | [`Bleed`](#bleed) |  Right margin |

#### `Mp4RenditionOptions`

Extends the [`RenditionOptions`](#renditionoptions) object and adds the following additional options for `mp4` renditions:

| Name                | Type     |                                                                         Description |
| ------------------- | -------- | ----------------------------------------------------------------------------------: |
| `format`            | `string` |                    [`RenditionFormat.mp4`](./addonsdk-constants.md) constant value. |
| `resolution?`       | `string` |                        [`VideoResolution`](./addonsdk-constants.md) constant value. |
| `customResolution?` | `number` |                  Only required/used if the `resolution` is `VideoResolution.custom` |
| `frameRate?`        | `number` | Frame rate in frames per second, [`FrameRate`](./addonsdk-constants.md) enumerable. |
| `bitRate?`          | `number` |       Bit rate in bits per second, [`BitRate`](./addonsdk-constants.md) enumerable. |

#### Return Value

A `Promise` with an array of page `Rendition` objects (see [`PageRendition`](#pagerendition)). The array will contain one item if the `currentPage` range is requested, an array of specific pages when the `specificPages` range is requested, or all pages when the `entireDocument` range is specified. Each rendition returned will contain the `type`, `title`,[metadata for the page](#pagemetadata) and a `blob` of the rendition itself. **Note:** If you requested `PDF` or `PPTX` for the format with a larger range than `currentPage`, a single file will be generated which includes the entire range. When the format is `JPG/PNG/MP4`, an array of files will be generated that represents each page.

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the UI of your add-on
async function displayPreview() {
  try {
    const renditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7faa77ff,
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions,
      addOnUISdk.constants.RenditionIntent.preview
    );
    renditions.forEach((rendition) => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  } catch (error) {
    console.log("Failed to create renditions:", error);
  }
}

// Export document as PowerPoint presentation
async function exportAsPowerPoint() {
  try {
    const renditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.pptx,
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions,
      addOnUISdk.constants.RenditionIntent.export
    );
    
    // Download the PPTX file
    const rendition = renditions[0]; // PPTX exports as single file
    const url = URL.createObjectURL(rendition.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rendition.title}.pptx`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Failed to export as PowerPoint:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {
      range: Range.entireDocument,
      format: RenditionFormat.png,
      backgroundColor: 0x7faa77ff,
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions,
      RenditionIntent.preview
    );
    renditions.forEach((rendition) => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  } catch (error) {
    console.log("Failed to create renditions:", error);
  }
}

// Export document as PowerPoint presentation
async function exportAsPowerPoint() {
  try {
    const renditionOptions: PptxRenditionOptions = {
      range: Range.entireDocument,
      format: RenditionFormat.pptx,
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions,
      RenditionIntent.export
    );
    
    // Download the PPTX file
    const rendition = renditions[0]; // PPTX exports as single file
    const url = URL.createObjectURL(rendition.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rendition.title}.pptx`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Failed to export as PowerPoint:", error);
  }
}
```

#### `Rendition`

A rendition object representing a page in the document, returned from [`createRenditions`](#createrenditions). See

| Name    | Type     |                                Description |
| ------- | -------- | -----------------------------------------: |
| `type?` | `string` | Type of Rendition. Value is always `page`. |
| `blob`  | `Blob`   |              Blob containing the rendition |

#### `PageRendition`

An extension of [`Rendition`](#rendition), returned in the response to [`createRenditions`](#createrenditions). This object **includes everything in [`Rendition`](#rendition)**, as well as:

| Name       | Type                            |                     Description |
| ---------- | ------------------------------- | ------------------------------: |
| `title`    | `string`                        | The page title of the rendition |
| `metadata` | [`PageMetadata`](#pagemetadata) |                   Page metadata |

\*\* See the [FAQs](../../guides/support/faq.md#what-are-the-supported-mime-typesfile-formats-for-exported-content) for the file formats and mime types supported for exported content.

<InlineAlert slots="text" variant="info"/>

Refer to the [create renditions how-to](../../guides/learn/how_to/create_renditions.md) and the [export-sample](../../guides/learn/samples.md) in the code samples for usage examples.

### exportAllowed()

Determines whether the current document can be exported based on its review status in review and approval workflows.

#### Signature

`exportAllowed(): Promise<boolean>`

#### Return Value

A resolved `Promise` containing a `boolean` value indicating whether export is allowed (`true`) or restricted (`false`) based on the document's review status.

<InlineAlert slots="text" variant="info"/>

This method is particularly useful in collaborative environments where documents may be subject to review and approval processes. When a document is in certain review states, export functionality may be restricted to prevent unauthorized distribution of content that hasn't been approved.

**Important:** This restriction only applies to renditions created with `RenditionIntent.export` or `RenditionIntent.print`. Renditions created with `RenditionIntent.preview` are always allowed, regardless of the export status, as they are intended for preview purposes only.

**User Experience Note:** If you attempt to create export/print renditions without checking `exportAllowed()` first, and the document doesn't allow exports, users will see an error dialog with the message "Request approval" and "Get approval from your viewers before sharing this file". Using `exportAllowed()` allows you to provide a more graceful user experience by checking permissions proactively.

#### Example Usage

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Check export permissions before creating non-preview renditions
async function handleExportRequest() {
  try {
    const canExport = await addOnUISdk.app.document.exportAllowed();

    if (canExport) {
      // Create rendition for export/download
      const rendition = await addOnUISdk.app.document.createRenditions(
        { range: addOnUISdk.constants.Range.currentPage, format: addOnUISdk.constants.RenditionFormat.png },
        addOnUISdk.constants.RenditionIntent.export
      );
      // ... handle download
    } else {
      // Show preview only since export is restricted
      console.log("Export restricted - showing preview only");
      const previewRendition = await addOnUISdk.app.document.createRenditions(
        { range: addOnUISdk.constants.Range.currentPage, format: addOnUISdk.constants.RenditionFormat.png },
        addOnUISdk.constants.RenditionIntent.preview
      );
      // ... show preview in UI only
    }
  } catch (error) {
    console.log("Failed to check export permissions:", error);
  }
}

// Set up UI based on export permissions
addOnUISdk.ready.then(async () => {
  const exportAllowed = await addOnUISdk.app.document.exportAllowed();

  // Note: The "document" in the next two lines refers to the UI of your add-on (in the HTML file) versus the addOnUISdk.app.document object from the API
  const downloadButton = document.getElementById('download-btn');
  const previewButton = document.getElementById('preview-btn');

  // Download button only available if export is allowed
  downloadButton.disabled = !exportAllowed;
  downloadButton.title = exportAllowed ? "Download rendition" : "Download restricted - document under review";

  // Preview button is always available
  previewButton.disabled = false;
});
```

### Errors

The table below describes the possible error messages that may occur when using the export methods, with a description of the scenario that will return them.

&nbsp;

|                                                      Error Message |                                                          Error Scenario |
| -----------------------------------------------------------------: | ----------------------------------------------------------------------: |
|                                  Invalid range: `${options.range}` |                                                 Range value is invalid. |
|                                          No active page available. |               Range is `Range.currentPage` and there is no active page. |
|                  Unsupported rendition format: `${options.format}` |                                        Rendition format is unsupported. |
|             Invalid background color: `${options.backgroundColor}` |                                            Background color is invalid. |
| Invalid quality parameter: `${options.quality} not in range [0,1]` |                                    Quality property is invalid in jpeg. |
|                           No video element in the specified range. |             No video is present in the range when trying to export mp4. |
|                               USER_NOT_ENTITLED_TO_PREMIUM_CONTENT | The user is trying to export premium content but is not entitled to it. |
