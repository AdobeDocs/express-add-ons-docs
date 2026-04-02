---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: AreaTextLayout

Area text: both width and height are explicitly set. If text content is too long to fit, the end of the text will be
clipped. If text content is short, the frame's bounds will occupy extra height that is just blank space.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `type` | [`area`](../enumerations/text-layout.md#area) | - |
| `width` | `number` | The width of the text node in pixels. |
| `height` | `number` | The height of the text node in pixels. |
