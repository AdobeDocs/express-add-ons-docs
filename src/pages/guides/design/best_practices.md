# Overview
This set of best practices are important to keep in mind as you develop your add-on since they can ultimately make or break the user experience with your add-on.

## Best Practices

- Design responsively and remember the width and height of your add-on panel will vary by device. 

- If the user needs to drill down into multiple panels, ensure you provide a way for them to navigate back.

- If the user will be logging in to a 3rd party service, ensure you provide a way for them to log out through your add-on UI.

- With the add-ons panel being narrow (280px), it's best to use a vertical layout for your UI components, with full-width buttons and components and vertical scrolling for overflow.

- If your add-on contains a gallery of images, a grid layout can work well.

- Use the header to help provide context in cases where your add-on requires a multi-step workflow, and to help with navigation.

- Use a footer if your add-on requires vertical scrolling for a primary CTA to be shown if needed.

- If you're using a search, use placeholder text to guide users in what they can search for, and display the search results directly below the search field.

- Use loading and progress indicators to provide visual feedback while things are in process. 

- Ensure your add-on is able to adapt seamlessly to appearance changes like if the theme changes from light to dark. Only the light theme will be supported at GA but you should still code your add-ons to adapt for when new support is added. **Note:** See the **SWC** sample for a reference on handling theme changes.

- Always build with accessibility in mind. For instance, consider tab order and color, dark mode etc. Adobe Spectrum CSS provides design guidelines for ensuring accessibility in [the design system base docs](https://spectrum.adobe.com/), but it's also automatically built in to the Spectrum Web Components and React Spectrum implementations. 
- Light mode is currently the only theme available, but dark mode will be supported in the future, so be sure to consider how your UI will look in dark mode as well.
