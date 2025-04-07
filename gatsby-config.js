/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
module.exports = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: process.env.PATH_PREFIX || "/express/add-ons/docs/",
  siteMetadata: {
    pages: [
      {
        title: "Adobe Express Add-ons",
        path: "https://developer.adobe.com/express/add-ons",
      },
      {
        title: "Guides",
        path: "guides",
      },
      {
        title: "SDK References",
        path: "references",
      },
      {
        title: "Samples",
        path: "samples",
      },
      {
        title: "Community",
        path: "https://developer.adobe.com/express/community",
      },
      {
        title: "Fund for Design",
        path: "https://developer.adobe.com/fund-for-design",
      },
      {
        title: "Experimental",
        path: "ai-gen",
      },
    ],
    subPages: [
      {
        title: "Learning Paths",
        header: true,
        path: "/ai-gen/paths/index-with-paths",
        pages: [
          {
            title: "Beginner Path",
            path: "/ai-gen/paths/beginner-index",
            pages: [
              {
                title: "Introduction to Adobe Express Add-ons",
                path: "/ai-gen/paths/beginner-step1",
              },
              {
                title: "Setting Up Your Development Environment",
                path: "/ai-gen/paths/beginner-step2",
              },
              {
                title: "Using the Playground to Experiment",
                path: "/ai-gen/paths/beginner-step3",
              },
              {
                title: "Building Your First Add-on",
                path: "/ai-gen/paths/beginner-step4",
              },
            ],
          },
          {
            title: "Intermediate Path",
            path: "/ai-gen/paths/intermediate-index/",
            pages: [
              {
                title: "Working with Document Elements",
                path: "/ai-gen/paths/intermediate-step1",
              },
              {
                title: "Working with User Interaction",
                path: "/ai-gen/paths/intermediate-step2",
              },
              {
                title: "Storing and Managing Data",
                path: "/ai-gen/paths/intermediate-step3",
              },
              {
                title: "Building a Practical Add-on",
                path: "/ai-gen/paths/intermediate-step4",
              },
            ],
          },
          {
            title: "Advanced Path",
            path: "/ai-gen/paths/advanced-index",
            pages: [
              {
                title: "Advanced Add-on Architecture",
                path: "/ai-gen/paths/advanced-step1",
              },
              {
                title: "Performance Optimization",
                path: "/ai-gen/paths/advanced-step2",
              },
              {
                title: "Advanced UI Patterns",
                path: "/ai-gen/paths/advanced-step3",
              },
              {
                title: "External API Integration",
                path: "/ai-gen/paths/advanced-step4",
              },
              {
                title: "Deploying and Scaling Add-ons",
                path: "/ai-gen/paths/advanced-step5",
              },
            ],
          },
          {
            title: "UIs with Spectrum Path",
            path: "/ai-gen/paths/spectrum/01-foundation/",
            pages: [
              {
                title: "Foundation of Spectrum Design System",
                path: "/ai-gen/paths/spectrum/01-foundation/",
              },
              {
                title: "Basic Implementation with Spectrum Web Components",
                path: "/ai-gen/paths/spectrum/02-basic-implementation/",
              },
              {
                title: "Advanced Features and Best Practices",
                path: "/ai-gen/paths/spectrum/03-advanced-features/",
              },
            ],
          },
          {
            title: "Subject-based Paths",
            path: "/ai-gen/paths/subject-based/gen1",
            pages: [
              {
                title: "General Subject Paths",
                path: "/ai-gen/paths/subject-based/gen1",
              },
              {
                title: "Specific Subject Paths",
                path: "/ai-gen/paths/subject-based/gen2",
              },
            ],
          },
          {
            title: "Role-based Path",
            path: "/ai-gen/paths/role-based",
          },
        ],
      },
      {
        title: "Related Content Path",
        path: "/ai-gen/related-content",
      },
      {
        title: "How To's",
        header: true,
        path: "/ai-gen/how-tos/working-with-addons",
        pages: [
          {
            title: "Working with Add-ons",
            path: "/ai-gen/how-tos/working-with-addons",
          },
          {
            title: "Spectrum Design Guide",
            path: "/ai-gen/spectrum/spectrum",
          },
          {
            title: "Troubleshooting Add-ons",
            path: "/ai-gen/how-tos/troubleshoot",
          },
        ],
      },
      {
        title: "Overview",
        path: "references/",
      },
      {
        title: "Add-on UI SDK",
        path: "references/addonsdk/",
        pages: [
          {
            title: "app",
            path: "references/addonsdk/addonsdk-app.md",
            pages: [
              {
                title: "currentUser",
                path: "references/addonsdk/app-currentUser.md",
              },
              {
                title: "devFlags",
                path: "references/addonsdk/app-devFlags.md",
              },
              {
                title: "document",
                path: "references/addonsdk/app-document.md",
              },
              {
                title: "oauth",
                path: "references/addonsdk/app-oauth.md",
              },
              {
                title: "ui",
                path: "references/addonsdk/app-ui.md",
              },
            ],
          },
          {
            title: "instance",
            path: "references/addonsdk/addonsdk-instance.md",
            pages: [
              {
                title: "clientStorage",
                path: "references/addonsdk/instance-clientStorage.md",
              },
              {
                title: "manifest",
                path: "references/addonsdk/instance-manifest.md",
              },
              {
                title: "runtime",
                path: "references/addonsdk/instance-runtime.md",
                pages: [
                  {
                    title: "dialog",
                    path: "references/addonsdk/runtime-dialog.md",
                  },
                ],
              },
            ],
          },
          {
            title: "constants",
            path: "references/addonsdk/addonsdk-constants.md",
          },
        ],
      },
      {
        title: "Document Sandbox",
        path: "references/document-sandbox/",
        pages: [
          {
            title: "Communication APIs",
            path: "references/document-sandbox/communication/",
          },
          {
            title: "Web APIs",
            path: "references/document-sandbox/web/",
          },
          {
            title: "Document APIs",
            path: "references/document-sandbox/document-apis/",
            pages: [
              {
                title: "Classes",
                path: "references/document-sandbox/document-apis/classes/Editor.md",
                pages: [
                  {
                    title: "AddOnData",
                    path: "references/document-sandbox/document-apis/classes/AddOnData.md",
                  },
                  {
                    title: "ArtboardList",
                    path: "references/document-sandbox/document-apis/classes/ArtboardList.md",
                  },
                  {
                    title: "ArtboardNode",
                    path: "references/document-sandbox/document-apis/classes/ArtboardNode.md",
                  },
                  {
                    title: "AvailableFont",
                    path: "references/document-sandbox/document-apis/classes/AvailableFont.md",
                  },
                  {
                    title: "BaseFont",
                    path: "references/document-sandbox/document-apis/classes/BaseFont.md",
                  },
                  {
                    title: "BaseNode",
                    path: "references/document-sandbox/document-apis/classes/BaseNode.md",
                  },
                  {
                    title: "ColorUtils",
                    path: "references/document-sandbox/document-apis/classes/ColorUtils.md",
                  },
                  {
                    title: "ComplexShapeNode",
                    path: "references/document-sandbox/document-apis/classes/ComplexShapeNode.md",
                  },
                  {
                    title: "Context",
                    path: "references/document-sandbox/document-apis/classes/Context.md",
                  },
                  {
                    title: "Editor",
                    path: "references/document-sandbox/document-apis/classes/Editor.md",
                  },
                  {
                    title: "EllipseNode",
                    path: "references/document-sandbox/document-apis/classes/EllipseNode.md",
                  },
                  {
                    title: "ExpressRootNode",
                    path: "references/document-sandbox/document-apis/classes/ExpressRootNode.md",
                  },
                  {
                    title: "FillableNode",
                    path: "references/document-sandbox/document-apis/classes/FillableNode.md",
                  },
                  {
                    title: "Fonts",
                    path: "references/document-sandbox/document-apis/classes/Fonts.md",
                  },
                  {
                    title: "GridCellNode",
                    path: "references/document-sandbox/document-apis/classes/GridCellNode.md",
                  },
                  {
                    title: "GridLayoutNode",
                    path: "references/document-sandbox/document-apis/classes/GridLayoutNode.md",
                  },
                  {
                    title: "GroupNode",
                    path: "references/document-sandbox/document-apis/classes/GroupNode.md",
                  },
                  {
                    title: "ImageRectangleNode",
                    path: "references/document-sandbox/document-apis/classes/ImageRectangleNode.md",
                  },
                  {
                    title: "ItemList",
                    path: "references/document-sandbox/document-apis/classes/ItemList.md",
                  },
                  {
                    title: "LineNode",
                    path: "references/document-sandbox/document-apis/classes/LineNode.md",
                  },
                  {
                    title: "MediaContainerNode",
                    path: "references/document-sandbox/document-apis/classes/MediaContainerNode.md",
                  },
                  {
                    title: "Node",
                    path: "references/document-sandbox/document-apis/classes/Node.md",
                  },
                  {
                    title: "PageList",
                    path: "references/document-sandbox/document-apis/classes/PageList.md",
                  },
                  {
                    title: "PageNode",
                    path: "references/document-sandbox/document-apis/classes/PageNode.md",
                  },
                  {
                    title: "PathNode",
                    path: "references/document-sandbox/document-apis/classes/PathNode.md",
                  },
                  {
                    title: "ReadOnlyItemList",
                    path: "references/document-sandbox/document-apis/classes/ReadOnlyItemList.md",
                  },
                  {
                    title: "RectangleNode",
                    path: "references/document-sandbox/document-apis/classes/RectangleNode.md",
                  },
                  {
                    title: "RestrictedItemList",
                    path: "references/document-sandbox/document-apis/classes/RestrictedItemList.md",
                  },
                  {
                    title: "SolidColorShapeNode",
                    path: "references/document-sandbox/document-apis/classes/SolidColorShapeNode.md",
                  },
                  {
                    title: "StrokableNode",
                    path: "references/document-sandbox/document-apis/classes/StrokableNode.md",
                  },
                  {
                    title: "StrokeShapeNode",
                    path: "references/document-sandbox/document-apis/classes/StrokeShapeNode.md",
                  },
                  {
                    title: "TextContentModel",
                    path: "references/document-sandbox/document-apis/classes/TextContentModel.md",
                  },
                  {
                    title: "TextNode",
                    path: "references/document-sandbox/document-apis/classes/TextNode.md",
                  },
                  {
                    title: "UnavailableFont",
                    path: "references/document-sandbox/document-apis/classes/UnavailableFont.md",
                  },
                  {
                    title: "UnknownNode",
                    path: "references/document-sandbox/document-apis/classes/UnknownNode.md",
                  },
                  {
                    title: "Viewport",
                    path: "references/document-sandbox/document-apis/classes/Viewport.md",
                  },
                  {
                    title: "VisualNode",
                    path: "references/document-sandbox/document-apis/classes/VisualNode.md",
                  },
                ],
              },
              {
                title: "Interfaces",
                path: "references/document-sandbox/document-apis/interfaces/AreaTextLayout.md",
                pages: [
                  {
                    title: "AreaTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/AreaTextLayout.md",
                  },
                  {
                    title: "AutoHeightTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/AutoHeightTextLayout.md",
                  },
                  {
                    title: "BaseParagraphStyles",
                    path: "references/document-sandbox/document-apis/interfaces/BaseParagraphStyles.md",
                  },
                  {
                    title: "BitmapImage",
                    path: "references/document-sandbox/document-apis/interfaces/BitmapImage.md",
                  },
                  {
                    title: "CharacterStyles",
                    path: "references/document-sandbox/document-apis/interfaces/CharacterStyles.md",
                  },
                  {
                    title: "CharacterStylesInput",
                    path: "references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md",
                  },
                  {
                    title: "CharacterStylesRange",
                    path: "references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md",
                  },
                  {
                    title: "CharacterStylesRangeInput",
                    path: "references/document-sandbox/document-apis/interfaces/CharacterStylesRangeInput.md",
                  },
                  {
                    title: "Color",
                    path: "references/document-sandbox/document-apis/interfaces/Color.md",
                  },
                  {
                    title: "ColorFill",
                    path: "references/document-sandbox/document-apis/interfaces/ColorFill.md",
                  },
                  {
                    title: "ContainerNode",
                    path: "references/document-sandbox/document-apis/interfaces/ContainerNode.md",
                  },
                  {
                    title: "Fill",
                    path: "references/document-sandbox/document-apis/interfaces/Fill.md",
                  },
                  // {
                  //   "title": "FillTypeValueExtensibleEnum",
                  //   "path": "references/document-sandbox/document-apis/interfaces/FillTypeValueExtensibleEnum.md",
                  // },
                  {
                    title: "IFillableNode",
                    path: "references/document-sandbox/document-apis/interfaces/IFillableNode.md",
                  },
                  {
                    title: "IRectangularNode",
                    path: "references/document-sandbox/document-apis/interfaces/IRectangularNode.md",
                  },
                  {
                    title: "IStrokableNode",
                    path: "references/document-sandbox/document-apis/interfaces/IStrokableNode.md",
                  },
                  {
                    title: "ListItem",
                    path: "references/document-sandbox/document-apis/interfaces/ListItem.md",
                  },
                  {
                    title: "OrderedListStyleInput",
                    path: "references/document-sandbox/document-apis/interfaces/OrderedListStyleInput.md",
                  },
                  {
                    title: "ParagraphStyles",
                    path: "references/document-sandbox/document-apis/interfaces/ParagraphStyles.md",
                  },
                  {
                    title: "ParagraphStylesInput",
                    path: "references/document-sandbox/document-apis/interfaces/ParagraphStylesInput.md",
                  },
                  {
                    title: "ParagraphStylesRange",
                    path: "references/document-sandbox/document-apis/interfaces/ParagraphStylesRange.md",
                  },
                  {
                    title: "ParagraphStylesRangeInput",
                    path: "references/document-sandbox/document-apis/interfaces/ParagraphStylesRangeInput.md",
                  },
                  {
                    title: "Point",
                    path: "references/document-sandbox/document-apis/interfaces/Point.md",
                  },
                  {
                    title: "PointTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/PointTextLayout.md",
                  },
                  {
                    title: "Rect",
                    path: "references/document-sandbox/document-apis/interfaces/Rect.md",
                  },
                  {
                    title: "RectangleGeometry",
                    path: "references/document-sandbox/document-apis/interfaces/RectangleGeometry.md",
                  },
                  {
                    title: "Stroke",
                    path: "references/document-sandbox/document-apis/interfaces/Stroke.md",
                  },
                  {
                    title: "StyleRange",
                    path: "references/document-sandbox/document-apis/interfaces/StyleRange.md",
                  },
                  {
                    title: "TextRange",
                    path: "references/document-sandbox/document-apis/interfaces/TextRange.md",
                  },
                  {
                    title: "UnorderedListStyleInput",
                    path: "references/document-sandbox/document-apis/interfaces/UnorderedListStyleInput.md",
                  },
                  {
                    title: "UnsupportedTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/UnsupportedTextLayout.md",
                  },
                ],
              },
              {
                title: "Constants",
                path: "references/document-sandbox/document-apis/enumerations/ArrowHeadType.md",
                pages: [
                  {
                    title: "ArrowHeadType",
                    path: "references/document-sandbox/document-apis/enumerations/ArrowHeadType.md",
                  },
                  {
                    title: "BlendMode",
                    path: "references/document-sandbox/document-apis/enumerations/BlendMode.md",
                  },
                  {
                    title: "EditorEvent",
                    path: "references/document-sandbox/document-apis/enumerations/EditorEvent.md",
                  },
                  {
                    title: "FillRule",
                    path: "references/document-sandbox/document-apis/enumerations/FillRule.md",
                  },
                  {
                    title: "FillType",
                    path: "references/document-sandbox/document-apis/enumerations/FillType.md",
                  },
                  {
                    title: "OrderedListNumbering",
                    path: "references/document-sandbox/document-apis/namespaces/Constants/enumerations/OrderedListNumbering.md",
                  },
                  {
                    title: "ParagraphListType",
                    path: "references/document-sandbox/document-apis/namespaces/Constants/enumerations/ParagraphListType.md",
                  },
                  {
                    title: "SceneNodeType",
                    path: "references/document-sandbox/document-apis/enumerations/SceneNodeType.md",
                  },
                  {
                    title: "StrokePosition",
                    path: "references/document-sandbox/document-apis/enumerations/StrokePosition.md",
                  },
                  {
                    title: "StrokeType",
                    path: "references/document-sandbox/document-apis/enumerations/StrokeType.md",
                  },
                  {
                    title: "TextAlignment",
                    path: "references/document-sandbox/document-apis/enumerations/TextAlignment.md",
                  },
                  {
                    title: "TextType",
                    path: "references/document-sandbox/document-apis/enumerations/TextType.md",
                  },
                  {
                    title: "VisualEffectType",
                    path: "references/document-sandbox/document-apis/enumerations/VisualEffectType.md",
                  },
                ],
              },
              {
                title: "Types",
                path: "references/document-sandbox/document-apis/type-aliases/EditorEventHandler.md",
                pages: [
                  {
                    title: "EditorEventHandler",
                    path: "references/document-sandbox/document-apis/type-aliases/EditorEventHandler.md",
                  },
                  {
                    title: "EventHandlerId",
                    path: "references/document-sandbox/document-apis/type-aliases/EventHandlerId.md",
                  },
                  {
                    title: "Font",
                    path: "references/document-sandbox/document-apis/type-aliases/Font.md",
                  },
                  {
                    title: "OrderedListStyle",
                    path: "references/document-sandbox/document-apis/type-aliases/OrderedListStyle.md",
                  },
                  {
                    title: "SolidColorStrokeWithOptionalType",
                    path: "references/document-sandbox/document-apis/type-aliases/SolidColorStrokeWithOptionalType.md",
                  },
                  {
                    title: "UnorderedListStyle",
                    path: "references/document-sandbox/document-apis/type-aliases/UnorderedListStyle.md",
                  },
                ],
              },
              // {
              //   title: "Concepts",
              //   path: "references/document-sandbox/document-apis/concepts/index.md",
              // },
            ],
          },
          {
            title: "Concepts",
            path: "references/document-sandbox/document-apis/concepts/index.md",
          },
        ],
      },
      {
        title: "Built-in UI Components",
        path: "references/ui-components/color-picker.md",
        pages: [
          {
            title: "Color Picker",
            path: "references/ui-components/color-picker.md",
          },
        ],
      },
      {
        title: "Manifest Schema",
        description: "Manifest schema",
        path: "references/manifest",
      },
      // {
      //   title: "Changelog",
      //   path: "references/changelog.md",
      // },
      // {
      //   title: "Overview",
      //   path: "guides/",
      // },
      {
        title: "Getting started",
        path: "guides/",
        pages: [
          {
            title: "Overview",
            path: "guides/",
          },
          // {
          //   title: "Quickstart",
          //   path: "guides/getting_started/quickstart.md",
          // },
          {
            title: "Code Playground",
            path: "guides/getting_started/code_playground.md",
          },
          {
            title: "Hello World",
            path: "guides/getting_started/hello_world.md",
          },
          {
            title: "Learning Paths",
            path: "guides/learning-paths/index.md",
            pages: [
              {
                title: "Beginner",
                path: "guides/learning-paths/beginner.md",
              },
              {
                title: "Intermediate",
                path: "guides/learning-paths/intermediate.md",
              },
              {
                title: "Advanced",
                path: "guides/learning-paths/advanced.md",
              },
            ],
          },
        ],
      },
      {
        title: "Design",
        path: "guides/design",
        pages: [
          {
            title: "Overview",
            path: "guides/design/",
          },
          {
            title: "UX Guidelines",
            path: "guides/design/ux_guidelines/introduction.md",
            pages: [
              {
                title: "Introduction",
                path: "guides/design/ux_guidelines/introduction.md",
              },
              {
                title: "Design Principles",
                path: "guides/design/ux_guidelines/design_principles.md",
              },
              {
                title: "Theming",
                path: "guides/design/ux_guidelines/theming.md",
              },
              {
                title: "Visual Elements",
                path: "guides/design/ux_guidelines/visual_elements.md",
              },
              {
                title: "Feedback & Messaging",
                path: "guides/design/ux_guidelines/feedback_and_messaging.md",
              },
              // {
              //   title: "Mobile UX",
              //   path: "guides/design/ux_guidelines/mobile_ux.md",
              // },
              {
                title: "Branding Guidelines & Distribution",
                path: "guides/design/ux_guidelines/branding_guidelines.md",
              },
              {
                title: "Resources & References",
                path: "guides/design/ux_guidelines/resources_and_references.md",
              },
              {
                title: "Changelog",
                path: "guides/design/ux_guidelines/changelog.md",
              },
            ],
          },
          {
            title: "Implementation guide",
            path: "guides/design/implementation_guide.md",
          },
          {
            title: "Best practices",
            path: "guides/design/best_practices.md",
          },
        ],
      },
      {
        title: "Develop",
        path: "guides/getting_started/dev_tooling.md",
        pages: [
          {
            title: "Development tools",
            path: "guides/getting_started/dev_tooling.md",
          },
          {
            title: "Debug",
            path: "guides/debug/browser.md",
            pages: [
              {
                title: "Browser debugging",
                path: "guides/debug/browser.md",
              },
              {
                title: "VS Code debugging",
                path: "guides/debug/vs-code.md",
              },
            ],
          },
          {
            title: "How-to",
            path: "guides/develop/how_to.md",
            pages: [
              {
                title: "About",
                path: "guides/develop/how_to.md",
              },
              // {
              //   title: "Add-on Development",
              //   path: "guides/develop/how_to/debugging.md",
              //   pages: [
              //     {
              //       title: "Debugging",
              //       path: "guides/develop/how_to/debugging.md",
              //     },
              //     {
              //       title: "Use Imports and Constants",
              //       path: "guides/develop/how_to/imports_and_constants.md",
              //     },
              //     {
              //       title: "Listen to Events",
              //       path: "guides/develop/how_to/listen_to_events.md",
              //     },
              //     {
              //       title: "Add-on UI and Document API communication",
              //       path: "guides/develop/how_to/ui_document_api_communication.md",
              //     },
              //   ],
              // },
              {
                title: "Authentication & Authorization",
                path: "guides/develop/how_to/oauth2.md",
                pages: [
                  {
                    title: "Use OAuth 2.0",
                    path: "guides/develop/how_to/oauth2.md",
                  },
                ],
              },
              {
                title: "Data & Environment",
                path: "guides/develop/how_to/local_data_management.md",
                pages: [
                  {
                    title: "Store Data",
                    path: "guides/develop/how_to/local_data_management.md",
                  },
                  {
                    title: "Theme & Locale",
                    path: "guides/develop/how_to/theme_locale.md",
                  },
                ],
              },
              {
                title: "UI & Interaction",
                path: "guides/develop/how_to/drag_and_drop.md",
                pages: [
                  {
                    title: "Use Drag & Drop",
                    path: "guides/develop/how_to/drag_and_drop.md",
                  },
                  {
                    title: "Use Modal Dialogs",
                    path: "guides/develop/how_to/modal_dialogs.md",
                  },
                ],
              },
              {
                title: "Use Design Elements",
                path: "guides/develop/how_to/use_text.md", // change this!!
                pages: [
                  {
                    title: "Use Text",
                    path: "guides/develop/how_to/use_text.md",
                  },
                  {
                    title: "Use Geometry",
                    path: "guides/develop/how_to/use_geometry.md",
                  },
                  {
                    title: "Use Color",
                    path: "guides/develop/how_to/use_color.md",
                  },
                  {
                    title: "Use Images",
                    path: "guides/develop/how_to/use_images.md",
                  },
                  {
                    title: "Use Videos",
                    path: "guides/develop/how_to/use_videos.md",
                  },
                  {
                    title: "Use Audio",
                    path: "guides/develop/how_to/use_audio.md",
                  },
                  {
                    title: "Use PDF and PowerPoint",
                    path: "guides/develop/how_to/use_pdf_powerpoint.md",
                  },
                  {
                    title: "Group Elements",
                    path: "guides/develop/how_to/group_elements.md",
                  },
                  {
                    title: "Position Elements",
                    path: "guides/develop/how_to/position_elements.md",
                  },
                ],
              },
              {
                title: "Use Metadata",
                path: "guides/develop/how_to/document_metadata.md",
                pages: [
                  // {
                  //   title: "Authoring Adobe Express Content",
                  //   path: "guides/develop/how_to/authoring_adobe_express_content.md",
                  // },
                  {
                    title: "Document",
                    path: "guides/develop/how_to/document_metadata.md",
                  },
                  {
                    title: "Page",
                    path: "guides/develop/how_to/page_metadata.md",
                  },
                  {
                    title: "Element",
                    path: "guides/develop/how_to/element_metadata.md",
                  },
                ],
              },
              {
                title: "Exporting & Output",
                path: "guides/develop/how_to/create_renditions.md",
                pages: [
                  {
                    title: "Create Renditions",
                    path: "guides/develop/how_to/create_renditions.md",
                  },
                  {
                    title: "Manage Premium Content",
                    path: "guides/develop/how_to/premium_content.md",
                  },
                ],
              },
              {
                title: "User Info",
                path: "guides/develop/how_to/user_info.md",
                pages: [
                  {
                    title: "Identify users",
                    path: "guides/develop/how_to/user_info.md",
                  },
                ],
              },
              // ------------------------------------------------------------------
              // {
              //   title: "Content Management",
              //   path: "guides/develop/use_cases/content_management.md",
              // },
              // {
              //   title: "Authentication and Authorization",
              //   path: "guides/develop/use_cases/authentication_authorization.md",
              // },
              // {
              //   title: "Client-side Data",
              //   path: "guides/develop/use_cases/clientside_data.md",
              // },
              // {
              //   title: "User Interaction",
              //   path: "guides/develop/use_cases/user_interaction.md",
              // },
              // {
              //   title: "Environment Settings",
              //   path: "guides/develop/use_cases/environment_settings.md",
              // },
              // {
              //   title: "Monetization Flows",
              //   path: "guides/develop/use_cases/monetization_flows.md",
              // },
              // {
              //   title: "Content Authoring and Metadata",
              //   path: "guides/develop/use_cases/content_authoring.md",
              // },
            ],
          },
          {
            title: "Tutorials",
            path: "guides/tutorials/",
            pages: [
              {
                title: "Document APIs",
                path: "guides/tutorials/grids-addon",
              },
              {
                title: "Communication APIs",
                path: "guides/tutorials/stats-addon",
              },
              {
                title: "Using Adobe Spectrum",
                path: "guides/tutorials/spectrum-workshop/",
                pages: [
                  {
                    title:
                      "Basic JavaScript add-on with Spectrum Web Components",
                    path: "guides/tutorials/spectrum-workshop/part1/",
                  },
                  {
                    title: "React-based add-on with Spectrum Web Components",
                    path: "guides/tutorials/spectrum-workshop/part2/",
                  },
                  {
                    title: "Tips & Troubleshooting",
                    path: "guides/tutorials/spectrum-workshop/part3/",
                  },
                ],
              },
            ],
          },
          {
            title: "Advanced Topics",
            path: "guides/develop/frameworks-libraries-bundling.md",
            pages: [
              {
                title: "Frameworks, Libraries and Bundling",
                path: "guides/develop/frameworks-libraries-bundling.md",
              },
              {
                title: "Performance Tips",
                path: "guides/develop/performance.md",
              },
              {
                title: "Add-on iframe Context",
                path: "guides/develop/context.md",
              },
              {
                title: "Cross-origin Isolation Handling",
                path: "guides/develop/coi.md",
              },
            ],
          },
        ],
      },
      {
        title: "Distribute",
        path: "guides/distribute",
        pages: [
          {
            title: "Overview",
            path: "guides/distribute/",
          },
          {
            title: "Our review process",
            path: "guides/distribute/review_process/",
          },
          {
            title: "Creating a private link",
            path: "guides/distribute/private-dist.md",
          },
          {
            title: "Creating a public listing",
            path: "guides/distribute/public-dist.md",
          },
          {
            title: "Guidelines and requirements",
            path: "guides/distribute/guidelines",
            pages: [
              {
                title: "General guidelines",
                path: "guides/distribute/guidelines/general/",
                pages: [
                  {
                    title: "Your listing metadata",
                    path: "guides/distribute/guidelines/general/listing.md",
                  },
                  {
                    title: "Content",
                    path: "guides/distribute/guidelines/general/content.md",
                  },
                  {
                    title: "User interface",
                    path: "guides/distribute/guidelines/general/user_interface.md",
                  },
                  {
                    title: "Performance",
                    path: "guides/distribute/guidelines/general/performance.md",
                  },
                  {
                    title: "Usability",
                    path: "guides/distribute/guidelines/general/usability.md",
                  },
                  {
                    title: "Security",
                    path: "guides/distribute/guidelines/general/security.md",
                  },
                  {
                    title: "Features",
                    path: "guides/distribute/guidelines/general/features.md",
                  },
                  {
                    title: "Authenticating users",
                    path: "guides/distribute/guidelines/general/auth.md",
                  },
                  {
                    title: "Accessibility",
                    path: "guides/distribute/guidelines/general/accessibility.md",
                  },
                  {
                    title: "Compatibility",
                    path: "guides/distribute/guidelines/general/compatibility.md",
                  },
                  {
                    title: "Edge cases",
                    path: "guides/distribute/guidelines/general/edge_case.md",
                  },
                ],
              },
              {
                title: "Developer brand guidelines",
                path: "guides/distribute/guidelines/brand_guidelines.md",
              },
              {
                title: "Monetization guidelines",
                path: "guides/distribute/guidelines/monetization.md",
              },

              {
                title: "Generative AI guidelines",
                path: "guides/distribute/guidelines/genai/",
                pages: [
                  {
                    title: "Overview",
                    path: "guides/distribute/guidelines/genai/",
                  },
                  {
                    title: "Requirements",
                    path: "guides/distribute/guidelines/genai/requirements",
                  },
                  {
                    title: "Recommendations",
                    path: "guides/distribute/guidelines/genai/recommendations",
                  },
                ],
              },
            ],
          },
          {
            title: "Rejections",
            path: "guides/distribute/rejections.md",
          },
        ],
      },
      {
        title: "Troubleshoot",
        path: "guides/faq.md",
        pages: [
          {
            title: "FAQs",
            path: "guides/faq/",
          },
        ],
      },
      {
        title: "What's New",
        path: "guides/whatsnew.md",
        // pages: [
        //   {
        //     title: "Changelog",
        //     path: "guides/whatsnew.md",
        //   },
        // ],
      },
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`],
};
