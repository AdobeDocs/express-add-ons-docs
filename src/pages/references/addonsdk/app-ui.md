# addOnUISdk.app.ui

Provides you with UI related values from the Adobe Express host application where the add-on is running, so you can do things such as detect the [current locale](../../guides/learn/how-to/theme-locale.md#detecting-locale-supported-locales-and-format) or [theme](../../guides/learn/how-to/theme-locale.md#detecting-theme) in use to update your add-on user interface accordingly.

## Properties

### theme

Access the theme currently set in Adobe Express. This value is accessed via the `AddOnSdk.app.ui` object, so you should ensure you only access this object after the AddOnSdk is initialized (via the `ready`).

#### Values

A `string` containing the current theme value. Currently **"light"** is the only theme supported.

#### Example Usage

```js
addOnUISdk.ready.then(async () => {
  console.log(addOnUISdk.app.ui.theme); // output is "light"
});
```

### locale

Access the locale currently set in Adobe Express. This value is accessed via the `addOnUISdk.app.ui` object, so you should ensure you only access this object after the `addOnUISdk` is initialized (via the `addOnUISdk.ready`).

#### Values

A `string` containing the current locale value. Current locale could be one of:

```json
[
  "cy-GB",
  "da-DK",
  "de-DE",
  "en-US",
  "es-ES",
  "fi-FI",
  "fr-FR",
  "it-IT",
  "ja-JP",
  "ko-KR",
  "nb-NO",
  "nl-NL",
  "pt-BR",
  "sv-SE",
  "zh-Hans-CN",
  "zh-Hant-TW",
  "zz-ZZ"
]
```

#### Example Usage

```js
addOnUISdk.ready.then(async () => {
  console.log(addOnUISdk.app.ui.locale); // output "es-ES"
});
```

### locales

Access all locales currently supported in Adobe Express. This value is accessed via the `addOnUISdk.app.ui` object, so you should ensure you only access this object after the AddOnSdk is initialized (via the `addOnUISdk.ready`).

#### Values

A `string` array containing the supported locales:

```json
locales:
    ['cy-GB', 'da-DK', 'de-DE', 'en-US', 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 'ja-JP', 'ko-KR', 'nb-NO', 'nl-NL', 'pt-BR', 'sv-SE', 'zh-Hans-CN', 'zh-Hant-TW', 'zz-ZZ']
```

#### Example Usage

```js
addOnUISdk.ready.then(async () => {
  console.log(JSON.stringify(addOnUISdk.app.ui.locales));
  // output is ["cy-GB","da-DK","de-DE","en-US","es-ES","fi-FI","fr-FR","it-IT","ja-JP","ko-KR","nb-NO","nl-NL","pt-BR","sv-SE","zh-Hans-CN","zh-Hant-TW","zz-ZZ"]
});
```

### format

Access the regional format currently set in Adobe Express to display dates, times, numbers, etc. This value is accessed via the `addOnUISdk.app.ui` object, so you should only access this object after the `addOnUISdk` is initialized (via the `addOnUISdk.ready`).

#### Values

A `string` containing the current format value. Current regional format could be one of:

```json
[
  "ms-MY",
  "cs-CZ",
  "cy-GB",
  "da-DK",
  "de-DE",
  "de-LU",
  "de-AT",
  "de-CH",
  "et-EE",
  "en-AU",
  "en-CA",
  "en-GB",
  "en-HK",
  "en-IN",
  "en-IE",
  "en-IL",
  "en-NZ",
  "en-SG",
  "en-ZA",
  "en-US",
  "es-AR",
  "es-CL",
  "es-CO",
  "es-CR",
  "es-EC",
  "es-ES",
  "es-GT",
  "es-419",
  "es-MX",
  "es-PE",
  "es-PR",
  "fr-BE",
  "fr-CA",
  "fr-FR",
  "fr-LU",
  "fr-CH",
  "hr-HR",
  "id-ID",
  "it-IT",
  "it-CH",
  "lv-LV",
  "lt-LT",
  "hu-HU",
  "nl-BE",
  "nl-NL",
  "nb-NO",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "sk-SK",
  "sl-SI",
  "sr-Latn-RS",
  "fi-FI",
  "sv-SE",
  "vi-VN",
  "tr-TR",
  "el-GR",
  "bg-BG",
  "ru-RU",
  "uk-UA",
  "he-IL",
  "ar-AE",
  "ar-KW",
  "ar-SA",
  "ar-QA",
  "ar-EG",
  "ne-NP",
  "mr-IN",
  "hi-IN",
  "bn-IN",
  "ta-IN",
  "te-IN",
  "th-TH",
  "ko-KR",
  "zh-Hant-HK",
  "ja-JP",
  "zh-Hans-CN",
  "zh-Hant-TW"
]
```

#### Example Usage

```js
addOnUISdk.ready.then(async () => {
  console.log(addOnUISdk.app.ui.format); // output "en-GB"
});
```

## Methods

### openEditorPanel

Programmatically open the Editor panel in Adobe Express. When sub-tabs are available, this method can target them, as well as pre-populate the Search field.

#### Signature

`openEditorPanel(panel: EditorPanel, action?: PanelAction): void;`

#### Parameters

| Name      | Type     |                                              Description |
| --------- | -------- | -------------------------------------------------------: |
| `panel`   | `string` | [`EditorPanel`](addonsdk-constants.md) constant value. |
| `action?` | `Object` |                    [`PanelAction`](#panelaction) object. |

#### `PanelAction`

| Name   | Type     |                                                  Description |
| ------ | -------- | -----------------------------------------------------------: |
| `type` | `string` | [`PanelActionType`](addonsdk-constants.md) constant value. |

#### `SearchAction`

Extends the [`PanelAction`](#panelaction) object and adds the following options for the Search action:

| Name           | Type     |                                                         Description |
| -------------- | -------- | ------------------------------------------------------------------: |
| `type`         | `string` | [`PanelActionType.search`](addonsdk-constants.md) constant value. |
| `searchString` | `string` |                            Query used to perform the Search action. |

#### `NavigateAction`

Extends the [`PanelAction`](#panelaction) object and adds the following options for the Navigation action:

| Name            | Type     |                                                                                         Description |
| --------------- | -------- | --------------------------------------------------------------------------------------------------: |
| `type`          | `string` |                               [`PanelActionType.navigate`](addonsdk-constants.md) constant value. |
| `tab?`          | `string` | [`ElementsTabs`](addonsdk-constants.md) or [`MediaTabs`](addonsdk-constants.md) constant values |
| `collectionId?` | `string` |                                                 collectionId of the asset collection to navigate to |

#### Actions Notes

Actions are currently not supported on every Editor panel. Please find the supported actions for each panel below:

| Action                 |                                     Supported panels |
| ---------------------- | ---------------------------------------------------: |
| Search                 | Templates, Media, Elements, Text, Your stuff, Search |
| Navigate to Collection |                     Templates, Media, Elements, Text |
| Navigate to Tab        |                                      Media, Elements |

Both Collection and Tab navigation can be executed in combination.

#### Example Usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
const { constants } = addOnUISdk;
const { PanelActionType, EditorPanel } = constants;

addOnUISdk.ready.then(() => {
  const action = {
    type: PanelActionType.search,
    searchString: "test",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action);
});

// Navigate to collection
addOnUISdk.ready.then(() => {
  const action = {
    type: PanelActionType.navigate,
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action);
});

// Navigate to tab
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate,
    tab: "photos",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action);
});

// Navigate to tab + collection
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate,
    tab: "photos",
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action);
});
```

#### TypeScript

```ts
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
const { constants } = addOnUISdk;
const { PanelActionType, EditorPanel } = constants;

