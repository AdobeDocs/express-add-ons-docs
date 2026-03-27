[@express-document-sdk](../overview.md) / ResizeUsingWidthOptions

# Interface: ResizeUsingWidthOptions

An interface for resizing the node based on a given width when using [Node.resize](../classes/Node.md#resize).

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

### height?

• `optional` **height**: `number`

If a height is not provided, it will be calculated by multiplying the given width by the current aspect ratio.

---

### width

• **width**: `number`
