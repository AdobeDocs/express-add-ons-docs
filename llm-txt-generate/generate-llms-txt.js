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
const CONTEXT_PATH = path.join(PAGES_DIR, 'llms-context.md');
const OUTPUT_PATH = path.join(PAGES_DIR, 'llms.txt');
const DEFAULT_SITE_BASE = 'https://developer.adobe.com';
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/;

// Parse config.md into { pathPrefix, sections: [{ title, pages: [{ title, href }] }] }
function parseConfigMd(content) {
  const lines = content.replace(/\r/g, '').split('\n');
  let pathPrefix = '', inSubPages = false, currentHeader = '', currentSection = null;
  const sections = [];
  const seenHrefs = new Set();

  const getOrCreateSection = (title) => {
    let sec = sections.find(s => s.title === title);
    if (!sec) sections.push(sec = { title, pages: [] });
    return sec;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\s*-\s*pathPrefix:/.test(line)) {
      const match = lines[i + 1]?.match(/\s*-\s*(\S+)/);
      if (match) pathPrefix = match[1];
      continue;
    }

    if (/^\s*-\s*subPages:/.test(line)) { inSubPages = true; continue; }
    if (/^\s*-\s*(buttons|home|versions):/.test(line)) { inSubPages = false; continue; }
    if (!inSubPages) continue;

    const indentMatch = line.match(/^(\s*)-\s+(.*)$/);
    if (!indentMatch) continue;

    const indent = indentMatch[1].length;
    const rawText = indentMatch[2].trim();

    // Explicit section headers, e.g. "Learn header"
    const headerMatch = rawText.match(/^(.+?)\s+header$/i);
    if (headerMatch) {
      currentSection = getOrCreateSection(currentHeader = headerMatch[1].trim());
      continue;
    }

    const match = rawText.match(LINK_RE);
    if (!match) continue;

    const [, title, href] = match;
    if (href.startsWith('http') || seenHrefs.has(href)) continue;
    seenHrefs.add(href);

    // Determine section dynamically based on config.md hierarchy
    if (currentHeader) {
      currentSection = (currentHeader === 'Learn' || currentHeader === 'Build')
        ? (indent === 4 ? getOrCreateSection(`${currentHeader} - ${title.trim()}`) : currentSection)
        : getOrCreateSection(currentHeader);
    } else if (indent === 4) {
      currentSection = getOrCreateSection(title.trim());
    }

    (currentSection ||= getOrCreateSection('Overview')).pages.push({ title: title.trim(), href: href.trim() });
  }

  return { pathPrefix, sections: sections.filter(s => s.pages.length > 0) };
}

