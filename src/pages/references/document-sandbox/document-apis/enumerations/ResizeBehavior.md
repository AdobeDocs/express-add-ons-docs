[@express-document-sdk](../overview.md) / ResizeBehavior

# Enumeration: ResizeBehavior

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
