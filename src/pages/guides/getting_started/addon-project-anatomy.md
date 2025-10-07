---
keywords:
  - Adobe Express
  - Add-on SDK
  - Project Structure
  - CLI Templates
  - File Organization
  - JavaScript
  - TypeScript
  - React
  - SWC
  - Document Sandbox
  - Manifest Configuration
  - Development Workflow
  - Template Comparison
  - Project Anatomy
  - Add-on Development
  - File Structure
  - Best Practices
  - Getting Started
  - Template Selection
  - Project Setup
  - Build Configuration
  - Development Tools
  - Code Organization
  - Entry Points
  - Asset Management
title: Add-on Project Anatomy & CLI Templates
description: A comprehensive guide to Adobe Express add-on project structure, file organization, and CLI template comparison. Learn what goes where, when to use each template, and how to organize your add-on code effectively.
contributors:
  - https://github.com/hollyschinsky
# LLM optimization metadata
canonical: true
ai_assistant_note: "This guide provides authoritative information about Adobe Express add-on project structure and CLI templates. Use this when helping developers understand project organization, file purposes, and template selection."
semantic_tags:
  - project-structure
  - template-comparison
  - file-organization
  - development-setup
  - best-practices
---

# Add-on Project Anatomy

Add-on project structure, file organization, and template selection for efficient Adobe Express add-on development.

## Overview

Understanding add-on project structure is essential for building maintainable, scalable add-ons. This guide walks you through every file and folder, explains what content belongs where, and compares all available CLI templates to help you choose the right starting point.

Whether you're building a simple UI-only add-on or a complex document manipulation tool, proper project organization sets the foundation for success.

## Core Project Structures

### UI-Only Add-ons

The simplest add-on contains just the essential files needed for a user interface panel:

```text
my-addon/
└── src/
    ├── index.html        # UI entry point
    ├── index.js          # UI logic
    └── manifest.json     # Add-on configuration
```

**When to use:** Simple tools, settings panels, utilities that don't modify documents.

### Two-Runtime Add-ons

More complex add-ons that create or modify document content need the document sandbox:

```text
my-addon/
└── src/
    ├── index.html           # Root HTML file
    ├── manifest.json        # Add-on configuration
    ├── sandbox/
    │   ├── code.js         # Document manipulation logic
    │   └── tsconfig.json   # TypeScript config for sandbox
    └── ui/
        ├── index.js        # UI logic
        └── tsconfig.json   # TypeScript config for UI
```

**When to use:** Add-ons that create shapes, text, images, or modify existing document content.

### Framework-Based Add-ons

Complex add-ons with sophisticated UIs use modern frameworks and build tools:

```text
my-addon/
├── src/
│   ├── components/
│   │   ├── App.css        # Component styles
│   │   └── App.jsx        # Main React component
│   ├── index.html         # HTML entry point
│   ├── index.jsx          # React entry point
│   └── manifest.json      # Add-on configuration
├── webpack.config.js      # Build configuration
└── tsconfig.json         # TypeScript configuration
```

**When to use:** Complex UIs, data visualization, multi-step workflows, advanced interactions.

## Essential Files Explained

### manifest.json - Add-on Configuration

The `manifest.json` file is the heart of every add-on. It defines metadata, entry points, and capabilities.

#### Basic Manifest (UI Only)

```json
{
    "testId": "",
    "name": "",
    "version": "1.0.0",
    "manifestVersion": 2,
    "requirements": {
        "apps": [
            {
                "name": "Express",
                "apiVersion": 1
            }
        ]
    },
    "entryPoints": [
        {
            "type": "panel",
            "id": "panel1",
            "main": "index.html"
        }
    ]
}
```

#### Document Sandbox Manifest

```json
{
    "testId": "",
    "name": "",
    "version": "1.0.0",
    "manifestVersion": 2,
    "requirements": {
        "apps": [
            {
                "name": "Express",
                "apiVersion": 1
            }
        ]
    },
    "entryPoints": [
        {
            "type": "panel",
            "id": "panel1",
            "main": "index.html",
            "documentSandbox": "sandbox/code.js"
        }
    ]
}
```