// Extract first descriptive paragraph directly from markdown body text
function extractTextDescription(content) {
  const text = content
    .replace(/^---\s*[\s\S]*?---\s*/, '')
    .replace(/<[^>]+>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[\*\*@[^\]]+\]\([^)]+\)/g, '');

  const lines = text.split('\n');
  let foundHeading = false;
  const paragraph = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraph.length > 0) break;
      continue;
    }
    if (trimmed.startsWith('#')) {
      if (foundHeading && paragraph.length > 0) break;
      foundHeading = true;
      continue;
    }
    if (!foundHeading) continue;
    if (trimmed.startsWith('|') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (paragraph.length > 0) break;
      continue;
    }
    paragraph.push(trimmed);
  }

  const desc = paragraph.join(' ')
    .replace(/\[`?([^\]`]+)`?\]\([^)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!desc) return '';
  if (desc.length <= 180) return desc;
  const period = desc.indexOf('. ', 60);
  return (period !== -1 && period < 200) ? desc.slice(0, period + 1) : desc.slice(0, 177) + '...';
}

// Parse YAML frontmatter or fallback to extracting description from markdown text
function parseFrontmatter(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

  const fm = {};
  if (fmMatch) {
    const lines = fmMatch[1].split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const colonIdx = line.indexOf(':');
      if (colonIdx < 0 || /^\s/.test(line)) continue;

      const key = line.slice(0, colonIdx).trim();
      if (!key) continue;

      const inlineVal = line.slice(colonIdx + 1).trim();
      if (inlineVal) {
        fm[key] = inlineVal;
        continue;
      }

      const listItems = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        listItems.push(lines[++i].replace(/^\s*-\s+/, '').trim());
      }
      if (listItems.length > 0) fm[key] = listItems;
    }
  }

  if (!fm.description) {
    const textDesc = extractTextDescription(content);
    if (textDesc) fm.description = textDesc;
  }

  return fm;
}

const cleanDescription = (str) => str.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

// Main pipeline — read config.md → enrich → assemble → write
function generate(siteBase) {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error('src/pages/config.md not found. Run this from a content repo root.');
  }

  const { pathPrefix, sections } = parseConfigMd(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  if (!pathPrefix) throw new Error('Could not extract pathPrefix from config.md');

  const indexFm = parseFrontmatter(path.join(PAGES_DIR, 'index.md'));
  const repoTitle = indexFm.title || 'Adobe Express Add-ons Documentation';
  const repoDesc = indexFm.description || 'Official developer documentation and API reference for building Adobe Express add-ons.';

  let totalPages = 0;
  const enrichedSections = sections.map(section => {
    const pages = section.pages.map(page => {
      let localPath = page.href.replace(/^\.\//, '/');
      if (!localPath.startsWith('/')) localPath = '/' + localPath;

      let filePath = path.join(PAGES_DIR, localPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.md');
      } else if (!filePath.endsWith('.md')) {
        filePath += '.md';
      }

      const fm = parseFrontmatter(filePath);
      return {
        title: fm.title || page.title,
        href: page.href,
        url: siteBase + pathPrefix.replace(/\/$/, '') + localPath,
        description: fm.description || '',
        keywords: Array.isArray(fm.keywords) ? fm.keywords : [],
      };
    });
    totalPages += pages.length;
    return { title: section.title, pages };
  });

  // Assemble output per llms.txt v2 spec
  let output = `# ${repoTitle}\n\n`;
  if (repoDesc) output += `> ${repoDesc}\n\n`;

  if (fs.existsSync(CONTEXT_PATH)) {
    const contextContent = fs.readFileSync(CONTEXT_PATH, 'utf-8').trim();
    if (contextContent) output += `${contextContent}\n\n`;
  }

  output += 'For detailed documentation on any page below, request the URL with `Accept: text/markdown` header to receive LLM-optimized markdown.\n\n';

  for (const section of enrichedSections) {
    if (section.pages.length === 0) continue;
    output += `## ${section.title}\n\n`;
    for (const page of section.pages) {
      const desc = page.description ? `: ${cleanDescription(page.description)}` : '';
      const kw = page.keywords.length > 0 ? ` [${page.keywords.join(', ')}]` : '';
      output += `- [${page.title}](${page.url})${desc}${kw}\n`;
    }
    output += '\n';
  }

  fs.writeFileSync(OUTPUT_PATH, output);

  return {
    pathPrefix,
    repoTitle,
    pageCount: totalPages,
    sectionCount: enrichedSections.length,
    outputPath: OUTPUT_PATH,
    sizeKB: (output.length / 1024).toFixed(1),
  };
}

// Entry point for actions/github-script
module.exports = async ({ core, siteBase }) => {
  try {
    const result = generate(siteBase || DEFAULT_SITE_BASE);
    console.log(`Generated ${result.outputPath} (${result.sizeKB} KB, ${result.pageCount} entries across ${result.sectionCount} sections)`);
    core.setOutput('llms_txt_path', result.outputPath);
    core.setOutput('page_count', result.pageCount);
  } catch (err) {
    core.setFailed(`llms.txt generation failed: ${err.message}`);
  }
};

// Standalone entry point: node -e "require('./generate-llms-txt.js').standalone()"
module.exports.standalone = () => {
  const idx = process.argv.indexOf('--site-base');
  const siteBase = idx !== -1 ? process.argv[idx + 1] : DEFAULT_SITE_BASE;

  const result = generate(siteBase);
  console.log(`Repo: ${result.repoTitle}`);
  console.log(`Path prefix: ${result.pathPrefix}`);
  console.log(`Generated ${result.outputPath} (${result.sizeKB} KB, ${result.pageCount} entries across ${result.sectionCount} sections)`);
};
