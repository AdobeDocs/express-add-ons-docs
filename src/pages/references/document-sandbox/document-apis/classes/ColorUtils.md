[@express-document-sdk](../overview.md) / ColorUtils

# Class: ColorUtils

Utility methods for working with color values.

## Hierarchy

- `ProxyLiveObject`

  ↳ **`ColorUtils`**



## Methods

### fromHex

▸ **fromHex**(`hex`): [`Color`](../interfaces/Color.md)

Create a new color from its equivalent RGBA hex representation. Can specify in 6 digits (RRGGBB) or 8 digits
(RRGGBBAA), uppercase or lowercase, with or without leading "#". Alpha defaults to FF (100% opaque) if ommitted.

**`Throws`**

if the hex string cannot be parsed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The color represented as a hexadecimal string. |

#### Returns

[`Color`](../interfaces/Color.md)

A new color value matching the given hex string.

___

### fromRGB

▸ **fromRGB**(`red`, `green`, `blue`, `alpha?`): [`Color`](../interfaces/Color.md)

Create a new color object with the given RGBA values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `red` | `number` | The red channel, from 0 - 1. |
| `green` | `number` | The green channel, from 0 - 1. |
| `blue` | `number` | The blue channel, from 0 - 1. |
| `alpha?` | `number` | Optional alpha channel, from 0 - 1. Defaults to 1 (opaque). |

#### Returns

[`Color`](../interfaces/Color.md)

A new color object.

▸ **fromRGB**(`color`): [`Color`](../interfaces/Color.md)

Create a new color object given a partial color object where the alpha field may be missing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `Object` | Partial color object. Alpha defaults to 1 (opaque). |
| `color.alpha?` | `number` | - |
| `color.blue` | `number` | - |
| `color.green` | `number` | - |
| `color.red` | `number` | - |

#### Returns

[`Color`](../interfaces/Color.md)

A new color object with all fields present.

___

### toHex

▸ **toHex**(`color`): `string`

Get the color in 8-digit hex "#RRGGBBAA" format.

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | [`Color`](../interfaces/Color.md) |

#### Returns

`string`
