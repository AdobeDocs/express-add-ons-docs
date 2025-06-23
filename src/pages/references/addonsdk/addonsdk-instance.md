# addOnUISdk.instance

Represents the currently running add-on instance. This object is used to provide access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/learn/how_to/local_data_management.md) use case implementation and [Manifest](../manifest) reference for more details.

## Objects

<table columnWidths="20,50,30" class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
<tr class="spectrum-Table-row">
    <td><p><strong>Attribute</strong></p></td>
    <td><p><strong>Object</strong></p></td>
    <td><p><strong>Description</strong></p></td>
</tr>
<tbody>
<tr class="spectrum-Table-row">
    <td><p><pre>readonly</pre></p></td>
    <td width="80%" style="font-size: 8px"><p><pre>addOnUiSdk.instance.clientStorage</pre></p></td>
    <td>
        <p>Reference to the client storage object of the add-on.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td><p><pre>readonly</pre></p></td>
    <td ><p><pre>addOnUISdk.instance.manifest</pre></p></td>
    <td>
        <p>Add-ons manifest details. Maps to entries in the add-ons manifest file.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td><p><pre>readonly</pre></p></td>
    <td><p><pre>addOnUISdk.instance.runtime</pre></p></td>
    <td>
        <p>Represents the current add-on runtime.</p>
    </td>
</tr>
</tbody>
</table>
