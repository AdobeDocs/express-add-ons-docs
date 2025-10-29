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
  - Premium
  - Content
  - isPremiumUser
  - startPremiumUpgradeIfFreeUser
title: Manage Premium Content
description: Manage Premium Content.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I check if a user has premium access?"
      answer: 'Call `await addOnUISdk.app.currentUser.isPremiumUser()` to check premium user status.'

    - question: "How do I check if a page contains premium content?"
      answer: 'Use `page.hasPremiumContent` property from `getPagesMetadata()` results.'

    - question: "How do I handle premium upgrade flow?"
      answer: 'Call `await addOnUISdk.app.startPremiumUpgradeIfFreeUser()` instead of redirecting to pricing page.'

    - question: "How do I allow preview-only of premium content?"
      answer: 'Use `RenditionIntent.preview` and add `"renditionPreview": true` to manifest requirements.'

    - question: "What error indicates premium content restriction?"
      answer: 'Look for `"USER_NOT_ENTITLED_TO_PREMIUM_CONTENT"` in error messages.'

    - question: "How should I prevent preview downloads?"
      answer: 'Reject `contextmenu` and `dragstart` events, or use CSS background-image instead of img tags.'

    - question: "Should I still use try/catch for premium errors?"
      answer: 'Check user status and page content first; use try/catch only as fallback for edge cases.'

    - question: "What are good UI patterns for premium content?"
      answer: 'Disable export buttons, show upgrade buttons, add tooltips, or display premium content indicators.'
---

import '/src/styles.css'

# Manage Premium Content

When exporting Adobe Express documents, you should ensure proper handling of Premium content.

Let's go through all the available options to manage the rendition of Premium content in case your add-on allows users to export or download it.

## Show a Premium Content error with the "Upgrade" option

One way to handle premium content is to display a warning message when the user is not entitled to export or download it, and include a button to allow them to upgrade. Please note that you can detect in advance if the user is entitled to Premium content (via [`isPremiumUser()`](../../../references/addonsdk/app-current-user.md#isPremiumUser)), and whether the page contains Premium content (via [`hasPremiumContent`](/references/addonsdk/app-document.md#pagemetadata)) in the first place. A try/catch block intercepting the `"USER_NOT_ENTITLED_TO_PREMIUM_CONTENT"` string in the error message as the primary way to deal with it is no longer recommended.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
const { app, constants } = addOnUISdk;
const { ButtonType, Range, RenditionFormat } = constants;

const showPremiumContentError = async () => {
  // Show a modal dialog with an error message
  const { buttonType } = await window.addOnUISdk.app.showModalDialog({
    variant: "error",
    title: "Export failed",
    description:
      "Sorry, we were not able to export your design. " +
      "Some assets are only included in the Premium plan." +
      "Try replacing with something else " +
      "or upgrading Adobe Express to a Premium plan.",
    buttonLabels: { secondary: "Upgrade" },
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
    const hasUpgradedToPremium = await app.startPremiumUpgradeIfFreeUser();
    return hasUpgradedToPremium;
  }
};

// Check if the page range is safe to export
const isRangeSafeToExport = async (range) => {
  const userIsPremium = await app.currentUser.isPremiumUser();
  const pages = await app.document.getPagesMetadata({ range });
  const containsPremiumContent = pages.some((page) => page.hasPremiumContent);
  return (containsPremiumContent && userIsPremium) || !containsPremiumContent;
};

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
        range: Range.entireDocument,
        format: RenditionFormat.png,
      });
      renditions.forEach((rendition) => {
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
};

document.querySelector("#export").onclick = exportDocument;
```

Please note that [`startPremiumUpgradeIfFreeUser()`](../../../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) allows a more streamlined user experience for upgrading to premium content, compared to the older method of redirecting to the Adobe Express pricing page, which is now deprecated.

## Provide visual cues in the UI

Alternatively, you can provide visual cues directly in the add-on UI to show that users are not entitled to export/download premium content. This can be done in various ways, for instance, by disabling the export/download button, replacing it with an upgrade button, or appending a brief explanation, tooltip, or icon. This would inform users upfront that they are not entitled to export/download premium content, preventing them from facing the warning popup after attempting to do so.

## Allow only the preview of Premium Content

As mentioned in [Creating Renditions](./create-renditions.md), you can allow users to preview Premium content within the iframe by setting the `renditionIntent` to the constant [`RenditionIntent.preview`](../../../references/addonsdk/addonsdk-constants.md) as the second parameter of the [`addOnUISdk.app.document.createRendition()`](../../../references/addonsdk/app-document.md#createrenditions) method. Remember to also add the [`"renditionPreview"`](./create-renditions.md#the-preview-intent) permission to your add-on's `manifest.json` file.

<InlineAlert slots="header, text, text1, text2" variant="warning"/>

### Prevent previews download

Your add-on must not allow these previewed images to be downloaded or persisted on a backend (for any longer than necessary to serve the result back to the user). To that end, be sure that users cannot:

- **right-click -> save as**: To prevent this, reject the `contextmenu` event.
- **drag the image off the panel**: To prevent this, you can reject the `dragstart` event.

**Note:** These behaviors are enabled by default if you use an `<img>` tag. If you apply the image using `background-image` CSS, these behaviors aren't added.

### Example

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7faa77ff,
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions,
      addOnUISdk.constants.RenditionIntent.preview
    );
    renditions.forEach((rendition) => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  } catch (error) {
    console.log("Failed to create renditions:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

// Display preview of all pages in the AddOn UI
async function displayPreview() {
  try {
    const renditionOptions: PngRenditionOptions = {
      range: addOnUISdk.constants.Range.entireDocument,
      format: addOnUISdk.constants.RenditionFormat.png,
      backgroundColor: 0x7faa77ff,
    };
    const renditions = await addOnUISdk.app.document.createRenditions(
      renditionOptions,
      addOnUISdk.constants.RenditionIntent.preview
    );
    renditions.forEach((rendition) => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(rendition.blob);
      document.body.appendChild(image);
    });
  } catch (error) {
    console.log("Failed to create renditions:", error);
  }
}
```

## FAQs

#### Q: How do I check if a user has premium access?

**A:** Call `await addOnUISdk.app.currentUser.isPremiumUser()` to check premium user status.

#### Q: How do I check if a page contains premium content?

**A:** Use `page.hasPremiumContent` property from `getPagesMetadata()` results.

#### Q: How do I handle premium upgrade flow?

**A:** Call `await addOnUISdk.app.startPremiumUpgradeIfFreeUser()` instead of redirecting to pricing page.

#### Q: How do I allow preview-only of premium content?

**A:** Use `RenditionIntent.preview` and add `"renditionPreview": true` to manifest requirements.

#### Q: What error indicates premium content restriction?

**A:** Look for `"USER_NOT_ENTITLED_TO_PREMIUM_CONTENT"` in error messages.

#### Q: How should I prevent preview downloads?

**A:** Reject `contextmenu` and `dragstart` events, or use CSS background-image instead of img tags.

#### Q: Should I still use try/catch for premium errors?

**A:** Check user status and page content first; use try/catch only as fallback for edge cases.

#### Q: What are good UI patterns for premium content?

**A:** Disable export buttons, show upgrade buttons, add tooltips, or display premium content indicators.
