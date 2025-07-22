[@express-document-sdk](../overview.md) / CharacterStyles

# Interface: CharacterStyles

Text styles that can be applied to any range of characters, even a short span like a single word. (Contrast with
ParagraphStyles, which must be applied to an entire paragraph atomically).

## Extends

-   `BaseCharacterStyles`

## Extended by

-   [`CharacterStylesRange`](CharacterStylesRange.md)

## Properties

### baselineShift

• **baselineShift**: [`TextScriptStyle`](../enumerations/TextScriptStyle.md)

Sets a superscript or subscript style.

#### Inherited from

`BaseCharacterStyles.baselineShift`

---

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
