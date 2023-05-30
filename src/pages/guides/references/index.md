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
title: API Reference
description: This is the Add-on SDK - API Reference page
contributors:
  - https://github.com/hollyschinsky
---

# API Reference

## Overview
This section covers the APIs available for developing your add-ons. It begins with an introduction to the main `AddOnSdk` core object reference, along with an overview of the properties and methods you will use in your add-on development. In the left expanded menu, you will find a list of the core add-on capabilities named by the functionality they provide. Within each of those sections are details about the interface definitions and methods needed to supportthat feature, along with example usage and output where relevant. 

<InlineAlert slots="header, text1, text2" variant="success"/>

## SDK vs API
The lines between what should be considered an SDK (Software Development Kit) or an API (Application Programming Interface) can sometimes feel a little blurry. Some further explanation on these terms is provided here for more clarification.

- An **SDK** can be considered a kit that contains everything you need to develop for a platform. This includes not only the APIs, but also the tools, helpers, debuggers, and other dependent components that allow you to develop.

- **APIs** define the set of interface defintions available to use to provide the functionality that you want to build into your add-ons.


## AddOnSdk
<table class="spectrum-Table spectrum-Table--sizeM">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The core add-on SDK object. Provides access to the add-on development platform.</p></td>
</tr>
</tbody>
</table>

## AddOnSdk Properties
<table class="spectrum-Table spectrum-Table--sizeM">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.apiVersion</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>string</pre></p></td>
    <td class="spectrum-Table-cell"><p>Current version of the add-on SDK running.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the host application (Adobe Express)</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.constants</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>A set of constants used throughout the add-on SDK.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.instance</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>The currently running add-on instance.</p></td>
</tr>
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.ready</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>promise</pre></p></td>
    <td class="spectrum-Table-cell"><p>Indicates the AddOnSdk object has been initialized and you can start accessing the APIs.</p></td>
</tr>
</tbody>
</table>

## AddOnSdk.app Properties
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:rgb(64, 34, 138)">
<tr class="spectrum-Table-row">
    <td class="spectrum-Table-headCell"><p><strong>Reference</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Type</strong></p></td>
    <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
</tr>
<tbody class="spectrum-Table-body">
  <tr class="spectrum-Table-row">
     <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.document</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Represents the active document of the host application.</p></td>
  </tr>
  <tr class="spectrum-Table-row">
     <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.oauth</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization.</p></td>
  </tr>
  <tr class="spectrum-Table-row">
    <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.ui</pre></p></td>
    <td class="spectrum-Table-cell"><p><pre>object</pre></p></td>
    <td class="spectrum-Table-cell"><p>Represents the host UI (Adobe Express UI).</p></td>
  </tr>
</tbody>
</table>

## AddOnSdk.app Methods
<table class="spectrum-Table spectrum-Table--sizeM" style="background-color:rgb(64, 34, 138)">
  <tr class="spectrum-Table-row">
      <td class="spectrum-Table-headCell"><p><strong>Method</strong></p></td>        
      <td class="spectrum-Table-headCell"><p><strong>Parameters</strong></p></td>
      <td class="spectrum-Table-headCell"><p><strong>Return Type</strong></p></td>
      <td class="spectrum-Table-headCell"><p><strong>Description</strong></p></td>
  </tr>
  <tbody class="spectrum-Table-body">
    <tr class="spectrum-Table-row">
      <td class="spectrum-Table-cell"><p><pre>AddOnSdk.app.on()</pre></p></td>
      <td class="spectrum-Table-cell"><p>type: <pre>string</pre></p></td>
      <td class="spectrum-Table-cell"><p>handler: <pre>(data) => {})</pre></p></td>
      <td class="spectrum-Table-cell"><p>void</p></td>
      <td class="spectrum-Table-cell"><p>Subscribe to an event (ie: listen for an event).</p></td>
    </tr>    
  </tbody>
</table>