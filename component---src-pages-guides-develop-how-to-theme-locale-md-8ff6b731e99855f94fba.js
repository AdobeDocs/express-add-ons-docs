"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[9224],{93836:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return r},default:function(){return h}});var a=t(58168),d=t(80045),o=(t(88763),t(15680)),l=t(83407);const s=["components"],r={},p=(m="InlineAlert",function(e){return console.warn("Component "+m+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.mdx)("div",e)});var m;const c={_frontmatter:r},i=l.A;function h(e){let{components:n}=e,t=(0,d.A)(e,s);return(0,o.mdx)(i,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"theme--locale"},"Theme & Locale"),(0,o.mdx)("h2",{id:"detecting-theme"},"Detecting Theme"),(0,o.mdx)("p",null,"It can be useful to know what theme is currently set in Adobe Express, for instance to load a specific set of CSS in your add-on to keep its UI in sync, also in case the user changes it."),(0,o.mdx)(p,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,'Currently, Adobe Express supports a "light" theme only, although a "dark" theme is planned for future releases.'),(0,o.mdx)("p",null,"The current theme is available in the ",(0,o.mdx)("a",{parentName:"p",href:"../../../references/addonsdk/app-ui.md#theme"},(0,o.mdx)("inlineCode",{parentName:"a"},"addOnUISdk.app.ui.theme"))," property. Changes can be detected by listening to the ",(0,o.mdx)("inlineCode",{parentName:"p"},"themechange")," event on the ",(0,o.mdx)("a",{parentName:"p",href:"../../../references/addonsdk/addonsdk-app.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"addOnUISdk.app"))," object. The event will provide the new theme in the ",(0,o.mdx)("inlineCode",{parentName:"p"},"data.theme")," property."),(0,o.mdx)("h3",{id:"example"},"Example"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\naddOnUISdk.ready.then(async () => {\n  // Get the current theme\n  console.log(addOnUISdk.app.ui.theme); // "light"\n\n  // Listen to theme changes\n  addOnUISdk.app.on("themechange", (data) => {\n    // data theme will be either "light" or "dark"\n    console.log("The theme is now", data.theme);\n    // ...\n    // Apply the new theme to your add-on UI\n  });\n});\n')),(0,o.mdx)("h2",{id:"detecting-locale-supported-locales-and-format"},"Detecting Locale, Supported Locales, and Format"),(0,o.mdx)("p",null,"It's possible to retrieve the user's current locale, the list of supported locales, and detect when the locale changes (e.g., to set the language in your add-on accordingly). You can do so with the ",(0,o.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/addonsdk/app-ui.md#locale"},(0,o.mdx)("inlineCode",{parentName:"a"},"addOnUISdk.app.ui")," object")," in the add-on SDK. Similarly, you can get and detect a change in the Format used display dates, times, numbers, etc. A simple example is shown below."),(0,o.mdx)("h3",{id:"example-1"},"Example"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\naddOnUISdk.ready.then(() => {\n  // Get the currently supported locales\n  console.log(addOnUISdk.app.ui.locales); // ["bn-IN", "cy-GB", ...]\n\n  // Get the current locale\n  console.log(addOnUISdk.app.ui.locale); // "en-US"\n\n  // Get the current format\n  console.log(addOnUISdk.app.ui.format); // "en-US"\n\n  // Listen to locale changes\n  addOnUISdk.app.on("localechange", (data) => {\n    console.log("The locale is now", data.locale); // "fr-FR"\n    // ...\n  });\n\n  // Listen to format changes\n  addOnUISdk.app.on("formatchange", (data) => {\n    console.log("The format is now", data.format); // "fr-FR"\n    // ...\n  });\n});\n')))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-develop-how-to-theme-locale-md-8ff6b731e99855f94fba.js.map