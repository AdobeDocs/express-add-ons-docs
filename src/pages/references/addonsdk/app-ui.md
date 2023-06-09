# AddOnSdk.app.ui
Provides you with UI related values from the Adobe Express host application where the add-on is running, so you can do things such as detect the [current locale](../../guides/develop/#detecting-locale) or [theme](../../guides/develop/#detecting-theme) in use to update your add-on user interface accordingly.

## Properties

### theme
Access the theme currently set in Adobe Express. This value is accessed via the `AddOnSdk.app.ui` object, so you should ensure you only access this object after the AddOnSdk is initialized (via the `ready`). 

#### Values
A `string` containing the current theme value. Currently **"light"** is the only theme supported.

#### Example Usage
```js
AddOnSdk.ready.then(async () => {    
    console.log(AddOnSdk.app.ui.theme); // output is "light"
});
```


### locale
Access the locale currently set in Adobe Express. This value is accessed via the `AddOnSdk.app.ui` object, so you should ensure you only access this object after the AddOnSdk is initialized (via the `AddOnSdk.ready`). 

#### Values
A `string` containing the current locale value. Current locale could be one of:
```json
['cy-GB', 'da-DK', 'de-DE', 'en-US', 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 
'ja-JP', 'ko-KR', 'nb-NO', 'nl-NL', 'pt-BR', 'sv-SE', 'zh-Hans-CN', 'zh-Hant-TW','zz-ZZ']
```

#### Example Usage
```js
AddOnSdk.ready.then(async () => {    
    console.log(AddOnSdk.app.ui.locales); // output "es-ES" 
});
```

### locales
<!-- **`locales: string[]`**<br/> -->
Access all locales currently supported in Adobe Express. This value is accessed via the `AddOnSdk.app.ui` object, so you should ensure you only access this object after the AddOnSdk is initialized (via the `AddOnSdk.ready`). 

#### Values
A `string` array containing the supported locales:

```json
locales: 
    ['cy-GB', 'da-DK', 'de-DE', 'en-US', 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 'ja-JP', 'ko-KR', 'nb-NO', 'nl-NL', 'pt-BR', 'sv-SE', 'zh-Hans-CN', 'zh-Hant-TW', 'zz-ZZ']
```

#### Example Usage
```js
AddOnSdk.ready.then(async () => {    
    console.log(JSON.stringify(AddOnSdk.app.ui.locales)) 
    // output is ["cy-GB","da-DK","de-DE","en-US","es-ES","fi-FI","fr-FR","it-IT","ja-JP","ko-KR","nb-NO","nl-NL","pt-BR","sv-SE","zh-Hans-CN","zh-Hant-TW","zz-ZZ"]
});
```

## Events

### themechange
**`themechange: string`**<br/>
The "themechange" event is fired when the user changes the UI theme in Adobe Express. It's used with the [`AddOnSdk.app.on`](../addonsdk/addonsdk-app.md) function. 

#### Parameters
N/A

#### Return Value 
N/A

#### Example Usage
```js
AddOnSdk.app.on("themechange", (data) => {
  applyTheme(data.theme); 
});
```

### localechange
**`localechange: string`**<br/>
The "localechange" event is fired when the user changes the UI theme in Adobe Express. It's used with the [`AddOnSdk.app.on`](../addonsdk/addonsdk-app.md) function. 

#### Parameters
N/A

#### Return Value 
N/A

#### Example Usage
```js
AddOnSdk.app.on("localechange", (data) => {
  applyTheme(data.locale); 
});
```

<InlineAlert slots="text" variant="success"/>

Please see the **swc** sample provided in the [code samples](../../samples.md) within the **contributed** folder as a reference for how to use the `theme`  in your own add-on.


<!-- 

## AddOnSdk.app.ui Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui.locale</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Retrieve the host application current locale.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui.locales</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string []</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Retrieve the host application's supported languages.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui.theme</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Retrieve the current theme of the host application.</p>
    </td>
</tr>
</tbody>
</table> -->