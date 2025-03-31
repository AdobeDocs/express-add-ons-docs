# Module 3: Advanced Features and Best Practices

## Overview
This module covers advanced features of Spectrum Web Components, including complex component patterns, performance optimization, accessibility implementation, and production-ready practices.

## Learning Objectives
- Implement complex component patterns
- Optimize performance and bundle size
- Ensure accessibility compliance
- Handle advanced theming scenarios
- Implement production-ready practices

## Time Estimate
10-12 hours

## Prerequisites
- Completed Module 2: Basic Implementation
- Understanding of component lifecycle
- Basic knowledge of performance optimization

## Content Structure

### 1. Advanced Component Patterns

#### Custom Component Creation
```javascript
// src/components/CustomCard.js
import { LitElement, html, css } from 'lit';
import '@spectrum-web-components/theme/sp-theme.js';

export class CustomCard extends LitElement {
    static properties = {
        title: { type: String },
        content: { type: String },
        variant: { type: String }
    };

    static styles = css`
        :host {
            display: block;
            padding: var(--spectrum-global-dimension-size-200);
        }
    `;

    render() {
        return html`
            <sp-theme scale="medium" color="light" theme="express">
                <div class="card ${this.variant}">
                    <h3 class="spectrum-heading spectrum-heading--S">${this.title}</h3>
                    <div class="content">${this.content}</div>
                </div>
            </sp-theme>
        `;
    }
}

customElements.define('custom-card', CustomCard);
```

#### Component Communication
```jsx
// src/components/FormContainer.jsx
import { useState } from 'react';
import { Theme, TextField, Button } from '@adobe/swc-react';

function FormContainer() {
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="form-container">
                <TextField
                    label="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <TextField
                    label="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </Theme>
    );
}
```

### 2. Performance Optimization

#### Code Splitting
```javascript
// Lazy load components
const Dialog = React.lazy(() => import('@spectrum-web-components-react/dialog'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dialog>
                {/* Dialog content */}
            </Dialog>
        </Suspense>
    );
}
```

#### Bundle Optimization
```javascript
// webpack.config.js optimization
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
            cacheGroups: {
                spectrum: {
                    test: /[\\/]node_modules[\\/]@spectrum-web-components[\\/]/,
                    name: 'spectrum',
                    chunks: 'all'
                }
            }
        }
    }
}
```

### 3. Accessibility Implementation

#### ARIA Attributes
```jsx
// src/components/AccessibleForm.jsx
import { Theme, TextField, Button } from '@adobe/swc-react';

function AccessibleForm() {
    return (
        <Theme theme="express" scale="medium" color="light">
            <form role="form" aria-label="User Information">
                <TextField
                    label="Username"
                    aria-required="true"
                    aria-describedby="username-help"
                />
                <div id="username-help" className="spectrum-help-text">
                    Enter your username
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Theme>
    );
}
```

#### Keyboard Navigation
```javascript
// src/components/KeyboardNav.js
class KeyboardNav extends LitElement {
    static properties = {
        items: { type: Array }
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowDown':
                // Handle down navigation
                break;
            case 'ArrowUp':
                // Handle up navigation
                break;
            case 'Enter':
                // Handle selection
                break;
        }
    }
}
```

### 4. Advanced Theming

#### Dynamic Theme Switching
```javascript
// src/utils/themeManager.js
export class ThemeManager {
    static async setTheme(themeName) {
        const themeElement = document.querySelector('sp-theme');
        if (themeElement) {
            themeElement.setAttribute('theme', themeName);
            // Dispatch custom event for theme change
            document.dispatchEvent(new CustomEvent('theme-changed', {
                detail: { theme: themeName }
            }));
        }
    }
}
```

#### Custom Theme Variables
```css
/* src/styles/custom-theme.css */
:root {
    --custom-primary: var(--spectrum-global-color-blue-600);
    --custom-secondary: var(--spectrum-global-color-gray-600);
    --custom-spacing: var(--spectrum-global-dimension-size-200);
}

.custom-component {
    background-color: var(--custom-primary);
    padding: var(--custom-spacing);
}
```

### 5. Production Readiness

#### Error Boundaries
```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';
import { Theme, Banner } from '@adobe/swc-react';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Theme theme="express" scale="medium" color="light">
                    <Banner variant="negative">
                        Something went wrong. Please try again.
                    </Banner>
                </Theme>
            );
        }
        return this.props.children;
    }
}
```

#### Performance Monitoring
```javascript
// src/utils/performance.js
export const measurePerformance = (componentName) => {
    const start = performance.now();
    return () => {
        const end = performance.now();
        console.log(`${componentName} render time: ${end - start}ms`);
        // Send to analytics
    };
};
```

## Exercises

1. **Advanced Component Development**
   - Create a custom component using LitElement
   - Implement component communication
   - Add accessibility features

2. **Performance Optimization**
   - Implement code splitting
   - Optimize bundle size
   - Monitor performance metrics

3. **Production Readiness**
   - Add error boundaries
   - Implement performance monitoring
   - Test across different scenarios

## Common Issues and Solutions

1. **Performance Issues**
   - Monitor bundle size
   - Implement code splitting
   - Use performance profiling tools

2. **Accessibility Problems**
   - Test with screen readers
   - Verify keyboard navigation
   - Check ARIA attributes

3. **Theme Issues**
   - Verify theme context
   - Check CSS variable usage
   - Test theme switching

## Resources
- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/)
- [SWC React Documentation](https://opensource.adobe.com/spectrum-web-components/using-swc-react/)
- [Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/docs/)
