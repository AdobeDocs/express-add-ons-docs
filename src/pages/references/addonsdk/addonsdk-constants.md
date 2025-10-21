---
keywords:
  - Adobe Express
  - Add-on UI SDK
  - Constants Reference
  - API Reference
  - SDK Constants
  - Named Exports
  - Import Patterns
  - Type Safety
  - JavaScript
  - TypeScript
  - AppEvent
  - ColorPickerEvent
  - SupportedMimeTypes
  - EntrypointType
  - RenditionFormat
  - Range
  - Variant
  - ButtonType
  - Modal Dialogs
  - Document Export
  - Event Handling
  - Platform Detection
  - Editor Navigation
  - OAuth Authorization
  - Video Rendition
  - Color Picker
  - Dialog Types
  - MIME Types
  - Technical Specification
  - API Documentation
  - Constants Object
  - Dual Access
  - Named Only Exports
title: Add-on UI SDK Constants Reference
description: Complete technical specification for all Add-on UI SDK constants including import patterns, dual-access vs named-only exports, and detailed reference details.
contributors:
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "Which constants require imports and which are available through addOnUISdk.constants?"
      answer: "Four constants are named-only exports and MUST be imported: AppEvent, ColorPickerEvent, SupportedMimeTypes, and EntrypointType. All other constants support dual access - you can either import them OR use addOnUISdk.constants.*"

    - question: "What happens if I try to access AppEvent through addOnUISdk.constants?"
      answer: "It will return undefined. AppEvent, ColorPickerEvent, SupportedMimeTypes, and EntrypointType are only available as named exports and must be imported directly from the SDK."

    - question: "What are the available rendition formats for document export?"
      answer: "The RenditionFormat constant provides: jpg (image/jpeg), png (image/png), mp4 (video/mp4), pdf (application/pdf), and pptx (PowerPoint presentation)."

    - question: "How do I import all constants at once?"
      answer: "Use: import addOnUISdk, { AppEvent, ColorPickerEvent, SupportedMimeTypes, EntrypointType, Range, RenditionFormat, Variant, ButtonType, FieldType, PlatformType, DeviceClass, PlatformEnvironment, EditorPanel, MediaTabs, ElementsTabs, AuthorizationStatus, DialogResultType, RuntimeType, BleedUnit, PanelActionType, ColorPickerPlacement, VideoResolution, FrameRate, BitRate, FileSizeLimitUnit, LinkOptions, RenditionIntent } from 'https://express.adobe.com/static/add-on-sdk/sdk.js';"

    - question: "What dialog variants are available?"
      answer: "The Variant constant provides: confirmation, information, warning, destructive, error, input, and custom dialog types."

    - question: "What video resolutions are supported for MP4 renditions?"
      answer: "VideoResolution supports: sd480p, hd720p, fhd1080p, qhd1440p, uhd2160p (4K), and custom resolution options."

    - question: "Which Editor panels can be opened programmatically?"
      answer: "EditorPanel constant includes: search, yourStuff, templates, media, text, elements, grids, brands, and addOns panels."

    - question: "What are the available page range options for renditions?"
      answer: "The Range constant provides: currentPage, entireDocument, and specificPages options."

    - question: "What platform types can be detected?"
      answer: "PlatformType includes: iOS, iPadOS, chromeOS, android, chromeBrowser, firefoxBrowser, edgeBrowser, samsungBrowser, safariBrowser, and unknown."

    - question: "What events can I listen for with AppEvent?"
      answer: "AppEvent includes: themechange, localechange, formatchange, reset, dragstart, dragend, dragcancel, documentIdAvailable, documentLinkAvailable, documentPublishedLinkAvailable, documentTitleChange, and documentExportAllowedChange."
---

# addOnUISdk.constants

Complete technical specification for all Add-on UI SDK constants.

For practical examples, usage patterns, and getting started guide, see the [Add-on UI SDK Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md).

## Import Quick Reference

Most constants support dual access - you can import them OR use `addOnUISdk.constants.*`.

However, these four constants are named exports only and must be imported:

