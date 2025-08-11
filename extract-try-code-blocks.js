#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const https = require("https");

const BACKEND_API_URL = process.env.CODE_BLOCK_API_URL
const SCAN_DIRECTORY = "./src/pages";
const MARKDOWN_EXTENSION = ".md";
const DRY_RUN = process.env.DRY_RUN === "false" ? false : true;
const JSONBIN_MASTER_KEY = process.env.JSONBIN_MASTER_KEY;

console.log("BACKEND_API_URL", BACKEND_API_URL);
console.log("JSONBIN_MASTER_KEY", JSONBIN_MASTER_KEY);
console.log("DRY_RUN", DRY_RUN);

// looks for code blocks with format: ```language{try id=explicitId}
const CODE_BLOCK_REGEX =
  /```(\w+)\{try(?:\s+id=([a-zA-Z0-9_-]+))?\}\s*\n([\s\S]*?)\n```/g;

/**
 * Find all markdown files in a directory.
 * @param dir - The directory to scan.
 * @returns an array of markdown file paths.
 */
async function findMarkdownFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath)));
    } else if (
      entry.isFile() &&
      path.extname(entry.name) === MARKDOWN_EXTENSION
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Extract code blocks from a markdown file.
 * @param content - The content of the markdown file.
 * @param filePath - The path of the markdown file.
 * @returns an array of code blocks.
 */
function extractCodeBlocks(content, filePath) {
  const blocks = [];
  let match;
  CODE_BLOCK_REGEX.lastIndex = 0;

  while ((match = CODE_BLOCK_REGEX.exec(content)) !== null) {
    const [, language, explicitId, code] = match;
    const id = explicitId || Math.random().toString(36).substring(2, 8);

    blocks.push({
      id,
      language,
      code: code.trim(),
      filePath,
    });
  }
  return blocks;
}

/**
 * Store a code block in the backend API.
 * @param block - The code block to store.
 */
async function storeCodeBlock(block) {
  if (DRY_RUN) return;

  if (!JSONBIN_MASTER_KEY) {
    throw new Error("Missing JSONBIN_MASTER_KEY");
  }

  const postData = JSON.stringify({
    record: {
      id: block.id,
      language: block.language,
      code: block.code,
      filePath: block.filePath,
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      BACKEND_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
          "X-Master-Key": JSONBIN_MASTER_KEY,
          "X-Bin-Name": block.id,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          res.statusCode < 300
            ? resolve()
            : reject(new Error(`HTTP ${res.statusCode}`));
        });
      }
    );

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Main function to run the code block extractor.
 * 1. Find all markdown files in the scan directory.
 * 2. Extract code blocks from each markdown file.
 * 3. Store each code block in the backend API.
 */
async function run() {
  const markdownFiles = await findMarkdownFiles(SCAN_DIRECTORY);

  for (const filePath of markdownFiles) {
    const content = await fs.readFile(filePath, "utf8");
    const blocks = extractCodeBlocks(content, filePath);

    for (const block of blocks) {
      console.log(`File: ${filePath}`);
      console.log(`Code:\n${block.code}\n`);

      try {
        await storeCodeBlock(block);
      } catch (error) {
        console.error(`API Error for ${block.id}: ${error.message}`);
      }
    }
  }
}

run().catch(console.error);
