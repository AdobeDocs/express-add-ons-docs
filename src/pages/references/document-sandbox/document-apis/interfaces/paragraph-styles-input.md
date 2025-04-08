[@express-document-sdk](../overview.md) / ParagraphStylesInput

# Interface: ParagraphStylesInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The variant of [ParagraphStyles](ParagraphStyles.md) with all optional style fields is used to apply ParagraphStyles(). When using that API,
any fields not specified are left unchanged, preserving the text's existing styles.

## Extends

-   `Partial` [`BaseParagraphStyles`](BaseParagraphStyles.md)

## Extended by

-   [`ParagraphStylesRangeInput`](ParagraphStylesRangeInput.md)

## Properties

### lineSpacing?

• `optional` **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

`Partial.lineSpacing`

<hr />

### list?

• `optional` **list**: [`OrderedListStyleInput`](OrderedListStyleInput.md) \| [`UnorderedListStyleInput`](UnorderedListStyleInput.md)

<hr />

### spaceAfter?

• `optional` **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

`Partial.spaceAfter`

<hr />

### spaceBefore?

• `optional` **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

`Partial.spaceBefore`
