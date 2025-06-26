/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { createRef, useState } from "react";
import { css } from "@emotion/react";
import nextId from "react-id-generator";
import classNames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import "@spectrum-css/typography";
import "@spectrum-css/tooltip";
import "@adobe/prism-adobe";
import { ActionButton } from "@adobe/gatsby-theme-aio/src/components/ActionButton";
import PropTypes from "prop-types";

import Prism from "prism-react-renderer/prism";

(typeof global !== "undefined" ? global : window).Prism = Prism;

const getLoader = require("prismjs/dependencies");
const components = require("prismjs/components");

const componentsToLoad = [
  "java",
  "php",
  "csharp",
  "kotlin",
  "swift",
  "bash",
  "sql",
  "typescript",
  "objectivec",
  "yaml",
  "json",
];
const loadedComponents = ["clike", "javascript"];

const loader = getLoader(components, componentsToLoad, loadedComponents);
try {
  loader.load((id) => {
    require(`prismjs/components/prism-${id}.min.js`);
  });
} catch (e) {
  console.log(e);
}

const openTooltip = (setIsTooltipOpen) => {
  setIsTooltipOpen(true);
  setTimeout(() => {
    setIsTooltipOpen(false);
  }, 3000);
};

const copy = (textarea, document, setIsTooltipOpen) => {
  textarea.current.select();
  document.execCommand("copy");
  openTooltip(setIsTooltipOpen);
};

const handleTry = (codeContent) => {
  try {
    // const code = btoa(JSON.stringify(codeContent));
    const playgroundData = {
      scriptContent: codeContent,
      mode: "script",
    };
    const url = new URL("https://localhost.adobe.com:8080/new");
    // const url = new URL("https://168534.prenv.projectx.corp.adobe.com/new");
    url.searchParams.set("mode", "playground");
    url.searchParams.set("session", "new");
    // url.searchParams.set("code", code);
    // url.searchParams.set("playgroundMode", "script");
    url.searchParams.set(
      "playgroundData",
      btoa(JSON.stringify(playgroundData))
    );
    window.open(url.toString(), "_blank");

    // const playgroundData = {
    //   scriptContent: codeContent,
    //   mode: "script",
    // };
    // const encoded = btoa(JSON.stringify(playgroundData));
    // console.log("encoded", encoded);
    //     const files = [
    //       {
    //         name: "index.html",
    //         content: `<!DOCTYPE html>
    // <html lang="en">
    //     <head>
    //         <meta charset="UTF-8" />
    //         <meta name="description" content="Get started with Add-on development using JavaScript" />
    //         <meta name="keywords" content="Adobe, Express, Add-On, JavaScript" />
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //         <title>Get Started</title>
    //     </head>
    //     <body>
    //         <div class="container">
    //             <button id="createRectangle" disabled>Create Rectangle</button>
    //         </div>
    //     </body>
    // </html>
    // `,
    //       },
    //       {
    //         name: "style.css",
    //         content: `.container {
    //     margin: 24px;
    //     display: flex;
    //     flex-direction: column;
    // }

    // button {
    //     background-color: rgb(82, 88, 228);
    //     border-color: rgb(82, 88, 228);
    //     border-radius: 16px;
    //     border-style: solid;
    //     color: rgb(255, 255, 255);
    //     font-family: sans-serif;
    //     height: 32px;
    // }

    // button:disabled {
    //     background-color: rgb(177, 177, 177);
    //     border-color: rgb(177, 177, 177);
    // }

    // button:not([disabled]):hover {
    //     background-color: rgb(64, 70, 202);
    //     cursor: pointer;
    // }`,
    //       },
    //       {
    //         name: "index.js",
    //         content: `import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

    // addOnUISdk.ready.then(async () => {
    //     console.log("addOnUISdk is ready for use.");
    //     // Get the UI runtime.
    //     const { runtime } = addOnUISdk.instance;
    //     // Get the proxy object, which is required
    //     // to call the APIs defined in the Script runtime
    //     // i.e., in the code.js file of this add-on.
    //     const scriptApi = await runtime.apiProxy("documentSandbox");
    //     const createRectangleButton = document.getElementById("createRectangle");
    //     createRectangleButton.addEventListener("click", async event => {
    //         await scriptApi.createRectangle();
    //     });
    //     // Enable the button only when:
    //     // 1. addOnUISdk is ready,
    //     // 2. scriptApi is available, and
    //     // 3. click event listener is registered.
    //     createRectangleButton.disabled = false;
    // });`,
    //       },
    //       {
    //         name: "code.js",
    //         content: `import addOnSandboxSdk from "add-on-sdk-document-sandbox";
    // import { editor } from "express-document-sdk";
    // // Get the document sandbox runtime.
    // const { runtime } = addOnSandboxSdk.instance;
    // function start() {
    //     // APIs to be exposed to the UI runtime
    //     // i.e., to the index.html file of this add-on.
    //     const sandboxApi = {
    //         createRectangle: () => {
    //             const rectangle = editor.createRectangle();
    //             // Define rectangle dimensions.
    //             rectangle.width = 240;
    //             rectangle.height = 180;
    //             // Define rectangle position.
    //             rectangle.translation = { x: 10, y: 10 };
    //             // Define rectangle color.
    //             const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };
    //             // Fill the rectangle with the color.
    //             const rectangleFill = editor.makeColorFill(color);
    //             rectangle.fill = rectangleFill;
    //             // Add the rectangle to the document.
    //             const insertionParent = editor.context.insertionParent;
    //             insertionParent.children.append(rectangle);
    //         }
    //     };
    //     // Expose sandboxApi to the UI runtime.
    //     runtime.exposeApi(sandboxApi);
    // }
    // start();`,
    //       },
    //     ];

    //     const encoded = btoa(JSON.stringify(files));
    //     console.log("encoded", encoded);
  } catch (error) {
    console.error("Error in Try button:", error);
  }
};