addOnUISdk.ready.then(() => {
  const action: SearchAction = {
    type: PanelActionType.search,
    searchString: "test",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action);
});

// Navigate to collection
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate,
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action);
});

// Navigate to tab
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate,
    tab: "photos",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action);
});

// Navigate to tab + collection
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate,
    tab: "photos",
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882",
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action);
});
```

## Events

### themechange

**`themechange: string`**&lt;br /&gt;
The "themechange" event is fired when the user changes the UI theme in Adobe Express. It's used with the [`addOnUISdk.app.on`](addonsdk-app.md) function.

#### Parameters

N/A

#### Return Value

N/A

#### Example Usage

```js
addOnUISdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```

<InlineAlert slots="text" variant="success"/>

Please see the **swc** sample provided in the [code samples](../../guides/learn/samples.md) within the **contributed** folder as a reference for how to use the `theme` in your own add-on.

### localechange

**`localechange: string`**<&lt;br /&gt;
The "localechange" event is fired when the user changes the UI locale in Adobe Express. It's used with the [`addOnUISdk.app.on`](addonsdk-app.md) function.

#### Parameters

N/A

#### Return Value

N/A

#### Example Usage

```js
addOnUISdk.app.on("localechange", (data) => {
  applyTheme(data.locale);
});
```

### formatchange

**`formatchange: string`**&lt;br /&gt;
The "formatchange" event is fired when the user changes the UI format in Adobe Express. It's used with the [`addOnUISdk.app.on`](addonsdk-app.md) function.

#### Parameters

N/A

#### Return Value

N/A

#### Example Usage

```js
addOnUISdk.app.on("formatchange", (data) => {
  console.log(data.format);
});
```
