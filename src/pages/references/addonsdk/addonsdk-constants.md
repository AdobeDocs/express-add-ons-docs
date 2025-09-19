# addOnUISdk.constants

This reference provides the complete technical specification for all constants used throughout the Add-on UI SDK, including:

- Constants available in `addOnUISdk.constants.*` (dual access)
- Constants available only as named exports (import required)

For practical examples and use cases, see the [Using Constants Guide](../../guides/learn/platform_concepts/ui-sdk-constants.md).

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

This section provides the complete technical specification for all Add-on UI SDK constants, organized by functional category. For practical examples and usage patterns, see the [Using Constants Guide](../../guides/learn/platform_concepts/ui-sdk-constants.md).

## Developer Tips

<InlineAlert slots="text" variant="success"/>

**Quick Start Tips:**

- **When in doubt, use named imports** - they work for ALL constants
- **Copy import statements** from the [Import Generator](#import-generator) above
- **Never guess** - check if constants are import-required before using
- **Use TypeScript** for compile-time validation and better IDE support

## Constants

<table columnWidths="30,20,60" class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Name</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>BitRate</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>number</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Bit rate in bits per second.</p>
        <ul>
            <li><strong>mbps4</strong></li><pre>4000000</pre>
            <li><strong>mbps8</strong></li><pre>8000000</pre>
            <li><strong>mbps10</strong></li><pre>10000000</pre>
            <li><strong>mbps12</strong></li><pre>12000000</pre>
            <li><strong>mbps15</strong></li><pre>15000000</pre>
            <li><strong>mbps25</strong></li><pre>25000000</pre>
            <li><strong>mbps50</strong></li><pre>50000000</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>BleedUnit</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Units for the page bleed.</p>
        <ul>
          <li><strong>"in" (`Inch`)</strong></li>Inch units.
          <li><strong>"mm" (`Millimeter`)</strong></li>Millimeter units.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ButtonType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of the button pressed in a dialog. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>primary</strong></li>Primary button pressed.
          <li><strong>secondary</strong></li>Secondary button pressed.
          <li><strong>cancel</strong></li>Cancel button pressed.
          <li><strong>close</strong></li>Dialog closed via ESC or close(X) button.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ColorPickerEvent</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Custom events dispatched by the Color Picker. <strong>Named export only - not available in constants object.</strong></p>
        <ul>
          <li><strong>colorChange</strong></li><pre>"colorpicker-color-change"</pre>
          <li><strong>close</strong></li><pre>"colorpicker-close"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ColorPickerPlacement</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Placement of the color picker popover with respect to the anchor element. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>top</strong></li><pre>"top"</pre>
        <li><strong>bottom</strong></li><pre>"bottom"</pre>
        <li><strong>left</strong></li><pre>"left"</pre>
        <li><strong>right</strong></li><pre>"right"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>DialogResultType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of modal dialog result.</p>
        <ul>
          <li><strong>alert</strong></li>Alert dialog result (simple dialogs all return this).
          <li><strong>input</strong></li>Input dialog result.
          <li><strong>custom</strong></li>Custom dialog result.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>EditorPanel</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The Adobe Express Editor panel to be opened.</p>
        <ul>
          <li><strong>search</strong></li>Editor Search panel.
          <li><strong>yourStuff</strong></li>Editor Your stuff panel.
          <li><strong>templates</strong></li>Editor Templates panel.
          <li><strong>media</strong></li>Editor Media panel.
          <li><strong>text</strong></li>Editor Text panel.
          <li><strong>elements</strong></li>Editor Elements panel.
          <li><strong>grids</strong></li>Editor Grids panel.
          <li><strong>brands</strong></li>Editor Brands panel.
          <li><strong>addOns</strong></li>Editor Add-ons panel.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ElementsTabs</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Tabs in the Editor's Elements panel.</p>
        <ul>
          <li><strong>designAssets</strong></li>Design assets tab.
          <li><strong>backgrounds</strong></li>Backgrounds tab.
          <li><strong>shapes</strong></li>Shapes tab.
          <li><strong>stockIcons</strong></li>Icons tab.
          <li><strong>charts</strong></li>Charts tab.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>FileSizeLimitUnit</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Unit of the file size limit.</p>
        <ul>
          <li><strong>KB</strong></li><pre>"KB"</pre>
          <li><strong>MB</strong></li><pre>"MB"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>FrameRate</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>number</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Frame rate in frames per second.</p>
        <ul>
            <li><strong>fps23_976</strong></li><pre>23.976</pre>
            <li><strong>fps24</strong></li><pre>24</pre>
            <li><strong>fps25</strong></li><pre>25</pre>
            <li><strong>fps29_97</strong></li><pre>29.97</pre>
            <li><strong>fps30</strong></li><pre>30</pre>
            <li><strong>fps60</strong></li><pre>60</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>LinkOptions</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of link</p>
        <ul>
          <li><strong>document</strong></li>Link to the current document.
          <li><strong>published</strong></li>Link to the published document.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>MediaTabs</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Tabs in the Editor's Media panel.</p>
        <ul>
          <li><strong>video</strong></li>Video tab.
          <li><strong>audio</strong></li>Audio tab.
          <li><strong>photos</strong></li>Photos tab.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>PanelActionType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Types of actions that can be performed on Editor panels.</p>
        <ul>
          <li><strong>search</strong></li>Action type to perform search within the Editor panel.
          <li><strong>navigate</strong></li>Action type to perform navigation within the Editor panel.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Range</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Rendition page range. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>currentPage</strong></li> Generate rendition for the current page
          <li><strong>entireDocument</strong></li>Generate rendition for all pages
          <li><strong>specificPages</strong></li>Generate rendition for specific pages
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionFormat</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Required output format of the rendition. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>jpg</strong></li><pre>"image/jpeg"</pre>
          <li><strong>png</strong></li><pre>"image/png"</pre>
          <li><strong>mp4</strong></li><pre>"video/mp4"</pre>
          <li><strong>pdf</strong></li><pre>"application/pdf"</pre>
          <li><strong>pptx</strong></li><pre>"application/vnd.openxmlformats-officedocument.presentationml.presentation"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionIntent</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">  
        <p>The intent to set for creating the rendition. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>preview</strong></li>Intent to preview the content.
          <li><strong>export</strong></li>Intent to export/download the content (default).
          <li><strong>print</strong></li>Intent to export and print the content **Note:** For `pdf` format, a print optimized pdf is generated. This option is not supported for `mp4` format.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of rendition. Currently returns "page".</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RuntimeType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Runtime type of the entrypoint creating this backend object.
        <ul>
          <li><strong>panel</strong></li>add-on's iframe runtime, ie: code running in <b>index.html</b>
          <li><strong>script</strong></li>add-on's document sandbox code ie: code running in <b>code.js</b>
          <li><strong>dialog</strong></li>currently open dialog code
        </ul>
        </p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Variant</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Types of dialog variants supported. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>confirmation</strong></li>Ask a user to confirm an action.
          <li><strong>information</strong></li>Share information for user to acknowledge.
          <li><strong>warning</strong></li>Share information that a user needs to consider before proceeding.
          <li><strong>destructive</strong></li>Tell a user that if they proceed with an action, it may impact their data in a negative way.
          <li><strong>error</strong></li>Communicate critical issue that a user needs to resolve before proceeding.
          <li><strong>input</strong></li>Ask a user to provide some inputs.
          <li><strong>custom</strong></li>A dialog that can render complex forms and content.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>VideoResolution</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Video resolution options for the mp4 renditions.</p>
        <ul>
          <li><strong>sd480p</strong></li><pre>"480p"</pre>
          <li><strong>hd720p</strong></li><pre>"720p"</pre>
          <li><strong>fhd1080p</strong></li><pre>"1080p"</pre>
          <li><strong>qhd1440p</strong></li><pre>"1440p"</pre>
          <li><strong>uhd2160p</strong></li><pre>"2160p"</pre>
          <li><strong>custom</strong></li>Custom resolution
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AppEvent</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Events dispatched by the Add-on SDK. <strong>Named export only - not available in constants object.</strong></p>
        <ul>
          <li><strong>documentIdAvailable</strong></li>Document ID becomes available
          <li><strong>documentTitleChange</strong></li>Document title changes
          <li><strong>documentLinkAvailable</strong></li>Document link becomes available
          <li><strong>documentPublishedLinkAvailable</strong></li>Published document link becomes available
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AuthorizationStatus</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>OAuth authorization status values. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>authorized</strong></li>Authorization successful
          <li><strong>cancelled</strong></li>Authorization cancelled by user
          <li><strong>error</strong></li>Authorization error occurred
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>SupportedMimeTypes</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>MIME types for original source assets converted to PDF. <strong>Named export only - not available in constants object.</strong></p>
        <ul>
          <li><strong>docx</strong></li><pre>"docx"</pre>
          <li><strong>gdoc</strong></li><pre>"gdoc"</pre>
        </ul>
    </td>
</tr>

<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>PdfReturnUrlType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Specifies the type of URL returned for PDF rendition export. <strong>Named export only - not available in constants object.</strong></p>
        <ul>
          <li><strong>cdnUrl</strong></li><pre>"cdnUrl"</pre>
          <li><strong>jumpUrl</strong></li><pre>"jumpUrl"</pre>
        </ul>
    </td>
</tr>

<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>FieldType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of input field supported in Simple Dialog. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>text</strong></li><pre>"text"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>PlatformEnvironment</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Denotes the current environment where the add-on is running. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>app</strong></li><pre>"app"</pre>
          <li><strong>web</strong></li><pre>"web"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>DeviceClass</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Denotes the device class/form factor where the add-on is running. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>mobile</strong></li><pre>"mobile"</pre>
          <li><strong>tablet</strong></li><pre>"tablet"</pre>
          <li><strong>desktop</strong></li><pre>"desktop"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>PlatformType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Denotes the specific platform/operating system where the add-on is running. <strong>Dual access: both named export and constants object.</strong></p>
        <ul>
          <li><strong>iOS</strong></li><pre>"ios"</pre>
          <li><strong>iPadOS</strong></li><pre>"ipad"</pre>
          <li><strong>chromeOS</strong></li><pre>"chromeOS"</pre>
          <li><strong>android</strong></li><pre>"android"</pre>
          <li><strong>chromeBrowser</strong></li><pre>"chromeBrowser"</pre>
          <li><strong>firefoxBrowser</strong></li><pre>"firefoxBrowser"</pre>
          <li><strong>edgeBrowser</strong></li><pre>"edgeBrowser"</pre>
          <li><strong>samsungBrowser</strong></li><pre>"samsumgBrowser"</pre> <em>(Note: Contains typo in SDK)</em>
          <li><strong>safariBrowser</strong></li><pre>"safariBrowser"</pre>
          <li><strong>unknown</strong></li><pre>"unknown"</pre>
        </ul>
    </td>
</tr>
</tbody>
</table>
