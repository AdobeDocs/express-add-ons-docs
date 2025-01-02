[@express-document-sdk](../overview.md) / CharacterStylesRange

# Interface: CharacterStylesRange

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Output shape of the characterStyleRange getter.

## Extends

-   [`CharacterStyles`](character-styles.md).[`StyleRange`](style-range.md)

## Properties

### color

• **color**: [`Color`](color.md)

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

### tracking

• **tracking**: `number`

#### Inherited from

[`CharacterStyles`](character-styles.md).[`tracking`](character-styles.md#tracking)

<hr />

### underline

• **underline**: `boolean`

#### Inherited from

[`CharacterStyles`](character-styles.md).[`underline`](character-styles.md#underline)
