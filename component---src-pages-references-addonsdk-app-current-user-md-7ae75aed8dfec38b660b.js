"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[2109],{39651:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return s},default:function(){return x}});var d=t(87462),r=t(63366),a=(t(15007),t(64983)),o=t(91515),i=["components"],s={},m=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.mdx)("div",n)}},p=m("InlineAlert"),u=m("CodeBlock"),l={_frontmatter:s},c=o.Z;function x(e){var n=e.components,t=(0,r.Z)(e,i);return(0,a.mdx)(c,(0,d.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,a.mdx)("h1",{id:"addonsdkappcurrentuser"},"AddOnSdk.app.currentUser"),(0,a.mdx)("p",null,"Provides access to the currently logged in user."),(0,a.mdx)(p,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,a.mdx)("p",null,(0,a.mdx)("strong",{parentName:"p"},"IMPORTANT:")," This API is currently ",(0,a.mdx)("strong",{parentName:"p"},(0,a.mdx)("em",{parentName:"strong"},"experimental only"))," and should not be used in any add-ons you will be distributing until it's been marked stable. To use this API, you will first need to set the ",(0,a.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag to ",(0,a.mdx)("inlineCode",{parentName:"p"},"true")," in the ",(0,a.mdx)("a",{parentName:"p",href:"../manifest/index.md#requirements"},(0,a.mdx)("inlineCode",{parentName:"a"},"requirements"))," section of the ",(0,a.mdx)("inlineCode",{parentName:"p"},"manifest.json"),". "),(0,a.mdx)("h2",{id:"methods"},"Methods"),(0,a.mdx)("h3",{id:"userid"},"userId()"),(0,a.mdx)("p",null,"Retrieve the current user of the host application."),(0,a.mdx)("h4",{id:"signature"},"Signature"),(0,a.mdx)("p",null,(0,a.mdx)("inlineCode",{parentName:"p"},"userId(): promise<string>")),(0,a.mdx)("h4",{id:"return-value"},"Return Value"),(0,a.mdx)("p",null,"A resolved ",(0,a.mdx)("inlineCode",{parentName:"p"},"Promise")," containing the ",(0,a.mdx)("inlineCode",{parentName:"p"},"userId")," of the current user."),(0,a.mdx)("h2",{id:"example"},"Example"),(0,a.mdx)(u,{slots:"heading, code",repeat:"2",languages:"JavaScript",mdxType:"CodeBlock"}),(0,a.mdx)("h3",{id:"usage"},"Usage"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\nAddOnSdk.ready.then(async () => {\n    const userId = await AddOnSdk.app.currentUser.userId();\n    console.log("Current Userid: " + userId);\n});\n')),(0,a.mdx)("h3",{id:"output"},"Output"),(0,a.mdx)("p",null,(0,a.mdx)("inlineCode",{parentName:"p"},"Current Userid: 3cda976828a4a90d13b0f38b1f8a59b1d6845cccfc48037fb30bb75d3ef67d36")))}x.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-addonsdk-app-current-user-md-7ae75aed8dfec38b660b.js.map