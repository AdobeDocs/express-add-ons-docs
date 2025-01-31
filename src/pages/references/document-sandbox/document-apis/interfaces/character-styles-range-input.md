[@express-document-sdk](../overview.md) / CharacterStylesRangeInput

# Interface: CharacterStylesRangeInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Variant of [CharacterStylesRange](CharacterStylesRange.md) with all style fields optional, along with the range of characters they apply to.
Used for the characterStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults.

If specified, the font must be of the [AvailableFont](../classes/AvailableFont.md) type – one that is guaranteed to be available for the current
user to edit with.

## Extends

-   [`CharacterStylesInput`](character-styles-input.md).[`StyleRange`](style-range.md)

## Properties

### color?

• `optional` **color**: [`Color`](Color.md)
 
Text color.

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

Size of the text in points.

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`fontSize`](character-styles-input.md#fontsize)

<hr />

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length)

---

### letterSpacing?
 
• `optional` **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`tracking`](character-styles-input.md#tracking)

<hr />

### underline?

• `optional` **underline**: `boolean`

Adds an underline to text.

#### Inherited from

[`CharacterStylesInput`](character-styles-input.md).[`underline`](character-styles-input.md#underline)
