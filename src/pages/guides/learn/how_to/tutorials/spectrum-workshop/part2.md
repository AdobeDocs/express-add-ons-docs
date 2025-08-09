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

# Lesson 2: Use Spectrum Web Components in a React-based add-on

Learn how to configure and use Spectrum Web Components in a ReactJS add-on.

## Introduction

In this lesson, you will implement the bingo card generator add-on in a React-based project with a library called [**swc-react**](https://opensource.adobe.com/spectrum-web-components/using-swc-react/), a collection of wrapper components designed to make Spectrum Web Components (SWC) work like native React components in a React application. They serve as a bridge between React and Spectrum Web Components, and their properties and event names are directly derived from their corresponding SWC components. As such, the corresponding [Spectrum Web Components documentation](https://opensource.adobe.com/spectrum-web-components/) can be used as the documentation reference.

## Frequently Asked Questions

### What is swc-react?

**Q:** What is swc-react and how does it differ from React Spectrum?

**A:** swc-react is a library of wrapper components that make Spectrum Web Components work like native React components. We recommend it over React Spectrum because it provides a more extensive set of components with an explicit Express theme that's continuously updated, while React Spectrum's Express theme is currently in alpha and not actively updated.

### Prerequisites and Setup

**Q:** What do I need before starting this lesson?

**A:** You should have:
- Node.js and npm installed
- Basic knowledge of React and JSX
- Completed [Lesson 1](./part1.md) or understand basic Adobe Express add-on concepts
- Access to Adobe Express for testing

**Q:** What's the difference between this lesson and Lesson 1?

**A:** Lesson 1 uses vanilla JavaScript and Spectrum Web Components directly. This lesson uses React with swc-react wrapper components, providing a more familiar development experience for React developers.

<InlineAlert slots="text" variant="info"/>

We recommend using **swc-react** over [**React Spectrum**](https://react-spectrum.adobe.com/react-spectrum/index.html) currently since the Spectrum Web Components library provides a more extensive set of components with an explicit Express theme that is continuously updated. React Spectrum’s Express theme is in alpha, doesn't have full component coverage, and is currently not being updated. Please note, however, that [a new version of Spectrum](https://s2.spectrum.adobe.com/) will be released sometime this year, and an update to the React Spectrum libraries will follow. In the meantime we recommend using the swc-react wrappersx.

## Step-by-Step Tutorial

This tutorial is organized into clear, sequential steps. Each step builds on the previous one.

### Step 1: Create and Set Up React Project

1. Create a new project with the CLI based on the `react-javascript` template:

    `npx @adobe/create-ccweb-add-on bingo-card-generator-react --template react-javascript`

1. Open the project in your favorite code editor and navigate to the `src/components/App.jsx` file. Notice that it's preconfigured with the `@swc-react/theme` and `@swc-react/button` packages and their associated imports, with a basic usage. If you run the project at this point, you should see the button show up in your add-on:

    ![Basic react add-on screenshot](../images/react-starter.png)

    Take a moment to get familiar with what's included in the generated project before moving on. Notice it's pre-configured for webpack, so you don't have to do those configuration steps you had to do in lesson 1 for the basic JavaScript project.

### React Project FAQ

**Q:** How do I know if my React project was created correctly?

**A:** After running the CLI command, you should see a project structure with `src/components/App.jsx` containing pre-configured `@swc-react/theme` and `@swc-react/button` imports. Running `npm run build && npm run start` should display a basic button in your add-on.

**Q:** What makes the React template different from the JavaScript template?

**A:** The React template is pre-configured with webpack, React dependencies, and basic swc-react components, so you don't need the manual webpack setup required in Lesson 1.

### Step 2: Install swc-react Components

1. Next, start installing the UI components to your new add-on project for use. These components are installed in a similar fashion to how you installed the Spectrum Web Components to lesson 1, via `npm install` or `yarn add`, with just a change to the package prefix, from `@spectrum-web-components` to `@swc-react`. Remember, the **@swc-react/button** and **@swc-react/theme** components were already included in the project generated by the template, so you can skip those.

    ```bash
    npm install @swc-react/button-group@0.39.4 @swc-react/field-label@0.39.4 @swc-react/menu@0.39.4 @swc-react/picker@0.39.4 @swc-react/slider@0.39.4 @swc-react/swatch@0.39.4 @swc-react/switch@0.39.4
    ```

    **NOTE:** The above command specifies the `0.39.4` version specifically, due to an issue found with compatibility using the latest default version `0.40.3` as of this writing.

    Alternatively, replace the `dependencies` block in your `package.json` file with the following, and then run `npm install` to install them all at once:

    ```json
    "dependencies": {
            "@swc-react/button": "0.39.4",
            "@swc-react/button-group": "0.39.4",        
            "@swc-react/field-label": "0.39.4",
            "@swc-react/menu": "0.39.4",
            "@swc-react/picker": "0.39.4",
            "@swc-react/slider": "0.39.4",
            "@swc-react/swatch": "0.39.4",
            "@swc-react/switch": "0.39.4",        
            "@swc-react/theme": "0.39.4",
            "react": "18.2.0",
            "react-dom": "18.2.0"
    },    
    ```

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** You must ensure **the versions of all of the @swc-react component packages installed are the same,** or you will see errors upon build or while running. You can open your `package.json` file to double check to ensure they all match before moving on.

### Component Installation FAQ

**Q:** Why do I need to specify version 0.39.4 for swc-react components?

**A:** Version 0.39.4 is required due to compatibility issues with the latest default version 0.40.3. All swc-react components must use the same version to avoid build errors.

**Q:** What happens if I use mismatched versions?

**A:** You'll see build errors or runtime issues. Always ensure all @swc-react components use the exact same version number in your package.json.

### Step 3: Import swc-react Components

In this step you will add the UI component imports for the bingo card generator add-on. The pattern of the imports will follow in a similar manner to what was included in the generated project for `Button` and `Theme`.

As a tip, you can use the [Spectrum Web Components Reference](https://opensource.adobe.com/spectrum-web-components/) for the corresponding component, and in the **Usage** section you will see that the third import uses the class name for the component, which is what you will need, as well as the specific package to use, it will just be prefixed with `@swc-react` instead.

So, for example, the first import is for the **Button Group** component. If you look at the [Spectrum Web Components - Button Group Usage](https://opensource.adobe.com/spectrum-web-components/components/button-group/#usage), the last import definition shows `import { ButtonGroup } from '@spectrum-web-components/button-group';`. It's outlined in the image below for visual reference:

![ButtonGroup import from SWC reference](../images/swc-button-group-import.png)

You can simply copy that import from the reference for any given component you want to use in your add-on, and just change the prefix from `@spectrum-web-components` to `@swc-react`. (Notice the existing imports for `Button` and `Theme`). The resulting import to use in your add-on would be:

`import { ButtonGroup } from '@swc-react/button-group';`.

You can then use this same pattern for all of the `@swc-react` wrapper components you want to use.

The imports needed for the bingo card generator add-on sample are listed below. **Add these to your `src/components/App.jsx` file** at the top, along with the existing `Button` and `Theme` imports:

```js
// UI Runtime Context - src/components/App.jsx
// Complete import list for src/components/App.jsx
import React, { useState, useRef } from "react";
import "./App.css";

// Existing swc-react imports (already in template)
import { Button } from '@swc-react/button';
import { Theme } from '@swc-react/theme';

// New swc-react imports to add
import { ButtonGroup } from '@swc-react/button-group';
import { FieldLabel } from '@swc-react/field-label';
import { MenuItem } from '@swc-react/menu';
import { Picker } from '@swc-react/picker';
import { Slider } from '@swc-react/slider';
import { Swatch } from '@swc-react/swatch';
import { Switch } from "@swc-react/switch";

// Add-on SDK import
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
```

### Import Pattern FAQ

**Q:** How do I find the correct import name for any swc-react component?

**A:** Go to the [Spectrum Web Components documentation](https://opensource.adobe.com/spectrum-web-components/), find your component, and look at the Usage section. The third import shows the class name (e.g., `ButtonGroup`). Change `@spectrum-web-components` to `@swc-react` in the package name.

### Step 4: Create Event Helper Class

**Context:** This code goes in your **UI layer** (`src/components/` folder), not the Document Sandbox.

Next you'll need to create a new class to handle a known issue where React events and web components don't always work well together. See [this React issue](https://github.com/facebook/react/issues/19846) for more details. The issue is most often seen with the React `onChange` event, where events won't properly fire. The helper class automatically registers native browser events to ensure they work correctly.

**Q:** Why do I need a WC helper class?

**A:** React and Web Components don't always handle events the same way. This helper ensures that swc-react components properly fire onChange and other events by registering native browser event listeners.

1. Create a new file in your `src/components` folder and name it `WC.jsx`
2. Copy in the complete code block below and save it:
  
**Note:** this class is also included in the [lesson 2 final project](https://github.com/hollyschinsky/bingo-card-generator-js-react) if you want to copy it in from there instead.

```js
// UI Runtime Context - src/components/WC.jsx
import React from "react";

export class WC extends React.Component {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(evt) {
        const propName = `on${evt.type[0].toUpperCase()}${evt.type.substr(1)}`;
        if (this.props[propName]) {
            this.props[propName].call(evt.target, evt);
        }
    }

    componentDidMount() {
        const el = this.el.current;
        const eventProps = Object.entries(this.props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.addEventListener(k.substr(2).toLowerCase(), this.handleEvent));
    }

    componentWillUnmount() {
        const el = this.el.current;
        const eventProps = Object.entries(this.props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.removeEventListener(k.substr(2).toLowerCase(), this.handleEvent));
    }

    render() {
        const filteredProps = Object.fromEntries(Object.entries(this.props).filter(([k,v]) => !k.startsWith("on")));
        return <div ref={this.el} {...filteredProps}>{this.props.children}</div>
    }
}
```

Now, go back into your `src/components/App.jsx` and import your new `WC` helper class under the `React` and `App.css` imports, for instance:

```js
import React, { useState, useRef } from "react";
import "./App.css";
import { WC } from "./WC.jsx";
```

### Step 5: Build UI with swc-react Components

**Context:** This code goes in your **UI layer** (`src/components/App.jsx` file), specifically in the JSX return statement.

At this point, you are ready to start using the `swc-react` components. You'll wrap some with the `<WC>` helper class to handle events appropriately.

**Q:** When should I use the WC wrapper?

**A:** Use `<WC>` around swc-react components when you need to handle events like `onChange`, `onClick`, etc. The WC component ensures these events fire properly.

**Q:** Where does this UI code go?

**A:** This replaces the current `<Theme>` block in the return statement of your `App.jsx` component function.

Open your `src/components/App.jsx` file and replace the current `<Theme>` block in the UI section with the following block:

```html
<!-- UI Runtime Context - src/components/App.jsx JSX -->
<Theme theme="express" scale="medium" color="light">
    <div className="container">
        <div className="row gap-20">             
            <div className="column">
                <FieldLabel size="l">Background color</FieldLabel>
                <WC onChange={onBgColorClick}>
                    <Swatch className="color-well" color={bgColorSwatch}></Swatch>
                </WC>
                <input ref={bgColorInput} type="color" style={{display: "none"}}
                    value={bgColor} onChange={onBgColorChange}
                />
            </div>
            <div className="column">
                <FieldLabel size="l">Number color</FieldLabel>
                <WC onChange={onFgColorClick}>
                    <Swatch className="color-well" color={fgColorSwatch}></Swatch>
                </WC>
                <input ref={fgColorInput} type="color" style={{display: "none"}}
                    value={fgColor} onChange={onFgColorChange}
                />                        
            </div>                                                       
            <div className="column">
                <FieldLabel size="l">Title color</FieldLabel>
                <WC onChange={onTitleColorClick}>
                    <Swatch className="color-well" color={titleColorSwatch}></Swatch>
                </WC>
                <input ref={titleColorInput} type="color" style={{display: "none"}}
                    value ={titleColor} onChange={onTitleColorChange}
                />                    
            </div>                                
        </div>
        <div className="row gap-20">
            <div className="column margin-top-10">
                <FieldLabel size="l">Font Weight</FieldLabel>
                <Picker size="m" value={fontWeightPicker} 
                    change={event => setFontWeightPicker(event.target.value)}>
                    <MenuItem value="normal">Normal</MenuItem>                        
                    <MenuItem value="bold">Bold</MenuItem>                            
                    <MenuItem value="lighter">Lighter</MenuItem>                
                </Picker>
            </div>  
            <div className="column">
                <WC onChange={event => setFreeSpaceToggle(event.target.checked)}>
                    <Switch emphasized checked={freeSpaceToggle} size="l">Free space</Switch>
                </WC>
            </div>         
        </div>
        <div className="row gap-20">                                
            <WC onChange={event => setGridlineSize(event.target.value)}>
                <Slider label="Gridlines size" variant="filled" editable value={gridlineSize}
                    hide-stepper min="1" max="10"
                    format-options='{"style": "unit", "unit": "px"}' step="1">
                </Slider>
            </WC>                                 
            <div className="column">
                <FieldLabel size="l">Color</FieldLabel>
                <WC onChange={onGridColorClick}>
                    <Swatch className="color-well" color={gridColorSwatch}></Swatch>
                </WC>
                <input ref={gridColorInput} type="color" style={{display: "none"}}
                    value={gridColor} onChange={onGridColorChange}
                />
            </div>                    
        </div>                 
        <div>
            <ButtonGroup horizontal>
                <Button onClick={generateBingoCard}>Generate card</Button>
                <Button onClick={handleAddToPage} disabled={!addToPageEnabled} variant="secondary">Add to page</Button>
            </ButtonGroup>              
        </div>                
        <div className="margin-top-10">                        
            <canvas ref={bingoCanvas}/>            
        </div> 
    </div>                                        
</Theme>
```

Note the use of the `<WC>..</WC>` component created in the previous step to wrap the `swc-react` components to ensure the events are are properly fired.

### Step 6: Wire UI Code and Add Canvas Drawing Logic

**Context:** This code goes in your **UI layer** (`src/components/App.jsx` file), inside the App component function.

If you tried to run your add-on now, you'd get a blank UI with console errors because the UI components reference functions that don't exist yet. In this step, you'll add the React state management and event handlers.

**Q:** Where does this JavaScript logic go?

**A:** This code goes inside your App component function in `src/components/App.jsx`, before the `return (...)` statement. It replaces the existing button logic.

**Q:** Why is all the logic in App.jsx?

**A:** For tutorial simplicity. In a production app, you'd typically separate concerns with multiple components and custom hooks.

**Q:** Do I need the Document Sandbox for this step?

**A:** No, this is purely UI logic. The canvas drawing and add-on SDK calls happen in the UI layer, not the Document Sandbox.

Replace the current logic for the original button component at the top of the `App` function before the `return (...)` with the code below:

```js
// UI Runtime Context - src/components/App.jsx inside App function
// State variables to hold component values
const [bgColor, setBgColor] = useState("#f2f2f2");
const [bgColorSwatch, setBgColorSwatch] = useState("#f2f2f2");

const [fgColor, setFgColor] = useState("#5258e5");
const [fgColorSwatch, setFgColorSwatch] = useState("#5258e5");

const [titleColor, setTitleColor] = useState("#000000");
const [titleColorSwatch, setTitleColorSwatch] = useState("#000000");

const [gridColor, setGridColor] = useState("#5258e5");
const [gridColorSwatch, setGridColorSwatch] = useState("#5258e5");

const [fontWeightPicker, setFontWeightPicker] = useState("normal");
const [freeSpaceToggle, setFreeSpaceToggle] = useState(true);
const [gridlineSize, setGridlineSize] = useState(5);
const [addToPageEnabled, setAddToPageEnabled] = useState(false);

// Refs to the UI elements for colors, add button and HTML canvas
const fgColorInput = useRef(null);
const bgColorInput = useRef(null);
const gridColorInput = useRef(null);
const titleColorInput = useRef(null);
const bingoCanvas = useRef(null);

// Function to generate the bingo card using an HTML canvas and drawing context 
function generateBingoCard() {              
    const ctx = bingoCanvas.current.getContext("2d");

    // Set canvas width and height
    bingoCanvas.current.width = 300;
    bingoCanvas.current.height = 360;
    
    // Set grid properties            
    const numRows = 6;
    const numCols = 5;
    const cellWidth = 60;
    const cellHeight = 60;
                    
    // Fill background boxes with selected bg color
    ctx.fillStyle = bgColor; 
    for (let x = gridlineSize/2; x <= bingoCanvas.current.width; x += cellWidth-gridlineSize) {            
        for (let y = gridlineSize/2; y <= bingoCanvas.current.height; y += cellHeight-gridlineSize) {
            ctx.fillRect(x, y, cellWidth, cellHeight);
        }
    }                        
            
    // Draw gridlines
    ctx.lineWidth = gridlineSize; 
    let x=0;
    let y=0;
    for (let i = 0; i <= numCols; i++) {        
        // Need to adjust for left/right gridlines size
        if (i===0) {
            ctx.moveTo(gridlineSize/2, 0);
            ctx.lineTo(gridlineSize/2, bingoCanvas.current.height);
        }
        else {
            ctx.moveTo(i * cellWidth-gridlineSize/2, 0);
            ctx.lineTo(i * cellWidth-gridlineSize/2, bingoCanvas.current.height);
            
        }
    }
    
    for (let i = 0; i <= numRows; i++) { 
        // Need to adjust for top/bottom gridlines size               
        if (i===0) {
            ctx.moveTo(0, gridlineSize/2);
            ctx.lineTo(bingoCanvas.current.height, gridlineSize/2,);
        }
        else {
            ctx.moveTo(0, i * cellWidth-gridlineSize/2);
            ctx.lineTo(bingoCanvas.current.height, i * cellWidth-gridlineSize/2);                    
        }                    
    }

    ctx.strokeStyle = gridColor; // Gridlines color
    ctx.stroke();                        
                        
    // Draw bingo title
    ctx.font = fontWeightPicker +' 28px adobe clean';    
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle'; 
            
    ctx.fillStyle = titleColor; // title font color                       
    let bingoTitle = ['B','I','N','G','O'];
    for (let charCnt = 0; charCnt < bingoTitle.length; charCnt++) {
        let letter = bingoTitle[charCnt];
        ctx.fillText(letter, charCnt * cellWidth + cellWidth / 2, cellHeight / 2 + 6);                
    }       
    
    // Fill in the card with random numbers and a free space if checked
    const freeSpace = [3, 2]; // Coordinates of the FREE space
    const numbers = [];
    const usedNumbers = new Set(); // Track used numbers
    ctx.font = fontWeightPicker +' 22px adobe clean';
    ctx.fillStyle = fgColor; // color of the foreground (numbers)                 
            
    for (let i = 1; i < numRows; i++) {
        numbers[i] = [];
        for (let j = 0; j < numCols; j++) {
            if (freeSpaceToggle) {
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
    if (freeSpaceToggle) {
        ctx.font = fontWeightPicker +' 20px adobe clean';     
        ctx.fillText("FREE", freeSpace[1] * cellWidth + cellWidth / 2 - 3, freeSpace[0] * cellHeight + cellHeight / 2 + 3);            
    }    
        
    // Enable drag and drop for the card
    addOnUISdk.app.enableDragToDocument(bingoCanvas.current, {
        previewCallback: el => new URL(bingoCanvas.current.toDataURL()),
        completionCallback: async el => {
            const r = await fetch(bingoCanvas.current.toDataURL());
            const blob = await r.blob();
            return [{blob}];
        }
    })        

    // Enable add card button
    setAddToPageEnabled(true);        
}

// Trigger click on the native color picker input for each
function onBgColorClick(e) {
    bgColorInput.current.click();
}

function onFgColorClick(e) {        
    fgColorInput.current.click();
}

function onTitleColorClick(e) {        
    titleColorInput.current.click();
}

function onGridColorClick(e) {        
    gridColorInput.current.click();
}

// Update the state values with the color selected from the native color picker for each
function onFgColorChange(e) {        
    setFgColorSwatch(e.target.value);
    setFgColor(e.target.value);        
}    

function onBgColorChange(e) {        
    setBgColorSwatch(e.target.value);
    setBgColor(e.target.value);        
}

function onTitleColorChange(e) {        
    setTitleColorSwatch(e.target.value);
    setTitleColor(e.target.value);        
}        

function onGridColorChange(e) {        
    setGridColorSwatch(e.target.value);
    setGridColor(e.target.value);        
}

async function handleAddToPage() {
    try {
        const blob = await new Promise((resolve, reject) => {
            bingoCanvas.current.toBlob(blob => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to create blob from canvas"));
                }
            });
        });
        await addOnUISdk.app.document.addImage(blob);
    } catch (error) {
        console.error("Error adding image to document:", error);
    }
}
```

**IMPORTANT!:**

Since you're using the React `useRef` to get references to some of the components, you'll need to add it to the import at the top of your `App.jsx`, along with the `useState` that's currently included. So the result of the import section would look like:

```js
// UI Runtime Context - src/components/App.jsx imports
import React, { useState, useRef } from "react"; /* add useRef here */
import "./App.css";                              /* already existed */
import { WC } from "./WC.jsx";                   /* you added in prior step */
```

### Step 7: Style Your UI

**Context:** This code goes in your **UI layer** (`src/components/App.css` file).

If you run your add-on project now with `npm run build; npm run start` (or if it was already running and automatically refreshed), you should see something like the following:

![Basic react add-on screenshot](../images/lesson2-prestyle.png)

Similar to lesson 1, the component layout needs improvement. The swc-react components have built-in styling, but we need to add layout and spacing.

**Q:** Why doesn't the UI look good without additional CSS?

**A:** swc-react components have built-in styling for appearance but don't include layout utilities. You need to add CSS for positioning, spacing, and responsive behavior.

**Q:** Where should I put the CSS?

**A:** In the `src/components/App.css` file, which is already imported in your App.jsx component.

Open the `src/components/App.css` file and replace the current contents with the following custom type, class and id selectors for your UI:

```css
/* UI Runtime Context - src/components/App.css */
sp-theme {
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
    width: var(--spectrum-global-dimension-static-size-2800);
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

## Troubleshooting FAQ

### Common Issues and Solutions

**Q:** My swc-react components aren't rendering. What's wrong?

**A:** Check these common issues:
1. Ensure all @swc-react packages are the same version (0.39.4)
2. Verify you've imported the components correctly
3. Make sure you're using the `<Theme>` wrapper
4. Check the browser console for specific errors

**Q:** Events like onChange aren't firing. How do I fix this?

**A:** Use the `<WC>` wrapper component around swc-react components that need event handling:
```jsx
// UI Runtime Context - src/components/App.jsx JSX
<WC onChange={yourHandler}>
  <Slider value={yourValue} />
</WC>
```

**Q:** I'm getting "Cannot read property of undefined" errors. What should I check?

**A:** Common causes:
1. Missing `useRef` import: `import { useState, useRef } from "react"`
2. Undefined state variables - ensure all useState hooks are properly initialized
3. Accessing refs before they're mounted - add null checks

**Q:** How is this different from the vanilla JavaScript approach in Lesson 1?

**A:** Key differences:
- **State Management**: React hooks (`useState`) vs manual DOM manipulation
- **Component Architecture**: JSX components vs HTML templates
- **Event Handling**: React event props vs `addEventListener`
- **Styling**: CSS classes vs inline styles and direct DOM manipulation

## Next Steps

Congratulations! You've successfully built a React-based Adobe Express add-on using swc-react components. You now understand how to:

- Set up a React add-on project with swc-react
- Handle the differences between swc-react and vanilla Spectrum Web Components
- Manage state and events in a React add-on
- Integrate with the Adobe Express Add-on SDK

For more advanced topics, consider exploring:
- [Document API concepts](../../learn/platform_concepts/document-api.md)
- [Advanced UI patterns](../../learn/how_to/)
- [Publishing your add-on](../../guides/getting_started/dev_tooling.md)
