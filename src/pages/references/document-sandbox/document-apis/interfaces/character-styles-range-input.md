[@express-document-sdk](../overview.md) / CharacterStylesRangeInput

# Interface: CharacterStylesRangeInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Input shape of the characterStyleRange setter.

## Extends

-   [`CharacterStylesInput`](character-styles-input.md).[`StyleRange`](style-range.md)

## Properties

### color?

• `optional` **color**: [`Color`](color.md)

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`color`](character-styles-input.md#color)

<hr />

### font?

• `optional` **font**: [`AvailableFont`](../classes/available-font.md)

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`font`](character-styles-input.md#font)

<hr />

### fontSize?

• `optional` **fontSize**: `number`

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`fontSize`](character-styles-input.md#fontsize)

<hr />

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](style-range.md).[`length`](style-range.md#length)

<hr />

### tracking?

• `optional` **tracking**: `number`

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`tracking`](character-styles-input.md#tracking)

<hr />

### underline?

• `optional` **underline**: `boolean`

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`underline`](character-styles-input.md#underline)
