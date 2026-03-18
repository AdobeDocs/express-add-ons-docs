[**@express-document-sdk**](../overview.md)

---

# Class: ColorUtils

Utility methods for working with color values.

## Extends

- `unknown`

## Constructors

### Constructor

```ts
new ColorUtils(): ColorUtils;
```

#### Returns

`ColorUtils`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Methods

### fromRGB()

#### Call Signature

```ts
fromRGB(
   red, 
   green, 
   blue, 
   alpha?): Color;
```

Create a new color object with the given RGBA values.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `red` | `number` | The red channel, from 0 - 1. |
| `green` | `number` | The green channel, from 0 - 1. |
| `blue` | `number` | The blue channel, from 0 - 1. |
| `alpha?` | `number` | Optional alpha channel, from 0 - 1. Defaults to 1 (opaque). |

##### Returns

[`Color`](../interfaces/Color.md)

A new color object.

#### Call Signature

```ts
fromRGB(color): Color;
```

Create a new color object given a partial color object where the alpha field may be missing.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | \{ `red`: `number`; `green`: `number`; `blue`: `number`; `alpha?`: `number`; \} | Partial color object. Alpha defaults to 1 (opaque). |
| `color.red` | `number` | - |
| `color.green` | `number` | - |
| `color.blue` | `number` | - |
| `color.alpha?` | `number` | - |

##### Returns

[`Color`](../interfaces/Color.md)

A new color object with all fields present.

---

### fromHex()

```ts
fromHex(hex): Color;
```

Create a new color from its equivalent RGBA hex representation. Can specify in 6 digits (RRGGBB) or 8 digits
(RRGGBBAA), uppercase or lowercase, with or without leading "#". Alpha defaults to FF (100% opaque) if ommitted.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hex` | `string` | The color represented as a hexadecimal string. |

#### Returns

[`Color`](../interfaces/Color.md)

A new color value matching the given hex string.

#### Throws

if the hex string cannot be parsed.

---

### toHex()

```ts
toHex(color): string;
```

Get the color in 8-digit hex "#RRGGBBAA" format.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `color` | [`Color`](../interfaces/Color.md) |

#### Returns

`string`
