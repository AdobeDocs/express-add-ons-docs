---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Add-on UI SDK
  - Constants
  - Import patterns
  - Type safety
  - JavaScript
  - TypeScript
  - Named exports
  - SDK constants
  - UI constants
  - Modal dialogs
  - Document export
  - Platform detection
  - Event handling
title: Using Add-on UI SDK Constants
description: A practical guide to using constants in the Add-on UI SDK for type-safe development, 
  covering import patterns, common use cases, and best practices for iframe environment development.
contributors:
  - https://github.com/hollyschinsky
# LLM optimization metadata
canonical: true
ai_assistant_note: "This guide focuses specifically on Add-on UI SDK constants used in the iframe 
  environment. For document sandbox constants, refer to the Document Sandbox Constants guide. 
  Covers import patterns, dual access vs named-only exports, and practical usage examples."
semantic_tags:
  - ui-sdk-constants
  - iframe-environment
  - import-patterns
  - type-safety
  - practical-guide
---

# Using Add-on UI SDK Constants

Constants provide type-safe ways to interact with the Add-on UI SDK and help prevent runtime errors. This guide covers the most common patterns you'll need to get started quickly.

## Why Use Constants?

Constants equal their variable name as a string (e.g., `ButtonType.primary` equals `"primary"`), but using constants provides type safety, IDE autocomplete, and future-proofing against API changes.

<InlineAlert slots="text" variant="info"/>

For complete technical specifications of all constants, see the [Constants Reference](../../../references/addonsdk/addonsdk-constants.md).

## Quick Start

Most constants support two import patterns. Choose based on your needs:

```javascript
// Named imports (recommended for cleaner code)
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Constants object access (good for dynamic access)
const format = addOnUISdk.constants.RenditionFormat.png;
```

<InlineAlert slots="header,text1" variant="warning"/>

#### Important

