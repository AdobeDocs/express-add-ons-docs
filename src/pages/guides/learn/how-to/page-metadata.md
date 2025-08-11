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
  - Metadata
  - Page
title: Page Metadata
description: Page Metadata.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I get page metadata?"
      answer: 'Call `addOnUISdk.app.document.getPagesMetadata()` with range and optional pageIds parameters.'

    - question: "What range options are available?"
      answer: "currentPage, entireDocument, or specificPages from `addOnUISdk.constants.Range`."

    - question: "What does getPagesMetadata return?"
      answer: "Always returns an array of PageMetadata objects, even for single pages."

    - question: "How do I get specific pages metadata?"
      answer: 'Use `range: specificPages` and provide an array of page IDs in the pageIds parameter.'

    - question: "What properties are in PageMetadata?"
      answer: "id, size, title, hasPremiumContent, hasVideoContent, hasAudioContent, hasAnimatedContent, temporalContentDuration, pixelsPerInch."

    - question: "What is hasPremiumContent used for?"
      answer: "Indicates if the page contains premium content, helpful for rendition permissions and export controls."

    - question: "What does hasTemporalContent indicate?"
      answer: "Shows if the page contains time-based content like videos or animations."

    - question: "What are common use cases?"
      answer: "Determining page size, checking for premium content before export, and identifying temporal content duration."
---

# Page Metadata

## Get the Page Metadata

If you want to retrieve metadata for pages in the document, use the [`getPagesMetadata()`](../../../references/addonsdk/app-document.md#getpagesmetadata) method in the `addOnUISdk.app.document` object. The method expects an object with a `range` and optional `pageIds` properties.

The `range` property is one of the available [`Range`](../../../references/addonsdk/addonsdk-constants.md) enumerables, either `currentPage`, `entireDocument`, or `specificPages`. If you choose `specificPages`, you must provide an array of page IDs in the `pageIds` property.

The returned value is always an array of [`PageMetadata`](../../../references/addonsdk/app-document.md#pagemetadata) objects.

### Single Page Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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
  //     "hasVideoContent": true,
  //     "hasAudioContent": true,
  //     "hasAnimatedContent": false,
  //     "hasTemporalContent": true,
  //     "temporalContentDuration": 100,
  //     "pixelsPerInch": 96
  //   },
  // ]
});
```

### Page Range Example

```js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

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
  //     "hasAudioContent": false,
  //     "hasVideoContent": true,
  //     "hasAnimatedContent": false,
  //     "hasTemporalContent": true,
  //     "temporalContentDuration": 100,
  //     "pixelsPerInch": 96
  //   },
  //   {
  //     "id": "8d5b1f9a-7289-4590-9ee4-a15a731698ed",
  //     "size": { "width": 1080, "height": 1080 },
  //     "title": "Second",
  //     "hasPremiumContent": false,
  //     "hasAudioContent": false,
  //     "hasVideoContent": true,
  //     "hasAnimatedContent": false,
  //     "hasTemporalContent": true,
  //     "temporalContentDuration": 100,
  //     "pixelsPerInch": 96
  //   }
  // ]
});
```

## Use Cases

Page metadata can be used to determine the size of the page, the title, and whether it contains temporal content (videos and animations). Tge `hasPremiumContent` property is particularly helpful when dealing with the rendition of [premium content](./premium-content.md)—for instance, when the user is not authorized to export/download assets that are available only to paid subscribers.

## FAQs

#### Q: How do I get page metadata?

**A:** Call `addOnUISdk.app.document.getPagesMetadata()` with range and optional pageIds parameters.

#### Q: What range options are available?

**A:** currentPage, entireDocument, or specificPages from `addOnUISdk.constants.Range`.

#### Q: What does getPagesMetadata return?

**A:** Always returns an array of PageMetadata objects, even for single pages.

#### Q: How do I get specific pages metadata?

**A:** Use `range: specificPages` and provide an array of page IDs in the pageIds parameter.

#### Q: What properties are in PageMetadata?

**A:** id, size, title, hasPremiumContent, hasVideoContent, hasAudioContent, hasAnimatedContent, temporalContentDuration, pixelsPerInch.

#### Q: What is hasPremiumContent used for?

**A:** Indicates if the page contains premium content, helpful for rendition permissions and export controls.

#### Q: What does hasTemporalContent indicate?

**A:** Shows if the page contains time-based content like videos or animations.

#### Q: What are common use cases?

**A:** Determining page size, checking for premium content before export, and identifying temporal content duration.
