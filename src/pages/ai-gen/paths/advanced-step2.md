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
title: Performance Optimization
description: Master techniques for optimizing add-on performance, reducing memory usage, and ensuring smooth operation with large documents or complex operations.
contributors:
  - https://github.com/hollyschinsky
---

# Module 2: Performance Optimization

**Estimated time: 1.5 hours**

Performance is a critical aspect of professional add-on development. In this step, you'll learn techniques to optimize your add-ons for speed, efficiency, and responsiveness, especially when working with large documents or complex operations.

## Understanding Performance Bottlenecks

Before optimizing, it's important to understand where performance issues typically occur in add-ons:

1. **DOM Manipulation**: Excessive or inefficient DOM operations can cause UI lag
2. **API Calls**: Frequent or unoptimized calls to the Add-on SDK
3. **Data Processing**: Inefficient handling of large data sets
4. **Resource Loading**: Large assets or unoptimized resources
5. **Memory Usage**: Memory leaks or excessive memory consumption

## Measuring and Profiling Performance

Always begin optimization efforts by measuring current performance:

### Using Browser Developer Tools

```javascript
// Mark the start of a performance-critical section
console.time('documentOperationTimer');

// Perform your operation
await processLargeDocument();

// Mark the end and log the time
console.timeEnd('documentOperationTimer');
```

### Performance Markers for Complex Operations

```javascript
// For more complex scenarios, use performance markers
performance.mark('startOperation');

// Perform operation
await complexOperation();

// End the performance measurement
performance.mark('endOperation');
performance.measure('operationDuration', 'startOperation', 'endOperation');

// Log the results
const measures = performance.getEntriesByName('operationDuration');
console.log(`Operation took ${measures[0].duration}ms`);
```

### Creating a Performance Monitoring Utility

For comprehensive performance tracking across your add-on:

```javascript
// utils/performance.js
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.ongoing = new Map();
  }
  
  start(operationName) {
    this.ongoing.set(operationName, performance.now());
    return operationName;
  }
  
  end(operationName) {
    if (!this.ongoing.has(operationName)) {
      console.warn(`No performance measurement started for: ${operationName}`);
      return;
    }
    
    const startTime = this.ongoing.get(operationName);
    const duration = performance.now() - startTime;
    
    this.ongoing.delete(operationName);
    
    if (!this.metrics[operationName]) {
      this.metrics[operationName] = {
        count: 0,
        totalTime: 0,
        minTime: Infinity,
        maxTime: 0
      };
    }
    
    const metric = this.metrics[operationName];
    metric.count++;
    metric.totalTime += duration;
    metric.minTime = Math.min(metric.minTime, duration);
    metric.maxTime = Math.max(metric.maxTime, duration);
    
    return duration;
  }
  
  getMetrics(operationName = null) {
    if (operationName) {
      return this.metrics[operationName] || null;
    }
    
    return this.metrics;
  }
  
  getSummary() {
    const summary = {};
    
    for (const [op, metric] of Object.entries(this.metrics)) {
      summary[op] = {
        count: metric.count,
        avgTime: metric.totalTime / metric.count,
        minTime: metric.minTime,
        maxTime: metric.maxTime,
        totalTime: metric.totalTime
      };
    }
    
    return summary;
  }
  
  logSummary() {
    console.table(this.getSummary());
  }
  
  reset() {
    this.metrics = {};
    this.ongoing.clear();
  }
  
  // Create an async monitoring wrapper
  async monitor(operationName, asyncFunc, ...args) {
    this.start(operationName);
    try {
      return await asyncFunc(...args);
    } finally {
      this.end(operationName);
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

Usage:

```javascript
import { performanceMonitor } from '../utils/performance.js';

// Simple operation timing
async function loadDocument() {
  const opName = performanceMonitor.start('documentLoad');
  try {
    // Perform document loading
    const elements = await addOnUISdk.app.document.getElements();
    return elements;
  } finally {
    performanceMonitor.end(opName);
  }
}

// Monitoring wrapper for async functions
async function processDocumentElements() {
  return await performanceMonitor.monitor(
    'elementProcessing',
    async () => {
      const elements = await addOnUISdk.app.document.getElements();
      // Process elements...
      return processedData;
    }
  );
}

