---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Performance
  - Optimization
  - Memory Management
  - Rendering
  - Profiling
title: Module 3 - Advanced UI Patterns
description: Master techniques for optimizing add-on performance, reducing memory usage, and ensuring smooth operation with large documents or complex operations.
contributors:
  - https://github.com/hollyschinsky
---

# Module 3: Advanced UI Patterns

**Estimated time: 2 hours**

As you develop more sophisticated add-ons, implementing advanced UI patterns becomes crucial for creating professional, intuitive user experiences. In this step, you'll learn how to design and implement complex UI components, responsive layouts, and interactive patterns that elevate your add-on's usability.

## Understanding UI Component Architecture

Professional add-ons require a thoughtful approach to UI components - small, reusable pieces that can be composed into complex interfaces.

### Component-Based Design

Breaking down your UI into components offers several advantages:

1. **Reusability**: Components can be reused throughout your add-on
2. **Maintainability**: Components are easier to update and debug
3. **Consistency**: Components ensure a uniform look and feel
4. **Testability**: Individual components can be tested in isolation

Here's a basic component architecture for vanilla JavaScript:

```javascript
// components/Tooltip.js
class Tooltip {
  constructor(options = {}) {
    this.position = options.position || 'top';
    this.content = options.content || '';
    this.delay = options.delay || 300;
    this.element = null;
    this.target = null;
    this.timeout = null;
  }
  
  attach(targetElement) {
    this.target = targetElement;
    
    // Add event listeners
    this.target.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.target.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    
    return this;
  }
  
  handleMouseEnter() {
    this.timeout = setTimeout(() => {
      this.show();
    }, this.delay);
  }
  
  handleMouseLeave() {
    clearTimeout(this.timeout);
    this.hide();
  }
  
  show() {
    if (this.element) return;
    
    // Create tooltip element
    this.element = document.createElement('div');
    this.element.className = `tooltip tooltip-${this.position}`;
    this.element.textContent = this.content;
    
    // Position the tooltip
    this.position = this.calculatePosition();
    Object.assign(this.element.style, this.position);
    
    // Add to DOM
    document.body.appendChild(this.element);
    
    // Add appearance animation
    setTimeout(() => {
      this.element.classList.add('tooltip-visible');
    }, 10);
  }
  
  hide() {
    if (!this.element) return;
    
    // Add disappearance animation
    this.element.classList.remove('tooltip-visible');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.element) {
        document.body.removeChild(this.element);
        this.element = null;
      }
    }, 200);
  }
  
  calculatePosition() {
    const targetRect = this.target.getBoundingClientRect();
    const position = {};
    
    switch(this.position) {
      case 'top':
        position.bottom = (window.innerHeight - targetRect.top + 5) + 'px';
        position.left = (targetRect.left + targetRect.width / 2) + 'px';
        position.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        position.top = (targetRect.bottom + 5) + 'px';
        position.left = (targetRect.left + targetRect.width / 2) + 'px';
        position.transform = 'translateX(-50%)';
        break;
      // Add more positions as needed
    }
    
    return position;
  }
  
  setContent(content) {
    this.content = content;
    if (this.element) {
      this.element.textContent = content;
    }
    return this;
  }
  
  destroy() {
    if (this.target) {
      this.target.removeEventListener('mouseenter', this.handleMouseEnter);
      this.target.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    
    if (this.element && document.body.contains(this.element)) {
      document.body.removeChild(this.element);
    }
    
    this.element = null;
    this.target = null;
  }
}

export default Tooltip;
```

### Implementing Component Systems

For larger add-ons, create a system of interrelated components:

```javascript
// Component registry for managing components
class ComponentRegistry {
  constructor() {
    this.components = new Map();
  }
  
  register(name, ComponentClass) {
    this.components.set(name, ComponentClass);
    return this;
  }
  
  create(name, options = {}, target = null) {
    if (!this.components.has(name)) {
      throw new Error(`Component "${name}" not registered`);
    }
    
    const ComponentClass = this.components.get(name);
    const instance = new ComponentClass(options);
    
    if (target) {
      instance.attach(target);
    }
    
    return instance;
  }
}

// Usage
const registry = new ComponentRegistry();
registry.register('tooltip', Tooltip);
registry.register('modal', Modal);
registry.register('dropdown', Dropdown);

// Create components as needed
const helpTooltip = registry.create('tooltip', {
  content: 'Click for help',
  position: 'bottom'
}, document.querySelector('.help-icon'));
```

## Advanced UI Patterns

Now let's explore advanced UI patterns that enhance user experience:

### 1. Master-Detail Pattern

This pattern displays a list of items (master) and details for the selected item (detail):

