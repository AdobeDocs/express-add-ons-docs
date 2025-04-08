# addOnUISdk.app.currentUser

Provides access to the currently logged in user.

## Methods

### userId()

Retrieve the current user of the host application (Adobe Express).

#### Signature

`userId(): Promise<string>`

#### Return Value

A resolved `Promise` containing the `userId` of the current user.

## Example

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    const userId = await addOnUISdk.app.currentUser.userId();
    console.log("Current Userid: " + userId);
});
```

### Output

`Current Userid: 3cda976828a4a90d13b0f38b1f8a59b1d6845cccfc48037fb30bb75d3ef67d36`

### isPremiumUser()

Indicates if the current user is a premium user.

#### Signature

`isPremiumUser(): Promise<boolean>`

#### Return Value

A resolved `Promise` containing a boolean value indicating if the user is a premium user or not.

## Example

### Usage

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
addOnUISdk.ready.then(async () => {
  const isPremiumUser = await addOnUISdk.app.currentUser.isPremiumUser();
  if (!isPremiumUser) {
    // User not premium, allow only non-premium features only
  }
});
```
