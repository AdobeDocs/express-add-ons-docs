"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[6233],{2845:function(e,a,s){s.r(a),s.d(a,{_frontmatter:function(){return p},default:function(){return m}});var d,t=s(87462),o=s(63366),n=(s(15007),s(64983)),i=s(91515),c=["components"],p={},r=(d="InlineAlert",function(e){return console.warn("Component "+d+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.mdx)("div",e)}),l={_frontmatter:p},b=i.Z;function m(e){var a=e.components,s=(0,o.Z)(e,c);return(0,n.mdx)(b,(0,t.Z)({},l,s,{components:a,mdxType:"MDXLayout"}),(0,n.mdx)("h1",{id:"debugging-add-ons"},"Debugging Add-ons"),(0,n.mdx)("h2",{id:"browser-developer-tools"},"Browser Developer Tools"),(0,n.mdx)("p",null,"You can use the built-in developer tools of your browser to do in-depth debugging while your add-on is loaded and running, including setting breakpoints and stepping through your code, and logging messages to the console. An example of debugging with the browser developer tools is shown in the video below:"),(0,n.mdx)("br",null),(0,n.mdx)("iframe",{"aria-label":"Browser Debugging Demo",src:"https://drive.google.com/file/d/13FHUuRpVti9AH4nUwAMcvNcP6OzGpOc1/preview",width:"640",height:"480"}),(0,n.mdx)("h3",{id:"console-messages"},"Console Messages"),(0,n.mdx)("p",null,"You can also log messages from different places in your code with certain severity levels to help you filter what you're looking for further when you're looking in the developer tools console. However, since the browser is running many other things into the same page, you will see a lot of messages in the console. A good practice is to use some identifier in your messages and filter the message that way. For instance, each ",(0,n.mdx)("inlineCode",{parentName:"p"},"console.*")," method represents severity level, such as ",(0,n.mdx)("inlineCode",{parentName:"p"},"Info"),", ",(0,n.mdx)("inlineCode",{parentName:"p"},"Warning"),", ",(0,n.mdx)("inlineCode",{parentName:"p"},"Error"),", ",(0,n.mdx)("inlineCode",{parentName:"p"},"Verbose"),". Some examples are below, and you can see ",(0,n.mdx)("a",{parentName:"p",href:"https://developer.chrome.com/docs/devtools/console/api/"},"this link")," for more details:"),(0,n.mdx)("pre",null,(0,n.mdx)("code",{parentName:"pre"},"    console.log('Info level)\n    console.warn('Warning level')\n    console.error('Error level)\n    console.debug(Verbose level)\n")),(0,n.mdx)("p",null,"You can also specifically set which levels you want to view in the developer tools with the ",(0,n.mdx)("strong",{parentName:"p"},"Custom levels")," drop-down as well to help you find your specific messages more quickly:"),(0,n.mdx)("p",null,(0,n.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,n.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"50.9375%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,n.mdx)("picture",{parentName:"span"},"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/5530d/log-levels.webp 320w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/0c8fb/log-levels.webp 640w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/94b1e/log-levels.webp 1280w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/0b34d/log-levels.webp 1920w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/d5269/log-levels.webp 2560w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/cdd40/log-levels.webp 2980w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/dd4a7/log-levels.png 320w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/0f09e/log-levels.png 640w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/bbbf7/log-levels.png 1280w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/ac7a9/log-levels.png 1920w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/c7a69/log-levels.png 2560w","/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/d32cc/log-levels.png 2980w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,n.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/3079d8965a0622d9d1f251b26f34a9b7/bbbf7/log-levels.png",alt:"custom levels",title:"custom levels",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,n.mdx)("h3",{id:"printing-json-data"},"Printing JSON Data"),(0,n.mdx)("p",null,"Another useful console method is the ",(0,n.mdx)("inlineCode",{parentName:"p"},".dir()")," which prints a JSON representation of the object, such as ",(0,n.mdx)("inlineCode",{parentName:"p"},"console.dir(document.head);")," which would produce the following:"),(0,n.mdx)("p",null,(0,n.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,n.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"73.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,n.mdx)("picture",{parentName:"span"},"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/5530d/dir-method.webp 320w","/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/0c8fb/dir-method.webp 640w","/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/94b1e/dir-method.webp 1280w","/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/64296/dir-method.webp 1600w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/dd4a7/dir-method.png 320w","/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/0f09e/dir-method.png 640w","/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/bbbf7/dir-method.png 1280w","/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/42cbc/dir-method.png 1600w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,n.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/ff02fb859846fcb2423c75cd0c870cce/bbbf7/dir-method.png",alt:"console.dir method",title:"console.dir method",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,n.mdx)("h2",{id:"add-on-developer-tools"},"Add-on Developer Tools"),(0,n.mdx)("p",null,(0,n.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,n.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"59.68750000000001%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,n.mdx)("picture",{parentName:"span"},"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/5530d/add-on-devtools.webp 320w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/0c8fb/add-on-devtools.webp 640w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/94b1e/add-on-devtools.webp 1280w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/0b34d/add-on-devtools.webp 1920w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/d5269/add-on-devtools.webp 2560w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/f72f1/add-on-devtools.webp 2960w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/dd4a7/add-on-devtools.png 320w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/0f09e/add-on-devtools.png 640w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/bbbf7/add-on-devtools.png 1280w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/ac7a9/add-on-devtools.png 1920w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/c7a69/add-on-devtools.png 2560w","/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/a93a9/add-on-devtools.png 2960w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,n.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/0afa0c72abd13b8051f4ee2ed2338e20/bbbf7/add-on-devtools.png",alt:"add-ons tools screenshot",title:"add-ons tools screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,n.mdx)("h3",{id:"status-messages"},"Status messages"),(0,n.mdx)("p",null,"The ",(0,n.mdx)("strong",{parentName:"p"},"Add-on developer tools")," panel provides useful information via status messages like below to indicate when and where an error is occurring to help you target specific issues in your add-on. For instance, if an invalid value is found in the manifest, you will see something like the following:"),(0,n.mdx)("p",null,(0,n.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,n.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"58.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,n.mdx)("picture",{parentName:"span"},"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/5530d/manifest-error.webp 320w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/0c8fb/manifest-error.webp 640w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/94b1e/manifest-error.webp 1280w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/0b34d/manifest-error.webp 1920w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/d5269/manifest-error.webp 2560w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/42ca8/manifest-error.webp 3000w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/dd4a7/manifest-error.png 320w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/0f09e/manifest-error.png 640w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/bbbf7/manifest-error.png 1280w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/ac7a9/manifest-error.png 1920w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/c7a69/manifest-error.png 2560w","/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/49142/manifest-error.png 3000w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,n.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/520631f6b257fe82ae9a3be9c18b24a2/bbbf7/manifest-error.png",alt:"manifest error screenshot",title:"manifest error screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,n.mdx)("h3",{id:"refreshing-and-clearing-data"},"Refreshing and clearing data"),(0,n.mdx)("p",null,"The ",(0,n.mdx)("strong",{parentName:"p"},"Refresh")," and ",(0,n.mdx)("strong",{parentName:"p"},"Clear data")," buttons in the Add-on developer tools can also be helpful when you want to manually force refresh your code (or when you update the manifest), or clear data you no longer want to persist. For instance, in the case of the ToDo list sample add-on (aka: ",(0,n.mdx)("inlineCode",{parentName:"p"},"use-client-storage"),"), if you had added some items previously they will still be displayed when you open it again unless you actually clear the data. See the demo workflow video at the bottom of the boilerplate section for an example of this in action."),(0,n.mdx)("p",null,(0,n.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,n.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"59.375%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,n.mdx)("picture",{parentName:"span"},"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/5530d/clear-data.webp 320w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/0c8fb/clear-data.webp 640w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/94b1e/clear-data.webp 1280w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/0b34d/clear-data.webp 1920w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/d5269/clear-data.webp 2560w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/b76fb/clear-data.webp 2949w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/dd4a7/clear-data.png 320w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/0f09e/clear-data.png 640w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/bbbf7/clear-data.png 1280w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/ac7a9/clear-data.png 1920w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/c7a69/clear-data.png 2560w","/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/c8474/clear-data.png 2949w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,n.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/6bdf38992b2d66d8e550bceec97dab6f/bbbf7/clear-data.png",alt:"add-ons tools clear data screenshot",title:"add-ons tools clear data screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,n.mdx)(r,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,n.mdx)("p",null,"The ToDo list sample takes advantage of the Add-on SDK's ",(0,n.mdx)("inlineCode",{parentName:"p"},"ClientStorage")," API which stores data to an underlying IndexedDB store. You can also view this store in the browser developer tools by going into the ",(0,n.mdx)("inlineCode",{parentName:"p"},"Application")," tab and locating the IndexedDB store with your add-on ID associated with it, such as in the following:"),(0,n.mdx)("p",null,(0,n.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,n.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"59.06250000000001%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,n.mdx)("picture",{parentName:"span"},"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/5530d/application-indexed-db.webp 320w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/0c8fb/application-indexed-db.webp 640w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/94b1e/application-indexed-db.webp 1280w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/0b34d/application-indexed-db.webp 1920w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/d5269/application-indexed-db.webp 2560w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/f42f2/application-indexed-db.webp 2968w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,n.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/dd4a7/application-indexed-db.png 320w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/0f09e/application-indexed-db.png 640w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/bbbf7/application-indexed-db.png 1280w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/ac7a9/application-indexed-db.png 1920w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/c7a69/application-indexed-db.png 2560w","/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/55686/application-indexed-db.png 2968w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,n.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/4c49c9d49000b90492c3fa55f23e6e0d/bbbf7/application-indexed-db.png",alt:"application tab indexed db screenshot",title:"application tab indexed db screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,n.mdx)(r,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,n.mdx)("p",null,"See ",(0,n.mdx)("a",{parentName:"p",href:"../3-WritingCode/add-on-sdk.md"},"the Add-on SDK section")," for more details about storing and persisting data with your add-ons."))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-debug-index-md-c7203eeff3c371d958f5.js.map