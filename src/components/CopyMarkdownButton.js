import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

const CopyMarkdownButton = ({ pageContext, location }) => {
  const [copied, setCopied] = useState(false);

  // Get the current page's Markdown data
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          id
          rawMarkdownBody
          frontmatter {
            title
            description
            keywords
            contributors
          }
          fileAbsolutePath
        }
      }
    }
  `);

  const getCurrentPageMarkdown = () => {
    if (!location || !location.pathname) return null;

    console.log("Current pathname:", location.pathname);
    console.log(
      "Available Markdown nodes:",
      data.allMarkdownRemark.nodes.length
    );

    // Find the Markdown node that corresponds to the current page
    return data.allMarkdownRemark.nodes.find((node) => {
      // Match by file path
      if (node.fileAbsolutePath) {
        console.log("Checking node:", node.fileAbsolutePath);

        // Extract the relative path and compare with current pathname
        const relativePath = node.fileAbsolutePath.replace(
          /.*\/src\/pages\//,
          ""
        );
        const cleanPath = location.pathname
          .replace(/^\/express\/add-ons\/docs\//, "")
          .replace(/\/$/, "");
        const cleanRelativePath = relativePath.replace(/\.md$/, "");

        console.log("Relative path:", relativePath);
        console.log("Clean path:", cleanPath);
        console.log("Clean relative path:", cleanRelativePath);

        const matches =
          cleanPath === cleanRelativePath ||
          cleanPath.endsWith(cleanRelativePath) ||
          cleanRelativePath.endsWith(cleanPath);

        console.log("Matches:", matches);

        return matches;
      }
      return false;
    });
  };

  const reconstructMarkdown = (markdownNode) => {
    if (!markdownNode) return "";

    // Only return the body content (excluding frontmatter)
    return markdownNode.rawMarkdownBody || "";
  };

  const handleCopy = async () => {
    try {
      const currentMarkdown = getCurrentPageMarkdown();
      if (!currentMarkdown) {
        console.warn("Could not find Markdown content for current page");
        return;
      }

      const markdownContent = reconstructMarkdown(currentMarkdown);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(markdownContent);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = markdownContent;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Only show the button on Markdown pages
  const currentMarkdown = getCurrentPageMarkdown();

  // For testing - always show button if we have any Markdown nodes
  const shouldShowButton =
    currentMarkdown || data.allMarkdownRemark.nodes.length > 0;

  if (!shouldShowButton) {
    return null;
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        backgroundColor: copied
          ? "#4caf50"
          : currentMarkdown
          ? "#2196f3"
          : "#ff9800",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "inherit",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = currentMarkdown
            ? "#1976d2"
            : "#f57c00";
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = currentMarkdown
            ? "#2196f3"
            : "#ff9800";
        }
      }}
    >
      <span style={{ fontSize: "16px" }}>{copied ? "✓" : "📋"}</span>
      {copied
        ? "Copied!"
        : currentMarkdown
        ? "Copy as Markdown"
        : "Copy (Debug)"}
    </button>
  );
};

export default CopyMarkdownButton;
