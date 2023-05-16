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

# FAQ

1. _How do I run on a different port than the default (ie: 8080 for example)?_

      ```bash
         npm run start -- --port 8080
      ```

2. _How do I save the state of my add-on?_

      The add-on's state is reset quite frequently (changing panels, changing viewport widths etc), so one may want to save state to [ClientStorage](.) and use that to restore state when the add-on loads. For example, if the user has to navigate into a deep folder hierarchy, they may not want to repeat that again just because they clicked the media panel to add a shape. Or if they are editing a form (e.g., an AI prompt), they may not want to lose that content when they navigated to another panel for a moment. When it makes sense to store a lot of UI state (and when it doesn't) is highly dependent upon the add-on's use case.

3. _How do I use top level `await` while using webpack?_

      Set `experiments: { topLevelAwait: true}` in the webpack config file (otherwise you'll get a build error).

4. _How do I setup webpack to copy new files or folders into `dist`?_

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
         
5. _My form submission doesn't work and console shows error "Blocked form submission to " " because the form's frame is sandboxed and the 'allow-forms' permission is not set."_

      You can call `preventDefault` on the submit event to prevent the browser from trying to complete the full form submission process and avoid this error, such as:

      ```js
            <form onSubmit={ evt => {                  
                  evt.preventDefault();
            }}/>
      ```

      NOTE:
      If the above does not work for you, you can also handle this by adding click handler to the submit button itself instead, and in that call `event.preventDefault` on the event, such as:

      ```javascript
            <form onSubmit={(e) => e.preventDefault()}>
                  <input type="submit" value="Submit" onClick={(e) => e.preventDefault()}/>
            </form>
      ```

6. _How do I enable CORS for a service that blocks my add-on requests due to the `null` origin?_

      If the service you're consuming is endpoint you can modify the server settings for, you can set the `Access-Control-Allow-Origin` header to `*` to allow the requests to pass. If you don't have access to change the headers on the server, you can use a CORS proxy server to bypass this issue while in development. See the [CORS Guide](../guides/develop/cors.md) for more details and specific samples of each.

7. _The `Window.showOpenFilePicker()` API is not working from within my Add-on._ 
      
      You can open the file picker using the `input` element with a `type` set to `file` to get around this.

8. _I receive an error when trying to run my add-on: `Error: EISDIR: illegal operation on a directory`._

      This usually indicates you do not have SSL configured correctly. You can fix it by clearing the configurations from the configuration file. In Windows you'll find this file at `C:\Users\{your_username}\AppData\Local\Adobe\CCWebAddOn\add-on-preferences.json`, and on MAC, it's at `/Users/{user}/Library/Application Support/Adobe/CCWebAddOn\add-on-preferences.json`. Once you find it, delete the two properties defined for `sslCertPath` and `sslKeyPath` there. After they've been deleted, you can run the commands to create a new add-on where you will be prompted to set up SSL again and then be sure to specify the correct paths to your certificate and key file. 
>
9. _I receive a `MANIFEST_NOT_FOUND_ERROR` during the package verification when trying to upload my plugin package for distribution._

      Instead of zipping the folder containing the add-on files, please zip only the contents. In other words, manifest file should be at **root** level of the extracted package.

10. _How can I monetize my add-on?_

      At this time, the only way to monetize is by using a third party provider, and ensuring you choose one that provides safety measures, security and proper payment processing. Some options you may want to consider include **Gumroad**, **Stripe**, **Paddle** and **FastSpring**.
