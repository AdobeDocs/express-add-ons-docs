---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Document API
  - Document Model Sandbox
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
title: Great UIs using Adobe's Spectrum Design System
description: This is an in-depth tutorial that will guide you in using Adobe's Spectrum Design System to help you build great UI's for your add-ons.
contributors:
  - https://github.com/hollyschinsky
---

# Lesson 1: Use Spectrum Web Components in a basic JavaScript add-on

Configure and use Spectrum Web Components in a basic JavaScript add-on.

## Introduction

There are a few open source Spectrum libraries available, but we specifically recommend using the [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components) library, as it offers a comprehensive set of UI components with built-in benefits for developers, including:

- A built-in Express theme
- Accessibility
- Lightweight and performant
- Time savings due to the built-in styling
- Compliant with industry standards

## Prerequisites

**Q:** What do I need before starting this lesson?

**A:** You should have:
- Node.js and npm installed
- Basic knowledge of HTML, CSS, and JavaScript
- Adobe Express account for testing
- Familiarity with command line tools

**Q:** How is this different from Lesson 2?

**A:** This lesson uses vanilla JavaScript with Spectrum Web Components directly. Lesson 2 uses React with swc-react wrapper components.

## Step-by-Step Tutorial

This tutorial is organized into clear, sequential steps. Complete each step before moving to the next.

### Step 1: Create and Configure Your Add-on

Use the CLI to create a new add-on based on the basic `javascript` template:

```bash
# UI Runtime Context - Terminal command
npx @adobe/create-ccweb-add-on bingo-card-generator-js --template javascript
```

**Q:** What if the CLI command fails?

**A:** Common solutions:
1. Clear the npx cache: `npx clear-npx-cache`
2. Check Node.js version (requires Node 16+)
3. Ensure network connectivity
4. Try with `--verbose` flag for detailed error info

<InlineAlert slots="text" variant="warning"/>

If you've used the CLI prior to this, you may want to run this command to ensure you have the most up-to-date version before creating your project --> `npx clear-npx-cache`

**NOTE:** You could use the CDN URL's once again to get started quickly, but since you'll want to ensure your add-on projects are performant, you will learn how to configure your local add-on project to use the specific Spectrum Web Components you'll need, instead.

If you run the project at this point (`npm run build; npm run start`), you will see a basic button displayed in the UI with custom CSS set to style it for Express, as shown below:

![Basic JS add-on screenshot](../images/basic-js.png)

However, since you're going to be implementing a whole new UI, go ahead and remove the existing lines related to the button:

1. Open the `src/index.html` file and **remove the following lines** within the `<body>` block:

```html
<!-- UI Runtime Context - src/index.html -->
<div class="container">
    <button id="clickMe" disabled>Click me</button>
</div>
```

2. **Remove the associated CSS styles** from the `<style>` block since they are no longer needed:

```css
/* UI Runtime Context - src/index.html <style> block */
.container {
    margin: 24px;
    display: flex;
    flex-direction: column;
}

button {
    background-color: rgb(82, 88, 228);
    border-color: rgb(82, 88, 228);
    border-radius: 16px;
    border-style: solid;
    color: rgb(255, 255, 255);
    font-family: sans-serif;
    height: 32px;
}

button:disabled {
    background-color: rgb(177, 177, 177);
    border-color: rgb(177, 177, 177);
}

button:not([disabled]):hover {
    background-color: rgb(64, 70, 202);
    cursor: pointer;
}
```

3. Open the `src/index.js` and **remove the following lines**, (ensuring you keep the `addOnUISdk.ready.then(() => {...}` block intact):

```js
// UI Runtime Context - src/index.js - REMOVE these lines
const clickMeButton = document.getElementById("clickMe");
clickMeButton.addEventListener("click", () => {
    clickMeButton.innerHTML = "Clicked";
});

// Enable the button only when:
// 1. `addOnUISdk` is ready, and
// 2. `click` event listener is registered.
clickMeButton.disabled = false;
```

**Q:** What if I accidentally delete too much?

**A:** Make sure to keep the `addOnUISdk.ready.then(() => { ... })` wrapper block intact. This is essential for add-on functionality.

### Step 2: Configure Webpack

