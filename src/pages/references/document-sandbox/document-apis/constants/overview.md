---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Namespace: Constants

The `Constants` namespace groups together the enumerations used by the Document APIs.
It is the canonical way to access these values from user code — every enum below
can be reached through `Constants.X`, regardless of whether it is also available as
a top-level named export.

## Available at the top level

These enumerations are re-exported at the top level of `@express-document-sdk`,
so they can be imported directly as named exports **or** accessed through `Constants.X`.
Both forms refer to the same enum — pick whichever reads best at the call site.

```js
import { BlendMode, Constants, editor } from "express-document-sdk";

const [node] = editor.context.selection;

node.blendMode = BlendMode.multiply;

node.blendMode = Constants.BlendMode.multiply;
```

| Enumeration | Description |
| ------ | ------ |
| [ArrowHeadType](../enumerations/arrow-head-type.md) | **Experimental** |
| [BlendMode](../enumerations/blend-mode.md) | **Experimental** |
| [EditorEvent](../enumerations/editor-event.md) | This enum represents the supported editor events. |
| [FillRule](../enumerations/fill-rule.md) | **Experimental** |
| [FillType](../enumerations/fill-type.md) | **Experimental** |
| [ResizeBehavior](../enumerations/resize-behavior.md) | An enum for controlling the behavior of [Node.resize](../classes/node.md#resize). |
| [SceneNodeType](../enumerations/scene-node-type.md) | **Experimental** |
| [StrokePosition](../enumerations/stroke-position.md) | **Experimental** |
| [StrokeType](../enumerations/stroke-type.md) | **Experimental** |
| [TextAlignment](../enumerations/text-alignment.md) | **Experimental** |
| [TextLayout](../enumerations/text-layout.md) | **Experimental** |
| [TextScriptStyle](../enumerations/text-script-style.md) | Represents a text script style. |
| [VisualEffectType](../enumerations/visual-effect-type.md) | Visual effects that can be applied to a text node. |

## Only available via `Constants`

These enumerations are **only** reachable through the `Constants` namespace —
they are not re-exported at the top level, so `import { ParagraphListType } from
"express-document-sdk"` would not resolve.

```js
import { Constants, editor } from "express-document-sdk";

const [node] = editor.context.selection;

await node.createRendition({ format: Constants.CreateRenditionFormat.png });

const listStyle = {
    type: Constants.ParagraphListType.ordered,
    numbering: Constants.OrderedListNumbering.doubleZeroPrefixNumeric
};
```

| Enumeration | Description |
| ------ | ------ |
| [CreateRenditionFormat](../enumerations/create-rendition-format.md) | **Experimental** |
| [ErrorNames](../enumerations/ErrorNames.md) | - |
| [OrderedListNumbering](../enumerations/ordered-list-numbering.md) | Numbering types used to display ordered lists: 1, A, a, I, i 01, 001. |
| [ParagraphListType](../enumerations/paragraph-list-type.md) | Indicates list type: see [UnorderedListStyleInput](../interfaces/unordered-list-style-input.md) and [OrderedListStyleInput](../interfaces/ordered-list-style-input.md). |
| [TextStyleSource](../enumerations/text-style-source.md) | **Experimental** |
