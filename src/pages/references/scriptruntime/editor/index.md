# Editor APIs

The [Editor APIs](./classes/Editor.md) provide access to the user's document, allowing you to access the document structure and properties, and apply changes to it via the provided APIs.

<InlineAlert slots="text" variant="warning"/>

These API's are currently **experimental only**. Please do not use them in any add-ons you plan to distribute or submit with updates until they have been deemed stable.

## Overview

Some examples of what you can do with the [Editor APIs](./classes/Editor.md) are creating shapes, adding pages to the document, clearing the artboard and more. See the following sections for more details and examples of using these new APIs.

## Access to Editor APIs

An exported `editor` module is provided to enable access to the [Editor APIs](./classes/Editor.md). You can simply import this module into your script file code to access the methods provided below. For example:

```js
import { editor } from "express"; // named import 'editor' from express module
```

See the example below for further usage details.

## Example Code Snippet

The following code snippet illustrates how to use the [Editor APIs](./classes/Editor.md) from the script running in your `code.js` for instance, to access the current document, create a rectangle, set some properties and a fill for the rectangle, and finally, add it to the document:

```js
import { editor, utils } from "express";

const insertionParent = editor.context.insertionParent; // get node to insert content into

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translateX = 100;
rectangle.translateY = 20;
console.log(rectangle); // for debugging purpose

const [red, green, blue, alpha] = [0.8, 0.6, 0.2, 0.7];
const rectangleFill = editor.createColorFill(utils.createColor(red, green, blue, alpha));            
rectangle.fills.append(rectangleFill);

insertionParent.children.append(rectangle);
```

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** While using the Editor APIs in experimental mode, there is a **risk that your document could become corrupt or unopenable**. In particular, you can expect this to happen if you are using any grids or vector shapes (with the exception of simple circles/rectangles) while testing with these APIs. Please do not test these APIs with the use of any documents you deem important. 

## References & Code Samples

Check out the [full set of API documentation](/express-add-on-apis/docs/api/classes/Editor) as well as the [editor-apis](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis) and [image-and-page](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page) code samples provided in the [script runtime samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples) for more details on using the [Editor APIs](./classes/Editor.md).

<InlineAlert slots="text" variant="warning"/>

During this experimental phase, be sure to only use documented APIs when writing your add-ons. Use of undocumented APIs (which may be prefixed with an underscore, but not always) is not supported and may cause your add-on to fail or lead to document corruption. Also, we recommend you ***only test the use of these experimental APIs against non-essential documents***, due to the potential for loss or corruption. 
