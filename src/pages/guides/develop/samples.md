# Code Samples

You can also find inspiration and great reference examples by checking out the [code samples](https://github.com/AdobeDocs/express-add-on-samples) repo. The code samples include a set of basic examples that show how to use the APIs in the Add-on SDK, as well as more advanced examples included in the marketplace samples. A quick list of them follows, but please see the README in each for more details.

## Base Samples

### Get Started
Demonstrates how to get started with Add-on development with a simple app that greets a user after they enter their name.

**Technologies Used:** <br/>

- HTML
- JavaScript
- CSS

**Note:** No specific Add-on SDK APIs are used in this sample, it is meant to run a simple JavaScript app that can be loaded and run in the add-ons panel.

### Import images from local
Demonstrates how to use the Add-on SDK's Import and Drag and Drop APIs to add images over click and drag and drop to a document.

**Technologies Used:** <br/>

- JavaScript
- CSS

**APIs Leveraged:**<br/>

- [Import API](../3-WritingCode/api-reference.md#import) to add the image to the document when the gif is clicked.
- [Drag and Drop APIs](../3-WritingCode/api-reference.md#drag-and-drop) to support dragging and dropping images to the document.

### Import images using OAuth
Demonstrates how to use the Add-on SDK's OAuth API to allow its users to connect their Dropbox account (in addition to leveraging some others listed below). 

**Technologies Used:** <br/>

- React
- React Spectrum
- CSS
- Webpack

**APIs Leveraged:**<br/>

- [OAuth API's](../3-WritingCode/api-reference.md#authorize-using-oauth-20) to authorize the user with the Dropbox service.
- [Import API](../3-WritingCode/api-reference.md#import) to add images from the add-on to the document.
- [Drag and Drop APIs](../3-WritingCode/api-reference.md#drag-and-drop) to support dragging and dropping images to the document.
- [Client Storage API](../3-WritingCode/api-reference.md#client-storage) to store the access_token in the IndexedDB store of the browser and reusing the same for the requests made to the Dropbox APIs.


### Use client storage
Demonstrates how to use the Client Storage API to persist user generated data through a todo list.

**Technologies Used:** <br/>

- TypeScript
- CSS
- Webpack

**APIs Leveraged:**<br/>

- [Client Storage API](../3-WritingCode/api-reference.md#client-storage) to persist the todo items.

### Export sample
Demonstrates how to use the Add-on SDK's Export APIs to export content in various formats including jpeg, png, pdf and mp4.

**Technologies Used:** <br/>

- JavaScript
- Spectrum Web Components
- Webpack

**APIs Leveraged:**<br/>

- [Export API](../3-WritingCode/api-reference.md#export-new) to generate renditions.
- [Import API](../3-WritingCode/api-reference.md#import) to add the image to the document when the gif is clicked.

### Dialog add-on sample
Demonstrates how to use the Modal Dialog APIs to pop-up variations of modals from your add-ons

**Technologies Used:** <br/>

- React
- React Spectrum
- Webpack

**APIs Leveraged:**<br/>

- [Dialogs API](../3-WritingCode/api-reference.md#simple-modal-dialogs-new) to pop-up a variation of a modal reflecting the selections made from the add-ons panel UI.


## Marketplace Add-on Samples

### Dropbox 
Allows users to connect to their Dropbox account. Once connected, they can fetch their images and videos from their account and add them to their Express pages.

**Technologies Used:** <br/>

- React
- React Spectrum
- Webpack

**APIs Leveraged:**<br/>

- [OAuth API's](../3-WritingCode/api-reference.md#authorize-using-oauth-20) to authorize the user with the Dropbox service.
- [Drag and Drop APIs](../3-WritingCode/api-reference.md#drag-and-drop) to support dragging and dropping images to the document.
- [Import API](../3-WritingCode/api-reference.md#import) to add the image to the document when the gif is clicked.

### Giphy 
Allows users to search for popular gifs and add them to the document.

**Technologies Used:** <br/>

- JavaScript 
- Spectrum Web Components

**APIs Leveraged:**<br/>

- [Drag and Drop APIs](../3-WritingCode/api-reference.md#drag-and-drop) to support dragging and dropping images to the document.
- [Import API](../3-WritingCode/api-reference.md#import) to add the image to the document when the gif is clicked.

### QR Code
Allows users to search for popular gifs and add them to their Express pages.

**Technologies Used:** <br/>

- JavaScript 
- Spectrum Web Components

**APIs Leveraged:**<br/>

- [Import API](../3-WritingCode/api-reference.md#import) to add the image to the document when the gif is clicked.
- [Drag and Drop APIs](../3-WritingCode/api-reference.md#drag-and-drop) to support dragging and dropping images to the document.

## Contributed Add-on Samples
### Pix
A react-based add-on that illustrates a very simple 16x16 pixel editor add-on. Users can drag the resulting pixel art on to the canvas, but they can also import the current page as pixel art (downsampled to 16x16).

**Technologies Used:** <br/>

- HTML Canvas
- React
- Spectrum Web Components
- Webpack

**APIs Leveraged:**<br/>

- [Drag and Drop APIs](../3-WritingCode/api-reference.md#drag-and-drop) to add the dragged image to the document.
- [Export API](../3-WritingCode/api-reference.md#export-new) to generate renditions.
- [Client Storage API](../3-WritingCode/api-reference.md#client-storage) to store the pixel art creations.

### SWC
Simple sample which illustrates how to use Spectrum Web Components without React or any other framework.

**Technologies Used:** <br/>

- HTML
- CSS
- JavaScript
- Spectrum Web Components
- Webpack

**APIs Leveraged:**<br/>

- [Application UI Theme](../3-WritingCode/api-reference.md#application-ui-theme) to set the theme (only once the SDK is loaded to prevent any flash of unstyled content) and to listen and respond to theme changes.

CAUTION:
Before you run any samples, you must have run the `npx @adobe-ccwebext/create-ccweb-add-on` command at least once.