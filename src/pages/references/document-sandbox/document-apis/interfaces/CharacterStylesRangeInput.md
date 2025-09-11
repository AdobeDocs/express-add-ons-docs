[@express-document-sdk](../overview.md) / CharacterStylesRangeInput

# Interface: CharacterStylesRangeInput

Variant of [CharacterStylesRange](CharacterStylesRange.md) with all style fields optional, along with the range of characters they apply to.
Used for the characterStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults.

If specified, the font must be of the [AvailableFont](../classes/AvailableFont.md) type – one that is guaranteed to be available for the current
user to edit with.

## Extends

-   [`CharacterStylesInput`](CharacterStylesInput.md).[`StyleRange`](StyleRange.md)

## Properties

### baselineShift?

• `optional` **baselineShift**: [`TextScriptStyle`](../enumerations/TextScriptStyle.md)

Sets a superscript or subscript style.

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`baselineShift`](CharacterStylesInput.md#baselineshift)

---

### color?

• `optional` **color**: [`Color`](Color.md)

Text color.

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

Size of the text in points.

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

### letterSpacing?

• `optional` **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`letterSpacing`](CharacterStylesInput.md#letterspacing)

---

### link?

• `optional` **link**: `string`

A URL hyperlink. Character ranges with a link are underlined *by default*, unless these styles explicitly specify
`underline: false`.

To remove a link from existing text, explicitly specify `link: ""` in [TextContentModel.applyCharacterStyles](../classes/TextContentModel.md#applycharacterstyles).

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`link`](CharacterStylesInput.md#link)

---

### underline?

• `optional` **underline**: `boolean`

Adds an underline to text.

#### Inherited from

[`CharacterStylesInput`](CharacterStylesInput.md).[`underline`](CharacterStylesInput.md#underline)
