[@express-document-sdk](../overview.md) / CharacterStyles

# Interface: CharacterStyles

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Text styles of a range of characters, even a short span like a single word.

## Extends

-   `BaseCharacterStyles`

## Extended by

-   [`CharacterStylesRange`](character-styles-range.md)

## Properties

### color

• **color**: [`Color`](color.md)

#### Inherited from

`BaseCharacterStyles.color`

<hr />

### font

• **font**: [`Font`](../type-aliases/font.md)

<hr />

### fontSize

• **fontSize**: `number`

#### Inherited from

`BaseCharacterStyles.fontSize`

<hr />

### tracking

• **tracking**: `number`

#### Inherited from

`BaseCharacterStyles.tracking`

<hr />

### underline

• **underline**: `boolean`

#### Inherited from

`BaseCharacterStyles.underline`
