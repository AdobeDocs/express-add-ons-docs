# Code Samples
Find inspiration and great reference examples by checking out our [code samples](https://github.com/AdobeDocs/express-add-on-samples) repo. A description of each and which APIs and technologies they use is available here for reference.


## [get-started](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/get-started)
Demonstrates how to get started with add-on development with a simple app that greets a user after a name is entered.

**Technologies Used:** <br/>

- HTML
- JavaScript
- CSS

**Note:** No specific Add-on SDK APIs are used in this sample, it is meant to run a simple JavaScript app that can be loaded and run in the add-ons panel.

## [import-images-from-local](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-from-local)
Demonstrates how to use the Add-on SDK's Import and Drag and Drop APIs to add images over click and drag and drop to a document.

**Technologies Used:** <br/>

- JavaScript
- CSS

**APIs Leveraged:**<br/>

- [Import API](../../references/index.md#import) to add the image to the document when the gif is clicked.
- [Drag and Drop APIs](../../references/index.md#drag-and-drop) to support dragging and dropping images to the document.

## [import-images-using-oauth](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-using-oauth)
Demonstrates how to use the Add-on SDK's OAuth API to allow its users to connect their Dropbox account (in addition to leveraging some others listed below). 

**Technologies Used:** <br/>

- React
- React Spectrum
- CSS
- Webpack

**APIs Leveraged:**<br/>

- [OAuth API's](../../references/index.md#authorize-using-oauth-20) to authorize the user with the Dropbox service.
- [Import API](../../references/index.md#import) to add images from the add-on to the document.
- [Drag and Drop APIs](../../references/index.md#drag-and-drop) to support dragging and dropping images to the document.
- [Client Storage API](.../../references/index.md#client-storage) to store the access_token in the IndexedDB store of the browser and reusing the same for the requests made to the Dropbox APIs.


## [use-client-storage](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/use-client-storage)
Demonstrates how to use the Client Storage API to persist user generated data through a todo list.

**Technologies Used:** <br/>

- TypeScript
- CSS
- Webpack

**APIs Leveraged:**<br/>

- [Client Storage API](../../references/index.md#client-storage) to persist the todo items.

## [export-sample](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/export-sample)
Demonstrates how to use the Add-on SDK's Export APIs to export content in various formats including jpeg, png, pdf and mp4.

**Technologies Used:** <br/>

- JavaScript
- Spectrum Web Components
- Webpack

**APIs Leveraged:**<br/>

- [Export API](.../../references/index.md#export) to generate renditions.
- [Import API](../../references/index.md#import) to add the image to the document when the gif is clicked.

## [dialog-add-on](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/dialog-add-on)
Demonstrates how to use the Modal Dialog APIs to pop-up variations of modals from your add-ons

**Technologies Used:** <br/>

- React
- React Spectrum
- Webpack

**APIs Leveraged:**<br/>

- [Dialogs API](../../references/index.md#simple-modal-dialogs) to pop-up a variation of a modal reflecting the selections made from the add-ons panel UI.


<!-- # Contributed Add-on Samples
The following samples were contributed from the team. -->

## [pix](https://github.com/AdobeDocs/express-add-on-samples/tree/main/contributed/pix)
A react-based add-on that illustrates a very simple 16x16 pixel editor add-on. Users can drag the resulting pixel art on to the canvas, but they can also import the current page as pixel art (downsampled to 16x16).

**Technologies Used:** <br/>

- HTML Canvas
- React
- Spectrum Web Components
- Webpack

**APIs Leveraged:**<br/>

- [Drag and Drop APIs](../../references/index.md#drag-and-drop) to add the dragged image to the document.
- [Export API](../../references/index.md#export-new) to generate renditions.
- [Client Storage API](../../references/index.md#client-storage) to store the pixel art creations.

## [swc](https://github.com/AdobeDocs/express-add-on-samples/tree/main/contributed/swc)
Simple sample which illustrates how to use **Spectrum Web Components** without React or any other framework.

**Technologies Used:** <br/>

- HTML
- CSS
- JavaScript
- Spectrum Web Components
- Webpack

**APIs Leveraged:**<br/>

- [Application UI Theme](../../references/index.md#application-ui-theme) to set the theme (only once the SDK is loaded to prevent any flash of unstyled content) and to listen and respond to theme changes.

<!-- # Marketplace Add-on Samples
The following samples were built to show how to use specific some popular 3rd party services. -->

## [Dropbox](https://github.com/AdobeDocs/express-add-on-samples/tree/main/marketplace/dropbox)
Allows users to connect to their Dropbox account. Once connected, they can fetch their images and videos from their account and add them to their Express pages.

**Technologies Used:** <br/>

- React
- React Spectrum
- Webpack

**APIs Leveraged:**<br/>

- [OAuth API's](../../references/index.md#authorize-using-oauth-20) to authorize the user with the Dropbox service.
- [Drag and Drop APIs](../../references/index.md#drag-and-drop) to support dragging and dropping images to the document.
- [Import API](../../references/index.md#import) to add the image to the document when the gif is clicked.

## [Giphy](https://github.com/AdobeDocs/express-add-on-samples/tree/main/marketplace/giphy)
Allows users to search for popular gifs and add them to the document.

**Technologies Used:** <br/>

- JavaScript 
- Spectrum Web Components

**APIs Leveraged:**<br/>

- [Drag and Drop APIs](../../references/index.md#drag-and-drop) to support dragging and dropping images to the document.
- [Import API](../../references/index.md#import) to add the image to the document when the gif is clicked.

## [QR Code](https://github.com/AdobeDocs/express-add-on-samples/tree/main/marketplace/qrcode)
Allows users to search for popular gifs and add them to their Express pages.

**Technologies Used:** <br/>

- JavaScript 
- Spectrum Web Components

**APIs Leveraged:**<br/>

- [Import API](.../../references/index.md#import) to add the image to the document when the gif is clicked.
- [Drag and Drop APIs](../../references/index.md#drag-and-drop) to support dragging and dropping images to the document.

<InlineAlert slots="text" variant="warning"/>

**NOTE:** Before you run any samples, you must have run the `npx @adobe-ccwebext/create-ccweb-add-on` command at least once.

## Resources
- Typescript Typings