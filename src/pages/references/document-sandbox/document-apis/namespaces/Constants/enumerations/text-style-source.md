[@express-document-sdk](../../../overview.md) / [Constants](../overview.md) / TextStyleSource

# Enumeration: TextStyleSource

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../../../manifest/index.md#requirements) section of the `manifest.json`.

Indicates which existing text to match the style of when inserting new text or replacing text.

## Enumeration Members

### afterInsertionPoint

• **afterInsertionPoint**: `1`

Use style of the character just after the insertion point (which is always on the same line/paragraph, since lines end
with a `\n` character; an insertion point past this is inserting on the next line). If there is no character after the
insertion point, the insertion point is at the end of the text (appending) and the style of the previous character is
used instead. This option is useful when *pre*pending to an existing block of text.

---

### beforeInsertionPoint

• **beforeInsertionPoint**: `0`

Use style of the character just before the insertion point, *unless* that character is not on the same line (same
paragraph) in which case falls back to afterInsertionPoint behavior. This generally matches the style a user would
get in the UI if they place their cursor at this insertion point.

---

### firstReplacedCharacter

• **firstReplacedCharacter**: `2`

When replacing existing text, use the style of the first character in the replaced text. This may feel more
predictable to users than the styles on either side of the replaced text. E.g. if replacing a single word one-to-one
with a new word, and the replaced word has a style unique to the text on either side of it, one may expect the new
text to match that original word's style.
