---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Document Sandbox
  - Large Document Support
  - Active Content Facade
  - ACF
  - active page
  - inactive page
  - visitPages
  - keepContentActiveDuringAsync
  - ActivePageNode
  - PageNode
  - PageList
  - BaseNode
  - ArtboardNode
  - allDescendants
  - allTextContent
  - artboards
  - cloneInPlace
  - queueAsyncEdit
  - bringIntoView
  - editor.context.currentPage
  - editor.documentRoot.pages
  - stale node reference
  - deprecated APIs
  - migration
  - experimentalApis
  - feature flag
  - testing
title: Support Large Documents
description: Update your add-on for Large Document Support—visit pages safely, keep content active across async operations, and replace deprecated APIs.
contributors:
  - https://github.com/undavide
faq:
  questions:
    - question: "Which add-ons are affected by Large Document Support?"
      answer: "Add-ons that iterate over all pages, read content on pages that aren't in view, jump between pages, or hold node references across an asynchronous boundary."
    - question: "How do I read content on pages that aren't currently in view?"
      answer: "Call `editor.documentRoot.pages.visitPages()`. Each page is made active in turn and your callback receives a fully accessible `ActivePageNode`."
    - question: "Do I need to call queueAsyncEdit() inside a visitPages callback?"
      answer: "No. The page is guaranteed to stay active for the duration of the callback, so you can edit the document without `editor.queueAsyncEdit()`."
    - question: "How do I keep the current page active during a network request?"
      answer: "Wrap the asynchronous work in `editor.keepContentActiveDuringAsync()` so the page's content remains accessible until the operation completes."
    - question: "Why does my node reference throw after an await?"
      answer: "The page that node lives on may have become inactive during the wait, and content is only accessible on active pages. Keep it active with `editor.keepContentActiveDuringAsync()`, or re-acquire the node inside a `visitPages()` callback."
    - question: "What replaces PageNode.artboards, allTextContent, and cloneInPlace?"
      answer: "They move to `ActivePageNode`. Access them on the active page—for example the page your `visitPages()` callback receives, or `editor.context.currentPage`."
    - question: "What replaces queueAsyncEdit()?"
      answer: "`editor.keepContentActiveDuringAsync()`. `queueAsyncEdit()` is deprecated as part of Large Document Support."
    - question: "Can I use bringIntoView() to activate an inactive page?"
      answer: "No. `bringIntoView()` is a viewport primitive, not a page-switch primitive; it throws when called with a node on an inactive page. Use `visitPages()` to make a page active for content access."
    - question: "Are visitPages and keepContentActiveDuringAsync stable?"
      answer: "Not yet. In Phase 1 they are experimental, so set `experimentalApis: true` in your `manifest.json` during development."
    - question: "How do I test my add-on with Large Document Support?"
      answer: "Open https://new.express.adobe.com/lArg3-d0c-supp0rt-4-add0ns in its own browser tab—that URL enforces Large Document Support for developer testing. Stress-test with your add-on open: add pages, switch pages in the UI mid-operation, use very long documents, and re-run whole-document passes and async workflows. Don't share the URL with end users."
    - question: "Do my iframe (Add-on UI SDK) APIs need changes?"
      answer: "No. If your add-on uses only the iframe `document.*` APIs—`createRenditions`, `getPagesMetadata`, `addImage`—Adobe Express activates the pages those calls need for you. Migration applies to Document Sandbox code (`editor.*`, `pages.*`)."
---

# Support Large Documents

Adobe Express no longer keeps every page of a document loaded at once, so add-ons must access page content only while a page is active.

For the model behind this—active versus inactive pages, and why it exists—see [Large Document Support](../platform-concepts/large-document-support.md). This guide covers the code changes.

<InlineAlert slots="text1" variant="warning"/>

**IMPORTANT:** The `visitPages` and `keepContentActiveDuringAsync` APIs are currently **_experimental only_** and require the `experimentalApis` flag set to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of `manifest.json`.

<InlineAlert slots="header, text1" variant="info"/>

