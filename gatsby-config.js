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
                    title: "BitmapImage",
                    path: "references/document-sandbox/document-apis/classes/BitmapImage.md",
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
                    title: "ExpressContext",
                    path: "references/document-sandbox/document-apis/classes/ExpressContext.md",
                  },
                  {
                    title: "ExpressEditor",
                    path: "references/document-sandbox/document-apis/classes/ExpressEditor.md",
                  },
                  {
                    title: "ExpressRootNode",
                    path: "references/document-sandbox/document-apis/classes/ExpressRootNode.md",
                  },
                  {
                    title: "ExpressViewport",
                    path: "references/document-sandbox/document-apis/classes/ExpressViewport.md",
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
                    title: "MediaRectangleNode",
                    path: "references/document-sandbox/document-apis/classes/MediaRectangleNode.md",
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
                    title: "StandaloneTextContentModel",
                    path: "references/document-sandbox/document-apis/classes/StandaloneTextContentModel.md",
                  },
                  {
                    title: "StandaloneTextNode",
                    path: "references/document-sandbox/document-apis/classes/StandaloneTextNode.md",
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
                    title: "TextNodeContentModel",
                    path: "references/document-sandbox/document-apis/classes/TextNodeContentModel.md",
                  },
                  {
                    title: "ThreadedTextContentModel",
                    path: "references/document-sandbox/document-apis/classes/ThreadedTextContentModel.md",
                  },
                  {
                    title: "ThreadedTextNode",
                    path: "references/document-sandbox/document-apis/classes/ThreadedTextNode.md",
                  },
                  {
                    title: "UnavailableFont",
                    path: "references/document-sandbox/document-apis/classes/UnavailableFont.md",
                  },
                  {
                    title: "UnknownMediaRectangleNode",
                    path: "references/document-sandbox/document-apis/classes/UnknownMediaRectangleNode.md",
                  },
                  {
                    title: "UnknownNode",
                    path: "references/document-sandbox/document-apis/classes/UnknownNode.md",
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
                    title: "AutoWidthTextLayout",
                    path: "references/document-sandbox/document-apis/interfaces/AutoWidthTextLayout.md",
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
                    title: "TextLayout",
                    path: "references/document-sandbox/document-apis/enumerations/TextLayout.md",
                  },
                  {
                    title: "TextScriptStyle",
                    path: "references/document-sandbox/document-apis/enumerations/TextScriptStyle.md",
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
            path: "guides/getting_started/developer-journey.md",
          },
          {
            title: "Hello, World!",
            path: "guides/getting_started/hello-world.md",
          },
          {
            title: "Project Anatomy",
            path: "guides/getting_started/addon-project-anatomy.md",
          },
          {
            title: "Code Playground",
            path: "guides/getting_started/code-playground.md",
            pages: [
              {
                title: "Overview",
                path: "guides/getting_started/code-playground.md",
              },
              {
                title: "Script Mode",
                path: "guides/getting_started/code-playground-script-mode.md",
              },
              {
                title: "Add-on Mode",
                path: "guides/getting_started/code-playground-addon-mode.md",
              },
              {
                title: "Workflow & Productivity",
                path: "guides/getting_started/code-playground-workflow.md",
              },
              {
                title: "Troubleshooting",
                path: "guides/getting_started/code-playground-troubleshooting.md",
              },
            ],
          },
          {
            title: "Dev MCP Server",
            path: "guides/getting_started/local_development/mcp_server.md",
          },
          {
            title: "Local Development",
            path: "guides/getting_started/local_development/dev_tooling.md",
            pages: [
              {
                title: "Development tools",
                path: "guides/getting_started/local_development/dev_tooling.md",
              },
              {
                title: "Browser debugging",
                path: "guides/getting_started/local_development/browser.md",
              },
              {
                title: "VS Code debugging",
                path: "guides/getting_started/local_development/vs-code.md",
              },
              {
                title: "Known Issues & Limitations",
                path: "guides/getting_started/local_development/known_issues_limitations.md",
              },
            ],
          },
          {
            title: "What's new",
            path: "guides/getting_started/changelog.md",
          },
        ],
      },
      {
        title: "Learn",
        path: "guides/learn/how_to/index.md",
        header: true,
        pages: [
          {
            title: "How-to",
            path: "guides/learn/how_to/index.md",
            pages: [
              {
                title: "About",
                path: "guides/learn/how_to/index.md",
              },
              {
                title: "Authentication & Authorization",
                path: "guides/learn/how_to/oauth2.md",
                pages: [
                  {
                    title: "Use OAuth 2.0",
                    path: "guides/learn/how_to/oauth2.md",
                  },
                ],
              },
              {
                title: "Data & Environment",
                path: "guides/learn/how_to/local_data_management.md",
                pages: [
                  {
                    title: "Store Data",
                    path: "guides/learn/how_to/local_data_management.md",
                  },
                  {
                    title: "Theme & Locale",
                    path: "guides/learn/how_to/theme_locale.md",
                  },
                ],
              },
              {
                title: "UI & Interaction",
                path: "guides/learn/how_to/drag_and_drop.md",
                pages: [
                  {
                    title: "Use Drag & Drop",
                    path: "guides/learn/how_to/drag_and_drop.md",
                  },
                  {
                    title: "Use Modal Dialogs",
                    path: "guides/learn/how_to/modal_dialogs.md",
                  },
                ],
              },
              {
                title: "Document Structure",
                path: "guides/learn/how_to/manage_pages.md",
                pages: [
                  {
                    title: "Manage Pages",
                    path: "guides/learn/how_to/manage_pages.md",
                  },
                ],
              },
              {
                title: "Use Design Elements",
                path: "guides/learn/how_to/use_text.md", // change this!!
                pages: [
                  {
                    title: "Use Text",
                    path: "guides/learn/how_to/use_text.md",
                  },
                  {
                    title: "Use Geometry",
                    path: "guides/learn/how_to/use_geometry.md",
                  },
                  {
                    title: "Use Color",
                    path: "guides/learn/how_to/use_color.md",
                  },
                  {
                    title: "Use Images",
                    path: "guides/learn/how_to/use_images.md",
                  },
                  {
                    title: "Use Videos",
                    path: "guides/learn/how_to/use_videos.md",
                  },
                  {
                    title: "Use Audio",
                    path: "guides/learn/how_to/use_audio.md",
                  },
                  {
                    title: "Use PDF and PowerPoint",
                    path: "guides/learn/how_to/use_pdf_powerpoint.md",
                  },
                  {
                    title: "Handle Element Selection",
                    path: "guides/learn/how_to/handle_selection.md",
                  },
                  {
                    title: "Group Elements",
                    path: "guides/learn/how_to/group_elements.md",
                  },
                  {
                    title: "Resize & Rescale Elements",
                    path: "guides/learn/how_to/resize_rescale_elements.md",
                  },
                  {
                    title: "Position Elements",
                    path: "guides/learn/how_to/position_elements.md",
                  },
                ],
              },
              {
                title: "Use Metadata",
                path: "guides/learn/how_to/document_metadata.md",
                pages: [
                  {
                    title: "Document",
                    path: "guides/learn/how_to/document_metadata.md",
                  },
                  {
                    title: "Page",
                    path: "guides/learn/how_to/page_metadata.md",
                  },
                  {
                    title: "Element",
                    path: "guides/learn/how_to/element_metadata.md",
                  },
                ],
              },
              {
                title: "Exporting & Output",
                path: "guides/learn/how_to/create_renditions.md",
                pages: [
                  {
                    title: "Create Renditions",
                    path: "guides/learn/how_to/create_renditions.md",
                  },
                  {
                    title: "Manage Premium Content",
                    path: "guides/learn/how_to/premium_content.md",
                  },
                ],
              },
              {
                title: "User Info",
                path: "guides/learn/how_to/user_info.md",
                pages: [
                  {
                    title: "Identify users",
                    path: "guides/learn/how_to/user_info.md",
                  },
                ],
              },
              {
                title: "Complete Projects",
                path: "guides/learn/how_to/tutorials/index.md",
                pages: [
                  {
                    title: "Document APIs",
                    path: "guides/learn/how_to/tutorials/grids-addon",
                  },
                  {
                    title: "Communication APIs",
                    path: "guides/learn/how_to/tutorials/stats-addon",
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
                    path: "guides/learn/how_to/tutorials/using-lit-typescript.md",
                  },
                ],
              },
            ],
          },
          {
            title: "Platform Concepts",
            path: "guides/learn/platform_concepts/architecture.md",
            pages: [
              {
                title: "Add-on Architecture",
                path: "guides/learn/platform_concepts/architecture.md",
              },
              {
                title: "iframe Runtime Context & Security",
                path: "guides/learn/platform_concepts/context.md",
              },
              {
                title: "The Document API",
                path: "guides/learn/platform_concepts/document-api.md",
              },
            ],
          },
          {
            title: "SDK Fundamentals",
            path: "guides/learn/fundamentals/terminology.md",
            pages: [
              {
                title: "Terminology",
                path: "guides/learn/fundamentals/terminology.md",
              },
              {
                title: "Use Add-on UI SDK Constants",
                path: "guides/learn/fundamentals/ui-sdk-constants.md",
              },
              {
                title: "Use Document Sandbox Constants",
                path: "guides/learn/fundamentals/document-sandbox-constants.md",
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
                path: "guides/build/design/ux_guidelines/introduction.md",
                pages: [
                  {
                    title: "Introduction",
                    path: "guides/build/design/ux_guidelines/introduction.md",
                  },
                  {
                    title: "Design Principles",
                    path: "guides/build/design/ux_guidelines/design_principles.md",
                  },
                  {
                    title: "Theming",
                    path: "guides/build/design/ux_guidelines/theming.md",
                  },
                  {
                    title: "Visual Elements",
                    path: "guides/build/design/ux_guidelines/visual_elements.md",
                  },
                  {
                    title: "Feedback & Messaging",
                    path: "guides/build/design/ux_guidelines/feedback_and_messaging.md",
                  },
                  // {
                  //   title: "Mobile UX",
                  //   path: "guides/build/design/ux_guidelines/mobile_ux.md",
                  // },
                  {
                    title: "Branding Guidelines & Distribution",
                    path: "guides/build/design/ux_guidelines/branding_guidelines.md",
                  },
                  {
                    title: "Resources & References",
                    path: "guides/build/design/ux_guidelines/resources_and_references.md",
                  },
                  {
                    title: "Changelog",
                    path: "guides/build/design/ux_guidelines/changelog.md",
                  },
                ],
              },
              {
                title: "Implementation guide",
                path: "guides/build/design/implementation_guide.md",
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
                        path: "guides/build/distribute/guidelines/general/user_interface.md",
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
                        path: "guides/build/distribute/guidelines/general/edge_case.md",
                      },
                    ],
                  },
                  {
                    title: "Developer brand guidelines",
                    path: "guides/build/distribute/guidelines/brand_guidelines.md",
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
