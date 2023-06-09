"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[7075],{37047:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return h}});var n=a(87462),r=a(63366),i=(a(15007),a(64983)),d=a(91515),m=["components"],o={},l={_frontmatter:o},p=d.Z;function h(e){var t=e.components,a=(0,r.Z)(e,m);return(0,i.mdx)(p,(0,n.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"addonsdkappoauth"},"AddOnSdk.app.oauth"),(0,i.mdx)("p",null,"Provides access to the OAuth API methods needed for implementing the ",(0,i.mdx)("a",{parentName:"p",href:"../../guides/develop/#authorization-with-oauth-20"},"user authorization with OAuth 2.0 use case"),". Be sure to check out the ",(0,i.mdx)("a",{parentName:"p",href:"../../samples.md"},"code samples")," as well for more extensive examples of using this workflow."),(0,i.mdx)("h2",{id:"methods"},"Methods"),(0,i.mdx)("h2",{id:"authorize"},"authorize()"),(0,i.mdx)("p",null,"Authorize a user using OAuth 2.0 PKCE workflow."),(0,i.mdx)("h3",{id:"signature"},"Signature"),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"authorize(request: AuthorizationRequest): Promise<AuthorizationResponse>")),(0,i.mdx)("h3",{id:"parameters"},"Parameters"),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:null},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"request")),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"object")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("a",{parentName:"td",href:"#authorizationrequest-object"},(0,i.mdx)("inlineCode",{parentName:"a"},"AuthorizationRequest"))," object payload with parameters to be used in the authorization workflow.")))),(0,i.mdx)("h3",{id:"authorizationrequest"},(0,i.mdx)("inlineCode",{parentName:"h3"},"AuthorizationRequest")),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"authorizationUrl")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"OAuth provider's authorization URL.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"clientId")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Client identifier of the application created at the OAuth provider.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"scope")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Scope to control the application's access.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"codeChallenge")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Code challenge used in Authorization Code Exchange.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"additionalParameters?")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"Map<string, string>")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters.")))),(0,i.mdx)("h3",{id:"return-value"},"Return Value"),(0,i.mdx)("p",null,"A resolved ",(0,i.mdx)("inlineCode",{parentName:"p"},"Promise")," with the ",(0,i.mdx)("a",{parentName:"p",href:"#authorizationresponse-object"},(0,i.mdx)("inlineCode",{parentName:"a"},"AuthorizationResponse"))," object containing a one-time authorization code which can be used to obtain an access token."),(0,i.mdx)("h3",{id:"authorizationresponse"},(0,i.mdx)("inlineCode",{parentName:"h3"},"AuthorizationResponse")),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:null},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"id")),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Unique identifier for the authorization request.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"code")),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"OAuth 2.0 generated authorization code which can be used once to obtain an access token and a refresh token.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"redirectUri")),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"URL where the user is redirected to after authorization. This is the default URL owned by Adobe and it is this URL which needs to be used to obtain access_token.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"result")),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")," or ",(0,i.mdx)("inlineCode",{parentName:"td"},"object")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"An ",(0,i.mdx)("a",{parentName:"td",href:"#authorizationresult-object"},(0,i.mdx)("inlineCode",{parentName:"a"},"AuthorizationResult")),' payload which denotes either success or failure. In the event of a "FAILED" status reported by the OAuth provider during authorization, the value of this property is an ',(0,i.mdx)("inlineCode",{parentName:"td"},"object"),", in the form of ",(0,i.mdx)("inlineCode",{parentName:"td"},'{[failure_title]: "failure_description"}'),", and for all other statuses the value of ",(0,i.mdx)("inlineCode",{parentName:"td"},"description")," is a ",(0,i.mdx)("inlineCode",{parentName:"td"},"string"),".")))),(0,i.mdx)("h2",{id:"authorizewithownredirect"},"authorizeWithOwnRedirect()"),(0,i.mdx)("p",null,"Initiate the OAuth 2.0 PKCE authorization workflow by opening the user sign-in window. After authorization, the user is redirected to the add-on developer provided URL.     "),(0,i.mdx)("h3",{id:"signature-1"},"Signature:"),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"authorizeWithOwnRedirect(request: AuthorizeWithOwnRedirectRequest): Promise<AuthorizationResult>")),(0,i.mdx)("h3",{id:"parameters-1"},"Parameters"),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:null},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"request")),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"object")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("a",{parentName:"td",href:"#authorizewithownredirectrequest-object"},(0,i.mdx)("inlineCode",{parentName:"a"},"AuthorizeWithOwnRedirectRequest"))," object payload with parameters to be used in the authorization workflow.")))),(0,i.mdx)("h3",{id:"authorizewithownredirectrequest"},(0,i.mdx)("inlineCode",{parentName:"h3"},"AuthorizeWithOwnRedirectRequest")),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"authorizationUrl")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"OAuth provider's authorization URL.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"clientId")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Client identifier of the application created at the OAuth provider.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"scope")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Scope to control the application's access.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"codeChallenge")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Code challenge used in Authorization Code Exchange.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"additionalParameters?")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"Map<string, string>")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Additional parameters, specific to an OAuth provider which are required in the Authorization URL as query string parameters.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"redirectUri")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"URL where the user is redirected to after successful or failed authorization. Hosting and handling redirects to this URL should be managed by the caller.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"state")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"A value which is preserved in the request, and replayed back as a query string parameter in the ",(0,i.mdx)("inlineCode",{parentName:"td"},"redirectUri"),". Although the primary reason for using the state parameter is to mitigate CSRF attacks, it can also be used to encode any other information.")))),(0,i.mdx)("h3",{id:"return-value-1"},"Return Value"),(0,i.mdx)("p",null,"A resolved ",(0,i.mdx)("inlineCode",{parentName:"p"},"Promise")," with the ",(0,i.mdx)("a",{parentName:"p",href:"#authorizationresult-object"},(0,i.mdx)("inlineCode",{parentName:"a"},"AuthorizationResult"))," object, which contains a ",(0,i.mdx)("inlineCode",{parentName:"p"},"status")," and a ",(0,i.mdx)("inlineCode",{parentName:"p"},"description"),", which will either be a ",(0,i.mdx)("inlineCode",{parentName:"p"},"string")," or an ",(0,i.mdx)("inlineCode",{parentName:"p"},"object"),". In the event of a ",(0,i.mdx)("inlineCode",{parentName:"p"},"FAILED")," status reported by the OAuth provider during authorization, the value of this property is an ",(0,i.mdx)("inlineCode",{parentName:"p"},"object"),", in the form of ",(0,i.mdx)("inlineCode",{parentName:"p"},'{[failure_title]: "failure_description"}'),", and for all other statuses, the value of ",(0,i.mdx)("inlineCode",{parentName:"p"},"description")," is a ",(0,i.mdx)("inlineCode",{parentName:"p"},"string"),"."),(0,i.mdx)("h3",{id:"authorizationresult"},(0,i.mdx)("inlineCode",{parentName:"h3"},"AuthorizationResult")),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"status")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"AuthorizationStatus")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Status representing success or failure in the authorization workflow.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"description")),(0,i.mdx)("td",{parentName:"tr",align:"right"},(0,i.mdx)("inlineCode",{parentName:"td"},"string")," or ",(0,i.mdx)("inlineCode",{parentName:"td"},"object")),(0,i.mdx)("td",{parentName:"tr",align:"right"},'Description about the success or failure in the authorization workflow In the event of a "FAILED" status reported by the OAuth provider during authorization, the value of this property is an ',(0,i.mdx)("inlineCode",{parentName:"td"},"object"),", in the form of ",(0,i.mdx)("inlineCode",{parentName:"td"},'{[failure_title]: "failure_description"}'),". While for all other statuses the value of this property is a ",(0,i.mdx)("inlineCode",{parentName:"td"},"string"))))),(0,i.mdx)("h3",{id:"authorizationstatus"},(0,i.mdx)("inlineCode",{parentName:"h3"},"AuthorizationStatus")),(0,i.mdx)("p",null,'Each of the statuses returned below is the exact name as a string (ie: SUCCESS = "SUCCESS")'),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Name"),(0,i.mdx)("th",{parentName:"tr",align:null},"Type"),(0,i.mdx)("th",{parentName:"tr",align:"right"},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},"SUCCESS"),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"Successful authorization this is the expected result for the ",(0,i.mdx)("a",{parentName:"td",href:"#authorize"},"Authorize")," method)")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},"POPUP_OPENED"),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"The popup was opened (this is the expected result for the ",(0,i.mdx)("a",{parentName:"td",href:"#authorizewithownredirect"},"AuthorizeWithOwnRedirect")," method)")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},"POPUP_BLOCKED"),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"The popup was blocked. (Add ",(0,i.mdx)("inlineCode",{parentName:"td"},"allow-popups")," permission to your ",(0,i.mdx)("a",{parentName:"td",href:"../manifest/"},"manifest.json")," ",(0,i.mdx)("inlineCode",{parentName:"td"},"sandbox")," permissions)")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},"POPUP_TIMEOUT"),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"The popup timed out.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},"FAILED"),(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"string")),(0,i.mdx)("td",{parentName:"tr",align:"right"},"The authorization workflow failed")))))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-addonsdk-app-oauth-md-e3086c196229ffa5cae9.js.map