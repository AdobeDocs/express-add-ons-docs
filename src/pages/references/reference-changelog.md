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