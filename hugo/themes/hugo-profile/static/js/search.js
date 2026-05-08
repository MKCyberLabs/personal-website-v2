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

let debounceTimeout;
function searchOnChange(evt) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    performSearch(evt);
  }, 300); // Debounce delay of 300ms
}

async function performSearch(evt) {
  let searchQuery = evt.target.value.trim().toLowerCase();

  if (searchQuery !== "") {
    const searchButtonEle = document.querySelectorAll("#search");

    if (searchButtonEle.length < 2) {
      console.error("Search button elements missing!");
      return;
    }

    let searchButtonPosition;
    if (window.innerWidth > 768) {
      searchButtonPosition = searchButtonEle[0].getBoundingClientRect();
      document.getElementById("search-content").style.width = "500px";
    } else {
      searchButtonPosition = searchButtonEle[1].getBoundingClientRect();
      document.getElementById("search-content").style.width = "300px";
    }

    document.getElementById("search-content").style.top =
      searchButtonPosition.top + 50 + "px";
    document.getElementById("search-content").style.left =
      searchButtonPosition.left + "px";

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

      const searchResultsContainer = document.getElementById("search-results");
      searchResultsContainer.innerHTML = ""; // Clear previous results

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
        searchResultsContainer.appendChild(fragment);
      } else {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.className = "text-center py-3";
        noResultsMessage.textContent = `No results found for "${searchQuery}"`;
        searchResultsContainer.appendChild(noResultsMessage);
      }

      document.getElementById("search-content").style.display = "block";
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  } else {
    const searchContent = document.getElementById("search-content");
    if (searchContent) searchContent.style.display = "none";
    const searchResults = document.getElementById("search-results");
    if (searchResults) searchResults.innerHTML = "";
  }
}


// Keyboard shortcut support
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (event) => {
  // Focus search on Ctrl+K or Cmd+K
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    const searchInputs = document.querySelectorAll("#search");
    // Find the visible search input
    for (const input of searchInputs) {
      if (input.offsetParent !== null) { // Simple check for visibility
        input.focus();
        break;
      }
    }
  }

  // Dismiss search on Escape
  if (event.key === "Escape") {
    const searchInputs = document.querySelectorAll("#search");
    searchInputs.forEach(input => {
      input.blur();
      input.value = "";
    });
    document.getElementById("search-content").style.display = "none";
    document.getElementById("search-results").innerHTML = "";
  }
});
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { isValidUrl, encodeHTML };
}
