---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: ExpressEditor

Entry point for Express specific APIs that read or modify the document's content.

## Extends

- [`Editor`](editor.md)

## Constructors

### Constructor

```ts
new ExpressEditor(): ExpressEditor;
```

#### Returns

`ExpressEditor`

#### Inherited from

[`Editor`](editor.md).[`constructor`](editor.md#constructor)

## Accessors

### context

#### Get Signature

```ts
get context(): ExpressContext;
```

User's current selection context

##### Returns

[`ExpressContext`](express-context.md)

#### Overrides

[`Editor`](editor.md).[`context`](editor.md#context)

<HorizontalLine />

### documentRoot

#### Get Signature

```ts
get documentRoot(): ExpressRootNode;
```

##### Returns

[`ExpressRootNode`](express-root-node.md)

the root of the document.

## Methods

### queueAsyncEdit()

```ts
queueAsyncEdit(lambda): Promise<void>;
```

Enqueues a function to be run at a later time when edits to the user's document may be performed. You can always edit
the document immediately when invoked in response to your add-on's UI code. However, if you delay to await an
asynchronous operation such as [loadBitmapImage](editor.md#loadbitmapimage), any edits following this pause must be scheduled using
queueAsyncEdit(). This ensures the edit is properly tracked for saving and undo.

The delay before your edit function is executed is typically just a few milliseconds, so it will appear instantaneous
to users. However, note that queueAsyncEdit() will return *before* your function has been run.
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

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lambda` | () =&gt; `void` | a function which edits the document model. |

#### Returns

`Promise`&lt;`void`&gt;

a Promise that resolves when the lambda has finished running, or rejects if the lambda throws an error.

#### Inherited from

[`Editor`](editor.md).[`queueAsyncEdit`](editor.md#queueasyncedit)

<HorizontalLine />

### createText()

#### Call Signature

```ts
createText(): StandaloneTextNode;
```

##### Returns

[`StandaloneTextNode`](standalone-text-node.md)

a text node with default styles. The text content is initially empty, so the text node will be
invisible until its `fullContent` property's `text` is set. Creates auto-width text, so the node's width will
automatically adjust to accommodate whatever text is set.

##### Deprecated

- Initial text content is always expected so please use `createText(textContent: string): StandaloneTextNode`.

##### Inherited from

[`Editor`](editor.md).[`createText`](editor.md#createtext)

#### Call Signature

```ts
createText(textContent): StandaloneTextNode;
```

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `textContent` | `string` | the initial string to show. |

##### Returns

[`StandaloneTextNode`](standalone-text-node.md)

a text node with default styles. Creates auto-width text, so the node's width will automatically adjust
to accommodate the given text content.

Note: the registration point of this text node is not guaranteed to be at the top-left of the bounding box of its
insertion parent. Recommend using `setPositionInParent` over `translation` to set the position.

##### Inherited from

[`Editor`](editor.md).[`createText`](editor.md#createtext)

<HorizontalLine />

### createEllipse()

```ts
createEllipse(): EllipseNode;
```

#### Returns

[`EllipseNode`](ellipse-node.md)

an ellipse node with default x/y radii, a black fill, and no initial stroke.
Transform values default to 0.

#### Inherited from

[`Editor`](editor.md).[`createEllipse`](editor.md#createellipse)

<HorizontalLine />

### createRectangle()

```ts
createRectangle(): RectangleNode;
```

#### Returns

[`RectangleNode`](rectangle-node.md)

a rectangle node with default width and height, a black fill, and no initial stroke.
Transform values default to 0.

#### Inherited from

[`Editor`](editor.md).[`createRectangle`](editor.md#createrectangle)

<HorizontalLine />

### createLine()

```ts
createLine(): LineNode;
```

#### Returns

[`LineNode`](line-node.md)

a line node with default start point and end point and a default stroke.
Transform values default to 0.

#### Inherited from

[`Editor`](editor.md).[`createLine`](editor.md#createline)

<HorizontalLine />

### createGroup()

```ts
createGroup(): GroupNode;
```

#### Returns

[`GroupNode`](group-node.md)

a group node.

#### Inherited from

[`Editor`](editor.md).[`createGroup`](editor.md#creategroup)

<HorizontalLine />

### makeColorFill()

```ts
makeColorFill(color): ColorFill;
```

Convenience helper to create a complete ColorFill value given just its color.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | [`Color`](../interfaces/color.md) | The color to use for the fill. |

#### Returns

[`ColorFill`](../interfaces/color-fill.md)

#### Inherited from

[`Editor`](editor.md).[`makeColorFill`](editor.md#makecolorfill)

<HorizontalLine />

### createImageContainer()

```ts
createImageContainer(bitmapData, options): MediaContainerNode;
```

Creates a bitmap image, represented as a multi-node MediaContainerNode structure. Always creates a "full-frame,"
uncropped image initially, but cropping can be changed after it is created by modifying the properties of the
container's mediaRectangle and maskShape children.

Image creation involves some asynchronous steps. The image will be visible in this client almost instantly, but will
render as a gray placeholder on other clients until it has been uploaded to DCX and then downloaded by those clients.
This local client will act as having unsaved changes until the upload has finished.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bitmapData` | [`BitmapImage`](bitmap-image.md) | BitmapImage resource (e.g. returned from [loadBitmapImage](editor.md#loadbitmapimage)). |
| `options` | \{ `initialSize?`: [`RectangleGeometry`](../interfaces/rectangle-geometry.md); \} | Additional configuration: - initialSize - Size the image is displayed at. Must have the same aspect ratio as bitmapData. Defaults to the size the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down if needed to stay below an application-defined size cap). |
| `options.initialSize?` | [`RectangleGeometry`](../interfaces/rectangle-geometry.md) | - |

#### Returns

[`MediaContainerNode`](media-container-node.md)

MediaContainerNode representing the top container node of the multi-node structure.

#### Inherited from

[`Editor`](editor.md).[`createImageContainer`](editor.md#createimagecontainer)

<HorizontalLine />

### loadBitmapImage()

```ts
loadBitmapImage(bitmapData): Promise<BitmapImage>;
```

Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to [createImageContainer](editor.md#createimagecontainer)
to create a MediaContainerNode. The same BitmapImage can be used to create multiple MediaContainerNodes.

Because the resulting BitmapImage is returned asynchronously, to use it you must schedule an edit lambda to run at a
safe later time in order to call [createImageContainer](editor.md#createimagecontainer). See [queueAsyncEdit](editor.md#queueasyncedit).

Further async steps to upload image resource data may continue in the background after this call's Promise resolves,
but the resulting BitmapImage can be used right away (via the queue API noted above). The local client will act as
having unsaved changes until all the upload steps have finished.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bitmapData` | `Blob` | Encoded image data in PNG or JPEG format. |

#### Returns

`Promise`&lt;[`BitmapImage`](bitmap-image.md)&gt;

#### Inherited from

[`Editor`](editor.md).[`loadBitmapImage`](editor.md#loadbitmapimage)

<HorizontalLine />

### makeStroke()

```ts
makeStroke(options?): SolidColorStroke;
```

Convenience helper to create a complete SolidColorStroke value given just a
subset of its fields. All other fields are populated with default values.

See [SolidColorStroke](../interfaces/solid-color-stroke.md) for more details on the `options` fields. Defaults:

- `color` has default value DEFAULT\_STROKE\_COLOR if none is provided.
- `width` has default value DEFAULT\_STROKE\_WIDTH if none is provided.
- `position` has default value `center` if none is provided.
- `dashPattern` has default value [] if none is provided.
- `dashOffset` has default value 0 if none is provided. This field is ignored
  if no `dashPattern` was provided.
- `type` has default value SolidColorStroke.type if none is provided. This field
   shouldn't be set to any other value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `Partial`&lt;[`SolidColorStroke`](../interfaces/solid-color-stroke.md)&gt; |

#### Returns

[`SolidColorStroke`](../interfaces/solid-color-stroke.md)

a stroke configured with the given options.

#### Inherited from

[`Editor`](editor.md).[`makeStroke`](editor.md#makestroke)

<HorizontalLine />

### createThreadedText()

```ts
createThreadedText(
   parentNode, 
   textContent, 
   geometry?): ThreadedTextNode;
```

**`Experimental`**

&lt;InlineAlert slots="text" variant="warning"/&gt;

**IMPORTANT:** This is currently **_experimental only_** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentNode` | [`ContainerNode`](../interfaces/container-node.md) | The parent node that will contain the threaded text node. This must be a container node (e.g., ArtboardNode, GroupNode) that is attached to the document. |
| `textContent` | `string` | The initial text content for the threaded text node. |
| `geometry?` | [`TextFrameAreaGeometry`](../interfaces/text-frame-area-geometry.md) | The geometry of the threaded text node. |

#### Returns

[`ThreadedTextNode`](threaded-text-node.md)

A new ThreadedTextNode that is part of a threaded text flow.

#### Throws

if parentNode is not provided or is not a valid container node.

#### Throws

if textContent is empty or invalid.

#### Inherited from

[`Editor`](editor.md).[`createThreadedText`](editor.md#createthreadedtext)

<HorizontalLine />

### createPath()

```ts
createPath(path): PathNode;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | a string representing any [SVG path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths). Note that the path data will be normalized, and therefore the `path` getter may return a different SVG string from the path creation input. For example, "M 10 80 Q 52.5 10, 95 80 T 180 80" becomes "M 10 80 C 38.33 33.33 66.67 33.33 95 80...". Throws if the input is empty or is not legal SVG path syntax. Note: the visual top-left corner of a path may not be its local (0,0) origin point, so it's easiest to position a newly created path using [Node.setPositionInParent](node.md#setpositioninparent) rather than setting [Node.translation](node.md#translation) directly. |

#### Returns

[`PathNode`](path-node.md)

a path node with a default stroke and no initial fill.

#### Inherited from

[`Editor`](editor.md).[`createPath`](editor.md#createpath)
