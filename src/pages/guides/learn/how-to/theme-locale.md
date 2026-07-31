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
  - Dark theme
  - Locale
title: Theme & Locale
description: Detect and respond to the Adobe Express theme (including dark theme), locale, and format from your add-on.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I get the current theme?"
      answer: "Access `addOnUISdk.app.ui.theme` property to get the current theme."

    - question: "What themes are currently supported?"
      answer: "Adobe Express supports both 'light' and 'dark' themes; the `theme` property and `themechange` event report whichever is active."

    - question: "How do I listen for theme changes?"
      answer: 'Use `addOnUISdk.app.on("themechange", callback)` to detect theme changes.'

    - question: "Do I need to support dark theme in my add-on?"
      answer: "It's encouraged but not mandatory. Add-ons submitted to the marketplace after August 31, 2026 are rejected if their UI is functionally broken (illegible or unusable) in dark theme."

    - question: "How do I make my add-on dark-theme ready?"
      answer: "Detect the active theme via `addOnUISdk.app.ui.theme` and the `themechange` event and adapt your styles. Building with Spectrum Web Components handles dark theme automatically."

    - question: "How do I get the current locale?"
      answer: "Access `addOnUISdk.app.ui.locale` property to get the current locale."

    - question: "How do I get supported locales?"
      answer: "Access `addOnUISdk.app.ui.locales` array to get all supported locales."

    - question: "How do I listen for locale changes?"
      answer: 'Use `addOnUISdk.app.on("localechange", callback)` to detect locale changes.'

    - question: "What's the difference between locale and format?"
      answer: "Locale is the user's language/region, format is for displaying dates, times, and numbers."

    - question: "How do I listen for format changes?"
      answer: 'Use `addOnUISdk.app.on("formatchange", callback)` to detect format changes.'
---

# Theme & Locale

## Detecting Theme

It can be useful to know what theme is currently set in Adobe Express, for instance to load a specific set of CSS in your add-on to keep its UI in sync, also in case the user changes it.

<InlineAlert slots="text" variant="info"/>

Adobe Express supports both `"light"` and `"dark"` themes. The `theme` property and `themechange` event report whichever is active, so keep your add-on's UI in sync with it. See [Supporting all Themes](#supporting-all-themes) below for readiness guidance.

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

## Supporting all Themes

Adobe Express supports both a dark and a light theme. Make your add-on adapt to it so its UI stays legible and visually consistent with the app. Detect the active theme with the [`theme`](../../../references/addonsdk/app-ui.md#theme) property and the [`themechange`](../../../references/addonsdk/app-ui.md#themechange) event (see [Detecting Theme](#detecting-theme) above), and drive your styling from the reported value instead of hard-coding colors.

<InlineAlert slots="text" variant="warning"/>

Dark theme support is encouraged but not mandatory. Polished dark-theme styling isn't required, but your add-on's UI must remain fully functional and legible in both themes—text readable, controls visible and usable. Add-ons submitted to the marketplace after **August 31, 2026** are rejected if their interface is functionally broken in dark theme. Add-ons already published before the dark theme launch (July 31, 2026) are unaffected and continue to display in light theme.

### Use Spectrum Web Components

Build your UI with [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/) (SWC), which carry Adobe's design system and adapt to dark theme automatically—removing most of the manual styling otherwise needed to support both themes. See the [Theming design guidelines](../../build/design/ux-guidelines/theming.md) for contrast and UX considerations.

### Test in dark theme

Add-ons in development receive both `"light"` and `"dark"` values, so switch Adobe Express to dark theme and verify your UI before submitting. Use the [swc](../samples.md#swc) sample as a reference for a theme-aware add-on.

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

## FAQs

#### Q: How do I get the current theme?

**A:** Access `addOnUISdk.app.ui.theme` property to get the current theme.

#### Q: What themes are currently supported?

**A:** Adobe Express supports both 'light' and 'dark' themes; the `theme` property and `themechange` event report whichever is active.

#### Q: How do I listen for theme changes?

**A:** Use `addOnUISdk.app.on("themechange", callback)` to detect theme changes.

#### Q: Do I need to support dark theme in my add-on?

**A:** It's encouraged but not mandatory. Add-ons submitted to the marketplace after August 31, 2026 are rejected if their UI is functionally broken (illegible or unusable) in dark theme.

#### Q: How do I make my add-on dark-theme ready?

**A:** Detect the active theme via `addOnUISdk.app.ui.theme` and the `themechange` event and adapt your styles. Building with Spectrum Web Components handles dark theme automatically.

#### Q: How do I get the current locale?

**A:** Access `addOnUISdk.app.ui.locale` property to get the current locale.

#### Q: How do I get supported locales?

**A:** Access `addOnUISdk.app.ui.locales` array to get all supported locales.

#### Q: How do I listen for locale changes?

**A:** Use `addOnUISdk.app.on("localechange", callback)` to detect locale changes.

#### Q: What's the difference between locale and format?

**A:** Locale is the user's language/region, format is for displaying dates, times, and numbers.

#### Q: How do I listen for format changes?

**A:** Use `addOnUISdk.app.on("formatchange", callback)` to detect format changes.
