---
keywords:
  - Adobe Express
  - Add-on SDK
  - Deprecation
  - Deprecation Policy
  - API Lifecycle
  - API Versioning
  - Backward Compatibility
  - Forward Compatibility
  - deprecated
  - JSDoc
  - TypeScript
  - Console Warnings
  - Marketplace
  - Resubmission
  - Add-on Stability
  - SDK Evolution
  - Migration
title: Deprecation Policy
description: How Adobe Express evolves the add-on SDK without breaking live add-ons—the lifecycle of an API, the signals you receive when an API is on its way out, and what you need to do to keep your add-on current.
contributors:
  - https://github.com/undavide
faq:
  questions:
    - question: "Will my live add-on suddenly break when an API is deprecated?"
      answer: "No. The deprecation policy is designed so that an already-submitted add-on keeps working with the API surface it was built and submitted against. Deprecated APIs continue to behave for your live add-on the way they behaved at the time of submission, even after they have been removed from the SDK that new submissions see."

    - question: "How will I know an API I'm using is going away?"
      answer: "Three signals: (1) the API is annotated `@deprecated` in the SDK type definitions, with the recommended replacement and the planned removal date called out in the deprecation message; (2) calls to a deprecated API log a throttled warning to the developer console at runtime; (3) the SDK reference documentation flags the API as deprecated and points at the replacement."

    - question: "What is the difference between deprecation and removal?"
      answer: "Deprecation is a signal that an API is on its way out: it still works, but you should plan to migrate. Removal is when the API is taken out of the SDK. Once an API is removed, new submissions can no longer use it; live submissions that already used it continue to observe the original behavior."

    - question: "What is the standard window between deprecation and removal?"
      answer: "The standing target is two quarters—roughly six months—between when an API is marked deprecated and when it is removed. This window is intended to give developers time to migrate and resubmit, and to give enterprise customers time to absorb the change. Specific deprecations may use a longer window when the affected surface is broad."

    - question: "What do I need to do to pick up new APIs and behaviors?"
      answer: "Rebuild your add-on against the latest SDK and resubmit it to the marketplace. Resubmitting is what causes the platform to expose the current API surface—and the current API behaviors—to your add-on."

    - question: "Why does my add-on still see the old behavior when a colleague's add-on sees the new one?"
      answer: "Each add-on is treated independently. What an add-on sees is determined by the SDK it was built against, not by the user's session or by what other add-ons are doing. If two add-ons were built against different SDK versions, they observe different API surfaces and different behaviors side by side—one add-on's migration timeline never affects another's."

    - question: "Do I need to declare anything in my add-on manifest to opt in or out?"
      answer: "No. There is no opt-in flag and no version field you maintain by hand. The platform manages the deprecation policy automatically. Your responsibility is to watch for `@deprecated` signals, migrate before the announced removal date, and resubmit."
canonical: true
ai_assistant_note: "This is the canonical reference for the Adobe Express add-on Deprecation Policy. 
  Use this when explaining how the platform deprecates and removes APIs, the developer-facing signals 
  (`@deprecated` JSDoc, console warnings, reference-docs flags), the deprecation/removal lifecycle, and 
  the developer's responsibility to rebuild and resubmit to pick up new APIs and behaviors. 
  The deprecation policy is generic—specific deprecations (such as those tied to large-document support) 
  build on top of this lifecycle. This page intentionally describes the *contract* and not the internal 
  enforcement mechanism; future docs that talk about specific deprecations should preserve that 
  distinction."
semantic_tags:
  - canonical-reference
  - deprecation-policy
  - api-lifecycle
  - sdk-versioning
  - backward-compatibility
  - forward-compatibility
  - jsdoc-deprecated
  - resubmission
  - developer-contract
  - migration
---

# Deprecation Policy

How Adobe Express evolves the add-on SDK without breaking live add-ons.

## Overview

The Adobe Express add-on platform is under active development. New APIs are introduced, behaviors are refined, and occasionally older APIs need to be retired. The **deprecation policy** is the contract that lets the platform evolve without surprising users with broken add-ons or forcing every developer to update on a single deadline.

