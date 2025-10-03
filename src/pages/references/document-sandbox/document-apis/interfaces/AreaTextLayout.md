[@express-document-sdk](../overview.md) / AreaTextLayout
# Interface: AreaTextLayout

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Area text: both width and height are explicitly set. If text content is too long to fit, the end of the text will be
clipped. If text content is short, the frame's bounds will occupy extra height that is just blank space.

## Properties

### height

• **height**: `number`

The height of the text node in pixels.

---

### type

• **type**: [`area`](../enumerations/TextLayout.md#area)

---

### width

• **width**: `number`

The width of the text node in pixels.
