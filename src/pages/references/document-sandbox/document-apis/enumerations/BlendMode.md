[@express-document-sdk](../overview.md) / BlendMode
# Enumeration: BlendMode

<InlineAlert slots="text" variant="warning"/>

*Do not depend on the literal numeric values of these constants*, as they may change. Always reference the enum identifiers in your code.

Determines how a scenenode is composited on top of the content rendered below it.

If a node is inside a container whose blend mode anything other than [passThrough](BlendMode.md#passthrough), then the node's blend mode only
interacts with other siblings within the same container. See documentation below for details.

## Enumeration Members

### accumulate

• **accumulate**: `18`

---

### color

• **color**: `16`

---

### colorBurn

• **colorBurn**: `5`

---

### colorDodge

• **colorDodge**: `8`

---

### darken

• **darken**: `4`

---

### difference

• **difference**: `12`

---

### exclusion

• **exclusion**: `13`

---

### hardLight

• **hardLight**: `11`

---

### hue

• **hue**: `14`

---

### lighten

• **lighten**: `6`

---

### luminosity

• **luminosity**: `17`

---

### multiply

• **multiply**: `3`

---

### normal

• **normal**: `2`

The normal, default blend mode for leaf nodes.

Note: Group nodes default to using `passThrough` blend mode instead. See below.

---

### overlay

• **overlay**: `9`

---

### passThrough

• **passThrough**: `1`

This blend mode only applies to container nodes with children; for leaf nodes, it is treated the same as `normal`.

In this mode, the container has no particular blend mode of its own, but rather each individual child of the container
will be individually composited onto the background using its own specific blend mode. In *any other* blend mode, the
children are first rendered in an "isolation mode" and then the flattened result is composited onto other content
below it using solely the container's own blend mode.

Group nodes are set to `passThrough` by default.

---

### saturation

• **saturation**: `15`

---

### screen

• **screen**: `7`

---

### softLight

• **softLight**: `10`
