## 2024-04-23 - Icon-only utility buttons require title attributes

**Learning:** This app relies heavily on icon-only buttons (`svg` elements) for the theme toggle, navbar toggler, and social network links. While some had `aria-label` attributes for screen readers, they lacked `title` attributes. This meant that mouse users interacting with these buttons received no visual feedback or tooltip explaining their function. Additionally, some `aria-label`s were not capitalized (e.g. "github" instead of "GitHub").
**Action:** Always ensure that icon-only interactive elements have both `aria-label` (for screen readers) and `title` (for mouse hover tooltips). Keep the text capitalized appropriately.
## 2024-05-18 - Missing ARIA labels and titles on icon-only utility buttons
**Learning:** Icon-only utility buttons (e.g., scroll to top, theme toggles) in Hugo-Profile theme components rely entirely on `<svg>` or `<i>` without explicit accessibility labels or titles, making them invisible or unclear to screen reader users and missing hover tooltips for mouse users.
**Action:** Always add both `aria-label` and `title` attributes to icon-only buttons to ensure full accessibility and usability across all components.
## 2026-04-16 - Accessibility of Icon-Only Buttons
**Learning:** Icon-only buttons (like a theme toggle) often lack accessible names by default, rendering them invisible or confusing to screen readers.
**Action:** Always add `aria-label` (and often a `title`) to icon-only buttons to ensure they have an accessible name, especially in common components like headers.

## 2026-04-27 - Adding aria-label and title to icon-only buttons
**Learning:** Hugo templates with FontAwesome social links can dynamically extract human-readable accessible names for screen readers and tooltips using the `replaceRE` function to ensure icon-only buttons are accessible.
**Action:** Use Hugo's string manipulation pipeline `{{ .icon | replaceRE "^(?:fab|fas|far|fa) fa-(.*)$" "" | title }}` to automatically generate semantic `aria-label` and `title` text for icon links based on their class name.
## 2024-05-18 - Dynamically generate aria-labels for configurable social links
**Learning:** When theme social links are dynamically populated from user configuration (e.g. `{{ .url }}`) and the user might not provide an explicit name or title for pure icon links, an accessible fallback strategy is required to ensure these purely visual elements are readable by screen readers.
**Action:** Use template functions to generate a fallback `aria-label` based on the available URL context, like `aria-label='{{ .title | default (print "Social link for " .url) }}'`, ensuring accessibility is maintained even with incomplete user configuration.
## 2026-05-02 - Adding loading indicator to contact form submission button\n**Learning:** Providing a loading state for asynchronous form submissions gives users clear feedback that their action is being processed, preventing multiple submissions and confusion.\n**Action:** Always add loading spinners and disable submit buttons during network requests for forms.
