"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[7145],{76690:function(e,a,t){t.r(a),t.d(a,{_frontmatter:function(){return l},default:function(){return x}});var n=t(87462),d=t(45987),r=(t(15007),t(64983)),o=t(91515);const s=["components"],l={},i=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var p;const m={_frontmatter:l},c=o.Z;function x(e){let{components:a}=e,t=(0,d.Z)(e,s);return(0,r.mdx)(c,(0,n.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,r.mdx)(i,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Preview Adobe Express add-on SDK documentation while you wait to ",(0,r.mdx)("a",{parentName:"p",href:"https://adobe.com/go/express-developer"},"join our private beta"),"."),(0,r.mdx)("h1",{id:"development-tools"},"Development Tools"),(0,r.mdx)("h2",{id:"using-the-cli"},"Using the CLI"),(0,r.mdx)("p",null,"The add-on CLI (Command Line Interface) is the main tool that enables you to develop, test, and package add-ons for our platform. With the add-on CLI, you can create a new add-on project, build and test your add-on locally, and package your add-on for distribution."),(0,r.mdx)("p",null,"Here are some key features of the add-on CLI:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Project creation:")," The add-on CLI provides a command to create a new add-on project with a basic file structure and configuration."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Local development:")," The add-on CLI includes a built-in server that allows you to test your add-on locally before deploying it to our platform."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Live reloading:")," The add-on CLI watches your project files for changes and automatically reloads the server when a change is detected."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Packaging:")," The add-on CLI provides a command to package your add-on for distribution, including creating a ZIP file that can be uploaded to our platform.")),(0,r.mdx)("h3",{id:"cli-create-options"},"CLI ",(0,r.mdx)("inlineCode",{parentName:"h3"},"create")," options"),(0,r.mdx)("p",null,"The table below shows the list of arguments that can be specified with the CLI create command (ie: ",(0,r.mdx)("inlineCode",{parentName:"p"},"npx @adobe/create-ccweb-add-on"),"):"),(0,r.mdx)("table",null,(0,r.mdx)("thead",{parentName:"table"},(0,r.mdx)("tr",{parentName:"thead"},(0,r.mdx)("th",{parentName:"tr",align:null},"Argument"),(0,r.mdx)("th",{parentName:"tr",align:null},"Optional"),(0,r.mdx)("th",{parentName:"tr",align:null},"Default Value"),(0,r.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,r.mdx)("tbody",{parentName:"table"},(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"add-on-name")),(0,r.mdx)("td",{parentName:"tr",align:null},"No"),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"Name of the add-on. A new add-on project with this argument will be created in the user's current working directory.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"template")),(0,r.mdx)("td",{parentName:"tr",align:null},"Yes"),(0,r.mdx)("td",{parentName:"tr",align:null},"none, you will",(0,r.mdx)("br",null)," be prompted from the CLI"),(0,r.mdx)("td",{parentName:"tr",align:null},"The template to use for creating the add-on.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"verbose")),(0,r.mdx)("td",{parentName:"tr",align:null},"Yes"),(0,r.mdx)("td",{parentName:"tr",align:null},"false"),(0,r.mdx)("td",{parentName:"tr",align:null},"Setting this argument enables the verbose flag on the underlying operations.")))),(0,r.mdx)("p",null,"For instance, the following command would specify all possible arguments:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"npx @adobe/create-ccweb-add-on my-addon --template react-typescript --verbose\n")),(0,r.mdx)(i,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"See the ",(0,r.mdx)("a",{parentName:"p",href:"#templates"},"templates")," section for the currently supported template values."),(0,r.mdx)("h3",{id:"start-script-options"},(0,r.mdx)("inlineCode",{parentName:"h3"},"start")," script options"),(0,r.mdx)("p",null,"The table below shows a list of arguments that can be specified with the ",(0,r.mdx)("inlineCode",{parentName:"p"},"start")," script on your add-on project, which starts up the add-on in a local server:"),(0,r.mdx)("table",null,(0,r.mdx)("thead",{parentName:"table"},(0,r.mdx)("tr",{parentName:"thead"},(0,r.mdx)("th",{parentName:"tr",align:null},"Argument"),(0,r.mdx)("th",{parentName:"tr",align:null},"Optional"),(0,r.mdx)("th",{parentName:"tr",align:null},"Default Value"),(0,r.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,r.mdx)("tbody",{parentName:"table"},(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"src")),(0,r.mdx)("td",{parentName:"tr",align:null},"Yes"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"src")),(0,r.mdx)("td",{parentName:"tr",align:null},"Directory where the source code and assets for the add-on is present.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"use")),(0,r.mdx)("td",{parentName:"tr",align:null},"Yes"),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"Transpiler/bundler to be used. For example, webpack.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"port")),(0,r.mdx)("td",{parentName:"tr",align:null},"Yes"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"5241")),(0,r.mdx)("td",{parentName:"tr",align:null},"Local development server port.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"verbose")),(0,r.mdx)("td",{parentName:"tr",align:null},"Yes"),(0,r.mdx)("td",{parentName:"tr",align:null},"false"),(0,r.mdx)("td",{parentName:"tr",align:null},"Setting this argument enables the verbose flag on the underlying operations.")))),(0,r.mdx)("p",null,"For instance, to specify a port of ",(0,r.mdx)("inlineCode",{parentName:"p"},"8080")," instead, use the following command:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"npm run start -- --port 8080\n")),(0,r.mdx)("p",null,"To specify you want to use ",(0,r.mdx)("inlineCode",{parentName:"p"},"webpack")," AND port ",(0,r.mdx)("inlineCode",{parentName:"p"},"8080"),":"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"npm run start -- --use webpack --port 8080\n")),(0,r.mdx)(i,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"The extra arguments are unnecessary unless you do not want to use a transpiler/bundler or use the default port of ",(0,r.mdx)("inlineCode",{parentName:"p"},"5241"),". Also, note that all of the templates other than the ",(0,r.mdx)("inlineCode",{parentName:"p"},"javascript")," template are pre-configured to use webpack by default and the ",(0,r.mdx)("inlineCode",{parentName:"p"},"--use webpack")," is automatically added when you run the ",(0,r.mdx)("inlineCode",{parentName:"p"},"build")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"start")," commands. Take a look at the ",(0,r.mdx)("inlineCode",{parentName:"p"},"scripts")," property in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"package.json")," of those templates and you will see the following:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'"scripts": {\n    "clean": "ccweb-add-on-scripts clean",\n    "build": "ccweb-add-on-scripts build --use webpack",\n    "start": "ccweb-add-on-scripts start --use webpack"\n}\n')),(0,r.mdx)("h2",{id:"templates"},"Templates"),(0,r.mdx)("p",null,"The add-on CLI contains built-in, pre-configured templates to allow you to create an add-on project based on your favorite development stack in the quickest possible manner. There are currently four different template options based on popular web development trends. The table below summarizes the templates and their associated frameworks."),(0,r.mdx)("br",null),(0,r.mdx)("table",null,(0,r.mdx)("thead",{parentName:"table"},(0,r.mdx)("tr",{parentName:"thead"},(0,r.mdx)("th",{parentName:"tr",align:null},"Template"),(0,r.mdx)("th",{parentName:"tr",align:null},"Framework"))),(0,r.mdx)("tbody",{parentName:"table"},(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"javascript")),(0,r.mdx)("td",{parentName:"tr",align:null},"JavaScript")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"typescript")),(0,r.mdx)("td",{parentName:"tr",align:null},"TypeScript")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"react-javascript")),(0,r.mdx)("td",{parentName:"tr",align:null},"React with JavaScript")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"react-typescript")),(0,r.mdx)("td",{parentName:"tr",align:null},"React with TypeScript")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"javascript-with-editor-apis")),(0,r.mdx)("td",{parentName:"tr",align:null},"Get started with add-on development using JavaScript with Editor APIs")))),(0,r.mdx)("p",null,"The following syntax can be used to specify one of the above templates:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"npx @adobe/create-ccweb-add-on <add-on-name> --template <template>\n")),(0,r.mdx)("p",null,"For instance, the following is an example of a command that will create an add-on based on the ",(0,r.mdx)("inlineCode",{parentName:"p"},"react-javascript")," template:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"npx @adobe/create-ccweb-add-on helloworld-react-js --template react-javascript\n")),(0,r.mdx)(i,{slots:"text",variant:"success",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"TIP:")," If you don't specify a template, the CLI will simply prompt you to choose from the list of template options."),(0,r.mdx)("h2",{id:"manifest"},"Manifest"),(0,r.mdx)("p",null,"A ",(0,r.mdx)("inlineCode",{parentName:"p"},"manifest.json")," file is required in every add-on project. The manifest provides details including important metadata about your add-on and how it should behave. Be sure to consult the ",(0,r.mdx)("a",{parentName:"p",href:"../../references/manifest"},"manifest schema reference")," to ensure that your ",(0,r.mdx)("inlineCode",{parentName:"p"},"manifest.json")," file is properly formatted and includes all of the necessary properties and values."),(0,r.mdx)("h2",{id:"add-on-development-tools-panel"},"Add-on Development Tools Panel"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("strong",{parentName:"p"},"Add-on Development")," tools panel provides useful logging details indicating the status of your add-on, as well as action buttons to allow for refreshing and clearing the data associated with your add-on. The panel is shown in the screenshots below for reference:"),(0,r.mdx)(i,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"The ",(0,r.mdx)("strong",{parentName:"p"},"Refresh")," button can be used to reload your add-on's code and resources, and the ",(0,r.mdx)("strong",{parentName:"p"},"Clear Storage")," button allows you to clear any data stored by your add-on."),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"52.1875%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/5530d/add-on-devtools.webp 320w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/0c8fb/add-on-devtools.webp 640w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/94b1e/add-on-devtools.webp 1280w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/0b34d/add-on-devtools.webp 1920w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/d5269/add-on-devtools.webp 2560w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/f72f1/add-on-devtools.webp 2960w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/dd4a7/add-on-devtools.png 320w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/0f09e/add-on-devtools.png 640w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/bbbf7/add-on-devtools.png 1280w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/ac7a9/add-on-devtools.png 1920w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/c7a69/add-on-devtools.png 2560w","/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/a93a9/add-on-devtools.png 2960w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/792db56520e85800cf4d5bfd508a6e63/bbbf7/add-on-devtools.png",alt:"add-ons tools screenshot",title:"add-ons tools screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    "),"\n",(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"51.25000000000001%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/5530d/manifest-error.webp 320w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/0c8fb/manifest-error.webp 640w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/94b1e/manifest-error.webp 1280w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/0b34d/manifest-error.webp 1920w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/d5269/manifest-error.webp 2560w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/99c11/manifest-error.webp 2930w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/dd4a7/manifest-error.png 320w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/0f09e/manifest-error.png 640w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/bbbf7/manifest-error.png 1280w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/ac7a9/manifest-error.png 1920w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/c7a69/manifest-error.png 2560w","/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/a92d0/manifest-error.png 2930w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/express-add-ons-docs/static/0ab47889e0833ee371fcd440adc54944/bbbf7/manifest-error.png",alt:"manifest error screenshot",title:"manifest error screenshot",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")))}x.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-getting-started-dev-tooling-md-dda8e60899588eae3bff.js.map