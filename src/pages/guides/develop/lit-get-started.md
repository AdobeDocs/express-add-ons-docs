# Getting Started with the Lit Framework

## Introduction

Lit is a simple library for building fast, lightweight web components. It leverages the power of modern web standards to create reusable and efficient components with minimal boilerplate.

### Key Components and Concepts

1. **Web Components**:
   - Lit is built on top of the Web Components standard, which allows you to create reusable custom elements with encapsulated functionality and styles.

2. **LitElement**:
   - `LitElement` is a base class provided by Lit for creating custom elements. It extends the standard `HTMLElement` and adds reactive properties and templating capabilities.

3. **Reactive Properties**:
   - Lit uses reactive properties to automatically update the DOM when the state of your component changes. You define properties using decorators like `@property`. 

   hschinsk_adobe: Explain what the property decorator in Lit is similar too in JavaScript

GitHub.copilot-chat.github.copilot.editor: In Lit, the `@property` decorator is used to define reactive properties for a component. This is similar to how you might define properties in a JavaScript class, but with additional functionality to automatically update the DOM when the property changes.

In plain JavaScript, you might define a property like this:

```javascript
class MyComponent {
  constructor() {
    this.myProperty = 'initial value';
  }
}
```

In Lit, you use the `@property` decorator to achieve a similar result, but with reactivity:

```javascript
import { LitElement, html, property } from 'lit';

class MyComponent extends LitElement {
  @property({ type: String })
  myProperty = 'initial value';

  render() {
    return html`<p>${this.myProperty}</p>`;
  }
}

customElements.define('my-component', MyComponent);
```

The `@property` decorator in Lit is similar to defining getter and setter methods in JavaScript, but it also ensures that the component re-renders when the property value changes. This makes it easier to manage state and keep the DOM in sync with your data.

hschinsk_adobe: what is the @property decorator compared to in the React.js framework?

In the React.js framework, the `@property` decorator in Lit is similar to the concept of state and props. Here's a comparison:

- **@property decorator in Lit**: This decorator is used to define reactive properties in a LitElement. When these properties change, the component automatically re-renders.

- **State in React**: State is a built-in object that stores property values that belong to the component. When the state changes, the component re-renders.

- **Props in React**: Props are inputs to a React component. They are passed down from parent components and are used to render dynamic data.

Here's an example to illustrate:

### LitElement with @property
```javascript
import { LitElement, html, property } from 'lit-element';

class MyElement extends LitElement {
  @property({ type: String }) myProp = 'Hello';

  render() {
    return html`<p>${this.myProp}</p>`;
  }
}

customElements.define('my-element', MyElement);
```

### React Component with State and Props
```javascript
import React, { useState } from 'react';

function MyComponent(props) {
  const [myState, setMyState] = useState('Hello');

  return <p>{props.myProp}</p>;
}

// Usage
<MyComponent myProp="Hello" />
```

In summary:
- `@property` in Lit is used to define reactive properties.
- `state` in React is used to manage internal component state.
- `props` in React are used to pass data from parent to child components.

4. **Templates**:
   - Lit uses tagged template literals to define the HTML structure of your components. The `html` tag function is used to create templates.

   hschinsk_adobe: Explain this syntax in the highlighted code selected

   Using a combination of HTML and JavaScript template literals within a Markdown file. Here's a breakdown of the syntax:

   1. **HTML Paragraph Tag (`<p>`):**
   - `<p>` and `</p>` are HTML tags used to define a paragraph.

   2. **Template Literals (`${}`):**
   - `${this.name}` is a JavaScript template literal. Template literals are enclosed by backticks (`` ` ``) and allow embedded expressions. Anything inside `${}` is evaluated as JavaScript.

   4. **Combining HTML and JavaScript:**
   - The `${this.name}` syntax is used within the HTML to dynamically insert the value of `this.name` into the paragraph.


    ### Example in Context
    If you are using LitElement, your component might look like this:

    ```javascript
    import { LitElement, html } from 'lit';

    class MyElement extends LitElement {
    static properties = {
        name: { type: String }
    };

    constructor() {
        super();
        this.name = 'World';
    }

    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
    }

    customElements.define('my-element', MyElement);
    ```

    In this example:
    - The `name` property is defined and initialized.
    - The `render` method returns an HTML template with the dynamic `name` property.

    This allows the paragraph to display "Hello, World!" when the component is rendered.

5. **Shadow DOM**:
   - Lit components use the Shadow DOM to encapsulate styles and markup, ensuring that your component's styles do not leak out and external styles do not affect your component.



6. **Directives**:
   - Directives are special functions that can be used within templates to add custom behavior, such as conditionally rendering parts of the template or repeating elements. Lit provides built-in directives like `ifDefined` and `repeat`. 

   Directives in Lit are special functions that can be used within templates to add custom behavior. They allow you to manipulate the DOM in ways that are not possible with standard template syntax. Directives can be used for tasks such as conditionally rendering parts of the template, repeating elements, or adding event listeners.

    ```javascript
    import { LitElement, html } from 'lit';
    import { ifDefined } from 'lit/directives/if-defined.js';

    class MyElement extends LitElement {
    static properties = {
        name: { type: String },
        age: { type: Number }
    };

    constructor() {
        super();
        this.name = 'World';
        this.age = undefined; // Age is initially undefined
    }

    render() {
        return html`
        <p>Hello, ${this.name}!</p>
        <p>Age: ${ifDefined(this.age)}</p>
        `;
    }
    }

    customElements.define('my-element', MyElement);
    ```

    In this example:

    - **ifDefined**: A built-in directive that only renders the value if it is defined, otherwise it renders nothing. If `this.age` is `undefined`, the `ifDefined` directive ensures that nothing is rendered for the age.

    Directives enhance the flexibility and power of Lit templates, allowing for more dynamic and responsive components.

### Lit Component Example

Here's a simple example of a Lit component:

```javascript
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: lightgray;
    }
  `;

  @property({ type: String }) name = 'World';

  render() {
    return html`
      <div>
        <p>Hello, ${this.name}!</p>
      </div>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

### Steps to Get Started

1. **Install Lit**:

   Install Lit: 
   
   ```sh
   npm install lit
   # or
   yarn add lit
   ```

2. **Create a Component**:

   Create a new JavaScript file and define your Lit component as shown in the example above.

3. **Use the Component**:

   Use your custom element in an HTML file or another component:

   ```html
   <my-component name="Lit"></my-component>
   ```

### Additional Resources

- [Lit Documentation](https://lit.dev/docs/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

By understanding these key components and concepts, you'll be well on your way to developing efficient and reusable web components with the Lit framework.