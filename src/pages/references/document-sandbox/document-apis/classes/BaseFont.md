[@express-document-sdk](../overview.md) / BaseFont

# Class: `abstract` BaseFont

Represents a font that is able to be rendered within this document. However, the user may not have edit permissions for
all such fonts.

## Extended by

-   [`AvailableFont`](AvailableFont.md)
-   [`UnavailableFont`](UnavailableFont.md)

## Accessors

### availableForEditing

• `get` `abstract` **availableForEditing**(): `boolean`

Whether the current user has permission to create / edit content using this font.

#### Returns

`boolean`

***

### family

• `get` **family**(): `string`

#### Returns

`string`

***

### postscriptName

• `get` **postscriptName**(): `string`

#### Returns

`string`

***

### style

• `get` **style**(): `string`

#### Returns

`string`
