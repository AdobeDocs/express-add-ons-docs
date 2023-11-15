[@add-on-hlapi-sdk](../overview.md) / SceneNodeType

# Enumeration: SceneNodeType

<InlineAlert slots="text" variant="warning"/>
*Do not depend on the literal string values of these constants*, as they may change. Always reference the enum identifiers in your code.

<InlineAlert slots="text" variant="warning"/>
*Additional node types may be added in the future.* If your code has different branches or cases depending on node type,
always have a default/fallback case to handle any unknown values you may encounter.

## Table of contents

### Enumeration Members

- [artboard](SceneNodeType.md#artboard)
- [artworkRoot](SceneNodeType.md#artworkRoot)
- [complexShape](SceneNodeType.md#complexShape)
- [ellipse](SceneNodeType.md#ellipse)
- [gridLayout](SceneNodeType.md#gridLayout)
- [group](SceneNodeType.md#group)
- [imageRectangle](SceneNodeType.md#imageRectangle)
- [line](SceneNodeType.md#line)
- [linkedAsset](SceneNodeType.md#linkedAsset)
- [mediaContainer](SceneNodeType.md#mediaContainer)
- [page](SceneNodeType.md#page)
- [path](SceneNodeType.md#path)
- [polygon](SceneNodeType.md#polygon)
- [rectangle](SceneNodeType.md#rectangle)
- [text](SceneNodeType.md#text)

## Enumeration Members

### <a id="artboard" name="artboard"></a> artboard

• **artboard** = ``"ab:Artboard"``

___

### <a id="artworkRoot" name="artworkRoot"></a> artworkRoot

• **artworkRoot** = ``"ArtworkRoot"``

___

### <a id="complexShape" name="complexShape"></a> complexShape

• **complexShape** = ``"ComplexShape"``

Type of ComplexShapeNode, representing a complex prepackaged shape that appears as a leaf node in the UI

___

### <a id="ellipse" name="ellipse"></a> ellipse

• **ellipse** = ``"Ellipse"``

___

### <a id="gridLayout" name="gridLayout"></a> gridLayout

• **gridLayout** = ``"GridLayout"``

Type of GridLayoutNode represents a grid layout in the scenegraph used to create a layout grid that other content can be placed into

___

### <a id="group" name="group"></a> group

• **group** = ``"Group"``

___

### <a id="imageRectangle" name="imageRectangle"></a> imageRectangle

• **imageRectangle** = ``"ImageRectangle"``

Type of MediaContainerNode's "media rectangle" child when it is holding an image

___

### <a id="line" name="line"></a> line

• **line** = ``"Line"``

___

### <a id="linkedAsset" name="linkedAsset"></a> linkedAsset

• **linkedAsset** = ``"LinkedAsset"``

___

### <a id="mediaContainer" name="mediaContainer"></a> mediaContainer

• **mediaContainer** = ``"MediaContainer"``

Type of MediaContainerNode, representing the top-level container of the multi-node construct used to display images or video.

___

### <a id="page" name="page"></a> page

• **page** = ``"Page"``

Type of PageNode

___

### <a id="path" name="path"></a> path

• **path** = ``"Path"``

___

### <a id="polygon" name="polygon"></a> polygon

• **polygon** = ``"artgr:Polygon"``

___

### <a id="rectangle" name="rectangle"></a> rectangle

• **rectangle** = ``"Rectangle"``

___

### <a id="text" name="text"></a> text

• **text** = ``"Text"``
