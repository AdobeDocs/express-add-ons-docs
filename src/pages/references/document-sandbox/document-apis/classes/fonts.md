---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: Fonts

The Fonts class provides methods to work with fonts.

## Extends

- `unknown`

## Constructors

### Constructor

```ts
new Fonts(): Fonts;
```

#### Returns

`Fonts`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Methods

### fromPostscriptName()

```ts
fromPostscriptName(postscriptName): Promise<AvailableFont | undefined>;
```

Get an [AvailableFont](available-font.md) that exactly matches the given PostScript name, if any. Only fonts that the user has permission to use
for editing content are returned, so the result of this call is always safe to apply to a [TextContentModel](text-content-model.md)'s styles.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `postscriptName` | `string` | The PostScript name of the font. |

#### Returns

`Promise`&lt;[`AvailableFont`](available-font.md) \| `undefined`&gt;

The Font object if found and available for editing, otherwise undefined.
