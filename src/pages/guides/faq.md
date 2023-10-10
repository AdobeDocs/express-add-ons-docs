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
description: This is the FAQ page
contributors:
  - https://github.com/hollyschinsky
---

# Frequently Asked Questions

## Questions

- [How do I run on a different port than the default (ie: 8080 for example)?](#how-do-i-run-on-a-different-port-than-the-default-ie-8080-for-example)
- [Is `yarn` supported with the CLI?](#is-yarn-supported-with-the-cli-or-only-npm)
- [How do I save the state of my add-on?](#how-do-i-save-the-state-of-my-add-on)
- [How do I use top level `await` while using webpack?](#how-do-i-use-top-level-await-while-using-webpack)
- [How do I setup webpack to copy new files or folders into `dist`?](#how-do-i-setup-webpack-to-copy-new-files-or-folders-into-dist)
- [My form submission doesn't work and the devtools console shows the error - "Blocked form submission to " " because the form's frame is sandboxed and the 'allow-forms' permission is not set." What's wrong?](#my-form-submission-doesnt-work-and-the-devtools-console-shows-the-error---blocked-form-submission-to---because-the-forms-frame-is-sandboxed-and-the-allow-forms-permission-is-not-set-whats-wrong)
- [How do I enable CORS for a service that blocks my add-on requests due to the origin?](#how-do-i-enable-cors-for-a-service-that-blocks-my-add-on-requests-due-to-the-origin)
- [The `Window.showOpenFilePicker()` API is not working from within my add-on, why not?](#the-windowshowopenfilepicker-api-is-not-working-from-within-my-add-on-why-not)
- [I’m not able to load the add-on in the browser anymore. When I click on "Connect”, I get an error `ERR_CERT_AUTHORITY_INVALID`.](#im-not-able-to-load-the-add-on-in-the-browser-anymore-when-i-click-on-connect-i-get-an-error-err_cert_authority_invalid)
- [I receive this error when trying to run my add-on: `Error: EISDIR: illegal operation on a directory`.](#i-receive-this-error-when-trying-to-run-my-add-on-error-eisdir-illegal-operation-on-a-directory)
- [I receive a `MANIFEST_NOT_FOUND_ERROR` during the package verification when trying to upload my plugin package for distribution.](#i-receive-this-error-when-trying-to-run-my-add-on-error-eisdir-illegal-operation-on-a-directory)
- [How can I monetize my add-on?](#how-can-i-monetize-my-add-on)
- [What does it mean when an API is considered **experimental**?](#what-does-it-mean-when-an-api-is-considered-experimental)
- [What are the supported mime types/file formats for exported content?](#what-are-the-supported-mime-typesfile-formats-for-exported-content)
- [What are the supported file formats for imported content in Adobe Express?](#what-are-the-supported-file-formats-for-imported-content-in-adobe-express)
- [Why do I receive a "No 'Access-Control-Allow-Origin' header is present on the requested resource" error?](#why-do-i-receive-a-no-access-control-allow-origin-header-is-present-on-the-requested-resource-error)
- [Is `SharedArrayBuffer` supported?](#is-sharedarraybuffer-supported)
- [Which browsers and operating systems are currently supported?](#which-browsers-and-operating-systems-are-currently-supported)

## Answers

### How do I run on a different port than the default (ie: 8080 for example)?

  Use the following syntax:

  ```bash
  npm run start -- --port 8080
  ```

### Is `yarn` supported with the CLI, or only `npm`?

  We recommend using `npm` for running the CLI scripts. Note that while there might be workarounds to get `yarn` working, we do not recommend it, or support any issues that may arise using `yarn`.

### How do I save the state of my add-on?

  The add-on's state is reset quite frequently (changing panels, changing viewport widths etc), so one may want to save state to [ClientStorage](.) and use that to restore state when the add-on loads. For example, if the user has to navigate into a deep folder hierarchy, they may not want to repeat that again just because they clicked the media panel to add a shape. Or if they are editing a form (e.g., an AI prompt), they may not want to lose that content when they navigated to another panel for a moment. When it makes sense to store a lot of UI state (and when it doesn't) is highly dependent upon the add-on's use case.

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

  At this time, the only way to monetize is by using a third party provider, and ensuring you choose one that provides safety measures, security and proper payment processing. Some options you may want to consider include **Gumroad**, **Stripe**, **Paddle** and **FastSpring**.

### What does it mean when an API is considered **experimental**?

  Experimental APIs are those which have not been declared stable yet, and to try them, first need to set the `experimentalApis` flag to `true` in the [`requirements`](../references/manifest/index.md#requirements) section of the [`manifest.json`](../references/manifest/index.md). The `experimentalApis` flag is **only allowed during development** and needs to be removed during submission. Experimental APIs should never be used in any add-ons you will be distributing.

### What are the supported mime types/file formats for exported content?

  The supported file types for exported content are **"image/jpeg" (jpg format), "image/png" (png format), "video/mp4" (mp4 format)** and **"application/pdf" (pdf format)**.

### What are the supported file formats for imported content in Adobe Express?

  The supported file types for imported audio content are **aac, adts, ai, avi, crm, f4v, gif, jpeg, jpg, m1v, m2p, m2t, m2ts, m4a, m4v, mov, mp3, mp4, mpeg, mpg, msvideo, mts, png, psd, psdt, quicktime, ts, tts, wav, webm, webp, wmv, xm4a, xwav, 264, 3gp**.

### Why do I receive a "No 'Access-Control-Allow-Origin' header is present on the requested resource" error?

  This error message indicates that the server that the JavaScript code is making a request to did not include the proper CORS (Cross-Origin Resource Sharing) headers in its response. Please see [this section on CORS](../guides/develop/context.md#cors) for more details on handling CORS with your add-on.

  ### Is [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) supported?

  No, `SharedArrayBuffer` is not currently available to use with your add-ons.

### Which browsers and operating systems are currently supported?

  Please see the [Adobe Express System requirements](https://helpx.adobe.com/express/system-requirements.html) for what's currently supported.
  