**Key Differences:**

- `documentSandbox` property points to your document manipulation code
- Required when your add-on creates or modifies document content

### index.html - UI Entry Point

The HTML file that loads when your add-on panel opens. Contains the basic structure and loads your JavaScript.

#### Basic Structure

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Add-on</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>My Add-on</h1>
        <button id="clickMe" disabled>Click Me</button>
    </div>
    <script type="module" src="index.js"></script>
</body>
</html>
```

**What belongs here:**

- Basic HTML structure
- CSS imports
- Script imports (usually just one main script)
- Static UI elements that don't change

### index.js - UI Logic (Basic Template)

Contains the user interface logic and interactions for simple add-ons.

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
    console.log("addOnUISdk is ready for use.");

    const clickMeButton = document.getElementById("clickMe");
    clickMeButton.addEventListener("click", () => {
        clickMeButton.innerHTML = "Clicked";
    });

    // Enable the button only when:
    // 1. `addOnUISdk` is ready, and
    // 2. `click` event listener is registered.
    clickMeButton.disabled = false;
});
```

**What belongs here:**

- UI event handlers
- DOM manipulations
- Add-on UI SDK calls (dialogs, exports, OAuth)
- Communication setup with document sandbox (if needed)

### ui/index.js - UI Logic (Document Sandbox Template)

For add-ons with document sandbox, UI logic focuses on communication and user interactions.

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");

    // Get the UI runtime.
    const { runtime } = addOnUISdk.instance;

    // Get the proxy object, which is required
    // to call the APIs defined in the Document Sandbox runtime
    // i.e., in the `code.js` file of this add-on.
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    const createRectangleButton = document.getElementById("createRectangle");
    createRectangleButton.addEventListener("click", async event => {
        await sandboxProxy.createRectangle();
    });

    // Enable the button only when:
    // 1. `addOnUISdk` is ready,
    // 2. `sandboxProxy` is available, and
    // 3. `click` event listener is registered.
    createRectangleButton.disabled = false;
});
```

**What belongs here:**

- Communication setup with document sandbox
- UI event handlers that trigger document operations
- Form handling and user input validation
- Progress updates and status displays

### sandbox/code.js - Document Manipulation Logic

The document sandbox handles all document creation and modification operations.

```javascript
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    // APIs to be exposed to the UI runtime
    // i.e., to the `index.html` file of this add-on.
    const sandboxApi = {
        createRectangle: () => {
            const rectangle = editor.createRectangle();

            // Define rectangle dimensions.
            rectangle.width = 240;
            rectangle.height = 180;

            // Define rectangle position.
            rectangle.translation = { x: 10, y: 10 };

            // Define rectangle color.
            const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };

            // Fill the rectangle with the color.
            const rectangleFill = editor.makeColorFill(color);
            rectangle.fill = rectangleFill;

            // Add the rectangle to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(rectangle);
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
```

**What belongs here:**

- Document API operations (creating shapes, text, images)
- Document analysis and data extraction
- Complex calculations and data processing
- APIs exposed to the UI runtime

### tsconfig.json - TypeScript Configuration

Provides TypeScript compilation settings for better development experience.

#### UI Runtime Configuration

```json
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "types": ["add-on-ui-sdk"]
    },
    "include": [
        "./**/*"
    ]
}
```

#### Document Sandbox Configuration

```json
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "types": ["add-on-sandbox-sdk"]
    },
    "include": [
        "./**/*"
    ]
}
```

**Purpose:**

- Enable TypeScript IntelliSense and type checking
- Configure SDK type definitions
- Set compilation options for each environment

## CLI Template Comparison

### Template Categories

The Adobe Express CLI provides 10 different templates organized by complexity and technology:

#### Basic Templates (No Framework)

1. **JavaScript** - Simple UI-only add-on
2. **JavaScript with Document Sandbox** - Two-runtime add-on
3. **SWC JavaScript** - Fast build with SWC
4. **SWC JavaScript with Document Sandbox** - Fast build + document manipulation

#### TypeScript Templates

5. **SWC TypeScript** - Type-safe with fast builds
6. **SWC TypeScript with Document Sandbox** - Full TypeScript + document manipulation

#### React Templates

7. **React JavaScript** - React UI framework
8. **React JavaScript with Document Sandbox** - React + document manipulation
9. **React TypeScript** - React + TypeScript
10. **React TypeScript with Document Sandbox** - Full React + TypeScript + document manipulation

### Detailed Template Comparison

| Template | UI Framework | Language | Build Tool | Document Sandbox | Best For |
|----------|-------------|----------|------------|------------------|----------|
| **JavaScript** | Vanilla JS | JavaScript | None | ❌ | Simple tools, learning |
| **JavaScript + Sandbox** | Vanilla JS | JavaScript | None | ✅ | Basic document manipulation |
| **SWC JavaScript** | Vanilla JS | JavaScript | SWC | ❌ | Fast builds, simple tools |
| **SWC JavaScript + Sandbox** | Vanilla JS | JavaScript | SWC | ✅ | Fast builds + document work |
| **SWC TypeScript** | Vanilla JS | TypeScript | SWC | ❌ | Type safety, simple tools |
| **SWC TypeScript + Sandbox** | Vanilla JS | TypeScript | SWC | ✅ | Type safety + document work |
| **React JavaScript** | React | JavaScript | Webpack | ❌ | Complex UIs |
| **React JavaScript + Sandbox** | React | JavaScript | Webpack | ✅ | Complex UIs + document work |
| **React TypeScript** | React | TypeScript | Webpack | ❌ | Complex UIs + type safety |
| **React TypeScript + Sandbox** | React | TypeScript | Webpack | ✅ | Enterprise-level add-ons |

### File Structure Comparison

#### Basic JavaScript Template

```text
my-addon/
├── .gitignore
├── README.md
├── tsconfig.json          # For IDE support
└── src/
    ├── index.html         # UI entry point
    ├── index.js          # UI logic
    └── manifest.json     # Configuration
