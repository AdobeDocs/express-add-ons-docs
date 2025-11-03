[@express-document-sdk](../overview.md) / BaseParagraphStyles

# Interface: BaseParagraphStyles

Base paragraph styles that can be applied to an entire paragraph atomically.
Excludes list style settings, which differ between the getter-oriented [ParagraphStyles](paragraph-styles.md) interface and the
setter-oriented [ParagraphStylesRangeInput](paragraph-styles-range-input.md).

## Extended by

-   [`ParagraphStyles`](paragraph-styles.md)

## Properties

### lineSpacing

• **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

<HorizontalLine />

### spaceAfter

• **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

<HorizontalLine />

### spaceBefore

• **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).
