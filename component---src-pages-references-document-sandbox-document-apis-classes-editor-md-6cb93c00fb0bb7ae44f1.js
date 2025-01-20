"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[714],{13364:function(e,a,n){n.r(a),n.d(a,{_frontmatter:function(){return o},default:function(){return s}});var t=n(58168),d=n(80045),i=(n(88763),n(15680)),r=n(83407);const m=["components"],o={},l={_frontmatter:o},p=r.A;function s(e){let{components:a}=e,n=(0,d.A)(e,m);return(0,i.mdx)(p,(0,t.A)({},l,n,{components:a,mdxType:"MDXLayout"}),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"../overview.md"},"@express-document-sdk")," / Editor"),(0,i.mdx)("h1",{id:"class-editor"},"Class: Editor"),(0,i.mdx)("p",null,"Entry point for APIs that read or modify the document's content."),(0,i.mdx)("h2",{id:"accessors"},"Accessors"),(0,i.mdx)("h3",{id:"context"},"context"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,i.mdx)("strong",{parentName:"p"},"context"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"Context.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"Context"))),(0,i.mdx)("p",null,"User's current selection context"),(0,i.mdx)("h4",{id:"returns"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"Context.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"Context"))),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"documentroot"},"documentRoot"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,i.mdx)("strong",{parentName:"p"},"documentRoot"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"ExpressRootNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"ExpressRootNode"))),(0,i.mdx)("h4",{id:"returns-1"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"ExpressRootNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"ExpressRootNode"))),(0,i.mdx)("p",null,"the root of the document."),(0,i.mdx)("h2",{id:"methods"},"Methods"),(0,i.mdx)("h3",{id:"createellipse"},"createEllipse()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createEllipse"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"EllipseNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"EllipseNode"))),(0,i.mdx)("h4",{id:"returns-2"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"EllipseNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"EllipseNode"))),(0,i.mdx)("p",null,"an ellipse node with default x/y radii, a black fill, and no initial stroke.\nTransform values default to 0."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"creategroup"},"createGroup()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createGroup"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"GroupNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"GroupNode"))),(0,i.mdx)("h4",{id:"returns-3"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"GroupNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"GroupNode"))),(0,i.mdx)("p",null,"a group node."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"createimagecontainer"},"createImageContainer()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createImageContainer"),"(",(0,i.mdx)("inlineCode",{parentName:"p"},"bitmapData"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"options"),"): ",(0,i.mdx)("a",{parentName:"p",href:"MediaContainerNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"MediaContainerNode"))),(0,i.mdx)("p",null,'Creates a bitmap image, represented as a multi-node MediaContainerNode structure. Always creates a "full-frame,"\nuncropped image initially, but cropping can be changed after it is created by modifying the properties of the\ncontainer\'s mediaRectangle and maskShape children.'),(0,i.mdx)("p",null,"Image creation involves some asynchronous steps. The image will be visible in this client almost instantly, but will\nrender as a gray placeholder on other clients until it has been uploaded to DCX and then downloaded by those clients.\nThis local client will act as having unsaved changes until the upload has finished."),(0,i.mdx)("h4",{id:"parameters"},"Parameters"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"bitmapData"),": ",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/BitmapImage.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"BitmapImage"))),(0,i.mdx)("p",null,"BitmapImage resource (e.g. returned from ",(0,i.mdx)("a",{parentName:"p",href:"Editor.md#loadbitmapimage"},"loadBitmapImage"),")."),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"options"),"= ",(0,i.mdx)("inlineCode",{parentName:"p"},"{}")),(0,i.mdx)("p",null,"Additional configuration: - initialSize - Size the image is displayed at. Must have the same aspect ratio as bitmapData. Defaults to the\nsize the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down\nif needed to stay below an application-defined size cap)."),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"options.initialSize?"),": ",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/RectangleGeometry.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"RectangleGeometry"))),(0,i.mdx)("h4",{id:"returns-4"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"MediaContainerNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"MediaContainerNode"))),(0,i.mdx)("p",null,"MediaContainerNode representing the top container node of the multi-node structure."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"createline"},"createLine()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createLine"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"LineNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"LineNode"))),(0,i.mdx)("h4",{id:"returns-5"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"LineNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"LineNode"))),(0,i.mdx)("p",null,"a line node with default start point and end point and a default stroke.\nTransform values default to 0."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"createpath"},"createPath()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createPath"),"(",(0,i.mdx)("inlineCode",{parentName:"p"},"path"),"): ",(0,i.mdx)("a",{parentName:"p",href:"PathNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"PathNode"))),(0,i.mdx)("h4",{id:"parameters-1"},"Parameters"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"path"),": ",(0,i.mdx)("inlineCode",{parentName:"p"},"string")),(0,i.mdx)("p",null,"a string representing any ",(0,i.mdx)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths"},"SVG path element"),".\nNote that the path data will be normalized, and therefore the ",(0,i.mdx)("inlineCode",{parentName:"p"},"path"),' getter may return a different SVG string from the path creation input.\nFor example, "M 10 80 Q 52.5 10, 95 80 T 180 80" becomes "M 10 80 C 38.33 33.33 66.67 33.33 95 80...".\nThrows if the input is empty or is not legal SVG path syntax.'),(0,i.mdx)("h4",{id:"returns-6"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"PathNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"PathNode"))),(0,i.mdx)("p",null,"a path node with a default stroke and no initial fill."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"createrectangle"},"createRectangle()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createRectangle"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"RectangleNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"RectangleNode"))),(0,i.mdx)("h4",{id:"returns-7"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"RectangleNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"RectangleNode"))),(0,i.mdx)("p",null,"a rectangle node with default width and height, a black fill, and no initial stroke.\nTransform values default to 0."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"createtext"},"createText()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"createText"),"(): ",(0,i.mdx)("a",{parentName:"p",href:"TextNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"TextNode"))),(0,i.mdx)("h4",{id:"returns-8"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"TextNode.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"TextNode"))),(0,i.mdx)("p",null,"a text node with default styles. The text content is initially empty, so the text node will be\ninvisible until its ",(0,i.mdx)("inlineCode",{parentName:"p"},"fullContent")," property's ",(0,i.mdx)("inlineCode",{parentName:"p"},"text")," is set. Creates point text, so the node's width will automatically\nadjust to accommodate whatever text is set."),(0,i.mdx)("p",null,"Note: the registration point of this text node is not guaranteed to be at the top-left of the bounding box of its\ninsertion parent. Recommend using ",(0,i.mdx)("inlineCode",{parentName:"p"},"setPositionInParent")," over ",(0,i.mdx)("inlineCode",{parentName:"p"},"translation")," to set the position."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"loadbitmapimage"},"loadBitmapImage()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"loadBitmapImage"),"(",(0,i.mdx)("inlineCode",{parentName:"p"},"bitmapData"),"): ",(0,i.mdx)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/BitmapImage.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"BitmapImage")),">"),(0,i.mdx)("p",null,"Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to ",(0,i.mdx)("a",{parentName:"p",href:"Editor.md#createimagecontainer"},"createImageContainer"),"\nto create a MediaContainerNode. The same BitmapImage can be used to create multiple MediaContainerNodes."),(0,i.mdx)("p",null,"Because the resulting BitmapImage is returned asynchronously, to use it you must schedule an edit lambda to run at a\nsafe later time in order to call ",(0,i.mdx)("a",{parentName:"p",href:"Editor.md#createimagecontainer"},"createImageContainer"),". See ",(0,i.mdx)("a",{parentName:"p",href:"Editor.md#queueasyncedit"},"queueAsyncEdit"),"."),(0,i.mdx)("p",null,"Further async steps to upload image resource data may continue in the background after this call's Promise resolves,\nbut the resulting BitmapImage can be used right away (via the queue API noted above). The local client will act as\nhaving unsaved changes until all the upload steps have finished."),(0,i.mdx)("h4",{id:"parameters-2"},"Parameters"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"bitmapData"),": ",(0,i.mdx)("inlineCode",{parentName:"p"},"Blob")),(0,i.mdx)("p",null,"Encoded image data in PNG or JPEG format."),(0,i.mdx)("h4",{id:"returns-9"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/BitmapImage.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"BitmapImage")),">"),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"makecolorfill"},"makeColorFill()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"makeColorFill"),"(",(0,i.mdx)("inlineCode",{parentName:"p"},"color"),"): ",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/ColorFill.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"ColorFill"))),(0,i.mdx)("p",null,"Convenience helper to create a complete ColorFill value given just its color."),(0,i.mdx)("h4",{id:"parameters-3"},"Parameters"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"color"),": ",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/Color.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"Color"))),(0,i.mdx)("p",null,"The color to use for the fill."),(0,i.mdx)("h4",{id:"returns-10"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"../interfaces/ColorFill.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"ColorFill"))),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"makestroke"},"makeStroke()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"makeStroke"),"(",(0,i.mdx)("inlineCode",{parentName:"p"},"options"),"?): ",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/SolidColorStroke.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"SolidColorStroke"))),(0,i.mdx)("p",null,"Convenience helper to create a complete SolidColorStroke value given just a\nsubset of its fields. All other fields are populated with default values."),(0,i.mdx)("p",null,"See ",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/SolidColorStroke.md"},"SolidColorStroke")," for more details on the ",(0,i.mdx)("inlineCode",{parentName:"p"},"options")," fields. Defaults:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"color")," has default value DEFAULT_STROKE_COLOR if none is provided."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"width")," has default value DEFAULT_STROKE_WIDTH if none is provided."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"position")," has default value ",(0,i.mdx)("inlineCode",{parentName:"li"},"center")," if none is provided."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"dashPattern")," has default value [] if none is provided."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"dashOffset")," has default value 0 if none is provided. This field is ignored\nif no ",(0,i.mdx)("inlineCode",{parentName:"li"},"dashPattern")," was provided."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"type")," has default value SolidColorStroke.type if none is provided. This field\nshouldn't be set to any other value.")),(0,i.mdx)("h4",{id:"parameters-4"},"Parameters"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"options?"),": ",(0,i.mdx)("inlineCode",{parentName:"p"},"Partial"),"<",(0,i.mdx)("a",{parentName:"p",href:"../interfaces/SolidColorStroke.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"SolidColorStroke")),">"),(0,i.mdx)("h4",{id:"returns-11"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"../interfaces/SolidColorStroke.md"},(0,i.mdx)("inlineCode",{parentName:"a"},"SolidColorStroke"))),(0,i.mdx)("p",null,"a stroke configured with the given options."),(0,i.mdx)("hr",null),(0,i.mdx)("h3",{id:"queueasyncedit"},"queueAsyncEdit()"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"queueAsyncEdit"),"(",(0,i.mdx)("inlineCode",{parentName:"p"},"lambda"),"): ",(0,i.mdx)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.mdx)("inlineCode",{parentName:"p"},"void"),">"),(0,i.mdx)("p",null,"Enqueues a function to be run at a later time when edits to the user's document may be performed. You can always edit\nthe document immediately when invoked in response to your add-on's UI code. However, if you delay to await an\nasynchronous operation such as ",(0,i.mdx)("a",{parentName:"p",href:"Editor.md#loadbitmapimage"},"loadBitmapImage"),", any edits following this pause must be scheduled using\nqueueAsyncEdit(). This ensures the edit is properly tracked for saving and undo."),(0,i.mdx)("p",null,"The delay before your edit function is executed is typically just a few milliseconds, so it will appear instantaneous\nto users. However, note that queueAsyncEdit() will return ",(0,i.mdx)("em",{parentName:"p"},"before")," your function has been run.\nIf you need to trigger any code after the edit has been performed, either include this in the lambda you are enqueuing\nor await the Promise returned by queueAsyncEdit()."),(0,i.mdx)("p",null,"Generally, calling any setter or method is treated as an edit; but simple getters may be safely called at any time."),(0,i.mdx)("p",null,"Example of typical usage:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-js"},"// Assume insertImage() is called from your UI code, and given a Blob containing image data\nasync function insertImage(blob) {\n    // This function was invoked from the UI iframe, so we can make any edits we want synchronously here.\n    // Initially load the bitmap - an async operation\n    const bitmapImage = await editor.loadBitmapImage(blob);\n\n    // Execution doesn't arrive at this line until an async delay, due to the Promise 'await' above\n\n    // Further edits need to be queued to run at a safe time\n    editor.queueAsyncEdit(() => {\n         // Create scenenode to display the image, and add it to the current artboard\n         const mediaContainer = editor.createImageContainer(bitmapImage);\n         editor.context.insertionParent.children.append(mediaContainer);\n    });\n}\n")),(0,i.mdx)("h4",{id:"parameters-5"},"Parameters"),(0,i.mdx)("p",null,"• ",(0,i.mdx)("strong",{parentName:"p"},"lambda")),(0,i.mdx)("p",null,"a function which edits the document model."),(0,i.mdx)("h4",{id:"returns-12"},"Returns"),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.mdx)("inlineCode",{parentName:"p"},"void"),">"),(0,i.mdx)("p",null,"a Promise that resolves when the lambda has finished running, or rejects if the lambda throws an error."))}s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-document-sandbox-document-apis-classes-editor-md-6cb93c00fb0bb7ae44f1.js.map