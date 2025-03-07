"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[8557],{69177:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return s},default:function(){return u}});var d=a(58168),n=a(80045),l=(a(88763),a(15680)),r=a(83407);const o=["components"],s={},m=(i="InlineAlert",function(e){return console.warn("Component "+i+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.mdx)("div",e)});var i;const p={_frontmatter:s},c=r.A;function u(e){let{components:t}=e,a=(0,n.A)(e,o);return(0,l.mdx)(c,(0,d.A)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,l.mdx)("h1",{id:"add-on-ui-sdk-reference"},"Add-on UI SDK Reference"),(0,l.mdx)("h2",{id:"overview"},"Overview"),(0,l.mdx)("p",null,"This reference is provided to outline the interfaces, methods, properties and events that support the ",(0,l.mdx)("a",{parentName:"p",href:"#features-supported-by-the-sdk"},"add-on UI SDK features"),". It begins with an introduction to the core ",(0,l.mdx)("inlineCode",{parentName:"p"},"addOnUiSdk")," module, which provides access to all of the interfaces available to use in the iframe where your add-on is running. Import this module to use it for accessing all of the API's that allow you to implement features like those outlined in the next section."),(0,l.mdx)("h2",{id:"features-supported-by-the-sdk"},"Features Supported by the SDK"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/use_images.md"},"Importing Content")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/create_renditions.md"},"Exporting Content")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/group_elements.md"},"Accessing Content")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/drag_and_drop.md"},"Drag & Drop Behavior")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/oauth2.md"},"Authorization with OAuth 2.0")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/local_data_management.md"},"Client-side Storage Access")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/modal_dialogs.md"},"Modal Dialogs")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/theme_locale.md#detecting-locale-supported-locales-and-format"},"Locale Detection")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"../../guides/develop/how_to/theme_locale.md#detecting-theme"},"Theme Detection")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/references/addonsdk/instance-manifest.md"},"Access to the Manifest")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/references/addonsdk/app-document.md"},"Access to the Document information"))),(0,l.mdx)(m,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,"See the ",(0,l.mdx)("a",{parentName:"p",href:"../../guides/develop/"},"implementing common use cases page")," for details and examples of how to add the features above."),(0,l.mdx)(m,{slots:"header, text1, text2, text3, text4",variant:"success",mdxType:"InlineAlert"}),(0,l.mdx)("h1",{id:"sdk-vs-api"},"SDK vs API"),(0,l.mdx)("p",null,"The distinction between an SDK and an API can be a bit blurry and can depend on the specific context. However, here's a general overview of the differences between an SDK and an API:"),(0,l.mdx)("p",null,(0,l.mdx)("strong",{parentName:"p"},"SDK")," (Software Development Kit) - a collection of software development tools and libraries that developers can use to create applications for a specific platform or system. An SDK typically includes an API, documentation, code samples, and other resources that developers need to build applications."),(0,l.mdx)("p",null,(0,l.mdx)("strong",{parentName:"p"},"API")," (Application Programming Interface) - a set of rules and protocols that developers can use to interact with a platform."),(0,l.mdx)("p",null,"In general, an SDK provides a more complete set of tools and resources for developers than an API alone. An SDK may include an API, but it also includes other tools and resources that can help developers build applications more easily. However, the terms SDK and API are often used interchangeably, and the specific definitions can vary depending on the context."),(0,l.mdx)("p",null,(0,l.mdx)("strong",{parentName:"p"},"Note:")," an ",(0,l.mdx)("inlineCode",{parentName:"p"},"interface")," can also be considered an ",(0,l.mdx)("inlineCode",{parentName:"p"},"object")," in terms of this reference. You can traverse the ",(0,l.mdx)("inlineCode",{parentName:"p"},"addOnUISdk")," interfaces/objects (ie: ",(0,l.mdx)("inlineCode",{parentName:"p"},"app"),",",(0,l.mdx)("inlineCode",{parentName:"p"},"instance"),") etc in the left navigation to learn more."),(0,l.mdx)("h2",{id:"importing-the-addonuisdk-for-use"},"Importing the addOnUISdk for Use"),(0,l.mdx)("p",null,"The add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an ",(0,l.mdx)("inlineCode",{parentName:"p"},"import")," statement in either an HTML ",(0,l.mdx)("inlineCode",{parentName:"p"},"<script>")," tag or in the list of ",(0,l.mdx)("inlineCode",{parentName:"p"},"import")," statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since ",(0,l.mdx)("strong",{parentName:"p"},"it will already be imported for you"),", and the location it was placed will depend on the ",(0,l.mdx)("inlineCode",{parentName:"p"},"template")," you chose. The following sections show how it's imported into different file types for reference."),(0,l.mdx)("h4",{id:"import-into-html-file"},"Import into HTML file"),(0,l.mdx)("p",null,"To use the SDK from an HTML file, simply include a link to it in a ",(0,l.mdx)("inlineCode",{parentName:"p"},"<script>")," tag with the ",(0,l.mdx)("inlineCode",{parentName:"p"},"type=module")," attribute on it to ensure everything is initialized properly."),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-js"},'<body>\n    Hello World!\n    <script type="module">\n        import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n        addOnUISdk.ready.then(async () => {\n            console.log("addOnUISdk is ready for use.");\n        });\n    <\/script>\n</body>\n')),(0,l.mdx)(m,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,(0,l.mdx)("strong",{parentName:"p"},"TIP:")," Placing your ",(0,l.mdx)("inlineCode",{parentName:"p"},"<script>")," tag just before the closing ",(0,l.mdx)("inlineCode",{parentName:"p"},"<body>")," tag helps reduce the page loading time."),(0,l.mdx)("h4",{id:"import-into-javascripttypescript-file"},"Import into JavaScript/TypeScript file"),(0,l.mdx)("p",null,"The SDK can be referenced in ",(0,l.mdx)("inlineCode",{parentName:"p"},".js/.jsx/.ts/.tsx")," source files by adding it to the list of imports as a default module reference, such as in the following:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n')),(0,l.mdx)("p",null,(0,l.mdx)("strong",{parentName:"p"},"Note:")," if you created your add-on project with the CLI based on the ",(0,l.mdx)("inlineCode",{parentName:"p"},"typescript")," or ",(0,l.mdx)("inlineCode",{parentName:"p"},"typescript-react")," templates, you will automatically get a types definition file named ",(0,l.mdx)("inlineCode",{parentName:"p"},"add-on-ui-sdk.d.ts")," generated in your project ",(0,l.mdx)("inlineCode",{parentName:"p"},"src")," for you. This file contains the following exports, and allows you to take advantage of type checking and auto-completion features while developing with the Add-on SDK in your IDE."),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-ts"},'declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {\n  export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";\n  export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";\n}\n')),(0,l.mdx)("p",null,"See the ",(0,l.mdx)("a",{parentName:"p",href:"../../guides/develop/frameworks-libraries-bundling.md#typescript-definitions"},"typescript definitions section")," in the developer guides as well for more details."),(0,l.mdx)("h2",{id:"addonuisdk-properties"},"addOnUISdk Properties"),(0,l.mdx)("p",null,"The following properties can be accessed from the ",(0,l.mdx)("inlineCode",{parentName:"p"},"addOnUISdk")," object after it has been imported.",(0,l.mdx)("br",null),(0,l.mdx)("br",null)),(0,l.mdx)("table",{columnWidths:"20,30,15,35",className:"spectrum-Table spectrum-Table--sizeM",css:" background-color:lavender; tbody { background-color:white; }"},(0,l.mdx)("tr",{className:"spectrum-Table-row"},(0,l.mdx)("td",{className:"spectrum-Table-headCell"},(0,l.mdx)("p",null,(0,l.mdx)("strong",null,"Attribute"))),(0,l.mdx)("td",{className:"spectrum-Table-headCell"},(0,l.mdx)("p",null,(0,l.mdx)("strong",null,"Name"))),(0,l.mdx)("td",{className:"spectrum-Table-headCell"},(0,l.mdx)("p",null,(0,l.mdx)("strong",null,"Type"))),(0,l.mdx)("td",{className:"spectrum-Table-headCell"},(0,l.mdx)("p",null,(0,l.mdx)("strong",null,"Description")))),(0,l.mdx)("tbody",{className:"spectrum-Table-body"},(0,l.mdx)("tr",{className:"spectrum-Table-row"},(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"readonly"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"addOnUISdk.app"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"object"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,"Provides access to the host application (Adobe Express)"))),(0,l.mdx)("tr",{className:"spectrum-Table-row"},(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"readonly"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"addOnUISdk.instance"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"object"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,"The currently running add-on instance."))),(0,l.mdx)("tr",{className:"spectrum-Table-row"},(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"readonly"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"addOnUISdk.ready"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"Promise"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,"Indicates the addOnUISdk object has been initialized and you can start accessing the APIs. Register a call back with ",(0,l.mdx)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then"},"Promise.then")," or ",(0,l.mdx)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await"},"await this promise"),"."))),(0,l.mdx)("tr",{className:"spectrum-Table-row"},(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"addOnUISdk.constants"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"object"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,"A set of constants used throughout the add-on SDK."))),(0,l.mdx)("tr",{className:"spectrum-Table-row"},(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"readonly"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"addOnUISdk.apiVersion"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,(0,l.mdx)("pre",null,"string"))),(0,l.mdx)("td",{className:"spectrum-Table-cell"},(0,l.mdx)("p",null,"The current version of the add-on SDK running."))))),(0,l.mdx)("h2",{id:"addonuisdk-errors"},"addOnUISdk Errors"),(0,l.mdx)("p",null,"The table below describes the possible error messages that may occur when using the core ",(0,l.mdx)("inlineCode",{parentName:"p"},"addOnUISdk")," object, with a description of the scenario that will return them."),(0,l.mdx)("br",null),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:"right"},"Error Message"),(0,l.mdx)("th",{parentName:"tr",align:"right"},"Error Scenario"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:"right"},"Invalid ",(0,l.mdx)("inlineCode",{parentName:"td"},"${propertyName}")," property. SDK is not fully initialized."),(0,l.mdx)("td",{parentName:"tr",align:"right"},"When an add-on tries to use the SDK before it is fully initialized.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:"right"},"Failed to initialize Addon SDK. Unsupported API version: ",(0,l.mdx)("inlineCode",{parentName:"td"},"${apiVersion}")),(0,l.mdx)("td",{parentName:"tr",align:"right"},"API version is unsupported.")))))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-addonsdk-index-md-a8c8963b481f211f4558.js.map