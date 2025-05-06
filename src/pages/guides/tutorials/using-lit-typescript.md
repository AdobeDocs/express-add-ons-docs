# Building Adobe Express Add-ons with Lit and TypeScript

## Introduction

<ProductCard slots="icon, text, buttons" theme="light" width="50%" />

<img src="img/lit-logo.svg" alt="lit-logo" width="70px" height="40px"/>

Lit is a simple library for building fast, lightweight web components. It's built on top of the Web Components standard and provides a set of tools and utilities to simplify the creation of custom elements. Lit uses modern web standards like JavaScript template literals and reactive properties to create reusable and efficient components with minimal boilerplate required.

- [Learn more](https://lit.dev/)

<ProductCard slots="icon, text, buttons" theme="light" width="50%" />

![](img/ts-logo-128.svg)

TypeScript is a statically typed superset of JavaScript that adds optional static types to the language.TypeScript aims to improve the development experience by providing a robust type system, which helps catch errors early during development and enhances code quality and maintainability.

- [Learn more](https://https://www.typescriptlang.org/)

When you develop add-ons with a combination of [Lit](https://lit.dev/) and [TypeScript](https://https://www.typescriptlang.org/), you get the benefits of both worlds; a lightweight component library with reactive properties and templating capabilities, which help you build fast and efficient components, and the robust type system provided by TypeScript. 

In this guide, you will learn how to leverage the features of both in your add-on development.

### Prerequisites

- Node.js 18 or newer
- Familiarity with HTML, CSS, and JavaScript
- Basic understanding of web components
- Adobe Express account

## Getting Started

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
│   ├── index.html            # Main HTML entry point
│   ├── index.ts              # Main TypeScript entry point
│   ├── manifest.json         # Add-on manifest
│   ├── models/
│   │   └── DocumentSandboxApi.ts  # API interface definitions
│   ├── sandbox/
│   │   └── code.ts           # Document sandbox implementation
│   └── ui/
│       └── components/       # Lit components
│           └── App.ts        # Main application component
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── webpack.config.js         # Webpack configuration
```

## Lit Key Features

### `LitElement` Base Class

`LitElement` is the lightweight base class in Lit for building web components with minimal code. It extends the browser's native `HTMLElement` and adds:

- **Reactive properties**: Automatically re-renders your component when properties change
- **Declarative templates**: Define your HTML using JavaScript template literals with html
- **Shadow DOM**: Built-in encapsulation for your CSS and DOM structure
- **Lifecycle hooks**: Methods to run code at specific points (creation, connection, updates)

The custom components you create based on `LitElement` are then registered with the browser's global registry via the [`customElements` API](https://lit.dev/docs/api/decorators/#customElement). There are two ways to use this API for defining your elements:

1. `customElements.define('my-element', ElementClass)`
2. Using the [`@customElement` decorator](#decorators) provided by Lit (preferred), as shown here:

    ```js
    import { LitElement, html, css } from 'lit';
    import { customElement } from 'lit/decorators.js';

    @customElement('my-element')
    class MyElement extends LitElement {
    render() {
        return html``;
    }    
    ```

<InlineAlert slots="text" variant="warning"/>

Components must have dashes in their name to be valid custom elements. For example, `my-component` is a valid custom element name, while `MyComponent` is not.

### Template Literals

[Template literals](https://lit.dev/docs/templates/overview/) are used in Lit to define the HTML structure of components. A template literal is a string literal that allows embedded expressions. The template itself looks like a regular JavaScript string, but enclosed in backticks (`\`) instead of quotes, and can span multiple lines. The strings can contain placeholders `${}` for dynamic values (ie: variable names) or any JavaScript expression.

<CodeBlock slots="heading, code" repeat="1" languages="TypeScript" />

##### Examples

```js
// Basic dynamic expression example
let greeting = `My name is ${name}.`; 
console.log(greeting); // output eg; My name is John

// Multiline example
let multiline = `This is line one
This is line two
This is line three`; // no \n newline 

// Conditional example
let welcome = `Welcome, ${loggedIn ? "User" : "Guest"}!`; 
```

#### `html` Tagged Template Literal

A tagged template literal is prefixed with a special template tag function (ie: tag```tag`My name is ${name}.```) The `html` tag function from the `lit` package is an example of a tagged template literal which you'll use in your components to return the component's HTML structure from the lit `render` function, as shown below:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
    render() {
        return html`<p>Hello, World!</p>`; // Renders: <p>Hello, World!</p>
    }
}
```

In this example, the `html` function is used to create the template literal with a simple paragraph (`<p>`) element, which is then rendered in the component's shadow DOM.

#### `css` Tagged Template Literal

[`css`](https://lit.dev/docs/api/styles/#css) is another tagged template literal for creating a CSS template from a template literal. This directive is used to define CSS styles for a component along with the [`static styles`](https://lit.dev/docs/v1/components/styles/) property. For example:

```ts
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
      div { color: ${mainColor} }
  `;
```

Review the code snippets below for more specific examples before moving on.

<CodeBlock slots="heading, code" repeat="4" languages="TypeScript" />

#### Conditionals

```js
return html`
    <button
        @click=${() => {this.someBoolean = !this.someBoolean}}>
        Toggle template
    </button>
    <div>This is an inline ternary conditional</div>
    ${this.someBoolean ? html`<p>Some other text</p>` : html`<p>Some text</p>`}
    <div>This is a variable conditional</div>
    ${someText}
`;
```

#### Expressions

```typescript
const myTemplate = (subtotal, tax) => html`<div>Total: ${subtotal + tax}</div>`;
const myTemplate2 = (name) => html`<div>${formatName(name.given, name.family, name.title)}</div>`;
```

#### Property binding

```typescript
const myTemplate3 = (data) => html`<input .value=${data.value}></input>`;
const myTemplate4 = (data) => html`<my-list .listItems=${data.items}></my-list>`;
```

#### Attribute binding

```typescript
const myTemplate5 = (data) => html`<div class=${data.cssClass}>Stylish text.</div>`

// Boolean attribute binding
const myTemplate6 = (data) => html`<div ?disabled=${!data.active}>Stylish text.</div>`;
```

The specific syntax for each of the binding examples are covered in the [Property Expression Binding](#1-property-binding-expressions) and [Attribute Expression Binding](#2-attribute-binding-expressions).

<InlineAlert slots="text" variant="success"/>

For more information, check out [this comprehensive quick reference on template literals](https://lit.dev/articles/lit-cheat-sheet/#templating) for guidance throughout your development.

### Shadow DOM

The Shadow DOM is a web standard that allows you to encapsulate the styles and markup of a component, preventing them from affecting the rest of the page. Lit uses the Shadow DOM by default (the Shadow DOM is created automatically when you extend the `LitElement` class), which means that styles defined in a component's shadow DOM do not leak out to the rest of the page, and styles from the rest of the page do not affect the component.

Consider the following code snippet:

```js
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-element')
class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 1px solid black;
    }
    p {
      color: blue;
    }
  `;

  render() {
    return html`
      <p>Hello from my-element!</p>
    `;
  }
}
```

This code snippet helps to highlight some key aspects that demonstrate how Shadow DOM works in practice:

1. **DOM Encapsulation**: The `<p>Hello from my-element!</p>` HTML that's rendered by the component is completely enclosed within the Shadow DOM, which means:

    - It's isolated from the rest of the page's DOM.
    - External JavaScript can't easily access or modify these elements.
    - `document.querySelector()` won't find elements inside this component.

2. **Style Encapsulation**: The CSS defined in static styles only applies within this component's Shadow DOM, therefore:

    - The `p { color: blue; }` style only affects paragraphs inside this component.
    - External CSS won't affect these elements unless specifically designed to pierce the Shadow DOM boundary.
    - You can use simple selectors like `p` without worrying about affecting other paragraphs on the page.

3. **Component Boundary**: The `:host` selector in the CSS is specifically targeting the Shadow DOM's host element (the `<my-element>` tag itself), which means:

    - The styles `display: block; padding: 16px; border: 1px solid black;` apply to the component itself.
    - This creates a clear visual boundary that encapsulates the component.

In summary, when this component is used on a page, browsers that support Shadow DOM will create a separate DOM tree inside the element, with its own scoped styles, creating a clean separation between the component and the rest of the page.

<InlineAlert slots="text" variant="success"/>

Check out [this handy cheat sheet](https://lit.dev/articles/lit-cheat-sheet/#shadow-dom) on properties and state for further reference throughout your development.


### Decorators

A [decorator](https://lit.dev/docs/components/decorators/) is a certain type of declaration that can be attached to a class declaration. It is prefixed with an `@` symbol and can be used to modify the behavior of a class or its members. Some popular decorators in Lit include:

- [`@customElement`](https://lit.dev/docs/api/decorators/#customElement): defines a custom element with a given tag name.
- [`@property`](https://lit.dev/docs/api/decorators/#property): defines a reactive property that triggers a re-render when its value changes.
- [`@state`](https://lit.dev/docs/api/decorators/#state): defines a local state property that triggers a re-render when its value changes. The difference between `@state` and `@property` is that `@state` properties are not exposed as custom element properties.
- [`@query`](https://lit.dev/docs/api/decorators/#query): allows you to query for elements in the component's shadow DOM, for instance, to access a button element with the id `myButton`, you can use `@query('#myButton') myButton: HTMLButtonElement;`. 
- [`@eventOptions`](https://lit.dev/docs/components/events/#event-options-decorator): allows you to specify event options like `capture`, `once`, and `passive` for event listeners. For example, `@eventOptions({ capture: true }) handleClick() { ... }`.

For instance, note the use of the `@customElement` and `@property` decorators in the snippet below and their associated imports:

```typescript
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  @property()
  name?: string;
}
```

### Directives

A [directive](https://lit.dev/docs/templates/directives/) in Lit is a special kind of decorator that allows you to extend the template syntax with custom behavior. Some popular directives include:

- [`until`](https://lit.dev/docs/api/directives/#until): waits for a promise to resolve before rendering the content.
- [`repeat`](https://lit.dev/docs/api/directives/#repeat): repeats a template for each item in an array.
- [`ifDefined`](https://lit.dev/docs/api/directives/#ifDefined): conditionally renders content based on the value being defined.
- [`guard`](https://lit.dev/docs/api/directives/#guard): prevents re-rendering if the value has not changed.
- [`cache`](https://lit.dev/docs/api/directives/#cache): caches the result of an expression to improve performance.
- [`live`](https://lit.dev/docs/api/directives/#live): updates the DOM when a reactive property changes. It's useful when you need to trigger a side effect or update the DOM based on a property change that's not directly related to rendering the component.
- [`asyncReplace`](https://lit.dev/docs/api/directives/#asyncReplace): asynchronously replaces the content of a template. This directive is useful when you need to fetch data asynchronously and update the template once the data is available.
- [`asyncAppend`](https://lit.dev/docs/api/directives/#asyncAppend): asynchronously appends content to a template. This directive is useful when you need to fetch data asynchronously and append it to the template once the data is available.
- [`ref`](https://lit.dev/docs/api/directives/#ref): Sets the value of a Ref object or calls a ref callback with the element it's bound to.

<InlineAlert slots="text" variant="info"/>

The difference between a [directive](#directives) and a [decorator](#decorators) is that a **directive** is applied to a template, while a **decorator** is applied to a class or a class member. 

### `render` Method

The [`render`](https://lit.dev/docs/components/rendering/#dom-encapsulation) method is defined as a template literal that returns the component's HTML structure. It uses the `html` function from the Lit package to create the template. The `render` method is called whenever the component needs to be re-rendered, for instance, when a reactive property changes. 

The `render` method is where you define the structure and content of your component. You can use template literals to create dynamic content, bind properties, and handle events. You use the `html` function from the `lit` package to create the template. For example:

```typescript
import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-element')
class MyElement extends LitElement {

  render(){
    return html`<p>Hello from my template.</p>`;    
  }
}
```

You should also be aware that the `render` method is called whenever the component needs to be re-rendered, for instance, when a reactive property changes.

### Reactive Properties

Lit uses [reactive properties](https://lit.dev/docs/components/properties/) to automatically update the DOM when the state of your component changes. There are two types, [public reactive properties](https://lit.dev/docs/components/properties/#declare) and [internal reactive state properties](https://lit.dev/docs/components/properties/#internal-reactive-state). This section will provide details about both.

#### 1. Public Reactive Properties

In Lit, [public reactive properties](https://lit.dev/docs/components/properties/#declare) define a component's public API and are often reflected as HTML attributes. Public reactive properties are declared using the `@property` decorator:

```typescript
@property()
name?: string;
```

Public reactive properties typically act as inputs to a component. When these properties are updated from external sources, the component re-renders in response.

Use public properties for:

- Data that should be configurable from outside the component.
- Values that need to be observed by parent components.
- Component configuration that might change from the parent context.
- Default values that can be overridden.
- Data that needs to be persisted as HTML attributes.
- Values that might need to be queried via CSS attribute selectors.
- State that represents part of the component's public API.
- Data that should be serialized when the component is saved/restored.

#### 2. Reactive State Properties

The other type of property that automatically updates the DOM when the state of your component changes are [internal reactive state properties](https://lit.dev/docs/components/properties/#internal-reactive-state), also known as "reactive state" or "local state". State properties refer to reactive properties that are not part of the component's public API, but are managed by the component itself, and also trigger a re-render when changed. 

State properties are declared with the `@state` decorator. The standard convention is to prefix them with an underscore (`_`) prefix, and when using Lit with TypeScript, mark them as private or protected:

```typescript
@state()
protected _active = false;
```

Use internal state properties defined with `@state()` for:

- Internal counters or temporary values.
- UI state like open/closed toggles, hover states.
- Form input values being tracked before submission.
- Data transformations of public properties (derived state).
- Loading or error states during async operations.
- Cache or memoized computation results.
- Temporary user selections or intermediate workflow steps.
- Animation states or transition variables.
- Values that change frequently (to avoid excessive attribute updates).
- State that should remain encapsulated and not exposed as API.

<!-- #### Public Reactive Properties vs Reactive State

- Public properties declared with `@property()` create an HTML attribute with the same name (by default, kebab-case version for camelCase properties).
- Public properties set up an observer that update the property when the attribute changes.
- Public properties handle type conversion between attribute string values and JavaScript types.
- Internal state properties (declared with `@state()`) don't create corresponding HTML attributes.
- Internal state properties are meant to be used only internally by the component.
- Internal state properties are typically marked as `private` or `protected` and named with an underscore (`_`) prefix.
 -->

<!-- #### Example Use Cases

- **Public Property**: Color theme for a component that should match the application's theme.  
- **Local State**: Whether a dropdown is currently expanded.  
- **Public Property**: Initial data to populate a form.  
- **Local State**: Form validation errors as the user types. -->

<InlineAlert slots="text" variant="success"/>

Check out the sections in this guide [this handy cheat sheet](https://lit.dev/articles/lit-cheat-sheet/#properties-and-state) on properties and state for further reference throughout your development.

### Setting properties

You can set a component's properties in the following ways:

1. **Attributes:** Via HTML attributes that appear in your markup (like `<my-element name="John">`, always strings and public properties only).

2. **Properties:**

    - Through JavaScript object properties (ie: `myElement.count = 42`). Any JavaScript type is accepted (numbers, objects, arrays, etc.). 
    - Through inline [property binding expressions](#1-property-binding-expressions) (ie: `.prop=${value}`).

    The difference in using attributes vs properties to set values for a component is illustrated in the following:

    ```typescript
    <!-- Using attributes (in HTML) -->
    <user-card name="John" score="42"></user-card>

    <!-- Using properties (in JavaScript) -->
    <script>
    const card = document.querySelector('user-card');
    card.name = "John";
    card.score = 42;
    card.friends = ["Alice", "Bob", "Charlie"];
    </script>
    ```

Note that when using attributes, if you don't have a corresponding `@property()` declaration, you'll need to use standard DOM methods like `getAttribute()` to access the value and any changes to the attribute won't trigger a component re-render.

### Binding expressions

You can use binding expressions to set properties and attributes declaratively on your custom elements in the following three ways:

1. [Property expressions](#1-property-binding-expressions): `.prop=${value}`
2. [Attribute expressions](#2-attribute-binding-expressions): `attr=${value}`
3. [Boolean attribute expressions](#3-boolean-attribute-binding-expressions): `?attr=${value}`

Each is covered in detail below.

#### 1. Property Binding Expressions

In Lit, you use a period (`.`) prefix in your markup when you want to set a JavaScript property on an element explicitly and bypass the attribute system. The syntax for property binding uses a period followed by the camelCase property name (ie: `.propertyName`), or:

```typescript
html`<my-list .listItems=${this.items}></my-list>`
```

Property binding can be useful in the following scenarios:

- **For non-primitive values:** When passing objects, arrays, or functions that can't be represented as string attributes:

```typescript
    html`<my-list .items=${['Apple', 'Banana', 'Cherry']}></my-list>`
```

- **To avoid type conversion:** When you want to pass the exact JavaScript value and avoid the attribute-to-property conversion:

```typescript
    // This passes the actual boolean value true
   html`<my-toggle .active=${true}></my-toggle>`
   
   // vs this string attribute "true" which needs conversion
   html`<my-toggle active="true"></my-toggle>` 
```

**Note:** Property bindings are also referred to as "Property expressions" in the official Lit documentation.

#### 2. Attribute Binding Expressions

Attribute expression binding in Lit is a way to set standard HTML attributes on elements within a component's template. This binding type is used when you need to set attributes that aren't JavaScript properties, or when you specifically want to set the attribute rather than the property.

The syntax for attribute binding in Lit uses the `attr=${value}` pattern (with no prefix), such as the `placeholder` attribute below:

```js
html`<input type="text" placeholder=${this.placeholderText}>`
```

Values are automatically converted to strings when set as attributes.

#### 3. Boolean Attribute Binding Expressions

Boolean attribute bindings are used for HTML attributes that work by their mere presence or absence, rather than by their specific value, such as `disabled` or `hidden` attributes on an element.

The syntax uses a question mark prefix: `?attr=${value}`, and when evaluated:

  - If the `value` expression evaluates to a truthy value, the attribute is added.
  - If the `value` expression evaluates to a falsy value, the attribute is removed entirely.

For example:

```typescript
    return html`
      <button ?disabled=${this.isDisabled}>Click me</button>
    `;      
```

Disabled will only be present on the button element if the value of `this.isDisabled` returns `true`. This built-in expression syntax simplifies the process of toggling boolean attributes based on component state or logic.

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

## Spectrum Web Components Integration

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

<!-- ## Advanced Development

In this section, we will cover some advanced topics related to building Adobe Express add-ons with Lit and TypeScript. These topics include state management and communication patterns, which work together to help you build scalable and maintainable components. -->

## State Management and Communication

When building complex applications with Lit, effective state management and component communication are closely intertwined. How you structure your state influences how components communicate, and vice versa. Let's explore these concepts together:

### Component State

Lit provides two primary mechanisms for managing component state:

#### 1. Reactive Properties and Reactive State

You can use reactive properties, reactive state, or a combination of both. Reactive properties are defined using the `@property` decorator, while reactive state is defined using the `@state` decorator. The difference between the two is that reactive properties are exposed as custom element properties, while reactive state is not exposed outside the component.

```typescript
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("state-example")
export class StateExample extends LitElement {
    // Public property that triggers renders when changed
    // This can be set from outside the component
    @property({ type: String })
    public title = "Hello";

    // Private state that triggers renders when changed
    // This is only managed internally
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

This approach works well for:

- Component-specific state with `@state()`
- Component configuration with `@property()`

For more details about these decorators, refer to the section on [Reactive Properties](#reactive-properties) in this guide.

#### 2. Using Reactive Controllers

For more complex state that may be shared across components or that encapsulates specific behaviors, reactive controllers provide a powerful pattern. Controllers are separate objects that can hook into a component's lifecycle while managing their own state.

```typescript
// A simple counter controller
class CounterController {
  host: ReactiveControllerHost;
  private _count = 0;
  
  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }
  
  get count() { return this._count; }
  
  increment() {
    this._count++;
    this.host.requestUpdate();
  }
}

@customElement('counter-component')
class CounterComponent extends LitElement {
  private counter = new CounterController(this);
  
  render() {
    return html`
      <p>Count: ${this.counter.count}</p>
      <sp-button @click=${() => this.counter.increment()}>Increment</sp-button>
    `;
  }
}
```

The reactive controller pattern provides several benefits:

- Separation of concerns
- Reusable state logic across components
- Cleaner component code
- Easier testing of state logic

See the official Lit documentation on [Reactive Controllers](https://lit.dev/docs/composition/controllers/) for more details.

### Component Communication

The way components communicate is deeply connected to how state is managed. Let's explore the communication patterns that work with different state management approaches:

#### 1. Parent-to-Child Communication: Property Binding

This pattern uses `@property` decorated properties to pass data down from parent to child components:

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

    render() {
        return html`<div>${this.parentMessage}</div>`;
    }
}
```

<InlineAlert slots="text" variant="success"/>

Check out [this useful cheat sheet](https://lit.dev/articles/lit-cheat-sheet/#pass-data-down) for more details about passing data down from a parent to a child component.

#### 2. Child-to-Parent Communication: Custom Events

For upward communication, children dispatch custom events that parents can listen for:

```typescript
// Child component
@customElement('action-button')
class ActionButton extends LitElement {
  private _handleClick() {
    // Dispatch event with data
    this.dispatchEvent(new CustomEvent('button-clicked', {
      detail: { timestamp: Date.now() },
      bubbles: true,
      composed: true  // Allows event to cross shadow DOM boundary
    }));
  }

  render() {
    return html`<button @click=${this._handleClick}>Click Me</button>`;
  }
}

// Parent component listens for the event
@customElement('parent-component')
class ParentComponent extends LitElement {
  render() {
    return html`
      <action-button @button-clicked=${this._handleChildEvent}></action-button>
    `;
  }

  private _handleChildEvent(e: CustomEvent) {
    console.log('Button clicked at:', e.detail.timestamp);
    // Update parent state based on event
  }
}
```

<InlineAlert slots="text" variant="success"/>

Check out [this handy cheat sheet](https://lit.dev/articles/lit-cheat-sheet/#dispatch-events-up) for more details about dispatching events up from a child to a parent component.

#### 3. Complex Communication Patterns

For more complex scenarios where components aren't directly related (siblings, distant relatives), you have several options:

Before moving on, check out [this article on properties and state](https://lit.dev/articles/lit-cheat-sheet/#properties-and-state) to help solidify your understanding.


##### Shared State Controllers

For non-hierarchical communication, a shared controller using the singleton pattern can provide a central hub:

```typescript
// Create a shared controller
class SharedStateController {
  private static instance: SharedStateController;
  private _listeners = new Set<() => void>();
  private _value = '';
  
  static getInstance() {
    if (!SharedStateController.instance) {
      SharedStateController.instance = new SharedStateController();
    }
    return SharedStateController.instance;
  }
  
  get value() { return this._value; }
  
  set value(newValue: string) {
    this._value = newValue;
    this._notify();
  }
  
  subscribe(listener: () => void) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
  
  private _notify() {
    this._listeners.forEach(listener => listener());
  }
}
```

Components can then both update and consume this shared state:

```typescript
// Component that updates the shared state
@customElement('sender-component')
class SenderComponent extends LitElement {
  private _state = SharedStateController.getInstance();
  
  private _updateSharedState() {
    this._state.value = 'Updated at ' + new Date().toLocaleTimeString();
  }
  
  render() {
    return html`<button @click=${this._updateSharedState}>Update State</button>`;
  }
}

// Component that consumes the shared state
@customElement('receiver-component')
class ReceiverComponent extends LitElement {
  private _state = SharedStateController.getInstance();
  
  @state()
  private _currentValue = this._state.value;
  
  connectedCallback() {
    super.connectedCallback();
    // Subscribe to state changes
    this._unsubscribe = this._state.subscribe(() => {
      this._currentValue = this._state.value;
      this.requestUpdate();
    });
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up subscription
    if (this._unsubscribe) this._unsubscribe();
  }
  
  render() {
    return html`<div>Current value: ${this._currentValue}</div>`;
  }
}
```

##### Context API

For more sophisticated applications, Lit offers the [`@lit/context`](https://lit.dev/docs/data/context/) package that implements a context API similar to React's Context.

##### External State Management

For complex applications with many components and intricate state requirements, dedicated state management libraries like [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/), or [XState](https://xstate.js.org/) can be integrated with Lit.

#### Document Sandbox Communication

Beyond component-to-component communication, Adobe Express add-ons have another important communication channel: the Document Sandbox API. This enables secure interaction between your add-on's UI and the Adobe Express document.

The [Adobe Express Document Sandbox](../../references/document-sandbox/) is a separate JavaScript execution environment that:

- Has privileged access to the Adobe Express document
- Runs isolated from your UI code for security reasons
- Communicates with your UI via a messaging bridge

This architecture creates a pattern where:

- Your UI code runs in the iframe side (UI runtime)
- Your document manipulation code runs in the sandbox side ([Document Sandbox runtime](../../references/document-sandbox/))

Here's how to implement this communication pattern:

```typescript
// UI Side (in your component)
@customElement('my-addon-component')
export class MyAddonComponent extends LitElement {
    @state()
    private _sandboxProxy: DocumentSandboxApi;

    async firstUpdated() {
        // Get a proxy to the sandbox API
        const { runtime } = this.addOnUISdk.instance;
        this._sandboxProxy = await runtime.apiProxy(RuntimeType.documentSandbox);
    }

    // Call methods on the proxy to communicate with the sandbox
    private async addShapeToDocument() {
        try {
            await this._sandboxProxy.createRectangle(100, 100, "#FF0000");
        } catch (error) {
            console.error("Sandbox communication failed:", error);
        }
    }
}
```

```typescript
// Sandbox Side (in code.ts)
function start() {
    // Define methods that will be exposed to the UI
    const sandboxApi = {
        async createRectangle(width, height, color) {
            const rectangle = editor.createRectangle();
            rectangle.width = width;
            rectangle.height = height;
            rectangle.fill = editor.makeColorFill(colorUtils.fromHex(color));
            editor.context.insertionParent.children.append(rectangle);
            // Position the rectangle...
        }
    };
    
    // Make these methods available to the UI
    runtime.exposeApi(sandboxApi);
}
```

See the [Document Sandbox Section](../../references/document-sandbox/) for more details and to reference the [Document APIs](../../references/document-sandbox/document-apis/) available for use in your add-ons.

<!-- #### State Management Best Practices

When implementing state management and communication in your Lit components:

1. **Keep state as local as possible**: Only lift state up the component hierarchy when necessary.
2. **Use immutable patterns**: Create new objects/arrays rather than mutating existing ones.
3. **Define clear ownership**: Each piece of state should have a clear owner.
4. **Document your communication patterns**: Make it clear how data flows through your application.
5. **Use TypeScript interfaces** to clearly define the shape of your state and events.
6. **Clean up subscriptions and listeners**: Prevent memory leaks by properly unsubscribing in `disconnectedCallback()`.
7. **Consider performance**: For complex state updates, use memoization to avoid unnecessary re-renders.
8. **Test state transitions**: Ensure your state management logic is robust with unit tests. -->

#### Component Lifecycle

Understanding the component lifecycle is crucial for creating well-behaved components that properly initialize, update, and clean up resources. Lit components are standard custom elements, and thus inherit the [custom element lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks). 

##### [Lifecycle Flow](https://lit.dev/docs/components/lifecycle/)

- `constructor()`: Component instance is created
- `connectedCallback()`: Component is attached to the DOM
- `willUpdate()`: Called before rendering with changed properties
- `update()`: Prepares to render, calls render()
- `firstUpdated()`: Called after the first render (only once)
- `updated()`: Called after each render
- `disconnectedCallback()`: Component is removed from the DOM

<InlineAlert slots="text" variant="info"/>

💡 If you're wondering why some methods have the `Callback` suffix, it's because they are inherited from the [Web Component Specification Custom Elements API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks), whereas the rest are Lit-specific.

##### Lifecycle Logger Example

The following `lifecycle-logger` element illustrates the sequence of lifecycle events in a Lit component and how property changes trigger updates. Try running it in your add-on to see what it produces, or see below for sample screenshots:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lifecycle-logger')
export class LifecycleLogger extends LitElement {
  @property({ type: String })
  name = 'World';

  @state()
  private _counter = 0;

  constructor() {
    super();
    console.log('📋 constructor: Component instance created');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('🔌 connectedCallback: Component connected to DOM');
  }

  disconnectedCallback() {
    console.log('🔌 disconnectedCallback: Component removed from DOM');
    super.disconnectedCallback();
  }

  willUpdate(changedProperties) {
    console.log('🔄 willUpdate: About to update with these changed properties:', 
      [...changedProperties.keys()]);
  }

  update(changedProperties) {
    console.log('📝 update: Preparing to render');
    super.update(changedProperties);
  }

  firstUpdated(changedProperties) {
    console.log('🎉 firstUpdated: Component rendered for the first time');
  }

  updated(changedProperties) {
    console.log('✅ updated: Component was updated with these changed properties:', 
      [...changedProperties.keys()]);
  }

  render() {
    console.log('🎨 render: Generating template');
    return html`
      <div>
        <h2>Hello, ${this.name}!</h2>
        <p>Counter: ${this._counter}</p>
        <button @click=${this._increment}>Increment</button>
        <button @click=${this._changeName}>Change Name</button>
      </div>
    `;
  }

  private _increment() {
    console.log('👆 Button clicked: Incrementing counter');
    this._counter++;
  }

  private _changeName() {
    console.log('👆 Button clicked: Changing name');
    this.name = this.name === 'World' ? 'Lit' : 'World';
  }
}
```

The screenshot below shows what you will see in the log messages when the add-on first loads:

![Lit Lifecycle Log Screenshot](./images/lit-lifecycle1.png)

After you click to increment the counter, notice the updated log:

![Lit Lifecycle Log after update Screenshot](./images/lit-lifecycle2.png)

###### General Rules

1. Always call `super` methods when overriding lifecycle callbacks:

```typescript
   connectedCallback() {
     super.connectedCallback(); // Always call this first
     // Your code here
   }   
```
2. Use the right callback for the job:

- `constructor`: Only for basic initialization
- `connectedCallback`: Setup that requires DOM or parent elements
- `firstUpdated`: Access to rendered DOM (focus, measurements, etc.)
- `updated`: React to changes in specific properties
- `disconnectedCallback`: Cleanup (remove listeners, cancel timers)

3. Defer heavy work to avoid blocking the main thread:

```typescript
   connectedCallback() {
     super.connectedCallback();
     // Defer complex initialization
     setTimeout(() => this.initializeComplexFeature(), 0);
   }
```

4. Don't manipulate children directly in most lifecycle callbacks; use templates and the render method instead.
5. Watch for property changes in the `updated` lifecycle method:

```typescript
   updated(changedProperties) {
     if (changedProperties.has('selectedId')) {
       this.handleSelectionChange();
     }
   }
```

6. Initialize resources in `connectedCallback`, clean up in `disconnectedCallback`.
7. Check for repeating connections. An element might be connected and disconnected multiple times.

```typescript
   connectedCallback() {
     super.connectedCallback();
     if (!this._initialized) {
       this._initialized = true;
       // Run one-time initialization
     }
     // Run every-connection initialization
   }
```

8. Avoid manipulating properties in `render`; `render` should be a pure function of the component's state.
9. Remember that lifecycle callbacks run top-down - parent elements' callbacks run before children's callbacks.
10. Ensure `disconnectedCallback` is robust. It should handle partial initialization states in case an element is removed before it's fully initialized.

### Event Handling in Lit

Event handling is a critical part of creating interactive components. Lit provides several approaches to handle events effectively.

#### Binding Event Listeners

The most common way to handle events is to bind listeners directly in your template:

```typescript
@customElement('event-demo')
export class EventDemo extends LitElement {
  @state()
  private _count = 0;

  render() {
    return html`
      <p>Current count: ${this._count}</p>
      
      <!-- Basic event binding -->
      <button @click=${this._increment}>Increment</button>
      
      <!-- Using event parameter -->
      <button @click=${this._handleClick}>Show event details</button>
      
      <!-- Event binding with inline function -->
      <button @click=${() => this._setValue(0)}>Reset</button>
      
      <!-- Event handler with options -->
      <div @click=${this._handleCapture} @capture=${true}>
        Capture phase example
      </div>
    `;
  }

  private _increment() {
    this._count++;
  }
  
  private _setValue(value: number) {
    this._count = value;
  }
  
  private _handleClick(e: Event) {
    // Access event details
    console.log('Event target:', e.target);
    console.log('Event current target:', e.currentTarget);
    
    // Stop propagation if needed
    // e.stopPropagation();
    
    // Prevent default behavior if needed
    // e.preventDefault();
  }
  
  private _handleCapture(e: Event) {
    console.log('Captured click during capture phase');
  }
}
```

#### Custom Events

Components often need to communicate with parent elements. Custom events are the recommended way to send data up the 
component tree.

Child component:

```typescript
@customElement('custom-input')
export class CustomInput extends LitElement {
  @property()
  value = '';
  
  render() {
    return html`
      <input 
        .value=${this.value}
        @input=${this._handleInput}
        @keyup=${this._handleKeyup}
      >
    `;
  }
  
  private _handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    
    // Dispatch custom event with new value
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: this.value,
      bubbles: true, // Event bubbles up through DOM
      composed: true // Event crosses shadow DOM boundary
    }));
  }
  
  private _handleKeyup(e: KeyboardEvent) {
    // Check for specific keys
    if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('submit', {
        detail: this.value,
        bubbles: true,
        composed: true
      }));
    }
  }
}
```

Parent component:

```typescript
@customElement('form-container')
export class FormContainer extends LitElement {
  @state()
  private _inputValue = '';
  
  render() {
    return html`
      <div>
        <custom-input
          .value=${this._inputValue}
          @value-changed=${this._handleValueChanged}
          @submit=${this._handleSubmit}
        ></custom-input>
        <p>Current value: ${this._inputValue}</p>
      </div>
    `;
  }
  
  private _handleValueChanged(e: CustomEvent) {
    this._inputValue = e.detail;
  }
  
  private _handleSubmit(e: CustomEvent) {
    console.log('Form submitted with value:', e.detail);
    // Process form submission...
  }
}
```

##### Event Handling Best Practices

1. For components with many similar elements (like lists), [event delegation](https://lit.dev/docs/components/events/#event-delegation) can improve performance by using a single event listener on a parent element.
2. Event listeners added using the declarative `@` syntax in the template are automatically bound to the component, therefore, you can use `this` to refer to your component instance inside any declarative event handler:
    
    ```js
    export class MyElement extends LitElement {
        render() {
            return html`<button @click="${this._handleClick}">click</button>`;
        }
        _handleClick(e) {
            console.log(this.prop);
        }
    }
    ```

3. When adding listeners imperatively with `addEventListener`, you'll want to use an arrow function so that `this` refers to the component:

```js
    export class MyElement extends LitElement {
        private _handleResize = () => {
            // `this` refers to the component
            console.log(this.isConnected);
        }

        constructor() {
            window.addEventListener('resize', this._handleResize);
        }
    }
```


1. Use declarative event bindings in templates for clarity and maintainability
2. Keep event handlers small and focused on a single responsibility
3. Use custom events for component-to-parent communication
4. Always specify bubbles and composed properties when dispatching events that need to cross component boundaries
5. Clean up event listeners in `disconnectedCallback` if they were added imperatively (not in the template)
6. Use TypeScript event types for better type checking and editor assistance
7. Mastering lifecycle management and event handling will help you create robust, interactive components that efficiently manage resources and gracefully respond to user interactions.

## Next Steps

Next, you can explore more advanced features of Lit and TypeScript to enhance your components. Some areas to explore include:

- [**Event Handling**](https://lit.dev/docs/v1/components/events/): Learn how to handle events in Lit components and communicate between components.
- [**Component Composition**](https://lit.dev/docs/composition/component-composition/): Explore how to compose multiple components together to create complex UIs.
- [**Advanced State Management**](https://lit.dev/articles/lit-cheat-sheet/#data-flow-and-state-management): Implement state management solutions like Redux or MobX to manage the state of your components.
- [**Performance Optimization**](https://lit.dev/docs/components/events/#optimizing-for-performance): Optimize your components for performance by using memoization, lazy loading, and other techniques.
- [**Testing**](https://lit.dev/docs/tools/testing/): Write unit tests for your components using tools like Jest or Mocha to ensure their correctness and reliability.

Finally, boookmark this [Lit Cheat Sheet](https://lit.dev/articles/lit-cheat-sheet/) for a quick and easy reference.
