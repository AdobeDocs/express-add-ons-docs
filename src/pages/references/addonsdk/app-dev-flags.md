# addOnUISdk.app.devFlags

This object contains flags which can be used to simulate certain behavior during development.

<InlineAlert slots="text" variant="warning"/>

`addOnUISdk.app.devFlags` are provided for testing purposes only, and thus can only be used during the development phase.

## Methods

### simulateFreeUser

Simulate APIs as a free user.

#### Signature

`simulateFreeUser: boolean`

#### Return Value

`boolean` representing the current value of the flag.

#### Example Usage

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  addOnUISdk.app.devFlags.simulateFreeUser = true;
});
```

See this [export content use case example](../../guides/learn/how-to/premium-content.md#show-a-premium-content-error-with-the-upgrade-option), which uses this flag for more details.
