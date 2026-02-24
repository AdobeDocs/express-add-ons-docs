[@express-document-sdk](../overview.md) / RescaleProportionalToHeightOptions

# Interface: RescaleProportionalToHeightOptions

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for rescaling the node based on a given height when using [Node.resize](../classes/node.md#resize).

## Extends

-   [`CommonResizeOptions`](common-resize-options.md)

## Properties

### avoidScalingVisualDetailsIfPossible

• **avoidScalingVisualDetailsIfPossible**: `boolean`

Whether to try to avoid scaling the content's visual styling (e.g. stroke width, corner detailing, etc.).
Note that some kinds of content may not be able to avoid rescaling in some scenarios.

#### Inherited from

[`CommonResizeOptions`](common-resize-options.md).[`avoidScalingVisualDetailsIfPossible`](common-resize-options.md#avoidscalingvisualdetailsifpossible)

<HorizontalLine />

### behavior

• **behavior**: [`proportional`](../enumerations/resize-behavior.md#proportional)

<HorizontalLine />

### height

• **height**: `number`

<HorizontalLine />

### width?

• `optional` **width**: `undefined`

Instead of providing a width, it will be calculated by multiplying the given height by the current aspect ratio.
