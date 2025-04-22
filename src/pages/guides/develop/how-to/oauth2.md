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
  - Oauth
  - Authentication
  - Authorization
title: Use OAuth 2.0
description: Understand how to implement OAuth 2.0 authentication and authorization flows, including login, logout, and setup examples.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# Use OAuth 2.0

Implementing an OAuth 2.0 authorization flow, enabling users to authenticate and log in using their existing accounts from third-party services.

A typical use case would be to use assets stored in different services. Here, you will find instructions on how to set it up and an implementation example. Check also the [SDK Reference OAuth section](../../../references/addonsdk/app-oauth.md) for more options and details and the [import-images-using-oauth](../../../samples.md#import-images-using-oauth) sample add-on for more advanced usage.

### Login and Logout flows

Both login and logout flows are equally important, and developers should ensure that the add-on's UI provides functionality for both actions.

Authorization should persist across sessions so users don't have to log in with their credentials every time they use the add-on. The token's lifespan is at the discretion of the OAuth provider; the token itself can be stored remotely (e.g., mapping its UUID in the add-on's local storage) or directly in the local storage (easier but less secure).

### Setup

The OAuth APIs can be used to obtain the authorization "code" from any OAuth 2.0 provider supporting the Code Exchange authorization workflow. You will need to go through some setup steps with the provider you want to use OAuth with first. Here are the steps to get started:

1. Log in to the OAuth provider's website and create an application (for example, Dropbox). This must be a web application, and if an option of SPA (Single Page Application) is listed, select it.
2. As an input to the "Redirect URIs" field, add: [https://new.express.adobe.com/static/oauth-redirect.html](https://new.express.adobe.com/static/oauth-redirect.html).
3. Fill out other details as necessary and save the form. A client Id / application Id / application key (this differs on different OAuth providers) will be generated. Make note of it as you will need it in your add-on code.
4. Next, update your add-on `manifest.json` file with the hostname of the OAuth provider's authorization URL. **NOTE:** When using multiple providers, all hostnames must be provided. For example, if the add-on uses two OAuth providers (`"login.microsoftonline.com"` and `"www.dropbox.com"`), the `manifest.json` should contain both of them, as shown below:

```json
{
  "id": "<ADD_ON_ID>",
  "name": "<ADD_ON_NAME>",
  "version": "1.0.0",
  "manifestVersion": 1,
  "requirements": {
    "apps": ["Express"]
  },
  "entryPoints": [
    {
      "type": "panel",
      "id": "panel1",
      "label": {
        "default": "<ADD_ON_LABEL>"
      },
      "main": "index.html",
      "permissions": {
        "oauth": ["login.microsoftonline.com", "www.dropbox.com"]
      }
    }
  ]
}
```

### Example

Once you complete the setup, you can use the following code snippet as an example of how to perform the OAuth exchange to retrieve an access token. The [code samples](../../../samples.md) also include several examples of implementing OAuth 2.0 workflows, which you can refer to. Additionally, you'll find the [OAuthUtils.js](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js) module, referenced below, and we recommend utilizing this module to facilitate your own OAuth implementation. For further details on the OAuth workflows, be sure to explore the [SDK References](../../../references/addonsdk/app-oauth.md).

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const DROPBOX_AUTHORIZATION_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const DROPBOX_CLIENT_ID = "<DROPBOX_CLIENT_ID>";
const DROPBOX_SCOPE = "<DROPBOX_SPACE_SEPARATED_SCOPES>";

const ONEDRIVE_AUTHORIZATION_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/authorize";
const ONEDRIVE_TOKEN_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/token";
const ONEDRIVE_CLIENT_ID = "<ONEDRIVE_CLIENT_ID>";
const ONEDRIVE_SCOPE = "<ONEDRIVE_SPACE_SEPARATED_SCOPES>";
const OWN_REDIRECT_URI = "<OWN_REDIRECT_URI>";

addOnUISdk.ready.then(() => {
  // 'oauthUtils' is a helper javascript module (included with
  // the OAuth sample) which provides utility functions to:

  // 1. Generate the 'code_challenge' and 'code_verifier' parameters
  // that are essential in the OAuth 2.0 workflow.
  // generateChallenge()

  // 2. Generate an 'access_token' and a 'refresh_token' using the
  // 'code' and 'redirectUri' received on successful authorization.
  // generateAccessToken()

  // Get an always valid 'access_token'.
  // 3. getAccessToken()
  const challenge = await oauthUtils.generateChallenge();
  await authorize(challenge);
});

function authorize(challenge) {
  // Trigger the OAuth 2.0 based authorization which opens up a
  // sign-in window for the user and returns an authorization code
  // which can be used to obtain an access_token.
  const { id, code, redirectUri, result } = await addOnUISdk.app.oauth.authorize({
    authorizationUrl: DROPBOX_AUTHORIZATION_URL,
    clientId: DROPBOX_CLIENT_ID,
    scope: DROPBOX_SCOPE,
    codeChallenge: challenge.codeChallenge
  });

  const { status, description } = result;
  if (status !== "SUCCESS") {
    throw new Error(`Status: ${status} | Description: ${description}`);
  }

  // Generate the access_token which can be used to verify the identity
  // of the user and grant them access to the requested resource.
  await oauthUtils.generateAccessToken({
    id,
    clientId: DROPBOX_CLIENT_ID,
    codeVerifier: challenge.codeVerifier,
    code,
    tokenUrl: DROPBOX_TOKEN_URL,
    redirectUri
  });

  const accessToken = await oauthUtils.getAccessToken(id);
}
```

## Use Cases

OAuth is ideal for scenarios where users need to connect their accounts to access personalized features, sync data, or enable functionalities like cloud storage. You can also use it to authenticate users and authorize them to access your add-on's premium users, after they've subscribed to a paid plan.
