[@express-document-sdk](../overview.md) / Fonts

# Class: Fonts

The Fonts class provides methods to work with fonts.

## Methods

### fromPostscriptName()

• **fromPostscriptName**(`postscriptName`): `Promise` `undefined` \| [`AvailableFont`](available-font.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Get an [AvailableFont](available-font.md) that exactly matches the given PostScript name, if any. Only fonts that the user has permission to use
for editing content are returned, so the result of this call is always safe to apply to a [TextContentModel](text-content-model.md)'s styles.

#### Parameters

• **postscriptName**: `string`

The PostScript name of the font.

#### Returns

`Promise` `undefined` \| [`AvailableFont`](available-font.md)

The Font object if found and available for editing, otherwise undefined.
