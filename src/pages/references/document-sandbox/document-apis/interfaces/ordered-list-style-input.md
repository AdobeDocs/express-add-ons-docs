[@express-document-sdk](../overview.md) / OrderedListStyleInput

# Interface: OrderedListStyleInput

Interface for specifying an ordered list style, such as a numbered list.

## Extends

-   `BaseParagraphListStyle`

## Properties

### indentLevel?

• `optional` **indentLevel**: `number`

A value from 0-8 that specifies indent/nesting level. Default is 0 if not provided.

#### Inherited from

`BaseParagraphListStyle.indentLevel`

<HorizontalLine />

### numbering?

• `optional` **numbering**: [`OrderedListNumbering`](../namespaces/constants/enumerations/ordered-list-numbering.md)

The numbering style to use. If undefined, it defaults to a different type depending on the paragraph's indent level.
The defaults for increasing indent are: 1, a, i, I, and then they repeat.
These markers and the prefix/postfix strings (if any) are displayed using the same font as the start of the
paragraph's text content.

<HorizontalLine />

### postfix?

• `optional` **postfix**: `string`

Additional string to display after each sequence number/letter, e.g. ")" or "."

<HorizontalLine />

### prefix?

• `optional` **prefix**: `string`

Additional string to display before each sequence number/letter, e.g. "("

<HorizontalLine />

### type

• **type**: [`ordered`](../namespaces/constants/enumerations/paragraph-list-type.md#ordered)
