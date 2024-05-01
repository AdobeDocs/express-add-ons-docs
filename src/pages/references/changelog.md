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

## 2024-04-10

- A new [`VisualNode`](./document-sandbox/document-apis/classes/VisualNode.md) class has been added to the Document APIs, and represents any node that can be visually perceived in the content.
- New Document APIs have been added:
  - [`currentPage`](./document-sandbox/document-apis/classes/Context.md#currentpage) Context accessor: returns the active page.
  - [`visualRoot`](./document-sandbox/document-apis/classes/VisualNode.md#visualroot) accessor: the highest ancestor that still has visual presence in the document—typically, an Artboard.
  - [`cloneInPlace()`](./document-sandbox/document-apis/classes/PageNode.md#cloneinplace) method: clones a Page, all artboards within it, and all content within those artboards.
  - Support to Bounds has been added in several classes: [`boundsInParent`](./document-sandbox/document-apis/classes/Node.md#boundsinparent); `boundsLocal` (for both [GroupNode](./document-sandbox/document-apis/classes/GroupNode.md#boundslocal) and [VisualNode](./document-sandbox/document-apis/classes/VisualNode.md#boundslocal)); [`centerPointLocal`](./document-sandbox/document-apis/classes/VisualNode.md#centerpointlocal); [`topLeftLocal`](./document-sandbox/document-apis/classes/VisualNode.md#topleftlocal); [`boundsInNode()`](./document-sandbox/document-apis/classes/Node.md#boundsinnode); [`localPointInNode()`](./document-sandbox/document-apis/classes/VisualNode.md#localpointinnode);
- The CLI has been updated to release version `2.0.0`, and includes the following:
  - Periodic login and EULA consent are no longer required.
  - Two new templates for creating add-ons with built-in support to Spectrum Web Components have been added and documented: `swc-javascript` and `swc-javascript-with-document-sandbox`. Typescript templates have been renamed to `swc-typescript` and `swc-typescript-with-document-sandbox`. See [this page](/guides/getting_started/dev_tooling.md#templates) for details on all the available templates.
  - Typings have been updated to include the latest SDK changes, and other internal packages are now at version `2.0.0`.

 **NOTE:** The new version should be installed by default when you create a new add-on. If, for any reason, it doesn't, you can force it to install by clearing the `npx` cache first with `npx clear-npx-cache` or by specifying the version in the command, i.e.: `npx @adobe/create-ccweb-add-on@2.0.0 my-add-on`.

 - The [Samples](../samples.md) page has been updated to document the existing add-ons in the [`express-add-on-samples`](https://github.com/AdobeDocs/express-add-on-samples) repository, including a newly added [`audio-recording-addon`](../samples.md#audio-recording-addon).
 - The [Common Use Cases](/guides/develop/use_cases) section has been refactored as a sub-menu, grouping similar topics into individual pages. A new [Login and Logout flows](/guides/develop/use_cases/authentication_authorization.md#login-and-logout-flows) section has been added. Other minor fixes and improvements have been made to the documentation. 
  
## 2024-03-19

- Support for Ps and Ai files to be added to the page via the [`addImage()`](../references/addonsdk/app-document.md#addimage) method. (Note: there were no changes to the drag-n-drop APIs).
- Adds new `MediaAttributes` parameter to the [`addImage()`](../references/addonsdk/app-document.md#addimage) method for Ps/Ai file types to pass media attributes like `title`.
- Adds new [`Mp4RenditionOptions`](../references/addonsdk/app-document.md#mp4renditionoptions) object to support `mp4` renditions.
- Adds new [`VideoResolution`](../references/addonsdk/addonsdk-constants.md) constant to set video resolution options.
- Adds [`registerIframe()`](../references/addonsdk/addonsdk-app.md#registeriframe) method and [`unregisterIframe`](../references/addonsdk/addonsdk-app.md#unregisteriframe-type-definition) type definition with example usage. **NOTE:** These APIs are currently experimental.

## 2024-03-08

- [`getPagesMetadata()`](../references/addonsdk/app-document.md#getpagesmetadata), [`startPremiumUpgradeIfFreeUser`](../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) and [`isPremiumUser`](../references/addonsdk/app-currentUser.md#ispremiumuser) have been moved to stable and no longer require the `experimentalApis` flag to be set.
- New examples have been added to the [use cases guide](../guides/develop/use_cases/content_management.md#premium-content) for handling premium content.
- A new video has been added to the [grids tutorial](../guides/tutorials/grids-addon.md) to help guide developers in building the grids add-on.

## 2024-02-21

- New support for [monetization details](../guides/distribute/public-dist.md#step-10-enter-the-monetization-details) has been added to the public distribution flow and allows you to [provide details around monetization options](../guides/distribute/public-dist.md#step-10-enter-the-monetization-details) your add-on supports. A selection will now be required when you submit a new add-on to the marketplace or update an existing one. The options include *free*, *one-time payment*, *recurring subscription*, *micro-transactions*, and *other*.

  In addition, the [monetization guidelines](../guides/distribute/guidelines/monetization.md) were updated with details to help guide you in communicating your monetization strategy, and include new branding [badges](../guides/distribute/guidelines/monetization.md#branding-assets-for-monetization) you can use to visually indicate when content or features require a purchase or when they are paid and unlocked. Please ensure you review the [updated monetization guidelines](../guides/distribute/guidelines/monetization.md) carefully for specific details. **NOTE:** Adobe does not currently provide a specific monetization feature, but with this update, provides a way for developers to communicate the monetization details of their add-ons.
- The first phase of add-on analytics support has been released, and allows developers to [download insights data](../guides/distribute/public-dist.md#post-submission-details-and-insights) for their published add-ons via the [Download insights](../guides/distribute/public-dist.md#post-submission-details-and-insights) button in the in-app distribution modal.
- A new [Concepts guide](../references/document-sandbox/document-apis/concepts/index.md) was added to the [Document APIs](../references/document-sandbox/document-apis/) section to provide a deep-dive into the architecture and key elements of the Adobe Express Document Object Model (DOM).

## 2024-02-14

- A new `id` accessor has been added to the [`BaseNode`](../references/document-sandbox/document-apis/classes/BaseNode.md) class in the Document APIs and is inherited by all classes that extend it. The `id` represents a unique identifier that stays the same when the file is closed and reopened, or if the node is moved to a different part of the document.

## 2024-02-07

- A new [`createPath`](../references/document-sandbox/document-apis/classes/Editor.md#createpath) method is now available for allowing you to create a path with the Document APIs.
- Updates descriptions in various methods and classes in the [Document APIs](../references/document-sandbox/document-apis/).
- Updates to the [`createRenditions`](../references/addonsdk/app-document.md#createrenditions) API, including a new [`print`](../references/addonsdk/addonsdk-constants.md) option for `RenditionIntent` to be be used for generating a print optimized pdf, and an update to [`PdfRenditionOptions`](../references/addonsdk/app-document.md#pdfrenditionoptions) which exposes the ability to customize each PDF Page Box's (`MediaBox`, `BleedBox`, `CropBox`, `TrimBox`) dimensions using a `pageBoxes` property.
- Updates to the [Using Adobe Spectrum tutorial](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/) with additional details on [why you should use Spectrum CSS variables](../guides/tutorials/spectrum-workshop/part3.md#styling-with-spectrum-css) to style your add-ons, and [additional helpful guidelines for locating and using them](../guides/tutorials/spectrum-workshop/part3.md#layout-and-typography-styling).
- The table of contents in each Document API class/interface/constant has been removed since it was a duplicate of the right side navigation menu.

## 2024-01-31

Added a new tutorial - [Building UIs using Adobe's Spectrum Design System](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/).

## 2024-01-09

### New Experimental APIs

- [`startPremiumUpgradeIfFreeUser()`](../references/addonsdk/addonsdk-app.md#startpremiumupgradeiffreeuser) experimental API has been added to the [addOnUISdk.app](../references/addonsdk/addonsdk-app.md) object to display the in-app monetization upgrade flow and returns a value indicating whether the user upgraded to premium or not.

- [`isPremiumUser()`](../references/addonsdk/app-currentUser.md#ispremiumuser) experimental API has been added to the [addOnUISdk.app.currentUser](../references/addonsdk/app-currentUser.md) object to determine if the current user is a premium or free user.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The above new APIs are currently ***experimental only*** and should not be used in any add-ons you will be distributing until declared stable. To use these APIs, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the `manifest.json`.

### Additional Updates

- A new [`PdfRenditionOptions`](../references/addonsdk/app-document.md#pdfrenditionoptions) object is now available to be used with the the [`createRenditions()` export API](../references/addonsdk/app-document.md#createrenditions) and allows a user to specify an optional [bleed](../references/addonsdk/app-document.md#bleed) object (for printing).
- A new [`isPrintReady`](../references/addonsdk/app-document.md#pagemetadata) property has been added to the [`PageMetadata` API](../references/addonsdk/app-document.md#pagemetadata) to indicate if the page is ready to print.
- Updated the [FAQ](../guides/faq.md#what-mime-type-is-returned-from-a-pdf-that-was-exported-with-the-createrenditions-method) regarding the mime type for exported PDF files. It will now return `application/pdf` (as opposed to `text/plain` from an earlier update).

## 2023-12-07

<InlineAlert slots="text" variant="warning"/>

**BREAKING NEWS:** The [Adobe Express Document Sandbox](../references/document-sandbox/) and all associated APIs have been deemed stable, and **no longer require the `experimentalApis` flag**. As a result, some breaking changes with these experimental APIs were introduced before deeming them stable, and they are summarized below. Please read them thoroughly and update your in-development add-ons as needed. If you run into any issues, please reach out to us on our [Adobe Express Add-on Developer’s Discord channel](http://discord.gg/nc3QDyFeb4) for help.

### Breaking changes (experimental APIs)

Some items in the following list of changes may have been mentioned in recent updates but are being listed in this summary again to serve as a reminder.

- The methods in the [Document API Editor class](../references/document-sandbox/document-apis/classes/Editor.md) to create a color fill and stroke have been renamed to [`makeColorFill`](../references/document-sandbox/document-apis/classes/Editor.md#makecolorfill) and [`makeStroke`](../references/document-sandbox/document-apis/classes/Editor.md#makestroke) respectively.
- `strokes` and `fills` have been renamed to their singular counterpart. (Express does not support multiple strokes or fills). You should use `stroke` and `fill` going forward to access them, and they will no longer be `ItemList` objects, since they represent only a single stroke or fill.

  ```js
    // Before
    rectangle.fills.append(rectFill);
    ellipse.fills.append(ellipseFill);

    // After
    rectangle.fill = rectFill;
    ellipse.fill = ellipseFill;
  ```

  - `fill` and `stroke.color` are just a [color object](../references/document-sandbox/document-apis/interfaces/Color.md) of the form `{ red, green, blue, alpha }`.
  - `stroke` is an object of the form `{ color, width, dashPattern, dashOffset }`
- Color utilities have moved to [`colorUtils`](../references/document-sandbox/document-apis/classes/ColorUtils.md) instead of `utils`.

  **Old**<br/>
  <del>

  ```js
  import { utils } from "express-document-sdk";
  const color = utils.createColor(1, 0, 0);
  ```

  </del>

  **New**<br/>

  ```js
  import { colorUtils } from "express-document-sdk";

  // any of:
  const color = colorUtils.fromRGB(1, 0, 0); // optional alpha
  const color = colorUtils.fromRGB({ red: 1 , green: 0, blue: 0 };); // optional alpha
  const color = colorUtils.fromHex("#ff0000");
  const color = { red: 1, green: 0, blue: 0, alpha: 1 }; // mandatory alpha
  ```

  - `fromHex` returns a color from a Hex string -- e.g., `colorUtils.fromHex("#FF8040")` or `colorUtils.fromHex("#FF8040FF")` (including the optional alpha);
  - `fromRGB` returns a color from a set of RGB(A) values (0-1) -- e.g., `colorUtils.fromRGB(1,0.5,0.25,1)`.
  - `toHex` converts a color object to a Hex string -- e.g., `colorUtils.toHex(aColor)`.
- `allChildren` returns an `iterator`, not an `Array`. However if you want to use array methods (ie: `Array#map`), you can use `Array.from` to convert it to an array.
- Strokes and fills will no longer *move* if you add an existing `stroke`/`fill` to another shape (previously the original shape would lose the corresponding `stroke` or `fill`). For example:

  ```js
  // Old way
  const greenFill = editor.createColorFill(colorUtils.fromRGB(0,0,1));
  someRect.fills.append(greenFill);
  anotherRect.fills.append(greenFill);
  /* oops, someRect no longer has a green fill, because anotherRect is its parent */
  ```

  versus:

  ```js
  // New way
  const greenFill = editor.makeColorFill(colorUtils.fromRGB(0,0,1));
  someRect.fill = greenFill;
  anotherRect.fill = greenFill;
  /* both rectangles have a green fill */
  ```

- Some things that previously didn't make sense will now cause compile errors in typescript, or throw in javascript:
  - Do not assume a node's parent is movable — e.g., an artboard can't be repositioned.
  - Not all shapes support setting `opacity` or `locking` (e.g, the document root or an artboard).
- The `translateX` and `translateY` properties have been replaced by a single translation object.

  ```js
  // old
  rectangle.translateX = 100;
  rectangle.translateY = 20;

  // new
  rectangle.translation = { x: 100,  y: 20}; // both x,y properties are required
  ```

- A new [`BaseNode`](../references/document-sandbox/document-apis/classes/BaseNode.md) class has been introduced, and [`ContainerNode`](../references/document-sandbox/document-apis/interfaces/ContainerNode.md) has been moved from a class to an interface.
- The key to load APIs that use the Document APIs has changed, as well as the module names you import APIs from in the [Document Sandbox](../references/document-sandbox/). The old ones will still work, but the CLI and templates have all been updated to use the new names. Please update your add-ons to use the new ones shown below:

  **Adobe Express Document APIs SDK import**<br/>
  For access to the [Express document and content authoring APIs](../references/document-sandbox/document-apis/):

  <del>

  ```js
  // Old
  import { editor } from "express";
  ```

  </del>

  ```js
  // New
  import { editor } from "express-document-sdk";
  ```

  **Document Sandbox SDK import**<br/>
  For access to the [document sandbox runtime APIs](../references/document-sandbox/):

  <del>

  ```js
  // Old
  import AddOnScriptSdk from "AddOnScriptSdk";
  ```

  </del>

  ```js
  // New
  import addOnSandboxSdk from "add-on-sdk-document-sandbox";
  ```

- The [`manifest.json` entry point](../references/manifest/index.md#entrypoints) for the document sandbox script code reference was renamed from `script` to `documentSandbox`, as shown below:

  ```json
    "entryPoints": [
          {
              "type": "panel",
              "id": "panel1",
              "main": "index.html",
              "documentSandbox": "code.js" // used to be "script": "code.js"
          }
      ]
  ```

- The [`apiProxy()`](./addonsdk/instance-runtime.md#apiproxy) method in the [`addOnSandboxSdk.instance.runtime`](./addonsdk/addonsdk-instance.md#objects) object now accepts `"documentSandbox"` as a parameter when referring to the entry point in the manifest where your document sandbox code resides, instead of `"script"`.
- The [`RuntimeType`](../references/addonsdk/addonsdk-constants.md) constant now uses the value of `"documentSandbox"` in lieu of `"script"`.

  **IMPORTANT:** The above updates should be considered breaking changes, so any add-ons in development that relied on the experimental APIs may not work correctly until you make changes to use the new/updated ones above. The intention was to ensure these important changes were made prior to marking the APIs stable to 1) make them more intuitive for developers, 2) significantly improve the process of working with colors, strokes and fills, and 3) prevent certain operations from corrupting the document.

- The CLI has been updated to release version `1.1.1`, and includes the following:

  - The document sandbox templates have been updated to reflect all of the latest changes to the [Document Sandbox APIs](../references/document-sandbox/), and the `experimentalApis` flag has been removed. Please review the updated [references](../references/document-sandbox/) and changelog entries thoroughly for details on all of the recent changes. You may also want to refer to the [document sandbox code samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) for additional help on how to use them.
  - Typings support has been added to the `javascript` templates to enable intellisense features.
  - Manifest property additions.
  - General improvements and bug fixes.

 **NOTE:** The new version should be installed by default when you create a new add-on. If, for any reason, it doesn't, you can force it to install by clearing the npx cache first with `npx clear-npx-cache` or by specifying the version in the command, i.e.: `npx @adobe/create-ccweb-add-on@1.1.1 my-add-on`. You can update any existing add-ons to use this new version by updating the version of the `ccweb-add-on-scripts` in the `package.json` to `1.1.1`.

- All [code samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) and the [Document API tutorial](../guides/tutorials/grids-addon.md) have also been updated to reflect all of the latest changes to the [Adobe Express Document Sandbox APIs](../references/document-sandbox/document-apis/) listed here.
- Removed all experimental APIs notes/warnings around the **Document Sandbox** since they **are now stable**.

<InlineAlert slots="text" variant="warning"/>

  **Known Issue:** Please note, there is an edge case where **removing a page with your add-on** could potentially cause a problem where the UI needs to be reloaded. This will be resolved in the very near future, but please take caution and be aware that it would be best to avoid page removal in the short-term until it's resolved.

### Additional Updates

- A new `getPagesMetadata()` method is now available in the [Add-on UI SDK `document`](../references/addonsdk/app-document.md#getpagesmetadata) object and includes an example code snippet. **NOTE:** This method is still considered ***experimental only*** and should not be used in any add-ons you will be distributing until it has been declared stable. To use this method, you will first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the `manifest.json`.
- The [`createRenditions()` export API](../references/addonsdk/app-document.md#createrenditions) was updated with the following changes:
  - You can now choose to generate renditions of specific pages via a new [`Range.specificPages`](../references/addonsdk/addonsdk-constants.md) constant value.
  - The returned type now also includes page metadata (see [`PageMetadata`](../references/addonsdk/app-document.md#pagemetadata)) including useful information such as the id, page size, pixels per inch, and whether the page has premium or temporal (timeline) content or not, (in addition to the existing blob and title). An example is provided in the reference as well as in [the use cases](../guides/develop/use_cases/content_authoring.md#retrieving-page-metadata).
- A new [document metadata use case example](../guides/develop/use_cases/content_authoring.md#document-and-page-metadata) has been added to show how to retrieve the [document id](./addonsdk/app-document.md#id) and [title (ie: name)](./addonsdk/app-document.md#title), including how to listen for the [associated events](../references/addonsdk/addonsdk-app.md#events).
- New tables have been added to the [Communication API reference](../references/document-sandbox/communication/index.md) denoting the [supported](../references/document-sandbox/communication/index.md#supported-data-types) and [unsupported data types](../references/document-sandbox/communication/index.md#unsupported-data-types) that can be used across the [Communication API](../references/document-sandbox/communication/index.md) layer.

## 2023-12-04

### Updates

- The [Document API's](./document-sandbox/document-apis/) were updated to add a new [`ColorUtils`](./document-sandbox/document-apis/classes/ColorUtils.md) class, which replaces the previous `utils` module that was used as a color helper with a more enhanced utlility. If you've used the old `utils` module in your add-ons, it will require you to update them to use the new named import of `colorUtils` instead of `utils`. Color creation should now be done using the new [`colorUtils` module](./document-sandbox/document-apis/classes/ColorUtils.md). An example of the old way and new way to create a color are shown below for reference:

  ```js
  // Before
  import { utils } from "express-document-sdk";
  const color = utils.createColor(1, 0, 0);

  // After
  import { colorUtils } from "express-document-sdk";

  // any of:
  const color = colorUtils.fromRGB(1, 0, 0); // optional alpha
  const color = colorUtils.fromRGB({ red: 1 , green: 0, blue: 0 }); // optional alpha
  const color = colorUtils.fromHex("#ff0000");
  const color = { red: 1, green: 0, blue: 0, alpha: 1 }; // mandatory alpha
  ```

  The [code samples](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples) have also been updated, so please also refer to those for further details on how to use it. Please note, the [example code snippets](../references/document-sandbox/document-apis/index.md#example-code-snippet) and samples using `fills` or `strokes` off a node class were also updated to use a singular `Fill` or `Stroke` object instead of as an `ItemList` object.

  ```js
    // Before
    rectangle.fills.append(rectFill);
    ellipse.fills.append(ellipseFill);

    // After
    rectangle.fill = rectFill;
    ellipse.fill = ellipseFill;
  ```

- A new release has landed for the [**In-App Developer Submission experience**](../guides/distribute/) in Express. Some highlights from the release:

  **Create Add-on flow:** You can now create [an add-on "container"](../guides/distribute/public-dist.md#step-2-add-on-container-settings) as your first step in building add-ons within the existing in-app distribution workflow. Creating the container gets you access to a few important settings and data (for instance your unique subdomain, see below) before you continue the development process in the CLI. All existing add-ons will automatically receive a parent container with the associated additional features today.

  **Unique Subdomain retrieval:** As part of your add-on container, you will now be able to easily retrieve a unique subdomain for your add-on. Simply choose one of your add-ons in the distribution workflow and navigate to the new "Settings" tab and copy the Add-on URL. This URL is handy for addressing issues with CORS by adding the URL as an allowed origin. See [our CORS guide](../guides/develop/context.md#cors) for more details.

  **Delete Add-ons:** The "container" concept allowed us to offer better management and cleanup of your add-ons. You will now find the option to delete an add-on container entirely from the new "Settings" tab of a given add-on.

  **NOTE:** You can only delete add-ons that have not been published publicly or submitted to our Review team. Please contact us if you need to un-publish an add-on.

  **Supported Languages:** The [version details step](../guides/distribute/public-dist.md#step-8-enter-the-version-details) for publishing add-ons publicly now includes fields to indicate which languages are supported by your add-ons (beyond the required English). You can choose from any of the languages Express supports, and your designation will be shown to users when they browse your listing details. See [our sample for detecting a user's locale to localize your add-on](../guides/develop/use_cases/environment_settings.md#detecting-locale-and-supported-locales).
- Updated list of templates and details to include the [Document Sandbox template options](../guides/getting_started/dev_tooling.md#templates), and how to still scaffold from one when the [`--template` parameter is not explicitly supplied](../guides/getting_started/dev_tooling.md#no-template-parameter).
- New FAQ item regarding the mime type for exported PDF files. This is due to an unexpected change made in Adobe Express core to the mime type returned when you generate a PDF using the export [`createRenditions`](../references/addonsdk/app-document.md#createrenditions) method. In the past it would return `application/pdf`, but currently it returns `text/plain`. This is something to be aware of if you are inspecting the mime type in the response and failing if it's anything other than `application/pdf`.
- Removed NPS survey.

## 2023-11-30

### Updates

- Adds support to the [Add-on UI SDK](./addonsdk/index.md) for retrieving the [document id](./addonsdk/app-document.md#id) and [title](./addonsdk/app-document.md#title), as well as the ability for the add-on to be notified of the [associated events](../references/addonsdk/addonsdk-app.md#events).
- Updates the names of the SDK imports for the [Document Sandbox](../references/document-sandbox/communication/index.md) and the [Document API's SDK](./document-sandbox/document-apis/):

  **Document Sandbox SDK import**<br/>

  from:

  `import AddOnScriptSdk from "AddOnScriptSdk";`
  
  to:
  
  `import addOnSandboxSdk from "add-on-sdk-document-sandbox";`

  which also requires the following line to change in the example code to use the new reference:

  `const { runtime } = addOnSandboxSdk.instance; // runtime object provides direct access to the comm methods`

  **Express Document SDK Import (for accessing the Document APIs**<br/>

  from:
  
  `import { editor } from "express";`

  to:

  `import { editor } from "express-document-sdk";`

  **NOTE:** This includes the named imports for `utils` and `constants` modules as well if needed (ie: `import { editor, utils, constants } from "express-document-sdk"`).

- Updates the [`manifest.json` entry for the document sandbox script code reference](../references/manifest/index.md#entrypoints) from `script` to `documentSandbox`, as shown below:

  ```json
    "entryPoints": [
          {
              "type": "panel",
              "id": "panel1",
              "main": "index.html",
              "documentSandbox": "code.js"
          }
      ]
  ```

- [`apiProxy()`](./addonsdk/instance-runtime.md#apiproxy) now accepts `"documentSandbox"` as a parameter when referring to the entry point in the manifest where your document sandbox code resides, instead of `"script"`.
- The [`RuntimeType`](../references/addonsdk/addonsdk-constants.md) constant can now have a value of `"documentSandbox"` in lieu of `"script"`.

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** The old import names will continue to be supported for a period of time to allow developers to migrate to the new import names, but we encourage you to update as soon as possible to avoid any future issues.

## 2023-11-28

### Updates

- The [Web API's in the Document Sandbox Reference](./document-sandbox/web/index.md) were updated to remove the timer methods which are no longer supported (ie: `setTimeout()`, `clearTimeout` and `setInterval()`, `clearInterval`).
- The [Document API References](./document-sandbox/document-apis/) were updated with the following additions and changes:

 **New Classes/Interfaces**<br/>

  - New [RestrictedItemList class](./document-sandbox/document-apis/classes/RestrictedItemList.md)
  - New [UnknownNode class](./document-sandbox/document-apis/classes/UnknownNode.md)
  - New [SolidColorShapeNode class](./document-sandbox/document-apis/classes/SolidColorShapeNode.md)
  - New [Point interface](./document-sandbox/document-apis/interfaces/Point.md)
  - New `queueAsyncEdit` method added to the [Editor](./document-sandbox/document-apis/classes/Editor.md) class.
  - Renames the [Constants](../references/document-sandbox/document-apis/enums/) to remove the `Value` suffix.

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

If you're using the experimental Document Sandbox APIs in any add-ons currently, we encourage you to check the specific methods and objects you're using in these [updated references](https://developer.adobe.com/express-add-on-apis/docs/api/classes/Editor/) to discover anything new or changed.

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

<del>

- The <a href="../references/document-sandbox/communication/index.md">Communication API</a> in the <a href="../references/document-sandbox/">document sandbox reference section</a> was updated to change the example code importing the SDK to a default import rather than a named import as it was previously:

  from:

  `import { AddOnSdkApi } from "AddOnSdkApi";`
  
  to:
  
  `import AddOnScriptSdk from "AddOnScriptSdk";`
  
  Note that you can now name the imported module whatever you'd like, but for simplicity in the examples, the name is kept the same. **Since these APIs are currently experimental, this change will not impact any in-production add-ons, *however*, it will require you to update any existing usage of these APIs in progress**.

</del>

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

- Added [`currentUser` API](../guides/develop/use_cases/monetization_flows.md#get-current-user-information) details and usage example to the [SDK References](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/) and [Implementing Common Use Cases Guide](../guides/develop/use_cases.md).
- Added a new [licensed-addon code sample](https://developer.adobe.com/express/add-ons/docs/samples.md#licensed-addon) to illustrate how to implement monetization by leveraging the current userid.
- Added [`devFlags` API](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-devFlags) details, which can be used to simulate certain behavior during development.

## 2023-08-17

### Bugs and Fixes

- There's currently a bug where `addArtboard` could crash the application or corrupt the document if there's no `fill` specified on the artboard. *Please ensure you always add a fill in the same frame as the artboard creation until this issue is resolved*. Also note, when this bug is fixed, the `ArtboardNode` will accept a single `fill` object, rather than an `ItemList` of `fill`(s).

- Currently, in the `addPage` API, a new page is created, but the selected context is not changed to the newly added `artboard`. As a result, from a UI perspective, the user remains on the previous page. A change will be implemented this week which will change the default context to the `artboard` child of the newly added page. This results in actual navigation to the newly added page, and all new content which is added using the Editor APIs will be added to this page.

  **IMPORTANT:** We recommend that you ***only test the use of these experimental Editor APIs against non-essential documents***, due to the potential for loss or corruption.

### Updates

- Premium Content handling details have been added to the [Implementing Common Use Cases Guide](../guides/develop/use_cases/content_management.md#premium-content). Note the warning for ensuring that you include the specified `permissions` in the [`manifest.json`](../references/manifest/index.md#entrypointspermissionssandbox) to `allow-popups` and `allow-popups-to-escape-sandbox` to ensure the pricing page can be loaded when needed (and note the addition of the `renditionPreview` flag in the [`requirements`](../references/manifest/index.md#requirements) of the manifest when you want to allow premium content to be previewed).

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
  - If your script code has a syntax error, the console will log an unhelpful error message (similar to `Uncaught (in promise) at adobe-internal.js:49`). Your add-on panel UI will be visible and continue to be interactive, but it won't be able to communicate with the document sandbox, resulting in what feels like non-responsive UI (e.g., clicking doesn't trigger the expected action). You'll want to configure your editor to highlight any syntax editors so that you can be sure your code is at least syntactically correct before you save.
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
