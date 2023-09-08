"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[8695],{90223:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return s},default:function(){return u}});var o=t(87462),a=t(45987),r=(t(15007),t(64983)),i=t(91515);const d=["components"],s={},m=(l="InlineAlert",function(e){return console.warn("Component "+l+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var l;const p={_frontmatter:s},h=i.Z;function u(e){let{components:n}=e,t=(0,a.Z)(e,d);return(0,r.mdx)(h,(0,o.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)(m,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Preview Adobe Express add-on SDK documentation while you wait to ",(0,r.mdx)("a",{parentName:"p",href:"https://adobe.com/go/express-developer"},"join our private beta"),"."),(0,r.mdx)("h1",{id:"frequently-asked-questions"},"Frequently Asked Questions"),(0,r.mdx)("h2",{id:"questions"},"Questions"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#how-do-i-run-on-a-different-port-than-the-default-ie-8080-for-example"},"How do I run on a different port than the default (ie: 8080 for example)?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#is-yarn-supported-with-the-cli-or-only-npm"},"Is ",(0,r.mdx)("inlineCode",{parentName:"a"},"yarn")," supported with the CLI?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#how-do-i-save-the-state-of-my-add-on"},"How do I save the state of my add-on?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#how-do-i-use-top-level-await-while-using-webpack"},"How do I use top level ",(0,r.mdx)("inlineCode",{parentName:"a"},"await")," while using webpack?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#how-do-i-setup-webpack-to-copy-new-files-or-folders-into-dist"},"How do I setup webpack to copy new files or folders into ",(0,r.mdx)("inlineCode",{parentName:"a"},"dist"),"?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#my-form-submission-doesnt-work-and-the-devtools-console-shows-the-error---blocked-form-submission-to---because-the-forms-frame-is-sandboxed-and-the-allow-forms-permission-is-not-set-whats-wrong"},"My form submission doesn't work and the devtools console shows the error - \"Blocked form submission to \" \" because the form's frame is sandboxed and the 'allow-forms' permission is not set.\" What's wrong?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#how-do-i-enable-cors-for-a-service-that-blocks-my-add-on-requests-due-to-the-null-origin"},"How do I enable CORS for a service that blocks my add-on requests due to the ",(0,r.mdx)("inlineCode",{parentName:"a"},"null")," origin?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#the-windowshowopenfilepicker-api-is-not-working-from-within-my-add-on-why-not"},"The ",(0,r.mdx)("inlineCode",{parentName:"a"},"Window.showOpenFilePicker()")," API is not working from within my add-on, why not?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#im-not-able-to-load-the-add-on-in-the-browser-anymore-when-i-click-on-connect-i-get-an-error-err_cert_authority_invalid"},'I’m not able to load the add-on in the browser anymore. When I click on "Connect”, I get an error ',(0,r.mdx)("inlineCode",{parentName:"a"},"ERR_CERT_AUTHORITY_INVALID"),".")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#i-receive-this-error-when-trying-to-run-my-add-on-error-eisdir-illegal-operation-on-a-directory"},"I receive this error when trying to run my add-on: ",(0,r.mdx)("inlineCode",{parentName:"a"},"Error: EISDIR: illegal operation on a directory"),".")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#i-receive-this-error-when-trying-to-run-my-add-on-error-eisdir-illegal-operation-on-a-directory"},"I receive a ",(0,r.mdx)("inlineCode",{parentName:"a"},"MANIFEST_NOT_FOUND_ERROR")," during the package verification when trying to upload my plugin package for distribution.")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#how-can-i-monetize-my-add-on"},"How can I monetize my add-on?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#what-does-it-mean-when-an-api-is-considered-experimental"},"What does it mean when an API is considered ",(0,r.mdx)("strong",{parentName:"a"},"experimental"),"?")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#what-are-the-supported-file-types-for-exported-content"},"What are the supported file types for exported content?"))),(0,r.mdx)("h2",{id:"answers"},"Answers"),(0,r.mdx)("h3",{id:"how-do-i-run-on-a-different-port-than-the-default-ie-8080-for-example"},"How do I run on a different port than the default (ie: 8080 for example)?"),(0,r.mdx)("p",null,"  Use the following syntax:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"npm run start -- --port 8080\n")),(0,r.mdx)("h3",{id:"is-yarn-supported-with-the-cli-or-only-npm"},"Is ",(0,r.mdx)("inlineCode",{parentName:"h3"},"yarn")," supported with the CLI, or only ",(0,r.mdx)("inlineCode",{parentName:"h3"},"npm"),"?"),(0,r.mdx)("p",null,"We recommend using ",(0,r.mdx)("inlineCode",{parentName:"p"},"npm")," for running the CLI scripts. Note that while there might be workarounds to get ",(0,r.mdx)("inlineCode",{parentName:"p"},"yarn")," working, we do not recommend it, or support any issues that may arise using ",(0,r.mdx)("inlineCode",{parentName:"p"},"yarn"),"."),(0,r.mdx)("h3",{id:"how-do-i-save-the-state-of-my-add-on"},"How do I save the state of my add-on?"),(0,r.mdx)("p",null,"  The add-on's state is reset quite frequently (changing panels, changing viewport widths etc), so one may want to save state to ",(0,r.mdx)("a",{parentName:"p",href:"."},"ClientStorage")," and use that to restore state when the add-on loads. For example, if the user has to navigate into a deep folder hierarchy, they may not want to repeat that again just because they clicked the media panel to add a shape. Or if they are editing a form (e.g., an AI prompt), they may not want to lose that content when they navigated to another panel for a moment. When it makes sense to store a lot of UI state (and when it doesn't) is highly dependent upon the add-on's use case."),(0,r.mdx)("h3",{id:"how-do-i-use-top-level-await-while-using-webpack"},"How do I use top level ",(0,r.mdx)("inlineCode",{parentName:"h3"},"await")," while using webpack?"),(0,r.mdx)("p",null,"  Set ",(0,r.mdx)("inlineCode",{parentName:"p"},"experiments: { topLevelAwait: true}")," in the webpack config file (otherwise you'll get a build error)."),(0,r.mdx)("h3",{id:"how-do-i-setup-webpack-to-copy-new-files-or-folders-into-dist"},"How do I setup webpack to copy new files or folders into ",(0,r.mdx)("inlineCode",{parentName:"h3"},"dist"),"?"),(0,r.mdx)("p",null,"  If you add any folders, (like images for example), to your ",(0,r.mdx)("inlineCode",{parentName:"p"},"src"),", you can update the ",(0,r.mdx)("inlineCode",{parentName:"p"},"webpack.config.js")," ",(0,r.mdx)("inlineCode",{parentName:"p"},"CopyWebpackPlugin")," section within to ensure those new resources added are copied into the ",(0,r.mdx)("inlineCode",{parentName:"p"},"dist")," folder. For instance, in the following, the 3rd line was added to ensure any ",(0,r.mdx)("inlineCode",{parentName:"p"},".jpg")," files in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"src/images")," folder get copied over:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'new CopyWebpackPlugin({\n      patterns: [\n            { from: "src/*.json", to: "[name][ext]" },\n            { from: "src/*.png", to: "[name][ext]" },\n            { from: "src/images/*.jpg", to: "images/[name][ext]" },\n      ],\n});\n')),(0,r.mdx)("h3",{id:"my-form-submission-doesnt-work-and-the-devtools-console-shows-the-error---blocked-form-submission-to---because-the-forms-frame-is-sandboxed-and-the-allow-forms-permission-is-not-set-whats-wrong"},"My form submission doesn't work and the devtools console shows the error - \"Blocked form submission to \" \" because the form's frame is sandboxed and the 'allow-forms' permission is not set.\" What's wrong?\""),(0,r.mdx)("p",null,"  You can call ",(0,r.mdx)("inlineCode",{parentName:"p"},"preventDefault")," on the submit event to prevent the browser from trying to complete the full form submission process and avoid this error, such as:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"<form onSubmit={ evt => {                  \n      evt.preventDefault();\n}}/>\n")),(0,r.mdx)("p",null,"   ",(0,r.mdx)("strong",{parentName:"p"},"NOTE:")," If the above does not work for you, you can also handle this by adding click handler to the submit button itself instead, and in that call ",(0,r.mdx)("inlineCode",{parentName:"p"},"event.preventDefault")," on the event, such as:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-javascript"},'<form onSubmit={(e) => e.preventDefault()}>\n      <input type="submit" value="Submit" onClick={(e) => e.preventDefault()}/>\n</form>\n')),(0,r.mdx)("h3",{id:"how-do-i-enable-cors-for-a-service-that-blocks-my-add-on-requests-due-to-the-null-origin"},"How do I enable CORS for a service that blocks my add-on requests due to the ",(0,r.mdx)("inlineCode",{parentName:"h3"},"null")," origin?"),(0,r.mdx)("p",null,"  If the service you're consuming is endpoint you can modify the server settings for, you can set the ",(0,r.mdx)("inlineCode",{parentName:"p"},"Access-Control-Allow-Origin")," header to ",(0,r.mdx)("inlineCode",{parentName:"p"},"*")," to allow the requests to pass. If you don't have access to change the headers on the server, you can use a CORS proxy server to bypass this issue while in development. See the ",(0,r.mdx)("a",{parentName:"p",href:"../guides/develop/cors.md"},"CORS Guide")," for more details and specific samples of each."),(0,r.mdx)("h3",{id:"the-windowshowopenfilepicker-api-is-not-working-from-within-my-add-on-why-not"},"The ",(0,r.mdx)("inlineCode",{parentName:"h3"},"Window.showOpenFilePicker()")," API is not working from within my add-on, why not?"),(0,r.mdx)("p",null,"  You can open the file picker using the ",(0,r.mdx)("inlineCode",{parentName:"p"},"input")," element with a ",(0,r.mdx)("inlineCode",{parentName:"p"},"type")," set to ",(0,r.mdx)("inlineCode",{parentName:"p"},"file")," to get around this."),(0,r.mdx)("h3",{id:"im-not-able-to-load-the-add-on-in-the-browser-anymore-when-i-click-on-connect-i-get-an-error-err_cert_authority_invalid"},'I’m not able to load the add-on in the browser anymore. When I click on "Connect”, I get an error ',(0,r.mdx)("inlineCode",{parentName:"h3"},"ERR_CERT_AUTHORITY_INVALID"),"."),(0,r.mdx)("p",null,"  This usually indicates an issue with invalid SSL credentials. Locate the ",(0,r.mdx)("inlineCode",{parentName:"p"},"devcert")," folder which can be found at ",(0,r.mdx)("inlineCode",{parentName:"p"},"/Users/{your_username}/Library/Application\\ Support/devcert")," on MAC or ",(0,r.mdx)("inlineCode",{parentName:"p"},"C:\\Users\\{your_username}\\AppData\\Local\\"),", delete it, and create an add-on again. You should get the option to create an SSL certificate again when you create the new add-on, which should resolve your problem."),(0,r.mdx)("h3",{id:"i-receive-this-error-when-trying-to-run-my-add-on-error-eisdir-illegal-operation-on-a-directory"},"I receive this error when trying to run my add-on: ",(0,r.mdx)("inlineCode",{parentName:"h3"},"Error: EISDIR: illegal operation on a directory"),"."),(0,r.mdx)("p",null,"  This usually indicates you do not have SSL configured correctly. You can fix it by clearing the configurations from the configuration file. In Windows you'll find this file at ",(0,r.mdx)("inlineCode",{parentName:"p"},"C:\\Users\\{your_username}\\AppData\\Local\\Adobe\\CCWebAddOn\\add-on-preferences.json"),", and on MAC, it's at ",(0,r.mdx)("inlineCode",{parentName:"p"},"/Users/{user}/Library/Application Support/Adobe/CCWebAddOn\\add-on-preferences.json"),". Once you find it, delete the two properties defined for ",(0,r.mdx)("inlineCode",{parentName:"p"},"sslCertPath")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"sslKeyPath")," there. After they've been deleted, you can run the commands to create a new add-on where you will be prompted to set up SSL again and then be sure to specify the correct paths to your certificate and key file. "),(0,r.mdx)("h3",{id:"i-receive-a-manifest_not_found_error-during-the-package-verification-when-trying-to-upload-my-plugin-package-for-distribution"},"I receive a ",(0,r.mdx)("inlineCode",{parentName:"h3"},"MANIFEST_NOT_FOUND_ERROR")," during the package verification when trying to upload my plugin package for distribution."),(0,r.mdx)("p",null,"  Instead of zipping the folder containing the add-on files, please zip only the contents. In other words, manifest file should be at ",(0,r.mdx)("strong",{parentName:"p"},"root")," level of the extracted package."),(0,r.mdx)("h3",{id:"how-can-i-monetize-my-add-on"},"How can I monetize my add-on?"),(0,r.mdx)("p",null,"  At this time, the only way to monetize is by using a third party provider, and ensuring you choose one that provides safety measures, security and proper payment processing. Some options you may want to consider include ",(0,r.mdx)("strong",{parentName:"p"},"Gumroad"),", ",(0,r.mdx)("strong",{parentName:"p"},"Stripe"),", ",(0,r.mdx)("strong",{parentName:"p"},"Paddle")," and ",(0,r.mdx)("strong",{parentName:"p"},"FastSpring"),"."),(0,r.mdx)("h3",{id:"what-does-it-mean-when-an-api-is-considered-experimental"},"What does it mean when an API is considered ",(0,r.mdx)("strong",{parentName:"h3"},"experimental"),"?"),(0,r.mdx)("p",null,"  Experimental APIs are those which have not been declared stable yet, and to try them, first need to set the ",(0,r.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag to ",(0,r.mdx)("inlineCode",{parentName:"p"},"true")," in the ",(0,r.mdx)("a",{parentName:"p",href:"../references/manifest/index.md#requirements"},(0,r.mdx)("inlineCode",{parentName:"a"},"requirements"))," section of the ",(0,r.mdx)("inlineCode",{parentName:"p"},"manifest.json"),". The ",(0,r.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag is ",(0,r.mdx)("strong",{parentName:"p"},"only allowed during development")," and needs to be removed during submission. Experimental APIs should never be used in any add-ons you will be distributing. "),(0,r.mdx)("h3",{id:"what-are-the-supported-file-types-for-exported-content"},"What are the supported file types for exported content?"),(0,r.mdx)("p",null,"  The supported file types for exported content are ",(0,r.mdx)("strong",{parentName:"p"},'"image/jpeg", "image/png", "video/mp4"')," and ",(0,r.mdx)("strong",{parentName:"p"},'"application/pdf"'),"."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-faq-md-8f8497b0bc49c4cd7b56.js.map