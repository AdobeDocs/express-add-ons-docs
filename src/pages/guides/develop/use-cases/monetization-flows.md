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
  - Add-on Manifest
title: Monetization Flows
description: Implement monetization strategies and handle user-related information for paid add-ons.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# Monetization Flows

## Get Current User information

You can leverage the [`currentUser`](../../../references/addonsdk/app-current-user.md) API to obtain the information for the currently logged-in user, for instance, if you want to use their `userId` to validate in a monetization flow.

See the example below and refer to the [related SDK Reference section](../../../references/addonsdk/app-current-user.md) and the [licensed-addon code sample](../../../samples.md#licensed-addon), which shows how you can utilize the hash of the user ID to integrate your add-on with licensing and payment services.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
addOnUISdk.ready.then(async () => {
  validateUser(await addOnUISdk.app.currentUser.userId());
});

validateUser(userId: string) {
  ...
}
```

### Output

`Current Userid: 3cda976828a4a90d13b0f38b1f8a59b1d6845cccfc48037fb30bb75d3ef67d36`
