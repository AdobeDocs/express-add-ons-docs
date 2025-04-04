# Comprehensive Guide: Using Spectrum and Spectrum Web Components in Adobe Express Add-ons

## Introduction

Adobe Spectrum provides a unified design system for creating consistent, accessible user experiences across Adobe applications. For Adobe Express add-on developers, implementing Spectrum ensures that your add-on visually integrates seamlessly with the Adobe Express interface, providing a familiar and cohesive experience for users.

This guide will walk you through implementing Spectrum in your Adobe Express add-ons using Spectrum Web Components (SWC), helping you make informed decisions about theming, layout, typography, and component selection. We'll provide practical examples and troubleshooting tips for common issues.

## Spectrum Design System Overview

Adobe Spectrum consists of several key parts:

- Spectrum Design Language: The foundational visual and interaction design principles
- Spectrum CSS: Implementation in CSS and HTML  
- Spectrum Web Components: Web components that encapsulate Spectrum design patterns
- swc-react: React wrappers for Spectrum Web Components

Each has its specific use cases in add-on development:

| Library | Best Used For | When to Use |
|---------|--------------|-------------|
| Spectrum Design Language | Reference for visual design principles | During UI/UX design phase |
| Spectrum CSS | Custom UI elements, styling non-component elements | When you need fine-grained control over styling |
| Spectrum Web Components | Standard UI components with built-in behavior | Most add-on UI development (recommended) |
| swc-react | Component-based React applications | When building with React |

## Setting Up Your Add-on with Spectrum

### Install the Required Dependencies

#### For plain JavaScript implementations:

```bash
npm install @spectrum-web-components/theme
npm install @spectrum-web-components/styles
```

#### For React-based implementations:

```bash
npm install @swc-react/theme
npm install @swc-react/styles
```

### Basic Setup in HTML and JavaScript

First, import the necessary theme components in your JavaScript file:

```javascript
// Theme and typography imports
import '@spectrum-web-components/styles/typography.css';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
```

Then, wrap your add-on content with the theme component in your HTML:

```html
<sp-theme scale="medium" color="light" theme="express">
    <!-- Your add-on UI components go here -->
</sp-theme>
```

### Complete Base Template Example

Here's a complete example of a basic add-on setup with Spectrum Web Components:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adobe Express Add-on</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <sp-theme scale="medium" color="light" theme="express">
        <div class="add-on-container">
            <h1 class="spectrum-heading spectrum-heading--L">My Add-on</h1>
            <sp-button variant="primary" id="actionButton">Perform Action</sp-button>
        </div>
    </sp-theme>
    <script type="module" src="index.js"></script>
</body>
</html>
```

```javascript
// index.js
// Import Adobe Express Add-on SDK
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
 
// Import Spectrum components
import '@spectrum-web-components/styles/typography.css';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/button/sp-button.js';

// Initialize the add-on
addOnUISdk.ready.then(() => {
    console.log("Add-on initialized");
    document.getElementById('actionButton').addEventListener('click', () => {
        console.log("Button clicked");
    });
});
```

## Theming in Spectrum

Spectrum offers a comprehensive theming system that ensures consistent appearance across different contexts. For Adobe Express add-ons, proper theming is essential for seamless integration.

### Theme Configuration

The `<sp-theme>` element has three key attributes:

1. `theme`: Specifies the design theme (use `"express"` for Adobe Express add-ons)
2. `color`: Sets the color scheme (`"light"` or `"dark"`)
3. `scale`: Controls the UI density (`"medium"` or `"large"`)

For Adobe Express add-ons, use:

```html
<sp-theme scale="medium" color="light" theme="express">
    <!-- Add-on content -->
</sp-theme>
```

### Theme CSS Variables

Spectrum provides CSS variables for consistent styling. Use these instead of hardcoding colors or sizes:

```css
:root {
    /* Use Spectrum variables for styling */
    background-color: var(--spectrum-global-color-gray-50);
    color: var(--spectrum-global-color-gray-800);
    padding: var(--spectrum-global-dimension-size-250);
}
```

### Supporting Theme Changes

Adobe Express currently only supports a light theme, but it's good practice to prepare for future dark theme support:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Function to apply theme changes
function applyTheme(themeName) {
    const themeElement = document.querySelector('sp-theme');
    if (themeName === 'dark') {
        themeElement.setAttribute('color', 'dark');
    } else {
        themeElement.setAttribute('color', 'light');
    }
}

// Listen for theme changes
addOnUISdk.app.on("themechange", (data) => {
    applyTheme(data.theme);
});
```

