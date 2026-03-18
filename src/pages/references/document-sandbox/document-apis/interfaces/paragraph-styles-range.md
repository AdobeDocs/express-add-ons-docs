---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Interface: ParagraphStylesRange

A set of [ParagraphStyles](paragraph-styles.md) along with the text range they apply to. Returned by the paragraphStyleRanges getter.

## Extends

- [`ParagraphStyles`](paragraph-styles.md).[`StyleRange`](style-range.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| `spaceBefore` | `number` | Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter (adjacent spacing does not merge/collapse together). | [`ParagraphStyles`](paragraph-styles.md).[`spaceBefore`](paragraph-styles.md#spacebefore) |
| `spaceAfter` | `number` | Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore (adjacent spacing does not merge/collapse together). | [`ParagraphStyles`](paragraph-styles.md).[`spaceAfter`](paragraph-styles.md#spaceafter) |
| `lineSpacing` | `number` | Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal. It only affects the space *between* lines, not the space above the first line or below the last line. | [`ParagraphStyles`](paragraph-styles.md).[`lineSpacing`](paragraph-styles.md#linespacing) |
| `list?` | \| `Required`&lt;[`OrderedListStyleInput`](ordered-list-style-input.md)&gt; \| `Required`&lt;[`UnorderedListStyleInput`](unordered-list-style-input.md)&gt; | - | [`ParagraphStyles`](paragraph-styles.md).[`list`](paragraph-styles.md#list) |
| `length` | `number` | The length or number of characters in which character styles will be applied. Note: since characters are represented as UTF-16 code units, some symbols such as emojis are considered to have a length of 2. | [`StyleRange`](style-range.md).[`length`](style-range.md#length) |
