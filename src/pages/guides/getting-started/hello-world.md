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
  - Hello World
  - Code Playground
title: Hello, World!
description: Hello, World!
  - https://github.com/undavide
hideBreadcrumbNav: false
---

# Hello, World!

In the great tradition of programming tutorials, we'll start by building a simple "Hello, World!" add-on.

This guide is **divided into two tracks**, which you can follow independently of each other, based on your experience and preferences.

&lt;br /&gt;

| Code Playground Track                  | Command Line Interface (CLI) Track |
| -------------------------------------- | ---------------------------------- |
| Already available in Adobe Express     | Requires installation              |
| Browser-based sandbox                  | Local development                  |
| Limited to built-in APIs               | Full support for external packages |
| Best for Learning & prototyping        | Best for Production development    |
| Simple to moderate add-on's complexity | Moderate to complex add-ons        |

&lt;br /&gt;

The [Code Playground](#code-playground) path is based on a browser sandbox that runs instantly, requires no installation, and lets you explore add-on APIs with real-time feedback directly inside Adobe Express. **If you are new to add-on development**, or prefer to tinker-to-learn, then begin in the Playground to familiarise yourself with the environment; you can always try the CLI later.

The [Command Line Interface (CLI)](#command-line-interface-cli) path will teach you to set up a local development environment, complete with a build pipeline, that allows you to build more complex add-ons that include external dependencies. This is the preferred path **for developers who want fully control**. You can always prototype rapidly in the Playground and transition to the CLI whenever project complexity calls for it.

## Prerequisites

- An Adobe Express account (use an existing Adobe ID or simply create one for free).
- Basic familiarity with JavaScript, HTML and CSS.
- Node.js version 18 or higher (optional, only for the CLI track).

### Enable Add-on Development Mode

Before you can build add-ons, you need to enable Add-on Development mode in Adobe Express—you only need to do this once.

<InlineAlert slots="text" variant="success"/>

The first time you launch the [Code Playground](https://www.adobe.com/go/addon-playground) or [connect to your local add-on development environment](https://www.adobe.com/go/addon-cli), you can review the Developer Terms of Use and enable Developer mode.

<Details slots="list"  summary="Click to view a list of steps to enable the Development Mode" />

1. Click the **avatar icon** in the top right corner of Adobe Express, then the gear icon to **open the Settings**.
2. Enable **Add-on Development** if it's not already enabled. You might need to read the **Developer Terms of Use** first.
3. Close the Settings dialog.

![Enable Add-on Development](./img/playground-enable-dev-mode.gif)

## Code Playground

The [Code Playground](code-playground.md) is a browser-based editor built right into Adobe Express. No installation required—just open it and start coding.

### 1. Launch the Playground

To launch the Code Playground experience, follow [this link](https://www.adobe.com/go/addon-playground) or click the button below.

<TextBlock slots=" buttons" width="100%" isCentered variantsTypePrimary="primary" variantStyleFill="outline" className="code-playground-button-inline"/>

- [Launch the Code Playground](https://www.adobe.com/go/addon-playground)

Alternatively, see the following animation or expand the details below for a step-by-step guide.

![How to open the Code Playground](./img/playground-open-the-playground.gif)

<Details slots="list"  summary="Click to view a list of steps to open the Code Playground" />
  
1. Click the **Add-ons icon** in the left hand rail.
2. Enable the **Add-on Development** switch on the top right corner.
3. Click the **Launch code playground** button.
4. Click the **Script** tab.

### 2. Run Your First Script

The Code Playground allows you to operate in [two modalities](code-playground.md#playground-modes):

- [**Script Mode**](https://www.adobe.com/go/addon-playground?executionMode=script): Directly runs code that operates on the current document
- [**Add-on Mode**](https://www.adobe.com/go/addon-playground): Creates an add-on with a custom User Interface and logic that can run code on the current document

Make sure you've selected the **Script** tab, which is pre-filled with a sample script:

![Code Playground](./img/playground-script.png)

Click the **Run Code** button on the Playground's toolbar to see the rectangle added to the document. Not much, but it's a start!

### 3. Edit the Script

Feel free to tweak the script to change the properties in the `color` object, or the `translation` and Rectangle dimensions; click **Run Code** again to see what happens.

To get a feel of the available APIs, visit the [How-to guides](../learn/how-to/index.md) and copy and paste code snippets into the Playground. For instance, check out the [Use Text](../learn/how-to/use-text.md) page and try the following script for the original "Hello World" experience.

```js
// Create a new TextNode
const textNode = editor.createText("Hello,\nWorld!");
// Center the text on the page
const insertionParent = editor.context.insertionParent;
textNode.setPositionInParent(
  { x: insertionParent.width / 2, y: insertionParent.height / 2 },
  { x: 0, y: 0 }
);
// Add the TextNode to the document
insertionParent.children.append(textNode);
// Get the text content
console.log("Text: ", textNode.fullContent.text);
```

You've been using the Document Sandbox APIs, a very extensive set of APIs that let you create all sorts of objects and manipulate the Adobe Express documents. They are documented in the [SDK References](../../references/document-sandbox/index.md) and explained in detail in the [Platform Concepts](../learn/platform-concepts/document-api.md) section.

### 4. Create an Add-on

Click the **Add-on** tab to switch to the [Add-on mode](code-playground.md#playground-modes). You'll see that the Playground now shows four tabs:

- `HTML`: controls the add-on's User Interface.
- `CSS`: adds styles.
- `Iframe JS`: the add-on's logic.
- `Document JS`: the Document Sandbox APIs (that is, the code that you've been using in the Script tab).

This time, clicking **Run Code** will make a new add-on appear on the right side of the screen. You can see and change its code in the HTML, CSS (UI and styles) and Iframe JS tabs (button click event). The "Create Rectangle" button runs the Document JS code, which does exactly what you would expect!

![Code Playground Add-on](./img/playground-addon.png)

<InlineAlert variant="info" slots="header, text" />

Script mode vs. Document JS

Even if the result of both the Script and Add-on modes in the Code Playground is the same rectangle being added to the document, you'll see that the code is different. Why? The Script mode is a simplified, prototype-friendly environment that takes care of many things under the hood, while the Add-on code needs to take care of the communication between the UI and the Document Sandbox APIs. More info [here](../learn/platform-concepts/context.md).

## Command Line Interface (CLI)

The [Adobe Express add-on CLI](local-development/dev-tooling.md#using-the-cli) allows you to create and host Adobe Express add-ons directly from your local machine.

### 1. Scaffold a New Project

Open your Terminal and run the following command:

```bash
npx @adobe/create-ccweb-add-on hello-world --template javascript-with-document-sandbox
```

This command will scaffold a new add-on based on "pure" JavaScript with Document Sandbox support—the set of APIs that allow you to interact with Adobe Express documents.

- `npx` is a package runner that can execute packages without installing them explicitly.
- `@adobe/create-ccweb-add-on` is the CLI maintained by Adobe to scaffold a new add-on.
- `hello-world` is the name of the add-on project you are creating.
- The `--template` flag specifies the template to use for the add-on; in this case, `javascript-with-document-sandbox`. The parameter is optional, and when missing, the CLI will prompt you to choose one from a list.

The [Templates section](local-development/dev-tooling.md#templates) on the **Development Tools** page provides a list of available options.

<InlineAlert slots="header, text1" variant="info"/>

For Windows Users

If you're using the CLI in the terminal, you'll need to add `openssl` to the `path` under Environment Variables. If `git` is installed, `openssl` can be found at `C:\Program >Files\Git\usr\bin`. Otherwise, you can [download `git`](https://git-scm.com/downloads) and add the directory location to the `path` variable in your Environment Variables.

<InlineAlert slots="header, text1, text2, text3, text4" variant="warning"/>

CLI troubleshooting

If you run into problems, run this command to clear the `npx` cache and ensure the latest version of the CLI is invoked.

```bash
npx clear-npx-cache
npx @adobe/create-ccweb-add-on hello-world
```

The above may prove useful when updated versions of the CLI are released. If you want to read each individual CLI command manual page, run them via `npx` with the `--help` flag, for example:

```bash
npx @adobe/ccweb-add-on-scripts start --help
```

### 2. Build & Start Your Add-on

Next, execute the following commands to change into the newly created **hello-world** add-on folder, `build` the add-on, and `start` the add-on in a local server:

```bash
cd hello-world;
npm run build;
npm run start;
```

The `start` script will display messages like the following after it executes:

```text
Done. Your add-on 'hello-world' is hosted on: https://localhost:5241/
```

Look for the **Development Mode activation URL** in the terminal output—click it to quickly enable development features without manually navigating to Settings, or read along.

The add-on's code is now running on a local server; you must tell Adobe Express to load it.

### 3. Load & Run Your Add-on

To _sideload_ your add-on into Adobe Express, follow [this link](https://www.adobe.com/go/addon-cli) or click the button below.

<Columns slots=" buttons" width="100%" isCentered variantsTypePrimary="primary" variantStyleFill="outline" className="code-playground-button-inline"/>

- [Sideload your add-on](https://www.adobe.com/go/addon-cli)

You can also do it manually by following the steps below.

![How to sideload an add-on](./img/playground-sideload-add-on.gif)

<Details slots="list" summary="Click to view a list of steps to sideload an add-on in Adobe Express" />

  1. Click the **Add-ons icon** in the left hand rail.
  2. Enable the **Add-on Development** switch on the top right corner.
  3. Click the **Test your local add-on** text.
  4. **Check the checkbox** in the Connect to development server modal.
  5. Click the **Connect** button.
  6. Click the **Hello World** add-on icon on the Add-ons tab on the left.

![Add-on testing](./img/playground-alt-testing.png)

If you click the **Create Rectangle** button, you'll see the rectangle being added to the document.

![Create Rectangle](./img/playground-run-addon.png)

### 4. Edit Your Add-on's Code

While your add-on is still loaded and running, open the `src/index.html` file and update the **"Create Rectangle"** string in the `<button>` to something else, like **Add Text**. In the `src/sandbox/code.js` replace the body of the `createRectangle()` function with the following, borrowed from the [Use Text](../learn/how-to/use-text.md) how-to guide:

```js
// ...
  createRectangle: () => {
    // Create a new TextNode
    const textNode = editor.createText("Hello,\nWorld!");
    // Center the text on the page
    const insertionParent = editor.context.insertionParent;
    textNode.setPositionInParent(
      { x: insertionParent.width / 2, y: insertionParent.height / 2 },
      { x: 0, y: 0 }
    );
    // Add the TextNode to the document
    insertionParent.children.append(textNode);
    // Get the text content
    console.log("Text: ", textNode.fullContent.text);
  },
// ...
```

Note that the terminal where your add-on runs will display messages showing that the `src` has been rebuilt. Adobe Express has also updated the button label automatically, and the add-on will now add a "Hello, World!" text to the document.

![Hello World](./img/playground-hello-world.png)

You can continue to update your code while your add-on is running, and the add-on will automatically be rebuilt on save.

<InlineAlert slots="header, text1, text2" variant="warning"/>

Manifest updates

Any changes to the `manifest.json` will _require a manual reload of your add-on_. The **Add-on Development** panel will indicate this in the log messages, and the **Refresh** button can be used to reload the add-on directly within Adobe Express.

<Details slots="image" summary="Click to see the screenshot" />

![Refresh manifest](./img/playground-refresh-manifest.png)

## Next steps

Congratulations! You've completed this Hello, World! guide and run your first add-on!

Next, check out the [Code Playground](code-playground.md) page to discover all its features, and read the [How To Guides](../learn/how-to/index.md) to familiarise with the APIs and plug & play with code snippets. If you've liked the CLI track, in the [Local Development](local-development/index.md) section you can find more details and debugging instructions.

When you feel comfortable, you can dive into the [Complete Projects](../learn/how-to/tutorials/index.md), where we'll help you build fully-working add-ons from the ground up—the best way to learn is by doing! We also have an extensive collection of [code samples](../learn/samples.md), that are a great resource to help you get started building your own add-ons.
