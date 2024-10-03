[@express-document-sdk](../overview.md) / UnavailableFont

# Class: UnavailableFont

Font the current user does not have access or licensing permissions to create / edit content with.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

## Extends

-   [`BaseFont`](BaseFont.md)

## Accessors

### availableForEditing

• `get` **availableForEditing**(): `false`

Whether the current user has permission to create / edit content using this font.

#### Returns

`false`

---

### family

• `get` **family**(): `string`

The font family containing the font.

#### Returns

`string`

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
