[**@express-document-sdk**](../overview.md)

---

# Interface: CreateRenditionOptions

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for configuring [VisualNode.createRendition](../classes/VisualNode.md#createrendition).

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `format?` | [`CreateRenditionFormat`](../enumerations/CreateRenditionFormat.md) | **`Experimental`** Whether to output in PNG or JPEG format. Defaults to PNG. |
| `scale?` | `number` | **`Experimental`** The scale factor to apply to the content before it is rendered. |
