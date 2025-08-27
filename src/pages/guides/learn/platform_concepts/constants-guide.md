## Add-on UI SDK Constants

### **Dialog & UI Interaction Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`Variant`** | `confirmation`, `information`, `warning`, `destructive`, `error`, `input`, `custom` | Dialog types for `showModalDialog()` | `addOnUISdk.app.showModalDialog({variant: Variant.error})` |
| **`ButtonType`** | `primary`, `secondary`, `cancel`, `close` | Button types in dialog responses | Check `result.buttonType === ButtonType.primary` |
| **`FieldType`** | `text` | Input field types for input dialogs | Used in dialog field configuration |
| **`DialogResultType`** | `alert`, `input`, `custom` | Types of dialog results returned | Determine result structure type |

### **Platform & Environment Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`PlatformType`** | `iOS`, `iPadOS`, `chromeOS`, `android`, `chromeBrowser`, `firefoxBrowser`, `edgeBrowser`, `samsungBrowser`, `safariBrowser`, `unknown` | Platform identification | `platform.platformType === PlatformType.iOS` |
| **`PlatformEnvironment`** | `app`, `web` | Runtime environment type | Check if running in app vs web |
| **`DeviceClass`** | `mobile`, `tablet`, `desktop` | Device category | Responsive design decisions |
| **`RuntimeType`** | `panel`, `dialog`, `documentSandbox`, `command` | Add-on runtime types | Communication API configuration |

### **Document Export & Rendering Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`Range`** | `currentPage`, `entireDocument`, `specificPages` | Rendition page ranges | `createRenditions({range: Range.currentPage})` |
| **`RenditionFormat`** | `png`, `jpg`, `mp4`, `pdf`, `pptx` | Export file formats | Specify output format for renditions |
| **`RenditionType`** | `page` | Type of rendition | Document export configuration |
| **`RenditionIntent`** | `export`, `preview`, `print` | Purpose of rendition | Optimize rendering for use case |

### **Video & Media Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`VideoResolution`** | `sd480p`, `hd720p`, `fhd1080p`, `qhd1440p`, `uhd2160p`, `custom` | Video export resolutions | Video rendition quality settings |
| **`FrameRate`** | `fps23_976`, `fps24`, `fps25`, `fps29_97`, `fps30`, `fps60` | Video frame rates | Video export frame rate |
| **`BitRate`** | `mbps4` through `mbps50` | Video bit rates in bps | Video compression settings |
| **`BleedUnit`** | `Inch`, `Millimeter` | Print bleed units | Print preparation |

### **Editor Panel Navigation Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`EditorPanel`** | `search`, `yourStuff`, `templates`, `media`, `text`, `elements`, `grids`, `brands`, `addOns` | Express editor panels | `openEditorPanel(EditorPanel.media)` |
| **`MediaTabs`** | `video`, `audio`, `photos` | Media panel tabs | Navigate to specific media type |
| **`ElementsTabs`** | `designAssets`, `backgrounds`, `shapes`, `stockIcons`, `charts` | Elements panel tabs | Navigate to specific element type |
| **`PanelActionType`** | `search`, `navigate` | Panel action types | Panel interaction configuration |

### **Color Picker Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`ColorPickerPlacement`** | `top`, `bottom`, `left`, `right` | Color picker positioning | `showColorPicker(element, {placement: ColorPickerPlacement.top})` |

### **File Management Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`FileSizeLimitUnit`** | `KB`, `MB` | File size limit units | File upload constraints |

### **OAuth & Authentication Constants**

| Constant | Values | Description | Usage |
|----------|--------|-------------|-------|
| **`AuthorizationStatus`** | (imported from @hz/wxp-oauth) | OAuth authorization states | Check authorization status |

### **Usage Examples**

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

### **Notes for Developers**

- **All constants are available as named exports** from the Add-on UI SDK
- **Use constants instead of string literals** for type safety and future compatibility
- **Some constants are marked as `@internal`** (like `ToastVariant`, `FeatureType`, `SettingType`) and are not included as they're for internal/privileged use only
- **Platform detection is crucial** for responsive add-on design across different devices and browsers

These constants provide type-safe ways to interact with all the major Add-on UI SDK features that third-party developers commonly use!