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
  - External APIs
  - Integration
  - Authentication
  - REST
  - GraphQL
title: Module 4 - External API Integration
description: Learn how to connect your add-on with external services and APIs to expand its capabilities beyond the Adobe Express environment.
contributors:
  - https://github.com/hollyschinsky
---

# Module 4: External API Integration

**Estimated time: 2.5 hours**

In this step, you'll learn how to integrate external APIs and services with your Adobe Express add-ons. By connecting to third-party APIs, you can greatly expand your add-on's capabilities, allowing users to access external content, services, and functionality directly within Adobe Express.

## Understanding External API Integration

External API integration allows your add-on to communicate with services outside of Adobe Express, such as:

- Content providers (stock images, icons, videos, fonts)
- AI and machine learning services
- Data storage and retrieval services
- Authentication and user management systems
- Social media platforms
- Custom backend services

## Planning Your API Integration

Before integrating an external API, consider these important factors:

1. **Authentication requirements**: How will you authenticate requests?
2. **Rate limits**: How many requests can you make?
3. **Data formats**: What format does the API use (JSON, XML, etc.)?
4. **Endpoints**: What specific API endpoints will you use?
5. **Error handling**: How will you handle API failures?
6. **Privacy and security**: How will you protect user data?

## Authentication Methods

Most APIs require authentication. Here are common authentication methods:

### API Keys

The simplest form of authentication is using an API key:

```javascript
const API_KEY = "your_api_key_here";

async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        // or sometimes:
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
```

### OAuth 2.0

For services requiring user-specific access, OAuth 2.0 is common:

```javascript
// 1. Redirect user to authorization URL
function initiateOAuth() {
  const authUrl = new URL("https://auth.example.com/authorize");

  // Add required parameters
  authUrl.searchParams.append("client_id", "YOUR_CLIENT_ID");
  authUrl.searchParams.append(
    "redirect_uri",
    "https://your-addon-url.com/callback"
  );
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("scope", "read write");

  // Open the authorization URL in a new window
  window.open(authUrl.toString(), "_blank", "width=600,height=600");
}

// 2. Handle the callback with authorization code
async function handleOAuthCallback(authCode) {
  try {
    // Exchange auth code for access token
    const response = await fetch("https://auth.example.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authCode,
        client_id: "YOUR_CLIENT_ID",
        client_secret: "YOUR_CLIENT_SECRET",
        redirect_uri: "https://your-addon-url.com/callback",
      }),
    });

    if (!response.ok) {
      throw new Error(`OAuth error: ${response.status}`);
    }

    const tokenData = await response.json();

    // Store tokens securely
    storeTokens(tokenData);

    return tokenData;
  } catch (error) {
    console.error("OAuth error:", error);
    throw error;
  }
}

// 3. Use the access token for API requests
async function fetchDataWithOAuth() {
  const tokens = getStoredTokens();

  try {
    const response = await fetch("https://api.example.com/data", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (response.status === 401) {
      // Token expired, refresh it
      const newTokens = await refreshToken(tokens.refresh_token);
      storeTokens(newTokens);

      // Retry the request
      return fetchDataWithOAuth();
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 4. Refresh token when expired
async function refreshToken(refreshToken) {
  try {
    const response = await fetch("https://auth.example.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: "YOUR_CLIENT_ID",
        client_secret: "YOUR_CLIENT_SECRET",
      }),
    });

    if (!response.ok) {
      throw new Error(`Refresh token error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}
```

### API Integration Approaches

There are different approaches to integrating APIs in your add-on:

#### Direct Integration (Client-Side)

The simplest approach is making API requests directly from your add-on's client-side code:

```javascript
// Simple API client
class ApiClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}/${endpoint}`);

    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  async post(endpoint, data) {
    const url = `${this.baseUrl}/${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}

// Usage
const apiClient = new ApiClient("https://api.example.com", "YOUR_API_KEY");

// Get data
const data = await apiClient.get("resources", {
  limit: 10,
  category: "images",
});

