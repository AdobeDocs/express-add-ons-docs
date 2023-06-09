# AddOnSdk.constants
A set of constants used throughout the add-on SDK. These constants are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary". 
<!-- 

Enum Name	Enum Values
AuthorizationStatus	SUCCESS, POPUP_OPENED, POPUP_BLOCKED, POPUP_TIMEOUT, FAILED
ButtonType	primary, secondary, cancel, close
FieldType	text
Range	currentPage, entireDocument
RenditionFormat	png, jpg, mp4, pdf
RenditionType	page
Variant	confirmation, information, warning, destructive, error, input


| Name                | Values    |
| -------------:      | --------- |
| AuthorizationStatus | SUCCESS, POPUP_OPENED, POPUP_BLOCKED, POPUP_TIMEOUT, FAILED |
| ButtonType	      | primary, secondary, cancel, close                           | -->


## AddOnSdk.constants 
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:lightblue">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Object</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Range</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Rendition page range. Options:</p>
        <ul>
          <li><strong>currentPage</strong></li> Generate rendition for the current page
          <li><strong>entireDocument</strong></li>Generate rendition for all pages
        </ul>
    </td>    
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionFormat</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Required output format of the rendition.</p>
        <ul>
          <li><strong>jpg</strong></li>"image/jpeg" for JPG format
          <li><strong>png</strong></li>"image/png" for PNG format
          <li><strong>mp4</strong></li>"video/mp4" for MP4 format
          <li><strong>pdf</strong></li>"application/pdf" for PDF format
        </ul>
    </td>    
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The type of rendition. Currently returns "page". </p>        
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Variant</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>Types of dialog variants supported.</p>   
        <ul>
          <li><strong>confirmation</strong></li>Ask a user to confirm an action.
          <li><strong>information</strong></li>Share information for user to acknowledge.
          <li><strong>warning</strong></li>Share information that a user needs to consider before proceeding.
          <li><strong>destructive</strong></li>Tell a user that if they proceed with an action, it may impact their data in a negative way.
          <li><strong>error</strong></li>Communicate critical issue that a user needs to resolve before proceeding.
          <li><strong>input</strong></li>Ask a user to provide some inputs.
          <li><strong>custom</strong></li>A dialog that can render complex forms and content.
        </ul>     
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>DialogResultType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The type of modal dialog result.</p>   
        <ul>
          <li><strong>alert</strong></li>Alert dialog result (simple dialogs all return this).
          <li><strong>input</strong></li>Input dialog result.
          <li><strong>custom</strong></li>Custom dialog result.          
        </ul>     
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ButtonType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">        
        <p>The type of the button in a Simple Dialog.</p>   
        <ul>
          <li><strong>primary</strong></li>Primary button pressed.
          <li><strong>secondary</strong></li>Secondary button pressed.
          <li><strong>cancel</strong></li>Cancel button pressed.
          <li><strong>close</strong></li>Dialog closed via ESC or close(X) button.          
        </ul>     
    </td>
</tr>
</tbody>
</table>
