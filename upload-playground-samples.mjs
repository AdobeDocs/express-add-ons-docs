#!/usr/bin/env node

import { config } from "dotenv";
import fs from "fs-extra";
import path from "path";
import JSZip from "jszip";

config();

const PAGES_DIRECTORY = "./src/pages";
const MARKDOWN_EXTENSION = ".md";
const IMS_BASE_URL = process.env.IMS_BASE_URL;
const IMS_TOKEN_ENDPOINT = "/ims/token/v1";
const FFC_BASE_URL = process.env.FFC_BASE_URL;
const FFC_PLAYGROUND_ENDPOINT = "/v1/playground/projects";
const FFC_REQUEST_ID = "x-request-id";

const PLAYGROUND_CLIENT_ID = process.env.PLAYGROUND_CLIENT_ID;
const PLAYGROUND_CLIENT_SECRET = process.env.PLAYGROUND_CLIENT_SECRET;
const PLAYGROUND_AUTH_CODE = process.env.PLAYGROUND_AUTH_CODE;
const PLAYGROUND_API_KEY = process.env.PLAYGROUND_API_KEY;

// looks for code blocks with format: ```language{try id=explicitId}
const CODE_BLOCK_REGEX =
  /```(\w+)\{try(?:\s+id=([a-zA-Z0-9_-]+))?\}\s*\n([\s\S]*?)\n```/g;

/**
 * Exchange an IMS authorization code for a service token.
 * @returns service token.
 */
async function getImsServiceToken() {
  try {
    if (
      !PLAYGROUND_CLIENT_ID ||
      !PLAYGROUND_CLIENT_SECRET ||
      !PLAYGROUND_AUTH_CODE
    ) {
      throw new Error(
        "One or more of CLIENT_ID, CLIENT_SECRET, or AUTH_CODE is not set"
      );
    }

    const url = new URL(IMS_TOKEN_ENDPOINT, IMS_BASE_URL);
    const formBody = new URLSearchParams({
      client_id: PLAYGROUND_CLIENT_ID,
      client_secret: PLAYGROUND_CLIENT_SECRET,
      code: PLAYGROUND_AUTH_CODE,
      grant_type: "authorization_code",
    }).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`IMS token error HTTP ${response.status}: ${errorText}`);
    }

    const parsed = await response.json();
    if (!parsed.access_token) {
      throw new Error("Missing access_token in IMS response");
    }

    return parsed.access_token;
  } catch (error) {
    console.error("Error getting IMS service token:", error.message);
    throw error;
  }
}

/**
 * Comment out express-document-sdk import statements in code.
 * The Code Playground Script mode automatically imports these modules,
 * so we comment them out to avoid conflicts while preserving them for educational context.
 * @param code - The code to process.
 * @returns the code with import statements commented out.
 */
