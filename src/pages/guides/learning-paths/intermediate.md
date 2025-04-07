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
  - Learning Paths
title: "Intermediate Path: Build your first add-on"
description: Adobe Express Add-ons Intermediate Learning Path
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/undavide
---

# Intermediate Path: Build your first add-on

If you've completed the [Beginner Path](./beginner.md), or are otherwise familiar with the Adobe Express ecosystem, how add-ons work, and the [Code Playground](../getting_started/code_playground.md), this path will guide you through building a more complex add-on from the ground up.

## 1. Scaffold a new add-on with the CLI

In-app prototyping with the Code Playground is a great way to get started with add-on development, but to build a production-ready add-on, you'll need to scaffold a **local development environment**.

Luckily, Adobe Express provides a Command Line Interface (CLI) that makes it easy to set up a new project. Read the [Development Tools](../getting_started/dev_tooling.md) guide to learn how to use the CLI and:

- Scaffold new add-ons based on a variety of templates (JavaScript, TypeScript, React, etc.)
- Set up a hot-reloading local server for testing purposes
- Package the add-on for distribution

<InlineAlert variant="info" slots="header, text1, text2, text3"/>

#### Loading an add-on during development

The CLI, among the rest, builds the add-on from the source code on your local machine and spins a local server that serves it. Adobe Express side loads the add-on from this server while you're developing locally.

![CLI](./images/intermediate-cli.png)

Follow the [CLI's instructions](../getting_started/dev_tooling.md) and make sure you've [enabled the add-on Development Mode](../getting_started/quickstart.md#step-3-enable-add-on-development-mode-first-time-only) in Adobe Express.

## 2. Follow a tutorial to build a full add-on from scratch

Now that you have all the tools you need, you can follow a tutorial to build a full add-on from scratch. Among the [available ones](../tutorials/index.md), we suggest starting with the [Document API Tutorial](../tutorials/grids-addon.md), which guides you through building an add-on that adds a grid layout to any document.

![Document API Tutorial](../tutorials/images/grids-addon-animation.gif)

The add-on you're building in this tutorial is production-ready, and is an excellent starting point. It covers the following topics:

- **Creating and manipulating shapes**.
- **Grouping elements** and insertion points.
- **Spectrum Web Components** to build the User Interface.
- **The Document API** to manipulate the document and its elements.
- Iframe and Document Model Sandbox **communication**.

Alongside with a more complex usage of the various APIs and the creation of a structured UI, you'll be introduced to the [Communication API](../tutorials/grids-addon/#the-communication-api), which is the main way for an add-on to interact with Adobe Express Documents.
