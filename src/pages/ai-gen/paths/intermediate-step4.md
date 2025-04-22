---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Practical Add-on
  - Tutorial
  - Project
  - End-to-end
title: Building a Practical Add-on
description: Apply all your knowledge by building a complete, practical Grid Maker add-on.
contributors:
  - https://github.com/hollyschinsky
---

# Module 4: Building a Practical Add-on

**Estimated time: 2.5 hours**

In this final step of the Intermediate path, you'll apply everything you've learned to build a complete, practical add-on called "Grid Maker." This add-on will help users create customizable grid layouts in their Adobe Express documents.

## Project Overview: Grid Maker Add-on

The Grid Maker add-on will allow users to:

1. Create customizable grid layouts with different numbers of cells
2. Specify spacing, colors, and border styles for the grid
3. Save grid presets for future use
4. Apply grids to their Adobe Express documents

This project will bring together all the skills you've learned in the Intermediate path:

- Working with document elements
- Creating interactive user experiences
- Storing and managing data

## Setting Up the Project

Let's start by creating a new project:

1. Open a terminal/command prompt
2. Create a new add-on project with the following command:

   ```
   npx @adobe/create-ccweb-add-on grid-maker
   ```

3. When prompted, choose:

   - Add-on type: Panel
   - UI Framework: HTML (or React if you prefer)
   - Include TypeScript: No (for this tutorial we'll use JavaScript)
   - Include addon-helpers: Yes

4. Navigate to the project directory and install dependencies:

   ```
   cd grid-maker
   npm install
   ```

## Project Structure

Let's organize our code with the following structure:

```
grid-maker/
  ├── index.html        # Main UI entry point
  ├── styles.css        # Main CSS file
  ├── manifest.json     # Add-on manifest
  ├── src/
  │   ├── index.js      # Main JavaScript file
  │   ├── grid.js       # Grid generation logic
  │   ├── storage.js    # Storage handling
  │   └── ui.js         # UI manipulation functions
  └── ...               # Other project files
```

## Step 1: Creating the User Interface

First, let's create a clean and intuitive user interface. Replace the content of `index.html` with:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Grid Maker</title>
    <link
      rel="stylesheet"
      href="styles.css"
    />
  </head>
  <body>
    <div class="container">
      <h1>Grid Maker</h1>

      <div class="form-section">
        <h2>Grid Settings</h2>

        <div class="form-group">
          <label for="rows">Rows:</label>
          <input
            type="number"
            id="rows"
            min="1"
            max="10"
            value="3"
          />
        </div>

        <div class="form-group">
          <label for="columns">Columns:</label>
          <input
            type="number"
            id="columns"
            min="1"
            max="10"
            value="3"
          />
        </div>

        <div class="form-group">
          <label for="cell-size">Cell Size (px):</label>
          <input
            type="number"
            id="cell-size"
            min="50"
            max="500"
            value="100"
          />
        </div>

        <div class="form-group">
          <label for="spacing">Spacing (px):</label>
          <input
            type="number"
            id="spacing"
            min="0"
            max="50"
            value="10"
          />
        </div>

        <div class="form-group">
          <label for="border-width">Border Width (px):</label>
          <input
            type="number"
            id="border-width"
            min="0"
            max="10"
            value="1"
          />
        </div>

        <div class="form-group">
          <label for="border-color">Border Color:</label>
          <input
            type="color"
            id="border-color"
            value="#000000"
          />
        </div>

        <div class="form-group">
          <label for="background-color">Background Color:</label>
          <input
            type="color"
            id="background-color"
            value="#FFFFFF"
          />
        </div>
      </div>

      <div class="preview-section">
        <h2>Grid Preview</h2>
        <div
          id="grid-preview"
          class="grid-preview"
        ></div>
      </div>

      <div class="actions-section">
        <button
          id="create-grid"
          class="primary-button"
        >
          Create Grid
        </button>
        <button
          id="save-preset"
          class="secondary-button"
        >
          Save as Preset
        </button>
      </div>

      <div class="presets-section">
        <h2>Saved Presets</h2>
        <div
          id="presets-list"
          class="presets-list"
        >
          <p class="no-presets">No presets saved yet.</p>
        </div>
      </div>
    </div>

    <div
      id="message"
      class="message"
    ></div>

    <script
      type="module"
      src="./src/index.js"
    ></script>
  </body>
</html>
```

Now, create a `styles.css` file in the project root with the following content:

```css
body {
  font-family: "Adobe Clean", sans-serif;
  margin: 0;
  padding: 16px;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 100%;
}

h1 {
  color: #1473e6;
  font-size: 18px;
  margin-bottom: 16px;
}

h2 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #505050;
}