## Typography, Layout, and Spacing

### Typography

Spectrum provides CSS classes for typography that ensure consistency with Adobe Express.

```html
<!-- Headings -->
<h1 class="spectrum-heading spectrum-heading--L">Large Heading</h1>
<h2 class="spectrum-heading spectrum-heading--M">Medium Heading</h2>
<h3 class="spectrum-heading spectrum-heading--S">Small Heading</h3>

<!-- Body text -->
<p class="spectrum-body spectrum-body--M">Medium body text</p>
<p class="spectrum-body spectrum-body--S">Small body text</p>

<!-- Detail text -->
<p class="spectrum-detail spectrum-detail--M">Medium detail text</p>
```

### Layout and Spacing

Use Spectrum CSS variables for consistent spacing:

```css
.add-on-container {
    display: flex;
    flex-direction: column;
    gap: var(--spectrum-global-dimension-size-200);
    padding: var(--spectrum-global-dimension-size-250);
}

.section {
    margin-bottom: var(--spectrum-global-dimension-size-300);
}

.input-group {
    display: flex;
    align-items: center;
    gap: var(--spectrum-global-dimension-size-100);
}
```

### Grid Layout

For complex layouts, Spectrum provides a grid system:

```html
<div class="spectrum-grid">
    <div class="spectrum-grid-item spectrum-grid-item--col-span-4">Item 1</div>
    <div class="spectrum-grid-item spectrum-grid-item--col-span-4">Item 2</div>
    <div class="spectrum-grid-item spectrum-grid-item--col-span-4">Item 3</div>
</div>
```

## Component Selection Guide

Spectrum Web Components provides numerous UI components. Here's a guide to the most commonly used ones in add-ons:

| Component | Import Statement | Use Case |
|-----------|------------------|----------|
| Button | `import '@spectrum-web-components/button/sp-button.js';` | Primary actions |
| Slider | `import '@spectrum-web-components/slider/sp-slider.js';` | Selecting values from a range |
| Textfield | `import '@spectrum-web-components/textfield/sp-textfield.js';` | Text input |
| Dropdown | `import '@spectrum-web-components/dropdown/sp-dropdown.js';` | Selection from options |
| Checkbox | `import '@spectrum-web-components/checkbox/sp-checkbox.js';` | Boolean selections |
| Radio | `import '@spectrum-web-components/radio/sp-radio.js';` | Mutually exclusive options |
| Card | `import '@spectrum-web-components/card/sp-card.js';` | Content containers |
| Progress Circle | `import '@spectrum-web-components/progress-circle/sp-progress-circle.js';` | Loading indicators |
| Dialog | `import '@spectrum-web-components/dialog/sp-dialog.js';` | Modal interfaces |
| Tabs | `import '@spectrum-web-components/tabs/sp-tabs.js';` | Tabbed navigation |

### Choosing Between Standard HTML and Spectrum Components

Use Spectrum Web Components when:

- The component matches a standard Spectrum UI pattern
- You need built-in accessibility features
- You want automatic theme support

Use standard HTML with Spectrum CSS classes when:

- You need a highly customized UI element
- The component isn't available in Spectrum Web Components
- Performance is critical for your specific use case

## Practical Example: Content Library Add-on

Let's build a content library add-on that demonstrates Spectrum Web Components in action:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Content Library Add-on</title>
    <style>
        .add-on-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: var(--spectrum-global-dimension-size-200);
        }
        
        .header {
            margin-bottom: var(--spectrum-global-dimension-size-300);
        }
        
        .search-container {
            margin-bottom: var(--spectrum-global-dimension-size-200);
            display: flex;
            gap: var(--spectrum-global-dimension-size-100);
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spectrum-global-dimension-size-200);
            overflow-y: auto;
            flex-grow: 1;
        }
        
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--spectrum-global-color-gray-600);
            text-align: center;
        }
    </style>
</head>
<body>
    <content-library-app></content-library-app>
    <script type="module" src="index.js"></script>
</body>
</html>
```

And here's the JavaScript to accompany it:

```javascript
import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { ref, createRef } from 'lit/directives/ref.js';
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Theme and typography imports
import '@spectrum-web-components/styles/typography.css';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';

