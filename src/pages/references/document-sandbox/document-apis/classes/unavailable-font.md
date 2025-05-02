[@express-document-sdk](../overview.md) / UnavailableFont

# Class: UnavailableFont

Font the current user does not have access or licensing permissions to create / edit content with.

## Extends

-   [`BaseFont`](base-font.md)

## Accessors

### availableForEditing

• `get` **availableForEditing**(): `false`

Whether the current user has permission to create / edit content using this font.

#### Returns

`false`

<hr />

### family

• `get` **family**(): `string`

The font family containing the font.

#### Returns

`string`

<hr />

### postscriptName

• `get` **postscriptName**(): `string`

The PostScript name of the font.

#### Returns

`string`

<hr />

### style

• `get` **style**(): `string`

The style of the font within the family.

#### Returns

`string`
