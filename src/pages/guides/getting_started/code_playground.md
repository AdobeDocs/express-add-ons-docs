---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Adobe Express Add-on Development
  - Express Editor
  - Code Playground
  - In-app editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Add-on Manifest
  - Add-on dev tool
  - Express Document
title: Code Playground
description: How to access the Code Playground
contributors:
  - https://github.com/padmkris123
  - https://github.com/hollyschinsky
  - https://github.com/ErinFinnegan
  - https://github.com/undavide
---

# Code Playground

The Code Playground is an in-app lightweight code editor for fast and effortless prototyping.

## What is Code Playground?

Code Playground provides a low-barrier entry point for add-on development, allowing you to experiment and iterate on ideas directly without any setup, from within Adobe Express. From learning the basics to rapidly prototyping advanced concepts, Code Playground accommodates all stages of add-on development.

## Who Should Use Code Playground?

The Code Playground is designed for:

- **Beginners**: New developers who want to experiment with Adobe Express add-on development without setting up a full development environment.
- **Prototypers**: Developers who need to quickly test concepts or ideas before implementing them in a full add-on project.
- **Learners**: Those who are learning the Document APIs and want to see immediate results of their code.
- **Experienced Developers**: Seasoned developers who want to test specific API functionality or debug isolated code snippets.
- **Designers**: UX/UI designers who want to experiment with add-on interfaces without extensive coding setup.

## Features

| Feature | Description |
|---------|-------------|
| **Real-Time Preview** | See your changes instantly as you code, allowing for immediate feedback and faster adjustments. |
| **Effortless Prototyping** | Quickly turn ideas into add-ons with minimal setup. |
| **Rapid Implementation** | Fast-track your prototype to a product by directly pasting your code into an add-on template. |
| **Script Mode** | A streamlined way to prototype with the Document APIs, making it easier to manipulate the Adobe Express document directly. |
| **Local Persistence** | Your work is automatically saved in your browser's local storage to prevent accidental loss. |
| **Keyboard Shortcuts** | Use keyboard shortcuts to save, run, and reset your code quickly. |

Check out the video below for a quick introduction to the add-on playground features.

<br/><br/><div style="display: flex; justify-content: center;">

 <iframe width="560" height="315" src="https://www.youtube.com/embed/j6KS6CXZmKo?si=j4kX8gItWbm1ZDVz" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div><br/>

## Development Workflow 

There are numerous opportunities for using the Code Playground to help you throughout the development process, including:

- **Experiment First**: Test your ideas and API interactions before committing to full add-on development.
- **Learn as You Go**: Master the basics of Document APIs and Add-on SDK without complex setup requirements.
- **Prototype Quickly**: Build and test features in minutes instead of hours with instant feedback.
- **Bridge to Production**: Develop core functionality in Playground before moving to a complete project environment.
- **Debug with Ease**: Isolate and fix specific issues by testing API calls outside your production code.

## How to Access Code Playground

### Step 1: Enable Add-on Development Mode

