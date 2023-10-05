[@add-on-hlapi-sdk](../overview.md) / SceneNodeTypeValueID

# Enumeration: SceneNodeTypeValueID

<InlineAlert slots="text" variant="warning"/>
*Do not depend on the literal string values of these constants*, as they may change. Always reference the enum identifiers in your code.

<InlineAlert slots="text" variant="warning"/>
*Additional node types may be added in the future.* If your code has different branches or cases depending on node type,
always have a default/fallback case to handle any unknown values you may encounter.

## Table of contents

### Enumeration Members

- [artboard](SceneNodeTypeValueID.md#artboard)
- [artworkRoot](SceneNodeTypeValueID.md#artworkRoot)
- [ellipse](SceneNodeTypeValueID.md#ellipse)
- [group](SceneNodeTypeValueID.md#group)
- [imageRectangle](SceneNodeTypeValueID.md#imageRectangle)
- [line](SceneNodeTypeValueID.md#line)
- [linkedAsset](SceneNodeTypeValueID.md#linkedAsset)
- [mediaContainer](SceneNodeTypeValueID.md#mediaContainer)
- [page](SceneNodeTypeValueID.md#page)
- [path](SceneNodeTypeValueID.md#path)
- [polygon](SceneNodeTypeValueID.md#polygon)
- [rectangle](SceneNodeTypeValueID.md#rectangle)
- [text](SceneNodeTypeValueID.md#text)

## Enumeration Members

### artboard

• **artboard** = ``"ab:Artboard"``

___

### artworkRoot

• **artworkRoot** = ``"ArtworkRoot"``

___

### ellipse

• **ellipse** = ``"Ellipse"``

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
