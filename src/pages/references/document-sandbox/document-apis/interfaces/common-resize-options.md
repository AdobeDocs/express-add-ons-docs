[@express-document-sdk](../overview.md) / CommonResizeOptions

# Interface: CommonResizeOptions

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for arbitrary resize operations regardless of whether given a width or height when using [Node.resize](../classes/node.md#resize).

## Extended by

-   [`RescaleProportionalToWidthOptions`](rescale-proportional-to-width-options.md)
-   [`RescaleProportionalToHeightOptions`](rescale-proportional-to-height-options.md)
-   [`ResizeUsingWidthOptions`](resize-using-width-options.md)
-   [`ResizeUsingHeightOptions`](resize-using-height-options.md)

## Properties

### avoidScalingVisualDetailsIfPossible

• **avoidScalingVisualDetailsIfPossible**: `boolean`

Whether to try to avoid scaling the content's visual styling (e.g. stroke width, corner detailing, etc.).
Note that some kinds of content may not be able to avoid rescaling in some scenarios.
