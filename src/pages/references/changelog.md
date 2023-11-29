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
description: Contains a running log of changes to the add-on documentation, SDK, CLI, etc. 
contributors:
  - https://github.com/hollyschinsky
---

# Changelog

## 2023-11-28

### Updates

- The [Document API References](./document-sandbox/document-apis/) were updated with the following additions and changes:

 **New Classes/Interfaces**<br/>

  - New [RestrictedItemList class](./document-sandbox/document-apis/classes/RestrictedItemList.md)
  - New [UnknownNode class](./document-sandbox/document-apis/classes/UnknownNode.md)
  - New [SolidColorShapeNode class](./document-sandbox/document-apis/classes/SolidColorShapeNode.md)
  - New [Point interface](./document-sandbox/document-apis/interfaces/Point.md)
  - New `queueAsyncEdit` method added to the [Editor](./document-sandbox/document-apis/classes/Editor.md) class.

 **Updates to Node Classes**<br/>

 The accessors and methods below were removed or replaced with new names in the [`Node` class](./document-sandbox/document-apis/classes/Node.md) and classes that extend it. Please refer to the [Document API References](./document-sandbox/document-apis/) specifically to learn more about each.

  - Removes `absoluteRotation` accessor
  - Removes `absoluteTransform` accessor
  - Removes `relativeRotation` accessor
  - Removes `relativeTransform` accessor
  - Removes `translateX` accessor
  - Removes `translateY` accessor
  - Adds `rotation` accessor
  - Adds `rotationInScreen` accessor
  - Adds `transformMatrix` accessor
  - Adds `translation` accessor
  - Adds `setPositionInParent` method
  - Adds `setRotationInParent` method

