[@express-document-sdk](../overview.md) / ParagraphStylesRange

# Interface: ParagraphStylesRange

A set of [ParagraphStyles](paragraph-styles.md) along with the text range they apply to. Returned by the paragraphStyleRanges getter.

## Extends

-   [`ParagraphStyles`](paragraph-styles.md).[`StyleRange`](style-range.md)

## Properties

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.

<InlineAlert slots="text" variant="info"/>

Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](style-range.md).[`length`](style-range.md#length)

---

### lineSpacing

• **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

[`ParagraphStyles`](paragraph-styles.md).[`lineSpacing`](paragraph-styles.md#linespacing)

---

### list?

• `optional` **list**: `Required`<[`OrderedListStyleInput`](ordered-list-style-input.md)\> \| `Required`<[`UnorderedListStyleInput`](unordered-list-style-input.md)\>

#### Inherited from

[`ParagraphStyles`](paragraph-styles.md).[`list`](paragraph-styles.md#list)

---

### spaceAfter

• **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStyles`](paragraph-styles.md).[`spaceAfter`](paragraph-styles.md#spaceafter)

---

### spaceBefore

• **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStyles`](paragraph-styles.md).[`spaceBefore`](paragraph-styles.md#spacebefore)