```javascript
class MasterDetailView {
  constructor(container, items, options = {}) {
    this.container = container;
    this.items = items;
    this.selectedId = null;
    this.options = Object.assign({
      itemRenderer: (item) => `<div>${item.title}</div>`,
      detailRenderer: (item) => `<div>${JSON.stringify(item)}</div>`,
      onSelect: null
    }, options);
    
    this.init();
  }
  
  init() {
    // Create layout
    this.container.classList.add('master-detail-container');
    this.container.innerHTML = `
      <div class="master-panel">
        <div class="master-list"></div>
      </div>
      <div class="detail-panel">
        <div class="detail-content"></div>
      </div>
    `;
    
    this.masterList = this.container.querySelector('.master-list');
    this.detailContent = this.container.querySelector('.detail-content');
    
    // Render master list
    this.renderMasterList();
    
    // Add event listeners
    this.masterList.addEventListener('click', this.handleItemClick.bind(this));
  }
  
  renderMasterList() {
    this.masterList.innerHTML = this.items.map(item => `
      <div class="master-item" data-id="${item.id}">
        ${this.options.itemRenderer(item)}
      </div>
    `).join('');
  }
  
  handleItemClick(event) {
    const item = event.target.closest('.master-item');
    if (!item) return;
    
    const id = item.dataset.id;
    this.selectItem(id);
  }
  
  selectItem(id) {
    // Deselect previous item
    const previousItem = this.masterList.querySelector('.master-item.selected');
    if (previousItem) {
      previousItem.classList.remove('selected');
    }
    
    // Select new item
    const selectedItem = this.masterList.querySelector(`.master-item[data-id="${id}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }
    
    // Update selected ID
    this.selectedId = id;
    
    // Find selected item data
    const itemData = this.items.find(item => item.id === id);
    
    // Render detail view
    if (itemData) {
      this.detailContent.innerHTML = this.options.detailRenderer(itemData);
      
      // Call select callback if provided
      if (this.options.onSelect) {
        this.options.onSelect(itemData);
      }
    }
  }
  
  updateItems(newItems) {
    this.items = newItems;
    this.renderMasterList();
    
    // Re-select previously selected item if it still exists
    if (this.selectedId) {
      if (this.items.some(item => item.id === this.selectedId)) {
        this.selectItem(this.selectedId);
      } else if (this.items.length > 0) {
        this.selectItem(this.items[0].id);
      }
    }
  }
}
```

### 2. Multi-Step Process Pattern

For complex workflows, guide users through sequential steps:

```javascript
class StepWizard {
  constructor(container, steps, options = {}) {
    this.container = container;
    this.steps = steps;
    this.currentStepIndex = 0;
    this.options = Object.assign({
      onStepChange: null,
      onComplete: null,
      validateStep: null
    }, options);
    
    this.init();
  }
  
  init() {
    // Create layout
    this.container.classList.add('step-wizard-container');
    this.container.innerHTML = `
      <div class="step-progress">
        ${this.steps.map((step, index) => `
          <div class="step-indicator ${index === 0 ? 'active' : ''}" data-step="${index}">
            <div class="step-number">${index + 1}</div>
            <div class="step-label">${step.label}</div>
          </div>
        `).join('')}
      </div>
      <div class="step-content"></div>
      <div class="step-navigation">
        <button class="step-prev" disabled>Previous</button>
        <button class="step-next">Next</button>
        <button class="step-complete" style="display: none;">Complete</button>
      </div>
    `;
    
    // Get references to elements
    this.stepContent = this.container.querySelector('.step-content');
    this.prevButton = this.container.querySelector('.step-prev');
    this.nextButton = this.container.querySelector('.step-next');
    this.completeButton = this.container.querySelector('.step-complete');
    
    // Add event listeners
    this.prevButton.addEventListener('click', () => this.prevStep());
    this.nextButton.addEventListener('click', () => this.nextStep());
    this.completeButton.addEventListener('click', () => this.complete());
    
    // Show first step
    this.showStep(0);
  }
  
  showStep(index) {
    if (index < 0 || index >= this.steps.length) return;
    
    // Update current step index
    this.currentStepIndex = index;
    
    // Update step indicators
    const indicators = this.container.querySelectorAll('.step-indicator');
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
      indicator.classList.toggle('completed', i < index);
    });
    
    // Update buttons
    this.prevButton.disabled = index === 0;
    this.nextButton.style.display = index < this.steps.length - 1 ? 'inline-block' : 'none';
    this.completeButton.style.display = index === this.steps.length - 1 ? 'inline-block' : 'none';
    
    // Show step content
    const step = this.steps[index];
    this.stepContent.innerHTML = '';
    
    if (typeof step.content === 'function') {
      const content = step.content();
      if (content instanceof Element) {
        this.stepContent.appendChild(content);
      } else {
        this.stepContent.innerHTML = content;
      }
    } else {
      this.stepContent.innerHTML = step.content;
    }
    
    // Call step change callback
    if (this.options.onStepChange) {
      this.options.onStepChange(index, step);
    }
  }
  
  async nextStep() {
    // Validate current step if validator provided
    if (this.options.validateStep) {
      const isValid = await this.options.validateStep(this.currentStepIndex, this.steps[this.currentStepIndex]);
      if (!isValid) return;
    }
    
    this.showStep(this.currentStepIndex + 1);
  }
  
  prevStep() {
    this.showStep(this.currentStepIndex - 1);
  }
  
  async complete() {
    // Validate final step if validator provided
    if (this.options.validateStep) {
      const isValid = await this.options.validateStep(this.currentStepIndex, this.steps[this.currentStepIndex]);
      if (!isValid) return;
    }
    
    // Call complete callback
    if (this.options.onComplete) {
      this.options.onComplete();
    }
  }
  
  getCurrentStepData() {
    return this.steps[this.currentStepIndex];
  }
  
  updateStepContent(index, content) {
    if (index >= 0 && index < this.steps.length) {
      this.steps[index].content = content;
      if (this.currentStepIndex === index) {
        this.showStep(index);
      }
    }
  }
}
```

### 3. Contextual Menu Pattern

Provide context-specific actions through menus:

```javascript
class ContextMenu {
  constructor(items = [], options = {}) {
    this.items = items;
    this.options = Object.assign({
      width: 200,
      zIndex: 1000,
      customClass: '',
      onSelect: null
    }, options);
    
    this.menu = null;
    this.visible = false;
    
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }
  
