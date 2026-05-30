## 2024-05-30 - Dynamic Alert Accessibility
**Learning:** Hardcoding accessibility strings in alert components (like always saying "Success:" on the icon, regardless of success or error state) is a common failure point when reusing a single alert generation function for multiple states. The string must be fully dynamic. Additionally, standard close buttons in dynamic alerts must explicitly define `aria-label="Close"`.
**Action:** When working on dynamic alert generation (e.g., `contactAlert`), ensure the `aria-label` for icons and the icons themselves update according to the state (`type`), rather than remaining static. Also ensure utility buttons like `.btn-close` have an explicit `aria-label`.
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

## 2024-05-24 - Accessibility of Dynamically Injected UI Elements
**Learning:** Dynamically injected UI elements such as alerts and toasts often use generic utility classes (like `.btn-close`) but lack accessible labels because they are constructed in JavaScript strings rather than defined in templates.
**Action:** Ensure all dynamically generated interactive elements (e.g., within JS template literals) include explicit `aria-label` and `title` attributes, such as `aria-label="Close alert"` for dismissal buttons.
## 2024-05-18 - Dynamically Injected DOM Element Accessibility
**Learning:** Dynamically injected elements (like alerts or toasts) generated via client-side JavaScript often miss necessary ARIA labels for their actions because they bypass standard templating linting. Furthermore, static SVGs with `xlink:href` require dynamic updating of the `aria-label` to match the specific context (e.g., success vs. error).
**Action:** When injecting alerts or changing context dynamically via JS, ensure actionable sub-components (like a close button) receive proper `aria-label` and `title` attributes, and that icons are given context-appropriate `aria-label` text.
## 2026-05-02 - Adding loading indicator to contact form submission button\n**Learning:** Providing a loading state for asynchronous form submissions gives users clear feedback that their action is being processed, preventing multiple submissions and confusion.\n**Action:** Always add loading spinners and disable submit buttons during network requests for forms.

## 2024-05-24 - Async Loading States and ARIA on DOM Injected Alerts
**Learning:** Adding a spinner to a submit button during async `fetch` operations significantly improves perceived performance and prevents double submissions. Also, when injecting alerts into the DOM dynamically (like the Formspree response message), ensuring buttons inside the alert have an `aria-label` (like `aria-label="Close alert"`) is critical for screen readers to interpret the action correctly, rather than reading just "Close" without context.
**Action:** When working on async forms, always inject disabled states with visual spinners. For dynamically created DOM nodes (e.g. alerts or toasts), always verify that actionable items have descriptive ARIA labels to ensure full accessibility.
## 2024-05-05 - Interactive Elements and Form Accessibility
**Learning:** Using `<div>` elements with `role="tab"` without explicit `tabindex="0"` breaks keyboard navigation for tabs.
**Action:** Always use native `<button type="button">` for interactive tab controls to inherit focus and keyboard events.

## 2024-05-06 - Fulfilling UI Promises with Keyboard Shortcuts
**Learning:** The UI placeholder "Ctrl + k to Search..." set an expectation for keyboard navigation that wasn't functioning. Users notice when UI promises are broken, leading to friction. Fulfilling these promises builds trust and significantly improves keyboard accessibility.
**Action:** Always verify that keyboard shortcuts advertised in the UI (like placeholders or tooltips) are actually implemented and functional. Added document-level listeners for Ctrl+K/Cmd+K to focus search and Esc to dismiss it.
## 2024-05-07 - Descriptive alt text for profile images
**Learning:** Images with empty `alt=""` attributes are ignored by screen readers, which is problematic for profile or hero images that provide context about the person.
**Action:** Always provide descriptive `alt` text for images, especially when they represent the user or key content.