// Post data
const result = await apiClient.post("resources", {
  name: "New Resource",
  type: "image",
});
```

#### Backend Proxy (Server-Side)

For APIs requiring secure credentials or to avoid CORS issues, use a backend proxy:

```javascript
// Client-side code using a backend proxy
async function fetchViaProxy(endpoint, params = {}) {
  const url = new URL("https://your-backend-proxy.com/api/proxy");

  // Add proxy parameters
  url.searchParams.append("target", endpoint);

  // Add API-specific parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Proxy error: ${response.status}`);
  }

  return response.json();
}

// Backend proxy code (Node.js example)
// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Environment variables for secure storage of credentials
const API_KEY = process.env.API_KEY;
const API_BASE_URL = process.env.API_BASE_URL;

app.get("/api/proxy", async (req, res) => {
  const targetEndpoint = req.query.target;

  // Remove the 'target' parameter
  const { target, ...apiParams } = req.query;

  // Construct the target URL
  const url = new URL(`${API_BASE_URL}/${targetEndpoint}`);

  // Add API-specific parameters
  Object.entries(apiParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const apiResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
});
```

## Working with REST APIs

Most external services provide REST APIs. Here's a more complete API client example:

```javascript
class RestApiClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.defaultHeaders = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async request(method, endpoint, options = {}) {
    const url = `${this.baseUrl}/${endpoint}`;

    const config = {
      method,
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    // Don't set content-type for GET requests or we'll get a preflight CORS request
    if (method === "GET") {
      delete config.headers["Content-Type"];
    }

    // If data is provided for non-GET requests, stringify it
    if (options.data && method !== "GET") {
      config.body = JSON.stringify(options.data);
    }

    // For GET requests, add query parameters to the URL
    if (method === "GET" && options.params) {
      const urlObj = new URL(url);
      Object.entries(options.params).forEach(([key, value]) => {
        urlObj.searchParams.append(key, value);
      });

      return this.sendRequest(urlObj.toString(), config);
    }

    return this.sendRequest(url, config);
  }

  async sendRequest(url, config) {
    try {
      const response = await fetch(url, config);

      // Handle different response types
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const error = await this.parseErrorResponse(response, contentType);
        throw {
          status: response.status,
          message: error.message || `HTTP error ${response.status}`,
          data: error,
        };
      }

      return this.parseSuccessResponse(response, contentType);
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async parseSuccessResponse(response, contentType) {
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else if (contentType && contentType.includes("text/")) {
      return await response.text();
    } else if (
      contentType &&
      contentType.includes("application/octet-stream")
    ) {
      return await response.blob();
    }

    return await response.text();
  }

  async parseErrorResponse(response, contentType) {
    try {
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (error) {
      return { message: `HTTP error ${response.status}` };
    }
  }

  // HTTP method shortcuts
  async get(endpoint, params) {
    return this.request("GET", endpoint, { params });
  }

  async post(endpoint, data) {
    return this.request("POST", endpoint, { data });
  }

  async put(endpoint, data) {
    return this.request("PUT", endpoint, { data });
  }

  async patch(endpoint, data) {
    return this.request("PATCH", endpoint, { data });
  }

  async delete(endpoint) {
    return this.request("DELETE", endpoint);
  }
}
```

## Working with GraphQL APIs

Many modern services provide GraphQL APIs, which require a different approach:

```javascript
class GraphQLClient {
  constructor(endpoint, apiKey) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  async query(queryStr, variables = {}) {
    return this.request(queryStr, variables);
  }

  async mutation(mutationStr, variables = {}) {
    return this.request(mutationStr, variables);
  }

  async request(queryStr, variables = {}) {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          query: queryStr,
          variables,
        }),
      });

      const result = await response.json();

      // GraphQL returns 200 even for errors, check the body
      if (result.errors) {
        throw {
          message: "GraphQL operation failed",
          errors: result.errors,
        };
      }

      return result.data;
    } catch (error) {
      console.error("GraphQL request failed:", error);
      throw error;
    }
  }
}

// Usage
const graphQLClient = new GraphQLClient(
  "https://api.example.com/graphql",
  "YOUR_API_KEY"
);

// Query
const queryResult = await graphQLClient.query(
  `
  query GetImages($category: String!, $limit: Int) {
    images(category: $category, limit: $limit) {
      id
      url
      title
      width
      height
    }
  }
`,
  {
    category: "nature",
    limit: 10,
  }
);

