---
keywords:
  - Adobe Express
  - Express Add-on SDK
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
  - Webpack
  - Build vs No-Build
  - iframe Runtime
  - Spectrum Web Components
  - CSS Location
  - Separation of Concerns
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

    - question: "Where do shared utilities go in a two-runtime project?"
      answer: "It depends on what they do: UI utilities (formatting, validation) go in src/ui/utils/ or src/shared/ui-utils/, document utilities (shape helpers, color conversions) go in src/sandbox/utils/, and truly shared types/constants go in src/shared/ or src/constants/. Important: Code can't be directly shared between runtimes - each environment needs its own copy or must communicate via APIs."

    - question: "What's the difference between build and no-build templates?"
      answer: "No-build templates (javascript, javascript-with-document-sandbox) use files directly from src/ with no compilation. Build templates (all SWC and React variants) use webpack to bundle src/ files into dist/ folder. Build templates support modern JavaScript features, JSX, and TypeScript."

    - question: "Why does my manifest say documentSandbox: 'sandbox/code.js' but the template has 'code.js'?"
      answer: "No-build templates use full path 'sandbox/code.js' pointing to source. Build templates use just 'code.js' because webpack bundles to dist/code.js."

    - question: "What's the difference between SWC and React templates?"
      answer: "Both use Spectrum Web Components! SWC templates use vanilla JavaScript with Lit and native web components. React templates use React framework with React wrappers for Spectrum components. Choose based on your team's preference and UI complexity needs."
canonical: true
ai_assistant_note: "This is the authoritative guide for Adobe Express add-on project structure, file organization, 
  and CLI template selection. Use this when helping developers understand: where files go, which template to choose, 
  how to organize code across iframe runtime and document sandbox, CSS/styling placement (always iframe runtime), 
  build vs no-build differences, and migration paths between templates. Critical: Always emphasize that UI/styling 
  code goes in iframe runtime, never in document sandbox. Covers all 10 CLI templates with clear decision trees."
semantic_tags:
  - canonical-reference
  - project-structure
  - template-comparison
  - file-organization
  - development-setup
  - best-practices
  - cli-templates
  - manifest-configuration
  - separation-of-concerns
  - ui-vs-sandbox
  - css-styling-location
  - build-vs-no-build
  - migration-paths
  - swc-vs-react
  - template-decision-tree
---

# Add-on Project Anatomy Guide

A comprehensive guide to understanding Adobe Express add-on project structure, file organization, and template selection.

<InlineAlert variant="info" slots="header, text1"/>

**New to add-ons?**

Start with the [Hello, World! tutorial](./hello-world.md) to create your first add-on, then return here to understand project structure. For terminology clarification, see the [Developer Terminology Guide](../learn/fundamentals/terminology.md).

## Understanding the Basics

Every Adobe Express add-on has these essential files:

1. **`manifest.json`** - Tells Adobe Express about your add-on
2. **`index.html`** - Your add-on's user interface
3. **`index.js`** - Your add-on's logic

