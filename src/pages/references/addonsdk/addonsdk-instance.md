# addOnUISdk.instance

Represents the currently running add-on instance. This object is used for providing access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/develop/use_cases.md#storing-and-retrieving-client-side-data) use case implementation and [Manifest](../manifest) reference for more details.

## Objects

<table columnWidths="20,50,30" class="spectrum-Table spectrum-Table--sizeM" style="background-color:rgb(138, 43, 226)">
<tr class="spectrum-Table-row">
    <td><p style="color: white"><strong>Attribute</strong></p></td>
    <td><p style="color: white"><strong>Object</strong></p></td>
    <td><p style="color: white"><strong>Description</strong></p></td>
</tr>
<tbody>
<tr class="spectrum-Table-row">
    <td style="color:red"><p><pre>readonly</pre></p></td>
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