  attach(target, itemsProvider = null) {
    target.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      
      const items = itemsProvider ? itemsProvider(event.target) : this.items;
      this.show(event.clientX, event.clientY, items);
    });
    
    return this;
  }
  
  show(x, y, items = this.items) {
    this.hide();
    
    // Create menu element
    this.menu = document.createElement('div');
    this.menu.className = `context-menu ${this.options.customClass}`;
    this.menu.style.position = 'fixed';
    this.menu.style.zIndex = this.options.zIndex;
    this.menu.style.width = `${this.options.width}px`;
    
    // Add items to menu
    this.renderItems(items);
    
    // Add to DOM
    document.body.appendChild(this.menu);
    
    // Position the menu
    this.positionMenu(x, y);
    
    // Add event listener to close on outside click
    document.addEventListener('click', this.handleDocumentClick);
    
    // Mark as visible
    this.visible = true;
  }
  
  renderItems(items) {
    const html = items.map(item => {
      if (item.type === 'separator') {
        return `<div class="context-menu-separator"></div>`;
      }
      
      if (item.type === 'submenu' && item.items && item.items.length) {
        return `
          <div class="context-menu-item has-submenu" data-id="${item.id}">
            <span class="item-label">${item.label}</span>
            <span class="submenu-arrow">▶</span>
            <div class="context-submenu">
              ${this.renderSubItems(item.items)}
            </div>
          </div>
        `;
      }
      
      const disabledClass = item.disabled ? 'disabled' : '';
      return `
        <div class="context-menu-item ${disabledClass}" data-id="${item.id}">
          ${item.icon ? `<span class="item-icon">${item.icon}</span>` : ''}
          <span class="item-label">${item.label}</span>
          ${item.shortcut ? `<span class="item-shortcut">${item.shortcut}</span>` : ''}
        </div>
      `;
    }).join('');
    
    this.menu.innerHTML = html;
    
    // Add event listeners for items
    this.menu.querySelectorAll('.context-menu-item:not(.disabled)').forEach(item => {
      item.addEventListener('click', (event) => {
        const id = item.dataset.id;
        const menuItem = this.findItemById(id, items);
        
        if (menuItem && menuItem.action) {
          menuItem.action();
        }
        
        if (this.options.onSelect) {
          this.options.onSelect(menuItem);
        }
        
        // Don't close if clicking on submenu parent
        if (!item.classList.contains('has-submenu')) {
          this.hide();
        }
        
        event.stopPropagation();
      });
    });
  }
  
  renderSubItems(items) {
    return items.map(item => {
      if (item.type === 'separator') {
        return `<div class="context-menu-separator"></div>`;
      }
      
      const disabledClass = item.disabled ? 'disabled' : '';
      return `
        <div class="context-menu-item ${disabledClass}" data-id="${item.id}">
          ${item.icon ? `<span class="item-icon">${item.icon}</span>` : ''}
          <span class="item-label">${item.label}</span>
        </div>
      `;
    }).join('');
  }
  
  findItemById(id, items) {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      
      if (item.items && item.items.length) {
        const found = this.findItemById(id, item.items);
        if (found) return found;
      }
    }
    
    return null;
  }
  
  positionMenu(x, y) {
    const menuRect = this.menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Check if menu goes beyond right edge
    if (x + menuRect.width > viewportWidth) {
      x = viewportWidth - menuRect.width - 5;
    }
    
    // Check if menu goes beyond bottom edge
    if (y + menuRect.height > viewportHeight) {
      y = viewportHeight - menuRect.height - 5;
    }
    
    // Position the menu
    this.menu.style.left = `${x}px`;
    this.menu.style.top = `${y}px`;
  }
  
  handleDocumentClick(event) {
    if (this.visible && this.menu && !this.menu.contains(event.target)) {
      this.hide();
    }
  }
  
  hide() {
    if (this.menu && document.body.contains(this.menu)) {
      document.body.removeChild(this.menu);
      document.removeEventListener('click', this.handleDocumentClick);
      this.menu = null;
      this.visible = false;
    }
  }
  
  destroy() {
    this.hide();
  }
}
```

## Creating Responsive Layouts

Add-ons should adapt to different panel sizes and device types:

### Responsive Grid System

```javascript
class ResponsiveGrid {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      columns: {
        xs: 1,  // Extra small (<480px)
        sm: 2,  // Small (480px - 767px)
        md: 3,  // Medium (768px - 1023px)
        lg: 4   // Large (>=1024px)
      },
      gutter: 16,
      resizeDebounce: 200
    }, options);
    
    this.items = [];
    this.currentBreakpoint = null;
    
    this.init();
  }
  
  init() {
    // Set container style
    this.container.style.position = 'relative';
    
    // Setup resize handling
    this.debouncedResize = this.debounce(() => {
      this.updateLayout();
    }, this.options.resizeDebounce);
    
    window.addEventListener('resize', this.debouncedResize);
    
    // Initial layout update
    this.updateLayout();
  }
  
  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
  
  getBreakpoint() {
    const width = this.container.offsetWidth;
    
    if (width < 480) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    return 'lg';
  }
  
  getColumnCount() {
    const breakpoint = this.getBreakpoint();
    return this.options.columns[breakpoint] || 1;
  }
  
  updateLayout() {
    const breakpoint = this.getBreakpoint();
    
    // Check if breakpoint changed
    if (this.currentBreakpoint !== breakpoint) {
      this.currentBreakpoint = breakpoint;
    }
    
    if (this.items.length === 0) return;
    
    const columns = this.getColumnCount();
    const gutter = this.options.gutter;
    const containerWidth = this.container.offsetWidth;
    const itemWidth = (containerWidth - (gutter * (columns - 1))) / columns;
    
    // Calculate positions
    const heights = Array(columns).fill(0);
    
    this.items.forEach(item => {
      // Find the column with the smallest height
      const minHeight = Math.min(...heights);
      const columnIndex = heights.indexOf(minHeight);
      
      // Calculate position
      const x = columnIndex * (itemWidth + gutter);
      const y = minHeight;
      
      // Update item position
      item.style.position = 'absolute';
      item.style.width = `${itemWidth}px`;
      item.style.transform = `translate(${x}px, ${y}px)`;
      
      // Update column height
      heights[columnIndex] = y + item.offsetHeight + gutter;
    });
    
    // Update container height
    this.container.style.height = `${Math.max(...heights)}px`;
  }
  
  addItem(element) {
    this.items.push(element);
    this.container.appendChild(element);
    
    // Update layout after adding item
    setTimeout(() => this.updateLayout(), 10);
    
    return element;
  }
  
  removeItem(element) {
    const index = this.items.indexOf(element);
    if (index !== -1) {
      this.items.splice(index, 1);
      if (this.container.contains(element)) {
        this.container.removeChild(element);
      }
      this.updateLayout();
    }
  }
  
  clear() {
    this.items.forEach(item => {
      if (this.container.contains(item)) {
        this.container.removeChild(item);
      }
    });
    
    this.items = [];
    this.updateLayout();
  }
  
  destroy() {
    window.removeEventListener('resize', this.debouncedResize);
    this.clear();
  }
}
```

### Adaptive Panel Layout

Create layouts that adapt to the add-on panel size:

```javascript
class AdaptivePanel {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      breakpoints: {
        narrow: 320,
        medium: 480,
        wide: 720
      },
      defaultLayout: 'stack', // 'stack', 'split', or 'grid'
      layouts: {
        narrow: 'stack',
        medium: 'split',
        wide: 'grid'
      }
    }, options);
    
    this.currentSize = null;
    this.currentLayout = null;
    
    this.init();
  }
  
  init() {
    // Add base class
    this.container.classList.add('adaptive-panel');
    
    // Setup resize observer
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.handleResize(entry.contentRect.width);
      }
    });
    
    this.resizeObserver.observe(this.container);
    
    // Initial update
    this.handleResize(this.container.offsetWidth);
  }
  
  handleResize(width) {
    // Determine size category
    let size;
    if (width < this.options.breakpoints.narrow) {
      size = 'narrow';
    } else if (width < this.options.breakpoints.medium) {
      size = 'medium';
    } else if (width < this.options.breakpoints.wide) {
      size = 'wide';
    } else {
      size = 'wide';
    }
    
    // Skip if size hasn't changed
    if (this.currentSize === size) return;
    
    this.currentSize = size;
    
    // Determine layout based on size
    const layout = this.options.layouts[size] || this.options.defaultLayout;
    
    this.applyLayout(layout);
  }
  
  applyLayout(layout) {
    if (this.currentLayout === layout) return;
    
    // Remove previous layout class
    if (this.currentLayout) {
      this.container.classList.remove(`layout-${this.currentLayout}`);
    }
    
    // Add new layout class
    this.container.classList.add(`layout-${layout}`);
    this.currentLayout = layout;
    
    // Dispatch event
    const event = new CustomEvent('layoutChange', {
      detail: { layout, size: this.currentSize }
    });
    
    this.container.dispatchEvent(event);
  }
  
  destroy() {
    this.resizeObserver.disconnect();
  }
}
```

## Advanced Interaction Patterns

Create sophisticated interactions for enhanced usability:

### Drag-and-Drop with Reordering

```javascript
class DragDropList {
  constructor(container, items = [], options = {}) {
    this.container = container;
    this.options = Object.assign({
      itemSelector: '.draggable-item',
      handleSelector: null, // If null, the entire item is draggable
      animation: true,
      animationDuration: 150,
      onDragStart: null,
      onDragEnd: null,
      onOrderChange: null
    }, options);
    
    this.items = [];
    this.dragItem = null;
    this.dragInitialY = 0;
    this.dragCurrentY = 0;
    this.itemHeight = 0;
    this.placeholder = null;
    
    this.init();
    
    if (items.length) {
      this.setItems(items);
    }
  }
  
