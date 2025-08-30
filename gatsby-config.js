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
        path: "guides/index.md",
      },
      {
        title: "SDK References",
        path: "references/index.md",
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
                    title: "MediaRectangleNode",
                    path: "references/document-sandbox/document-apis/classes/media-rectangle-node.md",
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
                    title: "StandaloneTextNode",
                    path: "references/document-sandbox/document-apis/classes/standalone-text-node.md",
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
                    title: "ThreadedTextNode",
                    path: "references/document-sandbox/document-apis/classes/threaded-text-node.md",
                  },
                  {
                    title: "UnavailableFont",
                    path: "references/document-sandbox/document-apis/classes/unavailable-font.md",
                  },
                  {
                    title: "UnknownMediaRectangleNode",
                    path: "references/document-sandbox/document-apis/classes/unknown-media-rectangle-node.md",
                  },
                  {
                    title: "UnknownNode",
                    path: "references/document-sandbox/document-apis/classes/unknown-node.md",
                  },
                  {
                    title: "Viewport",
                    path: "references/document-sandbox/document-apis/classes/viewport.md",
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
                    title: "AutoWidthTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/auto-width-text-layout.md",
                  },
                  {
                    title: "BaseParagraphStyles",
                    path: "references/document-sandbox/document-apis/interfaces/base-paragraph-styles.md",
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
                    title: "OrderedListStyleInput",
                    path: "references/document-sandbox/document-apis/interfaces/ordered-list-style-input.md",
                  },
                  {
                    title: "ParagraphStyles",
                    path: "references/document-sandbox/document-apis/interfaces/paragraph-styles.md",
                  },
                  {
                    title: "ParagraphStylesInput",
                    path: "references/document-sandbox/document-apis/interfaces/paragraph-styles-input.md",
                  },
                  {
                    title: "ParagraphStylesRange",
                    path: "references/document-sandbox/document-apis/interfaces/paragraph-styles-range.md",
                  },
                  {
                    title: "ParagraphStylesRangeInput",
                    path: "references/document-sandbox/document-apis/interfaces/paragraph-styles-range-input.md",
                  },
                  {
                    title: "Point",
                    path: "references/document-sandbox/document-apis/interfaces/Point.md",
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
                    title: "TextRange",
                    path: "references/document-sandbox/document-apis/interfaces/text-range.md",
                  },
                  {
                    title: "UnorderedListStyleInput",
                    path: "references/document-sandbox/document-apis/interfaces/unordered-list-style-input.md",
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
                    title: "OrderedListNumbering",
                    path: "references/document-sandbox/document-apis/namespaces/constants/enumerations/ordered-list-numbering.md",
                  },
                  {
                    title: "ParagraphListType",
                    path: "references/document-sandbox/document-apis/namespaces/constants/enumerations/paragraph-list-type.md",
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
                    title: "TextLayout",
                    path: "references/document-sandbox/document-apis/enumerations/text-layout.md",
                  },
                  {
                    title: "TextScriptStyle",
                    path: "references/document-sandbox/document-apis/enumerations/text-script-style.md",
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
                    title: "OrderedListStyle",
                    path: "references/document-sandbox/document-apis/type-aliases/ordered-list-style.md",
                  },
                  {
                    title: "SolidColorStrokeWithOptionalType",
                    path: "references/document-sandbox/document-apis/type-aliases/solid-color-stroke-with-optional-type.md",
                  },
                  {
                    title: "UnorderedListStyle",
                    path: "references/document-sandbox/document-apis/type-aliases/unordered-list-style.md",
                  },
                ],
              },
            ],
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
      {
        title: "Changelog",
        description: "Changelog",
        path: "references/changelog.md",
      },
      {
        title: "Getting Started",
        path: "guides/index.md",
        header: true,
        pages: [
          {
            title: "Overview",
            path: "guides/index.md",
          },
          {
            title: "Developer Journey",
            path: "guides/getting-started/developer-journey.md",
          },
          {
            title: "Hello, World!",
            path: "guides/getting-started/hello-world.md",
          },
          {
            title: "Code Playground",
            path: "guides/getting-started/code-playground.md",
          },
          {
            title: "Local Development",
            path: "guides/getting-started/local-development/dev-tooling.md",
            pages: [
              {
                title: "Development tools",
                path: "guides/getting-started/local-development/dev-tooling.md",
              },
              {
                title: "Browser debugging",
                path: "guides/getting-started/local-development/browser.md",
              },
              {
                title: "VS Code debugging",
                path: "guides/getting-started/local-development/vs-code.md",
              },
            ],
          },
          {
            title: "What's new",
            path: "guides/getting-started/changelog.md",
          },
        ],
      },
      {
        title: "Learn",
        path: "guides/learn/how-to/index.md",
        header: true,
        pages: [
          {
            title: "How-to",
            path: "guides/learn/how-to/index.md",
            pages: [
              {
                title: "About",
                path: "guides/learn/how-to/index.md",
              },
              {
                title: "Authentication & Authorization",
                path: "guides/learn/how-to/oauth2.md",
                pages: [
                  {
                    title: "Use OAuth 2.0",
                    path: "guides/learn/how-to/oauth2.md",
                  },
                ],
              },
              {
                title: "Data & Environment",
                path: "guides/learn/how-to/local-data-management.md",
                pages: [
                  {
                    title: "Store Data",
                    path: "guides/learn/how-to/local-data-management.md",
                  },
                  {
                    title: "Theme & Locale",
                    path: "guides/learn/how-to/theme-locale.md",
                  },
                ],
              },
              {
                title: "UI & Interaction",
                path: "guides/learn/how-to/drag-and-drop.md",
                pages: [
                  {
                    title: "Use Drag & Drop",
                    path: "guides/learn/how-to/drag-and-drop.md",
                  },
                  {
                    title: "Use Modal Dialogs",
                    path: "guides/learn/how-to/modal-dialogs.md",
                  },
                ],
              },
              {
                title: "Use Design Elements",
                path: "guides/learn/how-to/use-text.md",
                pages: [
                  {
                    title: "Use Text",
                    path: "guides/learn/how-to/use-text.md",
                  },
                  {
                    title: "Use Geometry",
                    path: "guides/learn/how-to/use-geometry.md",
                  },
                  {
                    title: "Use Color",
                    path: "guides/learn/how-to/use-color.md",
                  },
                  {
                    title: "Use Images",
                    path: "guides/learn/how-to/use-images.md",
                  },
                  {
                    title: "Use Videos",
                    path: "guides/learn/how-to/use-videos.md",
                  },
                  {
                    title: "Use Audio",
                    path: "guides/learn/how-to/use-audio.md",
                  },
                  {
                    title: "Use PDF and PowerPoint",
                    path: "guides/learn/how-to/use-pdf-powerpoint.md",
                  },
                  {
                    title: "Group Elements",
                    path: "guides/learn/how-to/group-elements.md",
                  },
                  {
                    title: "Resize & Rescale Elements",
                    path: "guides/learn/how-to/resize-rescale-elements.md",
                  },
                  {
                    title: "Position Elements",
                    path: "guides/learn/how-to/position-elements.md",
                  },
                ],
              },
              {
                title: "Use Metadata",
                path: "guides/learn/how-to/document-metadata.md",
                pages: [
                  {
                    title: "Document",
                    path: "guides/learn/how-to/document-metadata.md",
                  },
                  {
                    title: "Page",
                    path: "guides/learn/how-to/page-metadata.md",
                  },
                  {
                    title: "Element",
                    path: "guides/learn/how-to/element-metadata.md",
                  },
                ],
              },
              {
                title: "Exporting & Output",
                path: "guides/learn/how-to/create-renditions.md",
                pages: [
                  {
                    title: "Create Renditions",
                    path: "guides/learn/how-to/create-renditions.md",
                  },
                  {
                    title: "Manage Premium Content",
                    path: "guides/learn/how-to/premium-content.md",
                  },
                ],
              },
              {
                title: "User Info",
                path: "guides/learn/how-to/user-info.md",
                pages: [
                  {
                    title: "Identify users",
                    path: "guides/learn/how-to/user-info.md",
                  },
                ],
              },
              {
                title: "Complete Projects",
                path: "guides/learn/how-to/tutorials/index.md",
                pages: [
                  {
                    title: "Document APIs",
                    path: "guides/learn/how-to/tutorials/grids-addon.md",
                  },
                  {
                    title: "Communication APIs",
                    path: "guides/learn/how-to/tutorials/stats-addon.md",
                  },
                  {
                    title: "Using Adobe Spectrum",
                    path: "guides/learn/how_to/tutorials/spectrum-workshop/",
                    pages: [
                      {
                        title:
                          "Basic JavaScript add-on with Spectrum Web Components",
                        path: "guides/learn/how_to/tutorials/spectrum-workshop/part1/",
                      },
                      {
                        title:
                          "React-based add-on with Spectrum Web Components",
                        path: "guides/learn/how_to/tutorials/spectrum-workshop/part2/",
                      },
                      {
                        title: "Tips & Troubleshooting",
                        path: "guides/learn/how_to/tutorials/spectrum-workshop/part3/",
                      },
                    ],
                  },
                  {
                    title: "Using Lit & TypeScript",
                    path: "guides/learn/how-to/tutorials/using-lit-typescript.md",
                  },
                ],
              },
            ],
          },
          {
            title: "Platform Concepts",
            path: "guides/learn/platform-concepts/context.md",
            pages: [
              {
                title: "Add-on Iframe Context",
                path: "guides/learn/platform_concepts/context.md",
              },
              {
                title: "The Document API",
                path: "guides/learn/platform-concepts/document-api.md",
              },
            ],
          },
          {
            title: "Sample add-ons",
            path: "guides/learn/samples.md",
          },
        ],
      },
      {
        title: "Build",
        path: "guides/build/advanced-topics/frameworks-libraries-bundling.md",
        header: true,
        pages: [
          {
            title: "Advanced Topics",
            path: "guides/build/advanced-topics/frameworks-libraries-bundling.md",
            pages: [
              {
                title: "Frameworks, Libraries and Bundling",
                path: "guides/build/advanced-topics/frameworks-libraries-bundling.md",
              },
              {
                title: "Cross-origin Isolation Handling",
                path: "guides/build/advanced-topics/coi.md",
              },
              {
                title: "Performance Tips",
                path: "guides/build/advanced-topics/performance.md",
              },
            ],
          },
          {
            title: "Design",
            path: "guides/build/design/index.md",
            pages: [
              {
                title: "Overview",
                path: "guides/build/design/index.md",
              },
              {
                title: "UX Guidelines",
                path: "guides/build/design/ux-guidelines/introduction.md",
                pages: [
                  {
                    title: "Introduction",
                    path: "guides/build/design/ux-guidelines/introduction.md",
                  },
                  {
                    title: "Design Principles",
                    path: "guides/build/design/ux-guidelines/design-principles.md",
                  },
                  {
                    title: "Theming",
                    path: "guides/build/design/ux-guidelines/theming.md",
                  },
                  {
                    title: "Visual Elements",
                    path: "guides/build/design/ux-guidelines/visual-elements.md",
                  },
                  {
                    title: "Feedback & Messaging",
                    path: "guides/build/design/ux-guidelines/feedback-and-messaging.md",
                  },
                  // {
                  //   title: "Mobile UX",
                  //   path: "guides/build/design/ux-guidelines/mobile-ux.md",
                  // },
                  {
                    title: "Branding Guidelines & Distribution",
                    path: "guides/build/design/ux-guidelines/branding-guidelines.md",
                  },
                  {
                    title: "Resources & References",
                    path: "guides/build/design/ux-guidelines/resources-and-references.md",
                  },
                  {
                    title: "Changelog",
                    path: "guides/build/design/ux-guidelines/changelog.md",
                  },
                ],
              },
              {
                title: "Implementation guide",
                path: "guides/build/design/implementation-guide.md",
              },
              {
                title: "Best practices",
                path: "guides/build/design/best_practices.md",
              },
            ],
          },
          {
            title: "Distribute",
            path: "guides/build/distribute/index.md",
            pages: [
              {
                title: "Overview",
                path: "guides/build/distribute/",
              },
              {
                title: "Our review process",
                path: "guides/build/distribute/review_process/",
              },
              {
                title: "Creating a private link",
                path: "guides/build/distribute/private-dist.md",
              },
              {
                title: "Creating a public listing",
                path: "guides/build/distribute/public-dist.md",
              },
              {
                title: "Guidelines and requirements",
                path: "guides/build/distribute/guidelines",
                pages: [
                  {
                    title: "General guidelines",
                    path: "guides/build/distribute/guidelines/general/",
                    pages: [
                      {
                        title: "Your listing metadata",
                        path: "guides/build/distribute/guidelines/general/listing.md",
                      },
                      {
                        title: "Content",
                        path: "guides/build/distribute/guidelines/general/content.md",
                      },
                      {
                        title: "User interface",
                        path: "guides/build/distribute/guidelines/general/user-interface.md",
                      },
                      {
                        title: "Performance",
                        path: "guides/build/distribute/guidelines/general/performance.md",
                      },
                      {
                        title: "Usability",
                        path: "guides/build/distribute/guidelines/general/usability.md",
                      },
                      {
                        title: "Security",
                        path: "guides/build/distribute/guidelines/general/security.md",
                      },
                      {
                        title: "Features",
                        path: "guides/build/distribute/guidelines/general/features.md",
                      },
                      {
                        title: "Authenticating users",
                        path: "guides/build/distribute/guidelines/general/auth.md",
                      },
                      {
                        title: "Accessibility",
                        path: "guides/build/distribute/guidelines/general/accessibility.md",
                      },
                      {
                        title: "Compatibility",
                        path: "guides/build/distribute/guidelines/general/compatibility.md",
                      },
                      {
                        title: "Edge cases",
                        path: "guides/build/distribute/guidelines/general/edge-case.md",
                      },
                    ],
                  },
                  {
                    title: "Developer brand guidelines",
                    path: "guides/build/distribute/guidelines/brand-guidelines.md",
                  },
                  {
                    title: "Monetization guidelines",
                    path: "guides/build/distribute/guidelines/monetization.md",
                  },

                  {
                    title: "Generative AI guidelines",
                    path: "guides/build/distribute/guidelines/genai/",
                    pages: [
                      {
                        title: "Overview",
                        path: "guides/build/distribute/guidelines/genai/",
                      },
                      {
                        title: "Requirements",
                        path: "guides/build/distribute/guidelines/genai/requirements",
                      },
                      {
                        title: "Recommendations",
                        path: "guides/build/distribute/guidelines/genai/recommendations",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Rejections",
                path: "guides/build/distribute/rejections.md",
              },
            ],
          },
        ],
      },
      {
        title: "Support",
        path: "guides/support/faq.md",
        header: true,
        pages: [
          {
            title: "FAQs",
            path: "guides/support/faq.md",
          },
          {
            title: "Community Resources",
            path: "https://developer.adobe.com/express/community",
          },
        ],
      },

      // {
      //   title: "Troubleshoot",
      //   path: "resources/faq.md",
      //   pages: [
      //     {
      //       title: "FAQs",
      //       path: "resources/faq.md",
      //     },
      //   ],
      // },
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`],
};
