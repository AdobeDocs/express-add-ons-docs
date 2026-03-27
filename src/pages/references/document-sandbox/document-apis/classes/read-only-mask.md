---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Class: ReadOnlyMask

A read-only view of a mask shape.

## Extends

- `unknown`

## Implements

- [`INodeBounds`](../interfaces/i-node-bounds.md)

## Constructors

### Constructor

```ts
new ReadOnlyMask(): ReadOnlyMask;
```

#### Returns

`ReadOnlyMask`

#### Inherited from

```ts
ProxyLiveObject.constructor
```

## Accessors

### type

#### Get Signature

```ts
get type(): "ReadOnlyMask";
```

The type of ReadOnlyMask.

##### Returns

`"ReadOnlyMask"`

<HorizontalLine />

### boundsLocal

#### Get Signature

```ts
get boundsLocal(): Readonly<Rect>;
```

The bounding box of the node, expressed in the node's local coordinate space (which may be shifted or rotated
relative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path
"spine" of the shape as well as its stroke, but excluding effects such as shadows.

The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is
*not* necessarily (0,0) – this is especially true for Text and Path nodes.

##### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`boundsLocal`](../interfaces/i-node-bounds.md#boundslocal)

<HorizontalLine />

### centerPointLocal

#### Get Signature

```ts
get centerPointLocal(): Readonly<Point>;
```

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

##### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`centerPointLocal`](../interfaces/i-node-bounds.md#centerpointlocal)

<HorizontalLine />

### topLeftLocal

#### Get Signature

```ts
get topLeftLocal(): Readonly<Point>;
```

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

##### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`topLeftLocal`](../interfaces/i-node-bounds.md#topleftlocal)

<HorizontalLine />

### boundsInParent

#### Get Signature

```ts
get boundsInParent(): Readonly<Rect>;
```

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

##### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`boundsInParent`](../interfaces/i-node-bounds.md#boundsinparent)

<HorizontalLine />

### translation

#### Get Signature

```ts
get translation(): Readonly<Point>;
```

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

##### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`translation`](../interfaces/i-node-bounds.md#translation)

<HorizontalLine />

### rotation

#### Get Signature

```ts
get rotation(): number;
```

The node's local rotation angle in degrees, relative to its parent's axes. Use `setRotationInParent` to
change rotation by rotating around a defined centerpoint.

##### Returns

`number`

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`rotation`](../interfaces/i-node-bounds.md#rotation)

<HorizontalLine />

### rotationInScreen

#### Get Signature

```ts
get rotationInScreen(): number;
```

The node's total rotation angle in degrees, relative to the overall global view of the document – including any
cumulative rotation from the node's parent containers.

##### Returns

`number`

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`rotationInScreen`](../interfaces/i-node-bounds.md#rotationinscreen)

<HorizontalLine />

### transformMatrix

#### Get Signature

```ts
get transformMatrix(): mat2d;
```

The node's transform matrix relative to its parent.

##### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`transformMatrix`](../interfaces/i-node-bounds.md#transformmatrix)

## Methods

### localPointInNode()

```ts
localPointInNode(localPoint, targetNode): Readonly<Point>;
```

Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.
Both nodes must share the same visualRoot, but can lie anywhere within that subtree relative to one
another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `localPoint` | [`Point`](../interfaces/point.md) |
| `targetNode` | [`VisualNode`](visual-node.md) |

#### Returns

`Readonly`&lt;[`Point`](../interfaces/point.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`localPointInNode`](../interfaces/i-node-bounds.md#localpointinnode)

<HorizontalLine />

### boundsInNode()

```ts
boundsInNode(targetNode): Readonly<Rect>;
```

Convert the node's [boundsLocal](../interfaces/i-visual-node-bounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same visualRoot, but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetNode` | [`VisualNode`](visual-node.md) |

#### Returns

`Readonly`&lt;[`Rect`](../interfaces/rect.md)&gt;

#### Implementation of

[`INodeBounds`](../interfaces/i-node-bounds.md).[`boundsInNode`](../interfaces/i-node-bounds.md#boundsinnode)
