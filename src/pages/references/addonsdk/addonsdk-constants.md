# addOnUISdk.constants

A set of constants used throughout the add-on SDK. These constants are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Constants

| Name                | Type   | Description |
|---------------------|--------|-------------|
| `BleedUnit`       | string | Units for the page bleed. `"in"` (`Inch`): Inch units. `"mm"` (`Millimeter`): Millimeter units. |
| `ButtonType`      | string | The type of the button pressed in a dialog. `primary`: Primary button pressed. `secondary`: Secondary button pressed. `cancel`: Cancel button pressed. `close`: Dialog closed via ESC or close(X) button. |
| `ColorPickerEvent`| string | Custom events dispatched by the Color Picker. `colorChange`: `"colorpicker-color-change"` `close`: `"colorpicker-close"` |
| `ColorPickerPlacement` | string | Placement of the color picker popover. `top`: `"top"` `bottom`: `"bottom"` `left`: `"left"` `right`: `"right"` |
| `DialogResultType`| string | The type of modal dialog result. `alert`: Alert dialog result. `input`: Input dialog result. `custom`: Custom dialog result. |
| `EditorPanel`     | string | The Adobe Express Editor panel to be opened. `search`, `yourStuff`, `templates`, `media`, `text`, `elements`, `grids`, `brands`, `addOns` |
| `ElementsTabs`    | string | Tabs in the Editor's Elements panel. `designAssets`, `backgrounds`, `shapes`, `stockIcons`, `charts` |
| `LinkOptions`     | string | The type of link. `document`: Link to the current document. `published`: Link to the published document. |
| `MediaTabs`       | string | Tabs in the Editor's Media panel. `video`, `audio`, `photos` |
| `PanelActionType` | string | Types of actions on Editor panels. `search`: Perform search. `navigate`: Perform navigation. |
| `Range`           | string | Rendition page range. `currentPage`: Current page `entireDocument`: All pages `specificPages`: Specific pages |
| `RenditionFormat` | string | Output format of the rendition. `jpg`: `"image/jpeg"` `png`: `"image/png"` `mp4`: `"video/mp4"` `pdf`: `"application/pdf"` |
| `RenditionIntent` | string | Intent for creating the rendition. `preview`: Preview `export`: Export/download (default) `print`: Export and print (PDF only) |
| `RenditionType`   | string | The type of rendition. Currently returns `"page"`. |
| `RuntimeType`     | string | Runtime type of the entrypoint. `panel`: iframe runtime `script`: document sandbox `dialog`: open dialog code |
| `Variant`         | string | Types of dialog variants. `confirmation`, `information`, `warning`, `destructive`, `error`, `input`, `custom` |
| `VideoResolution` | string | Video resolution options for mp4 renditions. `sd480p`: `"480p"` `hd720p`: `"720p"` `fhd1080p`: `"1080p"` `custom`: Custom resolution |
