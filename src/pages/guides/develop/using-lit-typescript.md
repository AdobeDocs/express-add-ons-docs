# Building Adobe Express Add-ons with Lit and TypeScript

## 1. Introduction

<ProductCard slots="icon, text, buttons" theme="light" width="50%" />

<img src="img/lit-logo.svg" alt="lit-logo" width="70px" height="40px"/>

Lit is a simple library for building fast, lightweight web components. It's built on top of the Web Components standard and provides a set of tools and utilities to simplify the creation of custom elements. Lit uses modern web standards like JavaScript template literals and reactive properties to create reusable and efficient components with minimal boilerplate required.

- [Learn more](https://lit.dev/)

<ProductCard slots="icon, text, buttons" theme="light" width="50%" />

![](img/ts-logo-128.svg)

TypeScript is a statically typed superset of JavaScript that adds optional static types to the language.TypeScript aims to improve the development experience by providing a robust type system, which helps catch errors early during development and enhances code quality and maintainability.

- [Learn more](https://https://www.typescriptlang.org/)

When you develop add-ons with a combination of [Lit](https://lit.dev/) and [TypeScript](https://https://www.typescriptlang.org/), you get the benefits of both worlds; a lightweight component library with reactive properties and templating capabilities, which help you build fast and efficient components, and the robust type system provided by TypeScript.

### Prerequisites

- Node.js 16 or newer
- Familiarity with HTML, CSS, and JavaScript
- Basic understanding of web components
- Adobe Express account

## 2. Getting Started

### Development Environment Setup

1. Install or update the Adobe Express Add-on CLI:

    ```bash
    # For new installation
    npm install -g @adobe/create-ccweb-add-on

    # If you already have it installed, ensure you have the latest version
    npm update -g @adobe/create-ccweb-add-on
    ```

    If you've used the CLI before, you may want to clear the npx cache before creating a new project to ensure you're using the latest version:

    ```bash
    npx clear-npx-cache
    ```

2. Create a new project:

    ```bash
    npx @adobe/create-ccweb-add-on my-lit-addon --template swc-typescript
    ```

3. Navigate to your project and install dependencies:

    ```bash
    cd my-lit-addon
    npm install
    ```

### Project Structure Overview

```
my-lit-addon/
├── src/
│ ├── index.html # Main entry point
│ ├── index.ts # Root component
│ ├── ui/
│ │ ├── components/ # Lit components
│ │ └── styles/ # Component styles
│ ├── models/ # TypeScript interfaces
│ └── sandbox/ # Document sandbox code
├── tsconfig.json # TypeScript configuration
└── package.json # Project dependencies
```

## 3. Building Blocks

### `LitElement` Base Class

Lit provides the `LitElement` base class for creating custom elements. It extends the standard `HTMLElement` and adds reactive properties and templating capabilities. The `LitElement` class is important to understand when working with Lit, as it provides the foundation for building custom elements.

<InlineAlert slots="text" variant="info"/>

Components must have dashes in their name to be valid custom elements. For example, `my-component` is a valid custom element name, while `MyComponent` is not.

### Lit Template Literals

A [template literal](https://lit.dev/docs/templates/overview/) is a string literal that allows embedded expressions. It is enclosed in backticks (\`) and can contain placeholders `(${expression})` for dynamic values. Template literals provide a more flexible and readable way to define strings compared to traditional string concatenation.

### Lit Decorators

A [*decorator*](https://lit.dev/docs/components/decorators/) is a certain type of declaration that can be attached to a class declaration. It is prefixed with an `@` symbol and can be used to modify the behavior of a class or its members. Some popular decorators in Lit include:

- `@customElement`: defines a custom element with a given tag name.
- `@property`: defines a reactive property that triggers a re-render when its value changes.
- `@state`: defines a local state property that triggers a re-render when its value changes. The difference between `@state` and `@property` is that `@state` properties are not exposed as custom element properties. It's useful for managing component-specific state that does not need to be shared with other components.
- `@query`: allows you to query for elements in the component's shadow DOM, for instance, to access a button element with the id `myButton`, you can use `@query('#myButton') myButton: HTMLButtonElement;`. 
- `@eventOptions`: allows you to specify event options like `capture`, `once`, and `passive` for event listeners. For example, `@eventOptions({ capture: true }) handleClick() { ... }`. 

### Lit Directives

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

## TypeScript Integration

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
   import { add } from './math';
   console.log(add(2, 3));
   ```

### Generics

[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content) allow you to create reusable components that work with various types, providing flexibility and type safety.

   ```typescript
   function identity<T>(arg: T): T {
     return arg;
   }
   ```

### Spectrum Web Components Integration

Spectrum Web Components can be used for your UI to maintain consistency with the Adobe Express interface. Below is a quick snippet showing how they can be used as part of an add-on built with Lit and TypeScript:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/theme/sp-theme.js";

@customElement("my-component")
export class MyComponent extends LitElement {
    render() {
        return html`
            <sp-theme theme="express" color="light" scale="medium">
                <sp-button variant="primary">Click me</sp-button>
            </sp-theme>
        `;
    }
}
```
## 4. Advanced Development

### State Management

Lit provides several ways to manage state in your components:

```typescript
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("state-example")
export class StateExample extends LitElement {
    // Public property that triggers renders when changed
    @property({ type: String })
    public title = "Hello";

    // Private state that triggers renders when changed
    @state()
    private _count = 0;

    render() {
        return html`
            <h1>${this.title}</h1>
            <p>Count: ${this._count}</p>
            <sp-button @click=${this._increment}>Increment</sp-button>
        `;
    }

    private _increment() {
        this._count++;
    }
}
```

### Communication Patterns

When building Adobe Express add-ons with Lit and TypeScript, there are several important communication patterns to understand:

#### 1. Component-to-Component Communication

```typescript
// Parent component
@customElement('parent-component')
export class ParentComponent extends LitElement {
    @state()
    private message = 'Hello from parent';

    render() {
        return html`
            <child-component 
                .parentMessage=${this.message}
                @child-event=${this._handleChildEvent}>
            </child-component>
        `;
    }

    private _handleChildEvent(e: CustomEvent) {
        console.log('Received from child:', e.detail);
    }
}

// Child component
@customElement('child-component')
export class ChildComponent extends LitElement {
    @property()
    parentMessage = '';

    private _sendToParent() {
        this.dispatchEvent(new CustomEvent('child-event', {
            detail: 'Message from child',
            bubbles: true,
            composed: true
        }));
    }
}
```

#### 2. Document Sandbox Communication

The Document Sandbox API allows communication between your UI components and the Adobe Express document:

```typescript
// Define the interface for sandbox communication
interface DocumentSandboxApi {
    createShape(): Promise<void>;
    updateElement(id: string, properties: object): Promise<void>;
    // Add other methods as needed
}

@customElement('my-addon-component')
export class MyAddonComponent extends LitElement {
    @state()
    private _sandboxProxy: DocumentSandboxApi;

    async firstUpdated() {
        const { runtime } = this.addOnUISdk.instance;
        this._sandboxProxy = await runtime.apiProxy(RuntimeType.documentSandbox);
    }

    private async _handleAction() {
        try {
            await this._sandboxProxy.createShape();
        } catch (error) {
            console.error('Sandbox communication error:', error);
        }
    }
}
```

#### 3. Event Handling with Spectrum Web Components

When using Spectrum Web Components, handle events with proper TypeScript types:

```typescript
import { SpectrumEvent } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';

@customElement('my-form')
export class MyForm extends LitElement {
    private _handleSubmit(e: SpectrumEvent) {
        e.preventDefault();
        // Handle form submission
    }

    private _handleButtonClick(e: MouseEvent) {
        const button = e.target as HTMLElement;
        // Handle button click
    }

    render() {
        return html`
            <form @submit=${this._handleSubmit}>
                <sp-button @click=${this._handleButtonClick}>
                    Submit
                </sp-button>
            </form>
        `;
    }
}
```

#### 4. State Management Between Components

For larger applications, consider using a state management pattern:

```typescript
// Create a shared state interface
interface SharedState {
    currentTheme: string;
    selectedElements: string[];
}

// Create a simple state manager
class StateManager {
    private static instance: StateManager;
    private state: SharedState = {
        currentTheme: 'light',
        selectedElements: []
    };
    private listeners: Set<(state: SharedState) => void> = new Set();

    static getInstance(): StateManager {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance;
    }

    subscribe(listener: (state: SharedState) => void) {
        this.listeners.add(listener);
        listener(this.state);
        return () => this.listeners.delete(listener);
    }

    updateState(partial: Partial<SharedState>) {
        this.state = { ...this.state, ...partial };
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Use in components
@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
    private stateManager = StateManager.getInstance();

    connectedCallback() {
        super.connectedCallback();
        this.stateManager.subscribe(state => {
            this.requestUpdate();
        });
    }

    private _handleThemeChange(theme: string) {
        this.stateManager.updateState({ currentTheme: theme });
    }
}
```

#### 5. Error Handling and Loading States

Implement proper error handling and loading states for asynchronous operations:

```typescript
@customElement('async-component')
export class AsyncComponent extends LitElement {
    @state() private loading = false;
    @state() private error: Error | null = null;

    async performAction() {
        this.loading = true;
        this.error = null;

        try {
            await this._sandboxProxy.someAsyncOperation();
        } catch (err) {
            this.error = err as Error;
        } finally {
            this.loading = false;
        }
    }

    render() {
        return html`
            ${this.loading ? 
                html`<sp-progress-circle size="m"></sp-progress-circle>` :
                this.error ?
                    html`<sp-banner variant="negative">${this.error.message}</sp-banner>` :
                    html`<sp-button @click=${this.performAction}>Perform Action</sp-button>`
            }
        `;
    }
}
```

These communication patterns help create maintainable and scalable Adobe Express add-ons while leveraging the benefits of both Lit and TypeScript for type safety and better developer experience.

## 5. Testing and Debugging



## Next Steps

Next, you can explore more advanced features of Lit and TypeScript to enhance your components. Some areas to explore include:

- [**Event Handling**](https://lit.dev/docs/v1/components/events/): Learn how to handle events in Lit components and communicate between components.
- [**Component Composition**](https://lit.dev/docs/composition/component-composition/): Explore how to compose multiple components together to create complex UIs.
- [**State Management**](https://lit.dev/articles/lit-cheat-sheet/#data-flow-and-state-management): Implement state management solutions like Redux or MobX to manage the state of your components.
- [**Performance Optimization**](https://lit.dev/docs/components/events/#optimizing-for-performance): Optimize your components for performance by using memoization, lazy loading, and other techniques.
- [**Testing**](https://lit.dev/docs/tools/testing/): Write unit tests for your components using tools like Jest or Mocha to ensure their correctness and reliability.
