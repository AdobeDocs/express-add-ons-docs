[**@express-document-sdk**](../overview.md)

---

# Class: AvailableFont

Font the current user has access or licensing permissions to create / edit content with.

## Extends

- [`BaseFont`](BaseFont.md)

## Constructors

### Constructor

```ts
new AvailableFont(): AvailableFont;
```

#### Returns

`AvailableFont`

#### Inherited from

[`BaseFont`](BaseFont.md).[`constructor`](BaseFont.md#constructor)

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

[`BaseFont`](BaseFont.md).[`postscriptName`](BaseFont.md#postscriptname)

---

### family

#### Get Signature

```ts
get family(): string;
```

The font family containing the font.

##### Returns

`string`

#### Inherited from

[`BaseFont`](BaseFont.md).[`family`](BaseFont.md#family)

---

### style

#### Get Signature

```ts
get style(): string;
```

The style of the font within the family.

##### Returns

`string`

#### Inherited from

[`BaseFont`](BaseFont.md).[`style`](BaseFont.md#style)

---

### isPremium

#### Get Signature

```ts
get isPremium(): boolean;
```

Whether the font is a premium Adobe font.

##### Returns

`boolean`

---

### availableForEditing

#### Get Signature

```ts
get availableForEditing(): true;
```

Whether the current user has permission to create / edit content using this font.

##### Returns

`true`

#### Overrides

[`BaseFont`](BaseFont.md).[`availableForEditing`](BaseFont.md#availableforediting)
