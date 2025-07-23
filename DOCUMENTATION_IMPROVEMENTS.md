# Adobe Express Add-ons Documentation Improvement Guide

**Current LLM-Readiness Score:** 0.24/1.00 (Poor)  
**Target Score:** 0.7+/1.00 (Good)

Based on the comprehensive audit, here are specific improvements needed across 204 documentation files.

## 📊 Current Issues Breakdown

- **167 files** lack clear UI vs Sandbox context (Context Clarity: 0.15/1.00)
- **182 files** lack error-first documentation (Error Coverage: 0.11/1.00)  
- **0 files** use Q&A format (Q&A Format: 0.0/1.00)
- **181 files** have LLM-readiness issues overall

## 🎯 Priority Fixes (Immediate Impact)

### 1. Add Context Headers to ALL Code Examples

**Rule:** Every code block must specify its execution context.

**Template for Document Sandbox code:**
```markdown
### Example: Creating a Rectangle

```js
// Document Sandbox (code.js)
import { editor } from "express-document-sdk";

async function createRectangle() {
  try {
    const rectangle = editor.createRectangle();
    rectangle.width = 200;
    rectangle.height = 100;
    
    const insertionParent = editor.context.insertionParent;
    if (!insertionParent) {
      throw new Error("No insertion parent available");
    }
    
    insertionParent.children.append(rectangle);
    console.log("Rectangle created successfully");
    
  } catch (error) {
    console.error("Failed to create rectangle:", error);
  }
}
```

**Template for UI Runtime code:**
```markdown
### Example: UI Button Handler

```js
// UI Runtime (index.js)
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  try {
    document.getElementById("createBtn").addEventListener("click", async () => {
      const result = await addOnUISdk.app.document.createRenditions({
        range: "currentPage",
        format: "image/png"
      });
      console.log("Rendition created:", result);
    });
  } catch (error) {
    console.error("UI setup failed:", error);
  }
});
```

### 2. Add Error-First Sections to Every Guide

**Template to add to each documentation file:**

```markdown
## Common Issues & Solutions

### ❌ Permission Errors
**Error:** "Permission denied accessing external API"  
**Cause:** Missing permissions in manifest.json  
**Solution:** Add required permissions:

```json
{
  "requiredPermissions": {
    "webAccess": {
      "allow": ["https://api.example.com/*"]
    },
    "iframeAccess": {
      "allow": ["https://trusted-domain.com"]
    }
  }
}
```

### ❌ Selection Errors  
**Error:** "Cannot read property of undefined"  
**Cause:** No element selected or wrong element type  
**Solution:** Always validate selection:

```js
// Document Sandbox (code.js)  
const selection = editor.context.selection;
if (selection.length === 0) {
  throw new Error("Please select an element first");
}

const element = selection[0];
if (element.type !== "ExpectedType") {
  throw new Error(`Expected ExpectedType, got ${element.type}`);
}
```

### ❌ Import Errors
**Error:** "Module not found"  
**Cause:** Incorrect import statement  
**Solution:** Use correct imports:
```js
// For Document Sandbox
import { editor } from "express-document-sdk";

// For UI Runtime  
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

### 3. Convert Content to Q&A Format

**Transform existing content using this pattern:**

**❌ Current documentation style:**
```markdown
## Text Styling
The applyCharacterStyles method allows you to modify text appearance...
```

**✅ Q&A Style (Better for LLM training):**
```markdown
## Text Styling

**Q: How do I change text color?**  
**A:** Use the `applyCharacterStyles()` method with a color object:

```js
// Document Sandbox (code.js)
import { editor } from "express-document-sdk";

const textNode = editor.context.selection[0];
textNode.fullContent.applyCharacterStyles({
  color: { red: 1, green: 0, blue: 0, alpha: 1 } // Red color
});
```

**Q: How do I change font family and size?**  
**A:** Include font and fontSize in the styles object:

```js
// Document Sandbox (code.js)
textNode.fullContent.applyCharacterStyles({
  font: { family: "Arial", style: "Bold" },
  fontSize: 24
});
```

**Q: What if no text is selected?**  
**A:** Always check selection first:
```js
if (editor.context.selection.length === 0) {
  console.error("Please select a text element first");
  return;
}
```
```

## 📝 File-Specific Improvements

### High-Priority Files (Fix These First)

Based on the audit, focus on these files with the lowest LLM-readiness scores:

