# Editor APIs
The Editor APIs provide access to the user's document, allowing you to access the document structure and properties, and apply changes to it via authoring methods.

<InlineAlert slots="text" variant="warning"/>

These API's are currently **experimental only**. Please do not use them in any add-ons you plan to distribute or submit with updates until they have been deemed stable.

## Overview
Some examples of what you can do with the [Editor APIs](/express-add-on-apis/docs/api/classes/Editor) are creating shapes, adding pages to the document, clearing the artboard and more. See the following sections for more details and examples of using these new APIs. 

## Access to Editor APIs
An exported `editor` module is provided to enable access to the Editor APIs. You can simply import this module into your script file code to access the methods provided below. For example:

```js
import { editor } from "express"; // named import 'editor' from express module
```

See the [example below](#example) for further usage details.

## Methods
- <a href="/express-add-on-apis/docs/api/classes/Editor/#addTemporalArtboardContainerWithArtboard" target="_blank">addTemporalArtboardContainerWithArtboard</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createArtboard" target="_blank">createArtboard</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createBitmapImage" target="_blank">createBitmapImage</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createColorFill" target="_blank">createColorFill</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createEllipse" target="_blank">createEllipse</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createGroup" target="_blank">createGroup</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createImageContainer" target="_blank">createImageContainer</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createLine" target="_blank">createLine</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createRectangle" target="_blank">createRectangle</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createStroke" target="_blank">createStroke</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#createText" target="_blank">createText</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#getNodeForEntity" target="_blank">getNodeForEntity</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#getNodesForEntities" target="_blank">getNodesForEntities</a>
- <a href="/express-add-on-apis/docs/api/classes/Editor/#loadBitmapImage" target="_blank">loadBitmapImage</a>

## Example Code Snippet
The following code snippet illustrates how to use the <a href="/express-add-on-apis/docs/api/classes/Editor/" target="_blank">Editor APIs</a> from the script running in your `code.js` for instance, to access the current document, create a rectangle, set some properties and a fill for the rectangle, and finally, add it to the document:

```js
import { editor } from "express";

artboardNode = editor.documentRoot.currentContext; // access the current document

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translateX = 10;
rectangle.translateY = 20;
console.log(rectangle); // for debugging purpose

const rectFill = editor.createColorFill({ red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() });            
rectangle.fills.append(rectFill);

artboardNode.children.append(rectangle);
```

## References & Code Samples
Check out the [full set of API documentation](/express-add-on-apis/docs/api/classes/Editor) as well as the [editor-apis](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis) and [image-and-page](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page) code samples provided in the [script runtime samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples) for more details on using the editor APIs.


