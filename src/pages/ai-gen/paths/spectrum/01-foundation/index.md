# Module 1: Foundation of Spectrum Design System

## Overview
This module introduces you to Adobe's Spectrum Design System and its various implementations. You'll learn about the different options available for building Express add-ons and understand when to use each approach.

## Learning Objectives
- Understand the different Spectrum implementations available
- Learn when to use each implementation
- Set up your development environment
- Configure your project with the necessary dependencies

## Time Estimate
4-6 hours

## Prerequisites
- Basic understanding of web development
- Node.js installed (version 14 or higher)
- npm or yarn package manager
- Adobe Creative Cloud account with access to Express

## Content Structure

### 1. Understanding Spectrum Design System

#### What is Spectrum?
Spectrum is Adobe's design system that provides a comprehensive set of guidelines, components, and tools for creating consistent user experiences across Adobe applications. For Express add-ons, Spectrum ensures your UI feels native and integrated with the Express interface.

#### Available Implementations

1. **Spectrum Web Components (SWC)**
   - Framework-agnostic implementation
   - Built on web standards
   - Lightweight and performant
   - Best for vanilla JavaScript add-ons
   - Provides Express theme out of the box

2. **swc-react**
   - React-specific wrapper for SWC
   - Provides React component patterns
   - Maintains React's component lifecycle
   - Best for React-based add-ons
   - Shares same underlying components as SWC

3. **Spectrum CSS**
   - Raw CSS implementation
   - For custom implementations
   - Provides fine-grained control
   - Useful for unique UI patterns
   - Requires more manual implementation

### 2. Project Setup

#### Creating a New Express Add-on
```bash
# Create a new add-on project
npx @adobe/create-ccweb-add-on my-spectrum-addon

# Navigate to project directory
cd my-spectrum-addon

# Clear npx cache if needed
npx clear-npx-cache
```

#### Installing Dependencies
```bash
# Core dependencies for SWC
npm install @spectrum-web-components/theme@0.39.4
npm install @spectrum-web-components/styles

# For React-based add-ons
npm install @adobe/spectrum-web-components-react@0.39.4
```

#### Webpack Configuration
```javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.js",
    devtool: "source-map",
    experiments: {
        topLevelAwait: true,
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        module: true,
        filename: "index.js",
    },
    externalsType: "module",
    externalsPresets: { web: true },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: "module",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/*.json", to: "[name][ext]" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"],
    },
};
```

### 3. Version Management

#### Why Version Management is Important
Spectrum components are tightly coupled, and mismatched versions can lead to:
- Styling inconsistencies
- Component behavior issues
- Runtime errors
- Performance problems

#### Best Practices
1. Keep all Spectrum packages on the same version
2. Use package-lock.json or yarn.lock
3. Document version requirements
4. Test with different version combinations

#### Version Configuration
```json
{
    "dependencies": {
        "@spectrum-web-components/theme": "0.39.4",
        "@spectrum-web-components/button": "0.39.4",
        "@adobe/spectrum-web-components-react": "0.39.4"
    },
    "resolutions": {
        "@spectrum-web-components/theme": "0.39.4",
        "@spectrum-web-components/button": "0.39.4",
        "@adobe/spectrum-web-components-react": "0.39.4"
    }
}
```

## Exercises

1. **Environment Setup**
   - Create a new Express add-on project
   - Configure webpack
   - Install dependencies
   - Verify installation

2. **Version Management**
   - Set up package.json with correct versions
   - Test with mismatched versions
   - Document version requirements

3. **Project Structure**
   - Create a basic project structure
   - Set up development tools
   - Configure build process

## Resources
- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/)
- [SWC React Documentation](https://opensource.adobe.com/spectrum-web-components/using-swc-react/)
- [Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/docs/)

## Next Module
[Module 2: Basic Implementation](./02-basic-implementation/README.md) 