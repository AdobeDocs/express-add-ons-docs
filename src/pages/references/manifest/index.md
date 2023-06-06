---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Add-on Manifest
title: Manifest Version 2
description: This is the manifest version 2 page
contributors:
  - https://github.com/hollyschinsky
---

# Overview
Each add-on bundle contains a `manifest.json` file at the root level which defines the metadata for your add-on and how it should behave. This guide outlines the latest manifest version available, which is version 2.

## Example add-on manifest.json:
```json
{
    "testId": "export-sample",
    "name": "Export Sample",
    "version": "1.0.0",
    "manifestVersion": 2,
    "requirements": {
        "apps": [
            {
                "name": "Express",
                "apiVersion": 1
            }
        ]
    
    },
    "entryPoints": [
        {
            "type": "panel",
            "id": "panel1",
            "main": "index.html",
            "permissions": {
                "sandbox": ["allow-popups", "allow-presentation", "allow-downloads"],
                 "oauth": ["www.dropbox.com"]
            }
        }
    ]
}
```


<InlineAlert slots="text" variant="warning"/>

Changes to your add-on manifest currently require a manual reload. Use the **Refresh** button in the **Add-on Development** panel to pick up any changes.

<!-- 
# Manifest Field Descriptions
- `testId?` *string*
    - This can be used to uniquely identify an add-on among other add-ons in app during <strong>development workflows only</strong>. This is auto generated and inserted into the manifest by the CLI when an add-on is created. This is mandatory in the development workflow and ignored in add-ons submitted to the marketplace.

- `version` *string*
    - Add-on version in "major.minor.patch" format (e.g., "1.2.0")

- `name?` string
    - Add-on name as it will appear in the UI **for development workflows only**.
        
        Localizable and specified in the following format, for example:        

        ```
            "label":  &#123;
                "default": "Timer", 
                "en-US": "Timer", 
                "fr-FR": "Minuteur" 
            &#125;
        ```
- `requirements` object
    - Indicates the apps that the add-on is intended for.    -->


### Manifest Field Descriptions
<div width="800px">
<table class="spectrum-Table spectrum-Table--sizeS" width="40%">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Field</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>testId?</strong></p></td>
    <td class="spectrum-Table-cell"><p>string</p></td>
    <td style="vertical-align: bottom;">        
        <p>This can be used to uniquely identify an add-on among other add-ons in app during <strong>development workflows only</strong>. This is auto generated and inserted into the manifest by the CLI when an add-on is created. This is mandatory in the development workflow and ignored in add-ons submitted to the marketplace.</p>
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>version</strong></p></td>
    <td class="spectrum-Table-cell"><p>string</p></td>
    <td class="spectrum-Table-cell"><p>Add-on version in "major.minor.patch" format (e.g., "1.2.0")</p></td>    
</tr>

<tr class="spectrum-Table-row">
    <td><p><strong>name?</strong></p></td>
    <td><p>string</p></td>
    <td><p>
        Add-on name as it will appear in the UI <strong>for development workflows only</strong>.
        Localizable and specified in the following format, for example:        
        <pre>
            "label":  &#123;
                "default": "Timer", 
                "en-US": "Timer", 
                "fr-FR": "Minuteur" 
            &#125;
        </pre>   
        </p>                         
    </td>    
</tr>
<tr class="spectrum-Table-row">
    <td style="vertical-align: top;"><p><strong>manifestVersion</strong></p></td>
    <td style="vertical-align: top;"><p>number</p></td>
    <td style="vertical-align: top;"><p>Version of the manifest schema, 2. </p></td>    
</tr>
<tr class="spectrum-Table-row">
    <td style="vertical-align: top;"><p><strong>requirements</strong></p></td>
    <td style="vertical-align: top;"><p>object</p></td>
    <td style="vertical-align: top;">         
        <table class="spectrum-Table spectrum-Table--sizeS">        
            <tr><td><p><strong>Field</strong></p></td><td><p><strong>Type</strong></p></td><td><p><strong>Notes</strong></p></td></tr>        
            <tr>
                <td><p>apps</p> </td><td><p>object[]</p></td>
                <td><p>Indicates the apps that the add-on is intended for. &nbsp;&nbsp;</p>
                <table class="spectrum-Table spectrum-Table--sizeS">
                    <tr><td><p><strong>Field</strong></p></td><td><p><strong>Type</strong></p></td><td><p><strong>Notes</strong></p></td></tr>
                    <tr><td><p>name</p></td><td><p>string</p></td><td><p>Supported values: 'Express'</p> </td></tr>
                    <tr><td><p>apiVersion</p></td><td><p>number</p></td><td><p>API version that add-on uses. Currently supported values: 1</p></td></tr>
                    <tr><td><p>supportedDeviceClass?</p></td><td><p>string[]</p></td><td><p>Supported platforms by the add-on. Possible values:</p>
                        <table class="spectrum-Table spectrum-Table--sizeS">
                            <tr><td><p><strong>Device Class</strong></p></td><td><p><strong>Description</strong></p></td></tr>
                            <tr><td><p>desktop</p></td><td><p>Browser on desktop</p></td></tr>
                            <tr><td><p>mobile</p></td><td><p>Browser on mobile and tablet devices</p></td></tr>
                            <tr><td><p>app</p></td><td><p>Native app on mobile and tablet devices</p></td></tr>                    
                        </table>                    
                        <p>If not specified, default value assumed is: <pre>["desktop"]</pre>.</p>
                    </td></tr>          
                </table>
            </td></tr>   
            <tr><td><p>experimentalApis?</p></td><td><p>boolean</p></td><td>
                <ul>
                    <li>Add-ons can opt to use experimental apis by specifying this flag</li>
                    <li>This flag is only allowed during development and needs to be removed during submission</li>
                </ul>            
            </td></tr>
            <tr><td><p>supportsTouch?</p></td><td><p>boolean</p></td><td><p>Whether add-on supports touch-only devices. If not specified, default value assumed is 'false'</p></td></tr>
        </table>
        <code>
            "requirements": &#123;
                "apps": [  
                &#123;
                    "name": "Express", 
                    "apiVersion": 1,
                    "supportedDeviceClass": ["desktop", "mobile"]
                ], 
                &#125;,
                "experimentalApis": true,
                "supportsTouch": false
            &#125;</code>         
    </td>
