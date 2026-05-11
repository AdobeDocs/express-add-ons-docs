# Writing Styles — Adobe Express Add-ons Docs

Two distinct voices live in this repo. This file distills their **unique, operable signatures** so you can draft new pages "in the style of" either one. Generic conventions (uses Markdown, uses code blocks, has a title) are omitted — only the things that *distinguish* each style are kept.

Both styles must also adhere to a canonical documentation-system discipline: technical documentation splits into four types distinguished by *what the reader is trying to do*, and each page should serve exactly one of them. The repo's local conventions (frontmatter shape, MDX components, code idioms) sit on top of that mandated *purpose* and *posture*. When the canonical rules and local convention conflict, the canonical rules win.

---

## 0. Documentation-type alignment — read this first

Technical documentation splits into four types by *what they serve*:

| Type | Orientation | Answers | This repo |
|---|---|---|---|
| Tutorial | Learning | "Teach me the ropes" | not covered here (lives in `how-to/tutorials/*.md`) |
| **How-to guide** | **Task** | **"How do I X?"** | **`how-to/*.md` — our "how-to style"** |
| Reference | Information | "What are the parameters of Y?" | `references/**` (generated / separate) |
| **Explanation** | **Understanding** | **"Why does it work this way?"** | **`platform-concepts/*.md` — our "concepts style"** |

The central principle: **each page serves exactly one of these purposes.** Mixing them makes documentation worse — a reader mid-task has to wade through rationale, and a reader trying to understand has to skip past recipes. When you reach for material that belongs in another type, *link out* instead of inlining it.

### The non-negotiable rules for our two styles

**How-to guides (our how-to style):**

- **Goal-oriented.** A how-to answers a question a reader with foundational knowledge has already formulated. Don't reteach basics.
- **Must contain a list of steps, followed in order.** Recipes, not essays.
- **Start at a reasonable starting point**, not at absolute zero. Assume the add-on scaffolding, the SDK import, the manifest — unless *the task itself* is scaffolding/import/manifest.
- **Do not explain things.** When context is needed, link to an explanation page.
- **Practical usability > completeness.** Cover the common path in depth; don't enumerate every option.
- **Allow slight variations.** The snippet is a worked example, not the only way.
- **Title answers a "How to…?" question**, even when phrased imperatively ("Use Images" = *How to use images*).
- **Analogy:** a recipe.

**Explanations (our concepts style):**

- **Understanding-oriented.** Clarify and illuminate a topic; broaden coverage by stepping back from the software.
- **Discursive and relaxed.** Read at leisure, away from the code. Not task-driven, not learning-objective-driven.
- **Analytical and perspective-rich.** Discuss design decisions, historical reasons, technical constraints, alternatives, competing opinions.
- **Scope is author-chosen.** A reasonable area to cover at one time — not a task, not a learning outcome, not a module.
- **Do not instruct.** No procedural steps. No "do this, then that." No reference-style parameter tables as the main content.
- **Deepen knowledge even when it isn't directly applicable.** Explanations earn their keep by making the reader *think better*, not *do more*.
- **Analogy:** a book about the history and science of cooking — not a recipe, not a kitchen appliance manual.

### Cross-contamination patterns to stamp out

These are the seams where our current docs drift into the wrong type. Watch for them when drafting or reviewing:

- **How-to → Explanation drift:** a how-to introduces a class hierarchy, explains "why two runtimes exist", or teaches OOP. → **Cut it. Link to the concepts page.** Acceptable minimum: a one-sentence gloss + a link.
- **How-to → Reference drift:** a how-to tries to enumerate every option of every method, every error code, every format. → **Cut to the common case. Link to the reference.**
- **Explanation → How-to drift:** an explanation walks the reader through building a specific feature with a runnable, copy-pasteable sequence. → **If the walkthrough exists to illuminate a concept (e.g. how to read the Reference), keep it but frame it as illustration, not instruction. If it exists to teach how to build the thing, move it to a tutorial page under `how-to/tutorials/`.**
- **Explanation → Reference drift:** an explanation becomes a table of every property of every class. → **Tables are fine when they illuminate a contrast (two runtimes, two APIs). They're not fine as a substitute for the Reference.**
- **Explanation → Tutorial drift:** an explanation starts with "Step 1… Step 2…". → Tutorials are learning-oriented, explanations are understanding-oriented. If the piece exists to teach a beginner the ropes, it's a tutorial and belongs elsewhere.