## 2024-06-01 - Keyboard Accessibility for Bootstrap Tooltips
**Learning:** Bootstrap tooltips attached to non-interactive elements (like `<span>` for info icons) are inaccessible to keyboard users and screen readers because they lack focusability and semantic meaning.
**Action:** Always add `tabindex="0"`, `role="button"`, and a descriptive `aria-label` to non-interactive elements that trigger tooltips to ensure they are focusable and semantically meaningful for assistive technologies.
## 2024-05-30 - Interactive Tooltip Accessibility
**Learning:** Tooltips attached to non-interactive elements like `<span>` cannot be accessed via keyboard navigation, hiding their information from keyboard-only users.
**Action:** Always add `tabindex="0"` and `role="button"` (along with a descriptive `aria-label`) to `<span>` or `<div>` elements that trigger tooltips, ensuring they are reachable in the tab order and announced correctly by screen readers.

## 2024-06-05 - Search Keyboard Shortcuts
**Learning:** Providing keyboard shortcuts like `Ctrl+K`/`Cmd+K` to focus a search input and `Escape` to dismiss it greatly enhances keyboard accessibility and power-user UX. When placeholder text advertises a shortcut, the functionality must be present.
**Action:** Always implement global document-level `keydown` event listeners to support advertised keyboard shortcuts, ensuring proper focus management and dismissal logic.
## 2024-05-28 - Dynamic ARIA Labels for Icon Links
**Learning:** When adding `aria-label` or `title` attributes to dynamically generated icon-only links (e.g., using `range`), never hardcode generic values like "Link". Always derive descriptive context from available template variables, such as `{{ .name | default (print "Link to " .url) }}`, to prevent unhelpful and repetitive screen reader announcements.
**Action:** Always inspect the data structure driving a loop to find appropriate descriptive names for ARIA labels before falling back to generic strings.

## 2024-06-11 - Properly Quoting Tooltip Attributes
**Learning:** Tooltips powered by `data-bs-original-title` that inject Hugo template strings with spaces must have quotes around the attribute value, otherwise the browser misinterprets the space as a new attribute. Furthermore, redundant semantic attributes (`tabindex="0"`, `role="button"`) should be removed to keep the DOM clean.
**Action:** Always wrap Hugo template variables injected into HTML attributes with single quotes (e.g. `data-bs-original-title='{{ .text }}'`) to prevent attribute splitting.
## 2024-05-18 - Missing ARIA labels and titles on icon-only project/certificate links
**Learning:** In the Hugo-Profile theme, icon-only utility buttons or external links (e.g., social links inside the project list or certificates section) often lack explicit `aria-label` or `title` attributes. This makes them invisible or confusing to screen readers and hides visual context from mouse users (no tooltip).
**Action:** When adding or auditing lists of links that are represented solely by an icon (such as a FontAwesome class `<i>`), always ensure there is an accessible fallback name on the anchor tag. Use template logic like `aria-label='{{ .title | default (print "Project link for " .url) }}'` to gracefully handle missing configuration while guaranteeing accessibility.

## 2024-05-30 - Contextual aria-labels for generic links
**Learning:** Generic link text like 'Read' or 'Know more' lacks context for screen reader users when navigated out of context (e.g., using a screen reader's links list).
**Action:** Always include a contextual `aria-label` (e.g., `aria-label='Know more about {{ .Title }}'`) to provide clarity for screen reader users on generic links.
## 2024-05-24 - Explicit Form Labels vs Placeholders
**Learning:** Relying solely on placeholders for form fields is a UX and accessibility anti-pattern. Placeholders disappear when a user begins typing, which can cause loss of context. Furthermore, explicit `<label>` elements provide better support for assistive technologies and increase the clickable area of the input.
**Action:** Always provide visible, explicitly linked `<label>` elements (using `for` and `id`) for form inputs, and include clear visual indicators for required fields to support cognitive and visual accessibility.
## 2024-06-15 - Missing ARIA context on generic "Know more" and "Read" buttons
**Learning:** In list views (like projects, certificates, or blog posts), generic link text like "Know more" or "Read" provides insufficient context for screen reader users when navigated out of context (e.g., via a screen reader's elements list).
**Action:** Always add descriptive `aria-label` attributes to generic "Read more" or "Know more" buttons that include the title of the associated item (e.g., `aria-label='Know more about {{ .Title }}'`).
