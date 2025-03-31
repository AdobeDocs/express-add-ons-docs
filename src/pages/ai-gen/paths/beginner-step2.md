---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Development Environment
  - Setup
  - Node.js
  - npm
title: Setting Up Your Development Environment
description: Set up and configure your local development environment for Adobe Express add-on development.
contributors:
  - https://github.com/hollyschinsky
---

# Module 2: Setting Up Your Development Environment

**Estimated time: 45 minutes**

Before you can start building add-ons for Adobe Express, you need to set up a development environment with the right tools. This step will guide you through installing and configuring everything you need.

## Prerequisites

To develop Adobe Express add-ons, you'll need:

- A modern web browser (Chrome, Edge, or Firefox recommended)
- Basic knowledge of HTML, CSS, and JavaScript
- A text editor or IDE (Visual Studio Code recommended)

## Setting Up Your Development Tools

Follow these steps to set up your development environment:

### 1. Install Node.js and npm

The Adobe Express add-on development tools are built on Node.js:

1. Go to [Node.js website](https://nodejs.org/)
2. Download and install the LTS (Long Term Support) version
3. Verify installation by opening a terminal/command prompt and typing:
   ```
   node --version
   npm --version
   ```

### 2. Install the Adobe Express Add-on CLI

The Create CCWeb Add-on CLI tool helps you create, build, and test add-ons:

1. Open a terminal/command prompt
2. Run the following command:
   ```
   npm install -g @adobe/create-ccweb-add-on
   ```
3. Verify installation:
   ```
   npx @adobe/create-ccweb-add-on --version
   ```

### 3. Set Up Visual Studio Code (Recommended)

For the best development experience:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/)
2. Install recommended extensions:
   - JavaScript and TypeScript support
   - Live Server (for local development)
   - ESLint (for code quality)
   - Prettier (for code formatting)

## Understanding the Development Workflow

Once your environment is set up, here's the typical workflow for developing an add-on:

1. **Create a new add-on project** using the CLI tool
2. **Develop** your add-on code and UI
3. **Test** your add-on in Adobe Express
4. **Package** your add-on for distribution

We'll explore each of these steps in more detail as we progress through this learning path.

## Creating Your First Project

Let's create a basic project to verify everything is working:

1. Open a terminal/command prompt
2. Navigate to a directory where you want to store your add-on projects
3. Run:
   ```
   npx @adobe/create-ccweb-add-on my-first-addon
   ```
4. Follow the prompts to create a simple add-on project
5. Once created, navigate into the project directory:
   ```
   cd my-first-addon
   ```
6. Install dependencies:
   ```
   npm install
   ```
7. Start the development server:
   ```
   npm run start
   ```

This will start a local server, and you'll see instructions for how to load your add-on in Adobe Express.

## Development Tools Overview

Adobe provides several tools to help with add-on development:

- **Create CCWeb Add-on CLI**: Creates new add-on projects with templates
- **Add-on SDK**: JavaScript library for interacting with Adobe Express
- **Add-on Test Utility**: Tools for testing your add-on
- **Adobe Express Developer Mode**: For loading and testing your add-ons in Express

Take some time to familiarize yourself with the files and structure of the project you just created. The key files include:

- `manifest.json`: Defines your add-on properties and requirements
- `index.html`: The main UI entry point for your add-on
- `src/`: Directory for your JavaScript code

## Additional Resources

For more detailed information on setting up your environment:

- [Setup Guide](../../guides/getting_started/setup.md)
- [Development Tools](../../guides/getting_started/dev_tooling.md)

## Knowledge Check

Before moving to the next step, make sure you can answer these questions:

1. What are the basic tools needed for Adobe Express add-on development?
2. How do you create a new add-on project using the CLI?
3. What's the purpose of the manifest.json file?
4. How do you start the development server for local testing?

## Troubleshooting Common Setup Issues

If you encounter any of these common issues:

- **Node.js installation problems**: Make sure you have admin rights when installing
- **CLI installation errors**: Try using `sudo` on Mac/Linux or run command prompt as Administrator on Windows
- **Project creation failures**: Check your internet connection and firewall settings

## Next Step

Now that your development environment is set up, you're ready to start experimenting with the code playground.

[Proceed to Step 3: Using the Playground to Experiment →](beginner-step3.md)

[← Back to Step 1: Introduction to Add-ons](beginner-step1.md) 