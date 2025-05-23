# Developing add-ons with Lit and TypeScript

## Introduction

<ProductCard slots="icon, text, buttons" theme="light" width="50%" />

![lit-logo](images/lit-logo.svg)

Lit is a simple library for building fast, lightweight web components. It's built on top of the Web Components standard and provides a set of tools and utilities to simplify the creation of custom elements. Lit uses modern web standards like JavaScript template literals and reactive properties to create reusable and efficient components with minimal boilerplate required.

- [Learn more](https://lit.dev/)

<ProductCard slots="icon, text, buttons" theme="light" width="50%" />

![typescript-logo](images/ts-logo-128.svg)

TypeScript is a statically typed superset of JavaScript that adds optional static types to the language.TypeScript aims to improve the development experience by providing a robust type system, which helps catch errors early during development and enhances code quality and maintainability.

- [Learn more](https://https://www.typescriptlang.org/)

When you develop add-ons with a combination of [Lit](https://lit.dev/) and [TypeScript](https://https://www.typescriptlang.org/), you get the benefits of both worlds; a lightweight component library with reactive properties and templating capabilities, which help you build fast and efficient components, and the robust type system provided by TypeScript.

## Lit Key Features

### `LitElement` Base Class

Lit provides the `LitElement` base class for creating custom elements. It extends the standard `HTMLElement` and adds reactive properties and templating capabilities. The `LitElement` class is important to understand when working with Lit, as it provides the foundation for building custom elements.

<InlineAlert slots="text" variant="info"/>

Components must have dashes in their name to be valid custom elements. For example, `my-component` is a valid custom element name, while `MyComponent` is not.

### Template Literals

A [template literal](https://lit.dev/docs/templates/overview/) is a string literal that allows embedded expressions. It is enclosed in backticks (\`) and can contain placeholders `(${expression})` for dynamic values. Template literals provide a more flexible and readable way to define strings compared to traditional string concatenation.

### Decorators

A [*decorator*](https://lit.dev/docs/components/decorators/) is a certain type of declaration that can be attached to a class declaration. It is prefixed with an `@` symbol and can be used to modify the behavior of a class or its members. Some popular decorators in Lit include:

- `@customElement`: defines a custom element with a given tag name.
- `@property`: defines a reactive property that triggers a re-render when its value changes.
- `@state`: defines a local state property that triggers a re-render when its value changes. The difference between `@state` and `@property` is that `@state` properties are not exposed as custom element properties. It's useful for managing component-specific state that does not need to be shared with other components.
- `@query`: allows you to query for elements in the component's shadow DOM, for instance, to access a button element with the id `myButton`, you can use `@query('#myButton') myButton: HTMLButtonElement;`.
- `@eventOptions`: allows you to specify event options like `capture`, `once`, and `passive` for event listeners. For example, `@eventOptions({ capture: true }) handleClick() { ... }`.

### Directives

A Lit [*directive*](https://lit.dev/docs/templates/directives/) is a special kind of decorator that allows you to extend the template syntax with custom behavior. Some popular directives include:

- `until`: waits for a promise to resolve before rendering the content.
- `repeat`: repeats a template for each item in an array.
- `ifDefined`: conditionally renders content based on the value being defined.
- `guard`: prevents re-rendering if the value has not changed.
- `cache`: caches the result of an expression to improve performance.
- `live`: updates the DOM when a reactive property changes. It's useful when you need to trigger a side effect or update the DOM based on a property change that's not directly related to rendering the component.
- `asyncReplace`: asynchronously replaces the content of a template. This directive is useful when you need to fetch data asynchronously and update the template once the data is available.
- `asyncAppend`: asynchronously appends content to a template. This directive is useful when you need to fetch data asynchronously and append it to the template once the data is available.
- `css`: a directive that creates a CSS template from a template literal. This directive is used to define CSS styles for a component.

<InlineAlert slots="text" variant="info"/>

The difference between a directive and a decorator is that a directive is applied to a template, while a decorator is applied to a class or a class member.

### `render` Method

The `render` method is defined as a template literal that returns the component's HTML structure. It uses the `html` function from the Lit package to create the template. The `render` method is called whenever the component needs to be re-rendered, for instance, when a reactive property changes. Some methods that are commonly used in the `render` method include:

### Reactive Properties

Lit uses [*reactive properties*](https://lit.dev/docs/components/properties/) to automatically update the DOM when the state of your component changes. You define properties using decorators like `@property`. When a property changes, Lit automatically triggers a re-render of the component. This reactive behavior simplifies the process of managing state and updating the UI.

## TypeScript Key Features

### Static Typing

TypeScript allows you to [define types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#static-type-checking) for variables, function parameters, and return values, which helps catch type-related errors at compile time.

```typescript
let message: string = "Hello, TypeScript!";
```

### Type Inference

TypeScript can automatically [infer types](https://www.typescriptlang.org/docs/handbook/type-inference.html#handbook-content) based on the assigned values, reducing the need for explicit type annotations.

```typescript
let count = 42; // inferred as number
```

### Interfaces

[Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces) define the shape of an object, specifying the properties and their types. They help enforce consistent object structures.

```typescript
interface User {
  name: string;
  age: number;
}
```

### Classes

TypeScript supports object-oriented programming with [classes](https://www.typescriptlang.org/docs/handbook/2/classes.html), including features like inheritance, access modifiers, and decorators.

```typescript
class Person {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

### Modules

TypeScript uses [ES6 module syntax](https://www.typescriptlang.org/docs/handbook/2/modules.html) to organize code into reusable modules, making it easier to manage large codebases.

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// main.ts
import { add } from "./math";
console.log(add(2, 3));
```

### Generics

[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content) allow you to create reusable components that work with various types, providing flexibility and type safety.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

## Add-on Project Anatomy

When you use the CLI to create an add-on based on Lit and TypeScript (ie: the [`swc-typescript`](https://github.com/adobe/create-ccweb-add-on/tree/main/packages/create-ccweb-add-on/templates/swc-typescript/template) or [`swc-typescript-with-document-sandbox`](https://github.com/adobe/create-ccweb-add-on/tree/main/packages/create-ccweb-add-on/templates/swc-typescript-with-document-sandbox/template) templates), the CLI generates a project structure that includes the necessary files and configurations to get you started quickly. For instance:

| File/Folder                        | Description                                                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/index.html`                   | The main HTML template that loads your add-on.                                                                  |
| `src/index.ts`                     | The entry point for your add-on, where you define your Lit components.                                          |
| `src/ui/components`                | The directory where you define your Lit components.                                                             |
| `src/ui/components/App.ts`         | The main application component that uses the Adobe Add-On UI SDK to interact with the document sandbox runtime. |
| `src/ui/components/App.css.ts`     | The CSS styles for the main application component.                                                              |
| `src/models`                       | The directory where you define TypeScript interfaces for your add-on APIs.                                      |
| `src/models/DocumentSandboxApi.ts` | The TypeScript interface for the APIs exposed by the document sandbox runtime.                                  |
| `src/sandbox/code.ts`              | The implementation of the document sandbox runtime.                                                             |
| `src/sandbox/tsconfig.json`        | The TypeScript configuration file that specifies the compiler options for your project.                         |

A more in-depth description of the files and folders in the project structure is provided below.

### index.html

This is the main HTML file that serves as the entry point for the web application. It includes the custom element `<add-on-root>`, which is defined in `index.ts`.

```html
<body>
  <add-on-root></add-on-root>
</body>
```

### index.ts

This file defines the root custom element `<add-on-root>` using Lit. It initializes the Adobe Add-On UI SDK and renders the `<add-on-app>` component once the SDK is ready.

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import "./components/App";

import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

@customElement("add-on-root") // Lit customElement decorator defines a custom element <add-on-root>.
export class Root extends LitElement {
  @state()
  private _isAddOnUISdkReady = addOnUISdk.ready;

  // The render method returns an HTML template that uses the until
  // directive to wait for the Add-On UI SDK to be ready. Once the
  // SDK is ready, it renders the <add-on-app> component.
  render() {
    // This block is a template literal that returns an HTML template
    // using the Lit html function. denoted by it being enclosed in
    // backticks (`). Dynamic values are inserted using placeholders
    // like (${expression}).
    return html`
      ${until(
        // The until directive is used to wait for a promise
        // to resolve before rendering the content.
        this._isAddOnUISdkReady.then(async () => {
          console.log("addOnUISdk is ready for use.");
          return html`<add-on-app .addOnUISdk=${addOnUISdk}></add-on-app>`;
        })
      )}
    `;
  }
}
```

### App.ts

Defines the main application component `<add-on-app>` using Lit. It uses the Adobe Add-On UI SDK to interact with the document sandbox runtime and provides a button to create a rectangle in the document.

```typescript
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";
import { style } from "./App.css";

import {
  AddOnSDKAPI,
  RuntimeType,
} from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// The following line defines a custom element <add-on-app> using the Lit
// customElement decorator.
@customElement("add-on-app")
export class App extends LitElement {
  @property({ type: Object })
  addOnUISdk!: AddOnSDKAPI;

  @state()
  private _sandboxProxy: DocumentSandboxApi;

  static get styles() {
    return style;
  }

  async firstUpdated(): Promise<void> {
    const { runtime } = this.addOnUISdk.instance;
    this._sandboxProxy = await runtime.apiProxy(RuntimeType.documentSandbox);
  }

  private _handleClick() {
    this._sandboxProxy.createRectangle();
  }
  // The render method returns an HTML template that uses the .container
  // class defined in the CSS.
  render() {
    // This block is a template literal that returns an HTML template
    // using the Lit html function. A template literal in Lit is
    // enclosed in backticks (`) and can contain placeholders (${expression})
    // for dynamic values.
    return html` <sp-theme
      theme="express"
      color="light"
      scale="medium"
    >
      <div class="container">
        <sp-button
          size="m"
          @click=${this._handleClick}
          >Create Rectangle</sp-button
        >
      </div>
    </sp-theme>`;
  }
}
```

### App.css.ts

Defines the CSS styles for the `<add-on-app>` component using Lit's `css` tagged template literal.

```typescript
import { css } from "lit"; // Import the css function from the lit package

// The following block defines the CSS styles for the .container class
// using the css tagged template literal. The styles are defined within
// backticks (`) and are passed to the css function to create a CSSResult
// object. A CSSResult object is a representation of CSS that can be applied
// to a LitElement component.
export const style = css`
  .container {
    margin: 24px;
    display: flex;
    flex-direction: column;
  }
`;
```

### DocumentSandboxApi.ts

Defines the TypeScript interface for the APIs that the [document sandbox runtime](../../../../references/document-sandbox/index.md) exposes to the UI runtime. Once you define an interface, any object that implements that interface must implement to the contract defined in the interface. The document sandbox runtime implements this interface in the `code.ts` file.

```typescript
export interface DocumentSandboxApi {
  //
  createRectangle(): void;
}
```

### code.ts

Contains the implementation of the document sandbox runtime. It defines the `createRectangle` function and exposes it to the UI runtime (ie: the code running in the iframe in the `ui` folder).

```typescript
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
// Import the DocumentSandboxApi interface from the models folder
import { DocumentSandboxApi } from "../models/DocumentSandboxApi";

const { runtime } = addOnSandboxSdk.instance;

function start(): void {
  // The following block defines a sandboxApi object that implements the
  // DocumentSandboxApi interface. Since it implements the interface, it
  // must provide an implementation for the createRectangle function.
  const sandboxApi: DocumentSandboxApi = {
    createRectangle: () => {
      const rectangle = editor.createRectangle();
      rectangle.width = 240;
      rectangle.height = 180;
      rectangle.translation = { x: 10, y: 10 };
      const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };
      const rectangleFill = editor.makeColorFill(color);
      rectangle.fill = rectangleFill;
      const insertionParent = editor.context.insertionParent;
      insertionParent.children.append(rectangle);
    },
  };
  const sandboxApi: DocumentSandboxApi = {
    createRectangle: () => {
      const rectangle = editor.createRectangle();
      rectangle.width = 240;
      rectangle.height = 180;
      rectangle.translation = { x: 10, y: 10 };
      const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };
      const rectangleFill = editor.makeColorFill(color);
      rectangle.fill = rectangleFill;
      const insertionParent = editor.context.insertionParent;
      insertionParent.children.append(rectangle);
    },
  };

  runtime.exposeApi(sandboxApi);
}

start();
```

### tsconfig.json

Specifies the TypeScript compiler options for your project. It includes settings like the target ECMAScript version, module format, and output directory.

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

## Create a New Lit Component

To create a new component using Lit and TypeScript, follow these steps:

#### Step 1: Create a new TypeScript file in the `src/ui/components` directory.

```bash
touch src/ui/components/MyCustomButton.ts
```

#### Step 2: Define a new class that extends `LitElement` and implements your component logic.

```typescript
import { LitElement, html } from "lit";
// Import the customElement and state decorators from the lit package
import { customElement, state } from "lit/decorators.js";
@customElement("my-custom-button") // Decorator defines my-custom-button

// Define a custom LitElement component MyCustomButton that extends LitElement.
// The code includes a state property message that holds the text to be
// displayed and a render method that returns an HTML template. The template
// includes a button element that triggers the handleClick method when clicked
// and displays the message property value.
export class MyCustomButton extends LitElement {
  @state()
  private message = "Hello, Lit!";

  render() {
    return html`
      <sp-button @click="${this.handleClick}">Send</sp-button>
      <p>${this.message}</p>
    `;
  }

  handleClick() {
    this.message = "Custom Button Clicked!";
  }
}
```

#### Step 2: Import the Component

To use the new component in your application, import it in the `App.ts` file and include it in the render method.

```typescript
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
// Import the MyCustomButton component
import { MyCustomButton } from "./MyCustomButton";

@customElement("add-on-app")
// Now you can use the MyCustomButton component in the render method of
// the App component. For instance in the block below:
export class App extends LitElement {
    ...
    render() {
        return html` <sp-theme theme="express" color="light" scale="medium">
            <div class="container">
                <sp-button size="m" @click=${this._handleClick}>Create Rectangle</sp-button>
                <my-custom-button></my-custom-button>
            </div>
        </sp-theme>`;
    }
    ...
}
```

## Next Steps

Next, you can explore more advanced features of Lit and TypeScript to enhance your components. Some areas to explore include:

- [**Event Handling**](https://lit.dev/docs/v1/components/events/): Learn how to handle events in Lit components and communicate between components.
- [**Component Composition**](https://lit.dev/docs/composition/component-composition/): Explore how to compose multiple components together to create complex UIs.
- [**State Management**](https://lit.dev/articles/lit-cheat-sheet/#data-flow-and-state-management): Implement state management solutions like Redux or MobX to manage the state of your components.
- [**Performance Optimization**](https://lit.dev/docs/components/events/#optimizing-for-performance): Optimize your components for performance by using memoization, lazy loading, and other techniques.
- [**Testing**](https://lit.dev/docs/tools/testing/): Write unit tests for your components using tools like Jest or Mocha to ensure their correctness and reliability.

Check out [this handy cheat sheet](https://lit.dev/articles/lit-cheat-sheet/#shadow-dom) on properties and state for further reference throughout your development.
