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
