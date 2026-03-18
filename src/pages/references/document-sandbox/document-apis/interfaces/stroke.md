[**@express-document-sdk**](../overview.md)

---

# Interface: Stroke

Base interface representing any stroke in the scenegraph. See [StrokableNode](../classes/StrokableNode.md).
Currently, you can only create [SolidColorStroke](SolidColorStroke.md)s, but you might encounter
other stroke types when reading from scenegraph content.

## Extended by

- [`SolidColorStroke`](SolidColorStroke.md)

## Properties

| Property | Modifier | Type |
| ------ | ------ | ------ |
| `type` | `readonly` | [`color`](../enumerations/StrokeType.md#color) |
