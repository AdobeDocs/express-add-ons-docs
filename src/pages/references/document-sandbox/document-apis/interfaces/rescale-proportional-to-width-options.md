---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: RescaleProportionalToWidthOptions

An interface for rescaling the node based on a given width when using [Node.resize](../classes/node.md#resize).

## Extends

- [`CommonResizeOptions`](common-resize-options.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| `avoidScalingVisualDetailsIfPossible` | `boolean` | Whether to try to avoid scaling the content's visual styling (e.g. stroke width, corner detailing, etc.). Note that some kinds of content may not be able to avoid rescaling in some scenarios. | [`CommonResizeOptions`](common-resize-options.md).[`avoidScalingVisualDetailsIfPossible`](common-resize-options.md#avoidscalingvisualdetailsifpossible) |
| `behavior` | [`proportional`](../enumerations/resize-behavior.md#proportional) | - | - |
| `width` | `number` | - | - |
| `height?` | `undefined` | Instead of providing a height, it will be calculated by multiplying the given width by the current aspect ratio. | - |
