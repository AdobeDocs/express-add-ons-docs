[@express-document-sdk](../overview.md) / Fonts

# Class: Fonts

The Fonts class provides methods to work with fonts.

## Methods

### fromPostscriptName()

`Experimental`

• **fromPostscriptName**(`postscriptName`): `Promise`<`undefined` \| [`AvailableFont`](AvailableFont.md)\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ___experimental only___ and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Get Font that is an exact match to the given PostScript name, if any. Only returns fonts that the user has permission to use
to edit content, so the result of this call is always safe to apply to a TextNode's styles.

#### Parameters

• **postscriptName**: `string`

The PostScript name of the font.

#### Returns

`Promise`<`undefined` \| [`AvailableFont`](AvailableFont.md)\>

The Font object if found, otherwise undefined.
