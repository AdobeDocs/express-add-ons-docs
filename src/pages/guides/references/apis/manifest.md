# Manifest
Retrieve the [manifest data](../references/manifest.md) belonging to the add-on.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript" />

### Interface

```js
interface AddOn {
  /**
   * Add-ons Manifest details - this maps to entries in the add-ons manifest.json file.
   */
  readonly manifest: Record<string, unknown>;
}
```

### Example

```js
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

async function logManifestData() {
  await AddOnSdk.ready;
  const manifest = AddOnSdk.instance.manifest;
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
}
```

### Output
```json
Name: Add On Api Sampler
Test ID 08f4469f-7999-458b-9ef9-b1bd043cbdca
Version 1.0.0
Manifest Version 2
Requirements -> Apps {"name":"Express","apiVersion":1}
Entry Point Type panel
Entry Point ID panel1
Entry Point main https://localhost:5241/08f4469f-7999-458b-9ef9-b1bd043cbdca/index.html

```