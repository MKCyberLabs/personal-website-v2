function encodeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

function isValidUrl(url) {
  try {
    const parsedUrl = new URL(url, window.location.origin);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (e) {
    return false;
  }
}

// Cached DOM elements
let searchInputs = null;
let searchContentEle = null;
let searchResultsContainer = null;

function getSearchInputs() {
  if (!searchInputs || searchInputs.length === 0) {
    searchInputs = document.querySelectorAll("#search");
  }
  return searchInputs;
}

function getSearchContentEle() {
  if (!searchContentEle) {
    searchContentEle = document.getElementById("search-content");
  }
  return searchContentEle;
}

function getSearchResultsContainer() {
  if (!searchResultsContainer) {
    searchResultsContainer = document.getElementById("search-results");
  }
  return searchResultsContainer;
}

let debounceTimeout;
function searchOnChange(evt) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    performSearch(evt);
  }, 300); // Debounce delay of 300ms
}

async function performSearch(evt) {
  let searchQuery = evt.target.value.trim().toLowerCase();
  const contentEle = getSearchContentEle();
  const resultsContainer = getSearchResultsContainer();

  if (searchQuery !== "") {
    const inputs = getSearchInputs();

    if (inputs.length < 2) {
      console.error("Search button elements missing!");
      return;
    }

    let searchButtonPosition;
    if (window.innerWidth > 768) {
      searchButtonPosition = inputs[0].getBoundingClientRect();
      if (contentEle) contentEle.style.width = "500px";
    } else {
      searchButtonPosition = inputs[1].getBoundingClientRect();
      if (contentEle) contentEle.style.width = "300px";
    }

    if (contentEle) {
      contentEle.style.top =
        searchButtonPosition.top + 50 + "px";
      contentEle.style.left =
        searchButtonPosition.left + "px";
    }

    try {
      let response = await fetch("/index.json");
      if (!response.ok) {
        throw new Error("Failed to fetch search data");
      }

      let searchJson = await response.json();
      console.log("Fetched Data:", searchJson); // Debugging log

      let searchResults = searchJson.filter((item) => {
        if (!item || typeof item !== "object") return false;
        if (!item.title && !item.description && !item.content) return false;

        return (
          (item.title && item.title.toLowerCase().includes(searchQuery)) ||
          (item.description && item.description.toLowerCase().includes(searchQuery)) ||
          (item.content && item.content.toLowerCase().includes(searchQuery))
        );
      });

      if (resultsContainer) resultsContainer.innerHTML = ""; // Clear previous results

      if (searchResults.length > 0) {
        const fragment = document.createDocumentFragment();
        searchResults.forEach((item) => {
          if (!item.permalink || !isValidUrl(item.permalink)) {
            console.warn("Skipping invalid search result:", item);
            return;
          }

          const card = document.createElement("div");
          card.className = "card";

          const link = document.createElement("a");
          link.href = item.permalink; // Safe, since we validated it

          const contentDiv = document.createElement("div");
          contentDiv.className = "p-3";

          const title = document.createElement("h5");
          title.textContent = item.title || "Untitled"; // Use textContent to prevent XSS

          const description = document.createElement("div");
          description.textContent = item.description || "No description available"; // Safe

          contentDiv.appendChild(title);
          contentDiv.appendChild(description);
          link.appendChild(contentDiv);
          card.appendChild(link);
          fragment.appendChild(card);
        });
        if (resultsContainer) resultsContainer.appendChild(fragment);
      } else {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.className = "text-center py-3";
        noResultsMessage.textContent = `No results found for "${searchQuery}"`;
        if (resultsContainer) resultsContainer.appendChild(noResultsMessage);
      }

      if (contentEle) contentEle.style.display = "block";
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  } else {
    if (contentEle) contentEle.style.display = "none";
    if (resultsContainer) resultsContainer.innerHTML = "";
  }
}


// Keyboard shortcut support
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (event) => {
    // Focus search on Ctrl+K or Cmd+K
    if ((event.ctrlKey || event.metaKey) && (event.key === "k" || event.code === "KeyK")) {
      event.preventDefault();
      const inputs = getSearchInputs();
      // Find the visible search input
      for (const input of inputs) {
        if (input.offsetParent !== null) { // Simple check for visibility
          input.focus();
          break;
        }
      }
    }

    // Dismiss search on Escape
    if (event.key === "Escape" || event.code === "Escape") {
      const inputs = getSearchInputs();
      inputs.forEach(input => {
        input.blur();
        input.value = "";
      });
      const content = getSearchContentEle();
      const results = getSearchResultsContainer();
      if (content) content.style.display = "none";
      if (results) results.innerHTML = "";
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { isValidUrl, encodeHTML };
}
