# addOnUISdk.app.oauth

Provides access to the OAuth API methods needed for implementing the [user authorization with OAuth 2.0 use case](../../guides/learn/how_to/oauth2.md#use-oauth-20). Be sure to check out the [code samples](../../guides/learn/samples.md) as well for more extensive examples of using this workflow.

## Methods

### authorize()

Authorize a user using OAuth 2.0 PKCE workflow.

#### Signature

`authorize(request: AuthorizationRequest): Promise<AuthorizationResponse>`

#### Parameters

| Name      | Type     |                                                                                                              Description |
| --------- | -------- | -----------------------------------------------------------------------------------------------------------------------: |
| `request` | `object` | [`AuthorizationRequest`](#authorizationrequest) object payload with parameters to be used in the authorization workflow. |

#### `AuthorizationRequest`

| Name                    |                                Type |                                                                                                                                                                                                                                                                Description |
| ----------------------- | ----------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `authorizationUrl`      |                            `string` |                                                                                                                                                                                                                                        OAuth provider's authorization URL. |
| `clientId`              |                            `string` |                                                                                                                                                                                                        Client identifier of the application created at the OAuth provider. |
| `scope`                 |                            `string` |                                                                                                                                                                                                                                 Scope to control the application's access. |
| `codeChallenge`         |                            `string` |                                                                                                                                                                                                                        Code challenge used in Authorization Code Exchange. |
| `additionalParameters?` |               `Map<string, string>` |                                                                                                                                               Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters. |
| `windowSize?`           | `{ width: number; height: number }` | The authorization window size in the form of an `object` containing the desired `width` and `height` as a `number`. <br/><br/>**NOTE:** The **minimum** (and **default**) values for `windowSize` are 480 x 480. The **maximum** allowed values are 800 x (screen height). |

#### Return Value

A resolved `Promise` with the [`AuthorizationResponse`](#authorizationresponse) object containing a one-time authorization code which can be used to obtain an access token.

#### `AuthorizationResponse`

| Name          | Type                 |                                                                                                                                                                                                                                                                                                                                                         Description |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `id`          | `string`             |                                                                                                                                                                                                                                                                                                                    Unique identifier for the authorization request. |
| `code`        | `string`             |                                                                                                                                                                                                                                                        OAuth 2.0 generated authorization code which can be used once to obtain an access token and a refresh token. |
| `redirectUri` | `string`             |                                                                                                                                                                                                   URL where the user is redirected to after authorization. This is the default URL owned by Adobe and it is this URL which needs to be used to obtain access_token. |
| `result`      | `string` or `object` | An [`AuthorizationResult`](#authorizationresult) payload which denotes either success or failure. In the event of a "FAILED" status reported by the OAuth provider during authorization, the value of this property is an `object`, in the form of `{[failure_title]: "failure_description"}`, and for all other statuses the value of `description` is a `string`. |

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function handleOAuthAuthorization() {
  try {
    const authRequest = {
      authorizationUrl: "https://api.example.com/oauth/authorize",
      clientId: "your-client-id",
      scope: "read write",
      codeChallenge: "generated-code-challenge",
      additionalParameters: new Map([
        ["response_type", "code"],
        ["access_type", "offline"]
      ]),
      windowSize: { width: 600, height: 700 }
    };

    const response = await addOnUISdk.app.oauth.authorize(authRequest);
    
    if (response.result.status === "SUCCESS") {
      console.log("Authorization successful!");
      console.log("Authorization code:", response.code);
      console.log("Redirect URI:", response.redirectUri);
      // Use the authorization code to get access token
    } else {
      console.log("Authorization failed:", response.result.description);
    }
  } catch (error) {
    console.log("OAuth error:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function handleOAuthAuthorization(): Promise<void> {
  try {
    const authRequest: AuthorizationRequest = {
      authorizationUrl: "https://api.example.com/oauth/authorize",
      clientId: "your-client-id",
      scope: "read write",
      codeChallenge: "generated-code-challenge",
      additionalParameters: new Map<string, string>([
        ["response_type", "code"],
        ["access_type", "offline"]
      ]),
      windowSize: { width: 600, height: 700 }
    };

    const response: AuthorizationResponse = await addOnUISdk.app.oauth.authorize(authRequest);
    
    if (response.result.status === AuthorizationStatus.authorized) {
      console.log("Authorization successful!");
      console.log("Authorization code:", response.code);
      console.log("Redirect URI:", response.redirectUri);
      // Use the authorization code to get access token
    } else {
      console.log("Authorization failed:", response.result.description);
    }
  } catch (error) {
    console.log("OAuth error:", error);
  }
}
```

### authorizeWithOwnRedirect()

Initiate the OAuth 2.0 PKCE authorization workflow by opening the user sign-in window. After authorization, the user is redirected to the add-on developer provided URL.

#### Signature:

`authorizeWithOwnRedirect(request: AuthorizeWithOwnRedirectRequest): Promise<AuthorizationResult>`

#### Parameters

| Name      | Type     |                                                                                                                                    Description |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------: |
| `request` | `object` | [`AuthorizeWithOwnRedirectRequest`](#authorizewithownredirectrequest) object payload with parameters to be used in the authorization workflow. |

#### `AuthorizeWithOwnRedirectRequest`

| Name                    |                                Type |                                                                                                                                                                                                                                                                Description |
| ----------------------- | ----------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `authorizationUrl`      |                            `string` |                                                                                                                                                                                                                                        OAuth provider's authorization URL. |
| `clientId`              |                            `string` |                                                                                                                                                                                                        Client identifier of the application created at the OAuth provider. |
| `scope`                 |                            `string` |                                                                                                                                                                                                                                 Scope to control the application's access. |
| `codeChallenge`         |                            `string` |                                                                                                                                                                                                                        Code challenge used in Authorization Code Exchange. |
| `additionalParameters?` |               `Map<string, string>` |                                                                                                                                               Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters. |
| `windowSize?`           | `{ width: number; height: number }` | The authorization window size in the form of an `object` containing the desired `width` and `height` as a `number`. <br/><br/>**NOTE:** The **minimum** (and **default**) values for `windowSize` are 480 x 480. The **maximum** allowed values are 800 x (screen height). |
| `redirectUri`           |                            `string` |                                                                                                                  URL where the user is redirected to after successful or failed authorization. Hosting and handling redirects to this URL should be managed by the caller. |
| `state`                 |                            `string` |                 A value which is preserved in the request, and replayed back as a query string parameter in the `redirectUri`. Although the primary reason for using the state parameter is to mitigate CSRF attacks, it can also be used to encode any other information. |

#### Return Value

A resolved `Promise` with the [`AuthorizationResult`](#authorizationresult) object, which contains a `status` and a `description`, which will either be a `string` or an `object`. In the event of a `FAILED` status reported by the OAuth provider during authorization, the value of this property is an `object`, in the form of `{[failure_title]: "failure_description"}`, and for all other statuses, the value of `description` is a `string`.

#### `AuthorizationResult`

| Name          |                  Type |                                                                                                                                                                                                                                                                                                                               Description |
| ------------- | --------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `status`      | `AuthorizationStatus` |                                                                                                                                                                                                                                                                     Status representing success or failure in the authorization workflow. |
| `description` |  `string` or `object` | Description about the success or failure in the authorization workflow In the event of a "FAILED" status reported by the OAuth provider during authorization, the value of this property is an `object`, in the form of `{[failure_title]: "failure_description"}`. While for all other statuses the value of this property is a `string` |

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function handleOAuthWithRedirect() {
  try {
    const authRequest = {
      authorizationUrl: "https://api.example.com/oauth/authorize",
      clientId: "your-client-id",
      scope: "read write",
      codeChallenge: "generated-code-challenge",
      redirectUri: "https://yourapp.com/oauth/callback",
      state: "random-state-value",
      additionalParameters: new Map([
        ["response_type", "code"],
        ["access_type", "offline"]
      ]),
      windowSize: { width: 600, height: 700 }
    };

    const result = await addOnUISdk.app.oauth.authorizeWithOwnRedirect(authRequest);
    
    if (result.status === "POPUP_OPENED") {
      console.log("Authorization popup opened successfully");
      console.log("Handle the redirect at your callback URL:", authRequest.redirectUri);
    } else {
      console.log("Authorization failed:", result.description);
    }
  } catch (error) {
    console.log("OAuth error:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function handleOAuthWithRedirect(): Promise<void> {
  try {
    const authRequest: AuthorizeWithOwnRedirectRequest = {
      authorizationUrl: "https://api.example.com/oauth/authorize",
      clientId: "your-client-id",
      scope: "read write",
      codeChallenge: "generated-code-challenge",
      redirectUri: "https://yourapp.com/oauth/callback",
      state: "random-state-value",
      additionalParameters: new Map<string, string>([
        ["response_type", "code"],
        ["access_type", "offline"]
      ]),
      windowSize: { width: 600, height: 700 }
    };

    const result: AuthorizationResult = await addOnUISdk.app.oauth.authorizeWithOwnRedirect(authRequest);
    
    if (result.status === AuthorizationStatus.cancelled) {
      console.log("Authorization popup opened successfully");
      console.log("Handle the redirect at your callback URL:", authRequest.redirectUri);
    } else {
      console.log("Authorization failed:", result.description);
    }
  } catch (error) {
    console.log("OAuth error:", error);
  }
}
```

### authorizeInsideIframe()

Authorize a user using OAuth 2.0 PKCE workflow in an iframe. This method provides an alternative to popup-based authorization for cases where popups may be blocked or when you prefer an iframe-based flow.

#### Signature:

`authorizeInsideIframe(request: AuthorizeInsideIframeRequest): Promise<AuthorizationResponse>`

#### Parameters

| Name      | Type     |                                                                                                                                    Description |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------: |
| `request` | `object` | [`AuthorizeInsideIframeRequest`](#authorizeinsideiframerequest) object payload with parameters to be used in the authorization workflow. |

#### `AuthorizeInsideIframeRequest`

Extends [`AuthorizationRequest`](#authorizationrequest) with additional properties specific to iframe-based OAuth flows.

| Name                    |                                Type |                                                                                                                                                                                                                                                                Description |
| ----------------------- | ----------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `authorizationUrl`      |                            `string` |                                                                                                                                                                                                                                        OAuth provider's authorization URL. |
| `clientId`              |                            `string` |                                                                                                                                                                                                        Client identifier of the application created at the OAuth provider. |
| `scope`                 |                            `string` |                                                                                                                                                                                                                                 Scope to control the application's access. |
| `codeChallenge`         |                            `string` |                                                                                                                                                                                                                        Code challenge used in Authorization Code Exchange. |
| `additionalParameters?` |               `Map<string, string>` |                                                                                                                                               Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters. |
| `windowSize?`           | `{ width: number; height: number }` | The authorization iframe size in the form of an `object` containing the desired `width` and `height` as a `number`. <br/><br/>**NOTE:** The **minimum** (and **default**) values for `windowSize` are 480 x 480. The **maximum** allowed values are 800 x (screen height). |
| `position?`             |   `{ top: number; left: number }`   |                                                                                                                                                                                                                               Relative position of the OAuth iframe panel. |
| `offset?`               | `{ right: number; bottom: number }` |                                                                                                                                                         Offset from the right and bottom of the iframe container when the size (`windowSize`) is not specified. |
| `showHeader?`           |                           `boolean` |                                                                                                                                                                                                                 Flag to determine if the iframe panel needs to show a header. |

#### Return Value

A resolved `Promise` with the [`AuthorizationResponse`](#authorizationresponse) object, which contains the authorization code, redirect URI, and result status.

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function handleOAuthInsideIframe() {
  try {
    const authRequest = {
      authorizationUrl: "https://api.example.com/oauth/authorize",
      clientId: "your-client-id",
      scope: "read write",
      codeChallenge: "generated-code-challenge",
      additionalParameters: new Map([
        ["response_type", "code"],
        ["access_type", "offline"]
      ]),
      windowSize: { width: 600, height: 700 },
      position: { top: 100, left: 100 },
      showHeader: true
    };

    const response = await addOnUISdk.app.oauth.authorizeInsideIframe(authRequest);
    
    if (response.result.status === "SUCCESS") {
      console.log("Authorization successful!");
      console.log("Authorization code:", response.code);
      console.log("Redirect URI:", response.redirectUri);
      // Use the authorization code to get access token
    } else {
      console.log("Authorization failed:", response.result.description);
    }
  } catch (error) {
    console.log("OAuth error:", error);
  }
}
```

#### TypeScript

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
await addOnUISdk.ready;

async function handleOAuthInsideIframe(): Promise<void> {
  try {
    const authRequest: AuthorizeInsideIframeRequest = {
      authorizationUrl: "https://api.example.com/oauth/authorize",
      clientId: "your-client-id",
      scope: "read write",
      codeChallenge: "generated-code-challenge",
      additionalParameters: new Map<string, string>([
        ["response_type", "code"],
        ["access_type", "offline"]
      ]),
      windowSize: { width: 600, height: 700 },
      position: { top: 100, left: 100 },
      showHeader: true
    };

    const response: AuthorizationResponse = await addOnUISdk.app.oauth.authorizeInsideIframe(authRequest);
    
    if (response.result.status === AuthorizationStatus.authorized) {
      console.log("Authorization successful!");
      console.log("Authorization code:", response.code);
      console.log("Redirect URI:", response.redirectUri);
      // Use the authorization code to get access token
    } else {
      console.log("Authorization failed:", response.result.description);
    }
  } catch (error) {
    console.log("OAuth error:", error);
  }
}
```

#### `AuthorizationStatus`

Each of the statuses returned below is the exact name as a string (ie: SUCCESS = "SUCCESS")

| Name          | Type     |                                                                                                             Description |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------: |
| SUCCESS       | `string` |                            Successful authorization this is the expected result for the [Authorize](#authorize) method) |
| POPUP_OPENED  | `string` | The popup was opened (this is the expected result for the [AuthorizeWithOwnRedirect](#authorizewithownredirect) method) |
| POPUP_BLOCKED | `string` |      The popup was blocked. (Add `allow-popups` permission to your [manifest.json](../manifest/) `sandbox` permissions) |
| POPUP_TIMEOUT | `string` |                                                                                                    The popup timed out. |
| FAILED        | `string` |                                                                                       The authorization workflow failed |

## Errors

The table below describes the possible error statuses returned when using the OAuth API, with a description of the scenario that will return them.

<br/>

|  Error Status |                                                                     Description |
| ------------: | ------------------------------------------------------------------------------: |
| POPUP_BLOCKED |                                       The window for authorization was blocked. |
| POPUP_TIMEOUT |                                     The window for authorization was timed out. |
|        FAILED | &lt;Failure object returned by the OAuth provider when authorization fails.&gt; |
