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
description: A guide to using the Code Playground in Adobe Express.
contributors:
  - https://github.com/padmkris123
  - https://github.com/hollyschinsky
  - https://github.com/ErinFinnegan
  - https://github.com/undavide
  - https://github.com/nimithajalal
---

# Code Playground

The Code Playground is an in-app lightweight code editor for fast and effortless prototyping of Adobe Express add-ons.

## Overview

### What is Code Playground?

Code Playground provides developers with a low-barrier entry point for add-on development, allowing you to experiment and iterate on ideas directly without any setup, from within Adobe Express. From learning the basics to rapidly prototyping advanced concepts, Code Playground accommodates all stages of add-on development.

### Key Benefits

- **Real-Time Preview**: See your changes as you code, allowing for immediate feedback and faster adjustments
- **Effortless Prototyping**: Quickly turn ideas into add-ons with minimal setup
- **Rapid Implementation**: Fast-track your prototype to a product by directly pasting your code into an add-on template
- **Local Persistence**: Save your work to your browser's local storage and resume where you left off
- **Programming Assistance**: Typed definitions and auto-completion

### Who Should Use Code Playground?

The Code Playground is designed for:

- **Beginners**: New developers who want to experiment with Adobe Express add-on development without setting up a full development environment
- **Prototypers**: Developers who need to quickly test concepts or ideas before implementing them in a full add-on project
- **Learners**: Those who are learning the Document APIs and want to see immediate results of their code
- **Experienced Developers**: Seasoned developers who want to test specific API functionality or debug isolated code snippets
- **Designers**: UX/UI designers who want to experiment with add-on interfaces without extensive coding setup

## Getting Started

### Prerequisites

Before using Code Playground, ensure you have:

- An Adobe Express account
- A document open in Adobe Express (for testing your code)

### How to Access Code Playground

#### Step 1: Open Code Playground

1. With any document open in Adobe Express, click the **Add-ons** button in the left rail
2. Select the **Your add-ons** tab
3. Toggle on **Code Playground** at the bottom of the panel:

   ![Adobe Express Code Playground Toggle](./img/toggle-playground.png)

4. Once enabled, the playground window will open, allowing you to begin coding immediately:

   ![Adobe Express Code Playground Open](./img/playground-open.png)

#### Step 2: Enable Add-on Development Mode (if needed)

If this is your first time using Code Playground or any add-on development features, you may need to enable Add-on Development mode:

1. Click the avatar icon in the top right corner of Adobe Express, then the gear icon to open the "Settings"
2. Click the **Developer Terms of Use** link to review the terms (opens in a new tab)
3. Click **Accept and Enable** to enable **Add-on Development**

![Enable Add-on Development](./img/playground-enable-dev-mode.gif)

<InlineAlert slots="header,text1,text2" variant="info"/>

#### Quick Access to Development Mode

When using the [CLI to build add-ons](./quickstart.md), the terminal output includes a direct URL to activate Development Mode. Look for this URL in the terminal after running `npm run start` to quickly enable development features without manually navigating to Settings.

## Development Modes

The playground offers two distinct development modes to suit different needs:

### Mode Overview

| Comparison Factor     | Script Mode                                                               | Add-on Mode                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**           | Quick document manipulation tests                                         | Complete add-on UI and functionality                                                                                            |
| **Environment**       | Document Sandbox only                                                     | Both iframe and Document Sandbox                                                                                                |
| **API Access**        | [Document APIs](../../references/document-sandbox/document-apis/index.md) | [Document APIs](../../references/document-sandbox/document-apis/index.md) + [Add-on UI SDK](../../references/addonsdk/index.md) |
| **Global Await**      | Yes                                                                       | No                                                                                                                              |
| **Automatic Imports** | Yes                                                                       | No                                                                                                                              |
| **UI Components**     | No UI building                                                            | Full HTML/CSS/JS interface creation                                                                                             |
| **Best For**          | Testing document operations                                               | Building complete add-ons                                                                                                       |

### When to Use Each Mode

**Use Script Mode when:**

- Learning how the Document APIs work
- Quickly experimenting with Document API calls without UI considerations
- Testing specific API functionality
- Debugging isolated code snippets

**Use Add-on Mode when:**

- Developing and testing a complete add-on directly in Adobe Express
- Prototyping an add-on before building a full project
- Iterating quickly on your add-on's UI and logic
- Building user interfaces around your functionality

## Quick Start Guides

- **[Script Mode Guide](./code_playground_script_mode.md)**: Learn how to use Script Mode for quick document manipulation
- **[Add-on Mode Guide](./code_playground_addon_mode.md)**: Build complete add-ons with UI and functionality
- **[Workflow & Productivity](./code_playground_workflow.md)**: Master keyboard shortcuts, saving, and session management
- **[Troubleshooting](./code_playground_troubleshooting.md)**: Get help with common issues and FAQs

## Next Steps

Now that you understand the basics of Code Playground, explore our resources to continue building robust add-ons:

- **[API References](../../references/index.md)**: Learn about the Document APIs and Add-on SDK
- **[Tutorials](../learn/how_to/tutorials/index.md)**: Follow step-by-step guides to build complete add-ons
- **[How-To Guides](../learn/how_to/index.md)**: Master specific techniques and best practices
- **[Local Development](../getting_started/local_development/index.md)**: Set up a full development environment for production-ready add-ons
- **Code Samples:** Get inspired by checking out [our code samples](../learn/samples.md) to see what's possible
- **Community Support:** Chat with fellow developers on [Discord](http://discord.gg/nc3QDyFeb4)
