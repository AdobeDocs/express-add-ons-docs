[@express-document-sdk](../overview.md) / UnorderedListStyleInput

# Interface: UnorderedListStyleInput

Interface for specifying an unordered list style, such as a bullet list.

## Extends

-   `BaseParagraphListStyle`

## Properties

### indentLevel?

• `optional` **indentLevel**: `number`

A value from 0-8 that specifies indent/nesting level. Default is 0 if not provided.

#### Inherited from

`BaseParagraphListStyle.indentLevel`

<HorizontalLine />

### marker?

• `optional` **marker**: `string`

Marker symbol to use. If undefined, it defaults to a different symbol depending on the paragraph's indent level.
The defaults for increasing indent are: •, ◦, ◼, ◻, and then they repeat.
Markers are always displayed using the default font (SourceSans3 Regular), regardless of the font(s) used in the
paragraph's text content. A default marker is used instead if the default font does not support the symbol.

Text or Unicode glyphs are accepted to represent the list marker.

<HorizontalLine />

### type

• **type**: [`unordered`](../namespaces/constants/enumerations/paragraph-list-type.md#unordered)
