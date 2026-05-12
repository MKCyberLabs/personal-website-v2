const { performance } = require('perf_hooks');

// Mock DOM
const mockElement = { style: {} };
global.document = {
    getElementById: (id) => mockElement
};

global.window = { innerWidth: 1000 };

const searchButtonEle = [
    { getBoundingClientRect: () => ({ top: 10, left: 20 }) },
    { getBoundingClientRect: () => ({ top: 10, left: 20 }) }
];

const iterations = 1000000;

function unoptimized() {
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
}

function optimized() {
    let searchButtonPosition;
    const searchContentEle = document.getElementById("search-content");

    if (window.innerWidth > 768) {
      searchButtonPosition = searchButtonEle[0].getBoundingClientRect();
      searchContentEle.style.width = "500px";
    } else {
      searchButtonPosition = searchButtonEle[1].getBoundingClientRect();
      searchContentEle.style.width = "300px";
    }

    searchContentEle.style.top = searchButtonPosition.top + 50 + "px";
    searchContentEle.style.left = searchButtonPosition.left + "px";
}

// Warm up
for (let i = 0; i < 1000; i++) {
    unoptimized();
    optimized();
}

const startUnoptimized = performance.now();
for (let i = 0; i < iterations; i++) {
    unoptimized();
}
const endUnoptimized = performance.now();

const startOptimized = performance.now();
for (let i = 0; i < iterations; i++) {
    optimized();
}
const endOptimized = performance.now();

console.log(`Unoptimized: ${endUnoptimized - startUnoptimized} ms`);
console.log(`Optimized: ${endOptimized - startOptimized} ms`);
console.log(`Improvement: ${((endUnoptimized - startUnoptimized) - (endOptimized - startOptimized)) / (endUnoptimized - startUnoptimized) * 100}%`);
