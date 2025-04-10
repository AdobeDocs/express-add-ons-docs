# Using Web Frameworks and Libraries

## Typescript definitions

The Add-on SDK's are a set of interfaces written in TypeScript, and a TypeScript definitions package named `ccweb-add-on-sdk-types` is automatically included in the `package.json` for the `typescript` and `react-typescript` templates. As a result, a `add-on-ui-sdk.d.ts` file is generated in the `src` folder that exports the `AddOnUISdk` types, allowing you to take advantage of auto-completion and type checking capabilities. To use the type definitions, simply import them as needed in your `.ts` file, such as:

```ts
import {
    Application,
    AuthorizationRequest
} from "@adobe-ccwebext/ccweb-add-on-sdk-types";
```

An example of how this works in Visual Studio Code is shown in this short clip below.<br/>

<div style="display: flex; justify-content: center;">
<iframe src="https://drive.google.com/file/d/1FzUaPZMjPD9k0ANQNibqRMiZRrSAIChg/preview" width="800" height="450" allow="autoplay"></iframe>
</div>

## Webpack & JavaScript bundler

When using Node libraries or other frameworks, you'll often need to use a JavaScript bundler. All of the templates the CLI provides (other than the basic `javascript` template) are pre-configured for webpack via the `--use` option set on the `ccweb-add-on-scripts` commands. If you create a new add-on project based on a react or typescript based template for instance, you will see the following `scripts` block generated in your `package.json`, and the existence of a `webpack.config.js` in the root of your project:

```json
"scripts": {
    "clean": "ccweb-add-on-scripts clean",
    "build": "ccweb-add-on-scripts build --use webpack",
    "start": "ccweb-add-on-scripts start --use webpack",
    "package": "ccweb-add-on-scripts package --use webpack"
},
```

However, if you want to use any other transpiler or bundler of your choice, you can do so, provided you have the correct configurations and packages installed (similar to how these templates have `webpack.config.js` defined, and its plugins and loaders installed). For example, if you want to use `tsc` to transpile the `.ts` files, you'll need to install the typescript package and add `tsconfig.json` to your project, then configure the script commands to make the transpilation and hosting work:

```json
"scripts": {
    "build": "ccweb-add-on-scripts build --use tsc",
    "start": "ccweb-add-on-scripts start --use tsc",
    "package": "ccweb-add-on-scripts package --use tsc"
}
```

<InlineAlert slots="text" variant="info"/>

The `src` folder in your project should contain all of your code and static asset files to ensure any changes you make are automatically detected by the hot module reloader, allowing you to see your updates immediately.

#### Update `webpack.config.js` with any new files to be copied

Configurations are included in the `webpack.config.js` generated with your add-on project for both development and production bundling (assuming your project was based on any template other than the basic javascript one). You should be aware that you will need to update the [`CopyWebpackPlugin`](https://www.npmjs.com/package/copy-webpack-plugin) block in your `webpack.config.js` to ensure any new files are copied into the `dist` folder at build time. For instance, if you add new image assets into your `src` folder that your add-on is using, you would need to ensure you include the file extension in the patterns of files getting copied, or you will get a 404 indicating the images are not found. If the images were type `.png` for instance, then you could include the additional `src/*.png` line like below to ensure they are copied:

```json
new CopyWebpackPlugin({
    patterns: [
        { from: "src/*.json", to: "[name][ext]" },
        { from: "src/*.png", to: "[name][ext]" }
    ]
})
```

## React

The CLI supports two different [react-based templates](../getting_started/dev_tooling.md#templates), and the [code samples](../../samples.md) repository contains various add-ons built with React for you to use as a reference.

## Lit Framework

The CLI provides [starter template options](../getting_started/dev_tooling.md#templates) which provide a basic setup to allow you to use the Lit framework, a lightweight library for building fast, lightweight web components. There are currently template options available for either using basic JavaScript (`swc-javascript`) with Lit or TypeScript (`swc-typescript`), preconfigured to help you get started.

To learn more about developing with [Lit](https://lit.dev/), be sure to check out the [Using Lit & TypeScript Guide](./using-lit-typescript.md).

## Other JavaScript and CSS libraries

You should be able to use any other JavaScript or CSS libraries you might want to include in your add-ons (ie: jQuery, Bootstrap) without any issues. Just make sure you include the necessary scripts and stylesheets in your project, and ensure they are bundled correctly by your chosen bundler.
