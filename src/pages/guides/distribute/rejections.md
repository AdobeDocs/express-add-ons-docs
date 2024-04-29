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
title: Common rejection causes
description: A guide to Common add-on's rejection causes
contributors:
  - https://github.com/undavide
---

# Common Rejection Causes

## Overview

When you submit an add-on for distribution, the review team *thoroughly* examines it to ensure it meets the [guidelines](./guidelines/index.md) and is safe for public distribution. If something goes wrong, you will receive an email with the reasons that led to a rejection. You shouldn't be discouraged, though! Usually, the fixes are relatively straightforward, and the detailed feedback from the reviewers is an opportunity to improve and learn.

That said, being rejected is annoying and, most importantly, time-consuming—as multiple re-submissions will impact the time it takes to get your add-on published. To help you avoid it, we've compiled a list of the most common reasons for rejection and how to address them.

## Functional issues

As trivial as it may sound, the add-on not working as expected is the most common cause for rejection. This can be anything from a simple failure to the inability to log in. Here are some of the most common functional issues the reviewers have reported.

### Broken features

Problems can be directly related to the add-on's core functionality, including failures in exporting from and importing assets into the document. Sometimes, bugs are sneaky and only appear under specific conditions. To avoid this, test your add-on thoroughly and make sure it works in all scenarios.

### Minor bugs

The reviewers will also reject your add-on if they find less critical problems that still affect the user experience. Issues could vary from missing event handlers to 404 links. Do your best to catch them all before submitting your add-on.

### Authentication problems

In case your add-on requires users to log in, make sure the authentication workflow is working properly, and don't forget to always add a logout option. If present, reviewers should also be provided with functional credentials to test all the premium features.

### Browser compatibility

Adobe Express [officially supports](https://helpx.adobe.com/express/system-requirements.html#system-requirements-web) the four most popular browsers: Chrome, Safari, Edge, and Firefox. Your add-on must be tested and work seamlessly across all of them. If any of the problems discussed so far are found in even one of these browsers, the reviewers are bound to reject it.

## UI/UX Issues

Both the User Interface and Experience (i.e., how information is presented to users and how they interact with it) are crucial elements for the success of your products. Here are some common pitfalls that can prevent your add-on from being approved.

### Navigation problems

The UI should always provide a functional and intuitive way to navigate the add-on's screens. It should also offer a method to return to the previous screen or home page, especially if a PDF or webpage is opened in the iframe. If users can't find a clear path to follow and get stuck, the reviewers will reject your add-on.

### Error handling

Every user interaction should always return clear feedback. For instance, progress indicators should be displayed when the add-on is running a process in the background; input fields should have proper validation to avoid errors with out-of-bounds values, and displayed errors should be informative and actionable; additional information should be provided in the form of tooltips or text to clarify why elements are disabled, or actions are not available.

## Recent changes to review criteria

Due to changes in the reviewing process, some issues that used to cause rejections aren't blocking anymore. Here are some of the most recent changes.

### Relaxed UI Requirements

Using the [Spectrum Design System](../design/user_interface.md#spectrum-design-system) is no longer mandatory, provided that the add-on's UI follows the best practices outlined in the [UX Guidelines](https://xd.adobe.com/view/urn:aaid:sc:US:fd638450-1af8-49c3-ad29-0e76c2a2136f/) and is well-crafted. Spectrum Web Components and the Spectrum Express theme are still recommended, as they reliably provide a native look and feel.

### COEP issues

The reviewing team no longer tests for [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) (Cross-Origin-Embedder-Policy), which used to cause broken images and was one of the most common causes of rejection.
