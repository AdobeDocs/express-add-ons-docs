# addOnUISdk.constants

A set of constants used throughout the add-on SDK. These constants are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Constants

<table columnWidths="30,20,60" class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Name</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>BitRate</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>number</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Bit rate in bits per second.</p>
        <ul>
            <li><strong>mbps4</strong></li><pre>4000000</pre>
            <li><strong>mbps8</strong></li><pre>8000000</pre>
            <li><strong>mbps10</strong></li><pre>10000000</pre>
            <li><strong>mbps12</strong></li><pre>12000000</pre>
            <li><strong>mbps15</strong></li><pre>15000000</pre>
            <li><strong>mbps25</strong></li><pre>25000000</pre>
            <li><strong>mbps50</strong></li><pre>50000000</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>BleedUnit</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Units for the page bleed.</p>
        <ul>
          <li><strong>"in" (`Inch`)</strong></li>Inch units.
          <li><strong>"mm" (`Millimeter`)</strong></li>Millimeter units.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ButtonType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of the button pressed in a dialog.</p>
        <ul>
          <li><strong>primary</strong></li>Primary button pressed.
          <li><strong>secondary</strong></li>Secondary button pressed.
          <li><strong>cancel</strong></li>Cancel button pressed.
          <li><strong>close</strong></li>Dialog closed via ESC or close(X) button.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ColorPickerEvent</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Custom events dispatched by the Color Picker.</p>
        <ul>
          <li><strong>colorChange</strong></li><pre>"colorpicker-color-change"</pre>
          <li><strong>close</strong></li><pre>"colorpicker-close"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ColorPickerPlacement</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Placement of the color picker popover with respect to the anchor element.</p>
        <ul>
          <li><strong>top</strong></li><pre>"top"</pre>
        <li><strong>bottom</strong></li><pre>"bottom"</pre>
        <li><strong>left</strong></li><pre>"left"</pre>
        <li><strong>right</strong></li><pre>"right"</pre>
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
    <td class="spectrum-Table-cell"><p><pre>EditorPanel</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The Adobe Express Editor panel to be opened.</p>
        <ul>
          <li><strong>search</strong></li>Editor Search panel.
          <li><strong>yourStuff</strong></li>Editor Your stuff panel.
          <li><strong>templates</strong></li>Editor Templates panel.
          <li><strong>media</strong></li>Editor Media panel.
          <li><strong>text</strong></li>Editor Text panel.
          <li><strong>elements</strong></li>Editor Elements panel.
          <li><strong>grids</strong></li>Editor Grids panel.
          <li><strong>brands</strong></li>Editor Brands panel.
          <li><strong>addOns</strong></li>Editor Add-ons panel.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>ElementsTabs</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Tabs in the Editor's Elements panel.</p>
        <ul>
          <li><strong>designAssets</strong></li>Design assets tab.
          <li><strong>backgrounds</strong></li>Backgrounds tab.
          <li><strong>shapes</strong></li>Shapes tab.
          <li><strong>stockIcons</strong></li>Icons tab.
          <li><strong>charts</strong></li>Charts tab.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>FileSizeLimitUnit</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Unit of the file size limit.</p>
        <ul>
          <li><strong>KB</strong></li><pre>"KB"</pre>
          <li><strong>MB</strong></li><pre>"MB"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>FrameRate</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>number</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Frame rate in frames per second.</p>
        <ul>
            <li><strong>fps23_976</strong></li><pre>23.976</pre>
            <li><strong>fps24</strong></li><pre>24</pre>
            <li><strong>fps25</strong></li><pre>25</pre>
            <li><strong>fps29_97</strong></li><pre>29.97</pre>
            <li><strong>fps30</strong></li><pre>30</pre>
            <li><strong>fps60</strong></li><pre>60</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>LinkOptions</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of link</p>
        <ul>
          <li><strong>document</strong></li>Link to the current document.
          <li><strong>published</strong></li>Link to the published document.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>MediaTabs</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Tabs in the Editor's Media panel.</p>
        <ul>
          <li><strong>video</strong></li>Video tab.
          <li><strong>audio</strong></li>Audio tab.
          <li><strong>photos</strong></li>Photos tab.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>PanelActionType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Types of actions that can be performed on Editor panels.</p>
        <ul>
          <li><strong>search</strong></li>Action type to perform search within the Editor panel.
          <li><strong>navigate</strong></li>Action type to perform navigation within the Editor panel.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>Range</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Rendition page range. Options:</p>
        <ul>
          <li><strong>currentPage</strong></li> Generate rendition for the current page
          <li><strong>entireDocument</strong></li>Generate rendition for all pages
          <li><strong>specificPages</strong></li>Generate rendition for specific pages
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionFormat</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Required output format of the rendition.</p>
        <ul>
          <li><strong>jpg</strong></li><pre>"image/jpeg"</pre>
          <li><strong>png</strong></li><pre>"image/png"</pre>
          <li><strong>mp4</strong></li><pre>"video/mp4"</pre>
          <li><strong>pdf</strong></li><pre>"application/pdf"</pre>
          <li><strong>pptx</strong></li><pre>"application/vnd.openxmlformats-officedocument.presentationml.presentation"</pre>
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionIntent</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">  
        <p>The intent to set for creating the rendition. Options:</p>
        <ul>
          <li><strong>preview</strong></li>Intent to preview the content.
          <li><strong>export</strong></li>Intent to export/download the content (default).
          <li><strong>print</strong></li>Intent to export and print the content **Note:** For `pdf` format, a print optimized pdf is generated. This option is not supported for `mp4` format.
        </ul>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RenditionType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>The type of rendition. Currently returns "page".</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>RuntimeType</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Runtime type of the entrypoint creating this backend object.
        <ul>
          <li><strong>panel</strong></li>add-on's iframe runtime, ie: code running in <b>index.html</b>
          <li><strong>script</strong></li>add-on's document sandbox code ie: code running in <b>code.js</b>
          <li><strong>dialog</strong></li>currently open dialog code
        </ul>
        </p>
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
    <td class="spectrum-Table-cell"><p><pre>VideoResolution</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td style="vertical-align: bottom;">
        <p>Video resolution options for the mp4 renditions.</p>
        <ul>
          <li><strong>sd480p</strong></li><pre>"480p"</pre>
          <li><strong>hd720p</strong></li><pre>"720p"</pre>
          <li><strong>fhd1080p</strong></li><pre>"1080p"</pre>
          <li><strong>qhd1440p</strong></li><pre>"1440p"</pre>
          <li><strong>uhd2160p</strong></li><pre>"2160p"</pre>
          <li><strong>custom</strong></li>Custom resolution
        </ul>
    </td>
</tr>
</tbody>
</table>