### Known deviations in the current corpus (drafting note)

When you use existing pages as stylistic exemplars, be aware they sometimes breach the separation:

- `create-renditions.md` opens with a *What Are Renditions Used For?* bulleted list and a *Two Approaches* overview — borderline explanation inside a how-to. When writing a new how-to, prefer to skip those and link to a concepts page if one exists.
- `use-images.md` and `use-text.md` contain small embedded explainers (e.g. *Iframe vs. Document Sandbox* callouts, *Media Node structure* tree, *Text Classes* note). These are pragmatic — the concept pages are thin — but each one is a smell. Pattern: a one-sentence gloss + a link to the concepts page is the clean version; the current inline explainers are the compromise.
- `document-api.md` contains a long *From theory to practice* walkthrough that prototypes the Dimensions add-on step by step. That's tutorial material, not explanation. It survives because the framing is *"learn to navigate the Reference"*, not *"learn to build this feature"* — the walkthrough is the *illustration of a reading practice*, not the product. If you write a new explanation, don't default to this shape; reach for it only when the explanation's subject genuinely is *how to read the Reference* or *how to think about the DOM*.
- `architecture.md` carries many runnable snippets with `ENVIRONMENT/FILE/PURPOSE` headers. Fine as illustrations of patterns, but resist adding "click this button, then open your browser" procedural content.

---

## 1. How-To style — "cookbook"

Location: `src/pages/guides/learn/how-to/*.md`
Exemplars: `use-images.md`, `use-text.md`, `modal-dialogs.md`, `create-renditions.md`, `use-color.md`, `element-metadata.md`.

### Frontmatter signature

- **Bloated `keywords` list** (15–40 items) dominated by **concrete API names** — method names, class names, constant names, property names — alongside the feature. This is the fingerprint: keywords read like a symbol dump, not a topic cloud.
- `title`: verb-first, imperative, task-shaped — "Use Images", "Create Renditions", "Use Modal Dialogs", "Apply Character Styles".
- `description`: often a terse restatement of the title ("Use Images.", "Use Text."). Occasionally a one-liner for pages that deserve SEO (e.g. `create-renditions.md`).
- `contributors`: GitHub URLs (usually `undavide` + `hollyschinsky`).
- **`faq.questions` block**: 8–20 Q/A pairs that cover the page. These are mirrored verbatim at the end of the page as an `## FAQs` section (`#### Q: ...` / `**A:** ...`). The duplication is intentional and expected.

### Page shape

1. `# Title` (matches frontmatter title).
2. No "Overview" section — just a **one-sentence lede** or a direct dive into the first task. Sometimes preceded by a short flavor line ("Text is an essential part of any design. Let's explore…"). Often no lede at all; straight into `## First Task`.
3. A sequence of **verb-first H2 sections**, each a self-contained recipe: *Import Images into the page*, *Import Animated images*, *Replace Media*, *Create Text*, *Apply Character Styles*, *Use Fonts*, *Deal with Text Flow*. Order is roughly "create → read → modify → edge cases".
4. Inside each H2: 1–3 sentence prose that **names the method, links to its reference, and states what it expects/returns**, then an `### Example` (sometimes `### Example: <specific flavor>`) with a runnable snippet. Optionally repeat for variant flavors.
5. `## FAQs` at the bottom, mirroring frontmatter.
6. No "Related topics" / "Next steps" / "Lessons learned" footer — that belongs to the concepts style.

### Prose patterns (the recognizable cadence)

