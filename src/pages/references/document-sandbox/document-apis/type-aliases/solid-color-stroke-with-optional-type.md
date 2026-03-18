---
hideEditInGitHub: true
---

[**@express-document-sdk**](../overview.md)

<HorizontalLine />

# Type Alias: SolidColorStrokeWithOptionalType

```ts
type SolidColorStrokeWithOptionalType = Omit<SolidColorStroke, "type"> & Partial<Pick<SolidColorStroke, "type">>;
```

SolidColorStroke with 'type' property as optional.
