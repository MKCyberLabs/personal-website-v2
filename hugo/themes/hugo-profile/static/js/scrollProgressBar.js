function getScrollPercent() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  if (totalHeight <= 0) {
    return 0;
  }
  return (scrolled / totalHeight) * 100;
}

if (typeof document !== "undefined") {
  const scrollProgressBar = document.getElementById("scroll-progress-bar");

  let isScrolling = false;

  if (scrollProgressBar) {
    document.onscroll = function () {
      if (!isScrolling) {
        window.requestAnimationFrame(function () {
          const scrollPercent = Math.round(getScrollPercent());
          scrollProgressBar.style.width = scrollPercent + "%";
          scrollProgressBar.ariaValueNow = scrollPercent;
          isScrolling = false;
        });
        isScrolling = true;
      }
    };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { getScrollPercent };
}
