# API Reference

## `AddOnSdk: object`
The core add-on SDK object which provides access to everything needed for add-on development.

## `AddOnSdk.app: Object`
Provides access to the host application (Adobe Express). 

<!-- ##### Type
Object -->


### AddOnSdk
- `AddOnSdk` - The core add-on SDK object which provides access to everything needed for add-on development.
- `AddOnSdk.apiVersion` - Current version of the add-on SDK running.
- `AddOnSdk.app` - Provides access to the host application (Adobe Express). 
- `AddOnSdk.constants` - A set of constants used throughout the add-on SDK.
- `AddOnSdk.instance` - the currently running add-on instance.
- `AddOnSdk.ready` - a `Promise` that indicates you can start accessing the APIs when resolved. 

### AddOnSdk.app
- `AddOnSdk.app.document` - Represents the active document of the host application.
- `AddOnSdk.app.oauth` - Provides access to the OAuth methods needed to implement OAuth 2.0 for user authorization.
- `AddOnSdk.app.on` - listen to an event (ie: `AddOnSdk.app.on.themechange`).
- `AddOnSdk.app.off` - stop listening to an event.
- `AddOnSdk.app.ui` - represents the host UI (Adobe Express UI).
- `AddOnSdk.app.enableDragToDocument()` - enables drag on an element. Pass in a callback to 
    parameters:
        `element`: `HTMLElement`,
        `dragCallbacks`: `DragCallbacks`
    return type:
        `void`
- `AddOnSdk.app.showModalDialog()` - shows a modal dialog with a certain variant

### AddOnSdk.app.ui
- `AddOnSdk.app.ui.locale` - Retrieve the host application current `locale`
- `AddOnSdk.app.ui.locales` - Retrieve the host application's supported languages
- `AddOnSdk.app.ui.theme` - Retrieve the current theme of the host application.

### AddOnSdk.instance 
- `AddOnSdk.instance.clientStorage` - Reference to the client storage of the add-on.
- `AddOnSdk.instance.manifest` - Add-ons manifest details. Maps to entries in the add-ons `manifest.json` file.

## Events
- `AddOnSdk.app.on.localechange` - Triggered when there is a locale change at the host side.
- `AddOnSdk.app.on.themechange` - Triggered when there is a theme change at the host side.
- `AddOnSdk.app.on.dragstart` - triggered when the user starts dragging an item for which drag behavior is enabled.
- `AddOnSdk.app.on.dragend` - triggered when the drag operation ends.

## AddOnSDK.constants
- `Range` - Rendition page range
    - `currentPage` - Generate rendition for the current page
    - `entireDocument` - Generate rendition for all the pages

- `RenditionFormat` - Required output format of the rendition
    - `png` = "image/png" - PNG format
    - `jpg` = "image/jpeg" - JPG format
    - `mp4` = "video/mp4" - MP4 format
    - `pdf` = "application/pdf" - PDF format

- `RenditionType` - The type of rendition
    - `page` - Rendition of the whole page

- `Variant` - Types of dialog variants supported
    - `confirmation` - Ask a user to confirm an action
    - `information` - Share information for user to acknowledge
    - `warning` - Share information that a user needs to consider before proceeding
    - `destructive` - Tell a user that if they proceed with an action, it may impact their data in a negative way
    - `error` - Communicate critical issue that a user needs to resolve before proceeding
    - `input` - Ask a user to provide some inputs
    - `custom` - A dialog that can render complex forms and content

- `FieldType` - The type of the input field in Simple Dialog  
    - text = "text" - One-line text input field
- DialogResultType - The type of the dialog result
    alert = "alert" - Alert dialog result
    input = "input" - Input dialog result
    custom = "custom" - Custom dialog result

- `ButtonType` - Simple Dialog Button types
    `primary` = "primary" = Primary button pressed
    `secondary` = "secondary" = Secondary button pressed
    `cancel` = "cancel" = cancel button pressed
    `close` = "close" = Dialog closed via ESC or close(X) button

- `RuntimeType` - The runtime type
    `panel` = "panel" - Iframe based runtime that usually hosts the add-on main UI logic.
    `dialog` = "dialog" - Iframe based runtime that hosts a modal dialog UI.
    

