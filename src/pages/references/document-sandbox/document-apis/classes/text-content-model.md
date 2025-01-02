[@express-document-sdk](../overview.md) / TextContentModel

# Class: TextContentModel

Represents a complete piece of text content flow, which may be split across multiple [TextNode](text-node.md) frames for display.
Use this model to get or modify the text string and the style ranges applied to it.

## Accessors

### allTextNodes

• `get` **allTextNodes**(): `Readonly` `Iterable` [`TextNode`](text-node.md)  

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Get ordered list of all [TextNode](text-node.md)s that display this text content in the scenegraph. The text content
starts in the first  [TextNode](text-node.md) "frame", and then flows into the second node once it has filled the first one. The ending of the
text content may not be visible at all, if the last [TextNode](text-node.md) "frame" is not large enough to accommodate it.

If there are multiple [TextNode](text-node.md)s, all of them must be configured to use [AreaTextLayout](../interfaces/area-text-layout.md).

#### Returns

`Readonly` `Iterable` [`TextNode`](text-node.md)  

<hr />

### characterStyleRanges

• `get` **characterStyleRanges**(): readonly [`CharacterStylesRange`](../interfaces/character-styles-range.md)[]

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The character style ranges of this text content.

• `set` **characterStyleRanges**(`styles`): `void`

#### Parameters

• **styles**: readonly [`CharacterStylesRangeInput`](../interfaces/character-styles-range-input.md)[]

#### Returns

readonly [`CharacterStylesRange`](../interfaces/character-styles-range.md)[]

<hr />

### id

• `get` **id**(): `string`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

To determine if two TextNodes are connected to the same TextContentModel,
check if both models have the same id.
Comparing two models using `===` will always fail.

#### Returns

`string`

<hr />

### text

• `get` **text**(): `string`

The complete text string, which may span multiple [TextNode](text-node.md) "frames" in the scenegraph.

• `set` **text**(`textContent`): `void`

#### Parameters

• **textContent**: `string`

#### Returns

`string`

## Methods

### applyCharacterStyles()

• **applyCharacterStyles**(`styles`, `range`?): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Apply one or more styles to the characters in the given range, leaving other styles in this range unchanged. Does
not modify any styles in the text outside this range.

#### Parameters

• **styles**: [`CharacterStylesInput`](../interfaces/character-styles-input.md)

The styles to apply.

• **range?**

The start and length of character sequence to which the styles should be applied.
If not specified the styles will be applied to the entire piece of text content flow.

• **range.length?**: `number`

• **range.start?**: `number`

#### Returns

`void`
