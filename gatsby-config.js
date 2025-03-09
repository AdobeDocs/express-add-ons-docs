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
    ],
    subPages: [
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
                    title: "SolidColorStrokeWithOptionalType",
                    path: "references/document-sandbox/document-apis/type-aliases/SolidColorStrokeWithOptionalType.md",
                  },
                ],
              },
              {
                title: "Concepts",
                path: "references/document-sandbox/document-apis/concepts/index.md",
              },
            ],
          },
        ],
      },
      {
        title: "Manifest Schema",
        description: "Manifest schema",
        path: "references/manifest",
      },
      {
        title: "Changelog",
        path: "references/changelog.md",
      },
      {
        title: "Overview",
        path: "guides/",
      },
      {
        title: "Getting started",
        path: "guides/getting_started",
        pages: [
          {
            title: "Overview",
            path: "guides/getting_started",
          },
          {
            title: "Quickstart",
            path: "guides/getting_started/quickstart.md",
          },
          {
            title: "Development tools",
            path: "guides/getting_started/dev_tooling.md",
          },
          {
            title: "Code Playground",
            path: "guides/getting_started/code_playground.md",
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
        path: "guides/develop/index.md",
        pages: [
          {
            title: "Overview",
            path: "guides/develop/",
          },
          {
            title: "Common Use Cases",
            path: "guides/develop/use_cases.md",
            pages: [
              {
                title: "Content Management",
                path: "guides/develop/use_cases/content_management.md",
              },
              {
                title: "Authentication and Authorization",
                path: "guides/develop/use_cases/authentication_authorization.md",
              },
              {
                title: "Client-side Data",
                path: "guides/develop/use_cases/clientside_data.md",
              },
              {
                title: "User Interaction",
                path: "guides/develop/use_cases/user_interaction.md",
              },
              {
                title: "Environment Settings",
                path: "guides/develop/use_cases/environment_settings.md",
              },
              {
                title: "Monetization Flows",
                path: "guides/develop/use_cases/monetization_flows.md",
              },
              {
                title: "Content Authoring and Metadata",
                path: "guides/develop/use_cases/content_authoring.md",
              },
            ],
          },
          {
            title: "Web Frameworks, Libraries and Bundling",
            path: "guides/develop/frameworks-libraries-bundling.md",
          },        
          {
            title: "Using Lit & TypeScript",
            path: "guides/develop/using-lit.md",
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
      {
        title: "Debug",
        path: "guides/debug",
        pages: [
          {
            title: "Overview",
            path: "guides/debug/",
          },
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
        title: "FAQs",
        path: "guides/faq.md",
      },
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`],
};
