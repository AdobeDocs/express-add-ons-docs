[@express-document-sdk](../overview.md) / Fill

# Interface: Fill

Base interface representing any fill in the scenegraph. See [FillableNode](../classes/FillableNode.md).
Currently, you can only create [ColorFill](ColorFill.md)s, but you might encounter
other fill types when reading scenegraph content.

## Extended by

-   [`ColorFill`](ColorFill.md)

## Properties

### type

▸ `readonly` **type**: [`color`](../enumerations/FillType.md#color)

The fill type.
