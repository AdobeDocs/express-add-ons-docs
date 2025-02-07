[@express-document-sdk](../overview.md) / BaseParagraphListStyle

# Interface: BaseParagraphListStyle

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

BaseParagraphListStyle interface represents common properties shared between ordered and unordered list types.

## Extended by

- [`OrderedListStyleInput`](OrderedListStyleInput.md)
- [`UnorderedListStyleInput`](UnorderedListStyleInput.md)

## Properties

### indentLevel?

• `optional` **indentLevel**: `number`

A value from 0-8 that specifies indent/nesting level. Default is 0 if not provided.
