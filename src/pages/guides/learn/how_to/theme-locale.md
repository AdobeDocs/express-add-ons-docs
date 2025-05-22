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
  - Theme
  - Locale
title: Theme & Locale
description: Theme & Locale.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Theme & Locale

## Detecting Theme

It can be useful to know what theme is currently set in Adobe Express, for instance to load a specific set of CSS in your add-on to keep its UI in sync, also in case the user changes it.

<InlineAlert slots="text" variant="info"/>

Currently, Adobe Express supports a "light" theme only, although a "dark" theme is planned for future releases.

The current theme is available in the [`addOnUISdk.app.ui.theme`](../../../references/addonsdk/app-ui.md#theme) property. Changes can be detected by listening to the `themechange` event on the [`addOnUISdk.app`](../../../references/addonsdk/addonsdk-app.md) object. The event will provide the new theme in the `data.theme` property.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  // Get the current theme
  console.log(addOnUISdk.app.ui.theme); // "light"

  // Listen to theme changes
  addOnUISdk.app.on("themechange", (data) => {
    // data theme will be either "light" or "dark"
    console.log("The theme is now", data.theme);
    // ...
    // Apply the new theme to your add-on UI
  });
});
```

## Detecting Locale, Supported Locales, and Format

It's possible to retrieve the user's current locale, the list of supported locales, and detect when the locale changes (e.g., to set the language in your add-on accordingly). You can do so with the [`addOnUISdk.app.ui` object](/references/addonsdk/app-ui.md#locale) in the add-on SDK. Similarly, you can get and detect a change in the Format used display dates, times, numbers, etc. A simple example is shown below.

### Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
  // Get the currently supported locales
  console.log(addOnUISdk.app.ui.locales); // ["bn-IN", "cy-GB", ...]

  // Get the current locale
  console.log(addOnUISdk.app.ui.locale); // "en-US"

  // Get the current format
  console.log(addOnUISdk.app.ui.format); // "en-US"

  // Listen to locale changes
  addOnUISdk.app.on("localechange", (data) => {
    console.log("The locale is now", data.locale); // "fr-FR"
    // ...
  });

  // Listen to format changes
  addOnUISdk.app.on("formatchange", (data) => {
    console.log("The format is now", data.format); // "fr-FR"
    // ...
  });
});
```