.form-section,
.preview-section,
.actions-section,
.presets-section {
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

label {
  width: 130px;
  display: inline-block;
  font-size: 14px;
}

input[type="number"],
input[type="color"] {
  width: calc(100% - 130px);
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.grid-preview {
  width: 100%;
  height: 200px;
  border: 1px dashed #ccc;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  overflow: auto;
}

.grid-table {
  border-collapse: separate;
  border-spacing: 0;
}

.grid-cell {
  background-color: #ffffff;
  border: 1px solid #000000;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  transition: background-color 0.2s;
}

.primary-button {
  background-color: #1473e6;
  color: white;
}

.primary-button:hover {
  background-color: #0d66d0;
}

.secondary-button {
  background-color: #eaeaea;
  color: #333;
}

.secondary-button:hover {
  background-color: #d8d8d8;
}

.presets-list {
  max-height: 200px;
  overflow-y: auto;
}

.preset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 8px;
}

.preset-info {
  font-size: 14px;
}

.preset-name {
  font-weight: bold;
}

.preset-details {
  color: #666;
  font-size: 12px;
}

.preset-actions {
  display: flex;
}

.preset-actions button {
  padding: 4px 8px;
  margin-left: 4px;
  font-size: 12px;
}

.no-presets {
  color: #666;
  font-style: italic;
}

.message {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: none;
  z-index: 1000;
}
```

## Step 2: Implementing Core Functionality

Now, let's implement the main JavaScript files:

### src/index.js

Create the main entry point that initializes the app and connects all components:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { createGridInDocument, updateGridPreview } from "./grid.js";
import {
  loadPresets,
  savePreset,
  deletePreset,
  applyPreset,
} from "./storage.js";
import {
  showMessage,
  setupEventListeners,
  updateUIFromSettings,
} from "./ui.js";

// Default grid settings
export const defaultGridSettings = {
  rows: 3,
  columns: 3,
  cellSize: 100,
  spacing: 10,
  borderWidth: 1,
  borderColor: "#000000",
  backgroundColor: "#FFFFFF",
};

// Current grid settings (can be modified by user)
export let currentGridSettings = { ...defaultGridSettings };

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  console.log("Grid Maker add-on initialized");

  // Initialize the application
  initializeApp();
});

async function initializeApp() {
  try {
    // Set up event listeners for UI elements
    setupEventListeners(currentGridSettings);

    // Update the grid preview with default settings
    updateGridPreview(currentGridSettings);

    // Load saved presets
    await loadPresets();

    showMessage("Grid Maker add-on ready");
  } catch (error) {
    console.error("Error initializing app:", error);
    showMessage("Error initializing app. Please reload.");
  }
}
```

### src/grid.js

Create the grid generation logic:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { showMessage } from "./ui.js";

// Updates the grid preview in the UI
export function updateGridPreview(settings) {
  const previewContainer = document.getElementById("grid-preview");

  if (!previewContainer) return;

  // Clear previous preview
  previewContainer.innerHTML = "";

  // Create table element for the grid
  const gridTable = document.createElement("table");
  gridTable.className = "grid-table";
  gridTable.style.borderSpacing = `${settings.spacing}px`;

  // Create grid rows and cells
  for (let i = 0; i < settings.rows; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < settings.columns; j++) {
      const cell = document.createElement("td");
      cell.className = "grid-cell";
      cell.style.width = `${settings.cellSize}px`;
      cell.style.height = `${settings.cellSize}px`;
      cell.style.backgroundColor = settings.backgroundColor;
      cell.style.border = `${settings.borderWidth}px solid ${settings.borderColor}`;

      row.appendChild(cell);
    }

    gridTable.appendChild(row);
  }

  previewContainer.appendChild(gridTable);
}

