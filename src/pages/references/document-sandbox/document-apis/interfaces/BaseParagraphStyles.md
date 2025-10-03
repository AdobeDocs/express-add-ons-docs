[@express-document-sdk](../overview.md) / BaseParagraphStyles
# Interface: BaseParagraphStyles

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Base paragraph styles that can be applied to an entire paragraph atomically.
Excludes list style settings, which differ between the getter-oriented [ParagraphStyles](ParagraphStyles.md) interface and the
setter-oriented [ParagraphStylesRangeInput](ParagraphStylesRangeInput.md).

## Extended by


- [`ParagraphStyles`](ParagraphStyles.md)


## Properties

### lineSpacing

• **lineSpacing**: `number`

Spacing between lines, aka leading, expressed as a multiple of the font size's default spacing - ex. 1.5 = 150% of normal.
It only affects the space *between* lines, not the space above the first line or below the last line.

---

### spaceAfter

• **spaceAfter**: `number`

Space after paragraph (in points). It does not affect the last paragraph. It is additive to the next paragraph's spaceBefore
(adjacent spacing does not merge/collapse together).

---

### spaceBefore

• **spaceBefore**: `number`

Space before paragraph (in points). It does not affect the first paragraph. It is additive to previous paragraph's spaceAfter
(adjacent spacing does not merge/collapse together).
