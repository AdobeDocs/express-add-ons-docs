---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: Stroke

Base interface representing any stroke in the scenegraph. See [StrokableNode](../classes/strokable-node.md).
Currently, you can only create [SolidColorStroke](solid-color-stroke.md)s, but you might encounter
other stroke types when reading from scenegraph content.

## Extended by

- [`SolidColorStroke`](solid-color-stroke.md)

## Properties

| Property | Modifier | Type |
| ------ | ------ | ------ |
| `type` | `readonly` | [`color`](../enumerations/stroke-type.md#color) |
