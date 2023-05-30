"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[1956],{21069:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return m},default:function(){return u}});var t=a(87462),o=a(63366),r=(a(15007),a(64983)),d=a(91515),l=["components"],m={},i=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",n)}},s=i("CodeBlock"),p=i("InlineAlert"),c={_frontmatter:m},g=d.Z;function u(e){var n=e.components,a=(0,o.Z)(e,l);return(0,r.mdx)(g,(0,t.Z)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"drag-and-drop"},"Drag and Drop"),(0,r.mdx)("p",null,"The interfaces and methods outlined here support the add-on Drag and Drop functionality. See the example code for how to implement it in your own add-on."),(0,r.mdx)(s,{slots:"heading, code",repeat:"2",languages:"JavaScript",mdxType:"CodeBlock"}),(0,r.mdx)("h3",{id:"interface"},"Interface"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'interface DragCompletionData {\n  /**\n   * Blob (image/video) to be added to the document\n   */\n  blob: Blob;\n}\n\n/**\n * Callback to provide the preview image\n * @returns URL or DataURL\n **/\ntype DragPreviewCallback = (element: HTMLElement) => URL;\n\n/**\n * Callback to provide the content (image/video) to be added to the document\n **/\ntype DragCompletionCallback = (\n  element: HTMLElement\n) => Promise<DragCompletionData[]>;\n\ninterface DragCallbacks {\n  /**\n   * Callback to provide the preview image\n   */\n  previewCallback: DragPreviewCallback;\n\n  /**\n   * Callback to provide the content to be added to the document\n   */\n  completionCallback: DragCompletionCallback;\n}\n\ninterface Application {\n  /**\n   * Enable drag to document functionality for an element\n   */\n  enableDragToDocument(\n    element: HTMLElement,\n    dragCallbacks: DragCallbacks\n  ): void;\n}\n\n/**\n * "dragstart" event is triggered when the user starts dragging an item for which drag behavior is enabled\n *\n * "dragend" event is triggered when the drag operation ends\n */\n\ninterface DragStartEventData {\n  /**\n   * Element for which the drag event started\n   */\n  element: HTMLElement;\n}\n\ninterface DragEndEventData {\n  /**\n   * Drop occurred/Drag ended at invalid position\n   */\n  dropCancelled: boolean;\n\n  /**\n   * Element for which the drag event ended\n   */\n  element: HTMLElement;\n}\n')),(0,r.mdx)("h3",{id:"example"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\n// Enable drag support for an element\nfunction makeDraggableUsingUrl(elementId: string, previewUrl: string) {\n  const image = document.getElementById(elementId);\n\n  const dragCallbacks = {\n    previewCallback: (image: HTMLElement) => {\n      return new URL(previewUrl);\n    },\n    completionCallback: async (image: HTMLElement) => {\n      const imageBlob = await fetch(image.src).then((response) =>\n        response.blob()\n      );\n      return [{ blob: imageBlob }];\n    },\n  };\n\n  try {\n    AddOnSdk.app.enableDragToDocument(image, dragCallbacks);\n  } catch (error) {\n    console.log("Failed to enable DragToDocument:", error);\n  }\n}\n\nAddOnSdk.app.on("dragstart", (eventData: DragStartEventData) => {\n  console.log("The drag event has started for", eventData.element);\n});\n\nAddOnSdk.app.on("dragend", (eventData: DragEndEventData) => {\n  if (!eventData.dropCancelled) {\n    console.log("The drag event has ended for", eventData.element);\n  } else {\n    console.log("The drag event was cancelled for", eventData.element);\n  }\n});\n')),(0,r.mdx)(p,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Please note, the maximum dimension of an object dropped on to the canvas in Express is 8000x8000. "),(0,r.mdx)(p,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Many of the samples we've included in the ",(0,r.mdx)("a",{parentName:"p",href:"guides/develop/samples"},"code samples")," implement the Drag and Drop APIs, so please use them as a reference. This includes the the ",(0,r.mdx)("strong",{parentName:"p"},"import-images-from-local"),", ",(0,r.mdx)("strong",{parentName:"p"},"import-images-using-oauth"),", ",(0,r.mdx)("strong",{parentName:"p"},"giphy")," and ",(0,r.mdx)("strong",{parentName:"p"},"qrcode")," samples."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-references-apis-dnd-md-04a8866656828e086ac3.js.map