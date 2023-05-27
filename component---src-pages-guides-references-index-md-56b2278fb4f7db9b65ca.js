"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[7021],{20575:function(e,l,t){t.r(l),t.d(l,{_frontmatter:function(){return o},default:function(){return u}});var d,a=t(87462),n=t(63366),m=(t(15007),t(64983)),s=t(91515),r=["components"],o={},p=(d="InlineAlert",function(e){return console.warn("Component "+d+" was not imported, exported, or provided by MDXProvider as global scope"),(0,m.mdx)("div",e)}),i={_frontmatter:o},c=s.Z;function u(e){var l=e.components,t=(0,n.Z)(e,r);return(0,m.mdx)(c,(0,a.Z)({},i,t,{components:l,mdxType:"MDXLayout"}),(0,m.mdx)("h1",{id:"api-reference"},"API Reference"),(0,m.mdx)("h2",{id:"overview"},"Overview"),(0,m.mdx)("p",null,"This section covers the APIs available for developing your add-ons. It begins with an introduction to the main ",(0,m.mdx)("inlineCode",{parentName:"p"},"AddOnSdk")," core object reference, along with an overview of the properties and methods you will use in your add-on development. In the left expanded menu, you will find a list of the core add-on capabilities named by the functionality they provide. Within each of those sections are details about the interfaces and methods needed to make up that feature, along with example usage and output where relevant. "),(0,m.mdx)(p,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,m.mdx)("p",null,"Be sure to check out the ",(0,m.mdx)("a",{parentName:"p",href:"../develop/samples.md"},"code samples")," for a more in-depth example of how to use them as well as the ",(0,m.mdx)("a",{parentName:"p",href:"../develop/"},"recipes")," section for more details. "),(0,m.mdx)("h1",{id:"addonsdk"},(0,m.mdx)("a",{parentName:"h1",href:"#add-on-sdk-module-import"},"AddOnSdk")),(0,m.mdx)("br",null),(0,m.mdx)("br",null),(0,m.mdx)("table",{style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Reference"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"The core add-on SDK object. Provides access to the add-on development platform."))))),(0,m.mdx)("br",null),(0,m.mdx)("br",null),(0,m.mdx)("h2",{id:"add-on-sdk-module-import"},"Add-on SDK Module Import"),(0,m.mdx)("p",null,"The Add-on SDK is available as a hosted JavaScript module on the Adobe CDN. It's referenced with an ",(0,m.mdx)("inlineCode",{parentName:"p"},"import")," statement in either an HTML ",(0,m.mdx)("inlineCode",{parentName:"p"},"<script>")," tag or in the list of ",(0,m.mdx)("inlineCode",{parentName:"p"},"import")," statements in the JavaScript source. However, you don't need to worry about adding this reference if you used the CLI to create your add-on project, since it will already be imported for you, and the location it was placed will depend on the ",(0,m.mdx)("inlineCode",{parentName:"p"},"template")," you chose. "),(0,m.mdx)("p",null,"But for reference, below are some examples of how it can be imported for use."),(0,m.mdx)("h3",{id:"import-into-html-file"},"Import into HTML file"),(0,m.mdx)("p",null,"To use the SDK from an HTML file, simply include a link to it in a ",(0,m.mdx)("inlineCode",{parentName:"p"},"<script>")," tag with the ",(0,m.mdx)("inlineCode",{parentName:"p"},"type=module")," attribute on it to ensure everything is initialized properly. "),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-js"},'<body>\n        Hello World!\n\n        <script type="module">\n            import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\n            AddOnSdk.ready.then(async () => {\n                console.log("AddOnSdk is ready for use.");\n            });     \n        <\/script>\n    </body>\n')),(0,m.mdx)(p,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,m.mdx)("p",null,(0,m.mdx)("strong",{parentName:"p"},"TIP:")," Placing your ",(0,m.mdx)("inlineCode",{parentName:"p"},"<script>")," tag just before the closing ",(0,m.mdx)("inlineCode",{parentName:"p"},"<body>")," tag helps reduce the page loading time."),(0,m.mdx)("h3",{id:"import-into-javascript-file"},"Import into JavaScript file"),(0,m.mdx)("p",null,"If you want to reference the Add-on SDK in your ",(0,m.mdx)("inlineCode",{parentName:"p"},".js/.jsx")," source files, add it to the list of imports as a default module reference, such as in the following:"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n')),(0,m.mdx)("h3",{id:"import-into-typescript-file"},"Import into TypeScript file"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-js"},'// @ts-ignore Import module\nimport AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n')),(0,m.mdx)("p",null,(0,m.mdx)("strong",{parentName:"p"},"NOTE:")," If you create your add-on project with the CLI based on the ",(0,m.mdx)("inlineCode",{parentName:"p"},"typescript")," or ",(0,m.mdx)("inlineCode",{parentName:"p"},"typescript-react")," templates, you will automatically get the following type definition generated in your project for you:"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-ts"},'declare module "https://new.express.adobe.com/static/add-on-sdk/sdk.js" {\n    export * from "@adobe-ccwebext/ccweb-add-on-sdk-types";\n    export { default } from "@adobe-ccwebext/ccweb-add-on-sdk-types";\n}\n')),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-html"},'<body>\n    Hello World!\n\n    <script type="module">\n        import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\n        AddOnSdk.ready.then(async () => {\n            console.log("AddOnSdk is ready for use.");\n        });\n    <\/script>\n</body>\n')),(0,m.mdx)("h2",{id:"addonsdk-properties"},"AddOnSdk Properties"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Reference"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.apiVersion"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"string"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Current version of the add-on SDK running."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Provides access to the host application (Adobe Express). "))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.constants"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"A set of constants used throughout the add-on SDK."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.instance"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"The currently running add-on instance."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.ready"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"promise"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Indicates the AddOnSdk object has been initialized and you can start accessing the APIs."))))),(0,m.mdx)("h2",{id:"addonsdkapp-properties"},"AddOnSdk.app Properties"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Object"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.document"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Represents the active document of the host application."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.oauth"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.ui"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Represents the host UI (Adobe Express UI)."))))),(0,m.mdx)("h2",{id:"addonsdkappui-properties"},"AddOnSdk.app.ui Properties"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Object"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.ui.locale"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Retrieve the host application current locale."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.ui.locales"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"string []"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Retrieve the host application's supported languages."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.ui.theme"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"string"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Retrieve the current theme of the host application."))))),(0,m.mdx)("h2",{id:"addonsdkinstance-properties"},"AddOnSdk.instance Properties"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Object"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.instance.clientStorage"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Reference to the client storage of the add-on."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.instance.manifest"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Add-ons manifest details. Maps to entries in the add-ons ",(0,m.mdx)("pre",null,"manifest.json")," file."))))),(0,m.mdx)("h2",{id:"addonsdkconstants-properties"},"AddOnSdk.constants Properties"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Object"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"Range"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"object"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Rendition page range."))))),(0,m.mdx)("h2",{id:"methods"},"Methods"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Method"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Parameters"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.on()"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.on(type: string, handler: (data) => ",")"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Listen for an event."))),(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.off()"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"AddOnSdk.app.off(type: string, handler: (data) => ","):"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Stop listening for an event."))))),(0,m.mdx)("h2",{id:"addonsdk-events"},"AddOnSdk Events"),(0,m.mdx)("p",null,"The table below describes the events triggered from the add-on SDK. Use the ",(0,m.mdx)("inlineCode",{parentName:"p"},"AddOnSdk.app.on()")," method to listen to events, and the ",(0,m.mdx)("inlineCode",{parentName:"p"},"AddOnSdk.app.off()")," method to stop listening:"),(0,m.mdx)("table",{className:"spectrum-Table spectrum-Table--sizeM",style:{backgroundColor:"lightblue"}},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Object"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Type"))),(0,m.mdx)("td",{className:"spectrum-Table-headCell"},(0,m.mdx)("p",null,(0,m.mdx)("strong",null,"Description")))),(0,m.mdx)("tbody",{className:"spectrum-Table-body"},(0,m.mdx)("tr",{className:"spectrum-Table-row"},(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"localechange"))),(0,m.mdx)("td",{className:"spectrum-Table-cell"},(0,m.mdx)("p",null,(0,m.mdx)("pre",null,"string"))),(0,m.mdx)("td",{style:{verticalAlign:"bottom"}},(0,m.mdx)("p",null,"Triggered when there is a locale change at the host side."))))),(0,m.mdx)("h2",{id:"events"},"Events"),(0,m.mdx)("ul",null,(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"AddOnSdk.app.on.localechange")," - Triggered when there is a locale change at the host side."),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"AddOnSdk.app.on.themechange")," - Triggered when there is a theme change at the host side."),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"AddOnSdk.app.on.dragstart")," - triggered when the user starts dragging an item for which drag behavior is enabled."),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"AddOnSdk.app.on.dragend")," - triggered when the drag operation ends.")),(0,m.mdx)("h2",{id:"addonsdkconstants"},"AddOnSDK.constants"),(0,m.mdx)("ul",null,(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"Range")," - Rendition page range"),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"currentPage")," - Generate rendition for the current page"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"entireDocument")," - Generate rendition for all the pages"))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"RenditionFormat")," - Required output format of the rendition"),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"png"),' = "image/png" - PNG format'),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"jpg"),' = "image/jpeg" - JPG format'),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"mp4"),' = "video/mp4" - MP4 format'),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"pdf"),' = "application/pdf" - PDF format'))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"RenditionType")," - The type of rendition"),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"page")," - Rendition of the whole page"))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"Variant")," - Types of dialog variants supported"),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"confirmation")," - Ask a user to confirm an action"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"information")," - Share information for user to acknowledge"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"warning")," - Share information that a user needs to consider before proceeding"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"destructive")," - Tell a user that if they proceed with an action, it may impact their data in a negative way"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"error")," - Communicate critical issue that a user needs to resolve before proceeding"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"input")," - Ask a user to provide some inputs"),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"custom")," - A dialog that can render complex forms and content"))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"FieldType")," - The type of the input field in Simple Dialog  "),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},'text = "text" - One-line text input field'))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},'DialogResultType - The type of the dialog result\nalert = "alert" - Alert dialog result\ninput = "input" - Input dialog result\ncustom = "custom" - Custom dialog result')),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"ButtonType")," - Simple Dialog Button types\n",(0,m.mdx)("inlineCode",{parentName:"p"},"primary"),' = "primary" = Primary button pressed\n',(0,m.mdx)("inlineCode",{parentName:"p"},"secondary"),' = "secondary" = Secondary button pressed\n',(0,m.mdx)("inlineCode",{parentName:"p"},"cancel"),' = "cancel" = cancel button pressed\n',(0,m.mdx)("inlineCode",{parentName:"p"},"close"),' = "close" = Dialog closed via ESC or close(X) button')),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("inlineCode",{parentName:"p"},"RuntimeType")," - The runtime type\n",(0,m.mdx)("inlineCode",{parentName:"p"},"panel"),' = "panel" - Iframe based runtime that usually hosts the add-on main UI logic.\n',(0,m.mdx)("inlineCode",{parentName:"p"},"dialog"),' = "dialog" - Iframe based runtime that hosts a modal dialog UI.\n'))))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-references-index-md-56b2278fb4f7db9b65ca.js.map