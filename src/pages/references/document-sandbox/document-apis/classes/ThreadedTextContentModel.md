[@express-document-sdk](../overview.md) / ThreadedTextContentModel

# Class: ThreadedTextContentModel

ThreadedTextContentModel represents a complete piece of text content that is split across multiple
[ThreadedTextNode](ThreadedTextNode.md) frames for display. This subclass provides a mutable allFrames list
that supports adding, removing, and reordering text frames.

The append and insert operations will automatically parent the new frame to the same parent as the
reference frame and place it in the correct z-order.

## Extends

-   [`TextNodeContentModel`](TextNodeContentModel.md)

## Accessors

### allTextNodes

• `get` **allTextNodes**(): `Readonly`<`Iterable`<[`ThreadedTextNode`](ThreadedTextNode.md), `any`, `any`\>\>

Get ordered list of all [TextNode](TextNode.md)s that display this text content in the scenegraph. This might be a single
[StandaloneTextNode](StandaloneTextNode.md) *or* a list of one or more [ThreadedTextNode](ThreadedTextNode.md)s. In the case of threaded text, the
text content starts in the first [ThreadedTextNode](ThreadedTextNode.md) "frame", and then flows into the second node once it has
filled the first one. The ending of the text content may not be visible at all, if the last "frame" is not large
enough to accommodate it.

All linked ThreadedTextNodes that share a single TextContentModel must remain together within the same artboard.

#### Returns

`Readonly`<`Iterable`<[`ThreadedTextNode`](ThreadedTextNode.md), `any`, `any`\>\>

---

### characterStyleRanges

• `get` **characterStyleRanges**(): readonly [`CharacterStylesRange`](../interfaces/CharacterStylesRange.md)[]

The character styles that are applied to different ranges of this text content. Each range starts immediately after
the previous one: they are always contiguous, and never overlap.

When *setting* character styles, any style properties that are not provided are reset to their defaults (contrast to
[applyCharacterStyles](TextContentModel.md#applycharacterstyles) which preserves the text's existing styles for any fields not specified). If the ranges
do not cover the full length of the text, the last range is extended to cover all the remaining text.
When *getting* styles, all fields are always provided.

<InlineAlert slots="text" variant="warning"/>

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

The styles applied to different paragraphs of this text content.

• `set` **paragraphStyleRanges**(`styles`): `void`

Apply styles to different paragraphs of this text content. Any style properties that are not provided are reset to their defaults.
When **getting** styles, all properties are always provided.

Paragraphs are separated by newline characters (`\n`). The ranges specified here should align with
those boundaries. If multiple ranges provided overlap a single paragraph, the first one to overlap is applied to the
entire paragraph.

#### Throws

if applying an ordered-list style when the text contains fonts that are unavailable to the current user.

#### Parameters

• **styles**: readonly [`ParagraphStylesRangeInput`](../interfaces/ParagraphStylesRangeInput.md)[]

#### Returns

readonly [`ParagraphStylesRange`](../interfaces/ParagraphStylesRange.md)[]

---

### text

• `get` **text**(): `string`

The complete text string, which may span multiple [ThreadedTextNode](ThreadedTextNode.md) "frames" in the scenegraph.

#### Throws

The setter throws if the existing text contains fonts unavailable to the current user.
See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

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

[`TextNodeContentModel`](TextNodeContentModel.md).[`appendText`](TextNodeContentModel.md#appendtext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

---

### applyCharacterStyles()

• **applyCharacterStyles**(`styles`, `range`?): `void`

Apply one or more styles to the characters in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [characterStyleRanges](TextContentModel.md#characterstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

Explicitly specifying `link: ""` will remove any hyperlinks present in the existing text. If the `link` style
property is not specified at all, existing links are preserved.

#### Parameters

• **styles**: [`CharacterStylesInput`](../interfaces/CharacterStylesInput.md)

The styles to apply.

• **range?**: [`TextRange`](../interfaces/TextRange.md)

The start and length of the character sequence to which the styles should be applied.
If no range is specified, styles will be applied to the entire text content flow.

#### Returns

`void`

#### Inherited from

[`TextNodeContentModel`](TextNodeContentModel.md).[`applyCharacterStyles`](TextNodeContentModel.md#applycharacterstyles)

---

### applyParagraphStyles()

• **applyParagraphStyles**(`styles`, `range`?): `void`

Apply one or more styles to the paragraphs in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [paragraphStyleRanges](TextContentModel.md#paragraphstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

#### Parameters

• **styles**: [`ParagraphStylesInput`](../interfaces/ParagraphStylesInput.md)

The styles to apply.

• **range?**: [`TextRange`](../interfaces/TextRange.md)

The start and length of character sequence to which the styles should be applied. Styles apply to any
paragraphs that even partially overlap this range.
If range is not specified, the styles will be applied to the entire text content flow.

#### Returns

`void`

#### Inherited from

[`TextNodeContentModel`](TextNodeContentModel.md).[`applyParagraphStyles`](TextNodeContentModel.md#applyparagraphstyles)

#### Throws

if applying an ordered-list style when the text contains fonts that are unavailable to the current user.

---

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

[`TextNodeContentModel`](TextNodeContentModel.md).[`deleteText`](TextNodeContentModel.md#deletetext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

---

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

[`TextNodeContentModel`](TextNodeContentModel.md).[`hasUnavailableFonts`](TextNodeContentModel.md#hasunavailablefonts)

---

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

• **style?**: [`CharacterStylesInput`](../interfaces/CharacterStylesInput.md) \| [`beforeInsertionPoint`](../namespaces/Constants/enumerations/TextStyleSource.md#beforeinsertionpoint) \| [`afterInsertionPoint`](../namespaces/Constants/enumerations/TextStyleSource.md#afterinsertionpoint)

Style to use for the new text: either directly provides a style to use, or indicates which
     existing text to match the style of. Default: `beforeInsertionPoint`.

#### Returns

`void`

#### Inherited from

[`TextNodeContentModel`](TextNodeContentModel.md).[`insertText`](TextNodeContentModel.md#inserttext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).

---

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

• **style?**: [`CharacterStylesInput`](../interfaces/CharacterStylesInput.md) \| [`beforeInsertionPoint`](../namespaces/Constants/enumerations/TextStyleSource.md#beforeinsertionpoint) \| [`afterInsertionPoint`](../namespaces/Constants/enumerations/TextStyleSource.md#afterinsertionpoint) \| [`firstReplacedCharacter`](../namespaces/Constants/enumerations/TextStyleSource.md#firstreplacedcharacter)

Style to use for the new text: either directly provides a style to use, or indicates which
     existing text to match the style of. Default: `firstReplacedCharacter`.

#### Returns

`void`

#### Inherited from

[`TextNodeContentModel`](TextNodeContentModel.md).[`replaceText`](TextNodeContentModel.md#replacetext)

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](TextContentModel.md#hasunavailablefonts).
