[@express-document-sdk](../overview.md) / AvailableFont

# Class: AvailableFont

Font the current user has access or licensing permissions to create / edit content with.

## Extends

-   [`BaseFont`](BaseFont.md)

## Accessors

### availableForEditing

• `get` **availableForEditing**(): `true`

Whether the current user has permission to create / edit content using this font.

#### Returns

`true`

---

### family

• `get` **family**(): `string`

The font family containing the font.

#### Returns

`string`

---

### isPremium

• `get` **isPremium**(): `boolean`

Whether the font is a premium Adobe font.

#### Returns

`boolean`

---

### postscriptName

• `get` **postscriptName**(): `string`

The PostScript name of the font.

#### Returns

`string`

---

### style

• `get` **style**(): `string`

The style of the font within the family.

#### Returns

`string`
