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
const LLMS_CONFIG_PATH = path.join(PAGES_DIR,'llms-config.json');
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

  if (desc.length <= 240) {
    return desc;
  }
  
  const sentences = desc.match(/[^.!?]+[.!?]+/g);
  
  if (sentences && sentences.length > 0) {
    const firstSentence = sentences[0].trim();
  
    if (firstSentence.length <= 240) {
      return firstSentence;
    }
  }
    
  return '';
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

function cleanDescription(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const description = str
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!description) {
    return '';
  }

  // Reject incomplete Markdown links.
  if (
    description.includes('](') ||
    description.includes('[') ||
    description.includes('](')
  ) {
    return '';
  }

  if (description.length <= 240) {
    return description;
  }

  const sentences = description.match(
    /[^.!?]+[.!?]+/g
  );

  if (sentences?.length) {
    const firstSentence = sentences[0].trim();

    if (firstSentence.length <= 240) {
      return firstSentence;
    }
  }

  return '';
}

function matchesRule(section, page, rule) {
  const match = rule.match || {};

  const sectionTitle = section.title.toLowerCase();
  const pageTitle = page.title.toLowerCase();
  const pageHref = page.href.toLowerCase();

  let hasCondition = false;

  if (match.section) {
    hasCondition = true;

    if (
      sectionTitle !==
      String(match.section).toLowerCase()
    ) {
      return false;
    }
  }

  if (match.sectionContains) {
    hasCondition = true;

    if (
      !sectionTitle.includes(
        String(match.sectionContains).toLowerCase()
      )
    ) {
      return false;
    }
  }

  if (match.hrefContains) {
    hasCondition = true;

    if (
      !pageHref.includes(
        String(match.hrefContains).toLowerCase()
      )
    ) {
      return false;
    }
  }

  if (match.titleContains) {
    hasCondition = true;

    if (
      !pageTitle.includes(
        String(match.titleContains).toLowerCase()
      )
    ) {
      return false;
    }
  }

  return hasCondition;
}

function resolveConfiguredSection(
  section,
  page,
  llmsConfig
) {
  const matchingRule =
    llmsConfig.sectionMappings.find(rule =>
      matchesRule(section, page, rule)
    );

  return matchingRule
    ? matchingRule.target.trim()
    : section.title;
}

function groupSections(sections, llmsConfig) {
  const grouped = new Map();
  const discoveredOrder = new Map();

  let discoveredIndex = 0;

  for (const section of sections) {
    for (const page of section.pages) {
      const targetSection =
        resolveConfiguredSection(
          section,
          page,
          llmsConfig
        );

      if (!grouped.has(targetSection)) {
        grouped.set(targetSection, []);
        discoveredOrder.set(
          targetSection,
          discoveredIndex++
        );
      }

      grouped.get(targetSection).push(page);
    }
  }

  const configuredOrder = new Map(
    llmsConfig.sectionOrder.map(
      (title, index) => [title, index]
    )
  );

  return [...grouped.entries()]
    .map(([title, pages]) => ({
      title,
      pages,
    }))
    .sort((first, second) => {
      const firstConfigured =
        configuredOrder.has(first.title);

      const secondConfigured =
        configuredOrder.has(second.title);

      if (firstConfigured && secondConfigured) {
        return (
          configuredOrder.get(first.title) -
          configuredOrder.get(second.title)
        );
      }

      if (firstConfigured) return -1;
      if (secondConfigured) return 1;

      return (
        discoveredOrder.get(first.title) -
        discoveredOrder.get(second.title)
      );
    });
}

//generate llms.txt from config md file... If the repo has a llms-config.json file, use that to group the sections.
function generate(siteBase) {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error('src/pages/config.md not found. Run this from a content repo root.');
  }

  const { pathPrefix, sections } = parseConfigMd(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  const llmsConfig = loadLlmsConfig();
  if (!pathPrefix) throw new Error('Could not extract pathPrefix from config.md');

  const indexFm = parseFrontmatter(path.join(PAGES_DIR, 'index.md'));
  const repoTitle = indexFm.title || 'Adobe Express Add-ons Documentation';
  const repoDesc = indexFm.description || 'Official developer documentation and API reference for building Adobe Express add-ons.';

  let totalPages = 0;
  const sourceSections = sections.map(section => {
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
        description: fm.description || ''
      };
    });
    totalPages += pages.length;
    return { title: section.title, pages };
  });

  const enrichedSections = groupSections(sourceSections, llmsConfig);
  // Assemble output per llms.txt v2 spec
  let output = `# ${repoTitle}\n\n`;
  if (repoDesc) output += `> ${repoDesc}\n\n`;

  if (fs.existsSync(CONTEXT_PATH)) {
    const contextContent = fs.readFileSync(CONTEXT_PATH, 'utf-8').trim();
    if (contextContent) output += `${contextContent}\n\n`;
  }

  output +=
  'The links below are organized by developer task and API runtime. ' +
  'When retrieving a page, send the `Accept: text/markdown` header ' +
  'to receive LLM-optimized Markdown.\n\n';

  for (const section of enrichedSections) {
    if (section.pages.length === 0) continue;
    output += `## ${section.title}\n\n`;
    for (const page of section.pages) {
      const desc = page.description ? `: ${cleanDescription(page.description)}` : '';
      output += `- [${page.title}](${page.url})${desc}\n`;
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

//load the llms-config.json file if it exists.
function loadLlmsConfig() {
  if (!fs.existsSync(LLMS_CONFIG_PATH)) {
    return {
      sectionOrder: [],
      sectionMappings: [],
    };
  }

  try {
    const content = fs.readFileSync(
      LLMS_CONFIG_PATH,
      'utf-8'
    );

    const config = JSON.parse(content);

    return {
      sectionOrder: Array.isArray(config.sectionOrder)
        ? config.sectionOrder
        : [],
      sectionMappings: Array.isArray(config.sectionMappings)
        ? config.sectionMappings
        : [],
    };
  } catch (error) {
    throw new Error(
      `Invalid llms-config.json: ${error.message}`
    );
  }
}

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

module.exports.standalone = () => {
  const idx = process.argv.indexOf('--site-base');
  const siteBase = idx !== -1 ? process.argv[idx + 1] : DEFAULT_SITE_BASE;

  const result = generate(siteBase);
  console.log(`Repo: ${result.repoTitle}`);
  console.log(`Path prefix: ${result.pathPrefix}`);
  console.log(`Generated ${result.outputPath} (${result.sizeKB} KB, ${result.pageCount} entries across ${result.sectionCount} sections)`);
};
