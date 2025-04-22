# Working with Express Add-ons

There are some important considerations to keep in mind when building Express Add-ons. We recommend you read through this entire guide before you start building your add-on.

## Add-on Architecture

- **Dual-Environment Structure**: Express Add-ons operate in two distinct environments - [the UI iframe (where your interface runs)](../../references/addonsdk/index.md) and the [Document Sandbox (where document manipulation code runs)](../../references/document-sandbox/).
- **Cross-Environment Communication**: The only way to communicate between these environments is via the [Communication API](../../references/document-sandbox/communication/) using `exposeApi()` and `apiProxy()` methods.
- **Always Use Async/Await for Communication**: All cross-environment function calls are wrapped in Promises and must be handled asynchronously.
- **Limited Web APIs in Document Sandbox**: Many browser/web APIs are not available in the Document Sandbox environment (ie: `code.js`). You'll need to proxy them from the iframe when needed. See the [Web API Reference](../../references/document-sandbox/web/index.md) for a list of the APIs that are currently available.
- **Document Sandbox Entry Point**: You must define a separate entry point in your `manifest.json` for Document Sandbox code: `"documentSandbox": "code.js"`. This is configured in the CLI template options when you opt to use the Document Sandbox, but if you're not using the CLI, or updating an existing add-on to use it, you'll need to add it manually. 

<InlineAlert slots="text" variant="tip"/>

It's recommended to use the CLI to create add-ons based on the [templates](../../guides/getting_started/dev_tooling.md#templates) with the technical stack you require to help ensure your project is properly configured for the best developer experience.

## State and Performance

- **Client Storage for Persistence**: Use [`clientStorage`](../develop/how_to/local_data_management.md) for data that needs to persist between sessions, as regular variables will be reset when an add-on is closed.
- **Memory and Resource Management**: Your add-on must not consume excessive system resources which may affect the performance of Adobe Express or the user's system.
- **Batch Document Operations**: Group related document manipulations to minimize redraws and optimize performance.
- **Cache Frequently Accessed Data**: Reduce computation overhead by caching data that's referenced multiple times.
- **Minimize DOM Manipulation**: In the iframe environment, focus on efficient DOM operations as these are among the slowest JavaScript operations.

## User Experience and Compatibility

- **Spectrum Design System**: Use the [Adobe Spectrum Design System](https://spectrum.adobe.com/) to ensure your add-on integrates seamlessly with the Adobe Express interface. Specifically, the [Adobe Spectrum Web Components](https://spectrum.adobe.com/components/) library provides numerous lightweight and responsive components out of the box to help you build out your add-on UI quickly and efficiently. Check out our [Spectrum Workshop Tutorial](../tutorials/spectrum-workshop/index.md) for help getting started.
- **Responsive to Theme Changes**: Your add-on should adapt to light or dark mode changes in Adobe Express.
- **Cross-Browser and System Compatibility**: Add-ons must work across all supported browsers and operating systems, including lower-powered devices like Chromebooks.
- **Loading States**: Display appropriate loading indicators for operations that take time, especially when using external services or AI-based features.
- **Error Handling**: Include robust error handling for both network requests and document operations, with clear user feedback when things go wrong.

## Security and Networking

- **CORS Handling**: Your [add-on runs in a unique subdomain](../develop/context.md), which must be considered when making cross-origin requests.
- **Network Efficiency**: Make network calls efficiently and securely, avoiding excessive requests.
- **Sandboxed Environment**: Add-ons run in a sandboxed iframe with limited permissions; additional permissions must be explicitly requested in the manifest.

## Important Considerations

- **Iframe Sandbox Restrictions**: Add-ons can't use features like embedding objects, and have limited access to browser APIs like creating popups without [manifest permissions](../../references/addonsdk/manifest.md#permissions).
- **Add-on Termination**: Handle potential add-on termination gracefully. 
- **Document State Changes**: Be prepared for the document state to change between operations, especially in collaborative environments. For example, if you're listening for changes to the document, you'll need to re-register your listener when the document state changes.

By following these guidelines, you'll create Express Add-ons that are reliable, performant, and provide a seamless experience that feels like a natural extension of Adobe Express.