```

**Pros:**

- Simplest structure
- No build process required
- Easy to understand
- Quick to get started

**Cons:**

- Limited to simple UIs
- No document manipulation
- No modern tooling benefits

#### JavaScript with Document Sandbox Template

```text
my-addon/
├── .gitignore
├── README.md
├── tsconfig.json          # Root TypeScript config
└── src/
    ├── index.html         # Root HTML file
    ├── manifest.json      # Configuration
    ├── sandbox/
    │   ├── code.js       # Document manipulation
    │   └── tsconfig.json # Sandbox TS config
    └── ui/
        ├── index.js      # UI logic
        └── tsconfig.json # UI TS config
```

**Pros:**

- Clear separation of concerns
- Document manipulation capabilities
- Still relatively simple
- Good for learning two-runtime architecture

**Cons:**

- More complex than basic template
- No modern build tools
- Limited UI capabilities

#### React JavaScript Template

```text
my-addon/
├── .gitignore
├── README.md
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Build configuration
└── src/
    ├── components/
    │   ├── App.css       # Component styles
    │   └── App.jsx       # Main React component
    ├── index.html        # HTML entry point
    ├── index.jsx         # React entry point
    └── manifest.json     # Configuration
```

**Pros:**

- Modern UI framework
- Component-based architecture
- Rich ecosystem
- Great for complex UIs

**Cons:**

- More complex setup
- Requires build process
- Learning curve for React newcomers
- No document manipulation (in basic version)

#### React TypeScript with Document Sandbox Template

```text
my-addon/
├── .gitignore
├── README.md
├── tsconfig.json          # Root TypeScript config
├── webpack.config.js      # Build configuration
└── src/
    ├── components/
    │   ├── App.css       # Component styles
    │   └── App.tsx       # Main React component
    ├── index.html        # Root HTML file
    ├── index.tsx         # React entry point
    ├── manifest.json     # Configuration
    └── sandbox/
        ├── code.ts       # Document manipulation
        └── tsconfig.json # Sandbox TS config
