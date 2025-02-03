[@express-document-sdk](../overview.md) / TextContentModel

# Class: TextContentModel

Represents a complete piece of text content flow, which may be split across multiple [TextNode](TextNode.md) frames for display.
Use this model to get or modify the text string and the style ranges applied to it.

## Accessors

### allTextNodes

• `get` **allTextNodes**(): `Readonly`<`Iterable`<[`TextNode`](TextNode.md), `any`, `any`\>\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Get ordered list of all [TextNode](TextNode.md)s that display this text content in the scenegraph. The text content
starts in the first  [TextNode](TextNode.md) "frame", and then flows into the second node once it has filled the first one. The ending of the
text content may not be visible at all, if the last [TextNode](TextNode.md) "frame" is not large enough to accommodate it.

If there are multiple [TextNode](TextNode.md)s, all of them must be configured to use [AreaTextLayout](../interfaces/AreaTextLayout.md).

#### Returns

`Readonly`<`Iterable`<[`TextNode`](TextNode.md), `any`, `any`\>\>

---

### characterStyleRanges

• `get` **characterStyleRanges**(): readonly [`CharacterStylesRange`](../interfaces/CharacterStylesRange.md)[]

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The character styles are applied to different ranges of this text content. When setting character styles, any style
properties that are not provided are reset to their defaults (contrast to [applyCharacterStyles](TextContentModel.md#applycharacterstyles) which
preserves the text's existing styles for any fields not specified). When *getting* styles, all fields are always
provided.

Note: existing fonts used in the document, returned by this getter, are not guaranteed to be ones the current user
has rights to edit with. The *setter* only accepts the AvailableFont type which has been verified to be usable.

• `set` **characterStyleRanges**(`styles`): `void`

#### Parameters

• **styles**: readonly [`CharacterStylesRangeInput`](../interfaces/CharacterStylesRangeInput.md)[]

#### Returns

readonly [`CharacterStylesRange`](../interfaces/CharacterStylesRange.md)[]

---

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

---

### paragraphStyleRanges

• `get` **paragraphStyleRanges**(): readonly [`ParagraphStylesRange`](../interfaces/ParagraphStylesRange.md)[]

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The styles applied to different paragraphs of this text content.

• `set` **paragraphStyleRanges**(`styles`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Apply styles to different paragraphs of this text content. Any style properties that are not provided are reset to their defaults.
When **getting** styles, all properties are always provided.

Paragraphs are separated by newline characters (`\n`) in the text content. Ranges specified here should align with
those boundaries. If multiple ranges provided overlap a single paragraph, the first one to overlap is applied to the
entire paragraph.

#### Throws

if the text content contains fonts unavailable to the current user and an ordered-list style is being applied.

#### Parameters

• **styles**: readonly [`ParagraphStylesRangeInput`](../interfaces/ParagraphStylesRangeInput.md)[]

#### Returns

readonly [`ParagraphStylesRange`](../interfaces/ParagraphStylesRange.md)[]

---

### text

• `get` **text**(): `string`

The complete text string, which may span multiple [TextNode](TextNode.md) "frames" in the scenegraph.

• `set` **text**(`textContent`): `void`

#### Parameters

• **textContent**: `string`

#### Returns

`string`

## Methods

### applyCharacterStyles()

`Experimental`

• **applyCharacterStyles**(`styles`, `range`?): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Apply one or more styles to the characters in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [characterStyleRanges](TextContentModel.md#characterstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

#### Parameters

• **styles**: [`CharacterStylesInput`](../interfaces/CharacterStylesInput.md)

The styles to apply.

• **range?**

The start and length of character sequence to which the styles should be applied.
If not specified the styles will be applied to the entire piece of text content flow.

• **range.length?**: `number`

• **range.start?**: `number`

#### Returns

`void`