**These recipes are for the Document Sandbox**

They apply to the Document Sandbox APIs (`editor.*`, `pages.*`). If your add-on uses only the iframe Add-on UI SDK (`addOnUISdk.app.document.*`—`createRenditions`, `getPagesMetadata`, `addImage`, and the like), you don't need to change anything: Adobe Express activates the pages those calls need on your behalf.

## What you don't need to change

Several common operations stay safe and need no migration:

- Anything on the **current** page, accessed synchronously—`editor.context.currentPage` and its content.
- **Page metadata** on any page—`id`, `name`, `width`, `height`, and add-on data—even when the page is inactive.
- Iterating `editor.documentRoot.pages` itself (the page list), as long as you don't read each page's content.
- `editor.create*()` factories and `editor.loadBitmapImage()`, which return objects that aren't tied to a page.

## Visit all pages in a document

The `visitPages()` method on [`editor.documentRoot.pages`](../../../references/document-sandbox/document-apis/classes/page-list.md) accepts an array of pages and a callback. It activates each page in turn and invokes the callback with a fully accessible `ActivePageNode`, so you can read and write that page's content. The page is guaranteed to remain active until the callback returns; if the callback returns a promise, the page stays active until it resolves (use an `async` callback when you need to `await`). There is no need to call [`editor.queueAsyncEdit()`](../../../references/document-sandbox/document-apis/classes/editor.md) inside the callback. Pages may be visited in a different order than the array you pass.

### Example: Read content on every page

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const pages = editor.documentRoot.pages;

// Visit every page; each `page` is an ActivePageNode, active for the callback's duration
await pages.visitPages([...pages], (page) => {
  // 👈 pass an array of pages
  for (const textNode of page.allTextContent) {
    // content is accessible here
    console.log("text:", textNode.textContentModel.text);
  }
});
```

Iterating a large document can take several seconds. Pair long-running passes with a progress indicator so the user knows work is underway.

### Example: Copy the selected node to every other page

To operate across pages, do it inside the callback while each destination page is active. The following clones the selected node onto every other page:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const pages = editor.documentRoot.pages;
const sourcePage = editor.context.currentPage;
const sourceNode = editor.context.selection[0];

// Everything except the source page
const destPages = [...pages].filter((p) => p.id !== sourcePage.id);

await pages.visitPages(destPages, (activePage) => {
  // 👈 each activePage is active here
  const clone = sourceNode.cloneInPlace();
  activePage.artboards.first.children.append(clone); // ✅ append onto the active page
});
```

### Example: Process every page with an async call

Use an `async` callback when each page needs an `await`—the page stays active until the returned promise resolves:

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const pages = editor.documentRoot.pages;

const translateAll = async (texts) => {
  // Simulate an async operation
  return texts.map(() => "Translated text");
};

await pages.visitPages([...pages], async (page) => {
  // 👈 async callback
  const textNodes = [...page.allTextContent];
  const originals = textNodes.map((n) => n.text);

  // The page stays active across this await
  const translated = await translateAll(originals);

  textNodes.forEach((n, i) => (n.textContentModel.text = translated[i]));
});
```

## Read content on the active page

[`editor.context.currentPage`](../../../references/document-sandbox/document-apis/classes/context.md) returns an `ActivePageNode`—the page currently in view (`pages.addPage()` and `artboard.parent` return one too). Page **content** (`artboards`, and the nodes within) and subtree traversal (`allDescendants`, `allTextContent`) live on `ActivePageNode`, not on [`PageNode`](../../../references/document-sandbox/document-apis/classes/page-node.md). Page **metadata** (`id`, `addOnData`, `width`, `height`, `name`) remains on `PageNode` and is readable even when the page is inactive.

### Example: Work with the active page's content

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const page = editor.context.currentPage; // ActivePageNode

// Metadata is always available
console.log("page:", page.id, page.width, "x", page.height);

// Content is available because this page is active
const artboard = page.artboards.first; // 👈 artboards live on ActivePageNode
console.log("items on the artboard:", artboard.children.length);
```

