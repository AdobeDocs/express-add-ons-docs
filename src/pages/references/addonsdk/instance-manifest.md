# AddOnSdk.instance.manifest
Provides access to the add-on manifest details contained in the `manifest.json` file.

## Type
`Record`

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

AddOnSdk.ready.then(() => {  
  console.log(JSON.stringify(AddOnSdk.instance.manifest));  
});

```

### Output
```json
{"manifest":{"testId":"08f4469f-7999-458b-9ef9-b1bd043cbdca","name":"Add On Api Sampler","version":"1.0.0","manifestVersion":2,"requirements":{"apps":[{"name":"Express","apiVersion":1}]},"entryPoints":[{"type":"panel","id":"panel1","main":"https://localhost:5241/08f4469f-7999-458b-9ef9-b1bd043cbdca/index.html"}]},


