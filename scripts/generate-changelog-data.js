const fs = require("node:fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const INPUT_MD_FILE = path.join(ROOT_DIR, "src", "pages", "guides", "getting-started", "changelog.md");
const OUTPUT_DATA_FILE = path.join(ROOT_DIR, "src", "pages", "changelog-data.yml");

/**
 * Removes common leading whitespace indentation from lines.
 */
function dedentLines(lines) {
  if (!lines || lines.length === 0) return "";
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length > 0) {
      const match = line.match(/^(\s*)/);
      const indent = match ? match[1].length : 0;
      if (indent < minIndent) minIndent = indent;
    }
  }
  if (minIndent === Infinity || minIndent === 0) {
    return lines.join("\n");
  }
  return lines.map((line) => (line.length >= minIndent ? line.slice(minIndent) : line)).join("\n");
}

/**
 * Converts any markdown headings (##, ###, ####, etc.) into bold text (**content**).
 */
function convertHeadingsToBold(text) {
  if (!text) return text;
  return text
    .split("\n")
    .map((line) => {
      const match = line.match(/^(\s*)(?:#{2,6})\s+(.+)$/);
      if (match) {
        const indent = match[1];
        const title = match[2].trim().replace(/^\*\*|\*\*$/g, "");
        return `${indent}**${title}**`;
      }
      return line;
    })
    .join("\n");
}

/**
 * Normalizes change types to standard lowercase types (new, improved, fixed, etc.)
 */
function normalizeType(type) {
  if (!type) return null;
  const t = type.trim();
  const lower = t.toLowerCase();
  if (lower === "added" || lower === "new") return "new";
  if (lower === "updated" || lower === "improved" || lower === "update" || lower === "updates" || lower === "additional updates") return "improved";
  if (lower === "fixed" || lower === "bugs and fixes") return "fixed";
  if (lower === "deprecated") return "deprecated";
  if (lower.startsWith("breaking")) return "breaking";
  if (lower === "stabilized") return "stabilized";
  if (lower === "changed") return "changed";
  if (lower === "docs") return "docs";
  if (lower === "removed") return "removed";
  return lower;
}

/**
 * Parses markdown changelog into structured release objects:
 * each release has date, optional version, and changes array containing optional type, text, list, and code.
 */
function parseChangelogMarkdown(content) {
  const lines = content.split(/\r?\n/);
  const releases = [];
  let currentRelease = null;
  let currentChange = null;
  let currentType = null;
  let inCodeBlock = false;
  let codeBlockLines = null;

  function flushChange() {
    if (currentChange) {
      if (currentChange.textLines && currentChange.textLines.length > 0) {
        while (currentChange.textLines.length > 0 && currentChange.textLines[currentChange.textLines.length - 1].trim() === "") {
          currentChange.textLines.pop();
        }
      }
      if (currentChange.listLines && currentChange.listLines.length > 0) {
        while (currentChange.listLines.length > 0 && currentChange.listLines[currentChange.listLines.length - 1].trim() === "") {
          currentChange.listLines.pop();
        }
      }
      if (currentChange.codeLines && currentChange.codeLines.length > 0) {
        while (currentChange.codeLines.length > 0 && currentChange.codeLines[currentChange.codeLines.length - 1].trim() === "") {
          currentChange.codeLines.pop();
        }
      }
      if (currentChange.textLines && currentChange.textLines.length > 0) {
        const text = convertHeadingsToBold(currentChange.textLines.join("\n"));
        const change = {};
        if (currentType) {
          change.type = normalizeType(currentType);
        }
        change.text = text;
        if (currentChange.listLines && currentChange.listLines.length > 0) {
          change.list = convertHeadingsToBold(currentChange.listLines.join("\n"));
        }
        if (currentChange.codeLines && currentChange.codeLines.length > 0) {
          change.code = dedentLines(currentChange.codeLines);
        }
        currentRelease.changes.push(change);
      }
      currentChange = null;
    }
  }

  function flushRelease() {
    flushChange();
    if (currentRelease) {
      if (currentRelease.changes.length > 1) {
        // If a release contains top-level announcement entries that appear before
        // typed actions (e.g. ### Added, ### Updated, etc.), place those entries
        // below the actions at the end of currentRelease.changes.
        const firstTypedIndex = currentRelease.changes.findIndex((c) => Boolean(c.type));
        if (firstTypedIndex > 0) {
          const preChanges = currentRelease.changes.slice(0, firstTypedIndex);
          const typedChanges = currentRelease.changes.slice(firstTypedIndex);
          currentRelease.changes = [...typedChanges, ...preChanges];
        }
      }
      releases.push(currentRelease);
      currentRelease = null;
    }
  }

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const rawLine = lines[lineIndex];
    const trimmed = rawLine.trim();

    // Check for fenced code blocks
    if (trimmed.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLines = [];
      } else {
        inCodeBlock = false;
        // Finished a code block: capture raw code without fence lines
        if (currentChange && codeBlockLines) {
          if (!currentChange.codeLines) {
            currentChange.codeLines = [];
          } else if (currentChange.codeLines.length > 0) {
            currentChange.codeLines.push("");
          }
          currentChange.codeLines.push(...codeBlockLines);
        }
        codeBlockLines = null;
      }
      continue;
    }

    if (inCodeBlock) {
      if (codeBlockLines) {
        codeBlockLines.push(rawLine);
      }
      continue;
    }

    // Release headers: ## [v4.58.15] 2026-10-21, ## [4.2.29] - 2024-03-14, ## 2025-11-14, or ## 2023-11-6
    const releaseHeaderMatch = rawLine.match(/^##\s+(?:\[v?([^\]]+)\]\s*-?\s*)?(\d{4}-\d{1,2}-\d{1,2})/i);
    if (releaseHeaderMatch) {
      flushRelease();
      const version = releaseHeaderMatch[1] ? releaseHeaderMatch[1].trim().replace(/^v/i, "") : undefined;
      const date = releaseHeaderMatch[2];
      currentRelease = {
        ...(version ? { version } : {}),
        date,
        changes: [],
      };
      currentType = null;
      continue;
    }

    if (!currentRelease) {
      continue;
    }

    // H3 section headers like ### Added, ### Updated (used as change type), or custom section headers
    const h3Match = rawLine.match(/^###\s+(.*)$/);
    if (h3Match) {
      flushChange();
      const h3Text = h3Match[1].trim();
      const lower = h3Text.toLowerCase();
      const isType = [
        "added", "new", "updated", "update", "updates", "improved", "fixed",
        "bugs and fixes", "deprecated", "stabilized", "changed", "removed",
        "docs", "additional updates", "new experimental apis"
      ].includes(lower) || lower.startsWith("breaking");

      if (isType) {
        currentType = h3Text;
      } else {
        const title = h3Text.replace(/^\*\*|\*\*$/g, "");
        currentChange = { textLines: [`**${title}**`], listLines: null, codeLines: null };
      }
      continue;
    }

    // H4 headers (e.g. #### Dark Theme Support) -> convert to bold **content**
    const h4Match = rawLine.match(/^####\s+(.*)$/);
    if (h4Match) {
      flushChange();
      const title = h4Match[1].trim().replace(/^\*\*|\*\*$/g, "");
      currentChange = { textLines: [`**${title}**`], listLines: null, codeLines: null };
      continue;
    }

    // Non-release H2 headers (## Header) -> convert to bold **content**
    const h2Match = rawLine.match(/^##\s+(.*)$/);
    if (h2Match) {
      flushChange();
      const title = h2Match[1].trim().replace(/^\*\*|\*\*$/g, "");
      currentChange = { textLines: [`**${title}**`], listLines: null, codeLines: null };
      continue;
    }

    // Skip <InlineAlert ...> component tags so raw JSX is not shown in the changelog text
    if (trimmed.startsWith("<InlineAlert")) {
      flushChange();
      let nextNonEmptyIndex = -1;
      for (let ni = lineIndex + 1; ni < lines.length; ni += 1) {
        if (lines[ni].trim().length > 0) {
          nextNonEmptyIndex = ni;
          break;
        }
      }

      if (nextNonEmptyIndex !== -1) {
        const nextLineTrimmed = lines[nextNonEmptyIndex].trim();
        const headingMatch = nextLineTrimmed.match(/^(?:#{2,6})\s+(.*)$/);
        const isBoldHeader = /^\*\*[^*]+:\*\*\s*$/.test(nextLineTrimmed);
        const hasHeaderSlot = /slots="[^"]*header[^"]*"/.test(trimmed);

        if (headingMatch || (hasHeaderSlot && isBoldHeader)) {
          const headerText = headingMatch
            ? `**${headingMatch[1].trim().replace(/^\*\*|\*\*$/g, "")}**`
            : nextLineTrimmed;
          currentChange = { textLines: [headerText], listLines: null, codeLines: null };
          lineIndex = nextNonEmptyIndex; // Advance past the header line
          continue;
        }
      }

      continue;
    }

    // Top-level bullet: starts at line start (- item, * item, 1. item)
    const isTopBullet = /^[-*]\s+/.test(rawLine);
    const isTopNumbered = /^\d+\.\s+/.test(rawLine);

    if (isTopBullet || isTopNumbered) {
      flushChange();
      const content = rawLine.replace(/^[-*]\s+|\d+\.\s+/, "");
      currentChange = { textLines: [content], listLines: null, codeLines: null };
      continue;
    }

    // Indented sub-bullet (e.g. "  - item" or "    - item") -> goes into currentChange.list
    const isSubBullet = /^\s+[-*]\s+/.test(rawLine);
    const isSubNumbered = /^\s+\d+\.\s+/.test(rawLine);

    if (isSubBullet || isSubNumbered) {
      if (currentChange) {
        const itemContent = rawLine.replace(/^\s*[-*]\s+|\s*\d+\.\s+/, "");
        if (!currentChange.listLines) {
          currentChange.listLines = [];
        }
        currentChange.listLines.push(itemContent);
        continue;
      }
    }

    // Standalone callout notes like **NOTE:**, **IMPORTANT:**, **Known Issue:**
    const isAlertCallout = /^\s*\*\*(?:NOTE|IMPORTANT|Known Issue|WARNING):?\*\*/i.test(trimmed);
    if (isAlertCallout) {
      flushChange();
      currentChange = { textLines: [trimmed], listLines: null, codeLines: null };
      continue;
    }

    // Transition / label lines between/before code blocks (e.g. **Old**, **New**, versus:, <del>)
    const isTransition = /^(?:versus:?|\*+\s*(?:Old|New)[^*]*\*+|(?:&lt;|<)\/?del\s*(?:&gt;|>))/i.test(trimmed);
    if (isTransition) {
      continue;
    }

    // Check for prose after a completed code block (e.g. "The code samples have also been updated...")
    if (currentChange && currentChange.codeLines && currentChange.codeLines.length > 0) {
      if (trimmed === "") {
        continue;
      }
      flushChange();
      currentChange = { textLines: [trimmed], listLines: null, codeLines: null };
      continue;
    }

    // Continuation lines for active change item
    if (currentChange) {
      if (trimmed === "") {
        let isContinuation = false;
        for (let nextIndex = lineIndex + 1; nextIndex < lines.length; nextIndex += 1) {
          const nextTrimmed = lines[nextIndex].trim();
          if (nextTrimmed === "") continue;
          if (nextTrimmed.startsWith("##")) break;
          if (nextTrimmed.startsWith("### ")) break;
          if (nextTrimmed.startsWith("#### ")) break;
          if (nextTrimmed.startsWith("<InlineAlert")) break;
          if (/^[-*]\s+/.test(lines[nextIndex]) || /^\d+\.\s+/.test(lines[nextIndex])) break;
          if (/^\s+[-*]\s+/.test(lines[nextIndex]) || /^\s+\d+\.\s+/.test(lines[nextIndex])) {
            isContinuation = true;
            break;
          }
          if (/^\s*\*\*(?:NOTE|IMPORTANT|Known Issue|WARNING):?\*\*/i.test(nextTrimmed)) break;

          // If the next line starts a code fence or a code transition tag (<del>, Old, New, versus), it belongs to the current change
          if (nextTrimmed.startsWith("```") || /^(?:versus:?|\*+\s*(?:Old|New)[^*]*\*+|(?:&lt;|<)\/?del\s*(?:&gt;|>))/i.test(nextTrimmed)) {
            isContinuation = true;
            break;
          }

          // If the current change has already accumulated list items, any subsequent non-bullet line is a separate item
          if (currentChange.listLines && currentChange.listLines.length > 0) {
            break;
          }

          // If the next line has at least 2 spaces indentation, it is an indented continuation paragraph
          if (/^\s{2,}/.test(lines[nextIndex])) {
            isContinuation = true;
            break;
          }

          // Otherwise an unindented line at column 0 starts a new block
          break;
        }
        if (isContinuation) {
          // If the next content is not a sub-bullet, add a blank line to textLines
          let nextIsSubBullet = false;
          for (let nextIndex = lineIndex + 1; nextIndex < lines.length; nextIndex += 1) {
            if (lines[nextIndex].trim() === "") continue;
            if (/^\s+[-*]\s+/.test(lines[nextIndex]) || /^\s+\d+\.\s+/.test(lines[nextIndex])) {
              nextIsSubBullet = true;
            }
            break;
          }
          if (!nextIsSubBullet) {
            if (currentChange.textLines.length > 0 && currentChange.textLines[currentChange.textLines.length - 1].trim() !== "") {
              currentChange.textLines.push("");
            }
          }
        } else {
          flushChange();
        }
        continue;
      }

      // If currently accumulating sub-list items and this is indented text belonging to the sub-bullet
      if (currentChange.listLines && currentChange.listLines.length > 0) {
        if (/^\s{4,}/.test(rawLine)) {
          currentChange.listLines[currentChange.listLines.length - 1] += "\n" + trimmed;
          continue;
        }
      }

      currentChange.textLines.push(trimmed);
      continue;
    }

    // Standalone prose paragraph (e.g. "General improvements and bug fixes.")
    if (trimmed.length > 0 && !trimmed.startsWith("#") && !trimmed.startsWith("<!--")) {
      flushChange();
      currentChange = { textLines: [trimmed], listLines: null, codeLines: null };
    }
  }

  flushRelease();
  return releases;
}

/**
 * Formats a type scalar for YAML output.
 * Quotes if it contains characters like colons or special YAML characters.
 */
function formatYamlType(type) {
  if (/^[A-Za-z0-9_-]+$/.test(type)) {
    return type;
  }
  return JSON.stringify(type);
}

/**
 * Formats a text scalar for YAML output.
 * Uses block scalar `|` for multiline text; double-quoted JSON string for single lines.
 */
function formatYamlScalar(text, indentSpaces = 8) {
  const indent = " ".repeat(indentSpaces);
  const trimmed = typeof text === "string" ? text.trim() : "";
  if (trimmed.includes("\n")) {
    const indentedLines = trimmed
      .split("\n")
      .map((line) => (line.trim().length > 0 ? `${indent}  ${line}` : ""))
      .join("\n");
    return `|\n${indentedLines}`;
  }
  return JSON.stringify(trimmed);
}

/**
 * Serializes releases to YAML string with date, optional version, and changes (type, text, list, code).
 */
function serializeReleasesToYaml(releases) {
  const yamlLines = [
    "# changelog-data.yml",
    'rssfeed : "https://raw.githubusercontent.com/AdobeDocs/express-add-ons-docs/refs/heads/main/src/pages/feed.xml"',
    "",
    "releases:",
  ];

  for (const release of releases) {
    yamlLines.push("");
    if (release.version) {
      yamlLines.push(`  - version: ${release.version}`);
      yamlLines.push(`    date: ${release.date}`);
    } else {
      yamlLines.push(`  - date: ${release.date}`);
    }

    if (release.changes.length === 0) {
      yamlLines.push("    changes: []");
      continue;
    }

    yamlLines.push("    changes:");
    for (const change of release.changes) {
      if (change.type) {
        yamlLines.push(`      - type: ${formatYamlType(change.type)}`);
        yamlLines.push(`        text: ${formatYamlScalar(change.text, 8)}`);
      } else {
        yamlLines.push(`      - text: ${formatYamlScalar(change.text, 8)}`);
      }
      if (change.list && change.list.trim().length > 0) {
        yamlLines.push(`        list: ${formatYamlScalar(change.list, 8)}`);
      }
      if (change.code && change.code.trim().length > 0) {
        yamlLines.push(`        code: ${formatYamlScalar(change.code, 8)}`);
      }
    }
  }

  yamlLines.push("");
  return yamlLines.join("\n");
}

function main() {
  if (!fs.existsSync(INPUT_MD_FILE)) {
    throw new Error(`Input file not found: ${INPUT_MD_FILE}`);
  }

  console.log(`Reading ${path.relative(ROOT_DIR, INPUT_MD_FILE)}...`);
  const markdownContent = fs.readFileSync(INPUT_MD_FILE, "utf8");
  const releases = parseChangelogMarkdown(markdownContent);

  const yamlOutput = serializeReleasesToYaml(releases);
  fs.writeFileSync(OUTPUT_DATA_FILE, yamlOutput, "utf8");

  const totalChanges = releases.reduce((sum, r) => sum + r.changes.length, 0);
  console.log(
    `Successfully generated ${path.relative(ROOT_DIR, OUTPUT_DATA_FILE)} with ${releases.length} releases and ${totalChanges} changes.`
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  parseChangelogMarkdown,
  formatYamlType,
  formatYamlScalar,
  serializeReleasesToYaml,
};
