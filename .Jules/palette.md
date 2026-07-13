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
## 2024-06-25 - Contextual ARIA labels for generic link text
**Learning:** Generic link text like "Read" or "Know more" is ambiguous for screen reader users when read out of context (e.g., when tabbing through links).
**Action:** Always provide a contextual `aria-label` (e.g., `aria-label='Know more about {{ .Title }}'`) to generic "Read more" style links to give screen reader users clarity about the link destination.

## 2024-05-23 - Add explicit labels to contact form
**Learning:** Relying solely on placeholders for form fields is an accessibility and UX anti-pattern because the placeholder disappears when the user starts typing, causing a loss of context.
**Action:** Always provide visible, explicitly linked `<label>` elements (using `for` and `id` attributes) for form inputs to ensure context is maintained and improve screen reader compatibility.
## 2024-05-30 - Contextual aria-labels for generic links
**Learning:** Generic link text like 'Read' or 'Know more' lacks context for screen reader users when navigated out of context (e.g., using a screen reader's links list).
**Action:** Always include a contextual `aria-label` (e.g., `aria-label='Know more about {{ .Title }}'`) to provide clarity for screen reader users on generic links.
## 2024-05-24 - Explicit Form Labels vs Placeholders
**Learning:** Relying solely on placeholders for form fields is a UX and accessibility anti-pattern. Placeholders disappear when a user begins typing, which can cause loss of context. Furthermore, explicit `<label>` elements provide better support for assistive technologies and increase the clickable area of the input.
**Action:** Always provide visible, explicitly linked `<label>` elements (using `for` and `id`) for form inputs, and include clear visual indicators for required fields to support cognitive and visual accessibility.
## 2024-06-15 - Missing ARIA context on generic "Know more" and "Read" buttons
**Learning:** In list views (like projects, certificates, or blog posts), generic link text like "Know more" or "Read" provides insufficient context for screen reader users when navigated out of context (e.g., via a screen reader's elements list).
**Action:** Always add descriptive `aria-label` attributes to generic "Read more" or "Know more" buttons that include the title of the associated item (e.g., `aria-label='Know more about {{ .Title }}'`).

## 2024-06-25 - Hiding visual required indicators from screen readers
**Learning:** When creating forms with visual 'required' indicators like asterisks, screen readers announce both the text ('asterisk') and the native input attribute ('required'), causing redundant and confusing announcements.
**Action:** Always hide visual asterisk indicators using `aria-hidden="true"` when the input already uses the native HTML `required` attribute to ensure a clean screen reader experience.
## 2024-06-20 - Visual asterisks in required fields
**Learning:** When using a visual asterisk (`*`) to indicate a required field in a form, if the input already has the native `required` attribute, the screen reader will read both the required state and the "star" symbol, creating a redundant and confusing experience.
**Action:** Always add `aria-hidden="true"` to purely visual 'required' indicators (like asterisks) when the input itself semantically communicates its required state.
## 2024-06-20 - Hide decorative required asterisks from screen readers
**Learning:** When creating forms with visual 'required' indicators like asterisks, if the input already uses the native HTML `required` attribute, the screen reader will announce "required" automatically. Announcing the asterisk as well is redundant and causes clutter.
**Action:** Hide the asterisk from screen readers using `aria-hidden="true"`. However, avoid supplementing it with explicit visually hidden text (e.g., `<span class="visually-hidden">Required</span>`) if the input already uses the native HTML `required` attribute, to prevent redundant screen reader announcements.
## 2024-06-15 - Hide visual required indicators from screen readers
**Learning:** Visual required indicators like asterisks inside `<label>` elements are read aloud by screen readers (e.g., "Email star"), which is redundant and confusing when the associated input already has a native `required` attribute.
**Action:** Always add `aria-hidden="true"` to visual required indicators (like `<span class="text-danger">*</span>`) to hide them from assistive technologies, relying on the native `required` attribute for semantic meaning.
## 2024-06-25 - Redundant screen reader announcements for visual required indicators
**Learning:** When creating forms with visual 'required' indicators like asterisks, if the input already uses the native HTML `required` attribute, the asterisk will cause a redundant announcement by screen readers (e.g. "Email star required").
**Action:** Hide the visual asterisk from screen readers using `aria-hidden="true"` to prevent redundant screen reader announcements.
## 2024-07-25 - Unique alt text for gallery and achievement images
**Learning:** In Hugo templates, when iterating through lists of images (e.g., using `range` for galleries or achievements), using hardcoded generic `alt` attributes like "Gallery image" or "Achievement image" is an accessibility anti-pattern because screen readers will announce every image identically.
**Action:** Always use dynamic iteration variables (e.g., `{{ .title }}`) or an indexed counter (e.g., `{{ print "Image " (add $index 1) }}`) to ensure every image has a unique and descriptive accessible name.

## 2024-06-20 - Descriptive alt text for lists of images
**Learning:** In Hugo templates, when iterating through lists of images (e.g., using `range` for galleries or achievements), hardcoding generic `alt` attributes results in poor screen reader experience where all items sound the same.
**Action:** Always use dynamic iteration variables (e.g., `{{ .title }}`) or an indexed counter (`{{ print "Image " (add $index 1) }}`) to ensure every image has a unique and descriptive accessible name.
## 2024-06-20 - Explicit Form Labels vs Placeholders and Accessibility
**Learning:** Relying solely on placeholders for form fields is a UX and accessibility anti-pattern. Placeholders disappear when a user begins typing, which can cause loss of context. Furthermore, explicit `<label>` elements provide better support for assistive technologies and increase the clickable area of the input. In the header search, the inputs were missing explicit labels for screen readers.
**Action:** Always provide visible, explicitly linked `<label>` elements (using `for` and `id`) for form inputs, and include clear visual indicators for required fields to support cognitive and visual accessibility. Removed redundant screen-reader announcements by keeping `aria-label="Search"` on inputs rather than adding an explicit `<label>`, since the native inputs use attributes appropriately. Also, removed redundant hidden `Required` spans on inputs that use the native `required` attribute, to prevent screen readers from announcing it twice.
## 2024-06-25 - Improved Accessibility of Required Form Fields
**Learning:** When creating forms with visual 'required' indicators like asterisks, screen readers may announce them awkwardly (e.g., "star"). Hiding the asterisk and supplementing it with explicit visually hidden text (e.g., `<span class="visually-hidden">Required</span>`) ensures accurate accessibility announcements.
**Action:** Hide the asterisk from screen readers using `aria-hidden="true"` and add a visually hidden "Required" span to improve the screen reader experience.
## 2024-07-20 - Accessible required field indicators
**Learning:** When creating forms with visual 'required' indicators like asterisks, screen readers may read the asterisk confusingly (e.g., "star"). Hiding the asterisk from screen readers and supplementing it with explicit visually hidden text ensures accurate and clear accessibility announcements.
**Action:** Always hide visual required indicators using `aria-hidden="true"` and add an explicit `<span class="visually-hidden">Required</span>` for screen readers.

## 2024-06-25 - Accessible required field indicators
**Learning:** Visual 'required' indicators like asterisks (*) are often read aloud by screen readers as "star" or "asterisk", which can be confusing without context.
**Action:** Always hide visual asterisks from screen readers using `aria-hidden="true"` and provide an explicit visually hidden text (e.g., `<span class="visually-hidden">Required</span>`) to ensure accurate accessibility announcements.
## 2024-06-03 - [Accessible Required Form Indicators]
**Learning:** Visual indicators like asterisks for required fields must be hidden from screen readers to avoid confusing announcements (e.g., "star").
**Action:** Use `aria-hidden="true"` on the asterisk and supplement it with an explicit visually hidden text (e.g., `<span class="visually-hidden">Required</span>`) for screen readers.
## 2024-06-01 - Hide visual asterisks from screen readers
**Learning:** Visual "required" indicators like asterisks (<span class="text-danger">*</span>) are often announced as "star" or "asterisk" by screen readers, which is confusing or ignored.
**Action:** Always add `aria-hidden="true"` to the visual asterisk and provide a visually hidden text (e.g., `<span class="visually-hidden">Required</span>`) to explicitly state the requirement to screen reader users.
## 2024-06-16 - Dynamic and unique alt text for lists of images
**Learning:** Hardcoding generic `alt` text (like `alt="Gallery image"` or `alt="Achievement image"`) across a list or gallery of images provides poor context and repetitive announcements for screen reader users.
**Action:** Always use dynamic template variables (e.g., `{{ .title }}`) or, at a minimum, numbered sequences (e.g., `{{ print "Gallery image " (add $index 1) }}`) to ensure each image in a loop has unique and descriptive `alt` text.
## 2024-06-16 - Add focus-visible to theme toggle
**Learning:** Explicitly setting `outline: 0` on buttons (like the theme toggle) without adding a `:focus-visible` fallback breaks keyboard navigation accessibility.
**Action:** Always provide a `:focus-visible` state with a visible outline when removing the default `:focus` outline.
## 2024-07-28 - Empty State Call-to-Actions
**Learning:** Error pages like 404s without clear calls to action (like a "Return Home" button) leave users at a dead end, forcing them to rely on browser controls.
**Action:** Always provide clear, accessible, and contextually appropriate navigation options on empty states or error pages to guide the user back to the primary flow.

## 2024-06-26 - Skip to Main Content Link
**Learning:** Keyboard users often have to tab through repetitive navigation links before reaching the main content, which can be frustrating and time-consuming.
**Action:** Always provide a "Skip to main content" link as the first focusable element on the page. Use `.visually-hidden-focusable` so it remains hidden for sighted users until focused, and ensure the target container has `tabindex="-1"` to properly receive programmatic focus.
## 2026-06-17 - Add focus-visible to theme toggle
**Learning:** Explicitly setting `outline: 0` on buttons (like the theme toggle) without adding a `:focus-visible` fallback breaks keyboard navigation accessibility.
**Action:** Always provide a `:focus-visible` state with a visible outline when removing the default `:focus` outline.

## 2024-07-28 - Disable form inputs during async submissions
**Learning:** Leaving form inputs enabled during an async submission process allows users to modify data mid-flight or trigger multiple submissions, leading to poor UX and potential race conditions.
**Action:** Always disable all form inputs (e.g., `input`, `textarea`, `select`) in addition to the submit button while an async operation is pending, and restore their state in a `finally` block.

## 2024-07-30 - Home link logos screen reader optimization
**Learning:** When images like brand logos are used as links to the home page, having a non-empty `alt` attribute on the image without an `aria-label` on the anchor tag results in a less descriptive and sometimes redundant screen reader experience.
**Action:** Always provide an `aria-label="Home"` on the anchor tag wrapping the logo and set the image `alt=""` to prevent redundant screen reader announcements and improve navigation clarity.

## 2024-08-01 - Add focus-visible to Scroll to top button
**Learning:** Explicitly setting `outline: none` on interactive controls like the "Scroll to top" button breaks keyboard accessibility by removing the browser's default focus ring.
**Action:** Always provide a `:focus-visible` fallback with a visible outline when setting `outline: none` or `outline: 0` on interactive elements to ensure keyboard users can track their focus.

## 2024-08-05 - Add focus-visible to generic buttons
**Learning:** Removing default focus rings using `box-shadow: none` or `outline: none` on generic button classes (`.btn`) breaks keyboard navigation accessibility for users tabbing through interactive elements like submit buttons and "Read more" links.
**Action:** Always provide a `:focus-visible` state with a visible outline when removing the default `:focus` outline or box-shadow to ensure keyboard accessibility.

## 2024-07-01 - Fix duplicate DOM IDs in Navbar Dropdown Menus
**Learning:** In Hugo templates, avoiding hardcoded DOM IDs inside `range` loops is crucial for accessibility. Reusing an ID like `navbarDropdown` breaks `aria-labelledby` associations. Appending an index or a unique property like `{{ .Name | urlize }}` ensures uniqueness and preserves screen reader accessibility.
**Action:** Always append a unique identifier (like `.Name | urlize` or `$index`) to DOM IDs when creating elements inside a Hugo template `range` loop to maintain valid HTML and a11y support.
<<<<<<< HEAD
<<<<<<< HEAD
## 2026-07-11 - Add focus-visible to generic buttons
=======
## 2024-08-05 - Add focus-visible to generic buttons
>>>>>>> palette-fix-focus-visible-11115817562559784985
**Learning:** Removing default focus rings using `box-shadow: none` or `outline: none` on generic button classes (`.btn`) breaks keyboard navigation accessibility for users tabbing through interactive elements like submit buttons and "Read more" links.
**Action:** Always provide a `:focus-visible` state with a visible outline when removing the default `:focus` outline or box-shadow to ensure keyboard accessibility.
=======

## 2024-08-10 - Add focus-visible to link elements
**Learning:** Explicitly removing default focus styles using `box-shadow: none` on link elements like `.post-footer a`, `ul li a` (pagination), and `.card-footer a` breaks keyboard navigation accessibility for users tabbing through links.
**Action:** Always provide a `:focus-visible` state with a visible outline/box-shadow when removing the default `:focus` box-shadow to ensure keyboard accessibility.
>>>>>>> palette-focus-visible-fix-16934635494255590775
## 2024-07-12 - Added `aria-hidden="true"` to SVG decorative icons
**Learning:** Purely decorative icons (e.g., Font Awesome `<i class="fas fa-..."></i>` or inline `<svg>` elements) must include `aria-hidden="true"` and avoid redundant `aria-label` attributes to prevent confusing or duplicate screen reader announcements, especially when placed inside interactive elements that already have their own descriptive `aria-label`s.
**Action:** When adding or reviewing icon-only links, always check the parent anchor tag for an `aria-label` and ensure the child icon has `aria-hidden="true"` and no duplicate `aria-label`.

## 2024-07-13 - Preventing Redundant Screen Reader Announcements on Duplicate Links and Images
**Learning:** When images are wrapped in anchor tags and adjacent to text links pointing to the same destination, screen readers will announce the link twice (once for the image, once for the text). Additionally, decorative icons or SVGs without `aria-hidden="true"` can cause extra, confusing announcements.
**Action:** Always add `tabindex="-1"` and `aria-hidden="true"` to the anchor tag surrounding a duplicate image link. Ensure decorative images use `alt=""`, and pure CSS/SVG decorative graphics include `aria-hidden="true"` to create a cleaner, less verbose screen reader experience.
