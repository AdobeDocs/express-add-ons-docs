[@express-document-sdk](../overview.md) / BlendMode

# Enumeration: BlendMode

<InlineAlert slots="text" variant="warning"/>
*Do not depend on the literal numeric values of these constants*, as they may change. Always reference the enum identifiers in your code.

Determines how a scenende is composited on top of the content rendered below it.

If a node is inside a container whose blend mode anything other than [passThrough](BlendMode.md#passthrough), then the node's blend mode only
interacts with other siblings within the same container. See documentation below for details.

## Table of contents

### Enumeration Members

- [color](BlendMode.md#color)
- [colorBurn](BlendMode.md#colorburn)
- [colorDodge](BlendMode.md#colordodge)
- [darken](BlendMode.md#darken)
- [difference](BlendMode.md#difference)
- [exclusion](BlendMode.md#exclusion)
- [hardLight](BlendMode.md#hardlight)
- [hue](BlendMode.md#hue)
- [lighten](BlendMode.md#lighten)
- [luminosity](BlendMode.md#luminosity)
- [multiply](BlendMode.md#multiply)
- [normal](BlendMode.md#normal)
- [overlay](BlendMode.md#overlay)
- [passThrough](BlendMode.md#passthrough)
- [saturation](BlendMode.md#saturation)
- [screen](BlendMode.md#screen)
- [softLight](BlendMode.md#softlight)

## Enumeration Members

### color

• **color** = ``16``

___

### colorBurn

• **colorBurn** = ``5``

___

### colorDodge

• **colorDodge** = ``8``

___

### darken

• **darken** = ``4``

___

### difference

• **difference** = ``12``

___

### exclusion

• **exclusion** = ``13``

___

### hardLight

• **hardLight** = ``11``

___

### hue

• **hue** = ``14``

___

### lighten

• **lighten** = ``6``

___

### luminosity

• **luminosity** = ``17``

___

### multiply

• **multiply** = ``3``

___

### normal

• **normal** = ``2``

The normal, default blend mode for leaf nodes.

Note: Group nodes default to using `passThrough` blend mode instead. See below.

___

### overlay

• **overlay** = ``9``

___

### passThrough

• **passThrough** = ``1``

This blend mode only applies to container nodes with children; for leaf nodes, it is treated the same as `normal`.

In this mode, the container has no particular blend mode of its own, but rather each individual child of the container
will be individually composited onto the background using its own specific blend mode. In *any other* blend mode, the
children are first rendered in an "isolation mode" and then the flattened result is composited onto other content
below it using solely the container's own blend mode.

Group nodes are set to `passThrough` by default.

___

### saturation

• **saturation** = ``15``

___

### screen

• **screen** = ``7``

___

### softLight

• **softLight** = ``10``
