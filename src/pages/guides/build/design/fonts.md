---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Fonts
  - Typography
  - Adobe Fonts
  - Google Fonts
  - Custom Fonts
  - Font Loading
  - CSS Fonts
  - Document API
  - UI Runtime
  - Document Sandbox
title: Using Fonts in Adobe Express Add-ons
description: Complete guide to working with fonts in Adobe Express add-ons, including Adobe Fonts integration, custom font loading, Document API typography, and troubleshooting font issues.
contributors:
  - https://github.com/hollyschinsky
---

# Using Fonts in Adobe Express Add-ons

Master font integration and typography management across both UI Runtime and Document Sandbox environments in Adobe Express add-ons.

## Overview

Adobe Express add-ons support multiple approaches to font integration, from built-in Adobe Fonts to custom font loading. This guide covers font usage in both environments:

- **UI Runtime**: Font styling for your add-on's user interface (`src/index.js`, `ui/` folder)
- **Document Sandbox**: Programmatic text creation with fonts in documents (`src/code.js`, sandbox environment)

## Frequently Asked Questions

**Q:** What font options are available in Adobe Express add-ons?

**A:** You have several options:
1. **Adobe Fonts**: Pre-injected fonts available automatically
2. **Google Fonts**: Load via URL imports
3. **Custom Fonts**: Load your own font files
4. **Document API Fonts**: Use fonts programmatically in document creation

**Q:** What's the difference between UI fonts and Document API fonts?

**A:** UI fonts style your add-on interface, while Document API fonts are used to create text elements within Adobe Express documents. They require different implementation approaches.

## UI Runtime Font Integration

### Adobe Fonts (Pre-injected)

**Q:** How do I use Adobe's built-in fonts in my add-on UI?

**A:** Adobe Express automatically injects these fonts for immediate use:

```css
/* UI Runtime Context - src/index.html or src/index.css */
/* Available Adobe Clean font variations */
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/c0160f/00000000000000007735dac8/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3') format('woff2'), url('https://use.typekit.net/af/c0160f/00000000000000007735dac8/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3') format('woff'), url('https://use.typekit.net/af/c0160f/00000000000000007735dac8/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3') format('opentype')",
    weight: "400",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/95bf80/00000000000000007735dacd/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=i4&v=3') format('woff2'), url('https://use.typekit.net/af/95bf80/00000000000000007735dacd/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=i4&v=3') format('woff'), url('https://use.typekit.net/af/95bf80/00000000000000007735dacd/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=i4&v=3') format('opentype')",
    weight: "400",
    style: "italic",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/5c07ba/00000000000000007735dad8/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3') format('woff2'), url('https://use.typekit.net/af/5c07ba/00000000000000007735dad8/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3') format('woff'), url('https://use.typekit.net/af/5c07ba/00000000000000007735dad8/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3') format('opentype')",
    weight: "700",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/2dda0a/00000000000000007735dad4/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n8&v=3') format('woff2'), url('https://use.typekit.net/af/2dda0a/00000000000000007735dad4/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n8&v=3') format('woff'), url('https://use.typekit.net/af/2dda0a/00000000000000007735dad4/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n8&v=3') format('opentype')",
    weight: "800",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/bc79c1/00000000000000007735dad9/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3') format('woff2'), url('https://use.typekit.net/af/bc79c1/00000000000000007735dad9/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3') format('woff'), url('https://use.typekit.net/af/bc79c1/00000000000000007735dad9/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3') format('opentype')",
    weight: "900",
    style: "normal",
    display: "auto"
}
```

**Q:** How do I apply Adobe Clean font in my add-on UI?

**A:** Simply reference the font family in your CSS:

```css
/* UI Runtime Context - src/index.html <style> block */
.my-heading {
    font-family: "adobe-clean", sans-serif;
    font-weight: 700; /* Bold */
    font-size: 24px;
}

.my-text {
    font-family: "adobe-clean", sans-serif;
    font-weight: 400; /* Normal */
    font-style: italic;
}
```

<InlineAlert slots="text" variant="info"/>

In the near future, all of the Adobe Express fonts will be injected for use, however, at the moment these specific fonts are being injected for you to access in your add-on without having to bundle them.

### Custom Font Loading from URLs

**Q:** How do I load custom fonts like Google Fonts in my add-on?