  init() {
    // Add container class
    this.container.classList.add('drag-drop-list');
    
    // Bind methods
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    
    // Add event delegation for existing and future items
    this.container.addEventListener('mousedown', (event) => {
      // Check if click is on handle or item
      const handle = this.options.handleSelector
        ? event.target.closest(this.options.handleSelector)
        : null;
      
      const item = event.target.closest(this.options.itemSelector);
      
      if (item && (this.options.handleSelector ? handle : true)) {
        this.handleDragStart(event, item);
      }
    });
  }
  
  setItems(items) {
    // Clear existing items
    this.container.innerHTML = '';
    
    // Add new items
    items.forEach(itemData => {
      const itemElement = document.createElement('div');
      itemElement.className = 'draggable-item';
      itemElement.innerHTML = `
        ${this.options.handleSelector ? '<div class="drag-handle">☰</div>' : ''}
        <div class="item-content">${
          typeof itemData === 'string' ? itemData : itemData.content || itemData.toString()
        }</div>
      `;
      
      // Store original data
      itemElement._data = itemData;
      
      this.container.appendChild(itemElement);
    });
    
    this.refreshItems();
  }
  
  refreshItems() {
    this.items = Array.from(this.container.querySelectorAll(this.options.itemSelector));
  }
  
  handleDragStart(event, item) {
    event.preventDefault();
    
    if (this.dragItem) return;
    
    // Store reference to dragged item
    this.dragItem = item;
    
    // Get initial positions
    const rect = item.getBoundingClientRect();
    this.itemHeight = rect.height;
    this.dragInitialY = event.clientY;
    this.dragCurrentY = event.clientY;
    
    // Create placeholder
    this.placeholder = document.createElement('div');
    this.placeholder.className = 'drag-placeholder';
    this.placeholder.style.height = `${this.itemHeight}px`;
    
    // Add dragging styles
    this.dragItem.classList.add('dragging');
    this.dragItem.style.position = 'absolute';
    this.dragItem.style.zIndex = '1000';
    this.dragItem.style.width = `${rect.width}px`;
    this.dragItem.style.height = `${rect.height}px`;
    this.dragItem.style.left = `${rect.left}px`;
    this.dragItem.style.top = `${rect.top}px`;
    
    // Add placeholder where the item was
    this.dragItem.parentNode.insertBefore(this.placeholder, this.dragItem.nextSibling);
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', this.handleDragMove);
    document.addEventListener('mouseup', this.handleDragEnd);
    
    // Call drag start callback
    if (this.options.onDragStart) {
      this.options.onDragStart(this.dragItem, this.dragItem._data);
    }
  }
    handleDragMove(event) {
      if (!this.dragItem) return;
      
      // Calculate new position
      const deltaY = event.clientY - this.dragInitialY;
      this.dragCurrentY = event.clientY;
      
      // Update position
      this.dragItem.style.transform = `translateY(${deltaY}px)`;
      
      // Calculate new index based on current position
      const itemElements = Array.from(this.container.querySelectorAll(this.options.itemSelector));
      const placeholderIndex = itemElements.indexOf(this.placeholder);
      
      // Get all items except the one being dragged
      const otherItems = itemElements.filter(item => item !== this.dragItem && item !== this.placeholder);
      
      let newIndex = -1;
      
      // Find the item we're hovering over
      for (let i = 0; i < otherItems.length; i++) {
        const otherItem = otherItems[i];
        const rect = otherItem.getBoundingClientRect();
        const middle = rect.top + rect.height / 2;
        
        if (event.clientY < middle) {
          newIndex = i;
          break;
        }
      }
      
      if (newIndex === -1 && otherItems.length > 0) {
        newIndex = otherItems.length;
      }
      
      // Move placeholder if needed
      if (newIndex !== -1 && newIndex !== placeholderIndex) {
        if (newIndex < otherItems.length) {
          this.container.insertBefore(this.placeholder, otherItems[newIndex]);
        } else {
          this.container.appendChild(this.placeholder);
        }
      }
    }
    
