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

import { toString } from "mdast-util-to-string";
import { getFormattedText } from "./markdown-parser.js";

/**
 * Extracts the full plain text from a markdown AST
 * @param {object} ast - A markdown AST
 * @returns {string} The plain text
 */
export function extractTextFromAst(ast) {
  return toString(ast);
}

/**
 * Creates a mapping of text ranges and their styling commands for Adobe Express
 * @param {object} ast - The root AST node
 * @param {Array} styleRanges - Array to collect style ranges
 */
function processNodeForStyling(ast, styleRanges) {
  let offset = 0;

  const traverse = (node) => {
    if (!node) return;

    if (node.type === "text") {
      offset += node.value.length;
      return;
    }

    const startOffset = offset;

    if (node.children) {
      node.children.forEach(traverse);
    }

    const endOffset = offset;

    switch (node.type) {
      case "heading":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "heading", level: node.depth },
        });
        break;
      case "strong":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "strong", bold: true },
        });
        break;
      case "emphasis":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "emphasis", italic: true },
        });
        break;
      case "link":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "link", url: node.url },
        });
        break;
      case "inlineCode":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "code", isInline: true },
        });
        break;
      case "code":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "code", isInline: false, language: node.lang },
        });
        break;
      case "list":
        styleRanges.push({
          start: startOffset,
          end: endOffset,
          style: { type: "list", ordered: node.ordered },
        });
        break;
    }
  };

  traverse(ast);
}

/**
 * Create Adobe Express text styling instructions from a markdown AST
 * @param {object} ast - The markdown AST
 * @returns {object} Object with plainText and styleRanges properties
 */
export function createExpressStylingFromAST(ast) {
  // Extract the full text from the AST
  const plainText = getFormattedText(ast);
  const styleRanges = [];

  // Process the AST to generate style ranges
  processNodeForStyling(ast, styleRanges, plainText);

  return {
    plainText,
    styleRanges,
  };
}

/**
 * Helper function to print out style ranges for debugging
 * @param {string} text - The text content
 * @param {Array} styleRanges - The style ranges
 */
export function debugStyleRanges(text, styleRanges) {
  console.log("---- Style Ranges Debug ----");
  styleRanges.forEach((range, index) => {
    const snippet = text.substring(range.start, range.end);
    console.log(
      `Range ${index}: ${range.start}-${range.end} (${range.style.type})`
    );
    console.log(`Text: "${snippet}"`);
    console.log("Style:", range.style);
    console.log("-----");
  });
}

/**
 * Helper function to apply Adobe Express text styling
 * @param {object} sandboxProxy - The Adobe Express sandbox proxy
 * @param {string} text - The text content
 * @param {Array} styleRanges - The style ranges to apply
 * @returns {Promise} A promise that resolves when styling is applied
 */
export async function applyExpressTextStyling(sandboxProxy, text, styleRanges) {
  try {
    // First create a text node with the plain text
    const textNode = await sandboxProxy.createTextNode(text);

    // Then apply styling to the text node
    for (const range of styleRanges) {
      switch (range.style.type) {
        case "heading":
          await sandboxProxy.applyHeadingStyle(
            textNode,
            range.start,
            range.end,
            range.style.level
          );
          break;

        case "emphasis":
          await sandboxProxy.applyTextStyle(textNode, range.start, range.end, {
            italic: true,
          });
          break;

        case "strong":
          await sandboxProxy.applyTextStyle(textNode, range.start, range.end, {
            bold: true,
          });
          break;

        case "link":
          await sandboxProxy.applyLinkStyle(
            textNode,
            range.start,
            range.end,
            range.style.url
          );
          break;

        // Add cases for other styles
      }
    }

    return textNode;
  } catch (error) {
    console.error("Error applying Express text styling:", error);
    throw error;
  }
}
