# addOnUISdk.constants

This reference provides the complete technical specification for all constants used throughout the Add-on UI SDK.

- Constants available in `addOnUISdk.constants.*` (dual access)
- Constants available only as named exports (import required)

For practical examples and use cases, see the [Add-on UI SDK Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md).

<InlineAlert slots="text" variant="info"/>

The constants listed in this reference are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Import Patterns

Adobe Express Add-on SDK constants are available through different import patterns depending on the constant type. Understanding these patterns is imperative for avoiding runtime errors.

<InlineAlert slots="text" variant="warning"/>

**Critical:** Attempting to access import-required constants through `addOnUISdk.constants.*` will return `undefined` and cause runtime errors. Always check the patterns below before using any constant.

### Named Exports Only (Import Required)

These constants are **only available as named exports** and must be imported explicitly. They are **not** available through `addOnUISdk.constants.*`:

```javascript
import addOnUISdk, { 
  AppEvent,              // Import required
  ColorPickerEvent,      // Import required
  SupportedMimeTypes,    // Import required
  EntrypointType         // Import required
} from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// ✅ Correct usage
const docxMimeType = SupportedMimeTypes.docx;
const colorChangeEvent = ColorPickerEvent.colorChange;

// ❌ Will NOT work - these are not in the constants object
const docxMimeType = addOnUISdk.constants.SupportedMimeTypes.docx; // undefined
```

### Dual Access Constants (Flexible)

These constants support **both import patterns** for flexibility. You can use either approach:

```javascript
import addOnUISdk, { Range, RenditionFormat, Variant } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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
- `VideoResolution` / `addOnUISdk.constants.VideoResolution`
- `FrameRate` / `addOnUISdk.constants.FrameRate`
- `BitRate` / `addOnUISdk.constants.BitRate`
- `FileSizeLimitUnit` / `addOnUISdk.constants.FileSizeLimitUnit`
- `LinkOptions` / `addOnUISdk.constants.LinkOptions`

### Best Practices

1. **Use named imports for cleaner code** when you know which constants you need:

   ```javascript
   import addOnUISdk, { Range, RenditionFormat } from "https://express.adobe.com/static/add-on-sdk/sdk.js";
   
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
   import addOnUISdk, { SupportedMimeTypes } from "https://express.adobe.com/static/add-on-sdk/sdk.js";
   ```

### Quick Reference Table

| Constant | Named Export | Constants Object | Import Required |
|----------|--------------|------------------|-----------------|
| `AppEvent` | ✅ | ❌ | **Yes** |
| `ColorPickerEvent` | ✅ | ❌ | **Yes** |
| `SupportedMimeTypes` | ✅ | ❌ | **Yes** |
| `EntrypointType` | ✅ | ❌ | **Yes** |
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
| `VideoResolution` | ✅ | ✅ | Optional |
| `FrameRate` | ✅ | ✅ | Optional |
| `BitRate` | ✅ | ✅ | Optional |
| `FileSizeLimitUnit` | ✅ | ✅ | Optional |
| `LinkOptions` | ✅ | ✅ | Optional |

<InlineAlert slots="text" variant="warning"/>

**Important:** Attempting to access named-only exports through `addOnUISdk.constants.*` will return `undefined` and may cause runtime errors. Always check the table above or use TypeScript for compile-time validation.

## Constants Reference

This section provides the complete technical specification for all Add-on UI SDK constants, organized by functional category. For practical examples and usage patterns, see the [Add-on UI SDK Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md).

### BitRate {#bitrate}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { BitRate }` or `addOnUISdk.constants.BitRate`

Bit rate values in bits per second for video renditions.

| Value | Description | Numeric Value |
|-------|-------------|---------------|
| `mbps4` | 4 Mbps | `4000000` |
| `mbps8` | 8 Mbps | `8000000` |
| `mbps10` | 10 Mbps | `10000000` |
| `mbps12` | 12 Mbps | `12000000` |
| `mbps15` | 15 Mbps | `15000000` |
| `mbps25` | 25 Mbps | `25000000` |
| `mbps50` | 50 Mbps | `50000000` |

