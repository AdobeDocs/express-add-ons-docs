[**@express-document-sdk**](../overview.md)

---

# Enumeration: BlendMode

<InlineAlert slots="text" variant="warning"/>

*Do not depend on the literal numeric values of these constants*, as they may change. Always reference the enum identifiers in your code.

Determines how a scenenode is composited on top of the content rendered below it.

If a node is inside a container whose blend mode anything other than [passThrough](#passthrough), then the node's blend mode only
interacts with other siblings within the same container. See documentation below for details.

## Enumeration Members

| Enumeration Member | Value | Description |
| ------ | ------ | ------ |
| `passThrough` | `1` | This blend mode only applies to container nodes with children; for leaf nodes, it is treated the same as `normal`. In this mode, the container has no particular blend mode of its own, but rather each individual child of the container will be individually composited onto the background using its own specific blend mode. In *any other* blend mode, the children are first rendered in an "isolation mode" and then the flattened result is composited onto other content below it using solely the container's own blend mode. Group nodes are set to `passThrough` by default. |
| `normal` | `2` | The normal, default blend mode for leaf nodes. Note: Group nodes default to using `passThrough` blend mode instead. See below. |
| `multiply` | `3` | - |
| `darken` | `4` | - |
| `colorBurn` | `5` | - |
| `lighten` | `6` | - |
| `screen` | `7` | - |
| `colorDodge` | `8` | - |
| `overlay` | `9` | - |
| `softLight` | `10` | - |
| `hardLight` | `11` | - |
| `difference` | `12` | - |
| `exclusion` | `13` | - |
| `hue` | `14` | - |
| `saturation` | `15` | - |
| `color` | `16` | - |
| `luminosity` | `17` | - |
| `accumulate` | `18` | - |
