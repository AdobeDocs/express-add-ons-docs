# addOnUISdk.instance

Represents the currently running add-on instance. This object is used to provide access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/learn/how-to/local-data-management.md) use case implementation and [Manifest](../manifest) reference for more details.

## Objects

| Attribute | Object | Description |
| --------- | ------ | ----------- |
| `readonly` | `addOnUiSdk.instance.clientStorage` | Reference to the client storage object of the add-on. |
| `readonly` | `addOnUISdk.instance.manifest` | Add-ons manifest details. Maps to entries in the add-ons manifest file. |
| `readonly` | `addOnUISdk.instance.runtime` | Represents the current add-on runtime. |
