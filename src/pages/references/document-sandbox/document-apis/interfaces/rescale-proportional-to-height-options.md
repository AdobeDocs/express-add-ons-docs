[@express-document-sdk](../overview.md) / RescaleProportionalToHeightOptions

# Interface: RescaleProportionalToHeightOptions

An interface for rescaling the node based on a given height when using [Node.resize](../classes/Node.md#resize).

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

• **behavior**: [`proportional`](../enumerations/ResizeBehavior.md#proportional)

---

### height

• **height**: `number`

---

### width?

• `optional` **width**: `undefined`

Instead of providing a width, it will be calculated by multiplying the given height by the current aspect ratio.
