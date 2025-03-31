# How to Build an Express Add-on with Spectrum Web Components

This guide will walk you through the process of building an Express add-on using Spectrum Web Components (SWC). We'll cover everything from initial setup to final packaging.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Adobe Creative Cloud account with access to Express

## Step 1: Create a New Add-on Project

1. Open your terminal and run the following command to create a new Express add-on:
   ```bash
   npx @adobe/create-ccweb-add-on
   ```

2. Follow the prompts to set up your project:
   - Enter a project name
   - Choose JavaScript as the language
   - Select your preferred package manager (npm or yarn)

## Step 2: Configure Webpack

1. Create a `webpack.config.js` file in your project root with the following configuration:
   ```javascript
   const path = require("path");
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   const CopyWebpackPlugin = require("copy-webpack-plugin");

   module.exports = {
       mode: process.env.NODE_ENV || "development",
       entry: "./src/index.js",
       devtool: "source-map",
       experiments: {
           topLevelAwait: true,
           outputModule: true,
       },
       output: {
           path: path.resolve(__dirname, "dist"),
           module: true,
           filename: "index.js",
       },
       externalsType: "module",
       externalsPresets: { web: true },
       plugins: [
           new HtmlWebpackPlugin({
               template: "src/index.html",
               scriptLoading: "module",
           }),
           new CopyWebpackPlugin({
               patterns: [
                   { from: "src/*.json", to: "[name][ext]" },
               ],
           }),
       ],
       module: {
           rules: [
               {
                   test: /\.(js)$/,
                   exclude: /node_modules/,
                   use: ["babel-loader"],
               },
               {
                   test: /(\.css)$/,
                   use: ["style-loader", "css-loader"],
               },
           ],
       },
       resolve: {
           extensions: [".js", ".css"],
       },
   };
   ```

## Step 3: Update package.json

1. Update your `package.json` scripts to use webpack:
   ```json
   "scripts": {
       "clean": "ccweb-add-on-scripts clean",
       "build": "ccweb-add-on-scripts build --use webpack",
       "start": "ccweb-add-on-scripts start --use webpack",
       "package": "ccweb-add-on-scripts package --use webpack"
   }
   ```

2. Add the required Spectrum Web Components dependencies:
   ```json
   "dependencies": {
       "@spectrum-web-components/theme": "1.1.2",
       "@spectrum-web-components/button": "1.1.2",
       "@spectrum-web-components/button-group": "1.1.2",
       "@spectrum-web-components/textfield": "1.1.2",
       "@spectrum-web-components/field-label": "1.1.2",
       "@spectrum-web-components/menu": "1.1.2",
       "@spectrum-web-components/picker": "1.1.2",
       "@spectrum-web-components/switch": "1.1.2"
   }
   ```

3. Add the required development dependencies:
   ```json
   "devDependencies": {
       "@adobe/ccweb-add-on-scripts": "^3.0.0",
       "@types/adobe__ccweb-add-on-sdk": "^1.3.0",
       "@babel/core": "7.23.3",
       "@babel/preset-env": "7.23.3",
       "@babel/preset-react": "7.23.3",
       "babel-loader": "9.1.3",
       "copy-webpack-plugin": "11.0.0",
       "css-loader": "6.8.1",
       "html-webpack-plugin": "5.5.3",
       "style-loader": "3.3.3",
       "webpack": "5.89.0",
       "webpack-cli": "5.1.4"
   }
   ```

## Step 4: Set Up the UI Components

1. Update your `src/index.js` file to import the required Spectrum Web Components:
   ```javascript
   import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

   // Import Spectrum Web Components
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/theme/express/theme-light.js';
   import '@spectrum-web-components/theme/express/scale-medium.js';
   import '@spectrum-web-components/button/sp-button.js';
   import '@spectrum-web-components/button-group/sp-button-group.js';
   import '@spectrum-web-components/textfield/sp-textfield.js';
   import '@spectrum-web-components/field-label/sp-field-label.js';
   import '@spectrum-web-components/menu/sp-menu.js';
   import '@spectrum-web-components/menu/sp-menu-item.js';
   import '@spectrum-web-components/picker/sp-picker.js';
   import '@spectrum-web-components/switch/sp-switch.js';
   ```

2. Create your UI components within the `addOnUISdk.ready` promise:
   ```javascript
   addOnUISdk.ready.then(() => {
       // Create the main container with theme
       const container = document.createElement('div');
       container.innerHTML = `
           <sp-theme system="express" color="light" scale="medium">
               <div class="container">
                   <sp-field-label for="textfield">Text Field</sp-field-label>
                   <sp-textfield id="textfield" placeholder="Enter text"></sp-textfield>

                   <sp-button-group>
                       <sp-button variant="primary">Primary</sp-button>
                       <sp-button variant="secondary">Secondary</sp-button>
                   </sp-button-group>

                   <sp-picker>
                       <sp-menu>
                           <sp-menu-item>Option 1</sp-menu-item>
                           <sp-menu-item>Option 2</sp-menu-item>
                           <sp-menu-item>Option 3</sp-menu-item>
                       </sp-menu>
                   </sp-picker>

                   <sp-switch>Switch</sp-switch>
               </div>
           </sp-theme>
       `;
       document.body.appendChild(container);

       // Add basic styling
       const style = document.createElement('style');
       style.textContent = `
           .container {
               padding: 20px;
               display: flex;
               flex-direction: column;
               gap: 16px;
           }
       `;
       document.head.appendChild(style);
   });
   ```

## Step 5: Install Dependencies and Run the Add-on

1. Install all dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build the add-on:
   ```bash
   npm run build
   ```

4. Package the add-on:
   ```bash
   npm run package
   ```

## Available Components

This add-on includes the following Spectrum Web Components:
- Text Field with Label
- Button Group with Primary and Secondary buttons
- Picker with Menu Items
- Switch

All components are themed using the Express theme with:
- Light color scheme
- Medium scale
- Express system

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check the browser console for any error messages
3. Verify that the webpack configuration is correct
4. Ensure all Spectrum Web Components are imported properly

## Additional Resources

- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/)
- [Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/)
- [Webpack Documentation](https://webpack.js.org/) 