// Component imports
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-search.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import '@spectrum-web-components/toast/sp-toast.js';
import '@spectrum-web-components/dialog/sp-dialog.js';

// Mock content data
const contentItems = [
    { 
        id: 1, 
        type: 'image', 
        title: 'Mountain Landscape', 
        thumbnail: 'https://placehold.co/400x300/2c6a90/FFFFFF?text=Mountain+Landscape',
        imageUrl: 'https://placehold.co/800x600/2c6a90/FFFFFF?text=Mountain+Landscape',
        author: 'Adobe Express Add-on'
    },
    { 
        id: 2, 
        type: 'template', 
        title: 'Business Card', 
        thumbnail: 'https://placehold.co/400x300/902c6a/FFFFFF?text=Business+Card',
        imageUrl: 'https://placehold.co/800x600/902c6a/FFFFFF?text=Business+Card',
        author: 'Adobe Express Add-on'
    },
    { 
        id: 3, 
        type: 'graphic', 
        title: 'Abstract Shape', 
        thumbnail: 'https://placehold.co/400x300/6a902c/FFFFFF?text=Abstract+Shape',
        imageUrl: 'https://placehold.co/800x600/6a902c/FFFFFF?text=Abstract+Shape',
        author: 'Adobe Express Add-on'
    },
    { 
        id: 4, 
        type: 'image', 
        title: 'Beach Sunset', 
        thumbnail: 'https://placehold.co/400x300/902c2c/FFFFFF?text=Beach+Sunset',
        imageUrl: 'https://placehold.co/800x600/902c2c/FFFFFF?text=Beach+Sunset',
        author: 'Adobe Express Add-on'
    }
];

