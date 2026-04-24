function getScrollPercent() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  return (scrolled / totalHeight) * 100;
}
const scrollProgressBar = document.getElementById("scroll-progress-bar");

let isScrolling = false;

document.onscroll = function () {
  if (!isScrolling) {
    window.requestAnimationFrame(function () {
      var scrollPercent = Math.round(getScrollPercent());
      scrollProgressBar.style.width = scrollPercent + "%";
      scrollProgressBar.ariaValueNow = scrollPercent;
      isScrolling = false;
    });
    isScrolling = true;
  }
};
