[@add-on-hlapi-sdk](../overview.md) / Color

# Class: Color

Represents a color in a defined RGB colorspace. Value is immutable – to change, create a new Color object.

## Hierarchy

- `ProxyLiveObject`

  ↳ **`Color`**

## Table of contents

### Accessors

- [alpha](Color.md#alpha)
- [blue](Color.md#blue)
- [colorSpace](Color.md#colorSpace)
- [green](Color.md#green)
- [red](Color.md#red)

### Methods

- [getHex](Color.md#getHex)

## Accessors

### <a id="alpha" name="alpha"></a> alpha

• `get` **alpha**(): `number`

The alpha channel in range from 0 - 1.

#### Returns

`number`

___

### <a id="blue" name="blue"></a> blue

• `get` **blue**(): `number`

The blue channel in range from 0 - 1.

#### Returns

`number`

___

### <a id="colorSpace" name="colorSpace"></a> colorSpace

• `get` **colorSpace**(): [`sRGB`](../enums/ColorSpace.md#sRGB)

This color's color space. Currently only sRGB is supported.

#### Returns

[`sRGB`](../enums/ColorSpace.md#sRGB)

___

### <a id="green" name="green"></a> green

• `get` **green**(): `number`

The green channel in range from 0 - 1.

#### Returns

`number`

___

### <a id="red" name="red"></a> red

• `get` **red**(): `number`

The red channel in range from 0 - 1.

#### Returns

`number`

## Methods

### <a id="getHex" name="getHex"></a> getHex

▸ **getHex**(): `string`

Get the color in 8-digit hex "#RRGGBBAA" format.

#### Returns

`string`
