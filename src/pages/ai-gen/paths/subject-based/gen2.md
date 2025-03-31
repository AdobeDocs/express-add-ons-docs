# Subject-Based Learning Paths for Adobe Express Add-on Development

## Subject Path: Using Images in Adobe Express Add-ons

### Core Concepts
- [Use Images Guide](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/use_images.md) - Learn the fundamentals of importing images into Adobe Express documents
- [Image Requirements](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document.md#image-requirements) - Understanding file format support and size requirements

### Implementation Methods

#### Basic Image Import
- [addImage() Method Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document.md#addimage) - API for adding static images to documents
- [Blob Object Handling](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/use_images.md#example) - Converting fetch responses to blobs for import

#### Animated Images
- [addAnimatedImage() Method Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document.md#addanimatedimage) - API for adding GIFs to documents
- [Animated GIF Limitations](https://developer.adobe.com/express/add-ons/docs/guides/faq.md#are-animated-gifs-supported-when-importing-or-dragging-content-to-the-document) - Understanding GIF size and weight restrictions

#### Advanced Image Interactions
- [Drag and Drop Implementation](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/drag_and_drop.md) - Enable drag and drop of images to documents
- [Document APIs Tutorial](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/document_apis/) - Complete tutorial for working with document elements

### UI Integration with Spectrum
- [Content Library Add-on Example](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#practical-example-content-library-add-on) - Example of image grid implementation with Spectrum components
- [Lit Framework Implementation](https://opensource.adobe.com/spectrum-web-components/getting-started/) - Using Lit for reactive image components

### Related SDK Documentation
- [MediaAttributes Object](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document.md#mediaattributes) - Adding metadata to imported images
- [Document Object Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document.md) - Complete document manipulation API reference

### Samples and Examples
- [Image Gallery Add-on Sample](https://developer.adobe.com/express/add-ons/docs/samples.md) - Complete sample implementing an image gallery
- [Bingo Card Generator Sample](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/part1/) - Example generating and adding canvas-based images

### Troubleshooting
- [FAQ on Import Issues](https://developer.adobe.com/express/add-ons/docs/guides/faq.md) - Solutions to common image import problems
- [Debugging Guide](https://developer.adobe.com/express/add-ons/docs/guides/debug/) - Tools and techniques for debugging image-related issues

## Subject Path: Authentication and Authorization

### OAuth 2.0 Implementation
- [OAuth 2.0 Guide](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/oauth2.md) - Complete guide to implementing OAuth in add-ons
- [oauth API Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth.md) - Detailed API documentation

### Authorization Methods
- [authorize() Method](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth.md#authorize) - Standard OAuth authorization flow
- [authorizeWithOwnRedirect() Method](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth.md#authorizewithownredirect) - Custom redirect OAuth flow

### User Authentication
- [User Information Access](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-currentUser.md) - Getting current user ID and premium status
- [Premium User Detection](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-currentUser.md#ispremiumuser) - Identifying premium users for feature access

### Development Tools
- [simulateFreeUser Flag](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-devFlags.md#simulatefreeuser) - Testing free user experiences
- [Error Handling](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth.md#errors) - OAuth-specific error management

## Subject Path: Data Management

### Client-side Storage
- [Client Storage Guide](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/local_data_management.md) - Guide to persistent client-side storage
- [clientStorage API Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage.md) - Complete API documentation

### Storage Operations
- [Basic Storage Operations](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage.md#methods) - setItem, getItem, removeItem, clear, keys
- [Data Type Support](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage.md#setitem) - Understanding supported data types

### Content Library Implementation
- [Recent Items Storage Example](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#practical-example-content-library-add-on) - Example of storing recently viewed items
- [Error Handling](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage.md#errors) - Managing storage quotas and failures

## Subject Path: Building User Interfaces with Spectrum

### Getting Started with Spectrum
- [Spectrum Design System Overview](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#spectrum-design-system-overview) - Introduction to Adobe's design system
- [Setting Up Spectrum](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#setting-up-your-add-on-with-spectrum) - Installation and basic setup guide

### Components and Theming
- [Theming in Spectrum](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#theming-in-spectrum) - Configuring themes for consistent appearance
- [Component Selection Guide](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#component-selection-guide) - Choosing the right components for your add-on

### Layout and Typography
- [Typography, Layout, and Spacing](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#typography-layout-and-spacing) - Design principles for text and layout
- [CSS Variables](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#theming-in-spectrum) - Using Spectrum CSS variables for consistent styling

### Framework Integration
- [JavaScript Implementation](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/part1/) - Vanilla JS approach with Spectrum Web Components
- [React Integration](https://developer.adobe.com/express/add-ons/docs/guides/tutorials/spectrum-workshop/part2/) - Using Spectrum with React
- [Lit Framework Implementation](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md) - Web components with the Lit framework

### Theme Detection and Handling
- [Theme Detection API](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-ui.md#theme) - Accessing the current theme
- [Theme Change Events](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-ui.md#themechange) - Responding to theme changes
- [Dynamic Rendering with Themes](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#theme-detection-and-dynamic-rendering) - Updating UI based on themes

### Advanced Topics
- [What's New in Spectrum 2](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#whats-new-in-spectrum-2) - Latest updates and migration guide
- [Troubleshooting Common Issues](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#troubleshooting-common-issues) - Solutions to common Spectrum problems
- [Best Practices](https://developer.adobe.com/express/add-ons/docs/guides/design/spectrum.md#best-practices) - Recommended approaches for Spectrum implementation

## Subject Path: Document Manipulation

### Document APIs Basics
- [Document Object Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-document.md) - Complete API documentation
- [Document Structure](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/group_elements.md) - Understanding document element hierarchy

### Content Management
- [Adding Content](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/use_design_elements.md) - Working with various design elements
- [Creating Renditions](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/create_renditions.md) - Exporting document content

### Element Manipulation
- [Element Positioning](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/position_elements.md) - Controlling element placement
- [Element Grouping](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/group_elements.md) - Working with groups of elements

### User Interaction
- [Drag and Drop](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/drag_and_drop.md) - Enabling drag to document functionality
- [Modal Dialogs](https://developer.adobe.com/express/add-ons/docs/guides/develop/how_to/modal_dialogs.md) - Creating interactive dialogs

## Subject Path: Add-on Development Workflow

### Getting Started
- [Overview](https://developer.adobe.com/express/add-ons/docs/guides/) - Introduction to Adobe Express add-ons
- [Quickstart Guide](https://developer.adobe.com/express/add-ons/docs/guides/getting_started/quickstart/) - Rapid setup and first add-on
- [Development Tools](https://developer.adobe.com/express/add-ons/docs/guides/getting_started/development_tools/) - CLI and tools overview

### Design Phase
- [UX Guidelines](https://developer.adobe.com/express/add-ons/docs/guides/design/ux_guidelines/) - Design principles for add-ons
- [Implementation Guide](https://developer.adobe.com/express/add-ons/docs/guides/design/implementation_guide/) - Translating designs to code
- [Best Practices](https://developer.adobe.com/express/add-ons/docs/guides/design/best_practices/) - Design recommendations

### Development Phase
- [Common Use Cases](https://developer.adobe.com/express/add-ons/docs/guides/develop/) - Implementation guides for typical features
- [Frameworks and Libraries](https://developer.adobe.com/express/add-ons/docs/guides/develop/frameworks-libraries-bundling.md) - Using modern frameworks
- [Performance Tips](https://developer.adobe.com/express/add-ons/docs/guides/develop/performance-tips.md) - Optimization techniques

### Testing and Debugging
- [Browser Debugging](https://developer.adobe.com/express/add-ons/docs/guides/debug/browser_debugging.md) - Using browser tools
- [VS Code Debugging](https://developer.adobe.com/express/add-ons/docs/guides/debug/vscode_debugging.md) - IDE-based debugging
- [Cross-origin Isolation](https://developer.adobe.com/express/add-ons/docs/guides/develop/cross-origin-isolation-handling.md) - Handling isolation issues

### Distribution
- [Review Process](https://developer.adobe.com/express/add-ons/docs/guides/distribute/review_process.md) - Understanding approval requirements
- [Private Links](https://developer.adobe.com/express/add-ons/docs/guides/distribute/private_link.md) - Creating private distributions
- [Public Listings](https://developer.adobe.com/express/add-ons/docs/guides/distribute/public_listing.md) - Publishing to the marketplace

Each of these learning paths provides a comprehensive roadmap through the Adobe Express Add-ons documentation, helping you build expertise in specific aspects of add-on development. For the most current information, always refer to the [official documentation](https://developer.adobe.com/express/add-ons/docs/guides/).
