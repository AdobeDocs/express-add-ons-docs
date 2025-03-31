# Module 2: Basic Implementation with Spectrum Web Components

## Overview
This module covers the fundamental implementation of Spectrum Web Components in Express add-ons. You'll learn how to implement both vanilla JavaScript and React-based solutions, understand component composition, and master basic theming.

## Learning Objectives
- Implement basic Spectrum components
- Understand component composition
- Master theming and styling
- Learn about component lifecycle
- Handle basic user interactions

## Time Estimate
8-10 hours

## Prerequisites
- Completed Module 1: Foundation
- Basic understanding of JavaScript/React
- Development environment set up

## Content Structure

### 1. Vanilla JavaScript Implementation

#### Basic Component Setup
```javascript
// src/index.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Import Spectrum components
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/textfield/sp-textfield.js';

addOnUISdk.ready.then(() => {
    const container = document.createElement('div');
    container.innerHTML = `
        <sp-theme scale="medium" color="light" theme="express">
            <div class="container">
                <sp-textfield id="input" placeholder="Enter text"></sp-textfield>
                <sp-button variant="primary">Submit</sp-button>
            </div>
        </sp-theme>
    `;
    document.body.appendChild(container);
});
```

#### Understanding Component Structure
- Each Spectrum component is a web component
- Components use Shadow DOM for encapsulation
- Theme context is required for proper styling
- Components follow Spectrum design patterns

### 2. React Implementation

#### Basic React Setup
```jsx
// src/App.jsx
import { Theme, Button, TextField } from '@swc-react';

function App() {
    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <TextField id="input" placeholder="Enter text" />
                <Button variant="primary">Submit</Button>
            </div>
        </Theme>
    );
}
```

#### React Component Patterns
- Components follow React conventions
- Props map to Spectrum attributes
- Events use React naming conventions
- State management follows React patterns

### 3. Component Composition

#### Building Complex Components
```jsx
// src/components/Form.jsx
import { Theme, TextField, Button, FieldLabel } from '@swc-react';

function Form() {
    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="form-container">
                <FieldLabel for="username">Username</FieldLabel>
                <TextField id="username" />
                <Button variant="primary">Submit</Button>
            </div>
        </Theme>
    );
}
```

#### Component Hierarchy
- Theme wrapper at the root
- Layout components for structure
- Form components for input
- Action components for interactions

### 4. Styling and Layout

#### Using Spectrum CSS Variables
```css
/* src/styles/custom.css */
.container {
    display: flex;
    flex-direction: column;
    gap: var(--spectrum-global-dimension-size-200);
    padding: var(--spectrum-global-dimension-size-250);
}

.form-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spectrum-global-dimension-size-200);
}
```

#### Layout Best Practices
- Use Spectrum spacing variables
- Follow responsive design patterns
- Maintain consistent spacing
- Use grid and flexbox appropriately

### 5. Event Handling

#### Vanilla JavaScript Events
```javascript
const button = document.querySelector('sp-button');
button.addEventListener('click', (e) => {
    console.log('Button clicked');
});
```

#### React Events
```jsx
function ButtonExample() {
    const handleClick = () => {
        console.log('Button clicked');
    };

    return (
        <Button onClick={handleClick}>
            Click me
        </Button>
    );
}
```

## Exercises

1. **Basic Component Implementation**
   - Create a simple form using Spectrum components
   - Implement basic event handling
   - Test component rendering

2. **Component Composition**
   - Build a complex component using multiple Spectrum components
   - Implement proper component hierarchy
   - Test component interactions

3. **Styling Practice**
   - Create a responsive layout using Spectrum CSS variables
   - Implement custom styling while maintaining Spectrum design
   - Test across different screen sizes

## Common Issues and Solutions

1. **Component Not Rendering**
   - Check theme wrapper implementation
   - Verify component imports
   - Check browser console for errors

2. **Styling Issues**
   - Ensure proper theme context
   - Check CSS variable usage
   - Verify component hierarchy

3. **Event Handling Problems**
   - Check event naming conventions
   - Verify event listener attachment
   - Test event propagation

## Resources
- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/)
- [SWC React Documentation](https://opensource.adobe.com/spectrum-web-components/using-swc-react/)
- [Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/docs/)

## Next Module
[Module 3: Advanced Features](../03-advanced-features/index.md)