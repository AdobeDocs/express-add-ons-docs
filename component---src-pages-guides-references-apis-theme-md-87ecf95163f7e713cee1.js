"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[2471],{98440:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return r},default:function(){return u}});var a=t(87462),d=t(63366),p=(t(15007),t(64983)),o=t(91515),m=["components"],r={},i=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,p.mdx)("div",n)}},s=i("CodeBlock"),l=i("InlineAlert"),c={_frontmatter:r},h=o.Z;function u(e){var n=e.components,t=(0,d.Z)(e,m);return(0,p.mdx)(h,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,p.mdx)("h1",{id:"theme"},"Theme"),(0,p.mdx)("p",null,"Retrieve the current theme of the host application, via the ",(0,p.mdx)("a",{parentName:"p",href:"#application"},(0,p.mdx)("inlineCode",{parentName:"a"},"app.ui"))," object."),(0,p.mdx)(s,{slots:"heading, code",repeat:"3",languages:"JavaScript",mdxType:"CodeBlock"}),(0,p.mdx)("h3",{id:"interface"},"Interface"),(0,p.mdx)("pre",null,(0,p.mdx)("code",{parentName:"pre",className:"language-js"},'interface Application {\n  /**\n   * Represents the UI of the host application.\n   */\n  readonly ui: UI;\n}\ninterface UI {\n    /**\n     * The theme currently used by the host application.\n     */\n    theme: string;\n}\n/**\n * "themechange" event is triggered when the UI theme is changed in the application.\n */\n')),(0,p.mdx)("h3",{id:"example"},"Example"),(0,p.mdx)("pre",null,(0,p.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\nfunction applyTheme(theme) {\n  /* ... */\n}\n\nAddOnSdk.ready.then(async () => {\n    console.log("Theme object", JSON.stringify(AddOnSdk.app.ui.theme));\n    applyTheme(AddOnSdk.app.ui.theme));\n});\n\nAddOnSdk.app.on("themechange", (data) => {\n  applyTheme(data.theme);\n});\n')),(0,p.mdx)("h2",{id:"output"},"Output"),(0,p.mdx)("pre",null,(0,p.mdx)("code",{parentName:"pre",className:"language-json"},'Theme object "light"\n')),(0,p.mdx)(l,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,p.mdx)("p",null,"We have provided a sample that can be used as a reference for implementing the Application UI Theme APIs. Please see the ",(0,p.mdx)("strong",{parentName:"p"},"swc")," sample provided in the ",(0,p.mdx)("a",{parentName:"p",href:"guides/develop/samples"},"code samples")," within the ",(0,p.mdx)("strong",{parentName:"p"},"contributed")," folder for specific details."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-references-apis-theme-md-87ecf95163f7e713cee1.js.map