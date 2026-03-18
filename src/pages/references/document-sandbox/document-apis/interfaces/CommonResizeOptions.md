[**@express-document-sdk**](../overview.md)

---

# Interface: CommonResizeOptions

An interface for arbitrary resize operations regardless of whether given a width or height when using [Node.resize](../classes/Node.md#resize).

## Extended by

- [`RescaleProportionalToWidthOptions`](RescaleProportionalToWidthOptions.md)
- [`RescaleProportionalToHeightOptions`](RescaleProportionalToHeightOptions.md)
- [`ResizeUsingWidthOptions`](ResizeUsingWidthOptions.md)
- [`ResizeUsingHeightOptions`](ResizeUsingHeightOptions.md)

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `avoidScalingVisualDetailsIfPossible` | `boolean` | Whether to try to avoid scaling the content's visual styling (e.g. stroke width, corner detailing, etc.). Note that some kinds of content may not be able to avoid rescaling in some scenarios. |
