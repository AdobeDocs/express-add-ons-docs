# addOnUISdk.constants

A set of constants used throughout the add-on SDK. These constants are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Constants

| Name                | Type    | Description |
|---------------------|---------|-------------|
| `BitRate`           | number  | Bit rate in bits per second.  **mbps4**: `4000000`  **mbps8**: `8000000`  **mbps10**: `10000000`  **mbps12**: `12000000`  **mbps15**: `15000000`  **mbps25**: `25000000`  **mbps50**: `50000000` |
| `BleedUnit`         | string  | Units for the page bleed.  **"in" (`Inch`)**: Inch units  **"mm" (`Millimeter`)**: Millimeter units |
| `ButtonType`        | string  | The type of the button pressed in a dialog.  **primary**: Primary button pressed  **secondary**: Secondary button pressed  **cancel**: Cancel button pressed  **close**: Dialog closed via ESC or close(X) button |
| `ColorPickerEvent`  | string  | Custom events dispatched by the Color Picker.  **colorChange**: `"colorpicker-color-change"`  **close**: `"colorpicker-close"` |
| `ColorPickerPlacement` | string | Placement of the color picker popover with respect to the anchor element.  **top**: `"top"`  **bottom**: `"bottom"`  **left**: `"left"`  **right**: `"right"` |
| `DialogResultType`  | string  | The type of modal dialog result.  **alert**: Alert dialog result (simple dialogs all return this)  **input**: Input dialog result  **custom**: Custom dialog result |
| `EditorPanel`       | string  | The Adobe Express Editor panel to be opened.  **search**: Editor Search panel  **yourStuff**: Editor Your stuff panel  **templates**: Editor Templates panel  **media**: Editor Media panel  **text**: Editor Text panel  **elements**: Editor Elements panel  **grids**: Editor Grids panel  **brands**: Editor Brands panel  **addOns**: Editor Add-ons panel |
| `ElementsTabs`      | string  | Tabs in the Editor's Elements panel.  **designAssets**: Design assets tab  **backgrounds**: Backgrounds tab  **shapes**: Shapes tab  **stockIcons**: Icons tab  **charts**: Charts tab |
| `FileSizeLimitUnit` | string  | Unit of the file size limit.  **KB**: `"KB"`  **MB**: `"MB"` |
| `FrameRate`         | number  | Frame rate in frames per second.  **fps23_976**: `23.976`  **fps24**: `24`  **fps25**: `25`  **fps29_97**: `29.97`  **fps30**: `30`  **fps60**: `60` |
| `LinkOptions`       | string  | The type of link.  **document**: Link to the current document  **published**: Link to the published document |
| `MediaTabs`         | string  | Tabs in the Editor's Media panel.  **video**: Video tab  **audio**: Audio tab  **photos**: Photos tab |
| `PanelActionType`   | string  | Types of actions that can be performed on Editor panels.  **search**: Action type to perform search within the Editor panel  **navigate**: Action type to perform navigation within the Editor panel |
| `Range`             | string  | Rendition page range.  **currentPage**: Generate rendition for the current page  **entireDocument**: Generate rendition for all pages  **specificPages**: Generate rendition for specific pages |
| `RenditionFormat`   | string  | Required output format of the rendition.  **jpg**: `"image/jpeg"`  **png**: `"image/png"`  **mp4**: `"video/mp4"`  **pdf**: `"application/pdf"`  **pptx**: `"application/vnd.openxmlformats-officedocument.presentationml.presentation"` |
| `RenditionIntent`   | string  | The intent to set for creating the rendition.  **preview**: Intent to preview the content  **export**: Intent to export/download the content (default)  **print**: Intent to export and print the content (**Note:** For `pdf` format, a print optimized pdf is generated. This option is not supported for `mp4` format.) |
| `RenditionType`     | string  | The type of rendition. Currently returns `"page"`. |
| `RuntimeType`       | string  | Runtime type of the entrypoint creating this backend object.  **panel**: add-on's iframe runtime, ie: code running in `index.html`  **script**: add-on's document sandbox code ie: code running in `code.js`  **dialog**: currently open dialog code |
| `Variant`           | string  | Types of dialog variants supported.  **confirmation**: Ask a user to confirm an action  **information**: Share information for user to acknowledge  **warning**: Share information that a user needs to consider before proceeding  **destructive**: Tell a user that if they proceed with an action, it may impact their data in a negative way  **error**: Communicate critical issue that a user needs to resolve before proceeding  **input**: Ask a user to provide some inputs  **custom**: A dialog that can render complex forms and content |
| `VideoResolution`   | string  | Video resolution options for the mp4 renditions.  **sd480p**: `"480p"`  **hd720p**: `"720p"`  **fhd1080p**: `"1080p"`  **qhd1440p**: `"1440p"`  **uhd2160p**: `"2160p"`  **custom**: Custom resolution |
