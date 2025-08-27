# **Communication API Layer Overview**

The Communication API layer enables **bidirectional communication** between the Document Sandbox and UI runtime environments. Here's a comprehensive breakdown:

### **Core Communication APIs**

#### **Required Import**
```typescript
import addOnSandboxSdk, { RuntimeType } from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;
```

### **1. `runtime.exposeApi(apiObject)` - Expose Document Functions to UI**

**Purpose:** Makes Document Sandbox functions callable from the UI runtime

**Requirements:**
- **Called once** per add-on lifecycle
- **No special flags needed**
- **Synchronous operation**

**Usage Pattern:**
```typescript
// Document Sandbox (code.js) - Expose APIs TO the UI
const documentApis = {
    createRectangle: () => {
        const rect = editor.createRectangle();
        rect.width = 100;
        rect.height = 100;
        return "Rectangle created!";
    },
    
    processImageData: (imageBlob) => {
        // Process image in document context
        return editor.addImageFromBlob(imageBlob);
    },
    
    getDocumentInfo: () => {
        return {
            pageCount: editor.context.document.pages.length,
            selectedItems: editor.context.selection.length
        };
    }
};

// Expose the APIs (called once)
runtime.exposeApi(documentApis);
```

**Key Features:**
- **Object methods** become remotely callable
- **Class instances** can be exposed
- **Return values** are automatically serialized
- **Async methods** work transparently
- **Only one API object** per runtime (calling again is no-op)

### **2. `runtime.apiProxy(RuntimeType.panel)` - Access UI Functions from Document**

**Purpose:** Gets access to functions exposed by the UI runtime

**Requirements:**
- **Async operation** - requires `await`
- **Returns Promise-based proxy**
- **Must wait for UI runtime initialization**

**Usage Pattern:**
```typescript
// Document Sandbox (code.js) - Access APIs FROM the UI
async function useUIApis() {
    // Get UI API proxy (returns a Promise)
    const uiApi = await runtime.apiProxy(RuntimeType.panel);
    
    // Call UI functions
    await uiApi.showNotification("Document updated!");
    await uiApi.updateProgress(75);
    
    const userChoice = await uiApi.showConfirmDialog({
        title: "Confirm Action",
        message: "Apply changes to all pages?"
    });
    
    if (userChoice) {
        // Proceed with operation
    }
}
```

### **Runtime Types**

```typescript
export enum RuntimeType {
    panel = "panel",           // ✅ UI iframe runtime  
    documentSandbox = "documentSandbox", // ❌ Cannot proxy to self
    script = "script"          // ❌ Deprecated
}
```

**Restrictions:**
- **Cannot proxy to self**: `runtime.apiProxy(RuntimeType.documentSandbox)` throws error
- **Only `panel` is supported** for `apiProxy` calls from Document Sandbox

### **Communication Flow Examples**

#### **Example 1: UI Triggers Document Action**
```typescript
// UI Runtime (index.ts)
await documentApi.createRectangle(); // Calls function in Document Sandbox

// Document Sandbox (code.ts) 
function createRectangle() {
    const rect = editor.createRectangle();
    // Document manipulation happens here
    return "Success";
}
```

#### **Example 2: Document Notifies UI of Changes**
```typescript
// Document Sandbox (code.ts)
async function onSelectionChange() {
    const uiApi = await runtime.apiProxy(RuntimeType.panel);
    await uiApi.updateSelectionInfo({
        count: editor.context.selection.length,
        types: editor.context.selection.map(node => node.type)
    });
}

// UI Runtime (index.ts) 
function updateSelectionInfo(selectionData) {
    // Update UI display
    document.querySelector('#selection-count').textContent = selectionData.count;
}
```

### **Advanced Features**

#### **Supported Data Types**
- **Primitives**: `string`, `number`, `boolean`, `null`, `undefined`
- **Objects**: Plain objects with serializable properties
- **Arrays**: Including nested arrays
- **Promises**: Async functions work transparently
- **Blobs**: Binary data transfer

#### **Error Handling**
```typescript
try {
    const uiApi = await runtime.apiProxy(RuntimeType.panel);
    await uiApi.riskyOperation();
} catch (error) {
    console.error("UI operation failed:", error);
    // Error is automatically propagated across runtime boundary
}
```

#### **Class Instance Exposure**
```typescript
class DocumentController {
    createShape(type) { /* ... */ }
    deleteShape(id) { /* ... */ }
    getShapeInfo(id) { /* ... */ }
}

const controller = new DocumentController();
runtime.exposeApi(controller); // Entire class instance is exposed
```

### **Security & Performance Notes**

1. **Automatic Serialization**: Data is automatically serialized/deserialized across runtime boundaries
2. **Type Validation**: Built-in validation prevents unsafe data transfer
3. **Promise-Based**: All cross-runtime calls are asynchronous for performance
4. **Single API Object**: Only one API object can be exposed per runtime (prevents conflicts)
5. **Error Propagation**: Errors are automatically marshaled across runtime boundaries

### **Typical Communication Pattern**

```typescript
// Document Sandbox Setup
const documentApis = {
    // Functions UI can call
    performDocumentOperation: async (params) => { /* ... */ }
};
runtime.exposeApi(documentApis);

// Get UI API access
const uiApi = await runtime.apiProxy(RuntimeType.panel);

// Document can now:
// 1. Receive calls from UI via exposed APIs
// 2. Make calls to UI via proxy APIs
```

This creates a **bidirectional communication channel** where both runtimes can call each other's functions seamlessly.
