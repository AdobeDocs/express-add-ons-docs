[@express-document-sdk](../overview.md) / ParagraphStyles

# Interface: ParagraphStyles

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Text styles that must be applied to an entire paragraph atomically. (Contrast with CharacterStyles which can be applied to
any range of characters, even a short span like one single word).

## Extends

- [`BaseParagraphStyles`](BaseParagraphStyles.md)

## Extended by

- [`ParagraphStylesRange`](ParagraphStylesRange.md)

## Properties

### lineSpacing

• **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

#### Inherited from

[`BaseParagraphStyles`](BaseParagraphStyles.md).[`lineSpacing`](BaseParagraphStyles.md#linespacing)

***

### list?

• `optional` **list**: `Required`\<[`OrderedListStyleInput`](OrderedListStyleInput.md)\> \| `Required`\<[`UnorderedListStyleInput`](UnorderedListStyleInput.md)\>

***

### spaceAfter

• **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`BaseParagraphStyles`](BaseParagraphStyles.md).[`spaceAfter`](BaseParagraphStyles.md#spaceafter)

***

### spaceBefore

• **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).

#### Inherited from

[`BaseParagraphStyles`](BaseParagraphStyles.md).[`spaceBefore`](BaseParagraphStyles.md#spacebefore)
