---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - TypeScript
  - Architecture
  - State Management
  - Modular Design
  - Design Patterns
title: Advanced Add-on Architecture
description: Learn best practices for structuring complex add-ons, implementing state management, and organizing code for maintainability and scalability.
contributors:
  - https://github.com/hollyschinsky
---

# Module 1: Advanced Add-on Architecture

**Estimated time: 2 hours**

As you move from creating simple add-ons to developing more complex solutions, good architecture becomes crucial. In this step, you'll learn how to design and implement robust, maintainable architectures for sophisticated add-ons. 

## Understanding Advanced Architectural Patterns

Complex add-ons require thoughtful architecture to manage data flow, separate concerns, and ensure maintainability. Several architectural patterns can be applied to add-on development:

### Model-View-Controller (MVC)

MVC separates your application into three interconnected components:

1. **Model**: Manages data, logic, and rules
2. **View**: Handles the UI and presentation
3. **Controller**: Processes user input and updates the Model and View

For add-ons, this pattern helps separate the document manipulation logic from the user interface:

```javascript
// Model: Manages document data and operations
class DocumentModel {
  constructor(addonSdk) {
    this.sdk = addonSdk;
    this.documentElements = [];
  }

  async loadElements() {
    try {
      const elements = await this.sdk.app.document.getElements();
      this.documentElements = elements;
      return elements;
    } catch (error) {
      console.error("Failed to load elements:", error);
      throw error;
    }
  }

  async addElement(elementConfig) {
    // Add element implementation
  }
}

// View: Handles UI rendering
class AddOnView {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  renderElementsList(elements) {
    // Render elements to the UI
  }

  showError(message) {
    // Display error message
  }
}

// Controller: Connects Model and View
class AddOnController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initialize();
  }

  async initialize() {
    try {
      // Set up event listeners
      document.getElementById('load-btn').addEventListener('click', 
        () => this.loadElements());
    } catch (error) {
      this.view.showError("Initialization failed");
    }
  }

  async loadElements() {
    try {
      const elements = await this.model.loadElements();
      this.view.renderElementsList(elements);
    } catch (error) {
      this.view.showError("Failed to load elements");
    }
  }
}
```

### Model-View-ViewModel (MVVM)

MVVM is particularly useful when working with frameworks like React, Vue, or Angular:

1. **Model**: Data and business logic
2. **View**: The UI (HTML, CSS, components)
3. **ViewModel**: Intermediate layer that transforms Model data for the View and handles View events

```javascript
// Using React with MVVM concepts
import React, { useState, useEffect } from 'react';
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// ViewModel (as a custom hook)
function useDocumentViewModel() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadElements() {
    setLoading(true);
    setError(null);
    
    try {
      const documentElements = await addOnUISdk.app.document.getElements();
      setElements(documentElements);
    } catch (err) {
      setError("Failed to load elements: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    elements,
    loading,
    error,
    loadElements
  };
}

// View Component
function ElementsPanel() {
  const { elements, loading, error, loadElements } = useDocumentViewModel();
  
  useEffect(() => {
    // Load elements when component mounts
    loadElements();
  }, []);
  
  if (loading) return <div>Loading elements...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div>
      <h2>Document Elements</h2>
      <button onClick={loadElements}>Refresh</button>
      <ul>
        {elements.map(element => (
          <li key={element.id}>{element.type}: {element.id}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Implementing Advanced State Management

As add-ons grow in complexity, managing state becomes increasingly important.

### Centralized State Management

For complex add-ons, consider using centralized state management solutions:

#### Redux with React

```javascript
// Action types
const LOAD_ELEMENTS_REQUEST = 'LOAD_ELEMENTS_REQUEST';
const LOAD_ELEMENTS_SUCCESS = 'LOAD_ELEMENTS_SUCCESS';
const LOAD_ELEMENTS_FAILURE = 'LOAD_ELEMENTS_FAILURE';

// Action creators
function loadElementsRequest() {
  return { type: LOAD_ELEMENTS_REQUEST };
}

function loadElementsSuccess(elements) {
  return { type: LOAD_ELEMENTS_SUCCESS, payload: elements };
}

function loadElementsFailure(error) {
  return { type: LOAD_ELEMENTS_FAILURE, payload: error };
}