## Keep content active during async operations

Reach for `keepContentActiveDuringAsync()` when you already hold a **single** node or page and need it to survive one `await`; use `visitPages()` instead when you're iterating across pages. When an add-on awaits an asynchronous operation (a network request, a translation call), the user may navigate away and the node it was working on may go stale. The `editor.keepContentActiveDuringAsync()` method takes a **target** node (or page) to keep active, an **async lambda** that does the awaiting, and a **synchronous follow-up** that runs while the target is still active:

```js
// sandbox/code.js
editor.keepContentActiveDuringAsync(target, asyncFunction, afterAsyncCallback);
```

### Example: Update a node after an async call

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Assuming the user has selected a text node
const textNode = editor.context.selection[0];

const translateText = async (text) => {
  // Simulate an async operation
  return "Translated text";
};

await editor.keepContentActiveDuringAsync(
  textNode, // 👈 the target to keep active
  // async work — your awaits happen here
  async () => translateText(textNode.fullContent.text),
  // synchronous follow-up — runs while `textNode` is still active
  (translated) => {
    // 👈 safe to edit here
    textNode.fullContent.text = translated; // ✅ no queueAsyncEdit() needed
  },
);
```

<InlineAlert slots="header, text1" variant="warning"/>

**The follow-up must be synchronous**

Do all your document edits in the third argument, the `afterAsyncCallback`—it runs synchronously while the target is still active. Once it returns, the target may become inaccessible again, so don't hold the reference past that point.

## Replace deprecated APIs

Several content-access APIs that assumed every page was loaded are deprecated and move to `ActivePageNode`. Update each call to run against an active page (from `visitPages()` or `editor.context.currentPage`). All are removed from the SDK during [Phase 2](../platform-concepts/large-document-support.md#rollout-and-migration-timeline) of the migration.

| Deprecated                | Use instead                             | Removed from SDK |
| :------------------------ | :-------------------------------------- | :--------------- |
| `PageNode.artboards`      | `ActivePageNode.artboards`              | Phase 2          |
| `PageNode.allDescendants` | `ActivePageNode.allDescendants`         | Phase 2          |
| `PageNode.allTextContent` | `ActivePageNode.allTextContent`         | Phase 2          |
| `PageNode.cloneInPlace()` | `ActivePageNode.cloneInPlace()`         | Phase 2          |
| `editor.queueAsyncEdit()` | `editor.keepContentActiveDuringAsync()` | Phase 2          |

### Example: Migrate a whole-document pass

A common pattern—iterating `pages` and reading each page's content—**silently returns empty** for every inactive page, a bug that's easy to miss. Wrap it in `visitPages()`:

```js
// sandbox/code.js — ❌ Before: silently empty under Large Document Support
import { editor } from "express-document-sdk";

for (const page of editor.documentRoot.pages) {
  for (const textNode of page.allTextContent) {
    // ❌ empty for every inactive page
    // ...process textNode
  }
}
```

```js
// sandbox/code.js — ✅ After: Large Document Support–safe
import { editor } from "express-document-sdk";

const pages = editor.documentRoot.pages;
await pages.visitPages([...pages], (page) => {
  // page is an ActivePageNode
  for (const textNode of page.allTextContent) {
    // ✅ available on the active page
    // ...process textNode
  }
});
```

## Avoid stale node references

A node reference is only valid while its page is active. If you capture a node, `await` something, and the page goes inactive in the meantime, touching that node throws. Re-acquire the node inside a `visitPages()` callback, or hold the page active with `keepContentActiveDuringAsync()`.

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

const node = editor.context.selection[0];
await someAsyncOperation();
console.log(node.boundsInParent); // ❌ may throw: the page may now be inactive
```

When this happens, Adobe Express fails fast with an actionable error rather than returning wrong data:

> Stale node reference: this Text is on a page that is no longer active. Do not hold node references across async boundaries. Use Editor.keepContentActiveDuringAsync() to keep a page active, or PageList.visitPages() to access other pages safely.

