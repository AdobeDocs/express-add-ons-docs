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
    - Add-on Manifest
    - AddOnSdk
title: Changelog
description: Contains a running log of changes to the add-on documentation, SDK, CLI, etc.
contributors:
    - https://github.com/hollyschinsky
    - https://github.com/undavide
---

# Changelog

## 2024-11-04

- Adds a new [Cross-origin Isolation Handling](../guides/develop/coi.md) page which describes an upcoming change to how Adobe Express enforces cross-origin isolation, and the impact it may have on current add-ons, as well as those currently in-development.
- Updates the descriptions for the [`importPdf()`](./addonsdk/app-document.md#importpdf) and [`importPresentation()`](./addonsdk/app-document.md#importpresentation) functions to clarify that when used, the associated PDF or presentation file will be imported as a new Adobe Express document.

## 2024-09-30

### New

- Added many new **Text APIs** for improved text management.
- [`TextNode.fullContent`](./document-sandbox/document-apis/classes/text-node.md#fullcontent) accessor: returns the [`TextContentModel`](./document-sandbox/document-apis/classes/text-content-model.md) containing the complete text string and its styles associated to the Text Flow (Threaded Text or Overflow Text).
- [`TextNode.nextTextNode`](./document-sandbox/document-apis/classes/text-node.md#nexttextnode) accessor: gets the next node that overflowing text will spill into.
- [`TextNode.layout`](./document-sandbox/document-apis/classes/text-node.md#layout) accessor: gets and sets the [`TextType`](./document-sandbox/document-apis/enumerations/text-type.md) of the text node frame.
- [`TextNode.visualEffects`](./document-sandbox/document-apis/classes/text-node.md#visualeffects) accessor: list of [`VisualEffectType`](./document-sandbox/document-apis/enumerations/visual-effect-type.md) applied to the text node.
- [`TextContentModel.characterStyleRanges`](./document-sandbox/document-apis/classes/text-content-model.md#characterstyleranges) accessor: list of [character style](./document-sandbox/document-apis/interfaces/character-styles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/character-styles.md#color), [`font`](./document-sandbox/document-apis/interfaces/character-styles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/character-styles.md#font), [`fontSize`](./document-sandbox/document-apis/interfaces/character-styles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/character-styles.md#fontsize), [`tracking`](./document-sandbox/document-apis/interfaces/character-styles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/character-styles.md#tracking) and [`underline`](./document-sandbox/document-apis/interfaces/character-styles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/character-styles.md#underline) properties.
- [AvailableFont](./document-sandbox/document-apis/classes/available-font.md) and [UnavailableFont](./document-sandbox/document-apis/classes/unavailable-font.md) classes.
- Supporting interfaces, enumerations and type aliases.
- Added **Per Element Metadata APIs**: with this feature, add-ons can store private metadata to any node of the Express document. This metadata is accessible only to the add-on that has set it. See the [`AddOnData`](./document-sandbox/document-apis/classes/add-on-data.md) class and the [`addOnData`](./document-sandbox/document-apis/classes/base-node.md#addondata) accessor for the BaseNode class.
- Added **Selection Change Notification Events APIs**: add-on can register to be notified when selection and properties in the selection changes on the document. The [`Context`](./document-sandbox/document-apis/classes/context.md) class will expose two [`on()`](./document-sandbox/document-apis/classes/context.md#on) and [`off()`](./document-sandbox/document-apis/classes/context.md#off) methods which can be used to register and un-register selection change and selection properties change notifications.
- Added a new [`GridCellNode`](./document-sandbox/document-apis/classes/grid-cell-node.md) class that represents a **cell in a grid**.


<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This round of new APIs is currently ***experimental only*** with the exception of `TextNode.fullContent.text`, and should not be used in any add-ons you will be distributing until it has been declared stable. To use them, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the `manifest.json`.

### Fixed

- [`GridLayoutNode.allChildren`](../references/document-sandbox/document-apis/classes/grid-layout-node.md#allchildren) does not include rectangle nodes.

### Deprecated

- [`TextNode.text`](../references/document-sandbox/document-apis/classes/text-node.md#text) is now deprecated; it is still working, but will be removed in a future update. Please use [`TextNode.fullContent.text`](../references/document-sandbox/document-apis/classes/text-node.md#fullcontent) instead.

## 2024-09-24

- Adds a new [`addAnimatedImage()`](./addonsdk/app-document.md#addanimatedimage) method which can be used to add **animated GIF** images to the document (as long as they fit within certain [technical constraints](./addonsdk/app-document.md#image-requirements)).
-   Adds a new [`importPdf()`](./addonsdk/app-document.md#importpdf) method which can be used to import a PDF as a new Adobe Express document.
-   Adds a new [`importPresentation()`](./addonsdk/app-document.md#importpresentation) method which can be used to import a Powerpoint as a new Adobe Express document.
- Adds notes about specific support and handling for animated GIF images when [importing](./addonsdk/app-document.md#addimage) and [dragging content](./addonsdk/addonsdk-app.md#enabledragtodocument). This includes a [new FAQ item](../guides/faq.md#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document) summarizing the associated use cases.
- Adds all of the new methods mentioned above to the [content management](../guides/develop/use-cases/content-management.md) use case page with example code snippets for each.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The [`importPdf()`](./addonsdk/app-document.md#importpdf) and [`importPresentation()`](./addonsdk/app-document.md#importpresentation) methods are currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the `manifest.json`.


## 2024-09-10

- Added a new [`replaceMedia()`](./document-sandbox/document-apis/classes/media-container-node.md.md#replacemedia) method to the `MediaContainerNode` class that can be used to replace existing media inline.
- Refactoring done to the [`Stroke`](./document-sandbox/document-apis/interfaces/stroke.md) APIs.

## 2024-07-22

- Added a new [`format`](../references/addonsdk/app-ui.md#format) property to the `addOnUISdk.app.ui` object that reflects the format used to display dates, times, numbers, etc. in the user's environment. It supports a [`"formatchange"`](../references/addonsdk/app-ui.md#formatchange) event triggered when the format changes—see an example in the [Locale, Supported Locales, and Format](../guides/develop/use-cases/environment-settings.md#detecting-locale-supported-locales-and-format) section.
- Removed `mobile` and `app` as [`supportedDeviceClass`](../references/manifest/index.md#requirementsappssupporteddeviceclass) values in the Manifest's `requirements.apps` object.

## 2024-05-28

- Added a new *experimental* [`openEditorPanel()`](../references/addonsdk/app-ui.md#openeditorpanel) API to programmatically open and interact with the Editor panel. This method of the `addOnUISdk.app.ui` allows navigation to specific tabs and collections, as well as performing content searches. The [Constants](../references/addonsdk/addonsdk-constants.md) page has been updated accordingly.
- Added a new [`Cross-Origin-Embedder-Policy`](../guides/faq.md#how-do-i-prevent-my-iframe-content-from-being-blocked-due-to-cross-origin-issues) FAQ.

## 2024-05-21

- The [Quickstart](../guides/getting-started/quickstart.md) and [Distribute](../guides/distribute/index.md) guides have been updated to reflect major UI/UX improvements for in-app workflows, particularly around distribution and listing management.
- The Add-ons tab is now active also in the Adobe Express home page, regardless of whether a project is open or not.
- A new section on Marketplace [rejections](/guides/distribute/rejections.md) has been added, highlighting the most common problems found during the add-on review process and how to avoid them.
- The [Manifest Reference](./manifest/index.md) has been updated with two new permission properties: `microphone` and `camera`.

## 2024-04-10

- A new [`VisualNode`](./document-sandbox/document-apis/classes/visual-node.md) class has been added to the Document APIs, and represents any node that can be visually perceived in the content.
- New Document APIs have been added:
- [`currentPage`](./document-sandbox/document-apis/classes/context.md#currentpage) Context accessor: returns the active page.
- [`visualRoot`](./document-sandbox/document-apis/classes/visual-node.md#visualroot) accessor: the highest ancestor that still has visual presence in the document—typically, an Artboard.
- [`cloneInPlace()`](./document-sandbox/document-apis/classes/page-node.md#cloneinplace) method: clones a Page, all artboards within it, and all content within those artboards.
- Support to Bounds has been added in several classes: [`boundsInParent`](./document-sandbox/document-apis/classes/node.md#boundsinparent); `boundsLocal` (for both [GroupNode](./document-sandbox/document-apis/classes/group-node.md#boundslocal) and [VisualNode](./document-sandbox/document-apis/classes/visual-node.md#boundslocal)); [`centerPointLocal`](./document-sandbox/document-apis/classes/visual-node.md#centerpointlocal); [`topLeftLocal`](./document-sandbox/document-apis/classes/visual-node.md#topleftlocal); [`boundsInNode()`](./document-sandbox/document-apis/classes/node.md#boundsinnode); [`localPointInNode()`](./document-sandbox/document-apis/classes/visual-node.md#localpointinnode);
- The CLI has been updated to release version `2.0.0`, and includes the following:
- Periodic login and EULA consent are no longer required.
- Two new templates for creating add-ons with built-in support to Spectrum Web Components have been added and documented: `swc-javascript` and `swc-javascript-with-document-sandbox`. Typescript templates have been renamed to `swc-typescript` and `swc-typescript-with-document-sandbox`. See [this page](../guides/getting-started/dev-tooling.md#templates) for details on all the available templates.
- Typings have been updated to include the latest SDK changes, and other internal packages are now at version `2.0.0`.

**NOTE:** The new version should be installed by default when you create a new add-on. If, for any reason, it doesn't, you can force it to install by clearing the `npx` cache first with `npx clear-npx-cache` or by specifying the version in the command, i.e.: `npx @adobe/create-ccweb-add-on@2.0.0 my-add-on`.

- The [Samples](../samples.md) page has been updated to document the existing add-ons in the [`express-add-on-samples`](https://github.com/AdobeDocs/express-add-on-samples) repository, including a newly added [`audio-recording-addon`](../samples.md#audio-recording-addon).
- The [Common Use Cases](../guides/develop/use-cases) section has been refactored as a sub-menu, grouping similar topics into individual pages. A new [Login and Logout flows](../guides/develop/use-cases/authentication-authorization.md#login-and-logout-flows) section has been added. Other minor fixes and improvements have been made to the documentation.

## 2024-03-19

- Support for Ps and Ai files to be added to the page via the [`addImage()`](../references/addonsdk/app-document.md#addimage) method. (Note: there were no changes to the drag-n-drop APIs).
- Adds new `MediaAttributes` parameter to the [`addImage()`](../references/addonsdk/app-document.md#addimage) method for Ps/Ai file types to pass media attributes like `title`.
- Adds new [`Mp4RenditionOptions`](../references/addonsdk/app-document.md#mp4renditionoptions) object to support `mp4` renditions.
- Adds new [`VideoResolution`](../references/addonsdk/addonsdk-constants.md) constant to set video resolution options.
- Adds [`registerIframe()`](../references/addonsdk/addonsdk-app.md#registeriframe) method and [`unregisterIframe`](../references/addonsdk/addonsdk-app.md#unregisteriframe-type-definition) type definition with example usage. **NOTE:** These APIs are currently experimental.

## 2024-03-08

- [`getPagesMetadata()`](../references/addonsdk/app-document.md#getpagesmetadata), [`startPremiumUpgradeIfFreeUser`](../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) and [`isPremiumUser`](../references/addonsdk/app-current-user.md#ispremiumuser) have been moved to stable and no longer require the `experimentalApis` flag to be set.
- New examples have been added to the [use cases guide](../guides/develop/use-cases/content-management.md#premium-content) for handling premium content.
- A new video has been added to the [grids tutorial](../guides/tutorials/grids-addon.md) to help guide developers in building the grids add-on.

## 2024-02-21

- New support for [monetization details](../guides/distribute/public-dist.md#step-8-enter-the-monetization-details) has been added to the public distribution flow and allows you to [provide details around monetization options](../guides/distribute/public-dist.md#step-8-enter-the-monetization-details) your add-on supports. A selection will now be required when you submit a new add-on to the marketplace or update an existing one. The options include *free*, *one-time payment*, *recurring subscription*, *micro-transactions*, and *other*.

In addition, the [monetization guidelines](../guides/distribute/guidelines/monetization.md) were updated with details to help guide you in communicating your monetization strategy, and include new branding [badges](../guides/distribute/guidelines/monetization.md#branding-assets-for-monetization) you can use to visually indicate when content or features require a purchase or when they are paid and unlocked. Please ensure you review the [updated monetization guidelines](../guides/distribute/guidelines/monetization.md) carefully for specific details. **NOTE:** Adobe does not currently provide a specific monetization feature, but with this update, provides a way for developers to communicate the monetization details of their add-ons.

- The first phase of add-on analytics support has been released, and allows developers to [download insights data](../guides/distribute/public-dist.md#post-submission-details-and-insights) for their published add-ons via the [Download insights](../guides/distribute/public-dist.md#post-submission-details-and-insights) button in the in-app distribution modal.
- A new [Concepts guide](../references/document-sandbox/document-apis/concepts/index.md) was added to the [Document APIs](../references/document-sandbox/document-apis/) section to provide a deep-dive into the architecture and key elements of the Adobe Express Document Object Model (DOM).

## 2024-02-14

- A new `id` accessor has been added to the [`BaseNode`](../references/document-sandbox/document-apis/classes/base-node.md) class in the Document APIs and is inherited by all classes that extend it. The `id` represents a unique identifier that stays the same when the file is closed and reopened, or if the node is moved to a different part of the document.

## 2024-02-07

- A new [`createPath`](../references/document-sandbox/document-apis/classes/editor.md#createpath) method is now available for allowing you to create a path with the Document APIs.
- Updates descriptions in various methods and classes in the [Document APIs](../references/document-sandbox/document-apis/).
- Updates to the [`createRenditions`](../references/addonsdk/app-document.md#createrenditions) API, including a new [`print`](../references/addonsdk/addonsdk-constants.md) option for `RenditionIntent` to be be used for generating a print optimized pdf, and an update to [`PdfRenditionOptions`](../references/addonsdk/app-document.md#pdfrenditionoptions) which exposes the ability to customize each PDF Page Box's (`MediaBox`, `BleedBox`, `CropBox`, `TrimBox`) dimensions using a `pageBoxes` property.
- Updates to the [Using Adobe Spectrum tutorial](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/) with additional details on [why you should use Spectrum CSS variables](../guides/tutorials/spectrum-workshop/part3.md#styling-with-spectrum-css) to style your add-ons, and [additional helpful guidelines for locating and using them](../guides/tutorials/spectrum-workshop/part3.md#layout-and-typography-styling).
- The table of contents in each Document API class/interface/constant has been removed since it was a duplicate of the right side navigation menu.

## 2024-01-31

Added a new tutorial - [Building UIs using Adobe's Spectrum Design System](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/).

## 2024-01-09

### New Experimental APIs

- [`startPremiumUpgradeIfFreeUser()`](../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) experimental API has been added to the [addOnUISdk.app](../references/addonsdk/addonsdk-app.md) object to display the in-app monetization upgrade flow and returns a value indicating whether the user upgraded to premium or not.

- [`isPremiumUser()`](../references/addonsdk/app-current-user.md#ispremiumuser) experimental API has been added to the [addOnUISdk.app.currentUser](../references/addonsdk/app-current-user.md) object to determine if the current user is a premium or free user.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The above new APIs are currently **experimental only** and should not be used in any add-ons you will be distributing until declared stable. To use these APIs, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the `manifest.json`.

### Additional Updates

- A new [`PdfRenditionOptions`](../references/addonsdk/app-document.md#pdfrenditionoptions) object is now available to be used with the the [`createRenditions()` export API](../references/addonsdk/app-document.md#createrenditions) and allows a user to specify an optional [bleed](../references/addonsdk/app-document.md#bleed) object (for printing).
- A new [`isPrintReady`](../references/addonsdk/app-document.md#pagemetadata) property has been added to the [`PageMetadata` API](../references/addonsdk/app-document.md#pagemetadata) to indicate if the page is ready to print.
- Updated the [FAQ](../guides/faq.md#what-mime-type-is-returned-from-a-pdf-that-was-exported-with-the-createrenditions-method) regarding the mime type for exported PDF files. It will now return `application/pdf` (as opposed to `text/plain` from an earlier update).

## 2023-12-07

<InlineAlert slots="text" variant="warning"/>

**BREAKING NEWS:** The [Adobe Express Document Sandbox](../references/document-sandbox/) and all associated APIs have been deemed stable, and **no longer require the `experimentalApis` flag**. As a result, some breaking changes with these experimental APIs were introduced before deeming them stable, and they are summarized below. Please read them thoroughly and update your in-development add-ons as needed. If you run into any issues, please reach out to us on our [Adobe Express Add-on Developer’s Discord channel](http://discord.gg/nc3QDyFeb4) for help.

### Breaking changes (experimental APIs)

Some items in the following list of changes may have been mentioned in recent updates but are being listed in this summary again to serve as a reminder.

- The methods in the [Document API Editor class](../references/document-sandbox/document-apis/classes/editor.md) to create a color fill and stroke have been renamed to [`makeColorFill`](../references/document-sandbox/document-apis/classes/editor.md#makecolorfill) and [`makeStroke`](../references/document-sandbox/document-apis/classes/editor.md#makestroke) respectively.
- `strokes` and `fills` have been renamed to their singular counterpart. (Express does not support multiple strokes or fills). You should use `stroke` and `fill` going forward to access them, and they will no longer be `ItemList` objects, since they represent only a single stroke or fill.