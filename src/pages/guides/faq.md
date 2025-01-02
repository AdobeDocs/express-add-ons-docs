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
title: FAQ
description: A list of frequently asked questions and answers. 
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# Frequently Asked Questions

## Questions

- [Frequently Asked Questions](#frequently-asked-questions)
  - [Questions](#questions)
  - [Answers](#answers)
    - [How do I run on a different port than the default (ie: 8080 for example)?](#how-do-i-run-on-a-different-port-than-the-default-ie-8080-for-example)
    - [Is `yarn` supported with the CLI, or only `npm`?](#is-yarn-supported-with-the-cli-or-only-npm)
    - [How do I save the state of my add-on?](#how-do-i-save-the-state-of-my-add-on)
    - [How do I use top level `await` while using webpack?](#how-do-i-use-top-level-await-while-using-webpack)
    - [How do I setup webpack to copy new files or folders into `dist`?](#how-do-i-setup-webpack-to-copy-new-files-or-folders-into-dist)
    - [My form submission doesn't work and the devtools console shows the error: "Blocked form submission to " " because the form's frame is sandboxed and the 'allow-forms' permission is not set." What's wrong?"](#my-form-submission-doesnt-work-and-the-devtools-console-shows-the-error-blocked-form-submission-to---because-the-forms-frame-is-sandboxed-and-the-allow-forms-permission-is-not-set-whats-wrong)
    - [How do I enable CORS for a service that blocks my add-on requests due to the origin?](#how-do-i-enable-cors-for-a-service-that-blocks-my-add-on-requests-due-to-the-origin)
    - [How do I prevent my iframe content from being blocked due to cross-origin issues?](#how-do-i-prevent-my-iframe-content-from-being-blocked-due-to-cross-origin-issues)
    - [The `Window.showOpenFilePicker()` API is not working from within my add-on, why not?](#the-windowshowopenfilepicker-api-is-not-working-from-within-my-add-on-why-not)
    - [I’m not able to load the add-on in the browser anymore. When I click on "Connect”, I get an error `ERR_CERT_AUTHORITY_INVALID`.](#im-not-able-to-load-the-add-on-in-the-browser-anymore-when-i-click-on-connect-i-get-an-error-err_cert_authority_invalid)
    - [I receive this error when trying to run my add-on: `Error: EISDIR: illegal operation on a directory`.](#i-receive-this-error-when-trying-to-run-my-add-on-error-eisdir-illegal-operation-on-a-directory)
    - [I receive a `MANIFEST_NOT_FOUND_ERROR` during the package verification when trying to upload my plugin package for distribution.](#i-receive-a-manifest_not_found_error-during-the-package-verification-when-trying-to-upload-my-plugin-package-for-distribution)
    - [How can I monetize my add-on?](#how-can-i-monetize-my-add-on)
    - [What does it mean when an API is considered **experimental**?](#what-does-it-mean-when-an-api-is-considered-experimental)
    - [What are the supported mime types/file formats for exported content?](#what-are-the-supported-mime-typesfile-formats-for-exported-content)
    - [What are the supported file formats for imported content in Adobe Express?](#what-are-the-supported-file-formats-for-imported-content-in-adobe-express)
    - [Are animated GIF's supported when importing or dragging content to the document?](#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document)
    - [Why do I receive a "No 'Access-Control-Allow-Origin' header is present on the requested resource" error?](#why-do-i-receive-a-no-access-control-allow-origin-header-is-present-on-the-requested-resource-error)
    - [Is `SharedArrayBuffer` supported?](#is-sharedarraybuffer-supported)
    - [Which browsers and operating systems are currently supported?](#which-browsers-and-operating-systems-are-currently-supported)
    - [How does Adobe use my add-on’s data?](#how-does-adobe-use-my-add-ons-data)
    - [Where can I request new add-on features or suggest ideas?](#where-can-i-request-new-add-on-features-or-suggest-ideas)
    - [Why does the CLI return the error: "Login failed. Please try again.", though I didn't have a chance to login because the browser never opened?](#why-does-the-cli-return-the-error-login-failed-please-try-again-though-i-didnt-have-a-chance-to-login-because-the-browser-never-opened)
    - [What mime type is returned from a PDF that was exported with the `createRenditions` method?](#what-mime-type-is-returned-from-a-pdf-that-was-exported-with-the-createrenditions-method)
    - [The latest version of the CLI is not automatically installing when I run the `npx` command to create a new add-on.](#the-latest-version-of-the-cli-is-not-automatically-installing-when-i-run-the-npx-command-to-create-a-new-add-on)
    - [I'm trying to use a newly released feature, but it seems to be unavailable?](#im-trying-to-use-a-newly-released-feature-but-it-seems-to-be-unavailable)

## Answers

### How do I run on a different port than the default (ie: 8080 for example)?

  Use the following syntax:

  ```bash
  npm run start -- --port 8080
  ```

### Is `yarn` supported with the CLI, or only `npm`?

  We recommend using `npm` for running the CLI scripts. Note that while there might be workarounds to get `yarn` working, we do not recommend it, or support any issues that may arise using `yarn`.

### How do I save the state of my add-on?

  The add-on's state is reset quite frequently (changing panels, changing viewport widths etc), so one may want to save state to [ClientStorage](../references/addonsdk/instance-client-storage.md) and use that to restore state when the add-on loads. For example, if the user has to navigate into a deep folder hierarchy, they may not want to repeat that again just because they clicked the media panel to add a shape. Or if they are editing a form (e.g., an AI prompt), they may not want to lose that content when they navigated to another panel for a moment. When it makes sense to store a lot of UI state (and when it doesn't) is highly dependent upon the add-on's use case.

### How do I use top level `await` while using webpack?

  Set `experiments: { topLevelAwait: true}` in the webpack config file (otherwise you'll get a build error).

### How do I setup webpack to copy new files or folders into `dist`?

  If you add any folders, (like images for example), to your `src`, you can update the `webpack.config.js` `CopyWebpackPlugin` section within to ensure those new resources added are copied into the `dist` folder. For instance, in the following, the 3rd line was added to ensure any `.jpg` files in the `src/images` folder get copied over:

  ```js
  new CopyWebpackPlugin({
        patterns: [
              { from: "src/*.json", to: "[name][ext]" },
              { from: "src/*.png", to: "[name][ext]" },
              { from: "src/images/*.jpg", to: "images/[name][ext]" },
        ],
  });
  ```

### My form submission doesn't work and the devtools console shows the error: "Blocked form submission to " " because the form's frame is sandboxed and the 'allow-forms' permission is not set." What's wrong?"

  You can call `preventDefault` on the submit event to prevent the browser from trying to complete the full form submission process and avoid this error, such as:

  ```js
  <form onSubmit={ evt => {                  
        evt.preventDefault();
  }}/>
  ```

   **NOTE:** If the above does not work for you, you can also handle this by adding click handler to the submit button itself instead, and in that call `event.preventDefault` on the event, such as:

  ```javascript
  <form onSubmit={(e) => e.preventDefault()}>
        <input type="submit" value="Submit" onClick={(e) => e.preventDefault()}/>
  </form>
  ```

### How do I enable CORS for a service that blocks my add-on requests due to the origin?

  To help enable a smoother experience for developers dealing with CORS, we provide each add-on with a unique [subdomain](../guides/develop/context.md#subdomain) which can be supplied in the list of [allowed origins](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) that can make requests to a given service. See the section on [CORS](../guides/develop/context.md#cors) for more details on determining your unique subdomain and using it to enable CORS.

### How do I prevent my iframe content from being blocked due to cross-origin issues?

  If your iframe is being blocked by the browser, it's likely due to CORS issues. To resolve this, you need to set the appropriate HTTP headers on the server that hosts the content being loaded within the iframe. Specifically, you need to set the [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) header to `require-corp`.

### The `Window.showOpenFilePicker()` API is not working from within my add-on, why not?

  You can open the file picker using the `input` element with a `type` set to `file` to get around this.

### I’m not able to load the add-on in the browser anymore. When I click on "Connect”, I get an error `ERR_CERT_AUTHORITY_INVALID`.

  This usually indicates an issue with invalid SSL credentials. Locate the `devcert` folder which can be found at `/Users/{your_username}/Library/Application\ Support/devcert` on MAC or `C:\Users\{your_username}\AppData\Local\`, delete it, and create an add-on again. You should get the option to create an SSL certificate again when you create the new add-on, which should resolve your problem.

### I receive this error when trying to run my add-on: `Error: EISDIR: illegal operation on a directory`.

  This usually indicates you do not have SSL configured correctly. You can fix it by clearing the configurations from the configuration file.
  
  - In Windows, you can locate this file at: `C:\Users\{your_username}\AppData\Local\Adobe\CCWebAddOn\add-on-preferences.json`.
  
  - On MAC, you can locate this file at: `/Users/{user}/Library/Application Support/Adobe/CCWebAddOn\add-on-preferences.json`

Once you find config file, delete the two properties defined for `sslCertPath` and `sslKeyPath` there. After they've been deleted, you can run the commands to create a new add-on where you will be prompted to set up SSL again and then be sure to specify the correct paths to your certificate and key file.

### I receive a `MANIFEST_NOT_FOUND_ERROR` during the package verification when trying to upload my plugin package for distribution.

  Instead of zipping the folder containing the add-on files, please zip only the contents. In other words, manifest file should be at **root** level of the extracted package.

### How can I monetize my add-on?

  At this time, the only way to monetize is by using a third party provider, and ensuring you choose one that provides safety measures, security and proper payment processing. Some options you may want to consider include **Gumroad**, **Stripe**, **Paddle** and **FastSpring**. Find out more about how you can communicate your monetization details to users in our [monetization guidelines](../guides/distribute/guidelines/monetization.md#branding-your-add-ons-for-monetization).

### What does it mean when an API is considered **experimental**?

  Experimental APIs are those which have not been declared stable yet, and to try them, first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the [`manifest.json`](../references/manifest/index.md). The `experimentalApis` flag is **only allowed during development** and needs to be removed during submission. Experimental APIs should never be used in any add-ons you will be distributing.

### What are the supported mime types/file formats for exported content?

  The supported file types for exported content are **"image/jpeg" (jpg format), "image/png" (png format), "video/mp4" (mp4 format)** and **"application/pdf" (pdf format)**.

### What are the supported file formats for imported content in Adobe Express?

  The supported file types for imported audio content are **aac, adts, ai, avi, crm, f4v, gif, jpeg, jpg, m1v, m2p, m2t, m2ts, m4a, m4v, mov, mp3, mp4, mpeg, mpg, msvideo, mts, png, psd, psdt, quicktime, ts, tts, wav, webm, webp, wmv, xm4a, xwav, 264, 3gp**.

### Are animated GIF's supported when importing or dragging content to the document?

  Yes, however, there are [technical requirements](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html) and certain handling for each scenario.  The requirements are summarized below for reference, and the handling that will take place when importing vs drag and drop follow:

  - **Maximum resolution:** 512px
  - **Maximum size:** 10 MB
  - **Maximum GIFs per scene:** 7
  
**Importing gifs:** You should use the [`addAnimatedImage()`](../references/addonsdk/app-document.md#addanimatedimage) method when you want to import an animated GIF by default. It will be added as an animated GIF to the document as long as it fits [the size criteria for animated GIF's](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html). In the event that it does not fit the criteria, only the first frame will be added. **Note:** Though [`addImage()`](../references/addonsdk/app-document.md#addaudio) supports the `gif` file type, if an animated GIF is passed in, only the first frame will be added.
  
**Drag and drop:** If the content being dragged is an animated GIF, it will be added as an animated GIF to the document, as long as it fits [the size criteria for animated GIF's](https://helpx.adobe.com/express/create-and-edit-videos/change-file-formats/import-gif-limits.html). In the event that it doesn't fit the size criteria, an error toast will be shown to the user.

### Why do I receive a "No 'Access-Control-Allow-Origin' header is present on the requested resource" error?

  This error message indicates that the server that the JavaScript code is making a request to did not include the proper CORS (Cross-Origin Resource Sharing) headers in its response. Please see [this section on CORS](../guides/develop/context.md#cors) for more details on handling CORS with your add-on.

### Is [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) supported?

  No, `SharedArrayBuffer` is not currently available to use with your add-ons.

### Which browsers and operating systems are currently supported?

  Please see the [Adobe Express System requirements](https://helpx.adobe.com/express/system-requirements.html) for what's currently supported.

### How does Adobe use my add-on’s data?

  Adobe only instruments and reports on user behaviors related to discovering and managing their add-on, including searching for, installing, running, sharing (via link), and uninstalling an add-on.

  Adobe does not instrument, store, or report on any action that the user takes within the add-on’s UI. Therefore, Adobe does not capture any user data related to 3rd party services, licenses, or user accounts, including personal information, except that which is already made directly available to Adobe through general usage of our products.

### Where can I request new add-on features or suggest ideas?

  You can head over to the [Adobe Express UserVoice forum](https://adobeexpress.uservoice.com/forums/951181-adobe-express) to request features, suggest integration ideas and more.

### Why does the CLI return the error: "Login failed. Please try again.", though I didn't have a chance to login because the browser never opened?

  This can happen due to a permissions issue, and the `~/Library/Application Support/Adobe/CCWebAddOn` doesn't get created. This can be fixed by creating the folder and modifying the permissions to allow write.

### What mime type is returned from a PDF that was exported with the `createRenditions` method?

  The mime type returned from a PDF generated using the [`createRenditions`](../references/addonsdk/app-document.md#createrenditions) API is `application/pdf`.

### The latest version of the CLI is not automatically installing when I run the `npx` command to create a new add-on.

  You can force it to install by clearing the npx cache first with `npx clear-npx-cache`, or by specifying the version in the command, i.e.: `npx @adobe/create-ccweb-add-on@1.1.1 my-add-on`.

### I'm trying to use a newly released feature, but it seems to be unavailable?

  If you are trying out a newly released feature in your add-on and have an instance of Adobe Express still open in a browser tab from before, you will need to refresh the page to ensure the latest release is loaded before trying out a new feature.
