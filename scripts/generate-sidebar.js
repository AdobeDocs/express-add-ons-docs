const fs = require("fs");
const path = require("path");

const SIDEBAR_JSON_PATH = path.join(__dirname, "hlapi-sidebar.json");
const INDENT_SIZE = 4;
// Depth 3 = 12 spaces: subPages > Document Sandbox > Document APIs > [Categories]
const CATEGORY_DEPTH = 3;

function generateMarkdown(categories) {
  let output = "";
  const catIndent = " ".repeat(CATEGORY_DEPTH * INDENT_SIZE);
  const itemIndent = " ".repeat((CATEGORY_DEPTH + 1) * INDENT_SIZE);

  categories.forEach((category) => {
    const catPath = category.path || "";
    output += `${catIndent}- [${category.title}](${catPath})\n`;

    if (category.pages && category.pages.length > 0) {
      category.pages.forEach((item) => {
        output += `${itemIndent}- [${item.title}](${item.path})\n`;
      });
    }
  });

  return output;
}

try {
  if (!fs.existsSync(SIDEBAR_JSON_PATH)) {
    console.error(`Error: Sidebar JSON not found at ${SIDEBAR_JSON_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(SIDEBAR_JSON_PATH, "utf8");
  const json = JSON.parse(content);
  const markdown = generateMarkdown(json);

  // Output to stdout (consumed by update-config.js)
  process.stdout.write(markdown);
} catch (error) {
  console.error("Error processing sidebar JSON:", error.message);
  process.exit(1);
}
