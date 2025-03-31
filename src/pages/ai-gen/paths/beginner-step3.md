---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Code Playground
  - Prototyping
  - Experimentation
  - Rapid Development
title: Using the Playground to Experiment
description: Learn how to use the Adobe Express add-on code playground for rapid prototyping and experimentation.
contributors:
  - https://github.com/hollyschinsky
---

# Using the Playground to Experiment

**Estimated time: 45 minutes**

The Code Playground is a powerful tool that allows you to experiment with Adobe Express add-on functionality without setting up a full project. It's perfect for quickly testing ideas, learning the SDK features, and prototyping before diving into full development.

## What is the Code Playground?

The Code Playground is an online development environment specifically designed for Adobe Express add-ons. It provides:

- A ready-to-use development environment in your browser
- Live preview of your add-on in Adobe Express
- Pre-configured SDK access
- Code examples you can modify and run instantly

## Accessing the Code Playground

To access the Code Playground:

1. Go to [Adobe Express](https://new.express.adobe.com/)
2. Create a new document or open an existing one
3. Click on the "Add-ons" icon in the sidebar
4. Click on "Develop" at the bottom of the panel
5. Select "Code Playground" from the developer options

## Exploring the Playground Interface

The Playground interface consists of:

- **Code Editor**: Where you write your HTML, CSS, and JavaScript
- **Preview Panel**: Shows your add-on running in Adobe Express
- **Console**: Displays logs and errors for debugging
- **Examples Menu**: Pre-built examples to learn from

Take a few minutes to explore the interface and familiarize yourself with its layout.

## Starting with Basic Examples

The Playground includes several examples to help you get started:

1. From the Examples menu, select the "Hello World" example
2. Review the code and understand what it does
3. Click "Run" to see it in action
4. Try making small changes to the code (like changing text or colors) and run it again to see your changes

## Key Playground Experiments

Let's try a few experiments to learn core concepts:

### Experiment 1: Modifying the UI

1. Start with the "Hello World" example
2. Modify the HTML to add a new button element
3. Add CSS to style your button
4. Run the code to see your changes

### Experiment 2: Adding Interactivity

1. Add a click event listener to your button
2. When clicked, have it update text on the screen
3. Run the code to test the interaction

```javascript
document.getElementById('myButton').addEventListener('click', () => {
  document.getElementById('output').textContent = 'Button was clicked!';
});
```

### Experiment 3: Using the Add-on SDK

1. Start with the "Add Text" example
2. Review how it uses the Add-on SDK to interact with the document
3. Modify the code to change the text style or position
4. Run to see how your changes affect the document

## Building a Mini-Project

Now, let's create a simple color palette add-on:

1. Create a new playground project
2. Add HTML with 4 colored boxes
3. Add CSS to style the boxes
4. Add JavaScript that uses the SDK to apply the selected color to text in the document

```html
<div class="color-picker">
  <div class="color" style="background-color: #FF5733;"></div>
  <div class="color" style="background-color: #33FF57;"></div>
  <div class="color" style="background-color: #3357FF;"></div>
  <div class="color" style="background-color: #F3FF33;"></div>
</div>
<div id="message">Select a color above</div>
```

```javascript
document.querySelectorAll('.color').forEach(colorElement => {
  colorElement.addEventListener('click', async () => {
    const color = colorElement.style.backgroundColor;
    document.getElementById('message').textContent = `Selected: ${color}`;
    
    // Use SDK to apply color (if text is selected)
    try {
      const selection = await addOnUISdk.app.document.getSelection();
      if (selection.items.length > 0) {
        // Apply color to selected items
        // Note: This is simplified code that would need to be adjusted for the actual API
        await addOnUISdk.app.document.applyTextStyle({ color: color });
      }
    } catch (error) {
      console.error('Error applying color:', error);
    }
  });
});
```

## Best Practices for Using the Playground

- **Start small**: Begin with simple examples and gradually add complexity
- **Use console.log()**: Debug your code with console messages
- **Save your work**: The playground does not automatically save your code
- **Experiment freely**: The playground is a safe environment to try things out without breaking anything

## Limitations of the Playground

While powerful, the Playground has some limitations:

- Cannot use external npm packages
- Limited persistence of your code (make sure to save important code elsewhere)
- Not suitable for final production development
- Some advanced features may require a full development environment

## Additional Resources

For more information on using the Code Playground:

- [Code Playground Documentation](../../getting_started/code_playground.md)

## Knowledge Check

Before moving to the next step, make sure you can answer these questions:

1. How do you access the Code Playground in Adobe Express?
2. What are the main components of the Playground interface?
3. How do you run your code in the Playground?
4. How can you access the Add-on SDK in the Playground?

## Next Step

Now that you're comfortable experimenting in the Playground, you're ready to build your first complete add-on.

[Proceed to Step 4: Building Your First Add-on →](beginner-step4.md)

[← Back to Step 2: Setting Up Your Development Environment](beginner-step2.md) 