- [`AppEvent`](#appevent), [`ColorPickerEvent`](#colorpickerevent), [`SupportedMimeTypes`](#supportedmimetypes), [`EntrypointType`](#entrypointtype)
- Import them with `import { AppEvent, ColorPickerEvent, SupportedMimeTypes, EntrypointType } from "https://express.adobe.com/static/add-on-sdk/sdk.js";`
- Attempting to access these through `addOnUISdk.constants.*` will return `undefined`

For detailed usage examples and patterns, see the [Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md#import-patterns).

## Constants Reference

Complete technical specifications organized by functional category.

<InlineAlert slots="text" variant="info"/>

Constants are equal to their variable name as a string (e.g., `ButtonType.primary` equals `"primary"`).

### BitRate

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

### BleedUnit

<InlineAlert slots="text" variant="info"/>

**Import**: `import { BleedUnit }` or `addOnUISdk.constants.BleedUnit`

Units for page bleed measurements.

| Value | Description |
|-------|-------------|
| `in` | Inch units |
| `mm` | Millimeter units |

### ButtonType

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ButtonType }` or `addOnUISdk.constants.ButtonType`

Types of buttons that can be pressed in modal dialogs.

| Value | Description |
|-------|-------------|
| `primary` | Primary button pressed |
| `secondary` | Secondary button pressed |
| `cancel` | Cancel button pressed |
| `close` | Dialog closed via ESC or close(X) button |

### AppEvent

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { AppEvent }` - Not available in `addOnUISdk.constants` object

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

### AuthorizationStatus

<InlineAlert slots="text" variant="info"/>

**Import**: `import { AuthorizationStatus }` or `addOnUISdk.constants.AuthorizationStatus`

OAuth authorization status values.

| Value | Description |
|-------|-------------|
| `authorized` | Authorization successful |
| `cancelled` | Authorization cancelled by user |
| `error` | Authorization error occurred |

### ColorPickerEvent

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { ColorPickerEvent }` - Not available in constants object

Custom events dispatched by the Color Picker component.

| Value | Event String | Description |
|-------|-------------|-------------|
| `colorChange` | `"colorpicker-color-change"` | Color selection changed |
| `close` | `"colorpicker-close"` | Color picker closed |

### ColorPickerPlacement

<InlineAlert slots="text" variant="info"/>

**Import**: `import { ColorPickerPlacement }` or `addOnUISdk.constants.ColorPickerPlacement`

Placement options for the color picker popover relative to anchor element.

| Value | Description |
|-------|-------------|
| `top` | Position above anchor |
| `bottom` | Position below anchor |
| `left` | Position to the left of anchor |
| `right` | Position to the right of anchor |

### DeviceClass

<InlineAlert slots="text" variant="info"/>

**Import**: `import { DeviceClass }` or `addOnUISdk.constants.DeviceClass`

Device form factors where the add-on is running.

| Value | Description |
|-------|-------------|
| `mobile` | Mobile phone |
| `tablet` | Tablet device |
| `desktop` | Desktop computer |

### DialogResultType

<InlineAlert slots="text" variant="info"/>

**Import**: `import { DialogResultType }` or `addOnUISdk.constants.DialogResultType`

Types of modal dialog results.

| Value | Description |
|-------|-------------|
| `alert` | Alert dialog result (simple dialogs) |
| `input` | Input dialog result |
| `custom` | Custom dialog result |

### EditorPanel

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

### ElementsTabs

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

### EntrypointType

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { EntrypointType }` - Not available in constants object

Types of add-on entry points (currently only panel is supported).

| Value | Description |
|-------|-------------|
| `panel` | Panel entry point |

### FieldType

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FieldType }` or `addOnUISdk.constants.FieldType`

Input field types supported in Simple Dialog.

| Value | Description |
|-------|-------------|
| `text` | Text input field |

### FileSizeLimitUnit

<InlineAlert slots="text" variant="info"/>

**Import**: `import { FileSizeLimitUnit }` or `addOnUISdk.constants.FileSizeLimitUnit`

Units for file size limits.

| Value | Description |
|-------|-------------|
| `KB` | Kilobytes |
| `MB` | Megabytes |

### FrameRate

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

### LinkOptions

<InlineAlert slots="text" variant="info"/>

**Import**: `import { LinkOptions }` or `addOnUISdk.constants.LinkOptions`

Types of document links that can be generated.

| Value | Description |
|-------|-------------|
| `document` | Link to the current document |
| `published` | Link to the published document |

### MediaTabs

<InlineAlert slots="text" variant="info"/>

**Import**: `import { MediaTabs }` or `addOnUISdk.constants.MediaTabs`

Tabs within the Editor's Media panel.

| Value | Description |
|-------|-------------|
| `video` | Video tab |
| `audio` | Audio tab |
| `photos` | Photos tab |

### PanelActionType

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PanelActionType }` or `addOnUISdk.constants.PanelActionType`

Types of actions that can be performed on Editor panels.

| Value | Description |
|-------|-------------|
| `search` | Perform search within the Editor panel |
| `navigate` | Perform navigation within the Editor panel |

### PlatformEnvironment

<InlineAlert slots="text" variant="info"/>

**Import**: `import { PlatformEnvironment }` or `addOnUISdk.constants.PlatformEnvironment`

Environment where the add-on is running.

| Value | Description |
|-------|-------------|
| `app` | Native app environment |
| `web` | Web browser environment |

### PlatformType

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

### Range

<InlineAlert slots="text" variant="info"/>

**Import**: `import { Range }` or `addOnUISdk.constants.Range`

Page range options for document renditions.

| Value | Description |
|-------|-------------|
| `currentPage` | Generate rendition for the current page |
| `entireDocument` | Generate rendition for all pages |
| `specificPages` | Generate rendition for specific pages |

### RenditionFormat

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

### RenditionIntent

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionIntent }` or `addOnUISdk.constants.RenditionIntent`

Intent for creating renditions (affects optimization).

| Value | Description |
|-------|-------------|
| `preview` | Intent to preview the content |
| `export` | Intent to export/download the content (default) |
| `print` | Intent to export and print the content (PDF optimized, not supported for MP4) |

### RenditionType

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RenditionType }` or `addOnUISdk.constants.RenditionType`

Type of rendition being created.

| Value | Description |
|-------|-------------|
| `page` | Page rendition (currently the only type) |

### RuntimeType

<InlineAlert slots="text" variant="info"/>

**Import**: `import { RuntimeType }` or `addOnUISdk.constants.RuntimeType`

Runtime type of the entrypoint creating the backend object.

| Value | Description |
|-------|-------------|
| `panel` | Add-on's iframe runtime (code running in `index.html`) |
| `script` | Add-on's document sandbox code (code running in `code.js`) |
| `dialog` | Currently open dialog code |

### SupportedMimeTypes

<InlineAlert slots="text" variant="warning"/>

**Import**: `import { SupportedMimeTypes }` - Not available in constants object

MIME types for original source assets that can be converted to PDF.

| Value | Description |
|-------|-------------|
| `docx` | Microsoft Word document |
| `gdoc` | Google Docs document |

### Variant

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

### VideoResolution

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

### By Use Case

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

## Related Resources

- [Add-on UI SDK Constants Guide](../../guides/learn/fundamentals/ui-sdk-constants.md) - Practical examples and usage patterns
- [Import Quick Reference](#import-quick-reference) - Fast lookup for import requirements
- [Import Generator](#import-generator) - Copy-paste ready import statements