The complexity grows based on:
- Whether you need to create/modify document content (requires [document sandbox](../learn/platform_concepts/architecture.md#document-sandbox))
- Whether you use a build tool (webpack)
- Whether you use a UI framework (React) or TypeScript

See the [Add-on Architecture Guide](../learn/platform_concepts/architecture.md) for a deep dive into how these pieces work together.

## The Simplest Add-on

### Plain JavaScript Template (No Build)

This is the absolute simplest structure - no build tools, no document manipulation:

```
my-addon/
├── src/
│   ├── index.html       # Your UI
│   ├── index.js         # Your UI logic
│   └── manifest.json    # Configuration
├── tsconfig.json        # For IDE support only
└── README.md
```

**Key characteristics:**
- ✅ No build process - files are used directly as-is
- ✅ Perfect for learning
- ✅ Great for simple UI-only add-ons
- ❌ Cannot create/modify document content
- ❌ No modern JavaScript features (no JSX, no imports beyond basic ES modules)

**manifest.json:**
```json
{
    "entryPoints": [{
        "type": "panel",
        "main": "index.html"
    }]
}
```

**When to use:** Simple tools like settings panels, calculators, reference guides, or anything that doesn't need to create shapes/text/images in the document.

**Related guides:**
- [Development Tools](./local_development/dev_tooling.md) - CLI commands and local development setup
- [Manifest Reference](../../references/manifest/index.md) - Complete manifest configuration guide

## Build vs. No-Build Templates

Understanding the difference between build and no-build templates is essential for working with add-on projects:

### No-Build Templates

**Only two templates have no build process:**
- `javascript` (UI-only)
- `javascript-with-document-sandbox` (with document manipulation)

**Characteristics:**
- Files in `src/` are used directly
- `manifest.json` paths point directly to source files
- No `webpack.config.js` file
- No `npm run build` command needed for development

**Document sandbox path in manifest:**
```json
"documentSandbox": "sandbox/code.js"  // Full path to source file
```

### Build Templates (All Others)

**These templates use webpack:**
- `swc-javascript` / `swc-javascript-with-document-sandbox`
- `swc-typescript` / `swc-typescript-with-document-sandbox`
- `react-javascript` / `react-javascript-with-document-sandbox`
- `react-typescript` / `react-typescript-with-document-sandbox`

**Characteristics:**
- Files in `src/` are bundled to `dist/`
- `manifest.json` paths point to bundled output files
- Has `webpack.config.js` file
- Requires `npm run build` to generate `dist/` folder

**Document sandbox path in manifest:**
```json
"documentSandbox": "code.js"  // Just filename - webpack outputs to dist/code.js
```

**Why the difference?**
- No-build: `"sandbox/code.js"` → Adobe Express loads `src/sandbox/code.js` directly
- Build: `"code.js"` → Webpack bundles `src/sandbox/code.js` → outputs to `dist/code.js` → Adobe Express loads `dist/code.js`

<InlineAlert variant="info" slots="text"/>

For more on webpack configuration and build tools, see [Frameworks, Libraries and Bundling](../build/advanced-topics/frameworks-libraries-bundling.md).

## Adding Document Manipulation

When your add-on needs to create or modify document content (shapes, text, images), you need the **document sandbox**.

### What Changes?

#### 1. Folder Structure

**Without document sandbox:**
```
src/
├── index.html
├── index.js          # All code here
└── manifest.json
```

**With document sandbox:**
```
src/
├── index.html
├── manifest.json
├── ui/               # UI code moves here
│   ├── index.js
│   └── tsconfig.json
└── sandbox/          # Document code goes here
    ├── code.js
    └── tsconfig.json
```

#### 2. Manifest Configuration

Add the `documentSandbox` property:

```json
{
    "entryPoints": [{
        "type": "panel",
        "main": "index.html",
        "documentSandbox": "sandbox/code.js"  // or "code.js" for build templates
    }]
}
```

#### 3. Code Split

**UI code (`ui/index.js`):**
```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    // Get proxy to communicate with document sandbox
    const sandboxProxy = await addOnUISdk.instance.runtime.apiProxy("documentSandbox");
    
    // UI interactions
    document.getElementById("createBtn").addEventListener("click", async () => {
        await sandboxProxy.createRectangle();  // Call document sandbox
    });
});
```

**Document sandbox code (`sandbox/code.js`):**
```javascript
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

runtime.exposeApi({
    createRectangle: () => {
        const rectangle = editor.createRectangle();
        rectangle.width = 240;
        rectangle.height = 180;
        editor.context.insertionParent.children.append(rectangle);
    }
});
```

**Learn more about communication:**
- [Add-on Architecture Guide](../learn/platform_concepts/architecture.md#communication-flow) - Complete communication patterns
- [Communication APIs Reference](../../references/document-sandbox/communication/index.md) - API documentation
- [Stats Add-on Tutorial](../learn/how_to/tutorials/stats-addon.md) - Build an add-on using communication APIs

## Where Things Go

Here's the definitive guide for organizing your add-on code:

### UI Code (Always in iframe runtime)

**Goes in:**
- No-build templates: `src/index.js`
- Build templates without sandbox: `src/index.js` or `src/index.jsx`
- Templates with sandbox: `src/ui/index.js` or `src/ui/index.jsx`

**Includes:**
- ✅ HTML manipulation (`document.getElementById`, etc.)
- ✅ CSS and styling
- ✅ User input handling (forms, buttons, clicks)
- ✅ Add-on UI SDK calls ([dialogs](../learn/how_to/modal_dialogs.md), [OAuth](../learn/how_to/oauth2.md), [exports](../learn/how_to/create_renditions.md))
- ✅ Network requests (`fetch`, API calls)
- ✅ Communication with document sandbox

See the [Add-on UI SDK Reference](../../references/addonsdk/index.md) for complete API documentation.

### Document Manipulation Code (Only in document sandbox)

**Goes in:**
- `src/sandbox/code.js` (or `code.ts`)

**Includes:**
- ✅ Creating shapes, text, images
- ✅ Modifying document content
- ✅ Reading document properties
- ✅ Express Document SDK operations
- ❌ NO DOM access
- ❌ NO styling
- ❌ NO HTML manipulation

See the [Document APIs Reference](../../references/document-sandbox/document-apis/index.md) for complete API documentation and the [Document API Concepts Guide](../learn/platform_concepts/document-api.md) for detailed explanations.

**Available APIs in document sandbox:**
- ✅ Standard JavaScript built-ins (`Date`, `Math`, `JSON`, etc.)
- ✅ `console` API
- ✅ `Blob` API (limited implementation)
- ✅ Express Document SDK (`editor` object)
- ❌ NO `setTimeout()` / `setInterval()`
- ❌ NO `fetch()` / `XMLHttpRequest`
- ❌ NO DOM APIs

For the complete list of available Web APIs, see the [Web APIs Reference](../../references/document-sandbox/web/index.md).

### CSS/Styling

**Always goes in iframe runtime, never in document sandbox.**

| Template Type | CSS Location | How to Use |
|---------------|--------------|------------|
| **javascript** | `src/styles.css` | `<link rel="stylesheet" href="styles.css">` in `index.html` |
| **javascript-with-document-sandbox** | `src/styles.css` or `src/ui/styles.css` | `<link rel="stylesheet" href="styles.css">` in `index.html` |
| **swc-javascript/typescript** | `src/components/App.css.js` or `.css.ts` | CSS-in-JS: imported in component |
| **react-javascript/typescript** | `src/components/App.css` | `import './App.css'` in component |

### Shared Code

**Important:** Code cannot be directly shared between iframe runtime and document sandbox. Each environment is isolated.

**Options:**
1. **Duplicate code** - Copy utilities into both `ui/` and `sandbox/` folders
2. **Pass data** - Send processed data between environments via API proxy
3. **Types/interfaces** - Can be shared in `src/models/` or `src/types/` (TypeScript only)

For more on why environments are isolated, see the [iframe Runtime Context & Security Guide](../learn/platform_concepts/context.md).

## Quick Reference

### File Locations Cheat Sheet

| What | No-Build | Build (No Sandbox) | Build (With Sandbox) |
|------|----------|-------------------|---------------------|
| **UI Logic** | `src/index.js` | `src/index.js` | `src/ui/index.js` |
| **HTML** | `src/index.html` | `src/index.html` | `src/index.html` |
| **CSS** | `src/styles.css` | `src/components/App.css` | `src/ui/components/App.css` |
| **Document Code** | N/A | N/A | `src/sandbox/code.js` |
| **Manifest** | `src/manifest.json` | `src/manifest.json` | `src/manifest.json` |
| **Output** | `src/` (direct) | `dist/` | `dist/` |

### Manifest Path Cheat Sheet

| Template Type | `main` | `documentSandbox` |
|---------------|--------|-------------------|
| **No-build, no sandbox** | `"index.html"` | N/A |
| **No-build, with sandbox** | `"index.html"` | `"sandbox/code.js"` |
| **Build, no sandbox** | `"index.html"` | N/A |
| **Build, with sandbox** | `"index.html"` | `"code.js"` |

## Understanding UI Options: SWC vs. React

When choosing a template with a build process, you have two main UI approaches: **SWC templates** (vanilla JavaScript) or **React templates** (React framework).

<InlineAlert slots="text" variant="info" />

**Important:** Both template types use Spectrum Web Components by default! The key difference is **how you write your code** (vanilla JavaScript with Lit vs. React with JSX), not which UI components you use.

### What are SWC Templates?

**SWC** stands for **Spectrum Web Components** - Adobe's implementation of the Spectrum design system as web components.

**SWC templates are characterized by:**
- **Vanilla JavaScript** (no UI framework like React)
- **Lit** for creating custom web components
- **Native Spectrum Web Components** (`<sp-button>`, `<sp-theme>`, etc.)
- **CSS-in-JS** (styles written in `.css.ts` or `.css.js` files)
- **Webpack** for bundling

**Key characteristics:**
- ✅ Use native web components directly (`<sp-button>`)
- ✅ Smaller bundle sizes (no React framework)
- ✅ Standards-based web components
- ✅ Great for developers who prefer vanilla JavaScript
- ✅ Spectrum design system built-in
- ❌ Requires learning Lit and web component patterns
- ❌ Less familiar if you're coming from React

<InlineAlert variant="info" slots="text"/>

New to Lit? See the [Using Lit & TypeScript Tutorial](../learn/how_to/tutorials/using-lit-typescript.md) for a complete guide to building add-ons with SWC templates.

### What are React Templates?

React templates use the React framework for building UI.

**React templates are characterized by:**
- **React framework** for component-based UI
- **React wrappers for Spectrum Web Components** (`<Button>`, `<Theme>` from `@swc-react`)
- **JSX syntax** for writing components
- **Standard CSS** files (`.css`)
- **Webpack** for bundling

**Key characteristics:**
- ✅ Familiar React patterns (hooks, JSX, component lifecycle)
- ✅ Use Spectrum Web Components via React wrappers (`@swc-react`)
- ✅ Huge React ecosystem and community
- ✅ Great for complex UIs with lots of state
- ✅ Spectrum design system built-in
- ❌ Larger bundle sizes (includes React framework)
- ❌ Requires learning React if you're new to it

### The Real Difference

Both templates give you Spectrum Web Components, but they differ in **how you use them**:

**SWC Templates (Vanilla JS):**
```javascript
// Use native web components directly
<sp-button size="m" @click=${this._handleClick}>
    Create Rectangle
</sp-button>
```

**React Templates:**
```jsx
// Use React wrappers from @swc-react
<Button size="m" onClick={handleClick}>
    Create Rectangle
</Button>
```

The choice is really about: **Do you prefer vanilla JavaScript/Lit or React?**

### When to Choose SWC Templates

**Choose SWC templates if:**
- ✅ You want to use **Adobe's Spectrum design system** out of the box
- ✅ You prefer **vanilla JavaScript** over frameworks
- ✅ You're building a **simple to medium complexity** UI
- ✅ You want **pre-built accessible components** (`<sp-button>`, `<sp-textfield>`, etc.)
- ✅ You're comfortable with **web components** and Lit
- ✅ Your team doesn't already use React
- ✅ You want **smaller bundle sizes**

**Examples of good SWC template use cases:**
- Settings panels with forms
- Tools that use standard UI components (buttons, inputs, dropdowns)
- Add-ons that should match Adobe Express's look and feel
- Simple to medium complexity interfaces
- Projects where accessibility is a priority (Spectrum components are accessible by default)

**Getting started with SWC:**
- [Using Lit & TypeScript Tutorial](../learn/how_to/tutorials/using-lit-typescript.md) - Step-by-step guide to building with SWC templates
- [Using Adobe Spectrum Workshop](../learn/how_to/tutorials/spectrum-workshop/index.md) - Learn Spectrum Web Components

### When to Choose React Templates

**Choose React templates if:**
- ✅ You or your team **already knows React**
- ✅ You're building a **complex UI** with lots of state
- ✅ You need **rich component ecosystems** (many React libraries available)
- ✅ You want **familiar development patterns** (hooks, JSX, etc.)
- ✅ Your add-on has **multiple views or complex workflows**

**Examples of good React template use cases:**
- Multi-step wizards or workflows
- Data visualization tools
- Complex forms with validation
- Add-ons with multiple panels or views
- Projects where you want to use React UI libraries

### Side-by-Side Comparison

| Aspect | SWC Templates | React Templates |
|--------|---------------|-----------------|
| **Framework** | Vanilla JS + Lit | React |
| **Spectrum Components** | Native web components (`<sp-button>`) | React wrappers (`<Button>` from `@swc-react`) |
| **Design System** | ✅ Spectrum built-in | ✅ Spectrum built-in |
| **Component Syntax** | `<sp-button @click=${fn}>` | `<Button onClick={fn}>` |
| **Bundle Size** | Smaller (no framework) | Larger (includes React) |
| **Learning Curve** | Learn Lit + web components | Learn React (if new) |
| **UI Complexity** | Simple to Medium | Medium to Complex |
| **Ecosystem** | Spectrum Web Components | React + Spectrum |
| **Styling** | CSS-in-JS (`.css.ts` files) | Standard CSS (`.css` files) |
| **State Management** | Lit reactive properties | React hooks/state |
| **Accessibility** | ✅ Built-in (Spectrum) | ✅ Built-in (Spectrum) |
| **Developer Experience** | Standards-based | Familiar React patterns |

### The Bottom Line

**If you're new to add-on development:**
- Start with **plain JavaScript** template (no build) to learn the basics
- Move to **SWC JavaScript** when you need a build tool but want simplicity
- Move to **React JavaScript** if you need complex UI or already know React

**If you're an experienced developer:**
- Use **SWC templates** for performance and simplicity
- Use **React templates** if React is your comfort zone or you need complex UIs

**Learn more about Spectrum:**
- [Using Adobe Spectrum Tutorial](../learn/how_to/tutorials/spectrum-workshop/index.md) - Complete workshop on Spectrum Web Components
- [UX Guidelines](../build/design/ux_guidelines/introduction.md) - Design principles for Adobe Express add-ons

## Template Selection Guide

### Quick Decision Tree

```
Do you need to create/modify document content?
│
├─ NO → Do you need a complex UI?
│       │
│       ├─ NO → Use: javascript
│       │
│       └─ YES → Does your team use TypeScript?
│               │
│               ├─ NO → Use: react-javascript
│               └─ YES → Use: react-typescript
│
└─ YES → Do you need a complex UI?
        │
        ├─ NO → Does your team use TypeScript?
        │       │
        │       ├─ NO → Use: javascript-with-document-sandbox
        │       └─ YES → Use: swc-typescript-with-document-sandbox
        │
        └─ YES → Does your team use TypeScript?
                │
                ├─ NO → Use: react-javascript-with-document-sandbox
                └─ YES → Use: react-typescript-with-document-sandbox
```

### Recommendations by Use Case

| Use Case | Recommended Template | Why |
|----------|---------------------|-----|
| Learning add-on development | `javascript` | Simplest, no build tools |
| Simple utility (calculator, converter) | `javascript` | No unnecessary complexity |
| Creating shapes/text in document | `javascript-with-document-sandbox` | Adds document manipulation |
| Complex UI with forms/visualizations | `react-javascript` | React handles complex UIs well |
| Enterprise add-on with document manipulation | `react-typescript-with-document-sandbox` | Full type safety and features |
| Team familiar with TypeScript | Any TypeScript variant | Leverage existing skills |
| Need fast build times | SWC variants | SWC is faster than Babel |

### Migration Path

You can upgrade templates as your add-on grows:

```
javascript
    ↓ (add document manipulation)
javascript-with-document-sandbox
    ↓ (add build tools)
swc-javascript-with-document-sandbox
    ↓ (add React)
react-javascript-with-document-sandbox
    ↓ (add TypeScript)
react-typescript-with-document-sandbox
```

## Template Comparison

### Visual Comparison Matrix

| Template | Build Tool | UI Framework | TypeScript | Doc Sandbox | Complexity |
|----------|-----------|--------------|------------|-------------|------------|
| **javascript** | ❌ None | Vanilla JS | ❌ | ❌ | ⭐ Simplest |
| **javascript-with-document-sandbox** | ❌ None | Vanilla JS | ❌ | ✅ | ⭐⭐ |
| **swc-javascript** | ✅ Webpack | Vanilla JS | ❌ | ❌ | ⭐⭐ |
| **swc-javascript-with-document-sandbox** | ✅ Webpack | Vanilla JS | ❌ | ✅ | ⭐⭐⭐ |
| **swc-typescript** | ✅ Webpack | Vanilla JS | ✅ | ❌ | ⭐⭐⭐ |
| **swc-typescript-with-document-sandbox** | ✅ Webpack | Vanilla JS | ✅ | ✅ | ⭐⭐⭐⭐ |
| **react-javascript** | ✅ Webpack | React | ❌ | ❌ | ⭐⭐⭐ |
| **react-javascript-with-document-sandbox** | ✅ Webpack | React | ❌ | ✅ | ⭐⭐⭐⭐ |
| **react-typescript** | ✅ Webpack | React | ✅ | ❌ | ⭐⭐⭐⭐ |
| **react-typescript-with-document-sandbox** | ✅ Webpack | React | ✅ | ✅ | ⭐⭐⭐⭐⭐ Most complex |

### Key Template Examples

<InlineAlert variant="info" slots="header, text1"/>

**Want to try SWC TypeScript templates?**

Follow the [Using Lit & TypeScript Tutorial](../learn/how_to/tutorials/using-lit-typescript.md) for a complete walkthrough of building an add-on with the `swc-typescript-with-document-sandbox` template.

#### 1. JavaScript (No Build, No Sandbox)
```
my-addon/
├── src/
│   ├── index.html
│   ├── index.js
│   └── manifest.json
└── tsconfig.json
```

#### 2. JavaScript with Document Sandbox (No Build)
```
my-addon/
├── src/
│   ├── index.html
│   ├── manifest.json
│   ├── sandbox/
│   │   ├── code.js
│   │   └── tsconfig.json
│   └── ui/
│       ├── index.js
│       └── tsconfig.json
└── tsconfig.json
```

#### 3. SWC JavaScript with Document Sandbox (Build)
```
my-addon/
├── src/
│   ├── index.html
│   ├── manifest.json
│   ├── models/
│   │   └── DocumentSandboxApi.ts  # Type definitions
│   ├── sandbox/
│   │   ├── code.js
│   │   └── tsconfig.json
│   └── ui/
│       ├── components/
│       │   ├── App.css.js
│       │   └── App.js
│       ├── index.js
│       └── tsconfig.json
├── tsconfig.json
└── webpack.config.js
```

#### 4. React TypeScript with Document Sandbox (Build)
```
my-addon/
├── src/
│   ├── index.html
│   ├── manifest.json
│   ├── models/
│   │   └── DocumentSandboxApi.ts  # Type definitions
│   ├── sandbox/
│   │   ├── code.ts
│   │   └── tsconfig.json
│   └── ui/
│       ├── components/
│       │   ├── App.css
│       │   └── App.tsx
│       ├── index.tsx
│       └── tsconfig.json
├── tsconfig.json
└── webpack.config.js
```

<InlineAlert slots="text" variant="info" />

**Note:** For complete file structures of all 10 templates, refer to the template-specific documentation or examine the scaffolded project files.

**Hands-on tutorials:**
- [Building Your First Add-on (Grids Tutorial)](../learn/how_to/tutorials/grids-addon.md) - Build a complete add-on with Document APIs
- [Using Lit & TypeScript](../learn/how_to/tutorials/using-lit-typescript.md) - Build with SWC TypeScript template

## FAQs

#### Q: Why does my manifest say `documentSandbox: 'sandbox/code.js'` but the template has `code.js`?

**A:** It depends on whether you're using a build tool:

- **No-build (`javascript-with-document-sandbox`)**: `"documentSandbox": "sandbox/code.js"` - points to source file
- **Build templates (all others)**: `"documentSandbox": "code.js"` - webpack bundles to `dist/code.js`

#### Q: Where do I put my CSS files?

**A:** Always in the iframe runtime, never in document sandbox. See the [CSS/Styling section](#cssstyling) above for specific locations by template type.

#### Q: Why can't I use `document.getElementById()` in my document sandbox code?

**A:** The document sandbox has NO access to the DOM. See the [Document Manipulation Code section](#document-manipulation-code-only-in-document-sandbox) above for the complete list of available and unavailable APIs.

#### Q: Do I need both `index.js` and `ui/index.js`?

**A:** No, it's one or the other:

- **Without document sandbox**: Use `src/index.js`
- **With document sandbox**: Use `src/ui/index.js` (code is organized into `ui/` folder)

#### Q: Why do I have `tsconfig.json` if I'm using JavaScript?

**A:** TypeScript config files provide IDE support (IntelliSense, autocomplete, error checking) even in JavaScript projects. You get better developer experience without needing to learn TypeScript.

#### Q: Can I share utility functions between UI and document sandbox?

**A:** Not directly - each environment is isolated. You have three options:

1. **Duplicate the code** in both `ui/` and `sandbox/` folders
2. **Pass processed data** between environments via the API proxy
3. **Share TypeScript types/interfaces** only (in `src/models/` or `src/types/`)

## Summary

**Key Takeaways:**

1. **Only two templates have no build process:** `javascript` and `javascript-with-document-sandbox`
2. **All other templates use webpack** and output to `dist/`
3. **UI code always goes in iframe runtime** (never in document sandbox)
4. **CSS always goes in iframe runtime** (never in document sandbox)
5. **Document sandbox has limited browser APIs** (no DOM, no setTimeout, no fetch)
6. **Manifest paths differ** between build and no-build templates
7. **Start simple** and upgrade as your add-on grows in complexity

**When in doubt:**
- UI/styling → iframe runtime
- Document manipulation → document sandbox
- Simple add-on → `javascript` template
- Need document access → add `-with-document-sandbox`
- Complex UI → add `react-`
- Type safety → add TypeScript variant

## Related Documentation

### Getting Started
- [Hello, World! Tutorial](./hello-world.md) - Create your first add-on
- [Code Playground](./code_playground.md) - Experiment with add-on APIs in your browser
- [Development Tools](./local_development/dev_tooling.md) - CLI commands and local development
- [Adobe Express Add-on MCP Server](./local_development/mcp_server.md) - AI-assisted development with LLMs

### Core Concepts
- [Developer Terminology](../learn/fundamentals/terminology.md) - Essential terminology reference
- [Add-on Architecture Guide](../learn/platform_concepts/architecture.md) - Deep dive into dual-runtime system

### References
- [Manifest Reference](../../references/manifest/index.md) - Complete manifest configuration
- [Add-on UI SDK Reference](../../references/addonsdk/index.md) - Add-on UI SDK APIs
- [Document APIs Reference](../../references/document-sandbox/document-apis/index.md) - Document manipulation APIs

### Examples
- [Sample Add-ons](../learn/samples.md) - Browse example projects