**A:** You can import external fonts using several methods:

#### Method 1: CSS @import

```html
<!-- UI Runtime Context - src/index.html -->
<head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
    
    .custom-text {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
    }
    
    .custom-heading {
      font-family: "Poppins", sans-serif;
      font-weight: 700;
    }
  </style>
</head>
```

#### Method 2: HTML &lt;link&gt; tag

```html
<!-- UI Runtime Context - src/index.html -->
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
  <style>
    .decorative-text {
      font-family: 'Tangerine', serif;
      font-size: 48px;
    }
  </style>
</head>
```

#### Method 3: JavaScript Dynamic Loading

```js
// UI Runtime Context - src/index.js
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

class FontLoader {
  constructor() {
    this.loadedFonts = new Set();
  }
  
  async loadGoogleFont(fontFamily, weights = '400') {
    const fontKey = `${fontFamily}-${weights}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return; // Already loaded
    }
    
    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@${weights}&display=swap`;
      
      // Wait for font to load
      await new Promise((resolve, reject) => {
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
      
      this.loadedFonts.add(fontKey);
      console.log(`Font loaded: ${fontFamily}`);
      
    } catch (error) {
      console.error(`Failed to load font ${fontFamily}:`, error);
      throw error;
    }
  }
  
  async applyFontToElement(element, fontFamily) {
    try {
      await this.loadGoogleFont(fontFamily);
      element.style.fontFamily = `"${fontFamily}", sans-serif`;
    } catch (error) {
      // Fallback to system fonts
      element.style.fontFamily = 'sans-serif';
      console.warn(`Using fallback font due to error: ${error.message}`);
    }
  }
}

// Usage
addOnUISdk.ready.then(async () => {
  const fontLoader = new FontLoader();
  
  // Load fonts for UI elements
  await fontLoader.loadGoogleFont('Roboto', '300;400;700');
  await fontLoader.loadGoogleFont('Open Sans', '400;600');
  
  // Apply to specific elements
  const heading = document.querySelector('.main-heading');
  await fontLoader.applyFontToElement(heading, 'Roboto');
});
```

## Document Sandbox Font Integration

### Working with Fonts in Document API

**Q:** How do I use fonts when creating text elements in Adobe Express documents?

**A:** Use the Document API's font loading system with proper `editor.queueAsyncEdit`:

```js
// Document Sandbox Context - src/code.js
import { editor } from "https://express.adobe.com/static/add-on-sdk/sdk.js";

async function createStyledText() {
  try {
    // Load font asynchronously first
    const font = await fonts.fromPostscriptName("SourceSans3-Regular");
    
    // Use queueAsyncEdit for document modifications after async operations
    await editor.queueAsyncEdit(() => {
      const textNode = editor.createText();
      textNode.fullContent.text = "Hello, Adobe Express!";
      textNode.fullContent.characterStyleRanges = [{
        length: 21,
        font: font,
        fontSize: 24
      }];
      
      const insertionParent = editor.context.insertionParent;
      insertionParent.children.append(textNode);
    });
    
  } catch (error) {
    console.error('Failed to create styled text:', error);
  }
}

// Multiple font styles in one text element
async function createMultiStyleText() {
  try {
    const regularFont = await fonts.fromPostscriptName("SourceSans3-Regular");
    const boldFont = await fonts.fromPostscriptName("SourceSans3-Bold");
    
    await editor.queueAsyncEdit(() => {
      const textNode = editor.createText();
      textNode.fullContent.text = "Normal text and bold text";
      
      textNode.fullContent.characterStyleRanges = [
        {
          length: 11, // "Normal text"
          font: regularFont,
          fontSize: 16
        },
        {
          length: 4, // " and"
          font: regularFont,
          fontSize: 16
        },
        {
          length: 10, // " bold text"
          font: boldFont,
          fontSize: 16
        }
      ];
      
      const insertionParent = editor.context.insertionParent;
      insertionParent.children.append(textNode);
    });
    
  } catch (error) {
    console.error('Failed to create multi-style text:', error);
  }
}

// Font loading with error handling
async function loadFontSafely(postscriptName, fallbackName = "SourceSans3-Regular") {
  try {
    return await fonts.fromPostscriptName(postscriptName);
  } catch (error) {
    console.warn(`Font ${postscriptName} not available, using fallback: ${fallbackName}`);
    try {
      return await fonts.fromPostscriptName(fallbackName);
    } catch (fallbackError) {
      console.error('Even fallback font failed:', fallbackError);
      throw new Error(`No fonts available: ${postscriptName}, ${fallbackName}`);
    }
  }
}
```

