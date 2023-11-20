"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[3693],{70878:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return r},default:function(){return u}});var a=n(87462),s=n(45987),o=(n(15007),n(64983)),i=n(91515);const d=["components"],r={},p=(c="InlineAlert",function(e){return console.warn("Component "+c+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.mdx)("div",e)});var c;const m={_frontmatter:r},l=i.Z;function u(e){let{components:t}=e,n=(0,s.Z)(e,d);return(0,o.mdx)(l,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"document-sandbox"},"Document Sandbox"),(0,o.mdx)("p",null,"The document sandbox is a sandboxed JavaScript execution environment, which allows to execute add-on's JavaScript code securely and synchronously in another JavaScript environment e.g., browser."),(0,o.mdx)(p,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,"The document sandbox references are currently ",(0,o.mdx)("strong",{parentName:"p"},"experimental only"),", so you will need to set ",(0,o.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag to ",(0,o.mdx)("inlineCode",{parentName:"p"},"true")," in the ",(0,o.mdx)("a",{parentName:"p",href:"../manifest/index.md#requirements"},(0,o.mdx)("inlineCode",{parentName:"a"},"requirements"))," section of the ",(0,o.mdx)("inlineCode",{parentName:"p"},"manifest.json")," to use them. ",(0,o.mdx)("em",{parentName:"p"},"Please do not use these APIs in any add-ons you plan to distribute or submit with updates until they have been deemed stable."),"  Also, please be aware that you should only test these experimental APIs against non-essential documents, as they could be lost or corrupted."),(0,o.mdx)("h2",{id:"overview"},"Overview"),(0,o.mdx)("p",null,"The document sandbox exposes three categories of APIs, which each have their own specific references and are outlined below."),(0,o.mdx)("h3",{id:"communication-apis"},"Communication APIs"),(0,o.mdx)("p",null,"The ",(0,o.mdx)("a",{parentName:"p",href:"./communication/index.md"},"communication APIs")," allow you to communicate between the document sandbox and the iframe runtime where your add-on is running via exposed APIs."),(0,o.mdx)("h3",{id:"web-apis"},"Web APIs"),(0,o.mdx)("p",null,"The document sandbox does NOT provide a full fledged browser’s JavaScript execution environment. Most of the browsers APIs/Global Objects are not available. For these, the developers can use iframe runtime environment and ",(0,o.mdx)("a",{parentName:"p",href:"./communication/index.md#expose-apis-from-the-ui"},"communicate")," the result back to the script running inside script runtime environment. Some of the commonly used ",(0,o.mdx)("a",{parentName:"p",href:"./web/index.md"},"Web APIs")," (with limited scope) have been provided inside script runtime environment."),(0,o.mdx)("h3",{id:"document-apis"},"Document APIs"),(0,o.mdx)("p",null,"The ",(0,o.mdx)("a",{parentName:"p",href:"./editor/"},"document APIs")," provide access to the user's document structure and properties, and allow you to make changes and author content to the Adobe Express document via the provided APIs."),(0,o.mdx)(p,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,"Please see the ",(0,o.mdx)("a",{parentName:"p",href:"../../guides/tutorials/"},"tutorials section")," to learn more about using the document sandbox and Adobe Express Document APIs."),(0,o.mdx)("h2",{id:"document-sandboxs-javascript-engine"},"Document Sandbox's JavaScript Engine"),(0,o.mdx)("p",null,"The document sandbox is a sandboxed JavaScript execution environment, which allows to execute add-on's JavaScript code securely and synchronously in another JavaScript environment e.g., browser."),(0,o.mdx)("p",null,"Some key concepts to note about the document sandbox include:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"Limited access to browser APIs (see the ",(0,o.mdx)("a",{parentName:"li",href:"./web/index.md"},"Web APIs")," reference). Note however, you can use the ",(0,o.mdx)("a",{parentName:"li",href:"./communication/index.md"},"communication APIs")," to expose browser APIs (ie: ",(0,o.mdx)("inlineCode",{parentName:"li"},"fetch"),") from the iframe environment to be used in the document sandbox."),(0,o.mdx)("li",{parentName:"ul"},"Runs in a slower execution environment."),(0,o.mdx)("li",{parentName:"ul"},"Provides no debugging capabilities other than those provided by the ",(0,o.mdx)("a",{parentName:"li",href:"./web/index.md#console-object"},"injected ",(0,o.mdx)("inlineCode",{parentName:"a"},"console")," functions"),"."),(0,o.mdx)("li",{parentName:"ul"},"Runs in the same context/thread as the host's application business logic, thus providing access to interact with it via the injected APIs.")),(0,o.mdx)("h2",{id:"getting-started-with-the-apis"},"Getting Started with the APIs"),(0,o.mdx)("p",null,"The methods defined in the ",(0,o.mdx)("a",{parentName:"p",href:"./communication/"},"communication API reference")," are used to expose and use the API proxies between the iframe and script environments of your add-on. Start with the ",(0,o.mdx)("a",{parentName:"p",href:"./communication/"},"communication reference")," to learn more about how to expose APIs and use them from either environment."),(0,o.mdx)("h3",{id:"script-entry-point"},"Script entry point"),(0,o.mdx)("p",null,"To use the document sandbox APIs in your add-on, start by defining a new ",(0,o.mdx)("inlineCode",{parentName:"p"},"script")," entry point in your ",(0,o.mdx)("inlineCode",{parentName:"p"},"manifest.json")," file with the value set to the name of the file containing the JavaScript code you're using with the document sandbox APIs:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'    "entryPoints": [\n        {\n            "type": "panel",\n            "id": "panel1",\n            "main": "index.html",\n            "script": "code.js" \n        }\n    ]\n')),(0,o.mdx)("p",null,"The JavaScript code in the file referenced can then access any of the injected global objects and module APIs defined in all of the APIs outlined in this set of references (",(0,o.mdx)("a",{parentName:"p",href:"./communication/"},"communication APIs"),", ",(0,o.mdx)("a",{parentName:"p",href:"./web/"},"Web APIs")," and ",(0,o.mdx)("a",{parentName:"p",href:"./editor/"},"document APIs"),")."),(0,o.mdx)("h3",{id:"cli-generated-script-runtime-add-on"},"CLI Generated Script Runtime Add-on"),(0,o.mdx)("p",null,"The quickest way to get started with a scaffolded project set up with the script runtime (aka: document sandbox) bindings for you is via the CLI. When creating a new add-on, the CLI will prompt you to choose from the ",(0,o.mdx)("a",{parentName:"p",href:"../../guides/getting_started/dev_tooling.md#templates"},"base templates"),", then ask if you want to include the script runtime:"),(0,o.mdx)("p",null,(0,o.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,o.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"19.0625%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,o.mdx)("picture",{parentName:"span"},"\n          ",(0,o.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/5530d/cli-script-prompt.webp 320w","/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/0c8fb/cli-script-prompt.webp 640w","/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/94b1e/cli-script-prompt.webp 1280w","/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/61637/cli-script-prompt.webp 1708w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,o.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/dd4a7/cli-script-prompt.png 320w","/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/0f09e/cli-script-prompt.png 640w","/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/bbbf7/cli-script-prompt.png 1280w","/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/9c796/cli-script-prompt.png 1708w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,o.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/4835f315bf710b6eb48efb0c96c2383c/bbbf7/cli-script-prompt.png",alt:"CLI prompt for script runtime",title:"CLI prompt for script runtime",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,o.mdx)("p",null,"Choose ",(0,o.mdx)("inlineCode",{parentName:"p"},"Yes")," at the prompt to include the document sandbox setup in your generated project. The project structure that's generated will differ depending on which base template you chose, but the two important additions to note, are the existence of a ",(0,o.mdx)("inlineCode",{parentName:"p"},"script")," entry point in your ",(0,o.mdx)("inlineCode",{parentName:"p"},"manifest.json"),", and the ",(0,o.mdx)("inlineCode",{parentName:"p"},"code.js")," file it references."),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'"entryPoints": [\n        {\n            "type": "panel",\n            "id": "panel1",\n            "main": "index.html",\n            "script": "code.js" \n        }\n    ]\n')),(0,o.mdx)(p,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,"Since these APIs are still experimental, choosing to include the script runtime when creating an add-on with the CLI also automatically includes the ",(0,o.mdx)("inlineCode",{parentName:"p"},'"experimentalApis": true')," in the ",(0,o.mdx)("inlineCode",{parentName:"p"},"manifest.json"),"."),(0,o.mdx)("p",null,"The screenshot below shows what the default script-based add-on generated from the CLI looks like when running:"),(0,o.mdx)("p",null,(0,o.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,o.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"51.87500000000001%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,o.mdx)("picture",{parentName:"span"},"\n          ",(0,o.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/5530d/script-add-on-sample.webp 320w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/0c8fb/script-add-on-sample.webp 640w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/94b1e/script-add-on-sample.webp 1280w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/0b34d/script-add-on-sample.webp 1920w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/d5269/script-add-on-sample.webp 2560w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/d309b/script-add-on-sample.webp 2948w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,o.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/dd4a7/script-add-on-sample.png 320w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/0f09e/script-add-on-sample.png 640w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/bbbf7/script-add-on-sample.png 1280w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/ac7a9/script-add-on-sample.png 1920w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/c7a69/script-add-on-sample.png 2560w","/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/07c6b/script-add-on-sample.png 2948w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,o.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/b88ca34faffb50c8c0b15a8fcaea86cc/bbbf7/script-add-on-sample.png",alt:"script add-on sample screenshot",title:"script add-on sample screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,o.mdx)(p,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,"Please refer to the ",(0,o.mdx)("a",{parentName:"p",href:"../../guides/getting_started/dev_tooling.md#using-the-cli"},"Using the CLI")," section to get more information on how to use the CLI and create new add-on."),(0,o.mdx)("br",null),(0,o.mdx)("h2",{id:"code-samples"},"Code Samples"),(0,o.mdx)("p",null,"The following ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples"},"code samples")," have also been provided to help you get started using these new script runtime APIs."),(0,o.mdx)("h3",{id:"communication-iframe-script-runtime-sample"},(0,o.mdx)("a",{parentName:"h3",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/communication-iframe-script-runtime"},"communication-iframe-script-runtime sample")),(0,o.mdx)("p",null,"Demonstrates the use of the communication APIs to expose and proxy APIs bidirectionally between the iframe and script runtime environments. Also includes demonstrating how to use some of the ",(0,o.mdx)("a",{parentName:"p",href:"./web/"},"Web APIs")," such as ",(0,o.mdx)("inlineCode",{parentName:"p"},"setTimeout()")," and ",(0,o.mdx)("inlineCode",{parentName:"p"},"console.log()"),"."),(0,o.mdx)("h3",{id:"editor-apis-sample"},(0,o.mdx)("a",{parentName:"h3",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/editor-apis"},"editor-apis sample")),(0,o.mdx)("p",null,"Demonstrates how to use the ",(0,o.mdx)("a",{parentName:"p",href:"./editor/"},"document APIs")," to create various shapes and add them to the document."),(0,o.mdx)("h3",{id:"image-and-page-sample"},(0,o.mdx)("a",{parentName:"h3",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/script-runtime-samples/image-and-page"},"image-and-page sample")),(0,o.mdx)("p",null,"A more comprehensive example of using the ",(0,o.mdx)("a",{parentName:"p",href:"./editor/"},"document APIs")," to add a page, images and shapes, as well as clear the artboard."),(0,o.mdx)("h2",{id:"debugging-script-based-add-ons"},"Debugging script based add-ons"),(0,o.mdx)("p",null,"Debugging with breakpoints from the document sandbox (via ",(0,o.mdx)("inlineCode",{parentName:"p"},"code.js"),") is currently not supported and for the time-being, only console logging (via ",(0,o.mdx)("inlineCode",{parentName:"p"},"console.log()"),") can be used. However, support for debugging by applying breakpoints in the code will be available in the near future. Please refer to ",(0,o.mdx)("a",{parentName:"p",href:"./editor/index.md#example-code-snippet"},"Example Code Snippet"),", where a ",(0,o.mdx)("inlineCode",{parentName:"p"},"rectangle")," object is printed to console for debugging purpose."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-authoring-index-md-0cf640d39aa887930044.js.map