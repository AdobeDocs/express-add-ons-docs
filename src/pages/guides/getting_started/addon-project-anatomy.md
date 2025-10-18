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
faq:
  questions:
    - question: "Which template should I choose for my add-on?"
      answer: "Start with Basic JavaScript for UI-only add-ons, JavaScript with Document Sandbox if you need to create/modify document content, React templates for complex UIs, and TypeScript variants if your team uses TypeScript."

    - question: "Where do I put my CSS files?"
      answer: "Always in the iframe runtime, never in document sandbox. Use src/styles.css for basic templates, src/ui/styles.css for sandbox templates, and src/components/App.css for React templates."

    - question: "Where does my UI code go vs. document manipulation code?"
      answer: "ALL HTML, CSS, and UI code goes in the iframe runtime (index.html, index.js, or ui/ folder). Document manipulation code goes in the document sandbox (sandbox/code.js). Never mix these concerns."

    - question: "Can I access the DOM from the document sandbox?"
      answer: "No. The document sandbox has no access to document.getElementById() or any DOM APIs. Get user input in the iframe runtime and pass data to document sandbox via communication APIs."

    - question: "Do I need both index.js and ui/index.js?"
      answer: "No, it depends on template. Basic templates use src/index.js only, document sandbox templates use src/ui/index.js organized in ui/ folder, and React templates use src/index.jsx or src/index.tsx."

    - question: "What's the difference between manifest.json configurations?"
      answer: 'UI-only manifests have just "main": "index.html". Two-runtime manifests add "documentSandbox": "sandbox/code.js" to enable document manipulation.'

    - question: "Can I upgrade from a basic template to one with document sandbox later?"
      answer: 'Yes! Add "documentSandbox": "sandbox/code.js" to your manifest, create src/sandbox/ folder with code.js, move document operations from UI to sandbox, and set up communication between environments.'

    - question: "Why does my add-on have TypeScript configs if I'm using JavaScript?"
      answer: "TypeScript configs (tsconfig.json) provide IDE support and IntelliSense even in JavaScript projects. They enable autocomplete, inline documentation, and error catching without requiring TypeScript compilation."
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

<InlineAlert variant="info" slots="header, text1" />

**New to add-ons?** 

Familiarize yourself with core concepts in the [Add-on Development Terminology Guide](../learn/fundamentals/terminology.md) and understand the [dual-runtime architecture](../learn/platform_concepts/architecture.md) before diving into project structure.

## Core Project Structures

Add-on projects follow three main patterns based on complexity:

| Structure Type | When to Use | Key Files |
|----------------|-------------|-----------|
| **UI-Only** | Simple tools, settings panels, utilities | `index.html`, `index.js`, `manifest.json` |
| **Two-Runtime** | Add-ons that create/modify document content | UI files + `sandbox/code.js` |
| **Framework-Based** | Complex UIs, data visualization, workflows | React components, build tools |

