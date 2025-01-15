[@express-document-sdk](../overview.md) / CharacterStylesInput

# Interface: CharacterStylesInput

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Variant of [CharacterStyles](CharacterStyles.md) with all style fields optional, used for applyCharacterStyles(). When using that API,
any fields not specified are left unchanged, preserving the text's existing styles.

If specified, the font must be of the [AvailableFont](../classes/AvailableFont.md) type – one that is guaranteed to be available for the current
user to edit with.

## Extends

-   `Partial`<`BaseCharacterStyles`\>

## Extended by

-   [`CharacterStylesRangeInput`](CharacterStylesRangeInput.md)

## Properties

### color?

• `optional` **color**: [`Color`](Color.md)

Text color.

#### Inherited from

`Partial.color`

---

### font?

• `optional` **font**: [`AvailableFont`](../classes/AvailableFont.md)

---

### fontSize?

• `optional` **fontSize**: `number`

Size of the text in points.

#### Inherited from

`Partial.fontSize`

---

### tracking?

• `optional` **tracking**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

`Partial.tracking`

---

### underline?

• `optional` **underline**: `boolean`

Adds an underline to text.

#### Inherited from

`Partial.underline`
