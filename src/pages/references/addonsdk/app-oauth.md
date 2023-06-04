# AddOnSdk.app.oauth
Provides access to the OAuth methods needed for use with the [OAuth API](../../develop/) for implementing user authorization with OAuth 2.0.

## Methods

### authorize()
Authorize a user using OAuth 2.0 PKCE workflow.

#### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `request`     | `object`       | Payload with parameters to be used in the authorization workflow. |

**Authorization Request Object Format**
- `authorizationUrl`: OAuth provider's authorization URL.
- `clientId`: Client identifier of the application created at the OAuth provider.
- `scope`: Scope to control the application's access.
- `codeChallenge`: Code challenge used in Authorization Code Exchange.
- `additionalParameters?: Map<string, string>`: Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters.


#### Return Value
Authorization response object containing a one-time authorization code which can be used to obtain an access token.

**Authorization Response Object Format**
`id`: `string` - Unique identifier for the authorization request.
`code`: `string` - OAuth 2.0 generated authorization code which can be used once to obtain an access token and a refresh token.
`redirectUri`: `string` - URL where the user is redirected to after authorization. This is the default URL owned by Adobe and it is this URL which needs to be used to obtain access_token.
`result`: `string | object` - Authorization result which denotes either success or failure. In the event of a `FAILED` status reported by the OAuth provider during authorization, the value of this property is an `object`, in the form of `\{ [failure_title]: \"failure_description\" \}`, and for all other statuses the value of `description` is a `string`.

**Valid `status` values:** 
- `"SUCCESS"`
- `"POPUP_OPENED"`
- `"POPUP_BLOCKED"`
- `"POPUP_TIMEOUT"`
- `"FAILED"`


### authorizeWithOwnRedirect()
<!-- authorizeWithOwnRedirect: app.oauth.authorizeWithOwnRedirect.bind(app.oauth) -->
Initiate the OAuth 2.0 PKCE authorization workflow by opening the user sign-in window. After authorization, the user is redirected to the add-on developer provided URL.     

#### Parameters
| Name          | Type         | Description   |
| ------------- | -------------| -----------:  |
| `request`     | `object`     | Payload with parameters to be used in the authorization workflow. |

**Authorization Request Object Format**
- `authorizationUrl`: OAuth provider's authorization URL.
- `clientId`: Client identifier of the application created at the OAuth provider.
- `scope`: Scope to control the application's access.
- `codeChallenge`: Code challenge used in Authorization Code Exchange.
- `additionalParameters?: Map<string, string>`: Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters.
- `redirectUri`: URL where the user is redirected to after successful or failed authorization. Hosting and handling redirects to this URL should be managed by the caller.
- `state`:  A value which is preserved in the authorization request, and replayed back as a query string parameter in the `redirectUri`. Although the primary reason for using the state parameter is to mitigate CSRF attacks, it can also be used to encode any other information.

#### Return Value
A resolved promise with the authorization result object which contains a `status` and a `description` which will be either a `string` or an `object`. In the event of a `FAILED` status reported by the OAuth provider during authorization, the value of this property is an `object`, in the form of `\{ [failure_title]: \"failure_description\" \}`, and for all other statuses the value of `description` is a `string`.

**Valid `status` values:** 
- `"SUCCESS"`
- `"POPUP_OPENED"`
- `"POPUP_BLOCKED"`
- `"POPUP_TIMEOUT"`
- `"FAILED"`

