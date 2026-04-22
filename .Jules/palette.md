## 2024-05-18 - Missing ARIA labels and titles on icon-only utility buttons
**Learning:** Icon-only utility buttons (e.g., scroll to top, theme toggles) in Hugo-Profile theme components rely entirely on `<svg>` or `<i>` without explicit accessibility labels or titles, making them invisible or unclear to screen reader users and missing hover tooltips for mouse users.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons to ensure full accessibility and usability across all components.
