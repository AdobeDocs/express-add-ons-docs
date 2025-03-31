# Using the Spectrum Design System in Adobe Express Add-ons

## 1. Introduction

The Spectrum Design System is Adobe's design language that ensures consistent, accessible, and visually cohesive user interfaces across Adobe products. For Adobe Express add-ons, Spectrum provides:

- A comprehensive set of pre-built UI components
- Built-in accessibility features
- Consistent theming and styling
- Responsive design patterns
- Performance optimized components

### Benefits of Using Spectrum Web Components

- **Framework Agnostic**: Works with any JavaScript framework or vanilla JS
- **Built-in Express Theme**: Matches Adobe Express's visual style
- **Accessibility**: ARIA support and keyboard navigation included
- **Performance**: Lightweight and optimized components
- **Standards Based**: Built on Web Components specifications

### When to Use Different Spectrum Libraries

1. **Spectrum Web Components (Recommended)**
   - For new Adobe Express add-ons
   - When framework independence is important
   - When you need the Express theme
   
2. **swc-react**
   - For React-based add-ons
   - When you want React-like component usage
   - When you need React event handling

3. **Spectrum CSS**
   - For simple UI elements
   - When you only need basic styling
   - For custom component development

## 2. Setting Up a Project

### Installation for Vanilla JavaScript

```bash
# Install core dependencies
npm install @spectrum-web-components/theme
npm install @spectrum-web-components/styles

# Install commonly used components
npm install @spectrum-web-components/button
npm install @spectrum-web-components/field-label
npm install @spectrum-web-components/textfield
```

### Installation for React

```bash
# Install core dependencies
npm install @swc-react/theme
npm install @swc-react/styles
npm install @swc-react/button
npm install @swc-react/field-label
npm install @swc-react/textfield
```

### Basic Project Structure

```
my-addon/
├── src/
│   ├── index.html
│   ├── index.js
│   └── styles.css
├── package.json
└── webpack.config.js
```

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

## 3. Using Spectrum for Themes, Layout, Typography, and Components

### Theme Setup

```javascript
// index.js
import '@spectrum-web-components/styles/typography.css';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
```

```html
<!-- index.html -->
<sp-theme scale="medium" color="light" theme="express">
    <!-- Your add-on content goes here -->
</sp-theme>
```

### Typography and Layout

```html
<!-- Typography examples -->
<h1 class="spectrum-heading spectrum-heading--L">Large Heading</h1>
<p class="spectrum-body spectrum-body--M">Medium body text</p>

<!-- Layout using Spectrum CSS variables -->
<div style="padding: var(--spectrum-global-dimension-size-200)">
    <div style="margin-bottom: var(--spectrum-global-dimension-size-300)">
        <!-- Content -->
    </div>
</div>
```

### Common Components

```javascript
// Import components
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
```

```html
<!-- Using components -->
<sp-field-label for="name">Name</sp-field-label>
<sp-textfield id="name" placeholder="Enter your name"></sp-textfield>
<sp-button variant="primary">Submit</sp-button>
```

## 4. Add-on Example: Content Manager

### Vanilla JavaScript Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Content Manager Add-on</title>
    <style>
        .content-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spectrum-global-dimension-size-200);
            padding: var(--spectrum-global-dimension-size-200);
        }
        
        .content-card {
            border: 1px solid var(--spectrum-global-color-gray-200);
            border-radius: var(--spectrum-global-rounding-medium);
            padding: var(--spectrum-global-dimension-size-200);
        }
    </style>
