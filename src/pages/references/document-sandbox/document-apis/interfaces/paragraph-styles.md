[@express-document-sdk](../overview.md) / ParagraphStyles

# Interface: ParagraphStyles

Text styles that must be applied to an entire paragraph atomically. (Contrast with CharacterStyles which can be applied to
any range of characters, even a short span like one single word).

## Extends

-   [`BaseParagraphStyles`](base-paragraph-styles.md)

## Extended by

-   [`ParagraphStylesRange`](paragraph-styles-range.md)

## Properties

### lineSpacing

• **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

[`BaseParagraphStyles`](base-paragraph-styles.md).[`lineSpacing`](base-paragraph-styles.md#linespacing)

<HorizontalLine />

### list?

• `optional` **list**: `Required`&lt;[`OrderedListStyleInput`](ordered-list-style-input.md) &gt; \| `Required`&lt;[`UnorderedListStyleInput`](unordered-list-style-input.md) &gt;

<HorizontalLine />

### spaceAfter

• **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`BaseParagraphStyles`](base-paragraph-styles.md).[`spaceAfter`](base-paragraph-styles.md#spaceafter)

<HorizontalLine />

### spaceBefore

• **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`BaseParagraphStyles`](base-paragraph-styles.md).[`spaceBefore`](base-paragraph-styles.md#spacebefore)
