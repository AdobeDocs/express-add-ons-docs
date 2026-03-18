[**@express-document-sdk**](../overview.md)

---

# Interface: CharacterStylesRange

A set of [CharacterStyles](CharacterStyles.md) along with the range of characters they apply to. Seen in the characterStyleRanges getter.

Note that fonts returned by the getter are *not* guaranteed to be ones the user has rights to edit with, even though they
are visible in the document.

## Extends

- [`CharacterStyles`](CharacterStyles.md).[`StyleRange`](StyleRange.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| `fontSize` | `number` | Size of the text in points. | [`CharacterStyles`](CharacterStyles.md).[`fontSize`](CharacterStyles.md#fontsize) |
| `color` | [`Color`](Color.md) | Text color. | [`CharacterStyles`](CharacterStyles.md).[`color`](CharacterStyles.md#color) |
| `letterSpacing` | `number` | Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0 leaves spacing at its default. | [`CharacterStyles`](CharacterStyles.md).[`letterSpacing`](CharacterStyles.md#letterspacing) |
| `underline` | `boolean` | Adds an underline to text. | [`CharacterStyles`](CharacterStyles.md).[`underline`](CharacterStyles.md#underline) |
| `link?` | `string` | A URL hyperlink. Character ranges with a link are underlined *by default*, unless these styles explicitly specify `underline: false`. To remove a link from existing text, explicitly specify `link: ""` in [TextContentModel.applyCharacterStyles](../classes/TextContentModel.md#applycharacterstyles). | [`CharacterStyles`](CharacterStyles.md).[`link`](CharacterStyles.md#link) |
| `baselineShift` | [`TextScriptStyle`](../enumerations/TextScriptStyle.md) | Sets a superscript or subscript style. | [`CharacterStyles`](CharacterStyles.md).[`baselineShift`](CharacterStyles.md#baselineshift) |
| `font` | [`Font`](../type-aliases/Font.md) | - | [`CharacterStyles`](CharacterStyles.md).[`font`](CharacterStyles.md#font) |
| `length` | `number` | The length or number of characters in which character styles will be applied. Note: since characters are represented as UTF-16 code units, some symbols such as emojis are considered to have a length of 2. | [`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length) |
