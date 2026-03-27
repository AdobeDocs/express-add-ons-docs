---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Abstract Class: TextContentModel

TextContentModel is an abstract base class representing a complete piece of text content.
Use this model to get or modify the text string and the style ranges applied to it.

## Extends

- `unknown`

## Extended by

- [`TextNodeContentModel`](text-node-content-model.md)

## Constructors

### Constructor

```ts
new TextContentModel(): TextContentModel;
```

#### Returns

`TextContentModel`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Accessors

### id

#### Get Signature

```ts
get id(): string;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is
moved to a different part of the document.

To determine if two TextNodes are connected to the same TextContentModel,
check if both models have the same id.
Comparing two models using `===` will always fail.

##### Returns

`string`

<HorizontalLine />

### text

#### Get Signature

```ts
get text(): string;
```

The complete text string, which may span multiple [ThreadedTextNode](threaded-text-node.md) "frames" in the scenegraph.

##### Throws

The setter throws if the existing text contains fonts unavailable to the current user.
See [hasUnavailableFonts](#hasunavailablefonts).

##### Returns

`string`

#### Set Signature

```ts
set text(textContent): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `textContent` | `string` |

##### Returns

`void`

<HorizontalLine />

### characterStyleRanges

#### Get Signature

```ts
get characterStyleRanges(): readonly CharacterStylesRange[];
```

The character styles that are applied to different ranges of this text content. Each range starts immediately after
the previous one: they are always contiguous, and never overlap.

When *setting* character styles, any style properties that are not provided are reset to their defaults (contrast to
[applyCharacterStyles](#applycharacterstyles) which preserves the text's existing styles for any fields not specified). If the ranges
do not cover the full length of the text, the last range is extended to cover all the remaining text.
When *getting* styles, all fields are always provided.

Note: existing fonts used in the document, returned by this getter, are not guaranteed to be ones the current user
has rights to edit with. The *setter* only accepts the AvailableFont type which has been verified to be usable.

##### Returns

readonly [`CharacterStylesRange`](../interfaces/character-styles-range.md)[]

#### Set Signature

```ts
set characterStyleRanges(styles): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `styles` | readonly [`CharacterStylesRangeInput`](../interfaces/character-styles-range-input.md)[] |

##### Returns

`void`

<HorizontalLine />

### paragraphStyleRanges

#### Get Signature

```ts
get paragraphStyleRanges(): readonly ParagraphStylesRange[];
```

The styles applied to different paragraphs of this text content.

##### Returns

readonly [`ParagraphStylesRange`](../interfaces/paragraph-styles-range.md)[]

#### Set Signature

```ts
set paragraphStyleRanges(styles): void;
```

Apply styles to different paragraphs of this text content. Any style properties that are not provided are reset to their defaults.
When **getting** styles, all properties are always provided.

Paragraphs are separated by newline characters (`\n`). The ranges specified here should align with
those boundaries. If multiple ranges provided overlap a single paragraph, the first one to overlap is applied to the
entire paragraph.

##### Throws

if applying an ordered-list style when the text contains fonts that are unavailable to the current user.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `styles` | readonly [`ParagraphStylesRangeInput`](../interfaces/paragraph-styles-range-input.md)[] |

##### Returns

`void`

## Methods

### appendText()

```ts
appendText(newText): void;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Appends a new text string to the end of the text content.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newText` | `string` | The text to append. |

#### Returns

`void`

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](#hasunavailablefonts).

<HorizontalLine />

### insertText()

```ts
insertText(
   newText, 
   index, 
   style?): void;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Inserts a new text string into the text content at the specified index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newText` | `string` | The text to insert. |
| `index` | `number` | The index at which to insert the new text. |
| `style?` | \| [`CharacterStylesInput`](../interfaces/character-styles-input.md) \| [`beforeInsertionPoint`](../enumerations/text-style-source.md#beforeinsertionpoint) \| [`afterInsertionPoint`](../enumerations/text-style-source.md#afterinsertionpoint) | Style to use for the new text: either directly provides a style to use, or indicates which existing text to match the style of. Default: `beforeInsertionPoint`. |

#### Returns

`void`

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](#hasunavailablefonts).

<HorizontalLine />

### replaceText()

```ts
replaceText(
   newText, 
   replaceRange, 
   style?): void;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Replaces a range of text with a new text string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newText` | `string` | The text to replace the range with. |
| `replaceRange` | [`TextRange`](../interfaces/text-range.md) | The range of text to replace. |
| `style?` | \| [`CharacterStylesInput`](../interfaces/character-styles-input.md) \| [`beforeInsertionPoint`](../enumerations/text-style-source.md#beforeinsertionpoint) \| [`afterInsertionPoint`](../enumerations/text-style-source.md#afterinsertionpoint) \| [`firstReplacedCharacter`](../enumerations/text-style-source.md#firstreplacedcharacter) | Style to use for the new text: either directly provides a style to use, or indicates which existing text to match the style of. Default: `firstReplacedCharacter`. |

#### Returns

`void`

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](#hasunavailablefonts).

<HorizontalLine />

### deleteText()

```ts
deleteText(range): void;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Deletes a range of text from the content.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `range` | [`TextRange`](../interfaces/text-range.md) | The range of text to delete. |

#### Returns

`void`

#### Throws

if the existing text contains fonts unavailable to the current user. See [hasUnavailableFonts](#hasunavailablefonts).

<HorizontalLine />

### applyCharacterStyles()

```ts
applyCharacterStyles(styles, range?): void;
```

Apply one or more styles to the characters in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [characterStyleRanges](#characterstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

Explicitly specifying `link: ""` will remove any hyperlinks present in the existing text. If the `link` style
property is not specified at all, existing links are preserved.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `styles` | [`CharacterStylesInput`](../interfaces/character-styles-input.md) | The styles to apply. |
| `range?` | [`TextRange`](../interfaces/text-range.md) | The start and length of the character sequence to which the styles should be applied. If no range is specified, styles will be applied to the entire text content flow. |

#### Returns

`void`

<HorizontalLine />

### applyParagraphStyles()

```ts
applyParagraphStyles(styles, range?): void;
```

Apply one or more styles to the paragraphs in the given range, leaving any style properties that were not specified
unchanged. Does not modify any styles in the text outside this range. Contrast to the [paragraphStyleRanges](#paragraphstyleranges)
setter, which specifies new style range(s) for the entire text at once, and resets any unspecified properties back to
default styles.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `styles` | [`ParagraphStylesInput`](../interfaces/paragraph-styles-input.md) | The styles to apply. |
| `range?` | [`TextRange`](../interfaces/text-range.md) | The start and length of character sequence to which the styles should be applied. Styles apply to any paragraphs that even partially overlap this range. If range is not specified, the styles will be applied to the entire text content flow. |

#### Returns

`void`

#### Throws

if applying an ordered-list style when the text contains fonts that are unavailable to the current user.

<HorizontalLine />

### hasUnavailableFonts()

```ts
hasUnavailableFonts(): boolean;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Returns true if this text contains any fonts unavailable to the current user.
Currently, if any unavailable fonts are present, the text content cannot be modified and
certain styling changes are limited as well. To remove these restrictions, you must modify
the character styles to use only AvailableFonts.

#### Returns

`boolean`
