---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Add-on SDK
  - SDK
  - JavaScript
  - Client Storage
  - Metadata
  - Data Persistence
  - LocalStorage
title: Storing and Managing Data
description: Learn how to persist user data and work with metadata in documents and elements.
contributors:
  - https://github.com/hollyschinsky
---

# Module 3: Storing and Managing Data

**Estimated time: 1.5 hours**

Effective data management is essential for creating add-ons that can remember user preferences, save work in progress, and enrich documents with additional information. In this step, you'll learn how to store data persistently using client storage and work with metadata in documents and elements.

## Using Client Storage for Data Persistence

The Add-on SDK provides a client storage API that allows you to persist data between sessions. This is particularly useful for:

- Saving user preferences and settings
- Storing recent actions or history
- Caching data to improve performance
- Saving work in progress

### Basic Client Storage Operations

The client storage API provides simple key-value storage:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(async () => {
  initializeStorage();
});

async function initializeStorage() {
  try {
    // Store a value
    await addOnUISdk.instance.clientStorage.setValue("username", "John Doe");
    console.log("Username stored successfully");
    
    // Retrieve a value
    const username = await addOnUISdk.instance.clientStorage.getValue("username");
    console.log("Retrieved username:", username);
    
    // Check if a key exists
    const hasPreferences = await addOnUISdk.instance.clientStorage.hasKey("preferences");
    console.log("Has preferences:", hasPreferences);
    
    // Delete a value
    await addOnUISdk.instance.clientStorage.deleteKey("temporary-data");
    console.log("Temporary data deleted");
    
    // Store complex data (objects, arrays) by serializing to JSON
    const preferences = {
      theme: "dark",
      fontSize: 14,
      showNotifications: true,
      recentFiles: ["file1.jpg", "file2.jpg", "file3.jpg"]
    };
    
    await addOnUISdk.instance.clientStorage.setValue("preferences", JSON.stringify(preferences));
    console.log("Preferences stored successfully");
    
    // Retrieve and parse complex data
    const preferencesStr = await addOnUISdk.instance.clientStorage.getValue("preferences");
    const retrievedPreferences = JSON.parse(preferencesStr);
    console.log("Retrieved preferences:", retrievedPreferences);
  } catch (error) {
    console.error("Error working with client storage:", error);
  }
}
```

### Storage Limitations and Best Practices

When working with client storage, keep these guidelines in mind:

1. **Storage Limits**: Client storage has limited capacity (typically a few MB)
2. **Sensitive Data**: Don't store sensitive user information without proper encryption
3. **Performance**: Minimize storage operations in performance-critical code paths
4. **Data Versioning**: Consider versioning your data schema to handle updates gracefully

```javascript
// Example of data versioning approach
async function initializeWithVersioning() {
  try {
    // Check for data version
    const dataVersion = await addOnUISdk.instance.clientStorage.getValue("data-version") || "1.0";
    
    // Handle migration if needed
    if (dataVersion === "1.0") {
      console.log("Migrating data from version 1.0 to 1.1");
      await migrateDataToV1_1();
      await addOnUISdk.instance.clientStorage.setValue("data-version", "1.1");
    }
    
    // Now we know the data is in the current format
    const userData = await loadUserData();
    updateUI(userData);
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

async function migrateDataToV1_1() {
  // Migrate old data to new format
  const oldPrefs = JSON.parse(await addOnUISdk.instance.clientStorage.getValue("preferences") || "{}");
  
  // Add new fields or transform existing ones
  oldPrefs.notifications = oldPrefs.showNotifications || false;
  delete oldPrefs.showNotifications; // Remove old field
  
  // Save updated data
  await addOnUISdk.instance.clientStorage.setValue("preferences", JSON.stringify(oldPrefs));
}
```

## Working with Document Metadata

Document metadata allows you to store custom data associated with an Adobe Express document. This is useful for:

- Tracking document creation or modification details
- Storing add-on-specific configuration for the document
- Adding searchable keywords or categories
- Preserving information about applied effects or transformations

### Adding and Retrieving Document Metadata

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(async () => {
  await workWithDocumentMetadata();
});

async function workWithDocumentMetadata() {
  try {
    // Set document metadata
    const metadata = {
      createdWith: "My Custom Add-on",
      version: "1.2.0",
      lastModified: new Date().toISOString(),
      tags: ["landscape", "photography", "mountains"]
    };
    
    await addOnUISdk.app.document.setMetadata("com.mycompany.myaddon", metadata);
    console.log("Document metadata stored successfully");
    
    // Retrieve document metadata
    const retrievedMetadata = await addOnUISdk.app.document.getMetadata("com.mycompany.myaddon");
    console.log("Retrieved document metadata:", retrievedMetadata);
    
    // Update specific fields in the metadata
    const updatedMetadata = {
      ...retrievedMetadata,
      lastModified: new Date().toISOString(),
      tags: [...retrievedMetadata.tags, "edited"]
    };
    
    await addOnUISdk.app.document.setMetadata("com.mycompany.myaddon", updatedMetadata);
    console.log("Document metadata updated successfully");
  } catch (error) {
    console.error("Error working with document metadata:", error);
  }
}
```

### Namespacing Metadata

Note that metadata is stored with a namespace (`com.mycompany.myaddon` in the example). This helps prevent conflicts between different add-ons. Best practices for namespaces:

1. Use reverse domain notation (e.g., `com.company.addonname`)
2. Make it specific to your add-on
3. Be consistent across your code

## Working with Element Metadata

Element metadata allows you to associate custom data with specific elements in a document. This is useful for:

- Adding attribution or source information to images
- Storing original parameters for custom effects
- Tracking element creation details
- Creating relationships between elements

### Adding and Retrieving Element Metadata

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Wait for the SDK to be ready
addOnUISdk.ready.then(async () => {
  document.getElementById('add-image-with-metadata').addEventListener('click', addImageWithMetadata);
  document.getElementById('get-selection-metadata').addEventListener('click', getSelectionMetadata);
});

async function addImageWithMetadata() {
  try {
    // Add an image to the document
    const imageUrl = "https://example.com/image.jpg";
    const imageElement = await addOnUISdk.app.document.addImage(imageUrl, {
      position: { x: 100, y: 100 },
      width: 400
    });
    
    // Add metadata to the element
    const metadata = {
      source: "Example.com",
      photographer: "Jane Smith",
      license: "Creative Commons",
      dateAdded: new Date().toISOString(),
      keywords: ["nature", "landscape"]
    };
    
    await addOnUISdk.app.document.setElementMetadata(imageElement.id, "com.mycompany.myaddon", metadata);
    console.log("Element metadata added successfully");
  } catch (error) {
    console.error("Error adding image with metadata:", error);
  }
}

async function getSelectionMetadata() {
  try {
    // Get the current selection
    const selection = await addOnUISdk.app.document.getSelection();
    
    if (selection.items.length === 0) {
      console.log("No elements selected");
      return;
    }
    
    // Get metadata for the first selected element
    const elementId = selection.items[0].id;
    const metadata = await addOnUISdk.app.document.getElementMetadata(elementId, "com.mycompany.myaddon");
    
    if (metadata) {
      console.log("Element metadata:", metadata);
      displayMetadataInUI(metadata);
    } else {
      console.log("No metadata found for this element");
    }
  } catch (error) {
    console.error("Error getting selection metadata:", error);
  }
}

function displayMetadataInUI(metadata) {
  const container = document.getElementById('metadata-display');
  
  if (!container) return;
  
  let html = '<h3>Element Metadata</h3>';
  
  for (const [key, value] of Object.entries(metadata)) {
    html += `<div class="metadata-item">
      <strong>${key}:</strong> ${value}
    </div>`;
  }
  
  container.innerHTML = html;
}
```

## Practical Exercise: Building a Favorites System

Let's combine these data management techniques to create a favorites system that allows users to save and organize their favorite elements:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Namespace for our metadata
const METADATA_NAMESPACE = "com.example.favorites";

// Wait for the SDK to be ready
addOnUISdk.ready.then(() => {
  initializeFavoritesSystem();
});

async function initializeFavoritesSystem() {
  // Set up UI event listeners
  document.getElementById('add-to-favorites').addEventListener('click', addSelectionToFavorites);
  document.getElementById('show-favorites').addEventListener('click', showFavorites);
  document.getElementById('clear-favorites').addEventListener('click', clearFavorites);
  
  // Load favorites on startup
  await loadFavorites();
}

async function addSelectionToFavorites() {
  try {
    // Get the current selection
    const selection = await addOnUISdk.app.document.getSelection();
    
    if (selection.items.length === 0) {
      showMessage("Please select something to add to favorites");
      return;
    }
    
    // Get the first selected element
    const element = selection.items[0];
    
    // Create a favorite item representation
    const favoriteItem = {
      id: element.id,
      type: element.type,
      name: element.name || `${element.type} ${new Date().toLocaleString()}`,
      dateAdded: new Date().toISOString()
    };
    
    // Add metadata to the element to mark it as a favorite
    await addOnUISdk.app.document.setElementMetadata(
      element.id,
      METADATA_NAMESPACE,
      { isFavorite: true, dateAdded: favoriteItem.dateAdded }
    );
    
    // Get existing favorites from storage
    const favoritesStr = await addOnUISdk.instance.clientStorage.getValue("favorites") || "[]";
    const favorites = JSON.parse(favoritesStr);
    
    // Add the new favorite (if not already in the list)
    if (!favorites.some(fav => fav.id === favoriteItem.id)) {
      favorites.push(favoriteItem);
      
      // Save the updated list
      await addOnUISdk.instance.clientStorage.setValue("favorites", JSON.stringify(favorites));
      
      showMessage(`Added ${favoriteItem.name} to favorites`);
      
      // Update the UI
      displayFavorites(favorites);
    } else {
      showMessage("This item is already in your favorites");
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    showMessage("Failed to add to favorites");
  }
}

async function loadFavorites() {
  try {
    // Get favorites from storage
    const favoritesStr = await addOnUISdk.instance.clientStorage.getValue("favorites") || "[]";
    const favorites = JSON.parse(favoritesStr);
    
    // Display in UI
    displayFavorites(favorites);
  } catch (error) {
    console.error("Error loading favorites:", error);
    showMessage("Failed to load favorites");
  }
}

async function showFavorites() {
  // This just makes the favorites panel visible
  document.getElementById('favorites-panel').style.display = 'block';
  
  // Refresh the favorites list
  await loadFavorites();
}

async function clearFavorites() {
  try {
    if (confirm("Are you sure you want to clear all favorites?")) {
      await addOnUISdk.instance.clientStorage.setValue("favorites", "[]");
      showMessage("All favorites cleared");
      displayFavorites([]);
    }
  } catch (error) {
    console.error("Error clearing favorites:", error);
    showMessage("Failed to clear favorites");
  }
}

function displayFavorites(favorites) {
  const container = document.getElementById('favorites-list');
  
  if (!container) return;
  
  if (favorites.length === 0) {
    container.innerHTML = '<p>No favorites yet. Select elements and click "Add to Favorites".</p>';
    return;
  }
  
  let html = '';
  
  favorites.forEach(favorite => {
    html += `
      <div class="favorite-item" data-id="${favorite.id}">
        <div class="favorite-info">
          <div class="favorite-name">${favorite.name}</div>
          <div class="favorite-type">${favorite.type}</div>
          <div class="favorite-date">${new Date(favorite.dateAdded).toLocaleString()}</div>
        </div>
        <div class="favorite-actions">
          <button class="select-favorite" data-id="${favorite.id}">Select</button>
          <button class="remove-favorite" data-id="${favorite.id}">Remove</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Add event listeners for the action buttons
  document.querySelectorAll('.select-favorite').forEach(button => {
    button.addEventListener('click', () => selectFavorite(button.dataset.id));
  });
  
  document.querySelectorAll('.remove-favorite').forEach(button => {
    button.addEventListener('click', () => removeFavorite(button.dataset.id));
  });
}

async function selectFavorite(elementId) {
  try {
    // Try to select the element by ID
    await addOnUISdk.app.document.selectElements([elementId]);
    showMessage("Element selected");
  } catch (error) {
    console.error("Error selecting favorite:", error);
    showMessage("This element no longer exists in the document");
    
    // Remove the invalid favorite
    await removeFavorite(elementId);
  }
}

async function removeFavorite(elementId) {
  try {
    // Get current favorites
    const favoritesStr = await addOnUISdk.instance.clientStorage.getValue("favorites") || "[]";
    let favorites = JSON.parse(favoritesStr);
    
    // Remove the item
    favorites = favorites.filter(fav => fav.id !== elementId);
    
    // Save updated list
    await addOnUISdk.instance.clientStorage.setValue("favorites", JSON.stringify(favorites));
    
    // Try to remove the metadata if the element still exists
    try {
      await addOnUISdk.app.document.setElementMetadata(
        elementId,
        METADATA_NAMESPACE,
        null // Setting to null removes the metadata
      );
    } catch (e) {
      // Element likely no longer exists, which is fine
    }
    
    showMessage("Removed from favorites");
    
    // Update the UI
    displayFavorites(favorites);
  } catch (error) {
    console.error("Error removing favorite:", error);
    showMessage("Failed to remove from favorites");
  }
}

function showMessage(message) {
  const messageElement = document.getElementById('message');
  
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Hide the message after a delay
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 3000);
  } else {
    console.log(message);
  }
}
```

This example demonstrates:

1. Using client storage to persist a list of favorites
2. Using element metadata to mark elements as favorites
3. Building a complete CRUD interface (Create, Read, Update, Delete) for favorites
4. Handling error cases gracefully

## Additional Resources

To deepen your understanding of data management:

- [Local Data Management](../../guides/develop/how_to/local_data_management.md)
- [Document Metadata](../../guides/develop/how_to/document_metadata.md)
- [Element Metadata](../../guides/develop/how_to/element_metadata.md)
- [Client Storage Sample](/samples.md#use-client-storage)

## Knowledge Check

Before moving to the next step, make sure you can answer these questions:

1. What is client storage and how do you use it in an add-on?
2. How do you store and retrieve document metadata?
3. How is element metadata different from document metadata?
4. What kinds of data are appropriate for each storage method?

## Next Step

Now that you understand how to store and manage data, let's apply all your knowledge to build a complete, practical add-on.

[Proceed to Step 4: Building a Practical Add-on →](intermediate-step4.md)

[← Back to Step 2: Working with User Interaction](intermediate-step2.md)
