hschinsk_adobe: generate a useful information architecture for this whole set of pages for a website

Workspace: Still building the workspace index, response may be less accurate.

Here is a proposed information architecture for the set of pages in your website:

```
Home
|
|-- Guides
|   |-- Debug
|   |   |-- [Debugging with Visual Studio Code](src/pages/guides/debug/vs-code.md)
|   |
|   |-- Develop
|   |   |-- [Frameworks, Libraries, and Bundling](src/pages/guides/develop/frameworks-libraries-bundling.md)
|   |   |-- [Cross-Origin Isolation](src/pages/guides/develop/coi.md)
|   |   |-- [Content Authoring](src/pages/guides/develop/use_cases/content_authoring.md)
|   |
|   |-- Design
|   |   |-- UX Guidelines
|   |       |-- [Visual Elements](src/pages/guides/design/ux_guidelines/visual_elements.md)
|   |
|   |-- Distribute
|   |   |-- [Public Distribution](src/pages/guides/distribute/public-dist.md)
|   |   |-- [Listing Guide](src/pages/guides/distribute/listing_guide.md)
|   |
|   |-- Tutorials
|   |   |-- Spectrum Workshop
|   |       |-- [Part 3](src/pages/guides/tutorials/spectrum-workshop/part3.md)
|   |   |-- [Grids Add-on](src/pages/guides/tutorials/grids-addon.md)
|
|-- References
|   |-- Add-on SDK
|   |   |-- [Instance Client Storage](src/pages/references/addonsdk/instance-clientStorage.md)
|   |   |-- [Instance Manifest](src/pages/references/addonsdk/instance-manifest.md)
|   |   |-- [App Document](src/pages/references/addonsdk/app-document.md)
|
|-- Samples
|   |-- [Samples Overview](src/pages/samples.md)
|
|-- FAQ
|   |-- [Frequently Asked Questions](src/pages/guides/faq.md)
|
|-- About
|   |-- [README](README.md)
|   |-- [Code of Conduct](CODE_OF_CONDUCT.md)
|   |-- [License](LICENSE)
|   |-- [Copyright](COPYRIGHT)
|
|-- .github
|   |-- Workflows
|   |   |-- [Deploy](.github/workflows/deploy.yml)
|   |   |-- [GitHub Pages](.github/workflows/github-pages.yml)
|   |   |-- [Algolia Indexing](.github/workflows/algolia-indexing.yml)
|   |
|   |-- Scripts
|       |-- [Get Path Prefix](.github/scripts/get-path-prefix.js)
|
|-- Configuration
|   |-- [.eslintrc.json](.cache/_this_is_virtual_fs_path_/.eslintrc.json)
|   |-- [.markdownlint.yml](.markdownlint.yml)
|   |-- [.yarnrc.yml](.yarnrc.yml)
|   |-- [gatsby-config.js](gatsby-config.js)
|   |-- [package.json](package.json)
|   |-- [.env.example](.env.example)
```

This structure organizes the content into logical sections, making it easier for users to navigate and find the information they need.

hschinsk_adobe: The developer documentation selected needs a proper and logical  information architecture to outline the areas of documentation related to how-to guides for developing, designing, debugging, and references including the Document Sandbox API references and the AddOnSdk references

Workspace: Here is a proposed information architecture for your developer documentation, organized into logical sections for developing, designing, debugging, and references:

```
Home
|
|-- Getting Started
|   |-- [Introduction](src/pages/guides/getting_started/index.md)
|   |-- [Quickstart](src/pages/guides/getting_started/quickstart.md)
|   |-- [Development Tools](src/pages/guides/getting_started/dev_tooling.md)
|
|-- Guides
|   |-- [Overview](src/pages/guides/index.md)
|   |-- Develop
|   |   |-- [Frameworks, Libraries, and Bundling](src/pages/guides/develop/frameworks-libraries-bundling.md)
|   |   |-- [Cross-Origin Isolation](src/pages/guides/develop/coi.md)
|   |   |-- [Use Cases](src/pages/guides/develop/use_cases.md)
|   |   |-- [Performance](src/pages/guides/develop/performance.md)
|   |-- Design
|   |   |-- [Overview](src/pages/guides/design/index.md)
|   |   |-- [UX Guidelines](src/pages/guides/design/ux_guidelines/introduction.md)
|   |   |-- [Implementation Guide](src/pages/guides/design/implementation_guide.md)
|   |-- Debug
|   |   |-- [Overview](src/pages/guides/debug/index.md)
|   |   |-- [Browser Debugging](src/pages/guides/debug/browser.md)
|   |-- Distribute
|   |   |-- [Overview](src/pages/guides/distribute/index.md)
|   |   |-- [Listing Guide](src/pages/guides/distribute/listing_guide.md)
|   |   |-- [Review Process](src/pages/guides/distribute/review_process/index.md)
|   |   |-- Guidelines
|   |       |-- [General](src/pages/guides/distribute/guidelines/general/index.md)
|   |       |-- [Brand Guidelines](src/pages/guides/distribute/guidelines/brand_guidelines.md)
|   |       |-- [Monetization](src/pages/guides/distribute/guidelines/monetization.md)
|   |       |-- [Generative AI](src/pages/guides/distribute/guidelines/genai/index.md)
|
|-- Tutorials
|   |-- [Overview](src/pages/guides/tutorials/index.md)
|   |-- [Grids Add-on](src/pages/guides/tutorials/grids-addon.md)
|   |-- [Spectrum Workshop](src/pages/guides/tutorials/spectrum-workshop/index.md)
|   |-- [Stats Add-on](src/pages/guides/tutorials/stats-addon.md)
|
|-- References
|   |-- [Overview](src/pages/references/index.md)
|   |-- Add-on SDK
|   |   |-- [Add-on UI SDK](src/pages/references/addonsdk/addonsdk.md)
|   |   |-- [App](src/pages/references/addonsdk/addonsdk-app.md)
|   |   |-- [Document](src/pages/references/addonsdk/app-document.md)
|   |   |-- [OAuth](src/pages/references/addonsdk/app-oauth.md)
|   |-- Document Sandbox
|   |   |-- [Overview](src/pages/references/document-sandbox/index.md)
|   |   |-- [Communication APIs](src/pages/references/document-sandbox/communication/index.md)
|   |   |-- [Web APIs](src/pages/references/document-sandbox/web/index.md)
|   |   |-- Document APIs
|   |       |-- [Concepts](src/pages/references/document-sandbox/document-apis/concepts/index.md)
|   |       |-- [Overview](src/pages/references/document-sandbox/document-apis/overview.md)
|   |       |-- [Classes](src/pages/references/document-sandbox/document-apis/classes/Editor.md)
|   |-- Manifest Schema
|   |   |-- [Overview](src/pages/references/manifest/index.md)
|
|-- Changelog
|   |-- [Changelog](src/pages/references/changelog.md)
|
|-- Samples
|   |-- [Samples Overview](src/pages/samples.md)
|
|-- FAQ
|   |-- [Frequently Asked Questions](src/pages/guides/faq.md)
|
|-- About
|   |-- [README](README.md)
|   |-- [Code of Conduct](CODE_OF_CONDUCT.md)
|   |-- [License](LICENSE)
|   |-- [Copyright](COPYRIGHT)
```

This structure organizes the content into logical sections, making it easier for users to navigate and find the information they need.

hschinsk_adobe: generate a troubleshooting page for this content which can help developers identify and fix issues that arise during add-on development



hschinsk_adobe: rewrite the code snippets in react throughout tutorial

GitHub Copilot: Sure, I'll provide a React-based code snippet for a typical grids add-on tutorial. Here is an example of how you might structure a React component for a grids add-on:

### Original Code Snippet (Assuming it was in plain JavaScript or another framework)

```javascript
// Original code snippet
const gridContainer = document.getElementById('grid-container');
const gridItem = document.createElement('div');
gridItem.className = 'grid-item';
gridItem.innerText = 'Item 1';
gridContainer.appendChild(gridItem);
```

### Rewritten Code Snippet in React

```jsx
import React from 'react';
import './Grid.css'; // Assuming you have a CSS file for styling

const GridItem = ({ text }) => {
  return (
    <div className="grid-item">
      {text}
    </div>
  );
};

const GridContainer = () => {
  return (
    <div id="grid-container">
      <GridItem text="Item 1" />
      {/* Add more GridItem components as needed */}
    </div>
  );
};

export default GridContainer;
```

### Explanation

1. **GridItem Component**: This is a functional component that takes a `text` prop and renders a `div` with the class `grid-item` and the provided text.
2. **GridContainer Component**: This component renders a `div` with the id `grid-container` and includes one or more `GridItem` components.

### Usage

To use the `GridContainer` component, you would import and render it in your main application file:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import GridContainer from './GridContainer';