**Context:** Webpack is required to bundle Spectrum Web Components properly.

You need to configure your new add-on project to use webpack. This requires a `webpack.config.js` file and some additional updates to your `package.json`.

**Q:** Why do I need webpack for Spectrum Web Components?

**A:** Webpack bundles the web components and their dependencies correctly, ensuring they work properly in the add-on environment. Without webpack, you might encounter module loading issues.

1. Create a new file named `webpack.config.js` in **the root** of your add-on project (outside the `src` folder)
2. Copy in the complete configuration below:

```js
// UI Runtime Context - webpack.config.js (project root)
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction ? "source-map" : "eval-source-map",
    entry: "./src/index.js",
    experiments: {
        outputModule: true
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        module: true,
        filename: "index.js"
    },
    externalsType: "module",
    externalsPresets: { web: true },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: "module"
        }),
        new CopyWebpackPlugin({            
            patterns: [
                { from: "src/*.json", to: "[name][ext]" },                
                { from: "src/*.png", to: "[name][ext]", noErrorOnMissing: true },
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css"]
    }
};
```

**Q:** What if webpack configuration fails?

**A:** Common issues and solutions:
1. **Missing dependencies**: Run `npm install` to ensure all webpack dependencies are installed
2. **Path errors**: Verify the `entry` and `template` paths match your project structure
3. **Build fails**: Check console for specific error messages and verify Node.js version compatibility

3. Update your `package.json` to configure it to use webpack. Update the `scripts` block to add the `--use webpack` parameter:

```json
// UI Runtime Context - package.json scripts section
"scripts": {
    "clean": "ccweb-add-on-scripts clean",
    "build": "ccweb-add-on-scripts build --use webpack",
    "start": "ccweb-add-on-scripts start --use webpack",
    "package": "ccweb-add-on-scripts package --use webpack"
}
```

4. Update your `devDependencies` block with the required webpack dependencies:

