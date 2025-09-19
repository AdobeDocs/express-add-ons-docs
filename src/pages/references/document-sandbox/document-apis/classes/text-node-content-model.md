[@express-document-sdk](../overview.md) / TextNodeContentModel

# Class: TextNodeContentModel

Represents a complete piece of text content, which may be contained within a single [StandaloneTextNode](StandaloneTextNode.md) *or*
split across multiple [ThreadedTextNode](ThreadedTextNode.md) frames for display.
Use this model to get or modify the text string and the style ranges applied to it.

## Extends

-   [`TextContentModel`](TextContentModel.md)

## Accessors

### allTextNodes

• `get` **allTextNodes**(): `Readonly` `Iterable` [`TextNode`](TextNode.md), `any`, `any`

Get ordered list of all [TextNode](TextNode.md)s that display this text content in the scenegraph. The text content
starts in the first [ThreadedTextNode](ThreadedTextNode.md) "frame", and then flows into the second node once it has filled the first one. The ending of the
text content may not be visible at all, if the last [ThreadedTextNode](ThreadedTextNode.md) "frame" is not large enough to accommodate it.

If there are multiple [ThreadedTextNode](ThreadedTextNode.md)s, all of them must be configured to use [AreaTextLayout](../interfaces/AreaTextLayout.md).

#### Returns

`Readonly` `Iterable` [`TextNode`](TextNode.md), `any`, `any`

<HorizontalLine />

### characterStyleRanges

• `get` **characterStyleRanges**(): readonly [`CharacterStylesRange`](../interfaces/CharacterStylesRange.md)[]

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

<HorizontalLine />

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

<HorizontalLine />

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

Paragraphs are separated by newline characters (`\n`). The ranges specified here should align with
those boundaries. If multiple ranges provided overlap a single paragraph, the first one to overlap is applied to the
entire paragraph.

#### Throws

if the text content contains fonts unavailable to the current user and an ordered-list style is being applied.

#### Parameters

• **styles**: readonly [`ParagraphStylesRangeInput`](../interfaces/ParagraphStylesRangeInput.md)[]

#### Returns

readonly [`ParagraphStylesRange`](../interfaces/ParagraphStylesRange.md)[]

<HorizontalLine />

### text

• `get` **text**(): `string`

The complete text string, which may span multiple [ThreadedTextNode](ThreadedTextNode.md) "frames" in the scenegraph.

• `set` **text**(`textContent`): `void`

#### Parameters

• **textContent**: `string`

#### Returns

`string`

## Methods

### appendText()

• **appendText**(`newText`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Appends a new text string to the end of the text content.

#### Parameters

• **newText**: `string`

The text to append.

#### Returns

`void`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`appendText`](TextContentModel.md#appendtext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

<HorizontalLine />

### applyCharacterStyles()

• **applyCharacterStyles**(`styles`, `range`?): `void`

Apply one or more styles to the characters in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [characterStyleRanges](TextContentModel.md#characterstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

#### Parameters

• **styles**: [`CharacterStylesInput`](../interfaces/character-styles-input.md)

The styles to apply.

• **range?**: [`TextRange`](../interfaces/text-range.md)

The start and length of the character sequence to which the styles should be applied.
The styles will be applied to the entire text content flow if not specified.
If the specified range doesn't align well with the paragraph boundaries, the range will be expanded to cover the
entire paragraphs, it overlaps.

#### Returns

`void`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`applyCharacterStyles`](TextContentModel.md#applycharacterstyles)

<HorizontalLine />

### applyParagraphStyles()

• **applyParagraphStyles**(`styles`, `range`?): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Apply one or more styles to the paragraphs in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [paragraphStyleRanges](TextContentModel.md#paragraphstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

#### Parameters

• **styles**: [`ParagraphStylesInput`](../interfaces/ParagraphStylesInput.md)

The styles to apply.

• **range?**: [`TextRange`](../interfaces/TextRange.md)

The start and length of character sequence to which the styles should be applied.
If not specified the styles will be applied to the entire piece of text content flow.

#### Returns

`void`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`applyParagraphStyles`](TextContentModel.md#applyparagraphstyles)

<HorizontalLine />

### deleteText()

• **deleteText**(`range`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Deletes a range of text from the content.

#### Parameters

• **range**: [`TextRange`](../interfaces/TextRange.md)

The range of text to delete.

#### Returns

`void`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`deleteText`](TextContentModel.md#deletetext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

<HorizontalLine />

### hasUnavailableFonts()

• **hasUnavailableFonts**(): `boolean`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Returns true if this text contains any fonts unavailable to the current user.
Currently, if any unavailable fonts are present, the text content cannot be modified and
certain styling changes are limited as well. To remove these restrictions, you must modify
the character styles to use only AvailableFonts.

#### Returns

`boolean`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`hasUnavailableFonts`](TextContentModel.md#hasunavailablefonts)

<HorizontalLine />

### insertText()

• **insertText**(`newText`, `index`, `style`?): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Inserts a new text string into the text content at the specified index.

#### Parameters

• **newText**: `string`

The text to insert.

• **index**: `number`

The index at which to insert the new text.

• **style?**: [`CharacterStylesInput`](../interfaces/character-styles-input.md) \| [`beforeInsertionPoint`](../namespaces/constants/enumerations/text-style-source.md#beforeinsertionpoint) \| [`afterInsertionPoint`](../namespaces/constants/enumerations/text-style-source.md#afterinsertionpoint)

Style to use for the new text: either directly provides a style to use, or indicates which
existing text to match the style of. Default: `beforeInsertionPoint`.

#### Returns

`void`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`insertText`](TextContentModel.md#inserttext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

<HorizontalLine />

### replaceText()

• **replaceText**(`newText`, `replaceRange`, `style`?): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Replaces a range of text with a new text string.

#### Parameters

• **newText**: `string`

The text to replace the range with.

• **replaceRange**: [`TextRange`](../interfaces/TextRange.md)

The range of text to replace.

• **style?**: [`CharacterStylesInput`](../interfaces/character-styles-input.md) \| [`beforeInsertionPoint`](../namespaces/constants/enumerations/text-style-source.md#beforeinsertionpoint) \| [`afterInsertionPoint`](../namespaces/constants/enumerations/text-style-source.md#afterinsertionpoint) \| [`firstReplacedCharacter`](../namespaces/constants/enumerations/text-style-source.md#firstreplacedcharacter)

Style to use for the new text: either directly provides a style to use, or indicates which
existing text to match the style of. Default: `firstReplacedCharacter`.

#### Returns

`void`

#### Inherited from

[`TextContentModel`](TextContentModel.md).[`replaceText`](TextContentModel.md#replacetext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).
