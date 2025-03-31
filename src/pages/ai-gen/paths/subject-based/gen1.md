# Subject-Based Learning Paths

Learn Adobe Express add-on development through focused, topic-specific modules.

## Path: Adobe Express Add-on APIs (6 hours)

**Description**: Master the core APIs needed to build powerful Adobe Express add-ons, from basic document manipulation to advanced user interactions.

### Module 1: Introduction to the SDK (1 hour)

- Understanding the SDK architecture and runtime environments
- Learning the difference between UI runtime and document sandbox
- Exploring SDK initialization and lifecycle events
- Handling SDK ready states and error scenarios
**Practical Exercise**: Create a basic add-on that initializes the SDK and responds to lifecycle events
**Resources**:
  - [Add-on SDK References](/references/index.md)
  - [Add-on SDK Constants](/references/addonsdk/addonsdk-constants.md)

### Module 2: Document APIs (2 hours)

- Working with document elements and their properties
- Managing document selection and content updates
- Implementing undo/redo functionality
- Handling document events and state changes
- Creating and manipulating shapes, text, and images

**Practical Exercise**: Build an add-on that adds custom shapes and responds to document changes

**Resources**:
  - [Document Sandbox](/references/document-sandbox/)
  - [Document APIs](/references/document-sandbox/document-apis/)
Element Metadata
  - [Element Metadata](/references/document-sandbox/document-apis/classes/AddOnData/)
  - [Use Element Metadata](../../guides/develop/how_to/element_metadata.md)
  - [Position Elements](../../guides/develop/how_to/position_elements.md)
  - [Group Elements](../../guides/develop/how_to/group_elements.md)

### Module 3: User Interface and Interaction APIs (1.5 hours)

- Implementing responsive layouts for different panel sizes
- Managing theme changes and localization
- Creating custom UI components that match Adobe Express
- Handling user interactions and input validation

**Practical Exercise**: Create a theme-aware panel with localized content

**Resources**:
  - [App UI APIs](/references/addonsdk/app-ui.md)
  - [Theme and Locale](../../guides/develop/how_to/theme_locale.md)

### Module 4: User Data and Authentication APIs (1.5 hours)

- Implementing OAuth authentication flows
- Managing user sessions and tokens
- Accessing user information securely
- Handling authentication errors and edge cases
**Practical Exercise**: Build an add-on that authenticates with an external service
**Resources**:
  - [Current User APIs](/references/addonsdk/app-currentUser.md)
  - [OAuth APIs](/references/addonsdk/app-oauth.md)
  - [User Info](../../guides/develop/how_to/user_info.md)

## Path: Add-on UI Design (5 hours)

**Description**: Create professional, accessible, and user-friendly interfaces that seamlessly integrate with Adobe Express.

### Module 1: UI/UX Principles for Add-ons (1 hour)

- Understanding Adobe Express design patterns
- Implementing accessibility standards
- Creating consistent user experiences
- Planning responsive layouts
**Practical Exercise**: Analyze and critique existing add-ons for UX improvements
**Resources**:
  - [Design Best Practices](../../guides/design/best_practices.md)
  - [UX Guidelines](../../guides/design/ux_guidelines/introduction.md)

### Module 2: Implementation Guidelines (2 hours)

- Building layouts that scale across devices
- Implementing proper spacing and typography
- Managing light and dark themes
- Creating loading and error states
**Practical Exercise**: Convert a basic add-on UI to follow Adobe Express guidelines
**Resources**:
  - [Implementation Guide](../../guides/design/implementation_guide.md)
  - [Fonts](../../guides/design/fonts.md)

### Module 3: Using Spectrum Components (2 hours)

- Understanding the Spectrum component library
- Implementing form controls and navigation
- Creating consistent action patterns
- Building accessible dialogs and modals
**Practical Exercise**: Build a complex form using Spectrum components
**Resources**:
  - [Spectrum Workshop Tutorial](../../guides/tutorials/spectrum-workshop/index.md)
  - [SWC Sample](/samples.md#swc)
  - [SWC React Theme Sampler](/samples.md#swc-react-theme-sampler)

## Path: Add-on Development Lifecycle (7 hours)

**Description**: Master the complete development process from initial setup to distribution, ensuring your add-on is production-ready.

### Module 1: Project Setup and Configuration (1.5 hours)

- Setting up the development environment
- Configuring the manifest file
- Structuring your project for scalability
- Managing dependencies and versioning
**Practical Exercise**: Create a new add-on project with proper configuration
**Resources**:
  - [Manifest References](/references/manifest/index.md)
  - [Setup Guide](../../guides/getting_started/setup.md)

### Module 2: Development and Debugging (2.5 hours)

- Using developer tools effectively
- Debugging common issues
- Implementing logging and error tracking
- Testing across different environments
**Practical Exercise**: Debug and fix common add-on issues
**Resources**:
  - [Debugging Guides](../../guides/debug/index.md)
  - [Development Tools](../../guides/getting_started/dev_tooling.md)

### Module 3: Optimization and Testing (1.5 hours)

- Optimizing performance and load times
- Implementing automated testing
- Managing state and memory
- Handling edge cases and errors
**Practical Exercise**: Optimize an add-on's performance and implement tests
**Resources**:
  - [Performance Guide](../../guides/develop/performance.md)

### Module 4: Distribution and Updates (1.5 hours)

- Preparing for submission
- Managing versions and updates
- Monitoring add-on health
- Gathering user feedback
**Practical Exercise**: Prepare an add-on for distribution
**Resources**:
  - [Distribution Guides](../../guides/distribute/index.md)
