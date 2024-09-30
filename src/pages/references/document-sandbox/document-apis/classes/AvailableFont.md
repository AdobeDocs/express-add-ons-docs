[@express-document-sdk](../overview.md) / AvailableFont

# Class: AvailableFont

Font the current user has access or licensing permissions to create / edit content with.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

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

#### Returns

`string`

---

### isPremium

• `get` **isPremium**(): `boolean`

#### Returns

`boolean`

---

### postscriptName

• `get` **postscriptName**(): `string`

#### Returns

`string`

---

### style

• `get` **style**(): `string`

#### Returns

`string`
