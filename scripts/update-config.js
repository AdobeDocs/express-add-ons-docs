const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const CONFIG_PATH = path.join(__dirname, "../src/pages/config.md");
const GENERATE_SCRIPT = path.join(__dirname, "generate-sidebar.js");

// The Document APIs line in config.md — anchor for sidebar injection
const DOC_APIS_PATTERN = "[Document APIs](references/document-sandbox/document-apis/index.md)";

try {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Error: Config file not found at ${CONFIG_PATH}`);
    process.exit(1);
  }

  // 1. Backup
  fs.copyFileSync(CONFIG_PATH, `${CONFIG_PATH}.bak`);
  console.log(`Backup created at ${CONFIG_PATH}.bak`);

  // 2. Read config and split into lines
  const configContent = fs.readFileSync(CONFIG_PATH, "utf8");
  const lines = configContent.split("\n");

  // 3. Find the Document APIs line
  const docApisIndex = lines.findIndex((line) =>
    line.includes(DOC_APIS_PATTERN)
  );
  if (docApisIndex === -1) {
    console.error(
      `Error: Could not find "${DOC_APIS_PATTERN}" in config.md`
    );
    process.exit(1);
  }

  // Measure the indentation of the Document APIs line
  const docApisIndent = lines[docApisIndex].search(/\S/);

  // 4. Find the end of the Document APIs subsection:
  //    the next non-empty line at the same or lower indentation
  let endIndex = lines.length;
  for (let i = docApisIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const indent = line.search(/\S/);
    if (indent <= docApisIndent) {
      endIndex = i;
      break;
    }
  }

  // 5. Generate new sidebar content
  console.log("Generating new sidebar content...");
  const newContent = execSync(`node "${GENERATE_SCRIPT}"`, {
    encoding: "utf8",
  }).trimEnd();

  // 6. Assemble: keep everything up to and including the Document APIs line,
  //    insert new sidebar, then append everything after the old subsection
  const topPart = lines.slice(0, docApisIndex + 1).join("\n");
  const bottomPart = lines.slice(endIndex).join("\n");

  const finalContent = topPart + "\n" + newContent + "\n" + bottomPart;

  // 7. Write
  fs.writeFileSync(CONFIG_PATH, finalContent);
  console.log(`Successfully updated ${CONFIG_PATH}`);
} catch (error) {
  console.error("Update failed:", error.message);
  process.exit(1);
}