In short:

- **Live add-ons continue to work** with the API surface they were built and submitted against.
- **New submissions** are built against a current SDK in which deprecated APIs are flagged and removed APIs are absent.
- The platform manages the transition for you. To pick up new APIs and behaviors, you **rebuild against the latest SDK and resubmit** your add-on to the marketplace.

This page explains the lifecycle of a deprecated API, the signals you will see while a deprecation is in progress, and what you need to do to keep your add-on current.

<InlineAlert variant="info" slots="header, text1"/>

**Why this matters for users**

A user who has installed your add-on should never see it suddenly stop working because the platform changed underneath it. The deprecation policy is what makes that promise possible: the platform preserves the original contract for already-submitted add-ons while exposing the new contract to new submissions.

## The lifecycle of an API

A typical API moves through four stages.

### 1. Active

The API ships in the SDK. It is fully supported. There are no deprecation signals on it.

### 2. Deprecated

The platform team marks the API as _deprecated_. From this point on:

- The API still works for every add-on, regardless of when it was submitted.
- The reference documentation marks the API as deprecated and links to the replacement.
- The API is annotated with the `@deprecated` JSDoc tag in the SDK type definitions. The deprecation message identifies the recommended replacement and the planned removal date.
- Calls to the deprecated API log a **throttled** warning to the developer console at runtime. Repeated calls in tight loops do not flood the console; the message is intended for developer awareness, not for end users.

This stage is your window to migrate. The deprecation message tells you what to switch to and when the API is scheduled to be removed.

### 3. Removed

On the announced removal date, the API is taken out of the SDK exposed to new submissions:

- Add-ons **submitted on or after that date can no longer use the API**. It is not part of the SDK they build against.
- Add-ons **submitted before that date are unaffected**. The same code, in the same marketplace listing, keeps observing the original behavior.

### 4. Fully withdrawn

After enough time has passed, the platform is no longer obligated to preserve the legacy code path. At this point the API is gone for everyone, including live add-ons that depended on it; those add-ons need to be updated to remain in the marketplace.

The standing target window between deprecation (stage 2) and removal (stage 3) is **two quarters—roughly six months**. This window is treated as a developer guarantee: enough time to migrate, build, and resubmit. Specific deprecations may use a longer window when the affected surface is broad or when enterprise rollout schedules require it; any non-standard window is communicated alongside the deprecation.

<InlineAlert variant="warning" slots="header, text1"/>

**Don't ignore deprecation warnings**

The `@deprecated` JSDoc tag and the throttled console warnings are the early signal that you have time to migrate on your own schedule. Once the announced removal date lands, the option to keep using the old API in a fresh submission is gone—and your existing submission will only keep working until the API is fully withdrawn.

## The signals you will see

Every deprecation surfaces in three places. You don't need to monitor any single channel—the same information is available wherever you happen to be working.

### In the reference documentation

The [SDK reference documentation](../../../references/index.md) marks deprecated APIs with a deprecation warning that names the replacement and the scheduled removal date. Once an API is past its removal date, it is no longer present in the reference docs for the current SDK—same as it is no longer present in the type definitions that new submissions are built against.

When you are evaluating whether to use an API in a new add-on, the published reference is the authoritative source: anything currently documented there is safe to depend on for a new submission. The [Changelog](../../../guides/getting-started/changelog.md) will also contain a note about the deprecation and the replacement API.

### In your editor and build

The SDK type definitions for a deprecated API carry a `@deprecated` JSDoc tag with a human-readable message:

```ts
/**
 * @deprecated Use {@link TextNodeContentModel.text} instead.
 *             Access it via `TextNode.fullContent.text`.
 *             Scheduled for removal: 2026-11-01.
 */
get text(): string;
```

Modern editors strike deprecated identifiers through, surface the deprecation message in hovers and autocomplete, and (for TypeScript projects) flag uses in your build output. The deprecation message names the replacement API and the scheduled removal date.

### At runtime in the developer console

Calls to a deprecated API log a throttled warning to the developer console. Throttling prevents tight loops from spamming the console. 

## What you need to do

