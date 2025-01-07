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