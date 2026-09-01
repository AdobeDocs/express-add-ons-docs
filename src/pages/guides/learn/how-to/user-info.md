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
      answer: "For users whose account has been migrated through Connected Enterprise, `legacyIds` contains SHA-256 hashes of their previous user IDs, letting you map a migrated user to their historical records. Connected Enterprise consolidation rolls out in phases, so `legacyIds` can be empty today and gain entries later once that user's profile is actually consolidated. An empty array doesn't confirm a user hasn't been or won't be consolidated."

    - question: "Can I tell whether a user's profile has been consolidated?"
      answer: "No, don't try to infer consolidation status from the values `identity()` returns. Matching IDs or an empty `legacyIds` array don't confirm anything: the user may not be an enterprise user, or may be an enterprise user who hasn't been consolidated yet. Always treat the resolved `userId` as the canonical identifier and use `legacyIds` when present to reconcile previously stored data."

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

* `identity()`: returns the current user's SHA-256 hashed, canonical ID and any legacy user IDs consolidated into it
* `userId()`: (**Deprecated** in favor of `identity()`) returns a SHA-256 hashed ID unique to the user
* `isPremiumUser()`: returns `true` if the user has a premium Adobe Express subscription, `false` otherwise
* `isAnonymousUser()`: returns `true` if the current user is browsing as a guest (not signed in), `false` otherwise

### Example

The following example retrieves the current user's identity, premium status, and anonymous status, then logs each value:

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

Use [`identity()`](../../../references/addonsdk/app-current-user.md#identity) to identify the current user of your add-on. It returns a [`UserIdentity`](../../../references/addonsdk/app-current-user.md#useridentity) object containing:

- `userId`: the current canonical user identifier
- `legacyIds`: previous user identifiers associated with the user, when available

<InlineAlert slots="header,text" variant="warning"/>

#### `userId()` is deprecated

Use [`addOnUISdk.app.currentUser.identity()`](../../../references/addonsdk/app-current-user.md#identity) instead of the deprecated [`addOnUISdk.app.currentUser.userId()`](../../../references/addonsdk/app-current-user.md#userid) method, which is scheduled for removal on **November 15, 2026**. For accounts that haven't been consolidated through Connected Enterprise, `userId()` returns the same value as `identity().userId`.

#### Handle user ID changes

If your add-on relies on the `userId` API to identify users uniquely for subscriptions, entitlements, analytics, licensing, account linking, or other user-specific data, Connected Enterprise (starting July 2026) might lead to a change in the user's ID when organization-specific profiles are consolidated into a single profile.

To handle this:

1. Call `identity()` and treat `userId` as the current canonical identifier.
2. Check whether any `legacyIds` match IDs your add-on previously stored.
3. If a legacy ID matches an existing record, associate that record with the current `userId`.

<InlineAlert slots="header,text" variant="info"/>

#### Don't infer consolidation status

Don't use `userId` or `legacyIds` to determine whether a user's profile has been consolidated. A matching `userId` or an empty `legacyIds` array does not indicate consolidation status.

For more information about the Connected Enterprise initiative, see [Unify identity and storage with Connected Enterprise](https://helpx.adobe.com/business/enterprise/global-admin-console/get-started/connected-enterprise.html), particularly the **Add-ons and plugins** section.

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

**A:** For users whose account has been migrated through Connected Enterprise, `legacyIds` contains SHA-256 hashes of their previous user IDs, letting you map a migrated user to their historical records. Connected Enterprise consolidation rolls out in phases, so `legacyIds` can be empty today and gain entries later once that user's profile is actually consolidated. An empty array doesn't confirm a user hasn't been or won't be consolidated.

#### Q: Can I tell whether a user's profile has been consolidated?

**A:** No, don't try to infer consolidation status from the values `identity()` returns. Matching IDs or an empty `legacyIds` array don't confirm anything: the user may not be an enterprise user, or may be an enterprise user who hasn't been consolidated yet. Always treat the resolved `userId` as the canonical identifier and use `legacyIds` when present to reconcile previously stored data.

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
