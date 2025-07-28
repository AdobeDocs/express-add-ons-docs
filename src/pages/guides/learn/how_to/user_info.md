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
---

# Identify Users

## Access User Information

You can leverage the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) API to obtain the information for the current user using Adobe Express. Three asynchronous methods are available:

  - `userId()`: returns a masked ID that is unique to the user and persistent
  - `isPremiumUser()`: returns a boolean value indicating whether the user has a premium subscription with Adobe Express or not.
  - `isAnonymousUser()`: returns a boolean value indicating whether the current user is browsing as a guest (not logged in).

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
