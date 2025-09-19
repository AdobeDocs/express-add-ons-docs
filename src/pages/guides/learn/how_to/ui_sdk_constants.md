# Using Add-on UI SDK Constants

This guide shows you how to effectively use constants in your Adobe Express add-ons. Constants provide type-safe ways to interact with the Add-on UI SDK and help prevent runtime errors.

For complete technical specifications of all constants, see the [Constants Reference](../../../references/addonsdk/addonsdk-constants.md).

<InlineAlert slots="text" variant="warning"/>

**Quick Import Guide:** Some constants require explicit imports, others don't. Check the [Import Quick Reference](#import-quick-reference) below or use the [Constants Cheat Sheet](#constants-cheat-sheet) to avoid runtime errors.

<InlineAlert slots="text" variant="info"/>

**Why Use Constants?** Constants are equal to their variable name as a string value (e.g., `ButtonType.primary` equals `"primary"`), but using constants provides type safety, IDE autocomplete, and future-proofing against API changes.

## Quick Start

Most constants support two import patterns. Choose based on your needs:

```javascript
// Named imports (recommended for cleaner code)
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Constants object access (good for dynamic access)
const format = addOnUISdk.constants.RenditionFormat.png;
```

<InlineAlert slots="text" variant="warning"/>

**Important:** Some constants (like `AppEvent`, `SupportedMimeTypes`) are **only available as named exports** and cannot be accessed through `addOnUISdk.constants.*`. See [Import Patterns](#import-patterns) below.

## Constants Cheat Sheet

This quick reference shows you exactly how to import and use each constant type. Copy the import statements you need:

### Most Common Constants (Copy & Paste Ready)

```javascript
// For document export/rendering
import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Usage examples:
const options = {
  range: Range.currentPage,           // or: addOnUISdk.constants.Range.currentPage
  format: RenditionFormat.png,        // or: addOnUISdk.constants.RenditionFormat.png
  intent: RenditionIntent.export      // or: addOnUISdk.constants.RenditionIntent.export
};
```

```javascript
// For modal dialogs
import addOnUISdk, { Variant, ButtonType, FieldType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Usage examples:
const dialogOptions = {
  variant: Variant.confirmation,      // or: addOnUISdk.constants.Variant.confirmation
  // ... handle result.buttonType === ButtonType.primary
};
```

```javascript
// For events (MUST import - not available in constants object)
import addOnUISdk, { AppEvent, ColorPickerEvent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Usage examples:
addOnUISdk.app.on(AppEvent.themechange, handler);
picker.addEventListener(ColorPickerEvent.colorChange, handler);
// ❌ addOnUISdk.constants.AppEvent.themechange  <- This will NOT work!
```

```javascript
// For platform detection
import addOnUISdk, { PlatformType, DeviceClass, PlatformEnvironment } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Usage examples:
if (platform.platformType === PlatformType.iOS) { /* iOS code */ }
if (platform.deviceClass === DeviceClass.mobile) { /* mobile UI */ }
```

### Import Required (Cannot Use Constants Object)

These constants **must be imported** - they're not available through `addOnUISdk.constants.*`:

| Constant | Import | Won't Work |
|----------|---------|---------------|
| `AppEvent` | `import { AppEvent }` | `addOnUISdk.constants.AppEvent` |
| `ColorPickerEvent` | `import { ColorPickerEvent }` | `addOnUISdk.constants.ColorPickerEvent` |
| `SupportedMimeTypes` | `import { SupportedMimeTypes }` | `addOnUISdk.constants.SupportedMimeTypes` |
| `EntrypointType` | `import { EntrypointType }` | `addOnUISdk.constants.EntrypointType` |
| `PdfReturnUrlType` | `import { PdfReturnUrlType }` | `addOnUISdk.constants.PdfReturnUrlType` |

### Flexible Access (Both Ways Work)

These constants can be used with **either** import pattern:

| Constant | Named Import | Constants Object |
|----------|--------------|------------------|
| `Range` | `Range.currentPage` | `addOnUISdk.constants.Range.currentPage` |
| `RenditionFormat` | `RenditionFormat.png` | `addOnUISdk.constants.RenditionFormat.png` |
| `Variant` | `Variant.confirmation` | `addOnUISdk.constants.Variant.confirmation` |
| `ButtonType` | `ButtonType.primary` | `addOnUISdk.constants.ButtonType.primary` |
| `PlatformType` | `PlatformType.iOS` | `addOnUISdk.constants.PlatformType.iOS` |
| `EditorPanel` | `EditorPanel.media` | `addOnUISdk.constants.EditorPanel.media` |

*Complete list in [Import Patterns](#import-patterns) section.*

## Common Use Cases by Category

### Dialog & UI Interactions

Use these constants when creating modal dialogs and handling user interactions:

```javascript
import addOnUISdk, { Variant, ButtonType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Show different dialog types
await addOnUISdk.app.showModalDialog({
    variant: Variant.error,           // Error dialog
    title: "Upload Failed",
    description: "File size exceeds limit"
});

await addOnUISdk.app.showModalDialog({
    variant: Variant.confirmation,    // Confirmation dialog
    title: "Delete Item",
    description: "Are you sure?"
});

// Handle dialog responses
const result = await addOnUISdk.app.showModalDialog({...});
if (result.buttonType === ButtonType.primary) {
    // User clicked primary button
} else if (result.buttonType === ButtonType.cancel) {
    // User cancelled
}
```

**Available Dialog Constants:**

- `Variant`: `confirmation`, `information`, `warning`, `destructive`, `error`, `input`, `custom`
- `ButtonType`: `primary`, `secondary`, `cancel`, `close`
- `FieldType`: `text` (for input dialogs)

### Document Export & Rendering

Use these constants when creating renditions (exports) of documents:

```javascript
import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

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

// Export specific pages as JPG
await addOnUISdk.app.document.createRenditions({
    range: Range.specificPages,
    pageIds: ["page1", "page3"],
    format: RenditionFormat.jpg
});
```

**Available Export Constants:**

- `Range`: `currentPage`, `entireDocument`, `specificPages`
- `RenditionFormat`: `png`, `jpg`, `mp4`, `pdf`, `pptx`
- `RenditionIntent`: `export`, `preview`, `print`

### Platform Detection

Use these constants to create responsive add-ons that work across different platforms:

```javascript
import addOnUISdk, { PlatformType, DeviceClass, PlatformEnvironment } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const platform = await addOnUISdk.app.getCurrentPlatform();

// Platform-specific behavior
if (platform.platformType === PlatformType.iOS || platform.platformType === PlatformType.iPadOS) {
    // iOS/iPadOS specific handling
    showTouchOptimizedUI();
} else if (platform.platformType === PlatformType.chromeBrowser) {
    // Chrome browser specific handling
    enableKeyboardShortcuts();
}

// Device class responsive design
if (platform.deviceClass === DeviceClass.mobile) {
    showMobileLayout();
} else if (platform.deviceClass === DeviceClass.desktop) {
    showDesktopLayout();
}

// Environment-specific features
if (platform.environment === PlatformEnvironment.app) {
    // Native app features available
    enableAdvancedFeatures();
} else {
    // Web browser limitations
    showWebFallback();
}
```

**Available Platform Constants:**

- `PlatformType`: `iOS`, `iPadOS`, `android`, `chromeBrowser`, `firefoxBrowser`, etc.
- `DeviceClass`: `mobile`, `tablet`, `desktop`
- `PlatformEnvironment`: `app`, `web`

### Editor Panel Navigation

Use these constants to programmatically navigate Express editor panels:

```javascript
import addOnUISdk, { EditorPanel, MediaTabs, ElementsTabs } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Open specific editor panels
addOnUISdk.app.ui.openEditorPanel(EditorPanel.media);
addOnUISdk.app.ui.openEditorPanel(EditorPanel.elements);
addOnUISdk.app.ui.openEditorPanel(EditorPanel.text);

// Navigate to specific tabs within panels
addOnUISdk.app.ui.openEditorPanel(EditorPanel.media, {
    tab: MediaTabs.photos
});

addOnUISdk.app.ui.openEditorPanel(EditorPanel.elements, {
    tab: ElementsTabs.shapes
});
```

**Available Navigation Constants:**

- `EditorPanel`: `search`, `yourStuff`, `templates`, `media`, `text`, `elements`, `grids`, `brands`, `addOns`
- `MediaTabs`: `video`, `audio`, `photos`
- `ElementsTabs`: `designAssets`, `backgrounds`, `shapes`, `stockIcons`, `charts`

### Event Handling

Use these constants when listening to SDK events:

```javascript
import addOnUISdk, { AppEvent, ColorPickerEvent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Listen to app events (named export only!)
addOnUISdk.app.on(AppEvent.themechange, (event) => {
    updateUITheme(event.theme);
});

addOnUISdk.app.on(AppEvent.documentTitleChange, (event) => {
    console.log("Document title changed to:", event.title);
});

// Color picker events (named export only!)
colorPickerElement.addEventListener(ColorPickerEvent.colorChange, (event) => {
    applyColor(event.color);
});
```

<InlineAlert slots="text" variant="warning"/>

**Event constants are named-export only** - they cannot be accessed through `addOnUISdk.constants.*`.

## Import Patterns

Understanding import patterns is crucial for avoiding runtime errors.

### Named Exports (Import Required)

These constants **must be imported** and are **not available** through `addOnUISdk.constants.*`:

```javascript
import addOnUISdk, { 
  AppEvent,              // ❌ NOT in constants object
  ColorPickerEvent,      // ❌ NOT in constants object  
  SupportedMimeTypes,    // ❌ NOT in constants object
  EntrypointType,        // ❌ NOT in constants object
  PdfReturnUrlType       // ❌ NOT in constants object
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// ✅ Correct usage
const docxType = SupportedMimeTypes.docx;
const colorEvent = ColorPickerEvent.colorChange;

// ❌ Will NOT work - returns undefined
const docxType = addOnUISdk.constants.SupportedMimeTypes.docx; // undefined!
```

### Dual Access Constants

These constants support **both patterns** - choose what works best for your code:

```javascript
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Option 1: Named imports (cleaner, recommended)
const options = {
    range: Range.currentPage,
    format: RenditionFormat.png,
    variant: Variant.error
};

// Option 2: Constants object (good for dynamic access)
const userFormat = "png";
const format = addOnUISdk.constants.RenditionFormat[userFormat];
const range = addOnUISdk.constants.Range.currentPage;
```

**All Dual Access Constants:**
`Range`, `RenditionFormat`, `RenditionType`, `RenditionIntent`, `Variant`, `DialogResultType`, `ButtonType`, `RuntimeType`, `BleedUnit`, `EditorPanel`, `MediaTabs`, `ElementsTabs`, `PanelActionType`, `ColorPickerPlacement`, `AuthorizationStatus`, `FieldType`, `PlatformEnvironment`, `DeviceClass`, `PlatformType`, `MediaType`, `VideoResolution`, `FrameRate`, `BitRate`, `FileSizeLimitUnit`, `LinkOptions`

## Best Practices

### 1. Use Named Imports for Known Constants

When you know which constants you need, use named imports for cleaner code:

```javascript
// ✅ Good - clear and concise
import addOnUISdk, { Range, RenditionFormat } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const options = {
    range: Range.currentPage,
    format: RenditionFormat.png
};
```

### 2. Use Constants Object for Dynamic Access

When the constant name is determined at runtime:

```javascript
// ✅ Good - dynamic constant access
const userSelectedFormat = getUserSelection(); // "png", "jpg", etc.
const format = addOnUISdk.constants.RenditionFormat[userSelectedFormat];
```

### 3. Always Import Named-Only Exports

There's no alternative way to access these:

```javascript
// ✅ Required - no other way to access these
import addOnUISdk, { AppEvent, SupportedMimeTypes } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

### 4. Group Related Imports

Organize imports by functionality:

```javascript
import addOnUISdk, { 
    // Dialog constants
    Variant, ButtonType, FieldType,
    // Export constants  
    Range, RenditionFormat, RenditionIntent,
    // Platform constants
    PlatformType, DeviceClass,
    // Event constants (named-only)
    AppEvent, ColorPickerEvent
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

## Troubleshooting

<InlineAlert slots="text" variant="error"/>

**Most Common Error:** `Cannot read property 'X' of undefined` - This happens when you try to access import-required constants through the constants object.

### "Cannot read property of undefined" Errors

**Problem**: Trying to access named-only exports through constants object.

```javascript
// ❌ This causes errors
const event = addOnUISdk.constants.AppEvent.themechange; // undefined!
const mimeType = addOnUISdk.constants.SupportedMimeTypes.docx; // undefined!
```

**Solution**: Always import named-only exports.

```javascript
// ✅ This works
import addOnUISdk, { AppEvent, SupportedMimeTypes } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
const event = AppEvent.themechange;
const mimeType = SupportedMimeTypes.docx;
```

### TypeScript Type Errors

**Problem**: TypeScript doesn't recognize constant values.

**Solution**: Use proper imports for type checking:

```typescript
import addOnUISdk, { Range, RenditionFormat } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// ✅ TypeScript knows these types
const options: RenditionOptions = {
    range: Range.currentPage,        // Type-safe
    format: RenditionFormat.png      // Type-safe
};
```

### Runtime "Invalid constant" Errors

**Problem**: Using string literals instead of constants.

```javascript
// ❌ Fragile - might break if API changes
await createRenditions({
    range: "currentPage",    // String literal
    format: "image/png"      // String literal  
});
```

**Solution**: Always use constants for future compatibility.

```javascript
// ✅ Safe - will be updated if API changes
await createRenditions({
    range: Range.currentPage,           // Constant
    format: RenditionFormat.png         // Constant
});
```

### Quick Debug Checklist

When you encounter constant-related errors:

1. **Check if the constant requires import**: Look for constants marked as import-required in the [cheat sheet](#constants-cheat-sheet)
2. **Verify your import statement**: Make sure you're importing the constant name exactly as documented
3. **Use TypeScript**: Add types to catch import issues at development time
4. **Test your constants**: Log the constant values to ensure they're defined:

```javascript
console.log('Range:', Range);  // Should log the Range object
console.log('AppEvent:', AppEvent);  // Should log the AppEvent object
```

## Related Guides

- [Create Renditions](./create_renditions.md) - Using export constants
- [Modal Dialogs](./modal_dialogs.md) - Using dialog constants  
- [Theme & Locale](./theme_locale.md) - Using platform constants
- [Constants Reference](../../../references/addonsdk/addonsdk-constants.md) - Complete technical specification

## Import Quick Reference

| Need | What to Import | Copy This |
|------|----------------|-----------|
| **Document Export** | `Range, RenditionFormat, RenditionIntent` | `import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";` |
| **Modal Dialogs** | `Variant, ButtonType, FieldType` | `import addOnUISdk, { Variant, ButtonType, FieldType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";` |
| **Events** | `AppEvent, ColorPickerEvent` | `import addOnUISdk, { AppEvent, ColorPickerEvent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";` |
| **Platform Detection** | `PlatformType, DeviceClass, PlatformEnvironment` | `import addOnUISdk, { PlatformType, DeviceClass, PlatformEnvironment } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";` |
| **Editor Panels** | `EditorPanel, MediaTabs, ElementsTabs` | `import addOnUISdk, { EditorPanel, MediaTabs, ElementsTabs } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";` |
| **File Types** | `SupportedMimeTypes` | `import addOnUISdk, { SupportedMimeTypes } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";` |

<InlineAlert slots="text" variant="success"/>

**Pro Tip:** You can import multiple constants in one statement: `import addOnUISdk, { Range, RenditionFormat, Variant, ButtonType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";`

## When to Use Which Pattern

### Use Named Imports When:

- You know which constants you need at development time
- You want cleaner, more readable code
- You're using TypeScript for better autocomplete
- You want to avoid potential `undefined` errors

### Use Constants Object When:

- The constant name is determined at runtime
- You're migrating existing code gradually
- You prefer the traditional `addOnUISdk.constants.X` pattern

Remember: When in doubt, use named imports - they work for all constants and provide the cleanest code!