- The [Web API's in the Document Sandbox Reference](./document-sandbox/web/index.md) were updated to remove the timer methods which are no longer supported (ie: `setTimeout()`, `clearTimeout` and `setInterval()`, `clearInterval`). 

## 2023-11-27

Updated [Document API references](./document-sandbox/document-apis/) to include:

- [ComplexShapeNode class](./document-sandbox/document-apis/classes/ComplexShapeNode.md)
- [GridLayoutNode class](./document-sandbox/document-apis/classes/GridLayoutNode.md)
- [IStrokableNode interface](./document-sandbox/document-apis/interfaces/IStrokableNode.md)
- [FillRule constant](./document-sandbox/document-apis/enums/FillRule.md)

## 2023-11-6

- Added a [new tutorial section](../guides/tutorials/) to the Getting Started guides, including a new ["Building your first add-on with the Document API" tutorial](../guides/tutorials/grids-addon.md) by Davide Barranca.
- Updated the naming conventions from Script Runtime to Document Sandbox and Editor APIs to Adobe Express Document APIs. The Document Sandbox now includes the Communication APIs, Web APIs and the Document APIs.
- Updated sample code snippets to use the `addOnUISdk` import name (vs `AddOnSDK`) similar to what's generated in the templates for consistency.

## 2023-10-26

### Updates

New questions and answers added to the FAQ regarding Adobe's use of add-on data, where to file feature requests and more.

## 2023-10-10

### Updates

Updates to the [OAuth APIs](./addonsdk/app-oauth.md) to allow for a new optional `windowSize` parameter to be specified in the [`AuthorizationRequest`](./addonsdk/app-oauth.md#authorizationrequest) object and the [`AuthorizeWithOwnRedirectRequest`](./addonsdk/app-oauth.md#authorizewithownredirectrequest) to set the desired size of the authorization window.

## 2023-10-09

### Updates

Published new [Guidelines and requirements section](../guides/distribute/guidelines/); including [General guidelines](../guides/distribute/guidelines/general/), [Developer brand guidelines](../guides/distribute/guidelines/), [Monetization guidelines](../guides/distribute/guidelines/monetization.md) and [Generative AI guidelines](../guides/distribute/guidelines/genai/).

## 2023-10-03

### Updates

New versions of the CLI packages:

  ```json
    "@adobe-ccwebext/ccweb-add-on-manifest": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-core": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-ssl": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-analytics": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-developer-terms": "1.5.0"
    "@adobe-ccwebext/create-ccweb-add-on": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-scaffolder": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-scripts": "1.5.0"
    "@adobe-ccwebext/ccweb-add-on-sdk-types": "0.3.0"
  ```

which include:

- Updated templates for both iframe and document sandbox add-ons:

    - All new add-ons created (other than those based on javascript) use `spectrum-web-components` with the Express theme pre-set.
    - React-based templates include [`swc-react`](https://opensource.adobe.com/spectrum-web-components/using-swc-react/) setup.
    - The `javascript-with-editor-apis` template has been removed from the initial template selection in this version but replaced with the option from the CLI to [include the document sandbox](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/#cli-generated-script-runtime-add-on) when creating a new add-on.
  
- New type support for typescript based add-ons.
- Ability to recreate your SSL certificates.

#### Documentation updates

- Updated [document sandbox Reference docs](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/#cli-generated-script-runtime-add-on) to reflect the new CLI prompt to include document sandbox (vs the specific template).
- Updated [Getting Started guides](../guides/getting_started/) documentation and screenshots to reflect the **new Add-on Launchpad panel update** to the new **two-tab view** for "Discover" and "Your Add-ons".

## 2023-09-26

### Removed

- Removed the experimental APIs notes/warnings around the **Audio APIs and User APIs** since they **are now stable**.
- Removed references to the Dropbox sample since the [import-images-from-oauth](https://developer.adobe.com/express/add-ons/docs/samples/#import-images-using-oauth) contains the same functionality.

### Updated

- Updated the Express add-ons [introduction video](https://developer.adobe.com/express/add-ons/docs/guides/) with a newly created version.

## 2023-09-25

### Updates

The [Editor API references](https://developer.adobe.com/express-add-on-apis/docs/api/classes/Editor/) have been updated with additional descriptions and details as well as some new and modified APIs:

- Artboard now has a single fill only. **Note:** it's possible that all node types will move to this model in the near future.
- The `name` property is now only available on `PageNode`, not all node types.
- New `Node.locked` & `Context.selectionIncludingNonEditable` properties were added for the locking feature that recently shipped in Express.

<InlineAlert slots="text" variant="info"/>

If you're using the experimental Document Sandbox APIs (aka: Script Runtime) in any add-ons currently, we encourage you to check the specific methods and objects you're using in these [updated references](https://developer.adobe.com/express-add-on-apis/docs/api/classes/Editor/) to discover anything new or changed.

## 2023-09-19

### Added

- New [iframe Sandbox Context guide](../guides/develop/context.md) with details on the new `subdomain` support and CORS handling.
- How-to videos embedded in various guides to help visually show how to use the information in those sections.

### Updates

- **New Types Package Versions Released** <br/>
  - A new version `0.1.6` of the `@adobe-ccwebext/ccweb-add-on-sdk-types` package with the latest typings for the [`AddOnSDK` (iframe)](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/), including new experimental APIs, as well as general improvements and bug fixes.
  - A new version `0.2.0` of the `@adobe-ccwebext/ccweb-add-on-sdk-types` package with the latest typings for the **document sandbox/Editor APIs**.
  
  **IMPORTANT**:
  Developers who are **NOT** using the [document sandbox/Editor APIs](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/) should update to their types package to `0.1.6` at minimum by changing the version of it to `@adobe-ccwebext/ccweb-add-on-sdk-types@0.1.6` in the `package.json`.
  
  The new types `0.2.0` types package will be used automatically for any new add-ons created. If you would like to update an existing add-on to the `0.2.0` version, you will need to update the `ccweb-add-on-sdk-typings.d.ts` file in your add-on with the content [here](https://github.com/adobe-ccwebext/ccweb-add-on-cli/blob/main/packages/wxp-sdk-typings/ccweb-add-on-sdk-typings.d.ts).

- [Performance guide](../guides/develop/performance.md) updates to include [**Task Manager**](https://developer.adobe.com/express/add-ons/docs/guides/develop/performance.md#task-manager) and [**Memory Consumption**](https://developer.adobe.com/express/add-ons/docs/guides/develop/performance.md#memory-consumption-monitoring) details for add-ons.
- [FAQ update](../guides/faq.md) for [`SharedArrayBuffer`](https://developer.adobe.com/express/add-ons/docs/guides/faq/#is-sharedarraybuffer-supported).

## 2023-09-12

### Updates

- Added supported file types for import and export to the [FAQ](../guides/faq.md).

## 2023-09-07

### Updates

- The [Communication API docs](../references/document-sandbox/communication/index.md) in the [document sandbox Reference](../references/document-sandbox/) section was updated to change the example code importing the SDK to a default import rather than a named import as it was previously:

  from:

  `import { AddOnSdkApi } from "AddOnSdkApi";`
  
  to:
  
  `import AddOnScriptSdk from "AddOnScriptSdk";`
  
  Note that you can now name the imported module whatever you'd like, but for simplicity in the examples, the name is kept the same. **Since these APIs are currently experimental, this change will not impact any in-production add-ons, *however*, it will require you to update any existing usage of these APIs in progress**.

- A **new 1.4.2 version of the CLI** was also released with an updated [`javascript-with-editor-apis` template](../references/document-sandbox/index.md) reflecting the default SDK import noted in the first bullet above. The new CLI version will install automatically when you create a new add-on, or you can update existing add-ons by changing the version of the `ccweb-add-on-scripts` in the `package.json` to `1.4.2`.
- Updated the [FAQ](../guides/faq.md) with details on Experimental APIs and suppported file types for exported content.

## 2023-09-05

### Added

Added new **Audio API** documentation. You can now import audio to the current Adobe Express document in two different methods:
  
  1. Using the new [`addAudio()`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addaudio) method, which requires a [`MediaAttributes`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#mediaattributes) object containing the `title` of the audio content.
  2. Using [drag and drop](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#enabledragtodocument), and supplying the [`MediaAttributes`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#mediaattributes) object in the [`DragCompletionData`](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/addonsdk-app/#dragcompletiondata).

 Please note, in both cases, the `MediaAttributes` object is required for audio content, but optional for video and image content. A new code sample will be supplied in the near future, but in the meantime, please refer to the example usage snippets provided in the [SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document/#addaudio) and [Implementing Common Use Cases Guide](https://developer.adobe.com/express/add-ons/docs/guides/develop/).

<!-- <InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The new Audio API's are currently ***experimental only*** and should not be used in any add-ons you will be distributing until they have been deemed stable. To try out these new APIs, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../manifest/index.md#requirements) section of the `manifest.json`. -->

## 2023-08-31

### Added

Added new code sample to demonstrate how to use SWC-React and set theme properties in add-ons called **swc-react-theme-sampler** to the [Code Samples](https://developer.adobe.com/express/add-ons/docs/samples/#swc-react-theme-sampler).

### Updated

- Updated the [User Interface Guide](../guides/index.md) to add more notes around the recommended use of `swc-react` over React Spectrum and to point to the new sample mentioned above.

### Fixed

- Fixed bug in the [locale](./addonsdk/app-ui.md) example.

## 2023-08-29

- Added [`currentUser` API](../guides/develop/use_cases.md#current-user-for-monetization-flows) details and usage example to the [SDK References](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/) and [Implementing Common Use Cases Guide](../guides/develop/use_cases.md).
- Added a new [licensed-addon code sample](https://developer.adobe.com/express/add-ons/docs/samples.md#licensed-addon) to illustrate how to implement monetization by leveraging the current userid.
- Added [`devFlags` API](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-devFlags) details, which can be used to simulate certain behavior during development.

## 2023-08-17

### Bugs and Fixes

- There's currently a bug where `addArtboard` could crash the application or corrupt the document if there's no `fill` specified on the artboard. *Please ensure you always add a fill in the same frame as the artboard creation until this issue is resolved*. Also note, when this bug is fixed, the `ArtboardNode` will accept a single `fill` object, rather than an `ItemList` of `fill`(s).

- Currently, in the `addPage` API, a new page is created, but the selected context is not changed to the newly added `artboard`. As a result, from a UI perspective, the user remains on the previous page. A change will be implemented this week which will change the default context to the `artboard` child of the newly added page. This results in actual navigation to the newly added page, and all new content which is added using the Editor APIs will be added to this page.

  **IMPORTANT:** We recommend that you ***only test the use of these experimental Editor APIs against non-essential documents***, due to the potential for loss or corruption.

### Updates

- Premium Content handling details have been added to the [Implementing Common Use Cases Guide](../guides/develop/use_cases.md#premium-content). Note the warning for ensuring that you include the specified `permissions` in the [`manifest.json`](../references/manifest/index.md#entrypointspermissionssandbox) to `allow-popups` and `allow-popups-to-escape-sandbox` to ensure the pricing page can be loaded when needed (and note the addition of the `renditionPreview` flag in the [`requirements`](../references/manifest/index.md#requirements) of the manifest when you want to allow premium content to be previewed).

## 2023-08-09

### Added

- Added new [references section](../references/document-sandbox/) for the document sandbox APIs.

### Important notes on document sandbox APIs (aka Document Sandbox)

- These APIs are experimental!
  - Do not test your add-ons on documents that you care about as these APIs are not currently considered stable.
  - Be sure to only use documented APIs when writing your add-ons. Use of undocumented APIs (which may be prefixed with an underscore, but not always) is not supported and may cause your add-on to fail or lead to document corruption. Visibility of a method or property is visible via `console.log` is not an indication of whether that field is supported or documented.
- Debugging & Console messages
  - You may see "Empty transaction not added to pendingTransaction" while running code in the document sandbox. You can ignore this for now.
  - You may see "Detected a possible stutter. Excessive ECS Frame duration of ## ms" in the console. You can ignore this for now.
  - If your script code has a syntax error, the console will log an unhelpful error message (similar to `Uncaught (in promise) at <adobe-internal.js:49>`). Your add-on panel UI will be visible and continue to be interactive, but it won't be able to communicate with the document sandbox, resulting in what feels like non-responsive UI (e.g., clicking doesn't trigger the expected action). You'll want to configure your editor to highlight any syntax editors so that you can be sure your code is at least syntactically correct before you save.
- Intermittent issues
  - Auto reload of the add-on when a change is detected sometimes fails to work properly. This can result in changes to the UI HTML not being reflected, but can also cause the connection between the panel UI and the document sandbox to not be properly initialized (your UI may appear to be unresponsive as a result). If you encounter this situation, manually reloading the add-on from the developer panel will usually resolve the issue. We're working on a fix.
  - It's occasionally possible to run into a race condition where the communications bridge between the two contexts (panel vs document sandbox) is not set up in time. If you interact with your panel UI immediately after it's reloaded, the click may appear do nothing instead of invoking your script code. We're working on a fix for this.
- Common pitfalls
  - If you split your work on a document over multiple frames, be sure to protect against reentrancy, otherwise you may end up corrupting the user's undo stack. You should disable elements on the panel UI that could allow the user to execute your code before it is complete and then re-enable those elements when the code is done. The issue will be fixed in a future release.
  - When setting up communication between your panel UI code and your script sandbox code, calling `apiProxy()` with the wrong argument will do nothing without providing any error feedback.  If communication is not working, carefully double-check your UI code is requesting the `"script"` API proxy and your script sandbox code is requesting the `"panel"` API proxy.
- Unexpected behavior
  - If the user has a selection and your add-on creates new content, the selection is cleared. This will be addressed before release. An API will be added in the future that will allow you to change the selection to content your add-on creates.
  - When you add text content to a document, font substitution is not working correctly. This means that if you use Asian-language characters, the user may see square boxes instead. If the user were to type the content manually, however, they would see the correct rendering. This issue will be fixed before release.
  - Setting a blend mode on a media container node (e.g., after calling `editor.createImageContainer`) will be visually reflected, but doesn't currently update the "Blend mode" field in the property panel.
  - Setting rotation on an empty group is ignored. Always add content (children) to a group first, and then set its rotation.
  - When removing elements from a parent element, the element may continue to show in the Adobe Express layer stack. This will be addressed in the future. This can also occur if you call `clear()` to remove all children from an element as well as when using `removeFromParent()`.
  - Shape elements added to the document by users (via the Media tab) do not support fill or stroke properties at this time. Furthermore, you should generally avoid making changes to these shapes (they'll appear as group nodes), as this could corrupt the document. We'll add protections around this in an upcoming release.
  - While the API supports adding multiple strokes to elements, Express currently only supports editing the *first* stroke added. If you want to change the stroke of an element, *remove* the existing strokes and then add the new stroke so that the element continues to have a single stroke. For example:

    ```js
    element.strokes.clear();
    element.strokes.append(newStroke);
    ```

- Likely API changes
  - Creating colors is currently done via `utils.createColor()`. We're likely to change how you assign colors to objects, so bear this in mind as you use the experimental APIs. Note that this means you cannot just pass a plain JS object of the form `{red, green, blue}` to the Editor APIs — it must be a color created using `utils.createColor`.
  - Editor API constants may be renamed or may change how they are accessed.
  - Fills and strokes can only be assigned to a single parent element. If you try to append a fill from one element to another element, the fill will be *moved* and not cloned (just like moving a scenenode object from one parent to another). This behavior may change in the future.
  - There is no support for `fetch` in the document sandbox environment. You can work around this by exposing a method from your panel that your script code can call that does the work of fetching remote content. In the future we may abstract this for you automatically.
  - The `strokes` API is likely to be modified so that it only supports a single stroke.
- Typings & Typescript
  - Typings and samples showing how to use Typescript will be available in a future release.

## 2023-08-01

### Added

- Added new properties to the manifest reference for `renditionPreview` in the [`requirements`](../references/manifest/index.md#requirements) section, and the `script` property to the [`entryPoints`](../references/manifest/index.md#entrypoints) section to support the new experimental [document sandbox APIs](../references/document-sandbox/).
- Added [`DisableDragToDocument`](./addonsdk/addonsdk-app.md#disabledragtodocument-type-definition) and [`dropCancelReason`](../references/addonsdk/addonsdk-app.md#dragendeventdata) support to the [`addonsdk.app`](./addonsdk/addonsdk-app.md) reference.

## 2023-07-11

### Added

- [UX Guidelines](../guides/design/index.md) are now available!
- A new [`requestedSize`](../references/addonsdk/app-document.md#jpgrenditionoptions) parameter can now be supplied as part of the JPG and PNG rendition options passed in when exporting content with the `createRenditions` method.
- A new [`clipboard` permission](../references/manifest/index.md#entrypointspermissions) can now be set with the `clipboard-write` value in the manifest to allow an add-on to write data to the clipboard.
- Information on [using fonts](../guides/design/user_interface.md#using-fonts).
- CORS / COEP header handling added to the [CORS guide](../guides/develop/context.md#cors--coep-handling)

## 2023-06-08

### Added

- Initial release for the beta version of Adobe Express.
