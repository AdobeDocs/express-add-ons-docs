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
description: This is the main guides page
contributors:
  - https://github.com/hollyschinsky
---

<InlineAlert slots="text" variant="info"/>

Preview Adobe Express add-on SDK documentation while you wait to [join our private beta](https://adobe.com/go/express-developer).

<br/><br/>

# Overview
Adobe Express is an all-in-one content creation app that makes it fast, easy and fun to design standout flyers, TikToks, resumes, Reels, banners, logos, invitations, webpages and so much more. 

## Add-ons
Add-ons extend the functionality of [Adobe Express](https://new.express.adobe.com/), unlocking creative workflows for Adobe Express users. The add-ons marketplace is a dedicated platform for developers to distribute and users to discover new add-ons.

To discover add-ons in [Adobe Express](https://new.express.adobe.com/new), simply follow these steps or watch the short video that follows:

1. Open the Adobe Express editor.
2. Click on the **Add-ons** button located in the left-hand sidebar.
3. Browse through the different categories of add-ons or use the search bar to find specific add-ons.
4. Click on an add-on to view more information and to install it.

That's it! You can now use the installed add-ons in your Adobe Express projects.<br/><br/>


<iframe width="680" height="382" src="https://www.youtube.com/embed/E2KyI8x366E" title="Find add-ons in Adobe Express" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


### Use Cases
Some examples of add-on use cases include:

- Importing images and video
- Connecting to external sources via OAuth 2.0
- Storing and retrieving data
- Supporting drag-and-drop of content to the canvas
- Retrieving manifest data
- Managing language and locale
- Retrieving the current theme and detecting theme changes
- Exporting renditions of images in different formats

See the [implementing common use cases page](../develop/) and [code samples](../samples.md) for more details on how to implement the above use cases. 


## Add-on Developer Journey
The journey to developing an add-on is outlined below: 

1. Create an add-on project with the CLI. You can refer to the [Getting Started](./getting_started/) guides to help you create your first project quickly. 
2. Design your UI using [Adobe's Spectrum Design System](https://spectrum.adobe.com/). This system provides guidelines and resources for designing user interfaces that follow Adobe's design language and best practices. 
3. Use the [common use case implementations](./develop/), [code samples](../samples.md), and [references](../references/) to learn how to include all the features you want to showcase in your add-on. This can help you save time and avoid common mistakes when developing your add-on. 
4. [Debug and test](./debug/) your add-on using your favorite browser tools, Visual Studio Code, and the add-on logging window provided in the Adobe Express UI development environment. This will help you identify and fix any bugs or issues before distributing your add-on. 
5. Distribute your add-on for public or private sharing. You can refer to the [add-on distribution guidelines](./distribute/) to learn how to package and distribute your add-on on the Adobe add-ons marketplace or privately to your clients. 

If you run into any issues at any time throughout your development process, please refer to the [Debug Guides](../guides/debug/) and [FAQ](../guides/faq.md) for more help. 

