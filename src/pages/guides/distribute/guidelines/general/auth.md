# Authenticating Users

Users must be able to log in and out of the add-on seamlessly. Ensure that all of these functions work effectively before submitting for review.

## Sign-up functionality

Users must be given a seamless sign-up option, particularly when logging in is mandatory. They must be able to complete this process in a new window if they wish.

## Logout functionality

Users must be able to logout easily, using a button or link that is simple to locate.

## Popups and blockers

Sometimes users may think that the add-on is not responding properly when they try to sign in, but the sign-in popup is actually being blocked by the browser’s popup blocker.

This is why add-ons that use OAuth flows must always indicate to users when a popup window has been blocked. This can be done by displaying a message in the add-on UI or on the webpage.

**NOTE:** The API returns `POPUP_BLOCKED` when a popup window is blocked during the OAuth flow. This will help you detect when a popup has been blocked.

## Test credentials

If a login or license key is required to access any paid features, you must provide test credentials to reviewers so that they can view all aspects of the add-on.
