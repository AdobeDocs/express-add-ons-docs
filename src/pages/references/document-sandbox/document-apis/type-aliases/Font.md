[@express-document-sdk](../overview.md) / Font

# Type alias: Font

`Experimental`

• **Font**: [`AvailableFont`](../classes/AvailableFont.md) \| [`UnavailableFont`](../classes/UnavailableFont.md)

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

Represents a font in the document.

Note: not every font encountered in the existing content is available for editing.
Check the `availableForEditing` property to be sure.
