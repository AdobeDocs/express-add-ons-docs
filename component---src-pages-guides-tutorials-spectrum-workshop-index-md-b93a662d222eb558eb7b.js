"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[1721],{80073:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return r},default:function(){return u}});var a=n(58168),o=n(80045),d=(n(88763),n(15680)),s=n(83407);const i=["components"],r={},p=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,d.mdx)("div",t)},c=p("InlineAlert"),m=p("ListBlock"),l={_frontmatter:r},b=s.A;function u(e){let{components:t}=e,n=(0,o.A)(e,i);return(0,d.mdx)(b,(0,a.A)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,d.mdx)("h1",{id:"building-uis-using-adobes-spectrum-design-system"},"Building UIs using Adobe's Spectrum Design System"),(0,d.mdx)("p",null,"This tutorial will guide you on how to get started building great UI's for your add-ons using ",(0,d.mdx)("a",{parentName:"p",href:"https://spectrum.adobe.com/"},"Adobe Spectrum"),"."),(0,d.mdx)(c,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,d.mdx)("p",null,"This tutorial was also presented in a recorded workshop that can be viewed ",(0,d.mdx)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=5PA4KEN4JdQ"},"here"),"."),(0,d.mdx)("h2",{id:"introduction"},"Introduction"),(0,d.mdx)("p",null,"In this tutorial, you will learn how to build two fully functioning ",(0,d.mdx)("a",{parentName:"p",href:"https://new.express.adobe.com/"},"Adobe Express")," add-ons from scratch that use ",(0,d.mdx)("a",{parentName:"p",href:"https://spectrum.adobe.com/"},"Adobe Spectrum")," for building the user interface. The concept for the add-on you will build is a bingo card generator, which allows a user to customize a bingo card with their chosen colors, random numbers and an optional FREE space."),(0,d.mdx)("p",null,"The two different add-on's you will create are:"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("p",{parentName:"li"},"A basic JavaScript add-on that uses ",(0,d.mdx)("a",{parentName:"p",href:"https://opensource.adobe.com/spectrum-web-components/"},"Spectrum Web Components")," to build out the UI.")),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("p",{parentName:"li"},"A React-based add-on that uses the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/guides/design/user_interface/#spectrum-web-components-with-react"},(0,d.mdx)("inlineCode",{parentName:"a"},"swc-react")," Spectrum Web Components wrapper library"),"."))),(0,d.mdx)("p",null,"An example of what you will build is shown below:"),(0,d.mdx)("p",null,(0,d.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,d.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"52.81250000000001%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,d.mdx)("picture",{parentName:"span"},"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/5530d/bingo-v1-addon.webp 320w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/0c8fb/bingo-v1-addon.webp 640w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/94b1e/bingo-v1-addon.webp 1280w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/0b34d/bingo-v1-addon.webp 1920w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/d5269/bingo-v1-addon.webp 2560w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/c871d/bingo-v1-addon.webp 2894w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/dd4a7/bingo-v1-addon.png 320w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/0f09e/bingo-v1-addon.png 640w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/bbbf7/bingo-v1-addon.png 1280w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/ac7a9/bingo-v1-addon.png 1920w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/c7a69/bingo-v1-addon.png 2560w","/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/77676/bingo-v1-addon.png 2894w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,d.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/6c9cb8644438b571b4841add348b33ca/bbbf7/bingo-v1-addon.png",alt:"Bingo add-on screenshot",title:"Bingo add-on screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,d.mdx)("p",null,'This add-on allows users to select settings to customize a bingo card; including background, foreground, title color, gridline size and whether to include a "FREE" space. The card is generated with random numbers, and ensures no numbers are used twice. The user can drag the customized card to the page, or click the "Add to page" button to use it in their document.'),(0,d.mdx)("h3",{id:"changelog"},"Changelog"),(0,d.mdx)("p",null,(0,d.mdx)("strong",{parentName:"p"},"February 6th, 2024")),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},"Updated tips on Spectrum CSS styling to add additional details on ",(0,d.mdx)("a",{parentName:"li",href:"./part3.md#styling-with-spectrum-css"},"why you should use Spectrum CSS variables")," to style your add-ons, and ",(0,d.mdx)("a",{parentName:"li",href:"part3.md#layout-and-typography-styling"},"additional helpful guidelines for locating and using them"))),(0,d.mdx)("p",null,(0,d.mdx)("strong",{parentName:"p"},"January 31st, 2024")),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},"First publication, by Holly Schinsky")),(0,d.mdx)("h3",{id:"prerequisites"},"Prerequisites"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},"Familiarity with HTML, CSS, JavaScript."),(0,d.mdx)("li",{parentName:"ul"},"Familiarity with the Adobe Express add-ons environment; if you need a refresher, follow the ",(0,d.mdx)("a",{parentName:"li",href:"/express-add-ons-docs/guides/getting_started/quickstart.md"},"quickstart")," guide."),(0,d.mdx)("li",{parentName:"ul"},"An Adobe Express account; use your existing Adobe ID or create one for free."),(0,d.mdx)("li",{parentName:"ul"},"Node.js version 16 or newer.")),(0,d.mdx)("h3",{id:"sample-projects"},"Sample Projects"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("a",{parentName:"li",href:"https://github.com/hollyschinsky/bingo-card-generator-js"},"Lesson 1 project")," - Bingo Card Generator add-on using Spectrum Web Components and JavaScript")),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("a",{parentName:"li",href:"https://github.com/hollyschinsky/bingo-card-generator-react-js"},"Lesson 2 project")," - Bingo Card Generator add-on using ",(0,d.mdx)("a",{parentName:"li",href:"https://opensource.adobe.com/spectrum-web-components/using-swc-react/"},"swc-react")," and ReactJS")),(0,d.mdx)("h3",{id:"topics-covered"},"Topics Covered"),(0,d.mdx)(m,{slots:"text1, text2",repeat:"2",iconColor:"#2ac3a2",icon:"disc",variant:"fullWidth",mdxType:"ListBlock"}),(0,d.mdx)("p",null,(0,d.mdx)("a",{parentName:"p",href:"part1.md#create-and-configure-your-add-on"},"Configuring your add-on to use Spectrum Web Components")),(0,d.mdx)("p",null,(0,d.mdx)("a",{parentName:"p",href:"part2.md#import-swc-react-components"},"Using swc-react - Spectrum Web Component wrappers for React")),(0,d.mdx)("p",null,(0,d.mdx)("a",{parentName:"p",href:"part2.md#style-your-ui"},"Using Spectrum variables to customize the layout of your UI")),(0,d.mdx)("p",null,(0,d.mdx)("a",{parentName:"p",href:"part3.md#troubleshooting-faq"},"Tips, Debugging & Troubleshooting")),(0,d.mdx)("h2",{id:"quickstart-try-spectrum-web-components"},"Quickstart: Try Spectrum Web Components"),(0,d.mdx)("p",null,"A quick way to try out ",(0,d.mdx)("a",{parentName:"p",href:"https://opensource.adobe.com/spectrum-web-components/"},"Spectrum Web Components")," without requiring any external tools, is to use a sandboxed environment like a codepen. See this ",(0,d.mdx)("a",{parentName:"p",href:"https://codepen.io/hollyschinsky/pen/xxBweyV"},"simple codepen"),", for example. It references the Spectrum Web Components libraries as bundles from a CDN for simplicity, and shows how to use the Express theme with a button component."),(0,d.mdx)("p",null,"Check out ",(0,d.mdx)("a",{parentName:"p",href:"https://codepen.io/hollyschinsky/pen/xxBweyV0"},"the codepen"),", then try changing the ",(0,d.mdx)("inlineCode",{parentName:"p"},"scale")," value in the ",(0,d.mdx)("inlineCode",{parentName:"p"},"<sp-theme>")," tag to a value of ",(0,d.mdx)("inlineCode",{parentName:"p"},'"large"')," - then back to ",(0,d.mdx)("inlineCode",{parentName:"p"},'"medium"')," to see the effect."),(0,d.mdx)("p",null,(0,d.mdx)("strong",{parentName:"p"},"NOTE:")," You can try using any other Spectrum Web Components in a similar fashion, ensuring they're included within the opening ",(0,d.mdx)("inlineCode",{parentName:"p"},"<sp-theme>")," and closing ",(0,d.mdx)("inlineCode",{parentName:"p"},"</sp-theme>")," tags."),(0,d.mdx)("p",null,"Before moving on, check out ",(0,d.mdx)("a",{parentName:"p",href:"https://codepen.io/hollyschinsky/pen/bGZrdoy"},"this codepen")," which implements the UI for the bingo card generator add-on and gives you a glimpse of what you're going to be building. You can change the layout to represent how it might look running in Express, by clicking the layout icon button outlined below, and dragging the width of the frame to 320px:"),(0,d.mdx)("p",null,(0,d.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,d.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"51.25000000000001%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,d.mdx)("picture",{parentName:"span"},"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/5530d/bingo-codepen.webp 320w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/0c8fb/bingo-codepen.webp 640w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/94b1e/bingo-codepen.webp 1280w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/0b34d/bingo-codepen.webp 1920w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/d5269/bingo-codepen.webp 2560w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/d309b/bingo-codepen.webp 2948w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/dd4a7/bingo-codepen.png 320w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/0f09e/bingo-codepen.png 640w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/bbbf7/bingo-codepen.png 1280w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/ac7a9/bingo-codepen.png 1920w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/c7a69/bingo-codepen.png 2560w","/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/07c6b/bingo-codepen.png 2948w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,d.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/2b2476ac8f9037bcbdd5d2bfdf5214e3/bbbf7/bingo-codepen.png",alt:"Bingo codepen screenshot",title:"Bingo codepen screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,d.mdx)(c,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,d.mdx)("p",null,"CDN URL references are used to show you a quick way to get started with Spectrum Web Components. However, you will notice the UI is laggy, so you wouldn't want to use this for your final add-on projects for performance reasons. In the following lessons, you will learn how to configure your projects to use only the modules and components your UI needs to ensure the best performance for your add-ons."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-tutorials-spectrum-workshop-index-md-b93a662d222eb558eb7b.js.map