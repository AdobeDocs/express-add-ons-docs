---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
title: Color Picker
description: Adobe Express built-in Color Picker component
contributors:
  - https://github.com/undavide
---

# Built-in UI Components: Color Picker

Adobe Express includes a set of built-in UI Components that are provide a consistent experience across different parts of the application.

## Color Picker

### Features

The Adobe Express native Color Picker offers several unique features, compared to the Browser's default alternative, for example:

- **Recommended Swatches**: a collection of colors that are curated by Adobe Express to provide a consistent color palette.
- **Themes**: color palettes that are designed to work well together.
- **Library**: collections that you can save and reuse in your designs.
- **Eyedropper**: a tool that allows you to pick a color from anywhere on the screen.
- **Brand colors**: collections of approved swatches and palettes to create consistent branded content

![Color Picker](./images/colorpicker_brand.png)

Using the Adobe ExpressColor Picker in your add-on instead of building your own version provides a few benefits:

- It simplifies the process of selecting a color, bypassing the Browser's color picker.
- It provides a consistent experience to users, as the color picker is integrated with Adobe Express.
- It's in sync with any swatches or Brand colors defined in Adobe Express.
- It will evolve with Adobe Express, adding new features over time.

### API

The [`addOnUISdk.app`](../addonsdk/addonsdk-app.md) has two dedicated method:

- [`showColorPicker()`](../addonsdk/addonsdk-app.md#showcolorpicker)
- [`hideColorPicker()`](../addonsdk/addonsdk-app.md#hidecolorpicker)

#### `showColorPicker()`

`showColorPicker(anchorElement: HTMLElement, options?: ColorPickerOptions): Promise<void>;`

The method accepts a reference to an HTML element as its first argument, which will become the color picker's anchor element. This is important for two reasons:

1. The picker will be positioned relative to this element, based on the placement options available in the `ColorPickerPlacement` enum;
2. The anchor will receive two custom events, that you can use to get the color:
   - `"colorpicker-color-change"` when the color changes
   - `"colorpicker-close"` when the picker is closed

#### `hideColorPicker()`

The `hideColorPicker()` method will close the color picker.
