Adobe Express add-ons use two primary runtime environments:

- **Add-on UI runtime:** Runs the add-on's HTML, CSS, and JavaScript user interface and provides access to browser APIs and the Add-on UI SDK.
- **Document Sandbox runtime:** Runs document-authoring code in an isolated environment and provides the Document APIs for reading and modifying Adobe Express document content.
- **Communication APIs:** Enable communication between the Add-on UI runtime and the Document Sandbox runtime.

Important terminology:

- **HTML document:** The browser DOM available through the global `document` object in the Add-on UI runtime.
- **Add-on UI SDK document:** The `addOnUISdk.app.document` API used for operations such as importing, exporting, and retrieving document information.
- **Adobe Express document:** The user's creative document, represented as a scenegraph and accessed through the Document APIs in the Document Sandbox.

