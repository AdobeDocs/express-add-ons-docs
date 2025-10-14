[@express-document-sdk](../overview.md) / CharacterStylesRange

# Interface: CharacterStylesRange

A set of [CharacterStyles](character-styles.md) along with the range of characters they apply to. Seen in the characterStyleRanges getter.

Note that fonts returned by the getter are *not* guaranteed to be ones the user has rights to edit with, even though they
are visible in the document.

## Extends

-   [`CharacterStyles`](character-styles.md).[`StyleRange`](style-range.md)

## Properties

### baselineShift

• **baselineShift**: [`TextScriptStyle`](../enumerations/text-script-style.md)

Sets a superscript or subscript style.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`baselineShift`](character-styles.md#baselineshift)

<HorizontalLine />

### color

• **color**: [`Color`](color.md)

Text color.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`color`](character-styles.md#color)

<HorizontalLine />

### font

• **font**: [`Font`](../type-aliases/font.md)

#### Inherited from

[`CharacterStyles`](character-styles.md).[`font`](character-styles.md#font)

<HorizontalLine />

### fontSize

• **fontSize**: `number`

Size of the text in points.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`fontSize`](character-styles.md#fontsize)

<HorizontalLine />

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](style-range.md).[`length`](style-range.md#length)

<HorizontalLine />

### letterSpacing

• **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`letterSpacing`](character-styles.md#letterspacing)

<HorizontalLine />

### link?

• `optional` **link**: `string`

A URL hyperlink. Character ranges with a link are underlined *by default*, unless these styles explicitly specify
`underline: false`.

To remove a link from existing text, explicitly specify `link: ""` in [TextContentModel.applyCharacterStyles](../classes/text-content-model.md#applycharacterstyles).

#### Inherited from

[`CharacterStyles`](character-styles.md).[`link`](character-styles.md#link)

<HorizontalLine />

### underline

• **underline**: `boolean`

Adds an underline to text.

#### Inherited from

[`CharacterStyles`](character-styles.md).[`underline`](character-styles.md#underline)
