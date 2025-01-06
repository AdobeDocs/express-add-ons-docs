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
title: Adobe Express Add-ons Guides
description: Find the most recent documentation, code samples and resources for building add-ons for Adobe Express.
contributors:
  - https://github.com/hollyschinsky
---

<HeroSimple slots="heading, text" background="rgb(138, 43, 226)"/>

# Overview

Adobe Express is the AI-first, all-in-one creativity app that makes it fast, easy, and fun for any user to design and share standout content.

## Add-ons

<InlineAlert slots="text" />

**Join Us: Office Hours for Adobe Express Developers** 
Receive real-time support, have your questions answered, and connect with both experts and peers for discussions on all things related to add-ons. Join us every month on Wednesdays at 8 AM PT. [Register for our next session here](https://developer.adobe.com/developers-live).

Add-ons extend the functionality of [Adobe Express](https://new.express.adobe.com/), unlocking creative workflows for Adobe Express users. The add-ons marketplace is a dedicated platform for developers to distribute and users to discover new add-ons. Check out this quick introduction to Adobe Express add-ons to learn more, then read on to get started. 

<Embed slots="video" />

https://www.youtube.com/embed/CHBiTTN1neE

To discover add-ons in [Adobe Express](https://new.express.adobe.com/new):

1. Open the Adobe Express editor and [create a new file](https://new.express.adobe.com/new) or open an existing one.
2. Click on the **Add-ons** button located in the left-hand sidebar.
3. Browse through the different categories of add-ons or use the search bar to find specific add-ons.
4. Click on an add-on to view more information and to install it.

![discover add-ons image](../images/discover.png)

That's it! You can now use the installed add-ons in your Adobe Express projects.

### Use Cases

Ready to build your own? Check out these popular use cases supported by our add-on SDK for inspiration:

- Importing images and video
- Exporting renditions of images in different formats
- Connecting to external sources via OAuth 2.0
- Storing and retrieving data
- Drag-and-drop support of content to the canvas
- Retrieving manifest data
- Managing language and locale
- Retrieving the current theme and detecting theme changes

See the [implementing common use cases](./develop/index.md) page and [code samples](../samples.md) for more details on how to implement the features above.

## Add-on Developer Journey

The journey to developing an add-on is outlined below:

1. Create an add-on project with the CLI. You can refer to the [Getting Started](./getting-started/index.md) guides to help you create your first project quickly.
2. Design your UI using [Adobe's Spectrum Design System](https://spectrum.adobe.com/). This system provides guidelines and resources for designing user interfaces that follow Adobe's design language and best practices.
3. Use the [common use case implementations](./develop/index.md), [code samples](../samples.md), and [references](../references/index.md) to learn how to include all of the features you want to showcase in your add-on. This can help you save time and avoid common mistakes when developing your add-on.
4. [Debug and test](./debug/index.md) your add-on using your favorite browser tools, Visual Studio Code, and the add-on logging window provided in the Adobe Express UI development environment. This will help you identify and fix any bugs or issues before distributing your add-on.
5. Distribute your add-on for public or private sharing. You can refer to the [add-on distribution guidelines](./distribute/index.md) to learn how to package and distribute your add-on on the Adobe add-ons marketplace or privately to your clients.

If you run into any issues at any time throughout your development process, please refer to the [Debug Guides](../guides/debug/index.md) and [FAQ](../guides/faq.md) for more help.