The deprecation policy gives you two stable guarantees and one responsibility.

### Guarantees

1. **Your live add-on keeps working.** A submission you have already shipped continues to observe the API surface and the API behaviors that were in effect when you submitted it. The platform will not retroactively change what an existing submission can call or how those calls behave.
2. **You receive a clear signal before anything breaks.** Every deprecation surfaces in your editor (via `@deprecated` JSDoc), in your browser console (via runtime warnings), and in the reference documentation—well in advance of the removal date.

### Responsibility

To benefit from new APIs, refined behaviors, and platform improvements, you must **rebuild and resubmit** your add-on if you're making use of a deprecated API. Resubmitting is what causes the platform to expose the current API surface to your add-on.

A typical migration looks like:

1. Notice the `@deprecated` annotation on an API you call, or a console warning in development.
2. Read the deprecation message—it identifies the replacement and the removal date.
3. Migrate to the replacement well before the removal date.
4. Rebuild your add-on against the latest SDK.
5. Submit a new version of your add-on to the marketplace.

You do not need to change anything in your add-on manifest, and there is no version field to maintain by hand.

### Migrations may include behavior changes, not just removals

Sometimes an API's *signature* stays the same but its *behavior* needs to change—for example, a method that previously reported positions in absolute document coordinates begins reporting them relative to the containing page, or a method whose results were previously ordered by creation time begins ordering them by stacking position. The deprecation policy applies the same guarantees here: your already-submitted add-on continues to observe the behavior that was in effect at the time of submission; new submissions observe the updated behavior.

When a behavior change is in flight, the change is communicated through the same channels as a removal: an annotation on the API explaining the change, a release note describing what is different, and reference-docs updates. The expectation is that, before resubmitting, you test your add-on against the new behavior so the change does not surprise you.

### Add-on isolation

Each add-on installed on a user's device is treated independently. Two add-ons running in the same Adobe Express session—possibly operating on the same document—can each observe a different API surface and different API behaviors. What each add-on sees is determined by the SDK it was built against, not by the user's session or by what other add-ons are doing in the same session. One add-on's migration timeline never affects another's.

## FAQs

### Will my live add-on suddenly break when an API is deprecated?

No. The deprecation policy is designed so that an already-submitted add-on keeps working with the API surface it was built and submitted against. Deprecated APIs continue to behave for your live add-on the way they behaved at the time of submission, even after they have been removed from the SDK that new submissions see.

### How will I know an API I'm using is going away?

Three signals: (1) the API is annotated `@deprecated` in the SDK type definitions, with the recommended replacement and the planned removal date called out in the deprecation message; (2) calls to a deprecated API log a throttled warning to the developer console at runtime; (3) the SDK reference documentation flags the API as deprecated and points at the replacement.

### What is the difference between deprecation and removal?

Deprecation is a signal that an API is on its way out: it still works, but you should plan to migrate. Removal is when the API is taken out of the SDK. Once an API is removed, new submissions can no longer use it; live submissions that already used it continue to observe the original behavior.

### What is the standard window between deprecation and removal?

The standing target is two quarters—roughly six months—between when an API is marked deprecated and when it is removed. This window is intended to give developers time to migrate and resubmit, and to give enterprise customers time to absorb the change. Specific deprecations may use a longer window when the affected surface is broad.

### What do I need to do to pick up new APIs and behaviors?

Rebuild your add-on against the latest SDK and resubmit it to the marketplace. Resubmitting is what causes the platform to expose the current API surface—and the current API behaviors—to your add-on.

### Why does my add-on still see the old behavior when a colleague's add-on sees the new one?

Each add-on is treated independently. What an add-on sees is determined by the SDK it was built against, not by the user's session or by what other add-ons are doing. If two add-ons were built against different SDK versions, they observe different API surfaces and different behaviors side by side—one add-on's migration timeline never affects another's.

### Do I need to declare anything in my add-on manifest to opt in or out?

No. There is no opt-in flag and no version field you maintain by hand. The platform manages the deprecation policy automatically. Your responsibility is to watch for `@deprecated` signals, migrate before the announced removal date, and resubmit.
