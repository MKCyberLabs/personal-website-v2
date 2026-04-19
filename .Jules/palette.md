## 2024-04-19 - Missing ARIA labels on utility icon buttons
**Learning:** Icon-only utility buttons (like theme toggles and scroll-to-top) in Hugo themes frequently lack ARIA labels, as developers often assume the visual icon is sufficient context. This creates a recurring accessibility barrier.
**Action:** Always verify that utility buttons that rely purely on icons (`<svg>` or `<i>`) have descriptive `aria-label` and `title` attributes for both screen reader support and mouse hover tooltips.
