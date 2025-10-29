[@express-document-sdk](../overview.md) / Editor

# Class: Editor

Entry point for APIs that read or modify the document's content.

## Accessors

### context

• `get` **context**(): [`Context`](context.md)

User's current selection context

#### Returns

[`Context`](context.md)

<HorizontalLine />

### documentRoot

• `get` **documentRoot**(): [`ExpressRootNode`](express-root-node.md)

#### Returns

[`ExpressRootNode`](express-root-node.md)

the root of the document.

## Methods

### createEllipse()

• **createEllipse**(): [`EllipseNode`](ellipse-node.md)

#### Returns

[`EllipseNode`](ellipse-node.md)

an ellipse node with default x/y radii, a black fill, and no initial stroke.
Transform values default to 0.

<HorizontalLine />

### createGroup()

• **createGroup**(): [`GroupNode`](group-node.md)

#### Returns

[`GroupNode`](group-node.md)

a group node.

<HorizontalLine />

### createImageContainer()

• **createImageContainer**(`bitmapData`, `options`): [`MediaContainerNode`](media-container-node.md)

Creates a bitmap image, represented as a multi-node MediaContainerNode structure. Always creates a "full-frame,"
uncropped image initially, but cropping can be changed after it is created by modifying the properties of the
container's mediaRectangle and maskShape children.

Image creation involves some asynchronous steps. The image will be visible in this client almost instantly, but will
render as a gray placeholder on other clients until it has been uploaded to DCX and then downloaded by those clients.
This local client will act as having unsaved changes until the upload has finished.

#### Parameters

• **bitmapData**: [`BitmapImage`](bitmap-image.md)

