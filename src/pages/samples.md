---
keywords:
  - Adobe Express
  - Express add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Add-on Manifest
title: Guides
description: This is the code samples page
contributors:
  - https://github.com/hollyschinsky
---

# Code Samples
Find inspiration and great reference examples by checking out our [code samples](https://github.com/AdobeDocs/express-add-on-samples) repo. A description of each sample and which features and technologies they use is available here for reference.

<InlineAlert slots="text" variant="info"/>

In addition to these code samples, you should also be sure to check out the [Templates section](./guides/getting_started/dev_tooling/#templates) in the **Development Tools** page for the options available for creating a starter project based on your favorite development stack. 

## Using the samples
- Clone [the repo](https://github.com/AdobeDocs/express-add-on-samples) (or download the zip).
- `cd` into the folder of a sample you want to try.
- Run `npm install` to install the dependencies.
- Run `npm run build` to build the source.
- Run `npm run start` to start to start the server with your bundled sample
- Navigate to Adobe Express and load and use the locally running sample add-on with the add-on panel developer tools just as you would with your own.

**NOTE:** Before you run any samples, you must have previously run the `npx @adobe/create-ccweb-add-on` command to create your own add-on at least once to ensure the package is available and ready to use.


## [get-started](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/get-started)
Demonstrates how to get started with add-on development with a simple app that greets a user after a name is entered.

**Technologies Used:** <br/>

- HTML
- JavaScript
- CSS

**Note:** No specific add-on SDK features are used in this sample, it is meant to run a simple JavaScript app that can be loaded and run in the add-ons panel.

## [import-images-from-local](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-from-local)
Demonstrates how to use the add-on SDK's Import and Drag and Drop APIs to add images over click and drag and drop to a document.

**Technologies Used:** <br/>

- JavaScript
- CSS

**Features Leveraged:**<br/>

- [Import Content](./references/addonsdk/app-document.md) to add the image to the document when the gif is clicked.
- [Drag and Drop](./references/addonsdk/addonsdk-app/#enabledragtodocument) to support dragging and dropping images to the document.

## [import-images-using-oauth](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-using-oauth)
Demonstrates how to use the add-on SDK's OAuth API to allow its users to connect their Dropbox account (in addition to leveraging some others listed below). 

**Technologies Used:** <br/>

- React
- React Spectrum
- CSS
- Webpack

**Features Leveraged:**<br/>

- [OAuth API's](./references/addonsdk/app-oauth/) to authorize the user with the Dropbox service.
- [Import Content](./references/addonsdk/app-document) to add images from the add-on to the document.
- [Drag and Drop](./references/addonsdk/addonsdk-app/#enabledragtodocument) to support dragging and dropping images to the document.
- [Client Storage](./references/addonsdk/instance-clientStorage/) to store the access_token in the IndexedDB store of the browser and reusing the same for the requests made to the Dropbox APIs.


## [use-client-storage](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/use-client-storage)
Demonstrates how to use the Client Storage API to persist user generated data through a todo list.

**Technologies Used:** <br/>

- TypeScript
- CSS
- Webpack

**Features Leveraged:**<br/>

- [Client Storage](./references/addonsdk/instance-clientStorage/) to persist the todo items.

## [export-sample](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/export-sample)
Demonstrates how to use the add-on SDK's to export renditions of content in various formats including jpeg, png, pdf and mp4.

**Technologies Used:** <br/>

- JavaScript
- Spectrum Web Components
- Webpack

**Features Leveraged:**<br/>

- [Export Content](./references/addonsdk/app-document) to generate renditions.
- [Import Content](./references/addonsdk/app-document) to add the image to the document when the gif is clicked.

## [dialog-add-on](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/dialog-add-on)
Demonstrates how to use the Modal Dialog APIs to pop-up variations of modals from your add-ons

**Technologies Used:** <br/>

- React
- React Spectrum
- Webpack

**Features Leveraged:**<br/>

- [Modal Dialogs](./references/addonsdk-app/#showmodaldialog) to pop-up a variation of a modal reflecting the selections made from the add-ons panel UI.


<!-- # Contributed Add-on Samples
The following samples were contributed from the team. -->

## [pix](https://github.com/AdobeDocs/express-add-on-samples/tree/main/contributed/pix)
A react-based add-on that illustrates a very simple 16x16 pixel editor add-on. Users can drag the resulting pixel art on to the canvas, but they can also import the current page as pixel art (downsampled to 16x16).

**Technologies Used:** <br/>

- HTML Canvas
- React
- Spectrum Web Components
- Webpack

**Features Leveraged:**<br/>

- [Drag and Drop](./references/addonsdk/addonsdk-app/#enabledragtodocument) to add the dragged image to the document.
- [Export Content](./references/addonsdk/app-document) to generate renditions.
- [Client Storage](./references/addonsdk/instance-clientStorage/) to store the pixel art creations.

## [swc](https://github.com/AdobeDocs/express-add-on-samples/tree/main/contributed/swc)
Simple sample which illustrates how to use **Spectrum Web Components** without React or any other framework.

**Technologies Used:** <br/>

- HTML
- CSS
- JavaScript
- Spectrum Web Components
- Webpack

**Features Leveraged:**<br/>

- [Application UI Theme](./references/addonsdk/app-ui/) to set the theme (only once the SDK is loaded to prevent any flash of unstyled content) and to listen and respond to theme changes.

<!-- # Marketplace Add-on Samples
The following samples were built to show how to use specific some popular 3rd party services. -->

## [Dropbox](https://github.com/AdobeDocs/express-add-on-samples/tree/main/marketplace/dropbox)
Allows users to connect to their Dropbox account. Once connected, they can fetch their images and videos from their account and add them to their Express pages.

**Technologies Used:** <br/>

- React
- React Spectrum
- Webpack

**Features Leveraged:**<br/>

- [OAuth API's](./references/addonsdk/app-oauth/) to authorize the user with the Dropbox service.
- [Drag and Drop](./references/addonsdk/addonsdk-app/#enabledragtodocument) to support dragging and dropping images to the document.
- [Import Content](./references/addonsdk/app-document.md) to add the image to the document when the gif is clicked.

## [Giphy](https://github.com/AdobeDocs/express-add-on-samples/tree/main/marketplace/giphy)
Allows users to search for popular gifs and add them to the document.

**Technologies Used:** <br/>

- JavaScript 
- Spectrum Web Components

**Features Leveraged:**<br/>

- [Drag and Drop](./references/addonsdk/addonsdk-app/#enabledragtodocument) to support dragging and dropping images to the document.
- [Import Content](./references/addonsdk/app-document.md) to add the image to the document when the gif is clicked.

## [QR Code](https://github.com/AdobeDocs/express-add-on-samples/tree/main/marketplace/qrcode)
Allows users to search for popular gifs and add them to their Express pages.

**Technologies Used:** <br/>

- JavaScript 
- Spectrum Web Components

**Features Leveraged:**<br/>

- [Import Content](./references/addonsdk/app-document.md) to add the image to the document when the gif is clicked.
- [Drag and Drop](./references/addonsdk/addonsdk-app/#enabledragtodocument) to support dragging and dropping images to the document.
