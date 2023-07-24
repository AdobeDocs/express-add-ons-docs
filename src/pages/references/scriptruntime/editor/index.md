# Editor APIs
The editor APIs provide access to the user's document, allowing you to read the document structure and properties and make changes to the document via authoring methods.

## Overview
Some examples of what you can do with the [Editor APIs](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor) are creating shapes, adding pages to the document, clearing the artboard and more. 

## Methods
- [addTemporalArtboardContainerWithArtboard](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#addTemporalArtboardContainerWithArtboard)
- [createArtboard](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createArtboard)
- [createBitmapImage](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createBitmapImage)
- [createColorFill](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createColorFill)
- [createEllipse](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createEllipse)
- [createGroup](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createGroup)
- [createImageContainer](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createImageContainer)
- [createLine](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createLine)
- [createRectangle](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createRectangle)
- [createStroke](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createStroke)
- [createText](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#createText)
- [getNodeForEntity](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#getNodeForEntity)
- [getNodesForEntities](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#getNodesForEntities)
- [loadBitmapImage](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor/#loadBitmapImage)

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


[t](../../../../express-add-on-apis/docs/api/classes/Editor/)
[t2](../../../express-add-on-apis/docs/api/classes/Editor/)
[t](/express-add-on-apis/docs/api/classes/Editor/)

