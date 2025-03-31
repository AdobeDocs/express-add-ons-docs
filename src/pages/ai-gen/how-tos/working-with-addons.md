# Working with Express Add-ons

In order to ensure predictable and performant Express Add-ons, here's a list of things to keep in mind as you're building them:

## Add-on Architecture

- **Dual-Environment Structure**: Express Add-ons operate in two distinct environments - the UI iframe (where your interface runs) and the Document Sandbox (where document manipulation code runs).
- **Cross-Environment Communication**: The only way to communicate between these environments is via the Communication API using `exposeApi()` and `apiProxy()` methods.
- **Always Use Async/Await for Communication**: All cross-environment function calls are wrapped in Promises and must be handled asynchronously, even if the underlying function is synchronous.
- **Limited Web APIs in Document Sandbox**: Most browser APIs are not available in the Document Sandbox environment; you'll need to proxy these from the iframe when needed.
- **Document Sandbox Entry Point**: You must define a separate entry point in your manifest.json for Document Sandbox code: `"documentSandbox": "code.js"`.

## State and Performance

- **Client Storage for Persistence**: Use `clientStorage` for data that needs to persist between sessions, as regular variables will be reset when an add-on is closed.
- **Memory and Resource Management**: Your add-on must not consume excessive system resources which may affect the performance of Adobe Express or the user's system.
- **Batch Document Operations**: Group related document manipulations to minimize redraws and optimize performance.
- **Cache Frequently Accessed Data**: Reduce computation overhead by caching data that's referenced multiple times.
- **Minimize DOM Manipulation**: In the iframe environment, focus on efficient DOM operations as these are among the slowest JavaScript operations.

## User Experience and Compatibility

- **Spectrum Design System**: Use Adobe Spectrum components to ensure your add-on integrates seamlessly with the Adobe Express interface.
- **Responsive to Theme Changes**: Your add-on should adapt to light or dark mode changes in Adobe Express.
- **Cross-Browser and System Compatibility**: Add-ons must work across all supported browsers and operating systems, including lower-powered devices like Chromebooks.
- **Loading States**: Display appropriate loading indicators for operations that take time, especially when using external services or AI-based features.
- **Error Handling**: Include robust error handling for both network requests and document operations, with clear user feedback when things go wrong.

## Security and Networking

- **CORS Handling**: Your add-on runs on a unique subdomain, which must be considered when making cross-origin requests.
- **Network Efficiency**: Make network calls efficiently and securely, avoiding excessive requests.
- **Sandboxed Environment**: Add-ons run in a sandboxed iframe with limited permissions; additional permissions must be explicitly requested in the manifest.

## Important Considerations

- **Add-on Termination**: Your add-on code can be terminated at any time when a user navigates away from Express, closes the add-on panel, or when the system needs to free up resources.
- **Iframe Sandbox Restrictions**: Add-ons can't use features like embedding objects, and have limited access to browser APIs like creating popups without manifest permissions.
- **Document State Changes**: Be prepared for the document state to change between operations, especially in collaborative environments.

By following these guidelines, you'll create Express Add-ons that are reliable, performant, and provide a seamless experience that feels like a natural extension of Adobe Express.