</head>
<body>
    <sp-theme scale="medium" color="light" theme="express">
        <div class="content-manager">
            <h2 class="spectrum-heading spectrum-heading--M">Content Manager</h2>
            
            <div class="search-section">
                <sp-field-label for="search">Search Content</sp-field-label>
                <sp-textfield id="search" placeholder="Search..."></sp-textfield>
            </div>
            
            <div class="content-grid" id="contentGrid"></div>
            
            <sp-button id="addContent" variant="primary">Add Content</sp-button>
        </div>
    </sp-theme>
    
    <script type="module">
        import '@spectrum-web-components/theme/sp-theme.js';
        import '@spectrum-web-components/button/sp-button.js';
        import '@spectrum-web-components/textfield/sp-textfield.js';
        import '@spectrum-web-components/field-label/sp-field-label.js';
        
        // Initialize AddOnSDK
        addOnUISdk.ready.then(() => {
            const searchField = document.getElementById('search');
            const addButton = document.getElementById('addContent');
            const contentGrid = document.getElementById('contentGrid');
            
            // Enable drag and drop
            addOnUISdk.app.enableDragToDocument(contentGrid);
            
            // Handle theme changes
            addOnUISdk.app.on("themechange", (data) => {
                const theme = document.querySelector('sp-theme');
                theme.setAttribute('color', data.theme);
            });
        });
    </script>
</body>
</html>
```

### React Implementation (using swc-react)

```jsx
import React, { useEffect, useState } from 'react';
import { Theme } from '@swc-react/theme';
import { Button } from '@swc-react/button';
import { TextField } from '@swc-react/textfield';
import { FieldLabel } from '@swc-react/field-label';

function ContentManager({ addOnUISdk }) {
    const [theme, setTheme] = useState('light');
    
    useEffect(() => {
        // Listen for theme changes
        addOnUISdk.app.on("themechange", (data) => {
            setTheme(data.theme);
        });
        
        // Enable drag and drop
        const contentGrid = document.getElementById('contentGrid');
        addOnUISdk.app.enableDragToDocument(contentGrid);
    }, []);
    
    return (
        <Theme theme="express" scale="medium" color={theme}>
            <div className="content-manager">
                <h2 className="spectrum-heading spectrum-heading--M">
                    Content Manager
                </h2>
                
                <div className="search-section">
                    <FieldLabel htmlFor="search">Search Content</FieldLabel>
                    <TextField id="search" placeholder="Search..." />
                </div>
                
                <div className="content-grid" id="contentGrid">
                    {/* Content items */}
                </div>
                
                <Button variant="primary">Add Content</Button>
            </div>
        </Theme>
    );
}

export default ContentManager;
```

## 5. What's New in Spectrum 2

### Key Updates

1. **Visual Language**
   - Refined color palette with improved contrast
   - Updated typography system
   - New iconography style
   
2. **Component Updates**
   - Redesigned component variants
   - Improved interaction patterns
   - New animation standards
   
3. **Accessibility Improvements**
   - Enhanced color contrast ratios
   - Improved keyboard navigation
   - Better screen reader support

### Express Theme vs Spectrum 2

For Adobe Express add-ons, continue using the Express theme until Adobe Express adopts Spectrum 2. The Express theme ensures visual consistency with the current Adobe Express interface.

## 6. Tips and Troubleshooting

### Common Issues and Solutions

1. **Certificate Issues in Development**
   ```bash
   # Reset development certificates
   rm -rf ~/Library/Application\ Support/devcert   # Mac
   rd /s /q %APPDATA%\Local\devcert               # Windows
   ```

2. **Component Rendering Issues**
   - Ensure all components are properly imported
   - Check that components are within `<sp-theme>`
   - Verify component versions match

3. **Theme Not Applied**
   ```html
   <!-- Correct -->
   <sp-theme scale="medium" color="light" theme="express">
       <sp-button>Themed Button</sp-button>
   </sp-theme>
   
   <!-- Incorrect -->
   <sp-button>Unthemed Button</sp-button>
   ```

### Performance Optimization

```javascript
// Lazy load components
async function loadDialog() {
    const { Dialog } = await import('@swc-react/dialog');
    return Dialog;
}

// Use when needed
const Dialog = await loadDialog();
```

## 7. Resources

- [Spectrum Design System](https://spectrum.adobe.com/)
- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/)
- [Adobe Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/docs/)
- [Spectrum Web Components GitHub](https://github.com/adobe/spectrum-web-components)
- [Adobe Express UX Guidelines](https://xd.adobe.com/view/urn:aaid:sc:US:fd638450-1af8-49c3-ad29-0e76c2a2136f/)
- [Spectrum Tokens Visualizer](https://opensource.adobe.com/spectrum-tokens/visualizer/) 