// Creates the grid in the Adobe Express document
export async function createGridInDocument(settings) {
  try {
    // Calculate total grid dimensions
    const totalWidth =
      settings.columns * settings.cellSize +
      (settings.columns - 1) * settings.spacing;
    const totalHeight =
      settings.rows * settings.cellSize +
      (settings.rows - 1) * settings.spacing;

    // Store created element IDs to group them later
    const elementIds = [];

    // Create cells
    for (let row = 0; row < settings.rows; row++) {
      for (let col = 0; col < settings.columns; col++) {
        // Calculate position for this cell
        const x = 100 + col * (settings.cellSize + settings.spacing);
        const y = 100 + row * (settings.cellSize + settings.spacing);

        // Create a rectangle shape for the cell
        const cellElement = await addOnUISdk.app.document.addRectangle({
          position: { x, y },
          width: settings.cellSize,
          height: settings.cellSize,
          fill: { color: settings.backgroundColor },
          stroke: {
            width: settings.borderWidth,
            color: settings.borderColor,
          },
        });

        elementIds.push(cellElement.id);
      }
    }

    // Group all cells into a single grid element
    if (elementIds.length > 0) {
      await addOnUISdk.app.document.groupElements(elementIds);
      showMessage(`Grid created: ${settings.rows}×${settings.columns}`);
    }

    return true;
  } catch (error) {
    console.error("Error creating grid:", error);
    showMessage("Failed to create grid");
    return false;
  }
}
```

### src/storage.js

Implement storage functionality for saving and loading grid presets:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { currentGridSettings } from "./index.js";
import { updateGridPreview, createGridInDocument } from "./grid.js";
import { showMessage, updateUIFromSettings } from "./ui.js";

// Storage key for grid presets
const PRESETS_STORAGE_KEY = "grid-maker-presets";

// Loads saved presets from client storage
export async function loadPresets() {
  try {
    const presetsStr = await addOnUISdk.instance.clientStorage.getValue(
      PRESETS_STORAGE_KEY
    );
    const presets = presetsStr ? JSON.parse(presetsStr) : [];

    updatePresetsUI(presets);
    return presets;
  } catch (error) {
    console.error("Error loading presets:", error);
    showMessage("Failed to load presets");
    return [];
  }
}

// Saves current settings as a preset
export async function savePreset(presetName) {
  try {
    // Get existing presets
    const presets = await loadPresets();

    // Create new preset object
    const newPreset = {
      id: Date.now().toString(),
      name: presetName,
      settings: { ...currentGridSettings },
      createdAt: new Date().toISOString(),
    };

    // Add to presets array
    presets.push(newPreset);

    // Save to storage
    await addOnUISdk.instance.clientStorage.setValue(
      PRESETS_STORAGE_KEY,
      JSON.stringify(presets)
    );

    // Update UI
    updatePresetsUI(presets);
    showMessage(`Preset "${presetName}" saved`);

    return true;
  } catch (error) {
    console.error("Error saving preset:", error);
    showMessage("Failed to save preset");
    return false;
  }
}

// Deletes a preset by ID
export async function deletePreset(presetId) {
  try {
    // Get existing presets
    const presets = await loadPresets();

    // Filter out the preset to delete
    const updatedPresets = presets.filter((preset) => preset.id !== presetId);

    // Save updated list
    await addOnUISdk.instance.clientStorage.setValue(
      PRESETS_STORAGE_KEY,
      JSON.stringify(updatedPresets)
    );

    // Update UI
    updatePresetsUI(updatedPresets);
    showMessage("Preset deleted");

    return true;
  } catch (error) {
    console.error("Error deleting preset:", error);
    showMessage("Failed to delete preset");
    return false;
  }
}

// Applies a preset's settings
export function applyPreset(presetId) {
  loadPresets().then((presets) => {
    const preset = presets.find((p) => p.id === presetId);

    if (preset) {
      // Update current settings with preset values
      Object.assign(currentGridSettings, preset.settings);

      // Update UI
      updateUIFromSettings(currentGridSettings);

      // Update preview
      updateGridPreview(currentGridSettings);

      showMessage(`Applied preset "${preset.name}"`);
    }
  });
}

// Updates the presets list in the UI
function updatePresetsUI(presets) {
  const presetsContainer = document.getElementById("presets-list");

  if (!presetsContainer) return;

  if (presets.length === 0) {
    presetsContainer.innerHTML =
      '<p class="no-presets">No presets saved yet.</p>';
    return;
  }

  let html = "";

  presets.forEach((preset) => {
    const { rows, columns } = preset.settings;
    const date = new Date(preset.createdAt).toLocaleDateString();

    html += `
      <div class="preset-item" data-id="${preset.id}">
        <div class="preset-info">
          <div class="preset-name">${preset.name}</div>
          <div class="preset-details">Grid: ${rows}×${columns} • Created: ${date}</div>
        </div>
        <div class="preset-actions">
          <button class="apply-preset" data-id="${preset.id}">Apply</button>
          <button class="delete-preset" data-id="${preset.id}">Delete</button>
        </div>
      </div>
    `;
  });

  presetsContainer.innerHTML = html;

  // Add event listeners for preset actions
  document.querySelectorAll(".apply-preset").forEach((button) => {
    button.addEventListener("click", () => applyPreset(button.dataset.id));
  });

  document.querySelectorAll(".delete-preset").forEach((button) => {
    button.addEventListener("click", () => deletePreset(button.dataset.id));
  });
}
```