[`viewport.bringIntoView()`](../../../references/document-sandbox/document-apis/classes/express-viewport.md) scrolls the canvas but does **not** activate a page. It throws when called with a node on an inactive page, so don't use it to "prepare" a page for content access—use `visitPages()` instead.

## Test your add-on with Large Document Support

Don't assume that testing in regular Express exercises this behavior. Use the dedicated Large Document Support testing URL so pages are activated and deactivated as they will be in production, then validate your add-on—especially whole-document passes and any operation that spans an `await`. For background on what the testing environment exercises, see [Large Document Support](../platform-concepts/large-document-support.md#testing).

### Open the testing environment

1. In its own browser tab, open [https://new.express.adobe.com/lArg3-d0c-supp0rt-4-add0ns](https://new.express.adobe.com/lArg3-d0c-supp0rt-4-add0ns).
2. Load your add-on and run your workflows there—not in regular Express.

This URL is a developer feature flag: it enforces the active/inactive page model as if Large Document Support were already the default.

### Stress-test while your add-on is open

Reproduce the flows users trigger without thinking about them:

- Add new pages while a routine is running.
- Switch the active page in the Express UI while your add-on is open or mid-operation.
- Work in very long documents with a lot of content.
- Re-run whole-document passes and any async workflow that spans an `await`.

Keep this testing environment to yourself—do not share the URL with your add-on's users.

## FAQs

#### Q: Which add-ons are affected by Large Document Support?

**A:** Add-ons that iterate over all pages, read content on pages that aren't in view, jump between pages, or hold node references across an asynchronous boundary.

#### Q: How do I read content on pages that aren't currently in view?

**A:** Call `editor.documentRoot.pages.visitPages()`. Each page is made active in turn and your callback receives a fully accessible `ActivePageNode`.

#### Q: Do I need to call queueAsyncEdit() inside a visitPages callback?

**A:** No. The page is guaranteed to stay active for the duration of the callback, so you can edit the document without `editor.queueAsyncEdit()`.

#### Q: How do I keep the current page active during a network request?

**A:** Wrap the asynchronous work in `editor.keepContentActiveDuringAsync()` so the page's content remains accessible until the operation completes.

#### Q: Why does my node reference throw after an await?

**A:** The page that node lives on may have become inactive during the wait, and content is only accessible on active pages. Keep it active with `editor.keepContentActiveDuringAsync()`, or re-acquire the node inside a `visitPages()` callback.

#### Q: What replaces PageNode.artboards, allTextContent, and cloneInPlace?

**A:** They move to `ActivePageNode`. Access them on the active page—for example the page your `visitPages()` callback receives, or `editor.context.currentPage`.

#### Q: What replaces queueAsyncEdit()?

**A:** `editor.keepContentActiveDuringAsync()`. `queueAsyncEdit()` is deprecated as part of Large Document Support.

#### Q: Can I use bringIntoView() to activate an inactive page?

**A:** No. `bringIntoView()` is a viewport primitive, not a page-switch primitive; it throws when called with a node on an inactive page. Use `visitPages()` to make a page active for content access.

#### Q: Are visitPages and keepContentActiveDuringAsync stable?

**A:** Not yet. In Phase 1 they are experimental, so set `experimentalApis: true` in your `manifest.json` during development.

#### Q: How do I test my add-on with Large Document Support?

**A:** Open [https://new.express.adobe.com/lArg3-d0c-supp0rt-4-add0ns](https://new.express.adobe.com/lArg3-d0c-supp0rt-4-add0ns) in its own browser tab—that URL enforces Large Document Support for developer testing. Stress-test with your add-on open: add pages, switch pages in the UI mid-operation, use very long documents, and re-run whole-document passes and async workflows. Don't share the URL with end users.

#### Q: Do my iframe (Add-on UI SDK) APIs need changes?

**A:** No. If your add-on uses only the iframe `document.*` APIs—`createRenditions`, `getPagesMetadata`, `addImage`—Adobe Express activates the pages those calls need for you. Migration applies to Document Sandbox code (`editor.*`, `pages.*`).
