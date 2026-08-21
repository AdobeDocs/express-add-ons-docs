---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - User info
  - userId
  - identity
  - legacyIds
  - UserIdentity
  - isPremiumUser
  - isAnonymousUser
  - currentUser
  - unauthenticated user
  - Connected Enterprise
title: Identify Users
description: Identify Users.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I get the current user's identity?"
      answer: "Call `await addOnUISdk.app.currentUser.identity()` to get a `UserIdentity` object containing the current `userId` and any `legacyIds`."

    - question: "What are legacyIds?"
      answer: "For users whose account has been migrated through Connected Enterprise, `legacyIds` contains SHA-256 hashes of their previous user IDs. This lets you map a migrated user to their historical records. The array is empty for users who have not been consolidated."

    - question: "Why is userId() deprecated?"
      answer: "`userId()` is deprecated because Connected Enterprise may change a user's ID during account consolidation. `identity()` exposes both the current canonical ID and any legacy IDs, so your add-on can recognize users across a migration. `userId()` is scheduled for removal on November 15, 2026."

    - question: "How do I check if a user has premium subscription?"
      answer: "Call `await addOnUISdk.app.currentUser.isPremiumUser()` to get a boolean premium status."

    - question: "How do I check if a user is anonymous (not logged in)?"
      answer: "Call `await addOnUISdk.app.currentUser.isAnonymousUser()` to check if the user is browsing as a guest."

    - question: "Is the user ID persistent?"
      answer: "For standard users, the anonymized user ID is unique and persistent. For users migrated through Connected Enterprise, the ID changes and the previous ID is available in `legacyIds`. For anonymous users, the ID is temporary and changes upon login."

    - question: "Are these methods synchronous?"
      answer: "No, `identity()`, `userId()`, `isPremiumUser()`, and `isAnonymousUser()` are all asynchronous methods that return promises."

    - question: "Is the user ID personally identifiable?"
      answer: "No, all user IDs returned by these APIs are SHA-256 hashed and cannot be used to identify users personally."

    - question: "What limitations do anonymous users have?"
      answer: "Anonymous users cannot export final content (only preview renditions), have temporary user IDs that don't persist beyond 24 hours, and their settings won't persist across sessions."

    - question: "How should I handle data persistence for anonymous users?"
      answer: "Use local storage for temporary settings and prompt users to log in for persistent features. Anonymous user data should be treated as ephemeral."

    - question: "Can anonymous users use all add-on features?"
      answer: "Anonymous users can use most features but cannot export final content. Always check `isAnonymousUser()` before showing export options and provide a 'Sign in to export' message."
---

# Identify Users

## Access User Information

You can leverage the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-current-user.md) API to retrieve information for the current user using Adobe Express. The following asynchronous methods are available:

* `identity()`: returns the current user's SHA-256 hashed, canonical ID and any legacy user IDs consolidated into it (**Experimental**)
* `userId()`: returns a SHA-256 hashed ID unique to the user (**Deprecated**, scheduled for removal November 15, 2026; use `identity()` instead)
* `isPremiumUser()`: returns `true` if the user has a premium Adobe Express subscription, `false` otherwise
* `isAnonymousUser()`: returns `true` if the current user is browsing as a guest (not signed in), `false` otherwise

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const identity = await addOnUISdk.app.currentUser.identity();
  const isPremium = await addOnUISdk.app.currentUser.isPremiumUser();
  const isAnonymous = await addOnUISdk.app.currentUser.isAnonymousUser();

  console.log("User ID: " + identity.userId);
  // User ID: 882ee4e7487236f35cd593f60e595892ace578ba7c5d5027a4b2cec196aa4ced

  console.log("Legacy IDs: " + identity.legacyIds.join(", "));
  // Legacy IDs: a3f1c2d4e5b6789012345678abcdef90abcdef90abcdef90abcdef90abcdef90, b7e8d9f0a1c2345678901234cdef5678cdef5678cdef5678cdef5678cdef5678

  console.log("Is Premium User: " + isPremium);
  // Is Premium User: false

  console.log("Is Anonymous User: " + isAnonymous);
  // Is Anonymous User: false
});
```

## Use Cases

### User Identity

A user's identity uniquely identifies who's using your add-on, useful for tracking subscriptions, managing entitlements, or scoping other user-specific features. Use [`identity()`](../../../references/addonsdk/app-current-user.md#identity) for this; [`userId()`](../../../references/addonsdk/app-current-user.md#userid) is **Deprecated** and scheduled for removal on November 15, 2026. For users whose account has not been consolidated through Connected Enterprise, `identity().userId` returns the same value as `userId()`.

<InlineAlert slots="header,text1,text2" variant="info"/>

#### [Connected Enterprise](https://helpx.adobe.com/business/enterprise/global-admin-console/get-started/connected-enterprise.html)

An Adobe initiative that consolidates multiple organization-specific user profiles into a single unified profile, which can change a user's ID during migration.

If your add-on stores the user ID for subscription management, analytics, licensing, or account linking, use `identity()` and check `legacyIds` to map a migrated user to their previous records. See [Unify identity and storage with Connected Enterprise](https://helpx.adobe.com/business/enterprise/global-admin-console/get-started/connected-enterprise.html) for full details, particularly the **Add-ons and plugins** section.

The [`UserIdentity`](../../../references/addonsdk/app-current-user.md#useridentity) object returned by `identity()` contains the current `userId` and any `legacyIds` consolidated during a Connected Enterprise migration.

### Handling the Transition Period

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The `identity()` method is currently **_experimental only_** and requires the `experimentalApis` flag set to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of `manifest.json`. Remove the flag before submitting your add-on. Without it, `identity()` won't resolve, which is expected.

Until `identity()` is declared stable, use the feature-detection pattern below to fall back to `userId()`. The following example retrieves all known user IDs, including legacy IDs, while supporting both methods:

```javascript
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const allKnownIds = await getAllUserIds();
  console.log("All known user IDs:", allKnownIds);
});