class ContentLibraryApp extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 100%;
        }
        
        .add-on-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: var(--spectrum-global-dimension-size-200);
        }
        
        .header {
            margin-bottom: var(--spectrum-global-dimension-size-300);
        }
        
        .search-container {
            margin-bottom: var(--spectrum-global-dimension-size-200);
            display: flex;
            gap: var(--spectrum-global-dimension-size-100);
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spectrum-global-dimension-size-200);
            overflow-y: auto;
            flex-grow: 1;
        }
        
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--spectrum-global-color-gray-600);
            text-align: center;
        }
        
        sp-textfield,
        sp-picker {
            width: 100%;
        }
        
        .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: var(--spectrum-global-dimension-size-250);
        }
        
        sp-progress-circle {
            margin-bottom: var(--spectrum-global-dimension-size-200);
        }
    `;

    static properties = {
        recentItems: { type: Array },
        favoriteItems: { type: Array },
        filteredItems: { type: Array },
        searchTerm: { type: String },
        selectedType: { type: String },
        activeTab: { type: String },
        showEmptyState: { type: Boolean },
        loading: { type: Boolean },
        currentTheme: { type: String }
    };

    contentGridRef = createRef();
    searchInputRef = createRef();
    contentTypePickerRef = createRef();
    toastRef = createRef();
    dialogRef = createRef();

    constructor() {
        super();
        this.recentItems = [];
        this.favoriteItems = [];
        this.filteredItems = [];
        this.searchTerm = '';
        this.selectedType = 'all';
        this.activeTab = 'tab-1';
        this.showEmptyState = false;
        this.loading = false;
        this.currentTheme = 'light';
        
        this.initializeAddon();
    }

    async initializeAddon() {
        await addOnUISdk.ready;
        
        // Set theme
        this.currentTheme = addOnUISdk.app.ui.theme || 'light';
        
        // Load recently viewed items from client storage
        await this.loadRecentlyViewedItems();
        
        // Set up drag and drop
        this.setupDragAndDrop();
        
        // Listen for theme changes
        addOnUISdk.app.on("themechange", (data) => {
            this.currentTheme = data.theme;
        });
    }

    async loadRecentlyViewedItems() {
        try {
            this.recentItems = await addOnUISdk.instance.clientStorage.getItem('recentItems') || [];
            this.updateFilteredItems();
        } catch (error) {
            console.error('Error loading from client storage:', error);
            this.recentItems = [...contentItems];
            this.updateFilteredItems();
        }
    }

    async saveRecentlyViewedItem(item) {
        try {
            // Get existing recently viewed items
            let recentItems = [...this.recentItems];
            
            // Add new item at the beginning (or move to beginning if already exists)
            recentItems = recentItems.filter(i => i.id !== item.id);
            recentItems.unshift(item);
            
            // Keep only the last 10 items
            if (recentItems.length > 10) {
                recentItems = recentItems.slice(0, 10);
            }
            
            // Save back to storage
            await addOnUISdk.instance.clientStorage.setItem('recentItems', recentItems);
            
            // Update recent items list if it's the active tab
            this.recentItems = recentItems;
            if (this.activeTab === 'tab-1') {
                this.updateFilteredItems();
            }
        } catch (error) {
            console.error('Error saving to client storage:', error);
        }
    }

    updateFilteredItems() {
        const sourceItems = this.activeTab === 'tab-1' ? this.recentItems : this.favoriteItems;
        
        // Apply filters
        this.filteredItems = sourceItems.filter(item => {
            const matchesSearch = !this.searchTerm || 
                item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesType = this.selectedType === 'all' || 
                item.type === this.selectedType;
            return matchesSearch && matchesType;
        });
        
        this.showEmptyState = this.filteredItems.length === 0;
    }

    setupDragAndDrop() {
        // Wait for the contentGrid to be rendered
        if (this.contentGridRef.value) {
            addOnUISdk.app.enableDragToDocument(this.contentGridRef.value, {
                previewCallback: (element) => {
                    const itemId = element.dataset.itemId;
                    const item = this.findItemById(itemId);
                    if (!item) return null;
                    
                    return {
                        width: 400,
                        height: 300,
                        thumbnail: item.thumbnail
                    };
                },
                completionCallback: async (element) => {
                    const itemId = element.dataset.itemId;
                    const item = this.findItemById(itemId);
                    if (item) {
                        await this.addToDocument(item);
                    }
                }
            });
        } else {
            // Try again on next render if the grid isn't ready
            setTimeout(() => this.setupDragAndDrop(), 100);
        }
    }

    findItemById(id) {
        // Look in all possible sources
        return [...contentItems, ...this.recentItems, ...this.favoriteItems]
            .find(item => item.id.toString() === id);
    }

    async addToDocument(item) {
        this.loading = true;
        this.requestUpdate();
        
        try {
            // Fetch the image and convert to blob
            const response = await fetch(item.imageUrl);
            const imageBlob = await response.blob();
            
            // Add image to document using the SDK
            await addOnUISdk.app.document.addImage(imageBlob, {
                title: item.title,
                author: item.author
            });
            
            // Store this item in recently viewed
            await this.saveRecentlyViewedItem(item);
            
            // Show success toast
            this.showToast(`${item.title} added to document`, 'positive');
        } catch (error) {
            console.error('Error adding content:', error);
            this.showToast(`Error adding content: ${error.message}`, 'negative');
        } finally {
            this.loading = false;
        }
    }

    showToast(message, variant = 'positive') {
        const toast = document.createElement('sp-toast');
        toast.setAttribute('variant', variant);
        toast.setAttribute('open', '');
        toast.textContent = message;
        this.shadowRoot.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    handleSearchInput(e) {
        this.searchTerm = e.target.value;
        this.updateFilteredItems();
    }

    handleTypeChange(e) {
        this.selectedType = e.target.value;
        this.updateFilteredItems();
    }

    handleClearFilters() {
        this.searchTerm = '';
        this.selectedType = 'all';
        
        if (this.searchInputRef.value) {
            this.searchInputRef.value.value = '';
        }
        
        if (this.contentTypePickerRef.value) {
            this.contentTypePickerRef.value.value = 'all';
        }
        
        this.updateFilteredItems();
    }

    handleTabChange(e) {
        this.activeTab = e.target.selected;
        this.updateFilteredItems();
        
        // Re-establish drag and drop on tab change
        this.setupDragAndDrop();
    }

    render() {
        return html`
            <sp-theme scale="medium" color="${this.currentTheme}" theme="express">
                <div class="add-on-container">
                    <div class="header">
                        <h2 class="spectrum-heading spectrum-heading--M">Content Library</h2>
                        <p class="spectrum-body spectrum-body--S">Browse and add content to your project</p>
                    </div>
                    
                    <div class="search-container">
                        <sp-textfield 
                            placeholder="Search content..." 
                            @input=${this.handleSearchInput}
                            .value=${this.searchTerm}
                            ${ref(this.searchInputRef)}
                        ></sp-textfield>
                        
                        <sp-picker 
                            @change=${this.handleTypeChange}
                            .value=${this.selectedType}
                            ${ref(this.contentTypePickerRef)}
                        >
                            <sp-menu slot="options">
                                <sp-menu-item value="all">All Types</sp-menu-item>
                                <sp-menu-item value="image">Images</sp-menu-item>
                                <sp-menu-item value="template">Templates</sp-menu-item>
                                <sp-menu-item value="graphic">Graphics</sp-menu-item>
                            </sp-menu>
                        </sp-picker>
                    </div>
                    
                    <sp-tabs selected="${this.activeTab}" @change=${this.handleTabChange}>
                        <sp-tab value="tab-1">Recent</sp-tab>
                        <sp-tab value="tab-2">Favorites</sp-tab>
                        
                        <sp-tab-panel value="tab-1">
                            <div class="content-grid" ${ref(this.contentGridRef)}>
                                ${repeat(this.filteredItems, item => item.id, item => html`
                                    <sp-card 
                                        heading=${item.title}
                                        subheading=${item.type}
                                        horizontal
                                        data-item-id=${item.id}
                                    >
                                        <img 
                                            slot="preview" 
                                            src=${item.thumbnail} 
                                            alt=${item.title}
                                        />
                                        <sp-action-button 
                                            slot="actions"
                                            @click=${() => this.addToDocument(item)}
                                        >
                                            <sp-icon-add></sp-icon-add>
                                        </sp-action-button>
                                    </sp-card>
                                `)}
                            </div>
                        </sp-tab-panel>
                        
                        <sp-tab-panel value="tab-2">
                            <div class="content-grid">
                                ${this.favoriteItems.length === 0 
                                    ? html`<p class="spectrum-body spectrum-body--M">No favorite items yet.</p>` 
                                    : ''}
                            </div>
                        </sp-tab-panel>
                    </sp-tabs>
                    
                    ${this.showEmptyState ? html`
                        <div class="empty-state">
                            <sp-icon-search></sp-icon-search>
                            <p class="spectrum-body spectrum-body--M">No content matches your search</p>
                            <sp-button quiet @click=${this.handleClearFilters}>Clear filters</sp-button>
                        </div>
                    ` : ''}
                    
                    ${this.loading ? html`
                        <sp-dialog size="small" open>
                            <div class="loading-content">
                                <sp-progress-circle indeterminate></sp-progress-circle>
                                <p class="spectrum-body spectrum-body--M">Adding content to document...</p>
                            </div>
                        </sp-dialog>
                    ` : ''}
                </div>
            </sp-theme>
        `;
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        
        // Setup drag and drop after the component is rendered
        if (changedProperties.has('filteredItems') || changedProperties.has('activeTab')) {
            this.setupDragAndDrop();
        }
    }
}

customElements.define('content-library-app', ContentLibraryApp);
```

