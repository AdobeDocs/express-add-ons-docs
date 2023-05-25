# Theme
Retrieve the current theme of the host application, via the [`app.ui`](#application) object.

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
     * The theme currently used by the host application.
     */
    theme: string;
}
/**
 * "themechange" event is triggered when the UI theme is changed in the application.
 */
```
### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function applyTheme(theme) {
  /* ... */
}

AddOnSdk.ready.then(async () => {
    console.log("Theme ", JSON.stringify(AddOnSdk.app.ui.theme));
    applyTheme(AddOnSdk.app.ui.theme));
});

AddOnSdk.app.on("themechange", (data) => {
  applyTheme(data.theme);
});
```

## Output
```json
Theme "light"
```

<InlineAlert slots="text" variant="success"/>

We have provided a sample that can be used as a reference for implementing the Application UI Theme APIs. Please see the **swc** sample provided in the [code samples](guides/develop/samples) within the **contributed** folder for specific details.

