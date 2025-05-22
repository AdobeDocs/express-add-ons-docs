[@express-document-sdk](../overview.md) / CharacterStylesInput

# Interface: CharacterStylesInput

Variant of [CharacterStyles](character-styles.md) with all style fields optional, used for applyCharacterStyles(). When using that API,
any fields not specified are left unchanged, preserving the text's existing styles.

If specified, the font must be of the [AvailableFont](../classes/available-font.md) type – one that is guaranteed to be available for the current
user to edit with.

## Extends

-   `Partial`<`BaseCharacterStyles`\>

## Extended by

-   [`CharacterStylesRangeInput`](character-styles-range-input.md)

## Properties

### color?

• `optional` **color**: [`Color`](color.md)

Text color.

#### Inherited from

`Partial.color`

---

### font?

• `optional` **font**: [`AvailableFont`](../classes/available-font.md)

---

### fontSize?

• `optional` **fontSize**: `number`

Size of the text in points.

#### Inherited from

`Partial.fontSize`

---

### letterSpacing?

• `optional` **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

`Partial.letterSpacing`

---

### underline?

• `optional` **underline**: `boolean`

Adds an underline to text.

#### Inherited from

`Partial.underline`
