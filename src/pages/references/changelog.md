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

## 2023-08-01

### Added
- Added new [references section](../references/scriptruntime/) for the Script Runtime APIs. 
- Added new properties to the manifest reference for `renditionPreview` in the [`requirements`](../references/manifest/index.md#requirements) section, and the `script` property to the [`entryPoints`](../references/manifest/index.md#entrypoints] section to support the new experimental [script runtime APIs](../references/scriptruntime/). 
- Added [`DisableDragToDocument`](./addonsdk/addonsdk-app.md#disabledragtodocument-type-definition) and [`dropCancelReason`](../references/addonsdk/addonsdk-app.md#dragendeventdata) support to the [`addonsdk.app`](./addonsdk/addonsdk-app.md) reference.

### Important notes on Script Runtime APIs

* Intermittent issues
  * Auto reload of the add-on when a change is detected sometimes fails to work properly. This can result in changes to the UI HTML not being reflected, but can also cause the connection between the panel UI and the script runtime to not be properly initialized (your UI may appear to be unresponsive as a result). If you encounter this situation, manually reloading the add-on from the developer panel will usually resolve the issue. We're working on a fix.
  * It's occasionally possible to run into a race condition where the communications bridge between the two contexts (panel vs script runtime) is not set up in time. If you interact with your panel UI immediately after it's reloaded, the click may appear do nothing instead of invoking your script code. We're working on a fix for this.
* Performance
  * The script runtime uses QuickJS to ensure that the code is properly sandboxed. This does mean that performance for some operations may be significantly slower than you might expect. In particular, you may see warnings on the console similar to `Detected a possible stutter. Excessive ECS Frame duration of ## ms` when adding lots of shapes or performing calculations. The higher this number is the more likely the user is going to perceive your add-on as slow and may think that your add-on has crashed. You may want to consider splitting your work into multiple frames (using `setTimeout`) in order to reduce the frequency of these messages. Note that currently it can be hard to avoid these messages even when adding only a few shapes to the document at time. A few milliseconds isn't a big deal, but you should try to avoid frames that take more than 150ms, which may start to cause other warnings to appear, and may cause users to feel like your add-on is not responsive.
  * If your code takes more than about 150-160ms to process, you may see warnings from the co-editing service in the console (`LECCoeditingService: Invalid sequenceNumber`). The cause for this is being researched and will be addressed in a future release. To reduce the number of times you see this error, reduce the length of time your script takes in a single editing frame — use `setTimeout` if necessary to batch your work.
* Common pitfalls
  * If you split your work on a document over multiple frames using `setTimeout`, be sure to protect against reentrancy, otherwise you may end up corrupting the user's undo stack. You should disable elements on the panel UI that could allow the user to execute your code before it is complete and then re-enable those elements when the code is done. The issue will be fixed in a future release. 
  * When setting up communication between your panel UI code and your script sandbox code, calling `apiProxy()` with the wrong argument will do nothing without providing any error feedback.  If communication is not working, carefully double-check your UI code is requesting the `"script"` API proxy and your script sandbox code is requesting the `"panel"` API proxy.
  * When adding shapes to a document, you should take care to ensure that the content is at least partially visible on the page. Otherwise the user may not have a way to edit it easily in the future.
* Unexpected behavior
  * If the user has a selection and your add-on creates new content, the selection is cleared. This will be addressed before release.
  * When you add text content to a document, font substitution is not working correctly. This means that if you use Asian-language characters, the user may see square boxes instead. If the user were to type the content manually, however, they would see the correct rendering. This issue will be fixed before release.
  * Setting relative rotation on a group before adding any children is considered a "no-op" since these groups don't have a defined center point. Always modify group rotation after adding children.
* Debugging
  * If your script code has a syntax error, the console will log an unhelpful error message (similar to `Uncaught (in promise) at <adobe-internal.js:49>`). Your add-on panel UI will be visible and continue to be interactive, but it won't be able to communicate with the script runtime, resulting in what feels like non-responsive UI (e.g., clicking doesn't trigger the expected action). You'll want to configure your editor to highlight any syntax editors so that you can be sure your code is at least syntactically correct before you save.
  * When you communicate to your panel from the script runtime, you may see `Empty transaction not added to pendingTransactions` in the browser log. A common use case might be to communicate progress if you're creating a lot of elements on the document. In this case, you should throttle how often you send progress updates to your panel so that you don't generate hundreds or thousands of these log messages (since this may get in the way of easily debugging any issues that might arise).
* Likely API changes
  * Creating colors is currently done via `utils.createColor()`. We're likely to change how you assign colors to objects, so bear this in mind as you use the experimental APIs. Note that this means you cannot just pass a plain JS object of the form `{red, green, blue}` to the Editor APIs — it must be a color created using `utils.createColor`.
  * Editor API constants may be renamed or may change how they are accessed.
  * Fills and strokes can only be assigned to a single parent element. If you try to append a fill from one element to another element, the fill will be _moved_ and not cloned (just like moving a scenenode object from one parent to another). This behavior may change in the future.
  * There is no support for `fetch` in the Script Runtime environment. You can work around this by exposing a method from your panel that your script code can call that does the work of fetching remote content. In the future we may abstract this for you automatically.
* Typings & Typescript
  * Typings and samples showing how to use Typescript will be available in a future release.

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
