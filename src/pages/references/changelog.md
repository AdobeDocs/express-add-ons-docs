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
  - API
  - Add-on Manifest
  - AddOnSdk
title: Changelog
description: This is the changelog page
contributors:
  - https://github.com/hollyschinsky
---

# Changelog
## 2023-07-11

### Added
- [UX Guidelines](../guides/design/index.md) are now available!
- A new [`requestedSize`](../references/addonsdk/app-document/#jpgrenditionoptions) parameter can now be supplied as part of the JPG and PNG rendition options passed in when exporting content with the `createRenditions` method.
- A new [`clipboard` permission](../references/manifest/#entrypointspermissions) can now be set with the `clipboard-write` value in the manifest to allow an add-on to write data to the clipboard. 
- Information on [using fonts](../guides/design/index.md#using-fonts).
- CORS / COEP header handling added to [CORS guide](../guides/develop/cors.md#cors--coep-handling).

## 2023-06-08

### Added
- Initial release for the beta version of Adobe Express.