// Thunk action creator
function loadElements() {
  return async (dispatch) => {
    dispatch(loadElementsRequest());
    
    try {
      const elements = await addOnUISdk.app.document.getElements();
      dispatch(loadElementsSuccess(elements));
    } catch (error) {
      dispatch(loadElementsFailure(error.message));
    }
  };
}

// Reducer
function elementsReducer(state = { loading: false, elements: [], error: null }, action) {
  switch (action.type) {
    case LOAD_ELEMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_ELEMENTS_SUCCESS:
      return { ...state, loading: false, elements: action.payload };
    case LOAD_ELEMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

#### Custom State Management for Vanilla JS

If you're not using a framework, you can implement a simple pub/sub pattern:

```javascript
class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.subscribers = [];
  }
  
  getState() {
    return { ...this.state };
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }
  
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }
}

// Usage
const store = new StateManager({ elements: [], loading: false, error: null });

store.subscribe(state => {
  console.log('State updated:', state);
  updateUI(state);
});

async function loadElements() {
  store.setState({ loading: true, error: null });
  
  try {
    const elements = await addOnUISdk.app.document.getElements();
    store.setState({ elements, loading: false });
  } catch (error) {
    store.setState({ error: error.message, loading: false });
  }
}
```

## Implementing Modular Code Structure

As your add-on grows, organizing code into modular, maintainable units becomes essential.

### Directory Structure for Complex Add-ons

Consider a structure like this for larger add-ons:

```
my-addon/
├── src/
│   ├── api/              # API and SDK interactions
│   │   ├── document.js   # Document-related API calls
│   │   ├── storage.js    # Storage-related API calls
│   │   └── index.js      # API exports
│   ├── components/       # UI components (if using a framework)
│   │   ├── ElementList/
│   │   ├── Toolbar/
│   │   └── ...
│   ├── services/         # Business logic services
│   │   ├── analytics.js
│   │   ├── formatter.js
│   │   └── ...
│   ├── utils/            # Utility functions
│   │   ├── validation.js
│   │   ├── formatting.js
│   │   └── ...
│   ├── state/            # State management
│   │   ├── store.js
│   │   ├── actions.js
│   │   └── reducers.js
│   ├── constants/        # Constants and configuration
│   │   ├── config.js
│   │   └── actionTypes.js
│   ├── types/            # TypeScript type definitions
│   │   └── index.d.ts
│   ├── index.js          # Main entry point
│   └── App.js            # Main application component
├── public/               # Static assets
├── tests/                # Test files
├── package.json
└── README.md
```

### Implementing Services and Modules

Break functionality into focused, reusable services:

```javascript
// src/api/document.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

export async function getElements() {
  return addOnUISdk.app.document.getElements();
}

export async function addImage(url, position) {
  return addOnUISdk.app.document.addImage({ url, position });
}

export async function addText(text, position, style) {
  return addOnUISdk.app.document.addText({ text, position, style });
}

// src/services/elementFormatter.js
export function categorizeElements(elements) {
  const categories = {
    images: [],
    texts: [],
    shapes: [],
    other: []
  };
  
  elements.forEach(element => {
    switch(element.type) {
      case 'image':
        categories.images.push(element);
        break;
      case 'text':
        categories.texts.push(element);
        break;
      case 'shape':
        categories.shapes.push(element);
        break;
      default:
        categories.other.push(element);
    }
  });
  
  return categories;
}
```

## Error Handling and Logging Strategy

Robust error handling is critical for professional add-ons:

```javascript
// src/utils/errorHandler.js
export class AddOnError extends Error {
  constructor(message, originalError = null, context = {}) {
    super(message);
    this.name = 'AddOnError';
    this.originalError = originalError;
    this.context = context;
  }
}

export function handleApiError(error, operation) {
  console.error(`API Error during ${operation}:`, error);
  
  let userMessage = "Something went wrong. Please try again.";
  
  if (error.message.includes('permission')) {
    userMessage = "Permission denied. Please check your add-on permissions.";
  } else if (error.message.includes('network') || error.message.includes('timeout')) {
    userMessage = "Network error. Please check your connection and try again.";
  }
  
  // You might want to log to an analytics service here
  
  return new AddOnError(userMessage, error, { operation });
}

// Usage
import { getElements } from '../api/document';
import { handleApiError } from '../utils/errorHandler';

async function loadDocumentElements() {
  try {
    return await getElements();
  } catch (error) {
    throw handleApiError(error, 'loadDocumentElements');
  }
}
```

## Using TypeScript for Better Code Quality

TypeScript can significantly improve code quality and maintainability in complex add-ons:

```typescript
// types/index.d.ts
interface ElementStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
}

interface ElementPosition {
  x: number;
  y: number;
}

interface TextElementConfig {
  text: string;
  position: ElementPosition;
  style?: ElementStyle;
}

interface ImageElementConfig {
  url: string;
  position: ElementPosition;
  width?: number;
  height?: number;
}

// document.ts
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

export async function addText(config: TextElementConfig): Promise<any> {
  return addOnUISdk.app.document.addText(config);
}

export async function addImage(config: ImageElementConfig): Promise<any> {
  return addOnUISdk.app.document.addImage(config);
}
```

## Practical Exercise: Refactoring an Add-on for Better Architecture

Let's put these concepts into practice by refactoring a simple add-on to have a more robust architecture.

### Original Code (Simple Add-on)

```javascript
// Original, unstructured code
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  console.log("Add-on initialized");
  
  // Set up button click handlers
  document.getElementById('load-btn').addEventListener('click', async () => {
    try {
      // Get and display elements
      const elements = await addOnUISdk.app.document.getElements();
      displayElements(elements);
    } catch (error) {
      console.error("Error loading elements:", error);
      showError("Failed to load elements");
    }
  });
  
  document.getElementById('add-text-btn').addEventListener('click', async () => {
    try {
      const text = document.getElementById('text-input').value;
      await addOnUISdk.app.document.addText({
        text,
        position: { x: 100, y: 100 }
      });
      showMessage("Text added successfully");
    } catch (error) {
      console.error("Error adding text:", error);
      showError("Failed to add text");
    }
  });
});

function displayElements(elements) {
  const container = document.getElementById('elements-list');
  container.innerHTML = '';
  
  elements.forEach(element => {
    const item = document.createElement('li');
    item.textContent = `${element.type}: ${element.id}`;
    container.appendChild(item);
  });
}

function showMessage(message) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = message;
  messageEl.className = 'message';
  setTimeout(() => { messageEl.textContent = ''; }, 3000);
}

function showError(message) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = message;
  messageEl.className = 'error';
}
```

### Refactored Code (MVC Architecture)

```javascript
// api/document.js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

export default class DocumentAPI {
  static async getElements() {
    try {
      return await addOnUISdk.app.document.getElements();
    } catch (error) {
      console.error("API Error - getElements:", error);
      throw new Error(`Failed to get elements: ${error.message}`);
    }
  }
  
  static async addText(text, position = { x: 100, y: 100 }, style = {}) {
    try {
      return await addOnUISdk.app.document.addText({ text, position, style });
    } catch (error) {
      console.error("API Error - addText:", error);
      throw new Error(`Failed to add text: ${error.message}`);
    }
  }
}

// utils/messageHandler.js
export default class MessageHandler {
  constructor(messageElementId) {
    this.messageElement = document.getElementById(messageElementId);
  }
  
  showMessage(message, isError = false) {
    if (!this.messageElement) return;
    
    this.messageElement.textContent = message;
    this.messageElement.className = isError ? 'error' : 'message';
    
    if (!isError) {
      setTimeout(() => { 
        this.messageElement.textContent = '';
        this.messageElement.className = '';
      }, 3000);
    }
  }
  
  showError(message) {
    this.showMessage(message, true);
  }
  
  clearMessage() {
    if (!this.messageElement) return;
    this.messageElement.textContent = '';
    this.messageElement.className = '';
  }
}

// models/DocumentModel.js
import DocumentAPI from '../api/document.js';

export default class DocumentModel {
  constructor() {
    this.elements = [];
  }
  
  async loadElements() {
    this.elements = await DocumentAPI.getElements();
    return this.elements;
  }
  
  async addText(text, position, style) {
    const result = await DocumentAPI.addText(text, position, style);
    // Refresh elements after adding new text
    await this.loadElements();
    return result;
  }
}

// views/ElementsView.js
export default class ElementsView {
  constructor(elementsContainerId, messageHandler) {
    this.container = document.getElementById(elementsContainerId);
    this.messageHandler = messageHandler;
  }
  
  renderElements(elements) {
    if (!this.container) return;
    
    this.container.innerHTML = '';
    
    if (elements.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No elements found in the document.';
      this.container.appendChild(emptyMessage);
      return;
    }
    
    const list = document.createElement('ul');
    
    elements.forEach(element => {
      const item = document.createElement('li');
      item.textContent = `${element.type}: ${element.id}`;
      list.appendChild(item);
    });
    
    this.container.appendChild(list);
  }
  
  showMessage(message) {
    this.messageHandler.showMessage(message);
  }
  
  showError(message) {
    this.messageHandler.showError(message);
  }
}

// controllers/AddOnController.js
export default class AddOnController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  initialize() {
    // Set up event listeners
    document.getElementById('load-btn').addEventListener('click', 
      () => this.handleLoadElements());
    
    document.getElementById('add-text-btn').addEventListener('click', 
      () => this.handleAddText());
    
    // Initial load of elements
    this.handleLoadElements();
  }
  
  async handleLoadElements() {
    try {
      const elements = await this.model.loadElements();
      this.view.renderElements(elements);
    } catch (error) {
      this.view.showError(error.message);
    }
  }
  
  async handleAddText() {
    try {
      const textInput = document.getElementById('text-input');
      if (!textInput.value.trim()) {
        this.view.showError("Please enter some text");
        return;
      }
      
      await this.model.addText(textInput.value);
      this.view.renderElements(this.model.elements);
      this.view.showMessage("Text added successfully");
      
      // Clear the input field
      textInput.value = '';
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}

// index.js (main entry point)
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import DocumentModel from './models/DocumentModel.js';
import ElementsView from './views/ElementsView.js';
import AddOnController from './controllers/AddOnController.js';
import MessageHandler from './utils/messageHandler.js';

// Initialize the add-on when SDK is ready
addOnUISdk.ready.then(() => {
  console.log("Add-on initialized");
  
  // Create the message handler
  const messageHandler = new MessageHandler('message');
  
  // Create the model
  const documentModel = new DocumentModel();
  
  // Create the view
  const elementsView = new ElementsView('elements-list', messageHandler);
  
  // Create and initialize the controller
  const controller = new AddOnController(documentModel, elementsView);
  controller.initialize();
}).catch(error => {
  console.error("Failed to initialize add-on:", error);
  const messageElement = document.getElementById('message');
  if (messageElement) {
    messageElement.textContent = "Failed to initialize add-on. Please reload.";
    messageElement.className = 'error';
  }
});
```

## Key Takeaways for Advanced Architecture

1. **Separate Concerns**: Divide your code into distinct responsibilities (data management, UI, business logic).

2. **Centralize State Management**: Use a consistent approach to manage state, especially for complex add-ons.

3. **Error Handling Strategy**: Implement comprehensive error handling and provide meaningful feedback to users.

4. **Modular Organization**: Structure your code into modules with clear purposes and dependencies.

5. **Type Safety**: Consider using TypeScript for improved code quality and developer experience.

6. **Testing Considerations**: Structure code to facilitate unit testing of individual components.

## Additional Resources

For more information on advanced architecture:

- [Adobe Express Add-on API Reference](/references/addonsdk-reference.md)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Redux Documentation](https://redux.js.org/)
- [React Patterns](https://reactpatterns.com/)

## Knowledge Check

Before proceeding to the next step, make sure you can answer these questions:

1. What are the benefits of using an MVC or MVVM pattern in an add-on?
2. How would you implement a state management solution for a complex add-on?
3. What directory structure would you use for an add-on with multiple features?
4. How can TypeScript improve the development of complex add-ons?
5. What strategies can you use for error handling in a production-ready add-on?

## Next Steps

Now that you understand advanced architectural patterns for Adobe Express add-ons, you're ready to learn about optimizing your add-on's performance.

[Continue to Step 2: Performance Optimization →](advanced-step2.md)

[← Back to Advanced Path Overview](advanced-index.md) 
