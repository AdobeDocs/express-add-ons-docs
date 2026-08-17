/**
 * Generates a per-repo llms.txt from the content repo's config.md and page frontmatter.
 *
 * Called from GitHub Actions via actions/github-script:
 *
 *   const generate = require('./adp-devsite-scripts/llm-txt-generate/generate-llms-txt.js');
 *   await generate({ core, siteBase: 'https://developer.adobe.com' });
 *
 * Or standalone:
 *
 *   node -e "require('./generate-llms-txt.js').standalone()"
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join('src', 'pages', 'config.md');
const PAGES_DIR = path.join('src', 'pages');
const OUTPUT_PATH = path.join(PAGES_DIR, 'llms.txt');
const DEFAULT_SITE_BASE = 'https://developer.adobe.com';

// ---------------------------------------------------------------------------
// READ: Parse config.md to extract pathPrefix and page links
// ---------------------------------------------------------------------------

function parseConfigMd(content) {
  const lines = content.split('\n');
  let pathPrefix = '';
  const pages = [];
  let inPages = false;
  let inSubPages = false;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\s*-\s*pathPrefix:/.test(line)) {
      const nextLine = lines[i + 1];
      const match = nextLine?.match(/\s*-\s*(\S+)/);
      if (match) pathPrefix = match[1];
      continue;
    }

    if (/^\s*-\s*pages:/.test(line)) { inPages = true; inSubPages = false; continue; }
    if (/^\s*-\s*subPages:/.test(line)) { inSubPages = true; inPages = false; continue; }
    if (/^\s*-\s*(buttons|home|versions):/.test(line)) {
      inPages = false; inSubPages = false; continue;
    }

    if (!inPages && !inSubPages) continue;

    const match = line.match(linkRe);
    if (!match) continue;

    const [, title, href] = match;
    if (href.startsWith('http')) continue;

    pages.push({ title: title.trim(), href: href.trim() });
  }

  return { pathPrefix, pages };
}

// ---------------------------------------------------------------------------
// READ: Parse YAML frontmatter (title, description, keywords) from a .md file.
// Handles both single-line values and multi-line YAML lists (e.g. keywords).
// ---------------------------------------------------------------------------

function parseFrontmatter(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!fmMatch) return {};

  const fm = {};
  const lines = fmMatch[1].split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const colonIdx = line.indexOf(':');
    if (colonIdx < 0) continue;

    const key = line.slice(0, colonIdx).trim();
    if (!key || /^\s/.test(line)) continue;

    const inlineVal = line.slice(colonIdx + 1).trim();

    if (inlineVal) {
      fm[key] = inlineVal;
    } else {
      const listItems = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        i++;
        listItems.push(lines[i].replace(/^\s*-\s+/, '').trim());
      }
      if (listItems.length > 0) {
        fm[key] = listItems;
      }
    }
  }
  return fm;
}

function cleanDescription(str) {
  return str.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// GENERATE: Main pipeline — read → enrich → assemble → write
// ---------------------------------------------------------------------------

function generate(siteBase) {

  // --- Step 1: READ config.md to get pathPrefix and the list of page links ---

  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error('src/pages/config.md not found. Run this from a content repo root.');
  }

  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const { pathPrefix, pages } = parseConfigMd(configContent);

  if (!pathPrefix) {
    throw new Error('Could not extract pathPrefix from config.md');
  }

  // --- Step 2: READ repo-level metadata from index.md frontmatter ---

  const indexFm = parseFrontmatter(path.join(PAGES_DIR, 'index.md'));
  const repoTitle = indexFm.title || pathPrefix.replace(/^\/|\/$/g, '').replace(/[-_]/g, ' ');
  const repoDesc = indexFm.description || '';

  // --- Step 3: ENRICH each page with its frontmatter metadata ---
  // For every page link found in config.md, resolve the .md file on disk
  // and read its frontmatter `title`, `description`, and `keywords` fields.

  const seen = new Set();
  const uniquePages = pages.filter(p => {
    if (seen.has(p.href)) return false;
    seen.add(p.href);
    return true;
  });

  const enriched = uniquePages.map(page => {
    let localPath = page.href.replace(/^\.\//, '/');
    if (!localPath.startsWith('/')) localPath = '/' + localPath;

    let filePath = path.join(PAGES_DIR, localPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.md');
    } else if (!filePath.endsWith('.md')) {
      filePath += '.md';
    }

    const fm = parseFrontmatter(filePath);
    const fullUrl = siteBase + pathPrefix.replace(/\/$/, '') + localPath;

    const title = fm.title || page.title;
    const keywords = Array.isArray(fm.keywords) ? fm.keywords : [];

    return {
      title,
      url: fullUrl,
      description: fm.description || '',
      keywords,
    };
  });

  // --- Step 4: ASSEMBLE the llms.txt output string ---

  let output = `# ${repoTitle}\n\n`;
  if (repoDesc) {
    output += `> ${repoDesc}\n\n`;
  }
  output += 'For detailed documentation on any page below, request the URL with `Accept: text/markdown` header to receive LLM-optimized markdown.\n\n';
  output += '## Pages\n\n';

  for (const page of enriched) {
    const desc = page.description ? `: ${cleanDescription(page.description)}` : '';
    const kw = page.keywords.length > 0 ? ` [${page.keywords.join(', ')}]` : '';
    output += `- [${page.title}](${page.url})${desc}${kw}\n`;
  }

  output += '\n';

  // --- Step 5: WRITE to src/pages/llms.txt ---

  fs.writeFileSync(OUTPUT_PATH, output);

  return {
    pathPrefix,
    repoTitle,
    pageCount: enriched.length,
    outputPath: OUTPUT_PATH,
    sizeKB: (output.length / 1024).toFixed(1),
  };
}

// Entry point for actions/github-script
module.exports = async ({ core, siteBase }) => {
  try {
    const result = generate(siteBase || DEFAULT_SITE_BASE);
    console.log(`Generated ${result.outputPath} (${result.sizeKB} KB, ${result.pageCount} entries)`);
    core.setOutput('llms_txt_path', result.outputPath);
    core.setOutput('page_count', result.pageCount);
  } catch (err) {
    core.setFailed(`llms.txt generation failed: ${err.message}`);
  }
};

// Standalone entry point: node -e "require('./generate-llms-txt.js').standalone()"
module.exports.standalone = () => {
  const siteBase = process.argv.includes('--site-base')
    ? process.argv[process.argv.indexOf('--site-base') + 1]
    : DEFAULT_SITE_BASE;

  const result = generate(siteBase);
  console.log(`Repo: ${result.repoTitle}`);
  console.log(`Path prefix: ${result.pathPrefix}`);
  console.log(`Generated ${result.outputPath}`);
};