See [File Structure Comparison](#file-structure-comparison) below for detailed file trees, pros/cons, and examples of each template type.

<InlineAlert slots="header,text1" variant="info"/>

**UI & Styling Location**

**All user interface code, HTML, CSS, and styling goes in the iframe runtime** (index.html, index.js, or ui/ folder), regardless of template type. The document sandbox (code.js) is **only for document manipulation** and has no access to DOM or styling capabilities. See [Separation of Concerns](#1-separation-of-concerns) for details.

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

<InlineAlert slots="header,text1" variant="info"/>

IMPORTANT

If your add-on is based on the plain `javascript-with-document-sandbox` template, you set the specific path to `code.js` with: `"documentSandbox": "sandbox/code.js"` since it's a no-build template, whereas the other templates (like `swc-javascript-with-document-sandbox`, `react-javascript-with-document-sandbox`, etc.) only need to set `"documentSandbox": "code.js"` since they are pre-configured with webpack to build the project.

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

### index.js / ui/index.js - UI Logic

**File location depends on template:**
- **Basic templates**: `src/index.js`
- **Document sandbox templates**: `src/ui/index.js`

Contains the user interface logic and interactions. For two-runtime add-ons, this file handles communication with the document sandbox.

#### Basic UI-only example:
```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
    const button = document.getElementById("clickMe");
    button.addEventListener("click", () => {
        button.innerHTML = "Clicked";
    });
});
```

#### Two-runtime example (with document sandbox):
```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    document.getElementById("createBtn").addEventListener("click", async () => {
        await sandboxProxy.createRectangle();
    });
});
```

**What belongs here:**

- UI event handlers and DOM manipulation
- Form handling and user input validation
- Add-on UI SDK calls (dialogs, exports, OAuth)
- Communication with document sandbox (for two-runtime add-ons)
- Progress updates and status displays

### sandbox/code.js - Document Manipulation Logic

The document sandbox handles all document creation and modification operations.

```javascript
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    // APIs to be exposed to the iframe runtime
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

    // Expose `sandboxApi` to the iframe runtime.
    runtime.exposeApi(sandboxApi);
}

start();
```

**What belongs here:**

- Document API operations (creating shapes, text, images)
- Document analysis and data extraction
- Complex calculations and data processing
- APIs exposed to the iframe runtime

### tsconfig.json - TypeScript Configuration

Provides TypeScript compilation settings for better development experience.

#### iframe Runtime Configuration

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

Keep UI code and document manipulation code strictly separated between the two runtime environments.

**iframe Runtime (index.js/ui/):**

- **UI & styling code** (HTML, CSS, component styling)
- **User interface logic** (buttons, forms, inputs, displays)
- Event handlers
- Form validation
- DOM manipulation (`document.getElementById`, etc.)
- Communication with document sandbox
- Progress indicators and loading states
- External API calls (fetch, network requests)

**Document Sandbox (code.js/sandbox/):**

- **Document manipulation** (creating shapes, text, images)
- Content creation using Express Document SDK
- Data processing and calculations
- API exposure to iframe runtime
- **No UI or styling code** (no HTML, CSS, or DOM access)

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

**Where to Put CSS/Styling by Template Type:**

| Template Type | CSS/Styling Location | How to Load |
|---------------|---------------------|-------------|
| **Basic JavaScript** | `src/styles.css` or inline in `index.html` | `<link rel="stylesheet" href="styles.css">` in `index.html` |
| **JavaScript + Sandbox** | `src/styles.css` or `src/ui/styles.css` | `<link rel="stylesheet" href="styles.css">` in `index.html` |
| **React Templates** | `src/components/App.css` or styled-components | Import in component: `import './App.css'` |
| **Large Projects** | `src/assets/styles/` folder with multiple CSS files | Import where needed or use CSS modules |

<InlineAlert slots="header, text1" variant="info"/>

**Reminder**

CSS files are ALWAYS loaded/imported in the iframe runtime (index.html or UI components), never in document sandbox files.

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

### ✅ DO: Follow These Best Practices

| Practice | Example | Why It Matters |
|----------|---------|----------------|
| **Clear file naming** | `TextEditor.jsx`, `colorUtils.js` | Makes code easy to find and understand |
| **Logical grouping** | `features/text-editing/`, `shared/ui-components/` | Scales well as project grows |
| **Environment separation** | UI code in `ui/`, document code in `sandbox/` | Prevents runtime errors |
| **Consistent naming** | All camelCase or all kebab-case | Professional, maintainable code |

### ❌ DON'T: Avoid These Mistakes

#### 1. UI/Styling in Document Sandbox

```javascript
// ❌ Bad - Trying to access DOM or styling in document sandbox
// code.js (Document Sandbox)
import addOnSandboxSdk from "add-on-sdk-document-sandbox";

runtime.exposeApi({
    createText: function() {
        // ❌ WRONG - document.getElementById doesn't exist in document sandbox
        const input = document.getElementById("textInput");
        
        // ❌ WRONG - No DOM or styling capabilities here
        document.body.style.backgroundColor = "red";
    }
});
```

```javascript
// ✅ Good - UI code stays in iframe runtime, document code in sandbox
// index.js (iframe Runtime)
const textInput = document.getElementById("textInput");
document.body.style.backgroundColor = "red"; // ✅ DOM access here

const sandboxProxy = await runtime.apiProxy("documentSandbox");
await sandboxProxy.createText(textInput.value); // Pass data to sandbox

// code.js (Document Sandbox)
runtime.exposeApi({
    createText: function(text) {
        const textNode = editor.createText(text); // ✅ Document manipulation here
        editor.context.insertionParent.children.append(textNode);
    }
});
```

#### 2. Mixing SDK Imports in Wrong Environment

```javascript
// ❌ Bad - Importing Document SDK in UI file
// ui/index.js
import { editor } from "express-document-sdk"; // Wrong! Document SDK only works in sandbox

// ❌ Bad - Importing UI SDK in sandbox file
// sandbox/code.js
import addOnUISdk from "...sdk.js"; // Wrong! UI SDK only works in iframe runtime
```

#### 3. Poor Organization

Avoid vague names like `stuff.js`, `helpers.js`, `utils.js`, `misc.js`. Use descriptive names that indicate purpose: `textOperations.js`, `colorUtils.js`, `documentHelpers.js`.

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

---

## FAQs

#### Q: Which template should I choose?

**Start with your needs:**
- **Just UI?** → Basic JavaScript template
- **Need to create/modify document content?** → JavaScript with Document Sandbox
- **Complex UI?** → React JavaScript (or React + Sandbox if you need document access)
- **Team uses TypeScript?** → Any TypeScript variant

See the [Template Selection Guide](#template-selection-guide) for detailed decision matrix.

#### Q: Where do I put my CSS files?

**Always in the iframe runtime**, never in document sandbox:
- **Basic templates**: `src/styles.css` and link in `index.html`
- **Sandbox templates**: `src/styles.css` or `src/ui/styles.css`
- **React templates**: `src/components/App.css` or inline styles
- See [CSS/Styling Location table](#2-asset-organization) for complete breakdown

#### Q: Where does my UI code go vs. document manipulation code?

**iframe Runtime** (`index.html`, `index.js`, or `ui/` folder):
- ALL HTML, CSS, styling
- Button clicks, forms, user input
- DOM manipulation
- External API calls

**Document Sandbox** (`sandbox/code.js`):
- Creating shapes, text, images in Adobe Express
- Reading document properties
- NO UI or styling code

See [Separation of Concerns](#1-separation-of-concerns) for details.

#### Q: Can I access the DOM from the document sandbox?

**No.** The document sandbox has no access to `document.getElementById()` or any DOM APIs. You must:
1. Get user input in the iframe runtime
2. Pass data to document sandbox via communication APIs
3. Create document content in the sandbox
4. Return results back to UI if needed

See the [UI/Styling in Document Sandbox anti-pattern](#1-uistyling-in-document-sandbox) for examples.

#### Q: Do I need both `index.js` and `ui/index.js`?

**No, it depends on template:**
- **Basic templates**: Use `src/index.js` only
- **Document sandbox templates**: Use `src/ui/index.js` (organized in `ui/` folder)
- **React templates**: Use `src/index.jsx` or `src/index.tsx`

The file location is just organizational—both serve the same purpose (iframe runtime UI logic).

#### Q: What's the difference between `manifest.json` configurations?

**UI-only**: Just `"main": "index.html"`
```json
"entryPoints": [{ "type": "panel", "main": "index.html" }]
```

**Two-runtime**: Adds `"documentSandbox": "code.js"`
```json
"entryPoints": [{ 
  "type": "panel", 
  "main": "index.html",
  "documentSandbox": "sandbox/code.js" 
}]
```

The `documentSandbox` property tells Adobe Express to load your document manipulation code.

#### Q: Can I upgrade from a basic template to one with document sandbox later?

**Yes!** Template migration is straightforward:
1. Add `"documentSandbox": "sandbox/code.js"` to your manifest
2. Create `src/sandbox/` folder with `code.js`
3. Move document operations from UI to sandbox
4. Set up communication between environments

See [Migration Paths](#migration-paths) for the recommended upgrade sequence.

#### Q: Why does my add-on have TypeScript configs if I'm using JavaScript?

TypeScript configs (`tsconfig.json`) provide **IDE support and IntelliSense** even in JavaScript projects. They:
- Enable autocomplete for SDK methods
- Show inline documentation
- Catch common errors while typing
- Don't require compiling TypeScript

You get better developer experience without learning TypeScript!

#### Q: Where do shared utilities go in a two-runtime project?

**It depends on what they do:**
- **UI utilities** (formatting, validation): `src/ui/utils/` or `src/shared/ui-utils/`
- **Document utilities** (shape helpers, color conversions): `src/sandbox/utils/`
- **Truly shared types/constants**: `src/shared/` or `src/constants/`

**Important**: Code can't be directly shared between runtimes—each environment needs its own copy or must communicate via APIs.

#### Q: How do I organize a large add-on with multiple features?

Use **feature-based organization**:
```text
src/
├── features/
│   ├── text-tools/
│   │   ├── TextToolsUI.jsx       # UI components
│   │   ├── textOperations.js     # Document sandbox operations
│   │   └── textUtils.js          # Shared utilities
│   └── shape-tools/
│       ├── ShapeToolsUI.jsx
│       └── shapeOperations.js
└── shared/
    ├── components/    # Reusable UI components
    └── constants/     # Shared configuration
```

See [Code Organization Patterns](#3-code-organization-patterns) for examples.

---

## Related Documentation

- [Architecture Guide](../learn/platform_concepts/architecture.md) - Deep dive into two-runtime system
- [Developer Terminology](../learn/fundamentals/terminology.md) - Understanding Adobe Express add-on concepts
- [Getting Started Tutorial](../learn/how_to/tutorials/grids-addon.md) - Build your first add-on
- [Manifest Reference](../../references/manifest/index.md) - Complete manifest configuration guide
- [CLI Documentation](../../references/index.md) - Adobe Express CLI commands and options

---

**Remember**: Start simple and evolve your project structure as your add-on grows in complexity.
