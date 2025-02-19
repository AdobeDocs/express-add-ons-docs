[@express-document-sdk](../overview.md) / ParagraphStylesRangeInput

# Interface: ParagraphStylesRangeInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

A variant of [ParagraphStylesRange](ParagraphStylesRange.md) with all style fields optional and the text range they apply to. Used for the
paragraphStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults.

The text content separates Paragraphs by newline characters (`\n`). The ranges specified here should align with
those boundaries.

## Extends

- [`ParagraphStylesInput`](ParagraphStylesInput.md).[`StyleRange`](StyleRange.md)

## Properties

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length)

***

### lineSpacing?

• `optional` **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

[`ParagraphStylesInput`](ParagraphStylesInput.md).[`lineSpacing`](ParagraphStylesInput.md#linespacing)

***

### list?

• `optional` **list**: [`OrderedListStyleInput`](OrderedListStyleInput.md) \| [`UnorderedListStyleInput`](UnorderedListStyleInput.md)

#### Inherited from

[`ParagraphStylesInput`](ParagraphStylesInput.md).[`list`](ParagraphStylesInput.md#list)

***

### spaceAfter?

• `optional` **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStylesInput`](ParagraphStylesInput.md).[`spaceAfter`](ParagraphStylesInput.md#spaceafter)

***

### spaceBefore?

• `optional` **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`ParagraphStylesInput`](ParagraphStylesInput.md).[`spaceBefore`](ParagraphStylesInput.md#spacebefore)
