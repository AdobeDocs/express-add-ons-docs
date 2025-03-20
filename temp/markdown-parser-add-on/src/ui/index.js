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

import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";
import "@spectrum-web-components/link/sp-link.js";
import "@spectrum-web-components/illustrated-message/sp-illustrated-message.js";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { processMarkdown } from "./markdown-parser.js";
import {
  createExpressStylingFromAST,
  debugStyleRanges,
} from "./adobe-express-formatter.js";

// For debugging
const DEBUG = false;

// Save debug information to a file in development
async function saveDebugData(name, data) {
  if (!DEBUG) return;

  try {
    console.log(`Debug data for ${name}:`, data);
  } catch (error) {
    console.error("Error saving debug data:", error);
  }
}

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the Authoring Sandbox.
  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // const testButton = document.getElementById("test");
  // testButton.addEventListener("click", () => {
  //   sandboxProxy.createTextNode("Hello\nWorld!");
  // });

  customElements.whenDefined("sp-dropzone").then(() => {
    const dropzone = document.getElementById("dropzone");
    const parseButton = document.getElementById("parseButton");
    const message = document.getElementById("message");
    const fileInput = document.getElementById("file-input");
    const progressCircle = document.getElementById("progress-circle");
    let input;
    let beingDraggedOver = false;
    let markdownContent = null;

    // Hide progress initially
    if (progressCircle) {
      progressCircle.style.display = "none";
    }

    const isMarkdownFile = (file) => {
      return (
        file.name.toLowerCase().endsWith(".md") || file.type === "text/markdown"
      );
    };

    const updateMessage = () => {
      message.heading =
        input !== undefined
          ? beingDraggedOver
            ? "Drop here to replace!"
            : "Got it!"
          : "Drag and drop your file";
    };

    const handleDropOrChange = (event) => {
      let file;
      console.log("EVENT", event.type);

      // Handle different event sources
      if (event.type === "drop") {
        file = event.dataTransfer.files[0];
      } else if (event.type === "change") {
        file = event.target.files[0];
      } else if (event.detail && event.detail.dropEvent) {
        // Handle sp-dropzone-drop event
        file = event.detail.dropEvent.dataTransfer.files[0];
      }

      if (!file) {
        console.error("No file found in the event");
        return;
      }

      if (!isMarkdownFile(file)) {
        message.heading = "Please drop a markdown (.md) file";
        return;
      }

      // Set input to a temporary value to show "Got it!" immediately
      input = "loading";
      dropzone.setAttribute("filled", true);
      beingDraggedOver = false;
      updateMessage();

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        input = content;
        markdownContent = content;
        console.log("Markdown content:", content);

        // Enable parse button now that we have content
        parseButton.disabled = false;

        // Ensure message is updated after content is loaded
        updateMessage();
      };
      reader.readAsText(file);
      console.log("READING FILE");
    };

    // Function to parse markdown and insert styled text into the document
    const parseMarkdownAndInsert = async () => {
      if (!markdownContent) {
        console.error("No markdown content to parse");
        return;
      }

      try {
        // Show progress
        if (progressCircle) {
          progressCircle.style.display = "block";
        }
        message.heading = "Processing markdown...";
        parseButton.disabled = true;

        // Process the markdown to get AST
        const processedMarkdown = await processMarkdown(markdownContent);
        await saveDebugData("processedMarkdown", processedMarkdown);
        console.log("Processed markdown:", processedMarkdown);

        // Create Express styling from AST
        const expressStyling = createExpressStylingFromAST(
          processedMarkdown.ast
        );
        await saveDebugData("ExpressStyling", expressStyling);
        console.log("Express styling:", expressStyling);

        // Debug style ranges
        if (DEBUG) {
          debugStyleRanges(
            expressStyling.plainText,
            expressStyling.styleRanges
          );
        }

        // Create styled text in the document
        message.heading = "Adding text to document...";

        // Group ranges by type to apply styling more efficiently
        await sandboxProxy.createStyledTextFromMarkdown(
          expressStyling.plainText,
          expressStyling.styleRanges
        );

        message.heading = "Markdown successfully added to document!";
        parseButton.disabled = false;
      } catch (error) {
        console.error("Error parsing markdown:", error);
        message.heading = "Error parsing markdown";
        parseButton.disabled = false;
      } finally {
        // Hide progress
        if (progressCircle) {
          progressCircle.style.display = "none";
        }
      }
    };

    // Event listeners
    dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();
      beingDraggedOver = true;
      updateMessage();
    });

    dropzone.addEventListener("dragleave", () => {
      beingDraggedOver = false;
      updateMessage();
    });

    dropzone.addEventListener("drop", (event) => {
      event.preventDefault();
      handleDropOrChange(event);
    });

    // Also listen for the Spectrum Web Component's native event
    dropzone.addEventListener("sp-dropzone-drop", (event) => {
      event.preventDefault();
      handleDropOrChange(event);
    });

    fileInput.addEventListener("change", (event) => {
      handleDropOrChange(event);
    });

    // Parse button click handler
    parseButton.addEventListener("click", parseMarkdownAndInsert);

    // Initially disable parse button until we have content
    parseButton.disabled = true;
  });
});
