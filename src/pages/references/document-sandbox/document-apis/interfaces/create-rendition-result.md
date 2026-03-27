---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: CreateRenditionResult

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for the result of [VisualNode.createRendition](../classes/visual-node.md#createrendition).

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `blob?` | `Blob` | **`Experimental`** The PNG or JPEG data for the rendition. |
| `drawBoundsGlobal?` | [`Rect`](rect.md) | **`Experimental`** The bounds of the rendition in the global coordinate space. This may be larger than the [VisualNode.boundsLocal](../classes/visual-node.md#boundslocal) due to rotations, borders, filters, or other effects. Only provided if the [VisualNode](../classes/visual-node.md) is not orphaned. |
