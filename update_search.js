const fs = require('fs');

let content = fs.readFileSync('hugo/themes/hugo-profile/static/js/search.js', 'utf8');

// The replacement in the previous script failed because the search strings contain line breaks
// that differ slightly (e.g. \r\n vs \n). Let's do a more robust string replace.

// 1. Add variable declarations at the start of performSearch
content = content.replace(
`async function performSearch(evt) {
  let searchQuery = evt.target.value.trim().toLowerCase();

  if (searchQuery !== "") {`,
`async function performSearch(evt) {
  let searchQuery = evt.target.value.trim().toLowerCase();
  const searchContentEle = document.getElementById("search-content");
  const searchResultsContainer = document.getElementById("search-results");

  if (searchQuery !== "") {`);

// 2. Replace multiple document.getElementById calls
content = content.replace(/document\.getElementById\("search-content"\)/g, 'searchContentEle');
content = content.replace(/const searchResultsContainer = document\.getElementById\("search-results"\);\s*/, '');

fs.writeFileSync('hugo/themes/hugo-profile/static/js/search.js', content, 'utf8');
