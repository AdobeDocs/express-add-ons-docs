# Adobe Express Add-ons Learning Paths

1. **Skill Level-Based Learning Paths** - Beginner, Intermediate, and Advanced paths that progressively build knowledge
2. **Subject-Based Learning Paths** - Content organized by subject areas like APIs, UI design, and development lifecycle
3. **Role-Based Learning Paths** - Paths tailored for developers, designers, and product managers
4. **Project-Based Learning Paths** - Practical paths for building specific types of add-ons

## Skill Level-Based Learning Paths

### Beginner Path: "Getting Started with Adobe Express Add-ons" (4 hours)

**Description**: This path introduces the fundamental concepts and tools needed to build your first Adobe Express add-on, from setup to a working add-on.

#### Step 1: Introduction to Add-ons (30 minutes)
- Learn what Adobe Express add-ons are and their capabilities.
- Understand the add-on architecture and basic concepts.
- **Resources**:
  - [Getting Started - Introduction](../getting_started/index.md)
  - [FAQ](../faq.md)

#### Step 2: Setting Up Your Development Environment (45 minutes)
- Install necessary tools and dependencies.
- Configure your local development environment.
- **Resources**:
  - [Setup Guide](../getting_started/setup.md)
  - [Development Tools](../getting_started/dev_tooling.md)

#### Step 3: Using the Playground to Experiment (45 minutes)
- Learn how to use the code playground for rapid prototyping.
- Experiment with basic add-on functionality.
- **Resources**:
  - [Code Playground](../getting_started/code_playground.md)