    handleDragEnd() {
      if (!this.dragItem) return;
      
      // Remove event listeners
      document.removeEventListener('mousemove', this.handleDragMove);
      document.removeEventListener('mouseup', this.handleDragEnd);
      
      // Move the actual item to the placeholder's position
      this.placeholder.parentNode.insertBefore(this.dragItem, this.placeholder);
      
      // Remove placeholder
      this.placeholder.parentNode.removeChild(this.placeholder);
      this.placeholder = null;
      
      // Reset dragged item styles
      this.dragItem.classList.remove('dragging');
      this.dragItem.style.position = '';
      this.dragItem.style.zIndex = '';
      this.dragItem.style.width = '';
      this.dragItem.style.height = '';
      this.dragItem.style.left = '';
      this.dragItem.style.top = '';
      this.dragItem.style.transform = '';
      
      // Get new order
      const newOrder = Array.from(this.container.querySelectorAll(this.options.itemSelector))
        .map(item => item._data);
      
      // Call callback
      if (this.options.onOrderChange) {
        this.options.onOrderChange(newOrder);
      }
      
      // Call drag end callback
      if (this.options.onDragEnd) {
        this.options.onDragEnd(this.dragItem, this.dragItem._data);
      }
      
      // Reset drag state
      this.dragItem = null;
    }
    
    getItems() {
      return Array.from(this.container.querySelectorAll(this.options.itemSelector))
        .map(item => item._data);
    }
    