- **API-first sentences**: "The `editor.createText()` method accepts a string as a parameter, and returns a brand new `StandaloneTextNode`." Subject is the API, verb is `accepts`/`returns`/`expects`/`is used to`.
- **Reference-link density**: almost every API mention is a Markdown link into `references/...`. Never mention a method without linking it on first use in the section.
- **Parenthetical type glosses**: "…returns a [`StandaloneTextNode`]…", "an optional [`MediaAttribute`] object with the image's title and author".
- **Second person, imperative**: "Call …", "Use …", "Pass …", "Please refer to …". "Please note that …" and "Please refer to …" recur enough to be verbal tics.
- **Short paragraphs**; long enumerations collapse to plain bulleted lists of enum members ("confirmation, information, warning, destructive, error, input, and custom").
- **Light, occasional whimsy** in example strings and asides: "Hello, World!", "It's Friday, don't deploy to Production!", "All image formats are equal, but some formats are more equal than others." Never in the prose proper — only in string payloads and the occasional aside.

### Code-snippet conventions (strongly canonical — reuse exactly)

- **First line of every snippet is a path comment** identifying the runtime/file: `// ui/index.js` or `// sandbox/code.js`. A reader should never have to guess which side a snippet belongs to.
- **Imports are always shown**, at the top of each snippet, even if repeated across the page:
  - iframe: `import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";`
  - sandbox: `import addOnSandboxSdk from "add-on-sdk-document-sandbox";` and `import { editor, ... } from "express-document-sdk";`
- **Ready-guard boilerplate** in iframe snippets: `addOnUISdk.ready.then(async () => { … });`. Sandbox snippets use `runtime.exposeApi({ ... })`.
- **Emoji pointers inside code** to highlight the one line that matters in a long snippet: `// 👈`, `// 👈 👀`, `// ⚠️ Queueing the edit`, plus `✅` / `❌` side-by-side to contrast wrong vs. right idioms (e.g. string literal vs. `constants.*`).
- **Before/after diagrams in comments** for string ops: ASCII rulers showing original text, indices, and the operated range:
  ```
  // Original text: 1234567890
  // Indices      : 0123456789
  // Range        :   ^^^^^
  // Replaced text: 01abcde890
  ```
- **Multi-file recipes** use the MDX component pattern: `<CodeBlock slots="heading, code" repeat="N" languages="..."/>` followed by `#### HTML`, `#### CSS`, `#### iFrame JS`, `#### Document JS`. Always in that order when applicable.
- **Playground-enabled snippets** use the odd dash-delimited fenced language: `js-data-playground-session-id="foo"-data-playground-mode="playground"-…`. Preserve verbatim when porting.
- **"Assuming the user has selected …"** is the standard opener when a snippet depends on selection state — avoids rebuilding context every time.

### Component palette (MDX)

