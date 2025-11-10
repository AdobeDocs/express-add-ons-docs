---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - Known Issues
  - Limitations
  - Chrome
  - Local Network Access
title: Known Issues & Limitations
description: Known issues and limitations when developing Adobe Express add-ons
contributors:
  - https://github.com/hollyschinsky
---

# Known Issues & Limitations

## Chrome Local Network Access Restriction

<InlineAlert slots="text" variant="warning"/>

**IMPORTANT:** Starting with Chrome version 142 (released in early 2025), Chrome introduced a new [Local Network Access restriction](https://chromestatus.com/feature/5152728072060928) that affects local add-on development.

### The Issue

When developing Adobe Express add-ons locally (typically at `https://localhost:5241` with a local SSL certificate), Chrome will now display a permission prompt:

```text
new.express.adobe.com wants to "Look for and connect to any device on your local network"
```

**If you click "Block" instead of "Allow", you will not be able to side-load your local in-development add-on in Adobe Express.** The Add-on CLI cannot bypass this browser-level restriction.

### Solution 1: Reset Permissions for Adobe Express (Recommended)

If you accidentally blocked the permission, you can reset it by clearing browser data specifically for Adobe Express:

1. In Chrome, go to **Settings** → **Privacy and security** → **Clear browsing data**
2. Click on the **Advanced** tab
3. Set the time range to **All time**
4. Check **Cookies and other site data** and **Cached images and files**
5. Click **Clear data**
6. Alternatively, you can delete browser usage data (cookies, local storage, etc.) for **only** `new.express.adobe.com` by:
   - Going to `chrome://settings/content/all`
   - Searching for `new.express.adobe.com`
   - Clicking the trash icon to remove the site data

After clearing the data, reload Adobe Express. You will see the permission prompt again—this time, click **Allow**.

### Solution 2: Disable Local Network Access Checks (Not Recommended)

<InlineAlert slots="text" variant="warning"/>

This solution applies to **ALL websites**, not just Adobe Express, so it is not recommended for general use.

1. Navigate to `chrome://flags/#local-network-access-check`
2. Set **Local Network Access Checks** to **Disabled**
3. Restart Chrome

## Supported Browsers

Adobe Express add-ons support the latest versions of Chrome, Edge, and Safari. See the [Adobe Express System requirements](https://helpx.adobe.com/express/system-requirements.html) for complete details.

## Sandboxed iFrame Caveats

Add-ons run in a sandboxed iframe environment with certain restrictions. See the [Add-on Context guide](../../learn/platform_concepts/context.md) for details on permissions and limitations.
