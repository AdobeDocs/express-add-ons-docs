---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Enumeration: SceneNodeType

&lt;InlineAlert slots="text" variant="warning"/&gt;

*Do not depend on the literal string values of these constants*, as they may change. Always reference the enum identifiers in your code.

&lt;InlineAlert slots="text" variant="warning"/&gt;

*Additional node types may be added in the future.* If your code has different branches or cases depending on node type,
always have a default/fallback case to handle any unknown values you may encounter.

## Enumeration Members

| Enumeration Member | Value | Description |
| ------ | ------ | ------ |
| `line` | `"Line"` | - |
| `rectangle` | `"Rectangle"` | - |
| `ellipse` | `"Ellipse"` | - |
| `path` | `"Path"` | - |
| `linkedAsset` | `"LinkedAsset"` | - |
| `group` | `"Group"` | - |
| `artboard` | `"ab:Artboard"` | - |
| `polygon` | `"artgr:Polygon"` | - |
| `artworkRoot` | `"ArtworkRoot"` | - |
| `mediaContainer` | `"MediaContainer"` | Type of MediaContainerNode, representing the top-level container of the multi-node construct used to display images or video. |
| `imageRectangle` | `"ImageRectangle"` | Type of MediaContainerNode's "media rectangle" child when it is holding an image |
| `unknownMediaRectangle` | `"UnknownMediaRectangle"` | Type of MediaContainerNode's "media rectangle" child when it is holding an unknown media type |
| `page` | `"Page"` | Type of PageNode |
| `complexShape` | `"ComplexShape"` | Type of ComplexShapeNode, representing a complex prepackaged shape with fill and stroke, that appears as a leaf node in the UI |
| `solidColorShape` | `"SolidColorShape"` | Type of SolidColorShapeNode, representing a solid-color prepackaged shape that appears as a leaf node in the UI |
| `strokeShape` | `"StrokeShape"` | Type of StrokeShapeNode, representing a stroke-only prepackaged shape that appears as a leaf node in the UI |
| `gridCell` | `"GridCell"` | Type of MediaContainerNode which is a child of a GridLayout, representing one of the Grid's cells |
| `gridLayout` | `"GridLayout"` | Type of GridLayoutNode represents a grid layout in the scenegraph used to create a layout grid that other content can be placed into |
| `text` | `"Text"` | Type of TextNode, representing a non-threaded text or a threaded text frame |
