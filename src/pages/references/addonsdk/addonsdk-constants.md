# addOnUISdk.constants

This reference provides the complete technical specification for all constants used throughout the Add-on UI SDK, including:

- Constants available in `addOnUISdk.constants.*` (dual access)
- Constants available only as named exports (import required)

For practical examples and use cases, see the [Add-on UI SDK Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md).

<InlineAlert slots="text" variant="info"/>

The constants listed in this reference are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Import Patterns

Adobe Express Add-on SDK constants are available through different import patterns depending on the constant type. Understanding these patterns is imperative for avoiding runtime errors.

<InlineAlert slots="text" variant="warning"/>

**Important:** Attempting to access import-required constants through `addOnUISdk.constants.*` will return `undefined` and cause runtime errors. Always check the patterns below before using any constant.

### Named Exports Only (Import Required)

These constants are **only available as named exports** and must be imported explicitly. They are **not** available through `addOnUISdk.constants.*`:

```javascript
import addOnUISdk, { 
  AppEvent,              // Import required
  ColorPickerEvent,      // Import required
  SupportedMimeTypes,    // Import required
  EntrypointType,        // Import required
  PdfReturnUrlType       // Import required
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// ✅ Correct usage
const docxMimeType = SupportedMimeTypes.docx;
const colorChangeEvent = ColorPickerEvent.colorChange;

// ❌ Will NOT work - these are not in the constants object
const docxMimeType = addOnUISdk.constants.SupportedMimeTypes.docx; // undefined
```

### Dual Access Constants (Flexible)

These constants support **both import patterns** for flexibility. You can use either approach:

```javascript
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Option 1: Named import (recommended for cleaner code)
const currentPage = Range.currentPage;
const pngFormat = RenditionFormat.png;
const confirmDialog = Variant.confirmation;

// Option 2: Constants object access (traditional pattern)
const currentPage = addOnUISdk.constants.Range.currentPage;
const pngFormat = addOnUISdk.constants.RenditionFormat.png;
const confirmDialog = addOnUISdk.constants.Variant.confirmation;
```

**Dual Access Constants List:**

- `Range` / `addOnUISdk.constants.Range`
- `RenditionFormat` / `addOnUISdk.constants.RenditionFormat`
- `RenditionType` / `addOnUISdk.constants.RenditionType`
- `RenditionIntent` / `addOnUISdk.constants.RenditionIntent`
- `Variant` / `addOnUISdk.constants.Variant`
- `DialogResultType` / `addOnUISdk.constants.DialogResultType`
- `ButtonType` / `addOnUISdk.constants.ButtonType`
- `RuntimeType` / `addOnUISdk.constants.RuntimeType`
- `BleedUnit` / `addOnUISdk.constants.BleedUnit`
- `EditorPanel` / `addOnUISdk.constants.EditorPanel`
- `MediaTabs` / `addOnUISdk.constants.MediaTabs`
- `ElementsTabs` / `addOnUISdk.constants.ElementsTabs`
- `PanelActionType` / `addOnUISdk.constants.PanelActionType`
- `ColorPickerPlacement` / `addOnUISdk.constants.ColorPickerPlacement`
- `AuthorizationStatus` / `addOnUISdk.constants.AuthorizationStatus`
- `FieldType` / `addOnUISdk.constants.FieldType`
- `PlatformEnvironment` / `addOnUISdk.constants.PlatformEnvironment`
- `DeviceClass` / `addOnUISdk.constants.DeviceClass`
- `PlatformType` / `addOnUISdk.constants.PlatformType`
- `MediaType` / `addOnUISdk.constants.MediaType`
- `VideoResolution` / `addOnUISdk.constants.VideoResolution`
- `FrameRate` / `addOnUISdk.constants.FrameRate`
- `BitRate` / `addOnUISdk.constants.BitRate`
- `FileSizeLimitUnit` / `addOnUISdk.constants.FileSizeLimitUnit`
- `LinkOptions` / `addOnUISdk.constants.LinkOptions`