- `<InlineAlert slots="header, text" variant="info|warning|success"/>` — followed by `#### Header` and body paragraph(s). Use `warning` for experimental APIs and manifest-required flags; `info` for "belongs to the iframe/sandbox side" clarifications; `success` occasionally for YES/NO checklists.
- **Recurring callout: Experimental API warning**, almost word-for-word across pages:
  > **IMPORTANT:** The `X` API is currently ***experimental only*** and requires the `experimentalApis` flag set to `true` in the [`requirements`](../../../references/manifest/index.md#requirements) section of `manifest.json`.
- **Recurring callout: iframe vs. sandbox location** — a small box reminding the reader which runtime a method belongs to, especially when the page mixes sides.
- `<CodeBlock slots="heading, code" repeat="N"/>` for multi-file snippets.
- `<HorizontalLine />` rarely — reserved for concepts-style pages.

### What a how-to **does not** do

- Does **not** explain *why* the architecture is the way it is (that's the concepts job — but it will link to it).
- Does **not** teach OOP, scenegraph theory, or the runtime model. It references them in a single sentence and links out.
- Does **not** use footnotes, "Lessons Learned" sections, or "Related Topics" footers.
- Does **not** narrate the author's thought process. It tells the reader what to type.
- Does **not** use metaphors. (Phones, remote controls, contracts, blueprints — all belong to the other style.)

### How-to drafting checklist

Purpose gates (fail any → not a how-to):

1. **Can you phrase the page's purpose as "How to X?"** If no, you're writing something else.
2. **Is every H2 a task (verb + object), performable as a step sequence?** If an H2 reads like "What is X" or "Why X", move it to an explanation page.
3. **Does the reader need prior knowledge to even ask this question?** If no, it's a tutorial, not a how-to.
4. **Are you explaining rationale, history, or architecture anywhere?** If yes, cut or link out. The ceiling is *one sentence + link*.
5. **Are you trying to be complete?** Stop. Show the common path, link the Reference for the rest.

Local conventions:

6. Frontmatter: API-name keywords, verb-first title, `faq.questions` array.
7. No overview section. Open with the first task (or a one-sentence lede into it).
8. H2s are tasks, not topics. Inside each: one-paragraph method description with ref links → `### Example` → snippet → short aftermath note / caveat.
9. Every snippet: file-path comment (`// ui/index.js` or `// sandbox/code.js`), imports, ready-guard, emoji pointer on the key line.
10. Experimental flag warning wherever applicable, in the canonical wording.
11. Mirror the `faq.questions` at the bottom as `## FAQs`.
12. Close with *no* "Related Topics" / "Next Steps" / "Lessons Learned" — those belong to explanation pages.

---

## 2. Concepts / Narrative style — "explainer"

Location: `src/pages/guides/learn/platform-concepts/*.md` (and kin like deep architecture guides).
Exemplars: `architecture.md`, `context.md`, `document-api.md`.

### Frontmatter signature

- **Much larger keywords list** (30–60 items) dominated by **concept names** rather than API symbols: "Dual-Runtime", "Singleton Pattern", "Scenegraph", "Inheritance", "CORS", "Sandbox Permissions", "Iframe Runtime", "Communication APIs". APIs appear, but as secondary tags.
- `title`: **noun phrase, not imperative** — "Add-on Architecture", "Document API Concepts", "Iframe Runtime Context & Security". Often appended with "Guide" in the H1 ("Add-on Architecture **Guide**").
- `description`: a real sentence describing scope and audience — "A comprehensive deep-dive guide to …", "Learn about the structures that make up …", "Essential guide to …".
- **Canonical-reference metadata block** (the strongest fingerprint):
  ```yaml
  canonical: true
  ai_assistant_note: "This is the authoritative … Use this to explain …"
  semantic_tags:
    - canonical-reference
    - architecture-guide
    - …
  ```
  If a page has `canonical: true` + `ai_assistant_note` + `semantic_tags`, it is concept-style.

### Page shape

1. `# Title Guide` (or similar noun-phrase H1).
2. **`## Overview`** — 2–4 sentences framing what the page covers and its audience. Usually includes a "New to X terminology?" `<InlineAlert>` linking to a glossary or terminology page.
3. **Big-picture section first** (the "what / why" before the "how"): *Dual-Runtime Architecture*, *The Adobe Express DOM*, *Iframe Runtime Environment*. Often accompanied by a diagram (`![](images/architecture.svg)`).
4. **Didactic middle**: concept definition → motivation → example → caveat → deeper implication. Sections like *Object-Oriented programming concepts*, *How to read the Document API Reference*, *The importance of Constants*.
5. **Cross-cutting tables**: runtime comparison tables, class hierarchy tables, feature matrices. `| Attribute | Details |` is a recurring skeleton.
6. **"From theory to practice"** walkthrough (common in `document-api.md`): the author prototypes something step-by-step, narrating the discovery journey through the reference ("Lo and behold, …", "the reference helps us out again").
7. **Common Mistakes** block — ❌/✅ contrasts with *explanation* (not just the fix). Distinguishes from how-to emoji pointers by being discursive.
8. **`## FAQs`** (sometimes) — conceptual Q/A, longer answers, not cookbook-shaped.
9. **`<HorizontalLine />`** separator.
10. **`## Related Topics`** — bulleted cross-links with one-line descriptions.
11. **`## Next Steps`** — pointers into how-tos / tutorials.
12. Optionally **`## Lessons Learned`** — bulleted recap of key takeaways (ends `document-api.md`).
13. Sometimes **footnotes** (`[^1]`, `[^2]`) at the very bottom — a strong style tell, unique to this format.

### Prose patterns (the recognizable cadence)

- **Why before how**. Every mechanism is framed by its rationale: "This isolation is fundamental to Adobe Express's security model, allowing third-party add-ons to extend functionality without compromising user data or application stability."
- **Metaphors and analogies are a core device, not decoration**:
  - runtime-as-phone: "Think of it like a phone — each side has their own phone with two key methods."
  - `apiProxy()`-as-remote-control: "Think of it as getting a 'remote control' for the other environment."
  - class-as-blueprint, interface-as-contract.
  - POJO explained by its acronym's literal etymology.
  Use at least one structural metaphor per major concept.
- **Vocabulary-building rhetoric**. The author explicitly sets terms and contrasts them ("Some confusion may arise regarding the meaning of the following terms — let me clarify.") and returns to them. A dedicated `## Terms` section at the bottom (as in `context.md`) defines origin / domain / subdomain / allowed list of origins is characteristic.
- **Authorial presence, essayistic voice**. How-tos are faceless; concepts have a narrator: "let me clarify", "Lo and behold", "let me remind you", "the reference helps us out again", "Why, then?", "If you wonder where all the help is since you've to type the entire color object manually anyway…". First-person plural ("Let's return to …") and rhetorical questions are frequent.
- **Reference pages are read *with* the reader**, not linked *at* them. Concepts pages quote the reference, inspect it, and reason out loud about what a property's type means. How-tos just link. This is the single most diagnostic difference in prose.
- **Longer paragraphs, denser prose**. Multiple clauses per sentence. Subordination. Footnote-worthy asides.
- **Progressive mental model**: later sections name-check earlier ones ("as discussed earlier", "as we did for [setting other styles]"). The page is a layered argument, not a set of independent recipes.

### Code-snippet conventions

- **Snippets serve the argument**, not the other way around. A snippet is usually introduced by "Given all this, it's possible to confidently write something along these lines." The prose explains what the snippet will demonstrate *before* showing it.
- **ENVIRONMENT / FILE / PURPOSE header comments** at the top of many snippets in `architecture.md`:
  ```
  /**
   * ENVIRONMENT: Iframe Runtime (UI)
   * FILE: src/ui/index.js
   * PURPOSE: Handle user interactions and trigger document operations
   * SDK: Add-on UI SDK
   */
  ```
  This is a concepts-page pattern — how-to snippets use a single path comment.
- **Pattern-labelled code blocks**: `/** PATTERN: UI-Triggered Document Operations / FLOW: User Action (iframe) → API Call → Document Change (sandbox) */`. Concepts pages name patterns.
- **ASCII trees / diagrams inside fenced `text` blocks** for structure (runtime hierarchy, scenegraph), in addition to image diagrams.
- Anti-pattern blocks with inline commentary — not just `❌ / ✅`, but **three or more labelled mistakes** followed by the correct idiom with explanation.

### Tables — canonical uses

- **Environment comparison table** (`| Attribute | Details |`) per runtime: File, SDKs Used, Capabilities, with `<br/>` bullets inside a cell.
- **API-comparison matrix**: `| Feature | API A | API B |` (Runtime, Scope, Formats, Background…). Used when two APIs overlap.
- **Permissions / options tables** mapping name → type → description.

### Component palette (MDX)

- `<InlineAlert variant="info|warning|success" slots="header, text1, text2, ..."/>` with multi-slot bodies, often used as "Important Concept" framing, terminology cross-refs, or YES/NO pattern guides (success variant, with ✅ / ❌ lines inside).
- `<HorizontalLine />` separating the body from Related Topics / Next Steps.
- Image diagrams: `![](images/architecture.svg)`, `![](./images/refs-addon-scenegraph.png)` — usually one per major section, with architectural or hierarchical content.
- Footnotes at bottom via `[^n]`.

### What a concepts page **does not** do

- Does **not** front-load runnable recipes. Snippets illustrate, they are not the product.
- Does **not** duplicate FAQ content from frontmatter verbatim at the bottom (though it may have a conceptual FAQ section).
- Does **not** use emoji pointers inside code (`// 👈`) as its primary emphasis tool — it uses prose.
- Does **not** live entirely in the imperative. It asks rhetorical questions, proposes, clarifies.

### Concepts drafting checklist

Purpose gates (fail any → not an explanation):

1. **Could the page be read at leisure, away from the code?** If the reader needs to be at a keyboard to make use of it, it's a how-to or tutorial.
2. **Is the scope defined by the subject, not by a task, module, or learning outcome?** "The two-runtime architecture", "the DOM", "iframe security" — yes. "How to set up OAuth", "Building your first add-on" — no, those are elsewhere.
3. **Does every section deepen understanding rather than instruct?** If a section tells the reader what to type, it's leaking into how-to territory.
4. **Are you discussing design decisions, tradeoffs, alternatives, or history?** If none of these appear anywhere on the page, it's probably just a reference or how-to in disguise.
5. **If there are snippets, are they illustrations of an argument, not instructions to copy?** Snippets must serve the prose, not vice versa.
6. **When the reader finishes, will they *think better* about the system, even if they can't yet *do* anything new?** That's the explanation test.

Local conventions:

7. Frontmatter: concept-name keywords, noun-phrase title, description-as-sentence, `canonical: true` + `ai_assistant_note` + `semantic_tags` if this is authoritative.
8. `## Overview` first, 2–4 sentences, with a "new to the terminology?" signpost.
9. Lead with the *what and why* — model, rationale, boundaries — before any API call.
10. Reach for a metaphor for each major concept (phone, blueprint, contract, remote control, scenegraph-as-tree).
11. Build at least one comparison table for dual things (runtimes, APIs, permissions) — *to illuminate a contrast*, not to duplicate the Reference.
12. If you include a walkthrough, frame it as *illustration of a thinking practice* (e.g. how to navigate the Reference), not as a build-this-feature tutorial. Default is: no walkthrough. Reach for it only when the walkthrough is genuinely the subject.
13. Add a Common Mistakes block with ❌/✅ plus **explanation of why the wrong form is wrong** — just showing the fix is reference material, not explanation.
14. Close with `<HorizontalLine />`, Related Topics, Next Steps, and optionally Lessons Learned. Footnotes if there are asides worth preserving.
15. Link *out* to how-tos for anything procedural, and to the Reference for exhaustive API surfaces. Explanations are the hub; the other quadrants are the spokes.

---

## Quick decision: which style am I writing?

| Signal | How-to (task-oriented) | Concepts (understanding-oriented) |
|---|---|---|
| Orientation | Task | Understanding |
| Reader's question | "How do I X?" | "What is X and why does it work this way?" |
| Analogy | Recipe | Book on the history/science of cooking |
| Title shape | Verb-first ("Use Images") | Noun phrase ("Add-on Architecture") |
| Frontmatter keywords | API symbol dump | Concept vocabulary |
| Opens with | First task, no overview | `## Overview` + framing |
| Code role | Protagonist, ready to paste | Illustration of an argument |
| Voice | Faceless imperative | Essayistic narrator, rhetorical questions |
| References | Linked at | Read alongside, quoted, reasoned about |
| Distinctive closers | `## FAQs` mirroring frontmatter | Related Topics · Next Steps · Lessons Learned · footnotes |
| Metaphors | Rare | Core device |
| Starting point | Reasonable mid-point, assumes experience | Anywhere the author chooses — scope is subject-defined |
| Completeness | Common path only; link Reference for rest | Breadth of perspective on the chosen subject |
| Forbidden content | Explanation, rationale, history | Procedural steps, parameter enumerations |

If you're not sure, ask whether the page would be referenced by someone mid-task (how-to) or by someone trying to understand the system before or between tasks (concepts). If both — **it's two pages**: write the explanation, write the how-to, and have them link to each other. Conflating the two makes both worse.
