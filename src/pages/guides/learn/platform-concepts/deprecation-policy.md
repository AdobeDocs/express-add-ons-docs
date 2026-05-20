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
  - TypeScript
  - Console Warnings
  - Marketplace
  - Resubmission
  - Add-on Stability
  - SDK Evolution
  - Migration
  - Experimental APIs
  - experimentalApis
  - User Experience
title: Deprecation Policy
description: How Adobe Express evolves the add-on SDK without breaking live add-ons—the lifecycle of an API, the signals you receive when an API is on its way out, and what you need to do to keep your add-on current.
contributors:
  - https://github.com/undavide
faq:
  questions:
    - question: "Will my live add-on suddenly break when an API is deprecated?"
      answer: "No. The deprecation policy is designed so that an already-submitted add-on keeps working with the API surface it was built and submitted against. Deprecated APIs continue to behave for your live add-on the way they behaved at the time of submission, even after they have been removed from the SDK that new submissions see."

    - question: "How will I know an API I'm using is going away?"
      answer: "Three signals: (1) modern editors flag the API as deprecated, with the recommended replacement and the planned removal date called out in the deprecation message; (2) calls to a deprecated API log a throttled warning to the developer console at runtime; (3) the SDK reference documentation flags the API as deprecated and points at the replacement."

    - question: "What is the difference between deprecation and removal?"
      answer: "Deprecation is a signal that an API is on its way out: it still works, but you should plan to migrate. Removal is when the API is taken out of the SDK. Once an API is removed, new submissions can no longer use it; live submissions that already used it continue to observe the original behavior."

    - question: "What is the standard window between deprecation and removal?"
      answer: "The window varies by deprecation. Each announcement names a scheduled removal date. The intent is to give developers enough time to migrate, build, and resubmit, and to give enterprise customers time to absorb the change. Specific deprecations may use a longer window when the affected surface is broad."

    - question: "What do I need to do to pick up new APIs and behaviors?"
      answer: "Rebuild your add-on against the latest SDK and resubmit it to the marketplace. Resubmitting is what causes the platform to expose the current API surface—and the current API behaviors—to your add-on."

    - question: "Why does my add-on still see the old behavior when a colleague's add-on sees the new one?"
      answer: "Each add-on is treated independently. What an add-on sees is determined by the SDK it was built against, not by the user's session or by what other add-ons are doing. If two add-ons were built against different SDK versions, they observe different API surfaces and different behaviors side by side—one add-on's migration timeline never affects another's."

    - question: "Will my users see anything when an API I use is deprecated?"
      answer: "Usually not. The deprecation lifecycle is mostly invisible in the Adobe Express UI."

    - question: "Are experimental APIs covered by this policy?"
      answer: "No. Experimental APIs are explicitly outside this lifecycle: they can change shape, change behavior, or be withdrawn at any time, without a deprecation phase or scheduled removal date. They are also only allowed during development—the `experimentalApis: true` flag in your `manifest.json` must be removed before you submit your add-on to the marketplace, so an experimental API will never be present in a live submission."

    - question: "Do I need to declare anything in my add-on manifest to opt in or out?"
      answer: "No. There is no opt-in flag and no version field you maintain by hand. The platform manages the deprecation policy automatically. Your responsibility is to watch for deprecation signals, migrate before the announced removal date, and resubmit. (The `experimentalApis: true` flag is unrelated—it controls access to experimental APIs, which sit outside this lifecycle.)"
canonical: true
ai_assistant_note: "This is the canonical reference for the Adobe Express add-on Deprecation Policy. 
  Use this when explaining how the platform deprecates and removes APIs, the developer-facing signals 
  (editor deprecation flags, console warnings, reference-docs flags), the deprecation/removal lifecycle, 
  and the developer's responsibility to rebuild and resubmit to pick up new APIs and behaviors. 
  The deprecation policy is generic—specific deprecations build on top of this lifecycle. This page 
  intentionally describes the *contract* and not the internal enforcement mechanism; future docs that 
  talk about specific deprecations should preserve that distinction."
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

In short, the platform manages the transition for you. You will always get the latest APIs from the SDK during local development. And the platform also ensures that the live add-ons do not break and continue to keep working.

This page explains the lifecycle of a deprecated API, the signals you will see while a deprecation is in progress, and what you need to do to keep your add-on current.

<InlineAlert variant="info" slots="header, text1"/>

**Why this matters for users**