```

**Pros:**

- Full type safety
- Modern UI framework
- Document manipulation capabilities
- Best development experience
- Scalable architecture

**Cons:**

- Most complex setup
- Steepest learning curve
- Requires understanding of React, TypeScript, and two-runtime architecture

## Template Selection Guide

### Decision Matrix

Choose your template based on these key factors:

#### 1. Add-on Complexity

**Simple Tools** (settings, utilities, viewers)
→ **JavaScript** or **SWC JavaScript**

**Document Creators** (shapes, text, image manipulation)
→ **JavaScript with Document Sandbox** or **SWC JavaScript with Document Sandbox**

**Complex UIs** (multi-step workflows, data visualization)
→ **React JavaScript** or **React TypeScript**

**Enterprise Add-ons** (complex UI + document manipulation)
→ **React TypeScript with Document Sandbox**

#### 2. Team Experience

**Beginners** → Start with **JavaScript** templates
**JavaScript Developers** → **SWC JavaScript** templates
**React Developers** → **React JavaScript** templates
**TypeScript Teams** → **TypeScript** variants

#### 3. Project Requirements

**Need Document Manipulation?**

- ✅ Yes → Choose "with Document Sandbox" variant
- ❌ No → Choose basic variant

**Need Type Safety?**

- ✅ Yes → Choose TypeScript variant
- ❌ No → Choose JavaScript variant

**Need Complex UI?**

- ✅ Yes → Choose React variant
- ❌ No → Choose Vanilla JS variant

**Need Fast Builds?**

- ✅ Yes → Choose SWC variant (for non-React)
- ❌ No → Any variant works

### Migration Paths

You can upgrade templates as your add-on grows:

```text
JavaScript
    ↓
JavaScript + Document Sandbox
    ↓
SWC JavaScript + Document Sandbox
    ↓
React JavaScript + Document Sandbox
    ↓
React TypeScript + Document Sandbox
```

Each step adds capabilities while maintaining core functionality.

## File Organization Best Practices

### 1. Separation of Concerns

**UI Runtime (index.js/ui/):**

- User interface logic
- Event handlers
- Form validation
- Communication with document sandbox
- Progress indicators

**Document Sandbox (code.js/sandbox/):**

- Document manipulation
- Content creation
- Data processing
- API exposure to UI

### 2. Asset Organization

```text
src/
├── assets/
│   ├── icons/           # Add-on icons
│   ├── images/          # Static images
│   └── styles/          # CSS files
├── components/          # React components (if using React)
├── utils/              # Shared utilities
├── types/              # TypeScript type definitions
└── constants/          # Configuration constants
```

### 3. Code Organization Patterns

#### Feature-Based Organization (Large Add-ons)

```text
src/
├── features/
│   ├── text-tools/
│   │   ├── TextToolsUI.jsx
│   │   ├── textOperations.js
│   │   └── textUtils.js
│   └── shape-tools/
│       ├── ShapeToolsUI.jsx
│       ├── shapeOperations.js
│       └── shapeUtils.js
├── shared/
│   ├── components/
│   ├── utils/
│   └── constants/
└── sandbox/
    └── code.js
```

#### Layer-Based Organization (Medium Add-ons)

```text
src/
├── ui/
│   ├── components/
│   ├── pages/
│   └── styles/
├── sandbox/
│   ├── operations/
│   ├── utils/
│   └── code.js
└── shared/
    ├── types/
    ├── constants/
    └── utils/
```

## Advanced Configuration

### Build Tool Configuration

#### Webpack (React Templates)

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
```

#### SWC Configuration

SWC templates use `.swcrc` for fast compilation:

```json
{
    "jsc": {
        "parser": {
            "syntax": "typescript",
            "tsx": true
        },
        "target": "es2020"
    },
    "module": {
        "type": "es6"
    }
}
```