### src/ui.js

Implement the UI interaction logic:

```javascript
import { currentGridSettings, defaultGridSettings } from "./index.js";
import { updateGridPreview, createGridInDocument } from "./grid.js";
import { savePreset } from "./storage.js";

// Sets up all event listeners
export function setupEventListeners() {
  // Grid setting inputs
  document
    .getElementById("rows")
    .addEventListener("change", updateSettingFromInput);
  document
    .getElementById("columns")
    .addEventListener("change", updateSettingFromInput);
  document
    .getElementById("cell-size")
    .addEventListener("change", updateSettingFromInput);
  document
    .getElementById("spacing")
    .addEventListener("change", updateSettingFromInput);
  document
    .getElementById("border-width")
    .addEventListener("change", updateSettingFromInput);
  document
    .getElementById("border-color")
    .addEventListener("change", updateSettingFromInput);
  document
    .getElementById("background-color")
    .addEventListener("change", updateSettingFromInput);

  // Action buttons
  document
    .getElementById("create-grid")
    .addEventListener("click", handleCreateGrid);
  document
    .getElementById("save-preset")
    .addEventListener("click", handleSavePreset);

  // Input validation
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", validateNumberInput);
  });
}

// Updates a setting when the corresponding input changes
function updateSettingFromInput(event) {
  const input = event.target;
  const setting = input.id.replace(/-([a-z])/g, (match, letter) =>
    letter.toUpperCase()
  );
  const value =
    input.type === "number" ? parseInt(input.value, 10) : input.value;

  // Update the current settings
  currentGridSettings[setting] = value;

  // Update the preview
  updateGridPreview(currentGridSettings);
}

// Updates all UI inputs based on current settings
export function updateUIFromSettings(settings) {
  document.getElementById("rows").value = settings.rows;
  document.getElementById("columns").value = settings.columns;
  document.getElementById("cell-size").value = settings.cellSize;
  document.getElementById("spacing").value = settings.spacing;
  document.getElementById("border-width").value = settings.borderWidth;
  document.getElementById("border-color").value = settings.borderColor;
  document.getElementById("background-color").value = settings.backgroundColor;
}

// Handles the Create Grid button click
async function handleCreateGrid() {
  const success = await createGridInDocument(currentGridSettings);

  if (success) {
    showMessage("Grid created successfully");
  }
}

// Handles the Save Preset button click
function handleSavePreset() {
  // Prompt for preset name
  const presetName = prompt(
    "Enter a name for this preset:",
    `Grid ${currentGridSettings.rows}×${currentGridSettings.columns}`
  );

  if (presetName) {
    savePreset(presetName);
  }
}

// Validates number inputs to ensure they're within min/max range
function validateNumberInput(event) {
  const input = event.target;
  const value = parseInt(input.value, 10);
  const min = parseInt(input.min, 10);
  const max = parseInt(input.max, 10);

  if (isNaN(value)) {
    input.value = min;
  } else if (value < min) {
    input.value = min;
  } else if (value > max) {
    input.value = max;
  }
}

// Shows a message to the user
export function showMessage(message) {
  const messageElement = document.getElementById("message");

  if (messageElement) {
    messageElement.textContent = message;
    messageElement.style.display = "block";

    // Hide after 3 seconds
    setTimeout(() => {
      messageElement.style.display = "none";
    }, 3000);
  } else {
    console.log(message);
  }
}
```

