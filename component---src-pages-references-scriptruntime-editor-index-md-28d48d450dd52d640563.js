"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[8725],{21463:function(e,a,s){s.r(a),s.d(a,{_frontmatter:function(){return p},default:function(){return x}});var d,t=s(87462),r=s(63366),o=(s(15007),s(64983)),n=s(91515),i=["components"],p={},l=(d="InlineAlert",function(e){return console.warn("Component "+d+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.mdx)("div",e)}),m={_frontmatter:p},c=n.Z;function x(e){var a=e.components,s=(0,r.Z)(e,i);return(0,o.mdx)(c,(0,t.Z)({},m,s,{components:a,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"editor-apis"},"Editor APIs"),(0,o.mdx)("p",null,"The Editor APIs provide access to the user's document, allowing you to access the document structure and properties and apply changes to it via authoring methods."),(0,o.mdx)("h2",{id:"overview"},"Overview"),(0,o.mdx)("p",null,"Some examples of what you can do with the ",(0,o.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor"},"Editor APIs")," are creating shapes, adding pages to the document, clearing the artboard and more. See the following sections for more details and examples of using these new APIs. "),(0,o.mdx)(l,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,"These APIs are currently ",(0,o.mdx)("strong",{parentName:"p"},"experimental only"),". Please do not use them in any add-ons you plan to distribute or submit with updates until they have been deemed stable."),(0,o.mdx)("h3",{id:"methods"},"Methods"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#addTemporalArtboardContainerWithArtboard"},"addTemporalArtboardContainerWithArtboard")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createArtboard"},"createArtboard")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createBitmapImage"},"createBitmapImage")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createColorFill"},"createColorFill")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createEllipse"},"createEllipse")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createGroup"},"createGroup")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createImageContainer"},"createImageContainer")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createLine"},"createLine")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createRectangle"},"createRectangle")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createStroke"},"createStroke")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#createText"},"createText")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#getNodeForEntity"},"getNodeForEntity")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#getNodesForEntities"},"getNodesForEntities")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor/#loadBitmapImage"},"loadBitmapImage"))),(0,o.mdx)("h2",{id:"example"},"Example"),(0,o.mdx)("p",null,"The following code illustrates how to use the ",(0,o.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor"},"Editor APIs")," to access the document, create a rectangle, set some properties and a fill, and add it to the current document:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-js"},'import { editor } from "express";\n\nartboardNode = editor.documentRoot.currentContext; // access the current document\n\nconst rectangle = editor.createRectangle();\nrectangle.width = 200;\nrectangle.height = 150;\nrectangle.translateX = 10;\nrectangle.translateY = 20;\n\nconst rectFill = editor.createColorFill({ red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() });            \nrectangle.fills.append(rectFill);\n\nartboardNode.children.append(rectangle);\n')),(0,o.mdx)("h2",{id:"references--code-samples"},"References & Code Samples"),(0,o.mdx)("p",null,"Check out the ",(0,o.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor"},"full set of API documentation")," as well as the ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis"},"editor-apis")," and ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page"},"image-and-page")," code samples provided in the ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples"},"script runtime samples")," for more details on using the editor APIs."),(0,o.mdx)("a",{href:"/express-add-on-apis/docs/api/classes/Editor/",target:"_blank"},"l"))}x.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-scriptruntime-editor-index-md-28d48d450dd52d640563.js.map