    destroy() {
      if (this.dragItem) {
        this.handleDragEnd();
      }
    }
  }
  ```
  
  ### Custom Scrolling with Focus Areas
  
  Create custom scrolling behavior for improved user experience:
  
  ```javascript
  class EnhancedScroller {
    constructor(container, options = {}) {
      this.container = container;
      this.options = Object.assign({
        scrollbarWidth: 8,
        scrollbarColor: 'rgba(0, 0, 0, 0.3)',
        scrollbarHoverColor: 'rgba(0, 0, 0, 0.5)',
        animationDuration: 300,
        snapToElements: false,
        snapSelector: '.snap-target'
      }, options);
      
      this.init();
    }
    
    init() {
      // Set container style
      this.container.style.position = 'relative';
      this.container.style.overflow = 'hidden';
      
      // Create content wrapper
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'enhanced-scroll-wrapper';
      this.wrapper.style.height = '100%';
      this.wrapper.style.overflow = 'auto';
      this.wrapper.style.scrollbarWidth = 'none';  // Firefox
      this.wrapper.style.msOverflowStyle = 'none'; // IE/Edge
      
      // Hide default scrollbar
      this.wrapper.style.paddingRight = '20px';
      this.wrapper.style.boxSizing = 'content-box';
      
      // Move container's children to wrapper
      while (this.container.firstChild) {
        this.wrapper.appendChild(this.container.firstChild);
      }
      
      this.container.appendChild(this.wrapper);
      
      // Create custom scrollbar
      this.scrollbar = document.createElement('div');
      this.scrollbar.className = 'enhanced-scrollbar';
      this.scrollbar.style.position = 'absolute';
      this.scrollbar.style.right = '0';
      this.scrollbar.style.top = '0';
      this.scrollbar.style.width = `${this.options.scrollbarWidth}px`;
      this.scrollbar.style.backgroundColor = this.options.scrollbarColor;
      this.scrollbar.style.borderRadius = `${this.options.scrollbarWidth / 2}px`;
      this.scrollbar.style.opacity = '0';
      this.scrollbar.style.transition = 'opacity 0.2s, background-color 0.2s';
      this.scrollbar.style.cursor = 'pointer';
      
      this.container.appendChild(this.scrollbar);
      
      // Bind event handlers
      this.handleScroll = this.handleScroll.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleScrollbarDragStart = this.handleScrollbarDragStart.bind(this);
      this.handleScrollbarDragMove = this.handleScrollbarDragMove.bind(this);
      this.handleScrollbarDragEnd = this.handleScrollbarDragEnd.bind(this);
      
      // Add event listeners
      this.wrapper.addEventListener('scroll', this.handleScroll);
      this.container.addEventListener('mouseenter', this.handleMouseEnter);
      this.container.addEventListener('mouseleave', this.handleMouseLeave);
      this.scrollbar.addEventListener('mousedown', this.handleScrollbarDragStart);
      
      // Initial update
      this.updateScrollbar();
    }
    
    updateScrollbar() {
      const { scrollHeight, clientHeight, scrollTop } = this.wrapper;
      
      // Calculate scrollbar height
      const scrollRatio = clientHeight / scrollHeight;
      const scrollbarHeight = Math.max(clientHeight * scrollRatio, 30);
      
      // Calculate scrollbar position
      const maxScrollTop = scrollHeight - clientHeight;
      const scrollbarTop = (scrollTop / maxScrollTop) * (clientHeight - scrollbarHeight);
      
      // Update scrollbar
      this.scrollbar.style.height = `${scrollbarHeight}px`;
      this.scrollbar.style.transform = `translateY(${scrollbarTop}px)`;
      
      // Show scrollbar if content is scrollable
      if (scrollHeight > clientHeight) {
        this.scrollbar.style.display = 'block';
      } else {
        this.scrollbar.style.display = 'none';
      }
    }
    
    handleScroll() {
      this.updateScrollbar();
      
      // Show scrollbar while scrolling
      this.scrollbar.style.opacity = '1';
      
      // Hide scrollbar after scrolling stops
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        if (!this.isHovering) {
          this.scrollbar.style.opacity = '0';
        }
      }, 1000);
      
      // Handle snap-to elements if enabled
      if (this.options.snapToElements && !this.isDragging) {
        clearTimeout(this.snapTimeout);
        this.snapTimeout = setTimeout(() => {
          this.snapToNearestElement();
        }, 200);
      }
    }
    
    snapToNearestElement() {
      const { scrollTop, clientHeight } = this.wrapper;
      const middleY = scrollTop + clientHeight / 2;
      
      // Find all snap targets
      const snapElements = this.wrapper.querySelectorAll(this.options.snapSelector);
      if (snapElements.length === 0) return;
      
      // Find the closest element to the current scroll position
      let closestElement = null;
      let closestDistance = Infinity;
      
      snapElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementMiddleY = rect.top + rect.height / 2;
        const distance = Math.abs(elementMiddleY - middleY);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      });
      
      if (closestElement) {
        // Scroll to the closest element
        this.scrollToElement(closestElement);
      }
    }
    
    scrollToElement(element, offset = 0) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      
      const elementTop = this.wrapper.scrollTop + elementRect.top - containerRect.top;
      const targetScrollTop = elementTop - offset;
      
      this.smoothScrollTo(targetScrollTop);
    }
    
    smoothScrollTo(targetScrollTop) {
      const startScrollTop = this.wrapper.scrollTop;
      const distance = targetScrollTop - startScrollTop;
      const startTime = performance.now();
      
      const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / this.options.animationDuration, 1);
        
        // Easing function (ease-out)
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
        this.wrapper.scrollTop = startScrollTop + distance * easeOutProgress;
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
    
    handleMouseEnter() {
      this.isHovering = true;
      this.scrollbar.style.opacity = '1';
    }
    
    handleMouseLeave() {
      this.isHovering = false;
      if (!this.isDragging) {
        this.scrollbar.style.opacity = '0';
      }
    }
    
    handleScrollbarDragStart(event) {
      event.preventDefault();
      
      this.isDragging = true;
      this.dragStartY = event.clientY;
      this.dragStartScrollTop = this.wrapper.scrollTop;
      
      this.scrollbar.style.backgroundColor = this.options.scrollbarHoverColor;
      
      document.addEventListener('mousemove', this.handleScrollbarDragMove);
      document.addEventListener('mouseup', this.handleScrollbarDragEnd);
    }
    
    handleScrollbarDragMove(event) {
      if (!this.isDragging) return;
      
      const { scrollHeight, clientHeight } = this.wrapper;
      const deltaY = event.clientY - this.dragStartY;
      const scrollRatio = scrollHeight / clientHeight;
      
      this.wrapper.scrollTop = this.dragStartScrollTop + (deltaY * scrollRatio);
    }
    
    handleScrollbarDragEnd() {
      this.isDragging = false;
      this.scrollbar.style.backgroundColor = this.options.scrollbarColor;
      
      document.removeEventListener('mousemove', this.handleScrollbarDragMove);
      document.removeEventListener('mouseup', this.handleScrollbarDragEnd);
      
      if (!this.isHovering) {
        this.scrollbar.style.opacity = '0';
      }
    }
    
    destroy() {
      // Remove event listeners
      this.wrapper.removeEventListener('scroll', this.handleScroll);
      this.container.removeEventListener('mouseenter', this.handleMouseEnter);
      this.container.removeEventListener('mouseleave', this.handleMouseLeave);
      this.scrollbar.removeEventListener('mousedown', this.handleScrollbarDragStart);
      
      // Move wrapper's children back to container
      while (this.wrapper.firstChild) {
        this.container.appendChild(this.wrapper.firstChild);
      }
      
      // Remove wrapper and scrollbar
      if (this.wrapper.parentNode === this.container) {
        this.container.removeChild(this.wrapper);
      }
      
      if (this.scrollbar.parentNode === this.container) {
        this.container.removeChild(this.scrollbar);
      }
      
      // Reset container style
      this.container.style.overflow = '';
    }
  }
  ```
  
  ## Practical Exercise: Building a Media Library Add-on
  
  Let's apply these advanced UI patterns to create a sophisticated media library add-on:
  
  ```javascript
  import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
  
  // Import our custom UI components
  import { MasterDetailView } from './components/MasterDetailView.js';
  import { DragDropList } from './components/DragDropList.js';
  import { ContextMenu } from './components/ContextMenu.js';
  import { ResponsiveGrid } from './components/ResponsiveGrid.js';
  import { AdaptivePanel } from './components/AdaptivePanel.js';
  
  // Wait for SDK to be ready
  addOnUISdk.ready.then(async () => {
    await initializeMediaLibrary();
  });
  
  async function initializeMediaLibrary() {
    const rootElement = document.getElementById('app-root');
    
    // Create adaptive layout
    const adaptivePanel = new AdaptivePanel(rootElement, {
      breakpoints: {
        narrow: 320,  // Compact mobile-like view
        medium: 480,  // Tablet-like view
        wide: 720     // Desktop-like view
      },
      layouts: {
        narrow: 'stack',
        medium: 'split',
        wide: 'grid'
      }
    });
    
    // Create application structure
    rootElement.innerHTML = `
      <div class="app-header">
        <h1>Media Library</h1>
        <div class="toolbar">
          <button id="import-btn" class="primary-btn">Import</button>
          <button id="view-toggle" class="icon-btn">
            <span class="grid-icon">⊞</span>
          </button>
        </div>
      </div>
      
      <div class="app-content">
        <div class="categories-panel">
          <h2>Categories</h2>
          <div id="categories-list"></div>
        </div>
        
        <div class="media-panel">
          <div class="search-bar">
            <input type="text" id="search-input" placeholder="Search media...">
          </div>
          <div id="media-container"></div>
        </div>
        
        <div class="detail-panel">
          <div id="item-details"></div>
        </div>
      </div>
    `;
    
    // Handle layout changes
    adaptivePanel.container.addEventListener('layoutChange', (event) => {
      const { layout } = event.detail;
      
      // Adjust UI based on layout
      if (layout === 'stack') {
        // Hide some panels in stack layout
        document.querySelector('.detail-panel').style.display = 'none';
      } else {
        document.querySelector('.detail-panel').style.display = 'block';
      }
    });
    
    // Create draggable categories list
    const categoriesList = document.getElementById('categories-list');
    const categoriesData = [
      { id: 'all', name: 'All Media', count: 24 },
      { id: 'images', name: 'Images', count: 16 },
      { id: 'vectors', name: 'Vectors', count: 5 },
      { id: 'icons', name: 'Icons', count: 3 }
    ];
    
    const dragDropList = new DragDropList(categoriesList, [], {
      onOrderChange: (newOrder) => {
        console.log('Categories reordered:', newOrder);
      }
    });
    
    // Add categories with custom rendering
    categoriesData.forEach(category => {
      const item = document.createElement('div');
      item.className = 'category-item draggable-item';
      item.dataset.id = category.id;
      item._data = category;
      
      item.innerHTML = `
        <div class="drag-handle">☰</div>
        <div class="category-name">${category.name}</div>
        <div class="category-count">${category.count}</div>
      `;
      
      categoriesList.appendChild(item);
    });
    
    // Create context menu for categories
    const categoryContextMenu = new ContextMenu([
      { id: 'rename', label: 'Rename', icon: '✏️', action: () => showRenameDialog() },
      { id: 'delete', label: 'Delete', icon: '🗑️', action: () => showDeleteConfirmation() },
      { type: 'separator' },
      { id: 'new', label: 'New Category', icon: '➕', action: () => showNewCategoryDialog() }
    ]);
    
    // Attach context menu to categories
    categoryContextMenu.attach(categoriesList, (target) => {
      const categoryItem = target.closest('.category-item');
      if (!categoryItem) return [];
      
      const isDefault = categoryItem.dataset.id === 'all';
      
      // Customize menu items based on category
      return [
        { id: 'rename', label: 'Rename', icon: '✏️', disabled: isDefault },
        { id: 'delete', label: 'Delete', icon: '🗑️', disabled: isDefault },
        { type: 'separator' },
        { id: 'new', label: 'New Category', icon: '➕' }
      ];
    });
    
    // Create responsive grid for media items
    const mediaContainer = document.getElementById('media-container');
    const responsiveGrid = new ResponsiveGrid(mediaContainer, {
      columns: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4
      },
      gutter: 16
    });
    
    // Add some sample media items
    const mediaItems = generateSampleMediaItems(20);
    mediaItems.forEach(item => {
      const mediaElement = createMediaItemElement(item);
      responsiveGrid.addItem(mediaElement);
      
      // Make items draggable to document
      addOnUISdk.app.enableDragToDocument(mediaElement, {
        previewCallback: () => {
          return {
            type: item.type === 'image' ? 'image' : 'text',
            url: item.url
          };
        },
        completionCallback: async () => {
          try {
            // Add the item to the document
            if (item.type === 'image') {
              await addOnUISdk.app.document.addImage(item.url);
            } else {
              await addOnUISdk.app.document.addText(item.name);
            }
            console.log(`Added ${item.name} to document`);
          } catch (error) {
            console.error('Error adding element to document:', error);
          }
        }
      });
    });
    
    // Update layout
    responsiveGrid.updateLayout();
    
    // Implement search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
      const searchTerm = event.target.value.toLowerCase();
      
      // Filter items
      const filteredItems = mediaItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      
      // Update grid
      responsiveGrid.clear();
      filteredItems.forEach(item => {
        const mediaElement = createMediaItemElement(item);
        responsiveGrid.addItem(mediaElement);
      });
    });
    
    // Set up item details panel
    const itemDetailsPanel = document.getElementById('item-details');
    
    // Helper to show item details
    function showItemDetails(item) {
      itemDetailsPanel.innerHTML = `
        <div class="details-header">
          <h2>${item.name}</h2>
          <button class="close-btn">×</button>
        </div>
        <div class="details-preview">
          <img src="${item.url}" alt="${item.name}">
        </div>
        <div class="details-info">
          <div class="info-row"><span>Type:</span> ${item.type}</div>
          <div class="info-row"><span>Size:</span> ${item.width} × ${item.height}px</div>
          <div class="info-row"><span>Added:</span> ${formatDate(item.dateAdded)}</div>
          <div class="info-row tags">
            <span>Tags:</span>
            <div class="tags-list">
              ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="details-actions">
          <button id="add-to-document" class="primary-btn">Add to Document</button>
          <button id="delete-item" class="danger-btn">Delete</button>
        </div>
      `;
      
      // Set up event listeners
      itemDetailsPanel.querySelector('.close-btn').addEventListener('click', () => {
        itemDetailsPanel.innerHTML = '<p class="empty-state">Select an item to view details</p>';
      });
      
      itemDetailsPanel.querySelector('#add-to-document').addEventListener('click', async () => {
        try {
          if (item.type === 'image') {
            await addOnUISdk.app.document.addImage(item.url);
          } else {
            await addOnUISdk.app.document.addText(item.name);
          }
          console.log(`Added ${item.name} to document`);
        } catch (error) {
          console.error('Error adding element to document:', error);
        }
      });
    }
    
    // Initial empty state for details panel
    itemDetailsPanel.innerHTML = '<p class="empty-state">Select an item to view details</p>';
  }
  
  // Helper functions
  function createMediaItemElement(item) {
    const element = document.createElement('div');
    element.className = 'media-item';
    element.dataset.id = item.id;
    
    element.innerHTML = `
      <div class="media-preview">
        <img src="${item.url}" alt="${item.name}">
      </div>
      <div class="media-info">
        <div class="media-name">${item.name}</div>
        <div class="media-meta">${item.width}×${item.height}</div>
      </div>
    `;
    
    // Add click handler to show details
    element.addEventListener('click', () => {
      showItemDetails(item);
      
      // Select this item
      document.querySelectorAll('.media-item').forEach(el => {
        el.classList.remove('selected');
      });
      element.classList.add('selected');
    });
    
    return element;
  }
  
  function generateSampleMediaItems(count) {
    const items = [];
    const types = ['image', 'vector'];
    const tags = ['nature', 'abstract', 'people', 'business', 'technology', 'food'];
    
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const width = 300 + Math.floor(Math.random() * 700);
      const height = 200 + Math.floor(Math.random() * 500);
      
      const id = `media-${i}`;
      const name = `Sample ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}`;
      const url = `https://picsum.photos/${width}/${height}?random=${i}`;
      const dateAdded = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date in past 30 days
      
      // Generate 1-3 random tags
      const itemTags = [];
      const tagCount = 1 + Math.floor(Math.random() * 3);
      for (let j = 0; j < tagCount; j++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!itemTags.includes(tag)) {
          itemTags.push(tag);
        }
      }
      
      items.push({
        id,
        name,
        type,
        url,
        width,
        height,
        dateAdded,
        tags: itemTags
      });
    }
    
    return items;
  }
  
  function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  
  function showRenameDialog() {
    // Implementation for rename dialog
    console.log('Rename dialog would show here');
  }
  
  function showDeleteConfirmation() {
    // Implementation for delete confirmation
    console.log('Delete confirmation would show here');
  }
  
  function showNewCategoryDialog() {
    // Implementation for new category dialog
    console.log('New category dialog would show here');
  }
  ```
  
  ## Key Takeaways for Advanced UI Patterns
  
  1. **Component Architecture**: Break down complex UIs into reusable, maintainable components
  2. **Adaptiveness**: Create layouts that adapt to different device sizes and panel dimensions
  3. **Advanced Interaction**: Implement sophisticated interactions like drag-and-drop and custom scrolling
  4. **Context-Aware UI**: Use patterns like master-detail and contextual menus to make UIs more intuitive
  5. **Progressive Disclosure**: Reveal complexity gradually through patterns like multi-step wizards
  
  ## Additional Resources
  
  For more information on advanced UI patterns:
  
  - [Spectrum Workshop Tutorial](../../tutorials/spectrum-workshop/index.md)
  - [Design Best Practices](../../design/best_practices.md)
  - [UX Guidelines](../../design/ux_guidelines/index.md)
  - [Implementation Guide](../../design/implementation_guide.md)
  
  ## Knowledge Check
  
  Before proceeding to the next step, make sure you can answer these questions:
  
  1. What are the benefits of using a component-based architecture for add-on UIs?
  2. How would you implement a responsive layout that adapts to different panel sizes?
  3. What UI patterns are most appropriate for complex add-ons with many features?
  4. How can you create performant custom UI components that don't negatively impact performance?
  5. What considerations should you keep in mind when implementing drag-and-drop functionality?
  
  ## Next Steps
  
  Now that you understand how to implement advanced UI patterns in Adobe Express add-ons, you're ready to learn about integrating with external APIs and services.
  
  [Continue to Step 4: External API Integration →](advanced-step4a.md)
  
  [← Back to Step 2: Performance Optimization](advanced-step2.md)
  