### Best Practices

1. **Use named imports for cleaner code** when you know which constants you need:

   ```javascript
   import addOnUISdk, { Range, RenditionFormat } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
   
   const options = {
     range: Range.currentPage,
     format: RenditionFormat.png
   };
   ```

2. **Use constants object for dynamic access** when the constant name is determined at runtime:

   ```javascript
   const format = addOnUISdk.constants.RenditionFormat[userSelectedFormat];
   ```

3. **Always import named-only exports** - there's no alternative way to access them:

   ```javascript
   import addOnUISdk, { SupportedMimeTypes } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
   ```

### Quick Reference Table

| Constant | Named Export | Constants Object | Import Required |
|----------|--------------|------------------|-----------------|
| `AppEvent` | ✅ | ❌ | **Yes** |
| `ColorPickerEvent` | ✅ | ❌ | **Yes** |
| `SupportedMimeTypes` | ✅ | ❌ | **Yes** |
| `EntrypointType` | ✅ | ❌ | **Yes** |
| `PdfReturnUrlType` | ✅ | ❌ | **Yes** |
| `Range` | ✅ | ✅ | Optional |
| `RenditionFormat` | ✅ | ✅ | Optional |
| `Variant` | ✅ | ✅ | Optional |
| `ButtonType` | ✅ | ✅ | Optional |
| `FieldType` | ✅ | ✅ | Optional |
| `PlatformEnvironment` | ✅ | ✅ | Optional |
| `DeviceClass` | ✅ | ✅ | Optional |
| `PlatformType` | ✅ | ✅ | Optional |
| `AuthorizationStatus` | ✅ | ✅ | Optional |
| `RenditionType` | ✅ | ✅ | Optional |
| `RenditionIntent` | ✅ | ✅ | Optional |
| `DialogResultType` | ✅ | ✅ | Optional |
| `RuntimeType` | ✅ | ✅ | Optional |
| `BleedUnit` | ✅ | ✅ | Optional |
| `EditorPanel` | ✅ | ✅ | Optional |
| `MediaTabs` | ✅ | ✅ | Optional |
| `ElementsTabs` | ✅ | ✅ | Optional |
| `PanelActionType` | ✅ | ✅ | Optional |
| `ColorPickerPlacement` | ✅ | ✅ | Optional |
| `MediaType` | ✅ | ✅ | Optional |
| `VideoResolution` | ✅ | ✅ | Optional |
| `FrameRate` | ✅ | ✅ | Optional |
| `BitRate` | ✅ | ✅ | Optional |
| `FileSizeLimitUnit` | ✅ | ✅ | Optional |
| `LinkOptions` | ✅ | ✅ | Optional |

<InlineAlert slots="text" variant="warning"/>

**Important:** Attempting to access named-only exports through `addOnUISdk.constants.*` will return `undefined` and may cause runtime errors. Always check the table above or use TypeScript for compile-time validation.

## Import Generator

Use these copy-paste ready import statements for common scenarios:

### Complete Import (All Constants)

