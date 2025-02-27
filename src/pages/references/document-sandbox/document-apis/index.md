---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Add-on Manifest
title: Document APIs
description: An introduction to the Document APIs available in the document sandbox.
contributors:
  - https://github.com/hollyschinsky  
hideBreadcrumbNav: true
---

# Document APIs

The [Document APIs](./classes/Editor.md) provide access to the user's document, allowing you to access the document structure and properties, and apply changes to it via the provided APIs.

## Overview

Some examples of what you can do with the [Adobe Express Document APIs](./classes/Editor.md) are creating shapes, adding pages to the document, clearing the artboard and more. See the following sections for more details and examples of using these new APIs.

## Access to Express Document APIs

An exported `editor` module is provided to enable access to the [Document APIs](./classes/Editor.md). You can simply import this module into your script file code to access the methods provided below. For example:

```js
import { editor } from "express-document-sdk"; // named import 'editor' from express-document-sdk module
```

See the example below for further usage details.

## Example Code Snippet

The following code snippet illustrates how to use the [Express Document APIs](./classes/Editor.md) from the document sandbox code running in your `code.js` for instance, to access the current document, create a rectangle, set some properties and a fill for the rectangle, and finally, add it to the document:

```js
import { editor, colorUtils } from "express-document-sdk";

const insertionParent = editor.context.insertionParent; // get node to insert content into

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translation = { x: 100, y: 20 };
console.log(rectangle); // for debugging purpose

const [red, green, blue, alpha] = [0.8, 0.6, 0.2, 0.7];
// Note: alpha param is optional
const aColor = colorUtils.fromRGB(red,green,blue,alpha)
const rectangleFill = editor.makeColorFill(aColor);
rectangle.fill = rectangleFill;

insertionParent.children.append(rectangle);
```

## Tutorials, References & Code Samples

Please see [this extensive tutorial](../../../guides/tutorials/grids-addon.md) provided to help you build your first add-on using the Document APIs in our [tutorials section](../../../guides/tutorials/). Also be sure to check out the [full set of API documentation](/express-add-on-apis/docs/api/classes/Editor) as well as the [editor-apis](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/editor-apis) and [image-and-page](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/image-and-page) code samples provided in the [document sandbox samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) for more details on using the [Document APIs](./classes/Editor.md).
