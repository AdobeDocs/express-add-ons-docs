[**@express-document-sdk**](../overview.md)

---

# Type Alias: ResizeOptions

```ts
type ResizeOptions = 
  | RescaleProportionalToWidthOptions
  | RescaleProportionalToHeightOptions
  | ResizeUsingWidthOptions
  | ResizeUsingHeightOptions;
```

A type union for providing the necessary arguments to [Node.resize](../classes/Node.md#resize).

Note that some nodes only support proportional resizing. In some cases this is always true (e.g. images) while in
other cases it is due to the current visual details (e.g. the stroke being too thick to shrink the size of a shape).
