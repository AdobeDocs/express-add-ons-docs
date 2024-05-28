# addOnUISdk.app.ui

Provides you with UI related values from the Adobe Express host application where the add-on is running, so you can do things such as detect the [current locale](../../guides/develop/use_cases/environment_settings.md#detecting-locale-and-supported-locales) or [theme](../../guides/develop/use_cases/environment_settings.md#detecting-theme) in use to update your add-on user interface accordingly.

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
['cy-GB', 'da-DK', 'de-DE', 'en-US', 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 
'ja-JP', 'ko-KR', 'nb-NO', 'nl-NL', 'pt-BR', 'sv-SE', 'zh-Hans-CN', 'zh-Hant-TW','zz-ZZ']
```

#### Example Usage

```js
addOnUISdk.ready.then(async () => {    
    console.log(addOnUISdk.app.ui.locale); // output "es-ES" 
});
```

### locales

<!-- **`locales: string[]`**<br/> -->
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
    console.log(JSON.stringify(addOnUISdk.app.ui.locales)) 
    // output is ["cy-GB","da-DK","de-DE","en-US","es-ES","fi-FI","fr-FR","it-IT","ja-JP","ko-KR","nb-NO","nl-NL","pt-BR","sv-SE","zh-Hans-CN","zh-Hant-TW","zz-ZZ"]
});
```

## Methods

### openEditorPanel

Programmatically open the Editor panel in Adobe Express. When sub-tabs are available, this method can target them, as well as pre-populate the Search field.

#### Signature

`openEditorPanel(panel: EditorPanel, action?: PanelAction): void;`

#### Parameters

| Name               | Type     |                                                  Description |
| ------------------ | -------- | -----------------------------------------------------------: |
| `panel`            | `string` |     [`EditorPanel`](./addonsdk-constants.md) constant value. |
| `action?`          | `Object` |                        [`PanelAction`](#panelaction) object. |

#### `PanelAction`

| Name       | Type       |                                                        Description |
| ---------- | ---------- | -----------------------------------------------------------------: |
| `type`     | `string`   |      [`PanelActionType`](./addonsdk-constants.md) constant value.  |

#### `SearchAction`

Extends the [`PanelAction`](#panelaction) object and adds the following options for the Search action:

| Name       | Type       |                                                                   Description |
| ------------------ | ---------- | --------------------------------------------------------------------: |
| `type`             | `string`   |  [`PanelActionType.search`](./addonsdk-constants.md) constant value.  |
| `searchString`     | `string`   |                             Query used to perform the Search action.  |

#### `NavigateAction`

Extends the [`PanelAction`](#panelaction) object and adds the following options for the Navigation action:

| Name       | Type       |                                                                     Description |
| ------------------ | ---------- | ----------------------------------------------------------------------: |
| `type`             | `string`   |  [`PanelActionType.navigate`](./addonsdk-constants.md) constant value.  |
| `tab?`             | `string`   |  [`ElementsTabs`](./addonsdk-constants.md) or [`MediaTabs`](./addonsdk-constants.md) constant values  |
| `collectionId?`    | `string`   |  collectionId of the asset collection to navigate to                    |

#### Actions Notes

Actions are currently not supported on every Editor panel. Please find the supported actions for each panel below:

| Action                 | Supported panels                                     |
| ---------------------- | ---------------------------------------------------: |
| Search                 | Templates, Media, Elements, Text, Your stuff, Search |
| Navigate to Collection | Templates, Media, Elements, Text                     |
| Navigate to Tab        | Media, Elements                                      |

Both Collection and Tab navigation can be executed in combination.

#### Example usage

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
const { constants } = addOnUISdk;
const { PanelActionType, EditorPanel } = constants;
 
addOnUISdk.ready.then(() => {
  const action = { type: PanelActionType.search, searchString: "test" };
    addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action); 
});
 
// Navigate to collection
addOnUISdk.ready.then(() => {
  const action = { 
    type: PanelActionType.navigate, 
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action); 
});
 
// Navigate to tab
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate, 
    tab: "photos"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action); 
});
 
// Navigate to tab + collection
addOnUISdk.ready.then(() => {
  const action: NavigateAction = { 
    type: PanelActionType.navigate, 
    tab: "photos", 
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action); 
});
```

#### TypeScript

```ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
const { constants } = addOnUISdk;
const { PanelActionType, EditorPanel } = constants;

addOnUISdk.ready.then(() => {
  const action: SearchAction = {
    type: PanelActionType.search, 
    searchString: "test"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action); 
});

// Navigate to collection
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate, 
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.templates, action); 
});
 
//Navigate to tab 
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate, 
    tab: "photos"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action); 
});
 
// Navigate to tab + collection
addOnUISdk.ready.then(() => {
  const action: NavigateAction = {
    type: PanelActionType.navigate, 
    tab: "photos", 
    collectionId: "urn:aaid:sc:VA6C2:cd6aa706-12f2-525b-9500-3d23bc663882"
  };
  addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, action); 
});
```

## Events

### themechange

**`themechange: string`**<br/>
The "themechange" event is fired when the user changes the UI theme in Adobe Express. It's used with the [`addOnUISdk.app.on`](../addonsdk/addonsdk-app.md) function.

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

### localechange

**`localechange: string`**<br/>
The "localechange" event is fired when the user changes the UI theme in Adobe Express. It's used with the [`addOnUISdk.app.on`](../addonsdk/addonsdk-app.md) function.

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

<InlineAlert slots="text" variant="success"/>

Please see the **swc** sample provided in the [code samples](../../samples.md) within the **contributed** folder as a reference for how to use the `theme` in your own add-on.