## Theme Detection and Dynamic Rendering

Adobe Express currently only supports a light theme, but preparing for future dark theme support is recommended.

### Complete Theme Handling Implementation

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Initialize with default theme
let currentTheme = 'light';

// Function to apply theme changes
function applyTheme(themeName) {
    // Store theme name for later reference
    currentTheme = themeName;
    
    // Update the <sp-theme> element
    const themeElement = document.querySelector('sp-theme');
    themeElement.setAttribute('color', themeName);
    
    // Apply CSS classes based on theme
    document.body.classList.remove('spectrum-dark', 'spectrum-light');
    document.body.classList.add(`spectrum-${themeName}`);
    
    // Optional: Update custom elements with theme data attribute
    document.querySelectorAll('[data-theme-aware]').forEach(element => {
        element.setAttribute('data-theme', themeName);
    });
    
    // Optional: Dispatch a custom event for component-specific theme handling
    document.dispatchEvent(new CustomEvent('theme-changed', { 
        detail: { theme: themeName } 
    }));
}

// Set up theme detection
addOnUISdk.ready.then(() => {
    // Initial theme detection
    if (addOnUISdk.app.ui && addOnUISdk.app.ui.theme) {
        applyTheme(addOnUISdk.app.ui.theme);
    }
    
    // Listen for theme changes
    addOnUISdk.app.on("themechange", (data) => {
        applyTheme(data.theme);
    });
});