```json
// UI Runtime Context - package.json devDependencies section
"devDependencies": {
    "@adobe/ccweb-add-on-scripts": "^1.2.1",
    "@adobe/ccweb-add-on-sdk-types": "^1.2.1",
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

5. **Install the dependencies:**

```bash
# UI Runtime Context - Terminal command
npm install
```

**Q:** What if `npm install` fails?

**A:** Try these solutions:
1. Delete `node_modules` and `package-lock.json`, then run `npm install` again
2. Clear npm cache: `npm cache clean --force`
3. Check for version conflicts and update Node.js if needed
4. Use `npm install --legacy-peer-deps` if there are peer dependency issues

### Step 3: Set Up the Express Theme

**Context:** The Express theme provides the Adobe Express visual styling for your components.

1. Install the [Spectrum Web Components `<sp-theme>` component](https://opensource.adobe.com/spectrum-web-components/tools/theme/):

```bash
# UI Runtime Context - Terminal command
npm install @spectrum-web-components/theme@0.39.4
```

**Note:** If you prefer to use `yarn`: `yarn add @spectrum-web-components/theme@0.39.4`

**Q:** Why version 0.39.4 specifically?

**A:** Version 0.39.4 is required due to compatibility issues with version 0.40.3. All Spectrum Web Components must use the same version to avoid build errors.

2. Open your `src/index.js` and add the theme imports at the top of the file:

```js
// UI Runtime Context - src/index.js theme imports
/* Theme and typography imports */
import '@spectrum-web-components/styles/typography.css';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
```

**Optional future theme imports** (commented out for now):
```js
// UI Runtime Context - src/index.js future theme options
// import '@spectrum-web-components/theme/express/theme-dark.js'; /* future dark theme */    
// import '@spectrum-web-components/theme/express/scale-large.js'; /* future mobile support */
```

**Note:** The `typography.css` import is optional but useful for accessing Spectrum CSS variables for typography styling and margins.

1. You can now add the `<sp-theme>` tag to your UI, but note that **you won't actually see anything visually yet**, since there are no components for it to be applied to. Open your `src/index.html` file, and add the following theme component into the `<body>` tags, configured with a `medium` scale, `light` color and `express` theme:

    ```html
    <sp-theme scale="medium" color="light" theme="express">
        <!-- UI content will go here -->
    </sp-theme>
    ```

    **NOTE:** Express currently only supports a light theme, but support for a dark theme will be coming in the future, so you could add some code that listens for the [Add-on UI SDK's `themechange` event](https://developer.adobe.com/express/add-ons/docs/guides/develop/use_cases/) and apply the change to your UI with something like the following:

    ```js
    addOnUISdk.app.on("themechange", (data) => { 
        applyTheme(data.theme); 
    });
    ```

    Another important thing to note, is the existence of the following block in the starter template `src/index.js` file, which can be used to ensure the Add-on UI SDK has been fully initialized and is ready for use before trying to implement your UI. You may have also noticed that the original button in the UI was set to `disabled`, and is subsequently enabled in this block:

    ```js
    addOnUISdk.ready.then(() => {        
        // Enable the button only when:
        // 1. `addOnUISdk` is ready, and
        // 2. `click` event listener is registered.
        clickMeButton.disabled = false;
    }
    ```

    Keep note of this pattern as you develop your own add-ons.

### Step 4: Install Spectrum Web Components

Now you can install all the Spectrum Web Components needed for the bingo card generator UI.

**Option 1: Command line installation**
```bash
# UI Runtime Context - Terminal command
npm install @spectrum-web-components/button@0.39.4 @spectrum-web-components/button-group@0.39.4 @spectrum-web-components/field-label@0.39.4 @spectrum-web-components/menu@0.39.4 @spectrum-web-components/picker@0.39.4 @spectrum-web-components/slider@0.39.4 @spectrum-web-components/swatch@0.39.4 @spectrum-web-components/switch@0.39.4
```

**Option 2: package.json method**
Alternatively, update your `package.json` dependencies block and run `npm install`:

```json
// UI Runtime Context - package.json dependencies section
"dependencies": {
    "@spectrum-web-components/button": "0.39.4",
    "@spectrum-web-components/button-group": "0.39.4",    
    "@spectrum-web-components/field-label": "0.39.4",
    "@spectrum-web-components/menu": "0.39.4",
    "@spectrum-web-components/picker": "0.39.4",
    "@spectrum-web-components/slider": "0.39.4",
    "@spectrum-web-components/swatch": "0.39.4",
    "@spectrum-web-components/switch": "0.39.4",            
    "@spectrum-web-components/theme": "0.39.4"        
}
```

**Q:** What if component installation fails?

**A:** Common solutions:
1. **Version mismatch errors**: Ensure ALL Spectrum Web Components use version 0.39.4
2. **Network timeouts**: Try `npm install --timeout=60000`
3. **Permission errors**: Use `sudo npm install` (macOS/Linux) or run as administrator (Windows)
4. **Cache issues**: Clear npm cache with `npm cache clean --force`

<InlineAlert slots="text" variant="warning"/>

**CRITICAL:** All Spectrum Web Components must use the exact same version (0.39.4) or you'll encounter build errors. Double-check your `package.json` before proceeding.

### Import Spectrum Web Components

Add the following list of imports for the new components into your `src/index.js` file with the following block:

```js
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import "@spectrum-web-components/number-field/sp-number-field.js";
import '@spectrum-web-components/picker/sp-picker.js';
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";
import '@spectrum-web-components/switch/sp-switch.js';
```

### Build UI with Spectrum Web Components

Next, open the `src/index.html` file and implement the following code for the UI components within the opening and closing `<sp-theme>` block, as provided below:

```html
<sp-theme scale="medium" color="light" theme="express">                
    <div class="row gap-20"> 
        <div class="column">
            <sp-field-label for="bgColorSwatch" size="m">Background color</sp-field-label>
            <sp-swatch id="bgColorSwatch" class="color-well"></sp-swatch>
            <input type="color" id="bgColorPicker" style="display: none;"/>                    
        </div>
        <div class="column">
            <sp-field-label for="fgColorSwatch" size="m">Number color</sp-field-label>
            <sp-swatch id="fgColorSwatch" class="color-well"></sp-swatch>
            <input type="color" id="fgColorPicker" style="display: none;"/>                    
        </div>                                                           
        <div class="column">
            <sp-field-label for="titleColorSwatch" size="m">Title color</sp-field-label>
            <sp-swatch id="titleColorSwatch" class="color-well"></sp-swatch>
            <input type="color" id="titleColorPicker" style="display: none;">                    
        </div>                        
    </div>  
    <div class="row gap-20 margin-top-10">  
        <div class="column">
            <sp-field-label for="fontWeightPicker">Font Weight</sp-field-label>
            <sp-picker id="fontWeightPicker" size="m" value="normal">
                <sp-menu-item value="normal">Normal</sp-menu-item>                        
                <sp-menu-item value="bold">Bold</sp-menu-item>                            
                <sp-menu-item value="lighter">Lighter</sp-menu-item>                
            </sp-picker>
        </div>     
        <div class="column gap-20">
            <sp-switch id="freeSpaceToggle" emphasized value="on" checked size="l">Free space</sp-switch>                               
        </div>                                                        
    </div>                   
    <div class="row gap-20">                    
        <sp-slider label="Gridlines width" id="gridlineSize" variant="filled" editable 
            hide-stepper min="1" max="10" value="5"
            format-options='{"style": "unit", "unit": "px"}' step="1">
        </sp-slider>
        <div class="column">
            <sp-field-label for="gridlinesColorSwatch" size="m">Color</sp-field-label>
            <sp-swatch id="gridlinesColorSwatch" class="color-well"></sp-swatch>
            <input type="color" id="gridlinesColorPicker" style="display: none;">                                            
        </div>
    </div> 
    <div class="margin-top-10">
        <sp-button-group horizontal>
            <sp-button id="generateBtn" disabled>Generate card</sp-button>
            <sp-button id="addBtn" variant="secondary" disabled>Add to page</sp-button>
        </sp-button-group>              
    </div>                
    <div class="margin-top-10">            
        <canvas id="finalCard"/>            
    </div>                            
</sp-theme>
```

Note the properties for each, and use the [Spectrum Web Component documentation](https://opensource.adobe.com/spectrum-web-components) to help cross-reference them for more context.

Worth mentioning, are the details around the use of the `<sp-swatch>` components, which are coupled with a hidden native `<input>` component to allow the user to pick their colors. Though SWC features a variety of color-related components (Color Area, Color Handle, Color Loupe, Color Slider), there is not an actual picker, so this add-on implements it via an `<sp-swatch>` for the UI and a hidden native `<input>` element behind it.

The `<sp-swatch>` click handler programmatically triggers the `<input>` click, which, although hidden, can still display the browser's native color picker. On input (i.e., when the user selects a different color within the picker), the `color` attribute of the `<sp-swatch>` updates as the color is changed to them in sync.

Also, be sure to check out [Adobe's UX Guidelines](https://xd.adobe.com/view/urn:aaid:sc:US:fd638450-1af8-49c3-ad29-0e76c2a2136f/) as many of these components are included with specific guidelines, including:

`<sp-number-field>` for the gridsize value
`<sp-slider>` for the gridsize picker
`<sp-swatch>` for the color pickers
`<sp-button-group>` and `<sp-button>` for the CTA buttons.

### Style your UI

If you run your add-on project with the CLI at this point (`npm run build; npm run start`), you will notice that your UI layout is less than ideal, as shown below:

![lesson 1 prestyle screenshot](../images/lesson1-prestyle.png)

Even though the Spectrum Web Components themselves have styling applied, the layout of them does not. That's because the Spectrum Web Components library doesn't include any specific layout components. However, you can use Spectrum CSS variables to help you with that.

In this step you will define some styles and selectors to improve the layout and general styling of your UI. You may have noticed there were already some classes set when you copied in the code block above, but since they don't actually apply yet, you'll eed to define them in this step.

Locate the `<style>` block in your `src/index.html`, and add the following CSS selectors and classes:

```css
sp-theme {
    margin: 0 var(--spectrum-global-dimension-static-size-100);
    display: grid;
}

h2 {
    font-weight: var(--spectrum-global-font-weight-black);
}

sp-swatch {
    width: var(--spectrum-swatch-size-medium);                
}

sp-button {
    flex: 1;
    max-width: calc(
        (100% - var(--spectrum-global-dimension-static-size-250)) / 2
    );
}

sp-textfield,
sp-picker {
    width: var(--spectrum-global-dimension-static-size-1700);
    display: flex;
}

sp-number-field {            
    width: 100%;
}

sp-button-group {
    margin-top: var(--spectrum-global-dimension-static-size-300);
    width: 100%;
    display: flex;
    justify-content: space-between;
}

sp-slider {
    width: 100%;                
    --spectrum-slider-font-size: var(--spectrum-font-size-100);
} 

sp-field-label {
    font-size: var(--spectrum-global-dimension-font-size-100);        
}

.color-well {
    cursor: pointer;
    --mod-swatch-border-thickness: var(--spectrum-divider-thickness-small);
    --mod-swatch-border-color: var(--spectrum-transparent-black-500);
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
}

.column {
    display: flex;
    flex-direction: column;        
}

.gap-20 {
    gap: var(--spectrum-global-dimension-static-size-250); 
}

.margin-top-10 {
    margin-top: var(--spectrum-global-dimension-static-size-125); 
}

#bingoCanvas {
    width: 290px;       
} 
```

**TIP:** You can locate the custom global variables avaiable for use to adjust your UI as desired in the `/node_modules/@spectrum-web-components/styles/express/spectrum-core-global.css` of your project.

If you kept your add-on running in Express after the changes in the steps above, it should automatically refresh and you can view the updates. It should look something like this screenshot below:

![lesson 1 poststyle screenshot](../images/lesson1-poststyle.png)

### Wire UI code and add canvas drawing logic

After completing the above, you will see that many of the components aren't active yet, since there's currently no associated logic applied to set values or enable the buttons. First, continue adjusting the layout as needed, then, once you're happy with it, you can start implementing the logic to set some default values for the components and enable the **Generate card** button to allow the user to generate their customized bingo card. Open your `src/index.js` and copy in the following code snippet after your imports, replacing the `addOnUISdk.ready.then(() => {`  callback since it's included below.

```js
// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {        
    console.log("addOnUISdk is ready for use.");    
    
    // Refs to the <sp-swatch> and <input> elements for each color
    const gridlinesColorSwatch = document.getElementById("gridlinesColorSwatch");
    const gridlinesColorPicker = document.getElementById("gridlinesColorPicker");
    
    const bgColorSwatch = document.getElementById("bgColorSwatch");        
    const bgColorPicker = document.getElementById("bgColorPicker");
    
    const fgColorSwatch = document.getElementById("fgColorSwatch");
    const fgColorPicker = document.getElementById("fgColorPicker");

    const titleColorSwatch = document.getElementById("titleColorSwatch");
    const titleColorPicker = document.getElementById("titleColorPicker");
    
    // Initialize colors for the above
    gridlinesColorPicker.value = "#5258e5"; // gridline color   
    gridlinesColorSwatch.color = "#5258e5"; // gridline color   
    bgColorPicker.value = "#f2f2f2";        // box background color
    bgColorSwatch.color = "#f2f2f2";        // box background color
    fgColorPicker.value = "#5258e5";        // bingo number color
    fgColorSwatch.color = "#5258e5";        // bingo number color
    titleColorPicker.value = "#000000";     // title color
    titleColorSwatch.color = "#000000";     // title color
  
    // Trigger click on the native color pickers for each
    gridlinesColorSwatch.addEventListener("click", function () {
        gridlinesColorPicker.click();
    });
  
    gridlinesColorPicker.addEventListener("input", function (event) {
      const selectedColor = event.target.value;
      gridlinesColorSwatch.setAttribute("color", selectedColor);
    });

    fgColorSwatch.addEventListener("click", function () {
        fgColorPicker.click();
    });

    fgColorPicker.addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        fgColorSwatch.setAttribute("color", selectedColor);
    });
  
    bgColorSwatch.addEventListener("click", function () {
      bgColorPicker.click();
    });
  
    bgColorPicker.addEventListener("input", function (event) {
      const selectedColor = event.target.value;
      bgColorSwatch.setAttribute("color", selectedColor);
    });
  
    titleColorSwatch.addEventListener("click", function () {
        titleColorPicker.click();
    });
  
    titleColorPicker.addEventListener("input", function (event) {
      const selectedColor = event.target.value;
      titleColorSwatch.setAttribute("color", selectedColor);
    });
  
    // CTA button references
    const generateBtn = document.getElementById("generateBtn");  
    const addBtn = document.getElementById("addBtn");  
  
    // Generate button handler
    generateBtn.onclick = async (event) => {                    
      generateBingoCard();        
    };
  
    /* Enable the generate button now that the SDK is ready and the button event handler has been registered. The add to page button should only be enabled once a card has been generated. */
    generateBtn.disabled = false;        
});

