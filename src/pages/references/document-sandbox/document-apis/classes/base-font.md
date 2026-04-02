---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Abstract Class: BaseFont

Represents a font that is able to be rendered within this document. However, the user may not have edit permissions for
all such fonts.

## Extends

- `unknown`

## Extended by

- [`AvailableFont`](available-font.md)
- [`UnavailableFont`](unavailable-font.md)

## Constructors

### Constructor

```ts
new BaseFont(): BaseFont;
```

#### Returns

`BaseFont`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Accessors

### postscriptName

#### Get Signature

```ts
get postscriptName(): string;
```

The PostScript name of the font.

##### Returns

`string`

<HorizontalLine />

### family

#### Get Signature

```ts
get family(): string;
```

The font family containing the font.

##### Returns

`string`

<HorizontalLine />

### style

#### Get Signature

```ts
get style(): string;
```

The style of the font within the family.

##### Returns

`string`

<HorizontalLine />

### availableForEditing

#### Get Signature

```ts
get abstract availableForEditing(): boolean;
```

Whether the current user has permission to create / edit content using this font.

##### Returns

`boolean`