A user who has installed your add-on should never see it suddenly stop working because the platform changed underneath it. The deprecation policy is what makes that promise possible: the platform preserves the original contract for already-submitted add-ons while exposing the new contract to new submissions.

## The lifecycle of an API

A typical API moves through five stages. Each stage affects you differently depending on whether you are **developing locally** (writing or testing add-on code on your machine) or whether you have a **live add-on** on the marketplace (publicly available or privately shared). The stages below describe what is true about the API; the table at the end of this section translates each stage into the action, if any, you should take in each of the two contexts.

### 1. Experimental

Some APIs are released as **experimental** for early feedback before they are considered stable:

- To call an experimental API, set `experimentalApis: true` in the `requirements` section of your `manifest.json` (see the [manifest reference](../../../references/manifest/index.md#requirements)).
- The `experimentalApis` flag is **only allowed during development**. It must be removed before you submit your add-on to the marketplace—an add-on that depends on experimental APIs cannot be submitted.
- Experimental APIs are **not covered by the rest of this lifecycle**. They may change shape, change behavior, or be withdrawn at any time, without a deprecation phase, console warning, or scheduled removal date.
- Reference pages for experimental APIs carry a prominent **_experimental only_** callout that names the flag and warns against shipping.
- When an experimental API is judged solid, it graduates to **Stable** and from that point is governed by the rest of this lifecycle.

### 2. Stable

The API ships in the SDK as a stable surface. It is **fully supported**.

### 3. Deprecated

The platform team marks the API as deprecated. From this point on:

- The **API still works for every add-on**, regardless of when it was submitted.
- The reference documentation marks the API as _deprecated_ and links to the replacement.
- Calls to the deprecated API log a **throttled warning** to the developer console at runtime. Repeated calls in tight loops do not flood the console; the message is intended for developer awareness, not for end users.

This stage is your window to migrate. **If you are developing locally**, the deprecation surfaces in your editor and the console warning appears whenever you exercise the call—these are the cues to plan migration before the removal date. **If you already have a live add-on** on the marketplace, end users see no change in behavior; the warnings are visible only to anyone debugging the add-on.

### 4. Removed

On the announced removal date, the API is **taken out of the SDK**:

- Add-ons **submitted on or after that date can no longer use the API**. It is not part of the SDK they build against.
- Add-ons **submitted before that date are unaffected**. The same code, in the same marketplace listing, keeps observing the original behavior.

**If you are developing locally** at this point, the API can no longer be used—new builds that reference it will fail, and you cannot submit an add-on that depends on it. **If you have a live add-on** that depends on the API, it continues to work for your end users. This is the latest practical moment to migrate and resubmit.

### 5. Fully withdrawn

After enough time has passed, the platform is no longer obligated to preserve the legacy code path. At this point the API is gone for everyone, including live add-ons that depended on it; those add-ons need to be updated to remain in the marketplace.

<InlineAlert variant="info" slots="text1"/>

The window between deprecation (stage 3) and removal (stage 4) could vary; it is treated as a developer guarantee: enough time to migrate, build, and resubmit. The best approach is to switch to the latest API as soon as you notice a deprecation warning.

### At a glance

The same five stages, viewed from the two contexts that matter most to you on any given day:

| Stage | If you're developing locally | If you have a live add-on using this API |
| :--- | :--- | :--- |
| **Experimental** | Set `experimentalApis: true` in your `manifest.json` to call it. Treat it as unstable. | Not possible—the flag must be removed before submission. |
| **Stable** | Use freely. | Works as documented. No action required. |
| **Deprecated** | Deprecation flag visible in your editor; console warnings on calls. Plan migration before the removal date. | Continues to work for end users; no user-visible change. Watch the console while debugging. |
| **Removed** | The API can no longer be used—new builds that reference it fail, and you cannot submit code that depends on it. | Live add-on continues to observe the original behavior. Migrate and resubmit. |
| **Fully withdrawn** | The API has been gone from new builds for a while—no further migration work needed. | The API no longer works for anyone. Affected add-ons may be removed from the marketplace if not updated. |

<InlineAlert variant="warning" slots="header, text1"/>

**Don't ignore deprecation warnings**

The deprecation flag in your editor and the throttled console warnings are the early signal that you have time to migrate on your own schedule. Once the announced removal date lands, the option to keep using the old API in a fresh submission is gone—and your existing submission will only keep working until the API is fully withdrawn.

## The signals you will see

Every deprecation surfaces in three places. You don't need to monitor any single channel—the same information is available wherever you happen to be working.

### In the reference documentation

The [SDK reference documentation](../../../references/index.md) marks deprecated APIs with a deprecation warning that names the replacement and the scheduled removal date. Once an API is past its removal date, it is no longer present in the reference docs for the current SDK and can no longer be used in new submissions.

When you are evaluating whether to use an API in a new add-on, the published reference is the authoritative source: anything currently documented there is safe to depend on for a new submission. The [Changelog](../../../guides/getting-started/changelog.md) will also contain a note about the deprecation and the replacement API.

### In your editor and build

Modern editors flag deprecated identifiers—typically with a strikethrough on uses and a deprecation message visible in hovers and autocomplete. The message names the replacement API and the scheduled removal date. For TypeScript projects, the deprecation also surfaces in your build output.

### At runtime in the developer console

Calls to a deprecated API log a throttled warning to the developer console. Throttling prevents tight loops from spamming the logs. 

## What you need to do

The deprecation policy gives you two stable guarantees and one responsibility.

### Guarantees

1. **Your live add-on keeps working.** A submission you have already shipped continues to observe the API surface and the API behaviors that were in effect when you submitted it. The platform will not retroactively change what an existing submission can call or how those calls behave.
2. **You receive a clear signal before anything breaks.** Every deprecation surfaces in your editor (with a deprecation flag), in your browser console (via runtime warnings), and in the reference documentation—well in advance of the removal date.

### Responsibility

To benefit from new APIs, refined behaviors, and platform improvements, you must **rebuild and resubmit** your add-on if you're making use of a deprecated API. Resubmitting is what causes the platform to expose the current API surface to your add-on.

A typical migration looks like:

1. Notice that an API you call is flagged as deprecated in your editor, or a console warning in development.
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

## What your users will see

Most deprecations are invisible to the people who use your add-on—the lifecycle plays out in the SDK and in your build, not in the Adobe Express UI. 

## FAQs

#### Will my live add-on suddenly break when an API is deprecated?

No. The deprecation policy is designed so that an already-submitted add-on keeps working with the API surface it was built and submitted against. Deprecated APIs continue to behave for your live add-on the way they behaved at the time of submission, even after they have been removed from the SDK that new submissions see.

#### How will I know an API I'm using is going away?

Three signals: (1) modern editors flag the API as deprecated, with the recommended replacement and the planned removal date called out in the deprecation message; (2) calls to a deprecated API log a throttled warning to the developer console at runtime; (3) the SDK reference documentation flags the API as deprecated and points at the replacement.

#### What is the difference between deprecation and removal?

Deprecation is a signal that an API is on its way out: it still works, but you should plan to migrate. Removal is when the API is taken out of the SDK. Once an API is removed, new submissions can no longer use it; live submissions that already used it continue to observe the original behavior.

#### What is the standard window between deprecation and removal?

The window varies by deprecation. Each announcement names a scheduled removal date. The intent is to give developers enough time to migrate, build, and resubmit, and to give enterprise customers time to absorb the change. Specific deprecations may use a longer window when the affected surface is broad.

#### What do I need to do to pick up new APIs and behaviors?

Rebuild your add-on against the latest SDK and resubmit it to the marketplace. Resubmitting is what causes the platform to expose the current API surface—and the current API behaviors—to your add-on.

#### Why does my add-on still see the old behavior when a colleague's add-on sees the new one?

Each add-on is treated independently. What an add-on sees is determined by the SDK it was built against, not by the user's session or by what other add-ons are doing. If two add-ons were built against different SDK versions, they observe different API surfaces and different behaviors side by side—one add-on's migration timeline never affects another's.

#### Will my users see anything when an API I use is deprecated?

Usually not. The deprecation lifecycle is mostly invisible in the Adobe Express UI.

#### Are experimental APIs covered by this policy?

No. Experimental APIs are explicitly outside this lifecycle: they can change shape, change behavior, or be withdrawn at any time, without a deprecation phase or scheduled removal date. They are also only allowed during development—the `experimentalApis: true` flag in your `manifest.json` must be removed before you submit your add-on to the marketplace, so an experimental API will never be present in a live submission.

#### Do I need to declare anything in my add-on manifest to opt in or out?

No. There is no opt-in flag and no version field you maintain by hand. The platform manages the deprecation policy automatically. Your responsibility is to watch for deprecation signals, migrate before the announced removal date, and resubmit. (The `experimentalApis: true` flag is unrelated—it controls access to experimental APIs, which sit outside this lifecycle.)