</tr>

<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell" style="vertical-align: top;"><p><strong>entryPoints</strong></p></td>
    <td class="spectrum-Table-cell" style="vertical-align: top;"><p>Object array</p></td>
        <td class="spectrum-Table-cell">   
            <p>Currently one entrypoint can be specified:&nbsp;&nbsp;</p>
            <table class="spectrum-Table spectrum-Table--sizeS">        
            <tr><td><p><strong>Field</strong></p></td><td><p><strong>Type</strong></p></td><td><p><strong>Notes</strong></p></td></tr>
            <tr><td><p><strong>type</strong></p></td><td><p>string</p></td><td><p>The type of the entrypoint. Supported types: </p>
            <table class="spectrum-Table spectrum-Table--sizeS">
                    <tr>
                        <td><p><strong>Type</strong></p></td>
                        <td><p><strong>Description</strong></p></td>
                    </tr>
                    <tr>
                        <td><p><strong>panel</strong></p></td>
                        <td>
                        <ul>
                            <li>Panel type of add-ons</li>
                            <li>UI is shown in an iframe in the (left) content panel</li>
                            <li>Can be launched via add-ons launchpad panel</li>
                        </ul>
                        </td>
                    </tr>                    
                </table>                          
            </td></tr>
            <tr>
                <td><p><strong>id</strong></p></td><td><p>string</p></td><td><ul><li>Indicates the ID for the entrypoint</li><li>Must be unique within the plugin</li></ul> </td></tr>            
            <tr>
                <td><p><strong>main</strong></p></td><td><p>string</p></td><td><p>Main file for this entrypoint</p></td>
            </tr>
            <tr><td><p><strong>permissions?</strong></p></td><td><p>string</p></td><td>
            <table class="spectrum-Table spectrum-Table--sizeS">       
                <tr>
                    <td><p><strong>Field</strong></p></td><td><p><strong>Type</strong></p></td><td><p><strong>Notes</strong></p></td></tr>
                    <tr><td><p>sandbox?</p></td><td><p>string[]</p></td><td><p>List of iframe sandbox permissions. Supported values are:</p>
                        <table class="spectrum-Table spectrum-Table--sizeS">                
                            <tr><td><p><strong>Permission</strong></p></td><td><strong>Notes</strong></td></tr>
                            <tr><td><p><strong>allow-presentation</strong></p></td><td><p>Allows the add-on to start a <a href="https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest" target="_blank">presentation session</a>.</p></td></tr>                    
                            <tr><td><p><strong>allow-popups</strong></p></td><td><p>Allows popups - such as <pre>window.open(), target="_blank" or showModalDialog()</pre> to work. <strong style="color:red">If this keyword is not used, the popup will silently fail to open.</strong></p></td></tr>
                            <tr><td><p><strong>allow-downloads</strong></p></td><td><p>Allows downloading files through an &lt;a&gt; or &lt;area&gt; element with the download attribute, as well as through the navigation that leads to a download of a file.</p></td></tr>  
                            <tr><td><p><strong>allow-popups-to-escape-sandbox</strong></p></td><td><p>Allows a sandboxed document to open new windows without forcing the sandboxing flags upon them.</p></td></tr>                           
                        </table>
                         <p><strong>Note:</strong> The <strong>allow-scripts</strong> sandbox permission is supported by default.</p>
                    </td></tr>            
                    <tr><td><p>oauth?</p></td><td><p>string[]</p></td><td><p>List of 3P auth server domains for which OAuth workflow may be requested.</p></td>
                </tr>
            </table>   
            
<code>
"permissions" : &#123;
    "sandbox": [" allow-popups ", "allow-same-origin ", "allow-downloads"],
    "oauth" : [“...”, “...”], 
&#125;
</code>
            </td>
            </tr>            
            </table> 
 <p style="color:red"><strong>Note:</strong> At least one entrypoint needs to be specified.</p>
        </td>        
</tr>
</tbody>
</table>
</div>

<InlineAlert slots="text"/>

The **?** implies the field is optional.

<InlineAlert slots="text" variant="success"/>

Files within the add-on bundle can refer to each other via relative paths.
