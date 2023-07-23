# Editor APIs
The editor APIs provide access to the user's document, allowing you to read the document structure and properties and make changes to the document via authoring methods.

## Overview
Some examples of what you can do with the editor APIs are creating shapes, adding pages to the document, clearing the artboard and more. For example, the following code illustrates how to use the editor APIs to access the document, create a rectangle with a fill, and add it to the current document:

```js
import { editor } from "express";

artboardNode = editor.documentRoot.currentContext;

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translateX = 10;
rectangle.translateY = 20;

const rectFill = editor.createColorFill({ red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() });            
rectangle.fills.append(rectFill);

artboardNode.children.append(rectangle);
```

Check out the [full set of API documentation](https://developer-stage.adobe.com/express-add-on-apis/docs/api/classes/Editor) as well as the [editor-apis](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis) and [image-and-page](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page) code samples provided in the [script runtime samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples) for more details on using the editor APIs.