function commentOutExpressDocumentSDKImports(code) {
  // Comment out import statements for express-document-sdk
  // Handles various import formats:
  // - import { editor } from "express-document-sdk";
  // - import { editor, fonts } from "express-document-sdk";
  // - import * as expressSDK from "express-document-sdk";
  // - Single or double quotes
  const importRegex = /^(import\s+.*\s+from\s+["']express-document-sdk["'];?\s*)$/gm;
  
  // Replace with commented version and add helpful note
  const processedCode = code.replace(
    importRegex, 
    "// Note: Uncomment the import below when using in your add-on's code.js\n// $1"
  );
  
  return processedCode;
}

/**
 * Create a zip file from a code block.
 * @param block - The code block to create a zip file from.
 */
async function createZipFileFromCodeBlock(block) {
  const zip = new JSZip();
  // Comment out express-document-sdk imports before adding to zip
  const processedCode = commentOutExpressDocumentSDKImports(block.code);
  zip.file("script.js", processedCode);
  return zip.generateAsync({ type: "nodebuffer" });
}

/**
 * Upload a code block to FFC with retry logic.
 * @param block - The code block to store.
 * @param projectId - The project ID corresponding to the code block.
 * @param maxRetries - Maximum number of retry attempts (default: 3).
 * @returns the response from the FFC API.
 */
async function uploadCodeBlockToFFC(codeBlock, projectId, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Process the code and log it for verification
      const processedCode = commentOutExpressDocumentSDKImports(codeBlock.code);
      
      if (attempt === 1) {
        console.log(`\n📤 Uploading: ${projectId} (from ${codeBlock.filePath})`);
      } else {
        console.log(`   Retry ${attempt - 1}/${maxRetries - 1}: ${projectId}`);
      }

      const accessToken = await getImsServiceToken();
      const url = new URL(
        `${FFC_PLAYGROUND_ENDPOINT}/${projectId}`,
        FFC_BASE_URL
      );

      // Create zip with the already-processed code
      const zip = new JSZip();
      zip.file("script.js", processedCode);
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

      const form = new FormData();
      form.append(
        "file",
        new Blob([zipBuffer], { type: "application/zip" }),
        `${projectId}.zip`
      );
      form.append("name", projectId);
      
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/vnd.adobe-ffcaddon.response+json",
          Authorization: `Bearer ${accessToken}`,
          "x-api-key": PLAYGROUND_API_KEY,
        },
        body: form,
      });

      if (!response.ok) {
        const text = await response.text();
        const requestId = response.headers.get(FFC_REQUEST_ID);
        
        // Log request ID for debugging
        if (requestId) {
          console.log(`   FFC Request ID: ${requestId}`);
        }
        
        throw new Error(
          `Failed to upload code block to FFC - HTTP ${response.status}: ${text}`
        );
      }
      
      console.log(`✅ Successfully uploaded: ${projectId}`);
      return response.json();
      
    } catch (error) {
      lastError = error;
      
      // If this was the last attempt, don't retry
      if (attempt === maxRetries) {
        console.error(`❌ Failed to upload (${projectId}) after ${maxRetries} attempts: ${error.message}`);
        throw error;
      }
      
      // Exponential backoff: wait 2^attempt seconds
      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(`   ⏳ Waiting ${waitTime / 1000}s before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw lastError;
}

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
  const codeBlocks = [];
  let match;
  CODE_BLOCK_REGEX.lastIndex = 0;

  while ((match = CODE_BLOCK_REGEX.exec(content)) !== null) {
    const [, language, explicitId, code] = match;

    if (!explicitId) {
      throw new Error(`Code block missing mandatory ID tag: ${filePath}.`);
    }

    console.log(`Uploading code block to FFC: ${explicitId}`);
    codeBlocks.push({
      id: explicitId,
      language,
      code: code.trim(),
      filePath,
    });
  }
  return codeBlocks;
}

/**
 * Main function to run the code block extractor.
 * 1. Find all markdown files in the pages directory.
 * 2. Extract code blocks from each markdown file.
 * 3. Store each code block in the backend API with retry logic.
 */
async function run() {
  const markdownFiles = await findMarkdownFiles(PAGES_DIRECTORY);
  let successCount = 0;
  let failureCount = 0;

  for (const filePath of markdownFiles) {
    const content = await fs.readFile(filePath, "utf8");
    const codeBlocks = extractCodeBlocks(content, filePath);

    for (const codeBlock of codeBlocks) {
      try {
        await uploadCodeBlockToFFC(codeBlock, codeBlock.id);
        successCount++;
        
        // Small delay between uploads to avoid overwhelming the backend
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        failureCount++;
        console.error(`Skipping ${codeBlock.id} due to upload failure.`);
        // Continue with next upload instead of failing entire script
      }
    }
  }
  
  console.log(`\n${"=".repeat(80)}`);
  console.log(`📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📦 Total: ${successCount + failureCount}`);
  console.log("=".repeat(80));
  
  if (failureCount > 0) {
    console.log(`\n⚠️  Some uploads failed. You may need to run the script again.`);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
