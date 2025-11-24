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

import "@spectrum-css/typography";
import "@spectrum-css/tooltip";
import "@adobe/prism-adobe";
import { ActionButton } from "@adobe/gatsby-theme-aio/src/components/ActionButton";

import React, { useState, useEffect } from "react";
import nextId from "react-id-generator";
import classNames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import PropTypes from "prop-types";
import Prism from "prism-react-renderer/prism";

import "./styles.css";

const CODE_PLAYGROUND_MODE = "playground";
const CODE_PLAYGROUND_SESSION = "new";

(typeof global !== "undefined" ? global : window).Prism = Prism;

const getLoader = require("prismjs/dependencies");
const components = require("prismjs/components");

const componentsToLoad = ["bash", "typescript", "json"];
const loadedComponents = ["clike", "javascript", "markup", "css"];

// dynamically load all the prism language components
const loader = getLoader(components, componentsToLoad, loadedComponents);
try {
  loader.load((id) => {
    require(`prismjs/components/prism-${id}.min.js`);
  });
} catch (error) {
  console.warn(error);
}

// show/hide copy tooltip
const showCopyTooltip = (setShouldShowCopyTooltip) => {
  setShouldShowCopyTooltip(true);
  setTimeout(() => {
    setShouldShowCopyTooltip(false);
  }, 3000);
};

// copy to clipboard
const copyToClipboard = async (codeContent, setIsTooltipOpen) => {
  await navigator.clipboard.writeText(codeContent);
  showCopyTooltip(setIsTooltipOpen);
};

// open code playground
const openCodePlayground = (codeContent, sampleId) => {
  const url = new URL(process.env.GATSBY_EXPRESS_URL);
  url.searchParams.set("mode", CODE_PLAYGROUND_MODE);
  url.searchParams.set("session", CODE_PLAYGROUND_SESSION);
  url.searchParams.set("sessionId", sampleId);
  url.searchParams.set("executionMode", "script");
  window.open(url.toString(), "_blank");
};

// check if device is mobile/tablet
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;

  // pointer:coarse detects touchscreen devices (mobile/tablet)
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  // hover:none detects devices without hover capability (touch-only)
  const cannotHover = window.matchMedia("(hover: none)").matches;
  // max-width helps distinguish true mobile/tablet from devices like touchscreen laptops
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  return (
    (hasCoarsePointer && cannotHover) || (hasCoarsePointer && isSmallScreen)
  );
};

// parse language, try option and id.
// usage: ```js{try id=createRectangle}
function parseAttributes(className, metastring) {
  const cls = String(className || "");
  const meta = String(metastring || "");

  // Extract language
  const langMatch = cls.match(/language-([^\s{]+)/);
  const language = langMatch ? langMatch[1].trim() : "";

  // Check if "try" is present in the class string
  const shouldShowTry = /\btry\b/.test(`${cls} ${meta}`);

  // Extract id if present
  const idMatch =
    meta.match(/\bid\s*=\s*([^}\s]+)/) || cls.match(/\bid\s*=\s*([^}\s]+)/);
  const sampleId = idMatch ? idMatch[1].trim() : "";

  return { language, shouldShowTry, sampleId };
}

const Code = ({ children, className = "", theme, metastring = "" }) => {
  const [tooltipId] = useState(nextId);
  const [shouldShowCopyTooltip, setShouldShowCopyTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { language, shouldShowTry, sampleId } = parseAttributes(
    className,
    metastring
  );

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={undefined}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => {
        const isEmptyItem = (token) =>
          token && token.length === 1 && token[0].empty;
        const lines = isEmptyItem(tokens[tokens.length - 1])
          ? tokens.slice(0, -1)
          : tokens;
        const isMultiLine = lines.length > 1;

        return (
          <div className={`spectrum--${theme} code-container`}>
            {/* Copy Button */}
            <ActionButton
              className={classNames(
                "spectrum-ActionButton",
                "code-action-button",
                "code-copy-button",
                { "with-try": shouldShowTry }
              )}
              aria-describedby={tooltipId}
              onClick={() =>
                copyToClipboard(children, setShouldShowCopyTooltip)
              }
            >
              Copy
            </ActionButton>

            {/* Try Button */}
            {shouldShowTry && (
              <ActionButton
                className={classNames(
                  "spectrum-ActionButton code-action-button code-try-button",
                  { "is-disabled": isMobile }
                )}
                onClick={() =>
                  !isMobile && openCodePlayground(children, sampleId)
                }
              >
                Try in playground
              </ActionButton>
            )}

            <div
              className={classNames("code-tooltip-container", {
                "with-try": shouldShowTry,
              })}
            >
              <span
                role="tooltip"
                id={tooltipId}
                className={classNames(
                  "spectrum-Tooltip spectrum-Tooltip--left code-tooltip",
                  { "is-open": shouldShowCopyTooltip }
                )}
              >
                <span className="spectrum-Tooltip-label">
                  Copied to your clipboard
                </span>
                <span className="spectrum-Tooltip-tip" />
              </span>
            </div>

            <pre
              className={classNames(
                className,
                "spectrum-Code spectrum-Code--sizeM code-pre"
              )}
            >
              {lines.map((line, i) => {
                const { style: lineStyle, ...lineProps } = getLineProps({
                  line,
                  key: i,
                });

                return (
                  <div key={i} className="code-line">
                    {isMultiLine && (
                      <span
                        data-pseudo-content={i + 1}
                        className="code-line-number"
                      />
                    )}
                    <span
                      {...lineProps}
                      style={lineStyle}
                      className="code-line-content"
                    >
                      {/* styling the tokens in the line */}
                      {line.map((token, key) => {
                        const { style: tokenStyle, ...tokenProps } =
                          getTokenProps({ token, key });
                        return (
                          <span key={key} {...tokenProps} style={tokenStyle} />
                        );
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
