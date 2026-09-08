Adobe Express add-ons use two primary runtime environments:

- **Add-on UI runtime:** Runs the add-on's HTML, CSS, and JavaScript user interface and provides access to browser APIs and the Add-on UI SDK.
- **Document Sandbox runtime:** Runs document-authoring code in an isolated environment and provides the Document APIs for reading and modifying Adobe Express document content.
- **Communication APIs:** Enable communication between the Add-on UI runtime and the Document Sandbox runtime.

Important terminology:

- **HTML document:** The browser DOM available through the global `document` object in the Add-on UI runtime.
- **Add-on UI SDK document:** The `addOnUISdk.app.document` API used for operations such as importing, exporting, and retrieving document information.
- **Adobe Express document:** The user's creative document, represented as a scenegraph and accessed through the Document APIs in the Document Sandbox.

Adobe Express add-ons involve three SDKs across two runtime environments:

- **Add-on UI SDK** (`addOnUISdk`, iframe/UI runtime): dialogs, OAuth, client storage, theme/locale, and document *metadata* / import / export via `addOnUISdk.app.document`.
- **Document Sandbox SDK** (`addOnSandboxSdk`, imported in `code.js`): the `runtime` object (`exposeApi()`/`apiProxy()`) used to pass data between the two runtimes. Does not itself edit document content.
- **Express Document SDK** (`express-document-sdk`, also imported in `code.js`): `editor`, `colorUtils`, `constants`, `fonts`, `viewport` — the APIs that actually read and modify the document's scenegraph.

Document APIs (Express Document SDK) only run inside the Document Sandbox (`code.js`) and can't be called from the iframe/UI runtime — use the Communication APIs to bridge between the two.

Rule of thumb: dialogs, storage, OAuth, theme/locale, import/export, document metadata → Add-on UI SDK. Creating/editing pages, shapes, text, styles → Express Document SDK inside the Document Sandbox.
