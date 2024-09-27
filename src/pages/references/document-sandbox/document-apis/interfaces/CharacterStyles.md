[@express-document-sdk](../overview.md) / CharacterStyles

# Interface: CharacterStyles

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ___experimental only___ and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Text styles of a range of characters, even a short span like a single word.

## Extends

-   `BaseCharacterStyles`

## Extended by

-   [`CharacterStylesRange`](CharacterStylesRange.md)

## Properties

### color

• **color**: [`Color`](Color.md)

#### Inherited from

`BaseCharacterStyles.color`

---

### font

• **font**: [`Font`](../type-aliases/Font.md)

---

### fontSize

• **fontSize**: `number`

#### Inherited from

`BaseCharacterStyles.fontSize`

---

### tracking

• **tracking**: `number`

#### Inherited from

`BaseCharacterStyles.tracking`

---

### underline

• **underline**: `boolean`

#### Inherited from

`BaseCharacterStyles.underline`
