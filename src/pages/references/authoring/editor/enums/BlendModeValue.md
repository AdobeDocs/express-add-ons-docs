[@add-on-hlapi-sdk](../overview.md) / BlendModeValue

# Enumeration: BlendModeValue

<InlineAlert slots="text" variant="warning"/>
*Do not depend on the literal numeric values of these constants*, as they may change. Always reference the enum identifiers in your code.

Determines how a scenende is composited on top of the content rendered below it.

If a node is inside a container whose blend mode anything other than [passThrough](BlendModeValue.md#passThrough), then the node's blend mode only
interacts with other siblings within the same container. See documentation below for details.

## Table of contents

### Enumeration Members

- [color](BlendModeValue.md#color)
- [colorBurn](BlendModeValue.md#colorBurn)
- [colorDodge](BlendModeValue.md#colorDodge)
- [darken](BlendModeValue.md#darken)
- [difference](BlendModeValue.md#difference)
- [exclusion](BlendModeValue.md#exclusion)
- [hardLight](BlendModeValue.md#hardLight)
- [hue](BlendModeValue.md#hue)
- [lighten](BlendModeValue.md#lighten)
- [luminosity](BlendModeValue.md#luminosity)
- [multiply](BlendModeValue.md#multiply)
- [normal](BlendModeValue.md#normal)
- [overlay](BlendModeValue.md#overlay)
- [passThrough](BlendModeValue.md#passThrough)
- [saturation](BlendModeValue.md#saturation)
- [screen](BlendModeValue.md#screen)
- [softLight](BlendModeValue.md#softLight)

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
