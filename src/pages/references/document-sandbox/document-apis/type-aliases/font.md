---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Type Alias: Font

```ts
type Font = 
  | AvailableFont
  | UnavailableFont;
```

Represents a font in the document.

Note: not every font encountered in the existing content is available for editing.
Check the `availableForEditing` property to be sure.
