[@express-document-sdk](../overview.md) / AddOnData

# Class: AddOnData

AddOnData class provides APIs to read, write, remove private metadata to a Node.
This metadata is accessible only to the add-on that has set it.

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

• **\[iterator\]**(): `Iterator` [`string`, `string`], `any`, `any`

#### Returns

`Iterator` [`string`, `string`], `any`, `any`

an iterator for all the private metadata entries on the node.
The iterator yields the metadata key-value pairs.

<HorizontalLine />

### clear()

• **clear**(): `void`

Clears all private metadata entries on the node.

#### Returns

`void`

<HorizontalLine />

### getItem()

• **getItem**(`key`): `undefined` \| `string`

Retrieves the private metadata value for the specified key on the node.

#### Parameters

• **key**: `string`

The key of the private metadata entry to retrieve.

#### Returns

`undefined` \| `string`

The value of the private metadata entry.

<HorizontalLine />

### keys()

• **keys**(): `string`[]

#### Returns

`string`[]

an array of all keys for the private metadata entries on the node.

<HorizontalLine />

### removeItem()

• **removeItem**(`key`): `void`

Removes a single private metadata entry on the node.

#### Parameters

• **key**: `string`

The key of the private metadata entry to remove.

#### Returns

`void`

<HorizontalLine />

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