#### Step 4: Building Your First Add-on (2 hours)
- Follow a step-by-step tutorial to create a simple add-on.
- Test and run your add-on locally.
- **Resources**:
  - [Quickstart Guide](../getting_started/quickstart.md)
  - [Get Started Sample](/samples.md#get-started)

---

### Intermediate Path: "Building Functional Add-ons" (8 hours)

**Description**: This path covers the core APIs and features you'll need to build useful add-ons with real-world functionality.

#### Step 1: Working with Document Elements (2 hours)
- Learn how to add, manipulate, and position elements in a document.
- **Resources**:
  - [Using Images](../develop/how_to/use_images.md)
  - [Using Text](../develop/how_to/use_text.md)
  - [Position Elements](../develop/how_to/position_elements.md)
  - [Group Elements](../develop/how_to/group_elements.md)

#### Step 2: Working with User Interaction (2 hours)
- Implement drag-and-drop functionality.
- Create modal dialogs.
- **Resources**:
  - [Drag and Drop](../develop/how_to/drag_and_drop.md)
  - [Modal Dialogs](../develop/how_to/modal_dialogs.md)
  - [Dialog Add-on Sample](/samples.md#dialog-add-on)

#### Step 3: Storing and Managing Data (1.5 hours)
- Learn how to persist user data.
- Work with metadata in documents and elements.
- **Resources**:
  - [Local Data Management](../develop/how_to/local_data_management.md)
  - [Document Metadata](../develop/how_to/document_metadata.md)
  - [Element Metadata](../develop/how_to/element_metadata.md)
  - [Client Storage Sample](/samples.md#use-client-storage)

#### Step 4: Building a Practical Add-on (2.5 hours)
- Follow a complete tutorial to build a meaningful add-on.
- **Resources**:
  - [Stats Add-on Tutorial](../tutorials/stats-addon.md)
  - [Grids Add-on Tutorial](../tutorials/grids-addon.md)

---

### Advanced Path: "Mastering Add-on Development" (10 hours)

**Description**: This path explores advanced techniques and integration points to create sophisticated add-ons.

#### Step 1: Advanced Content Handling (2 hours)
- Work with different content types (PDF, PowerPoint, video, audio).
- Create and export renditions.
- **Resources**:
  - [Use PDF and PowerPoint](../develop/how_to/use_pdf_powerpoint.md)
  - [Use Videos](../develop/how_to/use_videos.md)
  - [Use Audio](../develop/how_to/use_audio.md)
  - [Create Renditions](../develop/how_to/create_renditions.md)
  - [Export Sample](/samples.md#export-sample)
  - [Audio Recording Add-on Sample](/samples.md#audio-recording-addon)

#### Step 2: Integration with External Services (3 hours)
- Implement OAuth for external service connections.
- Handle cross-origin requests.
- **Resources**:
  - [OAuth2 Integration](../develop/how_to/oauth2.md)
  - [Cross-Origin Isolation](../develop/coi.md)
  - [CORS Handling](../develop/cors.md)
  - [Import Images Using OAuth Sample](/samples.md#import-images-using-oauth)

#### Step 3: Premium Content and Licensing (2 hours)
- Handle premium content in add-ons.
- Implement licensing for monetization.
- **Resources**:
  - [Premium Content](../develop/how_to/premium_content.md)
  - [Licensed Add-on Sample](/samples.md#licensed-addon)

#### Step 4: Performance Optimization (3 hours)
- Optimize add-on performance and responsiveness.
- Use frameworks and libraries effectively.
- **Resources**:
  - [Performance Guide](../develop/performance.md)
  - [Frameworks, Libraries, and Bundling](../develop/frameworks-libraries-bundling.md)

## Subject-Based Learning Paths

### Path: "Adobe Express Add-on APIs" (6 hours)

**Description**: A comprehensive exploration of the Adobe Express Add-on SDK APIs.

#### Step 1: Introduction to the SDK (1 hour)
- Understand the SDK structure and API organization.
- **Resources**:
  - [Add-on SDK References](/references/index.md)
  - [Add-on SDK Constants](/references/addonsdk/addonsdk-constants.md)

#### Step 2: Document APIs (2 hours)
- Learn to manipulate document content and structure.
- **Resources**:
  - [App Document APIs](/references/addonsdk/app-document.md)
  - [Document Context APIs](../develop/context.md)

#### Step 3: User Interface and Interaction APIs (1.5 hours)
- Work with theme, locale, and UI components.
- **Resources**:
  - [App UI APIs](/references/addonsdk/app-ui.md)
  - [Theme and Locale](../develop/how_to/theme_locale.md)

#### Step 4: User Data and Authentication APIs (1.5 hours)
- Work with user information and authentication.
- **Resources**:
  - [Current User APIs](/references/addonsdk/app-currentUser.md)
  - [OAuth APIs](/references/addonsdk/app-oauth.md)
  - [User Info](../develop/how_to/user_info.md)


### Path: "Add-on UI Design" (5 hours)

**Description**: Learn how to create effective and beautiful user interfaces for your add-ons.

#### Step 1: UI/UX Principles for Add-ons (1 hour)
- Understand design best practices specific to add-ons.
- **Resources**:
  - [Design Best Practices](../design/best_practices.md)
  - [UX Guidelines](../design/ux_guidelines/index.md)

#### Step 2: Implementation Guidelines (2 hours)
- Follow implementation guidelines for consistent UI.
- **Resources**:
  - [Implementation Guide](../design/implementation_guide.md)
  - [Fonts](../design/fonts.md)

#### Step 3: Using Spectrum Components (2 hours)
- Learn to use Adobe's Spectrum design system in add-ons.
- **Resources**:
  - [Spectrum Workshop Tutorial](../tutorials/spectrum-workshop/index.md)
  - [SWC Sample](/samples.md#swc)
  - [SWC React Theme Sampler](/samples.md#swc-react-theme-sampler)


### Path: "Add-on Development Lifecycle" (7 hours)

**Description**: Learn the complete process of developing, debugging, and distributing add-ons.

#### Step 1: Project Setup and Configuration (1.5 hours)
- Configure manifest and project structure.
- **Resources**:
  - [Manifest References](/references/manifest/index.md)
  - [Setup Guide](../getting_started/setup.md)

#### Step 2: Development and Debugging (2.5 hours)
- Learn effective debugging techniques.
- **Resources**:
  - [Debugging Guides](../debug/index.md)
  - [Development Tools](../getting_started/dev_tooling.md)

#### Step 3: Optimization and Testing (1.5 hours)
- Optimize performance and test your add-on.
- **Resources**:
  - [Performance Guide](../develop/performance.md)

#### Step 4: Distribution and Updates (1.5 hours)
- Distribute your add-on and manage updates.
- **Resources**:
  - [Distribution Guides](../distribute/index.md)

### Path for Developers: "Add-on Technical Implementation" (8 hours)

**Description**: A technical focus on implementation details for developers.

#### Step 1: Technical Foundations (2 hours)
- Set up the development environment.
- Understand API structure and technical requirements.
- **Resources**:
  - [Development Tools](../getting_started/dev_tooling.md)
  - [Add-on SDK References](/references/index.md)

#### Step 2: Content Manipulation APIs (2 hours)
- Implement APIs for document manipulation.
- **Resources**:
  - [App Document APIs](/references/addonsdk/app-document.md)
  - [Position Elements](../develop/how_to/position_elements.md)
  - [Group Elements](../develop/how_to/group_elements.md)

#### Step 3: Integration and Services (2 hours)
- Connect to external services and handle authentication.
- **Resources**:
  - [OAuth2 Integration](../develop/how_to/oauth2.md)
  - [Cross-Origin Isolation](../develop/coi.md)
  - [CORS Handling](../develop/cors.md)

#### Step 4: Performance and Optimization (2 hours)
- Optimize add-on performance.
- **Resources**:
  - [Performance Guide](../develop/performance.md)
  - [Frameworks, Libraries, and Bundling](../develop/frameworks-libraries-bundling.md)


### Path for Designers: "Add-on User Experience Design" (6 hours)

**Description**: A focus on creating great user experiences in add-ons.

#### Step 1: Design Principles (1.5 hours)
- Understand UX best practices for add-ons.
- **Resources**:
  - [Design Best Practices](../design/best_practices.md)
  - [UX Guidelines](../design/ux_guidelines/index.md)

#### Step 2: UI Implementation (2 hours)
- Implement UI components and patterns.
- **Resources**:
  - [Implementation Guide](../design/implementation_guide.md)
  - [Fonts](../design/fonts.md)

#### Step 3: Spectrum Design System (1.5 hours)
- Work with Adobe's Spectrum design system.
- **Resources**:
  - [Spectrum Workshop Tutorial](../tutorials/spectrum-workshop/index.md)

#### Step 4: User Testing and Refinement (1 hour)
- Test and refine add-on user experience.
- **Resources**:
  - [Design Best Practices](../design/best_practices.md)



### Path for Product Managers: "Add-on Planning and Distribution" (5 hours)

**Description**: Strategic guidance for planning, developing, and distributing add-ons.

#### Step 1: Add-on Capabilities and Limitations (1 hour)
- Understand what's possible with Express add-ons.
- **Resources**:
  - [Getting Started - Introduction](../getting_started/index.md)
  - [FAQ](../faq.md)

#### Step 2: Feature Planning (1.5 hours)
- Plan add-on features based on available APIs.
- **Resources**:
  - [Add-on SDK References](/references/index.md)
  - [Samples](/samples.md)

#### Step 3: Licensing and Monetization (1 hour)
- Implement licensing and monetization strategies.
- **Resources**:
  - [Licensed Add-on Sample](/samples.md#licensed-addon)

#### Step 4: Distribution and Marketing (1.5 hours)
- Distribute and market your add-on.
- **Resources**:
  - [Distribution Guides](../distribute/index.md)

# Project-Based Learning Paths

### Path: "Building an Image Enhancement Add-on" (6 hours)

**Description**: Build a complete add-on for importing and enhancing images.

#### Step 1: Setting Up the Project (1 hour)
- Configure the development environment and project structure.
- **Resources**:
  - [Setup Guide](../getting_started/setup.md)
  - [Development Tools](../getting_started/dev_tooling.md)

#### Step 2: Implementing Image Import (1.5 hours)
- Add image import functionality from local and online sources.
- **Resources**:
  - [Using Images](../develop/how_to/use_images.md)
  - [Import Images from Local Sample](/samples.md#import-images-from-local)
  - [Import Images Using OAuth Sample](/samples.md#import-images-using-oauth)

#### Step 3: Creating Image Enhancement Features (2 hours)
- Implement image manipulation and enhancement features.
- **Resources**:
  - [Position Elements](../develop/how_to/position_elements.md)
  - [Group Elements](../develop/how_to/group_elements.md)
  - [Create Renditions](../develop/how_to/create_renditions.md)

#### Step 4: Adding Export Functionality (1.5 hours)
- Implement export options for enhanced images.
- **Resources**:
  - [Create Renditions](../develop/how_to/create_renditions.md)
  - [Export Sample](/samples.md#export-sample)

---

### Path: "Creating a Content Organization Add-on" (7 hours)

**Description**: Build an add-on to help users organize and manage content.

#### Step 1: Setting Up the Project (1 hour)
- Configure the development environment and project structure.
- **Resources**:
  - [Setup Guide](../getting_started/setup.md)
  - [Development Tools](../getting_started/dev_tooling.md)

#### Step 2: Implementing Content Management (2 hours)
- Add features for organizing and categorizing content.
- **Resources**:
  - [Group Elements](../develop/how_to/group_elements.md)
  - [Element Metadata](../develop/how_to/element_metadata.md)
  - [Document Metadata](../develop/how_to/document_metadata.md)

#### Step 3: Adding Data Persistence (2 hours)
- Implement local storage for user preferences and organization.
- **Resources**:
  - [Local Data Management](../develop/how_to/local_data_management.md)
  - [Client Storage Sample](/samples.md#use-client-storage)

#### Step 4: Creating the User Interface (2 hours)
- Build an intuitive UI for content organization.
- **Resources**:
  - [Implementation Guide](../design/implementation_guide.md)
  - [Spectrum Workshop Tutorial](../tutorials/spectrum-workshop/index.md)
  