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
  - currentUser
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

    - question: "Is the user ID persistent?"
      answer: "Yes, the anonymized user ID is unique and persistent for each user."

    - question: "Are these methods synchronous?"
      answer: "No, both `userId()` and `isPremiumUser()` are asynchronous methods that return promises."

    - question: "What can I use the user ID for?"
      answer: "Track user subscriptions, manage user-specific features, and integrate with licensing services."

    - question: "How can I use premium status information?"
      answer: "Tailor user experience, unlock premium features, or suggest Adobe Express premium functionality."

    - question: "Is the user ID personally identifiable?"
      answer: "No, the user ID is anonymized and cannot be used to identify users personally."
---

# Identify Users

## Get the User ID

You can leverage the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) object to obtain the information for the currently logged-in user. Two asynchronous methods are available: `userId()` returns an anonymized ID that is unique to the user and persistent, and `isPremiumUser()` returns a boolean value indicating whether the user has a premium subscription with Adobe Express or not.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  const userId = await addOnUISdk.app.currentUser.userId();
  const isPremium = await addOnUISdk.app.currentUser.isPremiumUser();

  console.log(`Current Userid:\n${userId}`);
  // Current Userid:
  // 3cda976828a4a90d13b0f38b1f8a59b1d6845cabfc48037fb30bb75d3ef67d36`

  console.log(`Is Premium User: ${isPremium}`);
  // Is Premium User: false
});
```

## Use Cases

The `userId()` serves as a unique identifier that you can use to track whether a user is a free or paid subscriber to your add-on. By storing this ID in your database, you can manage user-specific features and permissions, allowing your add-on to unlock premium functionalities or restrict access based on their subscription status. Similarly, `isPremiumUser()` return value can be used to tailor the user experience, for example suggesting Adobe Express premium features..

Please refer to the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) and the [licensed-addon code sample](../samples.md#licensed-addon), which shows how you can utilize the hash of the user ID to integrate your add-on with licensing and payment services.

## FAQs

#### Q: How do I get the current user's ID?

**A:** Call `await addOnUISdk.app.currentUser.userId()` to get an anonymized unique user ID.

#### Q: How do I check if a user has premium subscription?

**A:** Call `await addOnUISdk.app.currentUser.isPremiumUser()` to get a boolean premium status.

#### Q: Is the user ID persistent?

**A:** Yes, the anonymized user ID is unique and persistent for each user.

#### Q: Are these methods synchronous?

**A:** No, both `userId()` and `isPremiumUser()` are asynchronous methods that return promises.

#### Q: What can I use the user ID for?

**A:** Track user subscriptions, manage user-specific features, and integrate with licensing services.

#### Q: How can I use premium status information?

**A:** Tailor user experience, unlock premium features, or suggest Adobe Express premium functionality.

#### Q: Is the user ID personally identifiable?

**A:** No, the user ID is anonymized and cannot be used to identify users personally.
