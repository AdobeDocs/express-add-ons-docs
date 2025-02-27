
hschinsk_adobe: can you write me a getting started guide to building an add-on using the LIT framework?

hschinsk_adobe: please give me a quickstart guide to using LIT framework for building add-ons

hschinsk_adobe: I need a LIT framework guide to building add-ons

GitHub Copilot: Sure, here's a quickstart guide to building an add-on using the Lit framework.

### Quickstart Guide to Building Add-ons with Lit

#### Step 1: Set Up Your Project

1. **Create a new directory for your project:**
   ```sh
   mkdir lit-addon
   cd lit-addon
   ```

2. **Initialize a new npm project:**
   ```sh
   npm init -y
   ```

3. **Install necessary dependencies:**
   ```sh
   npm install lit @spectrum-web-components/theme @spectrum-web-components/button
   ```

4. **Set up your project structure:**
   ```sh
   mkdir src
   touch src/index.js
   touch index.html
   ```

#### Step 2: Create the Lit Component

1. **Edit `src/index.js` to define your Lit component:**

   ```javascript
   import { LitElement, html, css } from 'lit';
   import { customElement, property } from 'lit/decorators.js';
   import "@spectrum-web-components/theme/theme-light.js";
   import "@spectrum-web-components/button/sp-button.js";

   @customElement('my-addon')
   class MyAddon extends LitElement {
     @property({ type: String }) message = 'Hello, Lit!';

     static styles = css`
       :host {
         display: block;
         padding: 16px;
         font-family: Arial, sans-serif;
       }
     `;

     render() {
       return html`
         <sp-theme scale="medium" color="light" theme="express">
           <sp-button @click="${this.handleClick}">Click Me</sp-button>
           <p>${this.message}</p>
         </sp-theme>
       `;
     }

     handleClick() {
       this.message = 'Button Clicked!';
     }
   }
   ```

#### Step 3: Create the HTML File

1. **Edit `index.html` to include your Lit component:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Lit Add-on</title>
       <style>
           body {
               font-family: Arial, sans-serif;
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               height: 100vh;
               margin: 0;
           }
       </style>
   </head>
   <body>
       <my-addon></my-addon>
       <script type="module" src="src/index.js"></script>
   </body>
   </html>
   ```

#### Step 4: Set Up a Development Server

1. **Install a development server:**
   ```sh
   npm install --save-dev lite-server
   ```

2. **Add a start script to `package.json`:**
   ```json
   "scripts": {
     "start": "lite-server"
   }
   ```

3. **Create a `bs-config.json` file for lite-server:**

   ```json
   {
     "server": {
       "baseDir": "./"
     }
   }
   ```

#### Step 5: Run Your Project

1. **Start the development server:**

   ```sh
   npm start
   ```

2. **Open your browser and navigate to `http://localhost:3000` to see your Lit add-on in action.**

### Conclusion

This guide provides a basic setup for building an add-on using the Lit framework. You can expand on this by adding more components, styles, and functionality as needed. The key steps involve setting up your project, creating Lit components, and serving your project using a development server.