// Export for use in other modules
export { currentTheme, applyTheme };
```

### Component-Specific Theme Handling

For more complex components that need specific theme handling:

```javascript
class ThemeAwareComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Listen for theme changes
        document.addEventListener('theme-changed', this.onThemeChanged.bind(this));
        
        // Initial render
        this.render();
    }
    
    onThemeChanged(event) {
        const { theme } = event.detail;
        this.setAttribute('theme', theme);
        this.render();
    }
    
    render() {
        const theme = this.getAttribute('theme') || 'light';
        
        // Apply theme-specific styles
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --text-color: ${theme === 'dark' ? 'white' : 'black'};
                    --bg-color: ${theme === 'dark' ? '#2c2c2c' : '#f5f5f5'};
                }
                .container {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    padding: 16px;
                    border-radius: 4px;
                }
            </style>
            <div class="container">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('theme-aware-component', ThemeAwareComponent);
```

## What's New in Spectrum 2

Spectrum 2 brings significant updates to the design system that add-on developers should be aware of:

### Key Changes in Spectrum 2

1. **Updated Visual Language**:
   - Refined color palette with improved contrast
   - Refined typography styles
   - Updated iconography with more consistent styles and sizes

2. **Component Updates**:
   - Redesigned components with improved usability
   - New variants for existing components
   - New animation standards

3. **Improved Accessibility**:
   - Better color contrast ratios
   - Improved keyboard navigation
   - Enhanced screen reader support

### Installing Spectrum 2

To use Spectrum 2 components in your add-on, you'll need to install the appropriate packages using:

```bash
# Install the latest version of Spectrum Web Components (which includes Spectrum 2)
npm install @spectrum-web-components/theme

# Install specific components you need, for example:
npm install @spectrum-web-components/button
npm install @spectrum-web-components/card
npm install @spectrum-web-components/dialog
# ... etc
```

### Using Spectrum 2 in Add-ons

Spectrum 2 introduces a more streamlined import style. Here's how to properly import and apply Spectrum 2 theme components:

```javascript
// Import Spectrum 2 theme
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';

// Note: No longer use /express/ in the path as in Spectrum 1
// Incorrect (old Spectrum 1 style): 
// import '@spectrum-web-components/theme/express/theme-light.js';

// Then import other components
import '@spectrum-web-components/button/sp-button.js';
```

Then, apply the Spectrum 2 theme in your HTML:

```html
<!-- Notice the change in attribute values -->
<sp-theme theme="spectrum" color="light" scale="medium">
    <!-- Add-on content -->
</sp-theme>
```

> **Important Note**: The `theme` attribute now uses "spectrum" value (instead of "express" as in Spectrum 1) to indicate Spectrum 2.

### Migrating from Spectrum 1 to Spectrum 2

If you're updating an existing add-on from Spectrum 1 to Spectrum 2, you'll need to:

1. Update your imports to remove "/express/" from the paths
2. Change the theme attribute from "express" to "spectrum"
3. Check component-specific migration notes in the [official migration guide](https://opensource.adobe.com/spectrum-web-components/migrating-to-spectrum2/)

### Spectrum 2 CSS Variables

Spectrum 2 introduces updated CSS variables for styling:

```css
/* Spectrum 2 variables for colors */
.my-component {
    background-color: var(--spectrum-gray-100);
    color: var(--spectrum-gray-800);
    border: 1px solid var(--spectrum-gray-400);
}

