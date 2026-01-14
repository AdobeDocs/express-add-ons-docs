[@express-document-sdk](../overview.md) / ResizeOptions

# Type alias: ResizeOptions

• **ResizeOptions**: [`RescaleProportionalToWidthOptions`](../interfaces/RescaleProportionalToWidthOptions.md) \| [`RescaleProportionalToHeightOptions`](../interfaces/RescaleProportionalToHeightOptions.md) \| [`ResizeUsingWidthOptions`](../interfaces/ResizeUsingWidthOptions.md) \| [`ResizeUsingHeightOptions`](../interfaces/ResizeUsingHeightOptions.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

A type union for providing the necessary arguments to [Node.resize](../classes/Node.md#resize).

Note that some nodes only support proportional resizing. In some cases this is always true (e.g. images) while in
other cases it is due to the current visual details (e.g. the stroke being too thick to shrink the size of a shape).
