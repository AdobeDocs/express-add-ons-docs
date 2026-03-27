const fs = require("fs");
const path = require("path");

const DEFAULT_SOURCE_REPO = path.resolve(__dirname, "../../hz");
const SOURCE_REPO = process.argv[2]
  ? path.resolve(process.argv[2])
  : DEFAULT_SOURCE_REPO;

const DEVEX_BUILD = path.join(
  SOURCE_REPO,
  "features/extensibility/add-on-hz-hlapi-sdk/devex/build"
);
const DOCS_SOURCE_DIR = path.join(DEVEX_BUILD, "reference");
const SIDEBAR_SOURCE_FILE = path.join(DEVEX_BUILD, "hlapi-sidebar.json");

const DEST_BASE = path.join(
  __dirname,
  "../src/pages/references/document-sandbox/document-apis"
);
const DEST_SIDEBAR_FILE = path.join(__dirname, "hlapi-sidebar.json");

const FOLDERS_TO_COPY = [
  "classes",
  "interfaces",
  "enumerations",
  "type-aliases",
  "namespaces",
];

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`  Warning: Source directory not found, skipping: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log(`Using source repository: ${SOURCE_REPO}`);

  if (!fs.existsSync(SOURCE_REPO)) {
    console.error(`Error: Source repository not found at ${SOURCE_REPO}`);
    console.error(
      "Provide the correct path as an argument or check your directory structure.\n\nExample:\n  npm run devex:sync-docs -- /path/to/hz"
    );
    process.exit(1);
  }

  if (!fs.existsSync(DOCS_SOURCE_DIR)) {
    console.error("Error: Documentation source directory not found.");
    console.error(`Missing: ${DOCS_SOURCE_DIR}`);
    console.error(
      "\nHave you run the generation script in the hz repo?\n  cd features/extensibility/add-on-hz-hlapi-sdk/devex && npm run generate:clean"
    );
    process.exit(1);
  }

  console.log("Copying documentation files...");
  for (const folder of FOLDERS_TO_COPY) {
    const src = path.join(DOCS_SOURCE_DIR, folder);
    const dest = path.join(DEST_BASE, folder);

    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }

    if (fs.existsSync(src)) {
      copyDir(src, dest);
      console.log(`  - Copied ${folder} -> ${dest}`);
    } else {
      console.log(`  - Skipped ${folder} (not in source)`);
    }
  }

  // Copy the overview.md entry file
  const overviewSrc = path.join(DOCS_SOURCE_DIR, "overview.md");
  if (fs.existsSync(overviewSrc)) {
    fs.copyFileSync(overviewSrc, path.join(DEST_BASE, "overview.md"));
    console.log("  - Copied overview.md");
  }

  console.log("Copying sidebar JSON...");
  if (fs.existsSync(SIDEBAR_SOURCE_FILE)) {
    fs.copyFileSync(SIDEBAR_SOURCE_FILE, DEST_SIDEBAR_FILE);
    console.log(`  - Copied hlapi-sidebar.json -> ${DEST_SIDEBAR_FILE}`);
  } else {
    console.error(`Error: Sidebar file not found at ${SIDEBAR_SOURCE_FILE}`);
    process.exit(1);
  }

  console.log(
    "\nDone. Run 'npm run devex:eds-sanitize' and 'npm run devex:generate-sidebar' to complete."
  );
} catch (error) {
  console.error("Import failed:", error.message);
  process.exit(1);
}
