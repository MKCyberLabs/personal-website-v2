1. **Remove static aria-label attributes from navigation links in header.html**
   - Use `run_in_bash_session` to execute a Node.js script that removes the static `aria-label` attributes (`aria-label="about"`, `aria-label="experience"`, etc.) from the `.nav-link` elements in `hugo/themes/hugo-profile/layouts/partials/sections/header.html`. This fixes an accessibility issue where static labels override dynamic visible text.

2. **Add a critical learning to Palette's journal**
   - Use `run_in_bash_session` to append a new journal entry to `.Jules/palette.md` noting that static `aria-label` attributes on navigation links with dynamic visible text is an accessibility anti-pattern. Format must be:
     `## YYYY-MM-DD - [Title]
     **Learning:** [UX/a11y insight]
     **Action:** [How to apply next time]`

3. **Verify tests**
   - Use `run_in_bash_session` to run `pnpm test` to ensure no functionality is broken.

4. **Complete pre-commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

5. **Submit a PR for the UX improvement**
   - Use `submit` to create a PR with the title format `🎨 Palette: Remove static aria-labels overriding dynamic nav text` and include the mandatory description sections (What, Why, Before/After, Accessibility).
