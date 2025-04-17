# addOnUISdk.constants

A set of constants used throughout the add-on SDK. These constants are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Constants

| **Name**               | **Type** | **Description**                                                                                                                |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `BleedUnit`            | string   | Units for the page bleed:• **"in"** (Inch units)• **"mm"** (Millimeter units)                                                  |
| `ButtonType`           | string   | Type of the button pressed in a dialog:• **primary**• **secondary**• **cancel**• **close**                                     |
| `ColorPickerEvents`    | string   | Events from the Color Picker:• **colorChange** — `"colorpicker-color-change"`• **close** — `"colorpicker-close"`               |
| `ColorPickerPlacement` | string   | Placement of color picker popover:• **top**• **bottom**• **left**• **right**                                                   |
| `DialogResultType`     | string   | Type of dialog result:• **alert**• **input**• **custom**                                                                       |
| `EditorPanel`          | string   | Editor panels:• **search**, **yourStuff**, **templates**, **media**, **text**, **elements**, **grids**, **brands**, **addOns** |
| `ElementsTabs`         | string   | Tabs in Elements panel:• **designAssets**, **backgrounds**, **shapes**, **stockIcons**, **charts**                             |
| `LinkOptions`          | string   | Type of link:• **document** — Link to the current document                                                                     |
| `MediaTabs`            | string   | Tabs in Media panel:• **video**, **audio**, **photos**                                                                         |
| `PanelActionType`      | string   | Actions on panels:• **search**, **navigate**                                                                                   |
| `Range`                | string   | Page range for rendition:• **currentPage**, **entireDocument**, **specificPages**                                              |
| `RenditionFormat`      | string   | Output format:• **jpg** — `"image/jpeg"`• **png** — `"image/png"`• **mp4** — `"video/mp4"`• **pdf** — `"application/pdf"`      |
| `RenditionIntent`      | string   | Intent for rendition:• **preview**• **export** (default)• **print** (not for mp4)                                              |
| `RenditionType`        | string   | Type of rendition:• Returns `"page"`                                                                                           |
| `RuntimeType`          | string   | Entrypoint runtime:• **panel** (iframe)• **script** (document sandbox)• **dialog**                                             |
| `Variant`              | string   | Dialog types:• **confirmation**, **information**, **warning**, **destructive**, **error**, **input**, **custom**               |
| `VideoResolution`      | string   | Video resolutions:• **sd480p** — `"480p"`• **hd720p** — `"720p"`• **fhd1080p** — `"1080p"`• **custom**                         |
