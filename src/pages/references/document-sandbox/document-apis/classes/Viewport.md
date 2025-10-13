[@express-document-sdk](../overview.md) / Viewport

# Class: Viewport

Represents the area of the canvas that is currently visible on-screen.

## Methods

### bringIntoView()

• **bringIntoView**(`node`): `void`

Adjusts the viewport to make the node's bounds visible on-screen, assuming all bounds are within the artboard bounds.
Makes the node's [ArtboardNode](artboard-node.md) or [PageNode](page-node.md) visible if they were not already visible
(which may result in [Context.selection](context.md#selection) being cleared). It is strongly recommended
to further draw user's attention to the node, set it as the [Context.selection](context.md#selection) following this call.

After this call, the value of [Context.insertionParent](context.md#insertionparent) will always be the node containing [ArtboardNode](artboard-node.md).

Note that the node might still not appear visible if:

  - Its animation settings make it invisible at the beginning of the [ArtboardNode](artboard-node.md) "scene".
  - It is obscured underneath other artwork in the z-order.
  - It is hidden by a [GroupNode](group-node.md)'s mask or similar cropping.

#### Parameters

• **node**: [`VisualNode`](visual-node.md)

#### Returns

`void`
