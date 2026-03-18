[**@express-document-sdk**](../overview.md)

---

# Abstract Class: BaseFont

Represents a font that is able to be rendered within this document. However, the user may not have edit permissions for
all such fonts.

## Extends

- `unknown`

## Extended by

- [`AvailableFont`](AvailableFont.md)
- [`UnavailableFont`](UnavailableFont.md)

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

---

### family

#### Get Signature

```ts
get family(): string;
```

The font family containing the font.

##### Returns

`string`

---

### style

#### Get Signature

```ts
get style(): string;
```

The style of the font within the family.

##### Returns

`string`

---

### availableForEditing

#### Get Signature

```ts
get abstract availableForEditing(): boolean;
```

Whether the current user has permission to create / edit content using this font.

##### Returns

`boolean`
