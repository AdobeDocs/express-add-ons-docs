"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[5266],{97604:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return s},default:function(){return h}});var o=t(58168),a=t(80045),d=(t(88763),t(15680)),r=t(83407);const i=["components"],s={},m=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,d.mdx)("div",n)},p=m("InlineAlert"),l=m("CodeBlock"),c={_frontmatter:s},u=r.A;function h(e){let{components:n}=e,t=(0,a.A)(e,i);return(0,d.mdx)(u,(0,o.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,d.mdx)("h2",{id:"importing-content"},"Importing Content"),(0,d.mdx)("p",null,"Importing content into a design is one of the most popular use cases for an add-on. For instance, to add content retrieved from a third-party service or directly from the local hard drive. The following sections cover all of the different types of content that can be imported/added to the document from your add-on."),(0,d.mdx)("h3",{id:"image-content"},"Image Content"),(0,d.mdx)("p",null,"The following example demonstrates how to add an image to the current page. The first function shows how to add an image directly from a ",(0,d.mdx)("inlineCode",{parentName:"p"},"blob")," object, and the second illustrates how to fetch an image via a URL to add. Please also refer to the ",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/addonsdk/app-document.md#methods"},"related SDK Reference section")," and ",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/samples.md"},"code samples")," for more details."),(0,d.mdx)("h4",{id:"add-image-example"},"Add Image Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\n// Wait for the SDK to be ready\nawait addOnUISdk.ready;\n\n// Reference to the active document\nconst { document } = addOnUISdk.app;\n\n// Add image via blob to the current page\nasync function addImageFromBlob(blob) {\n  try {\n    await document.addImage(blob);\n  } catch (error) {\n    console.log("Failed to add the image to the page.");\n  }\n}\n\n// Add image via url to the current page\nasync function addImageFromURL(url) {\n  try {\n    const blob = await fetch(url).then((response) => response.blob());\n    await document.addImage(blob);\n  } catch (error) {\n    console.log("Failed to add the image to the page.");\n  }\n}\n')),(0,d.mdx)("h3",{id:"animated-images"},"Animated Images"),(0,d.mdx)("p",null,"There's a specific method provided in the ",(0,d.mdx)("inlineCode",{parentName:"p"},"AddOnSDK")," to allow you to add animated images (gifs) to the current page as well."),(0,d.mdx)("h4",{id:"add-animated-image-example"},"Add Animated Image Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'// Add animated image(blob) to the current page\nasync function addAnimatedImageFromBlob(blob) {\n  try {\n      await document.addAnimatedImage(blob);\n  }\n  catch(error) {\n      console.log("Failed to add the animated image to the page.");\n  }\n}\n')),(0,d.mdx)(p,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,d.mdx)("p",null,"Refer to the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#image-requirements"},"AddOnSDK Document Reference")," for specific details on supported image and GIF requirements."),(0,d.mdx)("h3",{id:"video-and-audio-content"},"Video and Audio Content"),(0,d.mdx)("p",null,"You can also import video and audio content similarly via the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addvideo"},(0,d.mdx)("inlineCode",{parentName:"a"},"addVideo()"))," and ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#addaudio"},(0,d.mdx)("inlineCode",{parentName:"a"},"addAudio()"))," methods. ",(0,d.mdx)("strong",{parentName:"p"},"Please note:")," the ",(0,d.mdx)("inlineCode",{parentName:"p"},"addAudio()")," method requires an additional ",(0,d.mdx)("inlineCode",{parentName:"p"},"MediaAttributes")," object parameter containing the ",(0,d.mdx)("inlineCode",{parentName:"p"},"title")," of the audio object you're importing. See the example below, as well as the associated ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#methods"},"SDK Reference")," for more details. There's also an ",(0,d.mdx)("a",{parentName:"p",href:"https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/audio-recording-add-on"},(0,d.mdx)("inlineCode",{parentName:"a"},"audio-recording-add-on"))," sample available that you can use as an additional reference."),(0,d.mdx)("h4",{id:"add-audio-example"},"Add Audio Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'async function addAudioFromBlob(blob) {\n  try {\n      await document.addAudio(blob, {title: "Jazzy beats", author: "Jazzy"});\n  }\n  catch(error) {\n      console.log("Failed to add the audio to the page.");\n  }\n}\n\nasync function addAudioFromURL(url) {\n  try {\n      const blob = await fetch(url).then(response => response.blob());\n      await document.addAudio(blob, {title: "Jazzy beats", author: "Jazzy"});\n  }\n  catch(error) {\n      console.log("Failed to add the audio to the page.");\n  }\n')),(0,d.mdx)("h4",{id:"add-video-example"},"Add Video Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'async function addVideoFromBlob(blob) {\n  try {\n      await document.addVideo(blob);\n  }\n  catch(error) {\n      console.log("Failed to add the video to the page.");\n  }\n}\n\nasync function addVideoFromURL(url) {\n  try {\n     const blob = await fetch(url).then(response => response.blob());\n     await document.addVideo(blob);\n  }\n  catch(error) {\n    console.log("Failed to add the video to the page.");\n  }\n}\n')),(0,d.mdx)("h3",{id:"pdfs-and-powerpoint-presentations"},"PDFs and PowerPoint Presentations"),(0,d.mdx)("p",null,"If you need to import/add a PDF or a PowerPoint presentation to the document, you can use the designated import methods for each shown in the examples below."),(0,d.mdx)(p,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,d.mdx)("p",null,(0,d.mdx)("strong",{parentName:"p"},"IMPORTANT:")," The ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#import-content-methods"},(0,d.mdx)("inlineCode",{parentName:"a"},"importPdf()"))," and ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document#import-content-methods"},(0,d.mdx)("inlineCode",{parentName:"a"},"importPresentation()"))," methods are currently ",(0,d.mdx)("strong",{parentName:"p"},(0,d.mdx)("em",{parentName:"strong"},"experimental only"))," and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the ",(0,d.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag to ",(0,d.mdx)("inlineCode",{parentName:"p"},"true")," in the ",(0,d.mdx)("a",{parentName:"p",href:"../../../references/manifest/index.md#requirements"},(0,d.mdx)("inlineCode",{parentName:"a"},"requirements"))," section of the ",(0,d.mdx)("inlineCode",{parentName:"p"},"manifest.json"),"."),(0,d.mdx)("h4",{id:"import-pdf-example"},"Import PDF Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnSDKAPI from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n  \n// Reference to the active document\nconst {document} = AddOnSDKAPI.app;\n \nconst mediaAttributes = {title: "Sample.pdf"}\n \n// Import a PDF. Note this will be imported as a new Adobe Express document.\nfunction importPdf(blob, mediaAttributes) {\n  try {\n    document.importPdf(blob, mediaAttributes);\n  }\n  catch(error) {\n    console.log("Failed to import the pdf.");\n  }\n}\n \n// Import a PDF from a URL. Note this will be imported as a new Adobe Express document.\nasync function importPdfFrom(url) {\n  try {\n    const blob = await fetch(url).then(response => response.blob());\n    document.importPdf(blob, {title: "Sample.pdf"});\n  }\n  catch(error) {\n    console.log("Failed to import the pdf.");\n  }\n}\n')),(0,d.mdx)("h4",{id:"import-presentation-example"},"Import Presentation Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'import AddOnSDKAPI from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n  \n// Reference to the active document\nconst {document} = AddOnSDKAPI.app;\n \nconst mediaAttributes = {title: "Sample.pptx"} // only .pptx file types are supported by Express\n \n// Import a presentation. Note: this will be imported as a new Adobe Express presentation.\nfunction importPresentation(blob, mediaAttributes) {\n  try {\n    document.importPresentation(blob, mediaAttributes);\n  }\n  catch(error) {\n    console.log("Failed to add the presentation to the document.");\n  }\n}\n \n// Import a powerpoint presentation from a URL. Note: this will be imported as a new Adobe Express presentation.\nasync function importPresentationFrom(url) {\n  try {\n    const blob = await fetch(url).then(response => response.blob());\n    document.importPresentation(blob, {title: "Sample.pptx"});\n  }\n  catch(error) {\n    console.log("Failed to add the presentation to document.");\n  }\n}\n')),(0,d.mdx)("h2",{id:"exporting-content"},"Exporting Content"),(0,d.mdx)("p",null,"Another popular feature available for use in your add-on is the ability to export content. For instance, if you want to allow the user to save/download the current design, (or range of a design), with certain export configurations to their local hard drive. Some examples for exporting content are provided below, but also check out the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#createrenditions"},(0,d.mdx)("inlineCode",{parentName:"a"},"createRenditions")," section in the SDK Reference")," for more specific options and details, as well as the ",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/samples.md#export-sample"},"export-sample add-on"),"."),(0,d.mdx)("p",null,"The steps to export content:"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},"Call ",(0,d.mdx)("inlineCode",{parentName:"li"},"createRenditions()")," to get the renditions based on your export configuration options."),(0,d.mdx)("li",{parentName:"ul"},"Convert the ",(0,d.mdx)("inlineCode",{parentName:"li"},"blob")," object returned in the response to a ",(0,d.mdx)("inlineCode",{parentName:"li"},"string")," with the ",(0,d.mdx)("inlineCode",{parentName:"li"},"URL.createObjectURL(blob)")," method."),(0,d.mdx)("li",{parentName:"ul"},"Create or update an anchor ",(0,d.mdx)("inlineCode",{parentName:"li"},"<a>")," element's ",(0,d.mdx)("inlineCode",{parentName:"li"},"href")," value with the URL string from the above step.")),(0,d.mdx)("h3",{id:"basic-example"},"Basic Example"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\nconst response = await addOnUISdk.app.document.createRenditions({\n    range: "currentPage",\n    format: "image/jpeg",\n});\n\nconst downloadUrl = URL.createObjectURL(response[0].blob);\ndocument.getElementById("anchor").href = downloadUrl; \n\n<a href="#" download="download" id="anchor" style="text-decoration: none">\n  <sp-button id="download-button" style="display: none">Download</sp-button>\n</a>\n')),(0,d.mdx)("h3",{id:"premium-content"},"Premium Content"),(0,d.mdx)("p",null,"While the above is a very basic example, add-ons that call ",(0,d.mdx)("inlineCode",{parentName:"p"},"createRenditions")," to export content should ensure proper handling in the case of premium content. There are a few strategies that can be implemented."),(0,d.mdx)("h4",{id:"option-1-show-a-premium-content-error-with-the-upgrade-option"},'Option 1: Show a Premium Content error with the "Upgrade" option'),(0,d.mdx)("p",null,"Display a warning message when the user is not entitled to export/download premium content, and include a button to allow them to upgrade. Please note that you can detect in advance if the user is entitled to premium content (",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/addonsdk/app-currentUser.md#isPremiumUser"},(0,d.mdx)("inlineCode",{parentName:"a"},"isPremiumUser()")),") and whether the page contains premium content (",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/addonsdk/app-document.md#pagemetadata"},(0,d.mdx)("inlineCode",{parentName:"a"},"hasPremiumContent")),") in the first place. A try/catch block intercepting the ",(0,d.mdx)("inlineCode",{parentName:"p"},'"USER_NOT_ENTITLED_TO_PREMIUM_CONTENT"')," string in the error message as the primary way to deal with it is no longer recommended."),(0,d.mdx)("h4",{id:"example"},"Example:"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\nconst { app, constants } = addOnUISdk;\nconst { ButtonType, Range, RenditionFormat } = constants;\n\nconst showPremiumContentError = async () => {\n  const { buttonType } = await window.addOnUISdk.app.showModalDialog({\n    variant: "error",\n    title: "Export failed",\n    description: "Sorry, we were not able to export your design. Some assets are only included in the Premium plan. Try replacing with something else or upgrading Adobe Express to a Premium plan.", \n    buttonLabels: { secondary: "Upgrade" }\n  });\n\n  if (buttonType === ButtonType.cancel) return false; // user is still not premium\n  if (buttonType === ButtonType.secondary) {\n    // Original flow (don\'t use anymore)\n    // ❌ window.open("https://www.adobe.com/go/express_addons_pricing", "_blank")\n    // 👇 Use startPremiumUpgradeIfFreeUser() instead \n    const hasUpgradedToPremium = await app.startPremiumUpgradeIfFreeUser();\n    return hasUpgradedToPremium;\n  }\n}\n\nconst isRangeSafeToExport = async (range) => {\n  const userIsPremium = await app.currentUser.isPremiumUser();\n  const pages = await app.document.getPagesMetadata({range});\n  const containsPremiumContent = pages.some(page => page.hasPremiumContent);\n  return (containsPremiumContent && userIsPremium) || !containsPremiumContent;  \n}\n\nconst exportDocument = async () => {\n  // 👇 Testing purposes only!\n  app.devFlags.simulateFreeUser = true; // Remove this line in production!\n\n  let isSafeToExport = await isRangeSafeToExport(Range.entireDocument);  \n  if (!isSafeToExport) {\n    const isNowPremiumUser = await showPremiumContentError();\n    isSafeToExport = isNowPremiumUser;\n  }\n  \n  if (isSafeToExport) {\n    try {\n      const renditions = await app.document.createRenditions({\n        range: Range.entireDocument, format: RenditionFormat.png\n      });\n      renditions.forEach(rendition => { /* do your thing w/ the renditions */ });     \n    } catch (err) {\n      // did someone just add premium content in the split second between\n      // our original check? did the user just downgrade?\n      if (err.message?.includes("USER_NOT_ENTITLED_TO_PREMIUM_CONTENT")) {\n        return await exportDocument(); // try again\n      }\n    }\n  }  \n}\n\ndocument.querySelector("#export").onclick = exportDocument;\n')),(0,d.mdx)("p",null,"Please note that ",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser"},(0,d.mdx)("inlineCode",{parentName:"a"},"startPremiumUpgradeIfFreeUser()"))," allows a more streamlined user experience for upgrading to premium content, compared to the older method of redirecting to the Adobe Express pricing page, which is now deprecated."),(0,d.mdx)("h4",{id:"option-2-provide-visual-cues-in-the-ui"},"Option 2: Provide visual cues in the UI"),(0,d.mdx)("p",null,"Developers can provide visual cues directly in the add-on UI to show that users are not entitled to export/download premium content. This can be done in various ways, for instance, by disabling the export/download button, replacing it with an upgrade button, or appending a brief explanation, tooltip, or icon. This would inform users upfront that they are not entitled to export/download premium content, preventing them from facing the warning popup after attempting to do so."),(0,d.mdx)("h4",{id:"option-3-allow-preview-of-premium-content"},"Option 3: Allow preview of Premium Content"),(0,d.mdx)("p",null,"Set a ",(0,d.mdx)("inlineCode",{parentName:"p"},"renditionPreview")," intent in the ",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/manifest/index.md#requirements"},"manifest requirements"),", and add an extra argument to the ",(0,d.mdx)("a",{parentName:"p",href:"/express-add-ons-docs/references/addonsdk/app-document.md#createrenditions"},(0,d.mdx)("inlineCode",{parentName:"a"},"createRenditions")," method")," (ie: ",(0,d.mdx)("inlineCode",{parentName:"p"},"RenditionIntent.preview"),") to generate previews that can still use premium content."),(0,d.mdx)("p",null,(0,d.mdx)("strong",{parentName:"p"},"IMPORTANT"),": Your add-on must not allow these previewed images to be downloaded or persisted on a backend (for any longer than necessary to serve the result back to the user). To that end, be sure that users cannot:"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("strong",{parentName:"li"},"right-click -> save as"),": To prevent this, reject the ",(0,d.mdx)("inlineCode",{parentName:"li"},"contextmenu")," event"),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("strong",{parentName:"li"},"drag the image off the panel"),": To prevent this, you can reject the ",(0,d.mdx)("inlineCode",{parentName:"li"},"dragstart")," event")),(0,d.mdx)("p",null,(0,d.mdx)("strong",{parentName:"p"},"Note:")," These behaviors are enabled by default if you use an ",(0,d.mdx)("inlineCode",{parentName:"p"},"<img>")," tag. If you apply the image using ",(0,d.mdx)("inlineCode",{parentName:"p"},"background-image")," CSS, these behaviors aren't added."),(0,d.mdx)("h4",{id:"example-1"},"Example:"),(0,d.mdx)(l,{slots:"heading, code",repeat:"2",languages:"JavaScript, TypeScript",mdxType:"CodeBlock"}),(0,d.mdx)("h4",{id:"javascript"},"JavaScript"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-js"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n\n// Wait for the SDK to be ready\nawait addOnUISdk.ready;\n\n// Display preview of all pages in the AddOn UI\nasync function displayPreview() {\n  try {\n    const renditionOptions = {\n      range: addOnUISdk.constants.Range.entireDocument,\n      format: addOnUISdk.constants.RenditionFormat.png,\n      backgroundColor: 0x7FAA77FF\n    };\n    const renditions = await addOnUISdk.app.document.createRenditions(renditionOptions, addOnUISdk.constants.RenditionIntent.preview);\n    renditions.forEach(rendition => {\n      const image = document.createElement("img");\n      image.src = URL.createObjectURL(rendition.blob);\n      document.body.appendChild(image);\n    });\n  }\n  catch(error) {\n    console.log("Failed to create renditions:", error);\n  }\n}\n')),(0,d.mdx)("h4",{id:"typescript"},"TypeScript"),(0,d.mdx)("pre",null,(0,d.mdx)("code",{parentName:"pre",className:"language-ts"},'import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";\n \n// Wait for the SDK to be ready\nawait addOnUISdk.ready;\n  \n// Display preview of all pages in the AddOn UI\nasync function displayPreview() {\n  try {\n    const renditionOptions: PngRenditionOptions = {\n      range: addOnUISdk.constants.Range.entireDocument,\n      format: addOnUISdk.constants.RenditionFormat.png,\n      backgroundColor: 0x7FAA77FF\n    };\n    const renditions = await addOnUISdk.app.document.createRenditions(renditionOptions, addOnUISdk.constants.RenditionIntent.preview);\n    renditions.forEach(rendition => {\n      const image = document.createElement("img");\n      image.src = URL.createObjectURL(rendition.blob);\n      document.body.appendChild(image);\n    });\n  }\n  catch(error) {\n    console.log("Failed to create renditions:", error);\n  }\n}\n')))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-develop-use-cases-content-management-md-736dd6c2cf5fdb5d4f9c.js.map