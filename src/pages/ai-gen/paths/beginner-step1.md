---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Learning Paths
  - Beginner
  - Introduction
title: Introduction to Add-ons
description: Learn the fundamentals of Adobe Express add-ons and understand their capabilities and architecture.
contributors:
  - https://github.com/hollyschinsky
---

# Module 1: Introduction to Adobe Express Add-ons

**Estimated time: 30 minutes**

This first module will introduce you to what add-ons are, their capabilities, and the foundational architecture that makes them work.

## What Are Adobe Express Add-ons?

Adobe Express add-ons are extensions that enhance the functionality of Adobe Express, allowing users to do more with the platform. Add-ons integrate seamlessly with the Adobe Express interface and can help users:

- Import content from external sources
- Apply special effects or transformations
- Organize and manage content
- Export content in various formats
- Connect with third-party services
- And much more!

Add-ons run in their own panel within Adobe Express, giving users easy access to their functionality while working on their projects.

## Add-on Capabilities

Adobe Express add-ons can:

- **Access document content**: Add, modify, and remove elements in the user's document
- **Import content**: Add images, text, video, and other media to documents
- **Export content**: Create renditions of documents in various formats
- **Use external services**: Connect to APIs and web services via OAuth
- **Store data**: Save user preferences and other information locally
- **Create custom UI**: Build intuitive interfaces using Adobe's Spectrum design system

## Add-on Architecture

At a high level, Adobe Express add-ons consist of:

1. **UI Layer**: HTML, CSS, and JavaScript that create the user interface in the add-on panel
2. **Document Sandbox**: Secure JavaScript environment for manipulating document content
3. **Add-on SDK**: JavaScript APIs that enable communication between your code and Adobe Express

The typical workflow involves:
- User interacts with your add-on UI
- Your code calls Add-on SDK APIs
- The Adobe Express application responds by updating the document or providing data

This separation ensures security while giving you powerful capabilities to extend Adobe Express.

## Key Concepts

Before moving on, make sure you understand these key concepts:

- **Add-on Manifest**: JSON file that defines your add-on's properties, permissions, and requirements
- **Add-on SDK**: JavaScript APIs that allow your add-on to interact with Adobe Express
- **Document Sandbox**: Secure environment for code that manipulates document content
- **Spectrum Design System**: Adobe's design system that helps create consistent user experiences

## Hands-On Exercise

Take 10 minutes to explore the [Adobe Express Add-ons Marketplace](https://new.express.adobe.com/) to see examples of add-ons in action:

1. Open Adobe Express in your browser
2. Click on the "Add-ons" icon in the sidebar
3. Browse through several categories of add-ons
4. Install and try 2-3 different add-ons to see how they integrate with the Express experience

## Additional Resources

To deepen your understanding of Adobe Express add-ons, explore these resources:

- [Getting Started - Introduction](../../guides/getting_started/index.md)
- [Frequently Asked Questions](../../guides/faq.md)

## Knowledge Check

Before moving to the next step, make sure you can answer these questions:

1. What are Adobe Express add-ons and how do they enhance the Adobe Express experience?
2. What are the main components of an add-on's architecture?
3. What types of content can add-ons help users work with?
4. What is the Add-on SDK and what role does it play?

## Next Step

Once you're comfortable with these concepts, you're ready to set up your development environment and start building.

[Proceed to Step 2: Setting Up Your Development Environment →](beginner-step2.md) 