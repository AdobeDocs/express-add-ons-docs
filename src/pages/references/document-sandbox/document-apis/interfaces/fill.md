[@express-document-sdk](../overview.md) / Fill

# Interface: Fill

Base interface representing any fill in the scenegraph. See [FillableNode](../classes/fillable-node.md).
Currently, you can only create [ColorFill](color-fill.md)s, but you might encounter
other fill types when reading scenegraph content.

## Extended by

-   [`ColorFill`](color-fill.md)

## Properties

### type

• `readonly` **type**: [`color`](../enumerations/fill-type.md#color)

The fill type.
