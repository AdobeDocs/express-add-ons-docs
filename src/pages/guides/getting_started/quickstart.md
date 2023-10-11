# Quickstart

This quickstart guide will help you create and run your first add-on, a simple hello world add-on built with plain JavaScript.

## Introduction

Check out this short video below to get a quick visual introduction to the steps you'll be taking to create your very first add-on. <br/><br/>

<div style="display: flex; justify-content: center;">
<iframe width="560" height="315" src="https://www.youtube.com/embed/kSq4ykQGOdo" title="Creating Your First Add-on | How to Create Add-ons in Adobe Express" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<!-- <iframe src="https://drive.google.com/file/d/1NpKsxGJyA2DeH0xPhLyTr17cdy9awhYG/preview" width="775" height="485" allow="autoplay" style="border: 0"></iframe> -->

<br/>

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/) (major version of 16 or greater) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (major version of 8 or greater) installed
- Familiarity with programming in HTML, CSS and JavaScript
- An Adobe Express account (use an existing Adobe ID or simply create one for free).

### Add-on CLI

The **add-on CLI (Command Line Interface) is required for add-on development**, and allows you to create and host Adobe Express add-ons directly from your local machine.

## Step 1: Create your add-on project

Open your terminal and run the following command:

```bash
npx @adobe/create-ccweb-add-on hello-world --template javascript     
```

This command will create a new add-on based on a basic `javascript` template. See the [Templates section](dev_tooling.md#templates) in the **Development Tools** page for more details on the built-in templates available with the [Adobe Express add-on CLI](dev_tooling.md#using-the-cli).

**Note**: You'll be prompted to login to your Adobe account and you may also be prompted to accept the "Adobe Developer Terms of Use" if you haven't done so previously. You may also be prompted to configure SSL, and you'll want to do this step to ensure that your add-on can be loaded inside of Adobe Express while you develop it.

   **For Windows Users:** If you're using the CLI in the terminal, you'll need to add `openssl` to the `path` under Environment Variables. If `git` is installed, `openssl` can be found at `C:\Program >Files\Git\usr\bin`. Otherwise, you can download `git` from https://git-scm.com/downloads, and add the directory location to the `path` variable in your Environment Variables.

<InlineAlert slots="text" variant="success"/>

`npx` is an `npm` package runner that can execute packages without installing them explicitly.

## Step 2: Build and start your add-on

Next, execute the following commands to change into the newly created **hello-world** add-on folder, `build` the add-on, and `start` the add-on in a local server:

```bash
cd hello-world;
npm run build;
npm run start;
```

The `start` script will display messages like the following after it executes:

```bash
Done. Your add-on 'hello-world' is hosted on: https://localhost:5241/

You can now sideload your add-on by enabling the Developer Mode in the Add-ons panel.
```

## Step 3: Enable add-on development mode (first-time only)

- Navigate to [Adobe Express](https://new.express.adobe.com/).
- Click on your user avatar in the top righthand corner and choose **Settings**.

   ![Dev settings toggle on](./img/avatar-settings.png)

- Click the toggle button for **Add-on Development** to enable the add-on development and distribution tools:

   ![Dev settings toggle on](./img/dev-settings.png)

## Step 4: Load and run your add-on

- Navigate your browser to [Adobe Express](https://new.express.adobe.com/new) and create a new project.
- Click the **Add-ons** icon in the left rail.
- Notice there are two tabs, **Discover** and **Your add-ons**.

   ![add-on tabs](./img/add-on-tabs.png)

- Click on the **Your add-ons** tab to access the **Add-on Development** tools panel, and toggle on the radio **Add-on testing** toggle button.

   ![Dev testing toggle on](./img/launchpad-toggle.png)

- Once clicked, a modal will appear where you will provide the URL of your locally hosted add-on.

   **Note:** Use the default `https://localhost:5241` supplied unless you are intentionally using a different port.

   Check the *I understand the risks of loading an add-on from an external server* checkbox and press the **Connect** button.

   ![Add-on connect modal](./img/connect-modal.png)

- The **Add-on Development** panel will expand and show a message that the add-on is connected in the log, along with the name and version of your add-on. Click on the down arrow icon to collapse the panel:

   ![Hello World add-on connected](img/hello-world-loaded-log-open.png)

- To run your add-on, simply click on it from the **In development** panel. Your add-on should now be displayed in the add-ons panel on the right side of your Adobe Express window:

   ![Hello World add-on running](img/hello-world-run.png)

## Step 5: Edit your add-on

Now, while your add-on is still loaded and running, open the `src/index.html` file and update the **"Click me"** string in the `<button>` below:

![](./img/vs-code-click-me.png)

   to **"Say hello"**:

![](./img/vs-code-say-hello.png)

Note the terminal where your add-on is running will display messages showing that the `src` has been rebuilt like below. This is due to the hot module reload feature built into the CLI.

![hot reload](./img/hot-reload.png)

Go back to your browser where your add-on is running in Adobe Express, and notice the new string is automatically shown, and the **Add-on Development** panel shows that it was auto-reloaded:

![updated add-on](./img/updated-add-on.png)

You can continue to update your code while your add-on is running and the add-on will automatically be rebuilt.

**Manifest updates**<br/>
Any changes to your `manifest.json` will *require a manual reload of your add-on*. The **Add-on Development** panel will indicate this in the log messages, and the **Refresh** button can be used to reload the add-on directly within Adobe Express. You can try this by updating the `name` field in the `src/manifest.json` file of your running add-on to **"Say hello"**, for instance:

![manifest update](./img/manifest-update.png)

Then, switch back to your Adobe Express window and you should see a message that changes have been detected in your manifest, such as below:

![manifest refresh reminder](./img/manifest-refresh-reminder.png)

Click the **Refresh** button, then click your add-on icon to load it again, and note the updated name in the title of your add-on as outlined below:

![manifest refresh complete](./img/manifest-refresh-complete.png)

Congratulations! You've completed the quickstart and run your first add-on!

Next, check out the [development tools](dev_tooling.md) page to discover more details on topics to be aware of while building add-ons, followed by the rest of the [guides section](../), where you will find in-depth resources for [designing](../design/index.md), [developing](../develop/index.md), [debugging](../debug/index.md) and [distributing](../distribute/index.md) your add-ons. If you're ready to dive into our developer platform, we highly recommend exploring our collection of [code samples](../../samples.md). These samples provide hands-on examples of how to use our platform SDKs and APIs, and are a great resource to help you get started building your own add-ons.
