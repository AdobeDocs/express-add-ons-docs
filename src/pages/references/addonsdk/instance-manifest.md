# AddOnSdk.instance.manifest
The `manifest` object provides access to the add-on` manifest.json` file entries. See the [Manifest Schema Reference](../manifest/) for an extensive description of the full set of keys and value pairs available.

## Type
`Record` 

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript" />

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

AddOnSdk.ready.then(() => {  
  console.log(JSON.stringify(AddOnSdk.instance.manifest));  

  console.log("Name: " + manifest["name"]);
  console.log("Test ID " + manifest["testId"]);                
  console.log("Version " + manifest["version"]);
  console.log("Manifest Version " + manifest["manifestVersion"]);
  for (const app of manifest["requirements"]["apps"]) {
      console.log("Requirements -> Apps " + JSON.stringify(app));
  }
  for (const entryPoint of manifest["entryPoints"]) {
      console.log("Entry Point Type " + entryPoint["type"]);
      console.log("Entry Point ID " + entryPoint["id"]);
      console.log("Entry Point main " + entryPoint["main"]);    
}
});
```

### Output
```
{"testId":"08f4469f-7999-458b-9ef9-b1bd043cbdca","name":"Add On Api Sampler","version":"1.0.0","manifestVersion":2,"requirements":{"apps":[{"name":"Express","apiVersion":1}]},"entryPoints":[{"type":"panel","id":"panel1","main":"https://localhost:5241/08f4469f-7999-458b-9ef9-b1bd043cbdca/index.html"}]}

Name: Add On Api Sampler
Test ID 08f4469f-7999-458b-9ef9-b1bd043cbdca
Version 1.0.0
Manifest Version 2
Requirements -> Apps {"name":"Express","apiVersion":1}
Entry Point Type panel
Entry Point ID panel1
Entry Point main https://localhost:5241/08f4469f-7999-458b-9ef9-b1bd043cbdca/index.html
```
