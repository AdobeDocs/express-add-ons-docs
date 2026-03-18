---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: Fill

Base interface representing any fill in the scenegraph. See [FillableNode](../classes/fillable-node.md).
Currently, you can only create [ColorFill](color-fill.md)s, but you might encounter
other fill types when reading scenegraph content.

## Extended by

- [`ColorFill`](color-fill.md)

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| `type` | `readonly` | [`color`](../enumerations/fill-type.md#color) | The fill type. |
