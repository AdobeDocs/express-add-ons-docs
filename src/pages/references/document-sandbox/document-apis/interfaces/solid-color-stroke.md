[@express-document-sdk](../overview.md) / SolidColorStroke

# Interface: SolidColorStroke

Represents a solid-color stroke, with optional dashes.

The most convenient way to create a solid-color stroke is via `Editor.makeStroke()`. This also futureproofs
your code in case any other required fields are added to the Stroke descriptor in the future.

## Extends

-   [`Stroke`](stroke.md)

## Properties

### color

• **color**: [`Color`](color.md)

The color of a stroke.

---

### dashOffset

• **dashOffset**: `number`

Number of pixels the beginning of dash pattern should be offset along the stroke.

---

### dashPattern

• **dashPattern**: `number`[]

If empty, this is a solid stroke.
If non-empty, the values alternate between length of a rendered and blank segment,
repeated along the length of the stroke. The first value represents the first solid segment.
Array must be of even length. Values cannot be negative.

---

### position

• **position**: [`StrokePosition`](../enumerations/stroke-position.md)

The position of the stroke relative to the outline of the shape.

---

### type

• `readonly` **type**: [`color`](../enumerations/stroke-type.md#color)

The stroke type.

#### Overrides

[`Stroke`](stroke.md).[`type`](stroke.md#type)

---

### width

• **width**: `number`

The thickness of a stroke. Must be from MIN_STROKE_WIDTH to MAX_STROKE_WIDTH.
