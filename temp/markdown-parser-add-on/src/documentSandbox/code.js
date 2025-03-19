/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, fonts, constants } from "express-document-sdk";

// Get the Authoring Sandbox.
const { runtime } = addOnSandboxSdk.instance;

function getFontSizeForHeadingLevel(level) {
  const sizes = { 1: 24, 2: 22, 3: 20, 4: 18, 5: 16, 6: 16 };
  return sizes[level] || 16;
}

function start() {
  const fontCache = new Map();

  async function preloadFonts(postscriptNames) {
    await Promise.all(
      postscriptNames.map(async (psName) => {
        const font = await fonts.fromPostscriptName(psName);
        if (font) {
          fontCache.set(psName, font);
        } else {
          console.warn(`Font ${psName} couldn't be loaded.`);
        }
      })
    );
  }

  // APIs to be exposed to the UI runtime
  const docApi = {
    /**
     * Create a text node with the given text
     * @param {string} text - The text content
     * @returns {TextNode} The created text node
     */
    createTextNode: (text) => {
      try {
        let currentNode = editor.context.insertionParent;
        let page = null;

        while (currentNode) {
          if (currentNode.type === "Page") {
            page = currentNode;
            break;
          }
          currentNode = currentNode.parent;
        }

        // Create a new text node
        const textNode = editor.createText();

        // Set the text content
        textNode.fullContent.text = text;
        textNode.textAlignment = constants.TextAlignment.left;
        const artboard = page.artboards.first;
        textNode.layout = {
          type: constants.TextType.autoHeight,
          width: artboard.width - 40,
        };

        // Position the text at the top-left corner and fill the page width
        textNode.setPositionInParent({ x: 20, y: 20 }, { x: 0, y: 0 });

        textNode.fullContent.applyCharacterStyles({
          fontSize: 16,
        });
        // Add to document
        artboard.children.append(textNode);
        console.log("textNode", textNode);
        return textNode;
      } catch (error) {
        console.error("Error creating text node:", error);
        throw error;
      }
    },

    /**
     * Create a styled text node from markdown content
     * @param {string} markdownText - The plain text (already extracted from markdown)
     * @param {Array} styleRanges - Style ranges to apply
     * @returns {TextNode} The created and styled text node
     */
    createStyledTextFromMarkdown: async (markdownText, styleRanges) => {
      try {
        // Create text node first (this is allowed synchronously)
        const textNode = docApi.createTextNode(markdownText);

        await preloadFonts([
          "SourceSans3-Bold",
          "SourceSans3-It",
          "SourceSans3-Regular",
          "AnonymousPro",
        ]);

        // All fonts are already cached
        const headingFont = fontCache.get("SourceSans3-Bold");
        const italicFont = fontCache.get("SourceSans3-It");
        const boldFont = fontCache.get("SourceSans3-Bold");
        const monospaceFont = fontCache.get("AnonymousPro");

        // Now queue all style edits together
        await editor.queueAsyncEdit(async () => {
          for (const range of styleRanges) {
            console.log(
              "Applying style:",
              range.style.type,
              "from",
              range.start,
              "to",
              range.end
            );
            if (range.style.type === "list") {
              docApi.applyListStyle(
                textNode,
                range.start,
                range.end,
                range.style.ordered
              );
            } else if (range.style.type === "heading") {
              console.log(
                "Applying heading style for level:",
                range.style.level
              );
              // You have the font already, now apply synchronously inside queue
              textNode.fullContent.applyCharacterStyles(
                {
                  font: headingFont,
                  fontSize: getFontSizeForHeadingLevel(range.style.level),
                },
                { start: range.start, length: range.end - range.start }
              );
              console.log("Applied heading style:", range.style.level);
            } else if (range.style.type === "emphasis") {
              console.log("Applying emphasis style");
              textNode.fullContent.applyCharacterStyles(
                { font: italicFont },
                { start: range.start, length: range.end - range.start }
              );
              console.log("Applied emphasis style");
            } else if (range.style.type === "strong") {
              console.log("Applying strong style");
              textNode.fullContent.applyCharacterStyles(
                { font: boldFont },
                { start: range.start, length: range.end - range.start }
              );
              console.log("Applied strong style");
            } else if (range.style.type === "code") {
              console.log("Applying code style");
              textNode.fullContent.applyCharacterStyles(
                { font: monospaceFont },
                { start: range.start, length: range.end - range.start }
              );
              console.log("Applied code style");
            }
            // Add any additional styles here...
          }
          console.log("All styles applied");
        });

        // return textNode;
      } catch (error) {
        console.error("Error creating styled text from markdown:", error);
        throw error;
      }
    },

    /**
     * Apply ordered/unordered list styles to a paragraph range.
     * @param {TextNode} textNode - The text node
     * @param {number} start - Start index
     * @param {number} end - End index
     * @param {boolean} ordered - Ordered (true) or Unordered (false)
     */
    applyListStyle: (textNode, start, end, ordered) => {
      try {
        const listType = ordered
          ? constants.ParagraphListType.ordered
          : constants.ParagraphListType.unordered;

        let listStyle = {
          list: {
            type: listType,
            numbering: ordered
              ? constants.OrderedListNumbering.numeric // You can customize numbering
              : undefined,
            prefix: ordered ? "" : "•", // Customize bullet
            postfix: ordered ? "." : "",
            indentLevel: 0, // adjust as needed
          },
          spaceBefore: 8, // adjust spacing as desired
          spaceAfter: 4,
          lineSpacing: 1.5,
        };
        textNode.fullContent.applyParagraphStyles(
          {
            list: {
              type: listType,
              numbering: ordered
                ? constants.OrderedListNumbering.numeric // You can customize numbering
                : undefined,
              prefix: ordered ? "" : "•", // Customize bullet
              postfix: ordered ? "." : "",
              indentLevel: 0, // adjust as needed
            },
            spaceBefore: 8, // adjust spacing as desired
            spaceAfter: 4,
            lineSpacing: 1.5,
          },
          {
            start,
            length: end - start,
          }
        );
      } catch (error) {
        console.error("Error applying list style:", error);
        throw error;
      }
    },
  };

  runtime.exposeApi(docApi);
}

start();
