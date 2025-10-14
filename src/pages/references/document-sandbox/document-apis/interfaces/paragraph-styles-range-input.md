[@express-document-sdk](../overview.md) / ParagraphStylesRangeInput

# Interface: ParagraphStylesRangeInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

A variant of [ParagraphStylesRange](paragraph-styles-range.md) with all style fields optional and the text range they apply to. Used for the
paragraphStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults.

Paragraphs are separated by newline characters (`\n`). The ranges specified here should align with
those boundaries.

## Extends

-   [`ParagraphStylesInput`](paragraph-styles-input.md).[`StyleRange`](style-range.md)

## Properties

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](style-range.md).[`length`](style-range.md#length)

<HorizontalLine />

### lineSpacing?

• `optional` **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

[`ParagraphStylesInput`](paragraph-styles-input.md).[`lineSpacing`](paragraph-styles-input.md#linespacing)

<HorizontalLine />

### list?

• `optional` **list**: [`OrderedListStyleInput`](ordered-list-style-input.md) \| [`UnorderedListStyleInput`](unordered-list-style-input.md)

#### Inherited from

[`ParagraphStylesInput`](paragraph-styles-input.md).[`list`](paragraph-styles-input.md#list)

<HorizontalLine />

### spaceAfter?

• `optional` **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStylesInput`](paragraph-styles-input.md).[`spaceAfter`](paragraph-styles-input.md#spaceafter)

<HorizontalLine />

### spaceBefore?

• `optional` **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStylesInput`](paragraph-styles-input.md).[`spaceBefore`](paragraph-styles-input.md#spacebefore)
