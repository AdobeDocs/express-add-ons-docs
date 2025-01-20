---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
title: Managing Premium Content
description:  Managing Premium Content.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

import '/src/styles.css'

# Managing Premium Content

When exporting Adobe Express documents, you should ensure proper handling of premium content. 

Let's go through all the available options to manage the rendition of premium content in case your your add-on allows users to export/download it.

## Showing a Premium Content error with the "Upgrade" option

One way to handle premium content is to display a warning message when the user is not entitled to export/download it, and include a button to allow them to upgrade. Please note that you can detect in advance if the user is entitled to premium content (via [`isPremiumUser()`](../../../references/addonsdk/app-currentUser.md#isPremiumUser)), and whether the page contains premium content (via [`hasPremiumContent`](/references/addonsdk/app-document.md#pagemetadata)) in the first place. A try/catch block intercepting the `"USER_NOT_ENTITLED_TO_PREMIUM_CONTENT"` string in the error message as the primary way to deal with it is no longer recommended.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
const { app, constants } = addOnUISdk;
const { ButtonType, Range, RenditionFormat } = constants;

const showPremiumContentError = async () => {
  // Show a modal dialog with an error message
  const { buttonType } = await window.addOnUISdk.app.showModalDialog({
    variant: "error",
    title: "Export failed",
    description: "Sorry, we were not able to export your design. " + 
      "Some assets are only included in the Premium plan."         +
      "Try replacing with something else "                         +
      "or upgrading Adobe Express to a Premium plan.", 
    buttonLabels: { secondary: "Upgrade" }
  });

  // The User is still not premium
  if (buttonType === ButtonType.cancel) return false; 
  if (buttonType === ButtonType.secondary) {
    // Original flow (don't use anymore)
    // ❌ window.open(
    //     "https://www.adobe.com/go/express_addons_pricing", 
    //     "_blank"
    //   );
    // 👇 Use startPremiumUpgradeIfFreeUser() instead 
    const hasUpgradedToPremium = 
      await app.startPremiumUpgradeIfFreeUser();
	return hasUpgradedToPremium;
  }
}

// Check if the page range is safe to export
const isRangeSafeToExport = async (range) => {
  const userIsPremium = await app.currentUser.isPremiumUser();
  const pages = await app.document.getPagesMetadata({range});
  const containsPremiumContent = 
    pages.some(page => page.hasPremiumContent);
  return (containsPremiumContent && userIsPremium) || 
    !containsPremiumContent;  
}

const exportDocument = async () => {
  // 👇 Testing purposes only! 👇
  app.devFlags.simulateFreeUser = true; // 👈 Remove in production!

  let isSafeToExport = await isRangeSafeToExport(Range.entireDocument);
  if (!isSafeToExport) {
    const isNowPremiumUser = await showPremiumContentError();
    isSafeToExport = isNowPremiumUser;
  }
  
  if (isSafeToExport) {
    try {
      const renditions = await app.document.createRenditions({
        range: Range.entireDocument, format: RenditionFormat.png
      });
      renditions.forEach(rendition => { 
        // do your thing w/ the renditions
      });	  
    } catch (err) {
      // did someone just add premium content in the split second 
      // between our original check? did the user just downgrade?
      if (err.message?.includes("USER_NOT_ENTITLED_TO_PREMIUM_CONTENT")) {
        return await exportDocument(); // try again
      }
    }
  }  
}

document.querySelector("#export").onclick = exportDocument;
```

Please note that [`startPremiumUpgradeIfFreeUser()`](../../../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) allows a more streamlined user experience for upgrading to premium content, compared to the older method of redirecting to the Adobe Express pricing page, which is now deprecated.

## Providing visual cues in the UI

Alternatively, you can provide visual cues directly in the add-on UI to show that users are not entitled to export/download premium content. This can be done in various ways, for instance, by disabling the export/download button, replacing it with an upgrade button, or appending a brief explanation, tooltip, or icon. This would inform users upfront that they are not entitled to export/download premium content, preventing them from facing the warning popup after attempting to do so.

## Allowing only the preview of Premium Content

As mentioned in [Creating Renditions](./creating_renditions.md), you can allow users to preview premium content within the iframe by setting the `renditionIntent` to the constant [`RenditionIntent.preview`](../../../references/addonsdk/addonsdk-constants.md) as the second parameter of the [`addOnUISdk.app.document.createRendition()`](../../../references/addonsdk/app-document.md#createrenditions) method.

<InlineAlert slots="header, text, text1, text2" variant="warning"/>

**IMPORTANT!**

Your add-on must not allow these previewed images to be downloaded or persisted on a backend (for any longer than necessary to serve the result back to the user). To that end, be sure that users cannot:

- **right-click -> save as**: To prevent this, reject the `contextmenu` event.
- **drag the image off the panel**: To prevent this, you can reject the `dragstart` event.

**Note:** These behaviors are enabled by default if you use an `<img>` tag. If you apply the image using `background-image` CSS, these behaviors aren't added.

### Example

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7FAA77FF
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions, 
      addOnUISdk.constants.RenditionIntent.preview
    );
    renditions.forEach(rendition => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  }
  catch(error) {
    console.log("Failed to create renditions:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Wait for the SDK to be ready
await addOnUISdk.ready;
  
// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7FAA77FF
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions, 
      addOnUISdk.constants.RenditionIntent.preview
    );
    renditions.forEach(rendition => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  }
  catch(error) {
    console.log("Failed to create renditions:", error);
  }
}
```