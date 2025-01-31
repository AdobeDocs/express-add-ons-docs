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
                path: "references/addonsdk/app-current-user.md",
              },
              {
                title: "devFlags",
                path: "references/addonsdk/app-dev-flags.md",
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
                path: "references/addonsdk/instance-client-storage.md",
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
                path: "references/document-sandbox/document-apis/classes/editor.md",
                pages: [
                  {
                    title: "AddOnData",
                    path: "references/document-sandbox/document-apis/classes/add-on-data.md",
                  },
                  {
                    title: "ArtboardList",
                    path: "references/document-sandbox/document-apis/classes/artboard-list.md",
                  },
                  {
                    title: "ArtboardNode",
                    path: "references/document-sandbox/document-apis/classes/artboard-node.md",
                  },
                  {
                    title: "AvailableFont",
                    path: "references/document-sandbox/document-apis/classes/available-font.md",
                  },
                  {
                    title: "BaseFont",
                    path: "references/document-sandbox/document-apis/classes/base-font.md",
                  },
                  {
                    title: "BaseNode",
                    path: "references/document-sandbox/document-apis/classes/base-node.md",
                  },
                  {
                    title: "ColorUtils",
                    path: "references/document-sandbox/document-apis/classes/color-utils.md",
                  },
                  {
                    title: "ComplexShapeNode",
                    path: "references/document-sandbox/document-apis/classes/complex-shape-node.md",
                  },
                  {
                    title: "Context",
                    path: "references/document-sandbox/document-apis/classes/context.md",
                  },
                  {
                    title: "Editor",
                    path: "references/document-sandbox/document-apis/classes/editor.md",
                  },
                  {
                    title: "EllipseNode",
                    path: "references/document-sandbox/document-apis/classes/ellipse-node.md",
                  },
                  {
                    title: "ExpressRootNode",
                    path: "references/document-sandbox/document-apis/classes/express-root-node.md",
                  },
                  {
                    title: "FillableNode",
                    path: "references/document-sandbox/document-apis/classes/fillable-node.md",
                  },
                  {
                    title: "Fonts",
                    path: "references/document-sandbox/document-apis/classes/fonts.md",
                  },
                  {
                    title: "GridCellNode",
                    path: "references/document-sandbox/document-apis/classes/grid-cell-node.md",
                  },
                  {
                    title: "GridLayoutNode",
                    path: "references/document-sandbox/document-apis/classes/grid-layout-node.md",
                  },
                  {
                    title: "GroupNode",
                    path: "references/document-sandbox/document-apis/classes/group-node.md",
                  },
                  {
                    title: "ImageRectangleNode",
                    path: "references/document-sandbox/document-apis/classes/image-rectangle-node.md",
                  },
                  {
                    title: "ItemList",
                    path: "references/document-sandbox/document-apis/classes/item-list.md",
                  },
                  {
                    title: "LineNode",
                    path: "references/document-sandbox/document-apis/classes/line-node.md",
                  },
                  {
                    title: "MediaContainerNode",
                    path: "references/document-sandbox/document-apis/classes/media-container-node.md",
                  },
                  {
                    title: "Node",
                    path: "references/document-sandbox/document-apis/classes/node.md",
                  },
                  {
                    title: "PageList",
                    path: "references/document-sandbox/document-apis/classes/page-list.md",
                  },
                  {
                    title: "PageNode",
                    path: "references/document-sandbox/document-apis/classes/page-node.md",
                  },
                  {
                    title: "PathNode",
                    path: "references/document-sandbox/document-apis/classes/path-node.md",
                  },
                  {
                    title: "ReadOnlyItemList",
                    path: "references/document-sandbox/document-apis/classes/read-only-item-list.md",
                  },
                  {
                    title: "RectangleNode",
                    path: "references/document-sandbox/document-apis/classes/rectangle-node.md",
                  },
                  {
                    title: "RestrictedItemList",
                    path: "references/document-sandbox/document-apis/classes/restricted-item-list.md",
                  },
                  {
                    title: "SolidColorShapeNode",
                    path: "references/document-sandbox/document-apis/classes/solid-color-shape-node.md",
                  },
                  {
                    title: "StrokableNode",
                    path: "references/document-sandbox/document-apis/classes/strokable-node.md",
                  },
                  {
                    title: "StrokeShapeNode",
                    path: "references/document-sandbox/document-apis/classes/stroke-shape-node.md",
                  },
                  {
                    title: "TextContentModel",
                    path: "references/document-sandbox/document-apis/classes/text-content-model.md",
                  },
                  {
                    title: "TextNode",
                    path: "references/document-sandbox/document-apis/classes/text-node.md",
                  },
                  {
                    title: "UnavailableFont",
                    path: "references/document-sandbox/document-apis/classes/unavailable-font.md",
                  },
                  {
                    title: "UnknownNode",
                    path: "references/document-sandbox/document-apis/classes/unknown-node.md",
                  },
                  {
                    title: "Viewport",
                    path: "references/document-sandbox/document-apis/classes/Viewport.md",
                  },
                  {
                    title: "VisualNode",
                    path: "references/document-sandbox/document-apis/classes/visual-node.md",
                  },
                ],
              },
              {
                title: "Interfaces",
                path: "references/document-sandbox/document-apis/interfaces/area-text-layout.md",
                pages: [
                  {
                    title: "AreaTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/area-text-layout.md",
                  },
                  {
                    title: "AutoHeightTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/auto-height-text-layout.md",
                  },
                  {
                    title: "BitmapImage",
                    path: "references/document-sandbox/document-apis/interfaces/bitmap-image.md",
                  },
                  {
                    title: "CharacterStyles",
                    path: "references/document-sandbox/document-apis/interfaces/character-styles.md",
                  },
                  {
                    title: "CharacterStylesInput",
                    path: "references/document-sandbox/document-apis/interfaces/character-styles-input.md",
                  },
                  {
                    title: "CharacterStylesRange",
                    path: "references/document-sandbox/document-apis/interfaces/character-styles-range.md",
                  },
                  {
                    title: "CharacterStylesRangeInput",
                    path: "references/document-sandbox/document-apis/interfaces/character-styles-range-input.md",
                  },
                  {
                    title: "Color",
                    path: "references/document-sandbox/document-apis/interfaces/color.md",
                  },
                  {
                    title: "ColorFill",
                    path: "references/document-sandbox/document-apis/interfaces/color-fill.md",
                  },
                  {
                    title: "ContainerNode",
                    path: "references/document-sandbox/document-apis/interfaces/container-node.md",
                  },
                  {
                    title: "Fill",
                    path: "references/document-sandbox/document-apis/interfaces/fill.md",
                  },
                  // {
                  //   "title": "FillTypeValueExtensibleEnum",
                  //   "path": "references/document-sandbox/document-apis/interfaces/FillTypeValueExtensibleEnum.md",
                  // },
                  {
                    title: "IFillableNode",
                    path: "references/document-sandbox/document-apis/interfaces/i-fillable-node.md",
                  },
                  {
                    title: "IRectangularNode",
                    path: "references/document-sandbox/document-apis/interfaces/i-rectangular-node.md",
                  },
                  {
                    title: "IStrokableNode",
                    path: "references/document-sandbox/document-apis/interfaces/i-strokable-node.md",
                  },
                  {
                    title: "ListItem",
                    path: "references/document-sandbox/document-apis/interfaces/list-item.md",
                  },
                  {
                    title: "Point",
                    path: "references/document-sandbox/document-apis/interfaces/point.md",
                  },
                  {
                    title: "PointTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/point-text-layout.md",
                  },
                  {
                    title: "Rect",
                    path: "references/document-sandbox/document-apis/interfaces/rect.md",
                  },
                  {
                    title: "RectangleGeometry",
                    path: "references/document-sandbox/document-apis/interfaces/rectangle-geometry.md",
                  },
                  {
                    title: "Stroke",
                    path: "references/document-sandbox/document-apis/interfaces/stroke.md",
                  },
                  {
                    title: "StyleRange",
                    path: "references/document-sandbox/document-apis/interfaces/style-range.md",
                  },
                  {
                    title: "UnsupportedTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/unsupported-text-layout.md",
                  },
                ],
              },
              {
                title: "Constants",
                path: "references/document-sandbox/document-apis/enumerations/arrow-head-type.md",
                pages: [
                  {
                    title: "ArrowHeadType",
                    path: "references/document-sandbox/document-apis/enumerations/arrow-head-type.md",
                  },
                  {
                    title: "BlendMode",
                    path: "references/document-sandbox/document-apis/enumerations/blend-mode.md",
                  },
                  {
                    title: "EditorEvent",
                    path: "references/document-sandbox/document-apis/enumerations/editor-event.md",
                  },
                  {
                    title: "FillRule",
                    path: "references/document-sandbox/document-apis/enumerations/fill-rule.md",
                  },
                  {
                    title: "FillType",
                    path: "references/document-sandbox/document-apis/enumerations/fill-type.md",
                  },
                  {
                    title: "SceneNodeType",
                    path: "references/document-sandbox/document-apis/enumerations/scene-node-type.md",
                  },
                  {
                    title: "StrokePosition",
                    path: "references/document-sandbox/document-apis/enumerations/stroke-position.md",
                  },
                  {
                    title: "StrokeType",
                    path: "references/document-sandbox/document-apis/enumerations/stroke-type.md",
                  },
                  {
                    title: "TextAlignment",
                    path: "references/document-sandbox/document-apis/enumerations/text-alignment.md",
                  },
                  {
                    title: "TextType",
                    path: "references/document-sandbox/document-apis/enumerations/text-type.md",
                  },
                  {
                    title: "VisualEffectType",
                    path: "references/document-sandbox/document-apis/enumerations/visual-effect-type.md",
                  },
                ],
              },
              {
                title: "Types",
                path: "references/document-sandbox/document-apis/type-aliases/editor-event-handler.md",
                pages: [
                  {
                    title: "EditorEventHandler",
                    path: "references/document-sandbox/document-apis/type-aliases/editor-event-handler.md",
                  },
                  {
                    title: "EventHandlerId",
                    path: "references/document-sandbox/document-apis/type-aliases/event-handler-id.md",
                  },
                  {
                    title: "Font",
                    path: "references/document-sandbox/document-apis/type-aliases/font.md",
                  },
                  {
                    title: "SolidColorStrokeWithOptionalType",
                    path: "references/document-sandbox/document-apis/type-aliases/solid-color-stroke-with-optional-type.md",
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
        path: "references/manifest/index.md",
      },
      {
        title: "Changelog",
        path: "references/reference-changelog.md",
      },
      {
        title: "Overview",
        path: "guides/",
      },
      {
        title: "Getting started",
        path: "guides/getting-started/index.md",
        pages: [
          {
            title: "Overview",
            path: "guides/getting-started/index.md",
          },
          {
            title: "Quickstart",
            path: "guides/getting-started/quickstart.md",
          },
          {
            title: "Development tools",
            path: "guides/getting-started/dev-tooling.md",
          },
          {
            title: "Code Playground",
            path: "guides/getting-started/code-playground.md",
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
                    path: "guides/tutorials/spectrum-workshop/part1",
                  },
                  {
                    title: "React-based add-on with Spectrum Web Components",
                    path: "guides/tutorials/spectrum-workshop/part2",
                  },
                  {
                    title: "Tips & Troubleshooting",
                    path: "guides/tutorials/spectrum-workshop/part3",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Design",
        path: "guides/design/index.md",
        pages: [
          {
            title: "Overview",
            path: "guides/design/index.md",
          },
          {
            title: "UX Guidelines",
            path: "guides/design/ux-guidelines/introduction.md",
            pages: [
              {
                title: "Introduction",
                path: "guides/design/ux-guidelines/introduction.md",
              },
              {
                title: "Design Principles",
                path: "guides/design/ux-guidelines/design-principles.md",
              },
              {
                title: "Theming",
                path: "guides/design/ux-guidelines/theming.md",
              },
              {
                title: "Visual Elements",
                path: "guides/design/ux-guidelines/visual-elements.md",
              },
              {
                title: "Feedback & Messaging",
                path: "guides/design/ux-guidelines/feedback-and-messaging.md",
              },
              // {
              //   title: "Mobile UX",
              //   path: "guides/design/ux-guidelines/mobile-ux.md",
              // },
              {
                title: "Branding Guidelines & Distribution",
                path: "guides/design/ux-guidelines/branding-guidelines.md",
              },
              {
                title: "Resources & References",
                path: "guides/design/ux-guidelines/resources-and-references.md",
              },
              {
                title: "Changelog",
                path: "guides/design/ux-guidelines/ux-guidelines-changelog.md",
              },
            ],
          },
          {
            title: "Implementation guide",
            path: "guides/design/implementation-guide.md",
          },
          {
            title: "Best practices",
            path: "guides/design/best-practices.md",
          },
        ],
      },
      {
        title: "Develop",
        path: "guides/develop/index.md",
        pages: [
          {
            title: "Overview",
            path: "guides/develop/index.md",
          },
          {
            title: "Common Use Cases",
            path: "guides/develop/use-cases.md",
            pages: [
              {
                title: "Content Management",
                path: "guides/develop/use-cases/content-management.md",
              },
              {
                title: "Authentication and Authorization",
                path: "guides/develop/use-cases/authentication-authorization.md",
              },
              {
                title: "Client-side Data",
                path: "guides/develop/use-cases/clientside-data.md",
              },
              {
                title: "User Interaction",
                path: "guides/develop/use-cases/user-interaction.md",
              },
              {
                title: "Environment Settings",
                path: "guides/develop/use-cases/environment-settings.md",
              },
              {
                title: "Monetization Flows",
                path: "guides/develop/use-cases/monetization-flows.md",
              },
              {
                title: "Content Authoring and Metadata",
                path: "guides/develop/use-cases/content-authoring.md",
              },
            ],
          },
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
      {
        title: "Debug",
        path: "guides/debug/index.md",
        pages: [
          {
            title: "Overview",
            path: "guides/debug/index.md",
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
        path: "guides/distribute/index.md",
        pages: [
          {
            title: "Overview",
            path: "guides/distribute/index.md",
          },
          {
            title: "Our review process",
            path: "guides/distribute/review-process/",
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
                    path: "guides/distribute/guidelines/general/user-interface.md",
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
                    path: "guides/distribute/guidelines/general/edge-case.md",
                  },
                ],
              },
              {
                title: "Developer brand guidelines",
                path: "guides/distribute/guidelines/brand-guidelines.md",
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
