[@express-document-sdk](../overview.md) / CharacterStyles

# Interface: CharacterStyles

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Text styles that can be applied to any range of characters, even a short span like a single word. (Contrast with
ParagraphStyles, which must be applied to an entire paragraph atomically).

## Extends

-   `BaseCharacterStyles`

## Extended by

-   [`CharacterStylesRange`](CharacterStylesRange.md)

## Properties

### color

• **color**: [`Color`](Color.md)

Text color.

#### Inherited from

`BaseCharacterStyles.color`

---

### font

• **font**: [`Font`](../type-aliases/Font.md)

---

### fontSize

• **fontSize**: `number`

Size of the text in points.

#### Inherited from

`BaseCharacterStyles.fontSize`

---

### letterSpacing

• **letterSpacing**: `number`

Uniformly adjusts the letter spacing, aka character spacing. Specified as a delta relative to the font's default
spacing, in units of 1/1000 em: positive values increase the spacing, negative values tighten the spacing, and 0
leaves spacing at its default.

#### Inherited from

`BaseCharacterStyles.letterSpacing`

---

### underline

• **underline**: `boolean`

Adds an underline to text.

#### Inherited from

`BaseCharacterStyles.underline`
