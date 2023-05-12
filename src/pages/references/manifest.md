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

# Manifest Version 2
This guide outlines the latest manifest version 2. Each add-on bundle contains a `manifest.json` file at the root level which defines the add-on behavior.

<InlineAlert slots="text" variant="success"/>
Files within the add-on bundle can refer to each other via relative paths.

CAUTION:
Changes to your add-on manifest currently require a manual reload. Use the **Refresh** button in the **Add-on developer tools panel** to pick up any changes.

**[UPDATE]** Manifest **Version 2** is now the latest supported version and the following is a list of changes to be aware of from Version 1 to Version 2 for quick reference:

- `id` field has been changed to `testId` which is optional 
- `name` field is optional, and the type is `string`
- `icon` field was removed 
- `authorInfo` field was removed
- `label` property was removed from `entryPoints`
- `apiVersion` property added to `requirements.apps`
- `platform` property added to `requirements.apps`
- `supportedDeviceClass` property added to `requirements.apps`
- `experimentalApis` property added to `requirements`
- `supportsTouch` property added to `requirements`

## Manifest Version 2
The following section describes the manifest schema for **Version 2**.

<div>
<table class="spectrum-Table spectrum-Table--sizeM spectrum-Table--quiet">
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
        This can be used to uniquely identify an add-on among other add-ons in app during <strong>development workflows only</strong>. This is auto generated and inserted into the manifest by the CLI when an add-on is created. This is mandatory in the development workflow and ignored in add-ons submitted to the marketplace.        
    </td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><strong>version</strong></p></td>
    <td class="spectrum-Table-cell"><p>string</p></td>
    <td class="spectrum-Table-cell">Add-on version in major.minor.patch format e.g., 1.2.0</td>    
</tr>

<tr class="spectrum-Table-row">
    <td><p><strong>name?</strong></p></td>
    <td><p>string</p></td>
    <td>        
        Add-on name as it will appear in the UI <strong>for development workflows only</strong>.
        Localizable and specified in the following format, for example:        
        <pre>
            "label":  [
                        "default": "Timer", 
                        "en-US": "Timer", 
                        "fr-FR": "Minuteur" 
                    ]
        </pre>                            
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
        <table>        
            <tr><td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>Notes</strong></td></tr>        
            <tr><td>apps </td><td>object[]</td><td>            
                Indicates the apps that the add-on is intended for. &nbsp;&nbsp;       
                <table>
                <tr><td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>Notes</strong></td></tr>
                <tr><td>name </td><td>string</td><td>Supported values: ‘Express’ </td></tr>
                <tr><td>apiVersion </td><td>number</td><td>API version that add-on uses. Currently supported values: 1</td></tr>            
                <tr><td>supportedDeviceClass? </td><td>string[]</td><td>Supported platforms by the add-on. Possible values:
                    <table>
                        <tr><td><strong>Device Class</strong></td><td><strong>Description</strong></td></tr>
                        <tr><td>desktop </td><td>Browser on desktop</td></tr>
                        <tr><td>mobile </td><td>Browser on mobile and tablet devices</td></tr>
                        <tr><td>app </td><td>Native app on mobile and tablet devices</td></tr>                    
                    </table>
                    If not specified, default value assumed is: ["desktop"]. E.g.: ["desktop","mobile"]  </td></tr>          
                </table>
            </td></tr>   
            <tr><td>experimentalApis? </td><td>boolean</td><td>
                <ul>
                    <li>Add-ons can opt to use experimental apis by specifying this flag</li>
                    <li>This flag is only allowed during development and needs to be removed during submission</li>
                </ul>            
            </td></tr>
            <tr><td>supportsTouch?</td><td>boolean</td><td>Whether add-on supports touch-only devices. If not specified, default value assumed is 'false'
            </td></tr>
        </table>                        
            "requirements": [
                "apps": [  
                [ 
                    "name": "Express", 
                    "apiVersion": 1,
                    "supportedDeviceClass": ["desktop", "mobile"]
                ], 
                ],
                "experimentalApis": true,
                "supportsTouch": false
            ]             
    </td>
</tr>

<tr>
    <td style="vertical-align: top;"><strong>entryPoints</strong></td>
    <td style="vertical-align: top;">Object array</td>
        <td>   
            Currently one entrypoint can be specified:&nbsp;&nbsp;
            <table>        
            <tr><td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>Notes</strong></td></tr>
            <tr><td><strong>type</strong></td><td>string</td><td>The type of the entrypoint. Supported types: 
            <table>        
                    <tr>
                        <td><strong>Type</strong></td>
                        <td><strong>Description</strong></td>
                    </tr>
                    <tr>
                        <td><strong>panel</strong></td>
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
                <td><strong>id</strong></td><td>string</td><td><ul><li>Indicates the ID for the entrypoint</li><li>Must be unique within the plugin</li></ul> </td></tr>            
            <tr>
                <td><strong>main</strong></td><td>string</td><td>Main file for this entrypoint </td>
            </tr>
            <tr><td><strong>permissions?</strong></td><td>string</td><td>
            <table>        
                <tr>
                    <td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>Notes</strong></td></tr>
                    <tr><td>sandbox?</td><td>string[]</td><td>List of iframe sandbox permissions. Supported values are:
                        <table>        
                            <tr><td><strong>Permission</strong></td><td><strong>Notes</strong></td></tr>
                            <tr><td><strong>allow-presentation</strong></td><td>Allows the add-on to start a <a href="https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest" target="_blank">presentation session</a>.</td></tr>                    
                            <tr><td><strong>allow-popups</strong></td><td>Allows popups (such as window.open(), target="_blank"). If this keyword is not used, the popup will silently fail to open.</td></tr>
                            <tr><td><strong>allow-downloads</strong></td><td>Allows downloading files through an &lt;a&gt; or &lt;area&gt; element with the download attribute, as well as through the navigation that leads to a download of a file.</td></tr>  
                            <tr><td><strong>allow-popups-to-escape-sandbox</strong></td><td>Allows a sandboxed document to open new windows without forcing the sandboxing flags upon them.</td></tr>                           
                        </table>
                         <strong>Note:</strong> The <strong>allow-scripts</strong> sandbox permission is supported by default.
                    </td></tr>            
                    <tr><td>oauth?</td><td>string[]</td><td>List of 3P auth server domains for which OAuth workflow may be requested.</td>
                </tr>
            </table>         
<code>
"permissions" : [
    "sandbox": [" allow-popups ", "allow-same-origin ", "allow-downloads"],
    "oauth" : [“...”, “...”], 
]
</code>         
            </td>
            </tr>            
            </table> 
 <strong>Note:</strong> At least one entrypoint needs to be specified.                       
        </td>        
</tr>
</tbody>
</table>
</div>

<InlineAlert slots="text"/>

The **?** implies the field is optional.