// Log performance metrics
function showPerformanceReport() {
  performanceMonitor.logSummary();
}
```

## Optimizing API Calls

API calls to the Add-on SDK can be a significant performance bottleneck, especially when dealing with document operations:

### Batching Operations

Instead of making multiple individual API calls, batch them where possible:

```javascript
// Inefficient: Multiple individual API calls
async function addMultipleTextsInefficient(texts) {
  for (const text of texts) {
    await addOnUISdk.app.document.addText(text, { position: { x: 100, y: 100 + index * 50 } });
  }
}

// Better: Collect elements and then add them in a batch
async function addMultipleTextsEfficient(texts) {
  const elements = [];
  let y = 100;
  
  for (const text of texts) {
    elements.push({
      type: 'text',
      text, 
      position: { x: 100, y }
    });
    y += 50;
  }
  
  // A hypothetical batch API - check documentation for actual batch methods
  await addOnUISdk.app.document.addElements(elements);
}
```

### Caching API Results

Cache results when they don't change frequently:

```javascript
// Cache manager for API results
class ApiCache {
  constructor(ttlMs = 30000) { // Default TTL: 30 seconds
    this.cache = new Map();
    this.ttlMs = ttlMs;
  }
  
  async get(key, fetchFunc) {
    const now = Date.now();
    const cached = this.cache.get(key);
    
    // Return cached value if valid
    if (cached && now - cached.timestamp < this.ttlMs) {
      return cached.value;
    }
    
    // Fetch new value
    const value = await fetchFunc();
    
    // Cache the new value
    this.cache.set(key, {
      value,
      timestamp: now
    });
    
    return value;
  }
  
  invalidate(key) {
    this.cache.delete(key);
  }
  
  invalidateAll() {
    this.cache.clear();
  }
}

const apiCache = new ApiCache();

// Usage
async function getDocumentElements() {
  return apiCache.get('documentElements', async () => {
    return await addOnUISdk.app.document.getElements();
  });
}

// Invalidate cache when document changes
function handleDocumentChange() {
  apiCache.invalidate('documentElements');
}
```

## Optimizing DOM Operations

DOM manipulation is often the main cause of UI lag in add-ons:

### Using DocumentFragment for Batch DOM Updates

```javascript
function renderElementsList(elements) {
  const container = document.getElementById('elements-list');
  
  // Create a document fragment (doesn't trigger reflow)
  const fragment = document.createDocumentFragment();
  
  elements.forEach(element => {
    const item = document.createElement('li');
    item.textContent = `${element.type}: ${element.id}`;
    item.dataset.id = element.id;
    fragment.appendChild(item);
  });
  
  // Clear the container and append the fragment (single reflow)
  container.innerHTML = '';
  container.appendChild(fragment);
}
```

### Virtual Scrolling for Large Lists

When displaying large lists, only render the visible items:

```javascript
class VirtualScroller {
  constructor(containerElement, items, itemHeight, renderItem) {
    this.container = containerElement;
    this.items = items;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    
    this.visibleItems = [];
    this.scrollTop = 0;
    this.containerHeight = 0;
    
    this.init();
  }
  
  init() {
    // Set container style
    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    
    // Create content height element
    this.heightEl = document.createElement('div');
    this.heightEl.style.position = 'absolute';
    this.heightEl.style.width = '1px';
    this.heightEl.style.top = '0';
    this.container.appendChild(this.heightEl);
    
    // Add scroll event listener
    this.container.addEventListener('scroll', () => {
      this.onScroll();
    });
    
    // Initial render
    this.updateContainerHeight();
    this.updateVisibleItems();
  }
  
  updateContainerHeight() {
    this.containerHeight = this.container.clientHeight;
    this.heightEl.style.height = `${this.items.length * this.itemHeight}px`;
  }
  
  onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.updateVisibleItems();
  }
  
  updateVisibleItems() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      this.items.length - 1,
      Math.floor((this.scrollTop + this.containerHeight) / this.itemHeight)
    );
    
    const visibleItemsCount = endIndex - startIndex + 1;
    
    // Clear container
    this.container.querySelectorAll('.virtual-item').forEach(el => el.remove());
    
    // Render visible items
    for (let i = startIndex; i <= endIndex; i++) {
      const item = this.items[i];
      const itemEl = this.renderItem(item, i);
      
      itemEl.classList.add('virtual-item');
      itemEl.style.position = 'absolute';
      itemEl.style.top = `${i * this.itemHeight}px`;
      itemEl.style.height = `${this.itemHeight}px`;
      itemEl.style.width = '100%';
      
      this.container.appendChild(itemEl);
    }
  }
  
  updateItems(newItems) {
    this.items = newItems;
    this.updateContainerHeight();
    this.updateVisibleItems();
  }
}

