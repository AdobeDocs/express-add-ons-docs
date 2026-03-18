[**@express-document-sdk**](../overview.md)

---

# Interface: ParagraphStylesRangeInput

A variant of [ParagraphStylesRange](ParagraphStylesRange.md) with all style fields optional, along with the text range they apply to. Used for the
paragraphStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults.

Paragraphs are separated by newline characters (`\n`). Ranges specified here should align with those boundaries.

## Extends

- [`ParagraphStylesInput`](ParagraphStylesInput.md).[`StyleRange`](StyleRange.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| `spaceBefore?` | `number` | Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter (adjacent spacing does not merge/collapse together). | [`BaseParagraphStyles`](BaseParagraphStyles.md).[`spaceBefore`](BaseParagraphStyles.md#spacebefore) |
| `spaceAfter?` | `number` | Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore (adjacent spacing does not merge/collapse together). | [`BaseParagraphStyles`](BaseParagraphStyles.md).[`spaceAfter`](BaseParagraphStyles.md#spaceafter) |
| `lineSpacing?` | `number` | Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal. It only affects the space *between* lines, not the space above the first line or below the last line. | [`BaseParagraphStyles`](BaseParagraphStyles.md).[`lineSpacing`](BaseParagraphStyles.md#linespacing) |
| `list?` | [`ListStyleInput`](../type-aliases/ListStyleInput.md) | - | [`ParagraphStylesInput`](ParagraphStylesInput.md).[`list`](ParagraphStylesInput.md#list) |
| `length` | `number` | The length or number of characters in which character styles will be applied. Note: since characters are represented as UTF-16 code units, some symbols such as emojis are considered to have a length of 2. | [`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length) |
