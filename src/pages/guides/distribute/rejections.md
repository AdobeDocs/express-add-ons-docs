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

# Common Rejection Causes and How To Avoid Them

## Overview

When you submit an add-on for distribution, the review team *thoroughly* examines it to ensure it meets the [guidelines](./guidelines/index.md) and is safe for public distribution. If something goes wrong, you will receive an email with the reasons that led to a rejection. You shouldn't be discouraged, though! Usually, the fixes are relatively straightforward, and the detailed feedback from the reviewers is an opportunity to improve and learn.

That said, being rejected is annoying and, most importantly, time-consuming, as multiple re-submissions will impact the time it takes to get your add-on published. To help you avoid it, we've compiled a list of the most common reasons for review failures and how to address them.

## Functional issues

As trivial as it may sound, the add-on not working as expected is the **most common cause** of trouble. This can be anything from a simple failure to the inability to log in. Here are some of the most common functional issues the reviewers have reported and our suggestions to prevent them.

### Broken features

Problems can be directly related to the **add-on's core functionality**, e.g., failures in exporting from and importing assets into the document or performing server-side processing. Sometimes, bugs are sneaky and only appear under specific conditions, which our reviewers have proved *exceptionally talented* in finding—just so you know. Test your add-on thoroughly and make sure it works in all scenarios, edge cases included.

### Minor bugs

The reviewers will also reject your add-on if they find less critical problems that still **affect the user experience**. Issues could vary from missing event handlers to 404 links and broken icons. Do your best to catch them all before submitting your add-on.

### Authentication problems

In case your product requires users to log in, make sure the **authentication workflow is operating properly**, and don't forget to *always* add a logout option. If present, reviewers should also be provided with working **credentials to test premium features**, a key requirement for add-ons that offer paid services.

### Browser compatibility

Adobe Express [officially supports](https://helpx.adobe.com/express/system-requirements.html#system-requirements-web) the four most popular browsers: **Chrome, Safari, Edge, and Firefox**. Your add-on must be tested and work seamlessly across all of them. If any problems discussed so far are found in even one of these browsers, the reviewers are bound to reject it.

## UI/UX Issues

Both the User Interface and Experience—i.e., how information is presented to users and how they interact with it—are crucial elements for the success of your products. Here are some common pitfalls that can prevent your add-on from being approved.

### Navigation problems

The UI should always provide an intuitive and **functional way to navigate the add-on's screens**. It should also offer a method to return to the previous screen or home page, especially if a PDF or webpage is opened in the iframe and overrides its entire content. If users can't find a clear path to follow and get stuck, the reviewers will throw the ball back in your court and ask you to revise your code.

### Error handling

Every **user interaction should always return clear feedback**. For instance, progress indicators or text notices should be displayed when the add-on runs a process in the background to signal that it is actually doing something and is not idle or frozen. Input fields should have proper validation to avoid errors with out-of-bounds values in your routines, and displayed errors should be informative and actionable. Additional information should be provided as tooltips or text to clarify why elements are disabled or actions are unavailable. It's relatively common to forget about these details, but they are a typical cause of review failures; make sure to remember them.

## Recent changes to review criteria

Due to changes in the testing and reviewing processes, some issues that used to cause rejections aren't considered blocking anymore. Please find below some of the most recent ones.

### Relaxed UI Requirements

Using the [Spectrum Design System](../design/user_interface.md#spectrum-design-system) is **no longer mandatory**, provided that the add-on's UI follows the best practices outlined in the [UX Guidelines](https://xd.adobe.com/view/urn:aaid:sc:US:fd638450-1af8-49c3-ad29-0e76c2a2136f/) and is well-crafted. Spectrum Web Components and the Spectrum Express theme are still the recommended options, as they reliably provide a native look and feel. Mind you, malfunctioning or poorly designed UIs will always be rejected regardless of the design system used.

### COEP issues

The reviewing team **no longer tests** for [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) (Cross-Origin Embedder Policy), which used to cause, e.g., broken images. [CORS](../develop/context.md#cors) (Cross-Origin Resource Sharing) policies are still enforced, though, so make sure your add-on doesn't break due to them.
