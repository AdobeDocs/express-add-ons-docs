[@express-document-sdk](../overview.md) / ColorUtils

# Class: ColorUtils

Utility methods for working with color values.

## Hierarchy

- `ProxyLiveObject`

  ↳ **`ColorUtils`**

## Table of contents

### Methods

- [fromHex](ColorUtils.md#fromHex)
- [fromRGB](ColorUtils.md#fromRGB)
- [toHex](ColorUtils.md#toHex)

## Methods

### <a id="fromHex" name="fromHex"></a> fromHex

▸ **fromHex**(`hex`): [`Color`](../interfaces/Color.md)

Create a new color from its equivalent RGBA hex representation. Currently only
supports formats "#RRGGBBAA" or "RRGGBBAA". If the hex value is invalid, this
method will return transparent black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The color in hex representation. |

#### Returns

[`Color`](../interfaces/Color.md)

A new color matching the given hex representation, or transparent black if
the hex string cannot be parsed.

___

### <a id="fromRGB" name="fromRGB"></a> fromRGB

▸ **fromRGB**(`red`, `green`, `blue`, `alpha?`): [`Color`](../interfaces/Color.md)

Create a new Color. All color components should be in a 0 - 1 range.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `red` | `number` | - |
| `green` | `number` | The green component in a range from 0 - 1. |
| `blue` | `number` | The blue component in a range from 0 - 1. |
| `alpha?` | `number` | (optional) The alpha component in a range from 0 - 1. Defaults to 1 (fully opaque). |

#### Returns

[`Color`](../interfaces/Color.md)

▸ **fromRGB**(`color`): [`Color`](../interfaces/Color.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `Object` |
| `color.alpha?` | `number` |
| `color.blue` | `number` |
| `color.green` | `number` |
| `color.red` | `number` |

#### Returns

[`Color`](../interfaces/Color.md)

___

### <a id="toHex" name="toHex"></a> toHex

▸ **toHex**(`color`): `string`

Get the color in 8-digit hex "#RRGGBBAA" format.

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | [`Color`](../interfaces/Color.md) |

#### Returns

`string`