Some constants (like `AppEvent`, `SupportedMimeTypes`) are **only available as named exports** and cannot be accessed through `addOnUISdk.constants.*`. See [Import Patterns](#import-patterns) below.

## Most Common Use Cases

### Document Export

The most common constants you'll use for exporting documents:

```javascript
import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Export current page as PNG
await addOnUISdk.app.document.createRenditions({
    range: Range.currentPage,
    format: RenditionFormat.png
});

// Export entire document as PDF for printing
await addOnUISdk.app.document.createRenditions({
    range: Range.entireDocument,
    format: RenditionFormat.pdf,
    intent: RenditionIntent.print
});
```

**Available Options:**

- `Range`: `currentPage`, `entireDocument`, `specificPages`
- `RenditionFormat`: `png`, `jpg`, `mp4`, `pdf`, `pptx`
- `RenditionIntent`: `export`, `preview`, `print`

### Modal Dialogs

Essential constants for user interactions:

```javascript
import addOnUISdk, { Variant, ButtonType } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Show confirmation dialog
const result = await addOnUISdk.app.showModalDialog({
    variant: Variant.confirmation,
    title: "Delete Item",
    description: "Are you sure?"
});

// Handle user response
if (result.buttonType === ButtonType.primary) {
    // User confirmed
} else if (result.buttonType === ButtonType.cancel) {
    // User cancelled
}
```

**Available Options:**

- `Variant`: `confirmation`, `information`, `warning`, `error`, `input`
- `ButtonType`: `primary`, `secondary`, `cancel`, `close`

### Event Handling

**Critical:** Event constants must be imported - they're not available in the constants object:

```javascript
import addOnUISdk, { AppEvent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// ✅ Correct - must import AppEvent
addOnUISdk.app.on(AppEvent.themechange, (event) => {
    updateUITheme(event.theme);
});

// ❌ This will NOT work
addOnUISdk.app.on(addOnUISdk.constants.AppEvent.themechange, handler); // undefined!
```

## Import Patterns

Understanding import patterns is crucial for avoiding runtime errors.

### Must Import (Named Exports Only)

These constants **must be imported** and are **not available** through `addOnUISdk.constants.*`:

```javascript
import addOnUISdk, { 
  AppEvent,              // ❌ NOT in constants object
  ColorPickerEvent,      // ❌ NOT in constants object  
  SupportedMimeTypes,    // ❌ NOT in constants object
  EntrypointType         // ❌ NOT in constants object
} from "https://express.adobe.com/static/add-on-sdk/sdk.js";
```

### Flexible Access (Both Ways Work)

These constants support **both patterns**:

```javascript
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Option 1: Named import (recommended)
const options = {
    range: Range.currentPage,
    format: RenditionFormat.png,
    variant: Variant.error
};

// Option 2: Constants object (good for dynamic access)
const userFormat = "png";
const format = addOnUISdk.constants.RenditionFormat[userFormat];
```

## Copy-Paste Import Statements

### Most Common Scenarios

```javascript
// Document Export & Rendering
import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Modal Dialogs & UI
import addOnUISdk, { Variant, ButtonType, FieldType } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Event Handling (Import Required!)
import addOnUISdk, { AppEvent, ColorPickerEvent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Platform Detection
import addOnUISdk, { PlatformType, DeviceClass, PlatformEnvironment } from "https://express.adobe.com/static/add-on-sdk/sdk.js";
```

## Common Errors & Solutions

### "Cannot read property of undefined"

**Problem**: Trying to access named-only exports through constants object.

```javascript
// ❌ This causes errors
const event = addOnUISdk.constants.AppEvent.themechange; // undefined!
```

**Solution**: Always import named-only exports.

```javascript
// ✅ This works
import addOnUISdk, { AppEvent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";
const event = AppEvent.themechange;
```

### Using String Literals Instead of Constants

**Problem**: Using fragile string literals.

```javascript
// ❌ Fragile - might break if API changes
await createRenditions({
    range: "currentPage",    // String literal
    format: "image/png"      // String literal  
});
```

**Solution**: Always use constants.

```javascript
// ✅ Safe - will be updated if API changes
await createRenditions({
    range: Range.currentPage,           // Constant
    format: RenditionFormat.png         // Constant
});
```

## Best Practices

1. **Use named imports for known constants** - cleaner and more reliable
2. **Use constants object for dynamic access** - when the constant name is determined at runtime
3. **Always import named-only exports** - there's no alternative way to access them
4. **Group related imports** - organize by functionality for better readability

## FAQs

#### Q: Why do some constants require imports while others don't?

**A:** Adobe Express SDK has two types of constants: dual-access (available both ways) and named-only exports (security/architecture reasons). Always check the [Import Patterns](#import-patterns) section.

#### Q: How do I know if a constant requires import?

**A:** Check the [Quick Reference Table](../../../references/addonsdk/addonsdk-constants.md#quick-reference-table) in the Constants Reference or use TypeScript for compile-time validation. When in doubt, use named imports - they work for all constants.

#### Q: What's the difference between `Range.currentPage` and `addOnUISdk.constants.Range.currentPage`?

**A:** Both work for dual-access constants like `Range`. Named imports (`Range.currentPage`) are recommended for cleaner code, while constants object access is useful for dynamic scenarios.

#### Q: Why does `addOnUISdk.constants.AppEvent` return undefined?

**A:** `AppEvent` is a named-only export and must be imported: `import addOnUISdk, { AppEvent } from "..."`. It's not available through the constants object.

#### Q: Can I use string literals instead of constants?

**A:** While possible, constants provide type safety, IDE autocomplete, and future-proofing. Always prefer constants over string literals like `"currentPage"`.

#### Q: What import should I use for document export?

**A:** Use `import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://express.adobe.com/static/add-on-sdk/sdk.js"` for most export scenarios.

#### Q: Do constants work the same in Document Sandbox?

**A:** No, Document Sandbox has different constants from `express-document-sdk`. See [Document Sandbox Constants](./document-sandbox-constants.md) for sandbox-specific constants.

## Next Steps

- **Complete Reference**: See [Constants Reference](../../../references/addonsdk/addonsdk-constants.md) for all available constants
- **Practical Guides**:
  - [Create Renditions](../how_to/create_renditions.md) - Using export constants
  - [Modal Dialogs](../how_to/modal_dialogs.md) - Using dialog constants  
  - [Theme & Locale](../how_to/theme_locale.md) - Using platform constants

<InlineAlert slots="header,text1" variant="success"/>

#### Pro Tip

When in doubt, use named imports - they work for all constants and provide the cleanest code!
