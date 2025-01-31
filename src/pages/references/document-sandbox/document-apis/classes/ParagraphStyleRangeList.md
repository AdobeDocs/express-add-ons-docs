[@express-document-sdk](../overview.md) / ParagraphStyleRangeList

# Class: ParagraphStyleRangeList

Internal helpers for working with paragraph style ranges.

## Extends

- `ProxyLiveObject`

## Methods

### getStyleRanges()

`Experimental`

• **getStyleRanges**(`textNodeId`): readonly [`ParagraphStylesRange`](../interfaces/ParagraphStylesRange.md)[]

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Retrieves paragraph style from a character range (length).

#### Parameters

• **textNodeId**: `string`

#### Returns

readonly [`ParagraphStylesRange`](../interfaces/ParagraphStylesRange.md)[]

***

### setStyleRanges()

`Experimental`

• **setStyleRanges**(`textNodeId`, `styles`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Sets paragraph style from a character range (length).

#### Parameters

• **textNodeId**: `string`

• **styles**: readonly [`ParagraphStylesRangeInput`](../interfaces/ParagraphStylesRangeInput.md)[]

#### Returns

`void`
