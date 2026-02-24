[@express-document-sdk](../overview.md) / CreateRenditionResult

# Interface: CreateRenditionResult

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for the result of [VisualNode.createRendition](../classes/visual-node.md#createrendition).

## Properties

### blob?

• `optional` **blob**: `Blob`

The PNG or JPEG data for the rendition.

<HorizontalLine />

### drawBoundsGlobal?

• `optional` **drawBoundsGlobal**: [`Rect`](rect.md)

The bounds of the rendition in the global coordinate space.
This may be larger than the [VisualNode.boundsLocal](../classes/visual-node.md#boundslocal) due to rotations, borders, filters, or other effects.
Only provided if the [VisualNode](../classes/visual-node.md) is not orphaned.
