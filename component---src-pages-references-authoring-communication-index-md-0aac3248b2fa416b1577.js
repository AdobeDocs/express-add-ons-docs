"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[7507],{14866:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return m},default:function(){return u}});var o=t(87462),i=t(45987),a=(t(15007),t(64983)),r=t(91515);const d=["components"],m={},s=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.mdx)("div",e)});var p;const c={_frontmatter:m},l=r.Z;function u(e){let{components:n}=e,t=(0,i.Z)(e,d);return(0,a.mdx)(l,(0,o.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.mdx)("h1",{id:"communication-apis"},"Communication APIs"),(0,a.mdx)("p",null,"The communication APIs allow you to communicate between the authoring sandbox and the iframe where your add-on is running."),(0,a.mdx)("h2",{id:"overview"},"Overview"),(0,a.mdx)("p",null,"The authoring sandbox and iframe runtime are two different runtime execution environments which are present on different threads in the browser. The communication APIs are based on the ",(0,a.mdx)("a",{parentName:"p",href:"https://github.com/GoogleChromeLabs/comlink"},"Comlink library")," and provide a mechanism to allow the JavaScript code executing in each to interact. Developers can call the apis exposed in one environment (ie: authoring sandbox) from another environment (ie: iframe where their add-on is running) bidirectionally."),(0,a.mdx)("h2",{id:"accessing-the-apis"},"Accessing the APIs"),(0,a.mdx)("p",null,"A default exported module from ",(0,a.mdx)("inlineCode",{parentName:"p"},"AddOnScriptSdk")," is provided to enable the communication between the iframe and the authoring sandbox via its' ",(0,a.mdx)("inlineCode",{parentName:"p"},"instance.runtime")," object. You can simply import the module into your script file code for use, and create a reference to the ",(0,a.mdx)("inlineCode",{parentName:"p"},"runtime")," object. For instance:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnScriptSdk from "AddOnScriptSdk"; // AddOnScriptSdk is a default import\n\nconst { runtime } = AddOnScriptSdk.instance; // runtime object provides direct access to the comm methods\n')),(0,a.mdx)("h2",{id:"examples"},"Examples"),(0,a.mdx)("p",null,"The ",(0,a.mdx)("inlineCode",{parentName:"p"},"runtime")," object can then be used to access the communication methods which allow you to communicate between the two execution environments: ",(0,a.mdx)("inlineCode",{parentName:"p"},"exposeApi()")," and ",(0,a.mdx)("inlineCode",{parentName:"p"},"apiProxy()"),". The examples below show the methods in use from both the ",(0,a.mdx)("inlineCode",{parentName:"p"},"index.html")," where the iframe is running with your add-on code, and the authoring sandbox environment running the contents of ",(0,a.mdx)("inlineCode",{parentName:"p"},"code.js"),"."),(0,a.mdx)("h3",{id:"expose-apis-from-the-script"},"Expose APIs from the script"),(0,a.mdx)("p",null,"This example shows how to expose APIs from the authoring sandbox SDK (via ",(0,a.mdx)("inlineCode",{parentName:"p"},"code.js"),") for use by the UI (via ",(0,a.mdx)("inlineCode",{parentName:"p"},"index.html"),")."),(0,a.mdx)("h4",{id:"codejs"},(0,a.mdx)("inlineCode",{parentName:"h4"},"code.js")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnScriptSdk from "AddOnScriptSdk"; \n\nconst { runtime } = AddOnScriptSdk.instance; \n\nconst scriptApis = {\n    performWorkOnDocument: function (data, someFlag) {\n        // call the Document APIs\n    },\n    getDataFromDocument: function () {\n        // get some data from document\n    },\n};\n// expose these apis to be directly consumed in the UI (ie: index.html file).\nruntime.exposeApi(scriptApis);\n')),(0,a.mdx)("h4",{id:"indexhtml"},"index.html"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\naddOnUISdk.ready.then(async () => {\n    const { runtime } = addOnUISdk.instance;\n\n    // Wait for the promise to resolve to get a proxy to call APIs defined in the script\n    const scriptApis = await runtime.apiProxy("script");\n\n    await scriptApis.performWorkOnDocument(\n        {\n            pageNumber: 1,\n            op: "change_background_color",\n            data: {\n                toColor: "blue",\n            },\n        }, \n        true\n    );\n\n    console.log(await scriptApis.getDataFromDocument());\n});\n')),(0,a.mdx)("h3",{id:"expose-apis-from-the-ui"},"Expose APIs from the UI"),(0,a.mdx)("p",null,"This example shows how to expose APIs from the UI (via ",(0,a.mdx)("inlineCode",{parentName:"p"},"index.html"),") for use in the authoring sandbox (via ",(0,a.mdx)("inlineCode",{parentName:"p"},"code.js"),")."),(0,a.mdx)("h4",{id:"indexhtml-1"},(0,a.mdx)("inlineCode",{parentName:"h4"},"index.html")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-js"},'addOnUISdk.ready.then(async () => {\n    console.log("addOnUISdk is ready for use.");\n\n    const { runtime } = addOnUISdk.instance;\n    const uiApi = {\n        performWorkOnUI: function (data, someFlag) {\n            // Do some ui operation\n        },\n        getDataFromUI: async function () {\n            let resolver = undefined;\n            \n            const promise = new Promise((resolve) => {\n                resolver = resolve;\n            });\n            setTimeout(() => {\n                resolver("button_color_blue");\n            }, 10);\n            return await promise;\n        },\n    };\n    // Expose the UI Apis to be used in the script code (ie: code.js)\n    runtime.exposeApi(uiApi);\n});\n')),(0,a.mdx)("h4",{id:"codejs-1"},(0,a.mdx)("inlineCode",{parentName:"h4"},"code.js")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnScriptSdk from "AddOnScriptSdk"; // default import\n\nconst { runtime } = AddOnScriptSdk.instance;\n\nasync function callUIApis() {\n    // Get a proxy to the APIs defined in the UI\n    const uiApis = await runtime.apiProxy("panel");\n    await uiApis.performWorkOnUI(\n        {\n            buttonTextFont: 20,\n            buttonColor: "Green"\n        },\n        true\n    );\n    \n\n    const result = await uiApis.getDataFromUI();\n    console.log("Data from UI: " + result);\n}\n')),(0,a.mdx)(s,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,a.mdx)("p",null,(0,a.mdx)("strong",{parentName:"p"},"DEBUGGING:")," Since the script code runs in a separate context from your add-on UI, the only support for debugging is via the ",(0,a.mdx)("inlineCode",{parentName:"p"},"console.*")," methods."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-authoring-communication-index-md-0aac3248b2fa416b1577.js.map