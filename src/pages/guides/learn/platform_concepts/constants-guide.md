# Add-on UI SDK Constants

The Add-on UI SDK constants provide type-safe ways to interact with all the major Add-on UI SDK features developers commonly use. This includes:

- Constants available in `addOnUISdk.constants.*`
- Constants available only as named exports (specific import required)

See the [Import Patterns](#import-patterns) section for details on how to access each type.

<InlineAlert slots="text" variant="info"/>

The constants listed in this reference are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary". 

## **Dialog & UI Interaction Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`Variant`** | `confirmation`, `information`, `warning`, `destructive`, `error`, `input`, `custom` | Dialog types for `showModalDialog()` | `addOnUISdk.app.showModalDialog({variant: Variant.error})` |
| **`ButtonType`** | `primary`, `secondary`, `cancel`, `close` | Button types in dialog responses | Check `result.buttonType === ButtonType.primary` |
| **`FieldType`** | `text` | Input field types for input dialogs | Used in dialog field configuration |
| **`DialogResultType`** | `alert`, `input`, `custom` | Types of dialog results returned | Determine result structure type |

## **Platform & Environment Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`PlatformType`** | `iOS`, `iPadOS`, `chromeOS`, `android`, `chromeBrowser`, `firefoxBrowser`, `edgeBrowser`, `samsungBrowser`, `safariBrowser`, `unknown` | Platform identification | `platform.platformType === PlatformType.iOS` |
| **`PlatformEnvironment`** | `app`, `web` | Runtime environment type | Check if running in app vs web |
| **`DeviceClass`** | `mobile`, `tablet`, `desktop` | Device category | Responsive design decisions |
| **`RuntimeType`** | `panel`, `dialog`, `documentSandbox`, `command` | Add-on runtime types | Communication API configuration |

## **Document Export & Rendering Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`Range`** | `currentPage`, `entireDocument`, `specificPages` | Rendition page ranges | `createRenditions({range: Range.currentPage})` |
| **`RenditionFormat`** | `png`, `jpg`, `mp4`, `pdf`, `pptx` | Export file formats | Specify output format for renditions |
| **`RenditionType`** | `page` | Type of rendition | Document export configuration |
| **`RenditionIntent`** | `export`, `preview`, `print` | Purpose of rendition | Optimize rendering for use case |

## **Video & Media Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`VideoResolution`** | `sd480p`, `hd720p`, `fhd1080p`, `qhd1440p`, `uhd2160p`, `custom` | Video export resolutions | Video rendition quality settings |
| **`FrameRate`** | `fps23_976`, `fps24`, `fps25`, `fps29_97`, `fps30`, `fps60` | Video frame rates | Video export frame rate |
| **`BitRate`** | `mbps4` through `mbps50` | Video bit rates in bps | Video compression settings |
| **`BleedUnit`** | `Inch`, `Millimeter` | Print bleed units | Print preparation |

## **Editor Panel Navigation Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`EditorPanel`** | `search`, `yourStuff`, `templates`, `media`, `text`, `elements`, `grids`, `brands`, `addOns` | Express editor panels | `openEditorPanel(EditorPanel.media)` |
| **`MediaTabs`** | `video`, `audio`, `photos` | Media panel tabs | Navigate to specific media type |
| **`ElementsTabs`** | `designAssets`, `backgrounds`, `shapes`, `stockIcons`, `charts` | Elements panel tabs | Navigate to specific element type |
| **`PanelActionType`** | `search`, `navigate` | Panel action types | Panel interaction configuration |

## **Color Picker Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`ColorPickerPlacement`** | `top`, `bottom`, `left`, `right` | Color picker positioning | `showColorPicker(element, {placement: ColorPickerPlacement.top})` |

## **File Management Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`FileSizeLimitUnit`** | `KB`, `MB` | File size limit units | File upload constraints |

## **OAuth & Authentication Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`AuthorizationStatus`** | (imported from @hz/wxp-oauth) | OAuth authorization states | Check authorization status |

## **Usage Examples**

```typescript
import addOnUISdk, { 
    Variant, 
    PlatformType, 
    RenditionFormat, 
    EditorPanel 
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Dialog with error variant
await addOnUISdk.app.showModalDialog({
    variant: Variant.error,
    title: "Upload Failed",
    description: "File size exceeds limit"
});

// Platform-specific behavior
const platform = await addOnUISdk.app.getCurrentPlatform();
if (platform.platformType === PlatformType.iOS) {
    // iOS-specific handling
}

// Export document as PNG
await addOnUISdk.app.document.createRenditions({
    format: RenditionFormat.png,
    range: Range.currentPage
});

// Navigate to media panel
addOnUISdk.app.ui.openEditorPanel(EditorPanel.media);
```

## Notes for Developers

- **Some constants are available as named exports** from the Add-on UI SDK
- **Use constants instead of string literals** for type safety and future compatibility

### Import Patterns

Adobe Express Add-on SDK constants are available through different import patterns depending on the constant type. Understanding these patterns is essential for avoiding runtime errors.

#### Named Exports (Import Required)

These constants are **only available as named exports** and must be imported explicitly. They are **NOT** available through `addOnUISdk.constants.*`:

```javascript
import addOnUISdk, { 
  AppEvent, 
  ColorPickerEvent, 
  SupportedMimeTypes,
  EntrypointType,
  PdfReturnUrlType
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// ✅ Correct usage
const docxMimeType = SupportedMimeTypes.docx;
const colorChangeEvent = ColorPickerEvent.colorChange;

// ❌ Will NOT work - these are not in the constants object
const docxMimeType = addOnUISdk.constants.SupportedMimeTypes.docx; // undefined
```

#### Dual Access Constants

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
