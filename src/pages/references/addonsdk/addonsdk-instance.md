# addOnUISdk.instance

<<<<<<< HEAD
Represents the currently running add-on instance. This object is used to provide access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/develop/how-to/local-data-management.md) use case implementation and [Manifest](../manifest/index.md) reference for more details.
=======
Represents the currently running add-on instance. This object is used to provide access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/learn/how_to/local_data_management.md) use case implementation and [Manifest](../manifest) reference for more details.
>>>>>>> c10e7f13f0ebdbfd5ff5dc03e7fed47ab831ba56

## Objects

| Attribute | Object | Description |
| --------- | ------ | ----------- |
| `readonly` | `addOnUiSdk.instance.clientStorage` | Reference to the client storage object of the add-on. |
| `readonly` | `addOnUISdk.instance.manifest` | Add-ons manifest details. Maps to entries in the add-ons manifest file. |
| `readonly` | `addOnUISdk.instance.runtime` | Represents the current add-on runtime. |