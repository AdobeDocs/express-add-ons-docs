[@express-document-sdk](../overview.md) / ParagraphStylesRange

# Interface: ParagraphStylesRange

A set of [ParagraphStyles](ParagraphStyles.md) along with the text range they apply to. Returned by the paragraphStyleRanges getter.

## Extends

-   [`ParagraphStyles`](ParagraphStyles.md).[`StyleRange`](StyleRange.md)

## Properties

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length)

---

### lineSpacing

• **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

[`ParagraphStyles`](ParagraphStyles.md).[`lineSpacing`](ParagraphStyles.md#linespacing)

---

### list?

• `optional` **list**: `Required`<[`OrderedListStyleInput`](OrderedListStyleInput.md)\> \| `Required`<[`UnorderedListStyleInput`](UnorderedListStyleInput.md)\>

#### Inherited from

[`ParagraphStyles`](ParagraphStyles.md).[`list`](ParagraphStyles.md#list)

---

### spaceAfter

• **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStyles`](ParagraphStyles.md).[`spaceAfter`](ParagraphStyles.md#spaceafter)

---

### spaceBefore

• **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStyles`](ParagraphStyles.md).[`spaceBefore`](ParagraphStyles.md#spacebefore)
