# Lesson 3: Advanced Spectrum Web Components - Tips & Troubleshooting

Master advanced techniques and solve common issues when developing add-on UIs with Spectrum Web Components.

## Overview

This lesson covers advanced topics for Spectrum Web Components development, including icons, styling, debugging, and comprehensive troubleshooting. Use this as your reference guide while developing Adobe Express add-ons.

## Prerequisites FAQ

**Q:** What should I complete before this lesson?

**A:** You should have completed:
- [Lesson 1: Basic JavaScript add-on with Spectrum Web Components](./part1.md)
- [Lesson 2: React-based add-on with swc-react components](./part2.md)

**Q:** What topics does this lesson cover?

**A:** This lesson covers:
- Advanced icon usage and customization
- Spectrum sizing and design tokens
- Typography and font management
- CSS styling with Spectrum variables
- Debugging techniques and tools
- Comprehensive troubleshooting solutions

## Step-by-Step Advanced Topics

### Step 1: Working with Icons

You can import and use an [icon from the Spectrum icon libraries](https://spectrum.adobe.com/page/icons/) provided in the [`icons-workflow`](https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/) and [`icons-ui`](https://opensource.adobe.com/spectrum-web-components/components/icons-ui/) libraries.

- [**icons-workflow**](https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/) - icons representing graphical metaphors such as a document, share symbol, trash can, etc.
- [**icons-ui**](https://opensource.adobe.com/spectrum-web-components/components/icons-ui/) - icons that are parts of a component definition like an X, magnifying glass or checkmark.

**Q:** How do I add icons to my add-on project?

**A:** Follow these steps:

1. **Install icon libraries** - Add them to your project dependencies:

```json
// UI Runtime Context - package.json dependencies section
"@spectrum-web-components/icons-ui": "0.39.4",
"@spectrum-web-components/icons-workflow": "0.39.4"
```

2. **Import specific icons** in your JavaScript file:

```js
// UI Runtime Context - src/index.js imports
import "@spectrum-web-components/icons-workflow/icons/sp-icon-play-circle.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-arrow75.js";
```

3. **Use icons in your HTML**:

```html
<!-- UI Runtime Context - src/index.html -->
<sp-icon-play-circle size="s"></sp-icon-play-circle>
<sp-icon-arrow75 size="m"></sp-icon-arrow75>
```

**Q:** What's the difference between workflow and UI icons?

**A:** 
- **icons-workflow**: Metaphorical icons (documents, share, trash can, etc.)
- **icons-ui**: Component-specific icons (X, magnifying glass, checkmark, etc.)

**NOTE:** Icons adhere to the [Spectrum Design t-shirt sizing](https://spectrum.adobe.com/page/design-tokens/#Size-tokens), with a default of `size="m"` (for medium).

#### Alternative Icon Methods

**Q:** Can I use custom images as icons?

**A:** Yes! You can use the [`sp-icon` package](https://opensource.adobe.com/spectrum-web-components/components/icon/) with custom images:

**Option 1: Image file reference**
```html
<!-- UI Runtime Context - src/index.html -->
<sp-icon src="icon-144x144.png" />
```

**Option 2: Data URL (base64 encoded)**
```html
<!-- UI Runtime Context - src/index.html -->
<sp-icon
  size="l"
  label="Previous"
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yOTU3Ljk5NSAtNTUzMC4wMzIgNiAxMCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6IzE0NzNlNjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNTEuMywzMzNsNC00LTQtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3MDEuNjk1IC01MTk2LjAzMikgcm90YXRlKDE4MCkiLz48L3N2Zz4="
/>
```

**Option 3: Inline SVG**
```html
<!-- UI Runtime Context - src/index.html -->
<sp-icon>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    role="img"
    fill="currentColor"
    height="18"
    width="18"
    aria-hidden="true"
  >
    <path
      d="M19.75,10.04h-15l5.97-5.97a.483.483,0,0,0,0-.7l-.35-.36a.513.513,0,0,0-.71,0L2.24,10.44a.513.513,0,0,0,0,.71l7.39,7.84a.513.513,0,0,0,.71,0l.35-.35a.513.513,0,0,0,0-.71L4.76,11.5H19.75a.25.25,0,0,0,.25-.25v-.96A.25.25,0,0,0,19.75,10.04Z"
    ></path>
  </svg>
</sp-icon>
```

<InlineAlert slots="text" variant="warning"/>

Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

### Step 2: Understanding Spectrum Sizing

**Q:** What are the two main sizing concepts in Spectrum?

**A:** Spectrum uses two sizing systems:

1. **[Scale](https://spectrum.adobe.com/page/platform-scale/)** - Global sizing for all components:
   - `medium` - Standard desktop interfaces
   - `large` - Touch-friendly interfaces (mobile/tablet)

2. **[T-shirt sizes](https://spectrum.adobe.com/page/design-tokens/#Size-tokens)** - Individual component sizing:
   - `size="s"` - Small
   - `size="m"` - Medium (default)
   - `size="l"` - Large
   - `size="xl"` - Extra large

**Q:** How do scale and component sizes interact?

**A:** Component t-shirt sizes are relative to the overall scale. A `size="m"` button will be larger when the scale is `large` than when the scale is `medium`.

**Example in your theme setup:**
```html
<!-- UI Runtime Context - src/index.html -->
<sp-theme scale="medium" color="light" theme="express">
  <!-- Components here will use medium scale -->
  <sp-button size="m">Medium button on medium scale</sp-button>
  <sp-icon-play-circle size="s">Small icon on medium scale</sp-icon-play-circle>
</sp-theme>
```

### Step 3: Font Management

**Q:** What fonts are available in Adobe Express add-ons?

**A:** Adobe Express automatically injects [Adobe Clean fonts](https://spectrum.adobe.com/page/fonts/) via the [Add-on UI SDK](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/#importing-the-addonuisdk-for-use). Available fonts include:
- Adobe Clean (regular, bold, light variations)
- Adobe Clean Serif
- Source Code Pro (for code displays)

**Q:** How can I see which fonts are loaded?

**A:** Open browser developer tools while your add-on is running and inspect the available fonts in the Fonts panel or check the [font documentation](https://developer.adobe.com/express/add-ons/docs/guides/design/user_interface/#using-fonts).

![Injected fonts screenshot](../images/fonts.png)

### Step 4: Debugging Techniques

**Q:** How do I debug my add-on effectively?

**A:** Use these debugging strategies:

1. **Browser Developer Tools**:
   - Open DevTools in Adobe Express (F12 or right-click → Inspect)
   - Search for `add-on-iframe-slot` to find your add-on's container
   - Use Console tab for JavaScript errors and `console.log()` outputs

2. **CSS Variable Inspection**:
   - In DevTools, click on CSS variables in stylesheets to see their computed values
   - Use Elements tab to inspect component styling and structure

3. **Component Investigation**:
   - Check `node_modules/@spectrum-web-components` folder for component source
   - Use [component API reference](https://opensource.adobe.com/spectrum-web-components/components/slider/api/) for properties and events
   - Browse [Storybook examples](https://opensource.adobe.com/spectrum-web-components/storybook) for usage patterns

4. **Common Debugging Steps**:
   - Verify component imports are correct
   - Check that components are wrapped in `<sp-theme>`
   - Ensure webpack is handling CSS imports properly
   - Validate component version compatibility (all should be 0.39.4)

**Q:** What should I look for when components aren't working?

**A:** Check these common issues:
- Missing theme wrapper (`<sp-theme>`)
- Incorrect import paths
- Version mismatches between components
- Missing CSS loaders in webpack config

### Step 5: Advanced CSS Styling with Spectrum

Use Spectrum CSS variables for padding, gaps between controls, and general layout. In addition, since Spectrum Web Components do not include any specific components for typography, you can also use variables to style the typography.

**Q:** Why should I use Spectrum CSS variables instead of absolute values?

**A:** Spectrum CSS variables provide several benefits:

1. **Design System Alignment**: Your UI automatically stays aligned with Spectrum design updates
2. **Maintainability**: Change one variable to update styles across your entire application
3. **Theme Compatibility**: Variables automatically adapt to light/dark themes
4. **Consistency**: Ensures uniform spacing, colors, and typography throughout your add-on

**Q:** How do I implement Spectrum CSS variables in my add-on?

**A:** Import the typography CSS and use Spectrum variables in your styles:

```js
// UI Runtime Context - src/index.js imports
import "@spectrum-web-components/styles/typography.css";
```

```css
/* UI Runtime Context - src/index.css or <style> block */
.my-component {
  margin: var(--spectrum-global-dimension-static-size-250);
  padding: var(--spectrum-global-dimension-static-size-100);
  color: var(--spectrum-global-color-gray-800);
}
```

#### Understanding Spectrum CSS Variables

- [Layout](https://spectrum.adobe.com/page/design-tokens/#Layout-tokens) - the layout of your add-on can be adjusted by using global variables defined in the `@spectrum-web-components/styles/express/spectrum-core-global.css` folder in the `node_modules` of your add-on.

  **Some general guidelines** <br/>

  - `--spectrum-global-dimension-static-size-*` variables should be used when the dimension needs to be consistent across different elements or components, such as a uniform padding or margin throughout the application. It should also be used when a dimension needs to be adjusted based on a specific context, such as a container element or viewport size.

  - `--spectrum-global-static-size-*` variables should be used for values that are not necessarily consistent across the application, but need to be adjusted based on the content or use case. In general, these variables are typically used for text-related styles that may vary based on content or context.

  To summarize:

  - Use `--spectrum-global-dimension-static-size` variables for for dimensions such as `width`, `height`, `padding`, `margin`, or general spacing variables.
  - Use `--spectrum-global-static-size` variables for things like `font-size`, `line-height`, `border-radius`, etc.

- [Color variables](https://spectrum.adobe.com/page/color-fundamentals/) are provided as part of the `theme` imports. The color value’s contrast with the background increases as the value increases, so colors progressively get darker in a light theme, and lighter in a dark theme (ie: `--spectrum-global-color-purple-600` is _lighter_ than `--spectrum-global-color-purple-900` in a `light` theme but _darker_ in a `dark` theme). [Preview the color palette](https://spectrum.adobe.com/page/color-palette/) in the reference for more details.

  **TIP:** Use theme-specific color variables, such as those defined in the light theme for Express, located in the CSS files in your `@spectrum-web-components/styles/express/*` folder, for general uses of color in your add-on. For example, when the color will be applied to text, icons, or the borders of a component. Use _static_ color variables defined in the overall `theme.js` when the color should be fixed and not dependent on the theme. The typical naming scheme is: `--spectrum-global-color-purple-600` and
  `--spectrum-global-color-static-purple-600`, respectively.

- [Typography](https://opensource.adobe.com/spectrum-css/typography.html) classes can be used to control your typography elements by importing the `typography.css`. For instance:

  ```html
  import "@spectrum-web-components/styles/typography.css";

   <div className="spectrum-Typography">
      <p className="spectrum-Heading spectrum-Heading--sizeL">This is a custom large header text</p>
  </div>
  </h3>
  ```

  **Note:** by default, typography components do not include any outer margins, but adding the [`spectrum-Typography` class to your container](https://opensource.adobe.com/spectrum-css/typography.html#:~:text=Applying%20margins,will%20have%20the%20correct%20margins) will provide margins to the typography components within it. You can try out [this codepen](https://codepen.io/hollyschinsky/pen/eYXKpmj) to see an example of this, by removing the `spectrum-Typography` from the `div` and adding it back to see the difference in the margins. It also illustrates some of the typography classes for example usage.

- **Overriding variables:** you can override the Spectrum CSS variables as needed in your add-on as well, by setting the name of the spectrum variable to a new value, for instance:

  ```css
  --spectrum-global-dimension-font-size-150: 16px;
  ```

### Component modifier variables

Components have a set of variables defined to use for modifying properties specific to that particular component. They are prefixed with `--mod-*`, and should be used when you want to customize the styling of a specific component.

These variables are particularly useful in cases where you want to use a component in multiple places with different styles. By using custom variables, you can easily adjust the styling of a component in one place, and have those changes apply to all instances of the component throughout your application.

In the sample app, you used custom modifiers for a few of the components, including to modify the Slider font size, some Swatch border properties and to adjust the Switch component, for reference.

A list of the prefixed custom properties for each UI component can be found in the Spectrum CSS repo's `mods.md` file for each component. For instance [the swatch component modifiers are listed here](https://github.com/adobe/spectrum-css/blob/main/components/swatch/metadata/mods.md), [and the slider component modifiers here](https://github.com/adobe/spectrum-css/tree/main/components/slider).

An example of their usage to modify the Slider is provided below for a reminder of what they look like:

```css
.color-well {
  cursor: pointer;
  --mod-swatch-border-thickness: var(--spectrum-divider-thickness-small);
  --mod-swatch-border-color: var(--spectrum-global-color-gray-200);
}
```

## Comprehensive Troubleshooting Guide

This section provides solutions to common issues encountered when developing with Spectrum Web Components.

### Critical Known Issues

#### Spectrum Web Component Version Conflicts

**Issue**: [Registry conflicts](https://opensource.adobe.com/spectrum-web-components/registry-conflicts/) causing component registration errors.

**Root Cause**: Mismatched component versions in `package.json`.

**Solution**: Ensure ALL Spectrum Web Components use the exact same version:

```json
// UI Runtime Context - package.json dependencies - CORRECT
"@spectrum-web-components/button": "0.39.4",
"@spectrum-web-components/theme": "0.39.4",
"@spectrum-web-components/picker": "0.39.4"
// All components must match!
```

**Critical**: Version 0.40.3 has known issues. Use 0.39.4 for stability.

#### Picker Component Flicker

**Issue**: UI flicker when clicking [Picker components](https://opensource.adobe.com/spectrum-web-components/components/picker/).

**Affected Versions**: 0.36.* - 0.40.*

**Solution**: Downgrade to version 0.39.4 or wait for fix in future versions.

### Step-by-Step Error Resolution

#### Build and Configuration Errors

**Q:** I see registry errors like `"sp-icon-chevron100" has already been used with this registry`. How do I fix this?

**A:** This indicates version conflicts:

1. **Check versions** in `package.json`:
   ```bash
   # UI Runtime Context - Terminal
   grep "@spectrum-web-components" package.json
   ```

2. **Update to matching versions**:
   ```json
   // UI Runtime Context - package.json
   "dependencies": {
     "@spectrum-web-components/button": "0.39.4",
     "@spectrum-web-components/theme": "0.39.4"
   }
   ```

3. **Reinstall dependencies**:
   ```bash
   # UI Runtime Context - Terminal
   rm -rf node_modules package-lock.json
   npm install
   ```

**Q:** Build fails with "Can't resolve '@spectrum-web-components/progress-circle'" error?

**A:** This is a known issue with version 0.40.3:

1. **Downgrade all components** to 0.39.4 in `package.json`
2. **Clear cache and reinstall**:
   ```bash
   # UI Runtime Context - Terminal
   npx clear-npx-cache
   npm install
   ```

**Q:** CLI not building to `dist` folder correctly?

**A:** Check your webpack configuration:

1. **Verify webpack.config.js location**: Must be in project root, not `src/`
2. **Check package.json scripts**:
   ```json
   // UI Runtime Context - package.json scripts
   "scripts": {
     "build": "ccweb-add-on-scripts build --use webpack",
     "start": "ccweb-add-on-scripts start --use webpack"
   }
   ```

#### Component Display Issues

**Q:** Components aren't rendering or look unstyled?

**A:** Check these requirements:

1. **Theme wrapper**: All components must be inside `<sp-theme>`:
   ```html
   <!-- UI Runtime Context - src/index.html -->
   <sp-theme scale="medium" color="light" theme="express">
     <sp-button>Your components here</sp-button>
   </sp-theme>
   ```

2. **Import order**: Theme imports must come first:
   ```js
   // UI Runtime Context - src/index.js - CORRECT ORDER
   import '@spectrum-web-components/theme/sp-theme.js';
   import '@spectrum-web-components/theme/express/theme-light.js';
   import '@spectrum-web-components/button/sp-button.js';
   ```

3. **Webpack CSS handling**: Verify CSS loaders in webpack.config.js

#### Development and CLI Issues

**Q:** General CLI issues - what's the universal fix?

**A:** Try the cache reset approach:

```bash
# UI Runtime Context - Terminal
npx clear-npx-cache
npm run build
npm run start
```

### Emergency Troubleshooting Checklist

When nothing works, follow this systematic approach:

1. **✅ Version Audit**: All `@spectrum-web-components` use same version (0.39.4)
2. **✅ Clean Install**: Delete `node_modules`, run `npm install`
3. **✅ Cache Clear**: Run `npx clear-npx-cache`
4. **✅ Theme Check**: Components wrapped in `<sp-theme>`
5. **✅ Import Order**: Theme imports before component imports
6. **✅ Webpack Config**: File in project root with correct CSS loaders
7. **✅ Reference Project**: Compare with [working examples](https://github.com/hollyschinsky/bingo-card-generator-js)

### Getting Additional Help

**Q:** Still having issues after trying everything?

**A:** Contact support through these channels:
- **Discord**: [Adobe Express Add-ons Community](https://discord.com/invite/nc3QDyFeb4) (username `hollyschinsky`)
- **Email**: [hschinsk@adobe.com](mailto:hschinsk@adobe.com)
- **GitHub Issues**: Report bugs in the [Spectrum Web Components repo](https://github.com/adobe/spectrum-web-components/issues)

## Additional Resources & Next Steps

### Related Lessons

Continue your Adobe Express add-on development journey:

- **Prerequisites**: [Lesson 1: Basic JavaScript with Spectrum Web Components](./part1.md)
- **Prerequisites**: [Lesson 2: React-based add-on with swc-react](./part2.md)
- **Advanced Topics**: [Document API concepts](../../learn/platform_concepts/document-api.md)
- **Publishing**: [Development and publishing guides](../../guides/getting_started/dev_tooling.md)

### Interactive Examples

Explore working examples to understand implementation:

- **CodePen Examples**:
  - [Simple button using Spectrum Web Components](https://codepen.io/hollyschinsky/pen/xxBweyV)
  - [Complete Bingo Card Generator](https://codepen.io/hollyschinsky/pen/wvOyrLm)
  - [Spectrum Typography showcase](https://codepen.io/hollyschinsky/pen/eYXKpmj)
  - [Spectrum CSS variables demo](https://codepen.io/lazd/pen/Exevvey)

- **GitHub Projects**:
  - [JavaScript Bingo Generator](https://github.com/hollyschinsky/bingo-card-generator-js)
  - [React Bingo Generator](https://github.com/hollyschinsky/bingo-card-generator-react-js)
  - [Official Add-on Code Samples](https://developer.adobe.com/express/add-ons/docs/samples/)

### Design System Resources

Master the Spectrum Design System:

- **Core Documentation**:
  - [Adobe Express UX Guidelines](https://xd.adobe.com/view/urn:aaid:sc:US:fd638450-1af8-49c3-ad29-0e76c2a2136f/)
  - [Spectrum Web Components Storybook](https://opensource.adobe.com/spectrum-web-components/storybook/)
  - [Spectrum Design Tokens Visualizer](https://opensource.adobe.com/spectrum-tokens/visualizer/)

- **Design Tools**:
  - [Adobe Spectrum XD Plugin](https://spectrum.adobe.com/page/spectrum-xd-plugin/)
  - [Adobe Spectrum Figma Plugin](https://www.figma.com/community/file/1211274196563394418/adobe-spectrum-design-system)
  - [Adobe Color Wheel](https://color.adobe.com/create/color-wheel)

### Development Tools

- **Quick Testing** (Development Only):
  - [Spectrum CDN Bundle](https://jspm.dev/@spectrum-web-components/bundle/elements.js)
  - **⚠️ Warning**: CDN defaults to base theme. Include Express theme bundles for proper styling.

### Community & Support

- **Discord**: [Adobe Express Add-ons Community](https://discord.com/invite/nc3QDyFeb4)
- **Documentation**: [Complete Add-on Developer Guides](https://developer.adobe.com/express/add-ons/docs/)
- **Issues**: [Spectrum Web Components GitHub](https://github.com/adobe/spectrum-web-components/issues)

## Summary

You've completed the advanced Spectrum Web Components lesson! You now understand:

- ✅ Advanced icon management and custom implementations
- ✅ Spectrum sizing concepts (scale vs. t-shirt sizes)
- ✅ Font management in Adobe Express add-ons
- ✅ Debugging techniques and tools
- ✅ Advanced CSS styling with Spectrum variables
- ✅ Component modifier variables
- ✅ Comprehensive troubleshooting strategies

**Next Steps**: Apply these advanced techniques to your own add-on projects, and explore the [Document API](../../learn/platform_concepts/document-api.md) for even more powerful functionality.