// Mutation
const mutationResult = await graphQLClient.mutation(
  `
  mutation CreateImage($input: ImageInput!) {
    createImage(input: $input) {
      id
      url
    }
  }
`,
  {
    input: {
      title: "New Image",
      description: "A beautiful new image",
      category: "nature",
    },
  }
);
```

## Handling API Data

After retrieving data from an API, you need to process it for use in your add-on:

### Transforming API Data

External APIs often provide more data than you need or in a different format:

```javascript
// Image transformation example
function transformImageData(apiResponse) {
  // Map API response to a format your add-on uses
  return apiResponse.items.map((item) => ({
    id: item.id,
    title: item.title || "Untitled",
    thumbnailUrl: item.thumbnails.small.url,
    fullSizeUrl: item.urls.regular,
    width: item.width,
    height: item.height,
    author: item.user ? item.user.name : "Unknown",
    tags: item.tags.map((tag) => tag.title),
    created: new Date(item.created_at),
  }));
}

// Usage
const apiResponse = await apiClient.get("images", { category: "nature" });
const transformedImages = transformImageData(apiResponse);
```

### Caching API Responses

To improve performance and reduce API calls, implement caching:

```javascript
class CacheManager {
  constructor(options = {}) {
    this.cache = new Map();
    this.ttl = options.ttl || 5 * 60 * 1000; // 5 minutes default TTL
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if the entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

// Usage with API client
class CachedApiClient {
  constructor(baseUrl, apiKey, cacheOptions = {}) {
    this.apiClient = new RestApiClient(baseUrl, apiKey);
    this.cache = new CacheManager(cacheOptions);
  }

  async get(endpoint, params = {}) {
    // Create a cache key from the endpoint and params
    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // If not in cache, fetch from API
    const data = await this.apiClient.get(endpoint, params);

    // Store in cache
    this.cache.set(cacheKey, data);

    return data;
  }

  // Implement other methods (post, put, etc.) without caching
  async post(endpoint, data) {
    return this.apiClient.post(endpoint, data);
  }

  // ...other methods
}
```

## Error Handling and Retry Logic

Robust API integration requires comprehensive error handling:

```javascript
class ApiClient {
  // ... other methods

  async requestWithRetry(method, endpoint, options = {}) {
    const maxRetries = options.maxRetries || 3;
    const retryDelay = options.retryDelay || 1000;

    let lastError;

    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        return await this.request(method, endpoint, options);
      } catch (error) {
        lastError = error;

        // Only retry on certain status codes or network errors
        const shouldRetry =
          error.status === 429 || // Too Many Requests
          error.status >= 500 || // Server Errors
          error instanceof TypeError; // Network errors

        if (!shouldRetry) {
          throw error;
        }

        // For 429 responses, use the Retry-After header if available
        let delay = retryDelay;
        if (error.response && error.response.headers) {
          const retryAfter = error.response.headers.get("Retry-After");
          if (retryAfter) {
            delay = parseInt(retryAfter, 10) * 1000 || delay;
          }
        }

        // Exponential backoff
        delay = delay * Math.pow(2, retry);

        console.warn(
          `API request failed, retrying in ${delay}ms... (${
            retry + 1
          }/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // If we got here, all retries failed
    throw lastError;
  }
}
```

## Example: Integrating with Unsplash Image API

Let's build a complete example integrating the Unsplash API to provide high-quality images:

```javascript
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

class UnsplashApiClient {
  constructor(accessKey) {
    this.accessKey = accessKey;
    this.baseUrl = "https://api.unsplash.com";
    this.cache = new Map();
    this.cacheTTL = 15 * 60 * 1000; // 15 minutes
  }

  async searchPhotos(query, page = 1, perPage = 20) {
    const cacheKey = `search:${query}:${page}:${perPage}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      const cachedData = this.cache.get(cacheKey);
      if (Date.now() - cachedData.timestamp < this.cacheTTL) {
        return cachedData.data;
      }
    }

    // Fetch from API
    const url = new URL(`${this.baseUrl}/search/photos`);
    url.searchParams.append("query", query);
    url.searchParams.append("page", page);
    url.searchParams.append("per_page", perPage);

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform data
    const transformedData = {
      photos: data.results.map((photo) => ({
        id: photo.id,
        description:
          photo.description || photo.alt_description || "Unsplash photo",
        width: photo.width,
        height: photo.height,
        color: photo.color,
        user: {
          name: photo.user.name,
          username: photo.user.username,
          link: photo.user.links.html,
        },
        urls: {
          thumb: photo.urls.thumb,
          small: photo.urls.small,
          regular: photo.urls.regular,
          full: photo.urls.full,
        },
        links: {
          html: photo.links.html,
          download: photo.links.download,
        },
      })),
      total: data.total,
      totalPages: data.total_pages,
    };

    // Cache the transformed data
    this.cache.set(cacheKey, {
      data: transformedData,
      timestamp: Date.now(),
    });

    return transformedData;
  }

  async getRandomPhotos(count = 10, options = {}) {
    const url = new URL(`${this.baseUrl}/photos/random`);
    url.searchParams.append("count", count);

    if (options.query) {
      url.searchParams.append("query", options.query);
    }

    if (options.orientation) {
      url.searchParams.append("orientation", options.orientation);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform data
    return data.map((photo) => ({
      id: photo.id,
      description:
        photo.description || photo.alt_description || "Unsplash photo",
      width: photo.width,
      height: photo.height,
      color: photo.color,
      user: {
        name: photo.user.name,
        username: photo.user.username,
        link: photo.user.links.html,
      },
      urls: {
        thumb: photo.urls.thumb,
        small: photo.urls.small,
        regular: photo.urls.regular,
        full: photo.urls.full,
      },
      links: {
        html: photo.links.html,
        download: photo.links.download,
      },
    }));
  }

  // Required by Unsplash API terms
  trackDownload(photoId) {
    fetch(`${this.baseUrl}/photos/${photoId}/download`, {
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    }).catch((error) => {
      console.error("Error tracking download:", error);
    });
  }
}

// Add-on implementation
addOnUISdk.ready.then(async () => {
  const unsplashClient = new UnsplashApiClient("YOUR_UNSPLASH_ACCESS_KEY");
  let currentQuery = "";
  let currentPage = 1;
  let totalPages = 0;
  let isLoading = false;

  // Initialize UI
  const container = document.getElementById("app-container");

  container.innerHTML = `
    <div class="search-container">
      <input type="text" id="search-input" placeholder="Search for images...">
      <button id="search-button">Search</button>
    </div>
    <div class="images-container" id="images-container"></div>
    <div class="loading" id="loading">Loading...</div>
    <div class="pagination">
      <button id="prev-page" disabled>Previous</button>
      <span id="page-info">Page 1</span>
      <button id="next-page" disabled>Next</button>
    </div>
  `;

  // Get elements
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const imagesContainer = document.getElementById("images-container");
  const loadingElement = document.getElementById("loading");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const pageInfoElement = document.getElementById("page-info");

  // Add event listeners
  searchButton.addEventListener("click", () => performSearch());
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadImages(currentQuery, currentPage);
    }
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadImages(currentQuery, currentPage);
    }
  });

