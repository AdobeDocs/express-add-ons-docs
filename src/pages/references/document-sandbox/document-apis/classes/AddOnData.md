[@express-document-sdk](../overview.md) / AddOnData

# Class: AddOnData

AddOnData class provides APIs to read, write, remove private metadata to a Node.
This metadata is accessible only to the add-on that has set it.

## Accessors

### remainingQuota

• `get` **remainingQuota**(): `Readonly`<`object`\>

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Returns

`Readonly`<`object`\>

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

• **\[iterator\]**(): `Iterator`<[`string`, `string`], `any`, `undefined`\>

#### Returns

`Iterator`<[`string`, `string`], `any`, `undefined`\>

an iterator for all the private metadata entries on the node.
The iterator yields the metadata key-value pairs.

---

### clear()

`Experimental`

• **clear**(): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Clears all private metadata entries on the node.

#### Returns

`void`

---

### getItem()

`Experimental`

• **getItem**(`key`): `undefined` \| `string`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Retrieves the private metadata value for the specified key on the node.

#### Parameters

• **key**: `string`

The key of the private metadata entry to retrieve.

#### Returns

`undefined` \| `string`

The value of the private metadata entry.

---

### keys()

`Experimental`

• **keys**(): `string`[]

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Returns

`string`[]

an array of all keys for the private metadata entries on the node.

---

### removeItem()

`Experimental`

• **removeItem**(`key`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Removes a single private metadata entry on the node.

#### Parameters

• **key**: `string`

The key of the private metadata entry to remove.

#### Returns

`void`

---

### setItem()

`Experimental`

• **setItem**(`key`, `value`): `void`

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Sets a private metadata entry on the node.

#### Parameters

• **key**: `string`

The key for the private metadata entry.

• **value**: `string`

The value for the private metadata entry.

#### Returns

`void`
