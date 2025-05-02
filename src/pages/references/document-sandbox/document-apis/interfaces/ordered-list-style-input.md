[@express-document-sdk](../overview.md) / OrderedListStyleInput

# Interface: OrderedListStyleInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Interface for specifying an ordered list style, such as a numbered list.

## Extends

-   `BaseParagraphListStyle`

## Properties

### indentLevel?

• `optional` **indentLevel**: `number`

A value from 0-8 that specifies indent/nesting level. Default is 0 if not provided.

#### Inherited from

`BaseParagraphListStyle.indentLevel`

<hr />

### numbering?

• `optional` **numbering**: [`OrderedListNumbering`](../namespaces/Constants/enumerations/ordered-list-numbering.md)

The numbering style to use. If undefined, it defaults to a different type depending on the paragraph's indent level.
The defaults for increasing indent are 1, a, i, I, and then they repeat.
These markers and the prefix/postfix strings (if any) are displayed using the same font as the start of the
paragraph's text content.

<hr />

### postfix?

• `optional` **postfix**: `string`

Additional string to display after each sequence number/letter, e.g. ")" or "."

<hr />

### prefix?

• `optional` **prefix**: `string`

Additional string to display before each sequence number/letter, e.g. "("

<hr />

### type

• **type**: [`ordered`](../namespaces/Constants/enumerations/paragraph-list-type.md#ordered)
