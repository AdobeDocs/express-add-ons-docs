---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - First Add-on
  - Development
  - Build
  - Test
title: Building Your First Add-on
description: Follow a step-by-step guide to build, test, and run your first complete Adobe Express add-on.
contributors:
  - https://github.com/hollyschinsky
---

# Building Your First Add-on

**Estimated time: 2 hours**

Now that you understand the basics and have experimented in the Playground, it's time to build a complete add-on that you can run in Adobe Express. In this step, we'll create a simple but functional add-on that allows users to add custom motivational quotes to their documents.

## Project Overview: Motivational Quotes Add-on

Our add-on will:
1. Display a collection of motivational quotes
2. Allow users to select a quote
3. Add the selected quote to their document with styling options
4. Let users add their own custom quotes

## Setting Up the Project

First, let's create a new add-on project:

1. Open a terminal/command prompt
2. Run:
   ```
   npx @adobe/create-ccweb-add-on motivational-quotes
   ```
3. When prompted, select the following options:
   - Add-on type: Panel
   - UI Framework: HTML (for simplicity)
   - Include TypeScript: No (for beginners, JavaScript is simpler)
   - Include addon-helpers: Yes

4. Once the project is created, navigate to the project directory:
   ```
   cd motivational-quotes
   ```

5. Install dependencies:
   ```
   npm install
   ```

## Understanding the Project Structure

Take a moment to explore the project files:

- `manifest.json`: Configuration for your add-on
- `index.html`: Main UI entry point
- `src/`: Contains your JavaScript code
- `src/index.js`: Main JavaScript file
- `node_modules/`: Dependencies (created by npm install)

## Step 1: Building the UI

Let's start by creating the user interface in `index.html`:

1. Open `index.html` in your text editor
2. Replace the existing content with:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Motivational Quotes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Motivational Quotes</h1>
    
    <div class="quotes-container">
      <h2>Select a Quote:</h2>
      <div id="quotes-list">
        <!-- Quotes will be added here dynamically -->
      </div>
    </div>
    
    <div class="custom-quote">
      <h2>Add Your Own Quote:</h2>
      <textarea id="custom-quote-text" placeholder="Type your quote here..."></textarea>
      <input type="text" id="custom-quote-author" placeholder="Author (optional)">
      <button id="add-custom-quote">Add to Document</button>
    </div>
  </div>
  
  <script type="module" src="./src/index.js"></script>
</body>
</html>
```

3. Create a new file called `styles.css` in the project root with the following content:

```css
body {
  font-family: 'Adobe Clean', sans-serif;
  margin: 0;
  padding: 16px;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 100%;
}

h1 {
  color: #1473E6;
  font-size: 18px;
  margin-bottom: 16px;
}

h2 {
  font-size: 14px;
  margin-bottom: 8px;
}

.quotes-container {
  margin-bottom: 20px;
}

