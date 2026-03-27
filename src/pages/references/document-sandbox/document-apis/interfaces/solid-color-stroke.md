---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: SolidColorStroke

Represents a solid-color stroke, with optional dashes.

The most convenient way to create a solid-color stroke is via `Editor.makeStroke()`. This also futureproofs
your code in case any other required fields are added to the Stroke descriptor in the future.

## Extends

- [`Stroke`](stroke.md)

## Properties

| Property | Modifier | Type | Description | Overrides |
| ------ | ------ | ------ | ------ | ------ |
| `type` | `readonly` | [`color`](../enumerations/stroke-type.md#color) | The stroke type. | [`Stroke`](stroke.md).[`type`](stroke.md#type) |
| `color` | `public` | [`Color`](color.md) | The color of a stroke. | - |
| `width` | `public` | `number` | The thickness of a stroke. Must be from MIN\_STROKE\_WIDTH to MAX\_STROKE\_WIDTH. | - |
| `dashPattern` | `public` | `number`[] | If empty, this is a solid stroke. If non-empty, the values alternate between length of a rendered and blank segment, repeated along the length of the stroke. The first value represents the first solid segment. Array must be of even length. Values cannot be negative. | - |
| `dashOffset` | `public` | `number` | Number of pixels the beginning of dash pattern should be offset along the stroke. | - |
| `position` | `public` | [`StrokePosition`](../enumerations/stroke-position.md) | The position of the stroke relative to the outline of the shape. | - |