BitmapImage resource (e.g. returned from [loadBitmapImage](editor.md#loadbitmapimage)).

• **options**= `{}`

Additional configuration: - initialSize - Size the image is displayed at. Must have the same aspect ratio as bitmapData. Defaults to the
size the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down
if needed to stay below an application-defined size cap).

• **options.initialSize?**: [`RectangleGeometry`](../interfaces/rectangle-geometry.md)

#### Returns

[`MediaContainerNode`](media-container-node.md)

MediaContainerNode representing the top container node of the multi-node structure.

<HorizontalLine />

### createLine()

• **createLine**(): [`LineNode`](line-node.md)

#### Returns

[`LineNode`](line-node.md)

a line node with default start point and end point and a default stroke.
Transform values default to 0.

<HorizontalLine />

### createPath()

• **createPath**(`path`): [`PathNode`](path-node.md)

#### Parameters

• **path**: `string`

a string representing any [SVG path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
Note that the path data will be normalized, and therefore the `path` getter may return a different SVG string from the path creation input.
For example, "M 10 80 Q 52.5 10, 95 80 T 180 80" becomes "M 10 80 C 38.33 33.33 66.67 33.33 95 80...".
Throws if the input is empty or is not legal SVG path syntax.

#### Returns

[`PathNode`](path-node.md)

a path node with a default stroke and no initial fill.

<HorizontalLine />

### createRectangle()

• **createRectangle**(): [`RectangleNode`](rectangle-node.md)

#### Returns

[`RectangleNode`](rectangle-node.md)

a rectangle node with default width and height, a black fill, and no initial stroke.
Transform values default to 0.

<HorizontalLine />

### createText()

#### createText()

• **createText**(): [`StandaloneTextNode`](standalone-text-node.md)

##### Returns

[`StandaloneTextNode`](standalone-text-node.md)

a text node with default styles. The text content is initially empty, so the text node will be
invisible until its `fullContent` property's `text` is set. Creates auto-width text, so the node's width will
automatically adjust to accommodate whatever text is set.

##### Deprecated

- Initial text content is always expected so please use `createText(textContent: string): StandaloneTextNode`.

#### createText(textContent)

• **createText**(`textContent`): [`StandaloneTextNode`](standalone-text-node.md)

##### Parameters

• **textContent**: `string`

the initial string to show.

##### Returns

[`StandaloneTextNode`](standalone-text-node.md)

a text node with default styles. Creates auto-width text, so the node's width will automatically adjust
to accommodate the given text content.

Note: the registration point of this text node is not guaranteed to be at the top-left of the bounding box of its
insertion parent. Recommend using `setPositionInParent` over `translation` to set the position.

<HorizontalLine />

### loadBitmapImage()

• **loadBitmapImage**(`bitmapData`): `Promise` &lt; [`BitmapImage`](bitmap-image.md)\ &gt;

Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to [createImageContainer](editor.md#createimagecontainer)
to create a MediaContainerNode. The same BitmapImage can be used to create multiple MediaContainerNodes.

Because the resulting BitmapImage is returned asynchronously, to use it you must schedule an edit lambda to run at a
safe later time in order to call [createImageContainer](editor.md#createimagecontainer). See [queueAsyncEdit](editor.md#queueasyncedit).

Further async steps to upload image resource data may continue in the background after this call's Promise resolves,
but the resulting BitmapImage can be used right away (via the queue API noted above). The local client will act as
having unsaved changes until all the upload steps have finished.

#### Parameters

• **bitmapData**: `Blob`

Encoded image data in PNG or JPEG format.

#### Returns

`Promise` &lt;[`BitmapImage`](bitmap-image.md)\ &gt;

<HorizontalLine />

### makeColorFill()

• **makeColorFill**(`color`): [`ColorFill`](../interfaces/color-fill.md)

Convenience helper to create a complete ColorFill value given just its color.

#### Parameters

• **color**: [`Color`](../interfaces/color.md)

The color to use for the fill.

#### Returns

[`ColorFill`](../interfaces/color-fill.md)

<HorizontalLine />

### makeStroke()

• **makeStroke**(`options`?): [`SolidColorStroke`](../interfaces/solid-color-stroke.md)

Convenience helper to create a complete SolidColorStroke value given just a
subset of its fields. All other fields are populated with default values.

See [SolidColorStroke](../interfaces/solid-color-stroke.md) for more details on the `options` fields. Defaults:

-   `color` has default value DEFAULT_STROKE_COLOR if none is provided.
-   `width` has default value DEFAULT_STROKE_WIDTH if none is provided.
-   `position` has default value `center` if none is provided.
-   `dashPattern` has default value [] if none is provided.
-   `dashOffset` has default value 0 if none is provided. This field is ignored
  if no `dashPattern` was provided.
-   `type` has default value SolidColorStroke.type if none is provided. This field
   shouldn't be set to any other value.

#### Parameters

• **options?**: `Partial` &lt; [`SolidColorStroke`](../interfaces/solid-color-stroke.md)\ &gt;

#### Returns

[`SolidColorStroke`](../interfaces/solid-color-stroke.md)

a stroke configured with the given options.

<HorizontalLine />

### queueAsyncEdit()

• **queueAsyncEdit**(`lambda`): `Promise` &lt;`void`\ &gt;

Enqueues a function to be run at a later time when edits to the user's document may be performed. You can always edit
the document immediately when invoked in response to your add-on's UI code. However, if you delay to await an
asynchronous operation such as [loadBitmapImage](editor.md#loadbitmapimage), any edits following this pause must be scheduled using
queueAsyncEdit(). This ensures the edit is properly tracked for saving and undo.

The delay before your edit function is executed is typically just a few milliseconds, so it will appear instantaneous
to users. However, note that queueAsyncEdit() will return _before_ your function has been run.
If you need to trigger any code after the edit has been performed, either include this in the lambda you are enqueuing
or await the Promise returned by queueAsyncEdit().

Generally, calling any setter or method is treated as an edit; but simple getters may be safely called at any time.

Example of typical usage:

```js
// Assume insertImage() is called from your UI code, and given a Blob containing image data
async function insertImage(blob) {
    // This function was invoked from the UI iframe, so we can make any edits we want synchronously here.
    // Initially load the bitmap - an async operation
    const bitmapImage = await editor.loadBitmapImage(blob);

    // Execution doesn't arrive at this line until an async delay, due to the Promise 'await' above

    // Further edits need to be queued to run at a safe time
    editor.queueAsyncEdit(() => {
         // Create scenenode to display the image, and add it to the current artboard
         const mediaContainer = editor.createImageContainer(bitmapImage);
         editor.context.insertionParent.children.append(mediaContainer);
    });
}
```

#### Parameters

• **lambda**

a function which edits the document model.

#### Returns

`Promise` &lt;`void`\ &gt;

a Promise that resolves when the lambda has finished running, or rejects if the lambda throws an error.
