[@express-document-sdk](../overview.md) / ResizeUsingHeightOptions

# Interface: ResizeUsingHeightOptions

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An interface for resizing the node based on a given height when using [Node.resize](../classes/Node.md#resize).

## Extends

-   [`CommonResizeOptions`](CommonResizeOptions.md)

## Properties

### avoidScalingVisualDetailsIfPossible

• **avoidScalingVisualDetailsIfPossible**: `boolean`

Whether to try to avoid scaling the content's visual styling (e.g. stroke width, corner detailing, etc.).
Note that some kinds of content may not be able to avoid rescaling in some scenarios.

#### Inherited from

[`CommonResizeOptions`](CommonResizeOptions.md).[`avoidScalingVisualDetailsIfPossible`](CommonResizeOptions.md#avoidscalingvisualdetailsifpossible)

---

### behavior

• **behavior**: [`contain`](../enumerations/ResizeBehavior.md#contain) \| [`cover`](../enumerations/ResizeBehavior.md#cover)

---

### height

• **height**: `number`

---

### width?

• `optional` **width**: `number`

If a width is not provided, it will be calculated by multiplying the given height by the current aspect ratio.
