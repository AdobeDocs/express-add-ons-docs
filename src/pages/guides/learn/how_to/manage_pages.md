---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Document API
  - Page
  - Pages
  - editor.documentRoot.pages.addPage
  - PageNode
  - PageList
  - Artboard
  - ArtboardNode
  - Document
  - Navigation
  - Context
  - currentPage
  - documentRoot
title: Manage Pages
description: Learn how to create, navigate, and manage pages in Adobe Express documents.
contributors:
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I add a page programmatically?"
      answer: "Use `editor.documentRoot.pages.addPage()` method with page dimensions. There is no `createPage()` method."

    - question: "Why doesn't createPage() work?"
      answer: "The Document API uses `editor.documentRoot.pages.addPage()` for pages, not `createPage()`. Use `editor.documentRoot.pages.addPage(dimensions)` instead."

    - question: "How do I get the current page?"
      answer: "Use `editor.context.currentPage` to access the currently active page."

    - question: "How do I navigate between pages?"
      answer: "Adding a page automatically switches to it. You can also access pages via `editor.documentRoot.pages`."

    - question: "What happens when I add a page?"
      answer: "A new page with a default artboard is created and automatically becomes the active page and insertion parent."

    - question: "Can I remove pages?"
      answer: "Currently, the Document API doesn't provide a direct method to remove pages programmatically."

    - question: "How do I access all pages in a document?"
      answer: "Use `editor.documentRoot.pages` to access the PageList containing all pages."

    - question: "What are the minimum requirements for a page?"
      answer: "Every page must have at least one artboard. The `editor.documentRoot.pages.addPage()` method automatically creates a default artboard."
---

# Manage Pages

Learn how to programmatically create, access, and manage pages in Adobe Express documents using the Document API.

## Understanding Pages in Adobe Express

In Adobe Express, documents are organized hierarchically:

- **Document** (root)
  - **Pages** (timeline sequence)
    - **Artboards** (scenes within a page)
      - **Content** (text, shapes, media, etc.)

Every page contains at least one artboard, and all artboards within a page share the same dimensions.

## Add a Page

Use the [`editor.documentRoot.pages.addPage()`](../../../references/document-sandbox/document-apis/classes/PageList.md#addpage) method to create a new page with specified dimensions.

### Example: Add a Standard Page

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Define page dimensions (width x height in pixels)
const pageGeometry = {
  width: 1080,
  height: 1080
};

// Add a new page with the specified dimensions
const newPage = editor.documentRoot.pages.addPage(pageGeometry);

console.log("New page created:", newPage);
console.log("Page dimensions:", newPage.width, "x", newPage.height);
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode, RectangleGeometry } from "express-document-sdk";

// Define page dimensions (width x height in pixels)
const pageGeometry: RectangleGeometry = {
  width: 1080,
  height: 1080
};

// Add a new page with the specified dimensions
const newPage: PageNode = editor.documentRoot.pages.addPage(pageGeometry);

console.log("New page created:", newPage);
console.log("Page dimensions:", newPage.width, "x", newPage.height);
```

<InlineAlert slots="text" variant="info"/>

When you call `editor.documentRoot.pages.addPage()`, the new page automatically becomes the active page and the default insertion point for new content. The viewport also switches to display the new page's artboard.

### Example: Add Pages with Different Dimensions

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Add an Instagram post page (square)
const instagramPage = editor.documentRoot.pages.addPage({
  width: 1080,
  height: 1080
});

// Add a story page (vertical)
const storyPage = editor.documentRoot.pages.addPage({
  width: 1080,
  height: 1920
});

// Add a landscape page
const landscapePage = editor.documentRoot.pages.addPage({
  width: 1920,
  height: 1080
});

console.log("Created 3 pages with different dimensions");
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode, RectangleGeometry } from "express-document-sdk";

// Add an Instagram post page (square)
const instagramPage: PageNode = editor.documentRoot.pages.addPage({
  width: 1080,
  height: 1080
} as RectangleGeometry);

// Add a story page (vertical)
const storyPage: PageNode = editor.documentRoot.pages.addPage({
  width: 1080,
  height: 1920
} as RectangleGeometry);

// Add a landscape page
const landscapePage: PageNode = editor.documentRoot.pages.addPage({
  width: 1920,
  height: 1080
} as RectangleGeometry);

console.log("Created 3 pages with different dimensions");
```

