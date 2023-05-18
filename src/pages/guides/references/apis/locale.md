# Language & Locale
Retrieve the supported languages (via the `locales` variable) and current `locale` of the host application.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
interface Application {
  /**
   * Represents the UI of the host application.
   */
  readonly ui: UI;
}

interface UI {
  /**
   * Current locale of the application.
   */
  locale: string;

  /**
   * Supported Languages of the application
   */
  locales: string[];
}

/**
 * "localechange" event is triggered when the locale is changed in the application.
 */
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function setLanguage(language) { /* ... */ }

AddOnSdk.ready.then(() => {
  console.log(AddOnSdk.app.ui.locales);
  setLanguage(AddOnSdk.app.ui.locale);
});

AddOnSdk.app.on("localechange", data => {
  setLanguage(data.locale));
});
```

### Output
```json
ui: 
  locale: "en-US"
  locales: (17) ['cy-GB', 'da-DK', 'de-DE', 'en-US', 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 'ja-JP', 'ko-KR', 'nb-NO', 'nl-NL', 'pt-BR', 'sv-SE', 'zh-Hans-CN', 'zh-Hant-TW', 'zz-ZZ']
  theme: "light"
```
