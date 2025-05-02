[@express-document-sdk](../overview.md) / CharacterStylesRange

# Interface: CharacterStylesRange

A set of [CharacterStyles](character-styles.md) along with the range of characters they apply to. Seen in the characterStyleRanges getter.

Note that fonts returned by the getter are *not* guaranteed to be ones the user has rights to edit with, even though they
are visible in the document.

## Extends

-   [`CharacterStyles`](character-styles.md).[`StyleRange`](style-range.md)

## Properties

### color

• **color**: [`Color`](color.md)

Text color.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`color`](character-styles.md#color)

<hr />

### font

• **font**: [`Font`](../type-aliases/font.md)

#### Inherited from

[`CharacterStyles`](character-styles.md).[`font`](character-styles.md#font)

<hr />

### fontSize

• **fontSize**: `number`

Size of the text in points.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`fontSize`](character-styles.md#fontsize)

<hr />

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](style-range.md).[`length`](style-range.md#length)

<hr />

### letterSpacing

• **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`letterSpacing`](character-styles.md#letterspacing)

<hr />

### underline

• **underline**: `boolean`

Adds an underline to text.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`underline`](character-styles.md#underline)