  // Initial load of random images
  showLoading(true);
  try {
    const randomPhotos = await unsplashClient.getRandomPhotos(20);
    displayImages(randomPhotos);

    // Hide pagination for random photos
    document.querySelector(".pagination").style.display = "none";
  } catch (error) {
    console.error("Error loading random photos:", error);
    showError("Failed to load images. Please try again later.");
  } finally {
    showLoading(false);
  }

  // Search function
  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      currentQuery = query;
      currentPage = 1;
      loadImages(query, currentPage);

      // Show pagination for search results
      document.querySelector(".pagination").style.display = "flex";
    }
  }

  // Load images from API
  async function loadImages(query, page) {
    if (isLoading) return;

    showLoading(true);

    try {
      const results = await unsplashClient.searchPhotos(query, page);
      displayImages(results.photos);

      // Update pagination
      totalPages = results.totalPages;
      updatePagination();
    } catch (error) {
      console.error("Error searching for photos:", error);
      showError("Failed to load images. Please try again later.");
    } finally {
      showLoading(false);
    }
  }

  // Display images in the container
  function displayImages(photos) {
    imagesContainer.innerHTML = "";

    if (photos.length === 0) {
      imagesContainer.innerHTML =
        '<div class="no-results">No images found. Try another search term.</div>';
      return;
    }

    photos.forEach((photo) => {
      const imageCard = document.createElement("div");
      imageCard.className = "image-card";

      imageCard.innerHTML = `
        <div class="image-container">
          <img src="${photo.urls.small}" alt="${photo.description}">
        </div>
        <div class="image-info">
          <div class="photographer">Photo by <a href="${photo.user.link}" target="_blank">${photo.user.name}</a></div>
        </div>
      `;

      // Make image draggable to document
      addOnUISdk.app.enableDragToDocument(imageCard, {
        previewCallback: () => {
          return {
            type: "image",
            url: photo.urls.regular,
          };
        },
        completionCallback: async () => {
          try {
            // Track download for Unsplash API attribution
            unsplashClient.trackDownload(photo.id);

            // Add image to document
            await addOnUISdk.app.document.addImage(photo.urls.regular);

            console.log("Image added to document");
          } catch (error) {
            console.error("Error adding image to document:", error);
          }
        },
      });

      // Add click handler to add to document
      imageCard.addEventListener("click", async () => {
        try {
          showLoading(true);

          // Track download for Unsplash API attribution
          unsplashClient.trackDownload(photo.id);

          // Add image to document
          await addOnUISdk.app.document.addImage(photo.urls.regular);

          showLoading(false);
          showSuccess("Image added to document!");
        } catch (error) {
          console.error("Error adding image to document:", error);
          showLoading(false);
          showError("Failed to add image to document. Please try again later.");
        }
      });

      imagesContainer.appendChild(imageCard);
    });
  }

  function showLoading(isLoading) {
    loadingElement.style.display = isLoading ? "block" : "none";
  }

  function showError(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;

    document.body.appendChild(errorElement);

    // Remove after 3 seconds
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement);
      }
    }, 3000);
  }

  function showSuccess(message) {
    const successElement = document.createElement("div");
    successElement.className = "success-message";
    successElement.textContent = message;

    document.body.appendChild(successElement);

    // Remove after 3 seconds
    setTimeout(() => {
      if (successElement.parentNode) {
        successElement.parentNode.removeChild(successElement);
      }
    }, 3000);
  }

  function updatePagination() {
    pageInfoElement.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;
  }
});
```

## Working with AI and Machine Learning APIs

Many add-ons can benefit from integrating AI capabilities such as image recognition, text analysis, or content generation:

```javascript
class AIServiceClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openai.com/v1";
  }

  async generateText(prompt, options = {}) {
    const defaultOptions = {
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 256,
    };

    const requestOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: requestOptions.model,
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant for Adobe Express users.",
            },
            { role: "user", content: prompt },
          ],
          temperature: requestOptions.temperature,
          max_tokens: requestOptions.max_tokens,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error?.message || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("AI text generation failed:", error);
      throw error;
    }
  }

  async analyzeImage(imageUrl) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Describe this image in detail, including main elements, colors, and style.",
                },
                { type: "image_url", image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error?.message || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Image analysis failed:", error);
      throw error;
    }
  }
}