### Available Document API Fonts

**Q:** What fonts are available in the Document API?

**A:** Common PostScript font names you can use:

```js
// Document Sandbox Context - Common font examples
const commonFonts = [
  "SourceSans3-Regular",
  "SourceSans3-Bold", 
  "SourceSans3-Italic",
  "SourceSans3-BoldItalic",
  "Helvetica",
  "Helvetica-Bold",
  "Times-Roman",
  "Times-Bold",
  "Courier",
  "Courier-Bold"
];

// Function to check font availability
async function testFontAvailability() {
  const availableFonts = [];
  
  for (const fontName of commonFonts) {
    try {
      await fonts.fromPostscriptName(fontName);
      availableFonts.push(fontName);
    } catch (error) {
      console.log(`Font not available: ${fontName}`);
    }
  }
  
  return availableFonts;
}
```

## Troubleshooting Font Issues

**Q:** What are common font loading problems and solutions?

**A:** Here are the most frequent issues and their fixes:

### Font Loading Failures

```js
// UI Runtime Context - Font loading with fallbacks
async function robustFontLoading() {
  const fontLoadPromises = [
    loadGoogleFont('Roboto'),
    loadGoogleFont('Open Sans'),
    loadGoogleFont('Montserrat')
  ];
  
  // Use Promise.allSettled to handle partial failures
  const results = await Promise.allSettled(fontLoadPromises);
  
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(`Font ${index} failed to load:`, result.reason);
    }
  });
  
  // Apply fallback strategy
  const fallbackStack = ['"Roboto"', '"Open Sans"', '"Helvetica"', 'sans-serif'];
  document.body.style.fontFamily = fallbackStack.join(', ');
}
```

### Document API Font Errors

```js
// Document Sandbox Context - Error handling for Document API fonts
async function safeDocumentText(text, preferredFont = "SourceSans3-Regular") {
  let font;
  
  try {
    // Try preferred font first
    font = await fonts.fromPostscriptName(preferredFont);
  } catch (error) {
    console.warn(`Preferred font ${preferredFont} not available`);
    
    // Try common fallbacks
    const fallbacks = ["Helvetica", "Times-Roman", "Courier"];
    
    for (const fallbackFont of fallbacks) {
      try {
        font = await fonts.fromPostscriptName(fallbackFont);
        break;
      } catch (fallbackError) {
        console.warn(`Fallback font ${fallbackFont} also failed`);
      }
    }
  }
  
  if (!font) {
    throw new Error('No fonts available for text creation');
  }
  
  await editor.queueAsyncEdit(() => {
    const textNode = editor.createText();
    textNode.fullContent.text = text;
    textNode.fullContent.characterStyleRanges = [{
      length: text.length,
      font: font
    }];
    
    const insertionParent = editor.context.insertionParent;
    insertionParent.children.append(textNode);
  });
}
```

### Common Font Issues FAQ

**Q:** Why aren't my Google Fonts loading?

**A:** Check these common causes:
1. **Network connectivity**: Ensure internet access
2. **Font name typos**: Verify exact Google Fonts family names
3. **CORS issues**: Some CDNs may block cross-origin requests
4. **Loading timing**: Load fonts before applying them to elements

**Q:** Why do my Document API fonts fail?

**A:** Document API font issues often involve:
1. **Incorrect PostScript names**: Use exact font names
2. **Missing queueAsyncEdit**: Always wrap font operations in `queueAsyncEdit`
3. **Font availability**: Not all system fonts are available in the sandbox
4. **Async timing**: Ensure fonts load before creating text elements

## Related Resources

For more font and typography topics, see:
- [Typography in Spectrum Web Components](../../tutorials/spectrum-workshop/part1.md)
- [Document API Text Creation](../../learn/platform_concepts/document-api.md)
- [Performance Optimization for Fonts](../../learn/test-fix/performance.md)

<InlineAlert slots="text" variant="success"/>

Remember to always provide fallback fonts and handle loading errors gracefully to ensure your add-on works reliably across different environments and network conditions.