// Function to generate the bingo card using an HTML canvas and drawing context 
function generateBingoCard() {
    const canvas = document.getElementById("finalCard");
    const ctx = canvas.getContext("2d");

    // Set canvas width and height
    canvas.width = 300;
    canvas.height = 360;

    // Set grid properties    
    let gridlineSize = document.getElementById("gridlineSize").value;        
    const numRows = 6;
    const numCols = 5;
    const cellWidth = 60;
    const cellHeight = 60;
    
    // Draw background rects with user selected color
    ctx.fillStyle = bgColorPicker.value; 
    for (let x = gridlineSize/2; x <= canvas.width; x += cellWidth-gridlineSize) {            
        for (let y = gridlineSize/2; y <= canvas.height; y += cellHeight-gridlineSize) {
            ctx.fillRect(x, y, cellWidth-gridlineSize, cellHeight-gridlineSize);                
        }
    } 
    
    // Draw gridlines
    ctx.lineWidth = gridlineSize;
    for (let i = 0; i <= numCols; i++) {        
        // Need to adjust for left/right gridlines size           
        ctx.moveTo(gridlineSize/2, 0);
        ctx.lineTo(gridlineSize/2, canvas.height);      

        ctx.moveTo(i * cellWidth-gridlineSize/2, 0);
        ctx.lineTo(i * cellWidth-gridlineSize/2, canvas.height);        
    }

    for (let i = 0; i <= numRows; i++) { 
        // Need to adjust for top/bottom gridlines size               
        ctx.moveTo(0, gridlineSize/2);
        ctx.lineTo(canvas.height, gridlineSize/2,);            
    
        ctx.moveTo(0, i * cellWidth-gridlineSize/2);
        ctx.lineTo(canvas.height, i * cellWidth-gridlineSize/2);                    
    }
    
    ctx.strokeStyle = gridlinesColorPicker.value;        
    ctx.stroke();
    
    // Draw bingo title
    ctx.font = fontWeightPicker.value +' 28px adobe clean';    
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle'; 
    ctx.fillStyle = titleColorPicker.value; //font color                        
    let bingoTitle = ['B','I','N','G','O'];
    for (let charCnt = 0; charCnt < bingoTitle.length; charCnt++) {
        let letter = bingoTitle[charCnt];
        ctx.fillText(letter, charCnt * cellWidth + cellWidth / 2 - 4, cellHeight / 2 + 8);    
    }       
    
    // Generate random numbers
    const freeSpace = [3, 2]; // Coordinates of the FREE space
    const numbers = [];
    const usedNumbers = new Set(); // Track used numbers
    ctx.font = fontWeightPicker.value +' 22px adobe clean';
    ctx.fillStyle = fgColorPicker.value; // color of the numbers 
    ctx.textAlign = "center";
    const freeSpaceToggle = document.getElementById("freeSpaceToggle");
    
    for (let i = 1; i < numRows; i++) {
        numbers[i] = [];
        for (let j = 0; j < numCols; j++) {
            if (freeSpaceToggle.checked) {
                if (i === freeSpace[0] && j === freeSpace[1]) {
                    numbers[i][j] = "FREE";
                    continue; // Skip the FREE space
                }
            }
            let num;
            do {
                num = Math.floor(Math.random() * 15) + 1 + (j * 15);
            } while (usedNumbers.has(num)); // Generate unique numbers

            usedNumbers.add(num);
            numbers[i][j] = num;        
            ctx.fillText(num, j * cellWidth + cellWidth / 2 - 3, i * cellHeight + cellHeight / 2 + 3);
        }
    }

    // Draw "FREE" if the toggle is checked
    if (freeSpaceToggle.checked) {
        ctx.font = fontWeightPicker.value +' 20px adobe clean';     
        ctx.fillText("FREE", freeSpace[1] * cellWidth + cellWidth / 2 - 3, freeSpace[0] * cellHeight + cellHeight / 2 + 3);   
        ctx.drawImage(canvas, 0, 0);
    }    

    // Enable drag and drop for the card
    addOnUISdk.app.enableDragToDocument(canvas, {
        previewCallback: el => new URL(canvas.toDataURL()),
        completionCallback: async el => {
            const r = await fetch(canvas.toDataURL());
            const blob = await r.blob();
            return [{blob}];
        }
    })    
            
    // Add button click handler with error handling
    addBtn.onclick = async () => {
        try {
            const r = await fetch(canvas.toDataURL());
            const blob = await r.blob();    
            await addOnUISdk.app.document.addImage(blob);
        } catch (error) {
            console.error("Error adding image to document:", error);
        }
    }

    // Enable the add to page button    
    addBtn.disabled = false;
}
```

Once you've updated your code, your add-on should reload and you can generate a custom bingo card! Try playing with some settings and see how they render in a new card. You can also try to drag your card to the page, or add it with the add button etc. If your add-on didn't pick up the changes for any reason, you can always use the [add-on developer tools](https://opensource.adobe.com/spectrum-web-components/using-swc-react/) to do a refresh, or simply run `npm run build; npm run start` again.

![Bingo add-on screenshot](../images/bingo-v1-addon.png)

## Troubleshooting FAQ

### Common Build and Development Issues

**Q:** My add-on won't build. What should I check?

**A:** Common solutions:
1. **Version conflicts**: Ensure all Spectrum Web Components use version 0.39.4
2. **Missing dependencies**: Run `npm install` to ensure all packages are installed
3. **Webpack errors**: Verify your webpack.config.js file is in the project root
4. **Import errors**: Check that all imports in index.js are correct

**Q:** Components aren't displaying correctly. How do I fix this?

**A:** Check these common issues:
1. **Missing theme wrapper**: Ensure your components are wrapped in `<sp-theme>`
2. **CSS not loading**: Verify webpack is configured to handle CSS imports
3. **Import order**: Make sure theme imports come before component imports
4. **Component not appended**: Ensure components are added to the DOM

**Q:** Canvas drawing isn't working. What's wrong?

**A:** Common canvas issues:
1. **Context errors**: Ensure canvas context is retrieved correctly
2. **Timing issues**: Make sure DOM elements exist before accessing them
3. **Reference errors**: Check that all UI element references are valid
4. **Event handler errors**: Verify event listeners are attached properly

**Q:** Add-on SDK calls are failing. How do I debug?

**A:** SDK troubleshooting steps:
1. **SDK not ready**: Wrap all SDK calls in `addOnUISdk.ready.then()`
2. **Permission errors**: Verify manifest.json permissions are correct
3. **API errors**: Check browser console for specific error messages
4. **Network issues**: Ensure Adobe Express is properly connected

### Development Best Practices

**Q:** How can I debug my add-on effectively?

**A:** Use these debugging techniques:
1. Open browser developer tools in Adobe Express
2. Check the Console tab for error messages
3. Use `console.log()` statements to track variable values
4. Verify network requests in the Network tab
5. Inspect DOM elements in the Elements tab

## Next Steps

Congratulations! You've successfully built a vanilla JavaScript Adobe Express add-on using Spectrum Web Components. You now understand how to:

- Set up a JavaScript add-on project with webpack
- Configure and use Spectrum Web Components
- Handle UI events and user interactions
- Work with HTML5 Canvas for graphics generation
- Integrate with the Adobe Express Add-on SDK

For the next lesson, learn how to build the same add-on using React: [Lesson 2: Use Spectrum Web Components in a React-based add-on](./part2.md)

For additional resources, explore:
- [Document API concepts](../../learn/platform_concepts/document-api.md)
- [Advanced UI patterns](../../learn/how_to/)
- [Publishing your add-on](../../guides/getting_started/dev_tooling.md)
