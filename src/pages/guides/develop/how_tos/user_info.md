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
title: Identifying Users
description:  Identifying Users.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---
# Identifying Users

## Getting the User ID

You can leverage the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) object to obtain the information for the currently logged-in user. Two asynchronous methods are available: `userId()` returns an anonymized ID that is unique to the user and persistent, and `isPremiumUser()` returns a boolean value indicating whether the user has a premium subscription with Adobe Express or not.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
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

Please refer to the [`addOnUISdk.app.currentUser`](../../../references/addonsdk/app-currentUser.md) and the [licensed-addon code sample](/samples.md#licensed-addon), which shows how you can utilize the hash of the user ID to integrate your add-on with licensing and payment services.
