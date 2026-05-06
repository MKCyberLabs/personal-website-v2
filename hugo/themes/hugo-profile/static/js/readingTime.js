function readingTime() {
  const article = document.querySelector("article");
  const timeElement = document.querySelector("span#readingTime");

  if (!article || !timeElement) {
    return;
  }

  const text = article.innerText;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  timeElement.innerHTML = "<small> | </small>" + time + timeElement.innerHTML;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { readingTime };
} else {
  readingTime();
}
