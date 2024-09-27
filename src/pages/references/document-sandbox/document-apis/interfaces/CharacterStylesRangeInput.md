[@express-document-sdk](../overview.md) / CharacterStylesRangeInput

# Interface: CharacterStylesRangeInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ___experimental only___ and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Input shape of the characterStyleRange setter

## Extends

-   [`CharacterStylesInput`](CharacterStylesInput.md).[`StyleRange`](StyleRange.md)

## Properties

### color?

• `optional` **color**: [`Color`](Color.md)

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`color`](CharacterStylesInput.md#color)

---

### font?

• `optional` **font**: [`AvailableFont`](../classes/AvailableFont.md)

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`font`](CharacterStylesInput.md#font)

---

### fontSize?

• `optional` **fontSize**: `number`

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`fontSize`](CharacterStylesInput.md#fontsize)

---

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length)

---

### tracking?

• `optional` **tracking**: `number`

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`tracking`](CharacterStylesInput.md#tracking)

---

### underline?

• `optional` **underline**: `boolean`

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`underline`](CharacterStylesInput.md#underline)