## Step 3: Updating the Manifest

Update the `manifest.json` file to include the necessary permissions:

```json
{
  "id": "your-unique-id",
  "name": "Grid Maker",
  "version": "1.0.0",
  "main": "index.html",
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
      "documentSandbox": "sandbox/code.js",
      "permissions": {
        "sandbox": [
          "allow-popups-to-escape-sandbox",
          "allow-popups",
          "allow-same-origin",
          "allow-scripts"
        ]
      }
    }
  ]
}
```

## Step 4: Testing and Deployment

To test the add-on:

1. Start the development server:

   ```
   npm run start
   ```

2. The command will display instructions for loading your add-on in Adobe Express

3. Follow those instructions:

   - Open Adobe Express in your browser
   - Open the add-ons panel
   - Click on "Develop" at the bottom
   - Choose "Load local add-on"
   - Enter the URL provided by the development server

4. Your Grid Maker add-on should appear in the panel

5. Test all features:
   - Change grid settings and observe the preview
   - Create grids in the document
   - Save presets and apply them
   - Delete presets

## Features Demonstrated in This Project

The Grid Maker add-on demonstrates several key features:

1. **Document Element Manipulation**:

   - Creating shapes (rectangles for grid cells)
   - Positioning elements with precision
   - Grouping elements to create a cohesive grid

2. **User Interaction**:

   - Real-time preview updates as settings change
   - Input validation and constraints
   - User notifications via message display

3. **Data Storage and Management**:
   - Saving grid presets to client storage
   - Loading and displaying saved presets
   - Managing data with add/delete operations

## Enhancements You Could Add

After completing the basic Grid Maker add-on, consider these enhancements:

1. **Advanced Grid Options**:

   - Option to create equal or custom cell sizes
   - Support for merged cells
   - Add text labels to cells

2. **Export/Import Capabilities**:

   - Export grid designs as PNG or JPG
   - Import grid configurations from JSON

3. **Theme Support**:

   - Add predefined color schemes
   - Integrate with Adobe Express theme colors

4. **UI Improvements**:
   - Add drag-and-drop functionality for grid cells
   - Implement undo/redo for grid changes
   - Add keyboard shortcuts

## Additional Resources

For more detailed examples and code samples:

- [Stats Add-on Tutorial](../../resources/tutorials/stats-addon.md)
- [Grids Add-on Tutorial](../../resources/tutorials/grids-addon.md)

## Knowledge Check

Before completing this path, make sure you can answer these questions:

1. How would you modify the code to support custom cell sizes for each row or column?
2. What changes would be needed to add text labels to grid cells?
3. How could you enhance the presets feature to include categories or tags?
4. What additional error handling could you implement to make the add-on more robust?

## What You've Learned

By completing this Intermediate learning path, you've learned how to:

- Work with document elements in Adobe Express
- Implement drag and drop functionality and modal dialogs
- Store and manage data with client storage and metadata
- Build a complete, practical add-on with real-world functionality
- Structure code for maintainability and extensibility

## Next Path

Ready to advance your skills further? Continue to the Advanced Path for more sophisticated techniques:

[Proceed to Advanced Path: Mastering Add-on Development →](advanced-index.md)

[← Back to Step 3: Storing and Managing Data](intermediate-step3.md#module-3-storing-and-managing-data)
