---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: UnavailableFont

Font the current user does not have access or licensing permissions to create / edit content with.

## Extends

- [`BaseFont`](base-font.md)

## Constructors

### Constructor

```ts
new UnavailableFont(): UnavailableFont;
```

#### Returns

`UnavailableFont`

#### Inherited from

[`BaseFont`](base-font.md).[`constructor`](base-font.md#constructor)

## Accessors

### postscriptName

#### Get Signature

```ts
get postscriptName(): string;
```

The PostScript name of the font.

##### Returns

`string`

#### Inherited from

[`BaseFont`](base-font.md).[`postscriptName`](base-font.md#postscriptname)

<HorizontalLine />

### family

#### Get Signature

```ts
get family(): string;
```

The font family containing the font.

##### Returns

`string`

#### Inherited from

[`BaseFont`](base-font.md).[`family`](base-font.md#family)

<HorizontalLine />

### style

#### Get Signature

```ts
get style(): string;
```

The style of the font within the family.

##### Returns

`string`

#### Inherited from

[`BaseFont`](base-font.md).[`style`](base-font.md#style)

<HorizontalLine />

### availableForEditing

#### Get Signature

```ts
get availableForEditing(): false;
```

Whether the current user has permission to create / edit content using this font.

##### Returns

`false`

#### Overrides

[`BaseFont`](base-font.md).[`availableForEditing`](base-font.md#availableforediting)
