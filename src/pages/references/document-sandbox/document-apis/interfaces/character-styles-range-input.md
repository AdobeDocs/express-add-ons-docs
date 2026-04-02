---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: CharacterStylesRangeInput

Variant of [CharacterStylesRange](character-styles-range.md) with all style fields optional, along with the range of characters they apply to.
Used for the characterStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults.

If specified, the font must be of the [AvailableFont](../classes/available-font.md) type – one that is guaranteed to be available for the current
user to edit with.

## Extends

- [`CharacterStylesInput`](character-styles-input.md).[`StyleRange`](style-range.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| `fontSize?` | `number` | Size of the text in points. | [`CharacterStyles`](character-styles.md).[`fontSize`](character-styles.md#fontsize) |
| `color?` | [`Color`](color.md) | Text color. | [`CharacterStyles`](character-styles.md).[`color`](character-styles.md#color) |
| `letterSpacing?` | `number` | Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0 leaves spacing at its default. | [`CharacterStyles`](character-styles.md).[`letterSpacing`](character-styles.md#letterspacing) |
| `underline?` | `boolean` | Adds an underline to text. | [`CharacterStyles`](character-styles.md).[`underline`](character-styles.md#underline) |
| `link?` | `string` | A URL hyperlink. Character ranges with a link are underlined *by default*, unless these styles explicitly specify `underline: false`. To remove a link from existing text, explicitly specify `link: ""` in [TextContentModel.applyCharacterStyles](../classes/text-content-model.md#applycharacterstyles). | [`CharacterStyles`](character-styles.md).[`link`](character-styles.md#link) |
| `baselineShift?` | [`TextScriptStyle`](../enumerations/text-script-style.md) | Sets a superscript or subscript style. | [`CharacterStyles`](character-styles.md).[`baselineShift`](character-styles.md#baselineshift) |
| `font?` | [`AvailableFont`](../classes/available-font.md) | - | [`CharacterStylesInput`](character-styles-input.md).[`font`](character-styles-input.md#font) |
| `length` | `number` | The length or number of characters in which character styles will be applied. Note: since characters are represented as UTF-16 code units, some symbols such as emojis are considered to have a length of 2. | [`StyleRange`](style-range.md).[`length`](style-range.md#length) |
