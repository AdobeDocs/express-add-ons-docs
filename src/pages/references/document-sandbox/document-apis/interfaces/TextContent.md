[**@express-document-sdk**](../overview.md)

---

# Interface: TextContent

**`Experimental`**

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** This is currently ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../../../manifest/index.md#requirements) section of the `manifest.json`.

The values yielded by [VisualNode.allTextContent](../classes/VisualNode.md#alltextcontent) and [PageNode.allTextContent](../classes/PageNode.md#alltextcontent).

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `textContentModel` | [`TextContentModel`](../classes/TextContentModel.md) | **`Experimental`** |
| `visibleRanges` | [`TextRange`](TextRange.md)[] | **`Experimental`** An unsorted list of the subranges of the related text content model that are visible within the node. Since a single text content model can be displayed across multiple TextNode "frames", any of which could be outside of the node, the union of all the subranges in this value may still be a subset of the total range. |
| `visibleText` | `string`[] | **`Experimental`** An unsorted list of the parts of the related text content model that are visible within the node. Since a single text content model can be displayed across multiple TextNode "frames", any of which could be outside of the node, the union of all the text in this value may still be a subset of the total text. |
