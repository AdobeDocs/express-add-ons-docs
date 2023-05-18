# OAuth
The OAuth APIs can be used to obtain the authorization "code" from any OAuth 2.0 provider supporting the [Code Exchange authorization](https://www.oauth.com/oauth2-servers/pkce/authorization-code-exchange/) workflow. Here are the steps to get started:

Log in to the OAuth provider's website and create an application. This must be a web application, and if an option of SPA (Single Page Application) is listed, select it.
As an input to the **Redirect URIs** field, add: [https://new.express.adobe.com/static/oauth-redirect.html](https://new.express.adobe.com/static/oauth-redirect.html)

Fill out other details as necessary and save the form. A **Client Id** / **Application Id** / **Application Key** (varies between different OAuth providers) gets generated.
Next you need to add the host name of the OAuth provider's authorization URL to the `manifest.json` file.

When using multiple providers, all such hostnames must be provided.
For example, if the add-on uses two OAuth providers (such as `login.microsoftonline.com` and `www.dropbox.com`), its `manifest.json` should be updated according to this:

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

Now the setup is complete and the OAuth APIs can be used by following the contract and usage as detailed below:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Interface

```js
interface Application {
    /**
     * OAuth 2.0 middleware for handling user authorization.
     */
    readonly oauth: OAuth;
}

export interface OAuth {
    /**
     * Authorize a user using OAuth 2.0 PKCE workflow.
     * @param request - {@link AuthorizationRequest} Payload with parameters to be used in the authorization workflow.
     * @returns - {@link AuthorizationResponse} Response containing a ONE-TIME Authorization Code which can be used to obtain an access token.
     */
    authorize(request: AuthorizationRequest): Promise<AuthorizationResponse>;

    /**
     * Initiate the OAuth 2.0 PKCE authorization workflow by opening the user sign-in window.
     * Post authorization the user is redirected to the Add-on developer provided URL.
     * @param request - {@link AuthorizeWithOwnRedirectRequest} Payload with parameters to be used in the authorization workflow.
     * @returns - {@link AuthorizationResult} Authorization result.
     */
    authorizeWithOwnRedirect(request: AuthorizeWithOwnRedirectRequest): Promise<AuthorizationResult>;
}

export type AuthorizationRequest = {
    /**
     * OAuth provider's authorization URL.
     */
    authorizationUrl: string;

    /**
     * Client identifier of the application created at the OAuth provider.
     */
    clientId: string;

    /**
     * Code challenge used in Authorization Code Exchange.
     */
    codeChallenge: string;

    /**
     * Scope to control the application's access.
     */
    scope: string;

    /**
     * Additional parameters, specific to an OAuth provider which
     * are required in the Authorization URL as query string parameters.
     */
    additionalParameters?: Map<string, string>;
};

export type AuthorizeWithOwnRedirectRequest = AuthorizationRequest & {
    /**
     * URL where the user is redirected to after successful or failed authorization.
     * Hosting and handling redirects to this URL should be managed by the caller.
     */
    redirectUri: string;

    /**
     * A value which is preserved in the authorization request,
     * and replayed back as a query string parameter in the redirectUri.
     * Although the primary reason for using the state parameter is to mitigate CSRF attacks,
     * it can also be used to encode any other information.
     */
    state: string;
};

export type AuthorizationResponse = {
    /**
     * Unique identifier for the authorization request.
     */
    id: string;

    /**
     * OAuth 2.0 generated authorization code which can be used
     * ONCE to obtain an access token and a refresh token.
     */
    code: string;

    /**
     * URL where the user is redirected to after authorization.
     * This is the default URL owned by Adobe and
     * it is this URL which needs to be used to obtain access_token.
     */
    redirectUri: string;

    /**
     * Authorization result which denotes either success or failure,
     * represented by {@link AuthorizationResult}.
     */
    result: AuthorizationResult;
};

export type AuthorizationResult = {
    /**
     * Status representing success or failure in the authorization workflow.
     */
    status: AuthorizationStatus;

    /**
     * Description about the success or failure in the authorization workflow.
     * In the event of a FAILED status reported by the OAuth provider during authorization,
     * the value of this property is an object, in the form of \{ [failure_title]: \"failure_description\" \}
     * While for all other statuses the value of this property is a string.
     */
    description: string | object;
};

export enum AuthorizationStatus {
    SUCCESS = "SUCCESS",
    POPUP_OPENED = "POPUP_OPENED",
    POPUP_BLOCKED = "POPUP_BLOCKED",  
    POPUP_TIMEOUT = "POPUP_TIMEOUT",  
    FAILED = "FAILED"
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
const DROPBOX_AUTHORIZATION_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const DROPBOX_CLIENT_ID = "<DROPBOX_CLIENT_ID>";
const DROPBOX_SCOPE = "<DROPBOX_SPACE_SEPARATED_SCOPES>";
 
const ONEDRIVE_AUTHORIZATION_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/authorize";
const ONEDRIVE_TOKEN_URL = "https://login.microsoftonline.com/<AZURE_AD_TENANT_ID>/oauth2/v2.0/token";
const ONEDRIVE_CLIENT_ID = "<ONEDRIVE_CLIENT_ID>";
const ONEDRIVE_SCOPE = "<ONEDRIVE_SPACE_SEPARATED_SCOPES>";
const OWN_REDIRECT_URI = "<OWN_REDIRECT_URI>";
 
AddOnSdk.ready.then(() => {
    // 'oauthUtils' is a helper javascript module (included with the OAuth template) which provides utility functions to:
    // 1. generateChallenge()     Generate the 'code_challenge' and 'code_verifier' parameters that are essential in the OAuth 2.0 workflow.
    // 2. generateAccessToken()   Generate an 'access_token' and a 'refresh_token' using the 'code' and 'redirectUri' received on successful authorization.
    // 3. getAccessToken()        Get an always valid 'access_token'.
     
    const challenge = await oauthUtils.generateChallenge();
     
    await authorize(challenge);
     
    await authorizeWithOwnRedirect(challenge);
});
 
function authorize(challenge) {
    const { id, code, redirectUri, result } = await oauth.authorize({
        authorizationUrl: DROPBOX_AUTHORIZATION_URL,
        clientId: DROPBOX_CLIENT_ID,
        scope: DROPBOX_SCOPE,
        codeChallenge: challenge.codeChallenge
    });
 
    const { status, description } = result;
    if (status !== "SUCCESS") {
        throw new Error(`Status: ${status} | Description: ${description}`);
    }
 
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
 
function authorizeWithOwnRedirect(challenge) {
    const result = await oauth.authorizeWithOwnRedirect({
        authorizationUrl: ONEDRIVE_AUTHORIZATION_URL,
        clientId: ONEDRIVE_CLIENT_ID,
        scope: ONEDRIVE_SCOPE,
        codeChallenge: challenge.codeChallenge,
        redirectUri: OWN_REDIRECT_URI,
        state: <ANY_STRING_THAT_WILL_BE_REPLAYED_AT_REDIRECT>
    });
 
    const { status, description } = result;
    if (status !== "POPUP_OPENED") {
        throw new Error(`Status: ${status} | Description: ${description}`);
    }
 
    // Handle post-redirection after successful authorization
    // and retrieve the authorization "code" for generating access_token.
 
    const id = <ANY_UNIQUE_STRING>;
    await oauthUtils.generateAccessToken({
        id,
        clientId: ONEDRIVE_CLIENT_ID,
        codeVerifier: challenge.codeVerifier,
        code,
        tokenUrl: ONEDRIVE_TOKEN_URL,
        OWN_REDIRECT_URI
    });
 
    const accessToken = await oauthUtils.getAccessToken(id);
}
```

<InlineAlert slots="text" variant="success"/>

We have provided two samples that can be used as a reference for implementing the OAuth APIs. Please see the **import-images-using-oauth** and **Dropbox** samples for specific details.
