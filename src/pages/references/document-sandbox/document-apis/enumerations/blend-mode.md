[@express-document-sdk](../overview.md) / BlendMode

# Enumeration: BlendMode

<InlineAlert slots="text" variant="warning"/>

_Do not depend on the literal numeric values of these constants_, as they may change. Always reference the enum identifiers in your code.

Determines how a scenenode is composited on top of the content rendered below it.

If a node is inside a container whose blend mode anything other than [passThrough](blend-mode.md#passthrough), then the node's blend mode only
interacts with other siblings within the same container. See documentation below for details.

## Enumeration Members

### accumulate

• **accumulate**: `18`

---

### color

• **color**: `16`

<HorizontalLine />

### colorBurn

• **colorBurn**: `5`

<HorizontalLine />

### colorDodge

• **colorDodge**: `8`

<HorizontalLine />

### darken

• **darken**: `4`

<HorizontalLine />

### difference

• **difference**: `12`

<HorizontalLine />

### exclusion

• **exclusion**: `13`

<HorizontalLine />

### hardLight

• **hardLight**: `11`

<HorizontalLine />

### hue

• **hue**: `14`

<HorizontalLine />

### lighten

• **lighten**: `6`

<HorizontalLine />

### luminosity

• **luminosity**: `17`

<HorizontalLine />

### multiply

• **multiply**: `3`

<HorizontalLine />

### normal

• **normal**: `2`

The normal, default blend mode for leaf nodes.

Note: Group nodes default to using `passThrough` blend mode instead. See below.

<HorizontalLine />

### overlay

• **overlay**: `9`

<HorizontalLine />

### passThrough

• **passThrough**: `1`

This blend mode only applies to container nodes with children; for leaf nodes, it is treated the same as `normal`.

In this mode, the container has no particular blend mode of its own, but rather each individual child of the container
will be individually composited onto the background using its own specific blend mode. In _any other_ blend mode, the
children are first rendered in an "isolation mode" and then the flattened result is composited onto other content
below it using solely the container's own blend mode.

Group nodes are set to `passThrough` by default.

<HorizontalLine />

### saturation

• **saturation**: `15`

<HorizontalLine />

### screen

• **screen**: `7`

<HorizontalLine />

### softLight

• **softLight**: `10`