ReactDOM.render(
  <React.StrictMode>
    <GridContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### CSS (Grid.css)

You can style the grid items using a CSS file:

```css
#grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
}
```

This example demonstrates how to convert a simple grid layout from plain JavaScript to a React component-based structure. You can expand this approach to cover more complex scenarios and additional functionality as needed.

hschinsk_adobe: rewrite this code in Lit

```html
<body>
  <sp-theme scale="medium" color="light" theme="express">
    <h3>Framework status</h3>
    <hr>
    <div class="row">
      <sp-status-light size="m" variant="negative" id="iframe-status">
        iFrame API
      </sp-status-light>
      <sp-status-light size="m" variant="negative" id="document-status">
        Authoring API
      </sp-status-light>
    </div>
    <h3>Document statistics</h3>
    <hr>
    <div class="row">
      <sp-table size="m">
        <sp-table-head>
          <sp-table-head-cell>Element</sp-table-head-cell>
          <sp-table-head-cell>Count</sp-table-head-cell>
        </sp-table-head>
        <sp-table-body id="stats-table-body">
          <sp-table-row id="row-placeholder">
            <sp-table-cell>Get the Document stats first...</sp-table-cell>
          </sp-table-row>
        </sp-table-body>
      </sp-table>
    </div>
    <div class="row align-right">
      <sp-button id="stats">Analyze document</sp-button>
    </div>
  </sp-theme>
</body>
```


GitHub Copilot: Here is the rewritten code in Lit:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stats Add-On</title>
  <script type="module">
    import { LitElement, html, css } from 'lit';
    import '@spectrum-web-components/theme/sp-theme.js';
    import '@spectrum-web-components/status-light/sp-status-light.js';
    import '@spectrum-web-components/table/sp-table.js';
    import '@spectrum-web-components/table/sp-table-head.js';
    import '@spectrum-web-components/table/sp-table-head-cell.js';
    import '@spectrum-web-components/table/sp-table-body.js';
    import '@spectrum-web-components/table/sp-table-row.js';
    import '@spectrum-web-components/table/sp-table-cell.js';
    import '@spectrum-web-components/button/sp-button.js';

    class StatsAddon extends LitElement {
      static styles = css`
        .row {
          display: flex;
          margin-bottom: 16px;
        }
        .align-right {
          justify-content: flex-end;
        }
      `;

      render() {
        return html`
          <sp-theme scale="medium" color="light" theme="express">
            <h3>Framework status</h3>
            <hr>
            <div class="row">
              <sp-status-light size="m" variant="negative" id="iframe-status">
                iFrame API
              </sp-status-light>
              <sp-status-light size="m" variant="negative" id="document-status">
                Authoring API
              </sp-status-light>
            </div>
            <h3>Document statistics</h3>
            <hr>
            <div class="row">
              <sp-table size="m">
                <sp-table-head>
                  <sp-table-head-cell>Element</sp-table-head-cell>
                  <sp-table-head-cell>Count</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body id="stats-table-body">
                  <sp-table-row id="row-placeholder">
                    <sp-table-cell>Get the Document stats first...</sp-table-cell>
                  </sp-table-row>
                </sp-table-body>
              </sp-table>
            </div>
            <div class="row align-right">
              <sp-button id="stats">Analyze document</sp-button>
            </div>
          </sp-theme>
        `;
      }
    }

    customElements.define('stats-addon', StatsAddon);
  </script>
</head>
<body>
  <stats-addon></stats-addon>
</body>
</html>
```

This code defines a custom LitElement component named `StatsAddon` that encapsulates the HTML structure and styles. The component is then used in the body of the HTML document.

hschinsk_adobe: rewrite all code snippets into Lit and React 

GitHub Copilot: Sure, I'll provide both Lit and React versions of the code snippets.

### Lit Version

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stats Add-On</title>
  <script type="module">
    import { LitElement, html, css } from 'lit';
    import '@spectrum-web-components/theme/sp-theme.js';
    import '@spectrum-web-components/status-light/sp-status-light.js';
    import '@spectrum-web-components/table/sp-table.js';
    import '@spectrum-web-components/table/sp-table-head.js';
    import '@spectrum-web-components/table/sp-table-head-cell.js';
    import '@spectrum-web-components/table/sp-table-body.js';
    import '@spectrum-web-components/table/sp-table-row.js';
    import '@spectrum-web-components/table/sp-table-cell.js';
    import '@spectrum-web-components/button/sp-button.js';

    class StatsAddon extends LitElement {
      static styles = css`
        .row {
          display: flex;
          margin-bottom: 16px;
        }
        .align-right {
          justify-content: flex-end;
        }
      `;

      render() {
        return html`
          <sp-theme scale="medium" color="light" theme="express">
            <h3>Framework status</h3>
            <hr>
            <div class="row">
              <sp-status-light size="m" variant="negative" id="iframe-status">
                iFrame API
              </sp-status-light>
              <sp-status-light size="m" variant="negative" id="document-status">
                Authoring API
              </sp-status-light>
            </div>
            <h3>Document statistics</h3>
            <hr>
            <div class="row">
              <sp-table size="m">
                <sp-table-head>
                  <sp-table-head-cell>Element</sp-table-head-cell>
                  <sp-table-head-cell>Count</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body id="stats-table-body">
                  <sp-table-row id="row-placeholder">
                    <sp-table-cell>Get the Document stats first...</sp-table-cell>
                  </sp-table-row>
                </sp-table-body>
              </sp-table>
            </div>
            <div class="row align-right">
              <sp-button id="stats">Analyze document</sp-button>
            </div>
          </sp-theme>
        `;
      }
    }

    customElements.define('stats-addon', StatsAddon);
  </script>
</head>
<body>
  <stats-addon></stats-addon>
</body>
</html>
```

### React Version

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/status-light/sp-status-light.js';
import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/button/sp-button.js';
import './styles.css'; // Assuming you have a CSS file for styling

const StatsAddon = () => {
  return (
    <sp-theme scale="medium" color="light" theme="express">
      <h3>Framework status</h3>
      <hr />
      <div className="row">
        <sp-status-light size="m" variant="negative" id="iframe-status">
          iFrame API
        </sp-status-light>
        <sp-status-light size="m" variant="negative" id="document-status">
          Authoring API
        </sp-status-light>
      </div>
      <h3>Document statistics</h3>
      <hr />
      <div className="row">
        <sp-table size="m">
          <sp-table-head>
            <sp-table-head-cell>Element</sp-table-head-cell>
            <sp-table-head-cell>Count</sp-table-head-cell>
          </sp-table-head>
          <sp-table-body id="stats-table-body">
            <sp-table-row id="row-placeholder">
              <sp-table-cell>Get the Document stats first...</sp-table-cell>
            </sp-table-row>
          </sp-table-body>
        </sp-table>
      </div>
      <div className="row align-right">
        <sp-button id="stats">Analyze document</sp-button>
      </div>
    </sp-theme>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <StatsAddon />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### CSS (styles.css)

```css
.row {
  display: flex;
  margin-bottom: 16px;
}

.align-right {
  justify-content: flex-end;
}
```

In the React version, we use JSX to define the structure and import the necessary Spectrum Web Components. The `StatsAddon` component is rendered into the root element of the HTML document. The CSS file is used to style the components similarly to the Lit version.

hschinsk_adobe: write a guide for using the LIT framework for adobe express add-on development using AI

GitHub Copilot: ## Guide for Using the Lit Framework for Adobe Express Add-On Development

This guide will help you get started with developing Adobe Express add-ons using the Lit framework. Lit is a simple library for building fast, lightweight web components.

### Prerequisites

- Basic knowledge of JavaScript, HTML, and CSS
- Node.js and npm installed on your machine

### Step 1: Set Up Your Development Environment

1. **Create a new project directory:**

   ```bash
   mkdir adobe-express-addon
   cd adobe-express-addon
   ```

2. **Initialize a new npm project:**

   ```bash
   npm init -y
   ```

3. **Install Lit and other necessary dependencies:**

   ```bash
   npm install lit @spectrum-web-components/theme @spectrum-web-components/status-light @spectrum-web-components/table @spectrum-web-components/button
   ```

### Step 2: Create Your Lit Component

1. **Create a new file for your Lit component:**

   ```bash
   touch src/StatsAddon.js
   ```

2. **Define your Lit component in `src/StatsAddon.js`:**

   ```javascript
   import { LitElement, html, css } from 'lit';
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/status-light/sp-status-light.js';
   import '@spectrum-web-components/table/sp-table.js';
   import '@spectrum-web-components/table/sp-table-head.js';
   import '@spectrum-web-components/table/sp-table-head-cell.js';
   import '@spectrum-web-components/table/sp-table-body.js';
   import '@spectrum-web-components/table/sp-table-row.js';
   import '@spectrum-web-components/table/sp-table-cell.js';
   import '@spectrum-web-components/button/sp-button.js';

   class StatsAddon extends LitElement {
     static styles = css`
       .row {
         display: flex;
         margin-bottom: 16px;
       }
       .align-right {
         justify-content: flex-end;
       }
     `;

     render() {
       return html`
         <sp-theme scale="medium" color="light" theme="express">
           <h3>Framework status</h3>
           <hr />
           <div class="row">
             <sp-status-light size="m" variant="negative" id="iframe-status">
               iFrame API
             </sp-status-light>
             <sp-status-light size="m" variant="negative" id="document-status">
               Authoring API
             </sp-status-light>
           </div>
           <h3>Document statistics</h3>
           <hr />
           <div class="row">
             <sp-table size="m">
               <sp-table-head>
                 <sp-table-head-cell>Element</sp-table-head-cell>
                 <sp-table-head-cell>Count</sp-table-head-cell>
               </sp-table-head>
               <sp-table-body id="stats-table-body">
                 <sp-table-row id="row-placeholder">
                   <sp-table-cell>Get the Document stats first...</sp-table-cell>
                 </sp-table-row>
               </sp-table-body>
             </sp-table>
           </div>
           <div class="row align-right">
             <sp-button id="stats">Analyze document</sp-button>
           </div>
         </sp-theme>
       `;
     }
   }

   customElements.define('stats-addon', StatsAddon);
   ```

### Step 3: Create an HTML File to Use Your Component

1. **Create an `index.html` file:**

   ```bash
   touch index.html
   ```

2. **Add the following content to `index.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Stats Add-On</title>
     <script type="module" src="./src/StatsAddon.js"></script>
   </head>
   <body>
     <stats-addon></stats-addon>
   </body>
   </html>
   ```

### Step 4: Serve Your Project

1. **Install a simple HTTP server to serve your project:**

   ```bash
   npm install -g serve
   ```

2. **Serve your project:**

   ```bash
   serve .
   ```

3. **Open your browser and navigate to the provided local server URL (e.g., `http://localhost:5000`) to see your add-on in action.**

### Step 5: Integrate with Adobe Express

To integrate your Lit component with Adobe Express, follow the Adobe Express add-on development documentation to register and deploy your add-on. Ensure that your component is correctly packaged and accessible as per Adobe's guidelines.

### Conclusion

You have now created a basic Adobe Express add-on using the Lit framework. This guide covered setting up your development environment, creating a Lit component, and serving your project locally. You can expand on this foundation to build more complex and feature-rich add-ons.

hschinsk_adobe: write a guide for using the LIT framework for adobe express add-on development using AI

GitHub Copilot: ## Guide for Using the Lit Framework for Adobe Express Add-On Development

This guide will help you get started with developing Adobe Express add-ons using the Lit framework. Lit is a simple library for building fast, lightweight web components.

### Prerequisites

- Basic knowledge of JavaScript, HTML, and CSS
- Node.js and npm installed on your machine

### Step 1: Set Up Your Development Environment

1. **Create a new project directory:**

   ```bash
   mkdir adobe-express-addon
   cd adobe-express-addon
   ```

2. **Initialize a new npm project:**

   ```bash
   npm init -y
   ```

3. **Install Lit and other necessary dependencies:**

   ```bash
   npm install lit @spectrum-web-components/theme @spectrum-web-components/status-light @spectrum-web-components/table @spectrum-web-components/button
   ```

### Step 2: Create Your Lit Component

1. **Create a new file for your Lit component:**

   ```bash
   mkdir src
   touch src/StatsAddon.js
   ```

2. **Define your Lit component in `src/StatsAddon.js`:**

   ```javascript
   import { LitElement, html, css } from 'lit';
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/status-light/sp-status-light.js';
   import '@spectrum-web-components/table/sp-table.js';
   import '@spectrum-web-components/table/sp-table-head.js';
   import '@spectrum-web-components/table/sp-table-head-cell.js';
   import '@spectrum-web-components/table/sp-table-body.js';
   import '@spectrum-web-components/table/sp-table-row.js';
   import '@spectrum-web-components/table/sp-table-cell.js';
   import '@spectrum-web-components/button/sp-button.js';

   class StatsAddon extends LitElement {
     static styles = css`
       .row {
         display: flex;
         margin-bottom: 16px;
       }
       .align-right {
         justify-content: flex-end;
       }
     `;

     render() {
       return html`
         <sp-theme scale="medium" color="light" theme="express">
           <h3>Framework status</h3>
           <hr />
           <div class="row">
             <sp-status-light size="m" variant="negative" id="iframe-status">
               iFrame API
             </sp-status-light>
             <sp-status-light size="m" variant="negative" id="document-status">
               Authoring API
             </sp-status-light>
           </div>
           <h3>Document statistics</h3>
           <hr />
           <div class="row">
             <sp-table size="m">
               <sp-table-head>
                 <sp-table-head-cell>Element</sp-table-head-cell>
                 <sp-table-head-cell>Count</sp-table-head-cell>
               </sp-table-head>
               <sp-table-body id="stats-table-body">
                 <sp-table-row id="row-placeholder">
                   <sp-table-cell>Get the Document stats first...</sp-table-cell>
                 </sp-table-row>
               </sp-table-body>
             </sp-table>
           </div>
           <div class="row align-right">
             <sp-button id="stats">Analyze document</sp-button>
           </div>
         </sp-theme>
       `;
     }
   }

   customElements.define('stats-addon', StatsAddon);
   ```

### Step 3: Create an HTML File to Use Your Component

1. **Create an `index.html` file:**

   ```bash
   touch index.html
   ```

2. **Add the following content to `index.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Stats Add-On</title>
     <script type="module" src="./src/StatsAddon.js"></script>
   </head>
   <body>
     <stats-addon></stats-addon>
   </body>
   </html>
   ```

### Step 4: Serve Your Project

1. **Install a simple HTTP server to serve your project:**

   ```bash
   npm install -g serve
   ```

2. **Serve your project:**

   ```bash
   serve .
   ```

3. **Open your browser and navigate to the provided local server URL (e.g., `http://localhost:5000`) to see your add-on in action.**

### Step 5: Integrate with Adobe Express

To integrate your Lit component with Adobe Express, follow the Adobe Express add-on development documentation to register and deploy your add-on. Ensure that your component is correctly packaged and accessible as per Adobe's guidelines.

### Conclusion

You have now created a basic Adobe Express add-on using the Lit framework. This guide covered setting up your development environment, creating a Lit component, and serving your project locally. You can expand on this foundation to build more complex and feature-rich add-ons.

hschinsk_adobe: write a guide for using the LIT framework for adobe express add-on development

GitHub Copilot: ## Guide for Using the Lit Framework for Adobe Express Add-On Development

This guide will help you get started with developing Adobe Express add-ons using the Lit framework. Lit is a simple library for building fast, lightweight web components.

### Prerequisites

- Basic knowledge of JavaScript, HTML, and CSS
- Node.js and npm installed on your machine

### Step 1: Set Up Your Development Environment

1. **Create a new project directory:**

   ```bash
   mkdir adobe-express-addon
   cd adobe-express-addon
   ```

2. **Initialize a new npm project:**

   ```bash
   npm init -y
   ```

3. **Install Lit and other necessary dependencies:**

   ```bash
   npm install lit @spectrum-web-components/theme @spectrum-web-components/status-light @spectrum-web-components/table @spectrum-web-components/button
   ```

### Step 2: Create Your Lit Component

1. **Create a new file for your Lit component:**

   ```bash
   mkdir src
   touch src/StatsAddon.js
   ```

2. **Define your Lit component in `src/StatsAddon.js`:**

   ```javascript
   import { LitElement, html, css } from 'lit';
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/status-light/sp-status-light.js';
   import '@spectrum-web-components/table/sp-table.js';
   import '@spectrum-web-components/table/sp-table-head.js';
   import '@spectrum-web-components/table/sp-table-head-cell.js';
   import '@spectrum-web-components/table/sp-table-body.js';
   import '@spectrum-web-components/table/sp-table-row.js';
   import '@spectrum-web-components/table/sp-table-cell.js';
   import '@spectrum-web-components/button/sp-button.js';

   class StatsAddon extends LitElement {
     static styles = css`
       .row {
         display: flex;
         margin-bottom: 16px;
       }
       .align-right {
         justify-content: flex-end;
       }
     `;

     render() {
       return html`
         <sp-theme scale="medium" color="light" theme="express">
           <h3>Framework status</h3>
           <hr />
           <div class="row">
             <sp-status-light size="m" variant="negative" id="iframe-status">
               iFrame API
             </sp-status-light>
             <sp-status-light size="m" variant="negative" id="document-status">
               Authoring API
             </sp-status-light>
           </div>
           <h3>Document statistics</h3>
           <hr />
           <div class="row">
             <sp-table size="m">
               <sp-table-head>
                 <sp-table-head-cell>Element</sp-table-head-cell>
                 <sp-table-head-cell>Count</sp-table-head-cell>
               </sp-table-head>
               <sp-table-body id="stats-table-body">
                 <sp-table-row id="row-placeholder">
                   <sp-table-cell>Get the Document stats first...</sp-table-cell>
                 </sp-table-row>
               </sp-table-body>
             </sp-table>
           </div>
           <div class="row align-right">
             <sp-button id="stats">Analyze document</sp-button>
           </div>
         </sp-theme>
       `;
     }
   }

   customElements.define('stats-addon', StatsAddon);
   ```

### Step 3: Create an HTML File to Use Your Component

1. **Create an `index.html` file:**

   ```bash
   touch index.html
   ```

2. **Add the following content to `index.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Stats Add-On</title>
     <script type="module" src="./src/StatsAddon.js"></script>
   </head>
   <body>
     <stats-addon></stats-addon>
   </body>
   </html>
   ```

### Step 4: Serve Your Project

1. **Install a simple HTTP server to serve your project:**

   ```bash
   npm install -g serve
   ```

2. **Serve your project:**

   ```bash
   serve .
   ```

3. **Open your browser and navigate to the provided local server URL (e.g., `http://localhost:5000`) to see your add-on in action.**

### Step 5: Integrate with Adobe Express

To integrate your Lit component with Adobe Express, follow the Adobe Express add-on development documentation to register and deploy your add-on. Ensure that your component is correctly packaged and accessible as per Adobe's guidelines.

### Conclusion

You have now created a basic Adobe Express add-on using the Lit framework. This guide covered setting up your development environment, creating a Lit component, and serving your project locally. You can expand on this foundation to build more complex and feature-rich add-ons.

hschinsk_adobe: write a guide for using the LIT framework for adobe express add-on development using AI

GitHub Copilot: ## Guide for Using the Lit Framework for Adobe Express Add-On Development

This guide will help you get started with developing Adobe Express add-ons using the Lit framework. Lit is a simple library for building fast, lightweight web components.

### Prerequisites

- Basic knowledge of JavaScript, HTML, and CSS
- Node.js and npm installed on your machine

### Step 1: Set Up Your Development Environment

1. **Create a new project directory:**

   ```bash
   mkdir adobe-express-addon
   cd adobe-express-addon
   ```

2. **Initialize a new npm project:**

   ```bash
   npm init -y
   ```

3. **Install Lit and other necessary dependencies:**

   ```bash
   npm install lit @spectrum-web-components/theme @spectrum-web-components/status-light @spectrum-web-components/table @spectrum-web-components/button
   ```

### Step 2: Create Your Lit Component

1. **Create a new file for your Lit component:**

   ```bash
   mkdir src
   touch src/StatsAddon.js
   ```

2. **Define your Lit component in `src/StatsAddon.js`:**

   ```javascript
   import { LitElement, html, css } from 'lit';
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/status-light/sp-status-light.js';
   import '@spectrum-web-components/table/sp-table.js';
   import '@spectrum-web-components/table/sp-table-head.js';
   import '@spectrum-web-components/table/sp-table-head-cell.js';
   import '@spectrum-web-components/table/sp-table-body.js';
   import '@spectrum-web-components/table/sp-table-row.js';
   import '@spectrum-web-components/table/sp-table-cell.js';
   import '@spectrum-web-components/button/sp-button.js';

   class StatsAddon extends LitElement {
     static styles = css`
       .row {
         display: flex;
         margin-bottom: 16px;
       }
       .align-right {
         justify-content: flex-end;
       }
     `;

     async fetchData() {
       try {
         const response = await fetch('https://api.example.com/stats');
         const data = await response.json();
         this.updateStats(data);
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     }

     updateStats(data) {
       const statsTableBody = this.shadowRoot.getElementById('stats-table-body');
       statsTableBody.innerHTML = '';
       data.forEach(stat => {
         const row = document.createElement('sp-table-row');
         const elementCell = document.createElement('sp-table-cell');
         elementCell.textContent = stat.element;
         const countCell = document.createElement('sp-table-cell');
         countCell.textContent = stat.count;
         row.appendChild(elementCell);
         row.appendChild(countCell);
         statsTableBody.appendChild(row);
       });
     }

     render() {
       return html`
         <sp-theme scale="medium" color="light" theme="express">
           <h3>Framework status</h3>
           <hr />
           <div class="row">
             <sp-status-light size="m" variant="negative" id="iframe-status">
               iFrame API
             </sp-status-light>
             <sp-status-light size="m" variant="negative" id="document-status">
               Authoring API
             </sp-status-light>
           </div>
           <h3>Document statistics</h3>
           <hr />
           <div class="row">
             <sp-table size="m">
               <sp-table-head>
                 <sp-table-head-cell>Element</sp-table-head-cell>
                 <sp-table-head-cell>Count</sp-table-head-cell>
               </sp-table-head>
               <sp-table-body id="stats-table-body">
                 <sp-table-row id="row-placeholder">
                   <sp-table-cell>Get the Document stats first...</sp-table-cell>
                 </sp-table-row>
               </sp-table-body>
             </sp-table>
           </div>
           <div class="row align-right">
             <sp-button id="stats" @click="${this.fetchData}">Analyze document</sp-button>
           </div>
         </sp-theme>
       `;
     }
   }

   customElements.define('stats-addon', StatsAddon);
   ```

### Step 3: Create an HTML File to Use Your Component

1. **Create an `index.html` file:**

   ```bash
   touch index.html
   ```

2. **Add the following content to `index.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Stats Add-On</title>
     <script type="module" src="./src/StatsAddon.js"></script>
   </head>
   <body>
     <stats-addon></stats-addon>
   </body>
   </html>
   ```

### Step 4: Serve Your Project

1. **Install a simple HTTP server to serve your project:**

   ```bash
   npm install -g serve
   ```

2. **Serve your project:**

   ```bash
   serve .
   ```

3. **Open your browser and navigate to the provided local server URL (e.g., `http://localhost:5000`) to see your add-on in action.**

### Step 5: Integrate with Adobe Express

To integrate your Lit component with Adobe Express, follow the Adobe Express add-on development documentation to register and deploy your add-on. Ensure that your component is correctly packaged and accessible as per Adobe's guidelines.

### Conclusion

You have now created a basic Adobe Express add-on using the Lit framework. This guide covered setting up your development environment, creating a Lit component, fetching data from an API, and serving your project locally. You can expand on this foundation to build more complex and feature-rich add-ons.

hschinsk_adobe: write a guide for using the LIT framework for adobe express add-on development using AI

GitHub Copilot: ## Guide for Using the Lit Framework for Adobe Express Add-On Development

This guide will help you get started with developing Adobe Express add-ons using the Lit framework. Lit is a simple library for building fast, lightweight web components.

### Prerequisites

- Basic knowledge of JavaScript, HTML, and CSS
- Node.js and npm installed on your machine

### Step 1: Set Up Your Development Environment

1. **Create a new project directory:**

   ```bash
   mkdir adobe-express-addon
   cd adobe-express-addon
   ```

2. **Initialize a new npm project:**

   ```bash
   npm init -y
   ```

3. **Install Lit and other necessary dependencies:**

   ```bash
   npm install lit @spectrum-web-components/theme @spectrum-web-components/status-light @spectrum-web-components/table @spectrum-web-components/button
   ```

### Step 2: Create Your Lit Component

1. **Create a new file for your Lit component:**

   ```bash
   mkdir src
   touch src/StatsAddon.js
   ```

2. **Define your Lit component in `src/StatsAddon.js`:**

   ```javascript
   import { LitElement, html, css } from 'lit';
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/status-light/sp-status-light.js';
   import '@spectrum-web-components/table/sp-table.js';
   import '@spectrum-web-components/table/sp-table-head.js';
   import '@spectrum-web-components/table/sp-table-head-cell.js';
   import '@spectrum-web-components/table/sp-table-body.js';
   import '@spectrum-web-components/table/sp-table-row.js';
   import '@spectrum-web-components/table/sp-table-cell.js';
   import '@spectrum-web-components/button/sp-button.js';

   class StatsAddon extends LitElement {
     static styles = css`
       .row {
         display: flex;
         margin-bottom: 16px;
       }
       .align-right {
         justify-content: flex-end;
       }
     `;

     async fetchData() {
       try {
         const response = await fetch('https://api.example.com/stats');
         const data = await response.json();
         this.updateStats(data);
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     }

     updateStats(data) {
       const statsTableBody = this.shadowRoot.getElementById('stats-table-body');
       statsTableBody.innerHTML = '';
       data.forEach(stat => {
         const row = document.createElement('sp-table-row');
         const elementCell = document.createElement('sp-table-cell');
         elementCell.textContent = stat.element;
         const countCell = document.createElement('sp-table-cell');
         countCell.textContent = stat.count;
         row.appendChild(elementCell);
         row.appendChild(countCell);
         statsTableBody.appendChild(row);
       });
     }

     render() {
       return html`
         <sp-theme scale="medium" color="light" theme="express">
           <h3>Framework status</h3>
           <hr />
           <div class="row">
             <sp-status-light size="m" variant="negative" id="iframe-status">
               iFrame API
             </sp-status-light>
             <sp-status-light size="m" variant="negative" id="document-status">
               Authoring API
             </sp-status-light>
           </div>
           <h3>Document statistics</h3>
           <hr />
           <div class="row">
             <sp-table size="m">
               <sp-table-head>
                 <sp-table-head-cell>Element</sp-table-head-cell>
                 <sp-table-head-cell>Count</sp-table-head-cell>
               </sp-table-head>
               <sp-table-body id="stats-table-body">
                 <sp-table-row id="row-placeholder">
                   <sp-table-cell>Get the Document stats first...</sp-table-cell>
                 </sp-table-row>
               </sp-table-body>
             </sp-table>
           </div>
           <div class="row align-right">
             <sp-button id="stats" @click="${this.fetchData}">Analyze document</sp-button>
           </div>
         </sp-theme>
       `;
     }
   }

   customElements.define('stats-addon', StatsAddon);
   ```

### Step 3: Create an HTML File to Use Your Component

1. **Create an `index.html` file:**

   ```bash
   touch index.html
   ```

2. **Add the following content to `index.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Stats Add-On</title>
     <script type="module" src="./src/StatsAddon.js"></script>
   </head>
   <body>
     <stats-addon></stats-addon>
   </body>
   </html>
   ```

### Step 4: Serve Your Project

1. **Install a simple HTTP server to serve your project:**

   ```bash
   npm install -g serve
   ```

2. **Serve your project:**

   ```bash
   serve .
   ```

3. **Open your browser and navigate to the provided local server URL (e.g., `http://localhost:5000`) to see your add-on in action.**

### Step 5: Integrate with Adobe Express

To integrate your Lit component with Adobe Express, follow the Adobe Express add-on development documentation to register and deploy your add-on. Ensure that your component is correctly packaged and accessible as per Adobe's guidelines.

### Conclusion

You have now created a basic Adobe Express add-on using the Lit framework. This guide covered setting up your development environment, creating a Lit component, fetching data from an API, and serving your project locally. You can expand on this foundation to build more complex and feature-rich add-ons.

