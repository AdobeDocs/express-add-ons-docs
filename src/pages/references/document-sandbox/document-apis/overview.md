---
hideEditInGitHub: true
---

**@express-document-sdk**

<HorizontalLine />

# @express-document-sdk

## Namespaces

| Namespace                                         | Description |
|---------------------------------------------------| ------ |
| [Constants](@hz/namespaces/constants/overview.md) | - |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [EditorEvent](enumerations/editor-event.md) | This enum represents the supported editor events. |
| [ResizeBehavior](enumerations/resize-behavior.md) | An enum for controlling the behavior of [Node.resize](classes/node.md#resize). |
| [ParagraphListType](enumerations/paragraph-list-type.md) | Indicates list type: see [UnorderedListStyleInput](interfaces/unordered-list-style-input.md) and [OrderedListStyleInput](interfaces/ordered-list-style-input.md). |
| [OrderedListNumbering](enumerations/ordered-list-numbering.md) | Numbering types used to display ordered lists: 1, A, a, I, i 01, 001. |
| [TextStyleSource](enumerations/text-style-source.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [VisualEffectType](enumerations/visual-effect-type.md) | Visual effects that can be applied to a text node. |
| [CreateRenditionFormat](enumerations/create-rendition-format.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [SceneNodeType](enumerations/scene-node-type.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [BlendMode](enumerations/blend-mode.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [StrokePosition](enumerations/stroke-position.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [FillType](enumerations/fill-type.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [ArrowHeadType](enumerations/arrow-head-type.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [TextAlignment](enumerations/text-alignment.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [FillRule](enumerations/fill-rule.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [StrokeType](enumerations/stroke-type.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [TextLayout](enumerations/text-layout.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [TextScriptStyle](enumerations/text-script-style.md) | Represents a text script style. |

## Classes

| Class | Description |
| ------ | ------ |
| [ArtboardList](classes/artboard-list.md) | ArtboardList represents an ordered list of ArtboardNodes, which are the children of one [PageNode](classes/page-node.md). If multiple artboards are present, each represents a keyframe "scene" in the page's animation timeline. |
| [ArtboardNode](classes/artboard-node.md) | An ArtboardNode represents the topmost container of visual content within a [PageNode](classes/page-node.md). When a page contains multiple artboards, each represents a keyframe "scene" in the page's animation timeline. |
| [BaseNode](classes/base-node.md) | A "node" represents an object in the scenegraph, the document's visual content tree. This base class includes only the most fundamental nonvisual properties that even nodes near the top of the document structure share (such as PageNode). The more tangible visual content typically extends the richer Node class which extends BaseNode with additional properties. |
| [BitmapImage](classes/bitmap-image.md) | Represents a bitmap image resource. Use [Editor.loadBitmapImage](classes/editor.md#loadbitmapimage) to create a BitmapImage, and then [Editor.createImageContainer](classes/editor.md#createimagecontainer) to display it in the document by creating a MediaContainerNode structure. |
| [ColorUtils](classes/color-utils.md) | Utility methods for working with color values. |
| [ComplexShapeNode](classes/complex-shape-node.md) | A ComplexShapeNode is a complex prepackaged shape that appears as a leaf node in the UI, even if it is composed of multiple separate paths. |
| [Context](classes/context.md) | Contains the user's current selection state, indicating the content they are focused on. |
| [Editor](classes/editor.md) | Entry point for APIs that read or modify the document's content. |
| [EllipseNode](classes/ellipse-node.md) | An EllipseNode represents an ellipse or circle shape in the scenegraph. |
| [ExpressContext](classes/express-context.md) | Contains The Express specific APIs related to the current selection state. |
| [ExpressEditor](classes/express-editor.md) | Entry point for Express specific APIs that read or modify the document's content. |
| [ExpressRootNode](classes/express-root-node.md) | An ExpressRootNode represents the root node of the document's "scenegraph" artwork tree. The root contains a collection of [pages](classes/express-root-node.md#pages). Each page contains one or more artboards, which in turn hold all the visual content of the document. |
| [ExpressViewport](classes/express-viewport.md) | Represents the area of the canvas that is currently visible on-screen. |
| [FillableNode](classes/fillable-node.md) | Base class for a Node that can have its own fill and stroke. |
| [BaseFont](classes/base-font.md) | Represents a font that is able to be rendered within this document. However, the user may not have edit permissions for all such fonts. |
| [AvailableFont](classes/available-font.md) | Font the current user has access or licensing permissions to create / edit content with. |
| [UnavailableFont](classes/unavailable-font.md) | Font the current user does not have access or licensing permissions to create / edit content with. |
| [Fonts](classes/fonts.md) | The Fonts class provides methods to work with fonts. |
| [ReadOnlyMask](classes/read-only-mask.md) | A read-only view of a mask shape. |
| [GridCellNode](classes/grid-cell-node.md) | A GridCellNode represents the media aspect of a grid cell. Unlike MediaContainerNodes, grid cells cannot be translated or rotated directly and can't modify a mask shape. This implementation translates and rotates the media rectangle child when those actions are applied. |
| [GridLayoutNode](classes/grid-layout-node.md) | A GridLayoutNode represents a grid layout in the scenegraph. Currently, grids contain only images but in the future they may support other types of content as well. |
| [GroupNode](classes/group-node.md) | A GroupNode represents a Group object in the scenegraph, which has a collection of generic children as well as a separate, optional vector mask child. |
| [ImageRectangleNode](classes/image-rectangle-node.md) | ImageRectangleNode is a rectangular node that displays the image media part of a [MediaContainerNode](classes/media-container-node.md). It can only exist within that container parent. Cropping can be adjusted by changing this rectangle's position/rotation (as well as its maskShape sibling node). |
| [ItemList](classes/item-list.md) | ItemList represents an ordered list of API objects that are all children of the same parent node. It is most frequently encountered as [ArtboardNode.children](classes/artboard-node.md#children) or [GroupNode.children](classes/group-node.md#children). |
| [LineNode](classes/line-node.md) | A LineNode represents a simple vector line in the scenegraph – a single straight-line segment. |
| [MediaContainerNode](classes/media-container-node.md) | A MediaContainerNode is a multi-node construct that displays media (such as images or video) with optional cropping and clipping to a shape mask. The underlying media asset is always rectangular, but the final appearance of this node is determined by the maskShape which is not necessarily a rectangle. |
| [MediaRectangleNode](classes/media-rectangle-node.md) | MediaRectangleNode is the base class for a rectangular node that represents the *uncropped* media within a [MediaContainerNode](classes/media-container-node.md). Specific subclasses such as [ImageRectangleNode](classes/image-rectangle-node.md) exist for each media type and may provide additional media-specific APIs. Cropping can be adjusted by changing this rectangle's position/rotation (as well as its maskShape sibling node). |
| [Node](classes/node.md) | A Node represents an object in the scenegraph, the document's visual content tree. Most tangible visual content is a subclass of Node, but note that some abstract top-level structural nodes (such as PageNode) only extend the more minimal VisualNode or BaseNode. As a general rule, if you can click or drag an object with the select/move tool in the UI, then it extends from Node. |
| [PageList](classes/page-list.md) | PageList represents an ordered list of PageNodes, all of which are children of the root node of the document's "scenegraph" artwork tree (see [ExpressRootNode](classes/express-root-node.md)). A page contains one or more artboards, representing "scenes" in a linear timeline sequence. Those artboards, in turn, contain all the visual content of the document. |
| [PageNode](classes/page-node.md) | A PageNode represents a page in the document, a child of the root node of the document's "scenegraph" artwork tree (see [ExpressRootNode](classes/express-root-node.md)). A page contains one or more artboards, which in turn contain all the page's visual content. If multiple artboards are present, each represents a keyframe "scene" in the page's animation timeline. |
| [PathNode](classes/path-node.md) | A PathNode represents a generic vector path shape in the scenegraph. Paths cannot be edited through this API yet, only read. |
| [ReadOnlyItemList](classes/read-only-item-list.md) | ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node. |
| [RectangleNode](classes/rectangle-node.md) | A RectangleNode represents a rectangle shape in the scenegraph. |
| [RestrictedItemList](classes/restricted-item-list.md) | Base for ItemLists that restrict how items are added to the list, but freely allow items to be removed and reordered. The [ItemList](classes/item-list.md) subclass adds more capabilities, however. |
| [SolidColorShapeNode](classes/solid-color-shape-node.md) | A SolidColorShapeNode is a prepackaged shape with a single color property that appears as a leaf node in the UI, even if it is composed of multiple separate paths. |
| [StandaloneTextContentModel](classes/standalone-text-content-model.md) | StandaloneTextContentModel represents a complete piece of text content contained within a single [StandaloneTextNode](classes/standalone-text-node.md). |
| [StandaloneTextNode](classes/standalone-text-node.md) | A StandaloneTextNode represents text that is displayed *entirely* within one single frame in the scenegraph (in contrast to [ThreadedTextNode](classes/threaded-text-node.md), where text may flow across several separate display "frames"). The StandaloneTextNode does not directly hold the text content and styles – instead it refers to a [TextNodeContentModel](classes/text-node-content-model.md). |
| [StrokableNode](classes/strokable-node.md) | Base class for a Node that can have its own stroke. |
| [StrokeShapeNode](classes/stroke-shape-node.md) | A StrokeShapeNode is prepackaged shape that has a single stroke property and appears as a leaf node in the UI, even if it is composed of multiple separate paths. |
| [TextContentModel](classes/text-content-model.md) | TextContentModel is an abstract base class representing a complete piece of text content. Use this model to get or modify the text string and the style ranges applied to it. |
| [TextNodeContentModel](classes/text-node-content-model.md) | Represents a complete piece of text content, which may be contained within a single [StandaloneTextNode](classes/standalone-text-node.md) *or* split across multiple [ThreadedTextNode](classes/threaded-text-node.md) frames for display. Use this model to get or modify the text string and the style ranges applied to it. |
| [TextNode](classes/text-node.md) | TextNode is an abstract base class representing text displayed in the scenegraph, regardless of whether it's a fully self-contained [StandaloneTextNode](classes/standalone-text-node.md) or one of multiple [ThreadedTextNode](classes/threaded-text-node.md) "frames" in a larger flow. The APIs on TextNode and its [TextNodeContentModel](classes/text-node-content-model.md) allow you to generically work with text without needing to know which subtype you are dealing with. |
| [ThreadedTextContentModel](classes/threaded-text-content-model.md) | ThreadedTextContentModel represents a complete piece of text content that is split across multiple [ThreadedTextNode](classes/threaded-text-node.md) frames for display. This subclass provides a mutable allFrames list that supports adding, removing, and reordering text frames. |
| [ThreadedTextList](classes/threaded-text-list.md) | ReadOnlyItemList represents an ordered list of API objects that are all children of the same parent node. |
| [ThreadedTextNode](classes/threaded-text-node.md) | A ThreadedTextNode represents a text display frame in the scenegraph which is a subset of longer text that flows across multiple such "frames". Because of this, the TextNode does not directly hold the text content and styles – instead it refers to a [TextNodeContentModel](classes/text-node-content-model.md), which may be shared across multiple ThreadedTextNode frames. |
| [UnknownMediaRectangleNode](classes/unknown-media-rectangle-node.md) | UnknownMediaRectangleNode is a rectangular node that represents the *uncropped* media within a [MediaContainerNode](classes/media-container-node.md) for cases where the media type is not yet supported by this API. Cropping can still be adjusted by changing this rectangle's position/rotation (as well as its maskShape sibling node). |
| [UnknownNode](classes/unknown-node.md) | An UnknownNode is a node with limited support and therefore treated as a leaf node. |
| [VisualNode](classes/visual-node.md) | A "node" represents an object in the scenegraph, the document's visual content tree. This class represents any node that can be visually perceived in the content. Most visual content is a subclass of the richer Node class which extends VisualNode with more properties, but the overall ArtboardNode container only supports the VisualNode APIs (and higher-level more abstract containers like PageNode extend only the minimal BaseNode class). |
| [AddOnData](classes/add-on-data.md) | AddOnData class provides APIs to read, write, remove private metadata to a Node. This metadata is accessible only to the add-on that has set it. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TextContent](interfaces/text-content.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [CharacterStyles](interfaces/character-styles.md) | Text styles that can be applied to any range of characters, even a short span like a single word. (Contrast with ParagraphStyles, which must be applied to an entire paragraph atomically). |
| [CharacterStylesInput](interfaces/character-styles-input.md) | Variant of [CharacterStyles](interfaces/character-styles.md) with all style fields optional, used for applyCharacterStyles(). When using that API, any fields not specified are left unchanged, preserving the text's existing styles. |
| [CharacterStylesRangeInput](interfaces/character-styles-range-input.md) | Variant of [CharacterStylesRange](interfaces/character-styles-range.md) with all style fields optional, along with the range of characters they apply to. Used for the characterStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults. |
| [CharacterStylesRange](interfaces/character-styles-range.md) | A set of [CharacterStyles](interfaces/character-styles.md) along with the range of characters they apply to. Seen in the characterStyleRanges getter. |
| [Color](interfaces/color.md) | Represents an RGBA color value. |
| [ContainerNode](interfaces/container-node.md) | Interface for any node that contains an entirely generic collection of children. Some ContainerNode classes may host *additional* children in other specific "slots," such as background or mask layers; and non-ContainerNode classes may also hold children in specified "slots." Use [Node.allChildren](classes/node.md#allchildren) for read access to children regardless of node type. |
| [Fill](interfaces/fill.md) | Base interface representing any fill in the scenegraph. See [FillableNode](classes/fillable-node.md). Currently, you can only create [ColorFill](interfaces/color-fill.md)s, but you might encounter other fill types when reading scenegraph content. |
| [ColorFill](interfaces/color-fill.md) | Represents a solid-color fill. |
| [IFillableNode](interfaces/i-fillable-node.md) | Interface for [FillableNode](classes/fillable-node.md) *and* any other nodes with a similar `fill` property that do not directly inherit from the FillableNode class. |
| [ReplaceMediaWithEditedImageOptions](interfaces/replace-media-with-edited-image-options.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [IMediaContainerNode](interfaces/i-media-container-node.md) | Interface for nodes that contain media. |
| [CommonResizeOptions](interfaces/common-resize-options.md) | An interface for arbitrary resize operations regardless of whether given a width or height when using [Node.resize](classes/node.md#resize). |
| [RescaleProportionalToWidthOptions](interfaces/rescale-proportional-to-width-options.md) | An interface for rescaling the node based on a given width when using [Node.resize](classes/node.md#resize). |
| [RescaleProportionalToHeightOptions](interfaces/rescale-proportional-to-height-options.md) | An interface for rescaling the node based on a given height when using [Node.resize](classes/node.md#resize). |
| [ResizeUsingWidthOptions](interfaces/resize-using-width-options.md) | An interface for resizing the node based on a given width when using [Node.resize](classes/node.md#resize). |
| [ResizeUsingHeightOptions](interfaces/resize-using-height-options.md) | An interface for resizing the node based on a given height when using [Node.resize](classes/node.md#resize). |
| [INodeBounds](interfaces/i-node-bounds.md) | An interface for the bounds of a [Node](classes/node.md). |
| [BaseParagraphStyles](interfaces/base-paragraph-styles.md) | Base paragraph styles that can be applied to an entire paragraph atomically. Excludes list style settings, which differ between the getter-oriented [ParagraphStyles](interfaces/paragraph-styles.md) interface and the setter-oriented [ParagraphStylesRangeInput](interfaces/paragraph-styles-range-input.md). |
| [ParagraphStyles](interfaces/paragraph-styles.md) | Text styles that must be applied to an entire paragraph atomically. (Contrast with CharacterStyles which can be applied to any range of characters, even a short span like one single word). |
| [ParagraphStylesInput](interfaces/paragraph-styles-input.md) | A variant of [ParagraphStyles](interfaces/paragraph-styles.md) with all style fields optional, used for applyParagraphStyles(). When using that API, any fields not specified are left unchanged, preserving the text's existing styles. |
| [ParagraphStylesRangeInput](interfaces/paragraph-styles-range-input.md) | A variant of [ParagraphStylesRange](interfaces/paragraph-styles-range.md) with all style fields optional, along with the text range they apply to. Used for the paragraphStyleRanges setter. When invoking the setter, any fields not specified are reset to their defaults. |
| [ParagraphStylesRange](interfaces/paragraph-styles-range.md) | A set of [ParagraphStyles](interfaces/paragraph-styles.md) along with the text range they apply to. Returned by the paragraphStyleRanges getter. |
| [OrderedListStyleInput](interfaces/ordered-list-style-input.md) | Interface for specifying an ordered list style, such as a numbered list. |
| [UnorderedListStyleInput](interfaces/unordered-list-style-input.md) | Interface for specifying an unordered list style, such as a bullet list. |
| [RemoveListStyleInput](interfaces/remove-list-style-input.md) | Interface for removing a list style. |
| [ListItem](interfaces/list-item.md) | Base interface for any item that can be stored in an [ItemList](classes/item-list.md) (typically a [Node](classes/node.md) type). |
| [IRectangularNode](interfaces/i-rectangular-node.md) | Interface for nodes with width and height properties. |
| [IStrokableNode](interfaces/i-strokable-node.md) | Interface for [StrokableNode](classes/strokable-node.md) *and* any other nodes with a similar `stroke` property that do not directly inherit from the StrokableNode class. (See [ArtboardNode](classes/artboard-node.md), for example). |
| [Stroke](interfaces/stroke.md) | Base interface representing any stroke in the scenegraph. See [StrokableNode](classes/strokable-node.md). Currently, you can only create [SolidColorStroke](interfaces/solid-color-stroke.md)s, but you might encounter other stroke types when reading from scenegraph content. |
| [SolidColorStroke](interfaces/solid-color-stroke.md) | Represents a solid-color stroke, with optional dashes. |
| [TextRange](interfaces/text-range.md) | A range of text in a [TextContentModel](classes/text-content-model.md), specified in characters. |
| [AutoWidthTextLayout](interfaces/auto-width-text-layout.md) | Auto-width, aka point text: both width and height are automatically determined based on the content. There is no automatic line wrapping, so the text will all be on one line unless the text contains explicit newlines. |
| [AutoHeightTextLayout](interfaces/auto-height-text-layout.md) | Auto-height text: Width is explicitly set, and text wraps to use as much vertical space as necessary to display the full content. |
| [AreaTextLayout](interfaces/area-text-layout.md) | Area text: both width and height are explicitly set. If text content is too long to fit, the end of the text will be clipped. If text content is short, the frame's bounds will occupy extra height that is just blank space. |
| [UnsupportedTextLayout](interfaces/unsupported-text-layout.md) | Represents a text layout the API does not yet support setting or reading the details of. |
| [CreateRenditionOptions](interfaces/create-rendition-options.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [CreateRenditionResult](interfaces/create-rendition-result.md) | \<InlineAlert slots="text" variant="warning"/\> |
| [IVisualNodeBounds](interfaces/i-visual-node-bounds.md) | An interface for the bounds of a [VisualNode](classes/visual-node.md). |
| [RectangleGeometry](interfaces/rectangle-geometry.md) | - |
| [Rect](interfaces/rect.md) | - |
| [Point](interfaces/point.md) | Represents a 2D position. |
| [StyleRange](interfaces/style-range.md) | Represents a range of characters defined by a length (and implicitly started at the end of the previous range). |
| [TextFrameAreaGeometry](interfaces/text-frame-area-geometry.md) | Geometry for an area text frame in pixels. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [EditorEventHandler](type-aliases/editor-event-handler.md) | This type represents function signature for the editor event handler callback. |
| [EventHandlerId](type-aliases/event-handler-id.md) | This type represents unique id of each event handler callback that is registered. |
| [Font](type-aliases/font.md) | Represents a font in the document. |
| [ResizeOptions](type-aliases/resize-options.md) | A type union for providing the necessary arguments to [Node.resize](classes/node.md#resize). |
| [ListStyleInput](type-aliases/list-style-input.md) | - |
| [OrderedListStyle](type-aliases/ordered-list-style.md) | OrderedListStyle represents the style of an ordered list. |
| [UnorderedListStyle](type-aliases/unordered-list-style.md) | UnorderedListStyle represents the style of an unordered list. |
| [SolidColorStrokeWithOptionalType](type-aliases/solid-color-stroke-with-optional-type.md) | SolidColorStroke with 'type' property as optional. |
