[**@express-document-sdk**](../overview.md)

---

# Class: ReadOnlyMask

A read-only view of a mask shape.

## Extends

- `unknown`

## Implements

- [`INodeBounds`](../interfaces/INodeBounds.md)

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

---

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

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`boundsLocal`](../interfaces/INodeBounds.md#boundslocal)

---

### centerPointLocal

#### Get Signature

```ts
get centerPointLocal(): Readonly<Point>;
```

Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal box.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`centerPointLocal`](../interfaces/INodeBounds.md#centerpointlocal)

---

### topLeftLocal

#### Get Signature

```ts
get topLeftLocal(): Readonly<Point>;
```

Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,
boundsLocal.y). If the node is rotated, this is not the same as the top-left corner of
boundsInParent.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`topLeftLocal`](../interfaces/INodeBounds.md#topleftlocal)

---

### boundsInParent

#### Get Signature

```ts
get boundsInParent(): Readonly<Rect>;
```

An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its
[boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal), as transformed by its position and rotation relative to the parent). If the node has
rotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the
top-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined
even for an orphan node with no parent.

##### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`boundsInParent`](../interfaces/INodeBounds.md#boundsinparent)

---

### translation

#### Get Signature

```ts
get translation(): Readonly<Point>;
```

The translation of the node along its parent's axes. This is identical to the translation component of
`transformMatrix`. It is often simpler to set a node's position using `setPositionInParent` than by
setting translation directly.

##### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`translation`](../interfaces/INodeBounds.md#translation)

---

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

[`INodeBounds`](../interfaces/INodeBounds.md).[`rotation`](../interfaces/INodeBounds.md#rotation)

---

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

[`INodeBounds`](../interfaces/INodeBounds.md).[`rotationInScreen`](../interfaces/INodeBounds.md#rotationinscreen)

---

### transformMatrix

#### Get Signature

```ts
get transformMatrix(): mat2d;
```

The node's transform matrix relative to its parent.

##### Returns

[`mat2d`](https://glmatrix.net/docs/module-mat2d.html)

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`transformMatrix`](../interfaces/INodeBounds.md#transformmatrix)

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
| `localPoint` | [`Point`](../interfaces/Point.md) |
| `targetNode` | [`VisualNode`](VisualNode.md) |

#### Returns

`Readonly`<[`Point`](../interfaces/Point.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`localPointInNode`](../interfaces/INodeBounds.md#localpointinnode)

---

### boundsInNode()

```ts
boundsInNode(targetNode): Readonly<Rect>;
```

Convert the node's [boundsLocal](../interfaces/IVisualNodeBounds.md#boundslocal) to an axis-aligned bounding box in the coordinate space of the target
node. Both nodes must share the same visualRoot, but can lie anywhere within that subtree
relative to one another (the target node need not be an ancestor of this node, nor vice versa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetNode` | [`VisualNode`](VisualNode.md) |

#### Returns

`Readonly`<[`Rect`](../interfaces/Rect.md)\>

#### Implementation of

[`INodeBounds`](../interfaces/INodeBounds.md).[`boundsInNode`](../interfaces/INodeBounds.md#boundsinnode)
