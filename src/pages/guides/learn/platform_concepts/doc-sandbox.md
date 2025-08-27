# Document Sandbox: The Full Picture

The Document Sandbox includes **three main components**:

## 1. **Document APIs**

- **Scenegraph manipulation**: `RectangleNode`, `TextNode`, `PageNode`, etc.
- **Editor operations**: `editor.createRectangle()`, `editor.queueAsyncEdit()`
- **Document structure**: Direct access to document elements and properties

## 2. **Communication API Layer**

- **`runtime.exposeApi()`**: Expose functions from Document Sandbox to UI iframe
- **`runtime.apiProxy()`**: Get proxy to call functions in UI iframe
- **Bidirectional communication**: Document Sandbox ↔ UI iframe communication

## 3. **Global Browser API Access** (Limited Subset)

- **Console**: `console.log()`, `console.error()`, etc.
- **Blob API**: `new Blob()`, `blob.arrayBuffer()`, `blob.text()`
- **Basic JavaScript globals**: But **not** full DOM access

### **Example: Full Document Sandbox Usage**

```typescript
// Document Sandbox code (runs in QuickJS/isolated environment)
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, constants } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

// 1. DOCUMENT APIs - Direct scenegraph manipulation
function createLayout() {
    const rect = editor.createRectangle();
    rect.width = 100;
    rect.height = 50;
    editor.context.insertionParent.children.append(rect);
}

// 2. COMMUNICATION APIs - Expose functions to UI iframe
const sandboxApi = {
    createLayout,
    addCustomText: (text: string) => {
        const textNode = editor.createText(text);
        editor.context.insertionParent.children.append(textNode);
    }
};

runtime.exposeApi(sandboxApi);

// Get proxy to call UI iframe functions
const uiProxy = await runtime.apiProxy(RuntimeType.panel);
uiProxy.updateStatus("Layout created!");

// 3. GLOBAL BROWSER APIs - Limited subset available
console.log("Document sandbox initialized");
const data = new Blob(["Hello"], { type: "text/plain" });
const text = await data.text();
```

### **Architecture: Two Runtime Communication**

```
┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
│           UI iframe                 │    │        Document Sandbox             │
│        (addOnUISdk)                 │    │     (Document Sandbox SDK)          │
├─────────────────────────────────────┤    ├─────────────────────────────────────┤
│ • DOM access                        │    │ • Document APIs (editor, nodes)     │
│ • Full browser APIs                 │◄──►│ • Limited browser APIs (console,    │
│ • Event handling                    │    │   Blob)                             │
│ • UI interactions                   │    │ • Communication APIs (runtime)      │
│ • addOnUISdk.app.document.addImage()│    │ • Direct scenegraph manipulation    │
└─────────────────────────────────────┘    └─────────────────────────────────────┘
          │                                              │
          │         runtime.apiProxy()                   │
          │         runtime.exposeApi()                  │
          └──────────────────────────────────────────────┘
                    Communication Layer
```
