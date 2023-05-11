# Using Web Frameworks and Libraries

### Webpack & JavaScript bundlers

When using Node libraries or other frameworks, you'll often find yourself needing to use a JavaScript bundler of some sort. For the React and TypeScript template apps, the bundler being used is webpack. **Note:** the only `template` that currently is not set up to use webpack is the base `javascript` template. The `ccweb-add-on-scripts` utility which builds and hosts the add-on app, accepts an option `--use`, which is set to `webpack` for those templates. Here is what the `scripts` property in the `package.json` of the pre-configured webpack templates looks like for reference:


    "scripts": {
        "clean": "ccweb-add-on-scripts clean",
        "build": "ccweb-add-on-scripts build --use webpack",
        "start": "ccweb-add-on-scripts start --use webpack"
    }


However, if you want to use any other transpiler or bundler of your choice, you may do so, provided you have the correct configurations and packages installed (similar to how these templates have `webpack.config.js` defined and its plugins and loaders installed).

For example, when you want to use `tsc` to transpile the `.ts` files, you'll need to install the typescript package and add `tsconfig.json` to your project, then configure the following to make the transpilation and hosting work:


    "scripts": {
        "build": "ccweb-add-on-scripts build --use tsc",
        "start": "ccweb-add-on-scripts start --use tsc"
    }


IMPORTANT:
Note that the source directory, `src`, should contain all of your files, i.e. the code files _and_ the static assets since it is this directory that is being watched for changes to trigger the add-on to be reloaded.

### React

We have included React templates and sample add-ons in the [Templates and Code Samples](../5-TemplatesSamples/code-samples.md) section.

### Other JavaScript and CSS libraries

You should be able to include JavaScript and CSS libraries like Bootstrap or JQuery in your code without any issue.
