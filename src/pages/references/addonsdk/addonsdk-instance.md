# AddOnSdk.instance
Represents the currently running add-on instance. This object is used for providing access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/develop/use_cases.md#storing-and-retrieving-client-side-data) use case implementation and [Manifest](../manifest) reference for more details.


## Objects
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Attribute</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance.clientStorage</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Reference to the client storage object of the add-on.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance.manifest</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Add-ons manifest details. Maps to entries in the add-ons manifest file.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance.runtime</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Represents the current add-on runtime.</p>
    </td>
</tr>
</tbody>
</table>
