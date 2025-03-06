---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
title: Page Metadata
description: Page Metadata.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
---

# Page Metadata

## Get the Page Metadata

If you want to retrieve metadata for pages in the document, use the [`getPagesMetadata()`](../../../references/addonsdk/app-document.md#getpagesmetadata) method in the `addOnUISdk.app.document` object. The method expects an object with a `range` and optional `pageIds` properties.

The `range` property is one of the available [`Range`](../../../references/addonsdk/addonsdk-constants.md) enumerables, either `currentPage`, `entireDocument`, or `specificPages`. If you choose `specificPages`, you must provide an array of page IDs in the `pageIds` property.

The returned value is always an array of [`PageMetadata`](../../../references/addonsdk/app-document.md#pagemetadata) objects.

### Single Page Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
  const page = await addOnUISdk.app.document.getPagesMetadata({
    range: addOnUISdk.constants.Range.currentPage
  });
  console.log("Current page metadata: ", page); // 👈 always returns an array
  // [
  //   {
  //     "id": "01d7093d-96d1-4d6a-981b-dc365343e17c",
  //     "size": { "width": 1080, "height": 1080 },
  //     "title": "First",
  //     "hasPremiumContent": false,
  //     "hasTemporalContent": false,
  //     "pixelsPerInch": 96
  //   },
  // ]
});
```

### Page Range Example

```js
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
  const pages = await addOnUISdk.app.document.getPagesMetadata({
    range: addOnUISdk.constants.Range.specificPages,
    pageIds: [                                  // 👈
        "7477a5e7-02b2-4b8d-9bf9-f09ef6f8b9fc", // 👈
        "d45ba3fc-a3df-4a87-80a5-655e5f8f0f96"  // 👈
    ]                                           // 👈
  });
  console.log("Current page metadata: ", pages);
  // [
  //   {
  //     "id": "01d7093d-96d1-4d6a-981b-dc365343e17c",
  //     "size": { "width": 1080, "height": 1080 },
  //     "title": "First",
  //     "hasPremiumContent": false,
  //     "hasTemporalContent": false,
  //     "pixelsPerInch": 96
  //   },
  //   {
  //     "id": "8d5b1f9a-7289-4590-9ee4-a15a731698ed",
  //     "size": { "width": 1080, "height": 1080 },
  //     "title": "Second",
  //     "hasPremiumContent": false,
  //     "hasTemporalContent": false,
  //     "pixelsPerInch": 96
  //   }
  // ]
});
```

## Use Cases

Page metadata can be used to determine the size of the page, the title, and whether it contains temporal content (videos and animations). Tge `hasPremiumContent` property is particularly helpful when dealing with the rendition of [premium content](./premium_content.md)—for instance, when the user is not authorized to export/download assets that are available only to paid subscribers.