### BleedUnit {#bleedunit}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { BleedUnit }` or `addOnUISdk.constants.BleedUnit`

Units for page bleed measurements.

| Value | Description |
|-------|-------------|
| `in` | Inch units |
| `mm` | Millimeter units |

### ButtonType {#buttontype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ButtonType }` or `addOnUISdk.constants.ButtonType`

Types of buttons that can be pressed in modal dialogs.

| Value | Description |
|-------|-------------|
| `primary` | Primary button pressed |
| `secondary` | Secondary button pressed |
| `cancel` | Cancel button pressed |
| `close` | Dialog closed via ESC or close(X) button |

### AppEvent {#appevent}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { AppEvent }` - Not available in constants object

Events dispatched by the Add-on SDK.

| Value | Event String | Description |
|-------|-------------|-------------|
| `themechange` | `"themechange"` | Theme changed |
| `localechange` | `"localechange"` | Locale changed |
| `formatchange` | `"formatchange"` | Format changed |
| `reset` | `"reset"` | Add-on reset |
| `dragstart` | `"dragstart"` | Drag operation started |
| `dragend` | `"dragend"` | Drag operation ended |
| `dragcancel` | `"dragcancel"` | Drag operation cancelled |
| `documentIdAvailable` | `"documentIdAvailable"` | Document ID available |
| `documentLinkAvailable` | `"documentLinkAvailable"` | Document link available |
| `documentPublishedLinkAvailable` | `"documentPublishedLinkAvailable"` | Published link available |
| `documentTitleChange` | `"documentTitleChange"` | Document title changed |
| `documentExportAllowedChange` | `"documentExportAllowedChange"` | Export permission changed |

### AuthorizationStatus {#authorizationstatus}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { AuthorizationStatus }` or `addOnUISdk.constants.AuthorizationStatus`

OAuth authorization status values.

| Value | Description |
|-------|-------------|
| `authorized` | Authorization successful |
| `cancelled` | Authorization cancelled by user |
| `error` | Authorization error occurred |

### ColorPickerEvent {#colorpickerevent}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { ColorPickerEvent }` - Not available in constants object

Custom events dispatched by the Color Picker component.

| Value | Event String | Description |
|-------|-------------|-------------|
| `colorChange` | `"colorpicker-color-change"` | Color selection changed |
| `close` | `"colorpicker-close"` | Color picker closed |

### ColorPickerPlacement {#colorpickerplacement}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ColorPickerPlacement }` or `addOnUISdk.constants.ColorPickerPlacement`

Placement options for the color picker popover relative to anchor element.

| Value | Description |
|-------|-------------|
| `top` | Position above anchor |
| `bottom` | Position below anchor |
| `left` | Position to the left of anchor |
| `right` | Position to the right of anchor |

### DeviceClass {#deviceclass}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { DeviceClass }` or `addOnUISdk.constants.DeviceClass`

Device form factors where the add-on is running.

| Value | Description |
|-------|-------------|
| `mobile` | Mobile phone |
| `tablet` | Tablet device |
| `desktop` | Desktop computer |

### DialogResultType {#dialogresulttype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { DialogResultType }` or `addOnUISdk.constants.DialogResultType`

Types of modal dialog results.

| Value | Description |
|-------|-------------|
| `alert` | Alert dialog result (simple dialogs) |
| `input` | Input dialog result |
| `custom` | Custom dialog result |

### EditorPanel {#editorpanel}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { EditorPanel }` or `addOnUISdk.constants.EditorPanel`

Adobe Express Editor panels that can be opened programmatically.

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

### ElementsTabs {#elementstabs}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ElementsTabs }` or `addOnUISdk.constants.ElementsTabs`

Tabs within the Editor's Elements panel.

| Value | Description |
|-------|-------------|
| `designAssets` | Design assets tab |
| `backgrounds` | Backgrounds tab |
| `shapes` | Shapes tab |
| `stockIcons` | Icons tab |
| `charts` | Charts tab |

### EntrypointType {#entrypointtype}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { EntrypointType }` - Not available in constants object

