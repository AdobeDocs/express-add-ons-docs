[@express-document-sdk](../overview.md) / Stroke

# Interface: Stroke

Represents a stroke in the scenegraph. See [StrokableNode](../classes/StrokableNode.md).

The most convenient way to create a stroke is via `Editor.makeStroke()`. This also futureproofs your code in case any
other required fields are added to the Stroke descriptor in the future.

## Properties

### color

• **color**: [`Color`](Color.md)

The color of a stroke.

___

### dashOffset

• **dashOffset**: `number`

Number of pixels the beginning of dash pattern should be offset along the stroke.

___

### dashPattern

• **dashPattern**: `number`[]

If empty, this is a solid stroke.
If non-empty, the values alternate between length of a rendered and blank segment,
repeated along the length of the stroke. The first value represents the first solid segment.
Array must be of even length. Values cannot be negative.

___

### position

• **position**: [`StrokePosition`](../enums/StrokePosition.md)

The position of the stroke relative to the outline of the shape.

___

### width

• **width**: `number`

The thickness of a stroke. Must be from MIN_STROKE_WIDTH to MAX_STROKE_WIDTH.
