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

### alpha

• `get` **alpha**(): `number`

The alpha channel in range from 0 - 1.

#### Returns

`number`

___

### blue

• `get` **blue**(): `number`

The blue channel in range from 0 - 1.

#### Returns

`number`

___

### colorSpace

• `get` **colorSpace**(): [`sRGB`](../enums/ColorSpace.md#sRGB)

This color's color space. Currently only sRGB is supported.

#### Returns

[`sRGB`](../enums/ColorSpace.md#sRGB)

___

### green

• `get` **green**(): `number`

The green channel in range from 0 - 1.

#### Returns

`number`

___

### red

• `get` **red**(): `number`

The red channel in range from 0 - 1.

#### Returns

`number`

## Methods

### getHex

▸ **getHex**(): `string`

Get the color in 8-digit hex "#RRGGBBAA" format.

#### Returns

`string`
