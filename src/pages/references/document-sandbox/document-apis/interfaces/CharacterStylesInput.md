[**@express-document-sdk**](../overview.md)

---

# Interface: CharacterStylesInput

Variant of [CharacterStyles](CharacterStyles.md) with all style fields optional, used for applyCharacterStyles(). When using that API,
any fields not specified are left unchanged, preserving the text's existing styles.

If specified, the font must be of the [AvailableFont](../classes/AvailableFont.md) type – one that is guaranteed to be available for the current
user to edit with.

## Extends

- `Partial`<`BaseCharacterStyles`\>

## Extended by

- [`CharacterStylesRangeInput`](CharacterStylesRangeInput.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| `fontSize?` | `number` | Size of the text in points. | [`CharacterStyles`](CharacterStyles.md).[`fontSize`](CharacterStyles.md#fontsize) |
| `color?` | [`Color`](Color.md) | Text color. | [`CharacterStyles`](CharacterStyles.md).[`color`](CharacterStyles.md#color) |
| `letterSpacing?` | `number` | Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0 leaves spacing at its default. | [`CharacterStyles`](CharacterStyles.md).[`letterSpacing`](CharacterStyles.md#letterspacing) |
| `underline?` | `boolean` | Adds an underline to text. | [`CharacterStyles`](CharacterStyles.md).[`underline`](CharacterStyles.md#underline) |
| `link?` | `string` | A URL hyperlink. Character ranges with a link are underlined *by default*, unless these styles explicitly specify `underline: false`. To remove a link from existing text, explicitly specify `link: ""` in [TextContentModel.applyCharacterStyles](../classes/TextContentModel.md#applycharacterstyles). | [`CharacterStyles`](CharacterStyles.md).[`link`](CharacterStyles.md#link) |
| `baselineShift?` | [`TextScriptStyle`](../enumerations/TextScriptStyle.md) | Sets a superscript or subscript style. | [`CharacterStyles`](CharacterStyles.md).[`baselineShift`](CharacterStyles.md#baselineshift) |
| `font?` | [`AvailableFont`](../classes/AvailableFont.md) | - | - |
