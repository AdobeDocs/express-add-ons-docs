[@express-document-sdk](../overview.md) / Fonts

# Class: Fonts

The Fonts class provides methods to work with fonts.

## Methods

### fromPostscriptName()

• **fromPostscriptName**(`postscriptName`): `Promise` `undefined` \| [`AvailableFont`](AvailableFont.md)

Get an [AvailableFont](AvailableFont.md) that exactly matches the given PostScript name, if any. Only fonts that the user has permission to use
for editing content are returned, so the result of this call is always safe to apply to a [TextContentModel](TextContentModel.md)'s styles.

#### Parameters

• **postscriptName**: `string`

The PostScript name of the font.

#### Returns

`Promise` `undefined` \| [`AvailableFont`](AvailableFont.md)

The Font object if found and available for editing, otherwise undefined.
