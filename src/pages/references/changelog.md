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
title: What's New
description: Contains a running log of changes to the add-on documentation, SDK, CLI, etc.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
  - https://github.com/nimithajalal
---

# Changelog

## 2025-05-26

### Added

- Added support for retrieving published (shared) document links via the new [`LinkOptions`](./addonsdk/addonsdk-constants.md) enumerable in [`AddOnUISdk.app.document.link()`](../references/addonsdk/app-document.md#link), along with the `documentPublishedLinkAvailable` event, which is triggered when the published link becomes available. Both updates are reflected in the [Document Metadata How-to Guide](../guides/learn/how_to/document_metadata.md).

### Updates

- [`@adobe-ccwebext/ccweb-add-on-sdk-types`](https://github.com/adobe/create-ccweb-add-on/releases): Type Definitions for the CLI have been updated to version `1.17.0`.

## 2025-05-16

### Updated

- We’ve **completely revamped the information architecture** of the site! 🎉 The new structure is designed to make content easier to navigate, whether you’re just getting started or you’ve been building add-ons for a while. This update aims to reduce friction, surface what matters most, and help both newcomers and experienced developers find their way faster. Among the changes, we have:
  - Rebuilt the Guides navigation from scratch, and grouped the content in new sections (Getting Started, Learn, Build, Support).
  - Introduced a new [Developer Journey](../guides/getting_started/developer-journey.md) page.
  - Rewritten and improved the QuickStart guide, now [Hello, World!](../guides/getting_started/hello-world.md)
  - Moved the Tutorials as [Complete Projects](../guides/learn/how_to/tutorials/index.md) within the [How To Guides](../guides/learn/how_to/index.md), now more visible.
  - Regrouped content into the new [Platform Concepts](../guides/learn/platform_concepts/context.md) and [Advanced Topics](../guides/build/advanced-topics/frameworks-libraries-bundling.md) sections.
  - Updated screenshots, added animations, and enhanced the overall site usability.
- **Note:** with the new site structure, some of your bookmarks may be broken. We'll set redirects for the most common links, but please check and update them.
- We're constantly thinking about ways to improve the developer experience; there is more to come, stay tuned and reach out if you want to share your thoughts!

<InlineAlert variant="info" slots="header, text, text2" />

New OAuth2 redirect URI:

As part of the sunsetting of the legacy version, Adobe Express has moved from the `new.express.adobe.com` domain to `express.adobe.com`.

While there are redirects in place, please **add** `https://express.adobe.com/static/oauth-redirect.html` **to the list of allowed redirect URIs** in your OAuth provider configuration in addition to the existing `https://new.express.adobe.com/static/oauth-redirect.html`. For more details, see the [OAuth2 guide](../guides/learn/how_to/oauth2.md#login-and-logout-flows).

## 2025-05-07

### Added

- New [Using Lit & TypeScript Guide](../guides/learn/how_to/tutorials/using-lit-typescript.md) to help developers understand and use Lit and TypeScript in their add-ons.

## 2025-05-05

### Updated

- There are a few notable changes regarding the [Color Picker APIs](./addonsdk/addonsdk-app.md#showcolorpicker), which have now moved to stable:
  - The `initialColor` parameter now accepts a string in `"#RRGGBB[AA]"` format, in addition to the previous HEX number `0xRRGGBB[AA]`—both with optional alpha channel.
  - We fixed the return value of the `ColorPickerEvent.colorChange` event, which now correctly handles the color with or without the alpha channel, depending on the value of the `disableAlphaChannel` parameter.
  - **Breaking change**: the `ColorPickerEvents` enum has been renamed to `ColorPickerEvent` (singular).
- Renamed the TextType enumerable to [`TextLayout`](./document-sandbox/document-apis/enumerations/TextLayout.md) in the Text APIs.

## 2025-04-22

### Updated

- The [Code Playground](../guides/getting_started/code_playground.md) documentation has been updated with details about the new [Script Mode](../guides/getting_started/code_playground.md#how-to-use-script-mode) and [Local Persistence](../guides/getting_started/code_playground.md#saving-your-work) features, as well as additional details around existing features. The updates include:

  - New sections explaining Script Mode and Add-on Mode.
  - Detailed descriptions of the different tabs available in the Add-on mode and what type of code belongs in each.
  - Information about local persistence and session management.
  - Additional guidance on transitioning code between modes.
  - New keyboard shortcuts for improved productivity.

## 2025-04-10

### Added

- New [`link()`](./addonsdk/app-document.md#link) method added to the `AddOnUISdk.app.document` reference and [Document Metadata How-to Guide](../guides/learn/how_to/document_metadata.md). This method retrieves the document link and triggers a `documentLinkAvailable` event when the link is available.
- New [vue-starter](../guides/learn/samples.md#vue-starter) sample add-on to help developers get started using Vue.js in their add-ons.
- Fixes `fromRGB()` method reference in the [Using Color How-to](../guides/learn/how_to/use_color.md).

## 2025-04-03

### Added

- A new [`hasUnavailableFonts()`](./document-sandbox/document-apis/classes/TextContentModel.md#hasunavailablefonts) method is added to [`TextContentModel`](./document-sandbox/document-apis/classes/TextContentModel.md) class, which returns true if the text contains any fonts unavailable to the current user.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The [`hasUnavailableFonts()`](./document-sandbox/document-apis/classes/TextContentModel.md#hasunavailablefonts) is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](./manifest/index.md#requirements) section of the `manifest.json`.

### Updated

The CLI has been updated with the following package versions:

- `@adobe/ccweb-add-on-manifest`: 3.0.0
- `@adobe/create-ccweb-add-on`: 3.0.0
- `@adobe/ccweb-add-on-scaffolder`: 3.0.0
- `@adobe/ccweb-add-on-analytics`: 3.0.0
- `@adobe/ccweb-add-on-core`: 3.0.0
- `@adobe/ccweb-add-on-scripts`: 3.0.0
- `@adobe/ccweb-add-on-ssl`: 3.0.0
- `@adobe/ccweb-add-on-sdk-types`: 1.14.0

**IMPORTANT:** As a result of the above, please be aware of the following:

1. Node-related tooling requirements are now:

- Minimum `node` version: 18
- Minimum `npm` version: 10

2. SSL Certificates:

SSL for hosting add-ons is now managed from the following locations:

- Mac: `/Users/[user]/Library/Application Support/Adobe/CCWebAddOn/devcert`
- Windows: `C:\Users\Administrator\AppData\Local\Adobe\CCWebAddOn\devcert`

After updating `@adobe/ccweb-add-on-scripts` to `3.0.0`, developers will be asked to re-create their SSL certificate.

For a new add-on created using `npx @adobe/create-ccweb-add-on@3.0.0`, a new SSL certificate will be set up one-time.

For removing expired SSL certificate or certificate authority, developers can now run: `npx @adobe/ccweb-add-on-ssl purge`, and re-create them using `npx @adobe/ccweb-add-on-ssl setup --hostname localhost`

3. Spectrum Web Components

- The version of `@swc-react` components in the templates based on React has been updated to `1.0.3`.
- The version of `@spectrum-web-components` components in the templates based on SWC has been updated to `1.1.2`.
- The theme usage has been updated to use the `system` attribute instead of `theme`, ie:

  - SWC: `<sp-theme system="express" color="light"  scale="medium">`
  - React: `<Theme system="express" scale="medium" color="light">`

## 2025-03-21

### Added

- A native Color Picker is available to add-ons via the [`showColorPicker()`](./addonsdk/addonsdk-app.md#showcolorpicker) and [`hideColorPicker()`](./addonsdk/addonsdk-app.md#hidecolorpicker) methods of the `addOnUiSdk.app` object.
- We've updated the [Use Color](../guides/learn/how_to/use_color.md) How-to guide, now including a few examples on the Color Picker.
- A [new section](./ui-components/color-picker.md) has been added to the documentation, which provides a reference for the Adobe Express built-in UI components available to add-ons, like the Color Picker.
- A new version of the `@adobe/ccweb-add-on-sdk-types` package (v1.14.0) has been released for the CLI. Run `npm update` from the root of your add-on project to update to get the latest typings.

## 2025-03-07

### Added

- A new [How-to](../guides/learn/how_to/index.md) section replaces the old Use Cases, expanding it to include more detailed guides on specific topics, like using Text, Color, or Geometry. Each guide includes a brief description, example code snippets, and links to relevant API references.

## 2025-03-06

### Added

- An [FAQ item](../guides/support/faq.md#why-is-the-cli-failing-with-an-invalid-url-error-when-creating-a-new-add-on-on-windows) was added for a known issue found where the CLI is failing on Windows when running certain versions of Node.js. The [FAQ](../guides/support/faq.md#why-is-the-cli-failing-with-an-invalid-url-error-when-creating-a-new-add-on-on-windows) provides a workaround for this issue.

- The following new properties have been added to the AddOnSdk [`PageMetadata`](./addonsdk/app-document.md#pagemetadata) API:

  - [`isBlank`](./addonsdk/app-document.md#pagemetadata): Allows you to check if a page is blank.
  - [`templateDetails`](./addonsdk/app-document.md#pagemetadata): Retrieves details about the template used to create the document.

- A new [`runPrintQualityCheck`](./addonsdk/app-document.md#runprintqualitycheck) method has been added to the AddOnSdk [`App.Document`](./addonsdk/app-document.md) API, which allows you to run a print quality check on the document to ensure that it meets print quality standards.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The [`runPrintQualityCheck()`](./addonsdk/app-document.md#runprintqualitycheck) is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](./manifest/index.md#requirements) section of the `manifest.json`.

## 2025-03-04

### Changed

- Stabilized the following HLAPI's:
  - The [TextNode](./document-sandbox/document-apis/classes/TextNode.md) API's.
  - The [fromPostscriptName()](./document-sandbox/document-apis/classes/Fonts.md#fromPostscriptName) API of [Fonts](./document-sandbox/document-apis/classes/Fonts.md) class.
  - The [TextContentModel](./document-sandbox/document-apis/classes/TextContentModel.md) APIs like [`TextContentModel.characterStyleRanges`](./document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges). The [`experimentalApis`](./manifest/index.md#requirements) flag is no longer required to use these APIs.

## 2025-03-03

### Changed

- The Per Element Metadata APIs have been stabilized. You can refer to the [AddOnData](./document-sandbox/document-apis/classes/AddOnData.md) class for details. The [`experimentalApis`](./manifest/index.md#requirements) flag is no longer required to use these APIs.

- The Selection Change Notification Events APIs have been stabilized. You can refer to the [Context](./document-sandbox/document-apis/classes/Context.md) class, which provides two methods: [`on()`](./document-sandbox/document-apis/classes/Context.md#on) and [`off()`](./document-sandbox/document-apis/classes/Context.md#off). These methods allow you to register and un-register notifications for selection changes and selection properties changes. The [`experimentalApis`](./manifest/index.md#requirements) flag is no longer required to use these APIs.

## 2025-02-26

### Added

**New Feature: [Add-on Icon Auto-Resizing Support](../guides/build/distribute/public-dist.md#step-4-enter-listing-details)**

- Icon Size Requirement: The uploaded icon must be 144 px.
- Auto-Resizing: Once uploaded, the icon will be automatically resized to:
  - Minimized Add-on Module Icon: 36 px
  - Panel Header Icon: 64 px
  - Launchpad Icon: 144 px

**API `paragraphStyleRanges`**

Added new [`TextContentModel.paragraphStyleRanges`](./document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges),i.e. ParagraphStyles API as experimental, to apply styles to different paragraphs of text content.

### Changed

Stabilized [`registerIframe()`](./addonsdk/addonsdk-app.md#registeriframe) and [`openEditorPanel()`](./addonsdk/app-ui.md#openeditorpanel) APIs. The [`experimentalApis`](./manifest/index.md#requirements) flag is no longer required to utilize these APIs.

## 2025-02-17

### Update

- Starting February 17, 2025: Listings will not be visible in the European Union unless trader information is provided.
- Compliance: Trader information will be displayed publicly on listing detail pages to comply with EU Digital Services Act (DSA) regulations.

[Add trader details now.](https://express.adobe.com/add-ons?mode=submission)

### Fixed

- Fixed an issue where the `addAnimatedImage()` API was not working as expected.
- Fixed the technical requirements for GIF; the maximum resolution is 1080px.

## 2025-01-27

### Changed

Stabilized [`importPdf()`](./addonsdk/app-document.md#importpdf) and [`importPresentation()`](./addonsdk/app-document.md#importpresentation) APIs. The [`experimentalApis`](./manifest/index.md#requirements) flag is no longer required to utilize these APIs.

## 2025-01-17

### Added

- A new [`Viewport`](./document-sandbox/document-apis/classes/Viewport.md) class has been added to the Document APIs. [`Viewport`](./document-sandbox/document-apis/classes/Viewport.md) represents the canvas area currently visible on-screen.
- A new API [`bringIntoView`](./document-sandbox/document-apis/classes/Viewport.md#bringIntoView) have been added which adjusts the viewport to make the node's bounds visible on-screen, assuming all bounds are within the artboard bounds.

## 2025-01-13

### Added

- Adds a new section in [Listing Your Add-on guidelines](../guides/build/distribute/guidelines/general/listing.md) which describes how to [add trader details](../guides/build/distribute/guidelines/general/listing.md#trader-details) in the publisher profile.

<InlineAlert variant="warning" slots="text1, text2, text3" />

**Are you an existing developer?**

You must provide trader details by February 16, 2025, to keep your add-on visible and available in Adobe Express for users in the European Union as of February 17, 2025. This trader information will be displayed publicly on your listing detail pages when viewed from EU countries.

[Add trader details now.](https://express.adobe.com/add-ons?mode=submission)

## 2024-11-04

### Added

- Adds a new [Cross-origin Isolation Handling](../guides/build/advanced-topics/coi.md) page which describes an upcoming change to how Adobe Express enforces cross-origin isolation, and the impact it may have on current add-ons, as well as those currently in-development.
- Updates the descriptions for the [`importPdf()`](./addonsdk/app-document.md#importpdf) and [`importPresentation()`](./addonsdk/app-document.md#importpresentation) functions to clarify that when used, the associated PDF or presentation file will be imported as a new Adobe Express document.

## 2024-10-08

- Adds a brand new version of the [UX Guidelines](../guides/build/design/ux_guidelines/introduction.md) for Adobe Express add-ons.
- Removes the experimental warnings for [`addAnimatedImage()`](./addonsdk/app-document.md#addanimatedimage) since it is now stable.
- Adds the `author` property to [`MediaAttributes`](./addonsdk/app-document.md#mediaattributes) to allow it to be used with the [`addAudio()`](./addonsdk/app-document.md#addaudio) API.

## 2024-09-30

### New

- Added many new **Text APIs** for improved text management.
  - [`TextNode.fullContent`](./document-sandbox/document-apis/classes/TextNode.md#fullcontent) accessor: returns the [`TextContentModel`](./document-sandbox/document-apis/classes/TextContentModel.md) containing the complete text string and its styles associated to the Text Flow (Threaded Text or Overflow Text).
  - [`TextNode.nextTextNode`](./document-sandbox/document-apis/classes/TextNode.md#nexttextnode) accessor: gets the next node that overflowing text will spill into.
  - [`TextNode.layout`](./document-sandbox/document-apis/classes/TextNode.md#layout) accessor: gets and sets the [`TextType`](./document-sandbox/document-apis/enumerations/TextLayout.md) of the text node frame.
  - [`TextNode.visualEffects`](./document-sandbox/document-apis/classes/TextNode.md#visualeffects) accessor: list of [`VisualEffectType`](./document-sandbox/document-apis/enumerations/VisualEffectType.md) applied to the text node.
  - [`TextContentModel.characterStyleRanges`](./document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges) accessor: list of [character style](./document-sandbox/document-apis/interfaces/CharacterStyles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/CharacterStyles.md#color), [`font`](./document-sandbox/document-apis/interfaces/CharacterStyles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/CharacterStyles.md#font), [`fontSize`](./document-sandbox/document-apis/interfaces/CharacterStyles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/CharacterStyles.md#fontsize), [`letterSpacing`](./document-sandbox/document-apis/interfaces/CharacterStyles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/CharacterStyles.md#letterSpacing) and [`underline`](./document-sandbox/document-apis/interfaces/CharacterStyles.md) ranges in the text content, controlling the [`color`](./document-sandbox/document-apis/interfaces/CharacterStyles.md#underline) properties.
  - [AvailableFont](./document-sandbox/document-apis/classes/AvailableFont.md) and [UnavailableFont](./document-sandbox/document-apis/classes/UnavailableFont.md) classes.
  - Supporting interfaces, enumerations and type aliases.
- Added **Per Element Metadata APIs**: with this feature, add-ons can store private metadata to any node of the Express document. This metadata is accessible only to the add-on that has set it. See the [`AddOnData`](./document-sandbox/document-apis/classes/AddOnData.md) class and the [`addOnData`](./document-sandbox/document-apis/classes/BaseNode.md#addondata) accessor for the BaseNode class.
- Added **Selection Change Notification Events APIs**: add-on can register to be notified when selection and properties in the selection changes on the document. The [`Context`](./document-sandbox/document-apis/classes/Context.md) class will expose two [`on()`](./document-sandbox/document-apis/classes/Context.md#on) and [`off()`](./document-sandbox/document-apis/classes/Context.md#off) methods which can be used to register and un-register selection change and selection properties change notifications.
- Added a new [`GridCellNode`](./document-sandbox/document-apis/classes/GridCellNode.md) class that represents a **cell in a grid**.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This round of new APIs is currently **_experimental only_** with the exception of `TextNode.fullContent.text`, and should not be used in any add-ons you will be distributing until it has been declared stable. To use them, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](./manifest/index.md#requirements) section of the `manifest.json`.

### Fixed

- [`GridLayoutNode.allChildren`](./document-sandbox/document-apis/classes/GridLayoutNode.md#allchildren) does not include rectangle nodes.

### Deprecated

- [`TextNode.text`](./document-sandbox/document-apis/classes/TextNode.md#text) is now deprecated; it is still working, but will be removed in a future update. Please use [`TextNode.fullContent.text`](./document-sandbox/document-apis/classes/TextNode.md#fullcontent) instead.

## 2024-09-24

- Adds a new [`addAnimatedImage()`](./addonsdk/app-document.md#addanimatedimage) method which can be used to add **animated GIF** images to the document (as long as they fit within certain [technical constraints](./addonsdk/app-document.md#image-requirements)).
- Adds a new [`importPdf()`](./addonsdk/app-document.md#importpdf) method which can be used to import a PDF as a new Adobe Express document.
- Adds a new [`importPresentation()`](./addonsdk/app-document.md#importpresentation) method which can be used to import a Powerpoint as a new Adobe Express document.
- Adds notes about specific support and handling for animated GIF images when [importing](./addonsdk/app-document.md#addimage) and [dragging content](./addonsdk/addonsdk-app.md#enabledragtodocument). This includes a [new FAQ item](../guides/support/faq.md#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document) summarizing the associated use cases.
- Adds all of the new methods mentioned above to the [How-to](../guides/learn/how_to/index.md) section with example code snippets for each.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The [`importPdf()`](./addonsdk/app-document.md#importpdf) and [`importPresentation()`](./addonsdk/app-document.md#importpresentation) methods are currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](./manifest/index.md#requirements) section of the `manifest.json`.

## 2024-09-10

- Added a new [`replaceMedia()`](./document-sandbox/document-apis/classes/MediaContainerNode.md#replacemedia) method to the `MediaContainerNode` class that can be used to replace existing media inline.
- Refactoring done to the [`Stroke`](./document-sandbox/document-apis/interfaces/Stroke.md) APIs.

## 2024-07-22

- Added a new [`format`](./addonsdk/app-ui.md#format) property to the `addOnUISdk.app.ui` object that reflects the format used to display dates, times, numbers, etc. in the user's environment. It supports a [`"formatchange"`](./addonsdk/app-ui.md#formatchange) event triggered when the format changes—see an example in the [Locale, Supported Locales, and Format](../guides/learn/how_to/theme_locale.md) section.
- Removed `mobile` and `app` as [`supportedDeviceClass`](./manifest/index.md#requirementsappssupporteddeviceclass) values in the Manifest's `requirements.apps` object.

## 2024-05-28

- Added a new _experimental_ [`openEditorPanel()`](./addonsdk/app-ui.md#openeditorpanel) API to programmatically open and interact with the Editor panel. This method of the `addOnUISdk.app.ui` allows navigation to specific tabs and collections, as well as performing content searches. The [Constants](./addonsdk/addonsdk-constants.md) page has been updated accordingly.
- Added a new [`Cross-Origin-Embedder-Policy`](../guides/support/faq.md#how-do-i-prevent-my-iframe-content-from-being-blocked-due-to-cross-origin-issues) FAQ.

## 2024-05-21

- The [Quickstart](../guides/getting_started/quickstart.md) and [Distribute](../guides/build/distribute/index.md) guides have been updated to reflect major UI/UX improvements for in-app workflows, particularly around distribution and listing management.
- The Add-ons tab is now active also in the Adobe Express home page, regardless of whether a project is open or not.
- A new section on Marketplace [rejections](/resources/distribute/rejections.md) has been added, highlighting the most common problems found during the add-on review process and how to avoid them.
- The [Manifest Reference](./manifest/index.md) has been updated with two new permission properties: `microphone` and `camera`.

## 2024-04-10

- A new [`VisualNode`](./document-sandbox/document-apis/classes/VisualNode.md) class has been added to the Document APIs, and represents any node that can be visually perceived in the content.
- New Document APIs have been added:
  - [`currentPage`](./document-sandbox/document-apis/classes/Context.md#currentpage) Context accessor: returns the active page.
  - [`visualRoot`](./document-sandbox/document-apis/classes/VisualNode.md#visualroot) accessor: the highest ancestor that still has visual presence in the document—typically, an Artboard.
  - [`cloneInPlace()`](./document-sandbox/document-apis/classes/PageNode.md#cloneinplace) method: clones a Page, all artboards within it, and all content within those artboards.
  - Support to Bounds has been added in several classes: [`boundsInParent`](./document-sandbox/document-apis/classes/Node.md#boundsinparent); `boundsLocal` (for both [GroupNode](./document-sandbox/document-apis/classes/GroupNode.md#boundslocal) and [VisualNode](./document-sandbox/document-apis/classes/VisualNode.md#boundslocal)); [`centerPointLocal`](./document-sandbox/document-apis/classes/VisualNode.md#centerpointlocal); [`topLeftLocal`](./document-sandbox/document-apis/classes/VisualNode.md#topleftlocal); [`boundsInNode()`](./document-sandbox/document-apis/classes/Node.md#boundsinnode); [`localPointInNode()`](./document-sandbox/document-apis/classes/VisualNode.md#localpointinnode);
- The CLI has been updated to release version `2.0.0`, and includes the following:

  - Periodic login and EULA consent are no longer required.
  - Two new templates for creating add-ons with built-in support to Spectrum Web Components have been added and documented: `swc-javascript` and `swc-javascript-with-document-sandbox`. Typescript templates have been renamed to `swc-typescript` and `swc-typescript-with-document-sandbox`. See [this page](../guides/getting_started/local_development/dev_tooling.md#templates) for details on all the available templates.
  - Typings have been updated to include the latest SDK changes, and other internal packages are now at version `2.0.0`.

  **NOTE:** The new version should be installed by default when you create a new add-on. If, for any reason, it doesn't, you can force it to install by clearing the `npx` cache first with `npx clear-npx-cache` or by specifying the version in the command, i.e.: `npx @adobe/create-ccweb-add-on@2.0.0 my-add-on`.

- The [Samples](../guides/learn/samples.md) page has been updated to document the existing add-ons in the [`express-add-on-samples`](https://github.com/AdobeDocs/express-add-on-samples) repository, including a newly added [`audio-recording-addon`](../guides/learn/samples.md#audio-recording-addon).
- The [Common Use Cases](../guides/learn/how_to/index.md) section has been refactored as a sub-menu, grouping similar topics into individual pages. A new [Login and Logout flows](../guides/learn/how_to/oauth2.md#login-and-logout-flows) section has been added. Other minor fixes and improvements have been made to the documentation.

## 2024-03-19

- Support for Ps and Ai files to be added to the page via the [`addImage()`](./addonsdk/app-document.md#addimage) method. (Note: there were no changes to the drag-n-drop APIs).
- Adds new `MediaAttributes` parameter to the [`addImage()`](./addonsdk/app-document.md#addimage) method for Ps/Ai file types to pass media attributes like `title`.
- Adds new [`Mp4RenditionOptions`](./addonsdk/app-document.md#mp4renditionoptions) object to support `mp4` renditions.
- Adds new [`VideoResolution`](./addonsdk/addonsdk-constants.md) constant to set video resolution options.
- Adds [`registerIframe()`](./addonsdk/addonsdk-app.md#registeriframe) method and [`unregisterIframe`](./addonsdk/addonsdk-app.md#unregisteriframe-type-definition) type definition with example usage. **NOTE:** These APIs are currently experimental.

## 2024-03-08

- [`getPagesMetadata()`](./addonsdk/app-document.md#getpagesmetadata), [`startPremiumUpgradeIfFreeUser`](./addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) and [`isPremiumUser`](./addonsdk/app-currentUser.md#ispremiumuser) have been moved to stable and no longer require the `experimentalApis` flag to be set.
- New examples have been added to the [use cases guide](../guides/learn/how_to/premium_content.md) for handling premium content.
- A new video has been added to the [grids tutorial](../guides/learn/how_to/tutorials/grids-addon.md) to help guide developers in building the grids add-on.

## 2024-02-21

- New support for [monetization details](../guides/build/distribute/public-dist.md#step-8-enter-the-monetization-details) has been added to the public distribution flow and allows you to [provide details around monetization options](../guides/build/distribute/public-dist.md#step-8-enter-the-monetization-details) your add-on supports. A selection will now be required when you submit a new add-on to the marketplace or update an existing one. The options include _free_, _one-time payment_, _recurring subscription_, _micro-transactions_, and _other_.

  In addition, the [monetization guidelines](../guides/build/distribute/guidelines/monetization.md) were updated with details to help guide you in communicating your monetization strategy, and include new branding [badges](../guides/build/distribute/guidelines/monetization.md#branding-assets-for-monetization) you can use to visually indicate when content or features require a purchase or when they are paid and unlocked. Please ensure you review the [updated monetization guidelines](../guides/build/distribute/guidelines/monetization.md) carefully for specific details. **NOTE:** Adobe does not currently provide a specific monetization feature, but with this update, provides a way for developers to communicate the monetization details of their add-ons.

- The first phase of add-on analytics support has been released, and allows developers to [download insights data](../guides/build/distribute/public-dist.md#post-submission-details-and-insights) for their published add-ons via the [Download insights](../guides/build/distribute/public-dist.md#post-submission-details-and-insights) button in the in-app distribution modal.
- A new [Concepts guide](../guides/learn/platform_concepts/document-api.md) was added to the [Document APIs](./document-sandbox/document-apis/) section to provide a deep-dive into the architecture and key elements of the Adobe Express Document Object Model (DOM).

## 2024-02-14

- A new `id` accessor has been added to the [`BaseNode`](./document-sandbox/document-apis/classes/BaseNode.md) class in the Document APIs and is inherited by all classes that extend it. The `id` represents a unique identifier that stays the same when the file is closed and reopened, or if the node is moved to a different part of the document.

## 2024-02-07

- A new [`createPath`](./document-sandbox/document-apis/classes/Editor.md#createpath) method is now available for allowing you to create a path with the Document APIs.
- Updates descriptions in various methods and classes in the [Document APIs](./document-sandbox/document-apis/).
- Updates to the [`createRenditions`](./addonsdk/app-document.md#createrenditions) API, including a new [`print`](./addonsdk/addonsdk-constants.md) option for `RenditionIntent` to be be used for generating a print optimized pdf, and an update to [`PdfRenditionOptions`](./addonsdk/app-document.md#pdfrenditionoptions) which exposes the ability to customize each PDF Page Box's (`MediaBox`, `BleedBox`, `CropBox`, `TrimBox`) dimensions using a `pageBoxes` property.
- Updates to the [Using Adobe Spectrum tutorial](https://developer.adobe.com/express/add-ons/docs/resources/tutorials/spectrum-workshop/) with additional details on [why you should use Spectrum CSS variables](../guides/learn/how_to/tutorials/spectrum-workshop/part3.md#styling-with-spectrum-css) to style your add-ons, and [additional helpful guidelines for locating and using them](../guides/learn/how_to/tutorials/spectrum-workshop/part3.md#layout-and-typography-styling).
- The table of contents in each Document API class/interface/constant has been removed since it was a duplicate of the right side navigation menu.

## 2024-01-31

Added a new tutorial - [Building UIs using Adobe's Spectrum Design System](https://developer.adobe.com/express/add-ons/docs/resources/tutorials/spectrum-workshop/).

## 2024-01-09

### New Experimental APIs

- [`startPremiumUpgradeIfFreeUser()`](./addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) experimental API has been added to the [addOnUISdk.app](./addonsdk/addonsdk-app.md) object to display the in-app monetization upgrade flow and returns a value indicating whether the user upgraded to premium or not.

- [`isPremiumUser()`](./addonsdk/app-currentUser.md#ispremiumuser) experimental API has been added to the [addOnUISdk.app.currentUser](./addonsdk/app-currentUser.md) object to determine if the current user is a premium or free user.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The above new APIs are currently **experimental only** and should not be used in any add-ons you will be distributing until declared stable. To use these APIs, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](./manifest/index.md#requirements) section of the `manifest.json`.

### Additional Updates

- A new [`PdfRenditionOptions`](./addonsdk/app-document.md#pdfrenditionoptions) object is now available to be used with the the [`createRenditions()` export API](./addonsdk/app-document.md#createrenditions) and allows a user to specify an optional [bleed](./addonsdk/app-document.md#bleed) object (for printing).
- A new [`isPrintReady`](./addonsdk/app-document.md#pagemetadata) property has been added to the [`PageMetadata` API](./addonsdk/app-document.md#pagemetadata) to indicate if the page is ready to print.
- Updated the [FAQ](../guides/support/faq.md#what-mime-type-is-returned-from-a-pdf-that-was-exported-with-the-createrenditions-method) regarding the mime type for exported PDF files. It will now return `application/pdf` (as opposed to `text/plain` from an earlier update).

## 2023-12-07

<InlineAlert slots="text" variant="warning"/>

**BREAKING NEWS:** The [Adobe Express Document Sandbox](./document-sandbox/) and all associated APIs have been deemed stable, and **no longer require the `experimentalApis` flag**. As a result, some breaking changes with these experimental APIs were introduced before deeming them stable, and they are summarized below. Please read them thoroughly and update your in-development add-ons as needed. If you run into any issues, please reach out to us on our [Adobe Express Add-on Developer’s Discord channel](http://discord.gg/nc3QDyFeb4) for help.

### Breaking changes (experimental APIs)

Some items in the following list of changes may have been mentioned in recent updates but are being listed in this summary again to serve as a reminder.

- The methods in the [Document API Editor class](./document-sandbox/document-apis/classes/Editor.md) to create a color fill and stroke have been renamed to [`makeColorFill`](./document-sandbox/document-apis/classes/Editor.md#makecolorfill) and [`makeStroke`](./document-sandbox/document-apis/classes/Editor.md#makestroke) respectively.
- `strokes` and `fills` have been renamed to their singular counterpart. (Express does not support multiple strokes or fills). You should use `stroke` and `fill` going forward to access them, and they will no longer be `ItemList` objects, since they represent only a single stroke or fill.

  ```js
  // Before
  rectangle.fills.append(rectFill);
  ellipse.fills.append(ellipseFill);

  // After
  rectangle.fill = rectFill;
  ellipse.fill = ellipseFill;
  ```

  - `fill` and `stroke.color` are just a [color object](./document-sandbox/document-apis/interfaces/Color.md) of the form `{ red, green, blue, alpha }`.
  - `stroke` is an object of the form `{ color, width, dashPattern, dashOffset }`

- Color utilities have moved to [`colorUtils`](./document-sandbox/document-apis/classes/ColorUtils.md) instead of `utils`.

  **Old**<br/>
  <del>

  ```js
  import { utils } from "express-document-sdk";
  const color = utils.createColor(1, 0, 0);
  ```

  </del>

  **New**<br/>

  ```js
  import { colorUtils } from "express-document-sdk";

  // any of:
  const color = colorUtils.fromRGB(1, 0, 0); // optional alpha
  const color = colorUtils.fromRGB({ red: 1 , green: 0, blue: 0 };); // optional alpha
  const color = colorUtils.fromHex("#ff0000");
  const color = { red: 1, green: 0, blue: 0, alpha: 1 }; // mandatory alpha
  ```

  - `fromHex` returns a color from a Hex string -- e.g., `colorUtils.fromHex("#FF8040")` or `colorUtils.fromHex("#FF8040FF")` (including the optional alpha);
  - `fromRGB` returns a color from a set of RGB(A) values (0-1) -- e.g., `colorUtils.fromRGB(1,0.5,0.25,1)`.
  - `toHex` converts a color object to a Hex string -- e.g., `colorUtils.toHex(aColor)`.

- `allChildren` returns an `iterator`, not an `Array`. However if you want to use array methods (ie: `Array#map`), you can use `Array.from` to convert it to an array.
- Strokes and fills will no longer _move_ if you add an existing `stroke`/`fill` to another shape (previously the original shape would lose the corresponding `stroke` or `fill`). For example:

  ```js
  // Old way
  const greenFill = editor.createColorFill(colorUtils.fromRGB(0, 0, 1));
  someRect.fills.append(greenFill);
  anotherRect.fills.append(greenFill);
  /* oops, someRect no longer has a green fill, because anotherRect is its parent */
  ```

  versus:

  ```js
  // New way
  const greenFill = editor.makeColorFill(colorUtils.fromRGB(0, 0, 1));
  someRect.fill = greenFill;
  anotherRect.fill = greenFill;
  /* both rectangles have a green fill */
  ```

- Some things that previously didn't make sense will now cause compile errors in typescript, or throw in javascript:
  - Do not assume a node's parent is movable — e.g., an artboard can't be repositioned.
  - Not all shapes support setting `opacity` or `locking` (e.g, the document root or an artboard).
- The `translateX` and `translateY` properties have been replaced by a single translation object.

  ```js
  // old
  rectangle.translateX = 100;
  rectangle.translateY = 20;

  // new
  rectangle.translation = { x: 100, y: 20 }; // both x,y properties are required
  ```

- A new [`BaseNode`](./document-sandbox/document-apis/classes/BaseNode.md) class has been introduced, and [`ContainerNode`](./document-sandbox/document-apis/interfaces/ContainerNode.md) has been moved from a class to an interface.
- The key to load APIs that use the Document APIs has changed, as well as the module names you import APIs from in the [Document Sandbox](./document-sandbox/). The old ones will still work, but the CLI and templates have all been updated to use the new names. Please update your add-ons to use the new ones shown below:

  **Adobe Express Document APIs SDK import**<br/>
  For access to the [Express document and content authoring APIs](./document-sandbox/document-apis/):

  <del>

  ```js
  // Old
  import { editor } from "express";
  ```

  </del>

  ```js
  // New
  import { editor } from "express-document-sdk";
  ```

  **Document Sandbox SDK import**<br/>
  For access to the [document sandbox runtime APIs](./document-sandbox/):

  <del>

  ```js
  // Old
  import AddOnScriptSdk from "AddOnScriptSdk";
  ```

  </del>

  ```js
  // New
  import addOnSandboxSdk from "add-on-sdk-document-sandbox";
  ```

- The [`manifest.json` entry point](./manifest/index.md#entrypoints) for the document sandbox script code reference was renamed from `script` to `documentSandbox`, as shown below:

  ```json
    "entryPoints": [
          {
              "type": "panel",
              "id": "panel1",
              "main": "index.html",
              "documentSandbox": "code.js" // used to be "script": "code.js"
          }
      ]
  ```

- The [`apiProxy()`](./addonsdk/instance-runtime.md#apiproxy) method in the [`addOnSandboxSdk.instance.runtime`](./addonsdk/addonsdk-instance.md#objects) object now accepts `"documentSandbox"` as a parameter when referring to the entry point in the manifest where your document sandbox code resides, instead of `"script"`.
- The [`RuntimeType`](./addonsdk/addonsdk-constants.md) constant now uses the value of `"documentSandbox"` in lieu of `"script"`.

  **IMPORTANT:** The above updates should be considered breaking changes, so any add-ons in development that relied on the experimental APIs may not work correctly until you make changes to use the new/updated ones above. The intention was to ensure these important changes were made prior to marking the APIs stable to 1) make them more intuitive for developers, 2) significantly improve the process of working with colors, strokes and fills, and 3) prevent certain operations from corrupting the document.

- The CLI has been updated to release version `1.1.1`, and includes the following:

  - The document sandbox templates have been updated to reflect all of the latest changes to the [Document Sandbox APIs](./document-sandbox/), and the `experimentalApis` flag has been removed. Please review the updated [references](./document-sandbox/) and changelog entries thoroughly for details on all of the recent changes. You may also want to refer to the [document sandbox code samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) for additional help on how to use them.
  - Typings support has been added to the `javascript` templates to enable intellisense features.
  - Manifest property additions.
  - General improvements and bug fixes.

  **NOTE:** The new version should be installed by default when you create a new add-on. If, for any reason, it doesn't, you can force it to install by clearing the npx cache first with `npx clear-npx-cache` or by specifying the version in the command, i.e.: `npx @adobe/create-ccweb-add-on@1.1.1 my-add-on`. You can update any existing add-ons to use this new version by updating the version of the `ccweb-add-on-scripts` in the `package.json` to `1.1.1`.

- All [code samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) and the [Document API tutorial](../guides/learn/how_to/tutorials/grids-addon.md) have also been updated to reflect all of the latest changes to the [Adobe Express Document Sandbox APIs](./document-sandbox/document-apis/) listed here.
- Removed all experimental APIs notes/warnings around the **Document Sandbox** since they **are now stable**.

<InlineAlert slots="text" variant="warning"/>

**Known Issue:** Please note, there is an edge case where **removing a page with your add-on** could potentially cause a problem where the UI needs to be reloaded. This will be resolved in the very near future, but please take caution and be aware that it would be best to avoid page removal in the short-term until it's resolved.

### Additional Updates

- A new `getPagesMetadata()` method is now available in the [Add-on UI SDK `document`](./addonsdk/app-document.md#getpagesmetadata) object and includes an example code snippet. **NOTE:** This method is still considered **experimental only** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](./manifest/index.md#requirements) section of the `manifest.json`.
- The [`createRenditions()` export API](./addonsdk/app-document.md#createrenditions) was updated with the following changes:
  - You can now choose to generate renditions of specific pages via a new [`Range.specificPages`](./addonsdk/addonsdk-constants.md) constant value.
  - The returned type now also includes page metadata (see [`PageMetadata`](./addonsdk/app-document.md#pagemetadata)) including useful information such as the id, page size, pixels per inch, and whether the page has premium or temporal (timeline) content or not, (in addition to the existing blob and title). An example is provided in the reference as well as in [the use cases](../guides/learn/how_to/page_metadata.md).
- A new [document metadata use case example](../guides/learn/how_to/document_metadata.md) has been added to show how to retrieve the [document id](./addonsdk/app-document.md#id) and [title (ie: name)](./addonsdk/app-document.md#title), including how to listen for the [associated events](./addonsdk/addonsdk-app.md#events).
- New tables have been added to the [Communication API reference](./document-sandbox/communication/index.md) denoting the [supported](./document-sandbox/communication/index.md#supported-data-types) and [unsupported data types](./document-sandbox/communication/index.md#unsupported-data-types) that can be used across the [Communication API](./document-sandbox/communication/index.md) layer.

## 2023-12-04

### Updates

- The [Document API's](./document-sandbox/document-apis/) were updated to add a new [`ColorUtils`](./document-sandbox/document-apis/classes/ColorUtils.md) class, which replaces the previous `utils` module that was used as a color helper with a more enhanced utlility. If you've used the old `utils` module in your add-ons, it will require you to update them to use the new named import of `colorUtils` instead of `utils`. Color creation should now be done using the new [`colorUtils` module](./document-sandbox/document-apis/classes/ColorUtils.md). An example of the old way and new way to create a color are shown below for reference:

  ```js
  // Before
  import { utils } from "express-document-sdk";
  const color = utils.createColor(1, 0, 0);

  // After
  import { colorUtils } from "express-document-sdk";

  // any of:
  const color = colorUtils.fromRGB(1, 0, 0); // optional alpha
  const color = colorUtils.fromRGB({ red: 1, green: 0, blue: 0 }); // optional alpha
  const color = colorUtils.fromHex("#ff0000");
  const color = { red: 1, green: 0, blue: 0, alpha: 1 }; // mandatory alpha
  ```

  The [code samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) have also been updated, so please also refer to those for further details on how to use it. Please note, the [example code snippets](./document-sandbox/document-apis/index.md#example-code-snippet) and samples using `fills` or `strokes` off a node class were also updated to use a singular `Fill` or `Stroke` object instead of as an `ItemList` object.

  ```js
  // Before
  rectangle.fills.append(rectFill);
  ellipse.fills.append(ellipseFill);

  // After
  rectangle.fill = rectFill;
  ellipse.fill = ellipseFill;
  ```

- A new release has landed for the [**In-App Developer Submission experience**](../guides/build/distribute/) in Express. Some highlights from the release:

  **Create Add-on flow:** You can now create [an add-on "container"](../guides/build/distribute/public-dist.md#step-2-add-on-listing-settings) as your first step in building add-ons within the existing in-app distribution workflow. Creating the container gets you access to a few important settings and data (for instance your unique subdomain, see below) before you continue the development process in the CLI. All existing add-ons will automatically receive a parent container with the associated additional features today.

  **Unique Subdomain retrieval:** As part of your add-on container, you will now be able to easily retrieve a unique subdomain for your add-on. Simply choose one of your add-ons in the distribution workflow and navigate to the new "Settings" tab and copy the Add-on URL. This URL is handy for addressing issues with CORS by adding the URL as an allowed origin. See [our CORS guide](../guides/learn/platform_concepts/context.md#cors) for more details.

  **Delete Add-ons:** The "container" concept allowed us to offer better management and cleanup of your add-ons. You will now find the option to delete an add-on container entirely from the new "Settings" tab of a given add-on.

  **NOTE:** You can only delete add-ons that have not been published publicly or submitted to our Review team. Please contact us if you need to un-publish an add-on.

  **Supported Languages:** The [version details step](../guides/build/distribute/public-dist.md#step-4-enter-listing-details) for publishing add-ons publicly now includes fields to indicate which languages are supported by your add-ons (beyond the required English). You can choose from any of the languages Express supports, and your designation will be shown to users when they browse your listing details. See [our sample for detecting a user's locale to localize your add-on](../guides/learn/how_to/theme_locale.md).

- Updated list of templates and details to include the [Document Sandbox template options](../guides/getting_started/local_development/dev_tooling.md#templates), and how to still scaffold from one when the [`--template` parameter is not explicitly supplied](../guides/getting_started/local_development/dev_tooling.md#no-template-parameter).
- New FAQ item regarding the mime type for exported PDF files. This is due to an unexpected change made in Adobe Express core to the mime type returned when you generate a PDF using the export [`createRenditions`](./addonsdk/app-document.md#createrenditions) method. In the past it would return `application/pdf`, but currently it returns `text/plain`. This is something to be aware of if you are inspecting the mime type in the response and failing if it's anything other than `application/pdf`.
- Removed NPS survey.

## 2023-11-30

### Updates

- Adds support to the [Add-on UI SDK](./addonsdk/index.md) for retrieving the [document id](./addonsdk/app-document.md#id) and [title](./addonsdk/app-document.md#title), as well as the ability for the add-on to be notified of the [associated events](./addonsdk/addonsdk-app.md#events).
- Updates the names of the SDK imports for the [Document Sandbox](./document-sandbox/communication/index.md) and the [Document API's SDK](./document-sandbox/document-apis/):

  **Document Sandbox SDK import**<br/>

  from:

  `import AddOnScriptSdk from "AddOnScriptSdk";`

  to:

  `import addOnSandboxSdk from "add-on-sdk-document-sandbox";`

  which also requires the following line to change in the example code to use the new reference:

  `const { runtime } = addOnSandboxSdk.instance; // runtime object provides direct access to the comm methods`

  **Express Document SDK Import (for accessing the Document APIs**<br/>

  from:

  `import { editor } from "express";`

  to:

  `import { editor } from "express-document-sdk";`

  **NOTE:** This includes the named imports for `utils` and `constants` modules as well if needed (ie: `import { editor, utils, constants } from "express-document-sdk"`).

- Updates the [`manifest.json` entry for the document sandbox script code reference](./manifest/index.md#entrypoints) from `script` to `documentSandbox`, as shown below:

  ```json
    "entryPoints": [
          {
              "type": "panel",
              "id": "panel1",
              "main": "index.html",
              "documentSandbox": "code.js"
          }
      ]
  ```

- [`apiProxy()`](./addonsdk/instance-runtime.md#apiproxy) now accepts `"documentSandbox"` as a parameter when referring to the entry point in the manifest where your document sandbox code resides, instead of `"script"`.
- The [`RuntimeType`](./addonsdk/addonsdk-constants.md) constant can now have a value of `"documentSandbox"` in lieu of `"script"`.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The old import names will continue to be supported for a period of time to allow developers to migrate to the new import names, but we encourage you to update as soon as possible to avoid any future issues.

## 2023-11-28

### Updates

- The [Web API's in the Document Sandbox Reference](./document-sandbox/web/index.md) were updated to remove the timer methods which are no longer supported (ie: `setTimeout()`, `clearTimeout` and `setInterval()`, `clearInterval`).
- The [Document API References](./document-sandbox/document-apis/) were updated with the following additions and changes:

  **New Classes/Interfaces**<br/>

  - New [RestrictedItemList class](./document-sandbox/document-apis/classes/RestrictedItemList.md)
  - New [UnknownNode class](./document-sandbox/document-apis/classes/UnknownNode.md)
  - New [SolidColorShapeNode class](./document-sandbox/document-apis/classes/SolidColorShapeNode.md)
  - New [Point interface](./document-sandbox/document-apis/interfaces/Point.md)
  - New `queueAsyncEdit` method added to the [Editor](./document-sandbox/document-apis/classes/Editor.md) class.
  - Renames the [Constants](./document-sandbox/document-apis/enumerations/) to remove the `Value` suffix.

  **Updates to Node Classes**<br/>

The accessors and methods below were removed or replaced with new names in the [`Node` class](./document-sandbox/document-apis/classes/Node.md) and classes that extend it. Please refer to the [Document API References](./document-sandbox/document-apis/) specifically to learn more about each.

- Removes `absoluteRotation` accessor
- Removes `absoluteTransform` accessor
- Removes `relativeRotation` accessor
- Removes `relativeTransform` accessor
- Removes `translateX` accessor
- Removes `translateY` accessor
- Adds `rotation` accessor
- Adds `rotationInScreen` accessor
- Adds `transformMatrix` accessor
- Adds `translation` accessor
- Adds `setPositionInParent` method
- Adds `setRotationInParent` method

## 2023-11-27

Updated [Document API references](./document-sandbox/document-apis/) to include:

- [ComplexShapeNode class](./document-sandbox/document-apis/classes/ComplexShapeNode.md)
- [GridLayoutNode class](./document-sandbox/document-apis/classes/GridLayoutNode.md)
- [IStrokableNode interface](./document-sandbox/document-apis/interfaces/IStrokableNode.md)
- [FillRule constant](./document-sandbox/document-apis/enumerations/FillRule.md)

## 2023-11-6

- Added a [new tutorial section](../guides/learn/how_to/tutorials/) to the Getting Started guides, including a new ["Building your first add-on with the Document API" tutorial](../guides/learn/how_to/tutorials/grids-addon.md) by Davide Barranca.
- Updated the naming conventions from Script Runtime to Document Sandbox and Editor APIs to Adobe Express Document APIs. The Document Sandbox now includes the Communication APIs, Web APIs and the Document APIs.
- Updated sample code snippets to use the `addOnUISdk` import name (vs `AddOnSDK`) similar to what's generated in the templates for consistency.

## 2023-10-26

### Updates

New questions and answers added to the FAQ regarding Adobe's use of add-on data, where to file feature requests and more.

## 2023-10-10

### Updates

Updates to the [OAuth APIs](./addonsdk/app-oauth.md) to allow for a new optional `windowSize` parameter to be specified in the [`AuthorizationRequest`](./addonsdk/app-oauth.md#authorizationrequest) object and the [`AuthorizeWithOwnRedirectRequest`](./addonsdk/app-oauth.md#authorizewithownredirectrequest) to set the desired size of the authorization window.

## 2023-10-09

### Updates

Published new [Guidelines and requirements section](../guides/build/distribute/guidelines/); including [General guidelines](../guides/build/distribute/guidelines/general/), [Developer brand guidelines](../guides/build/distribute/guidelines/), [Monetization guidelines](../guides/build/distribute/guidelines/monetization.md) and [Generative AI guidelines](../guides/build/distribute/guidelines/genai/).

## 2023-10-03

### Updates

New versions of the CLI packages:

```json
  "@adobe-ccwebext/ccweb-add-on-manifest": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-core": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-ssl": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-analytics": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-developer-terms": "1.5.0"
  "@adobe-ccwebext/create-ccweb-add-on": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-scaffolder": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-scripts": "1.5.0"
  "@adobe-ccwebext/ccweb-add-on-sdk-types": "0.3.0"
```

which include:

- Updated templates for both iframe and document sandbox add-ons:

  - All new add-ons created (other than those based on javascript) use `spectrum-web-components` with the Express theme pre-set.
  - React-based templates include [`swc-react`](https://opensource.adobe.com/spectrum-web-components/using-swc-react/) setup.
  - The `javascript-with-editor-apis` template has been removed from the initial template selection in this version but replaced with the option from the CLI to [include the document sandbox](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/#cli-generated-script-runtime-add-on) when creating a new add-on.

- New type support for typescript based add-ons.
- Ability to recreate your SSL certificates.

#### Documentation updates

- Updated [document sandbox Reference docs](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/#cli-generated-script-runtime-add-on) to reflect the new CLI prompt to include document sandbox (vs the specific template).
- Updated [Getting Started guides](../guides/getting_started/) documentation and screenshots to reflect the **new Add-on Launchpad panel update** to the new **two-tab view** for "Discover" and "Your Add-ons".

## 2023-09-26

### Removed

- Removed the experimental APIs notes/warnings around the **Audio APIs and User APIs** since they **are now stable**.
- Removed references to the Dropbox sample since the [import-images-from-oauth](https://developer.adobe.com/express/add-ons/docs/samples/#import-images-using-oauth) contains the same functionality.

### Updated

- Updated the Express add-ons [introduction video](https://developer.adobe.com/express/add-ons/docs/guides/) with a newly created version.

## 2023-09-25

### Updates

The [Editor API references](https://developer.adobe.com/express-add-on-apis/docs/api/classes/Editor/) have been updated with additional descriptions and details as well as some new and modified APIs:

- Artboard now has a single fill only. **Note:** it's possible that all node types will move to this model in the near future.
- The `name` property is now only available on `PageNode`, not all node types.
- New `Node.locked` & `Context.selectionIncludingNonEditable` properties were added for the locking feature that recently shipped in Express.

<InlineAlert slots="text" variant="info"/>

If you're using the experimental Document Sandbox APIs in any add-ons currently, we encourage you to check the specific methods and objects you're using in these [updated references](https://developer.adobe.com/express-add-on-apis/docs/api/classes/Editor/) to discover anything new or changed.

## 2023-09-19

### Added

- New [iframe Sandbox Context guide](../guides/learn/platform_concepts/context.md) with details on the new `subdomain` support and CORS handling.
- How-to videos embedded in various guides to help visually show how to use the information in those sections.

### Updates

- **New Types Package Versions Released** <br/>

  - A new version `0.1.6` of the `@adobe-ccwebext/ccweb-add-on-sdk-types` package with the latest typings for the [`AddOnSDK` (iframe)](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/), including new experimental APIs, as well as general improvements and bug fixes.
  - A new version `0.2.0` of the `@adobe-ccwebext/ccweb-add-on-sdk-types` package with the latest typings for the **document sandbox/Editor APIs**.

  **IMPORTANT**:
  Developers who are **NOT** using the [document sandbox/Editor APIs](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/) should update to their types package to `0.1.6` at minimum by changing the version of it to `@adobe-ccwebext/ccweb-add-on-sdk-types@0.1.6` in the `package.json`.

  The new types `0.2.0` types package will be used automatically for any new add-ons created. If you would like to update an existing add-on to the `0.2.0` version, you will need to update the `ccweb-add-on-sdk-typings.d.ts` file in your add-on with the content [here](https://github.com/adobe-ccwebext/ccweb-add-on-cli/blob/main/packages/wxp-sdk-typings/ccweb-add-on-sdk-typings.d.ts).

- [Performance guide](../guides/build/advanced-topics/performance.md) updates to include [**Task Manager**](../guides/build/advanced-topics/performance.md#task-manager) and [**Memory Consumption**](../guides/build/advanced-topics/performance.md#memory-consumption-monitoring) details for add-ons.
- [FAQ update](../guides/support/faq.md) for [`SharedArrayBuffer`](../guides/support/faq.md#is-sharedarraybuffer-supported).

## 2023-09-12

### Updates

- Added supported file types for import and export to the [FAQ](../guides/support/faq.md).

## 2023-09-07

### Updates

<del>

- The <a href="../references/document-sandbox/communication/index.md">Communication API</a> in the <a href="../references/document-sandbox/">document sandbox reference section</a> was updated to change the example code importing the SDK to a default import rather than a named import as it was previously:

  from:

  `import { AddOnSdkApi } from "AddOnSdkApi";`

  to:

  `import AddOnScriptSdk from "AddOnScriptSdk";`

  Note that you can now name the imported module whatever you'd like, but for simplicity in the examples, the name is kept the same. **Since these APIs are currently experimental, this change will not impact any in-production add-ons, _however_, it will require you to update any existing usage of these APIs in progress**.

</del>

- A **new 1.4.2 version of the CLI** was also released with an updated [`javascript-with-editor-apis` template](./document-sandbox/index.md) reflecting the default SDK import noted in the first bullet above. The new CLI version will install automatically when you create a new add-on, or you can update existing add-ons by changing the version of the `ccweb-add-on-scripts` in the `package.json` to `1.4.2`.
- Updated the [FAQ](../guides/support/faq.md) with details on Experimental APIs and suppported file types for exported content.

## 2023-09-05

### Added

Added new **Audio API** documentation. You can now import audio to the current Adobe Express document in two different methods:

1. Using the new [`addAudio()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addaudio) method, which requires a [`MediaAttributes`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#mediaattributes) object containing the `title` of the audio content.
2. Using [drag and drop](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#enabledragtodocument), and supplying the [`MediaAttributes`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#mediaattributes) object in the [`DragCompletionData`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#dragcompletiondata).

Please note, in both cases, the `MediaAttributes` object is required for audio content, but optional for video and image content. A new code sample will be supplied in the near future, but in the meantime, please refer to the example usage snippets provided in the [SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addaudio) and [Implementing Common Use Cases Guide](https://developer.adobe.com/express/add-ons/docs/guides/develop/).

<!-- <InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The new Audio API's are currently ***experimental only*** and should not be used in any add-ons you will be distributing until they have been deemed stable. To try out these new APIs, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of the `manifest.json`. -->

## 2023-08-31

### Added

Added new code sample to demonstrate how to use SWC-React and set theme properties in add-ons called **swc-react-theme-sampler** to the [Code Samples](https://developer.adobe.com/express/add-ons/docs/samples/#swc-react-theme-sampler).

### Updated

- Updated the [User Interface Guide](../guides/build/design/index.md) to add more notes around the recommended use of `swc-react` over React Spectrum and to point to the new sample mentioned above.

### Fixed

- Fixed bug in the [locale](./addonsdk/app-ui.md) example.

## 2023-08-29

- Added [`currentUser` API](../guides/learn/how_to/user_info.md) details and usage example to the [SDK References](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/) and [Implementing Common Use Cases Guide](../guides/learn/how_to/index.md).
- Added a new [licensed-addon code sample](https://developer.adobe.com/express/add-ons/docs/samples.md#licensed-addon) to illustrate how to implement monetization by leveraging the current userid.
- Added [`devFlags` API](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-devFlags) details, which can be used to simulate certain behavior during development.

## 2023-08-17

### Bugs and Fixes

- There's currently a bug where `addArtboard` could crash the application or corrupt the document if there's no `fill` specified on the artboard. _Please ensure you always add a fill in the same frame as the artboard creation until this issue is resolved_. Also note, when this bug is fixed, the `ArtboardNode` will accept a single `fill` object, rather than an `ItemList` of `fill`(s).

- Currently, in the `addPage` API, a new page is created, but the selected context is not changed to the newly added `artboard`. As a result, from a UI perspective, the user remains on the previous page. A change will be implemented this week which will change the default context to the `artboard` child of the newly added page. This results in actual navigation to the newly added page, and all new content which is added using the Editor APIs will be added to this page.

  **IMPORTANT:** We recommend that you **_only test the use of these experimental Editor APIs against non-essential documents_**, due to the potential for loss or corruption.

### Updates

- Premium Content handling details have been added to the [Implementing Common Use Cases Guide](../guides/learn/how_to/premium_content.md). Note the warning for ensuring that you include the specified `permissions` in the [`manifest.json`](./manifest/index.md#entrypointspermissionssandbox) to `allow-popups` and `allow-popups-to-escape-sandbox` to ensure the pricing page can be loaded when needed (and note the addition of the `renditionPreview` flag in the [`requirements`](./manifest/index.md#requirements) of the manifest when you want to allow premium content to be previewed).

## 2023-08-09

### Added

- Added new [references section](./document-sandbox/) for the document sandbox APIs.

### Important notes on document sandbox APIs (aka Document Sandbox)

- These APIs are experimental!
  - Do not test your add-ons on documents that you care about as these APIs are not currently considered stable.
  - Be sure to only use documented APIs when writing your add-ons. Use of undocumented APIs (which may be prefixed with an underscore, but not always) is not supported and may cause your add-on to fail or lead to document corruption. Visibility of a method or property is visible via `console.log` is not an indication of whether that field is supported or documented.
- Debugging & Console messages
  - You may see "Empty transaction not added to pendingTransaction" while running code in the document sandbox. You can ignore this for now.
  - You may see "Detected a possible stutter. Excessive ECS Frame duration of ## ms" in the console. You can ignore this for now.
  - If your script code has a syntax error, the console will log an unhelpful error message (similar to `Uncaught (in promise) at adobe-internal.js:49`). Your add-on panel UI will be visible and continue to be interactive, but it won't be able to communicate with the document sandbox, resulting in what feels like non-responsive UI (e.g., clicking doesn't trigger the expected action). You'll want to configure your editor to highlight any syntax editors so that you can be sure your code is at least syntactically correct before you save.
- Intermittent issues
  - Auto reload of the add-on when a change is detected sometimes fails to work properly. This can result in changes to the UI HTML not being reflected, but can also cause the connection between the panel UI and the document sandbox to not be properly initialized (your UI may appear to be unresponsive as a result). If you encounter this situation, manually reloading the add-on from the developer panel will usually resolve the issue. We're working on a fix.
  - It's occasionally possible to run into a race condition where the communications bridge between the two contexts (panel vs document sandbox) is not set up in time. If you interact with your panel UI immediately after it's reloaded, the click may appear do nothing instead of invoking your script code. We're working on a fix for this.
- Common pitfalls
  - If you split your work on a document over multiple frames, be sure to protect against reentrancy, otherwise you may end up corrupting the user's undo stack. You should disable elements on the panel UI that could allow the user to execute your code before it is complete and then re-enable those elements when the code is done. The issue will be fixed in a future release.
  - When setting up communication between your panel UI code and your script sandbox code, calling `apiProxy()` with the wrong argument will do nothing without providing any error feedback. If communication is not working, carefully double-check your UI code is requesting the `"script"` API proxy and your script sandbox code is requesting the `"panel"` API proxy.
- Unexpected behavior

  - If the user has a selection and your add-on creates new content, the selection is cleared. This will be addressed before release. An API will be added in the future that will allow you to change the selection to content your add-on creates.
  - When you add text content to a document, font substitution is not working correctly. This means that if you use Asian-language characters, the user may see square boxes instead. If the user were to type the content manually, however, they would see the correct rendering. This issue will be fixed before release.
  - Setting a blend mode on a media container node (e.g., after calling `editor.createImageContainer`) will be visually reflected, but doesn't currently update the "Blend mode" field in the property panel.
  - Setting rotation on an empty group is ignored. Always add content (children) to a group first, and then set its rotation.
  - When removing elements from a parent element, the element may continue to show in the Adobe Express layer stack. This will be addressed in the future. This can also occur if you call `clear()` to remove all children from an element as well as when using `removeFromParent()`.
  - Shape elements added to the document by users (via the Media tab) do not support fill or stroke properties at this time. Furthermore, you should generally avoid making changes to these shapes (they'll appear as group nodes), as this could corrupt the document. We'll add protections around this in an upcoming release.
  - While the API supports adding multiple strokes to elements, Express currently only supports editing the _first_ stroke added. If you want to change the stroke of an element, _remove_ the existing strokes and then add the new stroke so that the element continues to have a single stroke. For example:

    ```js
    element.strokes.clear();
    element.strokes.append(newStroke);
    ```

- Likely API changes
  - Creating colors is currently done via `utils.createColor()`. We're likely to change how you assign colors to objects, so bear this in mind as you use the experimental APIs. Note that this means you cannot just pass a plain JS object of the form `{red, green, blue}` to the Editor APIs — it must be a color created using `utils.createColor`.
  - Editor API constants may be renamed or may change how they are accessed.
  - Fills and strokes can only be assigned to a single parent element. If you try to append a fill from one element to another element, the fill will be _moved_ and not cloned (just like moving a scenenode object from one parent to another). This behavior may change in the future.
  - There is no support for `fetch` in the document sandbox environment. You can work around this by exposing a method from your panel that your script code can call that does the work of fetching remote content. In the future we may abstract this for you automatically.
  - The `strokes` API is likely to be modified so that it only supports a single stroke.
- Typings & Typescript
  - Typings and samples showing how to use Typescript will be available in a future release.

## 2023-08-01

### Added

- Added new properties to the manifest reference for `renditionPreview` in the [`requirements`](./manifest/index.md#requirements) section, and the `script` property to the [`entryPoints`](./manifest/index.md#entrypoints) section to support the new experimental [document sandbox APIs](./document-sandbox/).
- Added [`DisableDragToDocument`](./addonsdk/addonsdk-app.md#disabledragtodocument-type-definition) and [`dropCancelReason`](./addonsdk/addonsdk-app.md#dragendeventdata) support to the [`addonsdk.app`](./addonsdk/addonsdk-app.md) reference.

## 2023-07-11

### Added

- [UX Guidelines](../guides/build/design/ux_guidelines/introduction.md) are now available!
- A new [`requestedSize`](./addonsdk/app-document.md#jpgrenditionoptions) parameter can now be supplied as part of the JPG and PNG rendition options passed in when exporting content with the `createRenditions` method.
- A new [`clipboard` permission](./manifest/index.md#entrypointspermissions) can now be set with the `clipboard-write` value in the manifest to allow an add-on to write data to the clipboard.
- Information on [using fonts](../guides/build/design/ux_guidelines/visual_elements.md#typography).
- CORS / COEP header handling added to the [CORS guide](../guides/learn/platform_concepts/context.md#cors--coep-handling)

## 2023-06-08

### Added

- Initial release for the beta version of Adobe Express.