Types of add-on entry points (currently only panel is supported).

| Value | Description |
|-------|-------------|
| `panel` | Panel entry point |

### FieldType {#fieldtype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FieldType }` or `addOnUISdk.constants.FieldType`

Input field types supported in Simple Dialog.

| Value | Description |
|-------|-------------|
| `text` | Text input field |

### FileSizeLimitUnit {#filesizelimitunit}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FileSizeLimitUnit }` or `addOnUISdk.constants.FileSizeLimitUnit`

Units for file size limits.

| Value | Description |
|-------|-------------|
| `KB` | Kilobytes |
| `MB` | Megabytes |

### FrameRate {#framerate}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FrameRate }` or `addOnUISdk.constants.FrameRate`

Frame rate values in frames per second for video renditions.

| Value | Description | Numeric Value |
|-------|-------------|---------------|
| `fps23_976` | 23.976 fps | `23.976` |
| `fps24` | 24 fps | `24` |
| `fps25` | 25 fps | `25` |
| `fps29_97` | 29.97 fps | `29.97` |
| `fps30` | 30 fps | `30` |
| `fps60` | 60 fps | `60` |

### LinkOptions {#linkoptions}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { LinkOptions }` or `addOnUISdk.constants.LinkOptions`

Types of document links that can be generated.

| Value | Description |
|-------|-------------|
| `document` | Link to the current document |
| `published` | Link to the published document |

### MediaTabs {#mediatabs}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { MediaTabs }` or `addOnUISdk.constants.MediaTabs`

Tabs within the Editor's Media panel.

| Value | Description |
|-------|-------------|
| `video` | Video tab |
| `audio` | Audio tab |
| `photos` | Photos tab |

### PanelActionType {#panelactiontype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PanelActionType }` or `addOnUISdk.constants.PanelActionType`

Types of actions that can be performed on Editor panels.

| Value | Description |
|-------|-------------|
| `search` | Perform search within the Editor panel |
| `navigate` | Perform navigation within the Editor panel |

### PlatformEnvironment {#platformenvironment}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PlatformEnvironment }` or `addOnUISdk.constants.PlatformEnvironment`

Environment where the add-on is running.

| Value | Description |
|-------|-------------|
| `app` | Native app environment |
| `web` | Web browser environment |

### PlatformType {#platformtype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PlatformType }` or `addOnUISdk.constants.PlatformType`

Specific platform/operating system where the add-on is running.

| Value | Description |
|-------|-------------|
| `iOS` | iOS mobile |
| `iPadOS` | iPadOS tablet |
| `chromeOS` | Chrome OS |
| `android` | Android mobile |
| `chromeBrowser` | Chrome browser |
| `firefoxBrowser` | Firefox browser |
| `edgeBrowser` | Edge browser |
| `samsungBrowser` | Samsung browser (note: contains typo in SDK) |
| `safariBrowser` | Safari browser |
| `unknown` | Unknown platform |

### Range {#range}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { Range }` or `addOnUISdk.constants.Range`

Page range options for document renditions.

| Value | Description |
|-------|-------------|
| `currentPage` | Generate rendition for the current page |
| `entireDocument` | Generate rendition for all pages |
| `specificPages` | Generate rendition for specific pages |

### RenditionFormat {#renditionformat}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionFormat }` or `addOnUISdk.constants.RenditionFormat`

Output formats for document renditions.

| Value | MIME Type | Description |
|-------|-----------|-------------|
| `jpg` | `"image/jpeg"` | JPEG image |
| `png` | `"image/png"` | PNG image |
| `mp4` | `"video/mp4"` | MP4 video |
| `pdf` | `"application/pdf"` | PDF document |
| `pptx` | `"application/vnd.openxmlformats-officedocument.presentationml.presentation"` | PowerPoint presentation |

### RenditionIntent {#renditionintent}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionIntent }` or `addOnUISdk.constants.RenditionIntent`

Intent for creating renditions (affects optimization).

| Value | Description |
|-------|-------------|
| `preview` | Intent to preview the content |
| `export` | Intent to export/download the content (default) |
| `print` | Intent to export and print the content (PDF optimized, not supported for MP4) |

