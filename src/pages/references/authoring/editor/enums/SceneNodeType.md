[@express-document-sdk](../overview.md) / SceneNodeType

# Enumeration: SceneNodeType

<InlineAlert slots="text" variant="warning"/>

*Do not depend on the literal string values of these constants*, as they may change. Always reference the enum identifiers in your code.

<InlineAlert slots="text" variant="warning"/>

*Additional node types may be added in the future.* If your code has different branches or cases depending on node type, always have a default/fallback case to handle any unknown values you may encounter.

## Table of contents

### Enumeration Members

- [artboard](SceneNodeType.md#artboard)
- [artworkRoot](SceneNodeType.md#artworkroot)
- [complexShape](SceneNodeType.md#complexshape)
- [ellipse](SceneNodeType.md#ellipse)
- [gridLayout](SceneNodeType.md#gridlayout)
- [group](SceneNodeType.md#group)
- [imageRectangle](SceneNodeType.md#imagerectangle)
- [line](SceneNodeType.md#line)
- [linkedAsset](SceneNodeType.md#linkedasset)
- [mediaContainer](SceneNodeType.md#mediacontainer)
- [page](SceneNodeType.md#page)
- [path](SceneNodeType.md#path)
- [polygon](SceneNodeType.md#polygon)
- [rectangle](SceneNodeType.md#rectangle)
- [text](SceneNodeType.md#text)

## Enumeration Members

### artboard

• **artboard** = ``"ab:Artboard"``

___

### artworkRoot

• **artworkRoot** = ``"ArtworkRoot"``

___

### complexShape

• **complexShape** = ``"ComplexShape"``

Type of ComplexShapeNode, representing a complex prepackaged shape that appears as a leaf node in the UI

___

### ellipse

• **ellipse** = ``"Ellipse"``

___

### gridLayout

• **gridLayout** = ``"GridLayout"``

Type of GridLayoutNode represents a grid layout in the scenegraph used to create a layout grid that other content can be placed into

___

### group

• **group** = ``"Group"``

___

### imageRectangle

• **imageRectangle** = ``"ImageRectangle"``

Type of MediaContainerNode's "media rectangle" child when it is holding an image

___

### line

• **line** = ``"Line"``

___

### linkedAsset

• **linkedAsset** = ``"LinkedAsset"``

___

### mediaContainer

• **mediaContainer** = ``"MediaContainer"``

Type of MediaContainerNode, representing the top-level container of the multi-node construct used to display images or video.

___

### page

• **page** = ``"Page"``

Type of PageNode

___

### path

• **path** = ``"Path"``

___

### polygon

• **polygon** = ``"artgr:Polygon"``

___

### rectangle

• **rectangle** = ``"Rectangle"``

___

### text

• **text** = ``"Text"``
