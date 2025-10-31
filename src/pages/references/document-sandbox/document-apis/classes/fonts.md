[@express-document-sdk](../overview.md) / Fonts

# Class: Fonts

The Fonts class provides methods to work with fonts.

## Methods

### fromPostscriptName()

• **fromPostscriptName**(`postscriptName`): `Promise`&lt;`undefined` \| [`AvailableFont`](available-font.md)\ &gt;

Get an [AvailableFont](available-font.md) that exactly matches the given PostScript name, if any. Only fonts that the user has permission to use
for editing content are returned, so the result of this call is always safe to apply to a [TextContentModel](text-content-model.md)'s styles.

#### Parameters

• **postscriptName**: `string`

The PostScript name of the font.

#### Returns

`Promise`&lt;`undefined` \| [`AvailableFont`](available-font.md)\ &gt;

The Font object if found and available for editing, otherwise undefined.
