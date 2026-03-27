---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: CreateRenditionOptions

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for configuring [VisualNode.createRendition](../classes/visual-node.md#createrendition).

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `format?` | [`CreateRenditionFormat`](../enumerations/create-rendition-format.md) | **`Experimental`** Whether to output in PNG or JPEG format. Defaults to PNG. |
| `scale?` | `number` | **`Experimental`** The scale factor to apply to the content before it is rendered. |
