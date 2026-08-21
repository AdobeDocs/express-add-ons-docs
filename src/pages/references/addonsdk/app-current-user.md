---
title: "addOnUISdk.app.currentUser - Adobe Express Add-on SDK"
description: "Reference for the addOnUISdk.app.currentUser object, including the current canonical user identity, premium status, and anonymous-user checks."
keywords:
    - Adobe Express
    - Add-on SDK
    - addOnUISdk
    - app.currentUser
    - userId
    - identity
    - UserIdentity
    - isPremiumUser
    - isAnonymousUser
    - Connected Enterprise
contributors:
    - https://github.com/hollyschinsky
---

# addOnUISdk.app.currentUser

Provides access to the current user's identity, premium status, and guest-state checks in Adobe Express.

<InlineAlert slots="text" variant="info"/>

**Runtime:** This API runs in the **iframe runtime** (`addOnUISdk`). See the [Add-on Architecture Guide](../../guides/learn/platform-concepts/architecture.md#the-two-environments) for the dual-runtime model.

Refer to the [Identify Users How-to Guide](../../guides/learn/how-to/user-info.md) for walkthroughs of these methods.

## Methods

### identity()

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This method is currently **_experimental only_** and its behavior may change before it's declared stable. To call it during development, set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of your `manifest.json`. Submissions with that flag enabled will fail validation, so remove it before distributing your add-on. Once removed, `identity()` won't resolve. See the [Identify Users guide](../../guides/learn/how-to/user-info.md#handling-the-transition-period) for a feature-detection pattern that safely falls back to [`userId()`](#userid) in that case.

Returns the user's canonical ID and any legacy IDs consolidated into it. All IDs are SHA-256 hashed and cannot be used to identify users personally. Use this method for any use case that relies on user identification, such as subscription management, analytics, and account linking.

For users whose account has been migrated through Connected Enterprise, `legacyIds` will contain their previous user IDs. See [Unify identity and storage with Connected Enterprise](https://helpx.adobe.com/business/enterprise/global-admin-console/get-started/connected-enterprise.html) for full details.

#### Signature

`identity(): Promise<UserIdentity>`

#### Return Value

A resolved `Promise` containing a `UserIdentity` object.

##### `UserIdentity`

| Property | Type | Description |
| -------- | ---- | ----------- |
| `userId` | `string` | SHA-256 hashed, canonical ID for the current active profile. Matches the value returned by the deprecated [`userId()`](#userid) method for accounts that haven't been consolidated through Connected Enterprise. |
| `legacyIds` | `string[]` | SHA-256 hashed legacy user IDs consolidated into the current profile. Empty array when no historical IDs were merged. |

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const identity = await addOnUISdk.app.currentUser.identity();
  console.log("User ID: " + identity.userId);

  if (identity.legacyIds.length > 0) {
    console.log("Legacy IDs: " + identity.legacyIds.join(", "));
  }
});
```

#### Output

```bash
User ID: 882ee4e7487236f35cd593f60e595892ace578ba7c5d5027a4b2cec196aa4ced
Legacy IDs: a3f1c2d4e5b6789012345678abcdef90abcdef90abcdef90abcdef90abcdef90, b7e8d9f0a1c2345678901234cdef5678cdef5678cdef5678cdef5678cdef5678
```

### userId()

<InlineAlert slots="text" variant="warning"/>

**Deprecated.** `userId()` is scheduled for removal on **November 15, 2026** in favor of the [`identity()`](#identity) method. After that date, this method will throw an error. Calling this method now logs a one-time console warning.

Retrieve a SHA-256 hashed ID for the current user of the host application (Adobe Express). For accounts that haven't been consolidated through Connected Enterprise, this returns the same value as [`identity().userId`](#identity).

#### Signature

`userId(): Promise<string>`

#### Return Value

A resolved `Promise` containing the `userId` of the current user.

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const userId = await addOnUISdk.app.currentUser.userId();
  console.log("User ID: " + userId);
});
```

#### Output

```bash
User ID: 3cda976828a4a90d13b0f38b1f8a59b1d6845cccfc48037fb30bb75d3ef67d36
```

### isPremiumUser()

Indicates whether the current user has an Adobe Express premium subscription.

#### Signature

`isPremiumUser(): Promise<boolean>`

#### Return Value

A resolved `Promise` containing a boolean value indicating if the user is a premium user or not.

#### Example Usage

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const isPremiumUser = await addOnUISdk.app.currentUser.isPremiumUser();
  if (!isPremiumUser) {
    // User is not premium; show only free-tier features.
  }
});
```

### isAnonymousUser()

Determines whether the current user is browsing as a guest (not signed in).

#### Signature

`isAnonymousUser(): Promise<boolean>`

#### Return Value

Returns a `Promise` that resolves to a boolean indicating whether the user is anonymous.

#### Example Usage

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const isAnonymousUser = await addOnUISdk.app.currentUser.isAnonymousUser();
  if (isAnonymousUser) {
    // User is not logged in; show guest-level features only.
    console.log("User is anonymous, some features may be limited.");
  } else {
    // User is logged in; show full features.
    console.log("User is logged in.");
  }
});
```
