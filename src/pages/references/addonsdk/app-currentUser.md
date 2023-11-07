# addOnUISdk.app.currentUser
Provides access to the currently logged in user.

<!-- <InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This API is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it's been marked stable. To use this API, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of the `manifest.json`. 
 -->

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