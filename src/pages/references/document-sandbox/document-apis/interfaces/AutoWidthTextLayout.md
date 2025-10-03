[@express-document-sdk](../overview.md) / AutoWidthTextLayout
# Interface: AutoWidthTextLayout

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Auto-width, aka point text: both width and height are automatically determined based on the content. There is no
automatic line wrapping, so the text will all be on one line unless the text contains explicit newlines.

## Properties

### type

• **type**: [`autoWidth`](../enumerations/TextLayout.md#autowidth)
