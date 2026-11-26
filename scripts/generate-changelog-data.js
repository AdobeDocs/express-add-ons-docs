const fs = require("node:fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const INPUT_MD_FILE = path.join(ROOT_DIR, "src", "pages", "guides", "getting-started", "changelog.md");
const OUTPUT_DATA_FILE = path.join(ROOT_DIR, "src", "pages", "changelog-data.yml");

/**
 * Parses markdown changelog into structured release objects:
 * each release has date, optional version, and changes array containing optional type and text.
 */
function parseChangelogMarkdown(content) {
  const lines = content.split(/\r?\n/);
  const releases = [];
  let currentRelease = null;
  let currentChangeLines = null;
  let currentType = null;
  let inCodeBlock = false;

  function flushChange() {
    if (currentRelease && currentChangeLines && currentChangeLines.length > 0) {
      while (currentChangeLines.length > 0 && currentChangeLines[currentChangeLines.length - 1].trim() === "") {
        currentChangeLines.pop();
      }
      if (currentChangeLines.length > 0) {
        const text = currentChangeLines.join("\n");
        const change = {};
        if (currentType) {
          change.type = currentType;
        }
        change.text = text;
        currentRelease.changes.push(change);
      }
      currentChangeLines = null;
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
      inCodeBlock = !inCodeBlock;
      if (currentChangeLines) {
        currentChangeLines.push(rawLine);
      }
      continue;
    }

    if (inCodeBlock) {
      if (currentChangeLines) {
        currentChangeLines.push(rawLine);
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

    // H3 section headers like ### Added, ### Updated (used as change type)
    const h3Match = rawLine.match(/^###\s+(.*)$/);
    if (h3Match) {
      flushChange();
      currentType = h3Match[1].trim();
      continue;
    }

    // H4 headers (used e.g. for standalone feature announcements like #### Dark Theme Support)
    const h4Match = rawLine.match(/^####\s+(.*)$/);
    if (h4Match) {
      flushChange();
      currentChangeLines = [trimmed];
      continue;
    }

    // Skip <InlineAlert ...> component tags so raw JSX is not shown in the changelog text
    if (trimmed.startsWith("<InlineAlert")) {
      let nextNonEmptyIndex = -1;
      for (let ni = lineIndex + 1; ni < lines.length; ni += 1) {
        if (lines[ni].trim().length > 0) {
          nextNonEmptyIndex = ni;
          break;
        }
      }

      if (nextNonEmptyIndex !== -1) {
        const nextLineTrimmed = lines[nextNonEmptyIndex].trim();
        const isH4 = /^####\s+/.test(nextLineTrimmed);
        const isBoldHeader = /^\*\*[^*]+:\*\*\s*$/.test(nextLineTrimmed);
        const hasHeaderSlot = /slots="[^"]*header[^"]*"/.test(trimmed);

        if (isH4 || (hasHeaderSlot && isBoldHeader)) {
          flushChange();
          currentChangeLines = [nextLineTrimmed];
          lineIndex = nextNonEmptyIndex; // Advance past the header line
          continue;
        }
      }

      continue;
    }

    // Top-level list item (- item, * item, 1. item)
    const isTopBullet = /^[-*]\s+/.test(rawLine);
    const isTopNumbered = /^\d+\.\s+/.test(rawLine);

    if (isTopBullet || isTopNumbered) {
      flushChange();
      const contentAfterMarker = rawLine.replace(/^[-*]\s+|\d+\.\s+/, "");
      currentChangeLines = [contentAfterMarker];
      continue;
    }

    // Continuation lines for active change item
    if (currentChangeLines) {
      if (trimmed === "") {
        let isContinuation = false;
        for (let nextIndex = lineIndex + 1; nextIndex < lines.length; nextIndex += 1) {
          const nextTrimmed = lines[nextIndex].trim();
          if (nextTrimmed === "") continue;
          if (nextTrimmed.startsWith("##")) break;
          if (nextTrimmed.startsWith("### ")) break;
          if (nextTrimmed.startsWith("#### ")) break;
          if (nextTrimmed.startsWith("<InlineAlert")) {
            if (/slots="[^"]*header[^"]*"/.test(nextTrimmed)) break;
            continue;
          }
          if (/^[-*]\s+/.test(lines[nextIndex]) || /^\d+\.\s+/.test(lines[nextIndex])) break;
          isContinuation = true;
          break;
        }
        if (isContinuation) {
          if (currentChangeLines.length > 0 && currentChangeLines[currentChangeLines.length - 1].trim() !== "") {
            currentChangeLines.push("");
          }
        } else {
          flushChange();
        }
        continue;
      }

      // Indented line (sub-bullets, indented text, code)
      if (/^(\s{2,}|\t)/.test(rawLine)) {
        currentChangeLines.push(rawLine);
        continue;
      }

      currentChangeLines.push(rawLine);
      continue;
    }

    // Standalone prose paragraph (e.g. "General improvements and bug fixes.")
    if (trimmed.length > 0 && !trimmed.startsWith("#") && !trimmed.startsWith("<!--")) {
      flushChange();
      currentChangeLines = [trimmed];
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
  if (text.includes("\n")) {
    const indentedLines = text
      .split("\n")
      .map((line) => (line.trim().length > 0 ? `${indent}  ${line}` : ""))
      .join("\n");
    return `|\n${indentedLines}`;
  }
  return JSON.stringify(text);
}

/**
 * Serializes releases to YAML string with date, optional version, and changes (type & text).
 */
function serializeReleasesToYaml(releases) {
  const yamlLines = [
    "# changelog-data.yml",
    "# Generated from src/pages/guides/changelog/index.md",
    "",
    "releases:",
  ];

  for (const release of releases) {
    yamlLines.push("");
    yamlLines.push(`  - date: ${release.date}`);
    if (release.version) {
      yamlLines.push(`    version: ${release.version}`);
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