// Usage example for text generation
async function generateAdCopy(product, audience) {
  const aiClient = new AIServiceClient("YOUR_API_KEY");

  const prompt = `Create short, engaging ad copy for a ${product} targeting ${audience}. Include a headline and a brief description.`;

  try {
    const generatedText = await aiClient.generateText(prompt, {
      temperature: 0.8,
      max_tokens: 150,
    });

    return generatedText;
  } catch (error) {
    console.error("Failed to generate ad copy:", error);
    return "Could not generate ad copy. Please try again later.";
  }
}

// Usage example for image analysis
async function suggestTagsForImage(imageUrl) {
  const aiClient = new AIServiceClient("YOUR_API_KEY");

  try {
    const imageDescription = await aiClient.analyzeImage(imageUrl);

    // Use additional prompt to extract tags
    const tagsPrompt = `Based on this image description: "${imageDescription}", suggest 5-10 relevant tags for this image, separated by commas.`;
    const tagsList = await aiClient.generateText(tagsPrompt);

    // Clean up and return as array
    return tagsList.split(",").map((tag) => tag.trim());
  } catch (error) {
    console.error("Failed to suggest tags:", error);
    return [];
  }
}
```

## Managing API Credentials Securely

When working with external APIs, it's important to securely manage your credentials:

### 1. Use Environment Variables for Server-Side Code

```javascript
// server.js
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
```

### 2. Use a Backend Proxy for Sensitive APIs

Instead of embedding API keys in your client-side code, create a backend proxy:

```javascript
// Client code
async function searchImages(query) {
  const response = await fetch(
    `https://your-backend.com/api/search?query=${encodeURIComponent(query)}`
  );
  return response.json();
}

