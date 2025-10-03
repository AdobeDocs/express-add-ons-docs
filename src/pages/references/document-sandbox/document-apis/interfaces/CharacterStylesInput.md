[@express-document-sdk](../overview.md) / CharacterStylesInput
# Interface: CharacterStylesInput

Variant of [CharacterStyles](CharacterStyles.md) with all style fields optional, used for applyCharacterStyles(). When using that API,
any fields not specified are left unchanged, preserving the text's existing styles.

If specified, the font must be of the [AvailableFont](../classes/AvailableFont.md) type – one that is guaranteed to be available for the current
user to edit with.



- `Partial`<`BaseCharacterStyles`\>


## Extended by


- [`CharacterStylesRangeInput`](CharacterStylesRangeInput.md)


## Properties

### baselineShift?

• `optional` **baselineShift**: [`TextScriptStyle`](../enumerations/TextScriptStyle.md)

Sets a superscript or subscript style.

#### Inherited from

`Partial.baselineShift`

---

### color?

• `optional` **color**: [`Color`](Color.md)

Text color.

#### Inherited from

`Partial.color`

---

### font?

• `optional` **font**: [`AvailableFont`](../classes/AvailableFont.md)

---

### fontSize?

• `optional` **fontSize**: `number`

Size of the text in points.

#### Inherited from

`Partial.fontSize`

---

### letterSpacing?

• `optional` **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

`Partial.letterSpacing`

---

### link?

• `optional` **link**: `string`

A URL hyperlink. Character ranges with a link are underlined *by default*, unless these styles explicitly specify
`underline: false`.

To remove a link from existing text, explicitly specify `link: ""` in [TextContentModel.applyCharacterStyles](../classes/TextContentModel.md#applycharacterstyles).

#### Inherited from

`Partial.link`

---

### underline?

• `optional` **underline**: `boolean`

Adds an underline to text.

#### Inherited from

`Partial.underline`