.quote-item {
  background-color: white;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quote-item:hover {
  background-color: #f0f0f0;
}

.quote-text {
  font-style: italic;
  margin-bottom: 4px;
}

.quote-author {
  font-size: 12px;
  text-align: right;
  color: #666;
}

.custom-quote {
  background-color: white;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 16px;
}

textarea, input {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 80px;
  resize: vertical;
}

button {
  background-color: #1473E6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0d66d0;
}
```

## Step 2: Implementing the JavaScript

Now, let's implement the functionality in `src/index.js`:

1. Open `src/index.js` in your text editor
2. Replace the existing content with:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  console.log("Add-on SDK is ready");
  initializeAddon();
});

// Sample quotes data
const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

function initializeAddon() {
  // Populate quotes list
  const quotesListElement = document.getElementById("quotes-list");
  
  quotes.forEach((quote, index) => {
    const quoteElement = document.createElement("div");
    quoteElement.className = "quote-item";
    quoteElement.innerHTML = `
      <div class="quote-text">"${quote.text}"</div>
      <div class="quote-author">— ${quote.author}</div>
    `;
    
    // Add click handler to add this quote to the document
    quoteElement.addEventListener("click", () => {
      addQuoteToDocument(quote.text, quote.author);
    });
    
    quotesListElement.appendChild(quoteElement);
  });
  
  // Add custom quote button handler
  document.getElementById("add-custom-quote").addEventListener("click", () => {
    const quoteText = document.getElementById("custom-quote-text").value.trim();
    const quoteAuthor = document.getElementById("custom-quote-author").value.trim();
    
    if (quoteText) {
      addQuoteToDocument(quoteText, quoteAuthor);
      
      // Clear the input fields
      document.getElementById("custom-quote-text").value = "";
      document.getElementById("custom-quote-author").value = "";
    }
  });
}

async function addQuoteToDocument(text, author) {
  try {
    // Format the quote
    let formattedQuote = `"${text}"`;
    if (author) {
      formattedQuote += `\n— ${author}`;
    }
    
    // Add the text to the document
    await addOnUISdk.app.document.addText(formattedQuote, {
      position: { x: 100, y: 100 },
      width: 400
    });
    
    console.log("Quote added successfully");
  } catch (error) {
    console.error("Error adding quote to document:", error);
  }
}
```

## Step 3: Updating the Manifest

Let's ensure our manifest is properly configured:

1. Open `manifest.json` in your text editor
2. Make sure it has the necessary permissions by updating the `permissions` section:

```json
"permissions": {
  "sandbox": [
    "allow-popups-to-escape-sandbox",
    "allow-popups",
    "allow-same-origin",
    "allow-scripts"
  ]
}
```

## Step 4: Running Your Add-on

Now it's time to test your add-on:

1. Start the development server:
   ```
   npm run start
   ```

2. The command will display instructions for loading your add-on in Adobe Express

3. Follow those instructions:
   - Open Adobe Express in your browser
   - Create a new project or open an existing one
   - Open the add-ons panel
   - Click on "Develop" at the bottom
   - Choose "Load local add-on"
   - Enter the URL provided by the development server (usually something like `https://localhost:8081`)

4. Your add-on should now appear in the add-ons panel

5. Test it by:
   - Clicking on one of the pre-defined quotes to add it to the document
   - Creating a custom quote and adding it to the document

## Step 5: Debugging and Refining

If you encounter any issues:

1. Check the browser console for error messages
2. Verify that your file paths are correct
3. Make sure the Add-on SDK is properly imported
4. Check that your event listeners are correctly attached to elements

## Enhancing Your Add-on (Optional)

Once your basic add-on is working, try these enhancements:

1. Add styling options (font, color, size) for the quotes
2. Implement a feature to save custom quotes for future use
3. Add categories of quotes that users can filter through
4. Implement drag-and-drop functionality to position quotes

## Next Steps After Completion

Congratulations! You've built your first Adobe Express add-on. Here's what you can do next:

1. Explore the [Get Started Sample](/samples.md#get-started) for more ideas
2. Study the [Quickstart Guide](../../getting_started/quickstart.md) for additional concepts
3. Move on to the Intermediate Learning Path to expand your skills
4. Share your add-on with colleagues or friends for feedback

## Additional Resources

- [Quickstart Guide](../../getting_started/quickstart.md)
- [Get Started Sample](/samples.md#get-started)

## Knowledge Check

Before finishing this path, make sure you can answer these questions:

1. What are the key files in an Adobe Express add-on project?
2. How do you import and initialize the Add-on SDK?
3. How do you add text content to an Adobe Express document?
4. How do you test your add-on in Adobe Express?

## What You've Learned

By completing this beginner path, you've learned:

- What Adobe Express add-ons are and how they work
- How to set up your development environment
- How to experiment with the Code Playground
- How to create, build, and test a complete add-on
- Basic techniques for manipulating document content
- How to create a simple user interface for your add-on

## Next Path

Ready to expand your skills? Continue to the Intermediate Path to learn more advanced techniques:

[Proceed to Intermediate Path: Building Functional Add-ons →](../learning-paths.md#intermediate-path-building-functional-add-ons-8-hours)

[← Back to Step 3: Using the Playground to Experiment](beginner-step3.md) 