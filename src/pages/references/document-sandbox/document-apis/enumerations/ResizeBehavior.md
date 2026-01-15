[@express-document-sdk](../overview.md) / ResizeBehavior

# Enumeration: ResizeBehavior

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

An enum for controlling the behavior of [Node.resize](../classes/Node.md#resize).

## Enumeration Members

### contain

• **contain**: `"contain"`

Resizes the node to fit entirely *within* a box of the given dimensions, keeping its topLeftLocal
at a fixed location. Nodes with a fixed aspect ratio may leave unused space on one axis as a result,
but nodes with flexible aspect ratio will be resized to the exact box size specified.

---

### cover

• **cover**: `"cover"`

Resizes the node to completely *cover* a box of the given dimensions, keeping its topLeftLocal
at a fixed location. Nodes with a fixed aspect ratio may extend outside the box on one axis as a result,
but nodes with flexible aspect ratio will be resized to the exact box size specified.

---

### proportional

• **proportional**: `"proportional"`

Resizes the node to the given width or height while preserving its current aspect ratio, keeping its
topLeftLocal at a fixed location.