// Server code
app.get("/api/search", async (req, res) => {
  const query = req.query.query;

  // Use API key stored securely on the server
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "API request failed" });
  }
});
```

### 3. Use OAuth for User-Specific Access

For personal accounts, use OAuth to enable users to authorize your add-on without sharing credentials:

```javascript
// In your add-on UI
const authButton = document.getElementById("authorize-button");
authButton.addEventListener("click", () => {
  // Redirect to authorization URL
  const authUrl =
    "https://service.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI";
  window.open(authUrl, "_blank", "width=600,height=600");
});

// Handle the callback
window.addEventListener("message", async (event) => {
  // Verify origin for security
  if (event.origin !== "https://your-addon-domain.com") return;

  if (event.data.type === "oauth-callback") {
    const authCode = event.data.code;

    // Exchange auth code for tokens via backend
    const tokens = await exchangeAuthCode(authCode);

    // Store tokens securely
    storeUserTokens(tokens);

    // Update UI
    updateAuthStatus("Authorized");
  }
});
```

## Adding API Support to Your Manifest

To connect to external APIs, you must specify the domains in your add-on's manifest:

```json
{
  "name": "API Integration Example",
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
        "network": {
          "domains": [
            "api.unsplash.com",
            "your-backend-service.com",
            "api.openai.com"
          ]
        }
      }
    }
  ]
}
```

## Practical Exercise: Building a Data-Driven Add-on

Let's apply these techniques by building an add-on that combines data from multiple sources:

1. Create a new add-on project structure
2. Set up API clients for two different services
3. Implement a UI that displays combined data
4. Add error handling and loading states
5. Implement data transformation to unify the results

## API Integration Best Practices

To create robust, maintainable API integrations:

1. **Specify network permissions** in your add-on manifest
2. **Abstract your API clients**: Create dedicated client classes for each external service
3. **Handle errors gracefully**: Implement comprehensive error handling and user feedback
4. **Implement caching**: Reduce API requests through effective caching strategies
5. **Use retry mechanisms**: Add retry logic for transient failures
6. **Monitor API usage**: Track API calls to avoid hitting rate limits
7. **Keep credentials secure**: Never expose API keys in client-side code
8. **Optimize performance** through caching and data transformation
9. **Transform data early**: Process API responses into a consistent format for your add-on
10. **Document API dependencies**: Maintain clear documentation of external dependencies
11. **Have fallback strategies**: Plan for API outages or changes
12. **Stay updated**: Monitor for API changes and deprecations

## Additional Resources

- [Working with APIs](../../guides/develop/)
- [Performance Optimization](../../resources/advanced-topics/performance.md)
- [Sample Add-ons Using APIs](/samples.md)

## Knowledge Check

Before proceeding to the next step, make sure you can answer these questions:

1. What are the key considerations when integrating with external APIs?
2. How can you securely manage API credentials in an add-on?
3. What are the advantages and disadvantages of client-side versus server-side integrations?
4. How would you implement caching to improve performance and reduce API calls?
5. What permissions must you specify in your manifest to connect to external services?

## Next Steps

Now that you understand how to integrate external APIs, you're ready to combine all the advanced concepts into a complete, professional add-on.

[Continue to Step 5: Building a Professional Add-on →](advanced-step5.md)

[← Back to Step 3: Advanced UI Patterns](advanced-step3.md)