// Usage
const container = document.getElementById('elements-container');
const elements = await getDocumentElements();

const scroller = new VirtualScroller(
  container,
  elements,
  40, // Item height in pixels
  (element, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'element-item';
    itemEl.textContent = `${index + 1}. ${element.type}: ${element.id}`;
    return itemEl;
  }
);
```

## Memory Management

Proper memory management is crucial for long-running add-ons:

### Avoiding Memory Leaks

Common sources of memory leaks in add-ons:

1. **Event listeners that aren't removed**
2. **Closures capturing large objects**
3. **Circular references**
4. **Large caches that aren't properly managed**

```javascript
// Bad practice - potential memory leak
function setupListeners() {
  const button = document.getElementById('process-button');
  const largeData = loadLargeDataset(); // This data is captured in the closure
  
  button.addEventListener('click', () => {
    processData(largeData);
  });
}

// Better practice
function setupListeners() {
  const button = document.getElementById('process-button');
  
  // Use a named function that can be removed later
  const handleClick = () => {
    const largeData = loadLargeDataset(); // Load data only when needed
    processData(largeData);
  };
  
  button.addEventListener('click', handleClick);
  
  // Keep a reference to remove the listener when appropriate
  return () => {
    button.removeEventListener('click', handleClick);
  };
}

// Cleanup when component is destroyed
const removeListeners = setupListeners();
// Later...
removeListeners();
```

### Managing Large Data Sets

When working with large documents or data sets:

```javascript
// Process large datasets in chunks
async function processLargeElementSet(elements) {
  const CHUNK_SIZE = 100;
  const results = [];
  
  // Process in chunks to avoid blocking the main thread
  for (let i = 0; i < elements.length; i += CHUNK_SIZE) {
    const chunk = elements.slice(i, i + CHUNK_SIZE);
    
    // Process chunk
    const chunkResults = await processElementChunk(chunk);
    results.push(...chunkResults);
    
    // Allow UI to update between chunks
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Update progress UI
    updateProgress(i / elements.length);
  }
  
  return results;
}

async function processElementChunk(elements) {
  // Process a manageable number of elements
  return Promise.all(elements.map(async element => {
    // Process individual element
    return processElement(element);
  }));
}
```

## Optimizing Resource Loading

Efficiently loading resources improves startup time and overall responsiveness:

### Lazy Loading

```javascript
// Lazy load images
function setupLazyLoading() {
  const images = document.querySelectorAll('.lazy-image');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => observer.observe(img));
}
```

### Dynamic Imports

```javascript
// Load modules only when needed
async function openAdvancedEditor() {
  // Show loading indicator
  showLoading();
  
  try {
    // Dynamically import the advanced editor module
    const { AdvancedEditor } = await import('./advanced-editor.js');
    
    // Initialize editor
    const editor = new AdvancedEditor();
    editor.mount('#editor-container');
  } catch (error) {
    console.error('Failed to load advanced editor:', error);
    showError('Failed to load editor components');
  } finally {
    hideLoading();
  }
}
```

## Rendering Optimization

Optimize how your add-on's UI updates and renders:

### Throttling and Debouncing

```javascript
// utils/timing.js
export function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage
import { debounce, throttle } from '../utils/timing.js';

