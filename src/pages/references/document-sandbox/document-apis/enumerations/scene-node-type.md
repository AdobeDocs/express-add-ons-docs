[@express-document-sdk](../overview.md) / SceneNodeType

# Enumeration: SceneNodeType

<InlineAlert slots="text" variant="warning"/>

*Do not depend on the literal string values of these constants*, as they may change. Always reference the enum identifiers in your code.

<InlineAlert slots="text" variant="warning"/>

*Additional node types may be added in the future.* If your code has different branches or cases depending on node type,
always have a default/fallback case to handle any unknown values you may encounter.

## Enumeration Members

### artboard

• **artboard**: `"ab:Artboard"`

<hr />

### artworkRoot

• **artworkRoot**: `"ArtworkRoot"`

<hr />

### complexShape

• **complexShape**: `"ComplexShape"`

Type of ComplexShapeNode, representing a complex prepackaged shape with fill and stroke, that appears as a leaf node in the UI

<hr />

### ellipse

• **ellipse**: `"Ellipse"`

<hr />

### gridCell

• **gridCell**: `"GridCell"`

Type of MediaContainerNode which is a child of a GridLayout, representing one of the Grid's cells

<hr />

### gridLayout

• **gridLayout**: `"GridLayout"`

Type of GridLayoutNode represents a grid layout in the scenegraph used to create a layout grid that other content can be placed into

<hr />

### group

• **group**: `"Group"`

<hr />

### imageRectangle

• **imageRectangle**: `"ImageRectangle"`

Type of MediaContainerNode's "media rectangle" child when it is holding an image

<hr />

### line

• **line**: `"Line"`

<hr />

### linkedAsset

• **linkedAsset**: `"LinkedAsset"`

<hr />

### mediaContainer

• **mediaContainer**: `"MediaContainer"`

Type of MediaContainerNode, representing the top-level container of the multi-node construct used to display images or video.

<hr />

### page

• **page**: `"Page"`

Type of PageNode

<hr />

### path

• **path**: `"Path"`

<hr />

### polygon

• **polygon**: `"artgr:Polygon"`

<hr />

### rectangle

• **rectangle**: `"Rectangle"`

<hr />

### solidColorShape

• **solidColorShape**: `"SolidColorShape"`

Type of SolidColorShapeNode, representing a solid-color prepackaged shape that appears as a leaf node in the UI

<hr />

### strokeShape

• **strokeShape**: `"StrokeShape"`

Type of StrokeShapeNode, representing a stroke-only prepackaged shape that appears as a leaf node in the UI

<hr />

### text

• **text**: `"Text"`

Type of TextNode, representing a non-threaded text or a threaded text frame
