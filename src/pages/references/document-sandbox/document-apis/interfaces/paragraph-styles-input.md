[@express-document-sdk](../overview.md) / ParagraphStylesInput

# Interface: ParagraphStylesInput

A variant of [ParagraphStyles](paragraph-styles.md) with all style fields optional, used for applyParagraphStyles(). When using that API,
any fields not specified are left unchanged, preserving the text's existing styles.

## Extends

-   `Partial`&lt;[`BaseParagraphStyles`](base-paragraph-styles.md)\ &gt;

## Extended by

-   [`ParagraphStylesRangeInput`](paragraph-styles-range-input.md)

## Properties

### lineSpacing?

• `optional` **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

`Partial.lineSpacing`

<HorizontalLine />

### list?

• `optional` **list**: [`ListStyleInput`](../type-aliases/list-style-input.md)

<HorizontalLine />

### spaceAfter?

• `optional` **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

`Partial.spaceAfter`

<HorizontalLine />

### spaceBefore?

• `optional` **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

`Partial.spaceBefore`