1. **src/pages/guides/index.md** (Score: 0.13)
   - Add Q&A format: "What should I read first?" 
   - Add error section: "Common beginner mistakes"
   - Add context headers to any code references

2. **src/pages/references/index.md** (Score: 0.21) 
   - Convert to Q&A: "How do I find a specific API?"
   - Add troubleshooting: "API not working as expected"

3. **All tutorial files** in `src/pages/guides/learn/how_to/tutorials/`
   - Add "What can go wrong?" sections
   - Complete all code examples with error handling
   - Add Q&A format for each major concept

### Content to Add (Missing Documentation)

The audit identified these frequently-asked-about topics:

#### 1. Selection and Context Management
```markdown
# Working with currentSelection

## Q: How do I get the currently selected element?  
**A:** Use `editor.context.selection`:

```js
// Document Sandbox (code.js)
import { editor } from "express-document-sdk";

function getCurrentSelection() {
  const selection = editor.context.selection;
  
  if (selection.length === 0) {
    console.log("No elements selected");
    return null;
  }
  
  console.log(`Selected ${selection.length} elements`);
  return selection[0]; // First selected element
}
```

## Q: How do I work with multiple selected elements?
**A:** Loop through the selection array:

```js
// Document Sandbox (code.js)
function processAllSelected() {
  const selection = editor.context.selection;
  
  selection.forEach((element, index) => {
    console.log(`Element ${index}: ${element.type}`);
    // Process each element
  });
}
```
```

#### 2. Main JavaScript File Structure
```markdown
# Organizing Your Main JavaScript File

## Q: How should I structure my main add-on file?
**A:** Follow this template for Document Sandbox code:

```js
// Document Sandbox (code.js)
import { editor } from "express-document-sdk";

// Main application logic
class MyAddOn {
  constructor() {
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    // Set up document event listeners
    editor.on("documentChanged", this.handleDocumentChange.bind(this));
  }
  
  async handleDocumentChange() {
    try {
      // Your logic here
      console.log("Document changed");
    } catch (error) {
      console.error("Error handling document change:", error);
    }
  }
  
  async createContent() {
    try {
      // Content creation logic
      const element = editor.createRectangle();
      editor.context.insertionParent.children.append(element);
    } catch (error) {
      console.error("Failed to create content:", error);
      throw error; // Re-throw for UI to handle
    }
  }
}

// Initialize the add-on
const myAddOn = new MyAddOn();
```

## Q: How do I handle errors in my main file?
**A:** Use try-catch blocks and proper error logging:

```js
// Document Sandbox (code.js)
async function safeOperation() {
  try {
    // Your operation
    const result = await someAsyncOperation();
    return result;
  } catch (error) {
    console.error("Operation failed:", error);
    
    // Send error to UI if needed
    if (error.name === "PermissionError") {
      throw new Error("Please check your manifest permissions");
    }
    
    throw error;
  }
}
```
```

## 🔧 Implementation Strategy

### Week 1: Context Headers
- Add context headers to ALL code examples
- Focus on high-traffic files first: getting_started/, how_to/

### Week 2: Error Documentation  
- Add "Common Issues & Solutions" sections to all guides
- Focus on files with 0 error coverage score

### Week 3: Q&A Conversion
- Convert 20% of content to Q&A format
- Start with most-visited pages

### Week 4: Complete Examples
- Ensure all code examples are complete and runnable
- Add proper error handling to all examples

## 📊 Expected Impact

Implementing these changes should improve scores to:

- **Context Clarity:** 0.15 → 0.8+ (Add headers to all code)
- **Error Coverage:** 0.11 → 0.7+ (Add error sections)  
- **Q&A Format:** 0.0 → 0.6+ (Convert 60% of content)
- **Code Completeness:** 0.23 → 0.8+ (Complete all examples)

**Overall LLM-Readiness Score:** 0.24 → 0.75+ (Good)

## 🎯 Quick Wins This Week

1. **Add context headers** to these high-impact files:
   - `src/pages/guides/getting_started/hello-world.md`
   - `src/pages/guides/learn/how_to/use_text.md` 
   - `src/pages/guides/learn/how_to/use_images.md`

2. **Create missing documentation** for:
   - `currentSelection` usage patterns
   - Main JavaScript file structure
   - Common error scenarios

3. **Add error sections** to top 10 most-visited guides

This focused approach will provide immediate improvements to your LLM-readiness score while setting up a framework for continued improvement. 