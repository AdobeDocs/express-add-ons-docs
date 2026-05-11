# Claude Code guidance — Adobe Express add-on docs

This repo hosts the Adobe Express add-on developer documentation published at https://developer.adobe.com/express/add-ons/docs/. It is an EDS-based Markdown site built with `adp-devsite-utils`. Pages live under `src/pages/`; the published navigation is driven by `src/pages/config.md`.

## Build, preview, lint

- `npm run dev` — start the local dev server.
- `npm run lint` — Markdown lint with verbose output (the canonical pre-commit check).
- `npm run lint:errorOnly` — errors only, matches CI behavior.
- `npm run link:checkAllLinks` — internal and external link audit.
- `npm run buildNavigation` / `buildRedirections` / `buildContributors` — site metadata builds.

## File layout

- `src/pages/config.md` — the canonical sidebar. **Adding a page requires editing this file**, otherwise the page is not reachable.
- `src/pages/guides/`:
  - `getting-started/` — onboarding, changelog.
  - `learn/platform-concepts/` — **explanation**-type pages (the "why"; concept guides).
  - `learn/how-to/` — **task**-type pages (recipes; "How do I X?").
  - `learn/fundamentals/` — terminology and constants reference.
  - `build/` — building, design, distribution.
  - `support/` — support and FAQs.
- `src/pages/references/` — API reference (`addonsdk/`, `document-sandbox/`, `manifest/`, `ui-components/`). The `document-sandbox/document-apis/` tree is generated; do not hand-edit.
- `redirects.json` — URL redirects (large, JSON; edit with care, preserve shape).
- `scripts/` — utilities for HLAPI reference generation and `config.md` maintenance.

## Doc-type discipline

Every page in `src/pages/guides/learn/` serves **exactly one** purpose. Mixing them makes pages worse — link out instead of inlining material from another type.

| Type | Where | Posture |
| :--- | :--- | :--- |
| How-to | `learn/how-to/*.md` | Verb-first headings, API-first prose, no rationale. |
| Concepts / explanation | `learn/platform-concepts/*.md` | Understanding-oriented. The "why" lives here. |
| Reference | `references/**` | Information lookups. Generated for HLAPI; curated for UI/manifest. |

The canonical voice guide for each type — non-negotiable rules, structural patterns, examples — lives at `.claude/writing-styles.md`. **Read it before drafting a new page.**

## Frontmatter

Every page in `src/pages/` begins with YAML frontmatter. Conventional shape:

```yaml
---
keywords:
  - Adobe Express
  - ...
title: <Page title>
description: <One-sentence description, used for SEO and listing pages>
contributors:
  - https://github.com/<github-handle>
faq:
  questions:
    - question: "..."
      answer: "..."
canonical: true
ai_assistant_note: "<Short instruction for AI assistants explaining the page's purpose>"
semantic_tags:
  - canonical-reference
  - ...
---
```

- The `faq.questions` block in frontmatter **must be mirrored** as a `## FAQs` section at the bottom of the body. Keep them in sync (same order, same wording).
- `keywords` and `semantic_tags` feed search and AI surfaces — be specific.
- `ai_assistant_note` is a short hint for AI assistants about when this page is the right reference.

## MDX components

The repo is MDX. Common components seen in pages:

- `<InlineAlert variant="info|warning" slots="header, text1"/>` — callouts. Header + body delivered via the `slots` pattern.
- `<Details>` — collapsible blocks.
- `<CodeBlock>` — fenced code with extra controls.
- `<Embed>` — embedded media.

When unsure of a component's usage, search existing pages with the same component to find an idiomatic example.

## HLAPI reference generation

`src/pages/references/document-sandbox/document-apis/` is **generated** from the HLAPI source by scripts in `scripts/`. Do not hand-edit those files — changes will be overwritten on the next regeneration. The post-generation sanitization steps (manual find/replace for headings, indentation, link normalization) are documented in `README.md` under "Document API References - Manual Formatting Steps."

## Common pitfalls

- **`.cache/`, `public/`, `node_modules/` are build artifacts** — never commit them.
- **Don't hand-edit generated HLAPI reference pages** — update the source or the sanitizer scripts.
- **Don't break `redirects.json`'s shape** — it has a fixed `total`/`offset`/`limit`/`data` envelope; the `data` array contains the redirect entries.
- **Keep frontmatter `faq.questions` and body `## FAQs` in sync** — they are two copies of the same content and silently drift.
- **Em dashes are tight** — `word—word`, not `word — word`. Check the prevailing style in the page you're editing before introducing new ones.
- **Adding a page is two edits, not one** — create the `.md` file in the appropriate `src/pages/...` subfolder *and* add a line to `src/pages/config.md`. A page without a sidebar entry is orphaned.
- **Cross-link rather than inline** — if a how-to needs to explain *why*, link to the concept page instead of explaining it inline.

## When in doubt

- `.claude/writing-styles.md` — canonical voice guide for how-to vs. concepts.
- `README.md` — HLAPI reference generation workflow and manual formatting steps.
- `src/pages/config.md` — current IA; use existing siblings as templates for new pages.
