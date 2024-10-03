[@express-document-sdk](../overview.md) / CharacterStylesInput

# Interface: CharacterStylesInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Input shape of the applyCharacterStyle API.

## Extends

-   `Partial`<`BaseCharacterStyles`\>

## Extended by

-   [`CharacterStylesRangeInput`](CharacterStylesRangeInput.md)

## Properties

### color?

• `optional` **color**: [`Color`](Color.md)

#### Inherited from

`Partial.color`

---

### font?

• `optional` **font**: [`AvailableFont`](../classes/AvailableFont.md)

---

### fontSize?

• `optional` **fontSize**: `number`

#### Inherited from

`Partial.fontSize`

---

### tracking?

• `optional` **tracking**: `number`

#### Inherited from

`Partial.tracking`

---

### underline?

• `optional` **underline**: `boolean`

#### Inherited from

`Partial.underline`
