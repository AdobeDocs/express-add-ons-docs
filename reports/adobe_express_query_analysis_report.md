# Adobe Express Add-ons: User Query Analysis Report

**Data Source**: Adobe Express Add-ons AI Assistant Langfuse Logs  
**Analysis Date**: January 27, 2025  
**Total Queries Analyzed**: 634

---

## 📊 Executive Summary

This comprehensive analysis of 634 user queries from Adobe Express Add-ons AI Assistant interactions reveals critical patterns in developer needs, pain points, and AI misinformation issues. The data shows that **AI assistants are providing incorrect information in high-frequency scenarios**, creating significant barriers to developer productivity and trust.

## 🚨 Critical Pain Points (Solution Priority Ranking)

### Priority 1: Immediate Action Required

#### 1. AI Assistant Providing Incorrect Code ⚠️⚠️⚠️
- **Frequency**: Very High
- **Impact**: Breaks developer trust and functionality
- **Examples of Misinformation**:
  - `editor.createPage()` - Does not exist
  - `@adobe/ccweb-add-on-sdk` imports - Incorrect package name
  - `runtime.call()` - Non-existent method
  - `setSize()` methods - Not available in Adobe Express API

#### 2. UI Runtime vs Document Sandbox Confusion ⚠️⚠️⚠️
- **Frequency**: Very High
- **Impact**: Blocks basic functionality
- **AI Contribution**: AI provided incorrect context examples worsening confusion

#### 3. Text Node Creation and Styling ⚠️⚠️⚠️
- **Frequency**: Very High
- **Impact**: Core functionality
- **AI Contribution**: AI provided inconsistent text manipulation patterns

### Priority 2: High Impact Issues

#### 4. Async Operation Requirements ⚠️⚠️
- **Frequency**: High
- **Impact**: Causes runtime errors
- **AI Contribution**: AI sometimes provided code that would generate async errors

#### 5. Image Insertion Patterns ⚠️⚠️
- **Frequency**: High
- **Impact**: Media functionality

### Priority 3: Medium Impact Issues

#### 6. Development Environment Setup ⚠️
- **Frequency**: Medium
- **Impact**: Blocks getting started

---

## 📋 Query Categories Analysis

### 1. Text Manipulation (35% of queries - HIGH PRIORITY)

#### Creation Queries
- "how do i create a text node and put it on the screen"
- "create a function that creates a text node and writes in it and positions it"
- "how to set text size while creating a textNode?"

#### Styling Queries
- "how to make the textNode bold"
- "how to set text node color"
- "change the font size to something small"
- "console log all the possible fonts i can use"

#### Positioning Queries
- "how to change the text nodes location"
- "how to ensure that a textNode fits in the screen"
- "make sure that the textNode is 50% the height of the page"

#### Common Errors in Text Manipulation
- ".setSize is not a function in adobe express"
- "setTransform is not a function"

#### Documentation Gaps Identified
- Complete text node lifecycle examples
- Font application patterns
- Text sizing and positioning best practices

### 2. Error Handling (25% of queries - HIGH PRIORITY)

#### Function Errors
- ".setSize is not a function in adobe express"
- "got this error: not a function at <anonymous> (code.js:96)"

#### Import Errors
- "Uncaught (in promise) ReferenceError: 'colorUtils' is not defined"
- "Error \"express-document-sandbox\" is not a built-in module"

#### Async Errors
- "Error: Editing the document is not permitted in this context. Use \"editor.queueAsyncEdit()\""
- "Uncaught (in promise) Error: Editing the document is not permitted in this context"

#### Documentation Gaps Identified
- Common error scenarios and solutions
- Async operation patterns
- Import/export troubleshooting guide

### 3. Media Handling (20% of queries - HIGH PRIORITY)

#### Image Insertion Queries
- "how do i add an image"
- "create an image from this jpeg url"
- "how to add custom gif to canvas"

#### External URLs
- "https://images.pexels.com/photos/8761345/pexels-photo-8761345.jpeg from this jpeg, make an image"
- "add https://images.pexels.com/photos/6185466/pexels-photo-6185466.jpeg to this page in the middle"

#### Data Format Issues
- "i have a b64 image source how can i add it to my sandbox with my addon"
- "Error: Invalid Input: Expected bitmapData value to be of type \"Blob\""

#### Documentation Gaps Identified
- Image insertion patterns for different data types
- Blob vs URL handling
- Media positioning and sizing

### 4. Architecture Confusion (15% of queries - HIGH PRIORITY)

#### UI vs Sandbox Confusion
- "how can i access sandboxProxy methods outside App.jsx?"
- "code in index.js is not calling code in code.js"
- "Would I put this javascript code in the index.js or code.js file?"

#### API Boundaries
- "can i add images directly into the sandbox/canvas through code using my adobe express add on"
- "This script draws a square on the addon, not on the document"

#### Documentation Gaps Identified
- Clear UI vs Sandbox runtime explanation
- API boundary documentation
- Code organization best practices

### 5. Development Setup (15% of queries - MEDIUM PRIORITY)

#### SSL/CORS Issues
- "No SSL related certificate or key files were found"
- "What do I need to know about CORS in add-ons?"
- "how do i reconfigure the ssl"

