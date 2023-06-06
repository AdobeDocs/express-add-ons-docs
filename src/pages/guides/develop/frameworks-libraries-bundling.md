# Using Web Frameworks and Libraries

## Typescript typings package
A typings package (`ccweb-add-on-sdk-types`) is automatically added via the `package.json` `devDependencies` to `typescript` and `react-typescript` templates and will provide the ability to see the suggestions for exposed properties of the `AddOnSdk` in your TypeScript files in Visual Studio Code. To use, simply import the types needed in the `.ts` file:

```ts
import {
    Application,
    AuthorizationRequest
} from "@adobe-ccwebext/ccweb-add-on-sdk-types";
```

<!-- ![Intellisense](./img/intellisense.mov) -->

## Webpack & JavaScript bundlers

When using Node libraries or other frameworks, you'll often find yourself needing to use a JavaScript bundler of some sort. For the React and TypeScript template apps, the bundler being used is webpack. **Note:** the only `template` that currently is not set up to use webpack is the base `javascript` template. The `ccweb-add-on-scripts` utility which builds and hosts the add-on app, accepts an option `--use`, which is set to `webpack` for those templates. Here is what the `scripts` property in the `package.json` of the pre-configured webpack templates looks like for reference:

```json
"scripts": {
    "clean": "ccweb-add-on-scripts clean",
    "build": "ccweb-add-on-scripts build --use webpack",
    "start": "ccweb-add-on-scripts start --use webpack"
}
```


However, if you want to use any other transpiler or bundler of your choice, you may do so, provided you have the correct configurations and packages installed (similar to how these templates have `webpack.config.js` defined and its plugins and loaders installed).

For example, when you want to use `tsc` to transpile the `.ts` files, you'll need to install the typescript package and add `tsconfig.json` to your project, then configure the following to make the transpilation and hosting work:

```json
"scripts": {
    "build": "ccweb-add-on-scripts build --use tsc",
    "start": "ccweb-add-on-scripts start --use tsc"
}
```

<InlineAlert slots="text" variant="info"/>

Note that the `src` (source) directory should contain all of your files, i.e. the code files _and_ the static assets, since it's this directory that is being watched for changes to trigger the add-on to be reloaded.

TIP:
Configurations are included in the `webpack.config.js` generated with your add-on project for both development and production bundling (assuming your project was based on any template other than the basic javascript one).

## React

We have included React templates and sample add-ons in the [code samples](guides/develop/samples).

## Other JavaScript and CSS libraries

You should be able to include JavaScript and CSS libraries like Bootstrap or JQuery in your code without any issue.
