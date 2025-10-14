# addOnUISdk.instance

Represents the currently running add-on instance. This object is used to provide access to the `clientStorage` and `manifest` objects. See the [Storing and Retrieving Client Side Data](../../guides/learn/how-to/local-data-management.md) use case implementation and [Manifest](../manifest) reference for more details.

## Objects

&lt;table columnWidths="20,50,30" class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
&lt;tr class="spectrum-Table-row">
    &lt;td>&lt;p&gt;&lt;strong&gt;Attribute&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td>&lt;p&gt;&lt;strong&gt;Object&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td>&lt;p&gt;&lt;strong&gt;Description&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tbody>
&lt;tr class="spectrum-Table-row">
    &lt;td>&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td width="80%" style="font-size: 8px">&lt;p&gt;&lt;pre&gt;addOnUiSdk.instance.clientStorage&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td>
        &lt;p&gt;Reference to the client storage object of the add-on.&lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td>&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td >&lt;p&gt;&lt;pre&gt;addOnUISdk.instance.manifest&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td>
        &lt;p&gt;Add-ons manifest details. Maps to entries in the add-ons manifest file.&lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td>&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td>&lt;p&gt;&lt;pre&gt;addOnUISdk.instance.runtime&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td>
        &lt;p&gt;Represents the current add-on runtime.&lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
