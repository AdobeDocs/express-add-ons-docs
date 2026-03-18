**@express-document-sdk**

---

# @express-document-sdk

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [Constants](@hz/namespaces/Constants/overview.md) | - |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [EditorEvent](enumerations/EditorEvent.md) | This enum represents the supported editor events. |
| [ResizeBehavior](enumerations/ResizeBehavior.md) | An enum for controlling the behavior of [Node.resize](classes/Node.md#resize). |
| [ParagraphListType](enumerations/ParagraphListType.md) | Indicates list type: see [UnorderedListStyleInput](interfaces/UnorderedListStyleInput.md) and [OrderedListStyleInput](interfaces/OrderedListStyleInput.md). |
| [OrderedListNumbering](enumerations/OrderedListNumbering.md) | Numbering types used to display ordered lists: 1, A, a, I, i 01, 001. |
| [TextStyleSource](enumerations/TextStyleSource.md) | <InlineAlert slots="text" variant="warning"/> |
| [VisualEffectType](enumerations/VisualEffectType.md) | Visual effects that can be applied to a text node. |
| [CreateRenditionFormat](enumerations/CreateRenditionFormat.md) | <InlineAlert slots="text" variant="warning"/> |
| [SceneNodeType](enumerations/SceneNodeType.md) | <InlineAlert slots="text" variant="warning"/> |
| [BlendMode](enumerations/BlendMode.md) | <InlineAlert slots="text" variant="warning"/> |
| [StrokePosition](enumerations/StrokePosition.md) | <InlineAlert slots="text" variant="warning"/> |
| [FillType](enumerations/FillType.md) | <InlineAlert slots="text" variant="warning"/> |
| [ArrowHeadType](enumerations/ArrowHeadType.md) | <InlineAlert slots="text" variant="warning"/> |
| [TextAlignment](enumerations/TextAlignment.md) | <InlineAlert slots="text" variant="warning"/> |
| [FillRule](enumerations/FillRule.md) | <InlineAlert slots="text" variant="warning"/> |
| [StrokeType](enumerations/StrokeType.md) | <InlineAlert slots="text" variant="warning"/> |
| [TextLayout](enumerations/TextLayout.md) | <InlineAlert slots="text" variant="warning"/> |
| [TextScriptStyle](enumerations/TextScriptStyle.md) | Represents a text script style. |

## Classes

| Class | Description |
| ------ | ------ |
| [ArtboardList](classes/ArtboardList.md) | ArtboardList represents an ordered list of ArtboardNodes, which are the children of one [PageNode](classes/PageNode.md). If multiple artboards are present, each represents a keyframe "scene" in the page's animation timeline. |
| [ArtboardNode](classes/ArtboardNode.md) | An ArtboardNode represents the topmost container of visual content within a [PageNode](classes/PageNode.md). When a page contains multiple artboards, each represents a keyframe "scene" in the page's animation timeline. |
| [BaseNode](classes/BaseNode.md) | A "node" represents an object in the scenegraph, the document's visual content tree. This base class includes only the most fundamental nonvisual properties that even nodes near the top of the document structure share (such as PageNode). The more tangible visual content typically extends the richer Node class which extends BaseNode with additional properties. |
| [BitmapImage](classes/BitmapImage.md) | Represents a bitmap image resource. Use [Editor.loadBitmapImage](classes/Editor.md#loadbitmapimage) to create a BitmapImage, and then [Editor.createImageContainer](classes/Editor.md#createimagecontainer) to display it in the document by creating a MediaContainerNode structure. |
| [ColorUtils](classes/ColorUtils.md) | Utility methods for working with color values. |
| [ComplexShapeNode](classes/ComplexShapeNode.md) | A ComplexShapeNode is a complex prepackaged shape that appears as a leaf node in the UI, even if it is composed of multiple separate paths. |
| [Context](classes/Context.md) | Contains the user's current selection state, indicating the content they are focused on. |
| [Editor](classes/Editor.md) | Entry point for APIs that read or modify the document's content. |
| [EllipseNode](classes/EllipseNode.md) | An EllipseNode represents an ellipse or circle shape in the scenegraph. |
| [ExpressContext](classes/ExpressContext.md) | Contains The Express specific APIs related to the current selection state. |
| [ExpressEditor](classes/ExpressEditor.md) | Entry point for Express specific APIs that read or modify the document's content. |
| [ExpressRootNode](classes/ExpressRootNode.md) | An ExpressRootNode represents the root node of the document's "scenegraph" artwork tree. The root contains a collection of [pages](classes/ExpressRootNode.md#pages). Each page contains one or more artboards, which in turn hold all the visual content of the document. |
| [ExpressViewport](classes/ExpressViewport.md) | Represents the area of the canvas that is currently visible on-screen. |
| [FillableNode](classes/FillableNode.md) | Base class for a Node that can have its own fill and stroke. |
| [BaseFont](classes/BaseFont.md) | Represents a font that is able to be rendered within this document. However, the user may not have edit permissions for all such fonts. |
| [AvailableFont](classes/AvailableFont.md) | Font the current user has access or licensing permissions to create / edit content with. |
| [UnavailableFont](classes/UnavailableFont.md) | Font the current user does not have access or licensing permissions to create / edit content with. |
| [Fonts](classes/Fonts.md) | The Fonts class provides methods to work with fonts. |
| [ReadOnlyMask](classes/ReadOnlyMask.md) | A read-only view of a mask shape. |
| [GridCellNode](classes/GridCellNode.md) | A GridCellNode represents the media aspect of a grid cell. Unlike MediaContainerNodes, grid cells cannot be translated or rotated directly and can't modify a mask shape. This implementation translates and rotates the media rectangle child when those actions are applied. |
| [GridLayoutNode](classes/GridLayoutNode.md) | A GridLayoutNode represents a grid layout in the scenegraph. Currently, grids contain only images but in the future they may support other types of content as well. |
| [GroupNode](classes/GroupNode.md) | A GroupNode represents a Group object in the scenegraph, which has a collection of generic children as well as a separate, optional vector mask child. |
| [ImageRectangleNode](classes/ImageRectangleNode.md) | ImageRectangleNode is a rectangular node that displays the image media part of a [MediaContainerNode](classes/MediaContainerNode.md). It can only exist within that container parent. Cropping can be adjusted by changing this rectangle's position/rotation (as well as its maskShape sibling node). |
| [ItemList](classes/ItemList.md) | ItemList represents an ordered list of API objects that are all children of the same parent node. It is most frequently encountered as [ArtboardNode.children](classes/ArtboardNode.md#children) or [GroupNode.children](classes/GroupNode.md#children). |
| [LineNode](classes/LineNode.md) | A LineNode represents a simple vector line in the scenegraph – a single straight-line segment. |
| [MediaContainerNode](classes/MediaContainerNode.md) | A MediaContainerNode is a multi-node construct that displays media (such as images or video) with optional cropping and clipping to a shape mask. The underlying media asset is always rectangular, but the final appearance of this node is determined by the maskShape which is not necessarily a rectangle. |
| [MediaRectangleNode](classes/MediaRectangleNode.md) | MediaRectangleNode is the base class for a rectangular node that represents the *uncropped* media within a [MediaContainerNode](classes/MediaContainerNode.md). Specific subclasses such as [ImageRectangleNode](classes/ImageRectangleNode.md) exist for each media type and may provide additional media-specific APIs. Cropping can be adjusted by changing this rectangle's position/rotation (as well as its maskShape sibling node). |
| [Node](classes/Node.md) | A Node represents an object in the scenegraph, the document's visual content tree. Most tangible visual content is a subclass of Node, but note that some abstract top-level structural nodes (such as PageNode) only extend the more minimal VisualNode or BaseNode. As a general rule, if you can click or drag an object with the select/move tool in the UI, then it extends from Node. |
| [PageList](classes/PageList.md) | PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph" artwork tree (see [ExpressRootNode](classes/ExpressRootNode.md)). A page contains one or more artboards, representing "scenes" in a linear timeline sequence. Those artboards, in turn, contain all the visual content of the document. |
| [PageNode](classes/PageNode.md) | A PageNode represents a page in the document, a child of the root node of the document's "scenegraph" artwork tree (see [ExpressRootNode](classes/ExpressRootNode.md)). A page contains one or more artboards, which in turn contain all the page's visual content. If multiple artboards are present, each represents a keyframe "scene" in the page's animation timeline. |
| [PathNode](classes/PathNode.md) | A PathNode represents a generic vector path shape in the scenegraph. Paths cannot be edited through this API yet, only read. |
| [ReadOnlyItemList](classes/ReadOnlyItemList.md) | ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node. |
| [RectangleNode](classes/RectangleNode.md) | A RectangleNode represents a rectangle shape in the scenegraph. |
| [RestrictedItemList](classes/RestrictedItemList.md) | Base for ItemLists that restrict how items are added to the list, but freely allow items to be removed and reordered. The [ItemList](classes/ItemList.md) subclass adds more capabilities, however. |
| [SolidColorShapeNode](classes/SolidColorShapeNode.md) | A SolidColorShapeNode is a prepackaged shape with a single color property that appears as a leaf node in the UI, even if it is composed of multiple separate paths. |
| [StandaloneTextContentModel](classes/StandaloneTextContentModel.md) | StandaloneTextContentModel represents a complete piece of text content contained within a single [StandaloneTextNode](classes/StandaloneTextNode.md). |
| [StandaloneTextNode](classes/StandaloneTextNode.md) | A StandaloneTextNode represents text that is displayed *entirely* within one single frame in the scenegraph (in contrast to [ThreadedTextNode](classes/ThreadedTextNode.md), where text may flow across several separate display "frames"). The StandaloneTextNode does not directly hold the text content and styles – instead it refers to a [TextNodeContentModel](classes/TextNodeContentModel.md). |
| [StrokableNode](classes/StrokableNode.md) | Base class for a Node that can have its own stroke. |
| [StrokeShapeNode](classes/StrokeShapeNode.md) | A StrokeShapeNode is prepackaged shape that has a single stroke property and appears as a leaf node in the UI, even if it is composed of multiple separate paths. |
| [TextContentModel](classes/TextContentModel.md) | TextContentModel is an abstract base class representing a complete piece of text content. Use this model to get or modify the text string and the style ranges applied to it. |
| [TextNodeContentModel](classes/TextNodeContentModel.md) | Represents a complete piece of text content, which may be contained within a single [StandaloneTextNode](classes/StandaloneTextNode.md) *or* split across multiple [ThreadedTextNode](classes/ThreadedTextNode.md) frames for display. Use this model to get or modify the text string and the style ranges applied to it. |
| [TextNode](classes/TextNode.md) | TextNode is an abstract base class representing text displayed in the scenegraph, regardless of whether it's a fully self-contained [StandaloneTextNode](classes/StandaloneTextNode.md) or one of multiple [ThreadedTextNode](classes/ThreadedTextNode.md) "frames" in a larger flow. The APIs on TextNode and its [TextNodeContentModel](classes/TextNodeContentModel.md) allow you to generically work with text without needing to know which subtype you are dealing with. |
| [ThreadedTextContentModel](classes/ThreadedTextContentModel.md) | ThreadedTextContentModel represents a complete piece of text content that is split across multiple [ThreadedTextNode](classes/ThreadedTextNode.md) frames for display. This subclass provides a mutable allFrames list that supports adding, removing, and reordering text frames. |
| [ThreadedTextList](classes/ThreadedTextList.md) | ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node. |
| [ThreadedTextNode](classes/ThreadedTextNode.md) | A ThreadedTextNode represents a text display frame in the scenegraph which is a subset of longer text that flows across multiple such "frames". Because of this, the TextNode does not directly hold the text content and styles – instead it refers to a [TextNodeContentModel](classes/TextNodeContentModel.md), which may be shared across multiple ThreadedTextNode frames. |
| [UnknownMediaRectangleNode](classes/UnknownMediaRectangleNode.md) | UnknownMediaRectangleNode is a rectangular node that represents the *uncropped* media within a [MediaContainerNode](classes/MediaContainerNode.md) for cases where the media type is not yet supported by this API. Cropping can still be adjusted by changing this rectangle's position/rotation (as well as its maskShape sibling node). |
| [UnknownNode](classes/UnknownNode.md) | An UnknownNode is a node with limited support and therefore treated as a leaf node. |
| [VisualNode](classes/VisualNode.md) | A "node" represents an object in the scenegraph, the document's visual content tree. This class represents any node that can be visually perceived in the content. Most visual content is a subclass of the richer Node class which extends VisualNode with more properties, but the overall ArtboardNode container only supports the VisualNode APIs (and higher-level more abstract containers like PageNode extend only the minimal BaseNode class). |
| [AddOnData](classes/AddOnData.md) | AddOnData class provides APIs to read, write, remove private metadata to a Node. This metadata is accessible only to the add-on that has set it. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TextContent](interfaces/TextContent.md) | <InlineAlert slots="text" variant="warning"/> |
| [CharacterStyles](interfaces/CharacterStyles.md) | Text styles that can be applied to any range of characters, even a short span like a single word. (Contrast with ParagraphStyles, which must be applied to an entire paragraph atomically). |
| [CharacterStylesInput](interfaces/CharacterStylesInput.md) | Variant of [CharacterStyles](interfaces/CharacterStyles.md) with all style fields optional, used for applyCharacterStyles(). When using that API, any fields not specified are left unchanged, preserving the text's existing styles. |
| [CharacterStylesRangeInput](interfaces/CharacterStylesRangeInput.md) | Variant of [CharacterStylesRange](interfaces/CharacterStylesRange.md) with all style fields optional, along with the range of characters they apply to. Used for the characterStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults. |
| [CharacterStylesRange](interfaces/CharacterStylesRange.md) | A set of [CharacterStyles](interfaces/CharacterStyles.md) along with the range of characters they apply to. Seen in the characterStyleRanges getter. |
| [Color](interfaces/Color.md) | Represents an RGBA color value. |
| [ContainerNode](interfaces/ContainerNode.md) | Interface for any node that contains an entirely generic collection of children. Some ContainerNode classes may host *additional* children in other specific "slots," such as background or mask layers; and non-ContainerNode classes may also hold children in specified "slots." Use [Node.allChildren](classes/Node.md#allchildren) for read access to children regardless of node type. |
| [Fill](interfaces/Fill.md) | Base interface representing any fill in the scenegraph. See [FillableNode](classes/FillableNode.md). Currently, you can only create [ColorFill](interfaces/ColorFill.md)s, but you might encounter other fill types when reading scenegraph content. |
| [ColorFill](interfaces/ColorFill.md) | Represents a solid-color fill. |
| [IFillableNode](interfaces/IFillableNode.md) | Interface for [FillableNode](classes/FillableNode.md) *and* any other nodes with a similar `fill` property that do not directly inherit from the FillableNode class. |
| [ReplaceMediaWithEditedImageOptions](interfaces/ReplaceMediaWithEditedImageOptions.md) | <InlineAlert slots="text" variant="warning"/> |
| [IMediaContainerNode](interfaces/IMediaContainerNode.md) | Interface for nodes that contain media. |
| [CommonResizeOptions](interfaces/CommonResizeOptions.md) | An interface for arbitrary resize operations regardless of whether given a width or height when using [Node.resize](classes/Node.md#resize). |
| [RescaleProportionalToWidthOptions](interfaces/RescaleProportionalToWidthOptions.md) | An interface for rescaling the node based on a given width when using [Node.resize](classes/Node.md#resize). |
| [RescaleProportionalToHeightOptions](interfaces/RescaleProportionalToHeightOptions.md) | An interface for rescaling the node based on a given height when using [Node.resize](classes/Node.md#resize). |
| [ResizeUsingWidthOptions](interfaces/ResizeUsingWidthOptions.md) | An interface for resizing the node based on a given width when using [Node.resize](classes/Node.md#resize). |
| [ResizeUsingHeightOptions](interfaces/ResizeUsingHeightOptions.md) | An interface for resizing the node based on a given height when using [Node.resize](classes/Node.md#resize). |
| [INodeBounds](interfaces/INodeBounds.md) | An interface for the bounds of a [Node](classes/Node.md). |
| [BaseParagraphStyles](interfaces/BaseParagraphStyles.md) | Base paragraph styles that can be applied to an entire paragraph atomically. Excludes list style settings, which differ between the getter-oriented [ParagraphStyles](interfaces/ParagraphStyles.md) interface and the setter-oriented [ParagraphStylesRangeInput](interfaces/ParagraphStylesRangeInput.md). |
| [ParagraphStyles](interfaces/ParagraphStyles.md) | Text styles that must be applied to an entire paragraph atomically. (Contrast with CharacterStyles which can be applied to any range of characters, even a short span like one single word). |
| [ParagraphStylesInput](interfaces/ParagraphStylesInput.md) | A variant of [ParagraphStyles](interfaces/ParagraphStyles.md) with all style fields optional, used for applyParagraphStyles(). When using that API, any fields not specified are left unchanged, preserving the text's existing styles. |
| [ParagraphStylesRangeInput](interfaces/ParagraphStylesRangeInput.md) | A variant of [ParagraphStylesRange](interfaces/ParagraphStylesRange.md) with all style fields optional, along with the text range they apply to. Used for the paragraphStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults. |
| [ParagraphStylesRange](interfaces/ParagraphStylesRange.md) | A set of [ParagraphStyles](interfaces/ParagraphStyles.md) along with the text range they apply to. Returned by the paragraphStyleRanges getter. |
| [OrderedListStyleInput](interfaces/OrderedListStyleInput.md) | Interface for specifying an ordered list style, such as a numbered list. |
| [UnorderedListStyleInput](interfaces/UnorderedListStyleInput.md) | Interface for specifying an unordered list style, such as a bullet list. |
| [RemoveListStyleInput](interfaces/RemoveListStyleInput.md) | Interface for removing a list style. |
| [ListItem](interfaces/ListItem.md) | Base interface for any item that can be stored in an [ItemList](classes/ItemList.md) (typically a [Node](classes/Node.md) type). |
| [IRectangularNode](interfaces/IRectangularNode.md) | Interface for nodes with width and height properties. |
| [IStrokableNode](interfaces/IStrokableNode.md) | Interface for [StrokableNode](classes/StrokableNode.md) *and* any other nodes with a similar `stroke` property that do not directly inherit from the StrokableNode class. (See [ArtboardNode](classes/ArtboardNode.md), for example). |
| [Stroke](interfaces/Stroke.md) | Base interface representing any stroke in the scenegraph. See [StrokableNode](classes/StrokableNode.md). Currently, you can only create [SolidColorStroke](interfaces/SolidColorStroke.md)s, but you might encounter other stroke types when reading from scenegraph content. |
| [SolidColorStroke](interfaces/SolidColorStroke.md) | Represents a solid-color stroke, with optional dashes. |
| [TextRange](interfaces/TextRange.md) | A range of text in a [TextContentModel](classes/TextContentModel.md), specified in characters. |
| [AutoWidthTextLayout](interfaces/AutoWidthTextLayout.md) | Auto-width, aka point text: both width and height are automatically determined based on the content. There is no automatic line wrapping, so the text will all be on one line unless the text contains explicit newlines. |
| [AutoHeightTextLayout](interfaces/AutoHeightTextLayout.md) | Auto-height text: Width is explicitly set, and text wraps to use as much vertical space as necessary to display the full content. |
| [AreaTextLayout](interfaces/AreaTextLayout.md) | Area text: both width and height are explicitly set. If text content is too long to fit, the end of the text will be clipped. If text content is short, the frame's bounds will occupy extra height that is just blank space. |
| [UnsupportedTextLayout](interfaces/UnsupportedTextLayout.md) | Represents a text layout the API does not yet support setting or reading the details of. |
| [CreateRenditionOptions](interfaces/CreateRenditionOptions.md) | <InlineAlert slots="text" variant="warning"/> |
| [CreateRenditionResult](interfaces/CreateRenditionResult.md) | <InlineAlert slots="text" variant="warning"/> |
| [IVisualNodeBounds](interfaces/IVisualNodeBounds.md) | An interface for the bounds of a [VisualNode](classes/VisualNode.md). |
| [RectangleGeometry](interfaces/RectangleGeometry.md) | - |
| [Rect](interfaces/Rect.md) | - |
| [Point](interfaces/Point.md) | Represents a 2D position. |
| [StyleRange](interfaces/StyleRange.md) | Represents a range of characters defined by a length (and implicitly started at the end of the previous range). |
| [TextFrameAreaGeometry](interfaces/TextFrameAreaGeometry.md) | Geometry for an area text frame in pixels. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [EditorEventHandler](type-aliases/EditorEventHandler.md) | This type represents function signature for the editor event handler callback. |
| [EventHandlerId](type-aliases/EventHandlerId.md) | This type represents unique id of each event handler callback that is registered. |
| [Font](type-aliases/Font.md) | Represents a font in the document. |
| [ResizeOptions](type-aliases/ResizeOptions.md) | A type union for providing the necessary arguments to [Node.resize](classes/Node.md#resize). |
| [ListStyleInput](type-aliases/ListStyleInput.md) | - |
| [OrderedListStyle](type-aliases/OrderedListStyle.md) | OrderedListStyle represents the style of an ordered list. |
| [UnorderedListStyle](type-aliases/UnorderedListStyle.md) | UnorderedListStyle represents the style of an unordered list. |
| [SolidColorStrokeWithOptionalType](type-aliases/SolidColorStrokeWithOptionalType.md) | SolidColorStroke with 'type' property as optional. |
