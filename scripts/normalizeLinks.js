const path = require("path");
const fs = require("node:fs");
const matchAll = require("string.prototype.matchall");
const {
  ROOT_DIR,
  DOC_APIS_SUBDIR,
  getDeployableFiles,
  getMarkdownFiles,
  replaceLinksInFile,
  getFindPatternForMarkdownFiles: getFindPattern,
  getReplacePatternForMarkdownFiles: getReplacePattern,
  removeFileExtension,
} = require("./scriptUtils.js");

function normalizeLinksInMarkdownFile(file, files) {
  const relativeToDir = path.dirname(file);
  const relativeFiles = files.map((f) => path.relative(relativeToDir, f));
  const linkMap = new Map();
  const linkPattern = getFindPattern("[^)#]*");

  const absFile = path.resolve(ROOT_DIR, file);
  const data = fs.readFileSync(absFile, "utf8");
  const links = matchAll(data, new RegExp(linkPattern, "gm"));

  [...links].forEach((link) => {
    const optionalPrefix = link[2] ?? "";
    const from = link[3] ?? "";
    let to = from;

    const hasTrailingSlash =
      to.endsWith("/") || (optionalPrefix.endsWith("/") && !to);
    if (hasTrailingSlash) {
      to = `${to}index.md`;
    }

    to = to.replaceAll("/", path.sep);

    const absolute = path.resolve(path.resolve(ROOT_DIR, relativeToDir), to);
    to = path.relative(path.resolve(ROOT_DIR, relativeToDir), absolute);

    const potentialExts = relativeFiles
      .filter((f) => removeFileExtension(f) === to)
      .map((f) => path.extname(f));
    if (potentialExts.length === 1) {
      const ext = potentialExts[0];
      if (!to.endsWith(ext) && to) {
        to = `${to}${ext}`;
      }
    }

    const toExists = relativeFiles.find((f) => to === f);
    to = to.replaceAll(path.sep, "/");

    if (to !== from && toExists) {
      linkMap.set(from, to);
    }
  });

  replaceLinksInFile({ file, linkMap, getFindPattern, getReplacePattern });
}

try {
  const files = getDeployableFiles(DOC_APIS_SUBDIR);
  const mdFiles = getMarkdownFiles(DOC_APIS_SUBDIR);
  console.log(`Normalizing links in ${mdFiles.length} markdown files...`);
  mdFiles.forEach((mdFile) => normalizeLinksInMarkdownFile(mdFile, files));
  console.log("Done normalizing links.");
} catch (err) {
  console.error("Link normalization failed:", err);
  process.exit(1);
}
