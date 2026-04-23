## 2024-04-23 - Icon-only utility buttons require title attributes

**Learning:** This app relies heavily on icon-only buttons (`svg` elements) for the theme toggle, navbar toggler, and social network links. While some had `aria-label` attributes for screen readers, they lacked `title` attributes. This meant that mouse users interacting with these buttons received no visual feedback or tooltip explaining their function. Additionally, some `aria-label`s were not capitalized (e.g. "github" instead of "GitHub").
**Action:** Always ensure that icon-only interactive elements have both `aria-label` (for screen readers) and `title` (for mouse hover tooltips). Keep the text capitalized appropriately.
