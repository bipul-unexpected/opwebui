

# AGENTS.md

- The site uses a single warm-dark theme: `:root` and `.dark` share the same tokens in `src/styles.css`, so no light mode exists to keep in sync.
- Landing-page building blocks live in `src/components/openpath/`; the page sections are composed in `src/routes/index.tsx` — keeps the route readable.
- The hero dashboard is a coded, interactive React mock (not an image) so it stays crisp and themeable.
