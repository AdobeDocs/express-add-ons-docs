[@express-document-sdk](../overview.md) / ColorUtils

# Class: ColorUtils

Utility methods for working with color values.

## Methods

### fromHex()

• **fromHex**(`hex`): [`Color`](../interfaces/color.md)

Create a new color from its equivalent RGBA hex representation. Can specify in 6 digits (RRGGBB) or 8 digits
(RRGGBBAA), uppercase or lowercase, with or without leading "#". Alpha defaults to FF (100% opaque) if ommitted.

#### Parameters

• **hex**: `string`

The color represented as a hexadecimal string.

#### Returns

[`Color`](../interfaces/color.md)

A new color value matching the given hex string.

#### Throws

if the hex string cannot be parsed.

---

### fromRGB()

#### fromRGB(red, green, blue, alpha)

• **fromRGB**(`red`, `green`, `blue`, `alpha`?): [`Color`](../interfaces/color.md)

Create a new color object with the given RGBA values.

##### Parameters

• **red**: `number`

The red channel, from 0 - 1.

• **green**: `number`

The green channel, from 0 - 1.

• **blue**: `number`

The blue channel, from 0 - 1.

• **alpha?**: `number`

Optional alpha channel, from 0 - 1. Defaults to 1 (opaque).

##### Returns

[`Color`](../interfaces/color.md)

A new color object.

#### fromRGB(color)

• **fromRGB**(`color`): [`Color`](../interfaces/color.md)

Create a new color object given a partial color object where the alpha field may be missing.

##### Parameters

• **color**

Partial color object. Alpha defaults to 1 (opaque).

• **color.alpha?**: `number`

• **color.blue**: `number`

• **color.green**: `number`

• **color.red**: `number`

##### Returns

[`Color`](../interfaces/color.md)

A new color object with all fields present.

---

### toHex()

• **toHex**(`color`): `string`

Get the color in 8-digit hex "#RRGGBBAA" format.

#### Parameters

• **color**: [`Color`](../interfaces/color.md)

#### Returns

`string`