## Access Pages

### Get the Current Page

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Get the currently active page
const currentPage = editor.context.currentPage;

console.log("Current page dimensions:", currentPage.width, "x", currentPage.height);
console.log("Number of artboards:", currentPage.artboards.length);
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode } from "express-document-sdk";

// Get the currently active page
const currentPage: PageNode = editor.context.currentPage;

console.log("Current page dimensions:", currentPage.width, "x", currentPage.height);
console.log("Number of artboards:", currentPage.artboards.length);
```

### Access All Pages

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Get all pages in the document
const allPages = editor.documentRoot.pages;

console.log("Total pages in document:", allPages.length);

// Iterate through all pages
for (const page of allPages) {
  console.log(`Page dimensions: ${page.width} x ${page.height}`);
  console.log(`Artboards in this page: ${page.artboards.length}`);
}

// Access specific pages by index
const firstPage = allPages[0];
const lastPage = allPages[allPages.length - 1];
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageList, PageNode } from "express-document-sdk";

// Get all pages in the document
const allPages: PageList = editor.documentRoot.pages;

console.log("Total pages in document:", allPages.length);

// Iterate through all pages
for (const page of allPages) {
  console.log(`Page dimensions: ${page.width} x ${page.height}`);
  console.log(`Artboards in this page: ${page.artboards.length}`);
}

// Access specific pages by index
const firstPage: PageNode = allPages[0];
const lastPage: PageNode = allPages[allPages.length - 1];
```

## Working with Page Content

### Add Content to a Specific Page

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create a new page
const newPage = editor.documentRoot.pages.addPage({
  width: 1080,
  height: 1080
});

// The new page is automatically active, so content will be added to it
const textNode = editor.createText("Content on the new page!");
textNode.translation = { x: 100, y: 100 };

// Add to the current insertion parent (the new page's artboard)
editor.context.insertionParent.children.append(textNode);

console.log("Added text to the new page");
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode, StandaloneTextNode, ContainerNode } from "express-document-sdk";

// Create a new page
const newPage: PageNode = editor.documentRoot.pages.addPage({
  width: 1080,
  height: 1080
});

// The new page is automatically active, so content will be added to it
const textNode: StandaloneTextNode = editor.createText("Content on the new page!");
textNode.translation = { x: 100, y: 100 };

// Add to the current insertion parent (the new page's artboard)
const insertionParent: ContainerNode = editor.context.insertionParent;
insertionParent.children.append(textNode);

console.log("Added text to the new page");
```

### Work with Page Artboards

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Get the current page
const currentPage = editor.context.currentPage;

// Access the page's artboards
const artboards = currentPage.artboards;
console.log("Number of artboards:", artboards.length);

// Get the first (and typically only) artboard
const firstArtboard = artboards.first;
console.log("First artboard dimensions:", firstArtboard.width, "x", firstArtboard.height);

// Add content directly to a specific artboard
const rect = editor.createRectangle();
rect.width = 200;
rect.height = 200;
rect.translation = { x: 50, y: 50 };

firstArtboard.children.append(rect);
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode, ArtboardList, ArtboardNode, RectangleNode } from "express-document-sdk";

// Get the current page
const currentPage: PageNode = editor.context.currentPage;

// Access the page's artboards
const artboards: ArtboardList = currentPage.artboards;
console.log("Number of artboards:", artboards.length);

// Get the first (and typically only) artboard
const firstArtboard: ArtboardNode = artboards.first!;
console.log("First artboard dimensions:", firstArtboard.width, "x", firstArtboard.height);

// Add content directly to a specific artboard
const rect: RectangleNode = editor.createRectangle();
rect.width = 200;
rect.height = 200;
rect.translation = { x: 50, y: 50 };

firstArtboard.children.append(rect);
```

## Common Patterns and Best Practices

### Page Creation Workflow

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