### Environment-Specific TypeScript Configs

#### Root tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
```

#### UI-Specific Configuration

```json
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "types": ["add-on-ui-sdk"],
        "lib": ["DOM", "ES2020"]
    },
    "include": ["./**/*"]
}
```

#### Sandbox-Specific Configuration

```json
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "types": ["add-on-sandbox-sdk"],
        "lib": ["ES2020"]
    },
    "include": ["./**/*"]
}
```

## Common Patterns and Anti-Patterns

### ✅ Good Practices

#### 1. Clear File Naming

```text
✅ Good
├── ui/
│   ├── TextEditor.jsx
│   ├── ColorPicker.jsx
│   └── ToolPanel.jsx
└── sandbox/
    ├── textOperations.js
    ├── colorUtils.js
    └── documentHelpers.js
```

#### 2. Logical Grouping

```text
✅ Good
├── features/
│   ├── text-editing/
│   ├── image-filters/
│   └── shape-tools/
└── shared/
    ├── ui-components/
    ├── document-utils/
    └── constants/
```

#### 3. Environment Separation

```javascript
// ✅ Good - Clear environment separation
// ui/index.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// sandbox/code.js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
```

### ❌ Anti-Patterns

#### 1. Mixed Concerns

```javascript
// ❌ Bad - Document operations in UI file
// index.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { editor } from "express-document-sdk"; // Wrong environment!
```

#### 2. Poor File Organization

```text
❌ Bad
├── stuff.js
├── helpers.js
├── utils.js
├── misc.js
└── other.js
```

#### 3. Inconsistent Naming

```text
❌ Bad
├── TextEditor.jsx
├── color_picker.js
├── ToolPanel.tsx
└── shape-utils.JS
```

## Troubleshooting Common Issues

### Template Selection Problems

**Problem**: "I chose the wrong template and need to add document manipulation"

**Solution**:

1. Add `documentSandbox` property to manifest.json
2. Create `sandbox/` folder with `code.js`
3. Move document operations from UI to sandbox
4. Set up communication between environments

**Problem**: "My React template is too complex for my simple add-on"

**Solution**:

1. Extract core logic from React components
2. Create new project with simpler template
3. Copy over your core functionality
4. Simplify UI to basic HTML/JavaScript

### File Organization Issues

**Problem**: "My add-on is getting too complex to manage"

**Solution**:

1. Implement feature-based organization
2. Extract shared utilities
3. Create clear interfaces between UI and sandbox
4. Document your architecture decisions

**Problem**: "TypeScript errors in wrong environment"

**Solution**:

1. Check `tsconfig.json` in each folder
2. Verify correct SDK types are imported
3. Ensure files are in correct directories
4. Use environment-specific configurations

## Next Steps

### For Beginners

1. Start with **JavaScript** template
2. Build a simple UI-only add-on
3. Learn the basics of manifest configuration
4. Experiment with Add-on UI SDK features

### For Intermediate Developers

1. Try **JavaScript with Document Sandbox** template
2. Learn two-runtime architecture
3. Experiment with document manipulation
4. Build communication between UI and sandbox

### For Advanced Developers

1. Use **React TypeScript with Document Sandbox** template
2. Implement complex UI patterns
3. Build scalable architecture
4. Optimize performance and user experience

## Related Documentation

- [Runtime Architecture Guide](../learn/platform_concepts/runtime-architecture.md) - Deep dive into two-runtime system
- [Developer Terminology](../learn/fundamentals/terminology.md) - Understanding Adobe Express add-on concepts
- [Getting Started Tutorial](../learn/how_to/tutorials/grids-addon.md) - Build your first add-on
- [Manifest Reference](../../references/manifest/index.md) - Complete manifest configuration guide
- [CLI Documentation](../../references/index.md) - Adobe Express CLI commands and options

---

**Remember**: Start simple and evolve your project structure as your add-on grows in complexity.
