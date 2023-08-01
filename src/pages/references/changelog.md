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
  - Add-on Manifest
  - AddOnSdk
title: Changelog
description: This is the changelog page
contributors:
  - https://github.com/hollyschinsky
---

# Changelog

## 2023-08-04

### Added

- Added new [references section](../references/scriptruntime/) for the Script Runtime APIs. NOTE: these APIs will not be available for use until August 4 at the earliest.

### Important notes on Script Runtime APIs

- Debugging & Console messages
  - You may see "Empty transaction not added to pendingTransaction" while running code in the script runtime. You can ignore this for now.
  - You may see "Detected a possible stutter. Excessive ECS Frame duration of ## ms" in the console. You can ignore this for now.
  - If your script code has a syntax error, the console will log an unhelpful error message (similar to `Uncaught (in promise) at <adobe-internal.js:49>`). Your add-on panel UI will be visible and continue to be interactive, but it won't be able to communicate with the script runtime, resulting in what feels like non-responsive UI (e.g., clicking doesn't trigger the expected action). You'll want to configure your editor to highlight any syntax editors so that you can be sure your code is at least syntactically correct before you save.
- Intermittent issues
  - Auto reload of the add-on when a change is detected sometimes fails to work properly. This can result in changes to the UI HTML not being reflected, but can also cause the connection between the panel UI and the script runtime to not be properly initialized (your UI may appear to be unresponsive as a result). If you encounter this situation, manually reloading the add-on from the developer panel will usually resolve the issue. We're working on a fix.
  - It's occasionally possible to run into a race condition where the communications bridge between the two contexts (panel vs script runtime) is not set up in time. If you interact with your panel UI immediately after it's reloaded, the click may appear do nothing instead of invoking your script code. We're working on a fix for this.
- Common pitfalls
  - If you split your work on a document over multiple frames using `setTimeout`, be sure to protect against reentrancy, otherwise you may end up corrupting the user's undo stack. You should disable elements on the panel UI that could allow the user to execute your code before it is complete and then re-enable those elements when the code is done. The issue will be fixed in a future release.
  - When setting up communication between your panel UI code and your script sandbox code, calling `apiProxy()` with the wrong argument will do nothing without providing any error feedback.  If communication is not working, carefully double-check your UI code is requesting the `"script"` API proxy and your script sandbox code is requesting the `"panel"` API proxy.
- Unexpected behavior
  - If the user has a selection and your add-on creates new content, the selection is cleared. This will be addressed before release. An API will be added in the future that will allow you to change the selection to content your add-on creates.
  - When you add text content to a document, font substitution is not working correctly. This means that if you use Asian-language characters, the user may see square boxes instead. If the user were to type the content manually, however, they would see the correct rendering. This issue will be fixed before release.
  - Setting rotation on an empty group is ignored. Always add content (children) to a group first, and then set its rotation.
- Likely API changes
  - Creating colors is currently done via `utils.createColor()`. We're likely to change how you assign colors to objects, so bear this in mind as you use the experimental APIs. Note that this means you cannot just pass a plain JS object of the form `{red, green, blue}` to the Editor APIs — it must be a color created using `utils.createColor`.
  - Editor API constants may be renamed or may change how they are accessed.
  - Fills and strokes can only be assigned to a single parent element. If you try to append a fill from one element to another element, the fill will be _moved_ and not cloned (just like moving a scenenode object from one parent to another). This behavior may change in the future.
  - There is no support for `fetch` in the Script Runtime environment. You can work around this by exposing a method from your panel that your script code can call that does the work of fetching remote content. In the future we may abstract this for you automatically.
- Typings & Typescript
  - Typings and samples showing how to use Typescript will be available in a future release.

## 2023-08-01

### Added

- Added new properties to the manifest reference for `renditionPreview` in the [`requirements`](../references/manifest/index.md#requirements) section, and the `script` property to the [`entryPoints`](../references/manifest/index.md#entrypoints) section to support the new experimental [script runtime APIs](../references/scriptruntime/).
- Added [`DisableDragToDocument`](./addonsdk/addonsdk-app.md#disabledragtodocument-type-definition) and [`dropCancelReason`](../references/addonsdk/addonsdk-app.md#dragendeventdata) support to the [`addonsdk.app`](./addonsdk/addonsdk-app.md) reference.

## 2023-07-11

### Added

- [UX Guidelines](../guides/design/index.md) are now available!
- A new [`requestedSize`](../references/addonsdk/app-document/#jpgrenditionoptions) parameter can now be supplied as part of the JPG and PNG rendition options passed in when exporting content with the `createRenditions` method.
- A new [`clipboard` permission](../references/manifest/#entrypointspermissions) can now be set with the `clipboard-write` value in the manifest to allow an add-on to write data to the clipboard.
- Information on [using fonts](../guides/design/index.md#using-fonts).
- CORS / COEP header handling added to [CORS guide](../guides/develop/cors.md#cors--coep-handling).

## 2023-06-08

### Added

- Initial release for the beta version of Adobe Express.