function createTemplatePages() {
  // Define common page sizes
  const pageSizes = {
    instagram: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    landscape: { width: 1920, height: 1080 },
    a4: { width: 595, height: 842 }
  };

  // Create pages for each template
  const pages = {};
  
  for (const [name, dimensions] of Object.entries(pageSizes)) {
    const page = editor.documentRoot.pages.addPage(dimensions);
    pages[name] = page;
    
    // Add a title to each page
    const title = editor.createText(`${name.toUpperCase()} Template`);
    title.translation = { x: 50, y: 50 };
    editor.context.insertionParent.children.append(title);
    
    console.log(`Created ${name} page: ${dimensions.width}x${dimensions.height}`);
  }

  return pages;
}

// Create template pages
const templatePages = createTemplatePages();
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode, RectangleGeometry, StandaloneTextNode } from "express-document-sdk";

interface PageSizes {
  [key: string]: RectangleGeometry;
}

function createTemplatePages(): { [key: string]: PageNode } {
  // Define common page sizes
  const pageSizes: PageSizes = {
    instagram: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    landscape: { width: 1920, height: 1080 },
    a4: { width: 595, height: 842 }
  };

  // Create pages for each template
  const pages: { [key: string]: PageNode } = {};
  
  for (const [name, dimensions] of Object.entries(pageSizes)) {
    const page: PageNode = editor.documentRoot.pages.addPage(dimensions);
    pages[name] = page;
    
    // Add a title to each page
    const title: StandaloneTextNode = editor.createText(`${name.toUpperCase()} Template`);
    title.translation = { x: 50, y: 50 };
    editor.context.insertionParent.children.append(title);
    
    console.log(`Created ${name} page: ${dimensions.width}x${dimensions.height}`);
  }

  return pages;
}

// Create template pages
const templatePages = createTemplatePages();
```

### Check Page Properties

For detailed page information including content analysis and print readiness, see the [Page Metadata Ho-to Guide](page_metadata.md).

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

function analyzeDocument() {
  const pages = editor.documentRoot.pages;
  
  console.log("=== Document Analysis ===");
  console.log(`Total pages: ${pages.length}`);
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    console.log(`\nPage ${i + 1}:`);
    console.log(`  Dimensions: ${page.width} x ${page.height}`);
    console.log(`  Artboards: ${page.artboards.length}`);
    
    // Count content in each artboard
    for (let j = 0; j < page.artboards.length; j++) {
      const artboard = page.artboards[j];
      console.log(`  Artboard ${j + 1}: ${artboard.children.length} items`);
    }
  }
}

// Analyze the current document
analyzeDocument();
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageList, PageNode, ArtboardNode } from "express-document-sdk";

function analyzeDocument(): void {
  const pages: PageList = editor.documentRoot.pages;
  
  console.log("=== Document Analysis ===");
  console.log(`Total pages: ${pages.length}`);
  
  for (let i = 0; i < pages.length; i++) {
    const page: PageNode = pages[i];
    console.log(`\nPage ${i + 1}:`);
    console.log(`  Dimensions: ${page.width} x ${page.height}`);
    console.log(`  Artboards: ${page.artboards.length}`);
    
    // Count content in each artboard
    for (let j = 0; j < page.artboards.length; j++) {
      const artboard: ArtboardNode = page.artboards[j];
      console.log(`  Artboard ${j + 1}: ${artboard.children.length} items`);
    }
  }
}

// Analyze the current document
analyzeDocument();
```

## Key Concepts

### Pages vs Artboards

- **Pages**: Top-level containers in the document timeline
- **Artboards**: "Scenes" within a page containing the actual content
- All artboards within a page share the same dimensions
- When you add a page, it automatically gets one default artboard

### Insertion Context

- Adding a page automatically makes it the active page
- `editor.context.insertionParent` points to the active artboard
- New content is added to the current insertion parent
- The viewport switches to display the new page

### Common Pitfalls

When working with pages, avoid these common mistakes:

<InlineAlert slots="header, text1, text2" variant="warning"/>

Critical: Use the correct method path

The Adobe Express Document API requires the full method path to create pages:

- ❌ `editor.addPage()` (doesn't exist)  
- ❌ `editor.createPage()` (doesn't exist)
- ✅ `editor.documentRoot.pages.addPage()` (correct)

1. **Don't assume API consistency** - Unlike other creation methods (like `editor.createRectangle()`), pages require the full path through the document structure.
2. **Provide page dimensions** - The `addPage()` method requires a geometry parameter with width and height.
3. **Expect automatic navigation** - Adding a page automatically switches to it and updates the viewport.
4. **Remember shared dimensions** - All artboards within a page must have the same dimensions.

## Integration with Other APIs

### Using with Metadata APIs

Pages created with `editor.documentRoot.pages.addPage()` can be used with other Document APIs, particularly for retrieving metadata. See the [Page Metadata How-to Guide](page_metadata.md) for complete examples.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Add a page and get its metadata
const newPage = editor.documentRoot.pages.addPage({ width: 1080, height: 1080 });

// Get the page ID for use with Add-on UI SDK metadata APIs
console.log("New page ID:", newPage.id);

// You can use this ID with the Add-on UI SDK to get detailed metadata
// See the Page Metadata guide for complete examples:
// const pageMetadata = await addOnUISdk.app.document.getPagesMetadata({
//   pageIds: [newPage.id]
// });
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, PageNode } from "express-document-sdk";

// Add a page and get its metadata
const newPage: PageNode = editor.documentRoot.pages.addPage({ width: 1080, height: 1080 });

// Get the page ID for use with Add-on UI SDK metadata APIs
console.log("New page ID:", newPage.id);

// You can use this ID with the Add-on UI SDK to get detailed metadata
// See the Page Metadata guide for complete examples:
// const pageMetadata = await addOnUISdk.app.document.getPagesMetadata({
//   pageIds: [newPage.id]
// });
```

## FAQs

#### Q: How do I add a page programmatically?

**A:** Use `editor.documentRoot.pages.addPage(dimensions)` with page dimensions. There is no `createPage()` method.

#### Q: Why doesn't createPage() work?

**A:** The Document API uses `editor.documentRoot.pages.addPage()` for pages, not `createPage()`. Use `editor.documentRoot.pages.addPage(dimensions)` instead.

#### Q: How do I get the current page?

**A:** Use `editor.context.currentPage` to access the currently active page.

#### Q: How do I navigate between pages?

**A:** Adding a page automatically switches to it. You can also access pages via `editor.documentRoot.pages`.

#### Q: What happens when I add a page?

**A:** A new page with a default artboard is created and automatically becomes the active page and insertion parent.

#### Q: Can I remove pages?

**A:** Currently, the Document API doesn't provide a direct method to remove pages programmatically.

#### Q: How do I access all pages in a document?

**A:** Use `editor.documentRoot.pages` to access the PageList containing all pages.

#### Q: What are the minimum requirements for a page?

**A:** Every page must have at least one artboard. The `editor.documentRoot.pages.addPage()` method automatically creates a default artboard.

## Related Topics

### Page Information and Metadata

- **[Page Metadata](page_metadata.md)** - Get detailed information about pages, including dimensions, content types, and selected page IDs
- **[Document Metadata](document_metadata.md)** - Access document-level information and listen for document events
- **[getSelectedPageIds() API](../../../references/addonsdk/app-document.md#getselectedpageids)** - Retrieve IDs of currently selected pages (experimental)

### Working with Page Content

- **[Position Elements](position_elements.md)** - Position and arrange content within pages and artboards
- **[Group Elements](group_elements.md)** - Organize page content using groups
- **[Use Geometry](use_geometry.md)** - Create shapes and geometric elements for your pages
- **[Use Text](use_text.md)** - Add and style text content on pages
- **[Use Images](use_images.md)** - Import and work with images on pages

### Document Structure and Context

- **[Document API Concepts](../platform_concepts/document-api.md)** - Understanding the Adobe Express Document Object Model
- **[Context API Reference](../../../references/document-sandbox/document-apis/classes/Context.md)** - Current page, selection, and insertion context
- **[PageNode API Reference](../../../references/document-sandbox/document-apis/classes/PageNode.md)** - Detailed page node documentation
- **[PageList API Reference](../../../references/document-sandbox/document-apis/classes/PageList.md)** - Page list management methods

### Advanced Topics

- **[Create Renditions](create_renditions.md)** - Export specific pages or entire documents as images, PDFs, or videos
- **[Page Metadata](page_metadata.md)** - Retrieve detailed page information including dimensions, content analysis, and print readiness
