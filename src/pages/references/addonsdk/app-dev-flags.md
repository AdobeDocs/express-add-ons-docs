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

## Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  addOnUISdk.app.devFlags.simulateFreeUser = true;
});
```

<<<<<<< HEAD:src/pages/references/addonsdk/app-dev-flags.md
See this [export content use case example](../../guides/develop/how-to/premium-content.md#show-a-premium-content-error-with-the-upgrade-option), which uses this flag for more details.
=======
See this [export content use case example](../../guides/learn/how_to/premium_content.md#show-a-premium-content-error-with-the-upgrade-option), which uses this flag for more details.
>>>>>>> c10e7f13f0ebdbfd5ff5dc03e7fed47ab831ba56:src/pages/references/addonsdk/app-devFlags.md
