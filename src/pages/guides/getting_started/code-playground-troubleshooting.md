---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Adobe Express Add-on Development
  - Code Playground
  - Troubleshooting
  - FAQs
  - Common Issues
  - Support
  - Help
title: Code Playground - Troubleshooting
description: Get help with common Code Playground issues and find answers to frequently asked questions.
contributors:
  - https://github.com/padmkris123
  - https://github.com/hollyschinsky
  - https://github.com/ErinFinnegan
  - https://github.com/undavide
  - https://github.com/nimithajalal
---

# Code Playground - Troubleshooting

Get help with common Code Playground issues and find answers to frequently asked questions.

## Frequently Asked Questions

### What is the Adobe Express Code Playground?

The Adobe Express Code Playground is a lightweight code editor designed for fast and effortless prototyping. It allows you to experiment with simple code snippets to build and refine add-ons, quickly turning ideas into functional features.

### Is it free to use?

Yes, the Code Playground is free to use. You can access all its features without any cost and start prototyping and creating add-ons right away.

### Do I need coding experience?

While some basic coding knowledge is helpful, Playground is designed to be beginner-friendly and accessible. Its intuitive interface and simple code snippets make it easier for both experienced developers and those newer to coding to create and test add-ons.

### How do I start creating add-ons?

Getting started is simple. Activate the playground, experiment with code snippets, and start building your add-ons. Use the real-time preview feature to see your changes instantly and iterate on your ideas with ease.

### Where can I go for help?

[Join our Discord](http://discord.gg/nc3QDyFeb4) to chat with the add-on developer community.

### I can't find my downloaded zip file. Where is it?

Check your browser's default download location, you can also review your browser's download settings to see where files are being saved. If you have blocked downloads in your browser, you may need to unblock the download.

## Common Issues

### Code Playground Not Opening

**Problem:** The Code Playground window doesn't open when you click the toggle.

**Solutions:**

1. Make sure Add-on Development mode is enabled in your Adobe Express settings.
2. Try refreshing the page and attempting again.
3. Check if you have a document open in Adobe Express.
4. Clear your browser cache and cookies.
5. Try using a different browser.

### Code Not Running

**Problem:** Your code doesn't execute when you click "Run Code".

**Solutions:**

1. Check for syntax errors in your code.
2. Ensure you're using the correct mode (Script vs Add-on) for your use case.
3. Verify that all required APIs are properly imported.
4. Check the browser console for error messages.
5. Sessions that are in the [Archived](./code-playground-workflow.md#session-limits-and-lifecycle) state cannot be run. You can download your code to continue working on it locally, or copy it to a new session.
6. Try running a simple test code first.

### Session Not Saving

**Problem:** Your work is not being saved between sessions.

**Solutions:**

1. **Check auto-save settings:** Code is not saved automatically. Please read the [Save Your Work](./code-playground-workflow.md#save-your-work) section for more details on how to save.
2. Make sure you're not in incognito/private browsing mode
3. Try saving manually using the keyboard shortcut (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>)
4. Clear browser cache and try again
5. Check if you have sufficient storage space—you might have reached the maximum number of sessions per user. Delete unused sessions to free up space.
6. Any changes to [Archived](./code-playground-workflow.md#session-limits-and-lifecycle) sessions are not saved.

### Performance Issues

**Problem:** The playground is running slowly or freezing.

**Solutions:**

1. Avoid heavy computations in the iframe context.
2. Use async/await properly for document operations.
3. Test with smaller documents first.
4. Break down large operations into smaller chunks.
5. Close other browser tabs to free up memory.

### API Errors

**Problem:** Getting errors when using Document APIs.

**Solutions:**

1. Check if you need to enable experimental APIs in the manifest.
2. Verify that you're using the correct API syntax.
3. Ensure you're in the right mode (Script vs Add-on).
4. Check the [API documentation](../../references/document-sandbox/document-apis/index.md) for correct usage.
5. Try using the API in a simpler context first.

### UI Not Displaying

**Problem:** Your add-on UI is not showing up in Add-on Mode.

**Solutions:**

1. Check that your HTML is properly structured.
2. Verify that your CSS is not hiding elements.
3. Ensure your JavaScript is running without errors.
4. Check the browser console for error messages.
5. Try a simple HTML structure first.

### Communication Issues

**Problem:** Communication between iframe and Document Sandbox is not working.

**Solutions:**

1. Verify that you're using the correct communication APIs.
2. Check that message types and payloads are properly structured.
3. Ensure both sides are listening for messages.
4. Test with simple messages first.
5. Check the [Communication API documentation](../../references/document-sandbox/communication/index.md)

## Browser Compatibility

### Supported Browsers

Code Playground works best with the latest versions of the following browsers:

- Chrome
- Firefox
- Safari
- Edge

### Browser-Specific Issues

**Chrome:**

- Make sure you have the latest version.
- Check if any extensions are interfering.
- Try disabling extensions temporarily.

**Firefox:**

- Ensure JavaScript is enabled.
- Try disabling enhanced tracking protection.

**Safari:**

- Make sure JavaScript is enabled.
- Check if content blockers are interfering.
- Try disabling private browsing mode.

**Edge:**

- Ensure you're using the Chromium-based version.
- Check if tracking prevention is affecting functionality.
- Try disabling extensions.

## Getting Additional Help

### Community Support

- **[Discord Community](http://discord.gg/nc3QDyFeb4)**: Chat with fellow developers and get real-time help.
- **GitHub Issues**: Report bugs and request features.
- **Documentation**: Check our comprehensive guides and API references.

### Documentation Resources

- **[API References](../../references/index.md)**: Complete reference for all available APIs.
- **[How-To Guides](../learn/how_to/index.md)**: Step-by-step tutorials for common tasks.
- **[Code Samples](../learn/samples.md)**: Example code to get you started.
- **[Local Development](../getting_started/local_development/index.md)**: Set up a full development environment.

### Reporting Issues

When reporting issues, please include:

1. **Browser and version**
2. **Operating system**
3. **Steps to reproduce the issue**
4. **Expected vs actual behavior**
5. **Console error messages (if any)**
6. **Screenshots or screen recordings (if helpful)**

## Best Practices for Avoiding Issues

### Code Organization

- Use clear, descriptive variable and function names.
- Comment your code for better maintainability.
- Break down complex functionality into smaller functions.
- Test your code incrementally.

### Error Handling

- Always include proper error handling in your code.
- Use try-catch blocks for async operations.
- Log errors to the console for debugging.
- Test edge cases and error conditions.

### Performance

- Avoid heavy computations in the iframe context.
- Use async/await properly for document operations.
- Test with different document sizes and complexity.
- Monitor memory usage and performance.

### Testing

- Test your add-on with various document types.
- Try different screen sizes and resolutions.
- Test with different user permissions.
- Validate your code before sharing.

## Next Steps

- **[Script Mode Guide](./code-playground-script-mode.md)**: Learn how to use Script Mode effectively.
- **[Add-on Mode Guide](./code-playground-addon-mode.md)**: Build complete add-ons with UI.
- **[Workflow & Productivity](./code-playground-workflow.md)**: Master keyboard shortcuts and session management.
- **[Local Development](../getting_started/local_development/index.md)**: Set up a full development environment.
