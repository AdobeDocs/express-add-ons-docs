<InlineAlert slots="text" variant="info"/>

Preview Adobe Express add-on SDK documentation while you wait to [join our private beta](https://adobe.com/go/express-developer).

<br/><br/>

# Quickstart 

This quick start guide will help you create and run your first add-on, a starter add-on that outputs "hello world" when it's run in Adobe Express.

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/) (major version of 16 or greater) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (major version of 8 or greater) installed
- Familiarity with programming in HTML, CSS and JavaScript
- An Adobe Express account (use an existing Adobe ID or simply create one for free).
- Access to the beta version of Adobe Express ([Join the waitlist](https://adobe.com/go/express-developer))
- Adobe Express add-on CLI ([Join the waitlist](https://adobe.com/go/express-developer))

## Add-on CLI 
To facilitate the development of add-ons, we have provided a CLI (Command Line Interface) that allows you to create and host Adobe Express add-ons directly from your local machine so they can be loaded into the beta version of Adobe Express running in your browser. 


<InlineAlert slots="text" variant="info"/>

**IMPORTANT:** These steps require access to the beta version of Adobe Express and the add-on CLI, which are currently offered to interested developers on a *wait list basis*. If you're interested, please fill in and submit [this wait list form](https://adobe.com/go/express-developer) to get on the list now!

### Step 1: Create your add-on project
Open your terminal and run the following command:

```bash
npx @adobe/create-ccweb-add-on hello-world --template javascript     
```

This command will create a new add-on based on a basic `javascript` template. See the [Templates section](../getting_started/dev_tooling/#templates) in the **Development Tools** page for more details on the built-in templates available with the Adobe Express add-ons CLI. 

<InlineAlert slots="text" variant="success"/>

`npx` is an `npm` package runner that can execute packages without installing them explicitly.


### Step 2: Build and start your add-on
Next, execute the following commands to change into the newly created **hello-world** add-on folder, `build` the add-on, and `start` the add-on in a local server:

```bash
cd hello-world;
npm run build;
npm run start;
```

The `start` script will display messages like the following after it executes:

```bash
Your panel 'hello-world' can now be sideloaded
By enabling the Developer Mode </> from the **Add-ons** panel.
```

### Step 3: Enable add-on development mode (first-time only)
- Navigate to the [beta version of Adobe Express](https://new.express.adobe.com/).
- Click on your user avatar in the top righthand corner and choose **Settings**.

   ![Dev settings toggle on](./img/avatar-settings.png)

- Click the toggle button for **Add-on Development** to enable the add-on development and distribution tools:

   ![Dev settings toggle on](./img/dev-settings.png)


### Step 4: Load and run your add-on
- Navigate your browser to the [beta version of Adobe Express](https://new.express.adobe.com/new) and create a new project.
- Click the **Add-ons** icon in the left rail.
- Toggle on the radio **Add-on testing** toggle button.
- Once clicked, a modal will appear where you will provide the URL of your locally hosted add-on.

  **Note:** Use the default `https://localhost:5241` supplied unless you are intentionally using a different port.

- Check the *I understand the risks of loading an add-on from an external server* checkbox and press the **Connect** button.
- Your add-on should now be displayed in the add-ons panel on the right side of your Adobe Express tab running in your browser. 

   ![Hello World add-on](img/hello-world-loaded-log-open.png)

Congratulations! You've completed the quickstart and run your first add-on! 

Next, check out the [development tools](./dev_tooling.md) page to discover more details on topics to be aware of while building add-ons, followed by the rest of the [guides section](../guides/), where you will find in-depth resources for [designing](../guides/design/), [developing](../guides/develop/), [debugging](../guides/debug/) and [distributing](../guides/distribute/) your add-ons. If you're ready to dive into our developer platform, we highly recommend exploring our collection of [code samples](../../samples.md). These samples provide hands-on examples of how to use our platform SDKs and APIs, and are a great resource to help you get started building your own add-ons.
