# Editor APIs
The editor APIs provide access to the user's document, allowing you to read the document structure and properties and make changes to the document via authoring methods.

## Overview
Some examples of what you can do with the [Editor APIs](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor) are creating shapes, adding pages to the document, clearing the artboard and more. 

## Methods
- [addTemporalArtboardContainerWithArtboard](Editor.md#addTemporalArtboardContainerWithArtboard)
- [createArtboard](../../express-add-on-apis/docs/api/classes/Editor/#createArtboard)
- [createBitmapImage](Editor.md#createBitmapImage)
- [createColorFill](Editor.md#createColorFill)
- [createEllipse](Editor.md#createEllipse)
- [createGroup](Editor.md#createGroup)
- [createImageContainer](Editor.md#createImageContainer)
- [createLine](Editor.md#createLine)
- [createRectangle](Editor.md#createRectangle)
- [createStroke](Editor.md#createStroke)
- [createText](Editor.md#createText)
- [getNodeForEntity](Editor.md#getNodeForEntity)
- [getNodesForEntities](Editor.md#getNodesForEntities)
- [loadBitmapImage](Editor.md#loadBitmapImage)

## Example
The following code illustrates how to use the [Editor APIs](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor) to access the document, create a rectangle with a fill, and add it to the current document:

```js
import { editor } from "express";

artboardNode = editor.documentRoot.currentContext; // access the current document

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translateX = 10;
rectangle.translateY = 20;

const rectFill = editor.createColorFill({ red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() });            
rectangle.fills.append(rectFill);

artboardNode.children.append(rectangle);
```
## References & Code Samples
Check out the [full set of API documentation](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor) as well as the [editor-apis](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis) and [image-and-page](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page) code samples provided in the [script runtime samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples) for more details on using the editor APIs.




