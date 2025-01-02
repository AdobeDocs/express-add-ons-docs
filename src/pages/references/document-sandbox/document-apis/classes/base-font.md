[@express-document-sdk](../overview.md) / BaseFont

# Class: `abstract` BaseFont

Represents a font that is able to be rendered within this document. However, the user may not have edit permissions for
all such fonts.

## Extended by

-   [`AvailableFont`](available-font.md)
-   [`UnavailableFont`](unavailable-font.md)

## Accessors

### availableForEditing

• `get` `abstract` **availableForEditing**(): `boolean`

Whether the current user has permission to create / edit content using this font.

#### Returns

`boolean`

<hr />

### family

• `get` **family**(): `string`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The font family containing the font.

#### Returns

`string`

<hr />

### postscriptName

• `get` **postscriptName**(): `string`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The PostScript name of the font.

#### Returns

`string`

<hr />

### style

• `get` **style**(): `string`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The style of the font within the family.

#### Returns

`string`
