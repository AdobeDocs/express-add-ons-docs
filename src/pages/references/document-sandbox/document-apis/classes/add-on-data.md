[@express-document-sdk](../overview.md) / AddOnData

# Class: AddOnData

AddOnData class provides APIs to read, write, remove private metadata to a Node.
This metadata is accessible only to the add-on that has set it.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

## Accessors

### remainingQuota

• `get` **remainingQuota**(): `Readonly` `object`

#### Returns

`Readonly` `object`

an object with the remaining quota for private metadata on the node for this add-on.
The object contains the following properties:

- sizeInBytes: The remaining quota size in bytes (maximum 3KB).
- numKeys: The remaining quota for the number of keys (maximum 20 keys).

##### numKeys

• **numKeys**: `number`

##### sizeInBytes

• **sizeInBytes**: `number`

## Methods

### `[iterator]`()

• **\[iterator\]**(): `Iterator` [`string`, `string`], `any`, `undefined`

#### Returns

`Iterator` [`string`, `string`], `any`, `undefined`

an iterator for all the private metadata entries on the node.
The iterator yields the metadata key-value pairs.

<hr />

### clear()

• **clear**(): `void`

Clears all private metadata entries on the node.

#### Returns

`void`

<hr />

### getItem()

• **getItem**(`key`): `undefined` \| `string`

Retrieves the private metadata value for the specified key on the node.

#### Parameters

• **key**: `string`

The key of the private metadata entry to retrieve.

#### Returns

`undefined` \| `string`

The value of the private metadata entry.

<hr />

### keys()

• **keys**(): `string`[]

#### Returns

`string`[]

an array of all keys for the private metadata entries on the node.

<hr />

### removeItem()

• **removeItem**(`key`): `void`

Removes a single private metadata entry on the node.

#### Parameters

• **key**: `string`

The key of the private metadata entry to remove.

#### Returns

`void`

<hr />

### setItem()

• **setItem**(`key`, `value`): `void`

Sets a private metadata entry on the node.

#### Parameters

• **key**: `string`

The key for the private metadata entry.

• **value**: `string`

The value for the private metadata entry.

#### Returns

`void`
