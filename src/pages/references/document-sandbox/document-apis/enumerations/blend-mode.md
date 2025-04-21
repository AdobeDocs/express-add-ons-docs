[@express-document-sdk](../overview.md) / BlendMode

# Enumeration: BlendMode

<InlineAlert slots="text" variant="warning"/>

*Do not depend on the literal numeric values of these constants*, as they may change. Always reference the enum identifiers in your code.

Determines how a scenenode is composited on top of the content rendered below it.

If a node is inside a container whose blend mode anything other than [passThrough](BlendMode.md#passthrough), then the node's blend mode only
interacts with other siblings within the same container. See documentation below for details.

## Enumeration Members

### color

• **color**: `16`

<hr />

### colorBurn

• **colorBurn**: `5`

<hr />

### colorDodge

• **colorDodge**: `8`

<hr />

### darken

• **darken**: `4`

<hr />

### difference

• **difference**: `12`

<hr />

### exclusion

• **exclusion**: `13`

<hr />

### hardLight

• **hardLight**: `11`

<hr />

### hue

• **hue**: `14`

<hr />

### lighten

• **lighten**: `6`

<hr />

### luminosity

• **luminosity**: `17`

<hr />

### multiply

• **multiply**: `3`

<hr />

### normal

• **normal**: `2`

The normal, default blend mode for leaf nodes.

Note: Group nodes default to using `passThrough` blend mode instead. See below.

<hr />

### overlay

• **overlay**: `9`

<hr />

### passThrough

• **passThrough**: `1`

This blend mode only applies to container nodes with children; for leaf nodes, it is treated the same as `normal`.

In this mode, the container has no particular blend mode of its own, but rather each individual child of the container
will be individually composited onto the background using its own specific blend mode. In _any other_ blend mode, the
children are first rendered in an "isolation mode" and then the flattened result is composited onto other content
below it using solely the container's own blend mode.

Group nodes are set to `passThrough` by default.

<hr />

### saturation

• **saturation**: `15`

<hr />

### screen

• **screen**: `7`

<hr />

### softLight

• **softLight**: `10`
