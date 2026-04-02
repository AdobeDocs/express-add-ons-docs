---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: CommonResizeOptions

An interface for arbitrary resize operations regardless of whether given a width or height when using [Node.resize](../classes/node.md#resize).

## Extended by

- [`RescaleProportionalToWidthOptions`](rescale-proportional-to-width-options.md)
- [`RescaleProportionalToHeightOptions`](rescale-proportional-to-height-options.md)
- [`ResizeUsingWidthOptions`](resize-using-width-options.md)
- [`ResizeUsingHeightOptions`](resize-using-height-options.md)

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `avoidScalingVisualDetailsIfPossible` | `boolean` | Whether to try to avoid scaling the content's visual styling (e.g. stroke width, corner detailing, etc.). Note that some kinds of content may not be able to avoid rescaling in some scenarios. |