/* Spectrum 2 variables for spacing */
.my-component {
    padding: var(--spectrum-spacing-300);
    margin: var(--spectrum-spacing-200);
    gap: var(--spectrum-spacing-100);
}
```

### Component-Specific Changes

Many components have breaking changes in their API. Some notable examples:

- **Button**: The `quiet` variant is now set with `quiet="true"` attribute rather than a variant
- **Dialog**: New simpler API with more flexible content composition
- **Card**: Updated handling of assets, headers, and descriptions

Always refer to the [component-specific documentation](https://opensource.adobe.com/spectrum-web-components/) and the [migration guide](https://opensource.adobe.com/spectrum-web-components/migrating-to-spectrum2/) for detailed information on each component.

## Troubleshooting Common Issues

### Certificate Issues with Local Development

**Issue**: Add-on doesn't load from local development server despite correct PORT

**Solution**:
Certificate issues are often the culprit. Try these steps:

1. Check browser certificate settings:
   - Open Chrome Settings → Privacy and Security → Security
   - Enable "Allow invalid certificates for resources loaded from localhost"

2. Reset development certificates:
   - Delete the `devcert` folder:
     - Mac: `/Users/{username}/Library/Application\ Support/devcert`
     - Windows: `C:\Users\{username}\AppData\Local\devcert`
   - Create a new add-on project to generate fresh certificates

### Component Rendering Issues

**Issue**: Spectrum Web Components not rendering correctly

**Solution**:

- Ensure components are properly imported
- Verify the `<sp-theme>` wrapper is correctly implemented
- Check browser console for errors
- Ensure version compatibility between components

```javascript
// Always import the theme components first
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/express/theme-light.js';
// Then import other components
import '@spectrum-web-components/button/sp-button.js';
```

### Style Conflicts

**Issue**: Custom CSS conflicts with Spectrum styles

**Solution**:

- Use CSS variables instead of hardcoded values
- Avoid global CSS that might override Spectrum styles
- Use more specific selectors for custom styles

```css
/* Avoid */
button {
    background-color: blue;
}

/* Better */
.my-custom-container sp-button {
    --spectrum-button-primary-background-color: var(--spectrum-blue-600);
}
```

### Performance Issues

**Issue**: Slow rendering or high memory usage

**Solution**:

- Import only the components you need
- Use lazy loading for components not needed immediately
- Minimize DOM operations and rerenders

```javascript
// Lazy load components not needed immediately
async function loadDialogComponent() {
    await import('@spectrum-web-components/dialog/sp-dialog.js');
    const dialog = document.createElement('sp-dialog');
    // Configure dialog...
    return dialog;
}

// Only load when needed
button.addEventListener('click', async () => {
    const dialog = await loadDialogComponent();
    document.body.appendChild(dialog);
    dialog.open = true;
});
```

### Integration with React

**Issue**: Difficulties integrating Spectrum Web Components with React

**Solution**:
Use the `@swc-react` package:

```jsx
import { Theme, Button, Slider } from '@swc-react';

function MyComponent() {
    return (
        <Theme theme="express" scale="medium" color="light">
            <Button variant="primary">Click Me</Button>
            <Slider min={0} max={100} value={50} />
        </Theme>
    );
}
```

### Theme Not Applied Correctly

**Issue**: Component styling doesn't reflect the current theme

**Solution**:
Ensure all components are inside the `<sp-theme>` wrapper and check CSS specificity:

```html
<sp-theme scale="medium" color="light" theme="express">
    <!-- All components must be inside sp-theme -->
    <sp-button>Themed Button</sp-button>
</sp-theme>

<!-- This button won't receive theme styling -->
<sp-button>Unthemed Button</sp-button>
```

## Best Practices

1. **Use Component Composition**: Compose complex UI patterns from simpler components rather than creating large custom components.

```html
<div class="form-field">
    <sp-field-label for="username">Username</sp-field-label>
    <sp-textfield id="username"></sp-textfield>
    <sp-help-text>Enter your username or email</sp-help-text>
</div>
```

2. **Follow Spectrum Guidelines**: Adhere to spacing, typography, and color guidelines for consistency.

3. **Optimize Performance**: Import only the components you need and consider code splitting for larger add-ons.

4. **Design for Accessibility**: Take advantage of Spectrum's built-in accessibility features, and test with screen readers and keyboard navigation.

5. **Responsive Design**: Design your add-on to work well at different panel sizes.

```css
.responsive-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spectrum-global-dimension-size-200);
}
```

6. **Use CSS Variables**: Leverage Spectrum CSS variables for theming and consistent styling.

7. **Error Handling**: Implement proper error states using Spectrum patterns for form validation and error messages.

```html
<sp-textfield invalid error-message="Please enter a valid email address" id="email"></sp-textfield>
```

## Resources

- [Spectrum Design System](https://spectrum.adobe.com/)
- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/index.html)
- [Spectrum Web Components on GitHub](https://github.com/adobe/spectrum-web-components)
- [Adobe Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/docs/)
- [Spectrum Design for Scale](https://adobe.design/stories/design-for-scale/designing-design-systems-how-to-lay-the-groundwork-that-drives-decision-making/)
- [Spectrum 2 Documentation](https://s2.spectrum.adobe.com/)
