"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[8725],{21463:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return l},default:function(){return u}});var o,a=n(87462),r=n(63366),s=(n(15007),n(64983)),d=n(91515),i=["components"],l={},p=(o="InlineAlert",function(e){return console.warn("Component "+o+" was not imported, exported, or provided by MDXProvider as global scope"),(0,s.mdx)("div",e)}),m={_frontmatter:l},c=d.Z;function u(e){var t=e.components,n=(0,r.Z)(e,i);return(0,s.mdx)(c,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,s.mdx)("h1",{id:"editor-apis"},"Editor APIs"),(0,s.mdx)("p",null,"The Editor APIs provide access to the user's document, allowing you to access the document structure and properties, and apply changes to it via the provided APIs."),(0,s.mdx)(p,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,s.mdx)("p",null,"The script runtime is not currently available to developers. The documentation on this page for informational purposes only. Some of the links below will not resolve until the APIs are released."),(0,s.mdx)(p,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,s.mdx)("p",null,"These API's are currently ",(0,s.mdx)("strong",{parentName:"p"},"experimental only"),". Please do not use them in any add-ons you plan to distribute or submit with updates until they have been deemed stable."),(0,s.mdx)("h2",{id:"overview"},"Overview"),(0,s.mdx)("p",null,"Some examples of what you can do with the ",(0,s.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor"},"Editor APIs")," are creating shapes, adding pages to the document, clearing the artboard and more. See the following sections for more details and examples of using these new APIs. "),(0,s.mdx)("h2",{id:"access-to-editor-apis"},"Access to Editor APIs"),(0,s.mdx)("p",null,"An exported ",(0,s.mdx)("inlineCode",{parentName:"p"},"editor")," module is provided to enable access to the Editor APIs. You can simply import this module into your script file code to access the methods provided below. For example:"),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-js"},"import { editor } from \"express\"; // named import 'editor' from express module\n")),(0,s.mdx)("p",null,"See the ",(0,s.mdx)("a",{parentName:"p",href:"#example"},"example below")," for further usage details."),(0,s.mdx)("h2",{id:"example-code-snippet"},"Example Code Snippet"),(0,s.mdx)("p",null,"The following code snippet illustrates how to use the ",(0,s.mdx)("a",{href:"/express-add-on-apis/docs/api/classes/Editor/",target:"_blank"},"Editor APIs")," from the script running in your ",(0,s.mdx)("inlineCode",{parentName:"p"},"code.js")," for instance, to access the current document, create a rectangle, set some properties and a fill for the rectangle, and finally, add it to the document:"),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-js"},'import { editor, utils } from "express";\n\nconst insertionParent = editor.context.insertionParent; // get node to insert content into\n\nconst rectangle = editor.createRectangle();\nrectangle.width = 200;\nrectangle.height = 150;\nrectangle.translateX = 100;\nrectangle.translateY = 20;\nconsole.log(rectangle); // for debugging purpose\n\nconst [red, green, blue, alpha] = [0.8, 0.6, 0.2, 0.7];\nconst rectangleFill = editor.createColorFill(utils.createColor(red, green, blue, alpha));            \nrectangle.fills.append(rectangleFill);\n\ninsertionParent.children.append(rectangle);\n')),(0,s.mdx)("h2",{id:"references--code-samples"},"References & Code Samples"),(0,s.mdx)("p",null,"Check out the ",(0,s.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/express-add-on-apis/docs/api/classes/Editor"},"full set of API documentation")," as well as the ",(0,s.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis"},"editor-apis")," and ",(0,s.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page"},"image-and-page")," code samples provided in the ",(0,s.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples"},"script runtime samples")," for more details on using the editor APIs."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-scriptruntime-editor-index-md-f43bf9069269fffc4b2a.js.map