// Debounce search input - only triggers when user stops typing
const debouncedSearch = debounce((query) => {
  searchDocumentElements(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Throttle scroll handler - limits how often it can fire
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

container.addEventListener('scroll', throttledScroll);
```

### Efficient Rendering with RequestAnimationFrame

```javascript
class SmoothProgressBar {
  constructor(element) {
    this.element = element;
    this.current = 0;
    this.target = 0;
    this.animating = false;
  }
  
  setProgress(progress) {
    this.target = Math.max(0, Math.min(100, progress));
    
    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }
  
  animate() {
    // Calculate step based on distance
    const diff = this.target - this.current;
    const step = Math.sign(diff) * Math.min(Math.abs(diff), 2);
    
    if (Math.abs(diff) < 0.1) {
      this.current = this.target;
      this.element.style.width = `${this.current}%`;
      this.animating = false;
      return;
    }
    
    this.current += step;
    this.element.style.width = `${this.current}%`;
    
    requestAnimationFrame(() => this.animate());
  }
}

// Usage
const progressBar = new SmoothProgressBar(
  document.querySelector('.progress-bar-inner')
);

function updateProgress(percent) {
  progressBar.setProgress(percent * 100);
}
```

## Practical Exercise: Optimizing an Image Processing Add-on

Let's apply these optimization techniques to an image processing add-on that handles large documents:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { performanceMonitor } from './utils/performance.js';
import { debounce } from './utils/timing.js';

// Cache for document elements
const apiCache = new Map();
const CACHE_TIMEOUT = 20000; // 20 seconds

// Wait for SDK to be ready
addOnUISdk.ready.then(async () => {
  initializeAddOn();
});

async function initializeAddOn() {
  // Set up event listeners
  document.getElementById('process-images').addEventListener('click', processAllImages);
  document.getElementById('batch-size').addEventListener('change', updateBatchSize);
  
  // Debounced refresh to prevent too many API calls
  const debouncedRefresh = debounce(refreshImagesList, 500);
  document.getElementById('refresh-button').addEventListener('click', debouncedRefresh);
  
  // Set up document change listener
  addOnUISdk.app.on('documentChanged', () => {
    console.log('Document changed, invalidating cache');
    invalidateCache();
    debouncedRefresh();
  });
  
  // Initial load
  await refreshImagesList();
}

async function getDocumentImages() {
  const cacheKey = 'documentImages';
  
  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TIMEOUT)) {
    console.log('Using cached document images');
    return cached.data;
  }
  
  console.log('Fetching document images from API');
  
  // Performance measurement
  performanceMonitor.start('getDocumentImages');
  
  try {
    // Get all elements
    const elements = await addOnUISdk.app.document.getElements();
    
    // Filter to only images
    const images = elements.filter(el => el.type === 'image');
    
    // Update cache
    apiCache.set(cacheKey, {
      data: images,
      timestamp: Date.now()
    });
    
    return images;
  } finally {
    const duration = performanceMonitor.end('getDocumentImages');
    console.log(`getDocumentImages took ${duration}ms`);
  }
}

function invalidateCache() {
  apiCache.clear();
}

// Render images list with virtual scrolling
async function refreshImagesList() {
  const imagesContainer = document.getElementById('images-list');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  try {
    loadingIndicator.style.display = 'block';
    
    const images = await getDocumentImages();
    
    // Update count display
    document.getElementById('image-count').textContent = images.length;
    
    if (images.length === 0) {
      imagesContainer.innerHTML = '<p>No images found in document</p>';
      return;
    }
    
    // Use DocumentFragment for batch DOM update
    const fragment = document.createDocumentFragment();
    
    // Create a subset for display if there are many images
    const displayLimit = 100;
    const displayImages = images.length > displayLimit 
      ? images.slice(0, displayLimit) 
      : images;
    
    displayImages.forEach((image, index) => {
      const item = document.createElement('div');
      item.className = 'image-item';
      item.dataset.id = image.id;
      
      item.innerHTML = `
        <div class="image-info">
          <span class="image-number">#${index + 1}</span>
          <span class="image-id">${image.id.substring(0, 8)}...</span>
        </div>
        <div class="image-actions">
          <label class="checkbox">
            <input type="checkbox" class="select-image" checked>
          </label>
        </div>
      `;
      
      fragment.appendChild(item);
    });
    
    // If there are more images than the display limit, add a message
    if (images.length > displayLimit) {
      const message = document.createElement('div');
      message.className = 'list-message';
      message.textContent = `Showing ${displayLimit} of ${images.length} images. Processing will include all images.`;
      fragment.appendChild(message);
    }
    
    // Replace the content with the fragment (single reflow)
    imagesContainer.innerHTML = '';
    imagesContainer.appendChild(fragment);
    
  } catch (error) {
    console.error('Error refreshing images list:', error);
    imagesContainer.innerHTML = '<p class="error">Failed to load images</p>';
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// Process images in batches
async function processAllImages() {
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const resultsContainer = document.getElementById('results-container');
  
  try {
    // Get batch size from input
    const batchSizeInput = document.getElementById('batch-size');
    const batchSize = parseInt(batchSizeInput.value, 10) || 10;
    
    // Get all images
    const images = await getDocumentImages();
    
    if (images.length === 0) {
      alert('No images to process');
      return;
    }
    
    // Show progress UI
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressText.textContent = 'Starting...';
    resultsContainer.innerHTML = '';
    
    // Process in batches
    let processed = 0;
    const results = [];
    
    // Performance tracking
    performanceMonitor.start('totalProcessing');
    
    for (let i = 0; i < images.length; i += batchSize) {
      // Get current batch
      const batch = images.slice(i, i + batchSize);
      
      // Process batch
      const batchResults = await performanceMonitor.monitor(
        'processBatch',
        () => processBatch(batch)
      );
      
      results.push(...batchResults);
      
      // Update progress
      processed += batch.length;
      const percentComplete = (processed / images.length) * 100;
      progressBar.style.width = `${percentComplete}%`;
      progressText.textContent = `Processed ${processed} of ${images.length} images`;
      
      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    const totalTime = performanceMonitor.end('totalProcessing');
    
    // Display results
    displayResults(results, totalTime);
    
  } catch (error) {
    console.error('Error processing images:', error);
    alert('An error occurred while processing images');
  } finally {
    // Show final state or hide progress
    progressText.textContent = 'Processing complete';
  }
}

async function processBatch(imageBatch) {
  // Simulate processing each image
  return await Promise.all(imageBatch.map(async (image) => {
    // Simulate processing time based on "complexity"
    const processingTime = 50 + Math.random() * 200;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    return {
      id: image.id,
      success: Math.random() > 0.1, // 90% success rate
      processingTime
    };
  }));
}

function displayResults(results, totalTime) {
  const resultsContainer = document.getElementById('results-container');
  const fragment = document.createDocumentFragment();
  
  const summary = document.createElement('div');
  summary.className = 'results-summary';
  
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  summary.innerHTML = `
    <h3>Processing Complete</h3>
    <p>Processed ${results.length} images in ${(totalTime / 1000).toFixed(2)} seconds</p>
    <p>
      <span class="success">${successful} successful</span> | 
      <span class="failed">${failed} failed</span>
    </p>
  `;
  
  fragment.appendChild(summary);
  
  // Show performance metrics
  const metrics = performanceMonitor.getSummary();
  const metricsEl = document.createElement('div');
  metricsEl.className = 'performance-metrics';
  metricsEl.innerHTML = `
    <h4>Performance Metrics</h4>
    <p>Average batch processing time: ${metrics.processBatch.avgTime.toFixed(2)}ms</p>
    <p>Batches processed: ${metrics.processBatch.count}</p>
  `;
  
  fragment.appendChild(metricsEl);
  
  // Reset for next run
  performanceMonitor.reset();
  
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(fragment);
}

function updateBatchSize(event) {
  const batchSize = parseInt(event.target.value, 10) || 10;
  document.getElementById('batch-size-display').textContent = batchSize;
}
```

## Key Takeaways for Performance Optimization

1. **Measure First**: Always profile and measure before optimizing
2. **Batch Operations**: Combine multiple operations when possible
3. **Minimize DOM Updates**: Use fragments and efficient rendering techniques
4. **Cache When Appropriate**: Cache API results and expensive calculations
5. **Handle Large Data Sets**: Process in chunks and use virtual scrolling for large lists
6. **Manage Memory**: Clean up resources and avoid memory leaks
7. **User Experience**: Use loading indicators and responsive UI techniques

## Additional Resources

For more information on performance optimization:

- [Performance Guide](../../develop/performance.md)
- [Frameworks, Libraries, and Bundling](../../develop/frameworks-libraries-bundling.md)
- [Web Performance MDN Guide](https://developer.mozilla.org/en-US/docs/Web/Performance)

## Knowledge Check

Before proceeding to the next step, make sure you can answer these questions:

1. How would you identify performance bottlenecks in an add-on?
2. What techniques can you use to optimize DOM updates?
3. How can you efficiently process large documents or data sets?
4. What are common sources of memory leaks in add-ons and how can you prevent them?
5. How would you implement caching for API calls?

## Next Steps

Now that you understand how to optimize performance in Adobe Express add-ons, you're ready to learn about implementing advanced UI patterns.

[Continue to Step 3: Advanced UI Patterns →](advanced-step3.md)

[← Back to Step 1: Advanced Add-on Architecture](advanced-step1.md) 