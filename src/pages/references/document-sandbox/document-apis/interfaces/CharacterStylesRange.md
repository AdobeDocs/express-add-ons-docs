[@express-document-sdk](../overview.md) / CharacterStylesRange

# Interface: CharacterStylesRange

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Output shape of the characterStyleRange getter

## Extends

-   [`CharacterStyles`](CharacterStyles.md).[`StyleRange`](StyleRange.md)

## Properties

### color

• **color**: [`Color`](Color.md)

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`color`](CharacterStyles.md#color)

---

### font

• **font**: [`Font`](../type-aliases/Font.md)

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`font`](CharacterStyles.md#font)

---

### fontSize

• **fontSize**: `number`

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`fontSize`](CharacterStyles.md#fontsize)

---

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.

#### Inherited from

[`StyleRange`](StyleRange.md).[`length`](StyleRange.md#length)

---

### tracking

• **tracking**: `number`

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`tracking`](CharacterStyles.md#tracking)

---

### underline

• **underline**: `boolean`

#### Inherited from

[`CharacterStyles`](CharacterStyles.md).[`underline`](CharacterStyles.md#underline)
