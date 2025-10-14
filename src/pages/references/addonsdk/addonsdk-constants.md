# addOnUISdk.constants

A set of constants used throughout the add-on SDK. These constants are equal to their variable name as a string value, ie: for the `ButtonType` constant, `primary` has a value of "primary".

## Constants

&lt;table columnWidths="30,20,60" class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Name&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Type&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Description&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tbody class="spectrum-Table-body">
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;BitRate&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;number&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Bit rate in bits per second.&lt;/p&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;strong&gt;mbps4&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;4000000&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;mbps8&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;8000000&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;mbps10&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;10000000&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;mbps12&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;12000000&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;mbps15&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;15000000&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;mbps25&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;25000000&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;mbps50&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;50000000&lt;/pre&gt;
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;BleedUnit&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Units for the page bleed.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;"in" (`Inch`)&lt;/strong&gt;&lt;/li&gt;Inch units.
          &lt;li&gt;&lt;strong&gt;"mm" (`Millimeter`)&lt;/strong&gt;&lt;/li&gt;Millimeter units.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;ButtonType&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;The type of the button pressed in a dialog.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;primary&lt;/strong&gt;&lt;/li&gt;Primary button pressed.
          &lt;li&gt;&lt;strong&gt;secondary&lt;/strong&gt;&lt;/li&gt;Secondary button pressed.
          &lt;li&gt;&lt;strong&gt;cancel&lt;/strong&gt;&lt;/li&gt;Cancel button pressed.
          &lt;li&gt;&lt;strong&gt;close&lt;/strong&gt;&lt;/li&gt;Dialog closed via ESC or close(X) button.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;ColorPickerEvent&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Custom events dispatched by the Color Picker.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;colorChange&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"colorpicker-color-change"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;close&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"colorpicker-close"&lt;/pre&gt;
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;ColorPickerPlacement&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Placement of the color picker popover with respect to the anchor element.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;top&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"top"&lt;/pre&gt;
        &lt;li&gt;&lt;strong&gt;bottom&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"bottom"&lt;/pre&gt;
        &lt;li&gt;&lt;strong&gt;left&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"left"&lt;/pre&gt;
        &lt;li&gt;&lt;strong&gt;right&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"right"&lt;/pre&gt;
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;DialogResultType&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;The type of modal dialog result.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;alert&lt;/strong&gt;&lt;/li&gt;Alert dialog result (simple dialogs all return this).
          &lt;li&gt;&lt;strong&gt;input&lt;/strong&gt;&lt;/li&gt;Input dialog result.
          &lt;li&gt;&lt;strong&gt;custom&lt;/strong&gt;&lt;/li&gt;Custom dialog result.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;EditorPanel&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;The Adobe Express Editor panel to be opened.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;search&lt;/strong&gt;&lt;/li&gt;Editor Search panel.
          &lt;li&gt;&lt;strong&gt;yourStuff&lt;/strong&gt;&lt;/li&gt;Editor Your stuff panel.
          &lt;li&gt;&lt;strong&gt;templates&lt;/strong&gt;&lt;/li&gt;Editor Templates panel.
          &lt;li&gt;&lt;strong&gt;media&lt;/strong&gt;&lt;/li&gt;Editor Media panel.
          &lt;li&gt;&lt;strong&gt;text&lt;/strong&gt;&lt;/li&gt;Editor Text panel.
          &lt;li&gt;&lt;strong&gt;elements&lt;/strong&gt;&lt;/li&gt;Editor Elements panel.
          &lt;li&gt;&lt;strong&gt;grids&lt;/strong&gt;&lt;/li&gt;Editor Grids panel.
          &lt;li&gt;&lt;strong&gt;brands&lt;/strong&gt;&lt;/li&gt;Editor Brands panel.
          &lt;li&gt;&lt;strong&gt;addOns&lt;/strong&gt;&lt;/li&gt;Editor Add-ons panel.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;ElementsTabs&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Tabs in the Editor's Elements panel.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;designAssets&lt;/strong&gt;&lt;/li&gt;Design assets tab.
          &lt;li&gt;&lt;strong&gt;backgrounds&lt;/strong&gt;&lt;/li&gt;Backgrounds tab.
          &lt;li&gt;&lt;strong&gt;shapes&lt;/strong&gt;&lt;/li&gt;Shapes tab.
          &lt;li&gt;&lt;strong&gt;stockIcons&lt;/strong&gt;&lt;/li&gt;Icons tab.
          &lt;li&gt;&lt;strong&gt;charts&lt;/strong&gt;&lt;/li&gt;Charts tab.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;FileSizeLimitUnit&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Unit of the file size limit.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;KB&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"KB"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;MB&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"MB"&lt;/pre&gt;
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;FrameRate&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;number&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Frame rate in frames per second.&lt;/p&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;strong&gt;fps23_976&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;23.976&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;fps24&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;24&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;fps25&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;25&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;fps29_97&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;29.97&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;fps30&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;30&lt;/pre&gt;
            &lt;li&gt;&lt;strong&gt;fps60&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;60&lt;/pre&gt;
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;LinkOptions&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;The type of link&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;document&lt;/strong&gt;&lt;/li&gt;Link to the current document.
          &lt;li&gt;&lt;strong&gt;published&lt;/strong&gt;&lt;/li&gt;Link to the published document.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;MediaTabs&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Tabs in the Editor's Media panel.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;video&lt;/strong&gt;&lt;/li&gt;Video tab.
          &lt;li&gt;&lt;strong&gt;audio&lt;/strong&gt;&lt;/li&gt;Audio tab.
          &lt;li&gt;&lt;strong&gt;photos&lt;/strong&gt;&lt;/li&gt;Photos tab.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;PanelActionType&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Types of actions that can be performed on Editor panels.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;search&lt;/strong&gt;&lt;/li&gt;Action type to perform search within the Editor panel.
          &lt;li&gt;&lt;strong&gt;navigate&lt;/strong&gt;&lt;/li&gt;Action type to perform navigation within the Editor panel.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;Range&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Rendition page range. Options:&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;currentPage&lt;/strong&gt;&lt;/li&gt; Generate rendition for the current page
          &lt;li&gt;&lt;strong&gt;entireDocument&lt;/strong&gt;&lt;/li&gt;Generate rendition for all pages
          &lt;li&gt;&lt;strong&gt;specificPages&lt;/strong&gt;&lt;/li&gt;Generate rendition for specific pages
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;RenditionFormat&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Required output format of the rendition.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;jpg&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"image/jpeg"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;png&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"image/png"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;mp4&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"video/mp4"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;pdf&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"application/pdf"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;pptx&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"application/vnd.openxmlformats-officedocument.presentationml.presentation"&lt;/pre&gt;
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;RenditionIntent&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">  
        &lt;p&gt;The intent to set for creating the rendition. Options:&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;preview&lt;/strong&gt;&lt;/li&gt;Intent to preview the content.
          &lt;li&gt;&lt;strong&gt;export&lt;/strong&gt;&lt;/li&gt;Intent to export/download the content (default).
          &lt;li&gt;&lt;strong&gt;print&lt;/strong&gt;&lt;/li&gt;Intent to export and print the content **Note:** For `pdf` format, a print optimized pdf is generated. This option is not supported for `mp4` format.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;RenditionType&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;The type of rendition. Currently returns "page".&lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;RuntimeType&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Runtime type of the entrypoint creating this backend object.
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;panel&lt;/strong&gt;&lt;/li&gt;add-on's iframe runtime, ie: code running in &lt;b&gt;index.html&lt;/b&gt;
          &lt;li&gt;&lt;strong&gt;script&lt;/strong&gt;&lt;/li&gt;add-on's document sandbox code ie: code running in &lt;b&gt;code.js&lt;/b&gt;
          &lt;li&gt;&lt;strong&gt;dialog&lt;/strong&gt;&lt;/li&gt;currently open dialog code
        &lt;/ul&gt;
        &lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;Variant&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Types of dialog variants supported.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;confirmation&lt;/strong&gt;&lt;/li&gt;Ask a user to confirm an action.
          &lt;li&gt;&lt;strong&gt;information&lt;/strong&gt;&lt;/li&gt;Share information for user to acknowledge.
          &lt;li&gt;&lt;strong&gt;warning&lt;/strong&gt;&lt;/li&gt;Share information that a user needs to consider before proceeding.
          &lt;li&gt;&lt;strong&gt;destructive&lt;/strong&gt;&lt;/li&gt;Tell a user that if they proceed with an action, it may impact their data in a negative way.
          &lt;li&gt;&lt;strong&gt;error&lt;/strong&gt;&lt;/li&gt;Communicate critical issue that a user needs to resolve before proceeding.
          &lt;li&gt;&lt;strong&gt;input&lt;/strong&gt;&lt;/li&gt;Ask a user to provide some inputs.
          &lt;li&gt;&lt;strong&gt;custom&lt;/strong&gt;&lt;/li&gt;A dialog that can render complex forms and content.
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;VideoResolution&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td style="vertical-align: bottom;">
        &lt;p&gt;Video resolution options for the mp4 renditions.&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;sd480p&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"480p"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;hd720p&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"720p"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;fhd1080p&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"1080p"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;qhd1440p&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"1440p"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;uhd2160p&lt;/strong&gt;&lt;/li&gt;&lt;pre&gt;"2160p"&lt;/pre&gt;
          &lt;li&gt;&lt;strong&gt;custom&lt;/strong&gt;&lt;/li&gt;Custom resolution
        &lt;/ul&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