const Code = ({ children, className = "", theme }) => {
  const [tooltipId] = useState(nextId);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Parse language and check for {try} attribute
  let language = className.replace(/language-/, "");
  const attributeMatch = language.match(/^(\w+)\s*\{([^}]+)\}$/);

  let shouldShowTry = false;

  if (attributeMatch) {
    language = attributeMatch[1];
    const attributes = attributeMatch[2];
    shouldShowTry = attributes.includes("try");
  }

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => {
        const isEmptyItem = (token) =>
          token && token.length === 1 && token[0].empty;
        const lines = isEmptyItem(tokens[tokens.length - 1])
          ? tokens.slice(0, -1)
          : tokens;
        const isMultiLine = lines.length > 1;
        const textarea = createRef();

        return (
          <div
            className={`spectrum--${theme}`}
            css={css`
              position: relative;
              max-width: calc(
                100vw - var(--spectrum-global-dimension-size-800)
              );
            `}
          >
            {/* Copy Button */}
            <ActionButton
              className="spectrum-ActionButton"
              aria-describedby={tooltipId}
              css={css`
                position: absolute;
                right: ${shouldShowTry ? "70px" : "10px"};
                top: 0px;
                border-color: var(
                  --spectrum-actionbutton-m-border-color,
                  var(--spectrum-alias-border-color)
                ) !important;
                color: var(
                  --spectrum-actionbutton-m-text-color,
                  var(--spectrum-alias-text-color)
                ) !important;
                padding: var(--spectrum-global-dimension-size-65);
              `}
              onClick={() => {
                copy(textarea, document, setIsTooltipOpen);
              }}
            >
              Copy
            </ActionButton>
            {/* Try Button - Only render if showTry is true */}
            {shouldShowTry && (
              <ActionButton
                className="spectrum-ActionButton"
                css={css`
                  position: absolute;
                  right: 10px;
                  top: 0px;
                  border-color: var(
                    --spectrum-actionbutton-m-border-color,
                    var(--spectrum-alias-border-color)
                  ) !important;
                  color: var(
                    --spectrum-actionbutton-m-text-color,
                    var(--spectrum-alias-text-color)
                  ) !important;
                  padding: var(--spectrum-global-dimension-size-65);
                `}
                onClick={() => handleTry(children)}
              >
                Try
              </ActionButton>
            )}
            <div
              css={css`
                position: absolute;
                top: var(--spectrum-global-dimension-size-200);
                right: var(--spectrum-global-dimension-size-200);
              `}
            >
              <textarea
                tabIndex="-1"
                readOnly={true}
                aria-hidden="true"
                css={css`
                  position: fixed;
                  left: -999px;
                  opacity: 0;
                `}
                ref={textarea}
                value={children}
              />
              <span
                role="tooltip"
                id={tooltipId}
                css={css`
                  display: block;
                  position: absolute;
                  top: var(--spectrum-global-dimension-size-50);
                  right: var(--spectrum-global-dimension-size-675);
                  left: initial;
                  font-family: var(
                    --spectrum-alias-body-text-font-family,
                    var(--spectrum-global-font-family-base)
                  );
                `}
                className={classNames(
                  "spectrum-Tooltip spectrum-Tooltip--left",
                  {
                    "is-open": isTooltipOpen,
                  }
                )}
              >
                <span className="spectrum-Tooltip-label">
                  Copied to your clipboard
                </span>
                <span className="spectrum-Tooltip-tip" />
              </span>
            </div>
            <pre
              css={css`
                padding-top: 30px !important;
              `}
              className={classNames(
                className,
                "spectrum-Code spectrum-Code--sizeM"
              )}
            >
              {lines.map((line, i) => {
                const { style: lineStyles, ...lineProps } = getLineProps({
                  line,
                  key: i,
                });

                return (
                  <div
                    key={i}
                    css={css`
                      display: table-row;
                    `}
                  >
                    {isMultiLine && (
                      <span
                        data-pseudo-content={i + 1}
                        css={css`
                          display: table-cell;
                          color: var(--spectrum-global-color-gray-500);
                          text-align: left;
                          padding-right: var(
                            --spectrum-global-dimension-size-200
                          );
                          user-select: none;
                          &::before {
                            content: attr(data-pseudo-content);
                          }
                        `}
                      ></span>
                    )}
                    <span
                      {...lineProps}
                      css={css`
                        margin-right: var(
                          --spectrum-global-dimension-size-1000
                        );
                      `}
                    >
                      {line.map((token, key) => {
                        const { style: tokenStyles, ...tokenProps } =
                          getTokenProps({ token, key });
                        return <span key={key} {...tokenProps} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>
        );
      }}
    </Highlight>
  );
};

Code.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]),
};

export { Code };
