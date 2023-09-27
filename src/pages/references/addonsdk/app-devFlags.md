# AddOnSdk.app.devFlags
This object contains flags which can be used to simulate certain behavior during development.  

<InlineAlert slots="text" variant="warning"/>

`AddOnSdk.app.devFlags` are provided for testing purposes only, and thus can only be used during the development phase.


## Methods

### simulateFreeUser
Simulate APIs as a free user.

#### Signature
`simulateFreeUser: boolean`

#### Return Value
`boolean` representing the current value of the flag.

## Example
```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
AddOnSdk.ready.then(async () => {
  AddOnSdk.app.devFlags.simulateFreeUser = true;
});
```
