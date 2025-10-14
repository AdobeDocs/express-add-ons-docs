[@express-document-sdk](../overview.md) / SceneNodeType

# Enumeration: SceneNodeType

<InlineAlert slots="text" variant="warning"/>

_Do not depend on the literal string values of these constants_, as they may change. Always reference the enum identifiers in your code.

<InlineAlert slots="text" variant="warning"/>

_Additional node types may be added in the future._ If your code has different branches or cases depending on node type,
always have a default/fallback case to handle any unknown values you may encounter.

## Enumeration Members

### artboard

• **artboard**: `"ab:Artboard"`

<HorizontalLine />

### artworkRoot

• **artworkRoot**: `"ArtworkRoot"`

<HorizontalLine />

### complexShape

• **complexShape**: `"ComplexShape"`

Type of ComplexShapeNode, representing a complex prepackaged shape with fill and stroke, that appears as a leaf node in the UI

<HorizontalLine />

### ellipse

• **ellipse**: `"Ellipse"`

<HorizontalLine />

### gridCell

• **gridCell**: `"GridCell"`

Type of MediaContainerNode which is a child of a GridLayout, representing one of the Grid's cells

<HorizontalLine />

### gridLayout

• **gridLayout**: `"GridLayout"`

Type of GridLayoutNode represents a grid layout in the scenegraph used to create a layout grid that other content can be placed into

<HorizontalLine />

### group

• **group**: `"Group"`

<HorizontalLine />

### imageRectangle

• **imageRectangle**: `"ImageRectangle"`

Type of MediaContainerNode's "media rectangle" child when it is holding an image

<HorizontalLine />

### line

• **line**: `"Line"`

<HorizontalLine />

### linkedAsset

• **linkedAsset**: `"LinkedAsset"`

<HorizontalLine />

### mediaContainer

• **mediaContainer**: `"MediaContainer"`

Type of MediaContainerNode, representing the top-level container of the multi-node construct used to display images or video.

<HorizontalLine />

### page

• **page**: `"Page"`

Type of PageNode

<HorizontalLine />

### path

• **path**: `"Path"`

<HorizontalLine />

### polygon

• **polygon**: `"artgr:Polygon"`

<HorizontalLine />

### rectangle

• **rectangle**: `"Rectangle"`

<HorizontalLine />

### solidColorShape

• **solidColorShape**: `"SolidColorShape"`

Type of SolidColorShapeNode, representing a solid-color prepackaged shape that appears as a leaf node in the UI

<HorizontalLine />

### strokeShape

• **strokeShape**: `"StrokeShape"`

Type of StrokeShapeNode, representing a stroke-only prepackaged shape that appears as a leaf node in the UI

<HorizontalLine />

### text

• **text**: `"Text"`

Type of TextNode, representing a non-threaded text or a threaded text frame

<HorizontalLine />

### unknownMediaRectangle

• **unknownMediaRectangle**: `"UnknownMediaRectangle"`

Type of MediaContainerNode's "media rectangle" child when it is holding an unknown media type
