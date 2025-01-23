[@express-document-sdk](../overview.md) / CharacterStylesRange

# Interface: CharacterStylesRange

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

A set of [CharacterStyles](CharacterStyles.md) along with the range of characters they apply to. Seen in the characterStyleRanges getter.

Note that fonts returned by the getter are *not* guaranteed to be ones the user has rights to edit with, even though they
are visible in the document.

## Extends

-   [`CharacterStyles`](CharacterStyles.md).[`StyleRange`](StyleRange.md)

## Properties

### color

• **color**: [`Color`](Color.md)

Text color.

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`color`](CharacterStyles.md#color)

---

### font

• **font**: [`Font`](../type-aliases/Font.md)

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`font`](CharacterStyles.md#font)

---

### fontSize

• **fontSize**: `number`

Size of the text in points.

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`fontSize`](CharacterStyles.md#fontsize)

---

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length)

---

### letterSpacing

• **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`letterSpacing`](CharacterStyles.md#letterspacing)

---

### underline

• **underline**: `boolean`

Adds an underline to text.

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`underline`](CharacterStyles.md#underline)