### RenditionType {#renditiontype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionType }` or `addOnUISdk.constants.RenditionType`

Type of rendition being created.

| Value | Description |
|-------|-------------|
| `page` | Page rendition (currently the only type) |

### RuntimeType {#runtimetype}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RuntimeType }` or `addOnUISdk.constants.RuntimeType`

Runtime type of the entrypoint creating the backend object.

| Value | Description |
|-------|-------------|
| `panel` | Add-on's iframe runtime (code running in `index.html`) |
| `script` | Add-on's document sandbox code (code running in `code.js`) |
| `dialog` | Currently open dialog code |

### SupportedMimeTypes {#supportedmimetypes}

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { SupportedMimeTypes }` - Not available in constants object

MIME types for original source assets that can be converted to PDF.

| Value | Description |
|-------|-------------|
| `docx` | Microsoft Word document |
| `gdoc` | Google Docs document |

### Variant {#variant}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { Variant }` or `addOnUISdk.constants.Variant`

Dialog variants that determine appearance and behavior.

| Value | Description |
|-------|-------------|
| `confirmation` | Ask user to confirm an action |
| `information` | Share information for user to acknowledge |
| `warning` | Share information user needs to consider before proceeding |
| `destructive` | Warn about actions that may impact data negatively |
| `error` | Communicate critical issue that needs resolution |
| `input` | Ask user to provide input |
| `custom` | Dialog that can render complex forms and content |

### VideoResolution {#videoresolution}

<InlineAlert slots="text" variant="info"/>

**Import**: `import { VideoResolution }` or `addOnUISdk.constants.VideoResolution`

Video resolution options for MP4 renditions.

| Value | Description |
|-------|-------------|
| `sd480p` | 480p Standard Definition |
| `hd720p` | 720p High Definition |
| `fhd1080p` | 1080p Full High Definition |
| `qhd1440p` | 1440p Quad High Definition |
| `uhd2160p` | 2160p Ultra High Definition (4K) |
| `custom` | Custom resolution |

## Import Generator

Use these copy-paste ready import statements for common scenarios:

### Complete Import (All Constants)

```javascript
// Import everything (use this if you're unsure)
import addOnUISdk, { 
  // Import-required constants
  AppEvent, ColorPickerEvent, SupportedMimeTypes, EntrypointType,
  // Dual-access constants (most common)
  Range, RenditionFormat, RenditionIntent, Variant, ButtonType, FieldType,
  PlatformType, DeviceClass, PlatformEnvironment, EditorPanel, MediaTabs, ElementsTabs,
  AuthorizationStatus, DialogResultType, RuntimeType, BleedUnit, PanelActionType,
  ColorPickerPlacement, VideoResolution, FrameRate, BitRate, FileSizeLimitUnit, LinkOptions
} from "https://express.adobe.com/static/add-on-sdk/sdk.js";
```

### By Use Case (Recommended)

```javascript
// Document Export & Rendering
import addOnUISdk, { Range, RenditionFormat, RenditionIntent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Modal Dialogs & UI
import addOnUISdk, { Variant, ButtonType, FieldType, DialogResultType } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Event Handling (Import Required!)
import addOnUISdk, { AppEvent, ColorPickerEvent } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Platform Detection
import addOnUISdk, { PlatformType, DeviceClass, PlatformEnvironment } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Editor Navigation
import addOnUISdk, { EditorPanel, MediaTabs, ElementsTabs, PanelActionType } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// File Types & MIME (Import Required!)
import addOnUISdk, { SupportedMimeTypes } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// OAuth & Authorization
import addOnUISdk, { AuthorizationStatus } from "https://express.adobe.com/static/add-on-sdk/sdk.js";
```

## Developer Tips

<InlineAlert slots="text" variant="success"/>

**Quick Start Tips:**

- **When in doubt, use named imports** - they work for ALL constants
- **Copy import statements** from the [Import Generator](#import-generator) above
- **Never guess** - check if constants are import-required before using
- **Use TypeScript** for compile-time validation and better IDE support
