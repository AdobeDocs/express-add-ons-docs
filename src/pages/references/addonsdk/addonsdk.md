# addOnUISdk
The core add-on UI SDK object which provides access to everything needed for add-on development. This includes determining the current version of the platform, an object to use for determining when the SDK has been initialized and ready for use, and other core objects you can use to access specific features you may want to use for building your add-on.

## addOnUISdk Properties

<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:rgb(138, 43, 226)">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p style="color:white"><strong>Attribute</strong></p></td>
    <td class="spectrum-Table-headCell"><p style="color:white"><strong>Name</strong></p></td>
    <td class="spectrum-Table-headCell"><p style="color:white"><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p style="color:white"><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.apiVersion</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td class="spectrum-Table-cell"><p>Current version of the add-on SDK running.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.app</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the host application (Adobe Express)</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre></pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.constants</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>A set of constants used throughout the add-on SDK.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>addOnUISdk.instance</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The currently running add-on instance.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>readonly</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.ready</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>Promise</pre></p></td>
    <td class="spectrum-Table-cell"><p>Indicates the addOnUISdk object has been initialized and you can start accessing the APIs. Register a call back with [Promise.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) or [await this promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).</p></td>
</tr>
</tbody>
</table>

<!-- ## Methods

## ready
Asynchronous

## Example Usage:
await AddOnSdk.ready; -->