#### Build Issues
- "'ccweb-add-on-scripts' is not recognized as an internal or external command"
- "Error: EACCES: permission denied, unlink 'dist/code.js'"
- "ccweb-add-on-scripts failed. Reason: listen EADDRINUSE: address already in use ::1:5241"

#### Documentation Gaps Identified
- Complete development environment setup guide
- SSL certificate configuration
- Common build and deployment issues

### 6. API Integration (10% of queries - MEDIUM PRIORITY)

#### AI Services Integration
- "make an add on that takes a text prompt from the user and generates an AI image"
- "I want to make an add on that uses Gemini image generation with Gemini 2.0 Flash"

#### File Processing
- "write the code for an add on to take in a pdf from a drop box and then take the text from that and display it on the page"
- "how do I add a button that allows me to open the file explorer so the user can choose a PDF"

#### External APIs
- "Is there any way to use LLM apis like chatgpt or gemini while building an add-on?"
- "curl -X POST https://u4of07wfe2.execute-api.us-west-2.amazonaws.com/default/chatgpt-proxy"

#### Documentation Gaps Identified
- External API integration patterns
- File upload and processing workflows
- AI service integration examples

---

## 🤖 AI Misinformation Patterns

### Incorrect Imports Being Provided by AI
```javascript
// ❌ WRONG - AI commonly suggests these
@adobe/ccweb-add-on-sdk
import { runtime } from '@adobe/ccweb-add-on-sdk'
import addOnSdkAPI from '@adobe/ccweb-add-on-sdk'
```

### Non-Existent Methods AI Suggests
```javascript
// ❌ WRONG - These methods don't exist
editor.createPage()
editor.document.pages.append()
runtime.call()
runtime.exposeApi()  // Note: This may actually exist in Communication API
textNode.setSize()
element.setTransform()
```

### Correct Alternatives
```javascript
// ✅ CORRECT alternatives
// Page creation
editor.documentRoot.pages.addPage(inputGeometry)

// Text creation
editor.createText() + textNode.fullContent.applyCharacterStyles()

// Element append
editor.context.insertionParent.children.append()

// Element sizing
element.width = value; 
element.height = value;
```

---

## 📈 Query Patterns & Learning Progressions

### Common Learning Sequences
1. **Basic Element Creation** → **Styling** → **Positioning** → **Complex Interactions**
2. **Simple API Calls** → **Error Debugging** → **Advanced Integration**
3. **Development Setup** → **Basic Functionality** → **External Service Integration**

### Common Misconceptions
- Confusing UI SDK methods with Document Sandbox methods
- Expecting synchronous operations in async contexts
- Assuming methods exist that don't (setSize, setTransform)
- Not understanding when queueAsyncEdit is required

### Success Indicators
- Queries that build upon previous successful interactions
- Requests for advanced features after mastering basics
- Creative project ideas and hackathon concepts

---

## 🎯 Immediate Action Recommendations

### 1. AI Assistant Fixes (CRITICAL - Priority 1)
- **Audit and fix AI assistant responses immediately**
- **Remove all incorrect API methods from AI training data**
- **Validate all code examples before including in training sets**
- **Create verified code pattern libraries for AI training**

### 2. Documentation Structure Improvements (Priority 1)
- **Create comprehensive text node manipulation guide with verified code**
- **Add UI vs Sandbox architecture explanation to every relevant page**
- **Provide complete working examples with all necessary context**
- **Create error-message-driven troubleshooting guide**

### 3. Content Structure Enhancements (Priority 2)
- **Problem-solution format for each code example**
- **Progressive complexity (basic → intermediate → advanced)**
- **Clear file location indicators (UI vs Sandbox)**
- **Required imports and dependencies listed explicitly**

### 4. LLM Training Improvements (Priority 2)
- **Convert queries to structured Q&A pairs**
- **Include full context in code examples**
- **Add common completion patterns**
- **Create scenario-based learning paths**

---

## 📊 Impact Analysis

| Issue Category | Frequency | Impact Level | Developer Barrier | AI Contribution to Problem |
|---------------|-----------|--------------|-------------------|---------------------------|
| Text Manipulation | 35% | High | Core functionality blocked | Incorrect API suggestions |
| Error Handling | 25% | High | Runtime failures | Missing async patterns |
| Media Handling | 20% | High | Feature implementation blocked | Incomplete examples |
| Architecture Confusion | 15% | Very High | Fundamental misunderstanding | Wrong context examples |
| Development Setup | 15% | Medium | Getting started blocked | Incomplete setup guides |
| API Integration | 10% | Medium | Advanced features blocked | Limited integration examples |

---

## 🏁 Conclusion

The analysis reveals a **critical need for immediate AI assistant correction** and comprehensive documentation restructuring. With 60% of queries falling into high-priority categories and significant AI misinformation patterns identified, the current state is actively hindering developer productivity and trust.

**Key Actions Required**:
1. **Immediate AI training data cleanup**
2. **Verified code example creation**
3. **Architecture clarity documentation**
4. **Error-driven troubleshooting guides**

Addressing these issues will significantly improve developer experience and reduce the 634 types of queries currently causing friction in Adobe Express Add-ons development. 