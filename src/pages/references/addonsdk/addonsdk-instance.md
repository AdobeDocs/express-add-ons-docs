---
title: "addOnUISdk.instance — Adobe Express Add-on SDK"
description: "Reference for the addOnUISdk.instance object, representing the currently running add-on instance and providing access to client storage, manifest, and runtime."
keywords:
    - Adobe Express
    - Add-on SDK
    - addOnUISdk
    - instance
    - clientStorage
    - manifest
    - runtime
contributors:
    - https://github.com/hollyschinsky
---

# addOnUISdk.instance

Represents the currently running add-on instance. This object is used to provide access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/learn/how-to/local-data-management.md) use case implementation and [Manifest](../manifest/index.md) reference for more details.

<InlineAlert slots="text" variant="info"/>

**Runtime:** This API runs in the **iframe runtime** (`addOnUISdk`). See the [Add-on Architecture Guide](../../guides/learn/platform-concepts/architecture.md#the-two-environments) for the dual-runtime model.

## Objects

| Attribute | Object | Description |
| --------- | ------ | ----------- |
| `readonly` | `addOnUISdk.instance.clientStorage` | Reference to the client storage object of the add-on. |
| `readonly` | `addOnUISdk.instance.manifest` | Add-ons manifest details. Maps to entries in the add-ons manifest file. |
| `readonly` | `addOnUISdk.instance.runtime` | Represents the current add-on runtime. |
