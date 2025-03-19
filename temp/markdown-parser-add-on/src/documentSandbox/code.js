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
import { editor, fonts } from "express-document-sdk";

// Get the Authoring Sandbox.
const { runtime } = addOnSandboxSdk.instance;

let gridRef = null;

function start() {
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

        // Position in the center of the page
        const artboard = page.artboards.first;
        textNode.setPositionInParent(
          { x: artboard.width / 2, y: artboard.height / 3 },
          { x: 0.5, y: 0 }
        );
        textNode.fullContent.applyCharacterStyles({
          fontSize: 24,
        });
        // Add to document
        artboard.children.append(textNode);
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
        // Create a text node with the content
        console.log("About to create text node");
        const textNode = docApi.createTextNode(markdownText);

        // Apply each style range to the appropriate part of the text
        if (styleRanges && styleRanges.length > 0) {
          for (const range of styleRanges) {
            if (range.style.type === "heading") {
              // Apply heading styles (font size and weight)
              await docApi.applyHeadingStyle(
                textNode,
                range.start,
                range.end,
                range.style.level
              );
              console.log("DONE with heading style");
            } else if (range.style.type === "emphasis") {
              // Apply italic
              docApi.applyEmphasisStyle(textNode, range.start, range.end);
            } else if (range.style.type === "strong") {
              // Apply bold
              docApi.applyStrongStyle(textNode, range.start, range.end);
            } else if (range.style.type === "list") {
              // Apply list style
              docApi.applyListStyle(
                textNode,
                range.start,
                range.end,
                range.style.ordered
              );
            }
            // Add more style types as needed
          }
        }
        return textNode;
      } catch (error) {
        console.error("Error creating styled text from markdown:", error);
        throw error;
      }
    },

    /**
     * Apply heading styles to a text range
     * @param {TextNode} textNode - The text node
     * @param {number} start - Start index
     * @param {number} end - End index
     * @param {number} level - Heading level (1-6)
     */
    applyHeadingStyle: async (textNode, start, end, level) => {
      console.log("Applying heading style", textNode, start, end, level);
      try {
        // Get font size based on heading level
        let fontSize;
        switch (level) {
          case 1:
            fontSize = 32;
            break;
          case 2:
            fontSize = 28;
            break;
          case 3:
            fontSize = 24;
            break;
          case 4:
            fontSize = 20;
            break;
          case 5:
            fontSize = 18;
            break;
          case 6:
            fontSize = 16;
            break;
          default:
            fontSize = 16;
        }
        const font = await fonts.fromPostscriptName("SourceSans3-Bold");
        // Apply character styles for the heading
        editor.queueAsyncEdit(() => {
          textNode.fullContent.applyCharacterStyles(
            {
              font,
              fontSize,
            },
            { start, length: end - start }
          );
          // Apply paragraph styles for spacing if needed
          // textNode.fullContent.applyParagraphStyles(
          //   {
          //     spaceBefore: 12,
          //     spaceAfter: 8,
          //   },
          //   { start, length: end - start }
          // );
        });
      } catch (error) {
        console.error("Error applying heading style:", error);
        throw error;
      }
    },

    /**
     * Apply emphasis (italic) style to a text range
     * @param {TextNode} textNode - The text node
     * @param {number} start - Start index
     * @param {number} end - End index
     */
    applyEmphasisStyle: (textNode, start, end) => {
      try {
        // Apply italic
        textNode.fullContent.applyCharacterStyles(
          {
            fontStyle: "italic",
          },
          { start, length: end - start }
        );
      } catch (error) {
        console.error("Error applying emphasis style:", error);
        throw error;
      }
    },

    /**
     * Apply strong (bold) style to a text range
     * @param {TextNode} textNode - The text node
     * @param {number} start - Start index
     * @param {number} end - End index
     */
    applyStrongStyle: (textNode, start, end) => {
      try {
        // For bold, we need to use a bold font variant
        // Since we can't directly set fontWeight, we apply a style that makes it visually bold
        textNode.fullContent.applyCharacterStyles(
          {
            fontSize:
              textNode.fullContent.characterStyleRanges[0].fontSize * 1.05,
            // Ideally we would use a bold font here
          },
          { start, length: end - start }
        );
      } catch (error) {
        console.error("Error applying strong style:", error);
        throw error;
      }
    },

    /**
     * Apply list style to a text range
     * @param {TextNode} textNode - The text node
     * @param {number} start - Start index
     * @param {number} end - End index
     * @param {boolean} ordered - Whether the list is ordered
     */
    applyListStyle: (textNode, start, end, ordered) => {
      try {
        // Apply list paragraph style
        const listType = ordered ? "ordered" : "unordered";

        // textNode.fullContent.applyParagraphStyles(
        //   {
        //     // This is not currently supported in the base SDK
        //     // A full implementation would use the constants.ParagraphListType.ordered/unordered
        //     // And set other list properties
        //     spaceBefore: 4,
        //     spaceAfter: 4,
        //   },
        //   { start, length: end - start }
        // );
      } catch (error) {
        console.error("Error applying list style:", error);
        throw error;
      }
    },
  };

  runtime.exposeApi(docApi);
}

start();
