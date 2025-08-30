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
  - isPremiumUser
  - isAnonymousUser
  - currentUser
  - unauthenticated user
title: Identify Users
description: Identify Users.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I get the current user's ID?"
      answer: 'Call `await addOnUISdk.app.currentUser.userId()` to get an anonymized unique user ID.'

    - question: "How do I check if a user has premium subscription?"
      answer: 'Call `await addOnUISdk.app.currentUser.isPremiumUser()` to get a boolean premium status.'

    - question: "How do I check if a user is anonymous (not logged in)?"
      answer: 'Call `await addOnUISdk.app.currentUser.isAnonymousUser()` to check if the user is browsing as a guest.'

    - question: "Is the user ID persistent?"
      answer: "Yes, the anonymized user ID is unique and persistent for each user. However, for anonymous users, the ID is temporary and will change if they later log in."

    - question: "Are these methods synchronous?"
      answer: "No, `userId()`, `isPremiumUser()`, and `isAnonymousUser()` are all asynchronous methods that return promises."

    - question: "What can I use the user ID for?"
      answer: "Track user subscriptions, manage user-specific features, and integrate with licensing services."

    - question: "How can I use premium status information?"
      answer: "Tailor user experience, unlock premium features, or suggest Adobe Express premium functionality."

    - question: "Is the user ID personally identifiable?"
      answer: "No, the user ID is anonymized and cannot be used to identify users personally."

    - question: "What limitations do anonymous users have?"
      answer: "Anonymous users cannot export final content (only preview renditions), have temporary user IDs that don't persist beyond 24 hours, and their settings won't persist across sessions."

    - question: "How should I handle data persistence for anonymous users?"
      answer: "Use local storage for temporary settings and prompt users to log in for persistent features. Anonymous user data should be treated as ephemeral."

    - question: "Can anonymous users use all add-on features?"
      answer: "Anonymous users can use most features but cannot export final content. Always check `isAnonymousUser()` before showing export options and provide a 'Sign in to export' message."
---

# Identify Users

## Access User Information

You can leverage the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) API to to retrieve information for the current user using Adobe Express. Three asynchronous methods are available:

- `userId()`: returns a masked ID that is unique to the user and persistent
- `isPremiumUser()`: returns `true` if the user has a premium Adobe Express subscription, `false` otherwise
- `isAnonymousUser()`: returns `true` if the current user is browsing as a guest (not signed in), `false` otherwise

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const userId = await addOnUISdk.app.currentUser.userId();
  const isPremium = await addOnUISdk.app.currentUser.isPremiumUser();
  const isAnonymous = await addOnUISdk.app.currentUser.isAnonymousUser();

  console.log(`Current Userid:\n${userId}`);
  // Current Userid:
  // 3cda976828a4a90d13b0f38b1f8a59b1d6845cabfc48037fb30bb75d3ef67d36`

  console.log(`Is Premium User: ${isPremium}`);
  // Is Premium User: false

  console.log(`Is Anonymous User: ${isAnonymous}`);
  // Is Anonymous User: false
});
```

## Use Cases

The `userId()` serves as a unique identifier that you can use to track whether a user is a free or paid subscriber to your add-on. By storing this ID in your database, you can manage user-specific features and permissions, allowing your add-on to unlock premium functionalities or restrict access based on their subscription status. Similarly, `isPremiumUser()` return value can be used to tailor the user experience, for example suggesting Adobe Express premium features.

Please refer to the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) and the [licensed-addon code sample](../samples.md#licensed-addon), which shows how you can utilize the hash of the user ID to integrate your add-on with licensing and payment services.

### Handling Anonymous Users

When `isAnonymousUser()` returns `true`, the user is browsing as a guest without logging in. This creates important considerations for your add-on's functionality:

#### **Data Persistence Limitations**

- **User settings**: Any preferences or configurations tied to the `userId` will not persist beyond the current session or approximately 24 hours
- **User identification**: The `userId` for anonymous users is temporary and will change if they later log in
- **Recommendation**: Use local storage for temporary settings and prompt users to log in for persistent features

#### **Analytics Considerations**

- **User tracking**: Anonymous user IDs are not permanent and will change upon login, potentially creating duplicate user records
- **Recommendation**: Implement logic to handle user ID transitions or track anonymous sessions separately

#### **Export Restrictions**

- **Content export**: Anonymous users cannot export final content (only preview renditions are allowed)
- **User experience**: Export attempts will trigger a login prompt, which can disrupt the user flow
- **Recommendation**: Check `isAnonymousUser()` before showing export options and provide a proactive "Sign in to export" message instead of letting users encounter errors

## FAQs

#### Q: How do I get the current user's ID?

**A:** Call `await addOnUISdk.app.currentUser.userId()` to get an anonymized unique user ID.

#### Q: How do I check if a user has premium subscription?

**A:** Call `await addOnUISdk.app.currentUser.isPremiumUser()` to get a boolean premium status.

#### Q: How do I check if a user is anonymous (not logged in)?

**A:** Call `await addOnUISdk.app.currentUser.isAnonymousUser()` to check if the user is browsing as a guest.

#### Q: Is the user ID persistent?

**A:** Yes, the anonymized user ID is unique and persistent for each user. However, for anonymous users, the ID is temporary and will change if they later log in.

#### Q: Are these methods synchronous?

**A:** No, `userId()`, `isPremiumUser()`, and `isAnonymousUser()` are all asynchronous methods that return promises.

#### Q: What can I use the user ID for?

**A:** Track user subscriptions, manage user-specific features, and integrate with licensing services.

#### Q: How can I use premium status information?

**A:** Tailor user experience, unlock premium features, or suggest Adobe Express premium functionality.

#### Q: Is the user ID personally identifiable?

**A:** No, the user ID is anonymized and cannot be used to identify users personally.

#### Q: What limitations do anonymous users have?

**A:** Anonymous users cannot export final content (only preview renditions), have temporary user IDs that don't persist beyond 24 hours, and their settings won't persist across sessions.

#### Q: How should I handle data persistence for anonymous users?

**A:** Use local storage for temporary settings and prompt users to log in for persistent features. Anonymous user data should be treated as ephemeral.

#### Q: Can anonymous users use all add-on features?

**A:** Anonymous users can use most features but cannot export final content. Always check `isAnonymousUser()` before showing export options and provide a "Sign in to export" message.