```javascript
// Import everything (use this if you're unsure)
import addOnUISdk, { 
  // Import-required constants
  AppEvent, ColorPickerEvent, SupportedMimeTypes, EntrypointType, PdfReturnUrlType,
  // Dual-access constants (most common)
  Range, RenditionFormat, RenditionIntent, Variant, ButtonType, FieldType,
  PlatformType, DeviceClass, PlatformEnvironment, EditorPanel, MediaTabs, ElementsTabs,
  AuthorizationStatus, DialogResultType, RuntimeType, BleedUnit, PanelActionType,
  ColorPickerPlacement, MediaType, VideoResolution, FrameRate, BitRate, FileSizeLimitUnit, LinkOptions
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

### By Use Case (Recommended)

```javascript
// Document Export & Rendering
import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Modal Dialogs & UI
import addOnUISdk, { Variant, ButtonType, FieldType, DialogResultType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Event Handling (Import Required!)
import addOnUISdk, { AppEvent, ColorPickerEvent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Platform Detection
import addOnUISdk, { PlatformType, DeviceClass, PlatformEnvironment } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Editor Navigation
import addOnUISdk, { EditorPanel, MediaTabs, ElementsTabs, PanelActionType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// File Types & MIME (Import Required!)
import addOnUISdk, { SupportedMimeTypes, PdfReturnUrlType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// OAuth & Authorization
import addOnUISdk, { AuthorizationStatus } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
```

## Constants Reference

This section provides the complete technical specification for all Add-on UI SDK constants, organized by functional category. For practical examples and usage patterns, see the [Add-on UI SDK Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md).

## Developer Tips

<InlineNestedAlert header="true" variant="success" iconPosition="right">

**Quick Start Tips:**

- **When in doubt, use named imports** - they work for ALL constants
- **Copy import statements** from the [Import Generator](#import-generator) above
- **Never guess** - check if constants are import-required before using
- **Use TypeScript** for compile-time validation and better IDE support

## Constants Reference

The following constants are organized by functional category for easier navigation. Each constant includes its import requirements, available values, and usage context.

### Table of Contents

- [Dialog & UI Constants](#dialog--ui-constants)
- [Document Export Constants](#document-export-constants)
- [Platform Detection Constants](#platform-detection-constants)
- [Editor Navigation Constants](#editor-navigation-constants)
- [Event Constants](#event-constants)
- [File & Media Constants](#file--media-constants)
- [OAuth & Authorization Constants](#oauth--authorization-constants)
- [Video & Media Settings Constants](#video--media-settings-constants)

---

## Dialog & UI Constants

### ButtonType {#buttontype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ButtonType }` or `addOnUISdk.constants.ButtonType` ✅ **Dual Access**

The type of button pressed in a modal dialog.

| Value | Description |
|-------|-------------|
| `primary` | Primary button pressed |
| `secondary` | Secondary button pressed |
| `cancel` | Cancel button pressed |
| `close` | Dialog closed via ESC or close(X) button |

**Example Usage:**

```javascript
const result = await addOnUISdk.app.showModalDialog({...});
if (result.buttonType === ButtonType.primary) {
    // Handle primary action
}
```

### Variant {#variant}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { Variant }` or `addOnUISdk.constants.Variant` ✅ **Dual Access**

Types of dialog variants supported for different user interaction scenarios.

| Value | Description |
|-------|-------------|
| `confirmation` | Ask a user to confirm an action |
| `information` | Share information for user to acknowledge |
| `warning` | Share information that a user needs to consider before proceeding |
| `destructive` | Tell a user that if they proceed with an action, it may impact their data in a negative way |
| `error` | Communicate critical issue that a user needs to resolve before proceeding |
| `input` | Ask a user to provide some inputs |
| `custom` | A dialog that can render complex forms and content |

**Example Usage:**

```javascript
await addOnUISdk.app.showModalDialog({
    variant: Variant.confirmation,
    title: "Delete Item",
    description: "Are you sure?"
});
```

### FieldType {#fieldtype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FieldType }` or `addOnUISdk.constants.FieldType` ✅ **Dual Access**

The type of input field supported in Simple Dialog.

| Value | Description |
|-------|-------------|
| `text` | Text input field |

### DialogResultType {#dialogresulttype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { DialogResultType }` or `addOnUISdk.constants.DialogResultType` ✅ **Dual Access**

The type of modal dialog result returned.

| Value | Description |
|-------|-------------|
| `alert` | Alert dialog result (simple dialogs all return this) |
| `input` | Input dialog result |
| `custom` | Custom dialog result |

### ColorPickerPlacement {#colorpickerplacement}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ColorPickerPlacement }` or `addOnUISdk.constants.ColorPickerPlacement` ✅ **Dual Access**

Placement of the color picker popover with respect to the anchor element.

| Value | Description |
|-------|-------------|
| `top` | Position above the anchor |
| `bottom` | Position below the anchor |
| `left` | Position to the left of the anchor |
| `right` | Position to the right of the anchor |

---

## Document Export Constants

### Range {#range}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { Range }` or `addOnUISdk.constants.Range` ✅ **Dual Access**

Specifies which pages to include in a rendition export.

| Value | Description |
|-------|-------------|
| `currentPage` | Generate rendition for the current page |
| `entireDocument` | Generate rendition for all pages |
| `specificPages` | Generate rendition for specific pages (requires `pageIds` parameter) |

**Example Usage:**

```javascript
await addOnUISdk.app.document.createRenditions({
    range: Range.currentPage,
    format: RenditionFormat.png
});
```

### RenditionFormat {#renditionformat}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionFormat }` or `addOnUISdk.constants.RenditionFormat` ✅ **Dual Access**

Required output format of the rendition.

| Value | MIME Type | Description |
|-------|-----------|-------------|
| `jpg` | `"image/jpeg"` | JPEG image format |
| `png` | `"image/png"` | PNG image format |
| `mp4` | `"video/mp4"` | MP4 video format |
| `pdf` | `"application/pdf"` | PDF document format |
| `pptx` | `"application/vnd.openxmlformats-officedocument.presentationml.presentation"` | PowerPoint presentation format |

### RenditionIntent {#renditionintent}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionIntent }` or `addOnUISdk.constants.RenditionIntent` ✅ **Dual Access**

The intent to set for creating the rendition, which may affect optimization.

| Value | Description |
|-------|-------------|
| `preview` | Intent to preview the content |
| `export` | Intent to export/download the content (default) |
| `print` | Intent to export and print the content |

<InlineAlert slots="text" variant="warning"/>

**Note**: For `pdf` format, `print` intent generates a print-optimized PDF. This option is not supported for `mp4` format.

### RenditionType {#renditiontype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionType }` or `addOnUISdk.constants.RenditionType` ✅ **Dual Access**

The type of rendition. Currently returns `"page"` for all renditions.

### BleedUnit {#bleedunit}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { BleedUnit }` or `addOnUISdk.constants.BleedUnit` ✅ **Dual Access**

Units for specifying page bleed in print-ready documents.

| Value | Description |
|-------|-------------|
| `"in"` | Inch units |
| `"mm"` | Millimeter units |

---

## Platform Detection Constants

### PlatformType {#platformtype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PlatformType }` or `addOnUISdk.constants.PlatformType` ✅ **Dual Access**

Denotes the specific platform/operating system where the add-on is running.

| Value | Platform | Description |
|-------|----------|-------------|
| `iOS` | `"ios"` | iOS mobile devices |
| `iPadOS` | `"ipad"` | iPad devices |
| `chromeOS` | `"chromeOS"` | Chrome OS devices |
| `android` | `"android"` | Android devices |
| `chromeBrowser` | `"chromeBrowser"` | Chrome browser |
| `firefoxBrowser` | `"firefoxBrowser"` | Firefox browser |
| `edgeBrowser` | `"edgeBrowser"` | Microsoft Edge browser |
| `samsungBrowser` | `"samsumgBrowser"` | Samsung browser *(Note: Contains typo in SDK)* |
| `safariBrowser` | `"safariBrowser"` | Safari browser |
| `unknown` | `"unknown"` | Unknown platform |

**Example Usage:**

```javascript
const platform = await addOnUISdk.app.getCurrentPlatform();
if (platform.platformType === PlatformType.iOS) {
    // iOS-specific handling
}
```

### DeviceClass {#deviceclass}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { DeviceClass }` or `addOnUISdk.constants.DeviceClass` ✅ **Dual Access**

Denotes the device class/form factor where the add-on is running.

| Value | Description |
|-------|-------------|
| `mobile` | Mobile phone devices |
| `tablet` | Tablet devices |
| `desktop` | Desktop/laptop devices |

### PlatformEnvironment {#platformenvironment}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PlatformEnvironment }` or `addOnUISdk.constants.PlatformEnvironment` ✅ **Dual Access**

Denotes the current environment where the add-on is running.

| Value | Description |
|-------|-------------|
| `app` | Native application environment |
| `web` | Web browser environment |

---

## Editor Navigation Constants

### EditorPanel {#editorpanel}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { EditorPanel }` or `addOnUISdk.constants.EditorPanel` ✅ **Dual Access**

The Adobe Express Editor panel to be opened programmatically.

| Value | Description |
|-------|-------------|
| `search` | Editor Search panel |
| `yourStuff` | Editor Your stuff panel |
| `templates` | Editor Templates panel |
| `media` | Editor Media panel |
| `text` | Editor Text panel |
| `elements` | Editor Elements panel |
| `grids` | Editor Grids panel |
| `brands` | Editor Brands panel |
| `addOns` | Editor Add-ons panel |

**Example Usage:**

```javascript
addOnUISdk.app.ui.openEditorPanel(EditorPanel.media);
```

### MediaTabs {#mediatabs}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { MediaTabs }` or `addOnUISdk.constants.MediaTabs` ✅ **Dual Access**

Tabs available in the Editor's Media panel.

| Value | Description |
|-------|-------------|
| `video` | Video tab |
| `audio` | Audio tab |
| `photos` | Photos tab |

### ElementsTabs {#elementstabs}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ElementsTabs }` or `addOnUISdk.constants.ElementsTabs` ✅ **Dual Access**

Tabs available in the Editor's Elements panel.

| Value | Description |
|-------|-------------|
| `designAssets` | Design assets tab |
| `backgrounds` | Backgrounds tab |
| `shapes` | Shapes tab |
| `stockIcons` | Icons tab |
| `charts` | Charts tab |

### PanelActionType {#panelactiontype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PanelActionType }` or `addOnUISdk.constants.PanelActionType` ✅ **Dual Access**

Types of actions that can be performed on Editor panels.

| Value | Description |
|-------|-------------|
| `search` | Action type to perform search within the Editor panel |
| `navigate` | Action type to perform navigation within the Editor panel |

---

## Event Constants

<InlineAlert slots="text" variant="error"/>

**Critical**: Event constants are **named export only** and cannot be accessed through `addOnUISdk.constants.*`

### AppEvent {#appevent}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { AppEvent }` ❌ **Named Export Only**

Events dispatched by the Add-on SDK for application-level changes.

| Value | Description |
|-------|-------------|
| `documentIdAvailable` | Document ID becomes available |
| `documentTitleChange` | Document title changes |
| `documentLinkAvailable` | Document link becomes available |
| `documentPublishedLinkAvailable` | Published document link becomes available |
| `themechange` | Application theme changes |

**Example Usage:**

```javascript
import addOnUISdk, { AppEvent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.app.on(AppEvent.themechange, (event) => {
    updateUITheme(event.theme);
});
```

### ColorPickerEvent {#colorpickerevent}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { ColorPickerEvent }` ❌ **Named Export Only**

Custom events dispatched by the Color Picker component.

| Value | Event Name | Description |
|-------|------------|-------------|
| `colorChange` | `"colorpicker-color-change"` | Color selection changed |
| `close` | `"colorpicker-close"` | Color picker closed |

**Example Usage:**

```javascript
import addOnUISdk, { ColorPickerEvent } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

colorPickerElement.addEventListener(ColorPickerEvent.colorChange, (event) => {
    applyColor(event.color);
});
```

---

## File & Media Constants

### SupportedMimeTypes {#supportedmimetypes}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { SupportedMimeTypes }` ❌ **Named Export Only**

MIME types for original source assets that can be converted to PDF.

| Value | Description |
|-------|-------------|
| `docx` | Microsoft Word document |
| `gdoc` | Google Docs document |

### PdfReturnUrlType {#pdfreturnurltype}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { PdfReturnUrlType }` ❌ **Named Export Only**

Specifies the type of URL returned for PDF rendition export.

| Value | Description |
|-------|-------------|
| `cdnUrl` | CDN URL for the PDF |
| `jumpUrl` | Jump URL for the PDF |

### FileSizeLimitUnit {#filesizelimitunit}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FileSizeLimitUnit }` or `addOnUISdk.constants.FileSizeLimitUnit` ✅ **Dual Access**

Unit of the file size limit.

| Value | Description |
|-------|-------------|
| `KB` | Kilobytes |
| `MB` | Megabytes |

### LinkOptions {#linkoptions}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { LinkOptions }` or `addOnUISdk.constants.LinkOptions` ✅ **Dual Access**

The type of link to generate for documents.

| Value | Description |
|-------|-------------|
| `document` | Link to the current document |
| `published` | Link to the published document |

---

## OAuth & Authorization Constants

### AuthorizationStatus {#authorizationstatus}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { AuthorizationStatus }` or `addOnUISdk.constants.AuthorizationStatus` ✅ **Dual Access**

OAuth authorization status values returned from authorization flows.

| Value | Description |
|-------|-------------|
| `authorized` | Authorization successful |
| `cancelled` | Authorization cancelled by user |
| `error` | Authorization error occurred |

**Example Usage:**

```javascript
const result = await addOnUISdk.app.oauth.authorize({...});
if (result.status === AuthorizationStatus.authorized) {
    // Handle successful authorization
}
```

---

## Video & Media Settings Constants

### VideoResolution {#videoresolution}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { VideoResolution }` or `addOnUISdk.constants.VideoResolution` ✅ **Dual Access**

Video resolution options for MP4 renditions.

| Value | Resolution | Description |
|-------|------------|-------------|
| `sd480p` | `"480p"` | Standard definition |
| `hd720p` | `"720p"` | High definition |
| `fhd1080p` | `"1080p"` | Full high definition |
| `qhd1440p` | `"1440p"` | Quad high definition |
| `uhd2160p` | `"2160p"` | Ultra high definition (4K) |
| `custom` | Custom | Custom resolution |

### FrameRate {#framerate}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FrameRate }` or `addOnUISdk.constants.FrameRate` ✅ **Dual Access**

Frame rate options in frames per second for video exports.

| Value | FPS | Description |
|-------|-----|-------------|
| `fps23_976` | `23.976` | Cinema standard |
| `fps24` | `24` | Film standard |
| `fps25` | `25` | PAL standard |
| `fps29_97` | `29.97` | NTSC standard |
| `fps30` | `30` | Common web standard |
| `fps60` | `60` | High frame rate |

### BitRate {#bitrate}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { BitRate }` or `addOnUISdk.constants.BitRate` ✅ **Dual Access**

Bit rate options in bits per second for video quality control.

| Value | Bitrate | Description |
|-------|---------|-------------|
| `mbps4` | `4000000` | 4 Mbps |
| `mbps8` | `8000000` | 8 Mbps |
| `mbps10` | `10000000` | 10 Mbps |
| `mbps12` | `12000000` | 12 Mbps |
| `mbps15` | `15000000` | 15 Mbps |
| `mbps25` | `25000000` | 25 Mbps |
| `mbps50` | `50000000` | 50 Mbps |

---

## Runtime & System Constants

### RuntimeType {#runtimetype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RuntimeType }` or `addOnUISdk.constants.RuntimeType` ✅ **Dual Access**

Runtime type of the entrypoint creating this backend object.

| Value | Description |
|-------|-------------|
| `panel` | Add-on's iframe runtime (code running in `index.html`) |
| `script` | Add-on's document sandbox code (code running in `code.js`) |
| `dialog` | Currently open dialog code |

### EntrypointType {#entrypointtype}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { EntrypointType }` ❌ **Named Export Only**

Types of entry points for add-on execution contexts.

### MediaType {#mediatype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { MediaType }` or `addOnUISdk.constants.MediaType` ✅ **Dual Access**

Types of media content supported by the platform.
