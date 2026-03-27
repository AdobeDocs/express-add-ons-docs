---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: AddOnData

AddOnData class provides APIs to read, write, remove private metadata to a Node.
This metadata is accessible only to the add-on that has set it.

## Extends

- `unknown`

## Constructors

### Constructor

```ts
new AddOnData(): AddOnData;
```

#### Returns

`AddOnData`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Accessors

### remainingQuota

#### Get Signature

```ts
get remainingQuota(): Readonly<{
  sizeInBytes: number;
  numKeys: number;
}>;
```

##### Returns

`Readonly`&lt;\{
  `sizeInBytes`: `number`;
  `numKeys`: `number`;
\}&gt;

an object with the remaining quota for private metadata on the node for this add-on.
The object contains the following properties:

- sizeInBytes: The remaining quota size in bytes (maximum 3KB).
- numKeys: The remaining quota for the number of keys (maximum 20 keys).

## Methods

### setItem()

```ts
setItem(key, value): void;
```

Sets a private metadata entry on the node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The key for the private metadata entry. |
| `value` | `string` | The value for the private metadata entry. |

#### Returns

`void`

<HorizontalLine />

### getItem()

```ts
getItem(key): string | undefined;
```

Retrieves the private metadata value for the specified key on the node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The key of the private metadata entry to retrieve. |

#### Returns

`string` \| `undefined`

The value of the private metadata entry.

<HorizontalLine />

### removeItem()

```ts
removeItem(key): void;
```

Removes a single private metadata entry on the node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The key of the private metadata entry to remove. |

#### Returns

`void`

<HorizontalLine />

### clear()

```ts
clear(): void;
```

Clears all private metadata entries on the node.

#### Returns

`void`

<HorizontalLine />

### keys()

```ts
keys(): string[];
```

#### Returns

`string`[]

an array of all keys for the private metadata entries on the node.

<HorizontalLine />

### \[iterator\]()

```ts
iterator: Iterator<[string, string]>;
```

#### Returns

`Iterator`&lt;\[`string`, `string`\]&gt;

an iterator for all the private metadata entries on the node.
The iterator yields the metadata key-value pairs.
