const path = require("path");
const fs = require("node:fs");
const {
  ROOT_DIR,
  DOC_APIS_SUBDIR,
  getDeployableFiles,
  getMarkdownFiles,
  getFindPatternForMarkdownFiles,
  getReplacePatternForMarkdownFiles,
  removeFileExtension,
  replaceLinksInFile,
} = require("./scriptUtils.js");

function toKebabCase(str) {
  const isScreamingSnakeCase = /^[A-Z0-9_]*$/.test(str);
  str = isScreamingSnakeCase ? str.toLowerCase() : str;
  return str
    .match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    )
    .map((x) => x.toLowerCase())
    .join("-");
}

function toEdsCase(str) {
  return /^[a-z0-9-]*$/.test(str) ? str : toKebabCase(str);
}

function toEdsPath(file) {
  const renamed = removeFileExtension(file)
    .split(path.sep)
    .map((token) => toEdsCase(token))
    .join(path.sep);
  return `${renamed}${path.extname(file)}`;
}

function getFileMap(files) {
  const map = new Map();
  files.forEach((from) => {
    const to = toEdsPath(from);
    if (to !== from) map.set(from, to);
  });
  return map;
}

function getLinkMap(fileMap, relativeToDir) {
  const linkMap = new Map();
  fileMap.forEach((toFile, fromFile) => {
    let fromRel = path.relative(relativeToDir, fromFile).replaceAll(path.sep, "/");
    let toRel = path.relative(relativeToDir, toFile).replaceAll(path.sep, "/");
    linkMap.set(fromRel, toRel);
  });
  return linkMap;
}

function renameLinksInMarkdownFile(fileMap, file) {
  const dir = path.dirname(file);
  replaceLinksInFile({
    file,
    linkMap: getLinkMap(fileMap, dir),
    getFindPattern: getFindPatternForMarkdownFiles,
    getReplacePattern: getReplacePatternForMarkdownFiles,
  });
}

function renameLinksInSidebarJSON(fileMap) {
  const sidebarPath = path.resolve(ROOT_DIR, "scripts/hlapi-sidebar.json");
  if (!fs.existsSync(sidebarPath)) return;

  let data = fs.readFileSync(sidebarPath, "utf8");
  fileMap.forEach((toFile, fromFile) => {
    const fromRel = fromFile.replaceAll(path.sep, "/");
    const toRel = toFile.replaceAll(path.sep, "/");
    const fromPath = fromRel.replace(/^src\/pages\//, "");
    const toPath = toRel.replace(/^src\/pages\//, "");
    if (fromPath !== toPath) {
      data = data.replaceAll(fromPath, toPath);
    }
  });
  fs.writeFileSync(sidebarPath, data, "utf-8");
}

function deleteEmptyDirectoryUpwards(startDir, stopDir) {
  const absStart = path.isAbsolute(startDir)
    ? startDir
    : path.resolve(ROOT_DIR, startDir);
  const absStop = path.isAbsolute(stopDir)
    ? stopDir
    : path.resolve(ROOT_DIR, stopDir);
  if (!fs.existsSync(absStart)) return;
  if (fs.readdirSync(absStart).length === 0 && absStart !== absStop) {
    fs.rmdirSync(absStart);
    deleteEmptyDirectoryUpwards(path.dirname(absStart), absStop);
  }
}

function renameFiles(map) {
  map.forEach((to) => {
    const absToDir = path.resolve(ROOT_DIR, path.dirname(to));
    if (!fs.existsSync(absToDir)) fs.mkdirSync(absToDir, { recursive: true });
  });
  map.forEach((to, from) => {
    const absFrom = path.resolve(ROOT_DIR, from);
    const absTo = path.resolve(ROOT_DIR, to);
    if (fs.existsSync(absFrom)) fs.renameSync(absFrom, absTo);
  });
  map.forEach((_, from) => {
    deleteEmptyDirectoryUpwards(path.dirname(from), ROOT_DIR);
  });
}

try {
  const files = getDeployableFiles(DOC_APIS_SUBDIR);
  const fileMap = getFileMap(files);

  if (fileMap.size === 0) {
    console.log("No files need renaming.");
    process.exit(0);
  }

  console.log(`Renaming ${fileMap.size} files to kebab-case...`);

  const mdFiles = getMarkdownFiles();
  mdFiles.forEach((mdFile) => renameLinksInMarkdownFile(fileMap, mdFile));

  renameLinksInSidebarJSON(fileMap);
  renameFiles(fileMap);

  console.log("Done renaming files.");
} catch (err) {
  console.error("Rename failed:", err);
  process.exit(1);
}
