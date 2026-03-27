---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Enumeration: TextLayout

&lt;InlineAlert slots="text" variant="warning"/&gt;

*Do not depend on the literal numeric values of these constants*, as they may change. Always reference the enum identifiers in your code.

&lt;InlineAlert slots="text" variant="warning"/&gt;

*Additional text layout types may be added in the future.* If your code has different branches or cases depending on layout type,
always have a default/fallback case to handle any unknown values you may encounter.

## Enumeration Members

| Enumeration Member | Value | Description |
| ------ | ------ | ------ |
| `area` | `1` | Area text: both width and height are explicitly set. If text content is too long to fit, the end of the text will be clipped. If text content is short, the frame's bounds will occupy extra height that is just blank space. |
| `autoHeight` | `2` | Auto-height text: Width is explicitly set, and text wraps to use as much vertical space as necessary to display the full content. |
| `autoWidth` | `3` | Auto-width, aka point text: both width and height are automatically determined based on the content. There is no automatic line wrapping, so the text will all be on one line unless the text contains explicit newlines. |
| `circular` | `4` | Text is arranged in a circle or arc. The API does not yet support setting or reading the details of this layout style. |
| `magicFit` | `5` | Aka "Dynamic" layout in the UI: text size and styles are automatically varied to create an attractive multi-line layout. The API does not yet support setting or reading the details of this layout style. |