async function getAllUserIds() {
  // Feature-detect: identity() exists once it goes GA
  if (typeof addOnUISdk.app.currentUser.identity === "function") {
    const identity = await addOnUISdk.app.currentUser.identity();
    // Safely spread legacyIds, fallback to an empty array if undefined
    return [identity.userId, ...(identity.legacyIds || [])];
  }

  // Fallback to deprecated userId() until identity() is stable
  return [await addOnUISdk.app.currentUser.userId()];
}
```

Once `identity()` is declared stable, update your add-on to use it exclusively and remove the fallback to `userId()`. This ensures your users are not impacted during the transition period.

Refer to the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-current-user.md) reference and the [licensed-addon code sample](../samples.md#licensed-addon), which shows how you can utilize the hash of the user ID to integrate your add-on with licensing and payment services.

### Premium Features

Use `isPremiumUser()` to check whether the current user has an Adobe Express premium subscription. This lets you tailor the experience, for example by suggesting Adobe Express premium features or unlocking functionality that depends on a premium plan.

### Handling Anonymous Users

When `isAnonymousUser()` returns `true`, the user is browsing as a guest without logging in. This creates important considerations for your add-on's functionality:

#### **Data Persistence Limitations**

* **User settings**: Any preferences or configurations tied to the `userId` will not persist beyond the current session or approximately 24 hours
* **User identification**: The `userId` for anonymous users is temporary and will change if they later log in
* **Recommendation**: Use local storage for temporary settings and prompt users to log in for persistent features

#### **Analytics Considerations**

* **User tracking**: Anonymous user IDs are not permanent and will change upon login, potentially creating duplicate user records
* **Recommendation**: Implement logic to handle user ID transitions or track anonymous sessions separately

#### **Export Restrictions**

* **Content export**: Anonymous users cannot export final content (only preview renditions are allowed)
* **User experience**: Export attempts will trigger a login prompt, which can disrupt the user flow
* **Recommendation**: Check `isAnonymousUser()` before showing export options and provide a proactive "Sign in to export" message instead of letting users encounter errors

## FAQs

#### Q: How do I get the current user's identity?

**A:** Call `await addOnUISdk.app.currentUser.identity()` to get a `UserIdentity` object containing the current `userId` and any `legacyIds`.

#### Q: What are legacyIds?

**A:** For users whose account has been migrated through Connected Enterprise, `legacyIds` contains SHA-256 hashes of their previous user IDs. This lets you map a migrated user to their historical records. The array is empty for users who have not been consolidated.

#### Q: Why is userId() deprecated?

**A:** `userId()` is deprecated because Connected Enterprise may change a user's ID during account consolidation. `identity()` exposes both the current canonical ID and any legacy IDs, so your add-on can recognize users across a migration. `userId()` is scheduled for removal on November 15, 2026.

#### Q: How do I check if a user has premium subscription?

**A:** Call `await addOnUISdk.app.currentUser.isPremiumUser()` to get a boolean premium status.

#### Q: How do I check if a user is anonymous (not logged in)?

**A:** Call `await addOnUISdk.app.currentUser.isAnonymousUser()` to check if the user is browsing as a guest.

#### Q: Is the user ID persistent?

**A:** For standard users, the anonymized user ID is unique and persistent. For users migrated through Connected Enterprise, the ID changes and the previous ID is available in `legacyIds`. For anonymous users, the ID is temporary and changes upon login.

#### Q: Are these methods synchronous?

**A:** No, `identity()`, `userId()`, `isPremiumUser()`, and `isAnonymousUser()` are all asynchronous methods that return promises.

#### Q: Is the user ID personally identifiable?

**A:** No, all user IDs returned by these APIs are SHA-256 hashed and cannot be used to identify users personally.

#### Q: What limitations do anonymous users have?

**A:** Anonymous users cannot export final content (only preview renditions), have temporary user IDs that don't persist beyond 24 hours, and their settings won't persist across sessions.

#### Q: How should I handle data persistence for anonymous users?

**A:** Use local storage for temporary settings and prompt users to log in for persistent features. Anonymous user data should be treated as ephemeral.

#### Q: Can anonymous users use all add-on features?

**A:** Anonymous users can use most features but cannot export final content. Always check `isAnonymousUser()` before showing export options and provide a 'Sign in to export' message.