Go to your settings and enable the "Add-on Development Mode" (if it isn't already enabled).

![Adobe Express Settings](./img/settings_alt.png)

### Step 2: Locate and open the "Code Playground"

1. Start by opening any document in Adobe Express.
2. Click on the "Add-ons" button located on the left side rail.
3. In the Add-ons panel, select the "Your add-ons" tab.
4. At the bottom of the Add-ons panel, you'll see the toggle for the "Code Playground".

  ![Adobe Express Code Playground Toggle](./img/toggle-playground.png)

5. Once enabled, the playground window will open, allowing you to begin coding immediately!

  ![Adobe Express Code Playground](./img/script-mode.png)
  
## Choose Your Development Mode

The playground includes two modes for rapid development. Each mode is tailored for different aspects of add-on development.

- **Script Mode**: This mode is directly associated with the Document Sandbox environment, allowing you to test Document API operations quickly.
- **Add-on Mode**: Provides a structured environment for building the user interface and logic of your add-on using HTML, CSS, and JavaScript directly in Adobe Express.

### Script Mode

Script mode provides a streamlined way to prototype with the [Document APIs](../../references/document-sandbox/document-apis/index.md), making it easier to manipulate the Adobe Express document directly. This mode is particularly helpful when you want to focus on document operations rather than building a UI.

#### How to Use Script Mode:

1. Click on the "Script" button in the top left corner of the playground window.
2. Write your [Document API](../../references/document-sandbox/document-apis/index.md) code in the editor provided. For example, your code written here can directly manipulate the document, add shapes or text, change styles and more. The [`editor`](../../references/document-sandbox/document-apis/classes/Editor.md) object is automatically available for use in this mode.
3. Click "Run" to execute your script directly on the current document.

  ![Code Playground Script Mode](./img/script-mode.png)

#### Moving from Script Mode to Add-on Mode:

Once you've developed your code in Script mode, you can easily transition to Add-on mode to build a user interface around your functionality. Here's how:

1. Use the "Copy" button in the top right corner of the playground while in Script mode to quickly copy your code to the clipboard.
2. Click the "Add-on" button next to the "Script" button in the top left corner of the playground.
3. Paste the code into the "Document JS" tab.
4. Modify your script code as needed to be used in the add-on context along with your front-end logic in the HTML, Iframe and CSS tabs. Use the initial sample code provided as a reference.
5. Use the "Run" button in Add-on mode to execute your code within the context of your add-on.

### Add-on Mode

The "Add-on" mode allows you to develop and test an add-on directly in Adobe Express, without having to set up a full development environment. This mode is designed to help you build the user interface and logic of your add-on in the provided tabs using HTML, CSS, and JavaScript. This mode allows you to iterate quickly on your development process and see the results without ever leaving the Adobe Express environment.

#### How to Use Add-on Mode:

1. Click on the "Add-on" button on the right of the "Script" button in the top left corner of the playground window.
2. Write code for your add-on in each of the supplied tabs (described below). This includes HTML, CSS, and JavaScript code that will run in the iframe UI and (optionally) call the Document APIs to interact directly with the Express document (optionally).
3. Click "Run" to execute your script directly on the current document.

  ![Code Playground Add-on Mode](./img/addon-mode.png)

### HTML Tab

This tab is for writing HTML code that defines the structure of your add-on's user interface. You can create elements like buttons, text fields, and layout containers here. Functionally, this tab mirrors the role of the `index.html` file you'd use in a typical add-on project.

### CSS Tab

Style your add-on's HTML elements in this tab. Create a visually appealing interface consistent with Adobe Express design patterns. This section corresponds to the `styles.css` file in a standard add-on project.

### Iframe JS Tab

This tab is for writing JavaScript code that runs in the iframe context of your add-on. Here, you can interact with:

- The [Add-on UI SDK (`addOnUISdk`)](../../references/addonsdk/index.md)
- The DOM elements in your HTML
- Event handlers for your UI components

This environment corresponds to the code you would typically write in your `index.js` or UI JavaScript files in a full add-on project.

### Document JS Tab

This tab is where you write JavaScript code that interacts directly with the Adobe Express document. It runs in the [Document Sandbox](../../references/document-sandbox/index.md) environment and gives you access to:

- Document manipulation capabilities with the [Document APIs](../../references/document-sandbox/document-apis/index.md)
- [Communication APIs](../../references/document-sandbox/communication/index.md) to facilitate interaction between the iframe context and the Document Sandbox.

The Document JS tab corresponds to the code typically found in the `code.js` file of a complete add-on project.

## Workflow Tips

### Keyboard Shortcuts:

- **Save:** <kbd>Ctrl</kbd>+<kbd>S</kbd> or <kbd>Cmd</kbd>+<kbd>S</kbd> (Mac)
- **Run:** <kbd>Ctrl</kbd>+<kbd>Enter</kbd> or <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac)
- **Reset:** <kbd>Ctrl</kbd>+<kbd>X</kbd> or <kbd>Cmd</kbd>+<kbd>X</kbd> (Mac)
- **Increase font size:** <kbd>Ctrl</kbd>+<kbd>Plus (+)</kbd> or <kbd>Cmd</kbd>+<kbd>Plus (+)</kbd> (Mac)
- **Decrease font size:** <kbd>Ctrl</kbd>+<kbd>Minus (-)</kbd> or <kbd>Cmd</kbd>+<kbd>Minus (-)</kbd> (Mac)
- **Switch between tabs:** <kbd>Ctrl</kbd>+<kbd>1, 2, 3, 4</kbd> (Mac)
- **View the typings suggestions:** <kbd>Ctrl</kbd>+<kbd>space</kbd> (Mac)


### Saving Your Work

The Code Playground features local persistence to help prevent the loss of your work. This functionality ensures that your code is stored in your browser's local storage, providing a safeguard against accidental data loss.

Code in the playground is not saved automatically, but you can ensure it's saved by using one of the following options:

  1. Save your work using the keyboard shortcut for Save [(above)](#keyboard-shortcuts)
  2. Run the code via the "Run Code" button or with the keyboard shortcut for Run [(above)](#keyboard-shortcuts)

<InlineAlert slots="text" variant="warning">

- Regularly save your work to avoid accidental loss. 
- Local storage is browser-specific and not synchronized across devices.
- If you're using incognito/private browsing mode, your code will not be saved once you close the browser.
- If you clear your browser data/cache, your saved code will be deleted.

### Resuming Sessions

There are two ways to resume working on your last saved session:

1. **Via the Add-ons Panel:** With a document opened, click the Add-ons button in the left rail, then the "Your Add-ons" tab and toggle on the "Code Playground" button to automatically open your last saved session.

2. **Via Your Add-ons Page:** The "Your add-ons" page where you manage your add-ons now features a dedicated section for the playground, allowing you to quickly access your last session.

## Next steps

- **Experiment with Common Use Cases:** Begin by experimenting with some [common use cases](../develop/how_to.md) to kickstart your development.
- **Start with Code Samples:** Check out [these samples](../../samples.md) to see what's possible and get inspired.
- **Understand Add-on Concepts:** Get familiar with the fundamentals of building add-ons.

  - [iFrame Context](../develop/context.md)
  - [Document Sandbox](../../references/document-sandbox/document-apis/concepts/index.md)
  - [Manifest File](../../references/manifest/index.md)

- **Explore API References:** Discover all available APIs and their capabilities in the [SDK Reference](../../references/index.md).
- **[Ask Questions](https://developer.adobe.com/express/community/):** Join us for Office Hours or chat with the team on Discord.

## FAQs

### What is the Adobe Express Developer Playground?

Adobe Express Developer Playground is a lightweight code editor designed for fast and effortless prototyping. It allows you to experiment with simple code snippets to build and refine add-ons, quickly turning ideas into functional features.

### Is it free to use?

Yes, the Developer Playground is free to use. You can access all its features without any cost and start prototyping and creating add-ons right away.

### Do I need coding experience?

While some basic coding knowledge is helpful, Playground is designed to be beginner-friendly and accessible. Its intuitive interface and simple code snippets make it easier for both experienced developers and those newer to coding to create and test add-ons.

### How do I start creating add-ons?

Getting started is simple. Activate the Playground, experiment with code snippets, and start building your add-ons. Use the real-time preview feature to see your changes instantly and iterate on your ideas with ease.

### Where can I go for help?

[Join our Discord](http://discord.gg/nc3QDyFeb4) to chat with the add-on developer community.
