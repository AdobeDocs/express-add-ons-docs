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
title: Environment Settings
description: Discover how to detect and utilize information about the user's theme, locale, and supported locales.
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---
# Environment Settings

## Detecting Theme

When you want to detect the theme of the environment where your add-on is running, or if you want to be notified if it changes, you can use the following example. This is useful for knowing what theme is currently set in Adobe Express, so you can use the same in your add-on UI, or apply a change to your UI when the user changes their Adobe Express theme. 

<InlineAlert slots="text" variant="info"/>

Currently, Adobe Express only supports a "light" theme, though this will be changing to include support for a "dark" theme in the future. See the snippet below for an example of how to use and detect the theme, as well as the [related SDK Reference section](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-ui/#theme).

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function applyTheme(theme) {
    document.querySelector("sp-theme").setAttribute("color", theme);
}
applyTheme(addOnUISdk.app.ui.theme);
addOnUISdk.app.on("themechange", (data) => { applyTheme(data.theme); });

addOnUISdk.app.on("themechange", (data) => {
    applyTheme(data.theme == "dark" ? darkTheme : lightTheme);
});
```

## Detecting Locale and Supported Locales

If you want to find out the users current locale, the list of supported locales, or detect when the locale changes (ie: to set the language in your add-on), you can do so with the [`addOnUISdk.app.ui` object](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-ui/#locale) in the add-on SDK. A simple example is shown below.

### Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setLanguage(language) { 
  /* Set the language in your UI strings based on the change detected */ 
}

addOnUISdk.ready.then(() => {
  console.log(addOnUISdk.app.ui.locales);
  setLanguage(addOnUISdk.app.ui.locale);
});

addOnUISdk.app.on("localechange", data => {
  setLanguage(data.locale);
});
```